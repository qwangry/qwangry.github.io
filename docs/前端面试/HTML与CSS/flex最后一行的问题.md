# flex最后一行的问题

## 问题描述

flex布局默认是根据元素数量进行换行（如果使用flex-wrap: wrap;），所以当元素数量不成倍数的时候，最后一行元素少于指定列数，这样会**造成不齐或视觉上的不整齐**

最后一行的元素居中或左对齐的问题：如果父容器的`justify-content`设置为center或space-between，最后一行会跟着居中或两端对齐

解决方案：


1、强制对齐最后一行

可以通过设置 justify-content: flex-start; 来确保所有行的元素都左对齐，不论最后一行元素的数量如何。

2、给最后一行的空白位置添加占位符

可以在最后一行的空白处添加隐藏的占位符，填充这些空位

```
.container {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: calc(100% / 3);
}
/* 占位符 */
.placeholder {
  visibility: hidden;
  width: calc(100% / 3);
}

<div class="container">
  <!-- 正常的 item 元素 -->
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <!-- 添加一个占位符 -->
  <div class="placeholder"></div>
</div>
```

3、可以使用Grid布局

```
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 列 */
  gap: 10px; /* 可选，设置间距 */
}
```