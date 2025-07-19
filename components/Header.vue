<template>
  <header class="bg-white shadow-sm">
    <!-- Navigation -->
    <nav class="bg-gray-50 border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4 py-3">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <a href="/" class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <img src="/ricetestsicon.png" alt="RiceTest Logo" class="w-8 h-8 rounded-lg">
              <span class="text-lg font-bold text-blue-600">RiceTest</span>
            </a>
            <span class="text-sm text-gray-500">|</span>
            <span class="text-sm text-gray-600">Personality Tests & Fun Quizzes</span>
          </div>
          <div class="flex space-x-4 text-sm">
            <!-- <a href="#tests" class="text-gray-600 hover:text-blue-600 transition-colors">All Tests</a> -->
            <a href="/about" class="text-gray-600 hover:text-blue-600 transition-colors">About Us</a>
            <a href="/wiki" class="text-gray-600 hover:text-blue-600 transition-colors">Wiki</a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
// Header组件现在只包含导航栏
</script>