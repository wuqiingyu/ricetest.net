import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

// 网站基础URL
const BASE_URL = 'https://ricetest.net'

// 页面配置
const PAGE_CONFIG = {
  // 静态页面
  static: [
    {
      path: '/',
      priority: 1.0,
      changefreq: 'weekly',
      title: 'Rice Purity Test - Free Online Personality Quiz'
    },
    {
      path: '/about',
      priority: 0.8,
      changefreq: 'monthly',
      title: 'About Us - RiceTests'
    },
    {
      path: '/contact',
      priority: 0.7,
      changefreq: 'monthly',
      title: 'Contact Us - RiceTests'
    },
    {
      path: '/terms',
      priority: 0.6,
      changefreq: 'yearly',
      title: 'Terms of Service - RiceTests'
    },
    {
      path: '/cookies',
      priority: 0.6,
      changefreq: 'yearly',
      title: 'Cookie Policy - RiceTests'
    },
    {
      path: '/privacy-policy',
      priority: 0.6,
      changefreq: 'yearly',
      title: 'Privacy Policy - RiceTests'
    }
  ],
  
  // 动态页面（分享链接）
  dynamic: {
    pattern: '/?score=:score',
    scores: [10, 20, 30, 40, 50, 60, 70, 80, 85, 90, 95, 100],
    priority: 0.5,
    changefreq: 'weekly'
  }
}

// 生成当前时间戳
function getCurrentTimestamp() {
  return new Date().toISOString().split('T')[0]
}

// 生成sitemap.xml
function generateSitemap() {
  const timestamp = getCurrentTimestamp()
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`

  // 添加静态页面
  PAGE_CONFIG.static.forEach(page => {
    sitemap += `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${timestamp}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
  })

  // 添加动态页面（分享链接）
  PAGE_CONFIG.dynamic.scores.forEach(score => {
    const path = `/?score=${score}`
    sitemap += `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${timestamp}</lastmod>
    <changefreq>${PAGE_CONFIG.dynamic.changefreq}</changefreq>
    <priority>${PAGE_CONFIG.dynamic.priority}</priority>
  </url>
`
  })

  sitemap += `</urlset>`
  
  return sitemap
}

// 生成robots.txt
function generateRobots() {
  return `# Robots.txt for RiceTest.net
# Rice Purity Test - Personality Tests & Fun Quizzes

# Allow all search engines
User-agent: *
Allow: /

# Disallow development and build files
Disallow: /.nuxt/
Disallow: /.output/
Disallow: /node_modules/
Disallow: /scripts/
Disallow: /.git/
Disallow: /.github/
Disallow: /deploy-info.json

# Disallow dynamic API routes (they're not meant for indexing)
Disallow: /api/

# Allow specific important pages
Allow: /about
Allow: /contact
Allow: /terms
Allow: /cookies
Allow: /privacy-policy

# Special rules for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 2

# Social media crawlers
User-agent: facebookexternalhit
Allow: /
Crawl-delay: 1

User-agent: Twitterbot
Allow: /
Crawl-delay: 1

User-agent: LinkedInBot
Allow: /
Crawl-delay: 1

# Disallow aggressive crawlers
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

User-agent: MJ12bot
Crawl-delay: 10

# Sitemap locations
Sitemap: ${BASE_URL}/sitemap.xml

# Contact information
# Contact: contact@ricetest.net
# Website: ${BASE_URL}
`
}

// 检测页面文件
function detectPages() {
  const pagesDir = path.join(projectRoot, 'pages')
  const detectedPages = []
  
  try {
    // 读取pages目录
    const files = fs.readdirSync(pagesDir, { recursive: true })
    
    files.forEach(file => {
      if (file.endsWith('.vue')) {
        // 转换文件路径为URL路径
        let urlPath = file.replace('.vue', '')
        if (urlPath === 'index') {
          urlPath = '/'
        } else {
          urlPath = `/${urlPath}`
        }
        
        // 检查是否已在配置中
        const isConfigured = PAGE_CONFIG.static.some(page => page.path === urlPath)
        
        if (!isConfigured) {
          detectedPages.push({
            path: urlPath,
            file: file,
            priority: 0.5,
            changefreq: 'monthly'
          })
        }
      }
    })
    
    return detectedPages
  } catch (error) {
    console.warn('⚠️  Could not detect pages automatically:', error.message)
    return []
  }
}

// 生成.well-known/security.txt
function generateSecurityTxt() {
  return `Contact: mailto:contact@ricetest.net
Expires: 2025-12-31T23:59:59.000Z
Preferred-Languages: en
Canonical: ${BASE_URL}/.well-known/security.txt
Policy: ${BASE_URL}/privacy-policy
`
}

// 主函数
function main() {
  console.log('🚀 Generating sitemap and SEO files for RiceTests...')
  
  // 检测页面
  const detectedPages = detectPages()
  if (detectedPages.length > 0) {
    console.log('📄 Detected additional pages:')
    detectedPages.forEach(page => {
      console.log(`   - ${page.path} (${page.file})`)
    })
  }
  
  // 生成sitemap
  const sitemap = generateSitemap()
  const robots = generateRobots()
  const securityTxt = generateSecurityTxt()
  
  // 确保public目录存在
  const publicDir = path.join(projectRoot, 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  
  // 写入文件
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots)
  
  // 创建.well-known目录
  const wellKnownDir = path.join(publicDir, '.well-known')
  if (!fs.existsSync(wellKnownDir)) {
    fs.mkdirSync(wellKnownDir, { recursive: true })
  }
  fs.writeFileSync(path.join(wellKnownDir, 'security.txt'), securityTxt)
  
  // 生成统计信息
  const totalPages = PAGE_CONFIG.static.length + PAGE_CONFIG.dynamic.scores.length
  
  console.log('✅ Sitemap generation completed!')
  console.log(`📊 Generated files:`)
  console.log(`   - sitemap.xml (${totalPages} URLs)`)
  console.log(`   - robots.txt`)
  console.log(`   - .well-known/security.txt`)
  console.log(`🌐 Base URL: ${BASE_URL}`)
  console.log(`📅 Last updated: ${getCurrentTimestamp()}`)
  
  // 显示页面统计
  console.log('\n📋 Page breakdown:')
  console.log(`   - Static pages: ${PAGE_CONFIG.static.length}`)
  console.log(`   - Dynamic pages: ${PAGE_CONFIG.dynamic.scores.length}`)
  console.log(`   - Total: ${totalPages}`)
  
  // 验证文件
  try {
    const sitemapSize = fs.statSync(path.join(publicDir, 'sitemap.xml')).size
    const robotsSize = fs.statSync(path.join(publicDir, 'robots.txt')).size
    console.log(`\n📁 File sizes:`)
    console.log(`   - sitemap.xml: ${sitemapSize} bytes`)
    console.log(`   - robots.txt: ${robotsSize} bytes`)
  } catch (error) {
    console.error('❌ Error checking file sizes:', error.message)
  }
}

// 运行脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { generateSitemap, generateRobots, detectPages, PAGE_CONFIG }