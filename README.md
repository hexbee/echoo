# AI语音助手 - Echoo

基于 Flask + DashScope 的实时语音对话 Web 应用，提供未来感 UI、按住说话的交互、语音角色选择和语音播放体验。

## 已实现功能

- 按住悬浮麦克风按钮或右侧 Ctrl 键录音，实时波形可视化与录音状态动画。
- 语音消息发送到 DashScope，流式返回文本与语音，自动展示消息并可点击播放生成的语音。
- 语音角色选择面板：分类、搜索与高亮选中，包含多种中文/英文/方言/特色声音。
- “AI 正在思考”加载态、错误提示气泡，以及生成语音文件缓存到 `static/audio/` 便于复用播放。

## 技术栈

- **后端**: Flask、Flask-CORS、OpenAI SDK（DashScope 兼容模式）、soundfile、numpy
- **前端**: 原生 HTML/CSS/JavaScript、Web Audio API 录音、Fetch API、CSS 动画

## 项目结构

```
.
├── app.py                # Flask 服务，提供语音/文本接口与静态资源
├── main.py               # CLI 示例：文本或文件音频对话
├── static/
│   ├── index.html        # 主页面
│   ├── css/style.css     # 霓虹未来感样式与动画
│   ├── js/app.js         # 录音、波形、播放、语音选择逻辑
│   └── audio/            # 生成语音缓存目录（运行时创建）
├── .env.example          # 环境变量示例
├── pyproject.toml
├── uv.lock
└── README.md
```

## 快速开始

1) 安装依赖（Python 3.11+）

```bash
# 推荐：使用 uv
uv sync

# 或使用 pip
python -m pip install -e .
```

2) 配置环境变量（复制 .env.example 为 .env 并填写）

```
DASHSCOPE_API_KEY=your_api_key
DASHSCOPE_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
DASHSCOPE_MODEL_NAME=qwen3-omni-flash-2025-12-01
```

3) 启动 Web 应用

```bash
python app.py
```

访问 `http://localhost:5000`，首次使用请允许浏览器麦克风权限。

## 使用方式（前端）

- 按住页面右下角麦克风或右侧 Ctrl 键开始录音，松开即发送；录音时展示霓虹波形与录制状态。
- 录音发送后展示“AI 正在思考”并流式生成回复；AI 消息含文本与可点击播放的语音波形条。
- 右上角“语音角色”按钮打开角色选择弹窗，可按分类/搜索挑选，选中后用于后续合成声音。
- 生成的语音会缓存到 `static/audio/` 目录，便于重复播放；若需要可手动清理缓存。

## API 接口（后端）

- `POST /api/chat/audio`

  请求体示例：
  ```json
  {
    "audio": "<base64_audio>",
    "voice": "Cherry"
  }
  ```
  `audio` 为浏览器录音的 base64（前端会转换为 `data:audio/wav;base64,...` 发送），服务端流式生成文本与语音并返回 `text`、`audio_url`、`audio_base64`。

- `POST /api/chat/text`

  请求体示例：
  ```json
  {
    "text": "你好",
    "voice": "Cherry"
  }
  ```
  直接以文本请求，返回同样的文本与语音字段，可用于自建前端或 CLI。

## 其他说明

- CLI 体验：`python main.py <input_audio_or_url> [output.wav]`（不传参数则默认用示例文本对话）。
- 浏览器需在 HTTPS 或 localhost 场景下才能访问麦克风。
- 如果出现录音或播放异常，可检查麦克风授权、网络及浏览器控制台错误；必要时清理 `static/audio/` 缓存。
