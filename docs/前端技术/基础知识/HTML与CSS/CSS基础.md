# CSS 基础

CSS (Cascading Style Sheets) 层叠样式表是一种用于描述HTML文档外观和格式的样式表语言。本文将全面介绍CSS的基础知识和核心概念。

## 🎯 CSS 构建原理

### 层叠与继承

CSS中有三个重要概念决定了样式如何应用：**层叠**、**优先级**和**继承**。

#### 🔄 继承机制

某些CSS属性会从父元素继承到子元素，而某些则不会：

```css
/* 会继承的属性 */
body {
    color: #333;           /* 文字颜色会继承 */
    font-family: Arial;    /* 字体会继承 */
    font-size: 16px;       /* 字体大小会继承 */
}

/* 不会继承的属性 */
div {
    width: 300px;          /* 宽度不会继承 */
    margin: 20px;          /* 外边距不会继承 */
    border: 1px solid red; /* 边框不会继承 */
}
```

#### 🎛️ 控制继承

CSS提供了5个特殊的通用属性值来控制继承：

```css
/* 继承控制值 */
.inherit-demo {
    color: inherit;        /* 强制继承父元素的值 */
    margin: initial;       /* 使用属性的初始值 */
    padding: revert;       /* 重置为浏览器默认样式 */
    border: revert-layer;  /* 重置为上一层叠层的值 */
    background: unset;     /* 自然值：继承或初始值 */
}

/* 重置所有属性 */
.reset-all {
    all: unset;            /* 重置所有属性 */
}
```

#### ⚖️ 层叠规则

样式的应用遵循以下优先级顺序（从低到高）：

1. **资源顺序** - 后面的规则覆盖前面的
2. **优先级** - 根据选择器计算权重
3. **重要程度** - `!important` 声明

#### 🏆 优先级计算

优先级按"千百十个"四位数计算：

| 选择器类型 | 权重值 | 示例 |
|------------|--------|------|
| 内联样式 | 1000 | `<div style="color: red">` |
| ID选择器 | 100 | `#header` |
| 类/属性/伪类 | 10 | `.nav`, `[type="text"]`, `:hover` |
| 元素/伪元素 | 1 | `div`, `::before` |

```css
/* 优先级示例 */
div p { color: blue; }           /* 权重: 2 (0,0,0,2) */
.content p { color: green; }     /* 权重: 11 (0,0,1,1) */
#main .content p { color: red; } /* 权重: 111 (0,1,1,1) */
p { color: purple !important; }  /* !important 最高优先级 */
```

## 🎨 CSS 选择器

### 基础选择器

#### 类型选择器
```css
/* 元素选择器 */
h1 { font-size: 2em; }
p { line-height: 1.6; }
img { max-width: 100%; }
```

#### 类选择器
```css
/* 基础类选择器 */
.highlight { background-color: yellow; }
.btn { padding: 10px 20px; }

/* 组合类选择器 */
.btn.primary { background-color: blue; }
.card.featured { border: 2px solid gold; }

/* 特定元素的类 */
span.highlight { font-weight: bold; }
```

#### ID选择器
```css
/* ID选择器（应谨慎使用） */
#header { background: #f0f0f0; }
#navigation { position: fixed; }

/* 组合使用 */
h1#main-title { color: #333; }
```

#### 全局选择器
```css
/* 通用重置 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 针对特定上下文 */
.modal * { color: inherit; }
```

### 🏷️ 属性选择器

```css
/* 存在性选择器 */
[title] { border-bottom: 1px dotted; }
[required] { border-color: red; }

/* 值匹配选择器 */
[type="email"] { background-image: url(email-icon.png); }
[lang="zh"] { font-family: "Microsoft YaHei"; }

/* 部分值匹配 */
[class~="btn"] { /* 包含完整单词 btn */ }
[href^="https"] { /* 以 https 开头 */ }
[href$=".pdf"] { /* 以 .pdf 结尾 */ }
[title*="重要"] { /* 包含"重要"字符串 */ }

/* 大小写不敏感匹配 */
[href*="GITHUB" i] { text-transform: lowercase; }
```

### 🎭 伪类与伪元素

#### 常用伪类
```css
/* 用户交互伪类 */
a:hover { color: blue; }
button:active { transform: scale(0.98); }
input:focus { outline: 2px solid blue; }

/* 结构伪类 */
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
tr:nth-child(even) { background-color: #f5f5f5; }
p:nth-of-type(3) { margin-top: 2em; }

/* 状态伪类 */
input:checked + label { color: green; }
input:disabled { opacity: 0.5; }
form:valid { border-color: green; }
```

