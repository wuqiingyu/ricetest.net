<template>
  <!-- Hero Section -->
  <div class="bg-gradient-to-b from-blue-100 via-blue-50 to-white py-12 md:py-16 relative overflow-hidden diamond-stars-bg">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <!-- Main Title -->
      <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
        Rice Purity Test
      </h1>
      
      <!-- Subtitle/Description -->
      <p class="text-base md:text-lg lg:text-xl text-gray-600 mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed">
        Discover yourself through personality tests and fun quizzes! Take the famous Rice Purity Test and explore your traits, compatibility, and life experiences. Fun, easy, and perfect for sharing with friends!
      </p>
      
      <!-- Media Coverage - 压缩高度 -->
      <div class="mb-4 space-y-0 flex flex-col justify-center">
        <!-- New York Times Coverage -->
        <div class="flex justify-center">
          <img 
            src="/new-york-times.webp" 
            alt="New York Times Coverage of Rice Purity Test"
            class="max-w-lg lg:max-w-xl w-full h-auto max-h-24 md:max-h-32 object-contain"
            loading="lazy"
          />
        </div>
        
        <!-- Partners Coverage -->
        <div class="flex justify-center">
          <img 
            src="/partnersWithoutNewYorkTime.webp" 
            alt="Media Partners Coverage of Rice Purity Test"
            class="max-w-lg lg:max-w-xl w-full h-auto max-h-24 md:max-h-32 object-contain"
            loading="lazy"
          />
        </div>
      </div>
      
      <!-- Enhanced Scroll Arrow -->
      <div class="flex flex-col items-center space-y-2 md:space-y-4 cursor-pointer hover:opacity-80 transition-opacity mt-4 md:mt-6" @click="scrollToTest()">
        <span class="text-xs md:text-sm text-gray-600 font-semibold tracking-widest uppercase">Start Test</span>
        <div class="animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:h-8 md:w-8 h-6 w-6 text-gray-600" aria-hidden="true">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- Test Progress Section -->
  <div id="test-progress" class="max-w-4xl mx-auto px-4 py-2">
    <TestProgress 
      :current-question="currentQuestion"
      :total-questions="questions.length"
      :show-percentage="true"
    />
  </div>

  <!-- Main Content -->
  <main id="main-content" class="max-w-4xl mx-auto px-4 py-8">
      <div class="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/30 apple-glass">
        <!-- Questions Display -->
        <div 
          class="relative overflow-hidden px-4 md:px-6 py-4 md:py-6 bg-gradient-to-b from-white/40 via-white/60 to-white/40"
          style="min-height: 400px;"
          @wheel="handleWheel"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          @touchstart="handleTouchStart" 
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <div 
            class="transition-transform duration-200 ease-out"
            :style="{ transform: `translateY(${scrollOffset}px)` }"
          >
            <!-- 固定显示5个位置 -->
            <div 
              v-for="position in 5" 
              :key="position"
              class="flex flex-col items-start justify-center h-[100px] transition-all duration-300 ease-in-out"
              :class="getPositionClasses(position)"
            >
              <div v-if="getQuestionAtPosition(position)" class="text-left px-6 w-full">
                <div class="flex items-start gap-3">
                  <span class="flex-shrink-0 min-w-[2.5rem]" :class="getPositionNumberClasses(position)">
                    {{ getQuestionIndexAtPosition(position) + 1 }}.
                  </span>
                  <span class="flex-1" :class="getPositionTextClasses(position)">
                    Have you {{ getQuestionAtPosition(position).toLowerCase() }}
                  </span>
                </div>
                <div v-if="answers[getQuestionIndexAtPosition(position)] !== undefined" class="mt-2 flex justify-start ml-10">
                  <span 
                    class="px-2 py-1 text-xs rounded-full" 
                    :class="answers[getQuestionIndexAtPosition(position)] ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'"
                  >
                    {{ answers[getQuestionIndexAtPosition(position)] ? 'Yes' : 'No' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Answer Buttons -->
        <div class="bg-white/30 backdrop-blur-sm px-6 py-6 border-t border-white/20">
          <div class="flex justify-center space-x-6">
            <button 
              @click="answerQuestion(false)"
              @touchstart.stop
              @touchend.stop
              :disabled="isTransitioning"
              class="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-green-400"
            >
              No
            </button>
            <button 
              @click="answerQuestion(true)"
              @touchstart.stop
              @touchend.stop
              :disabled="isTransitioning"
              class="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-red-400"
            >
              Yes
            </button>
          </div>
        </div>

        <!-- Question Counter -->
        <div class="bg-white/20 backdrop-blur-sm px-6 py-4 border-t border-white/20 text-center">
          <div class="text-sm text-gray-600">
            Question {{ currentQuestion + 1 }} of {{ questions.length }}
          </div>
        </div>
      </div>

      <!-- Results -->
      <div v-if="isComplete" id="results-section" class="mt-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 relative overflow-hidden border-2 border-blue-200 certificate-bg">
          <!-- 认证专家印章背景 -->
          <div class="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
            <img 
              src="/certifiedexpert.png" 
              alt="Certified Expert Stamp"
              class="w-full max-w-md object-contain"
            />
          </div>
          
          <!-- 专家认证勾 -->
          <div class="absolute top-4 left-4 w-12 h-12 z-20">
            <img 
              src="/expertcertification.png" 
              alt="Expert Certification"
              class="w-full h-full object-contain drop-shadow-lg expert-certification"
            />
          </div>
          
          <!-- 撒花动画背景 -->
          <div class="absolute inset-0 pointer-events-none z-5">
            <div class="confetti-container">
              <div v-for="n in 30" :key="n" class="confetti" :style="getConfettiStyle(n)"></div>
            </div>
          </div>
          
          <!-- 结果内容 -->
          <div class="relative z-10 pt-8">
            <!-- 第一行：标题 -->
            <div class="text-center mb-6">
              <h2 class="text-3xl font-bold text-gray-800 mb-3">Rice Purity Test</h2>
              <div class="bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 rounded-lg px-4 py-2 inline-block certified-badge">
                <p class="text-amber-800 font-semibold text-sm">✓ Certified Results</p>
              </div>
            </div>
            
            <!-- 第二行：分数 -->
            <div class="text-center mb-6">
              <div class="relative inline-block">
                <div class="bg-gray-100/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200/50 relative">
                  <div class="text-6xl font-bold text-red-600">{{ score }}<span class="text-3xl opacity-80 text-gray-600">/100</span></div>
                  <div class="absolute -top-2 -right-2 bg-amber-400 text-amber-900 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 第三行：分类评级 -->
            <div class="text-center mb-8">
              <div class="text-3xl font-bold text-gray-800 mb-2">{{ getScoreDescription(score) }}</div>
            </div>
            
            <!-- 第四行：操作按钮 -->
            <div class="flex gap-4 justify-center">
              <button 
                @click="resetTest()"
                class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Take Test Again
              </button>
              
              <button 
                @click="showShareModal = true"
                class="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Share Results
              </button>
            </div>
          </div>
        </div>

      <!-- Share Modal -->
      <div v-if="showShareModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showShareModal = false">
        <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl" @click.stop>
          <div class="text-center mb-6">
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Share Your Results</h3>
            <p class="text-gray-600">Choose a platform to share your Rice Purity Test score</p>
          </div>
          
          <!-- Share Options -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <!-- Twitter/X -->
            <button 
              @click="shareToTwitter()"
              class="flex flex-col items-center p-4 bg-black hover:bg-gray-800 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <div class="text-2xl mb-2">𝕏</div>
              <span class="text-sm font-medium">Twitter / X</span>
            </button>
            
            <!-- Facebook -->
            <button 
              @click="shareToFacebook()"
              class="flex flex-col items-center p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <div class="text-2xl mb-2">📘</div>
              <span class="text-sm font-medium">Facebook</span>
            </button>
            
            <!-- Instagram Stories -->
            <button 
              @click="shareToInstagram()"
              class="flex flex-col items-center p-4 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <div class="text-2xl mb-2">📷</div>
              <span class="text-sm font-medium">Instagram</span>
            </button>
            
            <!-- WhatsApp -->
            <button 
              @click="shareToWhatsApp()"
              class="flex flex-col items-center p-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <div class="text-2xl mb-2">💬</div>
              <span class="text-sm font-medium">WhatsApp</span>
            </button>
            
            <!-- TikTok -->
            <button 
              @click="shareToTikTok()"
              class="flex flex-col items-center p-4 bg-black hover:bg-gray-800 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <div class="text-2xl mb-2">🎵</div>
              <span class="text-sm font-medium">TikTok</span>
            </button>
            
            <!-- Copy Link -->
            <button 
              @click="copyShareLink()"
              class="flex flex-col items-center p-4 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <div class="text-2xl mb-2">🔗</div>
              <span class="text-sm font-medium">Copy Link</span>
            </button>
          </div>
          
          
          <!-- Close Button -->
          <button 
            @click="showShareModal = false"
            class="w-full p-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl transition-all duration-300 font-medium"
          >
            Close
          </button>
        </div>
      </div>

      <!-- What is Rice Purity Test -->
      <div class="mt-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-blue-100">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">What is the Rice Purity Test?</h2>
        <div class="text-gray-600 mb-8 space-y-5 text-base leading-relaxed">
          <p>
            The Rice Purity Test is a super famous quiz that started at Rice University way back in 1924! 
            This rice test began as a simple 10-question quiz in the school newspaper, but now it's a big 100-question survey that millions of people take.
          </p>
          
          <p>
            Originally, this Rice Purity Test was just for college students to have fun and make friends during their first week at school. 
            But now, people everywhere take this rice test to learn about themselves and share laughs with friends. 
            It's like a fun game that helps you think about your life experiences!
          </p>
          
          <p class="text-lg font-medium text-gray-700 text-center bg-gray-50 p-4 rounded-lg">
            💡 Remember: The Rice Purity Test is just for fun! There's no "good" or "bad" score - everyone's life is different and special!
          </p>
        </div>
      </div>

      <!-- How to Take the Test -->
      <div class="mt-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-blue-100">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">How to Take the Rice Purity Test</h2>
        <div class="text-gray-600 mb-8 space-y-5 text-base leading-relaxed">
          <p class="text-lg text-gray-700 font-medium">
            Taking the Rice Purity Test is super easy! Here's how to complete this rice test and get your score:
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
              <h3 class="font-semibold text-blue-900 mb-3 flex items-center">
                <span class="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">1</span>
                Start the Rice Test
              </h3>
              <p class="text-blue-800 text-sm">
                Click "Start Test" or scroll down to begin your Rice Purity Test. You'll see the first question right in the middle!
              </p>
            </div>
            
            <div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
              <h3 class="font-semibold text-green-900 mb-3 flex items-center">
                <span class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">2</span>
                Answer Questions
              </h3>
              <p class="text-green-800 text-sm">
                For each Rice Purity Test question, click <strong>"Yes"</strong> if you've done it or <strong>"No"</strong> if you haven't. Be honest to get the best results!
              </p>
            </div>
            
            <div class="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
              <h3 class="font-semibold text-purple-900 mb-3 flex items-center">
                <span class="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">3</span>
                Navigate Through Questions
              </h3>
              <p class="text-purple-800 text-sm">
                Use your <strong>mouse wheel</strong> or <strong>swipe up and down</strong> on your phone to move between Rice Purity Test questions. The rice test moves to the next question automatically!
              </p>
            </div>
            
            <div class="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
              <h3 class="font-semibold text-orange-900 mb-3 flex items-center">
                <span class="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">4</span>
                Get Your Score
              </h3>
              <p class="text-orange-800 text-sm">
                After finishing all 100 Rice Purity Test questions, you'll see your rice test score right away with a fun explanation of what it means!
              </p>
            </div>
          </div>
          
          <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 class="font-semibold text-gray-800 mb-4 flex items-center">
              🖱️ Navigation Tips
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 class="font-medium text-gray-700 mb-2">Desktop Users:</h4>
                <ul class="text-gray-600 space-y-1">
                  <li>• Use your <strong>mouse wheel</strong> to scroll through questions</li>
                  <li>• Click <strong>Yes/No buttons</strong> to answer</li>
                  <li>• Progress bar shows completion status</li>
                  <li>• Questions display in a smooth carousel format</li>
                </ul>
              </div>
              <div>
                <h4 class="font-medium text-gray-700 mb-2">Mobile Users:</h4>
                <ul class="text-gray-600 space-y-1">
                  <li>• <strong>Swipe up/down</strong> to navigate questions</li>
                  <li>• <strong>Quick swipe</strong> for fast navigation</li>
                  <li>• <strong>Long press</strong> for continuous scrolling</li>
                  <li>• Tap <strong>Yes/No buttons</strong> to answer</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div class="flex items-start">
              <span class="text-yellow-600 text-xl mr-3">💡</span>
              <div>
                <h4 class="font-semibold text-yellow-900 mb-2">Pro Tips</h4>
                <ul class="text-yellow-800 text-sm space-y-1">
                  <li>• Take your time - there's no rush to complete the test</li>
                  <li>• Be honest with your answers for the most accurate score</li>
                  <li>• You can see previous questions faded in the background</li>
                  <li>• Your answers are completely private and not stored anywhere</li>
                  <li>• You can retake the test anytime by clicking "Take Test Again"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Understanding the Test -->
      <div class="mt-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-blue-100">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Understanding Your Rice Purity Test</h2>
        
        <!-- How It Works Section -->
        <div class="mb-8">
          <div class="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <h3 class="font-semibold text-blue-900 mb-4 text-xl flex items-center">
              <span class="text-2xl mr-3">🎯</span>How It Works
            </h3>
            <div class="text-blue-800 space-y-3">
              <p>
                The Rice Purity Test has 100 simple yes-or-no questions about different life experiences. 
                This rice test covers lots of different topics that everyone can relate to:
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <ul class="space-y-2 text-sm">
                  <li class="flex items-center"><span class="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Dating & Relationships</li>
                  <li class="flex items-center"><span class="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Romantic Interactions</li>
                  <li class="flex items-center"><span class="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Sexual Experiences</li>
                  <li class="flex items-center"><span class="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Substance Use</li>
                </ul>
                <ul class="space-y-2 text-sm">
                  <li class="flex items-center"><span class="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Academic Life</li>
                  <li class="flex items-center"><span class="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Social Behavior</li>
                  <li class="flex items-center"><span class="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Personal Conduct</li>
                  <li class="flex items-center"><span class="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Life Milestones</li>
                </ul>
              </div>
              <p class="bg-blue-100 p-3 rounded-lg">
                <strong>How Rice Test Scoring Works:</strong> Your rice test score = 100 - (Number of "Yes" answers)<br>
                Just click "Yes" if you've done something, "No" if you haven't. The Rice Purity Test calculates your score automatically!
              </p>
            </div>
          </div>
        </div>
        
        <!-- Score Meanings Section -->
        <div class="mb-8">
          <div class="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 class="font-semibold text-green-900 mb-4 text-xl flex items-center">
              <span class="text-2xl mr-3">📊</span>Score Meanings & Interpretations
            </h3>
            <div class="space-y-4">
              <p class="text-green-800 mb-4">
                Your Rice Purity Score reflects the breadth of your life experiences. Here's what different score ranges typically indicate:
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-3">
                  <div class="bg-white p-4 rounded-lg border border-green-300">
                    <div class="flex justify-between items-center mb-2">
                      <span class="font-bold text-green-900">98-100</span>
                      <span class="text-sm bg-green-200 text-green-800 px-2 py-1 rounded-full">Extremely Pure</span>
                    </div>
                    <p class="text-sm text-green-700">Very limited life experiences, likely younger individuals or those with conservative lifestyles.</p>
                  </div>
                  <div class="bg-white p-4 rounded-lg border border-green-300">
                    <div class="flex justify-between items-center mb-2">
                      <span class="font-bold text-green-900">91-97</span>
                      <span class="text-sm bg-green-200 text-green-800 px-2 py-1 rounded-full">Very Pure</span>
                    </div>
                    <p class="text-sm text-green-700">Minimal experiences, possibly high school or early college level.</p>
                  </div>
                  <div class="bg-white p-4 rounded-lg border border-green-300">
                    <div class="flex justify-between items-center mb-2">
                      <span class="font-bold text-green-900">77-90</span>
                      <span class="text-sm bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">Average</span>
                    </div>
                    <p class="text-sm text-green-700">Typical college experiences, balanced lifestyle with some adventures.</p>
                  </div>
                </div>
                <div class="space-y-3">
                  <div class="bg-white p-4 rounded-lg border border-green-300">
                    <div class="flex justify-between items-center mb-2">
                      <span class="font-bold text-green-900">45-76</span>
                      <span class="text-sm bg-orange-200 text-orange-800 px-2 py-1 rounded-full">Worldly</span>
                    </div>
                    <p class="text-sm text-green-700">Diverse life experiences, active social life, explored various aspects of life.</p>
                  </div>
                  <div class="bg-white p-4 rounded-lg border border-green-300">
                    <div class="flex justify-between items-center mb-2">
                      <span class="font-bold text-green-900">9-44</span>
                      <span class="text-sm bg-red-200 text-red-800 px-2 py-1 rounded-full">Experienced</span>
                    </div>
                    <p class="text-sm text-green-700">Extensive life experiences across multiple categories.</p>
                  </div>
                  <div class="bg-white p-4 rounded-lg border border-green-300">
                    <div class="flex justify-between items-center mb-2">
                      <span class="font-bold text-green-900">0-8</span>
                      <span class="text-sm bg-red-200 text-red-800 px-2 py-1 rounded-full">Very Experienced</span>
                    </div>
                    <p class="text-sm text-green-700">Extremely diverse experiences, lived life to the fullest.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Important Notes Section -->
        <div class="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h3 class="font-semibold text-purple-900 mb-4 text-xl flex items-center">
            <span class="text-2xl mr-3">⚠️</span>Important Notes & Disclaimers
          </h3>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-purple-900 mb-3">🎭 Entertainment Purpose</h4>
                <ul class="text-purple-800 text-sm space-y-2">
                  <li>• This is NOT a scientific psychological assessment</li>
                  <li>• Results should be taken with humor and lightness</li>
                  <li>• Designed for social bonding and self-reflection</li>
                  <li>• Not meant to judge or evaluate personal worth</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-purple-900 mb-3">🔒 Privacy & Safety</h4>
                <ul class="text-purple-800 text-sm space-y-2">
                  <li>• All answers are completely anonymous</li>
                  <li>• No data is stored or transmitted</li>
                  <li>• Take the test in a private, comfortable setting</li>
                  <li>• You can stop or restart anytime</li>
                </ul>
              </div>
            </div>
            <div class="bg-purple-100 p-4 rounded-lg border border-purple-300">
              <h4 class="font-semibold text-purple-900 mb-2 flex items-center">
                <span class="mr-2">💜</span>Remember
              </h4>
              <p class="text-purple-800 text-sm">
                Every person's life journey is unique and valuable. A higher score doesn't make you "better" than someone with a lower score, 
                and vice versa. The Rice Purity Test is simply a fun way to reflect on your experiences and connect with others. 
                <strong>There's no "right" or "wrong" score - only your personal story!</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Complete Questions List -->
      <div class="mt-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-blue-100">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">The Complete 100 Questions</h2>
        <p class="text-gray-600 mb-6">
          Here are all 100 questions from the Rice Purity Test. Each question is phrased as "Have you..." and you simply answer Yes or No based on your life experiences.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(question, index) in questions" :key="index" class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <span class="font-semibold text-blue-600 text-sm">{{ index + 1 }}.</span>
            <span class="text-gray-700 text-sm">Have you {{ question.toLowerCase() }}</span>
          </div>
        </div>
      </div>

      <!-- Frequently Asked Questions -->
      <div class="mt-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-blue-100">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        
        <div class="space-y-6">
          <!-- Question 1 -->
          <div class="border-b border-gray-200 pb-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span class="text-blue-600 mr-3">Q1:</span>
              Is the Rice Purity Test real or just a joke?
            </h3>
            <div class="text-gray-600 bg-gray-50 p-4 rounded-lg">
              <p class="mb-3">
                Yes, the Rice Purity Test is totally real! This rice test has been around since 1924 when it first appeared 
                in Rice University's newspaper. What started as a simple school tradition has become a famous quiz that millions take today.
              </p>
              <p>
                While the Rice Purity Test began as a serious school activity, now people everywhere take this rice test just for fun and to bond with friends. 
                So yes, it's real - but it's also meant to be super enjoyable!
              </p>
            </div>
          </div>

          <!-- Question 2 -->
          <div class="border-b border-gray-200 pb-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span class="text-blue-600 mr-3">Q2:</span>
              What is considered a "good" score on the Rice Purity Test?
            </h3>
            <div class="text-gray-600 bg-gray-50 p-4 rounded-lg">
              <p class="mb-3">
                There's no "good" or "bad" Rice Purity Test score - it all depends on your personal experiences and age! 
                Here's what rice test scores usually look like:
              </p>
              <ul class="list-disc list-inside space-y-2 mb-3">
                <li><strong>High school students:</strong> Usually get rice test scores between 85-95</li>
                <li><strong>College students:</strong> Rice Purity Test scores usually range from 60-85</li>
                <li><strong>Young adults (20s-30s):</strong> Often get rice test scores between 40-70</li>
                <li><strong>Older adults:</strong> Rice Purity Test scores vary a lot based on life experiences</li>
              </ul>
              <p class="text-blue-700 font-medium">
                Remember: Your Rice Purity Test score just shows your unique life story - there's no "perfect" rice test score to aim for!
              </p>
            </div>
          </div>

          <!-- Question 3 -->
          <div class="border-b border-gray-200 pb-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span class="text-blue-600 mr-3">Q3:</span>
              Is the Rice Purity Test suitable for all ages?
            </h3>
            <div class="text-gray-600 bg-gray-50 p-4 rounded-lg">
              <p class="mb-3">
                The Rice Purity Test is made for <strong>older teens and adults</strong> - it's not suitable for little kids. 
                This rice test asks questions about:
              </p>
              <ul class="list-disc list-inside space-y-1 mb-3">
                <li>Sexual experiences and intimate relationships</li>
                <li>Substance use including alcohol and drugs</li>
                <li>Adult situations and behaviors</li>
                <li>Legal and ethical boundary-crossing activities</li>
              </ul>
              <p class="text-orange-700 font-medium">
                <strong>Best age for Rice Purity Test:</strong> 18+ or mature high schoolers who understand what the rice test is about.
              </p>
            </div>
          </div>

          <!-- Question 4 -->
          <div class="border-b border-gray-200 pb-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span class="text-blue-600 mr-3">Q4:</span>
              How accurate and reliable are the Rice Purity Test results?
            </h3>
            <div class="text-gray-600 bg-gray-50 p-4 rounded-lg">
              <p class="mb-3">
                The Rice Purity Test is <strong>NOT</strong> a scientifically validated psychological assessment. It's important to understand:
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div class="bg-red-50 p-3 rounded border border-red-200">
                  <h4 class="font-semibold text-red-800 mb-2">What it's NOT:</h4>
                  <ul class="text-red-700 text-sm space-y-1">
                    <li>• A psychological evaluation</li>
                    <li>• A measure of moral worth</li>
                    <li>• A predictor of future behavior</li>
                    <li>• A diagnostic tool</li>
                  </ul>
                </div>
                <div class="bg-green-50 p-3 rounded border border-green-200">
                  <h4 class="font-semibold text-green-800 mb-2">What it IS:</h4>
                  <ul class="text-green-700 text-sm space-y-1">
                    <li>• A fun social activity</li>
                    <li>• A conversation starter</li>
                    <li>• A reflection tool</li>
                    <li>• Entertainment</li>
                  </ul>
                </div>
              </div>
              <p class="text-purple-700 font-medium">
                Think of it as a fun icebreaker rather than a serious assessment of your character or life choices.
              </p>
            </div>
          </div>

          <!-- Question 5 -->
          <div class="border-b border-gray-200 pb-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span class="text-blue-600 mr-3">Q5:</span>
              Is my data private and secure when taking the test?
            </h3>
            <div class="text-gray-600 bg-gray-50 p-4 rounded-lg">
              <p class="mb-3">
                Yes! Your privacy is completely protected when using our Rice Purity Test:
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div class="bg-blue-50 p-3 rounded border border-blue-200">
                  <h4 class="font-semibold text-blue-800 mb-2">🔒 Privacy Features:</h4>
                  <ul class="text-blue-700 text-sm space-y-1">
                    <li>• No registration required</li>
                    <li>• No personal information collected</li>
                    <li>• Answers stored only in your browser</li>
                    <li>• No data transmission to servers</li>
                  </ul>
                </div>
                <div class="bg-green-50 p-3 rounded border border-green-200">
                  <h4 class="font-semibold text-green-800 mb-2">✅ Your Control:</h4>
                  <ul class="text-green-700 text-sm space-y-1">
                    <li>• Take test completely anonymously</li>
                    <li>• Clear data anytime</li>
                    <li>• No cookies or tracking</li>
                    <li>• Results stay on your device</li>
                  </ul>
                </div>
              </div>
              <p class="text-green-700 font-medium">
                Your answers are as private as your own thoughts - we never see or store them!
              </p>
            </div>
          </div>

          <!-- Question 6 -->
          <div class="border-b border-gray-200 pb-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span class="text-blue-600 mr-3">Q6:</span>
              How should I interpret my Rice Purity Test score?
            </h3>
            <div class="text-gray-600 bg-gray-50 p-4 rounded-lg">
              <p class="mb-3">
                Your Rice Purity Test score is simply a snapshot of your life experiences up to this point. Here's how to think about it:
              </p>
              <div class="space-y-3">
                <div class="bg-yellow-50 p-3 rounded border border-yellow-200">
                  <h4 class="font-semibold text-yellow-800 mb-2">🎯 Healthy Perspective:</h4>
                  <ul class="text-yellow-700 text-sm space-y-1">
                    <li>• View it as a fun reflection of your journey</li>
                    <li>• Compare with friends lightheartedly</li>
                    <li>• Use it as a conversation starter</li>
                    <li>• Celebrate your unique path</li>
                  </ul>
                </div>
                <div class="bg-red-50 p-3 rounded border border-red-200">
                  <h4 class="font-semibold text-red-800 mb-2">⚠️ Avoid These Mindsets:</h4>
                  <ul class="text-red-700 text-sm space-y-1">
                    <li>• Don't judge others based on their scores</li>
                    <li>• Don't feel pressure to change your lifestyle</li>
                    <li>• Don't take it as a measure of your worth</li>
                    <li>• Don't use it for serious life decisions</li>
                  </ul>
                </div>
              </div>
              <p class="text-indigo-700 font-medium mt-3">
                Remember: Life is not a competition, and everyone's journey is valid and valuable!
              </p>
            </div>
          </div>

          <!-- Question 7 -->
          <div>
            <h3 class="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span class="text-blue-600 mr-3">Q7:</span>
              Can I retake the test? Will my score change over time?
            </h3>
            <div class="text-gray-600 bg-gray-50 p-4 rounded-lg">
              <p class="mb-3">
                Absolutely! You can retake the Rice Purity Test as many times as you'd like. In fact, it can be interesting to see how your score evolves:
              </p>
              <div class="space-y-3">
                <div class="bg-blue-50 p-3 rounded border border-blue-200">
                  <h4 class="font-semibold text-blue-800 mb-2">📈 Score Evolution:</h4>
                  <ul class="text-blue-700 text-sm space-y-1">
                    <li>• Scores typically decrease (more experiences) over time</li>
                    <li>• Major life transitions often cause score changes</li>
                    <li>• College years usually see the most dramatic shifts</li>
                    <li>• Some people's scores stabilize in their 20s-30s</li>
                  </ul>
                </div>
                <div class="bg-green-50 p-3 rounded border border-green-200">
                  <h4 class="font-semibold text-green-800 mb-2">🔄 Retaking Tips:</h4>
                  <ul class="text-green-700 text-sm space-y-1">
                    <li>• Take it annually to track changes</li>
                    <li>• Compare with friends over time</li>
                    <li>• Use it as a reflection tool</li>
                    <li>• Remember: change is normal and healthy</li>
                  </ul>
                </div>
              </div>
              <p class="text-purple-700 font-medium mt-3">
                Click "Take Test Again" anytime to get a fresh start with your current experiences!
              </p>
            </div>
          </div>
        </div>
      </div>
  </main>
</template>

<script setup>
import riceTestData from '~/data/rice-test.json'

// 获取URL参数中的分数
const route = useRoute()
const sharedScore = computed(() => {
  return route.query.score ? parseInt(route.query.score) : null
})

// 动态SEO Meta
const metaTitle = computed(() => {
  if (sharedScore.value) {
    return `Rice Purity Test Results - Score: ${sharedScore.value}/100`
  }
  return 'RiceTest - Personality Tests & Fun Quizzes | Discover Yourself'
})

const metaDescription = computed(() => {
  if (sharedScore.value) {
    const description = getScoreDescription(sharedScore.value)
    return `Just scored ${sharedScore.value}/100 on the Rice Purity Test! I'm "${description}". Take the test yourself!`
  }
  return 'RiceTest is your go-to destination for personality tests and fun quizzes. Discover your traits, compatibility, and life experiences. Take the famous Rice Purity Test and more!'
})

const metaImage = computed(() => {
  if (sharedScore.value) {
    return `https://ricetest.net/api/share-image?score=${sharedScore.value}`
  }
  return 'https://ricetest.net/ricetestsicon.png'
})

useHead({
  title: metaTitle,
  meta: [
    { name: 'description', content: metaDescription },
    { name: 'keywords', content: 'ricetest, rice purity test, personality test, online quiz, fun tests, personality assessment, compatibility quiz, discover yourself' },
    { property: 'og:title', content: metaTitle },
    { property: 'og:description', content: metaDescription },
    { property: 'og:image', content: metaImage },
    { property: 'og:url', content: 'https://ricetest.net' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: metaTitle },
    { name: 'twitter:description', content: metaDescription },
    { name: 'twitter:image', content: metaImage }
  ]
})

// Reactive data
const questions = ref(riceTestData.questions)
const currentQuestion = ref(0)
const answers = ref({})
const score = ref(100)
const isTransitioning = ref(false)
const showShareModal = ref(false)

// 滚动和滑动相关状态
const lastScrollTime = ref(0)
const scrollCooldown = 100
const wheelDelta = ref(0)
const wheelTimeout = ref(null)
const isInTestArea = ref(false)

// 触屏惯性滚动相关状态
const touchStartY = ref(0)
const touchStartX = ref(0)
const touchStartTime = ref(0)
const touchMoveY = ref(0)
const touchMoveTime = ref(0)
const velocityHistory = ref([])
const isInertiaScrolling = ref(false)
const inertiaAnimation = ref(null)

// 长按滚动相关状态
const longPressTimer = ref(null)
const isLongPressing = ref(false)
const longPressScrollTimer = ref(null)

// 滚动模式检测
const isQuickSwipe = ref(false)
const swipeStartTime = ref(0)
const totalSwipeDistance = ref(0)

// 滚动位置和动画状态
const scrollOffset = ref(0) // 滚动偏移量（像素）
const isScrolling = ref(false)
const scrollVelocity = ref(0) // 当前滚动速度

// Computed properties
const progress = computed(() => {
  const answeredCount = Object.keys(answers.value).length
  return (answeredCount / questions.value.length) * 100
})

const isComplete = computed(() => {
  const totalQuestions = questions.value.length
  const answeredQuestions = Object.keys(answers.value).length
  return answeredQuestions === totalQuestions
})

// 获取指定位置的题目内容（位置3是当前题目，固定在中间）
const getQuestionAtPosition = (position) => {
  const offset = position - 3 // 位置3是中间位置
  const questionIndex = currentQuestion.value + offset
  
  if (questionIndex < 0 || questionIndex >= questions.value.length) {
    return null
  }
  
  return questions.value[questionIndex]
}

// 获取指定位置的题目索引
const getQuestionIndexAtPosition = (position) => {
  const offset = position - 3
  const questionIndex = currentQuestion.value + offset
  
  if (questionIndex < 0 || questionIndex >= questions.value.length) {
    return -1
  }
  
  return questionIndex
}

// 获取位置样式类
const getPositionClasses = (position) => {
  const offset = Math.abs(position - 3) // 距离中间位置的距离
  
  if (position === 3) {
    // 当前题目在位置3（中间）
    return [
      'z-10',
      answers.value[currentQuestion.value] !== undefined ? 'bg-green-50 border-green-300' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200',
      'border-2 rounded-xl p-6 shadow-lg'
    ]
  } else if (offset === 1) {
    // 上下相邻的题目
    return ['opacity-70', 'scale-90', 'transform']
  } else if (offset === 2) {
    // 最上面和最下面的题目
    return ['opacity-40', 'scale-75', 'transform']
  }
  
  return []
}

// 获取位置编号样式类
const getPositionNumberClasses = (position) => {
  const offset = Math.abs(position - 3)
  
  if (position === 3) {
    return ['text-base', 'font-bold', 'text-gray-800'] // 从text-lg改为text-base
  } else if (offset === 1) {
    return ['text-sm', 'font-medium', 'text-gray-600'] // 从text-base改为text-sm
  } else {
    return ['text-xs', 'font-normal', 'text-gray-400'] // 从text-sm改为text-xs
  }
}

// 获取位置文本样式类
const getPositionTextClasses = (position) => {
  const offset = Math.abs(position - 3)
  
  if (position === 3) {
    return ['text-base', 'font-bold', 'text-gray-800'] // 从text-lg改为text-base
  } else if (offset === 1) {
    return ['text-sm', 'font-medium', 'text-gray-600'] // 从text-base改为text-sm
  } else {
    return ['text-xs', 'font-normal', 'text-gray-400'] // 从text-sm改为text-xs
  }
}

// Methods
const scrollToTest = () => {
  if (process.client) {
    // 跳转到进度条区域，确保用户能看到进度条
    const progressSection = document.querySelector('#test-progress')
    if (progressSection) {
      progressSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

const scrollToResults = () => {
  if (process.client) {
    setTimeout(() => {
      const resultsSection = document.querySelector('#results-section')
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300) // 延迟300ms确保DOM已更新
  }
}

const answerQuestion = (answer) => {
  answers.value[currentQuestion.value] = answer
  if (answer) {
    score.value--
  }
  
  // Auto advance to next question with animation
  if (currentQuestion.value < questions.value.length - 1) {
    isTransitioning.value = true
    setTimeout(() => {
      currentQuestion.value++
      isTransitioning.value = false
    }, 200)
  } else {
    // 如果是最后一题，滚动到结果区域
    scrollToResults()
  }
}

const nextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1 && !isTransitioning.value) {
    isTransitioning.value = true
    // 重置滚动偏移
    scrollOffset.value = 0
    setTimeout(() => {
      currentQuestion.value++
      isTransitioning.value = false
    }, 150)
  }
}

const previousQuestion = () => {
  if (currentQuestion.value > 0 && !isTransitioning.value) {
    isTransitioning.value = true
    // 重置滚动偏移
    scrollOffset.value = 0
    setTimeout(() => {
      currentQuestion.value--
      isTransitioning.value = false
    }, 150)
  }
}

// 滚轮导航 - iOS样式的连续滚动
const handleWheel = (event) => {
  if (isComplete.value) return
  
  // 始终阻止默认滚动
  event.preventDefault()
  event.stopPropagation()
  
  // 累积滚动增量
  wheelDelta.value += event.deltaY
  
  // 清除之前的超时
  if (wheelTimeout.value) {
    clearTimeout(wheelTimeout.value)
  }
  
  // 设置新的超时来处理滚动
  wheelTimeout.value = setTimeout(() => {
    const threshold = 80 // 降低滚动阈值，让它更灵敏
    
    if (Math.abs(wheelDelta.value) >= threshold && !isTransitioning.value) {
      if (wheelDelta.value > 0) {
        // 向下滚动 - 下一题
        nextQuestion()
      } else {
        // 向上滚动 - 上一题  
        previousQuestion()
      }
    }
    
    // 重置累积值
    wheelDelta.value = 0
  }, 30) // 减少延迟让滚动更快响应
}

// 鼠标进入答题区域
const handleMouseEnter = () => {
  isInTestArea.value = true
  // 禁用body的滚动
  document.body.style.overflow = 'hidden'
}

// 鼠标离开答题区域
const handleMouseLeave = () => {
  isInTestArea.value = false
  // 恢复body的滚动
  document.body.style.overflow = 'auto'
}

// 触屏滑动导航 - 区分按住滚动和快速滑动
const handleTouchStart = (event) => {
  // 停止任何正在进行的惯性滚动
  stopInertiaScrolling()
  
  // 禁用body滚动
  document.body.style.overflow = 'hidden'
  
  const touch = event.touches[0]
  touchStartY.value = touch.clientY
  touchStartX.value = touch.clientX
  touchStartTime.value = Date.now()
  touchMoveY.value = touch.clientY
  touchMoveTime.value = Date.now()
  
  // 重置滚动模式检测
  isQuickSwipe.value = false
  swipeStartTime.value = Date.now()
  totalSwipeDistance.value = 0
  
  // 重置速度历史
  velocityHistory.value = []
  
  // 设置长按定时器 - 更长的延迟来区分快速滑动
  longPressTimer.value = setTimeout(() => {
    isLongPressing.value = true
    startLongPressScroll()
  }, 300) // 增加到300ms，让用户有更多时间进行快速滑动
  
  // 阻止默认行为
  event.preventDefault()
}

const handleTouchMove = (event) => {
  // 阻止默认的页面滚动
  event.preventDefault()
  event.stopPropagation()
  
  if (isInertiaScrolling.value) return
  
  const touch = event.touches[0]
  const currentTime = Date.now()
  const deltaY = touchMoveY.value - touch.clientY
  const deltaTime = currentTime - touchMoveTime.value
  
  // 更新移动位置和时间
  touchMoveY.value = touch.clientY
  touchMoveTime.value = currentTime
  
  // 计算总滑动距离和时间
  const totalDeltaY = touchStartY.value - touch.clientY
  const totalTime = currentTime - swipeStartTime.value
  totalSwipeDistance.value = Math.abs(totalDeltaY)
  
  // 实时更新滚动偏移量 - 减少阻尼让滚动更轻盈
  const moveDistance = touch.clientY - touchStartY.value
  
  // 检查边界条件 - 如果已经在边界，限制滚动方向
  let allowedMoveDistance = moveDistance
  if (currentQuestion.value === 0 && moveDistance < 0) {
    // 在第一题且向上滑动，限制移动距离
    allowedMoveDistance = Math.max(moveDistance, -20) // 最多只能向上移动20px
  } else if (currentQuestion.value === questions.value.length - 1 && moveDistance > 0) {
    // 在最后一题且向下滑动，限制移动距离
    allowedMoveDistance = Math.min(moveDistance, 20) // 最多只能向下移动20px
  }
  
  // 在长按模式下，限制滚动偏移的幅度
  if (isLongPressing.value) {
    scrollOffset.value = allowedMoveDistance * 0.1 // 长按时进一步减少移动幅度
  } else {
    scrollOffset.value = allowedMoveDistance * 0.9 // 快速滑动时保持正常幅度
  }
  
  // 检测是否为快速滑动
  if (totalTime < 200 && totalSwipeDistance.value > 30) {
    isQuickSwipe.value = true
    // 如果检测到快速滑动，取消长按定时器
    if (longPressTimer.value) {
      clearTimeout(longPressTimer.value)
      longPressTimer.value = null
    }
  }
  
  // 计算速度 (像素/毫秒) - 只在快速滑动时记录
  if (deltaTime > 0 && isQuickSwipe.value) {
    const velocity = deltaY / deltaTime
    velocityHistory.value.push({
      velocity,
      time: currentTime
    })
    
    // 只保留最近100ms的速度记录
    velocityHistory.value = velocityHistory.value.filter(v => currentTime - v.time < 100)
  }
  
  // 在长按滚动模式下，不进行题目切换，让长按滚动函数处理
  if (isLongPressing.value) {
    return
  }
  
  // 当滑动距离超过100px时切换题目 - 添加边界检查
  if (Math.abs(totalDeltaY) > 100) {
    if (!isTransitioning.value) {
      // 检查边界条件
      const isAtFirstQuestion = currentQuestion.value === 0
      const isAtLastQuestion = currentQuestion.value === questions.value.length - 1
      const isSwipingUp = totalDeltaY < 0
      const isSwipingDown = totalDeltaY > 0
      
      // 如果在边界且尝试继续滑动，直接停止
      if ((isAtFirstQuestion && isSwipingUp) || (isAtLastQuestion && isSwipingDown)) {
        scrollOffset.value = 0
        return
      }
      
      // 在快速滑动模式下，根据速度和距离计算跳过的题目数量
      if (isQuickSwipe.value) {
        const swipeVelocity = Math.abs(totalDeltaY) / Math.max(totalTime, 1)
        let skipCount = 1
        
        // 根据滑动速度决定跳过多少题目
        if (swipeVelocity > 3) {
          skipCount = Math.min(3, Math.floor(swipeVelocity / 2))
        } else if (swipeVelocity > 1.5) {
          skipCount = 2
        }
        
        // 执行多题目跳跃 - 考虑边界
        for (let i = 0; i < skipCount; i++) {
          if (totalDeltaY > 0) {
            if (currentQuestion.value < questions.value.length - 1) {
              currentQuestion.value++
            } else {
              break // 到达最后一题，停止跳跃
            }
          } else {
            if (currentQuestion.value > 0) {
              currentQuestion.value--
            } else {
              break // 到达第一题，停止跳跃
            }
          }
        }
      } else {
        // 长按模式或慢速滑动，只移动一个题目
        if (totalDeltaY > 0) {
          nextQuestion()
        } else {
          previousQuestion()
        }
      }
      
      // 重置起始位置和滚动偏移
      touchStartY.value = touch.clientY
      touchStartX.value = touch.clientX
      totalSwipeDistance.value = 0
      scrollOffset.value = 0
    }
  }
}

const handleTouchEnd = (event) => {
  // 清除长按定时器
  clearTimeout(longPressTimer.value)
  stopLongPressScroll()
  
  // 恢复body滚动
  document.body.style.overflow = 'auto'
  
  if (isTransitioning.value || isComplete.value) {
    isLongPressing.value = false
    scrollOffset.value = 0
    return
  }
  
  // 只有在快速滑动模式下才触发惯性滚动
  if (isQuickSwipe.value) {
    // 计算最终速度用于惯性滚动
    const averageVelocity = calculateAverageVelocity()
    
    if (Math.abs(averageVelocity) > 0.4) {
      startInertiaScrolling(averageVelocity)
    } else {
      // 如果速度不够，重置滚动偏移
      scrollOffset.value = 0
    }
  } else {
    // 如果不是快速滑动，重置滚动偏移
    scrollOffset.value = 0
  }
  
  // 重置状态
  isLongPressing.value = false
  isQuickSwipe.value = false
  
  // 阻止默认行为
  event.preventDefault()
}

// 计算平均速度
const calculateAverageVelocity = () => {
  if (velocityHistory.value.length === 0) return 0
  
  const totalVelocity = velocityHistory.value.reduce((sum, v) => sum + v.velocity, 0)
  return totalVelocity / velocityHistory.value.length
}

// 开始惯性滚动 - 更轻盈的阻尼感
const startInertiaScrolling = (initialVelocity) => {
  isInertiaScrolling.value = true
  let velocity = initialVelocity
  const friction = 0.94 // 从0.92提升到0.94，减少摩擦力
  const minVelocity = 0.06 // 从0.08降到0.06，让滚动持续更久
  let accumulatedScroll = 0
  
  const animate = () => {
    if (Math.abs(velocity) < minVelocity || isComplete.value) {
      stopInertiaScrolling()
      return
    }
    
    // 检查边界条件 - 如果在边界且速度方向错误，立即停止
    const isAtFirstQuestion = currentQuestion.value === 0
    const isAtLastQuestion = currentQuestion.value === questions.value.length - 1
    
    if ((isAtFirstQuestion && velocity < 0) || (isAtLastQuestion && velocity > 0)) {
      stopInertiaScrolling()
      return
    }
    
    // 计算滚动距离 - 提高速度系数
    const scrollDistance = velocity * 35 // 从30提升到35，增加滚动距离
    accumulatedScroll += scrollDistance
    
    // 当累积滚动超过阈值时切换题目
    if (Math.abs(accumulatedScroll) >= 50) { // 从60降到50，更容易切换
      if (accumulatedScroll > 0) {
        // 向下滚动，检查是否已到最后一题
        if (currentQuestion.value < questions.value.length - 1) {
          nextQuestion()
        } else {
          stopInertiaScrolling()
          return
        }
      } else {
        // 向上滚动，检查是否已到第一题
        if (currentQuestion.value > 0) {
          previousQuestion()
        } else {
          stopInertiaScrolling()
          return
        }
      }
      accumulatedScroll = 0
      scrollOffset.value = 0
    } else {
      // 更新视觉偏移
      scrollOffset.value = accumulatedScroll
    }
    
    // 应用摩擦力
    velocity *= friction
    
    // 更高的帧率让滚动更流畅
    const interval = Math.max(12, 40 - Math.abs(velocity) * 15) // 从16降到12，提高帧率
    inertiaAnimation.value = setTimeout(animate, interval)
  }
  
  animate()
}

// 停止惯性滚动
const stopInertiaScrolling = () => {
  isInertiaScrolling.value = false
  if (inertiaAnimation.value) {
    clearTimeout(inertiaAnimation.value)
    inertiaAnimation.value = null
  }
  // 重置滚动偏移
  scrollOffset.value = 0
}

// 开始长按滚动 - 恒定慢速度
const startLongPressScroll = () => {
  const scroll = () => {
    if (!isLongPressing.value || isComplete.value) return
    
    // 根据触摸位置决定滚动方向
    const totalDeltaY = touchStartY.value - touchMoveY.value
    
    if (Math.abs(totalDeltaY) > 15) { // 降低阈值，更容易触发
      if (totalDeltaY > 0) {
        nextQuestion()
      } else {
        previousQuestion()
      }
    }
    
    // 恒定的慢速度滚动 - 500ms间隔
    longPressScrollTimer.value = setTimeout(scroll, 500)
  }
  
  scroll()
}

// 停止长按滚动
const stopLongPressScroll = () => {
  if (longPressScrollTimer.value) {
    clearTimeout(longPressScrollTimer.value)
    longPressScrollTimer.value = null
  }
}

// 生命周期钩子 - 确保清理资源
onUnmounted(() => {
  // 清理所有定时器
  if (wheelTimeout.value) {
    clearTimeout(wheelTimeout.value)
  }
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value)
  }
  if (longPressScrollTimer.value) {
    clearTimeout(longPressScrollTimer.value)
  }
  
  // 停止惯性滚动
  stopInertiaScrolling()
  
  // 恢复body滚动
  document.body.style.overflow = 'auto'
})

const getScoreDescription = (score) => {
  if (score >= 98) return "Extremely Pure"
  if (score >= 93) return "Very Pure"
  if (score >= 77) return "Somewhat Pure"
  if (score >= 45) return "Average"
  if (score >= 9) return "Not Pure"
  return "Very Impure"
}

const resetTest = () => {
  answers.value = {}
  score.value = 100
  currentQuestion.value = 0
  isTransitioning.value = false
}


// 测试分享卡片生成
const testShareCard = async () => {
  try {
    console.log('🖼️ Testing share card generation...')
    
    // 设置一个测试分数
    const testScore = 85
    
    // 修改临时分数用于测试
    const originalScore = score.value
    score.value = testScore
    
    // 生成分享卡片
    const imageBlob = await generateShareCard()
    
    // 恢复原始分数
    score.value = originalScore
    
    // 下载测试图片
    const url = URL.createObjectURL(imageBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = `test-share-card-${testScore}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    console.log('✅ Share card generated successfully!')
    alert('🎉 Test share card generated and downloaded! Check your downloads folder.')
    
  } catch (error) {
    console.error('❌ Error generating share card:', error)
    alert('❌ Error generating share card. Check browser console for details.')
  }
}

// 动态更新Meta标签
const updateMetaTags = (userScore) => {
  const title = `Rice Purity Test Results - Score: ${userScore}/100`
  const description = `Just scored ${userScore}/100 on the Rice Purity Test! I'm "${getScoreDescription(userScore)}". Take the test yourself!`
  const imageUrl = `https://ricetest.net/api/share-image?score=${userScore}`
  
  // 更新页面meta标签
  if (process.client) {
    // 更新title
    document.title = title
    
    // 更新或创建meta标签
    const updateMeta = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }
    
    updateMeta('og:title', title)
    updateMeta('og:description', description)
    updateMeta('og:image', imageUrl)
    updateMeta('og:url', getShareUrl())
    updateMeta('og:type', 'website')
    
    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image')
    updateMeta('twitter:title', title)
    updateMeta('twitter:description', description)
    updateMeta('twitter:image', imageUrl)
  }
}

// 生成优化的分享文案
const getShareText = () => {
  const emoji = score.value >= 90 ? '😇' : score.value >= 70 ? '😊' : score.value >= 50 ? '😏' : '😈'
  return `Just took the Rice Purity Test and scored ${score.value}/100! ${emoji} I'm "${getScoreDescription(score.value)}" 
  
Take the test yourself at RiceTest.net and see how pure you are! 🎯

#RicePurityTest #PurityTest #PersonalityTest`
}

// 生成分享URL
const getShareUrl = () => {
  return `https://ricetest.net?score=${score.value}`
}

// 分享到 Twitter/X
const shareToTwitter = () => {
  updateMetaTags(score.value)
  const text = getShareText()
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(getShareUrl())}`
  window.open(url, '_blank')
  showShareModal.value = false
}

// 分享到 Facebook
const shareToFacebook = () => {
  updateMetaTags(score.value)
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`
  window.open(url, '_blank')
  showShareModal.value = false
}

// 分享到 Instagram
const shareToInstagram = () => {
  updateMetaTags(score.value)
  alert('📷 Copy this link to share on Instagram:\n\n' + getShareUrl())
  navigator.clipboard.writeText(getShareUrl())
  showShareModal.value = false
}

// 分享到 WhatsApp
const shareToWhatsApp = () => {
  const text = getShareText() + '\n\n' + getShareUrl()
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`
  window.open(url, '_blank')
  showShareModal.value = false
}

// 分享到 TikTok
const shareToTikTok = () => {
  updateMetaTags(score.value)
  alert('🎵 Copy this link to share on TikTok:\n\n' + getShareUrl())
  navigator.clipboard.writeText(getShareUrl())
  showShareModal.value = false
}

// 复制分享链接
const copyShareLink = async () => {
  try {
    const shareText = getShareText() + '\n\n' + getShareUrl()
    await navigator.clipboard.writeText(shareText)
    alert('🔗 Share text and link copied to clipboard!')
  } catch (error) {
    // 降级方案
    const shareText = getShareText() + '\n\n' + getShareUrl()
    const textArea = document.createElement('textarea')
    textArea.value = shareText
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert('🔗 Share text and link copied to clipboard!')
  }
  showShareModal.value = false
}


// 撒花动画相关
const getConfettiStyle = (n) => {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#fd79a8']
  const color = colors[n % colors.length]
  const delay = Math.random() * 3
  const duration = 3 + Math.random() * 2
  const left = Math.random() * 100
  
  return {
    backgroundColor: color,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    left: `${left}%`
  }
}
</script>

<style scoped>
/* 页面特有样式 - 撒花动画 */
.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  animation: confetti-fall infinite linear;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

/* 证书背景样式 */
.certificate-bg {
  background: 
    linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      rgba(59, 130, 246, 0.03) 2px,
      rgba(59, 130, 246, 0.03) 4px
    );
}

/* 权威认证勾动画 */
.expert-certification {
  animation: certification-glow 3s ease-in-out infinite;
}

@keyframes certification-glow {
  0%, 100% {
    filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 16px rgba(59, 130, 246, 0.6));
  }
}

/* 分数框特殊效果 */
.score-container {
  position: relative;
}

.score-container::before {
  content: '';
  position: absolute;
  inset: -4px;
  background: linear-gradient(45deg, #fbbf24, #f59e0b, #fbbf24);
  border-radius: 24px;
  opacity: 0.3;
  animation: score-border 2s linear infinite;
}

@keyframes score-border {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 权威标签动画 */
.certified-badge {
  animation: badge-pulse 2s ease-in-out infinite;
}

@keyframes badge-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(245, 158, 11, 0.5);
  }
}
</style>