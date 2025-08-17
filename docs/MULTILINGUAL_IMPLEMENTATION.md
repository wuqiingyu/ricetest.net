# 多语言功能实现文档

## 概述

本文档记录了RiceTest.net网站多语言功能的实现状态、技术架构和未来扩展规划。目前系统已具备完整的多语言基础架构，当前所有内容设置为英语('en')，为未来的多语言扩展做好准备。

## 当前状态 (2024年)

### ✅ 已完成的功能

#### 1. 数据库架构更新
所有内容相关表已添加 `language` 字段：

- **quizzes** - 测试主题表
- **questions** - 问题表  
- **options** - 选项表
- **quiz_results** - 测试结果配置表

**注意：** `sessions` 表不需要语言字段，因为它只记录用户会话数据。

#### 2. 数据库索引优化
创建了以下性能优化索引：

```sql
-- 单列语言索引
CREATE INDEX idx_quizzes_language ON quizzes(language);
CREATE INDEX idx_questions_language ON questions(language);
CREATE INDEX idx_options_language ON options(language);
CREATE INDEX idx_quiz_results_language ON quiz_results(language);

-- 复合索引用于多语言查询优化
CREATE INDEX idx_quizzes_slug_language ON quizzes(slug, language);
CREATE INDEX idx_questions_quiz_language ON questions(quiz_id, language);
CREATE INDEX idx_options_question_language ON options(question_id, language);
CREATE INDEX idx_quiz_results_quiz_language ON quiz_results(quiz_id, language);
```

#### 3. 组件系统更新

**DynamicQuizCategory 组件**
```vue
<DynamicQuizCategory 
  :category="personality"
  :quizzes="allQuizzes"
  :language="currentLanguage"  <!-- 新增语言参数 -->
  :max-quizzes="3"
/>
```

**支持的组件参数：**
- `language` - 语言代码 (默认: 'en')
- `category` - quiz分类
- `quizzes` - quiz数据数组
- `maxQuizzes` - 显示数量
- `specificQuizzes` - 指定quiz列表

#### 4. 数据获取函数更新

所有quiz相关的数据获取函数都已支持语言参数：

```javascript
// 获取所有quiz (支持语言过滤)
async function getAllQuizzes(language = 'en') {
  const { data: quizzes, error } = await supabase
    .from('quizzes')
    .select('id, title, slug, category, hero_image, created_at, language')
    .eq('language', language)
    .order('created_at', { ascending: false })
  
  return quizzes || []
}

// 获取单个quiz (支持语言过滤)
async function getQuizBySlug(slug, language = 'en') {
  // 获取测试基本信息
  const { data: quiz } = await supabase
    .from('quizzes')
    .select('id, title, slug, category, hero_image, language')
    .eq('slug', slug)
    .eq('language', language)
    .single()
  
  // 获取问题和选项 (过滤语言)
  const { data: questions } = await supabase
    .from('questions')
    .select(`id, text, order_index, language, options(*)`)
    .eq('quiz_id', quiz.id)
    .eq('language', language)
  
  // 获取结果配置 (过滤语言)
  const { data: results } = await supabase
    .from('quiz_results')
    .select('*')
    .eq('quiz_id', quiz.id)
    .eq('language', language)
  
  return { ...quiz, questions, results }
}
```

#### 5. 页面组件更新

**已更新的页面：**
- `/pages/quiz/index.vue` - 主quiz页面
- `/pages/quiz/[slug]/index.vue` - quiz首页
- `/pages/quiz/[slug]/[id].vue` - quiz问题页
- `/pages/quiz/[slug]/results.vue` - quiz结果页

**每个页面都包含：**
```javascript
// 当前语言设置
const currentLanguage = ref('en')

// 数据获取时应用语言过滤
const { data: quiz } = await useLazyAsyncData(
  `quiz-${slug}`,
  () => getQuizBySlug(slug, currentLanguage.value)
)
```

### 📁 更新的文件列表

1. **组件文件**
   - `components/Quiz/DynamicQuizCategory.vue` - 添加语言参数支持

2. **页面文件**
   - `pages/quiz/index.vue` - 主quiz页面语言支持
   - `pages/quiz/[slug]/index.vue` - quiz首页语言支持  
   - `pages/quiz/[slug]/[id].vue` - quiz问题页语言支持
   - `pages/quiz/[slug]/results.vue` - quiz结果页语言支持

3. **文档文件**
   - `database_schema_documentation.md` - 数据库架构文档更新
   - `MULTILINGUAL_IMPLEMENTATION.md` - 本文档

### 🔧 当前数据状态

- **所有现有数据的language字段已设置为 'en'**
- **新数据插入时必须明确指定language字段** (无默认值)
- **查询时默认使用 'en' 语言过滤**

## 未来扩展规划

### 🌍 URL路由策略

根据需求，将实现以下URL路由结构：

```
# 英语 (默认)
https://ricetest.net/quiz                    → 英语quiz列表
https://ricetest.net/quiz/past-life-death    → 英语quiz页面

# 中文
https://ricetest.net/zh/quiz                 → 中文quiz列表  
https://ricetest.net/zh/quiz/past-life-death → 中文quiz页面

# 其他语言
https://ricetest.net/es/quiz                 → 西班牙语quiz列表
https://ricetest.net/fr/quiz                 → 法语quiz列表
```

### 🚀 实现步骤

#### 阶段1: 路由语言检测 (优先级: 高)

