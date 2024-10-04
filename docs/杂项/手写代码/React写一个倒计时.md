# React写一个倒计时

```js
import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    // 如果倒计时已经结束，直接返回
    if (timeLeft <= 0) return;

    // 设置一个计时器，更新剩余时间
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // 在组件卸载或倒计时结束时清除计时器
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div>
      {timeLeft > 0 ? (
        <p>Time left: {timeLeft} seconds</p>
      ) : (
        <p>Countdown finished!</p>
      )}
    </div>
  );
};

export default CountdownTimer;


import React from 'react';
import CountdownTimer from './CountdownTimer';

const App = () => {
  return (
    <div>
      <h1>Countdown Timer</h1>
      <CountdownTimer initialTime={10} /> {/* 倒计时10秒 */}
    </div>
  );
};

export default App;
```