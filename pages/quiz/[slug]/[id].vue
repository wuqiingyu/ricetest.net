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

// 回退函数 - 如果优化查询失败，使用原来的方式
async function getFallbackQuizData(slug, language = 'en') {
  try {
    console.log(`Using fallback query for quiz ${slug}`)
    
    // 获取测试基本信息
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('id, title, slug, category, hero_image, language')
      .eq('slug', slug)
      .eq('language', language)
      .single()
    
    if (quizError) throw quizError
    
    // 获取所有问题和选项
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
      ...quiz,
      questions: formattedQuestions
    }
  } catch (error) {
    console.error(`Error in fallback query for quiz ${slug}:`, error)
    throw error
  }
}

// 优化的按需加载函数 - 修复版本
async function getCurrentQuestionData(slug, questionIndex, language = 'en') {
  try {
    console.log(`Fetching question ${questionIndex} for quiz ${slug}`)
    
    // 首先获取quiz基本信息
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('id, title, slug, category, hero_image, language')
      .eq('slug', slug)
      .eq('language', language)
      .single()

    if (quizError) {
      console.error('Quiz fetch error:', quizError)
      throw quizError
    }

    console.log('Quiz found:', quiz)

    // 获取总问题数
    const { count: totalQuestions, error: countError } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('quiz_id', quiz.id)
      .eq('language', language)

    if (countError) {
      console.error('Count error:', countError)
      throw countError
    }

    console.log(`Total questions: ${totalQuestions}`)

    // 获取当前问题 (数据库order_index从1开始)
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
      .eq('order_index', questionIndex) // 直接使用questionIndex，因为order_index从1开始
      .order('order_index', { ascending: true })

    if (questionsError) {
      console.error('Questions fetch error:', questionsError)
      throw questionsError
    }

    console.log('Questions found:', questions)

    if (!questions || questions.length === 0) {
      // 如果按索引找不到问题，尝试回退方案
      console.log('No question found by index, trying fallback...')
      const fallbackData = await getFallbackQuizData(slug, language)
      
      if (fallbackData.questions && fallbackData.questions.length > 0) {
        const questionIndex_0 = Math.min(questionIndex - 1, fallbackData.questions.length - 1)
        const currentQuestion = fallbackData.questions[questionIndex_0]
        
        return {
          id: fallbackData.id,
          title: fallbackData.title,
          slug: fallbackData.slug,
          category: fallbackData.category,
          hero_image: fallbackData.hero_image,
          language: fallbackData.language,
          currentQuestion: currentQuestion,
          totalQuestions: fallbackData.questions.length
        }
      }
      
      throw new Error(`No question found at index ${questionIndex - 1} for quiz ${slug}`)
    }

    // 格式化当前问题数据
    const currentQuestion = questions[0]
    const formattedQuestion = {
      id: currentQuestion.id,
      text: currentQuestion.text,
      image_url: currentQuestion.image_url,
      order_index: currentQuestion.order_index,
      options: currentQuestion.options
        .sort((a, b) => a.order_index - b.order_index)
        .map(option => ({
          id: option.id,
          text: option.text,
          image_url: option.image_url,
          score: option.score
        }))
    }

    return {
      id: quiz.id,
      title: quiz.title,
      slug: quiz.slug,
      category: quiz.category,
      hero_image: quiz.hero_image,
      language: quiz.language,
      currentQuestion: formattedQuestion,
      totalQuestions: totalQuestions
    }
  } catch (error) {
    console.error(`Error fetching question ${questionIndex} for quiz ${slug}:`, error)
    throw error
  }
}

// 获取测试结果配置（仅在结果页需要时调用）
async function getQuizResults(quizId, language = 'en') {
  try {
    const { data: results, error } = await supabase
      .from('quiz_results')
      .select('id, name, description, image_url, min_score, max_score, language')
      .eq('quiz_id', quizId)
      .eq('language', language)
      .order('order_index', { ascending: true })
    
    if (error) throw error
    return results || []
  } catch (error) {
    console.error(`Error fetching quiz results for quiz ${quizId}:`, error)
    throw error
  }
}

// 当前语言设置
const currentLanguage = ref('en')

// 服务端获取当前问题数据 - 优化版本
const { data: quizData, pending, error } = await useLazyAsyncData(
  `quiz-question-${slug}-${questionId}`,
  () => getCurrentQuestionData(slug, questionId, currentLanguage.value),
  {
    server: true,
    client: false, // 客户端不重新获取，提升性能
    dedupe: 'defer'
  }
)

// 如果数据不存在，显示404
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Quiz Not Found',
    message: `The quiz "${slug}" does not exist or question ${questionId} is invalid.`
  })
}

// 计算属性 - 基于优化后的数据结构
const quiz = computed(() => quizData.value)
const currentQuestion = computed(() => quiz.value?.currentQuestion || null)
const totalQuestions = computed(() => quiz.value?.totalQuestions || 0)

const questionNumber = computed(() => {
  // 验证问题编号是否在有效范围内
  if (questionId > totalQuestions.value) {
    return Math.min(questionId, totalQuestions.value) // 限制在有效范围内
  }
  return questionId
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
  if (newQuiz && newQuestionNumber && totalQuestions.value > 0) {
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

// 智能预加载下一题数据（性能优化）
onMounted(() => {
  if (process.client && quiz.value && questionNumber.value < totalQuestions.value) {
    // 仅预加载下一个页面的路由，不调用不存在的API
    const nextQuestionNumber = questionNumber.value + 1
    const nextUrl = `/quiz/${slug}/${nextQuestionNumber}`
    
    // 预加载下一个页面的路由
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = nextUrl
    document.head.appendChild(link)
    
    console.log(`Prefetching next question: ${nextUrl}`)
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
</script>