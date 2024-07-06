# Promise

## Promise

Promise的几种状态:

- `待定pending`:初始状态,既没有被兑现,也没有被拒绝

- `已成功resolved/fulfilled`:意味着操作成功完成

- `已拒绝rejected`:意味着操作失败

知识点:

- 执行了resolve(), Promise状态会变成resolved/fulfilled, 即`已完成状态`

- 执行了reject(), Promise状态会变成rejected, 即被`拒绝状态`

- promise的状态只可能从从等待转到完成态或拒绝态,不能逆向转换

> - 且状态只能改变一次,即改变之后无论变成成功还是失败,都不会再改变

- Promise中有throw的话,就相当于执行了reject()

```js
class myPromise{
    static PENDING='pending';
    static FULFILLED='fulfilled';
    static REJECTED='rejected';

    constructor(func){
        this.status=myPromise.PENDING;
        this.result=null;
        // 改变this指向,绑定this为当前的实例对象
        // 因为创建实例对象时,执行的是constructor里的内容,也就是constructor里的this是新实例的,但创建后再在外部环境下执行resolve(),resolve()看着像是和实例一起执行的,但相当于不在class内部使用这个this
        func(this.resolve.bind(this),this.reject.bind(this));
    }

    resolve(result){
        if(this.status===myPromise.PENDING){
            this.status=myPromise.FULFILLED;
            this.result=result;
        }
    }

    reject(reason){
        if(this.status===myPromise.PENDING){
            this.status=myPromise.REJECTED;
            this.result=reason;
        }
    }
}
```

### 实现then方法
- then方法可以传入两个参数，都是函数，一个是当状态为fulfilled成功时执行，另一个是当状态为rejected拒绝时执行

> 需要考虑的问题：
>
>- 直接抛出错误
>
>const p=new myPromise((resolve,reject)=>{throw new Error('直接抛出错误')})
>
>- then两个参数必须的函数
>

```js
class myPromise{
    static PENDING='pending';
    static FULFILLED='fulfilled';
    static REJECTED='rejected';

    constructor(func){
        this.status=myPromise.PENDING;
        this.result=null;
        // 应对直接抛出错误的情况
        try{
            func(this.resolve.bind(this),this.reject.bind(this));
        }catch(error){
            this.reject(error);
        }
    }

    resolve(result){
        if(this.status===myPromise.PENDING){
            this.status=myPromise.FULFILLED;
            this.result=result;
        }
    }

    reject(reason){
        if(this.status===myPromise.PENDING){
            this.status=myPromise.REJECTED;
            this.result=reason;
        }
    }

    then(onResolve,onRejct){
        // 判断传入的参数是否为函数类型
        onResolve=typeof onResolve === 'function' ? onResolve:()=>{}
        onReject=typeof onReject === 'function' ? onReject:()=>{}

        if(this.status === myPromise.FULFILLED){
            onResolve(this.result);
        }

        if(this.status === myPromise.REJECTED){
            onReject(this.result);
        }
    }
}
```

#### then的异步处理
>- then本身未进行异步处理
>
>- 实例化的时候进行异步调用
```js
console.log(111);
const p = new myPromise((resolve, reject) => {
    console.log(222);
​
    setTimeout(() => {
        resolve('正常结果')
        console.log(444);
    });
})
​
p.then(
    (result) => { console.log(result) },
    (reason) => { console.log(reason.message) }
)
console.log(333);
// 正常结果几个字并未输出..
// 是因为先执行了then方法，但发现这个时候状态依旧是 pending，而我们手写部分没有定义pending待定状态的时候应该做什么，因此就少了正常结果 这句话的输出。
```

>- then的链式调用
>

```js
class myPromise{
    static PENDING='pending';
    static FULFILLED='fulfilled';
    static REJECTED='rejected';

    constructor(func){
        this.status=myPromise.PENDING;
        this.result=null;
        // 保存then里面的回调函数
        this.onFulfilledCallbacks=[];
        this.onRejectedCallbacks=[];

        // 应对直接抛出错误的情况
        try{
            func(this.resolve.bind(this),this.reject.bind(this));
        }catch(error){
            this.reject(error);
        }
    }

    resolve(result){
        if(this.status===myPromise.PENDING){
            // resolve和reject是在事件循环末尾执行的
            setTimeout(()=>{
                this.status=myPromise.FULFILLED;
                this.result=result;
                // 执行回调函数队列
                this.onFulfilledCallbacks.forEach(callback=>callback(result));
            });
        }
    }

    reject(reason){
        if(this.status===myPromise.PENDING){
            // resolve和reject是在事件循环末尾执行的
            setTimeout(()=>{
                this.status=myPromise.REJECTED;
                this.result=reason;
                // 执行回调函数队列
                this.onRejectedCallbacks.forEach(callback=>callback(reason));
            });
        }
    }

    then(onResolve,onRejct){
        // 判断传入的参数是否为函数类型
        onResolve=typeof onResolve === 'function' ? onResolve:()=>{}
        onReject=typeof onReject === 'function' ? onReject:()=>{}
        
        // 添加pending时要做的事，处理实例化的时候进行异步调用
        if(this.status === myPromise.PENDING) {
            // 这时候resolve或者reject还没有获取到任何值，因此需要让then里的函数稍后再执行，等resolve执行了以后，再执行then
            // 为了保留then里面的函数，可以创建数组来保持函数
            // 为什么用数组？因为一个promise实例可能会多次then，也就是链式调用的情况，而且数组是先入先出的顺序
            this.onFulfilledCallbacks.push(onResolve);
            this.onRejectedCallbacks.push(onReject);
        }

        if(this.status === myPromise.FULFILLED){
            // 给then添加异步
            setTimeout(()=>{
                onResolve(this.result);
            })
        }

        if(this.status === myPromise.REJECTED){
            // 给then添加异步
            setTimeout(()=>{
                onReject(this.result);
            })
        }
    }
}
```

#### 细节太多，后面补

## Promise.all()

- 接收Promise数组,数组中如有非Promise项,则此项当作成功

- 如果所有Promise都成功,则返回成功结果数组

- 如果有一个Promise失败,则返回这个失败结果

```js
all(paramsArr){
    const result=[];
    let count=0;
    return new Promise((resolve,reject)=>{
        paramsArr.forEach((item, index)=>{
            if(item instanceof Promise){
                item.then(
                    res=>{
                        count++;
                        result[index]=res;
                        count === paramsArr.length && resolve(result);
                    },
                    err => reject(err);
                )
            }else{
                count++
                result[index]=item;
                count === paramsArr.length && resolve(result);
            }
        })
    })
}
```

### Promise.race()

- 接受一个Promise数组,数组中如有非Promise项,则此项当作成功

- 哪个Promise最快得到结果,就返回那个结果,无论成功失败

```js
race(paramsArr){
    return new Promise((resolve,reject)=>{
        paramsArr.forEach(item=>{
            if(item instanceof Promise){
                item.then(
                    res=>{
                        resolve(res);
                    },
                    err=>{
                        reject(err);
                    }
                )
            }else{
                resolve(item);
            }
        })
    })
}
```








## 参考资料

[https://juejin.cn/post/7194266882088648761#heading-17](https://juejin.cn/post/7194266882088648761#heading-17)

[https://juejin.cn/post/7043758954496655397](https://juejin.cn/post/7043758954496655397)