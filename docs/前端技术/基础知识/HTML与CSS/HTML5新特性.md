# HTML5 新特性

HTML5 是 HTML 标准的第五个重大版本，引入了许多新的特性和改进，使得 Web 开发更加强大和灵活。本文将详细介绍 HTML5 的主要新特性。

## 🏷️ 语义化标签

HTML5 引入了一系列新的语义化标签，让网页结构更加清晰，有利于 SEO 和可访问性。

### 主要语义标签

| 标签 | 描述 | 用途 |
|------|------|------|
| `<header>` | 页面或区域的头部 | 网站标题、导航等 |
| `<nav>` | 导航链接区域 | 主导航、面包屑等 |
| `<main>` | 文档主要内容 | 页面核心内容 |
| `<article>` | 独立的文章内容 | 博客文章、新闻等 |
| `<section>` | 文档中的区域 | 内容分组 |
| `<aside>` | 侧边栏内容 | 相关链接、广告等 |
| `<footer>` | 页面或区域的底部 | 版权信息、联系方式等 |

### 示例代码

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>语义化HTML5页面</title>
</head>
<body>
    <header>
        <h1>网站标题</h1>
        <nav>
            <ul>
                <li><a href="#home">首页</a></li>
                <li><a href="#about">关于</a></li>
                <li><a href="#contact">联系</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <article>
            <header>
                <h2>文章标题</h2>
                <time datetime="2024-01-01">2024年1月1日</time>
            </header>
            <section>
                <p>文章内容...</p>
            </section>
        </article>
        
        <aside>
            <h3>相关文章</h3>
            <ul>
                <li><a href="#">相关文章1</a></li>
                <li><a href="#">相关文章2</a></li>
            </ul>
        </aside>
    </main>
    
    <footer>
        <p>&copy; 2024 网站名称. 保留所有权利.</p>
    </footer>
</body>
</html>
```

## 📝 增强型表单

HTML5 大幅增强了表单功能，提供了新的输入类型、属性和验证机制。

### 新的输入类型

```html
<!-- 邮箱输入 -->
<input type="email" placeholder="请输入邮箱" required>

<!-- 数字输入 -->
<input type="number" min="1" max="100" step="1">

<!-- 日期选择 -->
<input type="date" value="2024-01-01">

<!-- 时间选择 -->
<input type="time">

<!-- 颜色选择 -->
<input type="color" value="#ff0000">

<!-- 范围滑块 -->
<input type="range" min="0" max="100" value="50">

<!-- URL输入 -->
<input type="url" placeholder="https://example.com">

<!-- 搜索框 -->
<input type="search" placeholder="搜索...">
```

### 新的表单属性

```html
<form>
    <!-- 必填项 -->
    <input type="text" required placeholder="必填项">
    
    <!-- 自动聚焦 -->
    <input type="text" autofocus placeholder="页面加载时自动聚焦">
    
    <!-- 自动完成 -->
    <input type="text" autocomplete="name" placeholder="姓名">
    
    <!-- 模式匹配 -->
    <input type="text" pattern="[0-9]{11}" placeholder="11位手机号">
    
    <!-- 多选文件 -->
    <input type="file" multiple>
    
    <button type="submit">提交</button>
</form>
```

## 🎬 多媒体支持

### 视频播放

HTML5 原生支持视频播放，无需插件：

```html
<video width="640" height="480" controls poster="poster.jpg">
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.webm" type="video/webm">
    <source src="movie.ogg" type="video/ogg">
    您的浏览器不支持视频播放
</video>
```

### 音频播放

```html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    您的浏览器不支持音频播放
</audio>
```

### JavaScript 控制

```javascript
const video = document.querySelector('video');

// 播放控制
video.play();
video.pause();

// 事件监听
video.addEventListener('loadeddata', () => {
    console.log('视频数据加载完成');
});

video.addEventListener('ended', () => {
    console.log('视频播放结束');
});
```

## 🎨 Canvas 绘图

Canvas 提供了强大的 2D 绘图能力：

```html
<canvas id="myCanvas" width="500" height="300"></canvas>
```

```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 绘制矩形
ctx.fillStyle = '#ff0000';
ctx.fillRect(10, 10, 100, 50);

