/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.dentalnepal.com',
  generateRobotsTxt: true, // (optional)
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/404', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin'] },
    ],
    additionalSitemaps: [
      'https://www.dentalnepal.com/sitemap.xml',
    ],
  },
};
