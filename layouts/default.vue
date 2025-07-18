<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header Component - 所有页面共享 -->
    <Header />

    <!-- 页面内容插槽 -->
    <slot />

    <!-- Footer Component - 所有页面共享 -->
    <Footer />
  </div>
</template>

<script setup>
// 全局SEO设置
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'RiceTest' },
    { property: 'og:site_name', content: 'RiceTest' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/ricetestsicon.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: '/ricetestsicon.png' },
    { name: 'theme-color', content: '#3B82F6' }
  ],
  link: [
    { rel: 'canonical', href: 'https://ricetest.net' }
  ]
})
</script>