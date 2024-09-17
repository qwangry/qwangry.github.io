# css 实现 0.5

首先设置 0.5 的边框，这样不对，边框大小会向上取整

```css
border: 0.5px solid red;
```

## box-shadow 阴影实现

```css
div {
  /* border: 1px solid red; */
  /* box-shadow: x偏移量, y偏移量, 阴影模糊半径, 阴影扩散半径, 阴影颜色 */
  box-shadow: 0px 0px 0px 0.5px green;
}
```

## ::after 定位伪类实现

```css
div {
  position: relative;
  box-sizing: border-box;
  background-color: blue;
  width: 200px;
  height: 200px;
  margin-top: 10px;
}
div::after {
  position: absolute;
  content: "";
  background-color: red;
  width: 100%;
  height: 0.5px;
  bottom: 0px;
}
```

## transform 缩放实现

```css
div {
  position: relative;
  box-sizing: border-box;
  background-color: blueviolet;
  width: 200px;
  height: 200px;
  margin-top: 10px;
  /* box-shadow: 0px 0px 0px 0.5px green; */
}

div::after {
  position: absolute;
  content: "";
  width: 200%;
  height: 200%;
  border: 1px solid red;
  transform-origin: 0 0;
  transform: scale(0.5);
}
```

## border-image: linear-gradient 边框线性渐变

```css
div {
  position: relative;
  box-sizing: border-box;
  background-color: blueviolet;
  width: 200px;
  height: 200px;
  margin-top: 10px;
  /* box-shadow: 0px 0px 0px 0.5px green; */
}

div::after {
  display: block;
  position: absolute;
  content: "";
  width: 100%;
  height: 1px;
  bottom: 0px;
  background-color: red;
  background: linear-gradient(to bottom, transparent 50%, red 50%);
}
```

## 参考

[https://bbs.huaweicloud.com/blogs/379459](https://bbs.huaweicloud.com/blogs/379459)
