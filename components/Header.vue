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
            <a href="/quiz" class="text-indigo-700 font-semibold hover:text-indigo-800 transition-colors">Quizzes</a>
            
            <!-- About Dropdown -->
            <div class="relative" ref="dropdownRef">
              <button 
                @click="toggleDropdown"
                class="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-1"
              >
                <span>About</span>
                <svg class="w-4 h-4 transform transition-transform duration-200" :class="{ 'rotate-180': isDropdownOpen }">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <div 
                v-show="isDropdownOpen"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
              >
                <a 
                  href="/about" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                >
                  About Us
                </a>
                <a 
                  href="https://www.facebook.com/share/19SbvG3d3N/?mibextid=wwXIfr" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors flex items-center space-x-2"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
            
            <a href="/wiki" class="text-gray-600 hover:text-blue-600 transition-colors">Wiki</a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 下拉菜单状态
const isDropdownOpen = ref(false)
const dropdownRef = ref(null)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

// 点击外部关闭菜单
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown()
  }
}

// 滚动时关闭菜单
const handleScroll = () => {
  closeDropdown()
}

// 监听事件
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll)
})
</script>