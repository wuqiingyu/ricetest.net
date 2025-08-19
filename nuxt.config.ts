export default defineNuxtConfig({
  compatibilityDate: '2025-08-13',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxt/image'
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
  
  // 图片优化配置
  image: {
    formats: ['webp', 'avif', 'jpeg'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    densities: [1, 2],
    providers: {
      cloudinary: {
        baseURL: 'https://res.cloudinary.com/your-cloud-name/image/fetch/'
      }
    },
    presets: {
      quiz: {
        modifiers: {
          format: 'webp',
          quality: 80,
          fit: 'cover'
        }
      },
      hero: {
        modifiers: {
          format: 'webp',
          quality: 85,
          fit: 'cover'
        }
      }
    }
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
  
  // 性能优化配置
  build: {
    transpile: ['canvas-confetti']
  },
  
  // Vite配置 - 生产环境优化
  vite: {
    build: {
      minify: 'terser',
      cssMinify: true,
      terserOptions: {
        compress: {
          drop_console: false, // 保留console，避免影响调试
          drop_debugger: true,
          pure_funcs: [], // 移除pure_funcs，避免影响Vue方法
          passes: 1 // 减少压缩轮次，避免过度优化
        },
        mangle: {
          safari10: true,
          reserved: ['scrollToTest', 'scrollToStartButton'] // 保留关键方法名
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // 代码分割优化
            'vendor': ['vue', 'vue-router'],
            'supabase': ['@supabase/supabase-js'],
            'confetti': ['canvas-confetti']
          },
          // 文件名优化
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo: any) => {
            const info = assetInfo.name.split('.')
            const ext = info[info.length - 1]
            if (/\.(css)$/.test(assetInfo.name)) {
              return `css/[name]-[hash].${ext}`
            }
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/.test(assetInfo.name)) {
              return `images/[name]-[hash].${ext}`
            }
            return `assets/[name]-[hash].${ext}`
          }
        }
      },
      // 压缩选项
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000
    },
    css: {
      devSourcemap: false,
      preprocessorOptions: {
        scss: {
          charset: false
        }
      }
    },
    // 开发模式优化
    optimizeDeps: {
      include: ['vue', '@supabase/supabase-js'],
      exclude: ['canvas-confetti']
    }
  },
  
  // Nitro服务器优化
  nitro: {
    // 启用压缩
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },
    minify: true,
    
    // 实验性功能 - 开启更多优化
    experimental: {
      wasm: true
    },
    
    // 静态资源缓存
    publicAssets: [
      {
        baseURL: '/',
        dir: 'public',
        maxAge: 60 * 60 * 24 * 365 // 1年缓存
      }
    ],
    
    // 路由缓存优化
    routeRules: {
      '/': { 
        prerender: true,
        headers: { 'Cache-Control': 's-maxage=3600' }
      },
      '/quiz': { 
        prerender: true,
        headers: { 'Cache-Control': 's-maxage=1800' }
      },
      '/about': { 
        prerender: true,
        headers: { 'Cache-Control': 's-maxage=3600' }
      },
      '/wiki': { 
        prerender: true,
        headers: { 'Cache-Control': 's-maxage=1800' }
      },
      '/quiz/**': { 
        headers: { 
          'Cache-Control': 's-maxage=300, max-age=60',
          'X-Robots-Tag': 'index, follow'
        },
        isr: 300 // ISR缓存5分钟
      },
      // 静态资源缓存优化
      '/images/**': { 
        headers: { 'Cache-Control': 'max-age=31536000' }
      },
      '/css/**': { 
        headers: { 'Cache-Control': 'max-age=31536000' }
      },
      '/js/**': { 
        headers: { 'Cache-Control': 'max-age=31536000' }
      }
    }
  },
  
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
        // 优化Google Fonts加载
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
          href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap'
        }
      ]
    }
  }
})