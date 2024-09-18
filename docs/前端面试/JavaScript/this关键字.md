# this 关键字

## 柯里化

柯里化是把一个多参函数转化为一个嵌套的一元函数的过程

柯里化的意义：

1、让纯函数更纯，每次接受一个参数，松散解耦

2、惰性执行

```js
let fn = (x, y) => x + y;

// 转化

const curry = function (fn) {
  return function (x) {
    return function (y) {
      return fn(x, y);
    };
  };
};

let myfn = curry(fn);
console.log(myfn(1)(2));

// 多参数
const curry = function (fn) {
  return function curriedFn(...args) {
    if (args.length < fn.length) {
      return function () {
        return curriedFn(...args.concat([...arguments]));
      };
    }
    return fn(...args);
  };
};
const fn = (x, y, z, a) => x + y + z + a;
const myfn = curry(fn);
console.log(myfn(1)(2)(3)(1));
```

## 精度问题

JavaScript 中 Number 采用的是 IEEE754 规范中 64 位双精度浮点数编码

这样的储存结构优点是可以归一化处理整数和小数，节省存储空间

对于整数，可以轻易转化成十进制或者二进制，但对于浮点数，因为小数点的存在，小数点的位置不是固定的，解决方法是使用科学计数法

但计算机只能使用二进制表示，二进制转换为科学计数法的公式为：`x=a*2^e`

存储二进制时小数点的偏移量最大为 52 位，最多可以表达的位数是`2^53`，对应科学计数的尾数是`9.007199254740992`，这是 JS 最多能表示的精度

长度是 16，所以可以使用 toPrecision(16)来做精度运算，超过的精度会自动做凑整处理

## this 关键字

this 的值取决于函数的调用方式。

this 的作用是指向当前执行代码的对象，在不同的情境下会有不同的值。

### 默认绑定规则

函数在哪个词法作用域中生效，this 就指向哪里（独立调用的函数就指向 window）

```js
var a = 1;
function foo() {
  console.log(this.a);
}
// 1

var a = 1;
function foo() {
  console.log(this);
}

function bar() {
  //bar的词法作用域是window
  var a = 2;
  foo();
} //foo是在bar的作用中调用，但是必须要知道bar的词法作用域中调用。
bar();
```

### 隐式绑定规则

当一个函数被对象拥有，且调用时，函数的 this 指向对象

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 1,
  foo: foo,
};

obj.foo();
// 1
```

### 隐式丢失

当函数被多个对象链调用时，this 指向引用函数的那个对象

```js
var obj = {
  a: 1,
  foo: foo,
};

var obj2 = {
  a: 2,
  obj: obj,
};

function foo() {
  console.log(this.a);
}

obj2.obj.foo();
// 1，指向调用的，即obj的（就近原则）
```

### 显式绑定

call，apply，bind

### new 绑定

this 指向实例对象

### 箭头函数

箭头函数没有 this 关键字

## 参考

[https://juejin.cn/post/6844904079353708557](https://juejin.cn/post/6844904079353708557)

[https://juejin.cn/post/6948626943717670948?from=search-suggest](https://juejin.cn/post/6948626943717670948?from=search-suggest)

[https://tsejx.github.io/javascript-guidebook/basic-concept/data-types/type-conversion#%E9%9A%90%E5%BC%8F%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2](https://tsejx.github.io/javascript-guidebook/basic-concept/data-types/type-conversion#%E9%9A%90%E5%BC%8F%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2)

[https://juejin.cn/post/7301968484766695458](https://juejin.cn/post/7301968484766695458)

[https://juejin.cn/post/6844903976765227016#heading-0](https://juejin.cn/post/6844903976765227016#heading-0)

[https://juejin.cn/post/6844904093496918023?searchId=20240827091122CE649AF3B6A072C2F1AF](https://juejin.cn/post/6844904093496918023?searchId=20240827091122CE649AF3B6A072C2F1AF)
