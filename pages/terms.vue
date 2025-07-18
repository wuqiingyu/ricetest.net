<template>
  <div class="diamond-stars-bg min-h-screen">
    <div class="apple-container apple-spacing">
      <!-- 页面标题 -->
      <h1 class="apple-title text-center mb-8">Terms of Service</h1>
      
      <!-- 最后更新日期 -->
      <div class="text-center mb-8">
        <p class="apple-subtitle text-sm">Last Updated: {{ lastUpdated }}</p>
      </div>
      
      <!-- 条款内容 -->
      <div class="apple-card apple-spacing max-w-4xl mx-auto">
        <div class="space-y-8 text-gray-700 leading-relaxed">
          
          <!-- 1. Agreement -->
          <section>
            <h2 class="apple-title text-xl mb-4">1. Agreement to Terms</h2>
            <p class="mb-4">
              Welcome to RiceTests! By accessing and using our website, you agree to be bound by these Terms of Service. 
              If you do not agree with any part of these terms, please do not use our service.
            </p>
            <p>
              RiceTests provides online personality tests, quizzes, and assessments for entertainment and self-reflection purposes. 
              Our services are designed to be fun, engaging, and educational.
            </p>
          </section>

          <!-- 2. Eligibility -->
          <section>
            <h2 class="apple-title text-xl mb-4">2. User Eligibility</h2>
            <p class="mb-4">To use RiceTests, you must:</p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li>Be at least 13 years old (or the minimum age required in your jurisdiction)</li>
              <li>Be a human user (automated access or bots are prohibited)</li>
              <li>Provide accurate information when required</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
            <p class="mt-4">
              For users under 18, we recommend parental guidance when taking certain tests that may contain mature content.
            </p>
          </section>

          <!-- 3. Service Description -->
          <section>
            <h2 class="apple-title text-xl mb-4">3. Service Description</h2>
            <p class="mb-4">
              RiceTests offers various online tests and quizzes, including but not limited to:
            </p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li>Rice Purity Test - A 100-question assessment about life experiences</li>
              <li>Personality tests and assessments</li>
              <li>Compatibility quizzes</li>
              <li>Fun challenges and interactive content</li>
            </ul>
            <p class="mt-4">
              All tests are provided for entertainment purposes only and should not be considered as professional psychological assessments.
            </p>
          </section>

          <!-- 4. User Conduct -->
          <section>
            <h2 class="apple-title text-xl mb-4">4. User Conduct and Prohibited Activities</h2>
            <p class="mb-4">While using RiceTests, you agree NOT to:</p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li>Use the service for any illegal or unauthorized purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Upload or transmit viruses, malware, or other harmful code</li>
              <li>Interfere with or disrupt the service or servers</li>
              <li>Use automated scripts, bots, or crawlers</li>
              <li>Copy, modify, or distribute our content without permission</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>

          <!-- 5. Privacy and Data -->
          <section>
            <h2 class="apple-title text-xl mb-4">5. Privacy and Data Collection</h2>
            <p class="mb-4">
              We take your privacy seriously. Our approach to data:
            </p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li>Test answers are processed locally in your browser when possible</li>
              <li>We do not store personal test results without your explicit consent</li>
              <li>Basic analytics may be collected to improve our service</li>
              <li>We do not sell or share personal information with third parties</li>
            </ul>
            <p class="mt-4">
              For detailed information about our data practices, please see our 
              <a href="/privacy-policy" class="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>
          </section>

          <!-- 6. Intellectual Property -->
          <section>
            <h2 class="apple-title text-xl mb-4">6. Intellectual Property Rights</h2>
            <p class="mb-4">
              RiceTests and its content are protected by intellectual property laws. This includes:
            </p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li>Website design, layout, and user interface</li>
              <li>Test questions and algorithms</li>
              <li>Graphics, images, and multimedia content</li>
              <li>Software and source code</li>
            </ul>
            <p class="mt-4">
              You may not reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <!-- 7. Disclaimers -->
          <section>
            <h2 class="apple-title text-xl mb-4">7. Disclaimers and Limitations</h2>
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-4">
              <p class="font-semibold text-yellow-800 mb-2">Important Notice:</p>
              <p class="text-yellow-700">
                RiceTests is provided for entertainment and self-reflection purposes only. 
                Results should not be used for psychological evaluation, diagnosis, or major life decisions.
              </p>
            </div>
            <p class="mb-4">Our service is provided "as is" without warranties of any kind. We disclaim:</p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li>Accuracy or reliability of test results</li>
              <li>Fitness for any particular purpose</li>
              <li>Uninterrupted or error-free operation</li>
              <li>Security of data transmission</li>
            </ul>
          </section>

          <!-- 8. Limitation of Liability -->
          <section>
            <h2 class="apple-title text-xl mb-4">8. Limitation of Liability</h2>
            <p class="mb-4">
              To the fullest extent permitted by law, RiceTests and its operators shall not be liable for:
            </p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li>Indirect, incidental, or consequential damages</li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>Damages resulting from test results or interpretations</li>
              <li>Issues caused by third-party content or services</li>
            </ul>
            <p class="mt-4">
              Our total liability shall not exceed the amount you paid to use our service (if any).
            </p>
          </section>

          <!-- 9. Third-Party Links -->
          <section>
            <h2 class="apple-title text-xl mb-4">9. Third-Party Links and Content</h2>
            <p class="mb-4">
              RiceTests may contain links to external websites or services. We:
            </p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li>Do not control or endorse third-party content</li>
              <li>Are not responsible for external website policies or practices</li>
              <li>Recommend reviewing third-party terms and privacy policies</li>
              <li>Disclaim liability for any issues arising from external links</li>
            </ul>
          </section>

          <!-- 10. Changes to Service -->
          <section>
            <h2 class="apple-title text-xl mb-4">10. Changes to Service and Terms</h2>
            <p class="mb-4">
              We reserve the right to:
            </p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li>Modify or discontinue any part of our service</li>
              <li>Update these Terms of Service at any time</li>
              <li>Change features, pricing, or availability</li>
              <li>Suspend or terminate access for violations</li>
            </ul>
            <p class="mt-4">
              We will notify users of significant changes when possible. Continued use constitutes acceptance of updated terms.
            </p>
          </section>

          <!-- 11. Termination -->
          <section>
            <h2 class="apple-title text-xl mb-4">11. Termination</h2>
            <p class="mb-4">
              Either party may terminate this agreement at any time. We may suspend or terminate your access if you:
            </p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li>Violate these Terms of Service</li>
              <li>Engage in prohibited activities</li>
              <li>Cause harm to our service or other users</li>
            </ul>
            <p class="mt-4">
              Upon termination, your right to use the service immediately ceases.
            </p>
          </section>

          <!-- 12. Governing Law -->
          <section>
            <h2 class="apple-title text-xl mb-4">12. Governing Law and Jurisdiction</h2>
            <p class="mb-4">
              These Terms of Service are governed by applicable laws and regulations. 
              Any disputes will be resolved through appropriate legal channels in accordance with applicable jurisdiction.
            </p>
            <p>
              If any provision of these terms is found unenforceable, the remaining provisions will continue in full effect.
            </p>
          </section>

          <!-- 13. Contact Information -->
          <section>
            <h2 class="apple-title text-xl mb-4">13. Contact Information</h2>
            <p class="mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p class="text-blue-800">
                <strong>RiceTests Support</strong><br>
                Email: support@ricetest.net<br>
                Website: <a href="/" class="text-blue-600 hover:underline">https://ricetest.net</a>
              </p>
            </div>
          </section>

          <!-- Agreement Acknowledgment -->
          <section class="border-t border-gray-200 pt-8">
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 class="font-semibold text-gray-800 mb-3">Acknowledgment</h3>
              <p class="text-gray-700">
                By using RiceTests, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
                You also acknowledge that these terms constitute a legal agreement between you and RiceTests.
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
  title: 'Terms of Service - RiceTests',
  meta: [
    { name: 'description', content: 'Terms of Service for RiceTests - Online personality tests and quizzes platform. Learn about our user agreement, privacy policies, and service conditions.' },
    { name: 'keywords', content: 'terms of service, user agreement, ricetests, legal, privacy, conditions' },
    { property: 'og:title', content: 'Terms of Service - RiceTests' },
    { property: 'og:description', content: 'Read our Terms of Service to understand your rights and responsibilities when using RiceTests platform.' },
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
</style>