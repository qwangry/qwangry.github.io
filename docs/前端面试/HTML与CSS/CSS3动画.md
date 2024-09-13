# CSS3 动画

CSS 动画（CSS Animations）是为层叠样式表建议的允许可扩展标记语言（XML）元素使用 CSS 的动画的模块

即指元素从一种样式逐渐过渡为另一种样式的过程

常见的动画效果有很多，如平移、旋转、缩放等等，复杂动画则是多个简单动画的组合

css 实现动画的方式，有如下几种：

- transition 实现渐变动画

- transform 转变动画

- animation 实现自定义动画

### transition 实现渐变

transition 的属性如下：

- property:填写需要变化的 css 属性

- duration:完成过渡效果需要的时间单位(s 或者 ms)

- timing-function:完成效果的速度曲线

- delay: 动画效果的延迟触发时间

`注意：并不是所有的属性都能使用过渡的，如 display:none<->display:block`

### transform 转变动画

包含四个常用的功能：

- translate：位移

- scale：缩放

- rotate：旋转

- skew：倾斜

一般配合 transition 过度使用

`注意的是，transform 不支持 inline 元素，使用前把它变成 block`

### animation 实现自定义动画
