import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/structured-data";

/**
 * AI assistant crawlers are allowed explicitly.
 *
 * Answer engines (ChatGPT Search, Perplexity, Claude, Google AI Overviews)
 * fetch with their own user agents, and several of them are blocked by default
 * in the boilerplate robots.txt many hosts ship. For a local trade business,
 * being citable in an AI answer to "who does aluminium work in Lahore" is worth
 * as much as a blue link, so these are opted in deliberately rather than left
 * to chance.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "cohere-ai",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/admin"] })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
