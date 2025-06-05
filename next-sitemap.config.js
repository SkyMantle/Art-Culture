/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://art.playukraine.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: 'public',
  output: "export",
  transform: async (config, path) => ({
    loc: path,
    changefreq: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1.0 : 0.7,
    lastmod: new Date().toISOString(),
  }),
  additionalPaths: async () => {
    const { newsList } = await import('./src/data/news.js');
    const paths = [
      { loc: '/', changefreq: 'daily', priority: 1.0 },
      { loc: '/news', changefreq: 'weekly', priority: 0.7 },
      { loc: '/ssr', changefreq: 'weekly', priority: 0.7 },
    ];
    const newsPaths = newsList.map((n) => ({
      loc: `/news/${n.id}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));
    return [...paths.map((p) => ({ ...p, lastmod: new Date().toISOString() })), ...newsPaths];
  },
};
export default config;
