import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "common-frontend-code",
  description: "前端常用代码库",
  base: '/common-frontend-code-doc/',
  head: [
    ['link', { rel: 'icon', type: 'image/svg', href: '/logo.svg' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '开始', link: '/start' },
          { text: '为什么写这个项目?', link: '/introduction' }
        ]
      },
      {
        text: 'CSS',
        items: [
          { text: 'common', link: '/css/common' },
          { text: 'uniapp', link: '/css/uniapp' }
        ]
      },
      {
        text: 'request',
        items: [
          { text: 'uniapp', link: '/request/uniapp' },
        ]
      },
      {
        text: 'utils',
        items: [
          { text: 'uniapp', link: '/utils/uniapp' },
        ]
      },

    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/windyeasy/common-frontend-code' }
    ]
  }
})