// 绘制圆形
ctx.beginPath();
ctx.arc(200, 50, 30, 0, 2 * Math.PI);
ctx.fillStyle = '#00ff00';
ctx.fill();

// 绘制文字
ctx.font = '20px Arial';
ctx.fillStyle = '#000000';
ctx.fillText('Hello Canvas!', 50, 150);

// 绘制图片
const img = new Image();
img.onload = function() {
    ctx.drawImage(img, 300, 10, 100, 100);
};
img.src = 'image.jpg';
```

## 📊 SVG 绘图

SVG (Scalable Vector Graphics) 是可缩放的矢量图形，可以直接嵌入HTML中：

### 基础 SVG 元素

```html
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    <!-- 圆形 -->
    <circle cx="50" cy="50" r="40" fill="red" stroke="black" stroke-width="2" />
    
    <!-- 矩形 -->
    <rect x="120" y="10" width="80" height="60" fill="blue" rx="5" ry="5" />
    
    <!-- 椭圆 -->
    <ellipse cx="250" cy="50" rx="40" ry="25" fill="green" />
    
    <!-- 直线 -->
    <line x1="10" y1="100" x2="290" y2="100" stroke="purple" stroke-width="3" />
    
    <!-- 路径 -->
    <path d="M 50 120 L 100 180 L 150 120 L 100 140 Z" fill="orange" stroke="red" stroke-width="2" />
    
    <!-- 文字 -->
    <text x="10" y="190" font-family="Arial" font-size="16" fill="darkblue">SVG文字示例</text>
</svg>
```

### 高级 SVG 功能

```html
<svg width="400" height="300">
    <!-- 渐变定义 -->
    <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
        </linearGradient>
        
        <!-- 滤镜效果 -->
        <filter id="shadow">
            <feDropShadow dx="3" dy="3" stdDeviation="2" flood-color="gray"/>
        </filter>
    </defs>
    
    <!-- 使用渐变的矩形 -->
    <rect x="10" y="10" width="200" height="100" fill="url(#grad1)" filter="url(#shadow)" />
    
    <!-- 动画 -->
    <circle cx="100" cy="200" r="20" fill="blue">
        <animate attributeName="cx" values="100;300;100" dur="3s" repeatCount="indefinite" />
        <animate attributeName="fill" values="blue;red;blue" dur="3s" repeatCount="indefinite" />
    </circle>
</svg>
```

### JavaScript 操作 SVG

```javascript
// 创建SVG元素
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '200');
svg.setAttribute('height', '200');

// 创建圆形
const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
circle.setAttribute('cx', '100');
circle.setAttribute('cy', '100');
circle.setAttribute('r', '50');
circle.setAttribute('fill', 'blue');

// 添加事件监听
circle.addEventListener('click', function() {
    this.setAttribute('fill', this.getAttribute('fill') === 'blue' ? 'red' : 'blue');
});

svg.appendChild(circle);
document.body.appendChild(svg);
```

### SVG vs Canvas 对比

| 特性 | SVG | Canvas |
|------|-----|--------|
| 图形类型 | 矢量图形 | 位图/栅格图形 |
| DOM操作 | 每个元素都是DOM节点 | 整个画布是一个DOM元素 |
| 事件处理 | 每个图形元素可单独绑定事件 | 只能在整个画布上处理事件 |
| 缩放质量 | 无损缩放 | 缩放时会失真 |
| 动画 | CSS或SMIL动画 | JavaScript逐帧绘制 |
| 性能 | 元素多时性能下降 | 适合复杂动画和游戏 |
| 文件大小 | 复杂图形文件较大 | 文件大小相对固定 |

## 📍 地理定位 API

HTML5 的 Geolocation API 让网页能够获取用户的地理位置信息：

### 基础用法

```javascript
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        // 成功回调
        function(position) {
            const coords = position.coords;
            
            console.log(`纬度: ${coords.latitude}`);
            console.log(`经度: ${coords.longitude}`);
            console.log(`精度: ${coords.accuracy} 米`);
            console.log(`海拔: ${coords.altitude || '未知'}`);
            console.log(`海拔精度: ${coords.altitudeAccuracy || '未知'}`);
            console.log(`方向: ${coords.heading || '未知'}`);
            console.log(`速度: ${coords.speed || '未知'} 米/秒`);
            console.log(`时间戳: ${new Date(position.timestamp)}`);
        },
        // 错误回调
        function(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    console.error("用户拒绝了地理定位请求");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.error("位置信息不可用");
                    break;
                case error.TIMEOUT:
                    console.error("获取位置信息超时");
                    break;
                default:
                    console.error("获取位置时发生未知错误");
                    break;
            }
        },
        // 选项配置
        {
            enableHighAccuracy: true, // 启用高精度
            timeout: 10000,          // 超时时间 10秒
            maximumAge: 60000        // 缓存时间 1分钟
        }
    );
} else {
    console.error("此浏览器不支持地理定位");
}
```

### 实时位置监控

```javascript
let watchId;

