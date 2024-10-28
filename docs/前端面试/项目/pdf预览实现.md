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