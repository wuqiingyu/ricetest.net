<template>
  <!-- Hero Section -->
  <div class="bg-gradient-to-b from-purple-100 via-pink-50 to-white py-12 md:py-16 relative overflow-hidden diamond-stars-bg">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <!-- Main Title -->
      <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
        Gay Test - Am I Gay Quiz
      </h1>
      
      <!-- Subtitle/Description -->
      <p class="text-base md:text-lg lg:text-xl text-gray-600 mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed">
        Figuring out your sexuality can be pretty confusing, right? Don't worry - we've got you covered! This quiz helps you explore those feelings and find some answers within yourself. Remember, you get to choose whatever label feels right for you! 🌈
      </p>
      
      <!-- Enhanced Scroll Arrow -->
      <div class="flex flex-col items-center space-y-2 md:space-y-4 cursor-pointer hover:opacity-80 transition-opacity mt-4 md:mt-6" @click="scrollToTest()">
        <span class="text-xs md:text-sm text-gray-600 font-semibold tracking-widest uppercase">Start Quiz</span>
        <div class="animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:h-8 md:w-8 h-6 w-6 text-gray-600" aria-hidden="true">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- Test Progress Section - Only show if test is started -->
  <div v-if="false" id="test-progress" class="max-w-4xl mx-auto px-4 py-2">
    <TestProgress 
      :current-question="currentQuestion"
      :total-questions="questions.length"
      :show-percentage="true"
    />
  </div>

  <!-- Main Content -->
  <main id="main-content" class="max-w-4xl mx-auto px-4 py-8">
    <div v-if="!isComplete" class="bg-transparent">
      <!-- Hero Image and Start Button -->
      <div class="relative overflow-hidden px-4 md:px-6 py-8 md:py-12 text-center">
        <!-- Hero Image -->
        <div class="mb-8">
          <img 
            src="/gay-test/gay-test.jpeg"
            alt="Two men in suits holding hands - representing love and self-discovery"
            class="mx-auto rounded-2xl w-[80vw] h-auto object-cover"
          />
        </div>
        
        <!-- Start Quiz Button with Animation -->
        <div class="flex justify-center">
          <a 
            href="/quiz/gay-test/1"
            class="start-quiz-btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl text-xl w-[80vw] inline-block text-center"
          >
            Start Quiz Now
          </a>
        </div>
        
        <p class="text-gray-600 mt-6 text-sm">
          Take your time and answer honestly - this is your journey of self-discovery! 🌈
        </p>
      </div>
    </div>

    <!-- Results -->
    <div v-if="isComplete" id="results-section" class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 relative overflow-hidden border-2 border-purple-200 certificate-bg">
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
        <!-- 标题 -->
        <div class="text-center mb-6">
          <h2 class="text-3xl font-bold text-gray-800 mb-3">Your Quiz Results</h2>
          <div class="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded-lg px-4 py-2 inline-block certified-badge">
            <p class="text-purple-800 font-semibold text-sm">✓ Certified Results</p>
          </div>
        </div>
        
        <!-- 结果描述 -->
        <div class="text-center mb-8">
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl border border-purple-200">
            <h3 class="text-2xl font-bold text-purple-900 mb-4">{{ result.title }}</h3>
            <p class="text-lg text-gray-700 leading-relaxed mb-4">{{ result.description }}</p>
            <div class="text-sm text-gray-600 bg-white/50 rounded-lg p-4">
              <p class="font-medium mb-2">Remember:</p>
              <p>{{ result.reminder }}</p>
            </div>
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="flex gap-4 justify-center flex-wrap">
          <button 
            @click="resetTest()"
            class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Take Quiz Again
          </button>
          
          <button 
            @click="showShareModal = true"
            class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
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
          <p class="text-gray-600">Share your quiz results with friends</p>
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
          
          <!-- Instagram -->
          <button 
            @click="shareToInstagram()"
            class="flex flex-col items-center p-4 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <div class="text-2xl mb-2">📷</div>
            <span class="text-sm font-medium">Instagram</span>
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

    <!-- Information Sections -->
    <div class="mt-12 space-y-8">
      <!-- Questions Overview -->
      <div class="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-purple-100">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Questions Overview</h2>
        <div class="text-gray-600 mb-8">
          <p class="mb-6">
            This quiz contains 16 carefully crafted questions that explore different aspects of your romantic and emotional attractions. 
            Each question offers multiple choice answers to help you reflect on your experiences and feelings.
          </p>
          
          <div class="space-y-6 mb-8">
            <div v-for="(question, index) in questions" :key="index" class="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-400">
              <div class="mb-4">
                <h3 class="font-semibold text-purple-900 text-base flex items-start">
                  <span class="text-purple-600 mr-2 flex-shrink-0">Q{{ index + 1 }}.</span>
                  {{ question.question }}
                </h3>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div v-for="(option, optionIndex) in question.options" :key="optionIndex" class="flex items-start space-x-2">
                  <span class="flex-shrink-0 w-5 h-5 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                    {{ String.fromCharCode(65 + optionIndex) }}
                  </span>
                  <span class="text-gray-700 text-sm leading-relaxed">{{ option.text }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="text-center">
            <button 
              @click="scrollToTest()"
              class="start-quiz-btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl text-xl w-full max-w-md mx-auto"
            >
              Start Quiz Now
            </button>
          </div>
        </div>
      </div>

      <!-- ABCs of Sexual Orientation and Gender Identity -->
      <div class="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-purple-100">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Understanding Sexual Orientation - The Basics</h2>
        <div class="space-y-6">
          <p class="text-gray-600 text-lg">
            Sexual orientation can feel complicated, but understanding the basics can help you make sense of your own feelings. 
            Here's a simple guide to help you navigate this journey of self-discovery.
          </p>
          
          <div class="space-y-6">
            <!-- Sexual Orientation Section -->
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
              <h3 class="font-bold text-purple-900 text-xl mb-4 flex items-center">
                <span class="text-2xl mr-3">💜</span>Sexual Orientation & Identity Terms
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-purple-800 mb-2">Gay</h4>
                  <p>Anyone who experiences romantic, emotional, or physical attraction to people of the same gender. Historically used for men, now more inclusive.</p>
                </div>
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-pink-800 mb-2">Lesbian</h4>
                  <p>Women and non-binary people who are emotionally, romantically, or sexually attracted to other women.</p>
                </div>
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-blue-800 mb-2">Bisexual ("bi")</h4>
                  <p>Attraction to people of the same gender and another gender. Not necessarily equal or simultaneous attraction.</p>
                </div>
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-green-800 mb-2">Pansexual ("pan")</h4>
                  <p>Attracted to any/all genders or attraction that doesn't limit itself to the gender binary. Gender may not be a determining factor.</p>
                </div>
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-indigo-800 mb-2">Asexual ("ace")</h4>
                  <p>Lack of interest in sex or sexual contact. Can range from zero sexual attraction to occasional attraction or demisexuality (attraction with strong emotional bonds).</p>
                </div>
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-2">Heterosexual/Straight</h4>
                  <p>Attraction primarily or exclusively to people of different genders than one's own.</p>
                </div>
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-teal-800 mb-2">Queer</h4>
                  <p>An umbrella term for gender & sexual identities outside heteronormativity. Once a slur, now reclaimed by many as radical and all-inclusive.</p>
                </div>
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-orange-800 mb-2">Questioning</h4>
                  <p>The process of personal reflection and exploration involved in discovering sexuality, gender identity, and expression. It's totally normal!</p>
                </div>
              </div>
            </div>
            
            <!-- Gender Identity & Expression -->
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
              <h3 class="font-bold text-blue-900 text-xl mb-4 flex items-center">
                <span class="text-2xl mr-3">🏳️‍⚧️</span>Gender Identity & Expression
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-blue-800 mb-2">Gender Identity</h4>
                  <p>Internal feeling of how individuals perceive themselves as male, female, genderqueer, non-binary, etc.</p>
                </div>
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-cyan-800 mb-2">Gender Expression</h4>
                  <p>External way people convey their gender identity through behavior, appearance, clothing, speech patterns, etc.</p>
                </div>
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-purple-800 mb-2">Non-binary</h4>
                  <p>Gender identity that exists outside and rejects the socially-constructed gender binary. Includes genderqueer and gender expansive identities.</p>
                </div>
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-pink-800 mb-2">Transgender ("trans")</h4>
                  <p>People whose gender identity differs from their birth-assigned sex. Can identify as straight, gay, lesbian, bisexual, etc.</p>
                </div>
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-green-800 mb-2">Intersex</h4>
                  <p>Born with anatomy or sex characteristics that don't fit "male" or "female" binary boxes. May or may not identify with assigned birth sex.</p>
                </div>
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-indigo-800 mb-2">Sexual Orientation</h4>
                  <p>Person's inherent physical, emotional, or romantic attraction toward others, often based on gender identity/expression.</p>
                </div>
              </div>
            </div>
            
            <!-- Key Things to Remember -->
            <div class="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-lg border border-green-200">
              <h3 class="font-bold text-green-900 text-xl mb-4 flex items-center">
                <span class="text-2xl mr-3">🌈</span>Key Things to Remember
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-green-800 mb-2">Sexuality is Fluid</h4>
                  <p>Your attractions and how you identify can change over time, and that's completely normal and valid.</p>
                </div>
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-teal-800 mb-2">Labels are Optional</h4>
                  <p>You don't have to use any label if it doesn't feel right. Some people prefer "queer" or no label at all.</p>
                </div>
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-blue-800 mb-2">Take Your Time</h4>
                  <p>There's no rush to figure everything out. Questioning and exploring is a natural, healthy part of growing up.</p>
                </div>
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-purple-800 mb-2">You're Not Alone</h4>
                  <p>Many people question their sexuality and identity. It's more common than you think, and support is available.</p>
                </div>
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-pink-800 mb-2">All Feelings are Valid</h4>
                  <p>Whatever you're feeling or discovering about yourself is completely valid and worthy of respect and celebration.</p>
                </div>
                <div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-semibold text-orange-800 mb-2">Different from Gender</h4>
                  <p>Sexual orientation (who you're attracted to) is separate from gender identity (who you are). Both are equally important.</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Important Note -->
          <div class="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
            <div class="flex items-start space-x-4">
              <span class="text-yellow-600 text-2xl flex-shrink-0">💡</span>
              <div>
                <h4 class="font-semibold text-yellow-900 mb-2">Remember</h4>
                <p class="text-yellow-800 text-sm">
                  This quiz is just one tool for self-reflection. Your own feelings, experiences, and instincts are what matter most. 
                  If you're struggling with questions about your identity or need support, consider talking to a trusted friend, 
                  family member, counselor, or reaching out to LGBTQ+ support organizations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Frequently Asked Questions -->
      <div class="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-purple-100">
        <h2 class="text-3xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
        
        <div class="space-y-8">
          <!-- Question 1 -->
          <div class="border-b border-gray-200 pb-8">
            <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-start">
              <span class="text-purple-600 mr-3 flex-shrink-0">Q1:</span>
              How accurate is this Gay Test quiz?
            </h3>
            <div class="text-gray-600 bg-gray-50 p-6 rounded-lg ml-8">
              <p class="mb-4">
                This quiz is designed as a <strong>self-reflection tool</strong>, not a scientific assessment. It's based on common experiences 
                and feelings that people often have when questioning their sexuality, but it cannot definitively determine your sexual orientation.
              </p>
              <p class="mb-4">
                The quiz uses research-backed indicators and real experiences from the LGBTQ+ community, but remember that:
              </p>
              <ul class="list-disc list-inside space-y-2 mb-4 text-sm">
                <li>Only you can determine your own identity</li>
                <li>Sexuality is complex and personal</li>
                <li>Results should be considered alongside your own feelings and experiences</li>
                <li>It's okay if the result doesn't feel 100% right - trust your instincts</li>
              </ul>
              <p class="text-purple-700 font-medium">
                Think of it as a starting point for self-reflection rather than a final answer.
              </p>
            </div>
          </div>

          <!-- Question 2 -->
          <div class="border-b border-gray-200 pb-8">
            <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-start">
              <span class="text-purple-600 mr-3 flex-shrink-0">Q2:</span>
              What if I get a result I wasn't expecting?
            </h3>
            <div class="text-gray-600 bg-gray-50 p-6 rounded-lg ml-8">
              <p class="mb-4">
                Getting an unexpected result can feel surprising, confusing, or even overwhelming - and that's completely normal! 
                Here's what you should know:
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="bg-blue-50 p-4 rounded border border-blue-200">
                  <h4 class="font-semibold text-blue-800 mb-2">It's Okay to Feel Confused</h4>
                  <p class="text-blue-700 text-sm">
                    Unexpected results can bring up new questions. Take time to process and don't pressure yourself to have all the answers immediately.
                  </p>
                </div>
                <div class="bg-green-50 p-4 rounded border border-green-200">
                  <h4 class="font-semibold text-green-800 mb-2">You're Still You</h4>
                  <p class="text-green-700 text-sm">
                    A quiz result doesn't change who you are. You're the same person with the same worth, regardless of any label.
                  </p>
                </div>
              </div>
              <p class="text-purple-700 font-medium">
                Remember: You can explore these feelings at your own pace, and you don't need to make any immediate decisions or announcements.
              </p>
            </div>
          </div>

          <!-- Question 3 -->
          <div class="border-b border-gray-200 pb-8">
            <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-start">
              <span class="text-purple-600 mr-3 flex-shrink-0">Q3:</span>
              Is it normal to question my sexuality even if I'm in a relationship?
            </h3>
            <div class="text-gray-600 bg-gray-50 p-6 rounded-lg ml-8">
              <p class="mb-4">
                <strong>Absolutely!</strong> Questioning your sexuality can happen at any point in your life, regardless of your relationship status. 
                Many people discover new things about themselves while in relationships, and this is completely normal.
              </p>
              <p class="mb-4">
                Some important points to consider:
              </p>
              <ul class="list-disc list-inside space-y-2 mb-4 text-sm">
                <li>Self-discovery is a lifelong process that doesn't stop when you enter a relationship</li>
                <li>Being in a relationship doesn't invalidate your questioning or curiosity</li>
                <li>You can love your current partner while still exploring your identity</li>
                <li>Many people realize they're bisexual, pansexual, or have other identities while partnered</li>
              </ul>
              <p class="text-purple-700 font-medium">
                If you're comfortable, consider having open conversations with your partner about your feelings and questions.
              </p>
            </div>
          </div>

          <!-- Question 4 -->
          <div class="border-b border-gray-200 pb-8">
            <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-start">
              <span class="text-purple-600 mr-3 flex-shrink-0">Q4:</span>
              What's the difference between sexual attraction and romantic attraction?
            </h3>
            <div class="text-gray-600 bg-gray-50 p-6 rounded-lg ml-8">
              <p class="mb-4">
                Great question! Many people don't realize these can be different, which can make understanding your sexuality more complex.
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="bg-pink-50 p-4 rounded border border-pink-200">
                  <h4 class="font-semibold text-pink-800 mb-2">💕 Romantic Attraction</h4>
                  <ul class="text-pink-700 text-sm space-y-1">
                    <li>• Wanting to date someone</li>
                    <li>• Feeling emotionally connected</li>
                    <li>• Wanting romance, cuddles, companionship</li>
                    <li>• The "butterflies" feeling</li>
                    <li>• Wanting to build a life together</li>
                  </ul>
                </div>
                <div class="bg-red-50 p-4 rounded border border-red-200">
                  <h4 class="font-semibold text-red-800 mb-2">🔥 Sexual Attraction</h4>
                  <ul class="text-red-700 text-sm space-y-1">
                    <li>• Physical/sexual interest in someone</li>
                    <li>• Wanting physical intimacy</li>
                    <li>• Finding someone sexually appealing</li>
                    <li>• Physical arousal responses</li>
                    <li>• Sexual fantasies or desires</li>
                  </ul>
                </div>
              </div>
              <p class="text-purple-700 font-medium">
                You might be romantically attracted to one gender and sexually attracted to another, or experience different intensities of each type of attraction.
              </p>
            </div>
          </div>

          <!-- Question 5 -->
          <div class="border-b border-gray-200 pb-8">
            <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-start">
              <span class="text-purple-600 mr-3 flex-shrink-0">Q5:</span>
              How do I know if I'm just curious or actually gay/bi/pan?
            </h3>
            <div class="text-gray-600 bg-gray-50 p-6 rounded-lg ml-8">
              <p class="mb-4">
                This is one of the most common questions people have, and honestly, sometimes the line between curiosity and genuine attraction can be blurry. 
                Here are some ways to think about it:
              </p>
              <div class="space-y-4">
                <div class="bg-purple-50 p-4 rounded border border-purple-200">
                  <h4 class="font-semibold text-purple-800 mb-2">🤔 Signs It Might Be More Than Curiosity</h4>
                  <ul class="text-purple-700 text-sm space-y-1">
                    <li>• The thoughts/feelings persist over time</li>
                    <li>• You find yourself seeking out LGBTQ+ content or communities</li>
                    <li>• You feel excited or nervous (in a good way) about these possibilities</li>
                    <li>• You can imagine yourself in a relationship with someone of that gender</li>
                    <li>• The idea of being gay/bi/pan feels right or relieving</li>
                  </ul>
                </div>
                <div class="bg-blue-50 p-4 rounded border border-blue-200">
                  <h4 class="font-semibold text-blue-800 mb-2">💭 Remember</h4>
                  <p class="text-blue-700 text-sm">
                    Curiosity itself can be a sign of something deeper. Many LGBTQ+ people describe their initial awareness as "just being curious" 
                    before realizing it was genuine attraction. There's no shame in either curiosity or attraction!
                  </p>
                </div>
              </div>
              <p class="text-purple-700 font-medium mt-4">
                The most important thing: give yourself permission to explore these feelings without pressure to label them immediately.
              </p>
            </div>
          </div>

          <!-- Question 6 -->
          <div class="border-b border-gray-200 pb-8">
            <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-start">
              <span class="text-purple-600 mr-3 flex-shrink-0">Q6:</span>
              Where can I find support and community?
            </h3>
            <div class="text-gray-600 bg-gray-50 p-6 rounded-lg ml-8">
              <p class="mb-4">
                Finding community and support is incredibly important during questioning and self-discovery. Here are some great places to start:
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 class="font-semibold text-green-800 mb-3">🌐 Online Communities</h4>
                  <ul class="text-gray-700 text-sm space-y-1">
                    <li>• Reddit communities (r/questioning, r/lgbt)</li>
                    <li>• Discord servers for LGBTQ+ youth</li>
                    <li>• TikTok and YouTube LGBTQ+ creators</li>
                    <li>• LGBTQ+ forums and support groups</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold text-blue-800 mb-3">🏢 Organizations & Resources</h4>
                  <ul class="text-gray-700 text-sm space-y-1">
                    <li>• The Trevor Project (crisis support)</li>
                    <li>• PFLAG (family support)</li>
                    <li>• Local LGBTQ+ community centers</li>
                    <li>• School GSA (Gay-Straight Alliance) groups</li>
                  </ul>
                </div>
              </div>
              <div class="bg-yellow-50 p-4 rounded border border-yellow-200">
                <h4 class="font-semibold text-yellow-800 mb-2">⚠️ Safety First</h4>
                <p class="text-yellow-700 text-sm">
                  Only seek support when and where it feels safe to do so. If you're in an unsupportive environment, 
                  prioritize your safety and consider online resources first.
                </p>
              </div>
            </div>
          </div>

          <!-- Question 7 -->
          <div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-start">
              <span class="text-purple-600 mr-3 flex-shrink-0">Q7:</span>
              What if my family/friends won't accept me?
            </h3>
            <div class="text-gray-600 bg-gray-50 p-6 rounded-lg ml-8">
              <p class="mb-4">
                Fear of rejection is one of the most common concerns for LGBTQ+ people, and it's completely understandable. 
                Here's some perspective and advice:
              </p>
              <div class="space-y-4 mb-4">
                <div class="bg-green-50 p-4 rounded border border-green-200">
                  <h4 class="font-semibold text-green-800 mb-2">💚 Many People Surprise You</h4>
                  <p class="text-green-700 text-sm">
                    Sometimes people who seem like they might not be supportive turn out to be more accepting than expected. 
                    People can learn, grow, and change their perspectives.
                  </p>
                </div>
                <div class="bg-blue-50 p-4 rounded border border-blue-200">
                  <h4 class="font-semibold text-blue-800 mb-2">🛡️ You Don't Owe Anyone Coming Out</h4>
                  <p class="text-blue-700 text-sm">
                    Coming out is entirely your choice. You can take your time, choose who to tell and when, 
                    or keep your identity private if that feels safer.
                  </p>
                </div>
                <div class="bg-purple-50 p-4 rounded border border-purple-200">
                  <h4 class="font-semibold text-purple-800 mb-2">🌟 Build Your Chosen Family</h4>
                  <p class="text-purple-700 text-sm">
                    If biological family isn't supportive, you can create a "chosen family" of friends and community 
                    members who love and accept you for who you are.
                  </p>
                </div>
              </div>
              <p class="text-purple-700 font-medium">
                Remember: Your worth isn't determined by other people's acceptance. You deserve love and respect exactly as you are.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Important Notes -->
      <div class="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-purple-100">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Important Notes</h2>
        <div class="space-y-4">
          <div class="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 class="font-semibold text-purple-900 mb-3 flex items-center">
              <span class="text-2xl mr-3">🌈</span>Self-Discovery Journey
            </h3>
            <ul class="text-purple-800 text-sm space-y-2">
              <li>• This quiz is for self-reflection and exploration</li>
              <li>• There are no "right" or "wrong" answers</li>
              <li>• Your feelings and identity are valid regardless of the result</li>
              <li>• Take your time to think about each question</li>
            </ul>
          </div>
          
          <div class="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 class="font-semibold text-blue-900 mb-3 flex items-center">
              <span class="text-2xl mr-3">🔒</span>Privacy & Safety
            </h3>
            <ul class="text-blue-800 text-sm space-y-2">
              <li>• All answers are completely private and anonymous</li>
              <li>• No data is stored or transmitted</li>
              <li>• Results stay on your device only</li>
              <li>• Take the quiz in a comfortable, private setting</li>
            </ul>
          </div>
          
          <div class="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 class="font-semibold text-green-900 mb-3 flex items-center">
              <span class="text-2xl mr-3">💚</span>Support & Resources
            </h3>
            <ul class="text-green-800 text-sm space-y-2">
              <li>• Remember that questioning is normal and healthy</li>
              <li>• Consider talking to trusted friends, family, or counselors</li>
              <li>• LGBTQ+ support groups and communities can be helpful</li>
              <li>• Your journey of self-discovery is unique to you</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
// Meta tags for SEO
useHead({
  title: 'Gay Test - Am I Gay Quiz | Free Online Sexual Orientation Quiz',
  meta: [
    { name: 'description', content: 'Confused about your sexuality? Take our fun Gay Test quiz to explore your feelings and find answers within yourself. Choose whatever label feels right for you - completely anonymous and judgment-free!' },
    { name: 'keywords', content: 'gay test, am I gay quiz, sexual orientation quiz, LGBTQ quiz, sexuality test, gay quiz online' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'Gay Test - Am I Gay Quiz | Free Online Sexual Orientation Quiz' },
    { property: 'og:description', content: 'Confused about your sexuality? Take our fun Gay Test quiz to explore your feelings and find answers within yourself. Choose whatever label feels right for you - completely anonymous and judgment-free!' },
    { property: 'og:image', content: 'https://ricetest.net/ricetestsicon.png' },
    { property: 'og:url', content: 'https://ricetest.net/quiz/gay-test' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Gay Test - Am I Gay Quiz | Free Online Sexual Orientation Quiz' },
    { name: 'twitter:description', content: 'Confused about your sexuality? Take our fun Gay Test quiz to explore your feelings and find answers within yourself. Choose whatever label feels right for you - completely anonymous and judgment-free!' },
    { name: 'twitter:image', content: 'https://ricetest.net/ricetestsicon.png' }
  ],
  link: [
    { rel: 'canonical', href: 'https://ricetest.net/quiz/gay-test' }
  ]
})

// Reactive data
const currentQuestion = ref(0)
const answers = ref([])
const showShareModal = ref(false)

// Questions data
const questions = ref([
  {
    question: "Have you ever had feelings for a same-gender close friend?",
    options: [
      { text: "I think so. That's why I'm taking this quiz.", value: 3 },
      { text: "Wait, what's the difference between friendship and a crush?", value: 2 },
      { text: "Don't think so, but we're so close people joke that we're dating.", value: 1 },
      { text: "Nope. We're just friends.", value: 0 }
    ]
  },
  {
    question: "Have you ever kissed someone or wanted to kiss someone of the same gender?",
    options: [
      { text: "Definitely, and it was great.", value: 3 },
      { text: "I haven't done it, but I want to try it.", value: 2 },
      { text: "Yeah, and I'm not sure how I felt about it.", value: 1 },
      { text: "Nope. Not interested.", value: 0 }
    ]
  },
  {
    question: "How do you feel about queer characters in TV shows and movies?",
    options: [
      { text: "Oh, I've totally watched shows just for the queer ships and storylines.", value: 3 },
      { text: "I kind of feel like I can identify with queer characters.", value: 2 },
      { text: "I notice queer characters, but I don't feel strongly about them.", value: 1 },
      { text: "I like the positive representation, but they don't stand out to me.", value: 0 }
    ]
  },
  {
    question: "When someone asks you who you're crushing on:",
    options: [
      { text: "A name comes to mind immediately, and it's someone of the same gender.", value: 3 },
      { text: "I make up a name or pick someone random.", value: 2 },
      { text: "I literally don't get the big deal about crushes.", value: 1 },
      { text: "I talk about someone of the opposite sex who I'm genuinely crushing on.", value: 0 }
    ]
  },
  {
    question: "Has anyone ever asked you if you were gay?",
    options: [
      { text: "People pretty much assume that about me all the time.", value: 3 },
      { text: "I've been asked that once or twice.", value: 2 },
      { text: "No one has asked directly if I'm gay, but I wouldn't be surprised if they did ask.", value: 1 },
      { text: "Never. People assume I'm straight.", value: 0 }
    ]
  },
  {
    question: "When you imagine being in a relationship, what do you picture?",
    options: [
      { text: "I can only see myself with someone of the same sex.", value: 3 },
      { text: "I'm not sure. Any gender seems okay.", value: 2 },
      { text: "I'll probably be with someone of the opposite sex.", value: 1 },
      { text: "I can only see myself with someone of the opposite sex.", value: 0 }
    ]
  },
  {
    question: "How would you feel about identifying as gay?",
    options: [
      { text: "Yeah, that feels right.", value: 3 },
      { text: "It honestly makes me a little nervous, but also kinda fits.", value: 2 },
      { text: "I'm not sure how I feel.", value: 1 },
      { text: "No, I really don't think that's me.", value: 0 }
    ]
  },
  {
    question: "Have you ever felt attracted to someone of the same gender?",
    options: [
      { text: "Yes.", value: 3 },
      { text: "Yeah, but everyone has, right?", value: 2 },
      { text: "People of the same gender are just objectively more attractive.", value: 1 },
      { text: "Nope.", value: 0 }
    ]
  },
  {
    question: "How do you feel about dating someone of the opposite gender?",
    options: [
      { text: "I'm not interested. That would feel like a chore.", value: 3 },
      { text: "I wouldn't mind, and I've either wanted to do it or have done it.", value: 1 },
      { text: "Maybe, but I'm not really interested in anyone.", value: 1 },
      { text: "I'd definitely date (or have dated) someone of the opposite gender.", value: 0 }
    ]
  },
  {
    question: "Do you ever fantasize about being with someone of the same gender?",
    options: [
      { text: "Yeah. Pretty often.", value: 3 },
      { text: "Sometimes.", value: 2 },
      { text: "Yes, but I'm not sure I'd actually end up with someone of the same gender.", value: 1 },
      { text: "No.", value: 0 }
    ]
  },
  {
    question: "When you imagine kissing or being intimate with a future partner, how do you feel?",
    options: [
      { text: "As long as I'm with someone I really like, that sounds great.", value: 2 },
      { text: "Good, I guess?", value: 1 },
      { text: "I can't imagine that, and I don't think I'll ever want that, regardless of gender.", value: 0 },
      { text: "I'm too young for that.", value: 0 }
    ]
  },
  {
    question: "If you scroll through your feed or FYP, do you see content from queer creators?",
    options: [
      { text: "Yup. You got me.", value: 3 },
      { text: "Maybe! It depends on the day.", value: 2 },
      { text: "Yeah, but only because I've looked at one or two related posts.", value: 1 },
      { text: "Probably not.", value: 0 }
    ]
  },
  {
    question: "Flash forward 5 years: how likely is it that your partner is the same gender as you?",
    options: [
      { text: "Very likely.", value: 3 },
      { text: "Pretty likely.", value: 2 },
      { text: "Possible, but not super likely.", value: 1 },
      { text: "Not very likely.", value: 0 }
    ]
  },
  {
    question: "Would you be comfortable using an LGBTQ+ dating app?",
    options: [
      { text: "Absolutely! I already have one downloaded.", value: 3 },
      { text: "I'm open to giving one a try.", value: 2 },
      { text: "Not really, but I won't rule it out completely.", value: 1 },
      { text: "No. That makes me uncomfortable.", value: 0 }
    ]
  },
  {
    question: "Are there a lot of LGBTQ+ individuals in your friend group?",
    options: [
      { text: "Absolutely! Lots of my friends are queer.", value: 3 },
      { text: "A few good friends of mine identify as LGBTQ+.", value: 2 },
      { text: "Not really—most of my friends are straight.", value: 1 },
      { text: "Nope. My entire friend group is straight.", value: 0 }
    ]
  },
  {
    question: "What inspired you to take this quiz?",
    options: [
      { text: "I think I might be gay, but I wanted some extra validation.", value: 3 },
      { text: "I identify with aspects of the queer experience but am not totally sure where I stand.", value: 2 },
      { text: "I'm just curious about the result I'll get.", value: 1 },
      { text: "I want to confirm that I'm heterosexual.", value: 0 }
    ]
  }
])

// Computed properties
const isComplete = computed(() => {
  return answers.value.length === questions.value.length
})

const totalScore = computed(() => {
  return answers.value.reduce((sum, answer) => sum + answer, 0)
})

const result = computed(() => {
  const score = totalScore.value
  const maxScore = questions.value.length * 3
  const percentage = (score / maxScore) * 100
  
  if (percentage >= 75) {
    return {
      title: "Very Likely Gay",
      description: "Based on your answers, you show strong indicators of being gay. You seem to have clear same-gender attractions and feelings that align with a gay identity.",
      reminder: "This is just one perspective on your journey of self-discovery. Trust your own feelings and take your time exploring your identity. You know yourself best!"
    }
  } else if (percentage >= 50) {
    return {
      title: "Possibly Gay or Questioning",
      description: "Your answers suggest you might be gay or are in the process of questioning your sexual orientation. This is a completely normal and healthy part of self-discovery.",
      reminder: "Questioning your sexuality is completely normal. Take your time, talk to trusted people, and remember that your feelings are valid whatever you discover about yourself."
    }
  } else if (percentage >= 25) {
    return {
      title: "Some Questioning or Curiosity",
      description: "Your answers show some curiosity or questioning about same-gender attractions. This could mean you're exploring your sexuality or just have some natural curiosity.",
      reminder: "Having curiosity or occasional questioning is completely normal. Everyone's journey is different, and there's no pressure to label yourself or rush into any conclusions."
    }
  } else {
    return {
      title: "Likely Heterosexual",
      description: "Based on your answers, you seem to identify strongly with heterosexual attractions and experiences. Your feelings appear to align with a straight identity.",
      reminder: "Remember that sexuality can be fluid and personal. Whatever you feel is valid, and it's okay if your feelings change or evolve over time. You know yourself best!"
    }
  }
})

// Methods
const scrollToTest = () => {
  if (process.client) {
    // 直接滚动到主内容区域
    const mainContent = document.querySelector('#main-content')
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

const answerQuestion = (optionIndex) => {
  const questionData = questions.value[currentQuestion.value]
  const selectedOption = questionData.options[optionIndex]
  
  answers.value[currentQuestion.value] = selectedOption.value
  
  // Auto advance to next question
  setTimeout(() => {
    if (currentQuestion.value < questions.value.length - 1) {
      currentQuestion.value++
    } else {
      // Scroll to results
      setTimeout(() => {
        const resultsSection = document.querySelector('#results-section')
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
    }
  }, 200)
}

const resetTest = () => {
  answers.value = []
  currentQuestion.value = 0
  showShareModal.value = false
  
  // Scroll back to top
  scrollToTest()
}

// Share functions
const getShareText = () => {
  return `I just took the Gay Test quiz and got: "${result.value.title}"! 🌈
  
Take the quiz yourself and explore your own feelings: https://ricetest.net/quiz/gay-test

#GayTest #SelfDiscovery #LGBTQ #Quiz`
}

const shareToTwitter = () => {
  const text = getShareText()
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
  window.open(url, '_blank')
  showShareModal.value = false
}

const shareToFacebook = () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://ricetest.net/quiz/gay-test')}`
  window.open(url, '_blank')
  showShareModal.value = false
}

const shareToInstagram = () => {
  alert('📷 Copy this link to share on Instagram:\n\nhttps://ricetest.net/quiz/gay-test')
  navigator.clipboard.writeText('https://ricetest.net/quiz/gay-test')
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

// Confetti animation
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
      rgba(147, 51, 234, 0.03) 2px,
      rgba(147, 51, 234, 0.03) 4px
    );
}

/* 权威认证勾动画 */
.expert-certification {
  animation: certification-glow 3s ease-in-out infinite;
}

@keyframes certification-glow {
  0%, 100% {
    filter: drop-shadow(0 0 8px rgba(147, 51, 234, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 16px rgba(147, 51, 234, 0.6));
  }
}

/* 权威标签动画 */
.certified-badge {
  animation: badge-pulse 2s ease-in-out infinite;
}

@keyframes badge-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(147, 51, 234, 0.5);
  }
}

/* 跳动按钮动画 */
.start-quiz-btn {
  animation: quiz-bounce 2s ease-in-out infinite;
}

@keyframes quiz-bounce {
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.05);
  }
  50% {
    transform: scale(0.98);
  }
  75% {
    transform: scale(1.02);
  }
}
</style>