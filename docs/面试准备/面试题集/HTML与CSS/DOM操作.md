# DOM操作

## 选中DOM元素

### 基于ID
```js
let element=document.getElementById("elementId");
```

### 基于类名

```js
let elements=document.getElementsByClassName("className");
```

### 基于标签名
```js
let elements=document.getElementsByTagName("tagName");
```

### 基于选择器
```js
// 第一个匹配的
let element=document.querySelector('cssSelector');

// 所有匹配的
let elements=document.querySelectorAll('cssSelector');
```

### 通过元素的name属性

```js
let elements = document.getElementsByName("name");
```

### 查找最近的祖先元素（包括自身）`closest()`
```js
let element = childElement.closest("CSSSelector");
```

### 父子关系parentElement / children / firstElementChild / lastElementChild

- 获取父元素：`parentElement`

```js
let parent = childElement.parentElement;
```

- 获取所有子元素（不包括文本节点）：`children`

```js
let children = parentElement.children;
```

- 获取第一个子元素：`firstElementChild`

```js
let firstChild = parentElement.firstElementChild;
```

- 获取最后一个子元素：`lastElementChild`

```js
let lastChild = parentElement.lastElementChild;
```

## 添加元素

### appendChild
> 将一个节点添加为某个父节点的最后一个子节点
```js
parentNode.appendChild(newNode);
```

### insertBefore
> 在某个指定的子节点之前插入一个新节点
```js
parentNode.insertBefore(newNode, referenceNode);
```

### append
> 可以添加节点或文本，功能更灵活，不强制要求必须是节点
```js
parentNode.append(newNode);  // 或者 parentNode.append("Some text");
```

## 移除元素

### removeChild
> 从父节点中移除一个子节点
```js
parentNode.removeChild(childNode);
```


### remove
> 直接删除一个元素
```js
element.remove();
```

## 移动元素

本质是先移除后添加：通过 appendChild 或 insertBefore 将一个已经存在的节点从一个位置移动到另一个位置，它会自动从原位置移除并添加到新位置

```js
newParent.appendChild(existingChild);  // existingChild 将从原父节点中移除并添加到 newParent 中
```

## 复制元素

cloneNode：复制一个节点，可以选择是否深度复制（包括子节点）

```js
// 深度复制，包括子元素
let deepClone = node.cloneNode(true);

// 浅复制，不包括子元素
let shallowClone = node.cloneNode(false);
```

## 创建元素

### createElement
> 创建一个新元素节点

```js
let newElement = document.createElement("div");
```

### createTextNode
> 创建一个文本节点

```js
let textNode = document.createTextNode("Hello World");
```

## 替换元素

replaceChild：将一个子节点替换为另一个节点

```js
parentNode.replaceChild(newNode, oldNode);
```


