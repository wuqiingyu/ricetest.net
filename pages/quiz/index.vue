<template>
  <div class="min-h-screen bg-white">
    
    <!-- Hero Section - Quiz Interface -->
    <div class="relative overflow-hidden h-[50vh] bg-cover bg-center bg-no-repeat py-4 md:py-8" style="background-image: url('/bg.png');">
      
      <div class="relative max-w-6xl mx-auto px-4 h-full flex items-center">
        <!-- 左右布局容器 -->
        <div class="grid md:grid-cols-2 gap-4 items-center w-full min-h-[35vh]">
          
          <!-- Left Side - Title and Cat -->
          <div class="text-left relative" style="margin-left: 150px;">
            <!-- 大狐狸图片 - 占满hero section高度 -->
            <div class="relative flex justify-center md:justify-start">
              <img 
                src="/foxrico.png" 
                alt="Fox Rico Mascot"
                class="h-[40vh] w-auto object-contain drop-shadow-xl"
              />
              
              <!-- 悬浮在狐狸上的标题 -->
              <div class="absolute top-4 left-1/2 transform -translate-x-1/2 md:left-8 md:transform-none z-10">
                <h1 class="text-2xl md:text-3xl font-black text-white mb-3 drop-shadow-lg text-center md:text-left">
                  TODAY'S QUIZ
                </h1>
              </div>
            </div>
          </div>

          <!-- Right Side - Date and Question Card -->
          <div class="flex flex-col items-center justify-center">
            <!-- 日期标签移到问题卡片上方 -->
            <div class="mb-3">
              <div class="inline-block bg-green-100/95 border border-green-300 rounded-lg px-3 py-1.5 backdrop-blur-sm">
                <p class="text-green-800 text-base font-semibold">
                  {{ formattedDate }}
                </p>
              </div>
            </div>
            
            <!-- 问题卡片 - 更宽更矮 -->
            <div class="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-3 md:p-4 w-full max-w-lg border border-white/30">
              <!-- Dynamic Question Display -->
              <div class="mb-3">
                <h2 class="text-base md:text-lg font-bold text-gray-900 mb-3 leading-relaxed text-center">
                  {{ currentQuestion.question }}
                </h2>

                <!-- Dynamic Answer Options -->
                <div class="space-y-1.5">
                  <div 
                    v-for="(option, index) in currentQuestion.options" 
                    :key="index"
                    @click="selectOption(index)"
                    :class="[
                      'w-full p-2.5 text-left rounded-lg border-2 cursor-pointer font-medium text-sm transition-all duration-300 transform',
                      selectedOptionIndex === index 
                        ? 'bg-blue-100 border-blue-400 text-blue-800 shadow-lg scale-[1.02]'
                        : hasAnswered && selectedAnswerIndex === index
                          ? (index === currentQuestion.correctAnswer 
                              ? 'bg-green-100 border-green-400 text-green-800 shadow-lg scale-[1.02]' 
                              : 'bg-red-100 border-red-400 text-red-800 shadow-lg scale-[1.02]')
                          : hasAnswered 
                            ? 'bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed' 
                            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:scale-[1.02] active:scale-95'
                    ]"
                  >
                    <span class="flex items-center">
                      <span :class="[
                        'inline-block w-5 h-5 rounded-full border-2 text-gray-600 mr-2 flex items-center justify-center text-xs font-bold',
                        selectedOptionIndex === index 
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : hasAnswered && selectedAnswerIndex === index 
                            ? (index === currentQuestion.correctAnswer 
                                ? 'bg-green-500 border-green-500 text-white' 
                                : 'bg-red-500 border-red-500 text-white')
                            : 'border-gray-400'
                      ]">
                        {{ String.fromCharCode(65 + index) }}
                      </span>
                      {{ option }}
                      <!-- 显示正确/错误图标（仅在已答题后） -->
                      <div v-if="hasAnswered && selectedAnswerIndex === index" class="ml-auto">
                        <svg v-if="index === currentQuestion.correctAnswer" class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <svg v-else class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </div>
                    </span>
                  </div>
                </div>

                <!-- 显示正确答案（仅在答错时） -->
                <div v-if="hasAnswered && selectedAnswerIndex !== currentQuestion.correctAnswer" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div class="flex items-start space-x-2">
                    <svg class="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-green-800">Correct Answer:</p>
                      <p class="text-sm text-green-700">
                        {{ String.fromCharCode(65 + currentQuestion.correctAnswer) }}. {{ currentQuestion.options[currentQuestion.correctAnswer] }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Play Button -->
              <div class="flex justify-center">
                <button 
                  @click="handleButtonClick($event)"
                  :disabled="selectedOptionIndex === null && !hasAnswered"
                  :class="[
                    'px-5 py-1.5 rounded-lg transition-all duration-300 font-bold shadow-lg transform text-sm',
                    !hasAnswered && selectedOptionIndex !== null
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white hover:scale-105 cursor-pointer'
                      : hasAnswered
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-105 cursor-pointer'
                        : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-60'
                  ]"
                >
                  {{ getButtonText() }}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Quiz Categories Section -->
    <section id="quizzes" class="py-16 md:py-20">
      <div class="max-w-6xl mx-auto px-4">
        
        <!-- Trending Tests -->
        <div class="mb-16">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🔥 Trending Tests
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Our most popular personality tests - discover what everyone's talking about
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Rice Purity Test -->
            <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
              <div class="relative">
                <img 
                  src="/rice-purity-test.jpg" 
                  alt="How Pure Are You?"
                  class="w-full h-48 object-cover"
                >
                <div class="absolute top-4 left-4">
                  <span class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    🔥 HOT
                  </span>
                </div>
              </div>
              <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-gray-900 mb-3">
                  How Pure Are You?
                </h3>
                <p class="text-gray-600 text-sm mb-6 leading-relaxed">
                  Take the famous 100-question Rice Purity Test and discover your innocence level
                </p>
                <a 
                  href="/"
                  class="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-8 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  PLAY
                </a>
              </div>
            </div>

            <!-- Gay Test -->
            <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
              <div class="relative">
                <img 
                  src="/gay-test/gaytest4.png" 
                  alt="Am I Gay Quiz"
                  class="w-full h-48 object-cover"
                >
                <div class="absolute top-4 left-4">
                  <span class="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    🏳️‍🌈 POPULAR
                  </span>
                </div>
              </div>
              <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-gray-900 mb-3">
                  Am I Gay Quiz
                </h3>
                <p class="text-gray-600 text-sm mb-6 leading-relaxed">
                  Explore your feelings and discover insights about your sexual orientation
                </p>
                <a 
                  href="/quiz/gay-test"
                  class="inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  PLAY
                </a>
              </div>
            </div>

            <!-- Coming Soon Placeholder -->
            <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden opacity-70">
              <div class="relative">
                <div class="bg-gradient-to-br from-gray-400 to-gray-500 h-48 flex items-center justify-center">
                  <div class="text-white text-6xl">🔮</div>
                </div>
                <div class="absolute top-4 left-4">
                  <span class="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ⏳ SOON
                  </span>
                </div>
              </div>
              <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-gray-700 mb-3">
                  What's My Personality?
                </h3>
                <p class="text-gray-500 text-sm mb-6 leading-relaxed">
                  Discover your unique personality type and how you see the world
                </p>
                <button 
                  disabled
                  class="inline-block bg-gray-400 text-white font-bold py-3 px-8 rounded-full cursor-not-allowed"
                >
                  COMING SOON
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Relationship Tests -->
        <div class="mb-16">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              💕 Relationship Tests
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Understand your relationships, love style, and compatibility
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Love Language Test -->
            <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden opacity-70">
              <div class="relative">
                <div class="bg-gradient-to-br from-pink-400 to-red-500 h-48 flex items-center justify-center">
                  <div class="text-white text-6xl">💖</div>
                </div>
                <div class="absolute top-4 left-4">
                  <span class="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ⏳ SOON
                  </span>
                </div>
              </div>
              <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-gray-700 mb-3">
                  What's My Love Language?
                </h3>
                <p class="text-gray-500 text-sm mb-6 leading-relaxed">
                  Learn how you give and receive love in relationships
                </p>
                <button 
                  disabled
                  class="inline-block bg-gray-400 text-white font-bold py-3 px-8 rounded-full cursor-not-allowed"
                >
                  COMING SOON
                </button>
              </div>
            </div>

            <!-- Attachment Style -->
            <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden opacity-70">
              <div class="relative">
                <div class="bg-gradient-to-br from-orange-400 to-pink-500 h-48 flex items-center justify-center">
                  <div class="text-white text-6xl">🤗</div>
                </div>
                <div class="absolute top-4 left-4">
                  <span class="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ⏳ SOON
                  </span>
                </div>
              </div>
              <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-gray-700 mb-3">
                  What's My Attachment Style?
                </h3>
                <p class="text-gray-500 text-sm mb-6 leading-relaxed">
                  Understand how you connect and bond in relationships
                </p>
                <button 
                  disabled
                  class="inline-block bg-gray-400 text-white font-bold py-3 px-8 rounded-full cursor-not-allowed"
                >
                  COMING SOON
                </button>
              </div>
            </div>

            <!-- Dating Style -->
            <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden opacity-70">
              <div class="relative">
                <div class="bg-gradient-to-br from-purple-400 to-pink-500 h-48 flex items-center justify-center">
                  <div class="text-white text-6xl">💘</div>
                </div>
                <div class="absolute top-4 left-4">
                  <span class="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ⏳ SOON
                  </span>
                </div>
              </div>
              <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-gray-700 mb-3">
                  What's My Dating Style?
                </h3>
                <p class="text-gray-500 text-sm mb-6 leading-relaxed">
                  Discover your approach to dating and romantic relationships
                </p>
                <button 
                  disabled
                  class="inline-block bg-gray-400 text-white font-bold py-3 px-8 rounded-full cursor-not-allowed"
                >
                  COMING SOON
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Career & Life Tests -->
        <div class="mb-16">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🎯 Career & Life Tests
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Find your path, discover your strengths, and plan your future
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Career Test -->
            <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden opacity-70">
              <div class="relative">
                <div class="bg-gradient-to-br from-teal-400 to-blue-500 h-48 flex items-center justify-center">
                  <div class="text-white text-6xl">💼</div>
                </div>
                <div class="absolute top-4 left-4">
                  <span class="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ⏳ SOON
                  </span>
                </div>
              </div>
              <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-gray-700 mb-3">
                  What's My Ideal Career?
                </h3>
                <p class="text-gray-500 text-sm mb-6 leading-relaxed">
                  Find career paths that match your personality and interests
                </p>
                <button 
                  disabled
                  class="inline-block bg-gray-400 text-white font-bold py-3 px-8 rounded-full cursor-not-allowed"
                >
                  COMING SOON
                </button>
              </div>
            </div>

            <!-- Life Values -->
            <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden opacity-70">
              <div class="relative">
                <div class="bg-gradient-to-br from-green-400 to-teal-500 h-48 flex items-center justify-center">
                  <div class="text-white text-6xl">🌟</div>
                </div>
                <div class="absolute top-4 left-4">
                  <span class="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ⏳ SOON
                  </span>
                </div>
              </div>
              <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-gray-700 mb-3">
                  What Are My Core Values?
                </h3>
                <p class="text-gray-500 text-sm mb-6 leading-relaxed">
                  Discover what truly matters most to you in life
                </p>
                <button 
                  disabled
                  class="inline-block bg-gray-400 text-white font-bold py-3 px-8 rounded-full cursor-not-allowed"
                >
                  COMING SOON
                </button>
              </div>
            </div>

            <!-- Leadership Style -->
            <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden opacity-70">
              <div class="relative">
                <div class="bg-gradient-to-br from-indigo-400 to-purple-500 h-48 flex items-center justify-center">
                  <div class="text-white text-6xl">👑</div>
                </div>
                <div class="absolute top-4 left-4">
                  <span class="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ⏳ SOON
                  </span>
                </div>
              </div>
              <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-gray-700 mb-3">
                  What's My Leadership Style?
                </h3>
                <p class="text-gray-500 text-sm mb-6 leading-relaxed">
                  Learn how you lead and inspire others around you
                </p>
                <button 
                  disabled
                  class="inline-block bg-gray-400 text-white font-bold py-3 px-8 rounded-full cursor-not-allowed"
                >
                  COMING SOON
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-gray-50 py-16 md:py-20">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose RiceTest?
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing accurate, insightful, and meaningful personality assessments
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl">🔬</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Scientifically-Based</h3>
            <p class="text-gray-600">
              Our tests are based on psychological research and proven assessment methodologies.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl">🔒</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">100% Private</h3>
            <p class="text-gray-600">
              Your answers and results are completely private and secure. We don't store personal data.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl">⚡</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Instant Results</h3>
            <p class="text-gray-600">
              Get detailed insights and personalized results immediately after completing any test.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div class="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl">📱</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Mobile Friendly</h3>
            <p class="text-gray-600">
              Take tests on any device - desktop, tablet, or mobile. Fully responsive design.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div class="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl">💝</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Completely Free</h3>
            <p class="text-gray-600">
              All our personality tests are free to take. No hidden fees or premium subscriptions.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div class="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl">🎯</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Actionable Insights</h3>
            <p class="text-gray-600">
              Get practical advice and actionable insights you can apply to improve your life.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 md:py-20">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Discover Your True Self?
        </h2>
        <p class="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
          Join hundreds of thousands of people who have found deeper self-understanding through our tests
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/"
            class="bg-white text-indigo-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Take Rice Purity Test →
          </a>
          <a 
            href="/wiki"
            class="border-2 border-white/50 text-white font-semibold py-4 px-8 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Read Our Wiki
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import quizData from '~/data/daily-quiz.json'

