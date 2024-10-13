# Object-Set-Map

## Object

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上`只能用字符串`当作键。这给它的使用带来了很大的限制。

### 特点

1、字符串和符号作为键：只能是字符串或Symbol，使用其他类型的键时，会被自动转换为字符串

2、原型链：Object的键值对会受到原型链的影响，除非使用Object.create(null)创建一个无原型的对象。默认的对象继承了一些原型方法，比如toString和hasOwnProperty，使用时可能会导致意外的行为

3、轻量级键值存储：在简单的场景下，Object更轻量，且常用于处理JSON格式的数据

4、内存消耗较小：在小数据量的场景下，Object的内存消耗通常较低，适合轻量级键值对的存储

### 适用场景

1、处理JSON数据

2、简单的键值对存储

3、少量数据

### map和Object适用场景对比

![alt text](image-14.png)


## Set

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

### 特点
1、唯一性：所有值都是唯一的

2、支持任何类型：set可以存储任何类型的值（原始值或对象引用）

3、自动去重

4、遍历顺序：保持插入顺序，迭代时的顺序与值被插入的顺序一致

### 适用场景
1、去除数组中的重复值

2、高效检查元素是否存在：提供了高效的`has()`方法来检查某个元素是否存在

3、集合操作：可以实现并集、交集和差集

```js
// 并集
const setA = new Set([1, 2, 3]);
const setB = new Set([3, 4, 5]);
const union = new Set([...setA, ...setB]);
console.log(union); // 输出 Set { 1, 2, 3, 4, 5 }

// 交集
const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);
const intersection = new Set([...setA].filter(x => setB.has(x)));
console.log(intersection); // 输出 Set { 2, 3 }

// 差集
const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);
const difference = new Set([...setA].filter(x => !setB.has(x)));
console.log(difference); // 输出 Set { 1 }

```

4、频繁的添加/删除操作的集合

5、管理大型数据集合：处理大型数据时，Set提供了比数组更好的性能，尤其是在处理查找、添加和删除操作时。可以用来管理一组不重复的数据，保持高效的操作性能

6、事件监听去重

### 实例属性和方法

**属性：**

- `Set.prototype.constructor`：构造函数，默认就是 Set 函数。

- `Set.prototype.size`：返回 Set 实例的成员总数。

**方法：**

操作方法：用于操作数据

- `Set.prototype.add(value)`：添加某个值，返回 Set 结构本身

- `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功

- `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为 Set 的成员

- `Set.prototype.clear()`：清除所有成员，没有返回值

遍历方法：用于遍历成员

- `Set.prototype.keys()`

- `Set.prototype.values()`

- `Set.prototype.entries()`

- `Set.prototype.forEach()`

```js
let set = new Set(["red", "green", "blue"]);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

### 集合运算

ES2025 为 Set 结构添加了以下集合运算方法：

- Set.prototype.intersection(other)：交集

- Set.prototype.union(other)：并集

- Set.prototype.difference(other)：差集

- Set.prototype.symmetricDifference(other)：对称差集

- Set.prototype.isSubsetOf(other)：判断是否为子集

- Set.prototype.isSupersetOf(other)：判断是否为超集

- Set.prototype.isDisjointFrom(other)：判断是否不相交

## WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

首先，WeakSet 的成员只能是`对象和 Symbol 值`，而不能是其他类型的值。

其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

## Map

ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是`“键”的范围不限于字符串`，`各种类型的值（包括对象）都可以当作键`。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

### 特点

1、任意类型的键

2、有序性：按照插入顺序保存键值对

3、键的唯一性：键是唯一的，如果一个键被重新插入，新的值会覆盖旧的值

4、内建方法：提供了丰富的操作方法，如set、get、delete、clear等

5、更好的性能：在处理大量数据或频繁增删操作时，map的性能通常优于object


## 适用场景

1、任意类型的键

2、需要保持插入顺序时

3、频繁的增删查操作

## WeakMap

WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。

WeakMap 与 Map 的区别有两点。

首先，WeakMap 只接受对象（null 除外）和 Symbol 值作为键名，不接受其他类型的值作为键名。

其次，WeakMap 的键名所指向的对象，不计入垃圾回收机制。

## 总结

![alt text](image-5.png)

## 参考

[https://wangdoc.com/es6/set-map#map](https://wangdoc.com/es6/set-map#map)
