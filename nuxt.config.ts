export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    '~/assets/css/main.css',
    '~/assets/css/apple-theme.css'
  ],
  ssr: true,
  app: {
    head: {
      script: [{
        async: true,
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4219881902610897',
        crossorigin: 'anonymous'
      }],
      link: [
        { rel: 'icon', type: 'image/png', href: '/ricetestsicon.png' },
        { rel: 'shortcut icon', href: '/ricetestsicon.png' },
        { rel: 'apple-touch-icon', href: '/ricetestsicon.png' }
      ]
    }
  },
  nitro: {
    publicAssets: [
      {
        baseURL: '/',
        dir: 'public',
        maxAge: 60 * 60 * 24 * 7 // 7 days cache for static assets
      }
    ]
  }
})