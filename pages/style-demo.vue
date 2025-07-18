<template>
  <div class="diamond-stars-bg min-h-screen">
    <div class="apple-container apple-spacing">
      <!-- 页面标题 -->
      <h1 class="apple-title text-center mb-12">Apple Theme 样式演示</h1>
      
      <!-- 卡片演示 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <!-- 基础卡片 -->
        <div class="apple-card apple-spacing">
          <div class="text-sky-500 text-2xl mb-3 text-center">💎</div>
          <h3 class="apple-title text-lg mb-2 text-center">基础卡片</h3>
          <p class="apple-subtitle text-center">这是一个基础的苹果风格卡片</p>
        </div>
        
        <!-- 毛玻璃卡片 -->
        <div class="apple-glass rounded-2xl p-6">
          <div class="text-sky-500 text-2xl mb-3 text-center">⭐</div>
          <h3 class="apple-title text-lg mb-2 text-center">毛玻璃效果</h3>
          <p class="apple-subtitle text-center">高级毛玻璃背景效果</p>
        </div>
        
        <!-- 钻石图案卡片 -->
        <div class="apple-card apple-spacing diamond-pattern">
          <div class="text-sky-500 text-2xl mb-3 text-center">🌟</div>
          <h3 class="apple-title text-lg mb-2 text-center">钻石图案</h3>
          <p class="apple-subtitle text-center">带有钻石几何图案的卡片</p>
        </div>
      </div>
      
      <!-- 按钮演示 -->
      <div class="apple-card apple-spacing mb-12">
        <h2 class="apple-title text-xl mb-6 text-center">按钮样式</h2>
        <div class="flex flex-wrap gap-4 justify-center">
          <button class="apple-button bg-blue-500 hover:bg-blue-600 text-white">
            主要按钮
          </button>
          <button class="apple-button bg-green-500 hover:bg-green-600 text-white">
            成功按钮
          </button>
          <button class="apple-button bg-red-500 hover:bg-red-600 text-white">
            危险按钮
          </button>
          <button class="apple-button bg-gray-500 hover:bg-gray-600 text-white">
            次要按钮
          </button>
        </div>
      </div>
      
      <!-- 表单演示 -->
      <div class="apple-card apple-spacing max-w-md mx-auto mb-12">
        <h2 class="apple-title text-xl mb-6 text-center">表单样式</h2>
        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">姓名</label>
            <input 
              type="text" 
              class="apple-input w-full"
              placeholder="请输入您的姓名"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">邮箱</label>
            <input 
              type="email" 
              class="apple-input w-full"
              placeholder="请输入您的邮箱"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">留言</label>
            <textarea 
              class="apple-input w-full h-32"
              placeholder="请输入您的留言..."
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            class="apple-button bg-blue-500 hover:bg-blue-600 text-white w-full"
          >
            提交表单
          </button>
        </form>
      </div>
      
      <!-- 状态指示器演示 -->
      <div class="apple-card apple-spacing mb-12">
        <h2 class="apple-title text-xl mb-6 text-center">状态指示器</h2>
        <div class="space-y-4">
          <div class="apple-status-success px-4 py-3 rounded-lg">
            <strong>成功:</strong> 操作完成！
          </div>
          <div class="apple-status-info px-4 py-3 rounded-lg">
            <strong>信息:</strong> 这是一条提示信息
          </div>
          <div class="apple-status-warning px-4 py-3 rounded-lg">
            <strong>警告:</strong> 请注意这个重要信息
          </div>
          <div class="apple-status-error px-4 py-3 rounded-lg">
            <strong>错误:</strong> 出现了一个错误
          </div>
        </div>
      </div>
      
      <!-- 阴影演示 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div class="apple-card apple-spacing apple-shadow">
          <h3 class="apple-title text-lg mb-2 text-center">普通阴影</h3>
          <p class="apple-subtitle text-center">这个卡片有普通的阴影效果</p>
        </div>
        
        <div class="apple-card apple-spacing apple-shadow-lg">
          <h3 class="apple-title text-lg mb-2 text-center">大阴影</h3>
          <p class="apple-subtitle text-center">这个卡片有更强的阴影效果</p>
        </div>
      </div>
      
      <!-- 渐变背景演示 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div class="diamond-gradient rounded-2xl p-6">
          <h3 class="apple-title text-lg mb-2 text-center">浅色渐变</h3>
          <p class="apple-subtitle text-center">钻石浅蓝色渐变背景</p>
        </div>
        
        <div class="diamond-gradient-dark rounded-2xl p-6 text-white">
          <h3 class="apple-title text-lg mb-2 text-center text-white">深色渐变</h3>
          <p class="apple-subtitle text-center text-blue-100">蓝色深色渐变背景</p>
        </div>
      </div>
      
      <!-- 动画演示 -->
      <div class="apple-card apple-spacing apple-fade-in">
        <h2 class="apple-title text-xl mb-4 text-center">动画效果</h2>
        <p class="apple-subtitle text-center mb-6">这个卡片有淡入动画效果</p>
        <div class="text-center">
          <button 
            class="apple-button bg-purple-500 hover:bg-purple-600 text-white"
            @click="refreshDemo"
          >
            刷新演示
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// SEO Meta
useHead({
  title: 'Apple Theme 样式演示 - RiceTests',
  meta: [
    { name: 'description', content: '展示RiceTests苹果主题样式系统的完整演示页面' },
    { name: 'keywords', content: 'apple theme, css, design system, 苹果主题, 样式系统' }
  ]
})

// 刷新演示
const refreshDemo = () => {
  // 重新加载页面来显示动画
  window.location.reload()
}
</script>

<style scoped>
/* 页面特有样式 */
.grid > div {
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>