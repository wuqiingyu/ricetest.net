<template>
  <!-- Hero Section -->
  <div class="bg-gradient-to-b from-purple-100 via-pink-50 to-white py-12 md:py-16 relative overflow-hidden diamond-stars-bg">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <!-- Main Title -->
      <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
        Gay Test - Question {{ currentQuestionNumber }}
      </h1>
      
      <!-- Subtitle/Description -->
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

  <!-- Main Content -->
  <main id="main-content" class="max-w-4xl mx-auto px-4 py-8">
    <div class="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/30 apple-glass">
      <!-- Current Question Display -->
      <div class="relative overflow-hidden px-4 md:px-6 py-6 md:py-8 bg-gradient-to-b from-white/40 via-white/60 to-white/40">
        <!-- Previous Button - Top Left -->
        <div class="absolute top-4 left-4">
          <a 
            v-if="currentQuestionNumber > 1"
            :href="`/quiz/gay-test/${currentQuestionNumber - 1}`"
            class="flex items-center px-3 py-2 text-gray-600 hover:text-purple-600 transition-colors bg-white/60 hover:bg-white/80 rounded-lg shadow-sm"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span class="text-sm font-medium">Previous</span>
          </a>
        </div>

        <!-- Sound Toggle Button - Top Right -->
        <div class="absolute top-4 right-4">
          <button 
            @click="toggleMute"
            class="flex items-center justify-center px-4 py-3 text-gray-600 hover:text-purple-600 transition-colors bg-blue-50 hover:bg-blue-100 rounded-xl shadow-sm min-w-[48px] min-h-[48px] border border-blue-200"
            :title="isMuted ? 'Mute toggle' : 'Mute toggle'"
          >
            <!-- Speaker icon with sound -->
            <svg v-if="!isMuted" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 12l-4-4H3v8h2l4-4z"/>
            </svg>
            <!-- Muted speaker icon -->
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1V10a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
            </svg>
          </button>
        </div>
        
        <div class="text-center mb-8">
          <div class="text-sm text-gray-500 mb-2">Question {{ currentQuestionNumber }} of {{ totalQuestions }}</div>
          <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
            {{ currentQuestion.question }}
          </h2>
        </div>
        
        <!-- Answer Options -->
        <div class="space-y-3 max-w-2xl mx-auto">
          <button 
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            @click="selectAnswer(index, $event)"
            :disabled="selectedAnswerIndex !== null"
            :class="[
              'w-full p-4 text-left border rounded-xl transition-all duration-300 transform',
              selectedAnswerIndex === index 
                ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-400 shadow-lg scale-[1.02]' 
                : selectedAnswerIndex !== null 
                  ? 'bg-gray-100 border-gray-300 opacity-60' 
                  : 'bg-white/50 hover:bg-white/70 border-gray-200 hover:shadow-lg hover:scale-[1.02] active:scale-95'
            ]"
          >
            <div class="flex items-start space-x-3">
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

        <!-- Next Button (only show after effects complete) -->
        <div v-if="showNextButton" class="mt-8 text-center">
          <a 
            :href="getNextPageUrl()"
            class="next-button inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg"
          >
            {{ currentQuestionNumber < totalQuestions ? 'Next Question' : 'See Results' }}
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </a>
        </div>

        <!-- Progress Display - Bottom Right -->
        <div class="flex justify-end mt-8">
          <div class="text-sm text-gray-500">
            {{ currentQuestionNumber }} / {{ totalQuestions }}
          </div>
        </div>
      </div>
    </div>

    <!-- Gay Test Introduction Section -->
    <div class="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 md:p-8 shadow-lg border border-purple-100">
      <div class="text-center max-w-3xl mx-auto">
        <h3 class="text-xl md:text-2xl font-bold text-purple-800 mb-4">
          Discover Your True Self with Our Gay Test
        </h3>
        <p class="text-base md:text-lg text-gray-700 leading-relaxed">
          Have you ever wondered about your authentic feelings and attractions? Are you questioning your identity, exploring new aspects of yourself, or simply curious about where you stand? This comprehensive Gay Test is your safe space to reflect and discover! With 16 thoughtful questions, we'll explore your emotions, relationships, and inner thoughts to help you understand yourself better. From romantic feelings to personal connections, every answer brings you closer to self-awareness. This isn't about labels—it's about self-discovery and embracing who you truly are. Take your time, be honest, and remember that every journey of self-understanding is beautiful and valid!
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
// Import removed - using inline questions data

