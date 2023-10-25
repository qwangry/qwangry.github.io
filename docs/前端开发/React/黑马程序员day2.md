# 黑马程序员day2

## ReactRouter

### 什么是前端路由
![Alt text](day2/image.png)

### 创建路由开发环境
![Alt text](day2/image-1.png)

### 抽象路由模块
![Alt text](day2/image-2.png)

### 路由导航

![Alt text](day2/image-3.png)

#### 声明式导航
![Alt text](day2/image-4.png)

#### 编程式导航
![Alt text](day2/image-5.png)

### 路由导航传参
![Alt text](day2/image-6.png)
![Alt text](day2/image-7.png)

### 嵌套路由配置
![Alt text](day2/image-8.png)

![Alt text](day2/image-9.png)

### 默认二级路由
![Alt text](day2/image-10.png)

### 404路由配置
![Alt text](day2/image-11.png)

### 两种路由模式
![Alt text](day2/image-12.png)

## 案例
![Alt text](day2/image-13.png)

### 别名路径配置
![Alt text](day2/image-14.png)

![Alt text](day2/image-15.png)

### 联想路径配置
![Alt text](day2/image-16.png)

### 数据Mock
![Alt text](day2/image-17.png)

#### json-server实现数据Mock
![Alt text](day2/image-18.png)

### antD-mobile主题定制
![Alt text](day2/image-19.png)

## 使用CRA初始化项目环境
![Alt text](day2/image-20.png)

### 安装scss
![Alt text](day2/image-21.png)
![Alt text](day2/image-22.png)

### 安装Ant Design组件库
![Alt text](day2/image-23.png)

看官方文档即可
```
npm install antd --save
```

### 配置基础路由router
![Alt text](day2/image-24.png)

### 配置@别名路径
![Alt text](day2/image-25.png)
![Alt text](day2/image-26.png)
![Alt text](day2/image-27.png)

### 使用gitee管理项目
![Alt text](day2/image-28.png)

### Axios请求拦截器注入Token
![Alt text](day2/image-29.png)

### 使用Token做路由权限控制
![Alt text](day2/image-30.png)
![Alt text](day2/image-31.png)
![Alt text](day2/image-32.png)

### 初始化样式的相关库
Normalize.css
![Alt text](day2/image-33.png)

### token失效
![Alt text](day2/image-34.png)

![Alt text](day2/image-35.png)

### 富文本编辑器
![Alt text](day2/image-36.png)

### 项目打包和本地预览
![Alt text](day2/image-37.png)

### 打包优化- 配置路由懒加载
![Alt text](day2/image-38.png)
![Alt text](day2/image-39.png)
![Alt text](day2/image-40.png)

### 打包优化-包体积分析
![Alt text](day2/image-41.png)
![Alt text](day2/image-42.png)
![Alt text](day2/image-43.png)
![Alt text](day2/image-44.png)

### 打包优化-CDN配置
![Alt text](day2/image-45.png)

**分析说明**：通过 craco 来修改 webpack 配置，从而实现 CDN 优化

**核心代码**
`craco.config.js`

```javascript
// 添加自定义对于webpack的配置

const path = require('path')
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    },
    // 配置webpack
    // 配置CDN
    configure: (webpackConfig) => {
      let cdn = {
        js:[]
      }
      whenProd(() => {
        // key: 不参与打包的包(由dependencies依赖项中的key决定)
        // value: cdn文件中 挂载于全局的变量名称 为了替换之前在开发环境下
        webpackConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
        // 配置现成的cdn资源地址
        // 实际开发的时候 用公司自己花钱买的cdn服务器
        cdn = {
          js: [
            'https://cdnjs.cloudflare.com/ajax/libs/react/18.1.0/umd/react.production.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.1.0/umd/react-dom.production.min.js',
          ]
        }
      })

      // 通过 htmlWebpackPlugin插件 在public/index.html注入cdn资源url
      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin')
      )

      if (isFound) {
        // 找到了HtmlWebpackPlugin的插件
        match.userOptions.files = cdn
      }

      return webpackConfig
    }
  }
}
```

`public/index.html`

```javascript
<body>
  <div id="root"></div>
  <!-- 加载第三发包的 CDN 链接 -->
  <% htmlWebpackPlugin.options.files.js.forEach(cdnURL => { %>
    <script src="<%= cdnURL %>"></script>
  <% }) %>
</body>
```
