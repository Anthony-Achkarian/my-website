# Ark Industries Website

This is the official Next.js codebase for **arkindustriestech.com**.

## Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Plain CSS in `app/globals.css` (no Tailwind)
- **Fonts:** Inter (body) + Barlow Condensed (ARK logo)
- **Deployment:** Netlify (auto-deploys on push to `main`)
- **Repo:** github.com/Anthony-Achkarian/my-website (monorepo root)

## Project Structure
```
apps/web/
├── app/
│   ├── layout.tsx      ← site metadata, fonts, html shell
│   ├── page.tsx        ← entire homepage (Nav, Hero, Divisions, Products, About, CTA, Footer)
│   └── globals.css     ← all styles
└── public/             ← static assets (images, icons)
```

## Key Design Tokens (in globals.css)
- `--navy: #0a1628` — main background
- `--accent: #3b82f6` — blue accent color
- `--accent-light: #60a5fa` — lighter blue
- ARK logo is an inline SVG (`ArkLogo` component in page.tsx)

## Sections in page.tsx
1. **Nav** — fixed top bar with logo + links
2. **Hero** — full-screen intro with ARK logo, headline, buttons
3. **Divisions** — 3 cards: AI, Robotics, Real Estate
4. **Products** — Ask Ark app + Autonomous Drone Platform
5. **Stats** — 4 stat blocks
6. **About** — company story + 4 values
7. **CTA** — contact section (email: anthonyachkarian@gmail.com)
8. **Footer** — logo + links

## How to Run Locally
```bash
cd /Users/anthonyachkarian/my-website
npm run dev --workspace=apps/web
```

## How to Deploy
```bash
cd /Users/anthonyachkarian/my-website
git add .
git commit -m "your update"
git push
```
Netlify picks it up automatically — live in ~1-2 minutes.

## Common Tasks
- **Change text/content** → edit `app/page.tsx`
- **Change colors/styles** → edit `app/globals.css`
- **Add a new page** → create `app/[page-name]/page.tsx`
- **Add images** → drop files in `public/`, reference as `/filename.ext`
- **Change site title/description** → edit `metadata` in `app/layout.tsx`
