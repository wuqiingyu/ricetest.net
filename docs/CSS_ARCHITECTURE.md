# RiceTest.net CSS架构文档

## 概述

RiceTest.net使用Nuxt.js 3 + Tailwind CSS + 自定义CSS的混合架构，不同页面和组件有不同的样式策略。

## CSS技术栈

- **Tailwind CSS**: 主要的CSS框架，提供utility-first的类名
- **自定义CSS**: 针对特定组件的自定义样式
- **Scoped/Global CSS**: Vue单文件组件中的样式作用域控制
- **Nuxt CSS配置**: 全局CSS文件导入

## 文件结构

```
assets/css/
├── main.css              # 全局基础样式
└── apple-theme.css       # Apple风格主题样式

components/
├── Quiz/
│   ├── DynamicQuizCategory.vue    # 动态分类卡片（全局CSS）
│   ├── DynamicQuizCard.vue        # 单个quiz卡片组件
│   └── QuizQuestion.vue           # 问题页面组件
├── Header.vue            # 网站头部
└── Footer.vue           # 网站底部

pages/
└── quiz/
    └── index.vue         # Quiz主页（包含trending tests样式）

layouts/
└── default.vue          # 默认布局

nuxt.config.ts           # CSS配置入口
```

## 样式策略分析

### 1. 全局样式层级

**优先级从高到低：**
1. 内联样式 `style="..."`
2. 组件内CSS（有`!important`）
3. 全局CSS（无scoped）
4. Tailwind CSS类
5. 浏览器默认样式

### 2. Quiz卡片样式架构

#### 2.1 Trending Tests区域
**位置**: `/pages/quiz/index.vue` (第768-793行)
**作用域**: 页面级CSS
**策略**: 原生CSS + `!important` 覆盖

```css
/* 页面级样式 - 应用于trending tests */
.quiz-card-title,
.quiz-card-title.available,
.quiz-card-title.coming-soon {
  @apply text-xl font-bold mb-4 md:mb-6;
  display: -webkit-box !important;
  -webkit-line-clamp: 1 !important;        /* 1行显示 */
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: normal !important;
  height: 1.5rem !important;               /* 固定1行高度 */
  line-height: 1.5rem !important;
}
```

**特点:**
- 1行标题显示，超出用省略号
- 居中对齐（继承父容器）
- 使用Tailwind的`@apply`指令
- 高优先级`!important`覆盖

#### 2.2 动态分类卡片
**位置**: `/components/Quiz/DynamicQuizCategory.vue` (第218-273行)
**作用域**: 全局CSS（非scoped）
**策略**: 原生CSS + 具体选择器

```css
/* 全局样式 - 应用于动态分类卡片 */
.quiz-card-content .quiz-card-title {
  font-size: 1.25rem !important;
  font-weight: bold !important;
  color: #111827 !important;
  height: 5.25rem !important;              /* 3行高度 */
  line-height: 1.4 !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 3 !important;        /* 3行显示 */
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  margin-bottom: 0.5rem !important;
  text-align: left !important;             /* 左对齐 */
}
```

**特点:**
- 3行标题显示，超出用省略号
- 左对齐
- 不使用Tailwind，纯原生CSS
- 通过具体选择器提高优先级

### 3. 样式冲突解决策略

#### 3.1 选择器优先级
```css
/* 低优先级 */
.quiz-card-title { }

/* 中等优先级 */
.quiz-card-content .quiz-card-title { }

/* 高优先级 */
.quiz-card-title.available { }

/* 最高优先级 */
.quiz-card-content .quiz-card-title { !important }
```

#### 3.2 Vue Scoped CSS问题
**问题**: 当组件使用`<style scoped>`时，Vue会给选择器添加数据属性（如`[data-v-abc123]`），可能导致样式无法应用到动态生成的元素。

**解决方案**: 
- 对于需要影响动态内容的样式，使用非scoped的`<style>`
- 或使用深度选择器`:deep()`

