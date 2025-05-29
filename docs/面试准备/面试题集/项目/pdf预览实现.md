# pdf 预览实现

## 基本步骤

1、安装 pdfjs-dist

```js
npm install pdfjs-dist
```

2、pdf 文档加载与渲染

```js
import React, { useEffect, useRef, useState } from "react";
import { pdfjs } from "pdfjs-dist";

const PDFViewer = ({ url }) => {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = pdfjs.getDocument(url);
      const pdf = await loadingTask.promise;
      setPdfDoc(pdf);
      setTotalPages(pdf.numPages);
      renderPage(pageNum, pdf);
    };

    loadPdf();
  }, [url]);

  const renderPage = async (num, pdf) => {
    const page = await pdf.getPage(num);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    page.render(renderContext);
  };

  const handleNextPage = () => {
    if (pageNum < totalPages) {
      setPageNum((prevPageNum) => {
        const newPage = prevPageNum + 1;
        renderPage(newPage, pdfDoc);
        return newPage;
      });
    }
  };

  const handlePrevPage = () => {
    if (pageNum > 1) {
      setPageNum((prevPageNum) => {
        const newPage = prevPageNum - 1;
        renderPage(newPage, pdfDoc);
        return newPage;
      });
    }
  };

  return (
    <div>
      <canvas ref={canvasRef}></canvas>

      <div>
        <button onClick={handlePrevPage} disabled={pageNum <= 1}>
          Previous Page
        </button>

        <button onClick={handleNextPage} disabled={pageNum >= totalPages}>
          Next Page
        </button>

        <p>
          Page {pageNum} of {totalPages}
        </p>
      </div>
    </div>
  );
};

export default PDFViewer;
```

### 移动端兼容性调整

在移动端展示 PDF 时，需要确保界面适应小屏幕，并提供适当的交互功能，如缩放、滑动等。可以使用 CSS 媒体查询调整布局，并结合 react-pinch-zoom 或手动实现缩放功能。

**移动端的 CSS 媒体查询**

```css
canvas {
  width: 100%;
  height: auto;
  max-width: 100%;
}

@media only screen and (max-width: 768px) {
  canvas {
    width: 100%;
  }
}
```

**使用 react-pinch-zoom 实现缩放和移动**

- 安装

```js
npm install react-pinch-zoom
```

- 使用该库处理移动端的缩放操作

```js
import PinchZoomPan from "react-pinch-zoom";

const PDFViewerMobile = () => {
  return (
    <PinchZoomPan minScale={1} maxScale={3}>
      <canvas ref={canvasRef}></canvas>
    </PinchZoomPan>
  );
};
```

## 常见问题

- 文件过大

- 卡顿和滚动延迟

- 部分设备性能不佳

### 优化策略

- 渐进式加载


- 按需加载页面

- 懒加载其他页面

- PDF文件压缩

- 分页加载

- CDN

- 缓存优化

## PDF预览其他方案

### 使用 `<embed>` 、 `<iframe>`、`<object>` 标签直接嵌入 PDF
```html
<embed src="path/to/file.pdf" type="application/pdf" width="100%" height="600px" />
<!-- 或 -->
<iframe src="path/to/file.pdf" width="100%" height="600px"></iframe>
<!-- 或 -->
<object data="./test.pdf" type="application/pdf" width="100%" height="100%"></object>
```

#### 特点

- `<embed>` 和 `<iframe>` 标签直接利用浏览器内置的 PDF 渲染功能来显示 PDF 文件。


- 不同的浏览器有不同的 PDF 渲染引擎，例如 Chrome 使用 PDFium，Firefox 使用 PDF.js。

- 这种方式的优势在于无需额外的代码库，但浏览器的渲染效果取决于其内置的 PDF 查看器支持，可能在部分设备或浏览器上不一致。

### PDF.js

pdf.js分为3层：

- Core Layer（核心层）：pdf.worker.js，用于解析和解释二进制PDF文档，这一层是所有后续层的基础。一般不会直接操作核心层，而是去操作由核心层封装的展示层。

