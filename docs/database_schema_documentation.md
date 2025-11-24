# 测试系统数据库表结构说明文档

## 表结构概览

本测试系统包含6张核心表,支持多主题问答测试和结果评分功能。

---

## 1. categories - 测试分类表

存储测试的分类信息,支持多语言和子类别。

| 字段名 | 数据类型 | 说明 | 示例 |
|--------|---------|------|------|
| `id` | UUID | 主键,分类唯一标识符 | `550e8400-e29b-41d4-a716-446655440001` |
| `categoryid` | UUID | 分类ID,用于关联 | `550e8400-e29b-41d4-a716-446655440002` |
| `category` | VARCHAR | 主分类名称 | `"Personality"`, `"Love"` |
| `subcategory` | VARCHAR | 子分类名称 | `"Identity"`, `"Romance"` |
| `language` | VARCHAR(5) | 语言代码 | `"en"`, `"zh"` |
| `created_at` | TIMESTAMP | 创建时间 | `2024-01-01 12:00:00` |

---

## 2. quizzes - 测试主题表

存储不同的测试主题信息和结果配置。

| 字段名 | 数据类型 | 说明 | 示例 |
|--------|---------|------|------|
| `id` | UUID | 主键,测试唯一标识符 | `550e8400-e29b-41d4-a716-446655440000` |
| `title` | TEXT | 测试标题 | `"How Did You Die In A Past Life"` |
| `slug` | VARCHAR(100) | URL友好的标识符,用于生成页面链接 | `"past-life-death"` |
| `category_id` | UUID | **外键**,关联到categories表的categoryid | `550e8400-e29b-41d4-a716-446655440002` |
| ~~`category`~~ | ~~VARCHAR(50)~~ | ~~已废弃,请使用category_id关联categories表~~ | ~~`"personality"`~~ |
| `hero_image` | TEXT | 测试头图URL,支持相对/绝对路径 | `"/quiz-images/past-life-death-hero.jpg"` |
| `language` | VARCHAR(5) | 语言代码 (必填) | `"en"`, `"zh"`, `"es"`, `"fr"` |
| ~~`results`~~ | ~~JSONB~~ | ~~结果配置,包含所有可能的测试结果~~ | ~~已迁移至quiz_results表~~ |
| `created_at` | TIMESTAMP | 创建时间 | `2024-01-01 12:00:00` |

### ⚠️ 重要更新:
1. **`category`字段已废弃**,现在使用`category_id`外键关联到`categories`表
2. **`results`字段已废弃**,结果数据已迁移至独立的`quiz_results`表

---

## 3. quiz_results - 测试结果配置表

存储每个测试的结果配置,支持图片和详细描述。

| 字段名 | 数据类型 | 说明 | 示例 |
|--------|---------|------|------|
| `id` | UUID | 主键,结果唯一标识符 | `550e8400-e29b-41d4-a716-446655440010` |
| `quiz_id` | UUID | 外键,关联到quizzes表的id | `550e8400-e29b-41d4-a716-446655440000` |
| `name` | TEXT | 结果名称 | `"Belle's Intellectual Elegance"` |
| `description` | TEXT | 结果详细描述文案 | `"Like Belle, your glow-up is all about..."` |
| `image_url` | TEXT | 结果图片URL(可为空) | `"https://image.ricetest.net/belle-result.png"` |
| `min_score` | INTEGER | 匹配此结果的最低分数要求 | `15` |
| `max_score` | INTEGER | 匹配此结果的最高分数要求 | `20` |
| `order_index` | INTEGER | 结果在测试中的显示顺序 | `1, 2, 3, 4` |
| `language` | VARCHAR(5) | 语言代码 (必填) | `"en"`, `"zh"`, `"es"`, `"fr"` |
| `created_at` | TIMESTAMP | 创建时间 | `2024-01-01 12:00:00` |

**关联关系:** 一个quiz可以有多个quiz_results(一对多)

**优势:**
- 支持结果图片展示
- 更好的数据规范化
- 便于独立管理和更新结果配置
- 支持复杂的结果排序和筛选

---

## 4. questions - 问题表

存储每个测试的具体问题。