function startWatching() {
    watchId = navigator.geolocation.watchPosition(
        function(position) {
            updateMap(position.coords.latitude, position.coords.longitude);
            updateUI(position);
        },
        function(error) {
            console.error("位置监控错误:", error.message);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0 // 不使用缓存
        }
    );
}

function stopWatching() {
    if (watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
        console.log("停止位置监控");
    }
}

function updateUI(position) {
    document.getElementById('latitude').textContent = position.coords.latitude.toFixed(6);
    document.getElementById('longitude').textContent = position.coords.longitude.toFixed(6);
    document.getElementById('accuracy').textContent = position.coords.accuracy.toFixed(0) + ' 米';
    document.getElementById('timestamp').textContent = new Date(position.timestamp).toLocaleString();
}
```

### 实际应用示例

```html
<div id="location-info">
    <button onclick="getCurrentLocation()">获取当前位置</button>
    <button onclick="startWatching()">开始监控位置</button>
    <button onclick="stopWatching()">停止监控</button>
    
    <div id="location-display">
        <p>纬度: <span id="latitude">--</span></p>
        <p>经度: <span id="longitude">--</span></p>
        <p>精度: <span id="accuracy">--</span></p>
        <p>更新时间: <span id="timestamp">--</span></p>
    </div>
</div>
```

## 🖱️ 拖放 API

HTML5 原生支持拖放操作，让用户可以直观地移动页面元素：

### 基础拖放实现

```html
<div class="drag-container">
    <div id="dragItem" class="draggable" draggable="true">
        📦 可拖拽的盒子
    </div>
    
    <div id="dropZone" class="drop-zone">
        🎯 放置区域
    </div>
</div>
```

```css
.draggable {
    width: 100px;
    height: 100px;
    background-color: #3498db;
    color: white;
    text-align: center;
    line-height: 100px;
    cursor: move;
    border-radius: 8px;
    user-select: none;
}

.draggable.dragging {
    opacity: 0.5;
    transform: rotate(5deg);
}

.drop-zone {
    width: 200px;
    height: 150px;
    border: 2px dashed #bdc3c7;
    border-radius: 8px;
    text-align: center;
    line-height: 150px;
    margin-top: 20px;
    transition: all 0.3s ease;
}

.drop-zone.drag-over {
    border-color: #e74c3c;
    background-color: #f8f9fa;
    transform: scale(1.05);
}
```

```javascript
const dragItem = document.getElementById('dragItem');
const dropZone = document.getElementById('dropZone');

// 拖拽开始
dragItem.addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('dragging');
    console.log('开始拖拽:', e.target.id);
});

// 拖拽结束
dragItem.addEventListener('dragend', function(e) {
    e.target.classList.remove('dragging');
    console.log('拖拽结束');
});

// 拖拽元素进入放置区域
dropZone.addEventListener('dragenter', function(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
});

// 拖拽元素在放置区域上方
dropZone.addEventListener('dragover', function(e) {
    e.preventDefault(); // 必须阻止默认行为以允许放置
    e.dataTransfer.dropEffect = 'move';
});

