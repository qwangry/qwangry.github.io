# Promise并发问题

## 问题描述
100个请求需要发送，并发数量最大为10，怎么完成？

```js
const requestList=[];

for(let i=1;i<=100;i++){
    requestList.push(
        ()=>
        new Promise(resolve=>{
            setTimeout(()=>{
                console.log("done",i);
                resovle(i);
            },Math.random()*1000);
        })
    )
}
```
### Promise.all()

最开始会想到Promise.all()

```js
const paralleRun=async max=>{
    const requestSliceList=[];
    for(let i=0;i<requestList.length;i+=max){
        requestSliceList.push(requestList.slice(i,i+max));
    }

    for(let i=0;i<requestSliceList.length;i++){
        const group=requestSliceList[i];
        try{
            const res=await Promise.all(group.map(fn=>fn()));
            console.log("接口返回值：",res);
        }catch(err){
            console.error(err);
        }
    }
}
```

但如果其中有一个请求失败了，就会导致Promise.all失败，没有返回值

解决方案：Promise.allSettled()

### Promise.allSettled()

> Promise.allSettled()方法，在有多个不依赖于彼此成果完成的异步任务时，或者总是想知道每个Promise的返回结果时，使用Promise.allSettled()，也就是，每个请求会都返回结果，无论成功还是失败

```js
const paralleRun=async max=>{
    const requestSliceList=[];
    for(let i=0;i<requestList.length;i+=max){
        requestSliceList.push(requestList.slice(i,i+max));
    }

    for(let i=0;i<requestSliceList.length;i++){
        const group=requestSliceList[i];
        try{
            const res=await Promise.allSettled(group.map(fn=>fn()));
            console.log("接口返回值：",res);
        }catch(err){
            console.error(err);
        }
    }
}
```

但是如果有一个接口非常耗时，会导致其他接口的并发未知都被浪费了，这样会导致100个接口的并发时间变长

## 最优解：运行池和等待队列

维护一个运行池和等待队列，运行池始终保持10个请求并发，当运行池中有一个请求完成时，就从等待队列中拿出一个新请求放到运行池中运行，这样就可以保持运行池始终是满负荷运行，即使有一个满接口，也不会阻塞后续的接口入池

```js
const pool=new Set()

const waitQueue=[];

const request=(reqFn,max)=>{
    return new Promise((resolve,reject)=>{
        const isFull=poll.size>=max;

        const newReqFn=()=>{
            reqFn()
                .then(res=>{
                    resolve(res)
                })
                .catch(err=>{
                    reject(err)
                })
                .finally(()=>{
                    // 该请求完成，从运行池中删除
                    pool.delete(newReqFn);
                    const next=waitQueue.shift();
                    if(next){
                        pool.add(next);
                        next();
                    }
                })
        };

        // 如果当前运行池已满，则将请求放入等待队列
        if (isFull) {
            waitQueue.push(newReqFn);
        } else {
            // 运行池未满，直接将请求加入运行池中执行
            pool.add(newReqFn);
            newReqFn();
        }
    })
}
```

## 参考

[https://www.xiaohongshu.com/explore/66eab1340000000027003a13?xsec_token=ABcVqLTuj-rbFYfuW8AVlciR9pbyBkC3PTMfBTrkSbU4E=&xsec_source=pc_user](https://www.xiaohongshu.com/explore/66eab1340000000027003a13?xsec_token=ABcVqLTuj-rbFYfuW8AVlciR9pbyBkC3PTMfBTrkSbU4E=&xsec_source=pc_user)