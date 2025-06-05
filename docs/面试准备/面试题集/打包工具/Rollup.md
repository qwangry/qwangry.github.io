# Rollup

## 什么是Rollup

Rollup是一个专注于ES模块的JavaScript打包工具，它的核心理念是将小的代码片段编译成更大、更复杂的代码库或应用程序。Rollup特别擅长构建JavaScript库和组件，因为它能生成更清洁、更高效的代码。

### 设计理念

- **ES模块优先**：原生支持ES6模块系统
- **Tree Shaking**：自动移除未使用的代码
- **轻量输出**：生成更小、更干净的打包文件
- **简单配置**：相对简洁的配置方式

## 核心特性

### 1. Tree Shaking（摇树优化）

Rollup的最大亮点是强大的Tree Shaking能力，能够静态分析代码并移除未使用的部分。

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

// main.js
import { add } from './math.js';
console.log(add(1, 2));

// 打包后只会包含add函数，subtract和multiply会被移除
```

### 2. ES模块优先

Rollup专门为ES模块设计，能够更好地理解模块依赖关系：

```javascript
// 支持各种ES模块语法
import defaultExport from './module.js';
import { namedExport } from './module.js';
import * as namespace from './module.js';
export { something } from './module.js';
```

### 3. 多种输出格式

Rollup支持多种模块格式输出：

- **ES模块** (esm)：现代浏览器和Node.js
- **CommonJS** (cjs)：Node.js环境
- **UMD** (umd)：通用模块定义，浏览器和Node.js
- **AMD** (amd)：异步模块定义
- **IIFE** (iife)：立即执行函数，直接在浏览器中使用

## 基础配置

### 安装

```bash
# 全局安装
npm install -g rollup

# 项目中安装
npm install --save-dev rollup
```

### 基础配置文件

```javascript
// rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm'
  }
}
```

### 多输出配置

```javascript
// rollup.config.js
export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/bundle.esm.js',
      format: 'esm'
    },
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/bundle.umd.js',
      format: 'umd',
      name: 'MyLibrary'
    }
  ]
}
```

## 常用插件

### 官方插件

#### @rollup/plugin-node-resolve
解析node_modules中的模块：

```javascript
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm'
  },
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: false
    })
  ]
}
```

#### @rollup/plugin-commonjs
转换CommonJS模块为ES模块：

```javascript
import commonjs from '@rollup/plugin-commonjs';

export default {
  plugins: [
    commonjs({
      include: ['node_modules/**']
    })
  ]
}
```

#### @rollup/plugin-babel
使用Babel转译代码：

```javascript
import babel from '@rollup/plugin-babel';

export default {
  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env']
    })
  ]
}
```

#### @rollup/plugin-terser
代码压缩：

```javascript
import { terser } from 'rollup-plugin-terser';

export default {
  plugins: [
    terser({
      compress: {
        drop_console: true
      }
    })
  ]
}
```

#### @rollup/plugin-json
导入JSON文件：

```javascript
import json from '@rollup/plugin-json';

export default {
  plugins: [json()]
}
```

### 第三方插件

#### rollup-plugin-typescript2
TypeScript支持：

```javascript
import typescript from 'rollup-plugin-typescript2';

export default {
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      clean: true
    })
  ]
}
```

#### rollup-plugin-postcss
CSS处理：

```javascript
import postcss from 'rollup-plugin-postcss';

