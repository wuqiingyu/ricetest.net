# 技术文档目录

本文件夹包含RiceTest.net项目的所有技术文档和开发指南。

## 📚 文档列表

### 🏗️ 架构与设计
- **[数据库架构文档](./database_schema_documentation.md)** - 完整的数据库表结构、索引和多语言支持说明
- **[多语言实现文档](./MULTILINGUAL_IMPLEMENTATION.md)** - 多语言功能的技术架构、当前状态和未来规划

### 🧩 组件使用指南
- **[Apple主题指南](./APPLE-THEME-GUIDE.md)** - Apple风格UI组件的设计规范和使用说明
- **[动态Quiz指南](./DYNAMIC_QUIZ_GUIDE.md)** - 动态quiz系统的组件配置和自定义方法
- **[Quiz图片指南](./QUIZ_HERO_IMAGE_GUIDE.md)** - Quiz头图的规格要求和最佳实践

### 🚀 部署与运维
- **[部署指南](./DEPLOYMENT.md)** - 项目部署流程、环境配置和常见问题解决方案

## 🗂️ 文档分类

### 按开发阶段分类
```
设计阶段
├── APPLE-THEME-GUIDE.md        # UI设计规范
└── QUIZ_HERO_IMAGE_GUIDE.md    # 图片规格要求

开发阶段  
├── database_schema_documentation.md  # 数据库设计
├── DYNAMIC_QUIZ_GUIDE.md            # 功能开发
└── MULTILINGUAL_IMPLEMENTATION.md   # 国际化开发

部署阶段
└── DEPLOYMENT.md                    # 部署运维
```

### 按功能模块分类
```
Quiz系统
├── DYNAMIC_QUIZ_GUIDE.md            # 动态quiz系统
├── QUIZ_HERO_IMAGE_GUIDE.md         # quiz图片管理
└── database_schema_documentation.md  # 数据库设计

多语言系统
└── MULTILINGUAL_IMPLEMENTATION.md   # 国际化架构

UI组件系统
└── APPLE-THEME-GUIDE.md             # Apple风格设计

基础设施
└── DEPLOYMENT.md                    # 部署配置
```

## 🔍 快速查找

### 我想了解...
- **如何创建新的quiz** → [动态Quiz指南](./DYNAMIC_QUIZ_GUIDE.md)
- **数据库表结构** → [数据库架构文档](./database_schema_documentation.md)  
- **多语言功能实现** → [多语言实现文档](./MULTILINGUAL_IMPLEMENTATION.md)
- **Apple风格组件** → [Apple主题指南](./APPLE-THEME-GUIDE.md)
- **项目部署流程** → [部署指南](./DEPLOYMENT.md)
- **Quiz图片要求** → [Quiz图片指南](./QUIZ_HERO_IMAGE_GUIDE.md)

### 我遇到了...
- **数据库查询问题** → [数据库架构文档](./database_schema_documentation.md)
- **多语言相关问题** → [多语言实现文档](./MULTILINGUAL_IMPLEMENTATION.md)
- **部署失败问题** → [部署指南](./DEPLOYMENT.md)
- **Quiz功能问题** → [动态Quiz指南](./DYNAMIC_QUIZ_GUIDE.md)

## 📝 文档维护

### 更新频率
- **高频更新**：MULTILINGUAL_IMPLEMENTATION.md (功能开发中)
- **中频更新**：database_schema_documentation.md (数据库变更时)
- **低频更新**：其他设计和部署文档

### 文档版本
每个文档底部都标注了创建时间和最后更新时间，便于追踪变更历史。

### 贡献指南
1. 新增功能时，请更新相关技术文档
2. 数据库变更时，必须更新数据库架构文档
3. 组件变更时，请更新组件使用指南
4. 保持文档的准确性和时效性

---

**创建时间**: 2024年8月17日  
**最后更新**: 2024年8月17日  
**维护者**: 开发团队