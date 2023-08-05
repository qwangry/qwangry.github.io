# javascript
javascript是一门完备的动态编程语言。当应用于HTML文档时，可为网站提供动态交互特性。


```html
<script src="scripts/main.js" defer></script>
```

## 变量variable

- 声明：let、var

- 变量类型：String、Number、Boolean、Array、Object

- 运算符：+、-、*、/、=、===、!==、!

- 条件语句：
    if ... else ... 
- 函数Function：

```javascript
let myVariable = document.querySelector("h1");
```

```javascript
function multiply(num1, num2) {
    let result = num1 * num2;
    return result;
}
multiply(4, 7);
```

- 事件：事件能为网页添加真实的交互能力。可以捕捉浏览器操作并运作一些代码作为响应。

```javascript
document.querySelector("html").addEventListener("click",function(){
    alert("点击事件");
});
```

传递给addEventListener()的函数被称为匿名函数，因为它没有名字。
匿名函数还有另一种称为箭头函数的写法，箭头函数使用`()=>`代替`function()`
```javascript
document.querySelector("html").addEventListener("click", ()=>{
    alert("点击事件");
});
```

- prompt()函数，与alert()类似会弹出一个对话框，但需要用户输入数据。

- localStorage.setItem("xx",xx)：将数据存储在浏览器中供后续获取














