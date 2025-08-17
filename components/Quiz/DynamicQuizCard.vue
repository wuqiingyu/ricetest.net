<!-- 动态Quiz卡片组件 -->
<template>
  <div class="quiz-card">
    <div class="relative">
      <img 
        :src="quiz.hero_image || getDefaultImage(quiz.category)"
        :alt="quiz.title"
        class="quiz-card-image"
        loading="lazy"
        @error="handleImageError"
      >
      <div :class="`quiz-card-badge ${getBadgeClass(quiz.category)}`">
        {{ getBadgeText(quiz.category) }}
      </div>
    </div>
    <div class="quiz-card-content">
      <h3 class="quiz-card-title available">
        {{ quiz.title }}
      </h3>
      <a 
        :href="`/quiz/${quiz.slug}`"
        class="quiz-card-button play"
        :class="getButtonClass(quiz.category)"
      >
        PLAY
      </a>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  quiz: {
    type: Object,
    required: true
  }
})

// 根据category获取默认图片
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

// 处理图片加载错误
const handleImageError = (event) => {
  event.target.src = getDefaultImage(props.quiz.category)
}

// 根据category获取徽章样式
const getBadgeClass = (category) => {
  const badgeClasses = {
    personality: 'personality',
    trivia: 'trivia', 
    relationship: 'relationship',
    career: 'career',
    entertainment: 'entertainment',
    lifestyle: 'lifestyle'
  }
  return badgeClasses[category] || 'default'
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

// 根据category获取按钮样式
const getButtonClass = (category) => {
  const buttonClasses = {
    personality: 'purple',
    trivia: 'blue',
    relationship: 'pink',
    career: 'teal',
    entertainment: 'orange',
    lifestyle: 'green'
  }
  return buttonClasses[category] || 'blue'
}
</script>

<style scoped>
/* 复用原有的quiz-card样式 */
.quiz-card {
  @apply bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden;
}

.quiz-card-image {
  @apply w-full h-48 md:h-48 object-cover;
  aspect-ratio: 16/9;
}

.quiz-card-content {
  padding: 1rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 140px !important; /* 固定内容区域高度 */
}

@media (min-width: 768px) {
  .quiz-card-content {
    padding: 1.5rem;
  }
}

.quiz-card-title {
  font-size: 1.25rem;
  font-weight: bold;
  height: 3.5rem !important; /* 固定2行高度 */
  line-height: 1.75rem !important; /* 每行1.75rem高度 */
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  margin-bottom: 0.5rem !important;
  padding-top: 0.25rem;
}

.quiz-card-title.available {
  color: #111827;
}

.quiz-card-button {
  display: block;
  width: 100%;
  font-weight: bold;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  transition: all 0.3s ease;
  transform: scale(1);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  color: white;
  margin-top: auto !important; /* 推到底部 */
}

.quiz-card-button:hover {
  transform: scale(1.05);
}

.quiz-card-button.play.purple {
  @apply bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700;
}

.quiz-card-button.play.blue {
  @apply bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700;
}

.quiz-card-button.play.pink {
  @apply bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700;
}

.quiz-card-button.play.teal {
  @apply bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700;
}

.quiz-card-button.play.orange {
  @apply bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700;
}

.quiz-card-button.play.green {
  @apply bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700;
}

.quiz-card-badge {
  @apply absolute top-4 left-4 text-white px-3 py-1 rounded-full text-xs font-bold;
}

.quiz-card-badge.personality {
  @apply bg-purple-500;
}

.quiz-card-badge.trivia {
  @apply bg-blue-500;
}

.quiz-card-badge.relationship {
  @apply bg-pink-500;
}

.quiz-card-badge.career {
  @apply bg-teal-500;
}

.quiz-card-badge.entertainment {
  @apply bg-orange-500;
}

.quiz-card-badge.lifestyle {
  @apply bg-green-500;
}

.quiz-card-badge.default {
  @apply bg-gray-500;
}
</style>