// Get route parameters
const route = useRoute()
const router = useRouter()

// Parse question ID from route - SSR safe
const currentQuestionNumber = computed(() => {
  if (!route?.params?.id) return 1
  const id = parseInt(route.params.id)
  return isNaN(id) || id < 1 || id > 16 ? 1 : id
})

// Questions data - using the same data from main page
const allQuestions = ref([
  {
    question: "Have you ever had feelings for a same-gender close friend?",
    options: [
      { text: "I think so. That's why I'm taking this quiz.", value: 3 },
      { text: "Wait, what's the difference between friendship and a crush?", value: 2 },
      { text: "Don't think so, but we're so close people joke that we're dating.", value: 1 },
      { text: "Nope. We're just friends.", value: 0 }
    ]
  },
  {
    question: "Have you ever kissed someone or wanted to kiss someone of the same gender?",
    options: [
      { text: "Definitely, and it was great.", value: 3 },
      { text: "I haven't done it, but I want to try it.", value: 2 },
      { text: "Yeah, and I'm not sure how I felt about it.", value: 1 },
      { text: "Nope. Not interested.", value: 0 }
    ]
  },
  {
    question: "How do you feel about queer characters in TV shows and movies?",
    options: [
      { text: "Oh, I've totally watched shows just for the queer ships and storylines.", value: 3 },
      { text: "I kind of feel like I can identify with queer characters.", value: 2 },
      { text: "I notice queer characters, but I don't feel strongly about them.", value: 1 },
      { text: "I like the positive representation, but they don't stand out to me.", value: 0 }
    ]
  },
  {
    question: "When someone asks you who you're crushing on:",
    options: [
      { text: "A name comes to mind immediately, and it's someone of the same gender.", value: 3 },
      { text: "I make up a name or pick someone random.", value: 2 },
      { text: "I literally don't get the big deal about crushes.", value: 1 },
      { text: "I talk about someone of the opposite sex who I'm genuinely crushing on.", value: 0 }
    ]
  },
  {
    question: "Has anyone ever asked you if you were gay?",
    options: [
      { text: "People pretty much assume that about me all the time.", value: 3 },
      { text: "I've been asked that once or twice.", value: 2 },
      { text: "No one has asked directly if I'm gay, but I wouldn't be surprised if they did ask.", value: 1 },
      { text: "Never. People assume I'm straight.", value: 0 }
    ]
  },
  {
    question: "When you imagine being in a relationship, what do you picture?",
    options: [
      { text: "I can only see myself with someone of the same sex.", value: 3 },
      { text: "I'm not sure. Any gender seems okay.", value: 2 },
      { text: "I'll probably be with someone of the opposite sex.", value: 1 },
      { text: "I can only see myself with someone of the opposite sex.", value: 0 }
    ]
  },
  {
    question: "How would you feel about identifying as gay?",
    options: [
      { text: "Yeah, that feels right.", value: 3 },
      { text: "It honestly makes me a little nervous, but also kinda fits.", value: 2 },
      { text: "I'm not sure how I feel.", value: 1 },
      { text: "No, I really don't think that's me.", value: 0 }
    ]
  },
  {
    question: "Have you ever felt attracted to someone of the same gender?",
    options: [
      { text: "Yes.", value: 3 },
      { text: "Yeah, but everyone has, right?", value: 2 },
      { text: "People of the same gender are just objectively more attractive.", value: 1 },
      { text: "Nope.", value: 0 }
    ]
  },
  {
    question: "How do you feel about dating someone of the opposite gender?",
    options: [
      { text: "I'm not interested. That would feel like a chore.", value: 3 },
      { text: "I wouldn't mind, and I've either wanted to do it or have done it.", value: 1 },
      { text: "Maybe, but I'm not really interested in anyone.", value: 1 },
      { text: "I'd definitely date (or have dated) someone of the opposite gender.", value: 0 }
    ]
  },
  {
    question: "Do you ever fantasize about being with someone of the same gender?",
    options: [
      { text: "Yeah. Pretty often.", value: 3 },
      { text: "Sometimes.", value: 2 },
      { text: "Yes, but I'm not sure I'd actually end up with someone of the same gender.", value: 1 },
      { text: "No.", value: 0 }
    ]
  },
  {
    question: "When you imagine kissing or being intimate with a future partner, how do you feel?",
    options: [
      { text: "As long as I'm with someone I really like, that sounds great.", value: 2 },
      { text: "Good, I guess?", value: 1 },
      { text: "I can't imagine that, and I don't think I'll ever want that, regardless of gender.", value: 0 },
      { text: "I'm too young for that.", value: 0 }
    ]
  },
  {
    question: "If you scroll through your feed or FYP, do you see content from queer creators?",
    options: [
      { text: "Yup. You got me.", value: 3 },
      { text: "Maybe! It depends on the day.", value: 2 },
      { text: "Yeah, but only because I've looked at one or two related posts.", value: 1 },
      { text: "Probably not.", value: 0 }
    ]
  },
  {
    question: "Flash forward 5 years: how likely is it that your partner is the same gender as you?",
    options: [
      { text: "Very likely.", value: 3 },
      { text: "Pretty likely.", value: 2 },
      { text: "Possible, but not super likely.", value: 1 },
      { text: "Not very likely.", value: 0 }
    ]
  },
  {
    question: "Would you be comfortable using an LGBTQ+ dating app?",
    options: [
      { text: "Absolutely! I already have one downloaded.", value: 3 },
      { text: "I'm open to giving one a try.", value: 2 },
      { text: "Not really, but I won't rule it out completely.", value: 1 },
      { text: "No. That makes me uncomfortable.", value: 0 }
    ]
  },
  {
    question: "Are there a lot of LGBTQ+ individuals in your friend group?",
    options: [
      { text: "Absolutely! Lots of my friends are queer.", value: 3 },
      { text: "A few good friends of mine identify as LGBTQ+.", value: 2 },
      { text: "Not really—most of my friends are straight.", value: 1 },
      { text: "Nope. My entire friend group is straight.", value: 0 }
    ]
  },
  {
    question: "What inspired you to take this quiz?",
    options: [
      { text: "I think I might be gay, but I wanted some extra validation.", value: 3 },
      { text: "I identify with aspects of the queer experience but am not totally sure where I stand.", value: 2 },
      { text: "I'm just curious about the result I'll get.", value: 1 },
      { text: "I want to confirm that I'm heterosexual.", value: 0 }
    ]
  }
])

