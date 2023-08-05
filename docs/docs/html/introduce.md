# HTML

```html
<!Doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>My test page</title>
  </head>
  <body>
    <img src="images/firefox-icon.png" alt="My test image" />
  </body>
</html>
```

- `<!DOCTYPE html>`——文档类型。这是必不可少的开头。保证文档的正常读取。
- `<html></html>`——`<html>`元素。该该元素包含了整个页面的所有内容，有时候也称作根元素。里面也包含了lang属性，写明了页面的主要语种。
- `<head></head>`——`<head>`元素。加到页面中，但不展示出来的页面元素都以这个元素为容器。包含注入提供给搜索引擎的关键字和页面描述、用作风格化页面的CSS、字符集声明等等。
- `<meta charset="utf-8">`——指明文档使用UTF-8字符编码。UTF-8包括世界绝大多数书写语言的字符。基本上可以处理任何文本内容。
- `<meta name="viewport" content="width=device-width">`——视口元素，可以确保页面以视口宽度进行渲染，避免移动端浏览器上因页面过宽导致缩放。
- `<title></title>`——设置页面的标题，显示在浏览器标签页上，也作为收藏网页的描述文字。
- `<body></body>`——包括期望让用户在访问页面时看到的全部内容，包括文本、图像、视频、游戏、可播放的音轨或其他内容。

## 元素
### <img>
```html
<img src="images/firefox-icon.png" alt="xxx" />
```

### 标题
```html
<h1></h1>
...
<h4></h4>
```
### 段落
```html
<p></p>
```

### 列表
1、无序列表
```html
<ul>
    <li></li>
</ul>
```

2、有序列表
```html
<ol>
    <li></li>
</ol>
```

### 链接
```html
<a herf=""></a>
```

