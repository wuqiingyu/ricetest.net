export default defineNuxtConfig({
  compatibilityDate: '2025-08-13',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],
  supabase: {
    redirect: false,
    redirectOptions: {
      login: false,
      callback: false,
      exclude: []
    },
    url: 'https://oxknmteqlbblwfmdfcdt.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94a25tdGVxbGJibHdmbWRmY2R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODA1NzIsImV4cCI6MjA3MDc1NjU3Mn0.4IHKkcV3q6p3EKPj9mcKUwgemSYdEn3BPgkkJeDT__U'
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
      cacheDuration: process.env.NUXT_PUBLIC_CACHE_DURATION,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL
    }
  },
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
        { rel: 'apple-touch-icon', href: '/ricetestsicon.png' },
        // 添加 Google Fonts - Nunito 圆润卡通字体
        { 
          rel: 'preconnect', 
          href: 'https://fonts.googleapis.com' 
        },
        { 
          rel: 'preconnect', 
          href: 'https://fonts.gstatic.com', 
          crossorigin: '' 
        },
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
          media: 'print',
          onload: 'this.media="all"'
        }
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