const totalQuestions = computed(() => allQuestions.value.length)

const currentQuestion = computed(() => {
  const index = currentQuestionNumber.value - 1
  return allQuestions.value[index] || allQuestions.value[0]
})

// SEO and Meta
const metaTitle = computed(() => `Gay Test - Question ${currentQuestionNumber.value} | Am I Gay Quiz`)
const metaDescription = computed(() => `Answer question ${currentQuestionNumber.value} of ${totalQuestions.value} in our supportive Gay Test quiz. Explore your feelings and discover more about yourself.`)

useHead({
  title: metaTitle,
  meta: [
    { name: 'description', content: metaDescription },
    { name: 'robots', content: 'noindex, follow' }, // Prevent indexing individual questions
    { property: 'og:title', content: metaTitle },
    { property: 'og:description', content: metaDescription },
    { property: 'og:image', content: 'https://ricetest.net/ricetestsicon.png' },
    { property: 'og:url', content: `https://ricetest.net/quiz/gay-test/${currentQuestionNumber.value}` }
  ]
})

// Reactive state
const selectedAnswerIndex = ref(null)
const showNextButton = ref(false)
const effectType = ref('fireworks') // Track which effect to show
const isMuted = ref(false) // 控制音效开关状态

// 从localStorage加载静音状态
onMounted(() => {
  if (process.client) {
    const savedMuteState = localStorage.getItem('quiz-muted')
    if (savedMuteState !== null) {
      isMuted.value = savedMuteState === 'true'
    }
  }
})