| 字段名 | 数据类型 | 说明 | 示例 |
|--------|---------|------|------|
| `id` | UUID | 主键,问题唯一标识符 | `550e8400-e29b-41d4-a716-446655440001` |
| `quiz_id` | UUID | 外键,关联到quizzes表的id | `550e8400-e29b-41d4-a716-446655440000` |
| `text` | TEXT | 问题文本内容 | `"What environment do you prefer?"` |
| `order_index` | INTEGER | 问题在测试中的顺序(从1开始) | `1, 2, 3...` |
| `language` | VARCHAR(5) | 语言代码 (必填) | `"en"`, `"zh"`, `"es"`, `"fr"` |
| `created_at` | TIMESTAMP | 创建时间 | `2024-01-01 12:00:00` |

**关联关系:** 一个quiz可以有多个questions(一对多)

---

## 5. options - 选项表

存储每个问题的可选答案选项。

| 字段名 | 数据类型 | 说明 | 示例 |
|--------|---------|------|------|
| `id` | UUID | 主键,选项唯一标识符 | `550e8400-e29b-41d4-a716-446655440002` |
| `question_id` | UUID | 外键,关联到questions表的id | `550e8400-e29b-41d4-a716-446655440001` |
| `text` | TEXT | 选项文本内容(可为空,当为纯图片选项时) | `"Mountains and forests"` |
| `image_url` | TEXT | 选项图片URL(可为空,当为纯文字选项时) | `"/quiz-images/forest-option.jpg"` |
| `score` | INTEGER | 该选项的分值,用于计算最终结果 | `0, 1, 2, 3, 4...` |
| `order_index` | INTEGER | 选项在问题中的显示顺序 | `1, 2, 3, 4` |
| `language` | VARCHAR(5) | 语言代码 (必填) | `"en"`, `"zh"`, `"es"`, `"fr"` |
| `created_at` | TIMESTAMP | 创建时间 | `2024-01-01 12:00:00` |

**关联关系:** 一个question可以有多个options(一对多)

**选项类型说明:**
- **纯文字选项**: `text` 有值,`image_url` 为 NULL
- **纯图片选项**: `text` 为 NULL,`image_url` 有值  
- **图片+文字选项**: `text` 和 `image_url` 都有值

---

## 6. sessions - 用户答题记录表(可选)

存储用户的答题过程和最终结果,用于数据统计分析。

| 字段名 | 数据类型 | 说明 | 示例 |
|--------|---------|------|------|
| `id` | UUID | 主键,答题会话唯一标识符 | `550e8400-e29b-41d4-a716-446655440003` |
| `quiz_id` | UUID | 外键,关联到quizzes表的id | `550e8400-e29b-41d4-a716-446655440000` |
| `answers` | UUID[] | 用户选择的选项ID数组,按问题顺序存储 | `[uuid1, uuid2, uuid3, uuid4, uuid5]` |
| `total_score` | INTEGER | 所有选项分数的总和 | `12` |
| `result` | TEXT | 根据总分匹配的最终结果文案 | `"You died bravely in battle..."` |
| `created_at` | TIMESTAMP | 答题完成时间 | `2024-01-01 12:00:00` |

**关联关系:** 一个quiz可以有多个sessions(一对多)

**注意:** 此表是可选的,主要用于数据统计。用户答题数据仍存储在localStorage中保证隐私性。

---

## 数据库索引说明

为了优化查询性能,创建了以下索引:

