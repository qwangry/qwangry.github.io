# nginx

## 概念

nginx 是一个高性能的 HTTP 和反向代理服务器

> 擅长处理底层的服务器端资源，如静态资源处理、反向代理和负载均衡

### 反向代理

正向代理：隐藏真实客户端信息

反向代理：多个客户端向反向代理服务器发送请求，nginx 根据一定的规则将请求转发至不同的服务器。客户端不知道具体请求将被转发至哪台服务器，反向代理隐藏了后端服务器的信息

## nginx 特性

1、事件驱动：采用高效的异步事件模型，利用 I/O 多路复用技术。这使得 nginx 能在占用最小内存的同时处理大量并发连接

2、高度可扩展：能支持数千乃至数万个并发连接，非常适合大型网站和高并发应用。

3、轻量级：相比传统基于进程的 web 服务器（如 apache），nginx 的内存占用耕地

4、热部署：支持热部署，允许在不重启服务器的情况下更新配置和模块。

```bash
sudo nginx -s reload
```

5、负载均衡：内置负载均衡功能，通过 upstream 模块实现客户端请求在多个后端服务器间的分配，从而提供服务的整体处理额能力

```
将请求轮询分配到三个后端服务器
upstream backend{
  server backend1.example.com;
  server backend2.example.com;
  server backend3.example.com;
}

server{
    location /{
        proxy_pass http://backend;//将请求转发到upstream定义的backend组
    }
}
```

6、高性能：能快速处理静态文件，索引文件及代理请求

```
// 配置nginx作为反向代理，为大型静态文件提供下载服务
location /files/{
    alias /path/to/files/;//设置实际文件存储路径
    expires 30d;//设置文件过期事件为30天
}
```

7、安全性：支持 ssl/tls 协议，能够作为安全的 web 服务器或反向代理使用

```
server {
    listen 443 ssl;
    ssl_certificate /path/to/fullchain.pem;//证书路径
    ssl_certificate_key /path/to/privatekey.pem; //私钥路径
    ssl_protocols TLSv1.3; //支持的ssl协议
}
```

## 搭建 nginx

根据操作系统类型选择安装指令

```
sudo apt update
sudo apt install nginx

sudo yum install epel-release
sudo yum install nginx
```

启动指令

```
sudo systemctl start nginx
```

开机自启动

```
sudo systemctl enable nginx
```

## 常用指令

启动：`nginx`

停止：`nginx -s stop`

重新加载：`nginx -s reload`

检查 nginx 配置文件：`nginx -t`（检查配置文件的正确性）

查看 nginx 版本：`nginx -v`

其他常用指令：

1、查看进程命令：`ps -ef | grep nginx `

2、查看日志，在 logs 目录下输入指令：`more access.log`

## 配置文件构成

配置文件主要由指令组成，这些指令可以分布在多个上下文中，主要上下文包括：

1、main：全局配置，影响其他所有上下文

2、events：配置如何处理连接

3、http：配置 http 服务器的参数

> location：基于请求的 URI 来配置特定的参数

> server：配置虚拟主机的参数

```
worker_processes auto;   # worker_processes定义Nginx可以启动的worker进程数，auto表示自动检测

# 定义Nginx如何处理连接
events {
    worker_connections 1024;  # worker_connections定义每个worker进程可以同时打开的最大连接数
}

# 定义HTTP服务器的参数
http {
    include mime.types;  # 引入mime.types文件，该文件定义了不同文件类型的MIME类型
    default_type application/octet-stream;  # 设置默认的文件MIME类型为application/octet-stream
    sendfile on;  # 开启高效的文件传输模式
    keepalive_timeout 65;  # 设置长连接超时时间

    # 定义一个虚拟主机
    server {
        listen 80;  # 指定监听的端口
        server_name localhost;  # 设置服务器的主机名，这里设置为localhost

        # 对URL路径进行配置
        location / {
            root /usr/share/nginx/html;  # 指定根目录的路径
            index index.html index.htm;  # 设置默认索引文件的名称，如果请求的是一个目录，则按此顺序查找文件
        }

        # 错误页面配置，当请求的文件不存在时，返回404错误页面
        error_page 404 /404.html;

        # 定义/40x.html的位置
        location = /40x.html {
            # 此处可以配置额外的指令，如代理、重写等，但在此配置中为空
        }

        # 错误页面配置，当发生500、502、503、504等服务器内部错误时，返回相应的错误页面
        error_page 500 502 503 504 /50x.html;

        # 定义/50x.html的位置
        location = /50x.html {
            # 同上，此处可以配置额外的指令
        }
    }
}
```

指定如何处理发往特定域名的 HTTP 请求

