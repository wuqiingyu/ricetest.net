import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

// 构建配置
const BUILD_CONFIG = {
  // Cloudflare Pages 环境变量
  env: {
    NODE_ENV: 'production',
    NITRO_PRESET: 'cloudflare-pages',
    // 可以添加其他环境变量
  },
  
  // 输出目录
  outputDir: '.output',
  
  // 需要检查的文件
  requiredFiles: [
    'public/sitemap.xml',
    'public/robots.txt',
    'public/.well-known/security.txt'
  ]
}

// 运行命令并显示输出
function runCommand(command, description) {
  console.log(`🔧 ${description}...`)
  try {
    const output = execSync(command, { 
      cwd: projectRoot, 
      stdio: 'pipe',
      encoding: 'utf8'
    })
    console.log(`✅ ${description} completed`)
    return output
  } catch (error) {
    console.error(`❌ ${description} failed:`)
    console.error(error.message)
    if (error.stdout) console.log('STDOUT:', error.stdout)
    if (error.stderr) console.log('STDERR:', error.stderr)
    process.exit(1)
  }
}

// 检查Node.js版本
function checkNodeVersion() {
  const version = process.version
  const majorVersion = parseInt(version.slice(1).split('.')[0])
  
  console.log(`📋 Node.js version: ${version}`)
  
  if (majorVersion < 18) {
    console.warn('⚠️  Warning: Node.js 18+ is recommended for optimal performance')
  }
}

// 验证构建输出
function validateBuild() {
  console.log('🔍 Validating build output...')
  
  const outputDir = path.join(projectRoot, BUILD_CONFIG.outputDir)
  
  // 检查输出目录是否存在
  if (!fs.existsSync(outputDir)) {
    throw new Error(`Output directory ${BUILD_CONFIG.outputDir} does not exist`)
  }
  
  // 检查必需文件
  const missingFiles = []
  
  BUILD_CONFIG.requiredFiles.forEach(file => {
    const filePath = path.join(projectRoot, file)
    if (!fs.existsSync(filePath)) {
      missingFiles.push(file)
    }
  })
  
  if (missingFiles.length > 0) {
    console.error('❌ Missing required files:')
    missingFiles.forEach(file => console.error(`   - ${file}`))
    throw new Error('Build validation failed')
  }
  
  // 检查构建文件大小
  const buildStats = []
  
  try {
    const publicDir = path.join(projectRoot, 'public')
    if (fs.existsSync(publicDir)) {
      const files = fs.readdirSync(publicDir)
      files.forEach(file => {
        const filePath = path.join(publicDir, file)
        const stats = fs.statSync(filePath)
        if (stats.isFile()) {
          buildStats.push({
            file,
            size: stats.size,
            sizeKB: Math.round(stats.size / 1024 * 100) / 100
          })
        }
      })
    }
  } catch (error) {
    console.warn('⚠️  Could not analyze build stats:', error.message)
  }
  
  if (buildStats.length > 0) {
    console.log('📊 Build statistics:')
    buildStats.forEach(stat => {
      console.log(`   - ${stat.file}: ${stat.sizeKB} KB`)
    })
  }
  
  console.log('✅ Build validation passed')
}

// 生成部署信息
function generateDeployInfo() {
  const deployInfo = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    environment: 'production',
    target: 'cloudflare-pages',
    pages: [],
    apis: [
      '/api/share-image'
    ]
  }
  
  // 收集页面信息
  try {
    const pagesDir = path.join(projectRoot, 'pages')
    if (fs.existsSync(pagesDir)) {
      const files = fs.readdirSync(pagesDir)
      files.forEach(file => {
        if (file.endsWith('.vue')) {
          let pagePath = file.replace('.vue', '')
          if (pagePath === 'index') {
            pagePath = '/'
          } else {
            pagePath = `/${pagePath}`
          }
          deployInfo.pages.push(pagePath)
        }
      })
    }
  } catch (error) {
    console.warn('⚠️  Could not collect page info:', error.message)
  }
  
  // 保存部署信息
  const deployInfoPath = path.join(projectRoot, 'public', 'deploy-info.json')
  fs.writeFileSync(deployInfoPath, JSON.stringify(deployInfo, null, 2))
  
  console.log('📄 Deploy info generated')
  return deployInfo
}

// 创建Cloudflare Pages配置
function createCloudflareConfig() {
  const config = {
    "build": {
      "command": "npm run build:cf",
      "destination": "dist",
      "root_dir": ".",
      "env_vars": {
        "NODE_VERSION": "18",
        "NPM_VERSION": "9"
      }
    },
    "deployment": {
      "compatibility_date": "2024-01-01",
      "compatibility_flags": [
        "nodejs_compat"
      ]
    }
  }
  
  const configPath = path.join(projectRoot, 'wrangler.toml')
  
  // 生成 wrangler.toml
  const wranglerConfig = `name = "ricetests"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[build]
command = "npm run build:cf"
destination = "dist"

[[env_vars]]
NODE_VERSION = "18"
`
  
  fs.writeFileSync(configPath, wranglerConfig)
  console.log('⚙️  Cloudflare config created')
}

// 主构建函数
async function main() {
  console.log('🚀 Building RiceTests for Cloudflare Pages...')
  console.log('=' .repeat(50))
  
  // 检查环境
  checkNodeVersion()
  
  // 设置环境变量
  Object.entries(BUILD_CONFIG.env).forEach(([key, value]) => {
    process.env[key] = value
  })
  
  try {
    // 1. 清理之前的构建
    console.log('🧹 Cleaning previous build...')
    if (fs.existsSync(path.join(projectRoot, '.output'))) {
      fs.rmSync(path.join(projectRoot, '.output'), { recursive: true, force: true })
    }
    
    // 2. 安装依赖
    runCommand('npm ci', 'Installing dependencies')
    
    // 3. 生成sitemap和SEO文件
    console.log('🗺️  Generating sitemap...')
    const { generateSitemap } = await import('./generate-sitemap.js')
    runCommand('node scripts/generate-sitemap.js', 'Generating sitemap')
    
    // 4. 构建应用
    runCommand('npm run build', 'Building application')
    
    // 5. 验证构建
    validateBuild()
    
    // 6. 生成部署信息
    const deployInfo = generateDeployInfo()
    
    // 7. 创建Cloudflare配置
    createCloudflareConfig()
    
    // 8. 显示部署摘要
    console.log('\n' + '=' .repeat(50))
    console.log('🎉 Build completed successfully!')
    console.log('📊 Deployment Summary:')
    console.log(`   - Target: Cloudflare Pages`)
    console.log(`   - Pages: ${deployInfo.pages.length}`)
    console.log(`   - APIs: ${deployInfo.apis.length}`)
    console.log(`   - Build time: ${new Date().toLocaleString()}`)
    console.log('\n📋 Ready for deployment!')
    console.log('   1. Connect your GitHub repo to Cloudflare Pages')
    console.log('   2. Set build command: npm run build:cf')
    console.log('   3. Set output directory: .output/public')
    console.log('   4. Deploy! 🚀')
    
  } catch (error) {
    console.error('\n❌ Build failed:', error.message)
    process.exit(1)
  }
}

// 运行构建
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { main as buildForCloudflare, BUILD_CONFIG }