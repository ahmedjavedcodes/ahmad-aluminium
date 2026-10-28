# Ahmad Aluminium & Glass — website

Marketing site for **AHMAD ALUMINIUM & GLASS FABRICATION (SMC-PRIVATE) LIMITED**, a
multi-trade fabrication and installation workshop in Lahore, Pakistan.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS and Framer Motion.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Project structure

| Path | What lives there |
| --- | --- |
| `data/site.ts` | Business identity, NAP (name/address/phone/email), hours, service areas, link helpers. **Single source of truth.** |
| `data/content.ts` | All site copy, including split headings. |
| `data/services.ts` | The six services: copy, specs, FAQs, keywords, images. |
| `data/testimonials.ts` | Google reviews, mirrored verbatim, plus the aggregate rating. |
| `lib/structured-data.ts` | schema.org builders (LocalBusiness, Service, FAQ, Review, Breadcrumb). |
| `app/` | Routes, sitemap, robots, `llms.txt`, icons and OG image. |
| `components/` | UI. `components/motion/` holds the animation primitives. |

Change the business details in `data/site.ts` and they propagate to the copy,
the sitemap, the structured data and every call/WhatsApp link at once.

## Before going live — outstanding items

These are marked `TODO` in `data/site.ts`:

1. **Domain** — `site.url` is a placeholder. It drives canonical URLs, the
   sitemap, OG tags and schema `@id`. Set it to the real domain.
2. **Opening hours** — the Google Business Profile currently reads
   *"Closes 7 am"*, almost certainly a 7 AM/7 PM mix-up. The site assumes
   7 PM. Worth correcting on Google too, since it makes the business look
   closed all day in search results.
3. **Social profiles** — `site.social` is empty. Facebook/Instagram URLs are
   strong entity signals for AI search.

## SEO / AI search notes

- Every page is location-qualified for Lahore in its title, H1 and description.
- Structured data covers `LocalBusiness`, per-service `Service`, `FAQPage`,
  `BreadcrumbList`, `AggregateRating` and `Review`. NAP matches the Google
  Business Profile verbatim so the two resolve to the same entity.
- `/llms.txt` gives AI assistants a plain-text brief, generated from the same
  data as the pages so it cannot drift.
- `robots.txt` explicitly allows answer-engine crawlers (GPTBot, ClaudeBot,
  PerplexityBot, OAI-SearchBot and others).
- Old bilingual `/en/*` and `/ur/*` URLs 301-redirect to their new equivalents.

## Reviews

`data/testimonials.ts` holds reviews copied verbatim from the Google Business
Profile. Do not edit or embellish the text — publishing altered or invented
reviews breaches Google's policies. To add new ones, append to the array and
update `googleRating`; the section, the rating badges and the structured data
all pick them up automatically.

## Images

Images are served from Cloudinary via a custom `next/image` loader
(`lib/cloudinary-loader.ts`). The source assets are 3–5 MB PNGs, which is too
large for Next's own optimizer to fetch within its timeout; the loader hands
resizing to the Cloudinary CDN instead (3.87 MB → ~231 KB at 1920px).
