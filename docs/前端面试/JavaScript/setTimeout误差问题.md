# setTimeout误差问题

setTimeout的时间并不总是精确的，在JavaScript中，setTimeout的时间表示的是在指定的最小延迟时间之后，将定时器的回调任务放入事件循环的任务队列中。因为JavaScript是单线程的，定时器的回调可能会被其他任务（如较长的同步任务、I/O操作等）阻塞，从而导致延迟执行。因此，setTimeout的执行时间是最小的延迟，而不是绝对的、精确的延迟时间

## 影响setTimeout精确度的因素

### JavaScript是单线程的

### 事件循环

### 最小延迟时间

在浏览器中，setTimeout 的最小延迟时间通常是4 毫秒，如果你设置的延迟时间小于 4 毫秒，浏览器会强制将延迟时间调整为 4 毫秒。因此，即使你将 setTimeout 的延迟时间设置为 0 毫秒，实际的延迟时间至少是 4 毫秒。

### CPU负载

当浏览器或者 Node.js 运行在高 CPU 负载的环境下时，任务的执行可能会被推迟。高 CPU 使用率会影响事件循环的流畅性，进而影响 setTimeout 回调的执行时间。

### 浏览器的内部优化

一些浏览器会对 setTimeout 进行优化，尤其是在标签页不处于活动状态时。为了节省资源，浏览器会降低 JavaScript 定时器的精度，有时会将定时器的执行推迟到较长的时间间隔内。

## 如何确保更准时的定时？

### requestAnimationFrame
requestAnimationFrame 是浏览器提供的一个专门用于动画的 API。它可以在每次页面重绘前调用指定的回调函数，适合用于需要精确控制帧率的场景

```js
let start = null;

function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    console.log(`Time elapsed: ${progress}ms`);
    if (progress < 1000) {  // 假设动画持续 1000 毫秒
        requestAnimationFrame(step);
    }
}

requestAnimationFrame(step);
```

### 递归setTimeout
如果需要周期性执行任务，而不希望被事件循环阻塞影响，可以使用递归调用 setTimeout，这种方式可以确保在前一个任务完成后再设置新的定时器。

```js
function runTask() {
    setTimeout(() => {
        console.log('Task executed');
        runTask();  // 再次设置定时器
    }, 1000);
}

runTask();

```

### 使用高精度时间API
在需要精确计时的场景下，可以使用浏览器的高精度时间 API，例如 performance.now()。它提供了比 Date.now() 更高的时间精度，适合用于测量精确的时间间隔。

```js
const startTime = performance.now();

setTimeout(() => {
    const elapsed = performance.now() - startTime;
    console.log(`Elapsed time: ${elapsed}ms`);
}, 1000);

```

## 其他减少误差的方法

### 使用精确计时库
可以使用像setInterval或requestAnimationFrame这样精确的计时机制来实现准确的定时任务
```js
//系统时间补偿，实现一个更加精确的setTimouta
function countDown(duration,callback) {
    const startTime = performance.now()
    function tick(){
        const currentTime = performance.now()
        const elapsed = currentTime - startTime
        const remaining = duration - elapsed
        if(remaining<= 0) {
            callback()
        } else {
            setTimeout(tick, Math.max(0,remaining))
        }
    }
    tick()
}

const duration  = 6000
countDown(duration,()=>{
    console.log('倒计时结束')
})
```


### 手动调整
在每次定时器触发后，通过记录实际执行时间并与预期执行时间进行比较，计算误差并进行手动调整，以纠正误差
```js
// setTimeout 补偿系统时间
function mySetTiemout(fn, delay, ...args){
    let currentTime = Date.now()
    let timer = null
     const task = ()=>{
        currentTime +=delay
         timer = setTimeout(()=>{
             fn.apply(this, args)
         },currentTime - Date.now())
     }

     task()
    return clearTimeout(timer)
}
```
### 使用Web Workers
将计时任务移至 Web Workers 中执行，这样可以避免与主线程的其他代码竞争，提高定时器的准确性。

### 使用时间戳
而不是依赖定时器的延迟时间，使用时间戳来进行倒计时和计算，可以更精确地控制时间。

## 参考

[https://juejin.cn/post/7350209063522025510](https://juejin.cn/post/7350209063522025510)
