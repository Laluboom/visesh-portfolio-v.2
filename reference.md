# reference

Personal portfolio for Lalu Boom (the GitHub handle; `github.com/Laluboom`). Next.js App
Router, deployed to **Cloudflare Workers** via OpenNext as the worker `stalklalu`. Two
interactive project pages: a canvas Suika (fruit-merge) clone and an R3F 3D arcade room.

Last verified 2026-10-22 against commit `f1c7618`, with a running dev server.

## Why it exists

Not vanity. Google's OAuth consent screen expires an unverified ("Testing") app's refresh
tokens every 7 days; moving to "Production" needs a domain-verified home page + privacy
policy, and a `*.github.io` or Google Sites URL does not qualify. `stalklalu.com` is that
domain. The hero copy says so outright. `/privacy` and `/terms` here mirror the hosted pages
Google's consent screen points at.

## Run it

```bash
npm ci
npm run dev        # http://localhost:4100  (NOT 3000 — changed in c9dc2a2)
npm run build
npm run cf:deploy  # opennextjs-cloudflare build && deploy
```

`npm run lint` is **broken** — `package.json:9` still says `next lint`, removed in Next 16, so
the CLI reads `lint` as a directory and dies. Use `npx eslint .` until it is fixed.

There is no test suite, no test runner, and no CI.

## Stack

Next 16.2.6 (App Router, Turbopack) · React 19 · TypeScript 5 (`strict: true`) · Tailwind v4
via `@tailwindcss/postcss` · `@react-three/fiber` 9 + `@react-three/drei` 10 + three 0.184 ·
`@opennextjs/cloudflare` 1.20 + wrangler 4. Deps are caret-ranged but `package-lock.json` is
committed. No backend, no API routes, no env vars, no secrets — everything is static or
client-side.

## Design system

`styles/globals.css` — brutalist/plain-HTML: white page, **no borders at all**, zero radius /
shadow / blur / gradient, serif body (Georgia) with monospace headings and nav. Structure comes
from spacing and the `--surface: #f2f2f2` shading on `.box` / `.btn` / `code`. Two load-bearing
comments in that file explain (a) why the rules must stay inside `@layer base`/`components` —
unlayered CSS outranks Tailwind utilities and once left a "Menu" button visible on desktop —
and (b) that `--surface` exists because dropping the borders left blocks invisible.

## Layout

```
src/app/
  layout.tsx            root layout — Navbar + globals.css; metadata is real now
  page.tsx              home: Hero + Features
  home/Hero.tsx         full-viewport name + the honest one-liner above
  home/Features.tsx     5 real GitHub projects, id="features" (the /#features nav target)
  components/Navbar.tsx 4 links; mobile menu is a pure-CSS checkbox hack, no JS, no state
  about/page.tsx        real content: background, Foreman, skills, 4 project links
  contact/page.tsx      real email / GitHub / LinkedIn
  projects/page.tsx     15 real projects in a dense grid, 3 internal + 12 GitHub links
  projects/DevilSuika/  Fruits.ts (physics) · GameCanvas.tsx (rAF loop) · page.tsx ·
                        GameUI.tsx (dead code, imported nowhere)
  projects/arcaderoom/  R3F scene: public/room/arcade.glb (6.4 MB) + a remote 1.4 MB HDRI
  projects/LaluPi/      write-up on Foreman and why stalklalu.com exists
  privacy/ terms/       the OAuth-verification pages
```

## Current state

Healthy and moving — five real commits in the last four days after ~4.5 months idle. Content
is done and honest; the remaining work is all in the two interactive pages.

Route check 2026-10-22, all over HTTP: `/`, `/about`, `/contact`, `/projects`,
`/projects/DevilSuika`, `/projects/arcaderoom`, `/projects/LaluPi`, `/privacy`, `/terms` →
**all 200**. No dead internal links anywhere. `/favicon.ico` → **404** (none exists).
Served `<title>` is `Lalu Boom`; `id="features"` appears exactly once.

**The Suika merge works.** `aede087` added the `+ 0.5` slop at `GameCanvas.tsx:95` and moved
`mergedIndices.add` inside the top-tier guard at `:97`. Replayed headlessly today: 64 Cherries
at one fixed x (`dx == 0`), 3000 frames → 62 merges, full chain to Watermelon, two Watermelons
correctly left un-merged. **The three "it's broken" strings on `/projects` and the DevilSuika
banner are stale** — see `todo.md` task 1.

What is actually still wrong on that page: the overlay at `page.tsx:25-28` is a *sibling* of
the canvas, so it eats every mouse event — drops land ~240px right of the cursor at 1280px
wide (`page.tsx:11` measures the overlay's rect, not the canvas's) and the ghost preview is
dead code. Fixing that exposes an uncancelled `requestAnimationFrame` at `GameCanvas.tsx:114`
whose cleanup never cancels it, with `[mouseX]` as the effect's dep — one rAF loop per mouse
movement. **These must be fixed together**; `todo.md` task 2 explains why.

`/projects/arcaderoom` still pulls `Environment preset="sunset"` from `raw.githack.com` at
runtime with no ErrorBoundary over the `Suspense`, so a CDN 403 unmounts the route rather than
falling back to the two lights already in the scene. Its on-page warning banner is honest.

## History

Scaffold 2025-06-29, components 2025-09-30, Next 16 bump 2026-05-31, then nothing for 4.5
months. Three daily reviews (2026-09-16, -09-26, -10-07) produced notes only. The 2026-10-07
list finally got acted on: merge fix, v1 content merge, Cloudflare adapter, `/privacy` +
`/terms`, LaluPi write-up, brutalist redesign, rebrand to Lalu Boom.
