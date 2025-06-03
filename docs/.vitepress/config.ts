import { defineConfig } from "vitepress";
import { sidebar } from "./config/sidebar";
import { nav } from "./config/nav";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "wangry",
  titleTemplate: "wangry | :title",
  description: "...",
  head: [
    ["link", { rel: "icon", href: "/logo.jpg" }],
    [
      "meta",
      {
        name: "google-site-verification",
        content: "MX1eK0VRiaFy3YQBfQ7A6QjscbHdiEyTAj10C2-UBu0",
      },
    ],
    // 基础SEO
    [
      'meta',
      {
        name: 'keywords', content: '前端开发,React,性能优化,VitePress'
      }
    ],
    [
      'meta',
      {
        property: 'og:type', content: 'website'
      }
    ],
    // Google AdSense
    [
      'script',
      {
        async: '',
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6580163109975746',
        crossorigin: 'anonymous'
      }
    ],  
    // 添加AMP广告库脚本
    [
      'script',
      {
        async: '',
        'custom-element': 'amp-ad',
        src: 'https://cdn.ampproject.org/v0/amp-ad-0.1.js'
      }
    ],
  ],
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.jpg",
    nav,
    sidebar,
    socialLinks: [{ icon: "github", link: "https://github.com/qwangry" }],
    editLink: {
      pattern: "https://github.com/qwangry/qwangry.github.io/tree/main/docs/:path",
      text: "在GitHub上编辑",
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
    math: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
    config(md) {
      const defaultCodeInline = md.renderer.rules.code_inline!
      md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
        tokens[idx].attrSet('v-pre', '')
        return defaultCodeInline(tokens, idx, options, env, self)
      }
    },
  },
  // 当设置为 true 时，VitePress 不会因为死链而导致构建失败
  ignoreDeadLinks: true,
  metaChunk: true,
  sitemap: {
    hostname: "https://qwangry.github.io/",
  },
});
