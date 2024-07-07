# websocket

## 概念

websocket是一种网络通信协议。

http通信只能由客户端发起，做不到服务器主动向客户端推送消息。

如果服务器有连续的状态变化，客户端要知道这个变化非常麻烦，只能通过“轮询”，也就是每隔一段时间，发出一个询问，了解服务器有没有新的消息。

轮询的效率非常低，非常浪费资源，因为必须不停连接，或者http连接始终打开。

因此，就产生了websocket。


## 特点

1、服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，真正的双向平等对话，属于服务器推送技术的一种。

2、建立在TCP协议之上

3、与HTTP协议有良好的兼容性

4、数据格式比较轻量，性能开销小，通信高效

5、没有同源限制，客户端可以与任意服务器通信

6、协议标识符是ws，加密的是wss，服务器网址就是url

> ws://example.com:80/some/path

## 建立连接过程

1、websocket连接由浏览器发起，请求协议是一个标准的HTTP请求

```js
GET ws://localhost:3000/ws/chat HTTP/1.1
Host: localhost
Upgrade: websocket
Connection: Upgrade
Origin: http://localhost:3000
Sec-WebSocket-Key: client-random-string
Sec-WebSocket-Version: 13
```

请求头Upgrade:websocket和Connection:Upgrade表示连接将要被转换为WebSocket连接

Sec-WebSocket-Key是用于标识这个连接

Sec-WebSocket-Version指定了WebSocket的协议版本


2、 随后，服务器如果接受请求，就会返回响应

```js
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: server-random-string
```

响应代码101表示本次连接的HTTP协议即将被修改，更改后的协议就是Upgrade:websocket指定的websocket协议

3、websocket连接建立成功，浏览器和服务器就可以随时主动发送消息给对方。


## 客户端API

### 构造函数
WebSocket对象作为一个构造函数，用于新建WebSocket实例。

```js
var ws=new WebSocket('ws://localhost:8080');
```

### webSocket.readyState

`readyState`属性返回实例对象的当前状态：

- CONNECTING：值为0，表示正在连接；

- OPEN：值为1，表示连接成功，可以通信了；

- CLOSING：值为2，表示连接正在关闭；

- CLOSED：值为3，表示连接已经关闭，或者打开连接失败

### webSocket.onopen
用于指定连接成功后的回调函数

```js
ws.onopen=function(){
    ws.send('xxx');
}
```

如果要指定多个，可以使用addEventListener方法
```js
ws.addEventListener('open',function(event){
    ws.send('xxx');
})
```

### webSocket.onclose
指定连接关闭后的回调函数

### webSocket.onmessage
指定收到服务器数据后的回调函数

服务器数据可能是文本，也可能是二进制数据（blob对象或Arraybuffer对象）

```js
ws.onmessage=function(event){
    if(typeof event.data===String){
        console.log("xxx");
    }

    if(event.data instanceof ArrayBuffer){
        var buffer=event.data;
        console.log("Xxx");
    }
}
```
也可以使用binaryType属性，显式指定收到的二进制数据类型

```js
// 收到的是 blob 数据
ws.binaryType = "blob";
ws.onmessage = function(e) {
  console.log(e.data.size);
};

// 收到的是 ArrayBuffer 数据
ws.binaryType = "arraybuffer";
ws.onmessage = function(e) {
  console.log(e.data.byteLength);
};
```
### webSocket.send()
用于向服务器发送数据

```js
// 发送文本
ws.send('message');

// 发送blob对象
var file=document.querySelector('input[type="file"]').files[0];
ws.send(file);

// 发送ArrayBuffer对象
var img=canvas_context.getImageData(0,0,400,320);
var binary=new Uint8Array(img.data,data.length);
for(var i=0;i<img.data.length;i++){
    binary[i]=img.data[i];
}
ws.send(binary.buffer);
```

### webSocket.bufferedAmount
表示还有多少字节的二进制数据没有发送出去，可以用来判断发送是否结束

