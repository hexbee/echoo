// ===== 应用状态管理 =====
class VoiceChatApp {
    constructor() {
        this.isRecording = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.currentStream = null;
        this.audioContext = null;
        this.analyser = null;
        this.dataArray = null;
        this.waveformInterval = null;
        this.isCtrlPressed = false;

        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        // 获取DOM元素
        this.chatMessages = document.getElementById('chatMessages');
        this.voiceSelect = document.getElementById('voiceSelect');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.audioPlayer = document.getElementById('audioPlayer');

        // 悬浮按钮相关元素
        this.floatingVoiceBtn = document.getElementById('floatingVoiceBtn');
        this.floatingBtnInner = this.floatingVoiceBtn.querySelector('.floating-btn-inner');
    }

    attachEventListeners() {
        // 悬浮按钮 - 支持按住和点击
        this.floatingBtnInner.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.startRecording();
        });

        this.floatingBtnInner.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startRecording();
        });

        // 鼠标和触摸结束事件
        document.addEventListener('mouseup', () => {
            if (this.isRecording) {
                this.stopRecording();
            }
        });

        document.addEventListener('touchend', () => {
            if (this.isRecording) {
                this.stopRecording();
            }
        });

        // 键盘事件 - Ctrl键控制
        document.addEventListener('keydown', (e) => {
            // 检测右侧Ctrl键 (location === 2)
            if (e.key === 'Control' && e.location === 2 && !this.isCtrlPressed) {
                e.preventDefault();
                this.isCtrlPressed = true;
                document.body.classList.add('keyboard-active');
                this.startRecording();
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'Control' && e.location === 2 && this.isCtrlPressed) {
                e.preventDefault();
                this.isCtrlPressed = false;
                document.body.classList.remove('keyboard-active');
                if (this.isRecording) {
                    this.stopRecording();
                }
            }
        });

        // 防止右键菜单干扰
        this.floatingBtnInner.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }

    // ===== 语音录制功能 =====
    async startRecording() {
        if (this.isRecording) return;

        try {
            this.isRecording = true;
            this.floatingVoiceBtn.classList.add('recording');

            // 请求麦克风权限
            this.currentStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            });

            // 创建音频上下文和分析器用于波形显示
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            const bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(bufferLength);

            const source = this.audioContext.createMediaStreamSource(this.currentStream);
            source.connect(this.analyser);

            // 创建MediaRecorder
            this.mediaRecorder = new MediaRecorder(this.currentStream, {
                mimeType: 'audio/webm;codecs=opus'
            });

            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.audioChunks.push(event.data);
                }
            };

            this.mediaRecorder.onstop = () => {
                this.processRecording();
            };

            this.mediaRecorder.start(100);

            // 开始波形动画
            this.startWaveform();

        } catch (error) {
            console.error('录音失败:', error);
            this.showError('无法访问麦克风，请检查权限设置');
            this.resetRecordingState();
        }
    }

    stopRecording() {
        if (!this.isRecording || !this.mediaRecorder) return;

        // 停止波形动画
        this.stopWaveform();

        this.mediaRecorder.stop();
        this.currentStream.getTracks().forEach(track => track.stop());
    }

    async processRecording() {
        if (this.audioChunks.length === 0) {
            this.resetRecordingState();
            return;
        }

        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });

        // 保存用户录音URL，用于播放
        const userAudioUrl = URL.createObjectURL(audioBlob);

        // 显示用户语音消息
        this.addMessage('user', '', true, userAudioUrl);

        // 停止录音后，显示"AI正在思考"状态
        this.resetRecordingState();

        try {
            // 转换为base64
            const base64Audio = await this.blobToBase64(audioBlob);

            // 发送到服务器
            const response = await this.sendAudioToServer(base64Audio);

            // 显示AI回复
            if (response.text) {
                this.addMessage('ai', response.text);

                // 播放AI回复音频
                this.playAudioResponse(response);
            }
        } catch (error) {
            console.error('处理录音失败:', error);
            this.showError('处理语音消息失败，请重试');
            this.removeLastMessage();
        }
    }

    resetRecordingState() {
        this.isRecording = false;
        this.floatingVoiceBtn.classList.remove('recording');
        this.audioChunks = [];
        this.currentStream = null;

        // 清理音频上下文
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        this.analyser = null;
        this.dataArray = null;
    }

    // ===== 波形可视化功能 =====
    startWaveform() {
        // 创建波形容器
        let waveformContainer = document.getElementById('waveformContainer');
        if (!waveformContainer) {
            waveformContainer = document.createElement('div');
            waveformContainer.id = 'waveformContainer';
            waveformContainer.className = 'waveform-container';
            waveformContainer.innerHTML = '<canvas id="waveformCanvas"></canvas>';
            document.body.appendChild(waveformContainer);
        }

        const canvas = document.getElementById('waveformCanvas');
        const ctx = canvas.getContext('2d');

        // 设置canvas尺寸
        canvas.width = waveformContainer.offsetWidth;
        canvas.height = waveformContainer.offsetHeight;

        // 开始动画
        this.waveformInterval = setInterval(() => {
            if (!this.analyser || !this.dataArray) return;

            this.analyser.getByteFrequencyData(this.dataArray);

            // 清空画布
            ctx.fillStyle = 'rgba(10, 14, 39, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 绘制波形
            const barWidth = (canvas.width / this.dataArray.length) * 2.5;
            let x = 0;

            for (let i = 0; i < this.dataArray.length; i++) {
                const barHeight = (this.dataArray[i] / 255) * canvas.height;

                // 创建渐变色
                const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
                gradient.addColorStop(0, '#00f3ff');
                gradient.addColorStop(1, '#ff00ff');

                ctx.fillStyle = gradient;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

                x += barWidth + 1;
            }
        }, 50);
    }

    stopWaveform() {
        if (this.waveformInterval) {
            clearInterval(this.waveformInterval);
            this.waveformInterval = null;
        }

        // 移除波形容器
        const waveformContainer = document.getElementById('waveformContainer');
        if (waveformContainer) {
            waveformContainer.remove();
        }
    }

    // ===== API交互 =====
    async sendAudioToServer(base64Audio) {
        const response = await fetch('/api/chat/audio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                audio: base64Audio,
                voice: this.voiceSelect.value
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || '服务器错误');
        }

        return data;
    }

    // ===== 音频播放 =====
    playAudioResponse(response) {
        try {
            // 优先使用服务器URL，如果没有则使用base64
            let audioUrl;

            if (response.audio_url) {
                audioUrl = response.audio_url;
                console.log('使用服务器音频URL:', audioUrl);
            } else if (response.audio_base64) {
                const audioBlob = this.base64ToBlob(response.audio_base64, 'audio/wav');
                audioUrl = URL.createObjectURL(audioBlob);
                console.log('使用base64音频数据');
            } else {
                console.log('没有音频数据');
                return;
            }

            // 添加播放控制UI
            this.addAudioPlayer(audioUrl);

            console.log('AI语音已生成，请点击播放按钮收听');
        } catch (error) {
            console.error('音频处理失败:', error);
            this.showError('音频处理失败，请重试');
        }
    }

    addAudioPlayer(audioUrl) {
        const lastMessage = this.chatMessages.lastElementChild;
        if (!lastMessage) return;

        const audioPlayer = document.createElement('div');
        audioPlayer.className = 'audio-player';
        audioPlayer.innerHTML = `
            <div class="voice-message">
                <div class="voice-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12V4C10 2.89543 10.8954 2 12 2Z" fill="currentColor"/>
                        <path d="M19 10V12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12V10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <path d="M12 19V22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <path d="M8 22H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
                <div class="voice-wave">
                    <div class="wave-bar"></div>
                    <div class="wave-bar"></div>
                    <div class="wave-bar"></div>
                    <div class="wave-bar"></div>
                    <div class="wave-bar"></div>
                </div>
            </div>
        `;

        const voiceMessage = audioPlayer.querySelector('.voice-message');
        voiceMessage.addEventListener('click', () => {
            this.togglePlay(audioUrl, voiceMessage);
        });

        lastMessage.querySelector('.message-content').appendChild(audioPlayer);
    }

    togglePlay(audioUrl, voiceMessageElement) {
        // 如果当前正在播放此音频，则停止
        if (this.audioPlayer.src && this.audioPlayer.src.includes(audioUrl) && !this.audioPlayer.paused) {
            this.audioPlayer.pause();
            this.audioPlayer.currentTime = 0;
            voiceMessageElement.classList.remove('playing');
            return;
        }

        // 设置新的音频源
        this.audioPlayer.src = audioUrl;
        this.audioPlayer.currentTime = 0;

        // 播放音频
        const playPromise = this.audioPlayer.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    voiceMessageElement.classList.add('playing');
                })
                .catch(error => {
                    console.error('播放音频失败:', error);
                    this.showError('音频播放失败: ' + error.message);
                });
        }

        // 播放结束时移除播放状态
        this.audioPlayer.onended = () => {
            voiceMessageElement.classList.remove('playing');
            this.audioPlayer.currentTime = 0;
        };

        // 错误处理
        this.audioPlayer.onerror = (e) => {
            console.error('音频加载/播放错误:', e);
            voiceMessageElement.classList.remove('playing');
            this.showError('音频播放失败，请检查音频文件');
        };
    }

    // ===== 消息管理 =====
    addMessage(type, content, isTemp = false, userAudioUrl = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;

        const avatar = type === 'ai' ? 'ai-avatar' : 'user-avatar';
        const avatarIcon = type === 'ai' ?
            '<path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' :
            '<circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M6 20C6 16 9 14 12 14C15 14 18 16 18 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';

        // 只有当有文本内容时才渲染 message-text
        const messageTextHtml = content ? `<div class="message-text">${content}</div>` : '';

        let messageContent = `
            <div class="message-avatar ${avatar}">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    ${avatarIcon}
                </svg>
            </div>
            <div class="message-content">
                ${messageTextHtml}
            </div>
        `;

        messageDiv.innerHTML = messageContent;

        // 先添加到DOM中
        this.chatMessages.appendChild(messageDiv);

        // 如果是用户语音消息，添加语音条
        if (userAudioUrl && type === 'user') {
            this.addAudioPlayerToElement(messageDiv, userAudioUrl);
        }

        this.scrollToBottom();

        if (isTemp) {
            messageDiv.classList.add('temp-message');
        }
    }

    // 向指定元素添加音频播放器
    addAudioPlayerToElement(messageElement, audioUrl) {
        const audioPlayer = document.createElement('div');
        audioPlayer.className = 'audio-player';
        audioPlayer.innerHTML = `
            <div class="voice-message">
                <div class="voice-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12V4C10 2.89543 10.8954 2 12 2Z" fill="currentColor"/>
                        <path d="M19 10V12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12V10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <path d="M12 19V22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <path d="M8 22H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
                <div class="voice-wave">
                    <div class="wave-bar"></div>
                    <div class="wave-bar"></div>
                    <div class="wave-bar"></div>
                    <div class="wave-bar"></div>
                    <div class="wave-bar"></div>
                </div>
            </div>
        `;

        const voiceMessage = audioPlayer.querySelector('.voice-message');
        voiceMessage.addEventListener('click', () => {
            this.togglePlay(audioUrl, voiceMessage);
        });

        messageElement.querySelector('.message-content').appendChild(audioPlayer);
    }

    removeLastMessage() {
        const lastMessage = this.chatMessages.lastElementChild;
        if (lastMessage && lastMessage.classList.contains('temp-message')) {
            lastMessage.remove();
        }
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    // ===== 工具函数 =====
    blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                resolve(base64String);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    base64ToBlob(base64, mimeType) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    }

    showLoading() {
        this.loadingOverlay.classList.add('active');
    }

    hideLoading() {
        this.loadingOverlay.classList.remove('active');
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-toast';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ff3366, #ff00aa);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 25px rgba(255, 51, 102, 0.5);
            z-index: 2000;
            animation: slideInRight 0.3s ease-out;
            font-family: 'Outfit', sans-serif;
            font-weight: 500;
        `;

        document.body.appendChild(errorDiv);

        setTimeout(() => {
            errorDiv.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => errorDiv.remove(), 300);
        }, 3000);
    }
}

// ===== 初始化应用 =====
document.addEventListener('DOMContentLoaded', () => {
    new VoiceChatApp();
});

// ===== 添加动画样式 =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
