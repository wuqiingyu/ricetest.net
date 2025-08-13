<template>
  <!-- Hero Section -->
  <div class="bg-gradient-to-b from-purple-100 via-pink-50 to-white py-12 md:py-16 relative overflow-hidden diamond-stars-bg">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
        Your Gay Test Results
      </h1>
      <p class="text-base md:text-lg lg:text-xl text-gray-600 mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed">
        Here's what your answers reveal about your feelings and attractions.
      </p>
    </div>
  </div>

  <!-- Results -->
  <main class="max-w-4xl mx-auto px-4 py-8">
    <div v-if="hasAnswers" class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 relative overflow-hidden border-2 border-purple-200 certificate-bg">
      <!-- 认证专家印章背景 -->
      <div class="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <img 
          src="/certifiedexpert.png" 
          alt="Certified Expert Stamp"
          class="w-full max-w-md object-contain"
        />
      </div>
      
      <!-- 专家认证勾 -->
      <div class="absolute top-4 left-4 w-12 h-12 z-20">
        <img 
          src="/expertcertification.png" 
          alt="Expert Certification"
          class="w-full h-full object-contain drop-shadow-lg expert-certification"
        />
      </div>
      
      <!-- 撒花动画背景 -->
      <div class="absolute inset-0 pointer-events-none z-5">
        <div class="confetti-container">
          <div v-for="n in 30" :key="n" class="confetti" :style="getConfettiStyle(n)"></div>
        </div>
      </div>
      
      <!-- 结果内容 -->
      <div class="relative z-10 pt-8">
        <!-- 标题 -->
        <div class="text-center mb-6">
          <h2 class="text-3xl font-bold text-gray-800 mb-3">Your Quiz Results</h2>
          <div class="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded-lg px-4 py-2 inline-block certified-badge">
            <p class="text-purple-800 font-semibold text-sm">✓ Certified Results</p>
          </div>
        </div>
        
        <!-- 结果描述 -->
        <div class="text-center mb-8">
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl border border-purple-200">
            <h3 class="text-2xl font-bold text-purple-900 mb-4">{{ result.title }}</h3>
            <p class="text-lg text-gray-700 leading-relaxed mb-4">{{ result.description }}</p>
            <div class="text-sm text-gray-600 bg-white/50 rounded-lg p-4">
              <p class="font-medium mb-2">Remember:</p>
              <p>{{ result.reminder }}</p>
            </div>
          </div>
        </div>
        
        <!-- 操作按钮 -->
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

    <!-- No answers found -->
    <div v-else class="text-center py-16">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">No Quiz Results Found</h2>
      <p class="text-gray-600 mb-8">It looks like you haven't completed the quiz yet. Start the quiz to see your results!</p>
      <button 
        @click="startQuiz()"
        class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Start Gay Test
      </button>
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

    <!-- You Might Also Like Section -->
    <div class="mt-12 mb-8">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">You Might Also Like</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Article 1: How to Know if You Are Gay -->
        <article class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <a href="/wiki/how-to-know-if-you-are-gay" class="block">
            <div class="relative">
              <img 
                src="/gay-test/gaytest4.png" 
                alt="How to Know if You Are Gay"
                class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              >
              <div class="absolute top-4 left-4">
                <span class="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">How to</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                Know if You Are Gay
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                Wondering if you're gay? Learn the signs, important questions for self-reflection, and practical steps for discovering your sexual orientation.
              </p>
            </div>
          </a>
        </article>

        <!-- Article 2: How to Accept That You Are Gay -->
        <article class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <a href="/wiki/how-to-accept-that-you-are-gay" class="block">
            <div class="relative">
              <img 
                src="/gay-test/gaytest2.png" 
                alt="How to Accept That You Are Gay"
                class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              >
              <div class="absolute top-4 left-4">
                <span class="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">How to</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                Accept That You Are Gay
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                A comprehensive guide to self-acceptance and embracing your authentic identity. Learn practical steps to overcome challenges.
              </p>
            </div>
          </a>
        </article>

        <!-- Article 3: Why Are You Gay -->
        <article class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <a href="/wiki/why-are-you-gay" class="block">
            <div class="relative">
              <img 
                src="/gay-test/gaytest3.png" 
                alt="Why Are You Gay"
                class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              >
              <div class="absolute top-4 left-4">
                <span class="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">How to</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                Why Are You Gay?
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                Understanding Sexual Identity and Self-Discovery. Explore the question with compassion and science, learn about sexual orientation.
              </p>
            </div>
          </a>
        </article>

        <!-- Article 4: How to Have a Gay or Lesbian Relationship -->
        <article class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <a href="/wiki/how-to-have-a-gay-or-lesbian-relationship" class="block">
            <div class="relative">
              <img 
                src="/gay-test/gaytest1.png" 
                alt="How to Have a Gay or Lesbian Relationship"
                class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              >
              <div class="absolute top-4 left-4">
                <span class="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">How to</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                Have a Gay or Lesbian Relationship
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                Complete guide to building healthy, fulfilling LGBTQ+ relationships. Learn dating tips, communication strategies, and partnership advice.
              </p>
            </div>
          </a>
        </article>
      </div>
    </div>
  </main>
