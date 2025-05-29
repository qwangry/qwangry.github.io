# husky

## 介绍

配置 eslint 等集成好了代码校验工具，但是需要每次手动的去执行命令才会格式化代码。如果有人没有格式化就提交了远程仓库中，那这个规范就没什么用。所以需要强制让开发人员按照代码规范来提交。

要做到这件事情，就需要利用 husky 在代码提交之前触发 git hook(git 在客户端的钩子)，然后执行`pnpm run format`来自动的格式化代码。

```shell
# 安装
pnpm install -D husky

# 执行
npx husky-init
```

会在根目录下生成一个.husky 目录，这个目录下面会有一个 pre-commit 文件，这个文件里面的命令在执行 commit 的时候执行

在`.husky/pre-commit`文件添加如下命令：

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm run format
```

对代码进行 commit 操作的时候，就会执行命令，对代码进行格式化，然后再提交。
