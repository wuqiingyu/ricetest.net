<!-- 通用测试首页组件 -->
<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-gradient-to-b from-purple-100 via-pink-50 to-white py-12 md:py-16 relative overflow-hidden diamond-stars-bg">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
          {{ quiz?.title }}
        </h1>
        
        <p class="text-base md:text-lg lg:text-xl text-gray-600 mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed">
          {{ description || 'Discover more about yourself with our interactive quiz. Answer honestly and explore your inner thoughts and feelings.' }}
        </p>
        
        <!-- Start Quiz Arrow -->
        <div class="flex flex-col items-center space-y-2 md:space-y-4 cursor-pointer hover:opacity-80 transition-opacity mt-4 md:mt-6" @click="scrollToTest()">
          <span class="text-xs md:text-sm text-gray-600 font-semibold tracking-widest uppercase">Start Quiz</span>
          <div class="animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:h-8 md:w-8 h-6 w-6 text-gray-600">
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main id="main-content" class="max-w-4xl mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p class="text-gray-600 mt-4">Loading quiz...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 text-xl mb-4">⚠️ Quiz Not Found</div>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <button 
          @click="$router.push('/quiz')"
          class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
        >
          Browse Other Quizzes
        </button>
      </div>

      <!-- Quiz Content -->
      <div v-else-if="quiz" class="bg-transparent">
        <!-- Hero Image and Start Button -->
        <div class="relative px-4 md:px-6 py-8 md:py-12 text-center">
          <!-- Hero Image -->
          <div v-if="heroImage" class="mb-8 w-full">
            <img 
              :src="heroImage"
              :alt="`${quiz.title} - Interactive Quiz`"
              class="mx-auto rounded-2xl w-full max-w-4xl h-auto object-contain block"
              loading="eager"
            />
          </div>
          
          <!-- Start Quiz Button -->
          <div class="flex justify-center" id="quiz-start-button">
            <a 
              :href="`/quiz/${quiz.slug}/1`"
              class="start-quiz-btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl text-xl w-[80vw] inline-block text-center"
            >
              Start Quiz Now
            </a>
          </div>
          
          <p class="text-gray-600 mt-6 text-sm">
            Take your time and answer honestly - this is your journey of self-discovery! 🌈
          </p>
        </div>

        <!-- Questions Overview -->
        <div class="mt-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-purple-100">
          <h2 class="text-3xl font-bold text-gray-800 mb-6">Questions Overview</h2>
          <div class="text-gray-600 mb-8">
            <p class="mb-6">
              This quiz contains {{ quiz.questions?.length || 0 }} carefully crafted questions that explore different aspects of your personality and preferences.
              Each question offers multiple choice answers to help you reflect on your experiences and feelings.
            </p>
            
            <div v-if="showQuestions" class="space-y-6 mb-8">
              <div v-for="(question, index) in quiz.questions" :key="question.id" class="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-400">
                <div class="mb-4">
                  <h3 class="font-semibold text-purple-900 text-base flex items-start">
                    <span class="text-purple-600 mr-2 flex-shrink-0">Q{{ index + 1 }}.</span>
                    {{ question.text }}
                  </h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div v-for="(option, optionIndex) in question.options" :key="option.id" class="flex items-start space-x-2">
                    <span class="flex-shrink-0 w-5 h-5 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                      {{ String.fromCharCode(65 + optionIndex) }}
                    </span>
                    <span class="text-gray-700 text-sm leading-relaxed">{{ option.text }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Show/Hide Questions Toggle -->
            <div class="text-center mb-6">
              <button 
                @click="showQuestions = !showQuestions"
                class="text-purple-600 hover:text-purple-800 font-medium underline"
              >
                {{ showQuestions ? 'Hide Questions' : 'Show All Questions' }}
              </button>
            </div>
            
            <div class="text-center">
              <button 
                @click="scrollToStartButton"
                class="start-quiz-btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl text-xl w-full max-w-md mx-auto"
              >
                Start Quiz Now
              </button>
            </div>
          </div>
        </div>

        <!-- Additional Content Slot -->
        <slot name="additional-content" :quiz="quiz" />
      </div>
    </main>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  quiz: {
    type: Object,
    default: null
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  heroImage: {
    type: String,
    default: null
  }
})

// Reactive data
const showQuestions = ref(false)

// 简化的SEO生成函数
const generateSEO = (quiz) => {
  if (!quiz) return {}
  
  const baseTitle = quiz.title
  const baseUrl = `https://ricetest.net/quiz/${quiz.slug}`
  
  return {
    title: `${baseTitle} | Free Online Quiz`,
    description: `Take our ${baseTitle} quiz to explore your feelings and discover more about yourself. Completely anonymous and judgment-free!`,
    url: baseUrl,
    robots: 'index, follow'
  }
}

// SEO
const seoInfo = computed(() => {
  return generateSEO(props.quiz)
})

useHead(() => ({
  title: seoInfo.value.title,
  meta: [
    { name: 'description', content: seoInfo.value.description },
    { name: 'keywords', content: `${props.quiz?.title}, quiz, personality test, self discovery` },
    { name: 'robots', content: seoInfo.value.robots },
    { property: 'og:title', content: seoInfo.value.title },
    { property: 'og:description', content: seoInfo.value.description },
    { property: 'og:image', content: props.heroImage || 'https://ricetest.net/ricetestsicon.png' },
    { property: 'og:url', content: seoInfo.value.url },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: seoInfo.value.title },
    { name: 'twitter:description', content: seoInfo.value.description },
    { name: 'twitter:image', content: props.heroImage || 'https://ricetest.net/ricetestsicon.png' }
  ],
  link: [
    { rel: 'canonical', href: seoInfo.value.url }
  ]
}))

// Methods
const scrollToTest = () => {
  if (process.client) {
    const mainContent = document.querySelector('#main-content')
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

const scrollToStartButton = () => {
  if (process.client) {
    const startButton = document.querySelector('#quiz-start-button')
    if (startButton) {
      startButton.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
}
</script>

<style scoped>
/* 跳动按钮动画 */
.start-quiz-btn {
  animation: quiz-bounce 2s ease-in-out infinite;
}

@keyframes quiz-bounce {
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.05);
  }
  50% {
    transform: scale(0.98);
  }
  75% {
    transform: scale(1.02);
  }
}
</style>