</template>

<script setup>
// Meta tags for SEO
useHead({
  title: 'Gay Test Results - Your Quiz Results | Am I Gay Quiz',
  meta: [
    { name: 'description', content: 'View your Gay Test quiz results and discover insights about your sexual orientation and romantic attractions.' },
    { name: 'robots', content: 'noindex, follow' },
    { property: 'og:title', content: 'Gay Test Results - Your Quiz Results | Am I Gay Quiz' },
    { property: 'og:description', content: 'View your Gay Test quiz results and discover insights about your sexual orientation and romantic attractions.' },
    { property: 'og:image', content: 'https://ricetest.net/ricetestsicon.png' },
    { property: 'og:url', content: 'https://ricetest.net/quiz/gay-test/results' }
  ]
})

// Reactive data
const showShareModal = ref(false)
const answers = ref({})
const hasAnswers = ref(false)

// Calculate results
const totalScore = computed(() => {
  if (!hasAnswers.value) return 0
  return Object.values(answers.value).reduce((sum, answer) => sum + (answer.value || 0), 0)
})

const result = computed(() => {
  const score = totalScore.value
  const maxScore = 16 * 3 // 16 questions, max 3 points each
  const percentage = (score / maxScore) * 100
  
  if (percentage >= 75) {
    return {
      title: "Very Likely Gay",
      description: "Based on your answers, you show strong indicators of being gay. You seem to have clear same-gender attractions and feelings that align with a gay identity.",
      reminder: "This is just one perspective on your journey of self-discovery. Trust your own feelings and take your time exploring your identity. You know yourself best!"
    }
  } else if (percentage >= 50) {
    return {
      title: "Possibly Gay or Questioning",
      description: "Your answers suggest you might be gay or are in the process of questioning your sexual orientation. This is a completely normal and healthy part of self-discovery.",
      reminder: "Questioning your sexuality is completely normal. Take your time, talk to trusted people, and remember that your feelings are valid whatever you discover about yourself."
    }
  } else if (percentage >= 25) {
    return {
      title: "Some Questioning or Curiosity",
      description: "Your answers show some curiosity or questioning about same-gender attractions. This could mean you're exploring your sexuality or just have some natural curiosity.",
      reminder: "Having curiosity or occasional questioning is completely normal. Everyone's journey is different, and there's no pressure to label yourself or rush into any conclusions."
    }
  } else {
    return {
      title: "Likely Heterosexual",
      description: "Based on your answers, you seem to identify strongly with heterosexual attractions and experiences. Your feelings appear to align with a straight identity.",
      reminder: "Remember that sexuality can be fluid and personal. Whatever you feel is valid, and it's okay if your feelings change or evolve over time. You know yourself best!"
    }
  }
})

// Methods
const loadAnswers = () => {
  if (process.client) {
    const storedAnswers = localStorage.getItem('gay-test-answers')
    if (storedAnswers) {
      try {
        answers.value = JSON.parse(storedAnswers)
        hasAnswers.value = Object.keys(answers.value).length > 0
      } catch (e) {
        console.error('Error parsing answers:', e)
        hasAnswers.value = false
      }
    }
  }
}

const retakeTest = () => {
  if (process.client) {
    localStorage.removeItem('gay-test-answers')
  }
  navigateTo('/quiz/gay-test')
}

const startQuiz = () => {
  navigateTo('/quiz/gay-test')
}

// Share functions
const getShareText = () => {
  return `I just took the Gay Test quiz and got: "${result.value.title}"! 🌈
  
Take the quiz yourself and explore your own feelings: https://ricetest.net/quiz/gay-test

#GayTest #SelfDiscovery #LGBTQ #Quiz`
}

const shareToTwitter = () => {
  const text = getShareText()
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
  window.open(url, '_blank')
  showShareModal.value = false
}

const shareToFacebook = () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://ricetest.net/quiz/gay-test')}`
  window.open(url, '_blank')
  showShareModal.value = false
}

const shareToInstagram = () => {
  alert('📷 Copy this link to share on Instagram:\n\nhttps://ricetest.net/quiz/gay-test')
  navigator.clipboard.writeText('https://ricetest.net/quiz/gay-test')
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

// Load answers on mount
onMounted(() => {
  loadAnswers()
})
</script>

<style scoped>
/* 页面特有样式 - 撒花动画 */
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

/* 证书背景样式 */
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

/* 权威认证勾动画 */
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

/* 权威标签动画 */
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