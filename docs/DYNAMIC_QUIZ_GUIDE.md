# 动态测试系统使用指南

## 系统结构

新的动态测试系统已创建完成，文件结构如下：

```
/pages/quiz/[slug]/
├── index.vue          # 测试首页 (SSR优化)
├── [id].vue          # 问题页面 (SSR优化)
└── results.vue       # 结果页面 (SPA优化)

/components/Quiz/
├── QuizHome.vue      # 通用测试首页组件
├── QuizQuestion.vue  # 通用问题组件
└── QuizResults.vue   # 通用结果组件

/services/
└── quizService.js    # Supabase数据服务层
```

## 功能特性

### 1. SSR/SPA混合优化
- **首页**: SSR渲染，完整SEO支持
- **问题页**: SSR渲染，支持分享和索引
- **结果页**: SPA模式，客户端快速计算

### 2. 数据管理
- Supabase数据库集成
- 5分钟智能缓存
- 错误处理和重试机制

### 3. 用户体验
- 动画效果和音效支持
- 键盘快捷键导航
- 自动保存和恢复进度
- 响应式设计

### 4. 性能优化
- 数据预加载和缓存
- 图片懒加载
- 组件代码分割

## 使用方法

### 1. 访问动态测试
- 首页: `/quiz/{slug}`
- 问题页: `/quiz/{slug}/1` (1-N)
- 结果页: `/quiz/{slug}/results`

### 2. 测试数据
- 数据来源: Supabase数据库
- 缓存时间: 5分钟
- 支持实时更新

## 当前可用测试

1. **Gay Test** (保留原版)
   - URL: `/quiz/gay-test`
   - 使用硬编码数据

2. **Past Life Death Test** (新动态版)
   - URL: `/quiz/past-life-death`
   - 使用Supabase数据

## 开发指南

### 1. 添加新测试
1. 在Supabase中添加测试数据
2. 确保slug唯一
3. 系统自动支持新测试

### 2. 自定义相关内容
在页面组件中修改 `relatedContent` 计算属性

### 3. 自定义音效
在问题组件中修改 `soundUrl` 计算属性

### 4. SEO优化
- meta标签自动生成
- 结构化数据支持
- 社交分享优化

## 故障排除

### 1. 测试不显示
- 检查Supabase连接
- 验证数据库数据
- 查看浏览器控制台错误

### 2. 性能问题
- 检查缓存状态
- 优化图片大小
- 减少不必要的API调用

### 3. SEO问题
- 确保首页SSR正常工作
- 验证meta标签生成
- 检查sitemap更新

## 下一步计划

1. 添加更多测试类型
2. 实现用户统计分析
3. 添加多语言支持
4. 优化移动端体验
5. 集成社交分享图片生成