// 拖拽元素离开放置区域
dropZone.addEventListener('dragleave', function(e) {
    e.target.classList.remove('drag-over');
});

// 在放置区域放下元素
dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
    
    const draggedId = e.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(draggedId);
    
    // 将拖拽元素移动到放置区域
    e.target.appendChild(draggedElement);
    console.log('放置成功:', draggedId);
});
```

### 文件拖放上传

```html
<div id="fileDropZone" class="file-drop-zone">
    <p>将文件拖放到这里或点击选择文件</p>
    <input type="file" id="fileInput" multiple style="display: none;">
</div>
<div id="fileList"></div>
```

```javascript
const fileDropZone = document.getElementById('fileDropZone');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');

// 点击选择文件
fileDropZone.addEventListener('click', () => {
    fileInput.click();
});

// 文件输入变化
fileInput.addEventListener('change', handleFiles);

// 拖拽事件
fileDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileDropZone.classList.add('drag-over');
});

fileDropZone.addEventListener('dragleave', () => {
    fileDropZone.classList.remove('drag-over');
});

fileDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    fileDropZone.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    handleFiles({ target: { files } });
});

function handleFiles(e) {
    const files = Array.from(e.target.files);
    fileList.innerHTML = '';
    
    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span>📄 ${file.name}</span>
            <span>${formatFileSize(file.size)}</span>
            <span>${file.type || '未知类型'}</span>
        `;
        fileList.appendChild(fileItem);
        
        // 如果是图片，显示预览
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '100px';
                img.style.maxHeight = '100px';
                fileItem.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
```

## 👷 Web Workers

Web Workers 允许在后台线程中运行 JavaScript，避免阻塞主线程：

### 基础使用

**主线程代码：**
```javascript
// 创建并使用 Worker
const worker = new Worker('worker.js');

// 发送消息
worker.postMessage({ command: 'calculate', data: [1,2,3,4,5] });

// 接收消息
worker.addEventListener('message', function(e) {
    console.log('结果:', e.data.result);
});

// 错误处理
worker.addEventListener('error', function(e) {
    console.error('Worker错误:', e.message);
});
```

**Worker文件 (worker.js)：**
```javascript
// 监听消息
self.addEventListener('message', function(e) {
    const { command, data } = e.data;
    
    if (command === 'calculate') {
        const result = data.reduce((sum, num) => sum + num, 0);
        self.postMessage({ result });
    }
});
```

### 实际应用场景

- **数据处理**：大量数据的计算和转换
- **图像处理**：Canvas图像操作
- **加密解密**：密码学运算
- **实时通信**：WebSocket消息处理

## 💾 Web Storage

HTML5 提供了两种强大的客户端存储方案：

### localStorage (持久存储)

```javascript
// 存储数据
localStorage.setItem('username', 'wangry');
localStorage.setItem('userInfo', JSON.stringify({
    name: 'wangry',
    email: 'user@example.com'
}));

// 读取数据
const username = localStorage.getItem('username');
const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

// 删除数据
localStorage.removeItem('username');
localStorage.clear(); // 清空所有
```

### sessionStorage (会话存储)

```javascript
// API与localStorage相同，但仅在当前会话有效
sessionStorage.setItem('tempData', 'temporary');
const tempData = sessionStorage.getItem('tempData');
```

### 高级存储管理

```javascript
// 带过期时间的存储
class StorageManager {
    static setWithExpiry(key, value, ttl = 3600000) {
        const item = {
            value: value,
            timestamp: Date.now(),
            ttl: ttl
        };
        localStorage.setItem(key, JSON.stringify(item));
    }
    
    static getWithExpiry(key) {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;
        
        const item = JSON.parse(itemStr);
        if (Date.now() - item.timestamp > item.ttl) {
            localStorage.removeItem(key);
            return null;
        }
        
        return item.value;
    }
}

// 使用示例
StorageManager.setWithExpiry('token', 'abc123', 7200000); // 2小时过期
const token = StorageManager.getWithExpiry('token');
```

### 存储对比

| 存储方式 | 容量限制 | 生命周期 | 作用域 |
|----------|----------|----------|--------|
| localStorage | 5-10MB | 永久 | 同源所有标签页 |
| sessionStorage | 5-10MB | 当前会话 | 当前标签页 |
| Cookie | 4KB | 可设置过期 | 可跨域 |

## 🔌 WebSocket

WebSocket 提供全双工实时通信能力：

### 基础连接

```javascript
// 创建连接
const socket = new WebSocket('ws://localhost:8080');

// 连接事件
socket.addEventListener('open', function(event) {
    console.log('连接已建立');
    socket.send('Hello Server!');
});

// 接收消息
socket.addEventListener('message', function(event) {
    console.log('收到消息:', event.data);
});

// 连接关闭
socket.addEventListener('close', function(event) {
    console.log('连接已关闭');
});

// 错误处理
socket.addEventListener('error', function(error) {
    console.error('连接错误:', error);
});
```

### 实际应用示例

```javascript
// 聊天应用
class ChatClient {
    constructor(url) {
        this.socket = new WebSocket(url);
        this.setupEvents();
    }
    
    setupEvents() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.displayMessage(message);
        };
    }
    
    sendMessage(text) {
        const message = {
            type: 'chat',
            text: text,
            timestamp: Date.now()
        };
        this.socket.send(JSON.stringify(message));
    }
    
    displayMessage(message) {
        const chatDiv = document.getElementById('chat');
        chatDiv.innerHTML += `<div>${message.text}</div>`;
    }
}
```

### 心跳检测

```javascript
class WebSocketWithHeartbeat {
    constructor(url) {
        this.url = url;
        this.heartbeatInterval = 30000; // 30秒
        this.connect();
    }
    
    connect() {
        this.socket = new WebSocket(this.url);
        this.socket.onopen = () => this.startHeartbeat();
        this.socket.onclose = () => this.stopHeartbeat();
    }
    
    startHeartbeat() {
        this.heartbeatTimer = setInterval(() => {
            if (this.socket.readyState === WebSocket.OPEN) {
                this.socket.send('ping');
            }
        }, this.heartbeatInterval);
    }
    
    stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
        }
    }
}
```

## 🔧 其他重要特性

### HTML5 中的 meta 标签

HTML5 增强了meta标签的功能，支持更多的页面控制选项：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- 基础设置 -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO 优化 -->
    <meta name="description" content="页面描述，不超过160字符">
    <meta name="keywords" content="关键词1,关键词2,关键词3">
    <meta name="author" content="作者名">
    
    <!-- 社交媒体 -->
    <meta property="og:title" content="页面标题">
    <meta property="og:description" content="页面描述">
    <meta property="og:image" content="https://example.com/image.jpg">
    
    <!-- 缓存控制 -->
    <meta http-equiv="Cache-Control" content="no-cache">
    
    <!-- 安全策略 -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'">
    
    <!-- 移动端优化 -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
</head>
</html>
```

### meta 标签的主要用途

1. **描述文档内容** - SEO和搜索引擎优化
2. **控制页面行为** - 视口设置、缓存策略
3. **声明字符编码** - 确保正确显示
4. **提升安全性** - CSP安全策略
5. **移动端适配** - 响应式设计支持

### cache-control 常用值

- `no-cache` - 强制重新验证
- `no-store` - 不存储任何缓存
- `max-age=3600` - 缓存1小时
- `public` - 可被任何缓存存储
- `private` - 仅可被浏览器缓存

### DOCTYPE 声明

```html
<!DOCTYPE html>
```

HTML5 的 DOCTYPE 声明简化了语法，具有以下作用：

1. **指定文档类型** - 告诉浏览器使用HTML5规范
2. **规范浏览器行为** - 启用标准模式渲染
3. **提供兼容性** - 确保跨浏览器一致性

## 🎯 实际应用场景

### 响应式图片

```html
<picture>
    <source media="(min-width: 800px)" srcset="large.jpg">
    <source media="(min-width: 400px)" srcset="medium.jpg">
    <img src="small.jpg" alt="响应式图片">
</picture>
```

### 表单验证

```html
<form>
    <input type="email" required placeholder="邮箱地址">
    <input type="tel" pattern="[0-9]{11}" placeholder="手机号码">
    <button type="submit">提交</button>
</form>
```

### 离线应用

```javascript
// 检查网络状态
if (navigator.onLine) {
    console.log('在线状态');
} else {
    console.log('离线状态');
}

// 监听网络状态变化
window.addEventListener('online', () => {
    console.log('网络已连接');
});

window.addEventListener('offline', () => {
    console.log('网络已断开');
});
```

## 📱 移动端增强

### 触摸事件

```javascript
// 触摸事件处理
element.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    console.log('触摸开始:', touch.clientX, touch.clientY);
});

