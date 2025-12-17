# AI语音助手 - Web版本

一个基于Flask和DashScope的实时语音对话Web应用，具有未来科技感的界面设计。

## 功能特性

### ✨ 核心功能
- **语音对话**: 点击麦克风按钮开始/停止录音，与AI进行语音交互
- **波形可视化**: 录音时实时显示音频波形，提供视觉反馈
- **文本对话**: 输入文本，AI回复并生成语音
- **多种音色**: 支持Cherry、Serena、Ethan、Chelsie四种语音角色
- **实时播放**: AI回复自动播放语音，可重复播放

### 🎨 界面设计
- **未来科技感**: 深色主题 + 霓虹色彩
- **动态背景**: 渐变球体动画 + 网格背景
- **发光效果**: 按钮、边框、文字发光特效
- **流畅动画**: 消息滑入、按钮悬浮、加载动画
- **响应式设计**: 支持桌面端和移动端

## 技术栈

### 后端
- **Flask**: Web框架
- **DashScope**: 阿里云通义千问API
- **OpenAI SDK**: Python客户端
- **soundfile**: 音频处理
- **numpy**: 数值计算

### 前端
- **原生HTML/CSS/JavaScript**: 无框架依赖
- **Web Audio API**: 浏览器录音
- **Fetch API**: 异步请求
- **CSS动画**: 视觉效果

## 项目结构

```
native_audio/
├── app.py                 # Flask主程序
├── main.py               # 原始命令行版本
├── static/               # 静态文件目录
│   ├── index.html        # 主页面
│   ├── css/
│   │   └── style.css     # 样式文件
│   ├── js/
│   │   └── app.js        # 前端逻辑
│   └── audio/            # 音频文件缓存目录
├── .env                  # 环境变量
└── README.md            # 说明文档
```

## 安装与运行

### 1. 环境准备

确保已安装Python 3.11+和必要的依赖：

```bash
# 安装依赖
pip install flask flask-cors openai python-dotenv soundfile numpy
```

### 2. 配置环境变量

编辑`.env`文件，设置您的DashScope API密钥：

```bash
DASHSCOPE_API_KEY=your_api_key_here
DASHSCOPE_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
DASHSCOPE_MODEL_NAME=qwen-plus  # 或其他支持的模型
```

### 3. 启动应用

```bash
python app.py
```

应用将在 `http://localhost:5000` 启动

### 4. 访问应用

打开浏览器访问: `http://localhost:5000`

## 使用说明

### 语音对话
1. 点击**点击说话**按钮开始录音
2. 对着麦克风说话，观察实时波形显示
3. 再次点击按钮停止录音
4. AI将处理您的语音并自动播放回复语音

### 文本对话
1. 在文本框中输入您的问题
2. 点击发送按钮或按Enter键
3. AI将回复并生成语音

### 切换语音
使用右上角的**语音角色**下拉菜单选择不同的AI声音

## API接口

### POST /api/chat/text
文本转语音对话

**请求体:**
```json
{
    "text": "你好",
    "voice": "Cherry"
}
```

### POST /api/chat/audio
语音转语音对话

**请求体:**
```json
{
    "audio": "base64_audio_data",
    "voice": "Cherry"
}
```

## 浏览器兼容性

- Chrome 88+
- Firefox 85+
- Safari 14.1+
- Edge 88+

**注意**: 需要HTTPS或localhost才能访问麦克风API

## 注意事项

1. **麦克风权限**: 首次使用需要允许浏览器访问麦克风
2. **网络要求**: 需要稳定的网络连接访问DashScope API
3. **音频格式**: 支持WAV、MP3、FLAC、OGG等常见格式
4. **缓存清理**: `static/audio/`目录会缓存生成的音频文件，可定期清理

## 自定义配置

### 修改语音角色
在`static/js/app.js`中的`voiceSelect`选项中添加新角色

### 调整界面主题
编辑`static/css/style.css`中的CSS变量

### 修改默认语音
在`app.py`中修改`voice`参数默认值

## 故障排除

### 录音失败
- 检查麦克风权限
- 确保使用HTTPS或localhost
- 查看浏览器控制台错误信息

### API调用失败
- 验证API密钥是否正确
- 检查网络连接
- 确认模型名称有效

### 音频无法播放
- 检查浏览器音频设置
- 确保音频格式兼容
- 尝试刷新页面

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！

---

**享受与AI的未来对话体验！** 🚀
