<!-- Iframe 游戏页面 - 用于 type=iframe 的 quiz -->
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Loading State -->
    <div v-if="pending" class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p class="text-gray-600 mt-4">Loading game...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex-1 flex items-center justify-center">
      <div class="text-center px-4">
        <div class="text-red-600 text-xl mb-4">⚠️ Game Not Found</div>
        <p class="text-gray-600 mb-6">{{ error.message }}</p>
        <NuxtLink 
          to="/quiz"
          class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
        >
          Browse Other Quizzes
        </NuxtLink>
      </div>
    </div>

    <!-- Game Content -->
    <div v-else-if="quiz && quiz.iframe_url" class="flex-1 flex flex-col">
      <!-- Iframe Game Container -->
      <div class="flex-1 flex items-center justify-center p-4 md:p-8">
        <div class="iframe-game-container">
          <iframe
            :src="quiz.iframe_url"
            class="game-iframe"
            frameborder="0"
            allowfullscreen
            loading="lazy"
            :title="quiz.title"
          >
          </iframe>
        </div>
      </div>

      <!-- Action Buttons Section -->
      <div class="max-w-4xl mx-auto w-full px-4 py-8">
        <div class="flex gap-4 justify-center flex-wrap mb-8">
          <NuxtLink 
            to="/quiz"
            class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Next Quiz
          </NuxtLink>
          
          <button 
            @click="showShareModal = true"
            class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Share Game
          </button>
        </div>

        <!-- Related Quizzes Section -->
        <div v-if="relatedQuizzes.length > 0" class="mt-8 mb-8">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">You Might Also Like</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="relatedQuiz in relatedQuizzes" 
              :key="relatedQuiz.id"
              class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              <div class="relative">
                <img 
                  :src="relatedQuiz.hero_image || getDefaultImage(relatedQuiz.category)"
                  :alt="relatedQuiz.title"
                  class="w-full h-48 md:h-48 object-cover"
                  loading="lazy"
                >
                <div :class="`absolute top-4 left-4 text-white px-3 py-1 rounded-full text-xs font-bold ${getBadgeClass(relatedQuiz.category)}`">
                  {{ getBadgeText(relatedQuiz.category) }}
                </div>
              </div>
              <div class="p-4 md:p-6 text-center">
                <h3 class="text-xl font-bold mb-4 md:mb-6 text-gray-900">
                  {{ relatedQuiz.title }}
                </h3>
                <a 
                  :href="`/quiz/${relatedQuiz.slug}`"
                  :class="`block w-full font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-white ${getButtonClass(relatedQuiz.category)}`"
                >
                  PLAY
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Share Modal -->
      <div v-if="showShareModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showShareModal = false">
        <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl" @click.stop>
          <div class="text-center mb-6">
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Share This Game</h3>
            <p class="text-gray-600">Share this fun game with your friends!</p>
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
    </div>

    <!-- No iframe URL -->
    <div v-else class="flex-1 flex items-center justify-center">
      <div class="text-center px-4">
        <div class="text-yellow-600 text-xl mb-4">⚠️ Game Not Available</div>
        <p class="text-gray-600 mb-6">This quiz game is currently unavailable.</p>
        <NuxtLink 
          :to="`/quiz/${slug}`"
          class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
        >
          Back to Quiz
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// 获取路由参数
const route = useRoute()
const slug = route.params.slug

// 定义页面类型
definePageMeta({
  layout: 'default'
})

// 直接使用Supabase客户端获取数据
const supabase = useSupabaseClient()

// 获取测试数据的函数
async function getQuizBySlug(slug, language = 'en') {
  try {
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('id, title, subtitle, slug, type, iframe_url, hero_image, language, categories(category, subcategory)')
      .eq('slug', slug)
      .eq('language', language)
      .single()
    
    if (quizError) throw quizError
    
    // 检查是否是 iframe 类型
    if (quiz.type !== 'iframe') {
      throw new Error('This quiz is not an iframe game.')
    }
    
    return {
      ...quiz,
      category: quiz.categories?.category || 'Quiz',
      subcategory: quiz.categories?.subcategory || ''
    }
  } catch (error) {
    console.error(`Error fetching quiz ${slug}:`, error)
    throw error
  }
}

// 获取所有quiz数据的函数
async function getAllQuizzes(language = 'en') {
  try {
    const { data: quizzes, error } = await supabase
      .from('quizzes')
      .select('id, title, slug, category_id, hero_image, created_at, language, categories(category, subcategory)')
      .eq('language', language)
      .order('created_at', { ascending: false })
    
    if (error) throw error
        
    // 映射数据以保持兼容性
    const formattedQuizzes = (quizzes || []).map(quiz => ({
      ...quiz,
      category: quiz.categories?.category || 'Quiz',
      subcategory: quiz.categories?.subcategory || '',
      category_slug: quiz.categories?.category?.toLowerCase() || ''
    }))
    
    return formattedQuizzes
    
  } catch (error) {
    console.error('Error fetching all quizzes:', error)
    return []
  }
}

// 当前语言设置
const currentLanguage = ref('en')

