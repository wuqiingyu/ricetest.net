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
        
        <!-- Featured Article -->
        <div class="apple-card apple-spacing">
          <div class="border-l-4 border-blue-500 pl-6">
            <span class="text-sm text-blue-600 font-semibold uppercase tracking-wide">Featured Article</span>
            <h2 class="apple-title text-2xl mt-2 mb-3">The Complete History of the Rice Purity Test</h2>
            <p class="text-gray-600 mb-4">
              Discover how a simple 10-question survey from Rice University in 1924 became the internet's most famous personality test, 
              taken by millions worldwide.
            </p>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4 text-sm text-gray-500">
                <span>📅 July 18, 2025</span>
                <span>⏱️ 8 min read</span>
                <span>👁️ 15.2k views</span>
              </div>
              <button class="apple-button-primary text-sm">Read More</button>
            </div>
          </div>
        </div>

        <!-- Articles Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Article 1 -->
          <article class="apple-card apple-spacing hover:shadow-lg transition-shadow">
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <span class="text-2xl">🧠</span>
                <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-semibold">Psychology</span>
              </div>
              <h3 class="apple-title text-xl">What Your Rice Purity Score Really Means</h3>
              <p class="text-gray-600 text-sm">
                Breaking down the psychological implications behind different score ranges and what they reveal about personality traits and life experiences.
              </p>
              <div class="flex items-center justify-between">
                <div class="text-xs text-gray-500">
                  <span>📅 July 15, 2025</span> • <span>⏱️ 6 min</span>
                </div>
                <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">Read →</button>
              </div>
            </div>
          </article>

          <!-- Article 2 -->
          <article class="apple-card apple-spacing hover:shadow-lg transition-shadow">
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <span class="text-2xl">📊</span>
                <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">Statistics</span>
              </div>
              <h3 class="apple-title text-xl">Rice Purity Test: Global Statistics & Trends</h3>
              <p class="text-gray-600 text-sm">
                Analyzing millions of test results to reveal fascinating patterns in scores across different demographics, age groups, and regions.
              </p>
              <div class="flex items-center justify-between">
                <div class="text-xs text-gray-500">
                  <span>📅 July 12, 2025</span> • <span>⏱️ 5 min</span>
                </div>
                <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">Read →</button>
              </div>
            </div>
          </article>

          <!-- Article 3 -->
          <article class="apple-card apple-spacing hover:shadow-lg transition-shadow">
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <span class="text-2xl">🎓</span>
                <span class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">Education</span>
              </div>
              <h3 class="apple-title text-xl">College Culture and the Rice Purity Test</h3>
              <p class="text-gray-600 text-sm">
                How university students use the Rice Purity Test as a social bonding tool and what it reveals about modern college culture.
              </p>
              <div class="flex items-center justify-between">
                <div class="text-xs text-gray-500">
                  <span>📅 July 10, 2025</span> • <span>⏱️ 7 min</span>
                </div>
                <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">Read →</button>
              </div>
            </div>
          </article>

          <!-- Article 4 -->
          <article class="apple-card apple-spacing hover:shadow-lg transition-shadow">
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <span class="text-2xl">💬</span>
                <span class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-semibold">Social</span>
              </div>
              <h3 class="apple-title text-xl">The Viral Psychology Behind Personality Tests</h3>
              <p class="text-gray-600 text-sm">
                Why do personality tests spread like wildfire on social media? Exploring the psychological mechanisms that make them irresistible to share.
              </p>
              <div class="flex items-center justify-between">
                <div class="text-xs text-gray-500">
                  <span>📅 July 8, 2025</span> • <span>⏱️ 4 min</span>
                </div>
                <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">Read →</button>
              </div>
            </div>
          </article>

        </div>

        <!-- Categories Section -->
        <div class="apple-card apple-spacing">
          <h2 class="apple-title text-2xl mb-6">Browse by Category</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div class="text-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
              <div class="text-3xl mb-2">🧠</div>
              <h3 class="font-semibold text-purple-900">Psychology</h3>
              <p class="text-xs text-purple-700 mt-1">8 articles</p>
            </div>

            <div class="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
              <div class="text-3xl mb-2">📊</div>
              <h3 class="font-semibold text-green-900">Statistics</h3>
              <p class="text-xs text-green-700 mt-1">5 articles</p>
            </div>

            <div class="text-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors cursor-pointer">
              <div class="text-3xl mb-2">🎓</div>
              <h3 class="font-semibold text-yellow-900">Education</h3>
              <p class="text-xs text-yellow-700 mt-1">6 articles</p>
            </div>

            <div class="text-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer">
              <div class="text-3xl mb-2">💬</div>
              <h3 class="font-semibold text-red-900">Social</h3>
              <p class="text-xs text-red-700 mt-1">4 articles</p>
            </div>

          </div>
        </div>

        <!-- Newsletter Signup -->
        <div class="apple-card apple-spacing bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
          <div class="text-center">
            <div class="text-4xl mb-4">📮</div>
            <h2 class="apple-title text-2xl mb-3">Stay Updated</h2>
            <p class="text-gray-600 mb-6">
              Get the latest articles and insights about personality tests delivered to your inbox
            </p>
            <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email..." 
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button class="apple-button-primary whitespace-nowrap">Subscribe</button>
            </div>
            <p class="text-xs text-gray-500 mt-2">No spam, unsubscribe anytime</p>
          </div>
        </div>

        <!-- Recent Updates -->
        <div class="apple-card apple-spacing">
          <h2 class="apple-title text-2xl mb-6">Recent Updates</h2>
          <div class="space-y-4">
            
            <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl">✨</div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900">New Analysis Tools Released</h3>
                <p class="text-sm text-gray-600 mt-1">
                  We've added advanced scoring analytics and comparison features to help you better understand your test results.
                </p>
                <span class="text-xs text-gray-500">2 days ago</span>
              </div>
            </div>

            <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl">📝</div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900">Wiki Content Expansion</h3>
                <p class="text-sm text-gray-600 mt-1">
                  Added 12 new articles covering the latest research in personality psychology and test validation.
                </p>
                <span class="text-xs text-gray-500">1 week ago</span>
              </div>
            </div>

            <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl">🌍</div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900">Global Community Milestone</h3>
                <p class="text-sm text-gray-600 mt-1">
                  We've reached 5 million test completions from users around the world! Thank you for being part of our journey.
                </p>
                <span class="text-xs text-gray-500">2 weeks ago</span>
              </div>
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
/* Additional custom styles for wiki page */
.article-card:hover {
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

.category-card {
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: scale(1.05);
}
</style>