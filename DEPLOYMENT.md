# 🚀 RiceTests 部署指南

## 项目概述
RiceTests 是一个现代化的 Rice Purity Test 网站，使用 Nuxt.js 3 构建，包含完整的法律页面和动态分享功能。

## 功能特性
- ✅ **完整的 Rice Purity Test** - 100道经典题目
- ✅ **动态分享功能** - 服务器端图片生成
- ✅ **法律页面** - Terms、Privacy、Cookies、Contact
- ✅ **关于页面** - 品牌介绍和历史
- ✅ **响应式设计** - 苹果主题，适配所有设备
- ✅ **SEO优化** - 动态Meta标签和社交分享

## 技术栈
- **框架**: Nuxt.js 3.17.5
- **样式**: Tailwind CSS + 自定义苹果主题
- **服务器**: Node.js with Nitro
- **图片生成**: Canvas (服务器端)

## 部署准备

### 1. 环境要求
- Node.js 18+ 
- npm 或 yarn
- 支持 Node.js 的托管服务

### 2. 构建生产版本
```bash
# 安装依赖
npm install

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 3. 部署选项

#### 选项A: Node.js 服务器部署
```bash
# 复制 .output 文件夹到服务器
# 在服务器上运行:
node .output/server/index.mjs
```

#### 选项B: 静态部署 (推荐)
```bash
# 生成静态文件
npm run generate

# 部署 .output/public 文件夹
```

#### 选项C: Vercel 部署
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

#### 选项D: Netlify 部署
1. 连接 GitHub 仓库
2. 构建命令: `npm run build`
3. 发布目录: `.output/public`

## 环境配置

### 域名配置
更新以下文件中的域名：
- `pages/index.vue` - 分享链接中的域名
- `server/api/share-image.js` - 图片生成中的域名

### 邮箱配置
更新 `pages/contact.vue` 中的邮箱地址

## 重要文件

### 核心页面
- `/` - 主页 (Rice Purity Test)
- `/about` - 关于页面
- `/terms` - 服务条款
- `/cookies` - Cookie政策
- `/contact` - 联系页面
- `/privacy-policy` - 隐私政策

### API 端点
- `/api/share-image` - 动态分享图片生成

### 关键组件
- `components/Header.vue` - 导航栏
- `components/Footer.vue` - 页脚
- `components/TestProgress.vue` - 测试进度
- `components/AppleCard.vue` - 苹果主题卡片

### 数据文件
- `data/rice-test.json` - 测试题目数据

## 性能优化

### 已实现
- ✅ 服务器端渲染 (SSR)
- ✅ 代码分割和懒加载
- ✅ 图片优化
- ✅ CSS 压缩
- ✅ Gzip 压缩

### 构建统计
- **总大小**: 26.2 MB (9.5 MB gzip)
- **客户端**: 主要包约 169KB gzip
- **服务器**: 优化的 SSR 包

## 监控和分析

### 推荐集成
- **Google Analytics** - 用户行为分析
- **Sentry** - 错误监控
- **Web Vitals** - 性能监控

### 关键指标
- 测试完成率
- 分享率
- 页面加载时间
- 用户停留时间

## 安全配置

### 已实现
- ✅ 输入验证
- ✅ XSS 防护
- ✅ CSRF 保护
- ✅ 安全 Headers

### 生产环境建议
- 启用 HTTPS
- 配置 CSP Headers
- 设置速率限制
- 定期安全更新

## 备份和维护

### 备份内容
- 源代码 (GitHub)
- 用户数据 (如果有)
- 配置文件

### 维护任务
- 定期更新依赖
- 监控服务器性能
- 检查错误日志
- 内容更新

## 联系支持
如有部署问题，请联系: contact@ricetest.net

---

✨ **准备就绪！您的 RiceTests 网站已完全准备好上线！**