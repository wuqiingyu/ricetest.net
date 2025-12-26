# Scoring System Documentation

本文档详细说明 ricetest.net 项目的答题计分系统架构和实现逻辑。

---

## 目录

1. [系统概述](#系统概述)
2. [计分类型](#计分类型)
3. [累加计分系统 (Additive Scoring)](#累加计分系统-additive-scoring)
4. [对错计分系统 (Right/Wrong Scoring)](#对错计分系统-rightwrong-scoring)
5. [数据结构](#数据结构)
6. [代码实现](#代码实现)
7. [扩展指南](#扩展指南)

---

## 系统概述

当前系统采用**累加计分 (Additive Scoring)** 模式：
- 每个选项预设分数值 (`score`)
- 用户完成答题后，所有选择的分数累加
- 根据总分匹配预设的分数范围，返回对应结果

### 数据流向

```
用户选择答案 → 提取 option.score → 存入 localStorage
      ↓
完成所有题目 → 遍历答案累加分数 → totalScore
      ↓
匹配 quiz_results 表的 [min_score, max_score] 范围
      ↓
返回匹配的结果 (name, description, image_url)
      ↓
保存到 Supabase sessions 表
```

---

## 计分类型

### 类型标识

通过 `quizzes.type` 字段区分不同计分模式（复用现有字段，无需新增）：

| 类型 | `quizzes.type` 值 | 说明 | 状态 |
|------|-------------------|------|------|
| 累加计分 | `single` / `multi` | 分数简单累加，按范围匹配结果 | ✅ 已实现 |
| 对错计分 | `right_wrong` | 每题有唯一正确答案，即时反馈对错 | ✅ 已实现 |
| iframe嵌入 | `iframe` | 嵌入外部测试 | ✅ 已实现 |

### 计划支持 (待实现)

| 类型 | 标识 | 说明 | 状态 |
|------|------|------|------|
| 类型匹配 | `type_match` | 统计各类型出现次数，最多者为结果 | 🔜 待实现 |
| 多维度计分 | `multi_dimension` | 多个维度独立计分，生成复合结果 | 🔜 待实现 |
| 权重计分 | `weighted` | 不同题目权重不同 | 🔜 待实现 |

---

## 累加计分系统 (Additive Scoring)

### 算法说明

1. **答题阶段**: 记录每个选项的 `score` 值
2. **计算阶段**: 遍历所有答案，累加 `score`
3. **匹配阶段**: 在 `quiz_results` 表中查找 `totalScore` 落入的范围

### 匹配规则

```javascript
for (const result of quiz.results) {
  if (totalScore >= result.min_score && totalScore <= result.max_score) {
    return result
  }
}
```

### 示例

假设一个5题测试，每题4个选项，分值 0-3：

| 选项 | 分数 |
|------|------|
| A | 0 |
| B | 1 |
| C | 2 |
| D | 3 |

**总分范围**: 0 ~ 15

**结果配置**:

| 结果名称 | min_score | max_score |
|---------|-----------|-----------|
| 结果A | 0 | 5 |
| 结果B | 6 | 10 |
| 结果C | 11 | 15 |

**用户答题**: 选择了 B(1) + C(2) + D(3) + B(1) + C(2) = **9分** → 匹配**结果B**

---

## 对错计分系统 (Right/Wrong Scoring)

### 设计原则

**零数据库改动**：完全复用现有表结构，通过字段值约定实现新功能。

| 需求 | 复用字段 | 约定 |
|------|---------|------|
| 判断对错 | `options.score` | `score = 1` 为正确，`score = 0` 为错误 |
| 区分测试类型 | `quizzes.type` | 值为 `'right_wrong'` |

### 与累加计分的关系

对错计分是累加计分的**特例**：
- 每题只有一个选项 `score = 1`（正确答案）
- 其余选项 `score = 0`（错误答案）
- 累加所有 score = 答对题目数

```
累加计分:    score ∈ {0, 1, 2, 3, ...}  → totalScore = Σ score
对错计分:    score ∈ {0, 1}             → totalScore = 答对题数
```

### 数据配置示例

#### options 表数据

| question_id | text | score | 说明 |
|-------------|------|-------|------|
| q1 | 选项A | 0 | 错误 |
| q1 | 选项B | 1 | ✅ 正确 |
| q1 | 选项C | 0 | 错误 |
| q1 | 选项D | 0 | 错误 |

#### quiz_results 表数据（10题测试）

| name | min_score | max_score | description |
|------|-----------|-----------|-------------|
| 不及格 | 0 | 5 | 答对 0-5 题 |
| 及格 | 6 | 7 | 答对 6-7 题 |
| 良好 | 8 | 9 | 答对 8-9 题 |
| 优秀 | 10 | 10 | 全部答对 |

### 与累加计分的区别

| 特性 | 累加计分 | 对错计分 |
|------|---------|---------|
| 选项分值 | 任意整数 (0, 1, 2, 3...) | 仅 0 或 1 |
| 正确答案数 | 无（所有选项都有分值） | 每题仅1个 |
| 选择后反馈 | 无即时反馈 | 显示对/错 + 正确答案 |
| 结果计算 | 完全相同 | 完全相同 |
| 数据库改动 | - | 无 |

### 前端交互流程

```
用户选择答案
      ↓
检查 quiz.type === 'right_wrong'
      ↓
  ┌───┴───┐
  │  是   │
  ↓       ↓
显示即时反馈    (累加计分模式)
  │           无反馈，直接继续
  ↓
判断 selectedOption.score === 1
  │
  ├── 是 → 显示绿色 ✓ "正确!"
  │
  └── 否 → 显示红色 ✗ "错误"
           + 高亮正确答案 (score === 1 的选项)
      ↓
显示 "下一题" 按钮
      ↓
完成所有题目 → 结果页
      ↓
计算 totalScore (答对题数)
      ↓
匹配 quiz_results 范围 → 显示结果
```

### 前端实现要点

#### 1. 判断是否为对错计分模式

```javascript
// QuizQuestion.vue
const isRightWrongMode = computed(() => props.quiz?.type === 'right_wrong')
```

#### 2. 判断选项是否正确

```javascript
// 直接使用 score 字段判断
const isCorrectOption = (option) => option.score === 1
```

#### 3. 找到正确答案

```javascript
// 用于高亮显示正确答案
const correctOption = computed(() =>
  props.currentQuestion?.options?.find(opt => opt.score === 1)
)

const correctOptionIndex = computed(() =>
  props.currentQuestion?.options?.findIndex(opt => opt.score === 1)
)
```

#### 4. 选择后的反馈状态

```javascript
const selectAnswer = async (optionIndex, event) => {
  // ... 现有存储逻辑

  // 对错计分模式：设置反馈状态
  if (isRightWrongMode.value) {
    const selectedOption = props.currentQuestion.options[optionIndex]
    answerFeedback.value = {
      isCorrect: selectedOption.score === 1,
      correctIndex: correctOptionIndex.value
    }
  }
}
```

#### 5. UI 样式区分

```javascript
// 选项按钮样式
const getOptionClass = (index) => {
  if (selectedAnswerIndex.value === null) {
    return 'default-style'  // 未选择状态
  }

  if (!isRightWrongMode.value) {
    // 累加计分模式：只高亮选中项
    return selectedAnswerIndex.value === index ? 'selected-style' : 'dimmed-style'
  }

  // 对错计分模式
  const option = props.currentQuestion.options[index]

  if (option.score === 1) {
    // 正确答案：始终显示绿色
    return 'correct-style'  // 绿色边框/背景
  }

  if (selectedAnswerIndex.value === index) {
    // 用户选择的错误答案：显示红色
    return 'incorrect-style'  // 红色边框/背景
  }

  return 'dimmed-style'  // 其他选项变暗
}
```

### 结果页显示

对错计分模式可在结果页额外显示：

```javascript
// results.vue
const isRightWrongMode = computed(() => quiz.value?.type === 'right_wrong')
const totalQuestions = computed(() => quiz.value?.questions?.length || 0)
const correctCount = computed(() => /* totalScore 即为答对数 */)

// 显示: "您答对了 8/10 题"
```

### 数据流对比

**累加计分**:
```
options.score (0/1/2/3) → 累加 → totalScore → 范围匹配 → 结果
```

**对错计分**:
```
options.score (0/1) → 累加 → totalScore (=答对数) → 范围匹配 → 结果
        ↑
   score=1 用于前端判断对错、高亮正确答案
```

### 完整实现清单

| 层面 | 改动项 | 工作量 |
|------|--------|--------|
| 数据库结构 | **无需改动** | 0 |
| 数据库内容 | 新测试 `type='right_wrong'`，选项 `score` 设为 0/1 | 数据配置 |
| 前端 QuizQuestion.vue | 添加对错反馈UI和样式 | ~50-80行 |
| 前端 results.vue | 可选：显示"答对 X/Y 题" | ~10行 |
| 计算逻辑 | **无需改动**（完全复用累加逻辑） | 0 |

---

## 数据结构

### 选项数据 (options 表)

```typescript
interface Option {
  id: string          // UUID
  question_id: string // 关联问题
  text: string        // 选项文本
  image_url?: string  // 选项图片
  score: number       // 该选项的分值 ⭐ 关键字段
  order_index: number // 显示顺序
  language: string    // 语言代码
}
```

### 结果配置 (quiz_results 表)

```typescript
interface QuizResult {
  id: string          // UUID
  quiz_id: string     // 关联测试
  name: string        // 结果名称
  description: string // 结果描述
  image_url?: string  // 结果图片
  min_score: number   // 最低分数 ⭐ 范围下限
  max_score: number   // 最高分数 ⭐ 范围上限
  order_index: number // 显示顺序
  language: string    // 语言代码
}
```

### localStorage 答案存储

```typescript
// 存储键: `${quiz.slug}-answers`
interface StoredAnswers {
  [questionNumber: string]: {
    questionIndex: number
    optionIndex: number
    score: number        // ⭐ 该选项的分值
    text: string
    questionId: string
    optionId: string
  }
}
```

### 会话记录 (sessions 表)

```typescript
interface Session {
  id: string
  quiz_id: string
  answers: string[]    // 选项 UUID 数组
  total_score: number  // ⭐ 计算出的总分
  result: string       // 最终结果名称
  created_at: string
}
```

---

## 代码实现

### 1. 答题存储 (QuizQuestion.vue)

**文件**: `components/Quiz/QuizQuestion.vue`
**行号**: 321-340

```javascript
const selectAnswer = async (optionIndex, event) => {
  if (selectedAnswerIndex.value !== null) return

  selectedAnswerIndex.value = optionIndex
  const selectedOption = props.currentQuestion.options[optionIndex]

  // Store answer in localStorage
  if (process.client) {
    const storageKey = `${props.quiz.slug}-answers`
    const answers = JSON.parse(localStorage.getItem(storageKey) || '{}')
    answers[props.currentQuestionNumber] = {
      questionIndex: props.currentQuestionNumber - 1,
      optionIndex,
      score: selectedOption.score,  // ⭐ 存储选项分值
      text: selectedOption.text,
      questionId: props.currentQuestion.id,
      optionId: selectedOption.id
    }
    localStorage.setItem(storageKey, JSON.stringify(answers))
  }
  // ... 后续逻辑
}
```

### 2. 分数计算 (results.vue)

**文件**: `pages/quiz/[slug]/results.vue`
**行号**: 167-204

```javascript
function calculateQuizResult(quiz, answers) {
  if (!quiz || !quiz.results || !quiz.results.length || !answers) {
    return null
  }

  // 第一步: 计算总分
  let totalScore = 0
  const answersArray = Array.isArray(answers) ? answers : Object.values(answers)

  answersArray.forEach(answer => {
    if (typeof answer === 'object' && answer.score !== undefined) {
      totalScore += answer.score
    } else if (typeof answer === 'number') {
      totalScore += answer
    }
  })

  // 第二步: 匹配结果范围
  const results = quiz.results

  for (const result of results) {
    if (totalScore >= result.min_score && totalScore <= result.max_score) {
      return {
        name: result.name,
        description: result.description,
        image_url: result.image_url
      }
    }
  }

  // 第三步: 默认结果
  return {
    name: "Result",
    description: "Thank you for completing the quiz!",
    image_url: null
  }
}
```

### 3. 会话保存 (results.vue)

**文件**: `pages/quiz/[slug]/results.vue`
**行号**: 206-256

```javascript
async function saveUserSession(quizId, answers, result) {
  if (!quizId || !answers || !result) {
    return null
  }

  try {
    // 转换答案为UUID数组
    const answerUuids = Object.values(answers)
      .filter(answer => answer.optionId)
      .map(answer => answer.optionId)

    // 计算总分
    let totalScore = 0
    const answersArray = Object.values(answers)
    answersArray.forEach(answer => {
      if (typeof answer === 'object' && answer.score !== undefined) {
        totalScore += answer.score
      } else if (typeof answer === 'number') {
        totalScore += answer
      }
    })

    // 保存到数据库
    const { data, error } = await supabase
      .from('sessions')
      .insert([{
        quiz_id: quizId,
        answers: answerUuids,
        total_score: totalScore,
        result: result.name || 'Result',
        created_at: new Date().toISOString()
      }])
      .select()
      .single()

    return data
  } catch (error) {
    console.error('Error in saveUserSession:', error)
    return null
  }
}
```

---

## 扩展指南

### 添加新计分类型的步骤

1. **数据库层面**
   - 在 `quizzes` 表 `type` 字段 (如果尚未添加)
   - 根据新类型需求，可能需要新增数据表

2. **选项数据层面**
   - 根据计分类型，可能需要扩展 `options` 表字段
   - 例如：类型匹配需要 `type` 字段而非 `score`

3. **计算逻辑层面**
   - 在 `results.vue` 中的 `calculateQuizResult` 函数添加分支
   - 根据 `quiz.scoring_type` 调用不同的计算函数

4. **存储层面**
   - 更新 `QuizQuestion.vue` 的答案存储逻辑
   - 更新 `sessions` 表结构（如需要）

### 示例: 添加类型匹配计分

```javascript
// 新增计算函数
function calculateTypeMatchResult(quiz, answers) {
  // 统计各类型出现次数
  const typeCounts = {}

  Object.values(answers).forEach(answer => {
    const type = answer.type // 假设选项有 type 字段
    typeCounts[type] = (typeCounts[type] || 0) + 1
  })

  // 找出最多的类型
  const maxType = Object.keys(typeCounts).reduce((a, b) =>
    typeCounts[a] > typeCounts[b] ? a : b
  )

  // 返回对应结果
  return quiz.results.find(r => r.type === maxType)
}

// 在 calculateQuizResult 中添加分支
function calculateQuizResult(quiz, answers) {
  switch (quiz.scoring_type) {
    case 'additive':
      return calculateAdditiveResult(quiz, answers)
    case 'type_match':
      return calculateTypeMatchResult(quiz, answers)
    default:
      return calculateAdditiveResult(quiz, answers)
  }
}
```

---

## 相关文件索引

| 文件 | 用途 | 关键行号 |
|------|------|---------|
| `components/Quiz/QuizQuestion.vue` | 答题选择、存储 | 321-340 |
| `pages/quiz/[slug]/results.vue` | 分数计算、结果匹配 | 167-256 |
| `docs/database_schema_documentation.md` | 数据库表结构 | - |

---

## 更新日志

| 日期 | 更新内容 |
|------|---------|
| 2024-12-07 | 添加对错计分系统 (Right/Wrong Scoring) 详细文档 |
| 2024-xx-xx | 初始版本，累加计分系统文档 |
