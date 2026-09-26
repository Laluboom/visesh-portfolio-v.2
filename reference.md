# reference

Personal portfolio site for Visesh. Second attempt (`v.2`). Next.js App Router + Tailwind v4,
with two interactive project pages: a canvas Suika (fruit-merge) clone and an R3F 3D arcade room.

Last verified 2026-09-26 against commit `bba2be9`.

## Run it

```bash
npm ci
npm run dev      # http://localhost:3000 — Next 16.2.6 on Turbopack, ready in ~1s
npm run build
```

`npm run lint` is **broken** — `next lint` was removed in Next 16, so the CLI reads `lint` as a
project directory and errors out. Use `npx eslint .` until `package.json:9` is fixed.

There is no test suite and no CI.

## Stack

Next 16.2.6 (App Router, Turbopack) · React 19 · TypeScript 5 (`strict: true`) ·
Tailwind v4 via `@tailwindcss/postcss` · `@react-three/fiber` 9 + `@react-three/drei` 10 + three 0.184.
Deps are caret-ranged but `package-lock.json` is committed, so installs are reproducible.
No backend, no API routes, no env vars, no secrets — everything is static or client-side.

## Layout

```
src/app/
  layout.tsx            root layout — Navbar + globals.css (metadata is still scaffold default)
  page.tsx              home: #hero / #features / #faq
  home/                 Hero, Features (carousel), FAQ (accordion)
  components/Navbar.tsx sticky top nav, 5 links, no mobile treatment; only file using next/link
  about/page.tsx        static, partly lorem ipsum
  contact/page.tsx      all placeholder contact details
  projects/page.tsx     5 cards; 3 point at routes that do not exist
  projects/DevilSuika/  Fruits.ts (physics) · GameCanvas.tsx (rAF loop) · page.tsx · GameUI.tsx (orphaned)
  projects/arcaderoom/  R3F scene: public/room/arcade.glb (6.4 MB, committed) + a remote 1.4 MB HDRI
  styles/globals.css    Tailwind import + a `.text-gradient` helper
```

## Current state

Builds and serves cleanly; the shell of a real site is there. What is missing is content and one
working interaction. Route check 2026-09-26: `/`, `/about`, `/contact`, `/projects`,
`/projects/DevilSuika`, `/projects/arcaderoom` all 200; `/projects/2048Game`,
`/projects/js-mini-tools`, `/projects/how-i-built-my-portfolio` all 404.

**The Suika game is broken in three independent ways.** (a) The merge rule can never fire on a
vertical drop: `resolveCollision` separates a pair to exactly `minDist` (`Fruits.ts:60-69`) and
the merge test is a strict `dist < minDist` (`GameCanvas.tsx:95`), which with `dx == 0` misses
every frame with no floating-point slop to rescue it — simulated 600 frames, zero merges.
(b) A full-bleed overlay in `DevilSuika/page.tsx:20` intercepts input meant for the canvas, so
drops land offset from the cursor and the ghost preview never renders. (c) That overlay is the
only thing masking an uncancelled `requestAnimationFrame` loop in `GameCanvas.tsx:39-123`. See
`todo.md` tasks 1 and 2 — fixing (b) without (c) makes things worse.

`/projects/arcaderoom` pulls its `Environment preset="sunset"` HDRI from `raw.githack.com` at
runtime (a free third-party GitHub proxy), with no ErrorBoundary over the `Suspense`. Combined
with the 6.4 MB local `.glb` and `fallback={null}`, the page is a silent black canvas on load.

Most user-facing copy is still placeholder: the homepage carousel reads "Trial 1"–"Trial 5",
`/contact` lists `you@example.com` and `github.com/yourusername`, `/about` has lorem ipsum, and
the served `<title>` is still `My App`.

## History

Three real commits. Scaffold (2025-06-29), all the component work in one drop (2025-09-30), then
a dependency bump to Next 16 (2026-05-31). **No source changes since** — roughly 4 months idle,
and the 2026-09-16 review's task list was not started.
