# css 实现主题切换

## CSS 变量实现主题切换

CSS 变量（Custom Properties）是 CSS 的一种新特性，允许开发者定义变量并在整个 CSS 文件中使用。CSS 变量可以动态改变，特别适合主题切换的需求。

### 实现

1、定义变量

在 CSS 文件的`:root选择器`中定义全局变量

```css
:root {
  --primary-color: #3498db;
  --background-color: #ffffff;
  --text-color: #333333;
}
```

2、使用变量

```css
body {
  background-color: var(--background-color);
  color: var(--text-color);
}

button {
  background-color: var(--primary-color);
  color: #ffffff;
}
```

3、切换主题

JavaScript 动态更改 css 变量的值

```js
function setTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.style.setProperty("--primary-color", "#e74c3c");
    root.style.setProperty("--background-color", "#2c3e50");
    root.style.setProperty("--text-color", "#ecf0f1");
  } else {
    root.style.setProperty("--primary-color", "#3498db");
    root.style.setProperty("--background-color", "#ffffff");
    root.style.setProperty("--text-color", "#333333");
  }
}

// 监听主题切换按钮
document.getElementById("theme-switch").addEventListener("click", () => {
  const currentTheme =
    document.documentElement.style.getPropertyValue("--background-color") ===
    "#ffffff"
      ? "dark"
      : "light";
  setTheme(currentTheme);
});
```

### 优缺点

优点：

- 简单易用

- 性能高效

- 兼容性好

缺点：

- 浏览器兼容性

- 维护成本：对于大型项目，需要维护大量的变量，可能导致变量命名冲突和管理困难

## CSS-in-JS 实现主题切换

CSS-in-JS 是一种在 JavaScript 中编写 CSS 的技术，通过 JavaScript 动态生成和管理 CSS 样式，常见的库包括：Styled-components、Emotion 等

### 实现

以 Styled-components 为例

1、安装依赖

```shell
npm install styled-components
```

2、创建主题对象

```js
// themes.js
export const lightTheme = {
  primaryColor: "#3498db",
  backgroundColor: "#ffffff",
  textColor: "#333333",
};

export const darkTheme = {
  primaryColor: "#e74c3c",
  backgroundColor: "#2c3e50",
  textColor: "#ecf0f1",
};
```

3、定义样式库组件

```js
// styledComponents.js
import styled from "styled-components";

export const Button = styled.button`
  background-color: ${(props) => props.theme.primaryColor};
  color: #ffffff;
`;

export const Body = styled.body`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
`;
```

4、切换主题

```js
// App.js
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes";
import { Button, Body } from "./styledComponents";

function App() {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <Body>
        <Button onClick={toggleTheme}>Toggle Theme</Button>
      </Body>
    </ThemeProvider>
  );
}

export default App;
```

### 优缺点

优点：

- 动态性强：能够在运行时动态更改样式

- 样式隔离：避免全局 CSS 污染，组件样式独立

- 集成度高：与 React 等前端框架高度集成，开发体验好

缺点：

- 性能开销：动态生成样式，可能影响性能

- 学习成本

## 引入不同的 css 文件实现主题切换

### 实现步骤

1、创建不同主题的 css 文件

```css
/* light-theme.css */
body {
  background-color: #ffffff;
  color: #333333;
}

button {
  background-color: #3498db;
  color: #ffffff;
}

/* dark-theme.css */
body {
  background-color: #2c3e50;
  color: #ecf0f1;
}

button {
  background-color: #e74c3c;
  color: #ffffff;
}
```

2、动态加载 css

通过 JavaScript 动态加载不同的 css 文件

```js
function loadTheme(theme) {
  const head = document.head;
  let link = document.getElementById("theme-link");

  if (link) {
    link.href = theme;
  } else {
    link = document.createElement("link");
    link.id = "theme-link";
    link.rel = "stylesheet";
    link.href = theme;
    head.appendChild(link);
  }
}

// 监听主题切换按钮
document.getElementById("theme-switch").addEventListener("click", () => {
  const currentTheme = document
    .getElementById("theme-link")
    .href.includes("light-theme.css")
    ? "dark-theme.css"
    : "light-theme.css";
  loadTheme(currentTheme);
});
```