// 动态获取当前日期
const formattedDate = computed(() => {
  const today = new Date()
  return today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric', 
    month: 'long',
    day: 'numeric'
  })
})

// 从外部文件加载题目库
const questionPool = quizData.questions

// 随机选择一个题目
const currentQuestion = computed(() => {
  const randomIndex = Math.floor(Math.random() * questionPool.length)
  const question = questionPool[randomIndex]
  
  // 适配数据结构差异 (correct vs correctAnswer)
  return {
    question: question.question,
    options: question.options,
    correctAnswer: question.correct
  }
})

// 响应式状态
const selectedOptionIndex = ref(null) // 用户选择的选项（选择阶段）
const selectedAnswerIndex = ref(null) // 最终答案（确认后）
const hasAnswered = ref(false) // 是否已经答题
const isCorrect = ref(false)

// 选择选项函数（不立即判定）
const selectOption = (optionIndex) => {
  if (hasAnswered.value) return // 如果已经答题，不允许重新选择
  selectedOptionIndex.value = optionIndex
}

// 确认答案函数（点击Play按钮时调用）
const checkAnswer = (event) => {
  if (selectedOptionIndex.value === null || hasAnswered.value) return
  
  // 确认答案
  selectedAnswerIndex.value = selectedOptionIndex.value
  hasAnswered.value = true
  isCorrect.value = selectedAnswerIndex.value === currentQuestion.value.correctAnswer
  
  // 如果答对了，触发特效
  if (isCorrect.value && process.client) {
    triggerCanvasEffect(event)
  }
}

