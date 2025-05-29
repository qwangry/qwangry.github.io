# instanceOf

## 思路

1、先取得当前类的原型，当前实例对象的原型链

2、一直循环（执行原型链的查找机制）

- 取得当前实例对象原型链的原型链（`proto=proto.__proto__`，沿着原型链一直向上查找）

- 如果 当前实例的原型链`__proto__`上找到了当前类的原型`prototype`，则返回 true

- 如果 一直找到`Object.prototype.__proto__==null`，Object 的基类（null）上面都没找到，则返回 false

## 代码

```js
// 实例.__proto__===类.prototype
function myInstanceof(example, classFunc) {
  let proto = Object.getPrototypeOf(example);
  while (true) {
    if (proto == null) return false;

    // 在当前实例对象的原型链上，找到了当前类
    if (proto == classFunc.prototype) return true;

    // 沿着原型链查找
    proto = Object.getPrototypeof(proto); //等于proto.__proto__
  }
}
```
