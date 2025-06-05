# Webpack

## 什么是Webpack及其作用

Webpack是一个现代JavaScript应用程序的静态模块打包器。它将项目中的所有资源（JS、CSS、图片等）视为模块，通过分析项目结构，构建依赖图，最终打包成一个或多个bundle。

### 核心功能

- **模块打包**：将分散的模块文件打包成浏览器可执行的文件
- **代码转换**：通过loader将不同格式的文件转换为JavaScript模块
- **资源优化**：代码分割、压缩、去重等优化处理
- **开发体验**：热更新、源码映射等开发工具支持

### 核心概念

- **Entry（入口）**：构建的起点，webpack从此开始构建依赖图
- **Output（输出）**：定义打包后文件的输出位置和命名
- **Loader（加载器）**：处理非JavaScript文件的转换器
- **Plugin（插件）**：扩展webpack功能的工具
- **Mode（模式）**：development/production/none，影响内置优化

## Loader详解

### 什么是Loader

Loader本质上是一个函数，接收源文件内容作为参数，返回转换后的结果。webpack默认只能处理JavaScript和JSON文件，通过loader可以处理其他类型的文件。

### 常用Loader及作用

#### JavaScript相关
- **babel-loader**：将ES6+代码转译为ES5
- **eslint-loader**：JavaScript代码规范检查
- **ts-loader/awesome-typescript-loader**：TypeScript编译

#### 样式相关
- **css-loader**：解析CSS文件，处理@import和url()
- **style-loader**：将CSS注入到DOM中
- **sass-loader/less-loader**：预处理器编译
- **postcss-loader**：使用PostCSS处理CSS
- **mini-css-extract-plugin.loader**：提取CSS到单独文件

#### 资源相关
- **file-loader**：处理文件资源，输出到指定目录
- **url-loader**：小文件转base64，大文件使用file-loader
- **raw-loader**：将文件内容作为字符串导入
- **svg-sprite-loader**：SVG雪碧图处理

#### 优化相关
- **cache-loader**：缓存loader结果，提升构建速度
- **thread-loader**：多线程构建，加速打包

### Loader配置示例

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'images/[name].[hash:8].[ext]'
          }
        }
      }
    ]
  }
}
```

## Plugin详解

### 什么是Plugin

Plugin是带有`apply`方法的JavaScript对象，基于tapable事件流框架，监听webpack构建过程中的钩子事件，执行自定义逻辑来改变输出结果。

### 常用Plugin及作用

#### HTML处理
- **HtmlWebpackPlugin**：自动生成HTML文件并注入bundle
- **clean-webpack-plugin**：清理输出目录

#### CSS处理
- **MiniCssExtractPlugin**：提取CSS到单独文件
- **OptimizeCSSAssetsPlugin**：CSS代码压缩优化

#### JavaScript优化
- **UglifyJSPlugin/TerserPlugin**：JavaScript代码压缩
- **webpack-parallel-uglify-plugin**：多进程压缩

#### 开发工具
- **DefinePlugin**：定义全局变量
- **HotModuleReplacementPlugin**：热模块替换
- **webpack-bundle-analyzer**：打包结果分析

#### 性能优化
- **SplitChunksPlugin**：代码分割
- **CompressionWebpackPlugin**：Gzip压缩

### Plugin配置示例

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    })
  ]
}
```

## 核心概念详解

### Bundle、Chunk、Module的区别

- **Module（模块）**：开发中的单个文件，是webpack构建的最小单位
- **Chunk（代码块）**：由多个模块组合而成的代码块，是打包过程中的概念
- **Bundle（包）**：最终输出的文件，通常一个chunk对应一个bundle

### 构建流程

1. **初始化参数**：解析配置文件和命令行参数
2. **开始编译**：初始化Compiler对象，加载所有插件
3. **确定入口**：根据entry配置找出所有入口文件
4. **编译模块**：从入口出发，递归解析依赖模块，使用loader转换文件
5. **完成模块编译**：得到每个模块被翻译后的最终内容和依赖关系
6. **输出资源**：根据依赖关系组装成chunk，再转换成单独的文件
7. **输出完成**：将文件写入到文件系统

## 性能优化

### 构建速度优化

#### 1. 缩小文件搜索范围
```javascript
module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: 'babel-loader'
      }
    ]
  }
}
```

#### 2. 使用DllPlugin
```javascript
// webpack.dll.js
module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'lodash']
  },
  output: {
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_library',
      path: path.join(__dirname, 'dll', '[name]-manifest.json')
    })
  ]
}
```

#### 3. 多线程/多进程构建
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'thread-loader',
          'babel-loader'
        ]
      }
    ]
  }
}
```

### 打包体积优化

#### 1. Tree Shaking
```javascript
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true,
    sideEffects: false
  }
}
```

#### 2. 代码分割
```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
```

## 常见问题

### 1. webpack与其他打包工具的区别

| 特性 | Webpack | Rollup | Vite | Parcel |
|------|---------|--------|------|--------|
| 学习成本 | 高 | 中 | 低 | 低 |
| 配置复杂度 | 高 | 中 | 低 | 无 |
| 生态系统 | 丰富 | 中等 | 快速发展 | 中等 |
| 构建速度 | 中等 | 快 | 很快 | 快 |
| 代码分割 | 强大 | 有限 | 强大 | 有限 |

### 2. 如何优化webpack构建速度？

- 使用DllPlugin预构建第三方库
- 开启多线程构建（thread-loader）
- 使用缓存（cache-loader、babel-loader缓存）
- 缩小文件搜索范围
- 使用externals排除不需要打包的库

### 3. webpack的热更新原理

1. 文件变化时，webpack监听到变化
2. 重新编译变化的模块
3. 生成热更新文件（.hot-update.js）
4. 通过WebSocket通知浏览器
5. 浏览器接收更新并替换模块

## 配置示例

### 完整的生产环境配置

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].chunk.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        },
        generator: {
          filename: 'images/[name].[contenthash:8][ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}
```

## 参考资源

- [Webpack官方文档](https://webpack.js.org/)
- [Webpack中文文档](https://webpack.docschina.org/)
- [深入浅出Webpack](https://webpack.wuhaolin.cn/)
