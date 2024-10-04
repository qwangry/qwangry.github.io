# markdown转换html

vitepress是基于Vite和Vue3的静态网站生成器，主要用于文档编写，原理是讲Markdown文件转换给Vue组件，然后通过Vite构建工具生成静态的html文件

## 工作原理

1、Markdown转换成Vue组件

- 开发者编写markdown文件

- vitepress内部使用markdown-it解析器，讲markdown文件解析成html

- 自定义扩展：vitepress支持多种自定义扩展

- 转换为vue：解析后的markdown内容被封装进vue组件

2、基于Vue的渲染

- vite驱动：vitepress基于vite，因此所有的.md文件会通过vite进行开发环境的热更新和生产环境的打包

- 客户端渲染：在开发环境中，vitepress会运行一个基于vue的SPA，通过客户端路由展示不同的文档页面

3、静态网站生成

- 预渲染：运行 vitepress build 命令时，VitePress 会进入静态网站生成模式。它会在服务器端渲染（SSR）每个页面，然后输出对应的静态 HTML 文件。这种静态生成模式称为 “预渲染”

> - 页面渲染：vitepress会遍历所有的路由，生成每个路由对应的html文件
> 
> - 静态资源处理：vite会对所有的静态资源进行打包和优化，以确保生成的静态网站性能良好

4、生成静态HTML文件

- 输出HTML文件：在构建过程中，所有的页面都会被转换成对应的静态 HTML 文件。这些文件可以直接部署到任何静态站点托管服务（如 GitHub Pages、Netlify 等）

- 优化过的的CSS和JS：VitePress 会将所有的 CSS、JS 文件进行压缩和代码分割，确保最终生成的站点加载速度快、性能好


## 总结

1、markdown解析（解析markdown，生成标准html，封装成Vue组件）

2、vue渲染

3、静态html输出