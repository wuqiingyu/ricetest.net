# 🚀 RiceTest.net 部署指南

## 项目概述
RiceTest.net 是一个现代化的个性测试平台，使用 Nuxt.js 3 构建，包含动态quiz系统、多语言支持基础架构和完整的用户体验功能。

## 🎯 功能特性

### 测试系统
- ✅ **Rice Purity Test** - 经典纯洁度测试
- ✅ **动态Quiz系统** - 数据库驱动的可配置测试
- ✅ **多语言准备** - 完整的国际化基础架构
- ✅ **实时结果计算** - 客户端答题，即时反馈

### 用户体验
- ✅ **响应式设计** - 完美适配桌面和移动设备
- ✅ **Apple风格主题** - 现代化UI设计
- ✅ **流体鼠标跟随效果** - 交互式视觉体验
- ✅ **庆祝动画** - Canvas confetti特效
- ✅ **每日问答** - 动态问题展示

### 技术功能
- ✅ **SEO优化** - 动态Meta标签和OpenGraph
- ✅ **数据库集成** - Supabase后端支持
- ✅ **组件化架构** - 可复用的Vue组件系统
- ✅ **服务端渲染** - SSR优化的页面加载

## 🛠️ 技术栈

### 前端框架
- **框架**: Nuxt.js 3.17.7
- **Vue版本**: Vue 3 (Composition API)
- **样式**: Tailwind CSS + 自定义主题
- **动画**: Canvas Confetti + CSS Transitions

### 数据库和后端
- **数据库**: Supabase (PostgreSQL)
- **认证**: Supabase Auth (预留)
- **存储**: Cloudflare R2 (图片存储)
- **API**: Nuxt 3 Server API

### 开发工具
- **TypeScript**: 类型安全
- **ESLint**: 代码规范
- **Git**: 版本控制
- **Claude Code**: AI开发助手

## 📋 部署准备

### 1. 环境要求
```bash
# 运行环境
Node.js >= 18.0.0
npm >= 8.0.0

# 推荐
Node.js >= 20.0.0
pnpm >= 8.0.0  # 更快的包管理器
```

### 2. 环境变量配置
创建 `.env` 文件：
```bash
# Supabase 配置
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudflare R2 配置 (可选)
CLOUDFLARE_R2_ENDPOINT=your_r2_endpoint
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_key

# 站点配置
NUXT_PUBLIC_SITE_URL=https://ricetest.net
```

### 3. 数据库初始化

#### 3.1 执行数据库架构
在Supabase中执行以下SQL：
```sql
-- 参考 docs/database_schema_documentation.md 中的完整架构
-- 主要包括：quizzes, questions, options, quiz_results, sessions 表
-- 以及多语言支持的索引
```

#### 3.2 导入示例数据
```sql
-- 插入示例quiz数据 (参考现有的disney-princess等测试)
-- 确保所有数据的language字段设置为'en'
```

## 🚀 部署选项

### 选项A: Vercel 部署 (推荐)

#### 自动部署
1. **连接GitHub仓库**
   ```bash
   # 推送代码到GitHub
   git push origin main
   ```

2. **在Vercel中配置**
   - 导入GitHub仓库
   - 框架预设：Nuxt.js
   - 构建命令：`npm run build`
   - 输出目录：`.output`

3. **环境变量设置**
   在Vercel Dashboard中添加：
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `NUXT_PUBLIC_SITE_URL`

#### 手动部署
```bash
# 安装Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

### 选项B: Netlify 部署

#### 配置设置
```bash
# 构建命令
npm run build

# 发布目录
.output/public

