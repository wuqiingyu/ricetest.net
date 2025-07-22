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
      script: [
        {
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N94TB5H5');`,
          type: 'text/javascript'
        },
        {
          async: true,
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4219881902610897',
          crossorigin: 'anonymous'
        }
      ],
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