| 索引名 | 作用表 | 索引字段 | 用途 |
|--------|-------|----------|------|
| `idx_questions_quiz_id` | questions | quiz_id | 快速查询特定测试的所有问题 |
| `idx_questions_order` | questions | quiz_id, order_index | 按顺序获取问题 |
| `idx_options_question_id` | options | question_id | 快速查询问题的所有选项 |
| `idx_options_order` | options | question_id, order_index | 按顺序获取选项 |
| `idx_options_image_url` | options | image_url | 快速查询图片选项(仅非空值) |
| `idx_quiz_results_quiz_id` | quiz_results | quiz_id | 快速查询测试的所有结果配置 |
| `idx_quiz_results_order` | quiz_results | quiz_id, order_index | 按顺序获取结果配置 |
| `idx_quiz_results_score` | quiz_results | quiz_id, min_score, max_score | 快速匹配分数范围 |
| `idx_sessions_quiz_id` | sessions | quiz_id | 查询测试的答题统计 |
| `idx_sessions_created` | sessions | created_at | 按时间查询答题记录 |
| `idx_quizzes_slug` | quizzes | slug | 通过URL slug快速找到测试 |
| `idx_quizzes_language` | quizzes | language | 按语言过滤测试 |
| `idx_questions_language` | questions | language | 按语言过滤问题 |
| `idx_options_language` | options | language | 按语言过滤选项 |
| `idx_quiz_results_language` | quiz_results | language | 按语言过滤结果 |
| `idx_quizzes_slug_language` | quizzes | slug, language | 多语言测试查询优化 |
| `idx_questions_quiz_language` | questions | quiz_id, language | 多语言问题查询优化 |
| `idx_options_question_language` | options | question_id, language | 多语言选项查询优化 |
| `idx_quiz_results_quiz_language` | quiz_results | quiz_id, language | 多语言结果查询优化 |

---

## 数据流程说明

1. **创建测试:** 
   - 在`quizzes`表添加测试主题(不再需要results字段)
   - 在`quiz_results`表添加结果配置
   - 在`questions`表添加问题
   - 在`options`表添加每个问题的选项

2. **用户答题:**
   - 用户选择选项,记录option_id
   - 计算总分: SUM(所选选项的score)
   - 根据总分在`quiz_results`表中匹配结果(WHERE total_score BETWEEN min_score AND max_score)
   - 将答题数据存入`sessions`表

3. **结果展示:**
   - 从`quiz_results`表获取匹配的结果信息(包括图片)
   - 从`sessions`表获取历史记录和统计数据
   - 可通过quiz_id统计答题数据

---

## 常用查询逻辑

### 基础查询
```sql
-- 获取测试的问题和选项
SELECT q.text, o.text, o.image_url, o.score
FROM questions q JOIN options o ON q.id = o.question_id
WHERE q.quiz_id = 'quiz-id' ORDER BY q.order_index, o.order_index;

-- 获取测试结果配置
SELECT name, description, min_score, max_score
FROM quiz_results WHERE quiz_id = 'quiz-id' ORDER BY order_index;
```

### 选项类型判断
```sql
-- 判断选项类型
CASE 
    WHEN image_url IS NOT NULL AND text IS NOT NULL THEN 'mixed'
    WHEN image_url IS NOT NULL AND text IS NULL THEN 'image'  
    ELSE 'text'
END as option_type
```

---

## 数据库迁移记录

### JSONB results 迁移 (已完成)
- 将测试结果从`quizzes.results` JSONB字段迁移到独立的`quiz_results`表
- 支持结果图片、更好的性能和扩展性

### 多语言支持 (已完成) 
- 所有内容表添加`language`字段,默认值'en'
- 支持多语言版本管理和查询优化

### 图片选项支持 (已完成)
- `options`表添加`image_url`字段
- 支持纯文字、纯图片、图片+文字三种选项类型

### Categories 表集成 (已完成)
- 新增`categories`表用于统一管理分类
- `quizzes`表添加`category_id`外键关联
- 废弃旧的`category`字段

---

## 多语言架构

### 语言字段设计
- 所有内容表都有`language`字段 (VARCHAR(5), NOT NULL)
- 支持语言代码: `en`, `zh`, `es`, `fr`, `de`, `ja`, `ko`等
- `sessions`表无需语言字段(仅记录用户会话)

### 多语言版本管理
- 同一quiz的不同语言版本有不同UUID
- 可通过`slug + language`查询特定语言版本
- 支持部分翻译(某些quiz只有部分语言版本)

### 路由规划
```
英语 (默认): /quiz, /quiz/past-life-death
中文: /zh/quiz, /zh/quiz/past-life-death  
西语: /es/quiz, /es/quiz/como-moriste-vida-pasada
```

### 当前状态
- ✅ 数据库架构完成
- ✅ 组件系统支持语言参数  
- ✅ 测试数据已准备(英语版本)
- 🔄 翻译内容准备中

---