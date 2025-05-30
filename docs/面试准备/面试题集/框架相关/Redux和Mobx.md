# Redux 和 Mobx

redux 是一个使用叫做 action 的事件来管理和更新应用状态的模式和工具库，以集中式 store 的方式对整个应用使用的状态进行集中管理，其规则确保状态只能以可预测的方式更新。

mobx 通过运用透明的函数式响应代理使状态管理变得简单和可扩展

## Redux

1、action:action 是一个具有  type 字段的普通 JavaScript 对象。你可以将 action 视为描述应用程序中发生了什么的事件。

2、reducer:reducer 是一个函数，接收当前的  state 和一个  action 对象，必要时决定如何更新状态，并返回新状态。

3、store:当前 Redux 应用的状态存在于一个名为  store 的对象中。

**原则**

- 单一数据源。整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个  store 中。

- State 是只读的。唯一改变 state 的方法就是触发  action，action 是一个用于描述已发生事件的普通对象。

- 使用纯函数来执行修改。为了描述 action 如何改变 state tree ，你需要编写 reducers。

## mobx

1、State(状态): State 是驱动你的应用程序的数据。

2、Actions(动作): Action 是任意可以改变  State 的代码，比如用户事件处理、后端推送数据处理、调度器事件处理等等。

3、Derivations(派生): 任何来源是 State 并且不需要进一步交互的东西都是 Derivation。Mobx 区分了以下两种 Derivation:

- Computed values，总是可以通过纯函数从当前的可观测 State 中派生。

- Reactions，当 State 改变时需要自动运行的副作用。

**原则**
单向数据流，利用 action 改变 state，进而更新所有受影响的 view

![alt text](image-12.png)

### 装饰器语法的发展

Mobx 早期版本（如 Mobx4 和 5）依赖于装饰器语法，这是一个实验性的 ES7 提案，装饰器为开发者提供了一种简洁的方式来注释`类属性和方法`，用于观察、计算或操作状态。典型的装饰器语法如下：

```js
import { observable, action } from "mobx";
import { observer } from "mobx-react";

class Store {
  @observable count = 0;

  @action increment() {
    this.count++;
  }
}
```

装饰器语法的优点：

- 简洁：使代码看起来更加简洁和可读，通过注释样式的声明可以快速标注哪些属性或方法是观察的或可操作的

- 语义化：更具语义性，标注了哪些类成员是 observable（可观察的），哪些是 action（行为）

随着 JavaScript 装饰器提案的变更、React Hooks 的流行以及工具链复杂性的增加，MobX 逐渐放弃了对装饰器的默认支持，转而使用更稳定且兼容性更好的函数式 API。这一变化反映了 JavaScript 生态和标准的发展趋势。

#### JavaScript 装饰器提案的变化

1、实验性装饰器（Stage 2 提案）

- 最早的装饰器语法基于 Babel 编译器实现，允许开发者在类和类的属性上使用装饰器语法，这在 mobx 和 typescript 中都获得了广泛使用

2、提案的修改

> 随着装饰器提案的发展，装饰器的行为发生了很大的变化

> 与原有实现存在显著差异，使得 mobx 及其他库无法继续无缝使用原来的装饰器语法

> 尤其是新的装饰器提案要求不同的语法和编译器支持，旧的装饰器功能不再兼容，导致大量工具链的改变

## 区别

1、数据可变性

Redux 采用函数式编程，使用了纯函数。函数获取输入，返回输出，并且没有其他依赖项，而是纯函数。纯函数始终使用相同的输入生成相同的输出，并且没有任何副作用。

Redux 状态对象通常是不可变的（Immutable），我们不能直接操作状态对象，而是始终返回一个新状态

MobX 遵循的是面向对象编程原则，可以直接使用新值更新状态对象。

2、store 的区别

store 是应用管理数据的地方，在 Redux 应用中，总是将数据保存在一个全局的 store 中，而 Mobx 则通常按模块将应用状态划分，在多个独立的 store 中管理。

在 mobx 中，可以通过创建一个 RootStore 来实例化所有 stores，并共享引用。这样的方式不仅设置简单，而且很好的支持了强类型。

3、更新过程

Redux：

> 1、点击按钮
>
> 2、dispatch 一个 action 到 Redux store
>
> 3、store 用之前的 state 和当前的 action 再次运行 reducer 函数，并将返回值保存为新的 state
>
> 4、store 通知所有订阅过的 UI，通知 store 发生更新
>
> 5、每个订阅过 store 数据的 UI 组件都会检查它们需要的 state 部分是否被更新
>
> 6、发现数据被更新的每个组件都强制使用新数据重新渲染，紧接着更新网页

Mobx：

> 1、事件调用 actions
>
> 2、修改 state
>
> 3、state 状态的变更会被精确地传送到所有依赖于它们的计算和副作用里
>
> 4、更新用户界面

![alt text](image-13.png)

## 参考

[https://juejin.cn/post/7087338460129787941](https://juejin.cn/post/7087338460129787941)
