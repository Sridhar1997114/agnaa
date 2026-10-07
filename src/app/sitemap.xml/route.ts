import { BLOG_POSTS } from '@/app/blog/data';
import { GEO_CATEGORIES, ALL_GEO_QUESTIONS } from '@/data/geo';

export async function GET() {
  const currentDate = new Date().toISOString();

  const corePages = [
    { loc: 'https://agnaa.in', priority: '1.0', changefreq: 'daily' },
    { loc: 'https://agnaa.in/geo', priority: '1.0', changefreq: 'daily' },
    { loc: 'https://agnaa.in/portfolio', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://agnaa.in/design-studio', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://agnaa.in/constructions', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://agnaa.in/start-project', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://agnaa.in/estimate', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://agnaa.in/calc', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://agnaa.in/foundation', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://agnaa.in/llms.txt', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://agnaa.in/llms-full.txt', priority: '0.8', changefreq: 'weekly' },
  ];

  const coreXml = corePages.map(
    (page) => `
  <url>
    <loc>${page.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  ).join('');

  const geoCategoriesXml = GEO_CATEGORIES.map(
    (cat) => `
  <url>
    <loc>https://agnaa.in/geo#${cat.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`
  ).join('');

  const geoQuestionsXml = ALL_GEO_QUESTIONS.map(
    (q) => `
  <url>
    <loc>https://agnaa.in/geo#${q.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  ).join('');

  const postsXml = BLOG_POSTS.map(
    (post) => `
  <url>
    <loc>https://blog.agnaa.in/post/${post.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  ).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${coreXml}
${geoCategoriesXml}
${geoQuestionsXml}
${postsXml}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
