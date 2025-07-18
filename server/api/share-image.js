// 简化的分享内容生成 - 不使用canvas或图片生成
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
    
    const description = getScoreDescription(score)
    const emoji = score >= 90 ? '😇' : score >= 70 ? '😊' : score >= 50 ? '😏' : '😈'
    
    // 生成分享内容JSON
    const shareContent = {
      score: score,
      description: description,
      emoji: emoji,
      title: `Rice Purity Test Results - Score: ${score}/100`,
      text: `Just took the Rice Purity Test and scored ${score}/100! ${emoji} I'm "${description}"\n\nTake the test yourself at RiceTest.net and see how pure you are! 🎯\n\n#RicePurityTest #PurityTest #PersonalityTest`,
      url: `https://ricetest.net?score=${score}`,
      timestamp: new Date().toISOString()
    }
    
    // 设置响应头
    setHeader(event, 'Content-Type', 'application/json')
    setHeader(event, 'Cache-Control', 'public, max-age=3600')
    
    return shareContent
    
  } catch (error) {
    console.error('Error generating share content:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error generating share content'
    })
  }
})