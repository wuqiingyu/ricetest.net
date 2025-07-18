// 检查是否在支持canvas的环境中
const isCanvasSupported = () => {
  try {
    // 在Cloudflare Pages环境中，canvas模块不可用
    if (typeof globalThis.Request !== 'undefined' && 
        typeof globalThis.Response !== 'undefined' && 
        typeof process === 'undefined') {
      return false // Cloudflare Workers/Pages环境
    }
    require('canvas')
    return true
  } catch (error) {
    return false
  }
}

// 生成SVG格式的分享图片
const generateSVGImage = (score) => {
  // 获取分数描述
  const getScoreDescription = (score) => {
    if (score >= 98) return "Extremely Pure"
    if (score >= 93) return "Very Pure"
    if (score >= 77) return "Somewhat Pure"
    if (score >= 45) return "Average"
    if (score >= 9) return "Not Pure"
    return "Very Impure"
  }

  const description = getScoreDescription(score)
  const emoji = score >= 90 ? '😇' : score >= 70 ? '😊' : score >= 50 ? '😏' : '😈'
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#60a5fa;stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="rgba(0,0,0,0.3)"/>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  
  <!-- Stars -->
  <circle cx="150" cy="100" r="2" fill="rgba(255,255,255,0.6)"/>
  <circle cx="300" cy="150" r="1.5" fill="rgba(255,255,255,0.4)"/>
  <circle cx="450" cy="80" r="2" fill="rgba(255,255,255,0.7)"/>
  <circle cx="600" cy="120" r="1" fill="rgba(255,255,255,0.5)"/>
  <circle cx="750" cy="200" r="1.5" fill="rgba(255,255,255,0.6)"/>
  <circle cx="900" cy="90" r="2" fill="rgba(255,255,255,0.8)"/>
  <circle cx="1050" cy="180" r="1" fill="rgba(255,255,255,0.4)"/>
  <circle cx="200" cy="400" r="1.5" fill="rgba(255,255,255,0.5)"/>
  <circle cx="800" cy="450" r="2" fill="rgba(255,255,255,0.6)"/>
  <circle cx="1000" cy="400" r="1" fill="rgba(255,255,255,0.7)"/>
  
  <!-- Main Card -->
  <rect x="100" y="80" width="1000" height="470" rx="20" fill="rgba(255,255,255,0.95)" filter="url(#shadow)"/>
  
  <!-- RiceTest Logo -->
  <text x="150" y="130" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#3b82f6">RiceTest</text>
  
  <!-- Certification Badge -->
  <circle cx="290" cy="115" r="18" fill="#10b981"/>
  <text x="290" y="123" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">✓</text>
  
  <!-- Main Title -->
  <text x="600" y="190" font-family="Arial, sans-serif" font-size="56" font-weight="bold" fill="#1f2937" text-anchor="middle">Rice Purity Test</text>
  
  <!-- Score Circle Background -->
  <circle cx="600" cy="320" r="108" fill="#3b82f6"/>
  <circle cx="600" cy="320" r="100" fill="white"/>
  
  <!-- Score -->
  <text x="600" y="340" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="#dc2626" text-anchor="middle">${score}</text>
  <text x="600" y="370" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#6b7280" text-anchor="middle">/100</text>
  
  <!-- Emoji -->
  <text x="740" y="340" font-family="Arial, sans-serif" font-size="60" text-anchor="middle">${emoji}</text>
  
  <!-- Category Label -->
  <rect x="${600 - description.length * 12}" y="420" width="${description.length * 24}" height="60" rx="8" fill="#f3f4f6"/>
  <text x="600" y="460" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="#1f2937" text-anchor="middle">${description}</text>
  
  <!-- Website Link -->
  <text x="600" y="520" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#3b82f6" text-anchor="middle">Take the test → RiceTest.net</text>
</svg>`
}

export default defineEventHandler(async (event) => {
  try {
    // 获取查询参数
    const query = getQuery(event)
    const score = parseInt(query.score) || 85
    
    // 检查是否支持canvas
    if (isCanvasSupported()) {
      // 使用原来的canvas实现
      const { createCanvas } = await import('canvas')
      
      // 获取分数描述
      const getScoreDescription = (score) => {
        if (score >= 98) return "Extremely Pure"
        if (score >= 93) return "Very Pure"
        if (score >= 77) return "Somewhat Pure"
        if (score >= 45) return "Average"
        if (score >= 9) return "Not Pure"
        return "Very Impure"
      }
      
      // 创建画布
      const canvas = createCanvas(1200, 630)
      const ctx = canvas.getContext('2d')
      
      // 创建渐变背景
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#1e40af')
      gradient.addColorStop(0.5, '#3b82f6')
      gradient.addColorStop(1, '#60a5fa')
      
      // 绘制背景
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // 绘制装饰性星星
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
      for (let i = 0; i < 60; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 4 + 2
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // 绘制主卡片背景
      const cardX = 100
      const cardY = 80
      const cardWidth = 1000
      const cardHeight = 470
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
      ctx.shadowBlur = 30
      ctx.shadowOffsetY = 15
      ctx.fillRect(cardX, cardY, cardWidth, cardHeight)
      
      // 重置阴影
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetY = 0
      
      // 绘制RiceTest品牌标志
      ctx.fillStyle = '#3b82f6'
      ctx.font = 'bold 36px Arial'
      ctx.textAlign = 'left'
      ctx.fillText('RiceTest', cardX + 50, cardY + 60)
      
      // 绘制认证勾
      ctx.fillStyle = '#10b981'
      ctx.beginPath()
      ctx.arc(cardX + 240, cardY + 45, 18, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 20px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('✓', cardX + 240, cardY + 52)
      
      // 绘制主标题
      ctx.fillStyle = '#1f2937'
      ctx.font = 'bold 56px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('Rice Purity Test', canvas.width / 2, cardY + 140)
      
      // 绘制分数背景圆形
      const scoreX = canvas.width / 2
      const scoreY = cardY + 250
      const scoreRadius = 100
      
      // 外圆 - 装饰边框
      ctx.beginPath()
      ctx.arc(scoreX, scoreY, scoreRadius + 8, 0, Math.PI * 2)
      ctx.fillStyle = '#3b82f6'
      ctx.fill()
      
      // 内圆 - 分数背景
      ctx.beginPath()
      ctx.arc(scoreX, scoreY, scoreRadius, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
      
      // 绘制分数
      ctx.fillStyle = '#dc2626'
      ctx.font = 'bold 80px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(score.toString(), scoreX, scoreY + 15)
      
      // 绘制 /100
      ctx.fillStyle = '#6b7280'
      ctx.font = 'bold 32px Arial'
      ctx.fillText('/100', scoreX, scoreY + 50)
      
      // 绘制分类标签背景
      const categoryText = getScoreDescription(score)
      ctx.font = 'bold 40px Arial'
      const textMetrics = ctx.measureText(categoryText)
      const labelWidth = textMetrics.width + 60
      const labelHeight = 60
      const labelX = scoreX - labelWidth / 2
      const labelY = cardY + 370
      
      ctx.fillStyle = '#f3f4f6'
      ctx.fillRect(labelX, labelY, labelWidth, labelHeight)
      
      // 绘制分类文字
      ctx.fillStyle = '#1f2937'
      ctx.textAlign = 'center'
      ctx.fillText(categoryText, scoreX, labelY + 45)
      
      // 绘制网站链接
      ctx.fillStyle = '#3b82f6'
      ctx.font = 'bold 28px Arial'
      ctx.fillText('Take the test → RiceTest.net', scoreX, cardY + 470)
      
      // 添加表情符号
      const emoji = score >= 90 ? '😇' : score >= 70 ? '😊' : score >= 50 ? '😏' : '😈'
      ctx.font = '60px Arial'
      ctx.fillText(emoji, scoreX + 140, scoreY + 15)
      
      // 转换为PNG Buffer
      const buffer = canvas.toBuffer('image/png')
      
      // 设置响应头
      setHeader(event, 'Content-Type', 'image/png')
      setHeader(event, 'Cache-Control', 'public, max-age=3600')
      setHeader(event, 'Content-Length', buffer.length)
      
      return buffer
    } else {
      // 在不支持canvas的环境中，返回SVG
      const svgContent = generateSVGImage(score)
      
      // 设置响应头
      setHeader(event, 'Content-Type', 'image/svg+xml')
      setHeader(event, 'Cache-Control', 'public, max-age=3600')
      setHeader(event, 'Content-Length', Buffer.byteLength(svgContent, 'utf8'))
      
      return svgContent
    }
    
  } catch (error) {
    console.error('Error generating share image:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error generating share image'
    })
  }
})