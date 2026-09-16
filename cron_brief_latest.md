# Daily review — visesh-portfolio-v.2 — 2026-09-16

## What I looked at

Three commits total, and the last one (`bba2be9`, dependency bump to Next 16) was 2026-05-31 —
about three and a half months idle. I read every source file in `src/app` (there are only twenty),
plus the configs. There was no existing `todo.md` or `reference.md`, so nothing was stale to reconcile.

**I did run it.** `npm ci` (412 packages, clean), `npm run dev` came up on Turbopack in 871ms, and I
checked every route with curl and read the served HTML. I could not get a screenshot — the Windows
Chrome binary needed an approval this non-interactive run couldn't obtain — so the browser check is
HTTP status codes and markup rather than pixels. Dev server is stopped and the working tree is clean.

## The main finding

The Suika game is broken, and the interesting part is *how* it's broken.

`DevilSuika/page.tsx:20` lays a full-bleed `absolute inset-0 z-10` div over the canvas to catch
clicks. The handler then does `(e.target as HTMLCanvasElement).getBoundingClientRect()` — but
`e.target` is that overlay, not the canvas. The overlay is viewport-sized while the canvas is
`max-w-[800px]` and centred, so the click x-coordinate is measured in the wrong space and then
clamped to canvas width in `GameCanvas.tsx:24`. On a 1280px window fruit lands roughly 240px right of
the cursor, and every click past x≈800 piles up on the right wall. TypeScript can't catch it because
`e.target` is typed `EventTarget` and the cast is simply a false assertion.

The same overlay swallows `mousemove`, so the canvas listener at `GameCanvas.tsx:58` never fires and
`mouseX` stays `null` — which makes the ghost preview fruit at lines 69-74 dead code.

That's the part that matters. `mouseX` is the dependency of the effect at `GameCanvas.tsx:39-123`,
and its cleanup removes the two listeners but **never calls `cancelAnimationFrame`**, while `draw`
re-arms itself at line 114. Right now the overlay is the only thing keeping that harmless. The
instant someone makes mousemove reach the canvas — which is exactly the fix you'd reach for first —
every mouse movement re-runs the effect and starts another immortal animation loop over the same
`fruitsRef`. A second of cursor movement gives you dozens of loops all applying gravity to one array.
So the naive fix is strictly worse than the bug. Task 1 is written to do both at once.

## Everything else

Verified against the running server: three of the five cards on `/projects` are dead —
`/projects/2048Game`, `/projects/js-mini-tools` and `/projects/how-i-built-my-portfolio` all 404.
The served HTML still says `<title>My App</title>`. `/contact` lists `you@example.com` and
`github.com/yourusername`, so there is no working way to contact anyone through this site, and the
copy button reports "Copied!" unconditionally even when the clipboard write rejects. The homepage
carousel advertises "Trial 1" through "Trial 5" with three identical descriptions and four links
pointing at anchors that don't exist.

One quiet one worth calling out: `npm run lint` has been broken since the Next 16 bump. `next lint`
was removed in 16, so the CLI reads `lint` as a directory name and errors. Nothing has been linted in
three months, which is probably why `(window as any)` in the orphaned `GameUI.tsx` went unnoticed.

## What I'm proposing and why

Five tasks in `todo.md`. The Suika overlay/rAF pair is first because it's the only interactive thing
here, it's the top card on `/projects`, and it's the one finding where getting the fix order wrong
actively hurts. The quick win bundles three mechanical edits — real metadata, a favicon, and the lint
script — because the title is the single most visible thing on the site and the other two are one
line each. Then the 404s, the contact details, and the placeholder carousel, in that order: those are
ranked by how likely a visitor is to hit them.

**Health:** the engineering is fine. This builds, serves fast, and is structured sensibly for its
size. The gap between this and something shippable is content plus one genuine bug — not architecture.
But it is a portfolio that currently 404s the majority of its own project links and can't be contacted,
so it is not in a state to be shown to anyone yet. Given it's been idle 3.5 months, the honest advice
is to spend one session on tasks 2-4 (about 75 minutes, all mechanical) and get it presentable before
going near the game physics again.
