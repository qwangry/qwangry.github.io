# html5 的 video

## 介绍

`<video>`用于在文档中嵌入媒体播放器，用于支持文档内的视频播放

在不支持 video 元素的浏览器中，`<video></video>` 标签中间的内容会显示，作为降级处理

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


## 常见问题

- 加载慢

- 带宽占用大

- 不支持部分格式

- 卡顿/性能问题

### 优化策略

1、使用自适应比特率流（Adaptive Bitrate Streaming）： 自适应比特率流（如 HLS（HTTP Live Streaming） 和 DASH（Dynamic Adaptive Streaming over HTTP））可以根据用户的网络情况动态调整视频的清晰度和比特率。这样可以避免在低带宽下出现加载缓慢或者播放卡顿的问题。

- HLS 是 iOS 和 macOS 上的首选。

- DASH 通常用于 Android 和桌面浏览器。

通过这些协议，视频可以分成多个小段（chunk），根据网络状况按需加载不同质量的视频。

```js
<video controls>
  <source src="video.m3u8" type="application/x-mpegURL">  <!-- HLS -->
  <source src="video.mp4" type="video/mp4">  <!-- 普通 MP4 -->
  Your browser does not support the video tag.
</video>
```

2、多格式支持： 浏览器对视频格式的支持不完全一致。例如，Chrome 支持 MP4 和 WebM，而 Safari 支持 MP4。因此，提供多种格式可以确保兼容性。

```js
<video controls>
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  Your browser does not support the video tag.
</video>
```

3、视频文件压缩： 使用视频压缩工具（如 FFmpeg）将视频文件压缩，减少文件大小，可以显著提高加载速度。压缩时应保证尽量不损失画质。

```js
ffmpeg -i input.mp4 -vf scale=1280:-1 -c:a copy output.mp4
```


4、懒加载和延迟技术： 如果页面上有多个视频，考虑使用 懒加载（lazy loading） 技术。只有当视频进入视口时才开始加载，这样可以减少首次加载的资源开销。
```js
<video controls loading="lazy">
  <source src="video.mp4" type="video/mp4">
</video>
```

5、预加载设置： `<video>` 标签支持 preload 属性，允许你指定预加载行为。选择合理的预加载策略可以优化初始加载时间：

- none：不预加载视频内容，只有用户点击播放时才开始加载。

- metadata：仅预加载视频的元数据（如视频长度等），减少初始加载时间。

- auto：尽量预加载整个视频，但可能占用较多带宽。


6、CDN加速： 将视频文件托管在 内容分发网络（CDN） 上，能确保用户从距离最近的服务器加载视频，减少延迟并提高播放体验。

7、缩略图预览： 提供视频播放前的缩略图，这样即使视频没有完全加载，用户也能看到缩略图，获得更好的视觉反馈。

```js
<video controls poster="thumbnail.jpg">
  <source src="video.mp4" type="video/mp4">
</video>
```

## 视频分辨率适配


为了确保视频在页面上无论分辨率如何变化都能保持原始比例并适配容器（不失真、不拉伸），可以通过 CSS 设置一些样式规则，使视频自适应调整大小。

1. 使用 object-fit 属性

```js
.video-container {
  position: relative;
  width: 100%;          /* 宽度可以根据需要设定 */
  padding-bottom: 56.25%; /* 16:9的比例 (9 / 16 * 100%) */
  height: 0;
}

.responsive-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;  /* 保持视频比例 */
}
```

2. 设置固定比例的容器


3. 通过 aspect-ratio 属性（现代浏览器支持）