// 服务端获取数据 - SSR优化
const { data: quiz, pending, error } = await useLazyAsyncData(
  `quiz-play-${slug}`,
  () => getQuizBySlug(slug, currentLanguage.value),
  {
    server: true,
    client: true,
    dedupe: 'defer'
  }
)

// 获取所有quiz数据用于推荐
const { data: allQuizzes } = await useLazyAsyncData(
  'all-quizzes-play',
  () => getAllQuizzes(currentLanguage.value),
  {
    server: false,
    client: true,
    default: () => []
  }
)

// 如果测试不存在，显示404
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Quiz Not Found',
    message: `The quiz "${slug}" does not exist or is not a game.`
  })
}

// Reactive data
const showShareModal = ref(false)

// 随机选择6个相关quiz
const relatedQuizzes = computed(() => {
  if (!allQuizzes.value || allQuizzes.value.length === 0 || !quiz.value) return []
  
  // 过滤掉当前quiz
  const otherQuizzes = allQuizzes.value.filter(q => q.id !== quiz.value.id)
  
  // 如果quiz少于6个，返回所有
  if (otherQuizzes.length <= 6) {
    return otherQuizzes
  }
  
  // 随机排序并取前6个
  const shuffled = [...otherQuizzes].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 6)
})

// 样式相关函数
const getDefaultImage = (category) => {
  const defaultImages = {
    personality: '/quiz-placeholder-personality.png',
    trivia: '/quiz-placeholder-trivia.png',
    relationship: '/quiz-placeholder-relationship.png',
    career: '/quiz-placeholder-career.png',
    entertainment: '/quiz-placeholder-entertainment.png',
    lifestyle: '/quiz-placeholder-lifestyle.png'
  }
  return defaultImages[category] || '/quiz-placeholder-default.png'
}

const getBadgeClass = (category) => {
  const badgeClasses = {
    personality: 'bg-purple-500',
    trivia: 'bg-blue-500',
    relationship: 'bg-pink-500',
    career: 'bg-teal-500',
    entertainment: 'bg-orange-500',
    lifestyle: 'bg-green-500'
  }
  return badgeClasses[category] || 'bg-gray-500'
}

const getBadgeText = (category) => {
  const badgeTexts = {
    personality: '🎭 PERSONALITY',
    trivia: '🧠 TRIVIA',
    relationship: '💕 LOVE',
    career: '🎯 CAREER',
    entertainment: '🎬 FUN',
    lifestyle: '✨ LIFESTYLE'
  }
  return badgeTexts[category] || '🎮 QUIZ'
}

const getButtonClass = (category) => {
  const buttonClasses = {
    personality: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    trivia: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    relationship: 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700',
    career: 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700',
    entertainment: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
    lifestyle: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
  }
  return buttonClasses[category] || 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
}

// Share functions
const getShareText = () => {
  const quizTitle = quiz.value?.title || 'Quiz Game'
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ricetest.net'
  
  return `I just played ${quizTitle}! 🎮

Try it yourself: ${baseUrl}/quiz/${slug}

#Quiz #Game #Fun`
}

const shareToTwitter = () => {
  const text = getShareText()
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
  window.open(url, '_blank')
  showShareModal.value = false
}

const shareToFacebook = () => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ricetest.net'
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${baseUrl}/quiz/${slug}`)}`
  window.open(url, '_blank')
  showShareModal.value = false
}

const shareToInstagram = () => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ricetest.net'
  const shareUrl = `${baseUrl}/quiz/${slug}`
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

// SEO Meta
useHead(() => ({
  title: quiz.value ? `${quiz.value.title} | Play Game | RiceTest` : 'Game | RiceTest',
  meta: [
    { name: 'description', content: quiz.value?.subtitle || `Play ${quiz.value?.title} - an interactive game on RiceTest.` },
    { name: 'keywords', content: `${quiz.value?.title}, quiz game, interactive game, online quiz` },
    { property: 'og:title', content: quiz.value ? `${quiz.value.title} | Play Game` : 'Game' },
    { property: 'og:description', content: quiz.value?.subtitle || 'Play this interactive quiz game on RiceTest.' },
    { property: 'og:image', content: quiz.value?.hero_image || 'https://ricetest.net/ricetestsicon.png' },
    { property: 'og:url', content: `https://ricetest.net/quiz/${slug}/play` },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: quiz.value ? `${quiz.value.title} | Play Game` : 'Game' },
    { name: 'twitter:description', content: quiz.value?.subtitle || 'Play this interactive quiz game on RiceTest.' },
    { name: 'twitter:image', content: quiz.value?.hero_image || 'https://ricetest.net/ricetestsicon.png' }
  ],
  link: [
    { rel: 'canonical', href: `https://ricetest.net/quiz/${slug}/play` }
  ]
}))

// 错误处理
watch(error, (newError) => {
  if (newError) {
    console.error('Game loading error:', newError)
  }
})
</script>

<style scoped>
.iframe-game-container {
  width: 80vw;
  height: 80vh;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  background: white;
}

.game-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  border-radius: 12px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .iframe-game-container {
    width: 95vw;
    height: 70vh;
  }
}
</style>