#### 3.3 Tailwind vs 自定义CSS
```css
/* Tailwind方式 */
.quiz-card-title {
  @apply text-xl font-bold mb-4;  /* 编译时转换为CSS */
}

/* 原生CSS方式 */
.quiz-card-title {
  font-size: 1.25rem;            /* 运行时直接应用 */
  font-weight: bold;
  margin-bottom: 1rem;
}
```

**优缺点对比:**
- **Tailwind**: 保持一致性，但优先级可能不够
- **原生CSS**: 完全控制，但需要手动管理

## 4. 布局系统

### 4.1 Flexbox布局策略
```css
.quiz-card-content {
  display: flex;
  flex-direction: column;
  height: 180px;                 /* 固定高度 */
}

.quiz-card-title {
  height: 5.25rem;               /* 固定标题区域 */
}

.quiz-card-button {
  margin-top: auto;              /* 推到底部 */
}
```

### 4.2 响应式设计
```css
.quiz-card-content {
  padding: 1rem 1.5rem;
}

@media (min-width: 768px) {
  .quiz-card-content {
    padding: 1.5rem;
  }
}
```

## 5. 最佳实践

### 5.1 CSS组织原则
1. **功能分离**: 全局样式vs组件样式vs页面样式
2. **优先级管理**: 合理使用`!important`和选择器权重
3. **作用域控制**: 明确哪些样式需要scoped，哪些需要全局

### 5.2 命名约定
```css
/* 组件名 + 元素名 + 修饰符 */
.quiz-card                    /* 组件根 */
.quiz-card-content           /* 子元素 */
.quiz-card-title             /* 子元素 */
.quiz-card-title.available   /* 状态修饰符 */
.quiz-card-button.play       /* 元素 + 动作修饰符 */
```

### 5.3 调试策略
1. **检查优先级**: 使用浏览器开发工具查看样式来源
2. **验证选择器**: 确认选择器是否匹配到正确元素
3. **作用域检查**: 确认scoped样式是否正确应用

## 6. 维护指南

### 6.1 添加新样式
1. **确定作用域**: 全局 vs 组件 vs 页面
2. **选择策略**: Tailwind vs 原生CSS
3. **测试兼容性**: 确保不影响现有样式

### 6.2 修改现有样式
1. **找到源文件**: 确认样式定义位置
2. **检查依赖**: 确认修改不会影响其他组件
3. **测试覆盖**: 验证修改在所有使用场景下生效

### 6.3 性能优化
1. **减少嵌套**: 避免过深的选择器嵌套
2. **合并规则**: 将相似的样式规则合并
3. **移除冗余**: 定期清理未使用的样式

## 7. 常见问题解决

### 7.1 样式不生效
```bash
# 检查步骤：
1. 确认选择器是否正确
2. 检查CSS优先级
3. 验证作用域设置
4. 清除浏览器缓存
5. 重启开发服务器
```

### 7.2 响应式问题
```css
/* 确保媒体查询顺序正确 */
/* 移动端优先 */
.element { ... }

/* 平板端 */
@media (min-width: 768px) {
  .element { ... }
}

/* 桌面端 */
@media (min-width: 1024px) {
  .element { ... }
}
```

### 7.3 Vue组件样式隔离
```vue
<!-- 需要全局影响时 -->
<style>
.global-style { ... }
</style>

<!-- 只影响当前组件时 -->
<style scoped>
.component-style { ... }
</style>

<!-- 需要穿透子组件时 -->
<style scoped>
.parent :deep(.child) { ... }
</style>
```

## 8. 配置文件

### 8.1 Nuxt配置
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  css: [
    '~/assets/css/main.css',      // 全局基础样式
    '~/assets/css/apple-theme.css' // 主题样式
  ],
  modules: [
    '@nuxtjs/tailwindcss'         // Tailwind CSS模块
  ]
})
```

### 8.2 Tailwind配置
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      // 自定义主题扩展
    }
  }
}
```

---

**最后更新**: 2025-08-17
**维护者**: Claude Code
**版本**: 1.0.0