export default {
  plugins: [
    postcss({
      extract: true,
      minimize: true,
      sourceMap: true
    })
  ]
}
```

## 完整配置示例

### 库开发配置

```javascript
// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'MyLibrary',
      sourcemap: true,
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
      }
    }
  ],
  external: ['react', 'react-dom'],
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      clean: true
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    postcss({
      extract: true,
      minimize: isProduction
    }),
    isProduction && terser({
      compress: {
        drop_console: true
      }
    })
  ].filter(Boolean)
}
```

### 应用程序配置

```javascript
// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: isDevelopment
  },
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    html({
      template: ({ files }) => `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>My App</title>
          </head>
          <body>
            <div id="app"></div>
            ${files.js.map(({ fileName }) => 
              `<script src="${fileName}"></script>`
            ).join('\n')}
          </body>
        </html>
      `
    }),
    isDevelopment && serve({
      open: true,
      contentBase: 'dist',
      port: 3000
    }),
    isDevelopment && livereload('dist'),
    isProduction && terser()
  ].filter(Boolean)
}
```

## 与其他打包工具对比

### Rollup vs Webpack

| 特性 | Rollup | Webpack |
|------|--------|---------|
| **主要用途** | 库和组件打包 | 应用程序打包 |
| **Tree Shaking** | 优秀，静态分析 | 良好，需要配置 |
| **输出体积** | 更小更干净 | 相对较大 |
| **配置复杂度** | 简单 | 复杂 |
| **代码分割** | 有限 | 强大 |
| **热更新** | 需要插件 | 内置支持 |
| **生态系统** | 中等 | 丰富 |
| **学习成本** | 较低 | 较高 |

### Rollup vs Vite

| 特性 | Rollup | Vite |
|------|--------|------|
| **开发体验** | 一般 | 优秀 |
| **构建速度** | 快 | 很快 |
| **配置** | 手动配置 | 约定优于配置 |
| **生产构建** | 使用Rollup | 使用Rollup |
| **生态** | 插件生态 | 基于Rollup插件 |

## 适用场景

### 最适合的场景

1. **JavaScript库开发**
   - npm包发布
   - 组件库
   - 工具函数库

2. **框架开发**
   - Vue.js、React组件
   - 前端框架核心

3. **Node.js模块**
   - CLI工具
   - 服务端库

### 不太适合的场景

1. **大型应用程序**
   - 复杂的代码分割需求
   - 需要丰富的开发工具

2. **需要复杂打包逻辑**
   - 动态导入较多
   - 复杂的资源处理

## 性能优化

### 1. 外部依赖处理

```javascript
export default {
  external: [
    // 将大型依赖标记为外部依赖
    'lodash',
    'moment',
    'react',
    'react-dom'
  ],
  output: {
    globals: {
      'lodash': '_',
      'moment': 'moment',
      'react': 'React',
      'react-dom': 'ReactDOM'
    }
  }
}
```

### 2. 代码分割

```javascript
export default {
  input: {
    main: 'src/main.js',
    utils: 'src/utils.js'
  },
  output: {
    dir: 'dist',
    format: 'esm'
  }
}
```

### 3. 插件优化

```javascript
export default {
  plugins: [
    // 只在生产环境使用压缩
    process.env.NODE_ENV === 'production' && terser(),
    
    // 缓存TypeScript编译结果
    typescript({
      cacheRoot: './node_modules/.cache/rollup-plugin-typescript2'
    })
  ].filter(Boolean)
}
```

## 常见问题与解决方案

### 1. CommonJS模块兼容性

**问题**：无法正确处理CommonJS模块

**解决方案**：
```javascript
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  plugins: [
    nodeResolve({
      preferBuiltins: false,
      browser: true
    }),
    commonjs({
      include: ['node_modules/**'],
      namedExports: {
        'node_modules/react/index.js': ['createElement', 'Component']
      }
    })
  ]
}
```

### 2. 循环依赖警告

**问题**：出现循环依赖警告

**解决方案**：
```javascript
export default {
  onwarn: (warning, warn) => {
    // 忽略循环依赖警告
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
  }
}
```

### 3. 动态导入支持

**问题**：需要支持动态导入

**解决方案**：
```javascript
export default {
  output: {
    format: 'esm',
    dir: 'dist'
  },
  // 启用代码分割以支持动态导入
  preserveModules: false
}
```

## 最佳实践

### 1. 库开发最佳实践

```javascript
// package.json
{
  "name": "my-library",
  "version": "1.0.0",
  "main": "dist/index.cjs.js",
  "module": "dist/index.esm.js",
  "browser": "dist/index.umd.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w"
  }
}
```

### 2. 多环境配置

```javascript
// rollup.config.js
const configs = {
  development: {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.js',
      format: 'esm',
      sourcemap: true
    }
  },
  production: {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/bundle.esm.js',
        format: 'esm'
      },
      {
        file: 'dist/bundle.cjs.js',
        format: 'cjs'
      }
    ],
    plugins: [terser()]
  }
};

export default configs[process.env.NODE_ENV] || configs.development;
```

### 3. 监视模式优化

```javascript
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm'
  },
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**'
  }
}
```

## 命令行使用

### 基本命令

```bash
# 使用配置文件构建
rollup -c

# 指定配置文件
rollup -c rollup.prod.config.js

# 监视模式
rollup -c -w

# 直接命令行构建
rollup src/main.js --file dist/bundle.js --format esm
```

### 常用选项

```bash
# 生成sourcemap
rollup -c --sourcemap

# 设置环境变量
NODE_ENV=production rollup -c

# 查看详细输出
rollup -c --verbose

# 生成打包分析
rollup -c --bundleConfigAsCjs
```

## 总结

### 优势

- **优秀的Tree Shaking**：静态分析能力强
- **轻量输出**：生成的代码更小更干净
- **ES模块友好**：原生支持现代模块系统
- **简单配置**：相对容易上手
- **多格式输出**：支持各种模块标准

### 劣势

- **应用构建能力有限**：主要适合库开发
- **开发体验一般**：缺少热更新等功能
- **代码分割能力有限**：不如Webpack强大
- **插件生态较小**：相比Webpack生态较少

### 使用建议

- **库开发首选**：适合JavaScript库和组件开发
- **与其他工具结合**：可以作为Vite的底层构建工具
- **简单应用可以考虑**：对于简单的单页应用也可以使用

## 参考资源

- [Rollup官方文档](https://rollupjs.org/)
- [Rollup插件列表](https://github.com/rollup/awesome)
- [Rollup配置指南](https://rollupjs.org/configuration-options/)
