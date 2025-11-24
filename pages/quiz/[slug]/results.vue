<!-- 动态结果页面 - SPA优化 -->
<template>
  <QuizResults
    :quiz="quiz"
    :result="calculatedResult"
    :has-answers="hasAnswers"
    :is-loading="pending"
  >
    <!-- 相关内容插槽 -->
    <template #related-content="{ quiz, result }">
      <div v-if="relatedQuizzes.length > 0" class="mt-12 mb-8">
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
    </template>
  </QuizResults>
</template>

<script setup>
// 获取路由参数
const route = useRoute()
const slug = route.params.slug

// 定义页面类型 - SPA模式，不需要SSR
definePageMeta({
  layout: 'default',
  mode: 'spa' // 结果页面使用SPA模式，因为需要客户端计算
})

// 直接使用Supabase客户端
const supabase = useSupabaseClient()

// 获取测试数据的函数
async function getQuizBySlug(slug, language = 'en') {
  try {
    // 获取测试基本信息
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('id, title, slug, category_id, hero_image, language, categories(category, subcategory)')
      .eq('slug', slug)
      .eq('language', language)
      .single()
    
    if (quizError) throw quizError
    
    // 映射分类数据
    const quizWithCategory = {
      ...quiz,
      category: quiz.categories?.category || 'Quiz',
      subcategory: quiz.categories?.subcategory || ''
    }

    // 获取测试的问题和选项
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select(`
        id,
        text,
        order_index,
        language,
        options(
          id,
          text,
          score,
          order_index,
          language
        )
      `)
      .eq('quiz_id', quiz.id)
      .eq('language', language)
      .order('order_index', { ascending: true })
    
    if (questionsError) throw questionsError
    
    // 获取测试结果配置
    const { data: results, error: resultsError } = await supabase
      .from('quiz_results')
      .select('id, name, description, image_url, min_score, max_score, language')
      .eq('quiz_id', quiz.id)
      .eq('language', language)
      .order('order_index', { ascending: true })
    
    if (resultsError) throw resultsError
    
    // 整理数据结构
    const formattedQuestions = questions.map(question => ({
      id: question.id,
      text: question.text,
      order_index: question.order_index,
      options: question.options
        .sort((a, b) => a.order_index - b.order_index)
        .map(option => ({
          id: option.id,
          text: option.text,
          score: option.score
        }))
    }))
    
    return {
      ...quizWithCategory,
      questions: formattedQuestions,
      results: results || []
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

// 计算测试结果函数
function calculateQuizResult(quiz, answers) {
  if (!quiz || !quiz.results || !quiz.results.length || !answers) {
    return null
  }
  
  // 计算总分
  let totalScore = 0
  const answersArray = Array.isArray(answers) ? answers : Object.values(answers)
  
  answersArray.forEach(answer => {
    if (typeof answer === 'object' && answer.score !== undefined) {
      totalScore += answer.score
    } else if (typeof answer === 'number') {
      totalScore += answer
    }
  })
  
  // 匹配结果 - 使用绝对分数而不是百分比
  const results = quiz.results
  
  for (const result of results) {
    if (totalScore >= result.min_score && totalScore <= result.max_score) {
      return {
        name: result.name,
        description: result.description,
        image_url: result.image_url // 添加图片URL字段
      }
    }
  }
  
  // 如果没有匹配的结果，返回默认结果
  return {
    name: "Result",
    description: "Thank you for completing the quiz!",
    image_url: null
  }
}

// 保存用户会话函数
async function saveUserSession(quizId, answers, result) {
  if (!quizId || !answers || !result) {
    console.warn('saveUserSession: Missing required parameters')
    return null
  }
  
  try {
    // 将答题记录转换为UUID数组格式
    const answerUuids = Object.values(answers)
      .filter(answer => answer.optionId)
      .map(answer => answer.optionId)
    
    // 计算总分（用于统计）
    let totalScore = 0
    const answersArray = Object.values(answers)
    answersArray.forEach(answer => {
      if (typeof answer === 'object' && answer.score !== undefined) {
        totalScore += answer.score
      } else if (typeof answer === 'number') {
        totalScore += answer
      }
    })
    
    const sessionData = {
      quiz_id: quizId,
      answers: answerUuids,
      total_score: totalScore,
      result: result.name || 'Result',
      created_at: new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('sessions')
      .insert([sessionData])
      .select()
      .single()
    
    if (error) {
      console.error('Error saving user session:', error)
      // 非关键错误，不影响用户体验
      return null
    }
    
    // Session saved successfully
    return data
  } catch (error) {
    console.error('Error in saveUserSession:', error)
    return null
  }
}

// 获取测试数据
const { data: quiz, pending, error } = await useLazyAsyncData(
  `quiz-${slug}`,
  () => getQuizBySlug(slug, currentLanguage.value),
  {
    server: false, // 结果页面不需要服务端渲染
    client: true,
    dedupe: 'defer'
  }
)

// 当前语言设置
const currentLanguage = ref('en')

// 获取所有quiz数据用于推荐
const { data: allQuizzes } = await useLazyAsyncData(
  'all-quizzes-results',
  () => getAllQuizzes(currentLanguage.value),
  {
    server: false,
    client: true,
    default: () => []
  }
)

// 响应式数据
const userAnswers = ref({})
const hasAnswers = ref(false)
const calculatedResult = ref(null)
const sessionSaved = ref(false)

// 加载用户答题数据
const loadUserAnswers = () => {
  if (process.client) {
    const storageKey = `${slug}-answers`
    const storedAnswers = localStorage.getItem(storageKey)
    
    if (storedAnswers) {
      try {
        const parsedAnswers = JSON.parse(storedAnswers)
        userAnswers.value = parsedAnswers
        hasAnswers.value = Object.keys(parsedAnswers).length > 0
        
        // 计算结果
        if (hasAnswers.value && quiz.value) {
          calculatedResult.value = calculateQuizResult(quiz.value, parsedAnswers)
          
          // 保存到数据库（异步，不阻塞用户体验）
          saveSessionToDatabase()
        }
      } catch (error) {
        console.error('Error parsing user answers:', error)
        hasAnswers.value = false
      }
    }
  }
}

// 保存会话到数据库
const saveSessionToDatabase = async () => {
  if (sessionSaved.value || !quiz.value || !calculatedResult.value) return
  
  try {
    // 保存会话（简化版，无防刷机制）
    const sessionData = await saveUserSession(
      quiz.value.id,
      userAnswers.value,
      calculatedResult.value
    )
    
    if (sessionData) {
      sessionSaved.value = true
      // Session saved
    }
  } catch (error) {
    console.error('Error saving session:', error)
    // 不影响用户体验，继续显示结果
  }
}

// 监听quiz数据变化，重新计算结果
watch(quiz, (newQuiz) => {
  if (newQuiz && hasAnswers.value) {
    calculatedResult.value = calculateQuizResult(newQuiz, userAnswers.value)
    
    // 如果还没保存，尝试保存
    if (!sessionSaved.value) {
      saveSessionToDatabase()
    }
  }
})

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

// 样式相关函数（从/quiz页面复制）
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

// 错误处理
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Quiz Not Found',
    message: `The quiz "${slug}" does not exist.`
  })
}

// 页面加载时执行
onMounted(() => {
  loadUserAnswers()
  
  // 如果没有答题数据，3秒后自动跳转到测试首页
  if (!hasAnswers.value) {
    setTimeout(() => {
      if (!hasAnswers.value) {
        navigateTo(`/quiz/${slug}`)
      }
    }, 3000)
  }
})

// 监听localStorage变化（如果用户在其他标签页完成了测试）
onMounted(() => {
  if (process.client) {
    const handleStorageChange = (event) => {
      if (event.key === `${slug}-answers`) {
        loadUserAnswers()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    onUnmounted(() => {
      window.removeEventListener('storage', handleStorageChange)
    })
  }
})

</script>