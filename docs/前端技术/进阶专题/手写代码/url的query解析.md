# url的query解析

> 如何快速获取URL的查询参数？

## URLSearchParams API
URLSearchParams是一个内置的 JavaScript API，用于处理 URL 的查询参数。它提供了一种方便的方式来获取、设置和删除查询参数

首先，可以使用window.location.search获取 URL 的查询字符串，然后将其传递给URLSearchParams构造函数来创建一个URLSearchParams对象。

```js
const urlParams = new URLSearchParams(window.location.search);
// 获取单个参数
const paramValue = urlParams.get("paramName");
// 遍历
urlParams.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
```

### URLSearchParams 介绍

1、创建URLSearchParams对象

- 从现有URL

```js
const urlParams=new URLSearchParams(window.location.search);
```

- 从字符串

```js
const queryString="param1=value1&param2=value2";
const urlParams=new URLSearchParams(queryString);
```

2、主要方法

- get()方法：获取指定参数的第一个值，不存在则返回null

```js
const value = urlParams.get("paramName");
```

- set()方法：设置指定参数的值，不存在则添加一个新的参数

```js
urlParams.set("paramName", "newValue");
```

- append()方法：向现有参数添加一个新的值，不存在则添加一个新的参数

```js
urlParams.append("paramName", "anotherValue");
```

- delete()方法：删除指定的参数

```js
urlParams.delete("paramName");
```

- has()方法：检查指定的参数是否存在，返回一个布尔值

```js
const hasParam = urlParams.has("paramName");
```

- 遍历参数：可以使用forEach()方法遍历所有参数

```js
urlParams.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
```



## 手动解析
```js
const queryString = window.location.search.substring(1);
const params = {};
const paramPairs = queryString.split("&");
paramPairs.forEach((pair) => {
  const [key, value] = pair.split("=");
  if (key) {
    params[key] = decodeURIComponent(value);
  }
});
```

## 第三方库

例如`qs`

```js
import qs from "qs";

const queryString = window.location.search.substring(1);
const params = qs.parse(queryString);
```

## 参考
[https://github.com/pro-collection/interview-question/issues/1012](https://github.com/pro-collection/interview-question/issues/1012)