- Display Layer（展示层）：pdf.js，是对核心层进行了一个封装，从而得到更容易使用的API，用来展示PDF或从文档获取其他信息。

- Viewer Layer（查看器层）：viewer.html+viewer.css+viewer.js，构建在显示层上，是PDF查看器的UI。

```js
// 引入 PDF.js 库
import { pdfjsLib } from 'pdfjs-dist';

const url = 'path/to/file.pdf';
pdfjsLib.getDocument(url).promise.then((pdf) => {
  pdf.getPage(1).then((page) => {
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.getElementById('pdf-canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    page.render({ canvasContext: context, viewport: viewport });
  });
});
```

#### 特点

- PDF.js 是 Mozilla 开发的一个用 JavaScript 编写的 PDF 渲染引擎。它将 PDF 文件转换为 HTML5 Canvas 可理解的内容，允许直接在浏览器中渲染 PDF。

- PDF.js 会读取 PDF 文件的二进制数据，解析文件中的 PDF 内容（包括文本、图像、字体等），将其渲染成 Canvas 图像。

- PDF 解析步骤：

> - pdfjsLib.getDocument() 会异步获取并解析 PDF 文件。
> 
> - pdf.getPage() 获取 PDF 的具体页面。
> 
> - page.render() 方法将页面内容渲染到 Canvas 上。Canvas 是一种 HTML5 绘图元素，支持位图渲染，适合显示复杂图形内容。

底层渲染过程

> - PDF.js 中的解析器将 PDF 文件的二进制数据转化为 JSON 格式的抽象图形指令。

> - 使用 Canvas API 渲染文本和图像，这些图形指令会转换为低层次的绘制命令，在 Canvas 上渲染 PDF 内容。

### 第三方PDF查看库，如React-pdf

```js
// React-pdf 示例
import { Document, Page } from 'react-pdf';

<Document file="path/to/file.pdf">
  <Page pageNumber={1} />
</Document>
```

#### 特点

- React-pdf 基于 PDF.js，将 PDF 文件的内容解析并渲染为 React 组件，提供更好的框架兼容性。

- 底层依赖与 PDF.js 相同，通过 PDF.js 的 API 获取 PDF 页面的内容并渲染到 Canvas。

- React-pdf 提供了一些额外的功能和组件封装，使得在 React 项目中集成更为方便。

### PDF转换为图像格式预览

使用后端工具或脚本将PDF文件的每一页转换为图像格式，在前端加载这些图像

```py
from pdf2image import convert_from_path

pages = convert_from_path('path/to/file.pdf', 300)
for page in pages:
    page.save('page.png', 'PNG')
```

#### 特点

- PDF 转图像：PDF 文件通过后端工具逐页渲染为图像。PDF 格式本质上是矢量格式，通过图像转换将其转为位图格式。

- 前端直接显示图像，避免了浏览器 PDF 兼容问题。

- 缺点：图像格式的 PDF 失去了交互性（无法搜索、复制文本），且图像文件通常较大，加载性能可能受到影响。

### 使用外部PDF查看服务
上传 PDF 到 Google Drive 或 OneDrive，获取公开的 URL，然后嵌入到 `<iframe> `中。

```js
<iframe src="https://drive.google.com/file/d/your-file-id/preview" width="100%" height="600px"></iframe>

```

#### 特点


- 将 PDF 文件托管在外部服务上，利用它们的 PDF 查看功能。

- 前端只是加载外部的 PDF 预览页面，无需自行渲染。

- 缺点：文件需要上传至第三方，不适用于敏感或私密的 PDF 文件。

### 使用canvas绘制PDF内容

- 手动解析 PDF 文件内容并在 Canvas 上绘制。通常不直接使用，而是借助 PDF.js 等库实现。

- Canvas 提供了绘图 API，可以渲染文本、图像、路径等内容。

#### 特点


- Canvas 是一种位图绘图方式，用于将 PDF 内容逐帧渲染在浏览器上。

- JavaScript 中的 Canvas API 允许我们直接操控像素内容，但需要处理复杂的 PDF 解析工作。

- 不适合手动实现解析 PDF，因为 PDF 内容复杂，推荐用 PDF.js 等库来简化开发。
