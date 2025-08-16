# Quiz头图使用指南

## 头图规格建议

### 图片尺寸
- **推荐尺寸**: 1200x630px (1.91:1 比例)
- **最小尺寸**: 800x420px 
- **最大尺寸**: 1920x1080px
- **文件格式**: JPG, PNG, WebP
- **文件大小**: 建议小于500KB

### 图片存放位置
- **本地路径**: `/public/quiz-images/` 目录
- **数据库存储**: 相对路径，如 `/quiz-images/quiz-name-hero.jpg`
- **CDN路径**: 支持完整URL，如 `https://cdn.example.com/image.jpg`

## 命名规范

### 文件命名格式
```
{quiz-slug}-hero.{ext}
```

### 示例
- `past-life-death-hero.jpg`
- `personality-test-hero.png` 
- `movie-trivia-hero.webp`
- `kpop-quiz-hero.jpg`

## 头图内容建议

### 按分类推荐的视觉风格

| 分类 | 视觉风格建议 | 色彩建议 |
|------|-------------|---------|
| **personality** | 抽象、梦幻、心理学元素 | 紫色、蓝色渐变 |
| **trivia** | 书籍、灯泡、知识符号 | 橙色、黄色 |
| **celebrities** | 明星剪影、聚光灯、红毯 | 金色、红色 |
| **history** | 古典建筑、历史文物、时间线 | 棕色、古铜色 |
| **sports** | 运动场景、器材、动感元素 | 绿色、蓝色 |
| **movie** | 胶片、电影院、摄影机 | 黑金色、深红色 |
| **geography** | 地图、地球、风景地标 | 绿色、蓝色 |
| **kpop** | 舞台、音符、韩式美学 | 粉色、紫色渐变 |
| **game** | 游戏手柄、像素风、电竞元素 | 霓虹色、蓝绿色 |
| **travel** | 行李箱、飞机、世界地标 | 蓝色、橙色 |

## 技术要求

### 响应式支持
- 图片应在不同设备上表现良好
- 重要内容避免放在边缘位置
- 文字重叠区域保持对比度

### 加载优化
- 使用懒加载 `loading="lazy"`
- 提供alt文本描述
- 考虑WebP格式以减少文件大小

### SEO优化
- 文件名包含相关关键词
- Alt文本描述测试内容
- 适合社交分享的尺寸比例

## 使用示例

### 数据库更新示例
```sql
-- 设置头图URL
UPDATE quizzes 
SET hero_image = '/quiz-images/past-life-death-hero.jpg'
WHERE slug = 'past-life-death';

-- 使用CDN地址
UPDATE quizzes 
SET hero_image = 'https://cdn.ricetest.net/quiz-images/celebrity-quiz-hero.jpg'
WHERE slug = 'celebrity-quiz';
```

### 代码中使用
```vue
<!-- Vue组件中 -->
<img 
  :src="quiz.hero_image || '/quiz-images/default-hero.jpg'"
  :alt="quiz.title + ' Quiz Hero Image'"
  class="w-full h-48 object-cover rounded-lg"
  loading="lazy"
>
```

## 默认头图

如果测试没有设置头图，系统会使用以下默认头图：
- **默认路径**: `/quiz-images/default-hero.jpg`
- **按分类默认**: `/quiz-images/{category}-default-hero.jpg`

## 头图制作工具推荐

### 在线工具
- **Canva** - 模板丰富，易于使用
- **Figma** - 专业设计工具
- **Adobe Express** - Adobe在线工具

### AI生成工具
- **DALL-E** - OpenAI图像生成
- **Midjourney** - 高质量AI艺术
- **Stable Diffusion** - 开源AI工具

### 免费素材网站
- **Unsplash** - 高质量免费图片
- **Pexels** - 免费图片和视频
- **Pixabay** - 免费图片库