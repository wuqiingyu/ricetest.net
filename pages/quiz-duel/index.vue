<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <!-- QuizDuel iframe container -->
    <div class="quiz-duel-container">
      <iframe
        src="https://games.blrssco.com/quiz-star/v1.0.1/index.html"
        class="quiz-duel-iframe"
        frameborder="0"
        allowfullscreen
        loading="lazy"
        title="QuizDuel Game"
      >
      </iframe>
    </div>
  </div>
</template>

<script setup>
// Meta tags for SEO
useHead({
  title: 'QuizDuel - Online Quiz Battle | RiceTest',
  meta: [
    { name: 'description', content: 'Challenge friends and players worldwide in QuizDuel - the ultimate online quiz battle game. Test your knowledge across various topics in real-time competitions.' },
    { name: 'keywords', content: 'quiz duel, online quiz battle, quiz game, multiplayer quiz, knowledge battle, quiz competition, trivia duel' },
    { property: 'og:title', content: 'QuizDuel - Online Quiz Battle | RiceTest' },
    { property: 'og:description', content: 'Challenge friends and players worldwide in QuizDuel - the ultimate online quiz battle game.' },
    { property: 'og:image', content: 'https://ricetest.net/ricetestsicon.png' },
    { property: 'og:url', content: 'https://ricetest.net/quiz-duel' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'QuizDuel - Online Quiz Battle | RiceTest' },
    { name: 'twitter:description', content: 'Challenge friends and players worldwide in QuizDuel - the ultimate online quiz battle game.' },
    { name: 'twitter:image', content: 'https://ricetest.net/ricetestsicon.png' }
  ],
  link: [
    { rel: 'canonical', href: 'https://ricetest.net/quiz-duel' }
  ]
})
</script>

<style scoped>
.quiz-duel-container {
  width: 80vw;
  height: 80vh;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  background: white;
}

.quiz-duel-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  border-radius: 12px;
}

/* 确保页面正常滚动 */
.min-h-screen {
  min-height: 100vh;
  padding: 2rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .quiz-duel-container {
    width: 95vw;
    height: 85vh;
  }
  
  .min-h-screen {
    padding: 1rem;
  }
}
</style>