```
server {
    listen 80;  # 监听80端口，HTTP请求的默认端口
    client_max_body_size 100m;  # 设置客户端请求体的最大大小为100MB
    index index.html;  # 设置默认的索引文件为index.html
    root /user/project/admin;  # 设置Web内容的根目录为/user/project/admin

    # 路由配置，处理所有URL路径
    location ~ /* {
        proxy_pass http://127.0.0.1:3001;  # 将请求代理到本机的3001端口
        proxy_redirect off;  # 关闭代理重定向

        # 设置代理请求头，以便后端服务器可以获取客户端的原始信息
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # 定义代理服务器失败时的行为，如遇到错误、超时等，尝试下一个后端服务器
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_max_temp_file_size 0;  # 禁止代理临时文件写入

        # 设置代理连接、发送和读取的超时时间
        proxy_connect_timeout 90;
        proxy_send_timeout 90;
        proxy_read_timeout 90;

        # 设置代理的缓冲区大小
        proxy_buffer_size 4k;
        proxy_buffers 4 32k;
        proxy_busy_buffers_size 64k;
        proxy_temp_file_write_size 64k;
    }

    # 对图片文件设置缓存过期时间，客户端可以在1天内使用本地缓存
    location ~ .*.(gif|jpg|jpeg|png|swf)$ {
        expires 1d;
    }

    # 对JavaScript和CSS文件设置缓存过期时间，客户端可以在24小时内使用本地缓存
    location ~ .*.(js|css)?$ {
        expires 24h;
    }

    # 允许访问/.well-known目录下的所有文件，通常用于WebFinger、OAuth等协议
    location ~ /.well-known {
        allow all;
    }

    # 禁止访问隐藏文件，即以点开头的文件或目录
    location ~ /. {
        deny all;
    }

    # 指定访问日志的路径，日志将记录在/user/logs/admin.log文件中
    access_log /user/logs/admin.log;
}
```

## 其他

### 静态资源服务：前端 web

```
server {
    listen 80;
    server_name example.com;
    location / {
        root /path/to/your/static/files;
        index index.html index.htm;
    }
    location ~* \.(jpg|png|gif|jpeg)$ {
        expires 30d;
        add_header Cache-Control "public";
    }
}
```

### 反向代理

```
server {
    listen 80;
    server_name api.example.com;
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### 负载均衡

```
http {
    upstream backend {
        server backend1.example.com;
        server backend2.example.com;
        server backend3.example.com;
    }
    server {
        listen 80;
        server_name example.com;
        location / {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
```

#### 负载均衡算法

1、Weight 轮询（默认）：权重轮询算法是 nginx 默认的负载均衡算法，按顺序将请求逐一分配到不同的服务器上，通过设置服务器权重来调整不同服务器上请求的分配律。如果某一服务器宕机，nginx 会自动将该服务器从队列中剔除，请求代理会继续分配到其他健康的服务器上

```
upstream backend {
  server backend1.example.com weight=3; # 设置backend1的权重为3
  server backend2.example.com; # backend2的权重为默认值1
  server backend3.example.com weight=5; # 设置backend3的权重为5
}
```

2、IP Hash 算法：根据客户端 IP 地址的哈希值分配请求，确保客户端始终连接到同一台服务器，根据客户端请求的 IP 地址的哈希值进行匹配，将具有相同 IP 哈希值的客户端分配到指定的服务器。这样可以确保同一客户端的请求始终被分配到同一台服务器，有助于保持用户的会话状态

```
upstream backend {
  ip_hash; # 启用IP哈希算法
  server backend1.example.com;
  server backend2.example.com;
}
```

3、fair 算法：根据服务器的响应事件和负载来分配请求

> 它结合了轮询和 IP 哈希的优点，但 nginx 默认不支持公平调度算法，需要安装额外的模块 upstream_fair 来实现

4、URL Hash 算法：根据请求的 URL 的哈希值分配请求，每个请求的 URL 会被分配到指定的服务器，有助于提供缓存效率。需要安装 nginx 的 hash 软件包

```
upstream backend {
  hash $request_uri; # 启用URL哈希算法
  server backend1.example.com;
  server backend2.example.com;
}
# 根据请求的URL哈希值来决定将请求发送到backend1还是backend2。
```

### https 配置

```
server {
    listen 443 ssl;
    server_name example.com;
    ssl_certificate /path/to/your/fullchain.pem;
    ssl_certificate_key /path/to/your/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers on;
    location / {
        root /path/to/your/https/static/files;
        index index.html index.htm;
    }
}
```

### 安全防护

```
server {
    listen 80;
    server_name example.com;
    location / {
        # 防止 SQL 注入等攻击
        rewrite ^/(.*)$ /index.php?param=$1 break;
        # 限制请求方法，只允许 GET 和 POST
        if ($request_method !~ ^(GET|POST)$ ) {
            return 444;
        }
        # 防止跨站请求伪造
        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-Content-Type-Options "nosniff";
        add_header X-XSS-Protection "1; mode=block";
    }
}
```

## 参考

[https://mp.weixin.qq.com/s/D8vJYvMzwxM9rN7HGulrPA](https://mp.weixin.qq.com/s/D8vJYvMzwxM9rN7HGulrPA)
