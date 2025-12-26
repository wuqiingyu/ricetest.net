<!-- 通用测试结果组件 -->
<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-gradient-to-b from-purple-100 via-pink-50 to-white py-12 md:py-16 relative overflow-hidden diamond-stars-bg">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
          Your {{ quiz?.title }} Results
        </h1>
        <p class="text-base md:text-lg lg:text-xl text-gray-600 mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed">
          Here's what your answers reveal about you.
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="max-w-4xl mx-auto px-4 py-8 text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
      <p class="text-gray-600 mt-4">Calculating your results...</p>
    </div>

    <!-- No Results Found -->
    <div v-else-if="!hasAnswers" class="max-w-4xl mx-auto px-4 py-8 text-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">No Quiz Results Found</h2>
      <p class="text-gray-600 mb-8">It looks like you haven't completed the quiz yet. Start the quiz to see your results!</p>
      <NuxtLink 
        :to="`/quiz/${quiz?.slug || ''}`"
        class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Start {{ quiz?.title || 'Quiz' }}
      </NuxtLink>
    </div>

    <!-- Results Display -->
    <main v-else class="max-w-4xl mx-auto px-4 py-8">
      <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 relative overflow-hidden border-2 border-purple-200 certificate-bg">
        <!-- Certified Expert Stamp Background -->
        <div class="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <img 
            src="/certifiedexpert.png" 
            alt="Certified Expert Stamp"
            class="w-full max-w-md object-contain"
          />
        </div>
        
        <!-- Expert Certification Badge -->
        <div class="absolute top-4 left-4 w-12 h-12 z-20">
          <img 
            src="/expertcertification.png" 
            alt="Expert Certification"
            class="w-full h-full object-contain drop-shadow-lg expert-certification"
          />
        </div>
        
        <!-- Confetti Animation Background -->
        <div class="absolute inset-0 pointer-events-none z-5">
          <div class="confetti-container">
            <div v-for="n in 30" :key="n" class="confetti" :style="getConfettiStyle(n)"></div>
          </div>
        </div>
        
        <!-- Results Content -->
        <div class="relative z-10 pt-8">
          <!-- Title -->
          <div class="text-center mb-6">
            <h2 class="text-3xl font-bold text-gray-800 mb-3">Your Quiz Results</h2>
            <div class="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded-lg px-4 py-2 inline-block certified-badge">
              <p class="text-purple-800 font-semibold text-sm">✓ Certified Results</p>
            </div>
          </div>
          
          <!-- Result Description -->
          <div class="text-center mb-8">
            <!-- Result Image (if available) -->
            <div v-if="result?.image_url" class="mb-6">
              <img 
                :src="result.image_url" 
                :alt="result.name"
                class="w-full mx-auto h-auto object-contain rounded-xl shadow-lg"
                loading="lazy"
              />
            </div>
            
            <h3 class="text-2xl font-bold text-purple-900 mb-4">{{ result?.name || result?.title }}</h3>
            <p class="text-lg text-gray-700 leading-relaxed">{{ result?.description }}</p>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex gap-4 justify-center flex-wrap">
            <button 
              @click="retakeTest()"
              class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Take Quiz Again
            </button>
            
            <button 
              @click="showShareModal = true"
              class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Share Results
            </button>
          </div>
        </div>
      </div>

      <!-- Share Modal -->
      <div v-if="showShareModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showShareModal = false">
        <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl" @click.stop>
          <div class="text-center mb-6">
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Share Your Results</h3>
            <p class="text-gray-600">Share your quiz results with friends</p>
          </div>
          
          <!-- Share Options -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <button 
              @click="shareToTwitter()"
              class="flex flex-col items-center p-4 bg-black hover:bg-gray-800 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <div class="text-2xl mb-2">𝕏</div>
              <span class="text-sm font-medium">Twitter / X</span>
            </button>
            
            <button 
              @click="shareToFacebook()"
              class="flex flex-col items-center p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <div class="text-2xl mb-2">📘</div>
              <span class="text-sm font-medium">Facebook</span>
            </button>
            
            <button 
              @click="shareToInstagram()"
              class="flex flex-col items-center p-4 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <div class="text-2xl mb-2">📷</div>
              <span class="text-sm font-medium">Instagram</span>
            </button>
            
            <button 
              @click="copyShareLink()"
              class="flex flex-col items-center p-4 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <div class="text-2xl mb-2">🔗</div>
              <span class="text-sm font-medium">Copy Link</span>
            </button>
          </div>
          
          <button 
            @click="showShareModal = false"
            class="w-full p-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl transition-all duration-300 font-medium"
          >
            Close
          </button>
        </div>
      </div>

      <!-- Related Content Slot -->
      <slot name="related-content" :quiz="quiz" :result="result" />
    </main>
  </div>
</template>

