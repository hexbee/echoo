import os
import base64
from pathlib import Path
from openai import OpenAI
from dotenv import load_dotenv
import numpy as np
import soundfile as sf

# 加载 .env 文件
load_dotenv()

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
    print(f"音频已保存到: {output_path}")


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


def audio_chat(input_audio_path: str, output_audio_path: str = "output.wav"):
    """
    音频对话：输入音频 -> LLM 理解 -> 输出音频

    注意: DashScope 的 input_audio.data 需要传入 URL 或 base64 字符串
    如果是本地文件，需要先上传到可访问的 URL，或使用 base64 编码

    Args:
        input_audio_path: 输入音频文件路径或 URL
        output_audio_path: 输出音频文件路径
    """
    input_format = get_audio_format(input_audio_path)

    # 判断是 URL 还是本地文件
    if input_audio_path.startswith(("http://", "https://")):
        # URL 直接使用
        audio_data = input_audio_path
        print(f"正在处理音频 URL: {input_audio_path}")
    else:
        # 本地文件转 base64
        if not os.path.exists(input_audio_path):
            print(f"错误: 输入音频文件不存在: {input_audio_path}")
            return
        audio_data = "data:audio/{};base64,{}".format(
            input_format, encode_audio_to_base64(input_audio_path)
        )
        print(f"正在处理本地音频: {input_audio_path}")

    print(f"音频格式: {input_format}")
    print("-" * 50)

    try:
        # 创建带音频输入和输出的 chat completion
        completion = client.chat.completions.create(
            model=os.getenv("DASHSCOPE_MODEL_NAME"),
            messages=[
                {
                    "role": "system",
                    "content": "你是一个友好的语音助手，请用简洁清晰的语言回答用户的问题。",
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "input_audio",
                            "input_audio": {
                                "data": audio_data,
                                "format": input_format,
                            },
                        }
                    ],
                },
            ],
            # 设置输出模态：文本 + 音频
            modalities=["text", "audio"],
            # 设置输出音频参数
            audio={
                "voice": "Cherry",  # 可选: Cherry, Serena, Ethan, Chelsie 等
                "format": "wav",  # DashScope 输出格式固定为 wav
            },
            stream=True,
            stream_options={"include_usage": True},
        )

        # 收集响应
        text_content = ""
        audio_base64_string = ""

        print("AI 回复:")
        for chunk in completion:
            if chunk.choices:
                delta = chunk.choices[0].delta

                # 处理文本内容
                if hasattr(delta, "content") and delta.content:
                    text_content += delta.content
                    print(delta.content, end="", flush=True)

                # 处理音频内容 (DashScope 返回的是 dict)
                if hasattr(delta, "audio") and delta.audio:
                    if isinstance(delta.audio, dict):
                        audio_base64_string += delta.audio.get("data", "")
                    elif hasattr(delta.audio, "data") and delta.audio.data:
                        audio_base64_string += delta.audio.data
            else:
                # 处理 usage 信息
                if chunk.usage:
                    print(f"\n\n[Token 使用: {chunk.usage}]")

        print()
        print("-" * 50)

        # 保存输出音频
        if audio_base64_string:
            save_audio_response(audio_base64_string, output_audio_path)
        else:
            print("警告: 未收到音频数据")

    except Exception as e:
        print(f"错误: {e}")
        raise


def text_to_audio_chat(text_input: str, output_audio_path: str = "output.wav"):
    """
    文本对话并输出音频

    Args:
        text_input: 输入文本
        output_audio_path: 输出音频文件路径
    """
    print(f"输入文本: {text_input}")
    print("-" * 50)

    try:
        completion = client.chat.completions.create(
            model=os.getenv("DASHSCOPE_MODEL_NAME"),
            messages=[
                {
                    "role": "system",
                    "content": "你是一个友好的语音助手，请用简洁清晰的语言回答用户的问题。",
                },
                {"role": "user", "content": text_input},
            ],
            modalities=["text", "audio"],
            audio={
                "voice": "Cherry",
                "format": "wav",
            },
            stream=True,
            stream_options={"include_usage": True},
        )

        text_content = ""
        audio_base64_string = ""

        print("AI 回复:")
        for chunk in completion:
            if chunk.choices:
                delta = chunk.choices[0].delta

                if hasattr(delta, "content") and delta.content:
                    text_content += delta.content
                    print(delta.content, end="", flush=True)

                if hasattr(delta, "audio") and delta.audio:
                    if isinstance(delta.audio, dict):
                        audio_base64_string += delta.audio.get("data", "")
                    elif hasattr(delta.audio, "data") and delta.audio.data:
                        audio_base64_string += delta.audio.data
            else:
                if chunk.usage:
                    print(f"\n\n[Token 使用: {chunk.usage}]")

        print()
        print("-" * 50)

        if audio_base64_string:
            save_audio_response(audio_base64_string, output_audio_path)
        else:
            print("警告: 未收到音频数据")

    except Exception as e:
        print(f"错误: {e}")
        raise


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1:
        # 如果提供了音频文件路径或 URL，进行音频对话
        input_audio = sys.argv[1]
        output_audio = sys.argv[2] if len(sys.argv) > 2 else "output.wav"
        audio_chat(input_audio, output_audio)
    else:
        # 默认使用文本输入测试
        text_to_audio_chat("你好，请介绍一下你自己")
