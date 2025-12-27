<!-- 动态测试首页 - SSR优化 -->
<template>
  <QuizHome 
    :quiz="quiz"
    :quiz-type="quiz?.type || 'single'"
    :is-loading="pending"
    :error="error?.message"
    :description="quizDescription"
    :hero-image="heroImage"
  >
    <!-- 额外内容插槽 - 可以添加特定测试的额外信息 -->
    <template #additional-content="{ quiz }">
      <div v-if="quiz && relatedContent.length > 0" class="mt-12 space-y-8">
        <div class="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-purple-100">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">You Might Also Like</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article 
              v-for="article in relatedContent" 
              :key="article.slug"
              class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <a :href="article.url" class="block">
                <div class="relative">
                  <img 
                    :src="article.image"
                    :alt="article.title"
                    class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  >
                  <div class="absolute top-4 left-4">
                    <span class="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {{ article.category }}
                    </span>
                  </div>
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                    {{ article.title }}
                  </h3>
                  <p class="text-gray-600 text-sm leading-relaxed">
                    {{ article.description }}
                  </p>
                </div>
              </a>
            </article>
          </div>
        </div>
      </div>
    </template>
  </QuizHome>
</template>

<script setup>
// 获取路由参数
const route = useRoute()
const slug = route.params.slug

// 定义页面类型（用于SSR优化）
definePageMeta({
  layout: 'default'
})

// 直接使用Supabase客户端获取数据
const supabase = useSupabaseClient()

// 获取测试数据的函数
async function getQuizBySlug(slug, language = 'en') {
  try {
    // 获取测试基本信息
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('id, title, slug, type, iframe_url, category_id, hero_image, language, categories(category, subcategory)')
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

// 当前语言设置
const currentLanguage = ref('en')

// 服务端获取数据 - SSR优化
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

// 动态生成测试描述
const quizDescription = computed(() => {
  if (!quiz.value) return ''
  
  const questionCount = quiz.value.questions?.length || 0
  return `Discover more about yourself with our interactive ${quiz.value.title}. Answer ${questionCount} thoughtful questions honestly and explore your inner thoughts and feelings. This quiz is designed for self-reflection and personal growth.`
})

// 动态生成Hero图片
const heroImage = computed(() => {
  if (!quiz.value) return null
  
  // 根据slug生成对应的图片路径
  const imagePath = `https://image.ricetest.net/${slug}`
  
  // 尝试不同的图片格式
  const imageFormats = ['jpg', 'jpeg', 'png', 'webp']
  
  // 暂时返回通用图片，后续可以根据实际图片添加逻辑
  return `https://image.ricetest.net/${slug}.png`
})

// 相关内容（可以根据测试类型动态调整）
const relatedContent = computed(() => {
  if (!quiz.value) return []
  
  // 根据测试主题返回相关文章
  if (slug === 'past-life-death') {
    return [
      {
        slug: 'past-life-memories',
        title: 'Signs You Have Past Life Memories',
        description: 'Discover the mysterious signs that might indicate you have memories from a previous existence.',
        category: 'Spirituality',
        image: '/quiz-images/past-life-memories.jpg',
        url: '/wiki/past-life-memories'
      },
      {
        slug: 'reincarnation-beliefs',
        title: 'Understanding Reincarnation',
        description: 'Explore different cultural and spiritual perspectives on reincarnation and afterlife.',
        category: 'Spirituality', 
        image: '/quiz-images/reincarnation.jpg',
        url: '/wiki/reincarnation-beliefs'
      }
    ]
  }
  
  // 默认返回空数组
  return []
})

// 错误处理
watch(error, (newError) => {
  if (newError) {
    console.error('Quiz loading error:', newError)
  }
})

// 预加载相关内容图片
onMounted(() => {
  if (process.client && relatedContent.value.length > 0) {
    relatedContent.value.forEach(article => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = article.image
      document.head.appendChild(link)
    })
  }
})
</script>