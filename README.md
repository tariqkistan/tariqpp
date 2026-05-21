# Personal Developer Portfolio

A modern, animated portfolio for a Data Engineer & Frontend Developer. Built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and D3.js.

## Features

- Full-viewport hero with rotating taglines
- Interactive D3 skill galaxy / constellation
- Project showcase cards with hover effects
- Certification flip cards
- Animated experience timeline
- CTA contact section (no backend required)
- Scroll animations with `prefers-reduced-motion` support
- Deploy-ready for Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize Your Content

Search for `[REPLACE:` across the codebase. Key files:

| File | What to update |
|------|----------------|
| `src/data/site.ts` | Name, email, social links, stats |
| `src/data/skills.ts` | Skills, categories, proficiency |
| `src/data/projects.ts` | Projects, demo/repo URLs, images |
| `src/data/experience.ts` | Work history |
| `src/data/certifications.ts` | Certifications |
| `src/app/layout.tsx` | SEO metadata |
| `public/cv.pdf` | Your actual CV |
| `public/og-image.svg` | Social preview image |

Add project screenshots to `public/projects/` and update `previewImage` paths in `projects.ts`.

## Deploy to Vercel

```bash
npm run build
npx vercel
```

Or connect this repo to [Vercel](https://vercel.com) for automatic deployments on push.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Visualization:** D3.js (force-directed graph)

## Project Structure

```
src/
├── app/           # Layout, page, globals
├── components/    # Layout, sections, UI
├── data/          # Content (easy to edit)
├── hooks/         # Animation helpers
└── lib/           # Utilities
```

## License

MIT — customize freely for your personal portfolio.
