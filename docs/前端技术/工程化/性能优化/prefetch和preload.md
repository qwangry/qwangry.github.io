# prefetch和preload

## preload和prefetch预加载关键资源

使用`<link rel="preload">`和`<link rel="prefetch">`是前端性能优化中预加载关键资源的有效手段：

1、预加载关键资源：`<link rel="preload">`用于告诉浏览器某个资源在当前页面是必需的，应该立即加载；

2、预获取非关键资源：`<link rel="prefetch">`用于预加载哪些用户可能访问的页面的资源，比如后续页面的资源；

3、减少加载时间：通过预加载，可以减少页面渲染的时间，因为关键资源已经提前加载；

4、提高响应速度：预加载可以减少用户等待时间，提高页面的响应速度；

5、合理使用：不要过度使用预加载，因为它会占用带宽和服务器资源，应该只对那些真正需要的资源使用；

6、浏览器兼容性：大多数现代浏览器都支持预加载和预获取，但具体实现可能有所不同；


7、监控效果：使用网络分析工具监控预加载的效果，确保它对性能有正面影响。


## Prefetch
prefetch （预取用），它可以利用浏览器的空闲时间来预取用（下载）用户可能在不久的将来会访问的资源。换句话说，浏览器将提前加载用户将来可能要访问的页面资源。浏览器将这些提前下载的资源存储在本地缓存中，以便在用户最终访问该页面的资源时能更快地发送请求的信息，并非常快速的加载资源。所以，使用 prefetch 技术，不会减少 HTTP 请求，但会提升使用资源时的资源加载速度。

### 使用场景
prefetch 预取用的资源在加载完成后，并不会像加载普通的资源那样，加载完成后浏览器不会马上解析资源，而只是缓存到本地

不立即执行解析，特别是不立即解析脚本文件，就意味着不会阻塞页面加载其它资源。只有用户访问了调用这些资源的页面的时候，才会立刻解析

也就是说，prefetch 的使用场景是`用来提前加载那些用户将来会访问的页面资源`，优化将来会访问页面资源的首次加载速度。


具体场景：

- 当一系列页面很像幻灯片时，加载接下来的1~3页，之前的1~3页

- 加载要在网站上大多数页面上使用的图像

- 将搜索结果的下一页加载到网站上

### 注意事项

当用户始终都没有访问 prefetch 预期在将来可能访问的页面资源时，使用 prefetch 就可能会花费额外的带宽（流量）

### 资源选择

首先，浏览器对HTML页面中调用的各种资源是有着不同级别的优先级区分的

优先级高的资源基本都是CSS，JS和字体资源，那么使用prefetch加载资源也应该选择这些优先级高的资源

应该使用prefetch加载那些`用户使用比较频繁的模块资源`，这样用户接下来大概率会使用到这些资源，从而避免prefetch加载的资源用户没有使用，而造成额外的带宽消耗

## Preload
preload （预加载），它`告诉浏览器如何将特定资源提前提取到当前页面中`。本质上，它会在当前页面开始加载之前在浏览器后台提前下载资源。并且，浏览器通常以中等优先级，而不是布局阻塞的方式来获取此资源。使用 preload 提前加载的资源，不会花费额外的带宽。也就是不会产生额外的 HTTP 请求，这个是 preload 与 prefetch 不同的地方之一。


### 使用场景
使用 preload 加载的资源在加载完成后浏览器也不会立刻解析。preload 预加载加载资源的使用场景是 preload 预加载当前访问页面会立刻使用到的资源。虽然使用 preload 提前加载的资源，但不会花费额外的带宽。

### 注意事项
如果 preload 预加载的资源，在加载完成后3秒钟后还未被使用，这时（Chrome）浏览器在控制台中会显示警告，提示预加载的资源在当前页面没有被引用。

### 资源选择
prload 预加载当前页面就要用到的资源。更确切的说应该是 preload 所有用户都一定为用到的资源。当然，也是选择优先级高的资源。

## preload和prefetch的调用方式

preload 和 prefetch 的使用方式一样，采用 link 标签作为载体，然后再使用 rel 指定 preload 和 prefetch。

> 还需要指定：
> 
> - href：资源的路径；
> 
> - as：资源的类型；

```js
<head>
    <meta charset="utf-8">
    <title>JS and CSS preload example</title> 
    <!-- 在 header 区域加入 -->
    <link rel="preload" href="style.css" as="style">
    <link rel="preload" href="main.js" as="script">
    <link rel="prefetch" href="news.js" as="script">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>bouncing balls</h1> <canvas></canvas>
    <!--preload 需要立刻调用，prefetch 不用立刻调用-->
    <script src="main.js" defer></script>
</body>
```

## preload和prefetch支持哪些类型的资源

除了CSS和JS外，还可以加载很多其他类型的资源文件，在元素中使用 as 属性设置资源类型，可选的值为：

- audio：音频文件

- document：HTML文档

- embed：要嵌入元素内的资源

- fetch：通过提取或XHR请求访问的资源，例如ArrayBuffer或JSON文件

- font：字体文件

- object：要嵌入元素内的资源

- script：JavaScript文件

- style：CSS样式表

- track：WebVTT文件

- worker：JavaScript网络工作者或共享工作者

- video：视频文件，通常在中使用


另外，link 元素可以接受 type 属性，该属性包含元素指向的资源的 MIME 类型。这在预加载资源时特别有用，浏览器将使用 type 属性值来计算是否支持该资源，并且仅在支持的情况下才下载该属性，否则将忽略该属性。

## 启用CORS资源提取

除了提取相同域名下的资源， preload 和 prefetch 还支持预加载其它域名的资源。启用 CORS 资源提取，例如：fetch()，XMLHttpRequest 或字体。这个时候，就需要特别注意，需要设置 `crossorigin 属性`到 link 标签。

```js
<head>
    <meta charset="utf-8">
    <title>Web font example</title>
    <link rel="preload" href="fonts/cicle_fina-webfont.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="fonts/zantroke-webfont.woff2" as="font" type="font/woff2" crossorigin>
    <link href="style.css" rel="stylesheet">
</head>

<body> … </body>    
```



## 参考

[https://juejin.cn/post/7388091090349555738](https://juejin.cn/post/7388091090349555738)