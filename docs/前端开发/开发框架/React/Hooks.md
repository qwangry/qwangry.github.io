# Hooks

Hook 是能组件使用 React 功能的特殊函数。

只能在组件或自定义 Hook 的最顶层调用。 

不能在条件语句、循环语句或其他嵌套函数内调用 Hook。

Hook 是函数，但将它们视为关于组件需求的无条件声明会很有帮助。在组件顶部 “use” React 特性，类似于在文件顶部“导入”模块。

## useState
useState Hook 声明一个状态变量。它接收初始状态并返回一对值：当前状态，以及一个更新状态的设置函数。

useState 的唯一参数是 state 变量的初始值

React内部，为每个组件保存了一个数组，其中每一项都是一个state对，它维护当前state对的索引值，在渲染之前将其设置为“0”。每次调用useState时，React都会提供一个state对并增加索引值

State是隔离且私有的。State是屏幕上组件实例内部的状态。换句话说，如果渲染同一个组件两次，每个副本都会有完全隔离的state，改变其中一个不会影响另一个。

```tsx
import { useState } from 'react';
const [enabled,setEnabled]=useState(false);
```

## useReducer


## useContext
useContext是一种无需通过组件传递props而可以直接在组件树种传递数据的技术。它是通过创建provider组件使用，通常还会创建一个Hook以在子组件中使用该值。

```tsx
import {createContext, useContext, useState} from 'react'


```


## useMemo 
useMemo会从函数调用中创建/重新访问记忆化值，只有在第二个参数中传入的依赖项发生变化时，才会重新运行该函数。函数的类型是根据第一个参数中函数的返回值进行推断的，如果希望明确指定，可以为该Hook提供一个类型参数以指定函数类型

```tsx
const visibleTodos = useMemo(()=>filterTodos(todos, tab),[todos, tab]);
```

## useCallback
useCallback会在第二个参数中传入的依赖项保持不变的情况下，为函数提供相同的引用。与 useMemo 类似，函数的类型是根据第一个参数中函数的返回值进行推断的，如果希望明确指定，可以为这个 Hook 提供一个类型参数以指定函数类型。

```tsx
const handleClick = useCallback(() => {
  // ...
}, [todos]);
```




















