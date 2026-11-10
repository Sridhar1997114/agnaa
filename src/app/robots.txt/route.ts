export async function GET() {
  const txt = `User-agent: *
Allow: /

# OpenAI Crawlers (ChatGPT & SearchGPT)
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

# Perplexity AI Crawlers
User-agent: PerplexityBot
Allow: /

# Anthropic Claude Crawlers
User-agent: ClaudeBot
Allow: /

# Google AI & Gemini Crawlers
User-agent: Google-Extended
Allow: /

User-agent: Googlebot
Allow: /

# Microsoft Bing & Copilot
User-agent: Bingbot
Allow: /

Sitemap: https://agnaa.in/sitemap.xml
Sitemap: https://blog.agnaa.in/sitemap.xml
`;

  return new Response(txt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
