// ===== 语音角色数据 =====
const VOICE_DATA = [
    // 中文女声
    { id: "Cherry", nameEn: "Cherry", nameCn: "芊悦", desc: "阳光积极、亲切自然小姐姐", category: "chinese-female", gender: "female", emoji: "🌸" },
    { id: "Serena", nameEn: "Serena", nameCn: "苏瑶", desc: "温柔小姐姐", category: "chinese-female", gender: "female", emoji: "🌙" },
    { id: "Chelsie", nameEn: "Chelsie", nameCn: "千雪", desc: "二次元虚拟女友", category: "chinese-female", gender: "female", emoji: "❄️" },
    { id: "Momo", nameEn: "Momo", nameCn: "茉兔", desc: "撒娇搞怪，逗你开心", category: "chinese-female", gender: "female", emoji: "🐰" },
    { id: "Vivian", nameEn: "Vivian", nameCn: "十三", desc: "拽拽的、可爱的小暴躁", category: "chinese-female", gender: "female", emoji: "😤" },
    { id: "Moon", nameEn: "Moon", nameCn: "月白", desc: "率性帅气的月白", category: "chinese-male", gender: "male", emoji: "🌕" },
    { id: "Maia", nameEn: "Maia", nameCn: "四月", desc: "知性与温柔的碰撞", category: "chinese-female", gender: "female", emoji: "🌷" },
    { id: "Bella", nameEn: "Bella", nameCn: "萌宝", desc: "喝酒不打醉拳的小萝莉", category: "chinese-female", gender: "female", emoji: "🎀" },
    { id: "Katerina", nameEn: "Katerina", nameCn: "卡捷琳娜", desc: "御姐音色，韵律回味十足", category: "chinese-female", gender: "female", emoji: "👑" },
    // 中文男声
    { id: "Ethan", nameEn: "Ethan", nameCn: "晨煦", desc: "阳光、温暖、活力、朝气", category: "chinese-male", gender: "male", emoji: "☀️" },
    { id: "Kai", nameEn: "Kai", nameCn: "凯", desc: "耳朵的一场SPA", category: "chinese-male", gender: "male", emoji: "🎧" },
    { id: "Nofish", nameEn: "Nofish", nameCn: "不吃鱼", desc: "不会翘舌音的设计师", category: "chinese-male", gender: "male", emoji: "🐟" },
    { id: "Ryan", nameEn: "Ryan", nameCn: "甜茶", desc: "节奏拉满，戏感炸裂", category: "chinese-male", gender: "male", emoji: "🍵" },
    { id: "Aiden", nameEn: "Aiden", nameCn: "艾登", desc: "精通厨艺的美语大男孩", category: "chinese-male", gender: "male", emoji: "👨‍🍳" },
    // 英文
    { id: "Jennifer", nameEn: "Jennifer", nameCn: "詹妮弗", desc: "品牌级、电影质感般美语女声", category: "english", gender: "female", emoji: "🎬" },
    // 方言
    { id: "Jada", nameEn: "Jada", nameCn: "上海-阿珍", desc: "风风火火的沪上阿姐", category: "dialect", gender: "female", emoji: "🏙️" },
    { id: "Dylan", nameEn: "Dylan", nameCn: "北京-晓东", desc: "北京胡同里长大的少年", category: "dialect", gender: "male", emoji: "🏛️" },
    { id: "Sunny", nameEn: "Sunny", nameCn: "四川-晴儿", desc: "甜到你心里的川妹子", category: "dialect", gender: "female", emoji: "🌶️" },
    { id: "Eric", nameEn: "Eric", nameCn: "四川-程川", desc: "跳脱市井的四川成都男子", category: "dialect", gender: "male", emoji: "🐼" },
    { id: "Li", nameEn: "Li", nameCn: "南京-老李", desc: "耐心的瑜伽老师", category: "dialect", gender: "male", emoji: "🧘" },
    { id: "Marcus", nameEn: "Marcus", nameCn: "陕西-秦川", desc: "面宽话短，心实声沉——老陕的味道", category: "dialect", gender: "male", emoji: "🍜" },
    { id: "Roy", nameEn: "Roy", nameCn: "闽南-阿杰", desc: "诙谐直爽、市井活泼的台湾哥仔", category: "dialect", gender: "male", emoji: "🌊" },
    { id: "Peter", nameEn: "Peter", nameCn: "天津-李彼得", desc: "天津相声，专业捧哏", category: "dialect", gender: "male", emoji: "🎭" },
    { id: "Rocky", nameEn: "Rocky", nameCn: "粤语-阿强", desc: "幽默风趣的阿强，在线陪聊", category: "dialect", gender: "male", emoji: "🦁" },
    { id: "Kiki", nameEn: "Kiki", nameCn: "粤语-阿清", desc: "甜美的港妹闺蜜", category: "dialect", gender: "female", emoji: "🌺" },
    // 多语言
    { id: "Bodega", nameEn: "Bodega", nameCn: "西班牙语-博德加", desc: "热情的西班牙大叔", category: "foreign", gender: "male", emoji: "🇪🇸" },
    { id: "Sonrisa", nameEn: "Sonrisa", nameCn: "西班牙语拉美-索尼莎", desc: "热情开朗的拉美大姐", category: "foreign", gender: "female", emoji: "💃" },
    { id: "Alek", nameEn: "Alek", nameCn: "俄语-阿列克", desc: "战斗民族的冷，毛呢大衣下的暖", category: "foreign", gender: "male", emoji: "🇷🇺" },
    { id: "Dolce", nameEn: "Dolce", nameCn: "意大利语-多尔切", desc: "慵懒的意大利大叔", category: "foreign", gender: "male", emoji: "🇮🇹" },
    { id: "Sohee", nameEn: "Sohee", nameCn: "韩语-素熙", desc: "温柔开朗，情绪丰富的韩国欧尼", category: "foreign", gender: "female", emoji: "🇰🇷" },
    { id: "Ono Anna", nameEn: "Ono Anna", nameCn: "日语-小野杏", desc: "鬼灵精怪的青梅竹马", category: "foreign", gender: "female", emoji: "🇯🇵" },
    { id: "Lenn", nameEn: "Lenn", nameCn: "德语-莱恩", desc: "理性是底色，叛逆藏在细节里", category: "foreign", gender: "male", emoji: "🇩🇪" },
    { id: "Emilien", nameEn: "Emilien", nameCn: "法语-埃米尔安", desc: "浪漫的法国大哥哥", category: "foreign", gender: "male", emoji: "🇫🇷" },
    { id: "Andre", nameEn: "Andre", nameCn: "葡萄牙语欧-安德雷", desc: "声音磁性，自然舒服、沉稳男生", category: "foreign", gender: "male", emoji: "🇵🇹" },
    { id: "Radio Gol", nameEn: "Radio Gol", nameCn: "葡萄牙语巴-拉迪奥戈尔", desc: "足球诗人！用名字为你们解说足球", category: "foreign", gender: "male", emoji: "🇧🇷" },
    // 特色角色
    { id: "Eldric Sage", nameEn: "Eldric Sage", nameCn: "沧明子", desc: "沉稳睿智的老者，沧桑如松却心明如镜", category: "character", gender: "male", emoji: "🧙" },
    { id: "Mia", nameEn: "Mia", nameCn: "乖小妹", desc: "温顺如春水，乖巧如初雪", category: "character", gender: "female", emoji: "🎀" },
    { id: "Mochi", nameEn: "Mochi", nameCn: "沙小弥", desc: "聪明伶俐的小大人，童真未泯却早慧如禅", category: "character", gender: "male", emoji: "👶" },
    { id: "Bellona", nameEn: "Bellona", nameCn: "燕铮莺", desc: "声音洪亮，吐字清晰，金戈铁马入梦来", category: "character", gender: "female", emoji: "⚔️" },
    { id: "Vincent", nameEn: "Vincent", nameCn: "田叔", desc: "独特沙哑烟嗓，道尽千军万马与江湖豪情", category: "character", gender: "male", emoji: "🎤" },
    { id: "Bunny", nameEn: "Bunny", nameCn: "萌小姬", desc: "“萌属性”爆棚的小萝莉", category: "character", gender: "female", emoji: "🐱" },
    { id: "Neil", nameEn: "Neil", nameCn: "阿闻", desc: "平直的语调，字正腔圆，专业新闻主持人", category: "character", gender: "male", emoji: "📺" },
    { id: "Elias", nameEn: "Elias", nameCn: "墨讲师", desc: "保持学科严谨性，复杂知识转化认知模块", category: "character", gender: "male", emoji: "📚" },
    { id: "Arthur", nameEn: "Arthur", nameCn: "徐大爷", desc: "被岁月和旱烟浸泡过的质朴嗓音", category: "character", gender: "male", emoji: "👴" },
    { id: "Nini", nameEn: "Nini", nameCn: "邻家妹妹", desc: "糯米糍一样又软又黏的嗓音", category: "character", gender: "female", emoji: "🍡" },
    { id: "Ebona", nameEn: "Ebona", nameCn: "诡婆婆", desc: "低语像一把生锈的钥匙，转动幽暗角落", category: "character", gender: "female", emoji: "🔮" },
    { id: "Seren", nameEn: "Seren", nameCn: "小婉", desc: "温和舒缓的声线，助你更快进入睡眠", category: "character", gender: "female", emoji: "💤" },
    { id: "Pip", nameEn: "Pip", nameCn: "顽皮小孩", desc: "调皮捣蛋却充满童真，记忆中的小新", category: "character", gender: "male", emoji: "😜" },
    { id: "Stella", nameEn: "Stella", nameCn: "美少女阿月", desc: "甜到发腻的迷糊少女音，代表月亮消灭你", category: "character", gender: "female", emoji: "🌟" },
];

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
        this.selectedVoice = 'Cherry';
        this.aiThinkingMessage = null;

        this.initializeElements();
        this.initializeVoiceSelector();
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

        // 语音选择器相关元素
        this.voiceSelectBtn = document.getElementById('voiceSelectBtn');
        this.selectedVoiceName = document.getElementById('selectedVoiceName');
        this.voiceModal = document.getElementById('voiceModal');
        this.voiceModalClose = document.getElementById('voiceModalClose');
        this.voiceModalBackdrop = this.voiceModal.querySelector('.voice-modal-backdrop');
        this.voiceTabs = document.getElementById('voiceTabs');
        this.voiceGrid = document.getElementById('voiceGrid');
        this.voiceSearch = document.getElementById('voiceSearch');
    }

    // ===== 语音选择器初始化 =====
    initializeVoiceSelector() {
        this.renderVoiceCards();
        this.attachVoiceSelectorEvents();
    }

    renderVoiceCards() {
        this.voiceGrid.innerHTML = '';
        VOICE_DATA.forEach(voice => {
            const card = document.createElement('div');
            card.className = `voice-card${voice.id === this.selectedVoice ? ' selected' : ''}`;
            card.dataset.voiceId = voice.id;
            card.dataset.category = voice.category;
            
            const avatarClass = voice.category === 'dialect' ? 'dialect' : 
                               voice.category === 'foreign' ? 'foreign' :
                               voice.category === 'character' ? 'character' :
                               voice.gender;
            
            card.innerHTML = `
                <div class="voice-card-header">
                    <div class="voice-card-avatar ${avatarClass}">${voice.emoji}</div>
                    <div class="voice-card-name">
                        <div class="name-en">${voice.nameEn}</div>
                        <div class="name-cn">${voice.nameCn}</div>
                    </div>
                </div>
                <div class="voice-card-desc">${voice.desc}</div>
            `;
            
            card.addEventListener('click', () => this.selectVoice(voice));
            this.voiceGrid.appendChild(card);
        });
    }

    attachVoiceSelectorEvents() {
        // 打开模态框
        this.voiceSelectBtn.addEventListener('click', () => this.openVoiceModal());
        
        // 关闭模态框
        this.voiceModalClose.addEventListener('click', () => this.closeVoiceModal());
        this.voiceModalBackdrop.addEventListener('click', () => this.closeVoiceModal());
        
        // ESC关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.voiceModal.classList.contains('active')) {
                this.closeVoiceModal();
            }
        });

        // 分类标签切换
        this.voiceTabs.addEventListener('click', (e) => {
            if (e.target.classList.contains('voice-tab')) {
                this.voiceTabs.querySelectorAll('.voice-tab').forEach(tab => tab.classList.remove('active'));
                e.target.classList.add('active');
                this.filterVoices(e.target.dataset.category, this.voiceSearch.value);
            }
        });

        // 搜索功能
        this.voiceSearch.addEventListener('input', (e) => {
            const activeTab = this.voiceTabs.querySelector('.voice-tab.active');
            this.filterVoices(activeTab.dataset.category, e.target.value);
        });
    }

    openVoiceModal() {
        this.voiceModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.voiceSearch.focus();
    }

    closeVoiceModal() {
        this.voiceModal.classList.remove('active');
        document.body.style.overflow = '';
        this.voiceSearch.value = '';
        this.filterVoices('all', '');
        this.voiceTabs.querySelectorAll('.voice-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === 'all');
        });
    }

    filterVoices(category, searchText) {
        const cards = this.voiceGrid.querySelectorAll('.voice-card');
        const search = searchText.toLowerCase().trim();
        let hasVisible = false;

        cards.forEach(card => {
            const voiceId = card.dataset.voiceId;
            const voice = VOICE_DATA.find(v => v.id === voiceId);
            
            const matchCategory = category === 'all' || card.dataset.category === category;
            const matchSearch = !search || 
                voice.nameEn.toLowerCase().includes(search) ||
                voice.nameCn.includes(search) ||
                voice.desc.includes(search);

            const visible = matchCategory && matchSearch;
            card.classList.toggle('hidden', !visible);
            if (visible) hasVisible = true;
        });

        // 显示无结果提示
        let noResults = this.voiceGrid.querySelector('.no-results');
        if (!hasVisible) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
                        <path d="M16 16L20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <p>未找到匹配的语音角色</p>
                `;
                this.voiceGrid.appendChild(noResults);
            }
            noResults.style.display = 'block';
        } else if (noResults) {
            noResults.style.display = 'none';
        }
    }

    selectVoice(voice) {
        this.selectedVoice = voice.id;
        this.voiceSelect.value = voice.id;
        this.selectedVoiceName.textContent = `${voice.nameEn} / ${voice.nameCn}`;
        
        // 更新卡片选中状态
        this.voiceGrid.querySelectorAll('.voice-card').forEach(card => {
            card.classList.toggle('selected', card.dataset.voiceId === voice.id);
        });
        
        this.closeVoiceModal();
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
        this.showAiThinking();

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
        } finally {
            this.removeAiThinking();
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

    showAiThinking() {
        this.removeAiThinking();
        this.showLoading();

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message ai-thinking';

        messageDiv.innerHTML = `
            <div class="message-avatar ai-avatar">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="message-content">
                <div class="ai-thinking-header">
                    <div class="dot-pulse"><span></span><span></span><span></span></div>
                    <span class="ai-thinking-text">AI正在思考，请稍候...</span>
                </div>
                <div class="ai-thinking-bars">
                    <div class="shimmer-bar bar-1"></div>
                    <div class="shimmer-bar bar-2"></div>
                    <div class="shimmer-bar bar-3"></div>
                </div>
            </div>
        `;

        this.chatMessages.appendChild(messageDiv);
        this.aiThinkingMessage = messageDiv;
        this.scrollToBottom();
    }

    removeAiThinking() {
        if (this.aiThinkingMessage) {
            this.aiThinkingMessage.remove();
            this.aiThinkingMessage = null;
        }
        this.hideLoading();
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
