export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    // 使用服务端 Supabase 客户端
    const supabaseUrl = config.public.supabase.url
    const supabaseKey = config.public.supabase.key

    // 直接调用 Supabase REST API 获取所有英文 quizzes
    const response = await fetch(`${supabaseUrl}/rest/v1/quizzes?select=slug,created_at&language=eq.en&order=created_at.desc`, {
        headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
        }
    })

    const quizzes = await response.json()

    const baseUrl = 'https://ricetest.net'
    const now = new Date().toISOString()

    // 构建 sitemap URL 列表
    const urls = [
        // 1️⃣ 静态页面
        {
            loc: baseUrl,
            lastmod: now,
            changefreq: 'daily',
            priority: 1.0
        },
        {
            loc: `${baseUrl}/about`,
            lastmod: now,
            changefreq: 'monthly',
            priority: 0.7
        },
        {
            loc: `${baseUrl}/contact`,
            lastmod: now,
            changefreq: 'monthly',
            priority: 0.7
        },
        {
            loc: `${baseUrl}/terms`,
            lastmod: now,
            changefreq: 'yearly',
            priority: 0.5
        },
        {
            loc: `${baseUrl}/cookies`,
            lastmod: now,
            changefreq: 'yearly',
            priority: 0.5
        },
        {
            loc: `${baseUrl}/privacy-policy`,
            lastmod: now,
            changefreq: 'yearly',
            priority: 0.5
        },

        // 2️⃣ Quiz 相关页面
        {
            loc: `${baseUrl}/quiz`,
            lastmod: now,
            changefreq: 'daily',
            priority: 0.9
        },
        {
            loc: `${baseUrl}/quiz/gay-test`,
            lastmod: now,
            changefreq: 'weekly',
            priority: 0.8
        },

        // 动态 quiz 页面 (从 Supabase 读取)
        ...(quizzes || []).map(quiz => ({
            loc: `${baseUrl}/quiz/${quiz.slug}`,
            lastmod: quiz.created_at || now,
            changefreq: 'weekly',
            priority: 0.8
        })),

        // 3️⃣ Wiki 页面
        {
            loc: `${baseUrl}/wiki`,
            lastmod: now,
            changefreq: 'weekly',
            priority: 0.8
        },
        {
            loc: `${baseUrl}/wiki/what-is-a-good-rice-purity-score`,
            lastmod: now,
            changefreq: 'monthly',
            priority: 0.7
        },
        {
            loc: `${baseUrl}/wiki/rice-purity-test-score-meaning`,
            lastmod: now,
            changefreq: 'monthly',
            priority: 0.7
        },
        {
            loc: `${baseUrl}/wiki/best-place-rice-purity-test-free-online-2025`,
            lastmod: now,
            changefreq: 'monthly',
            priority: 0.7
        },
        {
            loc: `${baseUrl}/wiki/pros-and-cons-rice-purity-test`,
            lastmod: now,
            changefreq: 'monthly',
            priority: 0.7
        },
        {
            loc: `${baseUrl}/wiki/how-to-accept-that-you-are-gay`,
            lastmod: now,
            changefreq: 'monthly',
            priority: 0.7
        },
        {
            loc: `${baseUrl}/wiki/how-to-have-a-gay-or-lesbian-relationship`,
            lastmod: now,
            changefreq: 'monthly',
            priority: 0.7
        },
        {
            loc: `${baseUrl}/wiki/how-to-know-if-you-are-gay`,
            lastmod: now,
            changefreq: 'monthly',
            priority: 0.7
        },
        {
            loc: `${baseUrl}/wiki/what-does-gay-mean`,
            lastmod: now,
            changefreq: 'monthly',
            priority: 0.7
        },
        {
            loc: `${baseUrl}/wiki/which-ear-is-the-gay-ear`,
            lastmod: now,
            changefreq: 'monthly',
            priority: 0.7
        },
        {
            loc: `${baseUrl}/wiki/why-are-you-gay`,
            lastmod: now,
            changefreq: 'monthly',
            priority: 0.7
        },

        // 4️⃣ 其他页面
        {
            loc: `${baseUrl}/quiz-duel`,
            lastmod: now,
            changefreq: 'weekly',
            priority: 0.7
        }
    ]

    // 生成 XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    event.node.res.setHeader('Content-Type', 'application/xml')
    return sitemap
})
