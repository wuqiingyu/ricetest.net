<template>
  <div class="diamond-stars-bg min-h-screen">
    <div class="apple-container apple-spacing">
      
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <div class="text-6xl mb-4">📚</div>
        <h1 class="apple-title text-4xl mb-4">RiceTest Wiki</h1>
        <p class="apple-subtitle text-xl">
          Explore insights, stories, and everything about personality tests
        </p>
      </div>

      <!-- Featured Articles Section -->
      <div class="space-y-8">
        
        <!-- Articles List -->
        <div class="space-y-6">
          
          <!-- Article: What is a Good Rice Purity Score -->
          <article class="apple-card apple-spacing hover:shadow-lg transition-shadow cursor-pointer group">
            <a href="/wiki/what-is-a-good-rice-purity-score" class="block">
              <div class="flex items-center gap-6">
                <div class="flex items-center gap-3">
                  <span class="text-3xl">🎯</span>
                  <span class="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">Guide</span>
                </div>
                <div class="flex-1">
                  <h3 class="apple-title text-xl group-hover:text-blue-600 transition-colors mb-2" style="line-height: 2.2 !important;">What is a Good Rice Purity Score?</h3>
                  <p class="text-gray-600 text-sm mb-3">
                    Discover the truth about Rice Purity Test scores. Learn what high and low scores mean, why there's no universal "good" score, and how to understand your results without overthinking them.
                  </p>
                  <div class="flex items-center justify-between">
                    <div class="text-xs text-gray-500">
                      <span>⏱️ 8 min read</span>
                    </div>
                    <span class="text-blue-600 group-hover:text-blue-800 text-sm font-medium">Read →</span>
                  </div>
                </div>
              </div>
            </a>
          </article>

          <!-- Coming Soon Placeholder -->
          <article class="apple-card apple-spacing border-2 border-dashed border-gray-300">
            <div class="flex items-center justify-center py-12">
              <div class="text-center">
                <div class="text-4xl mb-4">📝</div>
                <h3 class="font-medium text-gray-600 mb-2">More Articles Coming Soon</h3>
                <p class="text-sm text-gray-500">
                  Psychology insights, research articles, and community stories
                </p>
              </div>
            </div>
          </article>

        </div>

        <!-- Meanwhile, explore our main features -->
        <div class="apple-card apple-spacing">
          <div class="text-center">
            <h3 class="apple-title text-xl mb-4">Meanwhile, explore RiceTest</h3>
            <p class="text-gray-600 mb-6">
              While we're building our wiki, don't miss out on our main features
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/" class="apple-button bg-blue-500 hover:bg-blue-600 text-white">
                Take the Rice Purity Test
              </a>
              <a href="/about" class="apple-button bg-gray-500 hover:bg-gray-600 text-white">
                Learn About Us
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
// SEO Meta
useHead({
  title: 'Wiki - RiceTests | Insights & Articles About Personality Tests',
  meta: [
    { name: 'description', content: 'Explore the RiceTests Wiki for insights, research, and articles about personality tests, psychology, and the famous Rice Purity Test. Learn from expert analysis and community discussions.' },
    { name: 'keywords', content: 'rice purity test wiki, personality test articles, psychology insights, test analysis, rice test research, personality psychology, social psychology' },
    { property: 'og:title', content: 'Wiki - RiceTests | Insights & Articles About Personality Tests' },
    { property: 'og:description', content: 'Explore insights, research, and articles about personality tests, psychology, and the famous Rice Purity Test.' },
    { property: 'og:url', content: 'https://ricetest.net/wiki' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Wiki - RiceTests | Insights & Articles About Personality Tests' },
    { name: 'twitter:description', content: 'Explore insights, research, and articles about personality tests, psychology, and the famous Rice Purity Test.' }
  ],
  link: [
    { rel: 'canonical', href: 'https://ricetest.net/wiki' }
  ]
})
</script>

<style scoped>
/* Wiki page styles */
.apple-title {
  line-height: 2.2 !important;
  word-wrap: break-word;
  hyphens: auto;
  margin-bottom: 1rem;
  display: block;
}

/* Force proper spacing for h3 titles */
h3.apple-title,
.apple-title.text-xl {
  line-height: 2.2 !important;
  margin-bottom: 1rem !important;
  padding: 0;
}

/* Better text flow for long titles on mobile */
@media (max-width: 768px) {
  .apple-title,
  h3.apple-title {
    line-height: 2.0 !important;
    font-size: 1.125rem !important;
  }
}

/* Override any conflicting Tailwind classes */
.text-xl.apple-title {
  line-height: 2.2 !important;
}
</style>