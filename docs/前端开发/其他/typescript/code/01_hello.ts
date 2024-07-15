// 直接使用字面量进行类型声明

// let a:10;
// a=10;
// a=11;

// 可以使用|来连接多个类型（联合类型）
let b:"male"|"female";
b="male";
b="female"

let c:boolean|string;
c=true;
c="123"

// any表示的是任意类型，设置为any后相当于对该变量关闭了TS的类型检测
// 不建议使用any类型
let d:any;
d=10;
d=false;
d="123";
// 只声明不指定类型，ts解析器自动判断变量的类型为any(隐式any)
let e;

// unknow表示位置的类型
let f:unknown;
f=1
f=false

// any类型可以赋值给任意变量
let s:string
s=d
// s=f


f='hello'
// s=f

if (typeof f==="string"){
    s=f
}

// 类型断言，告诉解析器变量的实际类型
/*
*语法：
* 变量 as 类型
* <类型>变量
*/
s=f as string;
s=<string>f;

function fn():boolean{
    return true
}

