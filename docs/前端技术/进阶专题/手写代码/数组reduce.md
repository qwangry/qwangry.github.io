# 数组 reduce

## 介绍

reduce 是对数组中的每个元素执行给定的 reducer 函数，将其结果汇总为单个返回值

```js
arr.reduce(callback(accumulator, currentValue[, index[, array]]))[,initialValue]
```

- callback：执行数组中的每个值（如果没有提供 initialValue，则第一个值除外）的函数

- accumulator：累计器，是上一次调用回调时返回的累积值，或 initialValue

- currentValue：当前值

- index：当前索引

- array：源数组

- initialValue：初始值，默认为数组的第一个

```js
var arr = [1, 2, 3, 4];
var s1 = arr.reduce(function (result, item) {
  return result + item;
});
//10
var s2 = arr.reduce(function (result, item) {
  return result + item;
}, 10);
//20
```

## 手写 reduce

```js
function reduce(arr, cb, initicalValue) {
  var num = initicalValue == undefined ? arr[0] : initicalValue;

  var i = initicalValue == undefined ? 1 : 0;
  for (i; i < arr.length; i++) {
    num = cb(num, arr[i], i);
  }
  return num;
}
```
