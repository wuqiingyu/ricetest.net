<!-- 通用测试问题组件 -->
<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-gradient-to-b from-purple-100 via-pink-50 to-white py-12 md:py-16 relative overflow-hidden diamond-stars-bg">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
          {{ quiz?.title }} - Question {{ currentQuestionNumber }}
        </h1>
        
        <p class="text-base md:text-lg lg:text-xl text-gray-600 mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed">
          Take your time and choose the answer that feels most authentic to you.
        </p>
      </div>
    </div>

    <!-- Test Progress Section -->
    <div id="test-progress" class="max-w-4xl mx-auto px-4 py-2">
      <TestProgress 
        :current-question="currentQuestionNumber - 1"
        :total-questions="totalQuestions"
        :show-percentage="true"
      />
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="max-w-4xl mx-auto px-4 py-8 text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
      <p class="text-gray-600 mt-4">Loading question...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-4xl mx-auto px-4 py-8 text-center">
      <div class="text-red-600 text-xl mb-4">⚠️ Question Not Found</div>
      <p class="text-gray-600 mb-6">{{ error }}</p>
      <NuxtLink 
        :to="`/quiz/${$route.params.slug}`"
        class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
      >
        Back to Quiz Home
      </NuxtLink>
    </div>

    <!-- Main Content -->
    <main v-else-if="currentQuestion" id="main-content" class="max-w-4xl mx-auto px-4 py-8">
      <div class="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/30 apple-glass">
        <!-- Question Display -->
        <div class="relative overflow-hidden px-4 md:px-6 py-6 md:py-8 bg-gradient-to-b from-white/40 via-white/60 to-white/40">
          <!-- Navigation Buttons -->
          <div class="absolute top-4 left-4">
            <NuxtLink 
              v-if="currentQuestionNumber > 1"
              :to="`/quiz/${$route.params.slug}/${currentQuestionNumber - 1}`"
              class="flex items-center px-3 py-2 text-gray-600 hover:text-purple-600 transition-colors bg-white/60 hover:bg-white/80 rounded-lg shadow-sm"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              <span class="text-sm font-medium">Previous</span>
            </NuxtLink>
          </div>

          <!-- Sound Toggle Button -->
          <div class="absolute top-4 right-4">
            <button 
              @click="toggleMute"
              class="flex items-center justify-center px-4 py-3 text-gray-600 hover:text-purple-600 transition-colors bg-blue-50 hover:bg-blue-100 rounded-xl shadow-sm min-w-[48px] min-h-[48px] border border-blue-200"
              :title="isMuted ? 'Unmute' : 'Mute'"
            >
              <svg v-if="!isMuted" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 12l-4-4H3v8h2l4-4z"/>
              </svg>
              <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1V10a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
              </svg>
            </button>
          </div>
          
          <!-- Question Content -->
          <div class="text-center mb-8">
            <div class="text-sm text-gray-500 mb-2">Question {{ currentQuestionNumber }} of {{ totalQuestions }}</div>
            
            <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
              {{ currentQuestion.text }}
            </h2>
            
            <!-- Question Image (optional) -->
            <div v-if="currentQuestion.image_url" class="mb-6">
              <img 
                :src="currentQuestion.image_url" 
                :alt="currentQuestion.text"
                class="question-image mx-auto rounded-xl shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
          
          <!-- Answer Options -->
          <div :class="hasImageOptions ? 'options-image-grid' : 'space-y-3 max-w-2xl mx-auto'">
            <button 
              v-for="(option, index) in currentQuestion.options"
              :key="option.id"
              @click="selectAnswer(index, $event)"
              :disabled="selectedAnswerIndex !== null"
              :class="[
                hasImageOptions ? 'option-image-card' : 'w-full p-4 text-left border rounded-xl transition-all duration-300 transform',
                selectedAnswerIndex === index 
                  ? (hasImageOptions 
                      ? 'border-purple-400 bg-gradient-to-br from-purple-100 to-pink-100 scale-105' 
                      : 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-400 shadow-lg scale-[1.02]')
                  : selectedAnswerIndex !== null 
                    ? (hasImageOptions ? 'opacity-60' : 'bg-gray-100 border-gray-300 opacity-60')
                    : (hasImageOptions 
                        ? 'hover:scale-105 hover:shadow-lg' 
                        : 'bg-white/50 hover:bg-white/70 border-gray-200 hover:shadow-lg hover:scale-[1.02] active:scale-95')
              ]"
            >
              <!-- 图片选项布局 -->
              <div v-if="hasImageOptions" class="option-image-content">
                <img 
                  v-if="option.image_url" 
                  :src="option.image_url" 
                  :alt="option.text || `Option ${String.fromCharCode(65 + index)}`"
                  class="option-image"
                />
                <div v-if="option.text" class="option-text-overlay">
                  {{ option.text }}
                </div>
                <!-- 选项标识 -->
                <div :class="[
                  'option-label',
                  selectedAnswerIndex === index 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                ]">
                  {{ String.fromCharCode(65 + index) }}
                </div>
                <!-- 选中标识 -->
                <div v-if="selectedAnswerIndex === index" class="selected-indicator">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              
              <!-- 文字选项布局 -->
              <div v-else class="flex items-start space-x-3">
                <div :class="[
                  'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold',
                  selectedAnswerIndex === index 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                ]">
                  {{ String.fromCharCode(65 + index) }}
                </div>
                <span :class="[
                  'leading-relaxed',
                  selectedAnswerIndex === index ? 'text-purple-800 font-medium' : 'text-gray-700'
                ]">{{ option.text }}</span>
                <!-- Checkmark for selected answer -->
                <div v-if="selectedAnswerIndex === index" class="ml-auto">
                  <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
            </button>
          </div>

          <!-- Next Button -->
          <div v-if="showNextButton" class="mt-8 text-center">
            <NuxtLink 
              :to="getNextPageUrl()"
              class="next-button inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg"
            >
              {{ isLastQuestion ? 'See Results' : 'Next Question' }}
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </NuxtLink>
          </div>

          <!-- Progress Display -->
          <div class="flex justify-end mt-8">
            <div class="text-sm text-gray-500">
              {{ currentQuestionNumber }} / {{ totalQuestions }}
            </div>
          </div>
        </div>
      </div>

      <!-- Quiz Introduction -->
      <div class="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 md:p-8 shadow-lg border border-purple-100">
        <div class="text-center max-w-3xl mx-auto">
          <h3 class="text-xl md:text-2xl font-bold text-purple-800 mb-4">
            {{ quiz?.title }}
          </h3>
          <p class="text-base md:text-lg text-gray-700 leading-relaxed">
            {{ quizDescription }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// 简化的SEO生成函数
const generateSEO = (quiz, currentQuestion = null) => {
  if (!quiz) return {}
  
  const baseTitle = quiz.title
  const baseUrl = `https://ricetest.net/quiz/${quiz.slug}`
  
  if (currentQuestion) {
    return {
      title: `${baseTitle} - Question ${currentQuestion}`,
      description: `Answer question ${currentQuestion} of ${quiz.questions?.length || 0} in our ${baseTitle} quiz.`,
      url: `${baseUrl}/${currentQuestion}`,
      robots: 'noindex, follow'
    }
  }
  
  return {
    title: `${baseTitle} | Free Online Quiz`,
    description: `Take our ${baseTitle} quiz to explore your feelings and discover more about yourself. Completely anonymous and judgment-free!`,
    url: baseUrl,
    robots: 'index, follow'
  }
}

// Props
const props = defineProps({
  quiz: {
    type: Object,
    default: null
  },
  currentQuestion: {
    type: Object,
    default: null
  },
  currentQuestionNumber: {
    type: Number,
    default: 1
  },
  totalQuestions: {
    type: Number,
    default: 0
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  },
  quizDescription: {
    type: String,
    default: 'Take your time with each question and answer honestly. This quiz is designed to help you discover more about yourself.'
  },
  soundUrl: {
    type: String,
    default: '/gay-test/watch-out.mp3'
  }
})

// Reactive state
const selectedAnswerIndex = ref(null)
const showNextButton = ref(false)
const effectType = ref('fireworks') // Track which effect to show
const isMuted = ref(false)

// 从localStorage加载静音状态
onMounted(() => {
  if (process.client) {
    const savedMuteState = localStorage.getItem('quiz-muted')
    if (savedMuteState !== null) {
      isMuted.value = savedMuteState === 'true'
    }
  }
})

// Computed
const hasImageOptions = computed(() => {
  return props.currentQuestion?.options?.some(option => option.image_url) || false
})

const isLastQuestion = computed(() => {
  return props.currentQuestionNumber >= props.totalQuestions
})

// SEO
const seoInfo = computed(() => {
  if (!props.quiz) return {}
  return generateSEO(props.quiz, props.currentQuestionNumber)
})

useHead(() => ({
  title: seoInfo.value.title,
  meta: [
    { name: 'description', content: seoInfo.value.description },
    { name: 'robots', content: seoInfo.value.robots },
    { property: 'og:title', content: seoInfo.value.title },
    { property: 'og:description', content: seoInfo.value.description },
    { property: 'og:url', content: seoInfo.value.url }
  ]
}))

// Methods
const toggleMute = () => {
  isMuted.value = !isMuted.value
  
  // 保存静音状态到localStorage
  if (process.client) {
    localStorage.setItem('quiz-muted', isMuted.value.toString())
  }
}

const selectAnswer = async (optionIndex, event) => {
  if (selectedAnswerIndex.value !== null) return
  
  selectedAnswerIndex.value = optionIndex
  const selectedOption = props.currentQuestion.options[optionIndex]
  
  // Store answer
  if (process.client) {
    const storageKey = `${props.quiz.slug}-answers`
    const answers = JSON.parse(localStorage.getItem(storageKey) || '{}')
    answers[props.currentQuestionNumber] = {
      questionIndex: props.currentQuestionNumber - 1,
      optionIndex,
      score: selectedOption.score,
      text: selectedOption.text,
      questionId: props.currentQuestion.id,
      optionId: selectedOption.id
    }
    localStorage.setItem(storageKey, JSON.stringify(answers))
  }
  
  // Choose random effect type
  const effects = ['fireworks', 'confetti', 'stars']
  effectType.value = effects[Math.floor(Math.random() * effects.length)]
  
  // Play sound effect
  if (process.client && !isMuted.value) {
    try {
      const audio = new Audio(props.soundUrl)
      audio.volume = 0.3
      await audio.play()
    } catch (error) {
      console.warn('Could not play sound:', error)
    }
  }
  
  // Trigger effects
  if (process.client) {
    await triggerEffect(event)
  }
  
  // Show next button
  setTimeout(() => {
    showNextButton.value = true
    
    // Auto scroll to next button
    setTimeout(() => {
      const nextButton = document.querySelector('.next-button')
      if (nextButton) {
        nextButton.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center'
        })
      }
    }, 300)
  }, 1500)
}

