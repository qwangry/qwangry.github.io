# 客户端web开发工具

## 客户端工具概述

### 现代开发工具

尽管手工编写HTML、CSS和JavaScript仍然是完全合理的，但现在有大量的工具可供开发人员使用，以加快构建web站点或应用程序的过程。

高层次上看，可以将客户端工具放入以下三大类需要解决的问题中：

- 安全网络：代码开发期间有用的工具

- 转换：以某种方式转换代码的工具，例如将一种中间语言转换为浏览器可以理解的JavaScript

- 开发后阶段：编写完代码后有用的工具，如测试和部署工具

### 安全网络

包括开发过程更容易生成稳定可靠的代码的任何内容。

安全网络工具还应该帮助避免错误或自动纠正错误，而不必每次都从头开始构建代码

- Linter

Linter是检查代码并告诉存在任何错误的工具，什么类型的错误，以及出现在哪些代码行上

通常，linters不仅可以配置为报告错误，还可以报告任何违反团队正在使用的指定样式指南的行为

`eslint`：业界标准的JavaScript linter。是一种高度可配置的工具，用于捕获潜在的语法错误，并在代码中鼓励“最佳实践”

还可以找到用于其他语言的linting工具，如`csslint`

`weblint`：一个可配置的，开放源码的网页链接，展示了最佳实践，包括无障碍，性能，跨浏览器兼容性，安全，PWAs测试等等。

- 源代码控制

也成为版本控制系统（VCS）,源代码控制用于备份工作和在团队中工作至关重要。

典型的VCS包括拥有要对其进行更改的代码的本地版本。
然后将更改“推”到存储在某个服务器上的远程存储库中的代码的“主”版本。

通常有一种方法来控制和协调对代码的“主”副本做了什么更改，以及什么时候做更改，这样开发团队就不会一直覆盖彼此的工作。

`Git`的现在大多数人使用的源代码控制系统。
它主要通过命令行访问，但也可以通过友好的用户界面访问。使用 git 存储库中的代码，你可以将其推到自己的服务器实例中，或者使用托管的源代码控制网站，如GitHub, GitLab, or BitBucket。

- 代码格式化

代码格式化程序与 linters 有些关联，除了它们不是指出代码中的错误，而是根据你的样式规则，确保你的代码被正确格式化，理想情况下自动修复它们发现的错误。

`Prettier`是一个非常流行的代码格式化程序示例

- 打包工具

这些工具让代码准备生产

`Parcel`

`Webpack`

### 转换

web 应用程序生命周期的这个阶段通常允许你编写“未来代码”(比如最新的 CSS 或 JavaScript 特性，这些特性可能还没有得到浏览器的本地支持)，或者完全使用另一种语言编写代码，比如 TypeScript。转换工具将为你生成与浏览器兼容的代码，以用于生产。

通常 web 开发被认为是三种语言：HTML、CSS 和 JavaScript，所有这些语言都有转换工具。

转换的好处：

1、能够使用最新的语言特性编写代码，并将其转换为可在日常设备上使用的代码。

- Babel:一个 JavaScript 编译器，允许开发人员使用最前沿的 JavaScript 编写代码，然后 Babel 将其转换为老式的 JavaScript，让更多的浏览器能够理解。

- PostCSS:和 Babel 做同样的事情，但是有先进的 CSS 特性。如果没有相同的方法使用旧的 CSS 特性来做一些事情，PostCSS 将安装一个 JavaScript 填充来模拟你想要的 CSS 效果。

2、选择用一种完全不同的语言编写代码，并将其转换为与 web 兼容的语言。

- `Sass/SCSS`：这个 CSS 扩展允许你使用变量、嵌套规则、混合、函数和许多其他特性，其中一些特性在本地 CSS 中是可用的 (比如变量)，而另一些则不是。

- `TypeScript`：TypeScript 是 JavaScript 的一个超集，它提供了一堆额外的特性。

TypeScript 编译器在生成产品时将 TypeScript 代码转换为 JavaScript。

- 框架例如 `React`、`Ember` 和 `Vue`：框架提供了许多免费的功能，并允许你通过构建在普通 JavaScript 之上的自定义语法来使用它们。在后台，框架的 JavaScript 代码努力解释这个定制语法，并将其呈现为最终的 web 应用程序。

### 开发后阶段

开发后阶段工具可以确保软件能够访问web并继续运行，这包括部署流程、测试框架、审计工具等等。

- 测试工具

