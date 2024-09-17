# webpack

## webpack 是什么，作用

webpack 是一种用于构建 JavaScript 应用程序的静态模块打包器，它能够以一种相对一致且开放的处理方式，加载应用中的所有资源文件，并将其打包成浏览器兼容的 web 资源文件

功能：

- 模块打包：通过打包整合不同的模块文件保证各模块之间的引用和执行

- 代码编译：通过丰富的 `loader 可以将不同格式文件转译为浏览器可以执行的文件`

- 扩展功能：通过丰富的 plugin 可以实现多种强大的功能，例如代码分割、代码混淆、代码压缩、按需加载。。。等等

## loader 及 plugin

- loader：本质上是一个函数，负责代码的转译，即对接收到的内容进行转换后将转换后的结果返回，配置 loader 通过在 modules.rules 中以数组的形式配置

- plugin：本质上是一个带有 apply(compiler)的函数，基于 tapable 这个事件流框架来监听 webpack 构建/打包过程中发布的 hooks 来通过自定义的逻辑和功能改变输出结果，通过 plugins 以数组形式配置

## 常见的 loader 及其作用

- babel-loader：将 es6 转译为 es5

- file-loader：可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存，并在代码中通过 url 去引用输出的文件

- url-loader：和 file-loader 功能相似，但是可以通过指定阈值来根据文件大小使用不同的处理方式

- raw-loader：加载文件原始内容

- image-webpack-loader： 加载并压缩图片资源

- awesome-typescirpt-loader: 将 typescript 转换为 javaScript 并且性能由于 ts-loader

- sass-loader: 将 SCSS/SASS 代码转换为 CSS

- css-loader: 加载 CSS 代码 支持模块化、压缩、文件导入等功能特性

- style-loader: 把 CSS 代码注入到 js 中，通过 DOM 操作去加载 CSS 代码

- source-map-loader: 加载额外的 Source Map 文件

- eslint-loader: 通过 ESlint 检查 js 代码

- cache-loader: 可以在一些开销较大的 Loader 之前添加可以将结果缓存到磁盘中，提高构建的效率

- thread-loader: 多线程打包，加快打包速度

## 常见的 plugin 及作用

- define-plugin：定义环境变量

- html-webpack-plugin：简化 html 文件创建

- imagemin-webpack-plugin：压缩图片文件

- uglifyjs-webpack-plugin：通过 UglifyES 压缩 ES6 代码

- webpack-parallel-uglify-plugin: 多核压缩，提⾼压缩速度

- webpack-bundle-analyzer: 可视化 webpack 输出⽂件的体积

- mini-css-extract-plugin: CSS 提取到单独的⽂件中，⽀持按需加载

## bundle，chunk，module 是什么

- bundle：是 webpack 打包出来的文件

- chunk：代码块，一个 chunk 由多个模块组合而成，用于代码的合并和分割

- module：是开发中的单个模块

## 构建流程

是一个串行的过程

1、初始化参数

2、开始编译

3、确定入口

4、编译模块：从入口文件出发，调用所有配置的 loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有⼊⼝依赖的⽂件都经过了本步骤的处理

5、完成模块编译

6、输出资源

7、输出完成

## 参考

[https://www.yuque.com/cuggz/interview/hx0sf2#FPFVN](https://www.yuque.com/cuggz/interview/hx0sf2#FPFVN)
