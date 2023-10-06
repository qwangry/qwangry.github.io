# CSS
CSS是一种样式表语言。

```css
p {
    color: red;
    width: 500px;
    border: 1px solid black;
}
```

```html
<link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
```


![img](images/css-declaration-small.png)



## 常见选择器

| 选择器名称                           | 选择的内容                                                   | 示例                                                         |
| ------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 元素选择器（也称作标签或类型选择器） | 所有指定类型的 HTML 元素                                     | `p` 选择 `<p>`                                               |
| ID 选择器                            | 具有特定 ID 的元素。单一 HTML 页面中，每个 ID 只对应一个元素，一个元素只对应一个 ID | `#my-id` 选择 `<p id="my-id">` 或 `<a id="my-id">`           |
| 类选择器                             | 具有特定类的元素。单一页面中，一个类可以有多个实例           | `.my-class` 选择 `<p class="my-class">` 和 `<a class="my-class">` |
| 属性选择器                           | 拥有特定属性的元素                                           | `img[src]` 选择 `<img src="myimage.png">` 但不是 `<img>`     |
| 伪类选择器                           | 特定状态下的特定元素（比如鼠标指针悬停于链接之上）           | `a:hover` 选择仅在鼠标指针悬停在链接上时的 `<a>` 元素        |

## 字体和文本
```css
html {
  font-size: 10px; /* px 表示“像素（pixel）”: 基础字号为 10 像素 */
  font-family: "Open Sans", sans-serif; /* 这应该是你从 Google Fonts 得到的其余输出。 */
}
```

```css
h1 {
  font-size: 60px;
  text-align: center;
}

p,
li {
  font-size: 16px;
  line-height: 2;
  letter-spacing: 1px;
}
```

## CSS：一切皆盒子
css布局主要是基于盒子模型。页面上每个盒子都有类似的属性：
- padding（内边距）：是指内容周围的空间。
- border（边框）：是紧接着内边距的线。
- margin（外边距）：是围绕元素边界外侧的空间。


