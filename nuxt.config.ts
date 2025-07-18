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