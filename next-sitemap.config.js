/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://aqualink.site',
  generateRobotsTxt: false, // We already have a custom robots.txt
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: [
    '/api/*',
    '/admin/*',
    '/private/*',
    '/_next/*',
    '/404',
    '/500'
  ],
  transform: async (config, path) => {
    // Custom priority and changefreq for specific pages
    const customConfig = {
      '/': {
        changefreq: 'daily',
        priority: 1.0,
      },
      '/beranda': {
        changefreq: 'daily',
        priority: 0.9,
      },
      '/monitoring': {
        changefreq: 'daily',
        priority: 0.9,
      },
      '/pembayaran': {
        changefreq: 'weekly',
        priority: 0.8,
      },
      '/auth/login': {
        changefreq: 'monthly',
        priority: 0.8,
      },
      '/auth/register': {
        changefreq: 'monthly',
        priority: 0.8,
      },
      '/profile': {
        changefreq: 'monthly',
        priority: 0.7,
      },
    }

    const pageConfig = customConfig[path] || {}

    return {
      loc: path,
      changefreq: pageConfig.changefreq || config.changefreq,
      priority: pageConfig.priority || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/']
      }
    ],
    additionalSitemaps: [
      'https://aqualink.site/sitemap.xml',
    ],
  },
}