// Methods
const getNextPageUrl = () => {
  // Determine next page URL based on current question
  if (currentQuestionNumber.value < totalQuestions.value) {
    return `/quiz/gay-test/${currentQuestionNumber.value + 1}`
  } else {
    return '/quiz/gay-test/results'
  }
}

// 切换静音状态
const toggleMute = () => {
  isMuted.value = !isMuted.value
  
  // 保存静音状态到localStorage
  if (process.client) {
    localStorage.setItem('quiz-muted', isMuted.value.toString())
  }
}

const selectAnswer = (optionIndex, event) => {
  if (selectedAnswerIndex.value !== null) return // Prevent multiple selections
  
  selectedAnswerIndex.value = optionIndex
  const selectedOption = currentQuestion.value.options[optionIndex]
  
  // Store answer in localStorage
  if (process.client) {
    const answers = JSON.parse(localStorage.getItem('gay-test-answers') || '{}')
    answers[currentQuestionNumber.value] = {
      questionIndex: currentQuestionNumber.value - 1,
      optionIndex,
      value: selectedOption.value,
      text: selectedOption.text
    }
    localStorage.setItem('gay-test-answers', JSON.stringify(answers))
  }
  
  // Choose random effect type
  const effects = ['fireworks', 'confetti', 'stars']
  effectType.value = effects[Math.floor(Math.random() * effects.length)]
  
  // Trigger professional effects using canvas-confetti
  if (process.client) {
    triggerCanvasEffect(effectType.value, event)
  }
  
  // Show Next button after a delay
  setTimeout(() => {
    showNextButton.value = true
    
    // Wait for Next button to render, then scroll to center it
    setTimeout(() => {
      const nextButton = document.querySelector('.next-button')
      if (nextButton) {
        nextButton.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'center'
        })
      }
    }, 300)
  }, 1500) // Show Next button after 1.5 seconds
}

// Professional canvas-confetti effects
const triggerCanvasEffect = async (type, event) => {
  const { default: confetti } = await import('canvas-confetti')
  
  console.log('Triggering effect:', type) // 添加调试日志
  
  // 播放音效
  if (typeof window !== 'undefined' && !isMuted.value) {
    try {
      const audio = new Audio('/gay-test/watch-out.mp3')
      audio.volume = 0.3 // 设置音量为30%，避免过于突兀
      await audio.play()
    } catch (error) {
      console.warn('无法播放音效:', error)
    }
  }
  
  if (type === 'fireworks') {
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
    
  } else if (type === 'confetti') {
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
    
    console.log('Confetti position:', { x, y }) // 添加调试日志
    
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
    
  } else if (type === 'stars') {
    // Star-shaped confetti (使用标准形状，因为canvas-confetti可能不支持star)
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
    
    console.log('Stars position:', { x, y }) // 添加调试日志
    
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
}

// Validate route and redirect if invalid
onMounted(() => {
  const id = parseInt(route.params.id)
  if (isNaN(id) || id < 1 || id > totalQuestions.value) {
    navigateTo('/quiz/gay-test/1')
  }
})
</script>

<style scoped>
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