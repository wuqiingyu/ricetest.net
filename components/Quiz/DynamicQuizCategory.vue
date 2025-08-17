<!-- 动态Quiz分类组件 -->
<template>
  <div v-if="categoryQuizzes.length > 0" class="mb-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {{ getCategoryIcon(category) }} {{ getCategoryTitle(category) }}
      </h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        {{ getCategoryDescription(category) }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- 直接内联卡片，避免组件解析问题 -->
      <div 
        v-for="quiz in categoryQuizzes" 
        :key="quiz.id"
        class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
      >
        <div class="relative">
          <img 
            :src="quiz.hero_image"
            :alt="quiz.title"
            class="w-full h-48 md:h-48 object-cover"
            loading="lazy"
          >
          <div :class="`absolute top-4 left-4 text-white px-3 py-1 rounded-full text-xs font-bold ${getBadgeClass(quiz.category)}`">
            {{ getBadgeText(quiz.category) }}
          </div>
        </div>
        <div class="p-4 md:p-6 text-center">
          <h3 class="text-xl font-bold mb-4 md:mb-6 text-gray-900">
            {{ quiz.title }}
          </h3>
          <a 
            :href="`/quiz/${quiz.slug}`"
            :class="`block w-full font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-white ${getButtonClass(quiz.category)}`"
          >
            PLAY
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入DynamicQuizCard组件
import DynamicQuizCard from '~/components/Quiz/DynamicQuizCard.vue'

// Props
const props = defineProps({
  category: {
    type: String,
    required: true
  },
  quizzes: {
    type: Array,
    required: true
  },
  maxQuizzes: {
    type: Number,
    default: 3
  },
  specificQuizzes: {
    type: Array,
    default: () => []
  },
  language: {
    type: String,
    default: 'en'
  }
})

// 根据配置获取要显示的测试
const categoryQuizzes = computed(() => {
  // 首先过滤语言
  const languageFilteredQuizzes = props.quizzes.filter(quiz => quiz.language === props.language)
  
  // 如果指定了具体的quiz，优先使用
  if (props.specificQuizzes.length > 0) {
    const specificQuizzes = props.specificQuizzes
      .map(quizSlug => languageFilteredQuizzes.find(quiz => quiz.slug === quizSlug))
      .filter(Boolean) // 过滤掉找不到的quiz
    return specificQuizzes.slice(0, props.maxQuizzes)
  }
  
  // 过滤出当前分类的测试
  const filtered = languageFilteredQuizzes.filter(quiz => quiz.category === props.category)
  
  // 使用固定种子的伪随机排序，确保SSR和客户端一致
  const seededShuffle = (array) => {
    // 使用category作为种子，确保每个分类的顺序是固定的
    let seed = 0;
    for (let i = 0; i < props.category.length; i++) {
      seed += props.category.charCodeAt(i);
    }
    
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      seed = (seed * 9301 + 49297) % 233280;
      const j = Math.floor((seed / 233280) * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
  const shuffled = seededShuffle(filtered)
  return shuffled.slice(0, props.maxQuizzes)
})


// 根据category获取徽章样式
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

// 根据category获取按钮样式  
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

// 根据category获取徽章文本
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

// 根据category获取分类图标
const getCategoryIcon = (category) => {
  const icons = {
    personality: '🎭',
    trivia: '🧠',
    relationship: '💕',
    career: '🎯',
    entertainment: '🎬',
    lifestyle: '✨',
    celebrities: '⭐',
    history: '📚',
    sports: '⚽',
    movie: '🎥',
    geography: '🌍',
    kpop: '🎵',
    game: '🎮',
    travel: '✈️',
    funny: '😂' 
  }
  return icons[category] || '🎮'
}

// 根据category获取分类标题
const getCategoryTitle = (category) => {
  const titles = {
    personality: 'Personality',
    trivia: 'Trivia',
    relationship: 'Relationship',
    career: 'Career & Life',
    entertainment: 'Entertainment',
    lifestyle: 'Lifestyle',
    celebrities: 'Celebrity',
    history: 'History',
    sports: 'Sports',
    movie: 'Movie & TV',
    geography: 'Geography',
    kpop: 'K-Pop',
    game: 'Gaming',
    travel: 'Travel',
    funny: 'Funny'
  }
  return titles[category] || 'Quiz'
}

// 根据category获取分类描述
const getCategoryDescription = (category) => {
  const descriptions = {
    personality: 'Discover insights about your character, traits, and inner self',
    trivia: 'Test your knowledge across various topics and subjects',
    relationship: 'Understand your relationships, love style, and compatibility',
    career: 'Find your path, discover your strengths, and plan your future',
    entertainment: 'Fun quizzes about movies, TV shows, music, and pop culture',
    lifestyle: 'Explore your lifestyle choices, habits, and preferences',
    celebrities: 'Which celebrity do you match? Test your star knowledge',
    history: 'Journey through time with historical facts and events',
    sports: 'Athletic knowledge and sports personality assessments',
    movie: 'Cinema and television entertainment quizzes',
    geography: 'Explore the world through location-based challenges',
    kpop: 'Korean pop culture and music personality tests',
    game: 'Gaming knowledge and gamer personality assessments',
    travel: 'Wanderlust and destination-based personality quizzes'
  }
  return descriptions[category] || 'Explore your knowledge and personality'
}
</script>