# 环境变量
SUPABASE_URL=your_value
SUPABASE_ANON_KEY=your_value
NUXT_PUBLIC_SITE_URL=your_value
```

#### 重定向配置
创建 `public/_redirects` 文件：
```
/* /index.html 200
```

### 选项C: 自建服务器部署

#### Docker部署
```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

#### 直接部署
```bash
# 在服务器上
git clone https://github.com/wuqiingyu/ricetest.net.git
cd ricetest.net
npm install
npm run build

# 使用PM2运行
npm install -g pm2
pm2 start ecosystem.config.js
```

### 选项D: Cloudflare Pages

#### 配置设置
```bash
# 构建命令
npm run build

# 构建输出目录
.output/public

# 根目录
/

# Node.js版本
20.x
```

## 🔧 构建优化

### 生产构建
```bash
# 安装依赖
npm install

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 检查构建大小
npx nuxi analyze
```

### 性能优化配置
已在 `nuxt.config.ts` 中配置：
```typescript
export default defineNuxtConfig({
  // 预渲染优化
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },
  
  // 图片优化
  image: {
    quality: 80,
    format: ['webp']
  },
  
  // 压缩优化
  compression: {
    gzip: true,
    brotli: true
  }
})
```

## 📊 监控和分析

### 性能监控
```bash
# Web Vitals 检测
npm run lighthouse

# 包大小分析
npm run analyze

# 性能基准测试
npm run benchmark
```

### 推荐集成服务
- **Vercel Analytics** - 网站分析 (免费)
- **Google Analytics 4** - 用户行为分析
- **Sentry** - 错误监控和性能追踪
- **Uptime Robot** - 网站可用性监控

### 关键业务指标
- Quiz完成率 (目标: >70%)
- 页面加载时间 (目标: <3s)
- 移动端体验评分 (目标: >90)
- 数据库查询性能 (目标: <500ms)

## 🔒 安全配置

### 生产环境安全清单
- ✅ **HTTPS启用** - 所有流量加密
- ✅ **环境变量保护** - 敏感信息不暴露
- ✅ **Supabase RLS** - 行级安全策略
- ✅ **CORS配置** - 跨域请求限制
- ✅ **输入验证** - 防止SQL注入和XSS

### 推荐安全Headers
```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin'
        }
      }
    }
  }
})
```

## 🗃️ 数据管理

### 数据库备份
```bash
# Supabase自动备份 (生产版本)
# 手动备份命令
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
```

### 数据迁移
```sql
-- 语言字段迁移 (已完成)
-- 参考: docs/database_schema_documentation.md

-- 未来迁移脚本放置位置
-- docs/migrations/
```

### 内容管理
- Quiz内容通过Supabase Dashboard管理
- 图片资源通过Cloudflare R2管理
- 代码更新通过GitHub自动部署

## 🧪 测试和质量保证

### 部署前检查清单
- [ ] 所有依赖安装成功
- [ ] 构建无错误和警告
- [ ] 数据库连接正常
- [ ] 环境变量配置正确
- [ ] Quiz功能正常工作
- [ ] 移动端响应式正常
- [ ] SEO标签正确生成

### 自动化测试
```bash
# 单元测试
npm run test

# E2E测试
npm run test:e2e

# 类型检查
npm run typecheck

# 代码规范检查
npm run lint
```

## 🔄 持续部署

### GitHub Actions (推荐)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### 部署钩子
```bash
# 部署后执行的任务
# - 清理缓存
# - 发送通知
# - 运行健康检查
```

## 🚨 故障排除

### 常见问题

#### 1. 构建失败
```bash
# 清理并重新安装
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 2. 数据库连接问题
```bash
# 检查环境变量
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY

# 测试连接
npm run db:test
```

#### 3. 静态资源404
```bash
# 检查base URL配置
# 确保 nuxt.config.ts 中的 app.baseURL 正确
```

#### 4. 内存不足
```bash
# 增加Node.js内存限制
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### 调试工具
```bash
# 详细构建日志
DEBUG=nuxt:* npm run build

# 网络请求调试
NODE_ENV=development npm run dev

# 性能分析
npm run dev -- --analyze
```

## 📞 支持和维护

### 联系方式
- **技术支持**: wuqingyu199510@gmail.com
- **GitHub Issues**: https://github.com/wuqiingyu/ricetest.net/issues
- **文档**: 本仓库 `docs/` 文件夹

### 维护计划
- **每周**: 依赖更新检查
- **每月**: 安全漏洞扫描
- **每季度**: 性能优化评估
- **每年**: 技术栈升级评估

### 文档更新
当进行以下操作时，请更新相关文档：
- 数据库架构变更 → `database_schema_documentation.md`
- 新功能添加 → 相应的功能文档
- 部署流程变更 → 本文档
- 多语言功能 → `MULTILINGUAL_IMPLEMENTATION.md`

---

## 🎉 部署成功检查

部署完成后，请访问以下链接确认：

- [ ] **主页**: https://your-domain.com/ 
- [ ] **Quiz页面**: https://your-domain.com/quiz
- [ ] **API健康检查**: https://your-domain.com/api/health
- [ ] **移动端兼容性**: 在手机上测试所有功能
- [ ] **数据库连接**: 确认quiz数据正常加载

**🚀 恭喜！您的 RiceTest.net 网站已成功部署！**

---

**创建时间**: 2024年7月19日  
**最后更新**: 2024年8月17日  
**版本**: 2.0.0  
**维护者**: 开发团队