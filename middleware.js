// middleware.js - place in root of project (same level as package.json)
//
// Detects AI crawler and research agent visits, logs them to Vercel,
// and sends a custom event to GA4 via the Measurement Protocol.

// ── Known AI crawler user-agent patterns ──────────────────────────────────────
const AI_CRAWLERS = [
  { pattern: /GPTBot/i,           name: "OpenAI GPTBot" },
  { pattern: /ChatGPT-User/i,     name: "ChatGPT User" },
  { pattern: /OAI-SearchBot/i,    name: "OpenAI SearchBot" },
  { pattern: /anthropic-ai/i,     name: "Anthropic Claude" },
  { pattern: /Claude-Web/i,       name: "Anthropic Claude Web" },
  { pattern: /ClaudeBot/i,        name: "Anthropic ClaudeBot" },
  { pattern: /PerplexityBot/i,    name: "Perplexity" },
  { pattern: /Perplexity/i,       name: "Perplexity" },
  { pattern: /cohere-ai/i,        name: "Cohere" },
  { pattern: /YouBot/i,           name: "You.com" },
  { pattern: /Diffbot/i,          name: "Diffbot" },
  { pattern: /Meta-ExternalAgent/i, name: "Meta AI" },
  { pattern: /FacebookBot/i,      name: "Meta FacebookBot" },
  { pattern: /Amazonbot/i,        name: "Amazon Alexa" },
  { pattern: /Applebot/i,         name: "Apple" },
  { pattern: /Bytespider/i,       name: "ByteDance" },
  { pattern: /PetalBot/i,         name: "Huawei PetalBot" },
  { pattern: /Timpibot/i,         name: "Timpi" },
  { pattern: /iaskspider/i,       name: "iAsk AI" },
  { pattern: /Omgili/i,           name: "Omgili" },
  { pattern: /DataForSeoBot/i,    name: "DataForSeo" },
  { pattern: /news-crawler/i,     name: "News Crawler" },
  { pattern: /researchers/i,      name: "Research Crawler" },
];

// ── GA4 Measurement Protocol config ──────────────────────────────────────────
const GA_MEASUREMENT_ID = "G-0YM3F4YYTD";
const GA_API_SECRET      = process.env.GA_SECRET || "";
const GA_ENDPOINT        = `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`;

// ── Send event to GA4 (non-blocking, fire and forget) ────────────────────────
async function sendCrawlerEvent(crawlerName, url, userAgent) {
  if (!GA_API_SECRET) return;

  const payload = {
    client_id: "ai_crawler",
    non_personalized_ads: true,
    events: [
      {
        name: "ai_crawler_visit",
        params: {
          crawler_name:  crawlerName,
          page_location: url,
          user_agent:    userAgent.slice(0, 100),
          engagement_time_msec: "1",
        },
      },
    ],
  };

  try {
    await fetch(GA_ENDPOINT, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    });
  } catch (_) {
    // Silent fail - never block a request over analytics
  }
}

// ── Middleware ────────────────────────────────────────────────────────────────
export default async function middleware(request) {
  const ua  = request.headers.get("user-agent") || "";
  const url = request.url;

  for (const { pattern, name } of AI_CRAWLERS) {
    if (pattern.test(ua)) {
      console.log(
        JSON.stringify({
          event:   "ai_crawler",
          crawler: name,
          url,
          ua:      ua.slice(0, 200),
          ts:      new Date().toISOString(),
        })
      );

      sendCrawlerEvent(name, url, ua);
      break;
    }
  }

  // Pass through unchanged using native Response
  return new Response(null, {
    headers: { "x-middleware-next": "1" },
  });
}

// ── Run on all routes ─────────────────────────────────────────────────────────
export const config = {
  matcher: "/(.*)",
};
