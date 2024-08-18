# web 安全

## 前端安全相关的问题

### 浏览器相关

1、XSS

2、CSRF

3、HTTPS

4、CSP

5、HSTS，强制客户端使用 HTTPS 与服务端建立历连接

6、X-Frame-Options，控制当前页面是否可以被嵌入到 iframe 中

7、SRI(subresource intergrity 子资源完整性策略)

> 防止子资源被恶意篡改注入攻击脚本
>
> 1、xxx.js 注入 index.html 中并上传到 cdn
>
> 2、用户请求时，根据 xxx.js 取请求，但这个文件可能被篡改
>
> SRI 的作用是，打包的时候根据 js 内容生成一个 hash 值，并且把 hash 值作为 intergrity 属性注入到 script 上。只要哈希不一样，就能认为不一样或者不完整

8、Referer-Policy(控制 http 请求头 referer 的携带策略)：用于同源检查，阻止第三方域名访问

### Node(服务端)相关

1、本地文件操作

2、ReDos(正则 Dos 攻击)

3、时序攻击

4、ip origin referer / request header(各个网站爬虫防范点)

### 其他

1、SQL 注入

> 前端数据校验

2、ARP 欺骗

> 伪造成网关，让受害者的数据经过攻击者的电脑，从而抓取别人的用户信息

3、XFF

> payload: X-Forwarded-For：协议头伪造 IP 注入攻击
>
> HTTP X-Forwarded-For

4、DoS / DDoS

## 参考链接

[https://www.xiaohongshu.com/explore/66b4817b000000002503097d?xsec_token=ABR2n4dHhFLC6QMxYit0DksO4-FJnHiHsXpbFd0pkpsKU=&xsec_source=pc_user](https://www.xiaohongshu.com/explore/66b4817b000000002503097d?xsec_token=ABR2n4dHhFLC6QMxYit0DksO4-FJnHiHsXpbFd0pkpsKU=&xsec_source=pc_user)
