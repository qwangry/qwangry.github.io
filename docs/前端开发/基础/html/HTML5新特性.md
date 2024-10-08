# HTML5 新特性

## 语义标签

HTML5 引入了一些新的语义化标签，如`<header>、<footer>、<nav>、<article>、<section>`等，使开发者能够更准确地描述网页结构。

## 增强型表单

HTML5 通过添加新的表单元素和输入类型（如`<input type="date">、<input type="number">`等）以及表单验证 API，提供了更强大和易用的表单功能。

## 视频和音频

HTML5 添加了`<video>和<audio>`标签，使得在网页上嵌入和播放视频和音频内容更加容易。

## Canvas 绘图

HTML5 引入了`<canvas>`元素，提供了一个绘制图形和动画的 API，使得在网页上创建复杂的图形和交互性更为方便。

## SVG 绘图

## 地理定位

HTML5 引入了 Geolocation API，使得网页可以获取用户的地理位置信息。

## 拖放 API

HTML5 增加了原生的拖放功能，使得网页元素可以被拖动和放置，从而实现更直观的交互体验

## WebWorker

## WebStorage

HTML5 增加了本地存储能力，包括 localStorage 和 sessionStorage，可以在客户端存储数据，减少对服务器的依赖。

## WebSocket

HTML5 引入了 WebSocket 协议，提供了一种在客户端和服务器之间进行实时双向通信的方式

## 其他需要了解的

### HTML5 中的 meta 标签

HTML5 中的 meta 标签是一个非常常用的标签，可以用来描述一个 HTML 文档的一些基本信息与配置，包括`字符编码、页面关键词、作者、视口大小等`，具体来说，meta 标签可用于以下几个方面：

1、描述文档内容（文档的主体内容、作者、关键词和摘要信息）

2、控制页面行为（控制页面的默认行为，如设置视口大小）

3、声明字符编码：通过设置 meta 标签中的 charset 属性值，可以声明文档中使用的字符串编码格式，帮助浏览器正确解读页面内容

4、防止 XSS（设置 meta 的 http-equicv 属性为 content-security-policy，可以提高页面的安全性，保护页面免受跨站脚本攻击）

5、提供缓存机制（设置一些标签属性如 cache-control、expires、pragma，可以控制浏览器缓存页面内容的时间和方式）

cache-control的取值：

- no-cache：强制重新验证，始终从服务器获取最新内容。（但不会阻止响应的存储，而是阻止在没有重新验证的情况下重用响应）

- no-store：不将响应存储在任何缓存中，阻止存储响应

### `<!DOCTYPE html>标签`

`<!DOCTYPE html>标签`是HTML5的文档类型声明，作用是告诉浏览器当前文档使用的是HTML5规范

1、指定文档类型：即HTML5，浏览器就可以按照HTML5的规范来解析和渲染文档

2、规范浏览器行为：告诉浏览器以标准模式解析文档，确保一致的行为和渲染结果

3、提供更好的兼容性：可以确保文档在不同浏览器中具有一致的处理方式。

## 参考

[https://www.cnblogs.com/jane-panyiyun/p/13092297.html](https://www.cnblogs.com/jane-panyiyun/p/13092297.html)

[https://juejin.cn/post/7246206157899595834](https://juejin.cn/post/7246206157899595834)