```js
var data = new ArrayBuffer(10000000);
socket.send(data);

if (socket.bufferedAmount === 0) {
  // 发送完毕
} else {
  // 发送还没结束
}
```
### webSocket.onerror
用于指定报错的回调函数

## 保证websocket的可靠性和稳定性

### 心跳机制
心跳机制通过定期发送Ping/Pong帧来检测连接的活跃状态，防止由于长时间无数据传输而导致连接被中间设备（如路由器、防火墙）关闭
```js
// 发送心跳Ping消息
const pingInterval = setInterval(() => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'ping' }));
    }
}, 30000);  // 每30秒发送一次Ping消息
```

### 重连机制
在连接断开时自动重连，以保证连接的持续性。可以在客户端实现重连机制。
```js
    socket.onclose = () => {
        console.log('Connection closed, attempting to reconnect...');
        if (!reconnectInterval) {
            reconnectInterval = setInterval(connect, 5000);  // 每5秒尝试重连一次
        }
    };
```

### 断线重连
在服务器端也要对客户端的重连进行适当处理，确保连接状态的一致性。

```js
    const interval = setInterval(() => {
        wss.clients.forEach((client) => {
            if (!client.isAlive) {
                return client.terminate();
            }
            client.isAlive = false;
            client.ping(() => {});
        });
    }, 30000);  // 每30秒进行一次心跳检查
```

### 错误处理和日志记录
在客户端和服务器端都要对错误进行适当处理，并记录日志以便于问题的追踪和排查。
```js
// 客户端
socket.onerror = (error) => {
    console.error('WebSocket error:', error);
    // 根据需要进行进一步的错误处理
};
// 服务端
ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    // 根据需要进行进一步的错误处理
    ws.close();
});
```

### 优雅关闭连接
在需要关闭连接时，通过发送关闭帧（Opcode 0x8）来优雅地关闭连接。

```js
// 客户端
function closeConnection() {
    if (socket.readyState === WebSocket.OPEN) {
        socket.close(1000, 'Closing connection');  // 1000表示正常关闭
    }
}

// 服务端
ws.on('close', (code, reason) => {
    console.log(`Connection closed: ${code} - ${reason}`);
    // 处理连接关闭逻辑
});
```

## 封装

### 阿里开源hook写法
参考[https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useWebSocket/index.ts](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useWebSocket/index.ts)