const getNextPageUrl = () => {
  const route = useRoute()
  if (isLastQuestion.value) {
    return `/quiz/${route.params.slug}/results`
  } else {
    return `/quiz/${route.params.slug}/${props.currentQuestionNumber + 1}`
  }
}

const triggerEffect = async (event) => {
  try {
    const { default: confetti } = await import('canvas-confetti')
    
    console.log('Triggering effect:', effectType.value) // 调试日志
    
    if (effectType.value === 'fireworks') {
      // Multi-burst fireworks effect
      const duration = 1500
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

      const randomInRange = (min, max) => Math.random() * (max - min) + min

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)
        
        // Left side firework
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        })
        
        // Right side firework  
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        })
      }, 250)
      
    } else if (effectType.value === 'confetti') {
      // Classic confetti burst from button position
      let x = 0.5 // 默认居中位置
      let y = 0.5 // 默认居中位置
      
      // 安全地获取按钮位置
      if (event && event.currentTarget && typeof window !== 'undefined') {
        try {
          const rect = event.currentTarget.getBoundingClientRect()
          x = (rect.left + rect.width / 2) / window.innerWidth
          y = (rect.top + rect.height / 2) / window.innerHeight
        } catch (error) {
          console.warn('无法获取按钮位置，使用默认位置:', error)
        }
      }
      
      console.log('Confetti position:', { x, y }) // 调试日志
      
      // First burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#6c5ce7'],
        zIndex: 9999
      })
      
      // Secondary burst
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 100,
          origin: { x, y },
          colors: ['#fd79a8', '#00b894', '#fdcb6e', '#e17055'],
          zIndex: 9999
        })
      }, 300)
      
    } else if (effectType.value === 'stars') {
      // Star-shaped confetti
      let x = 0.5 // 默认居中位置
      let y = 0.5 // 默认居中位置
      
      // 安全地获取按钮位置
      if (event && event.currentTarget && typeof window !== 'undefined') {
        try {
          const rect = event.currentTarget.getBoundingClientRect()
          x = (rect.left + rect.width / 2) / window.innerWidth
          y = (rect.top + rect.height / 2) / window.innerHeight
        } catch (error) {
          console.warn('无法获取按钮位置，使用默认位置:', error)
        }
      }
      
      console.log('Stars position:', { x, y }) // 调试日志
      
      // First burst - 使用圆形代替星形
      confetti({
        particleCount: 50,
        spread: 360,
        startVelocity: 40,
        origin: { x, y },
        colors: ['#FFD700', '#FFA500', '#FF6347', '#FF69B4', '#9370DB'],
        zIndex: 9999,
        scalar: 1.2 // 让粒子稍大一些模拟星星效果
      })
      
      // Follow-up sparkles
      setTimeout(() => {
        confetti({
          particleCount: 30,
          spread: 120,
          startVelocity: 25,
          origin: { x, y },
          colors: ['#FFFFFF', '#F0F8FF', '#E6E6FA'],
          zIndex: 9999,
          scalar: 0.8
        })
      }, 200)
    }
  } catch (error) {
    console.warn('Could not load confetti effect:', error)
  }
}

