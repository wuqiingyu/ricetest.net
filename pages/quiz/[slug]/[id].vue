<!-- 动态问题页面 - SSR优化 -->
<template>
  <QuizQuestion
    :quiz="quiz"
    :current-question="currentQuestion"
    :current-question-number="questionNumber"
    :total-questions="totalQuestions"
    :is-loading="pending"
    :error="error?.message"
    :quiz-description="quizDescription"
    :sound-url="soundUrl"
  />
</template>

<script setup>
// 获取路由参数
const route = useRoute()
const slug = route.params.slug
const questionId = parseInt(route.params.id)

// 定义页面类型
definePageMeta({
  layout: 'default'
})

// 验证问题ID格式
if (isNaN(questionId) || questionId < 1) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Invalid Question',
    message: 'Question number must be a valid positive integer.'
  })
}

// 直接使用Supabase客户端获取数据
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
        image_url,
        order_index,
        language,
        options(
          id,
          text,
          image_url,
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
      image_url: question.image_url,
      order_index: question.order_index,
      options: question.options
        .sort((a, b) => a.order_index - b.order_index)
        .map(option => ({
          id: option.id,
          text: option.text,
          image_url: option.image_url,
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

// 当前语言设置
const currentLanguage = ref('en')

// 服务端获取测试数据 - SSR优化
const { data: quiz, pending, error } = await useLazyAsyncData(
  `quiz-${slug}`,
  () => getQuizBySlug(slug, currentLanguage.value),
  {
    server: true,
    client: true,
    dedupe: 'defer'
  }
)

// 如果测试不存在，显示404
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Quiz Not Found',
    message: `The quiz "${slug}" does not exist.`
  })
}

// 计算属性
const totalQuestions = computed(() => {
  return quiz.value?.questions?.length || 0
})

const questionNumber = computed(() => {
  // 验证问题编号是否在有效范围内
  if (questionId > totalQuestions.value) {
    return 1 // 重定向到第一题
  }
  return questionId
})

const currentQuestion = computed(() => {
  if (!quiz.value?.questions || questionNumber.value < 1) return null
  
  const index = questionNumber.value - 1
  return quiz.value.questions[index] || null
})

// 动态测试描述
const quizDescription = computed(() => {
  if (!quiz.value) return ''
  
  return `Take your time with each question in our ${quiz.value.title}. Answer honestly and discover more about yourself through this thoughtful self-reflection journey.`
})

// 音效文件路径（所有测试都使用相同的音效文件）
const soundUrl = computed(() => {
  // 所有测试都使用同一个音效文件，确保文件存在
  return '/gay-test/watch-out.mp3'
})

// 如果问题编号超出范围，重定向到有效范围
watch([quiz, questionNumber], ([newQuiz, newQuestionNumber]) => {
  if (newQuiz && newQuestionNumber) {
    if (questionId > totalQuestions.value) {
      // 重定向到最后一题
      navigateTo(`/quiz/${slug}/${totalQuestions.value}`)
    } else if (questionId < 1) {
      // 重定向到第一题
      navigateTo(`/quiz/${slug}/1`)
    }
  }
}, { immediate: true })

// 错误处理
watch(error, (newError) => {
  if (newError) {
    console.error('Question loading error:', newError)
  }
})

// 键盘快捷键支持
onMounted(() => {
  if (process.client) {
    const handleKeyPress = (event) => {
      // ESC键返回测试首页
      if (event.key === 'Escape') {
        navigateTo(`/quiz/${slug}`)
      }
      // 左箭头键返回上一题
      else if (event.key === 'ArrowLeft' && questionNumber.value > 1) {
        navigateTo(`/quiz/${slug}/${questionNumber.value - 1}`)
      }
      // 右箭头键进入下一题（如果已选择答案）
      else if (event.key === 'ArrowRight' && questionNumber.value < totalQuestions.value) {
        const storageKey = `${slug}-answers`
        const answers = JSON.parse(localStorage.getItem(storageKey) || '{}')
        if (answers[questionNumber.value]) {
          navigateTo(`/quiz/${slug}/${questionNumber.value + 1}`)
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    
    // 清理事件监听器
    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyPress)
    })
  }
})

// 预加载下一页（性能优化）
onMounted(() => {
  if (process.client && quiz.value) {
    // 预加载下一题页面
    if (questionNumber.value < totalQuestions.value) {
      const nextUrl = `/quiz/${slug}/${questionNumber.value + 1}`
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = nextUrl
      link.as = 'document'
      document.head.appendChild(link)
    }
    
    // 如果是最后一题，预加载结果页
    if (questionNumber.value === totalQuestions.value) {
      const resultsUrl = `/quiz/${slug}/results`
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = resultsUrl
      link.as = 'document'
      document.head.appendChild(link)
    }
  }
})
</script>