### 优缺点

优点：

- 实现简单

- 适应性广

缺点：

- 性能开销：每次切换都需要重新加载 css 文件，可能导致页面闪烁

- 维护成本：需要维护多套完整的 css 文件，代码重复度高

## 使用 css 预处理器实现

css 预处理器提供了变量和混入功能，方便实现主题切换

### 实现

以 sass 为例

1、定义变量

```css
// variables.scss
$primary-color: #3498db;
$background-color: #ffffff;
$text-color: #333333;

$dark-primary-color: #e74c3c;
$dark-background-color: #2c3e50;
$dark-text-color: #ecf0f1;
```

2、创建主题混入

```css
// mixins.scss
@mixin theme($primary-color, $background-color, $text-color) {
  body {
    background-color: $background-color;
    color: $text-color;
  }

  button {
    background-color: $primary-color;
    color: #ffffff;
  }
}
```

3、应用主题

```css
// styles.scss
@import "variables";
@import "mixins";

@include theme($primary-color, $background-color, $text-color);

body.dark-theme {
  @include theme($dark-primary-color, $dark-background-color, $dark-text-color);
}
```

4、切换主题

```js
document.getElementById("theme-switch").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});
```

### 优缺点

优点：

- 功能强大

- 编译时处理

缺点：

- 依赖编译

- 灵活性低：相比于 css 变量，不能在运行时动态更改变量值

## 组件库的主题实现原理

### ant design

ant design 使用 less 作为样式预处理器，通过修改 less 变量实现主题定制

在 config-overrides.js 中配置 Less 变量

```js
const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      modifyVars: { "@primary-color": "#1DA57A" },
      javascriptEnabled: true,
    },
  })
);
```

### Element Plus 的主题实现

Element Plus 使用 Sass 作为样式预处理器，通过配置 Sass 变量实现主题定制。

示例：在项目中创建一个新的 sass 文件，并覆盖默认变量：

```css
// element-variables.scss
$--color-primary: #1da57a;
$--button-padding-horizontal: 20px;
```

在 main.js 中引入该文件：

```js
import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./styles/element-variables.scss";

createApp(App).use(ElementPlus).mount("#app");
```

#### 优缺点

优点：

- 高度可定制：通过修改预处理器变量可以灵活定制主题

- 开发体验好

缺点：

- 配置复杂：需要了解预处理器的配置和变量

- 构建依赖

## vue 和 react 中实现主题切换

### vue

在 Vue CLI 项目中，可以通过配置 vue.config.js 实现主题定制

```js
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/variables.scss";
        `,
      },
    },
  },
};
```

#### 动态切换主题

```js
import { reactive, toRefs } from "vue";

export default {
  setup() {
    const state = reactive({
      isDarkTheme: false,
    });

    const toggleTheme = () => {
      state.isDarkTheme = !state.isDarkTheme;
      document.body.classList.toggle("dark-theme", state.isDarkTheme);
    };

    return {
      ...toRefs(state),
      toggleTheme,
    };
  },
};
```

### React

使用 context API 管理主题

```js
import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

使用主题

```js
import React from "react";
import { useTheme } from "./ThemeProvider";
import "./App.css";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default App;
```

#### 优缺点分析

优点：

- 框架集成

- 动态性强

缺点：

- 实现复杂：需要额外的状态管理逻辑

- 性能开销

## Next.js 中的主题切换：next-themes 实现原理

next-themes 是一个用于 Next.js 项目的主题切换库，支持暗黑模式和自定义主题

### 实现

1、安装依赖

```shell
npm install next-themes
```

2、配置主题提供者

在`_app.js` 中配置 ThemeProvider

```js
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
```

3、切换主题

在组件中使用 useTheme Hook 切换主题

```js
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
```

### 优缺点

优点：

- 集成度高：与 Next.js 无缝集成，使用简单。

- 支持多主题：支持暗黑模式和自定义主题，灵活性高。

缺点：

- 库依赖：依赖外部库，需要额外学习和配置。

- 性能问题：切换主题时可能引起页面重绘，影响性能。

## 参考

[https://zhuanlan.zhihu.com/p/699451643](https://zhuanlan.zhihu.com/p/699451643)
