# JavaScript语法

## 值

### 变量

变量是数据的`命名存储`，可以用变量来保存一些数据的信息

**声明变量**

声明一个变量的语法是在`var`或`let`关键字之后加上这个变量的名字

```javascript
let myName

let myAge
```

**初始化变量**

变量名后面跟上一个“=”，然后是数值

```javascript
myName="Chris"
myAge=37
```

**var与let的区别**

- 如果编写一个声明并初始化变量的多行JavaScript程序，可以在初始化一个变量之后用`var`声明它，仍然可以工作

```javascript
var myName;
myName = "Chris";

function logName() {
  console.log(myName);
}

logName();

var myName;
```

这是由于变量的提升

使用 `var` 声明的变量将在任何代码执行前被创建，这被称为变量提升。这些变量的初始值为 undefined

- 提升操作不适用于`let`，如果将上面例子中的`var`替换成`let`将不起作用并引发一个错误。

- 使用`var`时，可以根据需要多次声明相同名称的变量，但`let`不能
```javascript
var myName="Chris"
var myName="Bob"
```

```javascript
let myName="Chris"
let myName="Bob"
//报错
```

```javascript
let myName = "Chris";
myName = "Bob";
```

**更新变量**
```javascript
myName = "Bob";
myAge = 40;
```

### 常量
常量是一个常数（不变）变量，即能确定一个变量不会改变

**常量声明**
声明常量可以使用`const`

```js
const myBirthday = '18.04.1982';
```

## 数据类型

- 数值`number`

- 字符串`string`

- 布尔值`boolean`：true，false

- `undefined`：表示未定义或不存在

- `null`：表示空值，即此处的值为空

- 对象`object`：各种值组成的集合
> 是最复杂的数据类型，又可以分为三个子类型
>
>- 狭义的对象`object`
>
>- 数组`array`
>
>- 函数`function`

ES6新增Symbol和BigInt数据类型

- `BigInt`
> BigInt 是一种特殊的数字类型，它提供了对任意长度整数的支持。
> 
> JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示，这使得 JavaScript 不适合进行科学和金融方面的精确计算。二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回Infinity。
> 
> BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。
> 

---

#### 注意

-  数值、字符串、布尔值这三种类型，合称为`原始类型（primitive type）`的值，即它们是最基本的数据类型，不能再细分了

-  对象则称为`合成类型（complex type）`的值，因为一个对象往往是多个原始类型的值的合成，可以看作是一个存放各种值的容器

-  `undefined`和`null`，一般将它们看成两个特殊值。


```javascript
// Number
let myAge = 17;

// String
let dolphinGoodbye="so long and thanks for all the fish"

// Boolean
let iAmAlive=true
let test=6<3

// Array
let myNameArray=["Chris","Bob","Jim"]
let myNumberArray=[10,15,40]
myNameArray[0]
myNumberArray[0]

// Object
let dog={name:"Spot",breed:"Dalmatian"}
dog.name

// 动态类型
// JavaScript是一种动态类型语言，
// 意味着不同于其他一些语言，
// 不需要指定变量将包含什么数据类型，
// 声明一个变量并赋予带引号的值，
// 浏览器就会知道是一个字符串
```

### typeof/instanceof运算符

> JavaScript有三种方法确定一个值是什么类型
> 
> - `typeof`运算符
> 
> - `instanceof`运算符
> 
> - `Object.prototype.toString`方法
> 

#### typeof
typeof运算符可以返回一个值的数据类型。
> 语法示例：`typeof 123`，`typeof 'abc'`，`typeof false`

- 数值、字符串、布尔值分别返回number、string、boolean

- undefined返回undefined

- 对象返回object
> 空数组（[]）的类型也是object，这表示在 JavaScript 内部，数组本质上只是一种特殊的对象

- null返回object
> 这是由于历史原因造成的。1995年的 JavaScript 语言第一版，只设计了五种数据类型（对象、整数、浮点数、字符串和布尔值），没考虑null，只把它当作object的一种特殊值。后来null独立出来，作为一种单独的数据类型，为了兼容以前的代码，typeof null返回object就没法改变了。

#### instanceof
instanceof 操作符用于检查一个对象是否属于某个特定的 class，如果 obj 隶属于 Class 类（或 Class 类的衍生类），则返回 true。
> 语法：`obj instanceof Class`

通常，instanceof 在检查中会将原型链考虑在内

#### Object.prototype.toString
内建的 toString 方法可以被从对象中提取出来，并在任何其他值的上下文中执行。其结果取决于该值。

- 对于 number 类型，结果是 [object Number]

- 对于 boolean 类型，结果是 [object Boolean]

- 对于 null：[object Null]

- 对于 undefined：[object Undefined]

- 对于数组：[object Array]

- ……等（可自定义）

在内部，toString 的算法会检查 this，并返回相应的结果。
```js
let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]
```

## 结构体

### 条件

#### if...else

```
if (condition){
    ...
}else{
    ...
}
```

```
if (condition){
    ...
}

...
```

```
if (condition1){
    ...
}else if(condition2){
    ...
}else if(conditionx){
    ...
}else{
    ...
}
```

#### switch

```
switch(表达式){
    case 选择1：
        ...
        break
        
    case 选择2：
        ...
        break
        
    ///

    default:
        ... 
}
```