```ts
import { useEffect, useRef, useState } from 'react';
import useLatest from '../useLatest';
import useMemoizedFn from '../useMemoizedFn';
import useUnmount from '../useUnmount';

export enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

export interface Options {
  reconnectLimit?: number;
  reconnectInterval?: number;
  manual?: boolean;
  onOpen?: (event: WebSocketEventMap['open'], instance: WebSocket) => void;
  onClose?: (event: WebSocketEventMap['close'], instance: WebSocket) => void;
  onMessage?: (message: WebSocketEventMap['message'], instance: WebSocket) => void;
  onError?: (event: WebSocketEventMap['error'], instance: WebSocket) => void;

  protocols?: string | string[];
}

export interface Result {
  latestMessage?: WebSocketEventMap['message'];
  sendMessage: WebSocket['send'];
  disconnect: () => void;
  connect: () => void;
  readyState: ReadyState;
  webSocketIns?: WebSocket;
}

export default function useWebSocket(socketUrl: string, options: Options = {}): Result {
  const {
    reconnectLimit = 3,
    reconnectInterval = 3 * 1000,
    manual = false,
    onOpen,
    onClose,
    onMessage,
    onError,
    protocols,
  } = options;

  const onOpenRef = useLatest(onOpen);
  const onCloseRef = useLatest(onClose);
  const onMessageRef = useLatest(onMessage);
  const onErrorRef = useLatest(onError);

  const reconnectTimesRef = useRef(0);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const websocketRef = useRef<WebSocket>();

  const [latestMessage, setLatestMessage] = useState<WebSocketEventMap['message']>();
  const [readyState, setReadyState] = useState<ReadyState>(ReadyState.Closed);

  const reconnect = () => {
    if (
      reconnectTimesRef.current < reconnectLimit &&
      websocketRef.current?.readyState !== ReadyState.Open
    ) {
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }

      reconnectTimerRef.current = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        connectWs();
        reconnectTimesRef.current++;
      }, reconnectInterval);
    }
  };

  const connectWs = () => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
    }

    if (websocketRef.current) {
      websocketRef.current.close();
    }

    const ws = new WebSocket(socketUrl, protocols);
    setReadyState(ReadyState.Connecting);

    ws.onerror = (event) => {
      if (websocketRef.current !== ws) {
        return;
      }
      reconnect();
      onErrorRef.current?.(event, ws);
      setReadyState(ws.readyState || ReadyState.Closed);
    };
    ws.onopen = (event) => {
      if (websocketRef.current !== ws) {
        return;
      }
      onOpenRef.current?.(event, ws);
      reconnectTimesRef.current = 0;
      setReadyState(ws.readyState || ReadyState.Open);
    };
    ws.onmessage = (message: WebSocketEventMap['message']) => {
      if (websocketRef.current !== ws) {
        return;
      }
      onMessageRef.current?.(message, ws);
      setLatestMessage(message);
    };
    ws.onclose = (event) => {
      onCloseRef.current?.(event, ws);
      // closed by server
      if (websocketRef.current === ws) {
        reconnect();
      }
      // closed by disconnect or closed by server
      if (!websocketRef.current || websocketRef.current === ws) {
        setReadyState(ws.readyState || ReadyState.Closed);
      }
    };

    websocketRef.current = ws;
  };

  const sendMessage: WebSocket['send'] = (message) => {
    if (readyState === ReadyState.Open) {
      websocketRef.current?.send(message);
    } else {
      throw new Error('WebSocket disconnected');
    }
  };

  const connect = () => {
    reconnectTimesRef.current = 0;
    connectWs();
  };

  const disconnect = () => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
    }

    reconnectTimesRef.current = reconnectLimit;
    websocketRef.current?.close();
    websocketRef.current = undefined;
  };

  useEffect(() => {
    if (!manual && socketUrl) {
      connect();
    }
  }, [socketUrl, manual]);

  useUnmount(() => {
    disconnect();
  });

  return {
    latestMessage,
    sendMessage: useMemoizedFn(sendMessage),
    connect: useMemoizedFn(connect),
    disconnect: useMemoizedFn(disconnect),
    readyState,
    webSocketIns: websocketRef.current,
  };
}
```

