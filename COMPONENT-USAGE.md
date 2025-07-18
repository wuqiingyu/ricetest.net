# 组件使用示例

## AppleCard 组件

### 基础用法

```vue
<template>
  <div class="diamond-stars-bg min-h-screen">
    <div class="apple-container apple-spacing">
      <!-- 基础卡片 -->
      <AppleCard
        title="基础卡片"
        description="这是一个基础的苹果风格卡片"
        icon="💎"
      />
      
      <!-- 毛玻璃卡片 -->
      <AppleCard
        title="毛玻璃卡片"
        description="带有毛玻璃效果的卡片"
        icon="⭐"
        variant="glass"
      />
      
      <!-- 可点击卡片 -->
      <AppleCard
        title="可点击卡片"
        description="点击我试试看"
        icon="🌟"
        clickable
        @click="handleCardClick"
      />
      
      <!-- 自定义插槽 -->
      <AppleCard title="自定义内容">
        <template #icon>
          <div class="text-4xl text-purple-500">🎨</div>
        </template>
        
        <div class="space-y-2">
          <p>这是自定义的内容</p>
          <p class="text-sm text-gray-600">可以放置任何内容</p>
        </div>
        
        <template #actions>
          <button class="apple-button bg-purple-500 hover:bg-purple-600 text-white">
            自定义按钮
          </button>
        </template>
      </AppleCard>
    </div>
  </div>
</template>

<script setup>
const handleCardClick = () => {
  alert('卡片被点击了！')
}
</script>
```

### 在网格布局中使用

```vue
<template>
  <div class="diamond-stars-bg min-h-screen">
    <div class="apple-container apple-spacing">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AppleCard
          v-for="item in cardItems"
          :key="item.id"
          :title="item.title"
          :description="item.description"
          :icon="item.icon"
          :variant="item.variant"
          clickable
          @click="() => handleItemClick(item)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const cardItems = [
  {
    id: 1,
    title: '功能一',
    description: '这是功能一的描述',
    icon: '💎',
    variant: 'default'
  },
  {
    id: 2,
    title: '功能二',
    description: '这是功能二的描述',
    icon: '⭐',
    variant: 'glass'
  },
  {
    id: 3,
    title: '功能三',
    description: '这是功能三的描述',
    icon: '🌟',
    variant: 'pattern'
  }
]

const handleItemClick = (item) => {
  console.log('点击了:', item.title)
}
</script>
```

## 全局样式类使用

### 创建新页面模板

```vue
<template>
  <div class="diamond-stars-bg min-h-screen">
    <div class="apple-container apple-spacing">
      <!-- 页面标题 -->
      <h1 class="apple-title text-center mb-8">页面标题</h1>
      
      <!-- 主要内容区域 -->
      <div class="apple-card apple-spacing max-w-2xl mx-auto">
        <h2 class="apple-title text-xl mb-4">内容标题</h2>
        <p class="apple-subtitle mb-6">内容描述文字</p>
        
        <!-- 操作按钮 -->
        <div class="flex gap-4 justify-center">
          <button class="apple-button bg-blue-500 hover:bg-blue-600 text-white">
            主要操作
          </button>
          <button class="apple-button bg-gray-500 hover:bg-gray-600 text-white">
            次要操作
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 页面meta信息
useHead({
  title: '页面标题 - RiceTests',
  meta: [
    { name: 'description', content: '页面描述' }
  ]
})
</script>
```

### 表单页面模板

```vue
<template>
  <div class="diamond-stars-bg min-h-screen">
    <div class="apple-container apple-spacing">
      <div class="apple-card apple-spacing max-w-md mx-auto">
        <h1 class="apple-title text-xl mb-6 text-center">表单标题</h1>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">字段名</label>
            <input 
              v-model="formData.field"
              type="text" 
              class="apple-input w-full"
              placeholder="请输入..."
              required
            />
          </div>
          
          <div class="flex gap-4">
            <button 
              type="submit" 
              class="apple-button bg-blue-500 hover:bg-blue-600 text-white flex-1"
            >
              提交
            </button>
            <button 
              type="button" 
              class="apple-button bg-gray-500 hover:bg-gray-600 text-white flex-1"
              @click="handleCancel"
            >
              取消
            </button>
          </div>
        </form>
        
        <!-- 状态提示 -->
        <div v-if="status" class="mt-4">
          <div :class="statusClass" class="px-4 py-2 rounded-lg">
            {{ status }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const formData = reactive({
  field: ''
})

const status = ref('')
const statusType = ref('')

const statusClass = computed(() => {
  const base = 'apple-status-'
  return base + statusType.value
})

const handleSubmit = () => {
  // 处理表单提交
  status.value = '提交成功！'
  statusType.value = 'success'
}

const handleCancel = () => {
  // 处理取消
  formData.field = ''
  status.value = ''
}
</script>
```

## 最佳实践

1. **始终使用 `diamond-stars-bg` 作为页面背景**
2. **使用 `apple-container` 和 `apple-spacing` 保持一致的布局**
3. **优先使用预定义的样式类，避免自定义样式**
4. **合理使用 `apple-card` 组织内容**
5. **按钮统一使用 `apple-button` 类**
6. **表单元素统一使用 `apple-input` 类**