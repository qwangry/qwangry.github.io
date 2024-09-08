# React 组件通信

## 父-子：props 传递

props 传递，利用 React 单向数据流的思想，通过 props 传递

## 子-父：回调函数/事件冒泡/Ref

### 回调函数

父组件向子组件传递一个函数，通过函数回调，拿到子组件传过来的值

```js
import React from "react"
class Parent extends React.Component{
  constructor(){
    super()
    this.state={
      price:0
    }
  }
  getPrice(val){
    this.setState({
      price:val
    })
  }
  render(){
    return (<div>
      <span className="label">价格:</span>
      <span className="value">{this.state.price}</span>
      <Child getPrice={this.getPrice.bind(this)}/>
    </div>)
  }
}

class Child extends React.Component{
  getItemPrice(e){
    this.props.getPrice(e)
  }
  render(){
    return (
      <div>
        <button onClick={this.getItemPrice.bind(this)}>廓形大衣</button>
        <button onClick={this.getItemPrice.bind(this)>牛仔裤</button>
      </div>
    )
  }
}
```

### 事件冒泡

点击子组件的 button 按钮，事件会冒泡到父组件上

```js
const Child = () => {
  return <button>点击</button>;
};

const Parent = () => {
  const sayName = (name) => {
    console.log(name);
  };
  return (
    <div onClick={() => sayName("lyllovelemon")}>
      <Child />
    </div>
  );
};

export default Parent;
```

### Ref

```js
import React from "react";
class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    this.myRef.current.changeVal("lyllovelemon");
  }
}
class Child extends React.Component {
  constructor(props) {
    super(props);
  }
  changeVal(name) {
    console.log(name);
  }
  render() {
    return <div></div>;
  }
}
```

## 兄弟

实际上就是通过父组件中转数据的，子组件 a 传递给父组件，父组件再传递给子组件 b

## 父-后代

### Context

```js
import React from "react"
const PriceContext = React.createContext("price")
export default class Parent extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <PriceContext.Provider value={200}>
      </PriceContext>
    )
  }
}
class Child extends React.Component{
  ...
}
class SubChild extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <PriceContext.Consumer>
        { price=> <div>price:{price}</div> }
      </PriceContext.Consumner>
    )
  }
}
```

### HOC

### Redux

ref，useRef，forwardRef，useImperativeHandle

## 无关组件通信

## 参考

[https://juejin.cn/post/7182382408807743548?searchId=20240906182155ED73E066E10924BC2D23#heading-8](https://juejin.cn/post/7182382408807743548?searchId=20240906182155ED73E066E10924BC2D23#heading-8)
