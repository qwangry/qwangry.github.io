# nvm

## 介绍

nvm（nodejs version manage） 是 node 版本管理工具，用来安装、切换不同版本的 node。

## 常用指令

- 查看当前版本

```bash
nvm --version
```

- 安装指定版本的 node

```bash
nvm install 14.17.0
```

- 显示支持下载的nodejs版本号

```bash
nvm list available
```

- 卸载指定版本的 node

```bash
nvm uninstall 14.17.0
```

- 切换到指定版本的 node

```bash
nvm use 14.17.0
```

- 查看所有安装的版本

```bash
nvm ls
```

- 查看当前使用的版本

```bash
nvm current
```

- 设置默认版本
```bash
nvm alias default 14.17.0
```