// 处理按钮点击事件
const handleButtonClick = (event) => {
  if (!hasAnswered.value) {
    // 如果还没答题，执行答题逻辑
    checkAnswer(event)
  } else {
    // 如果已经答题，滚动到trending tests部分
    scrollToTrendingTests()
  }
}

// 滚动到trending tests部分
const scrollToTrendingTests = () => {
  if (process.client) {
    const trendingSection = document.querySelector('#quizzes')
    if (trendingSection) {
      trendingSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
}

// 获取按钮文本
const getButtonText = () => {
  if (!hasAnswered.value) {
    return 'Play'
  } else {
    return 'Today\'s quiz completed! Check out more quizzes here ↓'
  }
}

// 特效函数（从 gay-test 页面复制）
const triggerCanvasEffect = async (event) => {
  const { default: confetti } = await import('canvas-confetti')
  
  // 随机选择特效类型
  const effects = ['fireworks', 'confetti', 'stars']
  const effectType = effects[Math.floor(Math.random() * effects.length)]
  
  if (effectType === 'fireworks') {
    // 烟花效果
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
      
      // 左侧烟花
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      
      // 右侧烟花
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)
    
  } else if (effectType === 'confetti') {
    // 彩纸效果
    let x = 0.5
    let y = 0.5
    
    if (event && event.currentTarget && typeof window !== 'undefined') {
      try {
        const rect = event.currentTarget.getBoundingClientRect()
        x = (rect.left + rect.width / 2) / window.innerWidth
        y = (rect.top + rect.height / 2) / window.innerHeight
      } catch (error) {
        console.warn('无法获取按钮位置，使用默认位置:', error)
      }
    }
    
    // 第一轮爆发
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#6c5ce7'],
      zIndex: 9999
    })
    
    // 第二轮爆发
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { x, y },
        colors: ['#fd79a8', '#00b894', '#fdcb6e', '#e17055'],
        zIndex: 9999
      })
    }, 300)
    
  } else if (effectType === 'stars') {
    // 星星效果
    let x = 0.5
    let y = 0.5
    
    if (event && event.currentTarget && typeof window !== 'undefined') {
      try {
        const rect = event.currentTarget.getBoundingClientRect()
        x = (rect.left + rect.width / 2) / window.innerWidth
        y = (rect.top + rect.height / 2) / window.innerHeight
      } catch (error) {
        console.warn('无法获取按钮位置，使用默认位置:', error)
      }
    }
    
    // 第一轮星星
    confetti({
      particleCount: 50,
      spread: 360,
      startVelocity: 40,
      origin: { x, y },
      colors: ['#FFD700', '#FFA500', '#FF6347', '#FF69B4', '#9370DB'],
      zIndex: 9999,
      scalar: 1.2
    })
    
    // 后续闪烁
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

// Meta tags for SEO
useHead({
  title: 'Free Personality Tests & Quizzes | RiceTest - Discover Your True Self',
  meta: [
    { name: 'description', content: 'Take free personality tests including the Rice Purity Test, Gay Test, and more. Discover insights about yourself with scientifically-based quizzes and instant results.' },
    { name: 'keywords', content: 'personality tests, free quizzes, rice purity test, gay test, am i gay quiz, how pure are you, self discovery, psychology quizzes, personality assessment' },
    { property: 'og:title', content: 'Free Personality Tests & Quizzes | RiceTest' },
    { property: 'og:description', content: 'Discover your true self with free personality tests. Take the Rice Purity Test, Gay Test, and more with instant results.' },
    { property: 'og:image', content: 'https://ricetest.net/ricetestsicon.png' },
    { property: 'og:url', content: 'https://ricetest.net/quiz' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Free Personality Tests & Quizzes | RiceTest' },
    { name: 'twitter:description', content: 'Discover your true self with free personality tests and quizzes.' },
    { name: 'twitter:image', content: 'https://ricetest.net/ricetestsicon.png' }
  ],
  link: [
    { rel: 'canonical', href: 'https://ricetest.net/quiz' }
  ]
})
</script>

<style scoped>
/* 只保留最基本的响应式调整 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
    line-height: 1.2;
  }
}

/* 选中答案动画 */
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

/* 正确答案绿色动画 */
@keyframes correct-answer {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 0 0 10px rgba(34, 197, 94, 0.1);
  }
  100% {
    transform: scale(1.02);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

.correct-answer {
  animation: correct-answer 0.8s ease-out;
}

/* 错误答案红色动画 */
@keyframes wrong-answer {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.98);
  }
  50% {
    transform: scale(1.02);
  }
  75% {
    transform: scale(0.99);
  }
  100% {
    transform: scale(1.02);
  }
}

.wrong-answer {
  animation: wrong-answer 0.5s ease-out;
}
</style>