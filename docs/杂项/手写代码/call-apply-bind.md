# call/apply/bind

## 概述
call、apply、bind是JavaScript中用于改变普通函数this指向（无法改变箭头函数this指向）的方法，这三个函数实际上都是绑定在Function构造函数的prototype上，而每个函数都是Function的实例，因此每一个函数都可以直接调用call，apply，bind

- function.call(thisArg, arg1, arg2, ...), thisArg是要设置为函数执行上下文的对象，也就是this要指向的对象，后面的参数是传递给函数的参数

- function.apply(thisArg, [ argsArray ])，数组作为参数

- function.bind(thisArg, arg1, arg2, ...)，thisArg是要绑定到函数执行上下文的对象，也就是this要指向的对象，后面的参数是传递给函数的参数。与call和apply不同，bind方法并不会立即执行函数，而是返回一个新函数，可以稍后调用

```js
// 定义一个对象
const person1 = {
  name: 'Alice',
  greet: function() {
    console.log(`Hello, ${this.name}!`);
  }
};

// 定义另一个对象
const person2 = {
  name: 'Bob'
};

// 使用call方法将person1的greet方法应用到person2上
person1.greet.call(person2); // 输出：Hello, Bob!


function greet(name) {
  console.log("Hello, " + name);
}

const delayedGreet = greet.bind(null, "John");
setTimeout(delayedGreet, 2000);  // 2秒后输出：Hello, John
```


## call
> ES11 引入了 globalThis，它是一个统一的全局对象，无论在浏览器还是 Node.js 中，都可以使用 globalThis 来访问全局对象。

```js
Function.prototype.myCall = function (context, ...args){
    // 判断调用myCall的是否为函数
    if(typeof this !== 'function'){
        throw new TypeError("");
    }

    context = context || globalThis;

    // 用Symbol来创建唯一的fn，防止名字冲突
    let fn=Symbol("key");

    context[fn]=this;

    const result = context[fn](...args);

    delete context[fn];

    return result;
}
```

## apply
```js
Function.prototype.myApply=function(context, argsArr){
    if(typeof this!=='function'){
        throw new TypeError("");
    }

    context = context || globalThis;

    let fn = Symbol("key")l

    context[fn] = this;

    const result = context[fn](...argsArr);

    delete context[fn]l

    return result;
}

```


## bind

```js
Function.prototype.myBind=function(context,...args){
    if(typeof this !== "function"){
        throw new TypeError("");
    }

    context = context || globalThis;

    // 保存原始函数的引用，this是要绑定的函数
    const _this = this;
    
    // 返回一个新的函数作为绑定函数
    return function fn(...innerArgs){
        // 判断返回出去的函数有没有被new
        if(this instanceof fn){
            return new _this(...args,...innerArgs);
        }
        // 使用apply方法将原函数绑定到指定的上下文对象上
        return _this.apply(context, args.concat(innerArgs));
    }
}
```














