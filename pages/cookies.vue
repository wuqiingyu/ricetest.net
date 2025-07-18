<template>
  <div class="diamond-stars-bg min-h-screen">
    <div class="apple-container apple-spacing">
      <!-- 页面标题 -->
      <h1 class="apple-title text-center mb-8">Cookie Policy</h1>
      
      <!-- 最后更新日期 -->
      <div class="text-center mb-8">
        <p class="apple-subtitle text-sm">Last Updated: {{ lastUpdated }}</p>
      </div>
      
      <!-- Cookie政策内容 -->
      <div class="apple-card apple-spacing max-w-4xl mx-auto">
        <div class="space-y-8 text-gray-700 leading-relaxed">
          
          <!-- 简介 -->
          <section>
            <p class="mb-4 text-lg">
              This Cookie Policy explains how RiceTests ("we," "us," or "our") uses cookies and similar technologies 
              when you visit our website. By using our site, you consent to our cookie practices as described in this policy.
            </p>
          </section>

          <!-- 1. What Are Cookies -->
          <section>
            <h2 class="apple-title text-xl mb-4">1. What Are Cookies?</h2>
            <p class="mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
              They are widely used to make websites work more efficiently and to provide information to website owners.
            </p>
            <p class="mb-4">
              Cookies allow websites to remember your actions and preferences (such as login, language, font size, and other display preferences) 
              over a period of time, so you don't have to keep re-entering them whenever you come back to the site or browse from one page to another.
            </p>
            <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p class="text-blue-800 font-semibold">
                💡 In simple terms: Cookies help websites remember you and your preferences to provide a better user experience.
              </p>
            </div>
          </section>

          <!-- 2. Types of Cookies We Use -->
          <section>
            <h2 class="apple-title text-xl mb-4">2. Types of Cookies We Use</h2>
            <p class="mb-4">We use different types of cookies for various purposes:</p>
            
            <div class="space-y-4">
              <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 class="font-semibold text-green-900 mb-2">🔒 Necessary Cookies</h3>
                <p class="text-green-800 text-sm mb-2">
                  These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                </p>
                <ul class="text-green-700 text-sm space-y-1 ml-4">
                  <li>• Session management</li>
                  <li>• Security features</li>
                  <li>• Basic website functionality</li>
                </ul>
              </div>
              
              <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 class="font-semibold text-orange-900 mb-2">📊 Performance Cookies</h3>
                <p class="text-orange-800 text-sm mb-2">
                  These cookies collect information about how visitors use our website, such as which pages are visited most often and if they get error messages from web pages.
                </p>
                <ul class="text-orange-700 text-sm space-y-1 ml-4">
                  <li>• Page load times</li>
                  <li>• Popular content tracking</li>
                  <li>• Error reporting</li>
                </ul>
              </div>
              
              <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 class="font-semibold text-purple-900 mb-2">⚙️ Functionality Cookies</h3>
                <p class="text-purple-800 text-sm mb-2">
                  These cookies remember choices you make to improve your experience and personalize the site for you.
                </p>
                <ul class="text-purple-700 text-sm space-y-1 ml-4">
                  <li>• Language preferences</li>
                  <li>• Region selection</li>
                  <li>• Customized content</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- 3. Purposes of Cookie Usage -->
          <section>
            <h2 class="apple-title text-xl mb-4">3. Why We Use Cookies</h2>
            <p class="mb-4">We use cookies for the following purposes:</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-blue-50 p-4 rounded-lg">
                <h3 class="font-semibold text-blue-900 mb-2">🎯 Essential Operations</h3>
                <ul class="text-blue-800 text-sm space-y-1">
                  <li>• Enable basic website functions</li>
                  <li>• Maintain security</li>
                  <li>• Remember your test progress</li>
                </ul>
              </div>
              
              <div class="bg-green-50 p-4 rounded-lg">
                <h3 class="font-semibold text-green-900 mb-2">📈 Analytics & Improvement</h3>
                <ul class="text-green-800 text-sm space-y-1">
                  <li>• Understand how you use our site</li>
                  <li>• Improve site performance</li>
                  <li>• Identify popular content</li>
                </ul>
              </div>
              
              <div class="bg-yellow-50 p-4 rounded-lg">
                <h3 class="font-semibold text-yellow-900 mb-2">🎨 Personalization</h3>
                <ul class="text-yellow-800 text-sm space-y-1">
                  <li>• Remember your preferences</li>
                  <li>• Customize your experience</li>
                  <li>• Provide relevant content</li>
                </ul>
              </div>
              
              <div class="bg-purple-50 p-4 rounded-lg">
                <h3 class="font-semibold text-purple-900 mb-2">🔄 Social Features</h3>
                <ul class="text-purple-800 text-sm space-y-1">
                  <li>• Enable social sharing</li>
                  <li>• Connect with social media</li>
                  <li>• Share test results</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- 4. Third-Party Cookies -->
          <section>
            <h2 class="apple-title text-xl mb-4">4. Third-Party Cookies</h2>
            <p class="mb-4">
              We may use third-party services that place cookies on your device. These services help us improve our website and provide better services to you.
            </p>
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 class="font-semibold text-gray-800 mb-3">Third-Party Services May Include:</h3>
              <ul class="text-gray-700 text-sm space-y-2">
                <li>• <strong>Analytics Services:</strong> Help us understand website usage and performance</li>
                <li>• <strong>Social Media Platforms:</strong> Enable sharing and social features</li>
                <li>• <strong>Content Delivery Networks:</strong> Improve site loading speed</li>
                <li>• <strong>Security Services:</strong> Protect against spam and malicious activity</li>
              </ul>
            </div>
          </section>

          <!-- 5. Managing Cookies -->
          <section>
            <h2 class="apple-title text-xl mb-4">5. Managing Your Cookie Preferences</h2>
            <p class="mb-4">
              You have several options for managing cookies on our website:
            </p>
            
            <div class="space-y-4">
              <div class="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                <h3 class="font-semibold text-green-900 mb-2">🌐 Browser Settings</h3>
                <p class="text-green-800 text-sm mb-2">
                  Most web browsers allow you to control cookies through their settings preferences. You can:
                </p>
                <ul class="text-green-700 text-sm space-y-1 ml-4">
                  <li>• Block all cookies</li>
                  <li>• Allow only first-party cookies</li>
                  <li>• Delete existing cookies</li>
                  <li>• Set cookies to expire when you close your browser</li>
                </ul>
              </div>
              
              <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <h3 class="font-semibold text-blue-900 mb-2">📱 Mobile Devices</h3>
                <p class="text-blue-800 text-sm">
                  On mobile devices, you can typically manage cookies through your browser app settings or your device's privacy settings.
                </p>
              </div>
              
              <div class="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                <h3 class="font-semibold text-orange-900 mb-2">⚠️ Important Note</h3>
                <p class="text-orange-800 text-sm">
                  Disabling cookies may affect the functionality of our website. Some features may not work properly without cookies enabled.
                </p>
              </div>
            </div>
          </section>

          <!-- 6. Cookie Consent -->
          <section>
            <h2 class="apple-title text-xl mb-4">6. Your Consent</h2>
            <p class="mb-4">
              By using our website, you consent to our use of cookies as described in this policy. You can withdraw your consent at any time by:
            </p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li>Changing your browser settings to block cookies</li>
              <li>Clearing existing cookies from your browser</li>
              <li>Contacting us directly with your preferences</li>
            </ul>
          </section>

          <!-- 7. Legal Basis -->
          <section>
            <h2 class="apple-title text-xl mb-4">7. Legal Basis for Processing</h2>
            <p class="mb-4">
              Our legal basis for using cookies depends on the type of cookie:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 class="font-semibold text-blue-900 mb-2">🔒 Necessary Cookies</h3>
                <p class="text-blue-800 text-sm">
                  Used based on our legitimate interest in providing a functional website.
                </p>
              </div>
              <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 class="font-semibold text-green-900 mb-2">📊 Other Cookies</h3>
                <p class="text-green-800 text-sm">
                  Used based on your consent, which you can withdraw at any time.
                </p>
              </div>
            </div>
          </section>

          <!-- 8. Changes to Policy -->
          <section>
            <h2 class="apple-title text-xl mb-4">8. Changes to This Policy</h2>
            <p class="mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices, technology, or legal requirements. 
              When we make changes, we will:
            </p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li>Update the "Last Updated" date at the top of this page</li>
              <li>Notify users of significant changes when possible</li>
              <li>Post the updated policy on our website</li>
            </ul>
            <p class="mt-4">
              We encourage you to review this policy periodically to stay informed about our cookie practices.
            </p>
          </section>

          <!-- 9. Contact Information -->
          <section>
            <h2 class="apple-title text-xl mb-4">9. Contact Us</h2>
            <p class="mb-4">
              If you have any questions about this Cookie Policy or our cookie practices, please contact us:
            </p>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p class="text-blue-800">
                <strong>RiceTests Support</strong><br>
                Email: privacy@ricetest.net<br>
                Website: <a href="/" class="text-blue-600 hover:underline">https://ricetest.net</a>
              </p>
            </div>
          </section>

          <!-- Acknowledgment -->
          <section class="border-t border-gray-200 pt-8">
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 class="font-semibold text-gray-800 mb-3">Acknowledgment</h3>
              <p class="text-gray-700">
                By continuing to use RiceTests, you acknowledge that you have read, understood, and agree to our Cookie Policy. 
                This policy works in conjunction with our Privacy Policy and Terms of Service.
              </p>
            </div>
          </section>

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
  title: 'Cookie Policy - RiceTests',
  meta: [
    { name: 'description', content: 'Cookie Policy for RiceTests - Learn about how we use cookies and similar technologies to enhance your experience on our Rice Purity Test platform.' },
    { name: 'keywords', content: 'cookie policy, cookies, privacy, ricetests, data protection, user consent' },
    { property: 'og:title', content: 'Cookie Policy - RiceTests' },
    { property: 'og:description', content: 'Learn about our cookie practices and how we use cookies to improve your experience on RiceTests.' },
    { property: 'og:type', content: 'website' }
  ]
})

// 最后更新日期
const lastUpdated = 'December 2024'
</script>

<style scoped>
/* 页面特有样式 */
section {
  scroll-margin-top: 2rem;
}

ul li {
  margin-bottom: 0.5rem;
}

h2 {
  color: #1f2937;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

/* 高亮盒子样式 */
.bg-blue-50 {
  background-color: #eff6ff;
}

.bg-green-50 {
  background-color: #f0fdf4;
}

.bg-orange-50 {
  background-color: #fff7ed;
}

.bg-purple-50 {
  background-color: #faf5ff;
}

.bg-yellow-50 {
  background-color: #fefce8;
}
</style>