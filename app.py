from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import base64
from pathlib import Path
from openai import OpenAI
from dotenv import load_dotenv
import numpy as np
import soundfile as sf
import uuid
from datetime import datetime

# 加载 .env 文件
load_dotenv()

app = Flask(__name__, static_folder="static", static_url_path="")
CORS(app)

client = OpenAI(
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url=os.getenv("DASHSCOPE_BASE_URL"),
)


def encode_audio_to_base64(audio_path: str) -> str:
    """将音频文件编码为 base64 字符串"""
    with open(audio_path, "rb") as audio_file:
        return base64.b64encode(audio_file.read()).decode("utf-8")


def save_audio_response(audio_base64_string: str, output_path: str):
    """将 base64 音频数据保存为 WAV 文件（24kHz 采样率）"""
    wav_bytes = base64.b64decode(audio_base64_string)
    audio_np = np.frombuffer(wav_bytes, dtype=np.int16)
    sf.write(output_path, audio_np, samplerate=24000)


def get_audio_format(audio_path: str) -> str:
    """根据文件扩展名获取音频格式"""
    suffix = Path(audio_path).suffix.lower()
    format_map = {
        ".wav": "wav",
        ".mp3": "mp3",
        ".flac": "flac",
        ".ogg": "ogg",
        ".pcm": "pcm16",
    }
    return format_map.get(suffix, "wav")


@app.route("/")
def index():
    """主页"""
    return send_from_directory("static", "index.html")


@app.route("/api/chat/text", methods=["POST"])
def text_chat():
    """文本转语音聊天"""
    data = request.json
    text_input = data.get("text", "")
    voice = data.get("voice", "Cherry")

    if not text_input:
        return jsonify({"error": "No text provided"}), 400

    try:
        completion = client.chat.completions.create(
            model=os.getenv("DASHSCOPE_MODEL_NAME"),
            messages=[
                {
                    "role": "system",
                    "content": "你是一个友好的中文语音助手。请始终用中文回答用户的问题，使用简洁清晰的语言，保持友好亲切的语气。",
                },
                {"role": "user", "content": text_input},
            ],
            modalities=["text", "audio"],
            audio={
                "voice": voice,
                "format": "wav",
            },
            stream=True,
        )

        text_content = ""
        audio_base64_string = ""

        for chunk in completion:
            if chunk.choices:
                delta = chunk.choices[0].delta

                if hasattr(delta, "content") and delta.content:
                    text_content += delta.content

                if hasattr(delta, "audio") and delta.audio:
                    if isinstance(delta.audio, dict):
                        audio_base64_string += delta.audio.get("data", "")
                    elif hasattr(delta.audio, "data") and delta.audio.data:
                        audio_base64_string += delta.audio.data

        # 保存音频文件
        audio_filename = f"{uuid.uuid4().hex}.wav"
        audio_path = f"static/audio/{audio_filename}"

        # 确保目录存在
        os.makedirs("static/audio", exist_ok=True)

        if audio_base64_string:
            save_audio_response(audio_base64_string, audio_path)

            return jsonify(
                {
                    "text": text_content,
                    "audio_url": f"/audio/{audio_filename}",
                    "audio_base64": audio_base64_string,
                }
            )
        else:
            return jsonify(
                {"text": text_content, "audio_url": None, "audio_base64": None}
            )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/chat/audio", methods=["POST"])
def audio_chat():
    """语音转语音聊天"""
    data = request.json
    audio_base64 = data.get("audio")
    voice = data.get("voice", "Cherry")

    if not audio_base64:
        return jsonify({"error": "No audio provided"}), 400

    try:
        # 构建音频数据
        audio_data = f"data:audio/wav;base64,{audio_base64}"

        completion = client.chat.completions.create(
            model=os.getenv("DASHSCOPE_MODEL_NAME"),
            messages=[
                {
                    "role": "system",
                    "content": "你是一个友好的中文语音助手。请始终用中文回答用户的问题，使用简洁清晰的语言，保持友好亲切的语气。",
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "input_audio",
                            "input_audio": {
                                "data": audio_data,
                                "format": "wav",
                            },
                        }
                    ],
                },
            ],
            modalities=["text", "audio"],
            audio={
                "voice": voice,
                "format": "wav",
            },
            stream=True,
        )

        text_content = ""
        audio_base64_string = ""

        for chunk in completion:
            if chunk.choices:
                delta = chunk.choices[0].delta

                if hasattr(delta, "content") and delta.content:
                    text_content += delta.content

                if hasattr(delta, "audio") and delta.audio:
                    if isinstance(delta.audio, dict):
                        audio_base64_string += delta.audio.get("data", "")
                    elif hasattr(delta.audio, "data") and delta.audio.data:
                        audio_base64_string += delta.audio.data

        # 保存音频文件
        audio_filename = f"{uuid.uuid4().hex}.wav"
        audio_path = f"static/audio/{audio_filename}"

        # 确保目录存在
        os.makedirs("static/audio", exist_ok=True)

        if audio_base64_string:
            save_audio_response(audio_base64_string, audio_path)

            return jsonify(
                {
                    "text": text_content,
                    "audio_url": f"/audio/{audio_filename}",
                    "audio_base64": audio_base64_string,
                }
            )
        else:
            return jsonify(
                {"text": text_content, "audio_url": None, "audio_base64": None}
            )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/audio/<filename>")
def serve_audio(filename):
    """提供音频文件"""
    return send_from_directory("static/audio", filename)


if __name__ == "__main__":
    # 确保必要的目录存在
    os.makedirs("static/audio", exist_ok=True)
    app.run(host="0.0.0.0", port=5000, debug=True)
