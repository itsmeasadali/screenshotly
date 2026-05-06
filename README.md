# Screenshotly

![Screenshotly](public/demo-screenshot.png)

**Screenshot API for developers.** Capture any URL as a PNG, JPEG, WebP, or PDF
with a single HTTP call. AI-assisted element removal strips cookie banners
and chat widgets; device-mockup frames wrap captures in browser / phone /
laptop chrome server-side; a hosted Chromium pipeline keeps latency
predictable.

Built on **Next.js 15**, **Puppeteer**, **Prisma / Postgres**, **Clerk**,
and **Redis**.

© Screenshotly. All rights reserved.

---

## Local development

```bash
npm install
cp .env.example .env.local     # fill in the required values
npx prisma migrate deploy
npm run dev
```

Visit <http://localhost:3000>. The `/playground` route is the fastest way to
confirm captures are working end-to-end.

The minimum required environment variables are a Postgres `DATABASE_URL` and
a Clerk publishable + secret key. Everything else in `.env.example` is
optional and documented inline.

## API example

```bash
curl -X POST https://api.screenshotly.app/screenshot \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "device": "desktop",
    "format": "png",
    "aiRemoval": { "enabled": true, "types": ["cookie-banner"] }
  }' \
  --output screenshot.png
```

The full request schema (all options, defaults, and bounds) is defined in
`src/lib/api/screenshot-schema.ts`.

## Repository layout

```
screenshotly/
├── src/
│   ├── app/                    # Next.js App Router routes + API handlers
│   │   └── api/                # REST endpoints (thin handlers; logic in lib/)
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/radix primitives
│   │   ├── home/               # homepage sections
│   │   └── layouts/            # shared page shells
│   ├── lib/
│   │   ├── api/                # auth, schema, screenshot processor, webhooks
│   │   ├── seo/                # structured-data + metadata helpers
│   │   ├── branding.ts         # site name / tagline / canonical URLs
│   │   ├── puppeteer.ts        # headless browser singleton
│   │   └── markdown.ts         # blog + author loader
│   └── data/                   # Marketing + pSEO content (use-cases, comparisons,
│                                 integrations, testimonials, FAQs, enrichment)
├── content/
│   ├── blog/                   # Blog posts (Markdown with frontmatter)
│   └── authors/                # Author profiles
├── prisma/                     # Database schema + migrations
└── public/                     # Static assets (og-image, demo, icons)
```

## Tech stack

- **Framework** — Next.js 15 (App Router, Server Components where useful)
- **Auth** — Clerk (user sessions) + hashed API keys (REST access)
- **Database** — PostgreSQL via Prisma
- **Capture** — `puppeteer-core` + `@sparticuz/chromium` (serverless-compatible)
- **Image processing** — Sharp
- **AI element removal** — OpenAI Vision (only invoked when `aiRemoval.enabled`)
- **Rate limiting + cache** — Redis
- **Payments** — Stripe (wired to the pricing + billing routes)
- **Storage** — S3 / Cloudflare R2 (for persisted captures)

## Deployment

The project is shaped for three deployment targets:

1. **Vercel** — serverless; uses `@sparticuz/chromium` to fit the function
   size limit. Set `maxDuration = 30` (already configured on the capture
   route).
2. **Container platforms (Railway, Fly, Render)** — swap `puppeteer-core`
   for full `puppeteer` in your Dockerfile and allocate ≥ 1 vCPU / 2 GB RAM
   per worker.
3. **VPS (Docker Compose)** — a reference `docker-compose.yml` lives under
   the ops runbooks.

Set `NEXT_PUBLIC_APP_URL` to the canonical domain. Apply migrations with
`npx prisma migrate deploy`. Verify `/robots.txt` and `/sitemap.xml` are
reachable post-deploy.

## Development conventions

- `npm run lint && npm run typecheck` before every push.
- Small, focused changes; one concern per PR.
- Branching: feature branches off `main`, squash-merge on approval.

## Security

See [SECURITY.md](./SECURITY.md). Do not file public issues for
vulnerabilities — email the maintainers first.