#### 三元运算符
```
condition ? xx : 否则，xx
```

```
const greeting = isBirthday
  ? "小王生日快乐，祝你有个美好的一天！"
  : "小王早上好。";
```

### 循环
#### for
```
for (initializer; exit-condition; final-expression) {
  // code to run
}
```

#### while
```
initializer
while(exit-condition){
    ...
}
```

```
initializer
do {
  // code to run

  final-expression
} while (exit-condition)
```
:::tip
在 do ... while 循环中，花括号中的代码总是在检查之前运行一次，以查看是否应该再次执行（在 while 和 for 中，检查首先出现，因此代码可能永远不会执行）
:::

## 操作符

### 基础运算符，数学运算

- `+`
> `+`也可用来连接字符串

- `-`

- `*`

- `/`

- `%`

- `**`

### 赋值运算符

- `=`

```js
let a = 1;
let b = 2;

let c = 3 - (a = b + 1);

alert( a ); // 3
alert( c ); // 0
```

#### 链式赋值（Chaining assignments）
```js
let a, b, c;

a = b = c = 2 + 2;

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

### 自增/自减
- `++`

- `--`

可以置于变量前，也可以置于变量后。

- 当运算符置于变量后，被称为“后置形式”：counter++

- 当运算符置于变量前，被称为“前置形式”：++counter

前置形式返回一个新的值，但后置返回原来的值（做加法/减法之前的值）

### 位运算符

- 按位与 ( `&` )

- 按位或 ( `|` )

- 按位异或 ( `^` )

- 按位非 ( `~` )

- 左移 ( `<<` )

- 右移 ( `>>` )

- 无符号右移 ( `>>>` )

### 逗号运算符

逗号运算符能让我们处理多个表达式，使用 `,` 将它们分开。每个表达式都运行了，但是只有最后一个的结果会被返回。

```js
let a = (1 + 2, 3 + 4);

alert( a ); // 7（3 + 4 的结果）
```

### 比较运算符

- `>`

- `<`

- `>=`

- `<=`

- `!=`

- `==`
> 不能区分`0`和`false`
>
> 不能区分`空字符串`和`false`
>
> undefined 和 null 在相等性检查 `==` 中不会进行任何的类型转换，它们有自己独立的比较规则，所以除了它们之间互等外，不会等于任何其他的值。
>

- `!==`

- `===`
> 严格相等运算符 `===` 在进行比较时不会做任何的类型转换


当使用数学式或其他比较方法 `<` `>` `<=` `>=` 时：
`null/undefined` 会被转化为数字：`null` 被转化为 `0`，`undefined` 被转化为 `NaN`

::: tip
`===` `!==` 和 `==` `!=`的区别：
`==`, `!=`测试`值`是否相同，但`数据类型`可能不同，
`===`, `!==`严格版本，测试`值和数据类型`是否相同。
严格的版本往往导致更少的错误。
::: 

```js
alert( 0 == false ); // true

alert( '' == false ); // true

alert( 0 === false ); // false，因为被比较值的数据类型不同

alert( null == undefined ); // true

alert( null === undefined ); // false

// 因为相等性检查 == 和普通比较符 > < >= <= 的代码逻辑是相互独立的。进行值的比较时，null 会被转化为数字，因此它被转化为了 0。这就是为什么（3）中 null >= 0 返回值是 true，（1）中 null > 0 返回值是 false
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) true

// undefined 不应该被与其他值进行比较
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
// (1) 和 (2) 都返回 false 是因为 undefined 在比较中被转换为了 NaN，而 NaN 是一个特殊的数值型值，它与任何值进行比较都会返回 false
// undefined 只与 null 相等，不会与其他值相等
```

### 条件运算符'?'
有时我们需要根据一个条件去赋值一个变量，条件运算符可以更简短地达到目的。

```js
let result = condition ? value1 : value2;
```

#### 多个'?'
使用一系列问号 `?` 运算符可以返回一个取决于多个条件的值。

```js
let age = prompt('age?', 18);

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

alert( message );
```

#### '?'的非常规使用
有时可以使用`?`代替`if`语句

```js
let company = prompt('Which company created JavaScript?', '');

(company == 'Netscape') ?
   alert('Right!') : alert('Wrong.');
```

### 逻辑运算符

JavaScript 中有四个逻辑运算符：

- `||`（或）
> `||` 无法区分 `false`、`0`、`空字符串 ""` 和 `null/undefined`。它们都一样 —— 假值（falsy values）。如果其中任何一个是 `||` 的第一个参数，那么将得到第二个参数作为结果。

- `&&`（与）

- `!`（非）

- `??`（空值合并运算符）
> 当一个值既不是 null 也不是 undefined 时，将其称为“已定义的（defined）”。

`a ?? b` 的结果是：

- 如果 a 是已定义的，则结果为 a，

- 如果 a 不是已定义的，则结果为 b。

> 换句话说，如果第一个参数不是 `null/undefined`，则 `??` 返回第一个参数。否则，返回第二个参数。

> 出于安全原因，JavaScript 禁止将 ?? 运算符与 && 和 || 运算符一起使用，除非使用括号明确指定了优先级

```js
let x = 1 && 2 ?? 3; // Syntax error
let x = (1 && 2) ?? 3; // 正常工作了
```
