#!/bin/bash

# RiceTests 生产环境启动脚本

echo "🚀 启动 RiceTests 生产环境..."

# 检查 Node.js 版本
node_version=$(node -v)
echo "📋 Node.js 版本: $node_version"

# 检查构建文件是否存在
if [ ! -f ".output/server/index.mjs" ]; then
    echo "❌ 构建文件不存在，正在构建..."
    npm run build
fi

# 设置生产环境变量
export NODE_ENV=production
export PORT=${PORT:-3000}

echo "🌐 启动服务器在端口 $PORT..."

# 启动服务器
node .output/server/index.mjs