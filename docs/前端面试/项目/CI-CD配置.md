# CI-CD 配置

## nginx 配置

```
server {
    listen 80;
    server_name your_domain_or_ip;  # 你的域名或服务器IP地址

    root /var/www/react-app;  # 指向React项目的build目录
    index index.html;

    location / {
        try_files $uri /index.html;  # 对于React的路由，确保指向index.html
    }

    location /static/ {
        expires 30d;
        add_header Cache-Control "public";
    }

    # 可选：限制资源访问，比如禁止访问某些文件类型
    location ~* \.(json|xml)$ {
        add_header Cache-Control "no-store";
    }

    # 可选：处理gzip压缩，提升静态资源传输效率
    gzip on;
    gzip_types text/plain application/javascript text/css application/json image/svg+xml;
    gzip_min_length 256;
}
```

## CI/CD 流程

.gitlab-ci.yml 配置

通过检测代码仓库中的配置文件来自动化执行构建、测试、部署等任务

```
stages:
  - build
  - deploy

# 定义构建阶段
build_project:
  stage: build
  image: node:18  # 使用Node.js 18镜像
  script:
    - npm install  # 安装依赖
    - npm run build  # 构建项目
  artifacts:
    paths:
      - build/  # 保存构建结果
    expire_in: 1 week  # 构建结果保存一周

# 定义部署阶段
deploy_to_server:
  stage: deploy
  image: appleboy/drone-ssh  # 使用 ssh 部署工具镜像
  environment: production
  script:
    - scp -r build/* $SSH_USER@$SSH_HOST:/var/www/react-app  # 上传构建文件到Nginx服务器
    - ssh $SSH_USER@$SSH_HOST "sudo systemctl restart nginx"  # 重启Nginx
  only:
    - main  # 仅当代码推送到main分支时触发部署
```

**gitlab 环境变量**

使用了 `$SSH_USER 和 $SSH_HOST` 等环境变量。

可以在 GitLab 项目的 `"Settings" -> "CI/CD" -> "Variables"` 页面中添加这些变量：

- `SSH_USER`：用于 SSH 登录服务器的用户名。

- `SSH_HOST`：服务器的 IP 地址或域名。

- `SSH_PRIVATE_KEY`：SSH 私钥，用于连接服务器。

## Docker 部署

```
project-root/
├── build/             # React 项目构建输出的目录
├── ci/                # 存放 CI/CD 和部署相关的脚本
│   ├── nginx.conf     # Nginx 配置文件
│   └── deploy.sh      # 部署脚本
├── Dockerfile         # Dockerfile，用于创建 Docker 镜像
├── .gitlab-ci.yml     # GitLab CI 配置文件
├── package.json       # React 项目 package.json 文件
├── src/               # React 项目源代码
└── public/            # 公共资源目录
```

### Dockerfile

Dockerfile 定义了 Docker 镜像的构建过程。在这个 Dockerfile 中，会使用 Nginx 来托管 React 项目的静态文件。

```
# Step 1: 使用 Node.js 镜像来构建 React 应用
FROM node:18 AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 安装依赖
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# 复制 React 项目代码并构建
COPY . ./
RUN npm run build

# Step 2: 使用 Nginx 镜像部署构建的静态文件
FROM nginx:alpine

# 删除默认的 Nginx 配置
RUN rm /etc/nginx/conf.d/default.conf

# 复制我们自定义的 Nginx 配置文件
COPY ci/nginx.conf /etc/nginx/conf.d/

# 复制构建好的静态文件到 Nginx 的默认网页目录
COPY --from=build /app/build /usr/share/nginx/html

# 暴露 Nginx 服务的端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]

```

### nginx

Nginx 用于托管 React 的静态文件并处理前端路由。

```
server {
    listen 80;

    server_name localhost;

    # 静态文件根目录
    root /usr/share/nginx/html;

    # 配置默认首页文件
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    # 设置缓存策略
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain application/javascript text/css application/json image/svg+xml;
    gzip_min_length 256;
}
```

`try_files $uri /index.html`：确保 React 的前端路由能够在所有路径上正确返回 index.html

### gitlab ci/cd 配置

在 GitLab 中，CI/CD 是通过 `.gitlab-ci.yml` 文件进行配置的。这个文件会定义项目的构建、测试和部署过程

```
stages:
  - build
  - deploy

# Step 1: 构建阶段
build_job:
  stage: build
  image: node:18
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - build/
    expire_in: 1 week

# Step 2: 部署阶段
deploy_job:
  stage: deploy
  image: docker:latest
  services:
    - docker:dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $CI_REGISTRY_IMAGE:latest .
    - docker push $CI_REGISTRY_IMAGE:latest
  only:
    - main
```

### deploy.sh

```
#!/bin/bash

# Pull the latest Docker image
ssh $SSH_USER@$SSH_HOST << 'EOF'
docker pull $CI_REGISTRY_IMAGE:latest

# Stop and remove the existing container
docker stop react-app || true
docker rm react-app || true

# Run the new container
docker run -d --name react-app -p 80:80 $CI_REGISTRY_IMAGE:latest
EOF
```