#### 伪元素
```css
/* 内容生成 */
.quote::before {
    content: """;
    font-size: 2em;
    color: #666;
}

.quote::after {
    content: """;
    font-size: 2em;
    color: #666;
}

/* 样式化特定部分 */
p::first-line {
    font-weight: bold;
    color: #333;
}

p::first-letter {
    font-size: 3em;
    float: left;
    line-height: 1;
}

/* 选中文本样式 */
::selection {
    background-color: #b3d4fc;
    color: #000;
}
```

### 🔗 关系选择器

```css
/* 后代选择器（空格） */
.sidebar p { color: #666; }

/* 子选择器（>） */
.nav > li { display: inline-block; }

/* 相邻兄弟选择器（+） */
h2 + p { margin-top: 0; }

/* 通用兄弟选择器（~） */
h2 ~ p { color: #555; }

/* 复杂组合 */
.container > .row .col:nth-child(odd) {
    background-color: #f9f9f9;
}
```

## 📦 盒模型

### 盒模型组成

每个HTML元素都可以看作一个矩形盒子，由四个部分组成：

```css
.box-demo {
    /* 内容区域 */
    width: 200px;
    height: 100px;
    
    /* 内边距 */
    padding: 20px;
    
    /* 边框 */
    border: 5px solid #333;
    
    /* 外边距 */
    margin: 15px;
}
```

### 📏 标准盒模型 vs 替代盒模型

```css
/* 标准盒模型（默认） */
.standard-box {
    box-sizing: content-box;
    width: 200px;  /* 仅内容宽度 */
    padding: 20px;
    border: 5px solid black;
    /* 实际宽度 = 200 + 40 + 10 = 250px */
}

/* 替代盒模型（推荐） */
.border-box {
    box-sizing: border-box;
    width: 200px;  /* 包含padding和border的总宽度 */
    padding: 20px;
    border: 5px solid black;
    /* 实际宽度 = 200px，内容宽度 = 150px */
}

/* 全局设置替代盒模型 */
*, *::before, *::after {
    box-sizing: border-box;
}
```

### 🧩 显示类型

#### 块级元素（Block）
```css
.block-element {
    display: block;
    width: 100%;           /* 默认占满容器宽度 */
    margin: 10px 0;        /* 可以设置垂直外边距 */
    padding: 20px;         /* 内边距正常工作 */
}
```

#### 行内元素（Inline）
```css
.inline-element {
    display: inline;
    /* width/height 无效 */
    /* 垂直 margin/padding 不影响布局 */
    padding: 0 10px;       /* 只有水平内边距有效 */
    margin: 0 5px;         /* 只有水平外边距有效 */
}
```

#### 行内块元素（Inline-block）
```css
.inline-block-element {
    display: inline-block;
    width: 100px;          /* 可以设置宽高 */
    height: 50px;
    padding: 10px;         /* 内边距正常工作 */
    margin: 5px;           /* 外边距正常工作 */
    vertical-align: top;   /* 可以控制垂直对齐 */
}
```

## 🎨 背景与边框

### 🖼️ 背景属性

#### 背景图片和颜色
```css
.background-demo {
    /* 背景颜色 */
    background-color: #f0f0f0;
    
    /* 背景图片 */
    background-image: url('pattern.png');
    
    /* 背景重复 */
    background-repeat: no-repeat; /* repeat-x, repeat-y, repeat */
    
    /* 背景位置 */
    background-position: center top; /* 也可用像素或百分比 */
    
    /* 背景大小 */
    background-size: cover; /* contain, 100px 50px, 50% */
    
    /* 背景固定 */
    background-attachment: fixed; /* scroll, local */
}
```

#### 渐变背景
```css
/* 线性渐变 */
.linear-gradient {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    background: linear-gradient(to right, #667eea 0%, #764ba2 100%);
}

/* 径向渐变 */
.radial-gradient {
    background: radial-gradient(circle, #ff6b6b, #4ecdc4);
    background: radial-gradient(ellipse at center, #667eea 0%, #764ba2 100%);
}

/* 多重背景 */
.multiple-backgrounds {
    background: 
        linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),
        url('hero-bg.jpg') center/cover no-repeat;
}
```

### 🔲 边框属性

```css
/* 基础边框 */
.border-basic {
    border: 2px solid #333;
    border-radius: 8px;
}

/* 分别设置各边 */
.border-detailed {
    border-top: 3px solid red;
    border-right: 2px dashed blue;
    border-bottom: 1px dotted green;
    border-left: 4px double orange;
}

/* 圆角边框 */
.border-radius {
    border-radius: 10px;                    /* 四个角相同 */
    border-radius: 10px 20px;               /* 对角相同 */
    border-radius: 10px 20px 30px 40px;     /* 顺时针：左上、右上、右下、左下 */
    border-top-left-radius: 50%;            /* 单独设置 */
}

/* 图片边框 */
.border-image {
    border: 30px solid transparent;
    border-image: url('border.png') 30 round;
}
```

