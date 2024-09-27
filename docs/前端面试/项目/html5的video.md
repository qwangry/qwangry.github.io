# html5 的 video

## 介绍

`<video>`用于在文档中嵌入媒体播放器，用于支持文档内的视频播放

在不支持 video 元素的浏览器中，<video></video> 标签中间的内容会显示，作为降级处理

```js
<video controls width="250">
  <source src="/media/cc0-videos/flower.webm" type="video/webm" />
  <source src="/media/cc0-videos/flower.mp4" type="video/mp4" />
  Download the
  <a href="/media/cc0-videos/flower.webm">WEBM</a>
  or
  <a href="/media/cc0-videos/flower.mp4">MP4</a>
  video.
</video>
```

## 属性

### autoplay

声明该属性后，视频会尽快自动开始播放

### controls

如果存在该属性，浏览器会在视频底部提供一个控制面板，允许用户控制视频的播放，包括音量、拖动进度、暂停或恢复播放。

### controlslist

当浏览器显示视频底部的播放控制面板（例如，指定了 controls 属性）时，controlslist 属性会帮助浏览器选择在控制面板上显示哪些 video 元素控件。

允许的值有 nodownload、nofullscreen 和 noremoteplayback。

### crossorigin

该枚举属性指明是否使用 CORS 来获取相关视频。允许 CORS 的资源可在 `<canvas>` 元素中被重用，而不会被污染。

### preload

提示浏览器，作者认为在播放视频之前，加载哪些内容会达到最佳的用户体验。可能是下列值之一：

- none: 表示不应该预加载视频。

- metadata: 表示仅预先获取视频的元数据（例如长度）。

- auto: 表示可以下载整个视频文件，即使用户不希望使用它。

- 空字符串: 与 auto 值一致。

autoplay 属性的优先级比 preload 高。如果指定了 autoplay 属性，浏览器显然需要开始下载视频以便回放。

### src

也可以使用 video 块内的`<source>`元素来指定需要嵌到页面的视频
