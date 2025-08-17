# Apple Theme 样式指南

## 🎨 概述

这套苹果主题样式系统为RiceTests提供了统一的钻石星空设计语言，包含苹果风格的字体、毛玻璃效果和交互动画。

## 🍎 字体系统

已自动应用苹果字体栈到全站：
- iOS/macOS: SF Pro Display/Text
- Windows: Microsoft YaHei
- 其他平台: Helvetica Neue 降级

## ✨ 核心样式类

### 背景效果

```vue
<!-- 钻石星空背景 -->
<div class="diamond-stars-bg">
  <!-- 内容 -->
</div>

<!-- 钻石几何图案 -->
<div class="diamond-pattern">
  <!-- 内容 -->
</div>

<!-- 渐变背景 -->
<div class="diamond-gradient">
  <!-- 浅色渐变 -->
</div>

<div class="diamond-gradient-dark">
  <!-- 深色渐变 -->
</div>
```

### 毛玻璃效果

```vue
<!-- 苹果风格毛玻璃 -->
<div class="apple-glass">
  <!-- 高级毛玻璃效果，自动降级 -->
</div>

<!-- 通用卡片样式 -->
<div class="apple-card">
  <!-- 带悬停效果的卡片 -->
</div>
```

### 按钮样式

```vue
<!-- 基础苹果按钮 -->
<button class="apple-button bg-blue-500 text-white">
  点击我
</button>

<!-- 可以与Tailwind组合使用 -->
<button class="apple-button bg-green-500 hover:bg-green-600 text-white">
  确认
</button>
```

### 输入框样式

```vue
<!-- 苹果风格输入框 -->
<input 
  class="apple-input w-full" 
  type="text" 
  placeholder="请输入..."
/>

<!-- 文本域 -->
<textarea 
  class="apple-input w-full h-32" 
  placeholder="请输入详细信息..."
></textarea>
```

### 文字样式

```vue
<!-- 标题 -->
<h1 class="apple-title">主标题</h1>
<h2 class="apple-title text-2xl">副标题</h2>

<!-- 副标题 -->
<p class="apple-subtitle">这是一段描述文字</p>
```

### 布局容器

```vue
<!-- 响应式容器 -->
<div class="apple-container">
  <!-- 内容会自动居中，响应式边距 -->
</div>

<!-- 响应式间距 -->
<div class="apple-spacing">
  <!-- 自动响应式padding -->
</div>
```

### 阴影效果

```vue
<!-- 普通阴影 -->
<div class="apple-shadow">
  <!-- 内容 -->
</div>

<!-- 大阴影 -->
<div class="apple-shadow-lg">
  <!-- 内容 -->
</div>
```

### 状态指示器

```vue
<!-- 成功状态 -->
<div class="apple-status-success px-4 py-2 rounded-lg">
  操作成功
</div>

<!-- 警告状态 -->
<div class="apple-status-warning px-4 py-2 rounded-lg">
  请注意
</div>

<!-- 错误状态 -->
<div class="apple-status-error px-4 py-2 rounded-lg">
  出现错误
</div>

<!-- 信息状态 -->
<div class="apple-status-info px-4 py-2 rounded-lg">
  提示信息
</div>
```

### 动画效果

```vue
<!-- 淡入动画 -->
<div class="apple-fade-in">
  <!-- 内容会从下方淡入 -->
</div>
```

## 🎯 最佳实践

### 页面结构推荐

```vue
<template>
  <div class="diamond-stars-bg min-h-screen">
    <div class="apple-container apple-spacing">
      <!-- 页面标题 -->
      <h1 class="apple-title text-center mb-8">页面标题</h1>
      
      <!-- 主要内容 -->
      <div class="apple-card apple-spacing">
        <h2 class="apple-title text-xl mb-4">内容标题</h2>
        <p class="apple-subtitle mb-6">内容描述</p>
        
        <!-- 按钮组 -->
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
```

### 表单布局推荐

```vue
<template>
  <div class="apple-card apple-spacing max-w-md mx-auto">
    <h2 class="apple-title text-xl mb-6 text-center">表单标题</h2>
    
    <form class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-2">用户名</label>
        <input 
          type="text" 
          class="apple-input w-full"
          placeholder="请输入用户名"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">密码</label>
        <input 
          type="password" 
          class="apple-input w-full"
          placeholder="请输入密码"
        />
      </div>
      
      <button 
        type="submit" 
        class="apple-button bg-blue-500 hover:bg-blue-600 text-white w-full"
      >
        提交
      </button>
    </form>
  </div>
</template>
```

## 🔧 自定义与扩展

### 与Tailwind CSS结合

这套主题完全兼容Tailwind CSS，可以自由组合使用：

```vue
<!-- 组合使用 -->
<div class="apple-card p-8 max-w-lg mx-auto">
  <h3 class="apple-title text-xl text-blue-600 mb-4">自定义标题</h3>
  <p class="apple-subtitle text-gray-700">自定义内容</p>
</div>
```

### 创建自定义变体

```css
/* 在你的组件中添加 */
.my-custom-card {
  @apply apple-card;
  /* 添加自定义样式 */
  border-left: 4px solid #3b82f6;
}
```

## 🌟 特色功能

1. **自动降级**: 毛玻璃效果在不支持的浏览器中自动降级
2. **响应式**: 所有样式都考虑了移动端适配
3. **性能优化**: 使用了CSS的最佳实践，减少重绘和重排
4. **可访问性**: 保持了良好的对比度和可读性

## 📱 浏览器支持

- Chrome 76+
- Firefox 70+
- Safari 13+
- Edge 79+

## 🎨 色彩方案

- 主色调: 钻石浅蓝色 (#7dd3fc, #bfdbfe)
- 背景: 白色透明度变化
- 文字: 深灰色系 (#1f2937, #374151)
- 强调色: 天蓝色 (#3b82f6)