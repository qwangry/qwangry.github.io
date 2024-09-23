import { defineConfig } from "vitepress";
import { sidebar } from "./config/sidebar";
import { nav } from "./config/nav";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "wangry",
  titleTemplate: "wangry | :title",
  description: "...",
  head: [["link", { rel: "icon", href: "/logo.jpg" }]],
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.jpg",
    nav,
    sidebar,
    socialLinks: [{ icon: "github", link: "https://qwangry.github.io" }],
    editLink: {
      pattern: "https://github.com/qwangry/qwangry.github.io/docs/:path",
      text: "Edit this page on GitHub",
    },
    outline: [2, 3],
    docFooter: {
      prev: "上一篇：",
      next: "下一篇：",
    },
    // 本地搜索
    search: {
      provider: "local",
    },
  },
  markdown: {
    theme: "material-theme-palenight",
    lineNumbers: true,
  },
  // 当设置为 true 时，VitePress 不会因为死链而导致构建失败
  ignoreDeadLinks: true,
  metaChunk: true,
});