element.addEventListener('touchmove', function(e) {
    e.preventDefault(); // 防止滚动
    const touch = e.touches[0];
    console.log('触摸移动:', touch.clientX, touch.clientY);
});

element.addEventListener('touchend', function(e) {
    console.log('触摸结束');
});
```

### 设备方向

```javascript
// 监听设备方向
window.addEventListener('orientationchange', function() {
    console.log('屏幕方向:', screen.orientation.angle);
});

// 监听设备运动
window.addEventListener('devicemotion', function(event) {
    console.log('加速度:', event.acceleration);
    console.log('旋转速率:', event.rotationRate);
});
```

## 📊 性能监控

### Performance API

```javascript
// 页面性能数据
const perfData = performance.getEntriesByType('navigation')[0];
console.log('页面加载时间:', perfData.loadEventEnd - perfData.fetchStart);
console.log('DNS查询时间:', perfData.domainLookupEnd - perfData.domainLookupStart);

// 资源加载性能
const resources = performance.getEntriesByType('resource');
resources.forEach(resource => {
    console.log(`${resource.name}: ${resource.duration}ms`);
});

// 自定义性能标记
performance.mark('start-operation');
// ... 执行操作
performance.mark('end-operation');
performance.measure('operation-duration', 'start-operation', 'end-operation');
```

## 🌐 浏览器兼容性

### 特性检测

```javascript
// 检测HTML5特性支持
const featureSupport = {
    localStorage: typeof(Storage) !== "undefined",
    webSocket: typeof(WebSocket) !== "undefined",
    canvas: !!document.createElement('canvas').getContext,
    video: !!document.createElement('video').canPlayType,
    geolocation: !!navigator.geolocation,
    webWorkers: typeof(Worker) !== "undefined"
};

