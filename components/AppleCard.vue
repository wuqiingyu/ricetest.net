<template>
  <div 
    :class="cardClasses"
    class="apple-card apple-spacing transition-all duration-300"
    @click="handleClick"
  >
    <!-- 图标插槽 -->
    <div v-if="icon || $slots.icon" class="text-center mb-4">
      <slot name="icon">
        <div class="text-sky-500 text-3xl">{{ icon }}</div>
      </slot>
    </div>
    
    <!-- 标题 -->
    <h3 v-if="title" class="apple-title text-lg mb-3 text-center">
      {{ title }}
    </h3>
    
    <!-- 内容插槽 -->
    <div class="apple-subtitle text-center">
      <slot>
        <p v-if="description">{{ description }}</p>
      </slot>
    </div>
    
    <!-- 操作按钮插槽 -->
    <div v-if="$slots.actions" class="mt-6 text-center">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
// Props定义
const props = defineProps({
  // 卡片标题
  title: {
    type: String,
    default: ''
  },
  
  // 卡片描述
  description: {
    type: String,
    default: ''
  },
  
  // 图标
  icon: {
    type: String,
    default: ''
  },
  
  // 卡片变体
  variant: {
    type: String,
    default: 'default', // default, glass, pattern
    validator: (value) => ['default', 'glass', 'pattern'].includes(value)
  },
  
  // 是否可点击
  clickable: {
    type: Boolean,
    default: false
  },
  
  // 是否有悬停效果
  hoverable: {
    type: Boolean,
    default: true
  },
  
  // 自定义CSS类
  customClass: {
    type: String,
    default: ''
  }
})

// 事件定义
const emit = defineEmits(['click'])

// 计算卡片样式类
const cardClasses = computed(() => {
  const classes = []
  
  // 基础样式
  if (props.variant === 'glass') {
    classes.push('apple-glass')
  } else if (props.variant === 'pattern') {
    classes.push('diamond-pattern')
  }
  
  // 交互样式
  if (props.clickable) {
    classes.push('cursor-pointer')
  }
  
  if (props.hoverable) {
    classes.push('hover:scale-105')
  }
  
  // 自定义类
  if (props.customClass) {
    classes.push(props.customClass)
  }
  
  return classes.join(' ')
})

// 处理点击事件
const handleClick = (event) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<style scoped>
/* 组件特有样式 */
.apple-card {
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>