通常采用一种工具的形式，该工具将自动对你的代码运行测试，以确保在进行进一步操作之前它是正确的

- 框架包括编写测试 `Jest`、`Mocha` 和 `Jasmine`。

- 自动测试运行和通知系统包括 `Travis CI`、`Jenkins`、`Circle CI` 及`其他系统`。

- 配置工具

发布网站，可用于静态和动态站点，通常与测试系统一起工作

`Netlify`是目前最流行的部署工具之一，其他包括`Vercel`和`Github Pages`

- 其他的

`Code Climate `对于收集代码质量度量，`webhint browser extension `用于执行跨浏览器兼容性的运行时分析和其他检查，`Github bots` 提供更强大的 GitHub 功能，`Updown` 提供应用程序运行时间监控等等

## 命令行
### 终端
终端是一个文本界面，用于执行基于文本的程序。

打开命令行并运行一些命令来使用所选择的工具。（这样的工具被称为CLI工具命令行接口工具）

### 如何进入终端
目前web上存在的许多教程和工具都支持基于unix的系统

- Linux/Unix
Linux / Unix 系统默认情况下在应用程序中列出了一个可用的终端。

- macOS
macOS 有一个名为 Darwin 的系统，它位于图形用户界面的下方。Darwin 是类 unix 系统，它提供了终端和对底层工具的访问。

- Windows
在 Windows 上使用终端 (或命令行) 传统上并不像在其他操作系统上那样简单。但情况正在好转。

Windows 一直有自己的名为 cmd(命令提示符) 的类似于终端的程序，但这显然与 Unix 命令不同，它相当于老式的 Windows DOS 提示符。

更好的程序可以在Windows上提供的终端体验，如Powershell和Gitbash。

在现代，Windows的最佳选择是Windows Linux子系统（WSL），它是一个兼容层，用于从Windows 10中直接运行Linux操作系统，允许直接在Windows上运行真正的终端，而不需要虚拟机

:::info
命令行和终端的区别：

从技术上讲，终端是启动并连接到 shell 的软件。shell 是你的会话和会话环境 (提示符和快捷方式等内容可以在其中定制)。命令行是你输入命令并且光标闪烁的文字行。
:::

### 基本的内置终端命令

- 导航计算机的文件系统以及基本级别的任务，如创建、复制、重命名和删除：
    - 移动你的目录结构 : cd
    - 建立目录：mkdir
    - 创建文件（修改他们的原数据）: touch
    - 复制文件：cp
    - 移动文件：mv
    - 删除文件或目录：rm

- 下载在特定的 url 找到的文件：curl

- 在较大的文件体中寻找特定的片段：grep

- 主页查看文件的内容：less, cat

- 操作和转换文本流（例如，将 HTML 文件中 `<div>` 的所有实例改为 `<article>`）：awk、tr、sed

### 管道命令
将命令链接在一起时，终端才真正成为自己的终端 `|` (pipe) 的象征。

`ls`可以输出文件目录

`wc`，计算输入到其中的单词、行、字符或字节的数量，可以是一个文本文件

输出文本文件行数示例：
```bash
wc -l myfile.txt
```

还可以计算输入到它的输出的行数

计算ls命令输出的行数，并计算终端的输出：
```bash
ls | wc -l
```

(unix) 命令行工具的一般原理是，它们将文本打印到终端 (也称为“打印到标准输出”或`STDOUT`)。很多命令也可以从流输入 (称为“标准输入” 或`STDIN`) 中读取内容。

管道操作符可以将这些输入和输出连接在一起，允许我们构建越来越复杂的操作，以满足我们的需要。一个命令的输出可以成为下一个命令的输入。在这种情况下，ls 通常会将其输出到STDOUT, 但是相反 ls输出被制成wc, 它将该输出作为输入，计算它包含的行数，然后将该计数输出到 STDOUT。

### 复杂示例

1、（grep返回包含单词“location”的所有行）
```bash
curl https://developer.mozilla.org/docs/Web/API/fetch -L -I | grep location
```
输出：
```bash
location: /en-US/docs/Web/API/fetch
```

2、将基本的起点添加到每个起点的开始，这样就可以打印出完整的 url
（awk，是一种类似于JavaScript，Ruby或python的编程语言，只是要老的多）
```bash
curl https://developer.mozilla.org/docs/Web/API/fetch -L -I | grep location | awk '{ print "https://developer.mozilla.org" $2 }'
```
输出：
```bash
https://developer.mozilla.org/en-US/docs/Web/API/fetch
```