### 其他写法
[https://juejin.cn/post/7231481633671757861](https://juejin.cn/post/7231481633671757861)
```js
// socket.js
import modal from '@/plugins/modal'
const baseURL = import.meta.env.VITE_APP_BASE_WS;
const EventTypes = ['open', 'close', 'message', 'error', 'reconnect'];
const DEFAULT_CHECK_TIME = 55 * 1000; // 心跳检测的默认时间
const DEFAULT_CHECK_COUNT = 3; // 心跳检测默认失败重连次数
const DEFAULT_CHECK_DATA = { Type: 1, Parameters: ['alive'] }; // 心跳检测的默认参数 - 跟后端协商的
const CLOSE_ABNORMAL = 1006; // WebSocket非正常关闭code码

class EventMap {
  deps = new Map();
  depend(eventType, callback) {
    this.deps.set(eventType, callback);
  }
  notify(eventType, event) {
    if (this.deps.has(eventType)) {
      this.deps.get(eventType)(event);
    }
  }
}

class Socket extends WebSocket {
  heartCheckData = DEFAULT_CHECK_DATA;
  heartCheckTimeout = DEFAULT_CHECK_TIME;
  heartCheckInterval = null;
  heartCheckCount = DEFAULT_CHECK_COUNT
  constructor(options, dep, reconnectCount = 0) {
    let _baseURL = baseURL
    const { url, protocols, query = {}, greet = null, customBase = null } = options;
    const _queryParams = Object.keys(query).reduce((str, key) => {
      if (typeof query[key] !== 'object' && typeof query[key] !== 'function') {
        return str += str.length > 0 ? `&${key}=${query[key]}` : `${key}=${query[key]}`;
      } else {
        return str;
      }
    }, '');
    if (customBase) {
      _baseURL = customBase
    }
    super(`${_baseURL}${url}?${_queryParams}`, protocols);
    this._currentOptions = options;
    this._dep = dep;
    this._reconnectCount = reconnectCount;
    greet && Object.assign(this, {
      heartCheckData: greet
    })
    this.initSocket();
  }

  // 初始化WebSocket
  initSocket() {
    // 监听webSocket的事件
    this.onopen = function (e) {
      this._dep.notify('open', e);
      this.heartCheckStart();
    }
    this.onclose = function (e) {
      this._dep.notify('close', e);
      // 如果WebSocket是非正常关闭 则进行重连
      if (e.code === CLOSE_ABNORMAL) {
        if (this._reconnectCount < this.heartCheckCount) {
          this._reconnectCount++;
          const _socket = new Socket(this._currentOptions, this._dep, this._reconnectCount);
          this._dep.notify('reconnect', _socket);
        } else {
          return modal.msgError('WebSocket重连失败, 请联系技术客服!');
        }
      }
    }
    this.onerror = function (e) {
      this._dep.notify('error', e);
    }
    this.onmessage = function (e) {
      // 如果后端返回的是二进制数据
      if (e.data instanceof Blob) {
        const reader = new FileReader()
        reader.readAsArrayBuffer(e.data)
        reader.onload = (ev) => {
          if (ev.target.readyState === FileReader.DONE) {
            this._dep.notify('message', ev.target?.result);
          }
        }
      } else {
        // 处理普通数据
        try {
          const _parseData = JSON.parse(e.data);
          this._dep.notify('message', _parseData);
        } catch (error) {
          console.log(error)
        }
      }
    }

  }

  // 订阅事件
  subscribe(eventType, callback) {
    if (typeof callback !== 'function') throw new Error('The second param is must be a function');
    if (!EventTypes.includes(eventType)) throw new Error('The first param is not supported');
    this._dep.depend(eventType, callback);
  }

  // 发送消息
  sendMessage(data, options = {}) {
    const { transformJSON = true } = options;
    let result = data;
    if (transformJSON) {
      result = JSON.stringify(data);
    }
    this.send(result);
  }

  // 关闭WebSocket
  closeSocket(code, reason) {
    this.close(code, reason);
  }

  // 开始心跳检测
  heartCheckStart() {
    this.heartCheckInterval = setInterval(() => {
      if (this.readyState === this.OPEN) {
        let transformJSON = typeof this.heartCheckData === 'object'
        this.sendMessage(this.heartCheckData, { transformJSON });
      } else {
        this.clearHeartCheck();
      }
    }, this.heartCheckTimeout)
  }

  // 清除心跳检测
  clearHeartCheck() {
    clearInterval(this.heartCheckInterval);
  }

  // 重置心跳检测
  resetHeartCheck() {
    clearInterval(this.heartCheckInterval);
    this.heartCheckStart();
  }
}
// 默认的配置项
const defaultOptions = {
  url: '',
  protocols: '',
  query: {},
}

export const useSocket = (options = defaultOptions) => {
  if (!window.WebSocket) return modal.msgWarning('您的浏览器不支持WebSocket, 请更换浏览器!');
  const dep = new EventMap();
  const reconnectCount = 0;
  return new Socket(options, dep, reconnectCount);
}
```
首先暴露了一个 useSocket 函数，该函数接收一个 options 配置项参数，支持的参数有：

- url：要连接的 WebSocket URL；

- 
- protocols：一个协议字符串或者一个包含协议字符串的数组；

- query：可以通过 URL 传递给后端的查询参数；

- greet：心跳检测的打招呼信息；

- customBase：自定义的 baseURL ，否则默认使用环境变量中定义的 env.VITE_APP_BASE_WS。


在调用该函数后，首先会判断当前用户的浏览器是否支持 WebSocket，如果不支持给予用户提示。

然后实例化了一个 EventMap 类的实例对象 dep，可以把它当作是一个依赖收集桶，当用户订阅了某个 WebSocket 事件时，将收集这个事件对应的回调作为依赖，在事件触发时，再通知该依赖，然后调用该事件对应的回调函数。

接下来定义了一个初始的重连次数记录值 reconnectCount 为 0，每当这个 WebSocket 重连时，该值会自增。

之后实例化了自己封装的 Socket 类，并传入了上面的三个参数。

在 Socket 类的构造函数 constructor 中，先取出配置项，把 query 内的参数拼接在 URL 上，然后使用 super 调用父类的构造函数进行建立 WebSocket 连接。

之后缓存了当前 Socket 实例化时的参数，再调用 initSocket() 方法去进行 WebSocket 事件的监听：

- onopen：触发 dep 内 open 对应的回调函数并且打开心跳检测；

- onclose：触发 dep 内 close 对应的回调函数并且对关闭的 code 码进行判断，如果是非正常关闭连接，将会进行重连，如果重连次数达到阈值，则通知给用户；

- onerror：触发 dep 内 error 对应的回调函数；

- onmessage：接收到服务端返回的数据，可以先根据自身业务做一些预处理，比如我就根据不同的数据类型进行了数据解析的预处理，之后再触发 dep 内 message 对应的回调函数并传入处理过后的数据。

也暴露了一些成员方法以供实例对象使用：

- subscribe：订阅 WebSocket 事件，传入事件类型并须是 EventTypes 内的类型之一，第二个参数则是回调函数；

- sendMessage：同样的，在给服务端发送数据之前也可以根据自身业务做一些预处理，比如将需要转成 JSON 的数据，在这里统一转换后再发送给服务端；

- closeSocket：关闭 WebSocket 连接；

- heartCheckStart：开始心跳检测，会创建一个定时器，在一定时间之后（默认是55s）给服务端发送信息确认连接是否正常；

- clearHeartCheck：清除心跳检测定时器（如果当前 WebSocket 连接已经关闭，则自动清除）；

- resetHeartCheck：重置心跳检测定时器。

#### 使用
```js
// xx.jsx or xx.vue
import { useSocket } from './socket.js'
const socket = ref(null) // WebSocket实例
const initWebSocket = () => {
  const options = {
    url: '/<your url>',
    query: {
      // something params
    },
  }
  socket.value = useSocket(options)
  socket.value.subscribe('open', () => {
    console.log('WebSocket连接成功!')
    const greet = 'hello'
    // 发送打招呼消息
    socket.value.sendMessage(greet)
  })
  socket.value.subscribe('close', reason => {
    console.log('WebSocket连接关闭!', reason)
  })
  socket.value.subscribe('message', result => {
    console.log('WebSocket接收到消息:', result)
  })
  socket.value.subscribe('error', err => {
    console.log('WebSocket捕获错误:', err)
  })
  socket.value.subscribe('reconnect', _socket => {
    console.log('WebSocket断开重连:', _socket)
    socket.value = _socket
  })
}
initWebSocket()
```

#### debug心跳检测是否有效
```js
// 测试心跳检测重连 手动模拟断开的情况
if (this._reconnectCount > 0) return;
const tempTimer = setInterval(() => {
  this.close();
  if (this._reconnectCount < 3) {
    console.log('重连');
    this._reconnectCount++;
    const _socket = new Socket(this._currentOptions, this._dep, this._reconnectCount);
    this._dep.notify('reconnect', _socket);
  } else {
    return clearInterval(tempTimer);
  }
}, 3 * 1000)
```
