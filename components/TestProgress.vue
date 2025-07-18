<template>
  <div class="w-full">
    <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
      <div 
        class="bg-blue-500 h-3 rounded-full transition-all duration-500"
        :style="{ width: `${progressPercentage}%` }"
      ></div>
    </div>
    <p class="text-center text-sm text-gray-600">
      Question {{ currentQuestion + 1 }} of {{ totalQuestions }}
      <span v-if="showPercentage" class="ml-2 text-blue-600 font-medium">
        ({{ Math.round(progressPercentage) }}%)
      </span>
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  currentQuestion: {
    type: Number,
    required: true,
    default: 0
  },
  totalQuestions: {
    type: Number,
    required: true,
    default: 100
  },
  showPercentage: {
    type: Boolean,
    default: false
  },
  // 可以自定义进度条颜色
  progressColor: {
    type: String,
    default: 'bg-blue-500'
  }
})

// 计算进度百分比
const progressPercentage = computed(() => {
  if (props.totalQuestions === 0) return 0
  return Math.min(((props.currentQuestion + 1) / props.totalQuestions) * 100, 100)
})
</script>