## 📝 文本与字体

### 🔤 字体属性

```css
/* 字体族 */
.font-family {
    font-family: "Helvetica Neue", Arial, sans-serif;
}

/* 字体大小 */
.font-size {
    font-size: 16px;        /* 绝对单位 */
    font-size: 1.2em;       /* 相对于父元素 */
    font-size: 1.2rem;      /* 相对于根元素 */
    font-size: 120%;        /* 百分比 */
}

/* 字体样式 */
.font-style {
    font-weight: bold;      /* normal, bold, 100-900 */
    font-style: italic;     /* normal, italic, oblique */
    font-variant: small-caps;
}

/* 字体简写 */
.font-shorthand {
    font: italic bold 18px/1.5 "Georgia", serif;
    /*     样式 粗细 大小/行高 字体族 */
}
```

### 📏 文本属性

```css
/* 文本对齐 */
.text-align {
    text-align: center;     /* left, right, justify */
}

/* 文本装饰 */
.text-decoration {
    text-decoration: underline;
    text-decoration: line-through red wavy;
    text-decoration-line: overline underline;
}

/* 文本转换 */
.text-transform {
    text-transform: uppercase;  /* lowercase, capitalize */
}

/* 文本缩进和间距 */
.text-spacing {
    text-indent: 2em;           /* 首行缩进 */
    letter-spacing: 0.1em;      /* 字符间距 */
    word-spacing: 0.2em;        /* 单词间距 */
    line-height: 1.6;           /* 行高 */
}

/* 文本阴影 */
.text-shadow {
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    text-shadow: 
        1px 1px 2px black,
        0 0 25px blue,
        0 0 5px darkblue;
}
```

## 📐 尺寸与单位

### 📏 长度单位

#### 绝对单位
```css
.absolute-units {
    width: 200px;          /* 像素（最常用） */
    height: 2in;           /* 英寸 */
    margin: 1cm;           /* 厘米 */
    padding: 12pt;         /* 点 */
}
```

#### 相对单位
```css
/* 相对于字体的单位 */
.font-relative {
    font-size: 1.2em;      /* 相对于父元素字体大小 */
    padding: 1rem;         /* 相对于根元素字体大小 */
    margin: 2ex;           /* 相对于字符 x 的高度 */
    line-height: 1.5ch;    /* 相对于字符 0 的宽度 */
}

/* 相对于视口的单位 */
.viewport-relative {
    width: 50vw;           /* 视口宽度的50% */
    height: 100vh;         /* 视口高度的100% */
    margin: 5vmin;         /* vw和vh中较小值的5% */
    padding: 2vmax;        /* vw和vh中较大值的2% */
}

/* 相对于容器的单位 */
.container-relative {
    width: 50%;            /* 父容器宽度的50% */
    height: 80%;           /* 父容器高度的80% */
}
```

### 📊 尺寸控制

```css
/* 固定尺寸 */
.fixed-size {
    width: 300px;
    height: 200px;
}

/* 最小/最大尺寸 */
.flexible-size {
    min-width: 200px;      /* 最小宽度 */
    max-width: 800px;      /* 最大宽度 */
    min-height: 400px;     /* 最小高度 */
    max-height: 80vh;      /* 最大高度 */
}

/* 响应式尺寸 */
.responsive-size {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;        /* 居中对齐 */
}
```

## 🌊 溢出处理

```css
/* 溢出控制 */
.overflow-control {
    width: 200px;
    height: 100px;
    
    overflow: visible;      /* 默认值，内容溢出可见 */
    overflow: hidden;       /* 隐藏溢出内容 */
    overflow: scroll;       /* 始终显示滚动条 */
    overflow: auto;         /* 需要时显示滚动条 */
}

/* 分别控制水平和垂直溢出 */
.overflow-separate {
    overflow-x: hidden;     /* 水平方向隐藏 */
    overflow-y: auto;       /* 垂直方向自动 */
}

/* 文本溢出处理 */
.text-overflow {
    width: 200px;
    white-space: nowrap;    /* 不换行 */
    overflow: hidden;
    text-overflow: ellipsis; /* 显示省略号 */
}
```

## 🎭 高级效果

### 🌟 阴影效果

#### 盒子阴影
```css
/* 基础阴影 */
.box-shadow {
    box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
    /*          x   y   模糊  颜色 */
}

/* 多重阴影 */
.multiple-shadow {
    box-shadow: 
        0 1px 3px rgba(0,0,0,0.12),
        0 1px 2px rgba(0,0,0,0.24);
}

/* 内部阴影 */
.inset-shadow {
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}

/* 发光效果 */
.glow-effect {
    box-shadow: 0 0 20px #00ff00;
}
```

