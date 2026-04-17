# warmprint V2 — Editorial Dark Artisan

Static landing page mockup. Editorial dark palette — charcoal `#1C1B17`, brass `#B8935A`, Cormorant Garamond typography.

## Open locally

Double-click `index.html` — no build step, no server needed.

## Deploy to Vercel

1. Push this directory to a GitHub repository (or use Vercel CLI).
2. In Vercel: New Project → Import Repository → set **Root Directory** to `v2-editorial-dark/`.
3. Framework: **Other** (static HTML).
4. Deploy — Vercel picks up `vercel.json` automatically.

Deployed URL placeholder: `https://warmprint-v2.vercel.app/`

## TODO before production

- [ ] Replace placeholder images (placehold.co) with real product photos (WebP/AVIF)
- [ ] Replace contact stubs (Telegram `@warmprint`, Instagram `@warmprint.studio`, email `hello@warmprint.studio`) with real handles
- [ ] Wire up form submit endpoint (Formspree / n8n webhook)
- [ ] Generate PNG version of `og-default.svg` for platforms that don't render SVG OG images
- [ ] Replace `warmprint-v2.vercel.app` with production domain in: `index.html` (canonical, hreflang, OG, Schema.org), `robots.txt`, `sitemap.xml`
- [ ] Update `sitemap.xml` `<lastmod>` on each deploy
- [ ] Add Google Analytics / Plausible tracking
