<template>
  <div class="diamond-stars-bg min-h-screen">
    <div class="apple-container apple-spacing">
      <!-- 页面标题 -->
      <h1 class="apple-title text-center mb-8">Contact Us</h1>
      
      <!-- 主要内容 -->
      <div class="apple-card apple-spacing max-w-3xl mx-auto">
        <div class="text-center space-y-8">
          
          <!-- 欢迎信息 -->
          <div class="mb-8">
            <div class="text-6xl mb-6">📧</div>
            <h2 class="apple-title text-2xl mb-4">We'd Love to Hear from You!</h2>
            <p class="apple-subtitle text-lg leading-relaxed">
              Have questions, suggestions, or feedback about RiceTests? We're here to help and always excited to hear from our community!
            </p>
          </div>

          <!-- 联系原因 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div class="text-3xl mb-3">🤔</div>
              <h3 class="font-semibold text-blue-900 mb-2">Got Questions?</h3>
              <p class="text-blue-800 text-sm">
                Confused about your Rice Purity Test results? Need help understanding what your score means? We're here to explain!
              </p>
            </div>
            
            <div class="bg-green-50 p-6 rounded-xl border border-green-200">
              <div class="text-3xl mb-3">💡</div>
              <h3 class="font-semibold text-green-900 mb-2">New Test Ideas?</h3>
              <p class="text-green-800 text-sm">
                Have an idea for a new personality test or quiz? We love creating fresh content that our community will enjoy!
              </p>
            </div>
            
            <div class="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <div class="text-3xl mb-3">🎯</div>
              <h3 class="font-semibold text-purple-900 mb-2">Product Feedback?</h3>
              <p class="text-purple-800 text-sm">
                Found a bug? Have suggestions for improving our website? Your feedback helps us make RiceTests better for everyone!
              </p>
            </div>
            
            <div class="bg-orange-50 p-6 rounded-xl border border-orange-200">
              <div class="text-3xl mb-3">🤝</div>
              <h3 class="font-semibold text-orange-900 mb-2">General Inquiries?</h3>
              <p class="text-orange-800 text-sm">
                Questions about our privacy policy, terms of service, or anything else? We're happy to help clarify!
              </p>
            </div>
          </div>

          <!-- 联系信息 -->
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200">
            <div class="text-4xl mb-4">✉️</div>
            <h3 class="apple-title text-xl mb-4">Get in Touch</h3>
            <p class="apple-subtitle mb-6">
              Ready to reach out? Drop us a line at our email address:
            </p>
            
            <!-- 邮箱地址 -->
            <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div class="flex items-center justify-center space-x-3 mb-4">
                <div class="text-2xl">📮</div>
                <a 
                  href="mailto:contact@ricetest.net" 
                  class="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  contact@ricetest.net
                </a>
              </div>
              <p class="text-gray-600 text-sm">
                Click the email address above to open your email client, or copy and paste it into your preferred email app.
              </p>
            </div>
          </div>

          <!-- 回复时间说明 -->
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div class="flex items-center justify-center space-x-2 mb-3">
              <div class="text-2xl">⏱️</div>
              <h3 class="font-semibold text-yellow-900">Response Time</h3>
            </div>
            <p class="text-yellow-800 text-sm">
              We typically respond to emails within 24-48 hours. Please be patient with us - we read every message and want to give you a thoughtful response!
            </p>
          </div>

          <!-- 鼓励性信息 -->
          <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <div class="text-3xl mb-3">🌟</div>
            <h3 class="font-semibold text-gray-800 mb-3">Your Voice Matters</h3>
            <p class="text-gray-700 text-sm leading-relaxed">
              RiceTests is built for our community, and your input helps shape our future. Whether you're sharing a funny test result, 
              suggesting improvements, or just saying hello - we genuinely appreciate every message we receive!
            </p>
          </div>

          <!-- 社交媒体提示 -->
          <div class="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
            <div class="text-3xl mb-3">📱</div>
            <h3 class="font-semibold text-indigo-900 mb-3">Share Your Results</h3>
            <p class="text-indigo-800 text-sm">
              Don't forget to share your Rice Purity Test results on social media! Tag us or use #RicePurityTest - 
              we love seeing how our tests bring people together and spark conversations.
            </p>
          </div>

        </div>
      </div>

      <!-- 返回首页 -->
      <div class="text-center mt-8">
        <a 
          href="/" 
          class="apple-button bg-blue-500 hover:bg-blue-600 text-white inline-flex items-center"
        >
          ← Back to Home
        </a>
      </div>

    </div>
  </div>
</template>

<script setup>
// SEO Meta
useHead({
  title: 'Contact Us - RiceTests',
  meta: [
    { name: 'description', content: 'Get in touch with RiceTests! Have questions about your Rice Purity Test results, suggestions for new tests, or feedback about our platform? We\'d love to hear from you.' },
    { name: 'keywords', content: 'contact ricetests, customer support, rice purity test help, feedback, suggestions, questions' },
    { property: 'og:title', content: 'Contact Us - RiceTests' },
    { property: 'og:description', content: 'Have questions, suggestions, or feedback about RiceTests? We\'re here to help and always excited to hear from our community!' },
    { property: 'og:type', content: 'website' }
  ],
  link: [
    { rel: 'canonical', href: 'https://ricetest.net/contact' }
  ]
})
</script>

<style scoped>
/* 页面特有样式 */
.bg-blue-50 {
  background-color: #eff6ff;
}

.bg-green-50 {
  background-color: #f0fdf4;
}

.bg-purple-50 {
  background-color: #faf5ff;
}

.bg-orange-50 {
  background-color: #fff7ed;
}

.bg-yellow-50 {
  background-color: #fefce8;
}

.bg-indigo-50 {
  background-color: #eef2ff;
}

/* 邮箱链接悬停效果 */
a[href^="mailto:"] {
  transition: all 0.3s ease;
}

a[href^="mailto:"]:hover {
  transform: translateY(-2px);
  text-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}

/* 卡片悬停效果 */
.bg-blue-50:hover,
.bg-green-50:hover,
.bg-purple-50:hover,
.bg-orange-50:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}
</style>