### 添加工具
安装和使用第三方CLI工具

目前，用于前端web开发的可安装工具的巨大生态系统主要存在于内部npm，与Node.js紧密合作的私有的包托管服务。

- 安装Node，npm命令行工具和以npm为中心的补充工具npx。[https://nodejs.org/en/](https://nodejs.org/en/)


Prettier是一款专门为前端开发人员设计的代码格式化工具，专注于基于JavaScript的语言，并增加了对 HTML、CSS、SCSS、JSON 等的支持。
- 安装Prettier。安装node之后，打开终端并运行以下命令来安装prettier程序：
```bash
npm install --global prettier
```

使用prettier有许多实现自动化的方法：
- 在将代码提交到git存储库之前，使用`Husky`

- 持续集成，`Github Actions`

### 其他工具

- `bat`：一个更好的`cat`（`cat`用于打印内容）

- `prettyping`：`ping`在命令行上，但是是可视化的

- `htop`：进程查看器

## 软件包管理
### 项目中的依赖项
依赖是指可能由他人编写的第三方软件，理想情况下能够为你解决单一的问题。

项目依赖可以是整个 JavaScript 库或框架——例如 React 或者 Vue，也可以是非常小的工具库，比如人类易读日期库，它也可以是一个命令行工具，

需要一些现代工具来将代码和依赖项构建为捆绑包（`Bundle`）在一起。

`Bundle`是一个术语，通常用于指代一个单独的文件，包含了软件的所有JavaScript，通常被尽可能压缩以减少下载和在访问者浏览器中显示软件所需的时间。

### 软件包管理器
软件包管理器提供一种方法来安装新的依赖（也称为“包”），管理包在文件系统上的存储位置，并提供发布自己的包的功能。


:::info
npm 不是唯一可用的软件包管理器。有一种成功和流行的替代软件包管理器是 Yarn。Yarn 使用不同的算法解决依赖项，这可能意味着更快的用户体验。还有一些其他新兴的客户端，例如 pnpm。
:::

### 软件包仓库

为了使软件包管理器工作，它需要知道从哪里安装软件包，这是通过软件包仓库实现的。仓库是实现软件包发布和安装的关键部份。npm 作为一个软件包管理器，同时也是 JavaScript 软件包最常用的软件包仓库。npm 仓库位于 [npmjs.com](https://www.npmjs.com/)。

### 软件包生态系统

[Parcel](https://parceljs.org/) 是开发人员在开发过程中常用的另一个工具。它可以监视我们的代码内容以查找对依赖项的调用，并自动安装我们的代码所需的任何依赖项。它还可以自动构建我们的代码。

1、创建一个npm包应用

```bash
mkdir parcel-experiment
cd parcel-experiment
```

将应用初始化为npm包，这将创建一个配置文件package.json，使我们可以保存配置详细信息，以防之后想要重新创建此环境，甚至将软件包发布到npm仓库

```bash
npm init
```

`package.json`文件：
- name：用于标识应用的名称。

- version：应用的起始版本号。

- description：应用目的的简要描述。

- entry point：这将是应用的入口 JavaScript 文件。默认的 index.js。

- test command、git repository 和 keywords：按下 Return 以将它们暂时留空。

- author：项目的作者。

- license：要发布软件包的许可证。

```bash
{
  "name": "parcel-experiment",
  "version": "1.0.0",
  "description": "A simple npm package to learn about using npm",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Chris Mills",
  "license": "ISC"
}
```

2、安装parcel

```bash
npm install parcel-bundler
```

再次查看`package.json`：
```bash
"dependencies": {
  "parcel-bundler": "^1.12.4"
}
```

3、设置示例程序
工作目录中添加一个index.html文件

```bash
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <title>My test page</title>
  </head>
  <body>
    <script src="./index.js"></script>
  </body>
</html>
```

4、尝试使用parcel
```bash
 parcel index.html
```

可以在终端中看到：
```bash
Server running at http://localhost:1234
✨  Built in 193ms.
```

:::info
如果终端返回“未找到命令”类型错误，请尝试使用 npx 运行上面的命令，例如：npx parcel index.html。
:::

index.js文件中添加一下代码：
```js
import { formatDistanceToNow } from "date-fns";

const date = "1996-09-13 10:00:00";
document.body.textContent = `${formatDistanceToNow(new Date(date))} ago`;
```