console.log('浏览器特性支持:', featureSupport);
```

### Polyfill 示例

```javascript
// localStorage polyfill (简化版)
if (!window.localStorage) {
    window.localStorage = {
        data: {},
        getItem: function(key) {
            return this.data[key] || null;
        },
        setItem: function(key, value) {
            this.data[key] = value;
        },
        removeItem: function(key) {
            delete this.data[key];
        }
    };
}
```

## 📚 总结

HTML5 的新特性极大地扩展了Web开发的边界：

### 🎯 核心优势

- **语义化增强** - 更好的SEO和可访问性
- **多媒体原生支持** - 无需插件播放音视频
- **强大的API** - 地理定位、本地存储、实时通信
- **图形绘制能力** - Canvas和SVG支持
- **移动端优化** - 触摸事件和响应式特性

### 🚀 实际应用

- **单页应用(SPA)** - 利用History API和本地存储
- **实时应用** - WebSocket实现即时通信
- **离线应用** - Service Worker和本地存储
- **游戏开发** - Canvas和WebGL技术
- **移动Web应用** - 响应式设计和触摸交互

### 📈 发展趋势

HTML5 为现代Web应用奠定了基础，随着浏览器支持的不断完善，这些特性已成为Web开发的标准配置。掌握这些技术对于构建高质量的Web应用至关重要。

## 📖 参考资料

- [MDN HTML5 文档](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)
- [W3C HTML5 规范](https://www.w3.org/TR/html52/)
- [Can I Use - 兼容性查询](https://caniuse.com/)
- [HTML5 实战指南](https://www.cnblogs.com/jane-panyiyun/p/13092297.html)
- [HTML5 新特性详解](https://juejin.cn/post/7246206157899595834)