// Reset state when question changes
watch(() => props.currentQuestionNumber, () => {
  selectedAnswerIndex.value = null
  showNextButton.value = false
})
</script>

<style scoped>
/* 问题图片样式 */
.question-image {
  max-width: 100%;
  max-height: 300px;
  width: auto;
  height: auto;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .question-image {
    max-height: 200px;
  }
}

/* 图片选项网格布局 */
.options-image-grid {
  display: grid;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
  grid-template-columns: repeat(2, 1fr);
}

/* 图片选项卡片 */
.option-image-card {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.option-image-card:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

/* 图片选项内容容器 */
.option-image-content {
  position: relative;
  width: 100%;
  height: 200px;
}

/* 选项图片 */
.option-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 文字覆盖层 */
.option-text-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3));
  color: white;
  padding: 12px;
  font-weight: 500;
  font-size: 0.9rem;
  text-align: center;
}

/* 选项标识 */
.option-label {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.85rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

/* 选中指示器 */
.selected-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  background: linear-gradient(45deg, #10b981, #059669);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(16, 185, 129, 0.4);
}

/* 响应式适配 */
@media (max-width: 768px) {
  .options-image-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  
  .option-image-content {
    height: 150px;
  }
  
  .option-text-overlay {
    padding: 8px;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .options-image-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .option-image-content {
    height: 180px;
  }
}

/* 超过4个选项时的自适应网格 */
.options-image-grid:has(> :nth-child(5)) {
  grid-template-columns: repeat(3, 1fr);
}

.options-image-grid:has(> :nth-child(7)) {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

/* Selected Answer Animation */
@keyframes selected-pulse {
  0%, 100% {
    transform: scale(1.02);
  }
  50% {
    transform: scale(1.05);
  }
}

.selected-answer {
  animation: selected-pulse 0.6s ease-in-out;
}

/* Next Button Animation */
@keyframes slide-up {
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.next-button {
  animation: slide-up 0.5s ease-out;
}
</style>