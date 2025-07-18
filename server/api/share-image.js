import { createCanvas } from 'canvas'

export default defineEventHandler(async (event) => {
  try {
    // 获取查询参数
    const query = getQuery(event)
    const score = parseInt(query.score) || 85
    
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
    setHeader(event, 'Cache-Control', 'public, max-age=3600') // 缓存1小时
    setHeader(event, 'Content-Length', buffer.length)
    
    return buffer
    
  } catch (error) {
    console.error('Error generating share image:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error generating share image'
    })
  }
})