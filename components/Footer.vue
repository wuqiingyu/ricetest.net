<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- About Section -->
        <div>
          <h3 class="text-xl font-bold mb-4">About RiceTest</h3>
          <p class="text-gray-300 text-sm leading-relaxed mb-4">
            RiceTest is your go-to place for personality tests and fun quizzes! 
            We have the famous Rice Purity Test plus lots of other tests and assessments. All our tests are made for fun and helping you discover yourself!
          </p>
          <div class="space-y-2 text-gray-400 text-xs">
            <p>• <strong>Personality Tests:</strong> Discover your hidden traits and characteristics</p>
            <p>• <strong>Compatibility Quizzes:</strong> Find out how you match with friends and partners</p>
            <p>• <strong>Life Assessment:</strong> Rice tests that help you think about your experiences</p>
            <p>• <strong>Fun Challenges:</strong> Quick rice tests perfect for sharing with friends</p>
          </div>
        </div>

        <!-- Quick Links Section -->
        <div>
          <h3 class="text-xl font-bold mb-4">Quick Links</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#test" class="text-gray-300 hover:text-white transition-colors">Take the Test</a></li>
            <li><a href="#about" class="text-gray-300 hover:text-white transition-colors">What is Rice Purity Test?</a></li>
            <li><a href="#questions" class="text-gray-300 hover:text-white transition-colors">All 100 Questions</a></li>
            <li><a href="#results" class="text-gray-300 hover:text-white transition-colors">Score Meanings</a></li>
          </ul>
        </div>

        <!-- Legal Section -->
        <div>
          <h3 class="text-xl font-bold mb-4">Legal</h3>
          <ul class="space-y-3">
            <li>
              <a href="/privacy-policy" class="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                <span class="mr-2">📋</span>Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" class="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                <span class="mr-2">📄</span>Terms of Service
              </a>
            </li>
            <li>
              <a href="/cookies" class="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                <span class="mr-2">🍪</span>Cookie Policy
              </a>
            </li>
            <li>
              <a href="/contact" class="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                <span class="mr-2">✉️</span>Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="border-t border-gray-800 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-gray-400 text-sm mb-4 md:mb-0">
            <p>&copy; {{ new Date().getFullYear() }} RiceTests. All rights reserved.</p>
          </div>
          <div class="flex space-x-6">
            <span class="text-gray-500 text-xs">Made with ❤️ for self-discovery</span>
          </div>
        </div>
        <div class="mt-4 text-center text-gray-500 text-xs">
          <p>This test is for entertainment purposes only and should not be used for psychological evaluation or judgment.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer组件不需要props
</script>