<script setup>
// 简化的SEO生成函数
const generateSEO = (quiz, isResults = true) => {
  if (!quiz) return {}
  
  const baseTitle = quiz.title
  const baseUrl = `https://ricetest.net/quiz/${quiz.slug}`
  
  if (isResults) {
    return {
      title: `${baseTitle} Results - Your Quiz Results`,
      description: `View your ${baseTitle} quiz results and discover insights about yourself.`,
      url: `${baseUrl}/results`,
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
  result: {
    type: Object,
    default: null
  },
  hasAnswers: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

// Reactive data
const showShareModal = ref(false)

// SEO
const seoInfo = computed(() => {
  if (!props.quiz) return {}
  return generateSEO(props.quiz, true)
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
const retakeTest = () => {
  if (process.client && props.quiz) {
    localStorage.removeItem(`${props.quiz.slug}-answers`)
  }
  navigateTo(`/quiz/${props.quiz?.slug}`)
}

// Share functions
const getShareText = () => {
  const resultName = props.result?.name || props.result?.title || 'My Result'
  const quizTitle = props.quiz?.title || 'Quiz'
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ricetest.net'
  
  return `I just took the ${quizTitle} and got: "${resultName}"! 🌈
  
Take the quiz yourself: ${baseUrl}/quiz/${props.quiz?.slug}

#Quiz #SelfDiscovery #PersonalityTest`
}

const shareToTwitter = () => {
  const text = getShareText()
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
  window.open(url, '_blank')
  showShareModal.value = false
}

const shareToFacebook = () => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ricetest.net'
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${baseUrl}/quiz/${props.quiz?.slug}`)}`
  window.open(url, '_blank')
  showShareModal.value = false
}

const shareToInstagram = () => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ricetest.net'
  const shareUrl = `${baseUrl}/quiz/${props.quiz?.slug}`
  alert(`📷 Copy this link to share on Instagram:\n\n${shareUrl}`)
  navigator.clipboard.writeText(shareUrl)
  showShareModal.value = false
}

const copyShareLink = async () => {
  try {
    const shareText = getShareText()
    await navigator.clipboard.writeText(shareText)
    alert('🔗 Share text copied to clipboard!')
  } catch (error) {
    const shareText = getShareText()
    const textArea = document.createElement('textarea')
    textArea.value = shareText
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert('🔗 Share text copied to clipboard!')
  }
  showShareModal.value = false
}

// Confetti animation
const getConfettiStyle = (n) => {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#fd79a8']
  const color = colors[n % colors.length]
  const delay = Math.random() * 3
  const duration = 3 + Math.random() * 2
  const left = Math.random() * 100
  
  return {
    backgroundColor: color,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    left: `${left}%`
  }
}

// BuzzFeed风格的撒花特效
const triggerCelebrationEffect = async () => {
  if (!process.client) return
  
  try {
    const { default: confetti } = await import('canvas-confetti')
    
    // 第一波：从顶部中央爆发
    await confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.1 },
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#6c5ce7', '#fd79a8'],
      zIndex: 9999
    })
    
    // 延迟500ms后第二波：左右两侧同时
    setTimeout(async () => {
      await Promise.all([
        confetti({
          particleCount: 50,
          spread: 55,
          origin: { x: 0.2, y: 0.3 },
          colors: ['#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'],
          zIndex: 9999
        }),
        confetti({
          particleCount: 50,
          spread: 55, 
          origin: { x: 0.8, y: 0.3 },
          colors: ['#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'],
          zIndex: 9999
        })
      ])
    }, 500)
    
    // 延迟1000ms后第三波：全屏撒花
    setTimeout(async () => {
      const duration = 2000
      const animationEnd = Date.now() + duration
      
      const randomInRange = (min, max) => Math.random() * (max - min) + min
      
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()
        
        if (timeLeft <= 0) {
          return clearInterval(interval)
        }
        
        const particleCount = 30 * (timeLeft / duration)
        
        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: {
            x: randomInRange(0.1, 0.9),
            y: Math.random() - 0.2
          },
          colors: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#9370DB', '#32CD32'],
          zIndex: 9999
        })
      }, 250)
    }, 1000)
    
  } catch (error) {
    console.warn('Could not load celebration effect:', error)
  }
}

// 在有结果时自动触发撒花效果
watch([() => props.hasAnswers, () => props.result], ([hasAnswers, result]) => {
  if (hasAnswers && result && process.client) {
    // 延迟一点时间让页面渲染完成
    setTimeout(() => {
      triggerCelebrationEffect()
    }, 800)
  }
}, { immediate: true })
</script>

<style scoped>
/* Confetti Animation */
.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  animation: confetti-fall infinite linear;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

/* Certificate Background */
.certificate-bg {
  background: 
    linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      rgba(147, 51, 234, 0.03) 2px,
      rgba(147, 51, 234, 0.03) 4px
    );
}

/* Expert Certification Animation */
.expert-certification {
  animation: certification-glow 3s ease-in-out infinite;
}

@keyframes certification-glow {
  0%, 100% {
    filter: drop-shadow(0 0 8px rgba(147, 51, 234, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 16px rgba(147, 51, 234, 0.6));
  }
}

/* Certified Badge Animation */
.certified-badge {
  animation: badge-pulse 2s ease-in-out infinite;
}

@keyframes badge-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(147, 51, 234, 0.5);
  }
}
</style>