1. **创建语言中间件**
```javascript
// middleware/language.js
export default function ({ route, app }) {
  // 从URL路径中提取语言代码
  const pathSegments = route.path.split('/').filter(Boolean)
  const supportedLanguages = ['en', 'zh', 'es', 'fr', 'de', 'ja', 'ko']
  
  let detectedLanguage = 'en' // 默认英语
  
  if (pathSegments.length > 0 && supportedLanguages.includes(pathSegments[0])) {
    detectedLanguage = pathSegments[0]
  }
  
  // 设置全局语言状态
  app.$i18n.setLocale(detectedLanguage)
}
```

2. **更新路由配置**
```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  router: {
    middleware: ['language']
  }
})
```

3. **创建动态路由**
```
pages/
├── quiz/                    # 默认英语路由
│   ├── index.vue
│   └── [slug]/
└── [lang]/                  # 多语言路由
    └── quiz/
        ├── index.vue
        └── [slug]/
```

#### 阶段2: 内容管理系统 (优先级: 中)

1. **创建翻译管理界面**
2. **实现内容版本控制**
3. **添加翻译工作流**

#### 阶段3: 用户体验优化 (优先级: 中)

1. **语言切换器组件**
```vue
<LanguageSwitcher 
  :current-language="currentLanguage"
  :available-languages="['en', 'zh', 'es', 'fr']"
  @change="handleLanguageChange"
/>
```

2. **浏览器语言检测**
```javascript
// 自动检测用户浏览器语言
const detectUserLanguage = () => {
  const browserLang = navigator.language.split('-')[0]
  const supportedLanguages = ['en', 'zh', 'es', 'fr']
  return supportedLanguages.includes(browserLang) ? browserLang : 'en'
}
```

3. **语言偏好存储**
```javascript
// 存储用户语言偏好
localStorage.setItem('preferred-language', selectedLanguage)
```

### 📊 支持的语言代码

| 语言代码 | 语言名称 | 显示名称 | 状态 |
|---------|---------|---------|------|
| `en` | English | English | ✅ 已实现 |
| `zh` | Chinese | 中文 | 🔄 规划中 |
| `es` | Spanish | Español | 🔄 规划中 |
| `fr` | French | Français | 🔄 规划中 |
| `de` | German | Deutsch | 🔄 规划中 |
| `ja` | Japanese | 日本語 | 🔄 规划中 |
| `ko` | Korean | 한국어 | 🔄 规划中 |

### 🏗️ 技术架构

#### 数据层
```
Database Tables (with language field)
├── quizzes (language: VARCHAR(5))
├── questions (language: VARCHAR(5))  
├── options (language: VARCHAR(5))
└── quiz_results (language: VARCHAR(5))
```

#### 应用层
```
Application Layer
├── Language Detection Middleware
├── Internationalization (i18n) Setup
├── Language-aware Data Fetching
└── URL Routing Strategy
```

#### 组件层
```
Component Layer
├── DynamicQuizCategory (language prop)
├── LanguageSwitcher (future)
├── QuizHome (language-aware)
└── QuizResults (language-aware)
```

### 🔍 测试策略

#### 单元测试
- [ ] 语言参数传递测试
- [ ] 数据过滤逻辑测试
- [ ] 组件渲染测试

#### 集成测试  
- [ ] 多语言路由测试
- [ ] 数据库查询测试
- [ ] 组件交互测试

#### 端到端测试
- [ ] 完整用户流程测试
- [ ] 语言切换测试
- [ ] SEO验证测试

### 📈 性能考虑

#### 数据库优化
- ✅ 已创建语言相关索引
- ✅ 使用复合索引优化查询
- 📋 考虑数据分片策略

#### 缓存策略
- 📋 语言相关的数据缓存
- 📋 静态资源国际化
- 📋 CDN多语言支持

#### SEO优化
- 📋 hreflang标签配置
- 📋 多语言sitemap生成
- 📋 语言特定的meta标签

### 🛠️ 开发工具

#### 推荐的i18n库
```bash
# Vue I18n for Nuxt 3
npm install @nuxtjs/i18n

# 或使用 vue-i18n 直接集成
npm install vue-i18n@9
```

#### 翻译管理工具
- **Crowdin** - 协作翻译平台
- **Lokalise** - 本地化管理
- **i18next** - 翻译键值管理

### 📋 待办事项清单

#### 高优先级
- [ ] 实现语言路由中间件
- [ ] 创建 `[lang]/quiz` 动态路由结构
- [ ] 更新导航和链接生成逻辑
- [ ] 配置i18n插件

#### 中优先级  
- [ ] 创建语言切换器组件
- [ ] 实现浏览器语言检测
- [ ] 添加语言偏好存储
- [ ] 创建翻译管理界面

#### 低优先级
- [ ] 性能优化和缓存策略
- [ ] SEO多语言优化
- [ ] 分析和监控多语言使用情况
- [ ] A/B测试不同语言的转化率

### 🐛 已知问题和限制

1. **SSR兼容性**: 需要确保服务端和客户端语言检测一致
2. **缓存失效**: 语言切换时需要正确清理相关缓存
3. **URL重写**: 需要处理旧URL到新多语言URL的重定向

### 📖 参考文档

- [Nuxt 3 Internationalization](https://nuxt.com/docs/guide/going-further/layers#internationalization)
- [Vue I18n](https://vue-i18n.intlify.dev/)
- [Web标准: hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [数据库架构文档](./database_schema_documentation.md)

---

**创建时间**: 2024年8月17日  
**最后更新**: 2024年8月17日  
**版本**: 1.0.0  
**状态**: ✅ 基础架构完成，等待路由实现