#### 文本阴影
```css
.text-shadow-effects {
    /* 基础文本阴影 */
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    
    /* 发光文字 */
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff;
    
    /* 立体文字 */
    text-shadow: 
        1px 1px 0px #ccc,
        2px 2px 0px #c9c9c9,
        3px 3px 0px #bbb,
        4px 4px 0px #b9b9b9;
}
```

### 🎨 滤镜效果

```css
.filter-effects {
    /* 模糊 */
    filter: blur(5px);
    
    /* 亮度 */
    filter: brightness(1.5);
    
    /* 对比度 */
    filter: contrast(1.2);
    
    /* 饱和度 */
    filter: saturate(0.5);
    
    /* 色相旋转 */
    filter: hue-rotate(90deg);
    
    /* 组合滤镜 */
    filter: blur(2px) brightness(1.2) contrast(1.1);
}

/* 悬停效果 */
.filter-hover {
    filter: grayscale(100%);
    transition: filter 0.3s ease;
}

.filter-hover:hover {
    filter: grayscale(0%);
}
```

### 🎭 混合模式

```css
/* 背景混合模式 */
.background-blend {
    background: 
        linear-gradient(rgba(255,0,0,0.5), rgba(255,0,0,0.5)),
        url('image.jpg');
    background-blend-mode: multiply;
}

/* 元素混合模式 */
.mix-blend {
    mix-blend-mode: overlay;
}
```

## 🔧 浏览器兼容性

### 🏷️ 厂商前缀

```css
/* 过渡效果的兼容性写法 */
.transition-compat {
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
}

/* 变换效果的兼容性写法 */
.transform-compat {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
}

/* 现代浏览器的特殊效果 */
.modern-effects {
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

### 🔍 特性检测

```css
/* 使用 @supports 进行特性检测 */
@supports (display: grid) {
    .grid-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }
}

@supports not (display: grid) {
    .grid-container {
        display: flex;
        flex-wrap: wrap;
    }
}
```

## 📱 响应式设计基础

### 📺 媒体查询

```css
/* 基础媒体查询 */
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
}

/* 组合条件 */
@media (min-width: 768px) and (max-width: 1024px) {
    .sidebar {
        width: 25%;
    }
}

/* 屏幕方向 */
@media (orientation: landscape) {
    .hero {
        height: 50vh;
    }
}

/* 高分辨率屏幕 */
@media (-webkit-min-device-pixel-ratio: 2) {
    .logo {
        background-image: url('logo@2x.png');
        background-size: 100px 50px;
    }
}
```

## 🎯 实用技巧

### 🎨 居中对齐

```css
/* 水平居中 */
.horizontal-center {
    margin: 0 auto;         /* 块级元素 */
    text-align: center;     /* 行内元素 */
}

/* 垂直居中 */
.vertical-center {
    /* 方法1: line-height（单行文本） */
    line-height: 50px;
    height: 50px;
    
    /* 方法2: table-cell */
    display: table-cell;
    vertical-align: middle;
    
    /* 方法3: flexbox（推荐） */
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 绝对定位居中 */
.absolute-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

### 🔧 实用工具类

```css
/* 清除浮动 */
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}

/* 隐藏元素 */
.visually-hidden {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
}

.hidden {
    display: none;
}

/* 响应式图片 */
.responsive-img {
    max-width: 100%;
    height: auto;
}

/* 重置按钮样式 */
.btn-reset {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    cursor: pointer;
}
```

## 📚 最佳实践

### ✅ 编写规范

1. **使用语义化的类名**
```css
/* 好的例子 */
.navigation-menu { }
.article-header { }
.call-to-action-button { }

/* 避免的例子 */
.red-text { }
.left-sidebar { }
.big-font { }
```

2. **合理组织CSS结构**
```css
/* 1. 重置样式 */
* { box-sizing: border-box; }

/* 2. 基础元素样式 */
body { font-family: Arial, sans-serif; }
h1, h2, h3 { margin-bottom: 1rem; }

/* 3. 布局组件 */
.container { max-width: 1200px; margin: 0 auto; }

/* 4. 页面组件 */
.header { background: #fff; }
.navigation { display: flex; }

/* 5. 工具类 */
.text-center { text-align: center; }
.mt-1 { margin-top: 1rem; }
```

3. **优化性能**
```css
/* 使用高效的选择器 */
.navigation-item { } /* 好 */
.nav ul li a { }     /* 避免过深的嵌套 */

/* 避免使用昂贵的属性 */
.smooth-scroll {
    transform: translateZ(0); /* 开启硬件加速 */
}
```

## 📖 参考资料

- [MDN CSS 文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
- [W3C CSS 规范](https://www.w3.org/Style/CSS/)
- [CSS Tricks](https://css-tricks.com/)
- [Can I Use - CSS兼容性](https://caniuse.com/)
- [CSS 参考手册](https://www.w3school.com.cn/css/)
