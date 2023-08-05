import { defineConfig } from 'vitepress'
import { sidebar } from './config/sidebar'
import { nav } from './config/nav'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "wangry",
  // titleTemplate: 'wangry | :title',
  description: "wangry's blog",
  head: [
    [
      'link', 
      {rel: 'icon', href: './logo.jpg'}
    ]
  ],
  base: './',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.jpg',
    nav,

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://qwangry.github.io' }
    ],
    editLink: {
      pattern: 'https://github.com/qwangry/qwangry.github.io/docs/:path',
      text: 'Edit this page on GitHub'
    },
    outline: [2,3],
    docFooter: {
      prev: '上一篇：',
      next: '下一篇：'
    }
  },
  markdown: {
    theme: 'material-theme-palenight',
    lineNumbers: true,
  }
})
