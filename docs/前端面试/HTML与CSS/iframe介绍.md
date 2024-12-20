# iframe 介绍

## 介绍

iframe 内嵌框架是 HTML 中一种用于将一个网页嵌入到另一个网页中的标签，它可以在一个页面中显示来自其他页面的内容。在网页中，使用`<iframe>`标签可以将一个网页嵌套在另一个网页中，实现网页间的互联互通

每个嵌入的浏览上下文（embedded browsing context）都有自己的会话历史记录（session history）和 DOM 树。包含嵌入内容的浏览上下文称为父级浏览上下文。顶级浏览上下文通常是由 window 对象表示的浏览器窗口

## 使用

```html
<iframe src="url"></iframe>
```

### 注意点

1、嵌入的网页要与主页面同源，否则会受到浏览器的安全限制

2、嵌入的网页可能会影响页面性能和加载速度，特别是当嵌入的网页包含大量的资源时

3、嵌入的网页可能会被恶意攻击者用于钓鱼或注入恶意代码的攻击，因此需要谨慎使用
