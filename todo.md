# todo

Ranked. Reviewed 2026-09-26 against commit `bba2be9` (no source commits since 2026-05-31).

**Nothing on the 2026-09-16 list was touched.** Every item below that carries over has been
re-verified this run, not copied forward. Task 1 is new and supersedes the old framing of the
Suika work: even a perfect fix to the input overlay would leave the game unable to merge fruit.

---

## 1. `[DONE 2026-09-26]` The Suika merge rule is mathematically unreachable on a straight drop

The core mechanic of a fruit-merge game never fires, and it is not a tuning problem — the
physics pass actively cancels the merge pass, in this exact order inside one frame
(`GameCanvas.tsx:76-108`):

1. `fruits.forEach(f => f.update(dt, canvas.height))` — gravity, so a resting pair re-overlaps
   by a fraction of a pixel.
2. `fruits[i].resolveCollision(fruits[j])` — `Fruits.ts:60-69` separates the pair by *exactly*
   `overlap = minDist - dist`, so the post-separation distance is exactly `minDist`.
3. The merge test at `GameCanvas.tsx:95` is a strict `if (dist < minDist)`. After step 2 the
   distance *is* `minDist`, so this is false.

Normally floating-point noise saves you and the merge fires within a frame or two. It does not
save you when `dx` is exactly `0`: `nx = dx / dist` is then `0`, `this.x += nx * overlap / 2`
changes nothing, and the separation happens purely on `y` with no rounding slop at all. Every
frame lands on exactly `minDist` and the merge test misses forever.

`dx` is exactly `0` for the normal way to play. `dropFruit` (`GameCanvas.tsx:21-28`) always uses
the same clamped `fruitDropX`, and a `dx == 0` collision imparts no `vx` (`vxTotal` is `0`), so
two fruits dropped from the button stay in a perfectly vertical column forever.

I replicated `Fruits.ts` plus the `draw()` body headlessly and ran it:

| scenario | result after 600 frames (10s) |
|---|---|
| two Cherries, same x | **0 merges**, 502 frames sitting at exactly-touching |
| two Cherries, 5px x-offset | merges → Strawberry |
| two Watermelons, same x | **0 merges**, 508 near-misses |
| four Cherries, same x | 1 merge (only because a third body nudges `x`) |

**Fix:** give the merge test the slop that resolution removed — `if (dist < minDist + 0.5)` at
`GameCanvas.tsx:95` — or run the merge pass *before* `resolveCollision` instead of after.

While you are in that block, fix the max-tier hole at `GameCanvas.tsx:96-104`: both indices go
into `mergedIndices` unconditionally, but `if (nextIndex < fruitTypes.length)` pushes no
replacement, so two Watermelons that do merge both **delete themselves**. Confirmed: two
Watermelons with a 12px offset leave an empty board. Only add to `mergedIndices` when a
replacement will actually be created.

*Why it matters:* this is the only interactive thing on the site and the first card on
`/projects`. Fixing the input overlay (task 2) without this just makes it easier to observe that
fruit never merges.

~25 min. Best value-for-effort in the repo.

---

## 2. [BUG] The click overlay steals input, and fixing it alone detonates a latent rAF leak

**Fix these together or you will make the game dramatically worse.** Re-verified this run.

`src/app/projects/DevilSuika/page.tsx:20-23` puts `<div className="absolute inset-0 z-10">`
over the canvas to catch clicks. Two consequences:

- `handleCanvasClick` (`page.tsx:10-14`) reads `(e.target as HTMLCanvasElement)
  .getBoundingClientRect()`, but `e.target` is the **overlay**, not the canvas. The overlay is
  viewport-sized; the canvas is `w-[90vw] max-w-[800px]` centred in a `p-4` flex box
  (`GameCanvas.tsx:126-127`). At 1280px wide the canvas sits at roughly x∈[240,1040], so drops
  land ~240px right of the cursor and anything past x≈800 saturates on the clamp at
  `GameCanvas.tsx:24`. The `as HTMLCanvasElement` cast is a lie TypeScript cannot catch because
  `e.target` is typed `EventTarget`.
- The overlay also swallows `mousemove`, so the canvas listener at `GameCanvas.tsx:58` never
  fires, `mouseX` stays `null` forever, and the ghost preview at `GameCanvas.tsx:69-74` is dead
  code.

The trap: `mouseX` is the only dep of the effect at `GameCanvas.tsx:39-123`, and its cleanup
(`119-122`) removes both listeners but **never calls `cancelAnimationFrame`**, while `draw`
re-arms itself at `line 114`. The moment mousemove reaches the canvas — the obvious fix — every
mouse movement sets state, re-runs the effect, and spawns *another* self-perpetuating rAF loop
over the same `fruitsRef`. A second of movement gives you dozens of concurrent loops applying
gravity to one array. The input bug is the only thing currently masking the leak.

Do it as one change: hold the pointer in a `useRef` (no state, no re-render, no effect churn),
drop `mouseX` from the deps so the effect runs once, capture the id from
`requestAnimationFrame` and cancel it in cleanup, and compute drop-x from
`canvasRef.current.getBoundingClientRect()`.

Also clamp `dt` while you are in `draw` (`GameCanvas.tsx:62-64`). rAF pauses in a background
tab, so on return one frame carries a multi-second `dt`. Verified: a single `dt = 3.0` frame
teleports a Cherry from y=50 straight to the floor and launches it back up at `vy = -600` —
it gains energy and tunnels through anything in between. `const step = Math.min(dt, 1/30)` fixes it.

~45 min.

---

## 3. [QUICK WIN ~15min] The site still introduces itself as "My App"

Three mechanical edits, all re-verified against a running dev server this run:

- `src/app/layout.tsx:4-7` — metadata is still the scaffold default. `curl localhost:3000`
  serves `<title>My App</title>` and `<meta name="description" content="Next.js with
  TailwindCSS and navbar">`. That is the browser tab, the search result and every link preview.
- No favicon — `src/app/favicon.ico` was deleted in `9357fbd` and never replaced.
- `package.json:9` — `"lint": "next lint"` is broken. `next lint` was removed in Next 16 (this
  repo is on `next ^16.2.6`) and the CLI now reads `lint` as a directory argument, so it fails
  with `Invalid project directory provided, no such directory: .../lint`. Nothing has been
  linted since the upgrade. Replace with `"lint": "eslint ."`.

~15 min.

---

## 4. [BUG] Three of the five project cards 404

Re-confirmed against the dev server today: `/projects/2048Game`, `/projects/js-mini-tools` and
`/projects/how-i-built-my-portfolio` all return **404**. They are linked from
`src/app/projects/page.tsx:16`, `:37` and `:30`. Only `/projects/DevilSuika` and
`/projects/arcaderoom` resolve (both 200).

Mark the three as coming-soon (render a non-clickable `<div>`, no `href`) or stub the routes.
Coming-soon is the honest 10-minute version.

While in the file:

- `page.tsx:52` sets `target={project.type === 'game' ? '_blank' : '_self'}`. Verified in the
  served markup — `href="/projects/DevilSuika" target="_blank"` — so an *internal* Next route
  opens in a new tab. Drop the `target`.
- Every card is a raw `<a>` rather than `next/link`, so each navigation is a full page reload.
  Same in `home/Hero.tsx:12,15` and `home/Features.tsx:64`. `Navbar.tsx` already uses `Link`
  correctly — copy that.
- The `'use client'` at `page.tsx:1` is unnecessary (no hooks, no handlers) and ships a client
  bundle for a static list.

*Why it matters:* a visitor's most likely click on a portfolio is a project card, and it has a
60% chance of hitting a 404.

~30 min.

---

## 5. [IMPROVEMENT] Purge the placeholder identity: "Trial 1" and `you@example.com`

Two files, both still untouched, both above the fold on the pages that matter most.

`src/app/home/Features.tsx:5-36` is the carousel directly below the hero. The titles are
literally `Trial 1`…`Trial 5`, and three of the five share a byte-identical description
("Projects I've built while working with other developers.", lines `20`, `26`, `32`). The links
are dead too: `/#designs` (`:15`) and `/#collabs` (`:21`, `:27`, `:33`) target anchors that do
not exist — `src/app/page.tsx:8-10` only renders `#hero`, `#features` and `#faq`. Four of five
"Visit →" buttons jump nowhere. Write three real cards with working targets, or cut the section.

`src/app/contact/page.tsx` has no working way to reach you at all: `you@example.com` (`:9`,
`:31`), `github.com/yourusername` (`:39`), `linkedin.com/in/yourprofile` (`:49`),
`yourportfolio.com` (`:59`). Fix the copy button while you are there — `handleCopyEmail`
(`:8-12`) calls `navigator.clipboard.writeText(...)` without awaiting or catching, then calls
`setCopied(true)` unconditionally. On a non-secure origin or with clipboard permission denied
the promise rejects unhandled and the UI still says "Copied!" — it tells the user the exact
opposite of the truth. Await it and confirm only on success.

~40 min.

---

### Noted, not scheduled

- **`/projects/arcaderoom` depends on a free third-party CDN at runtime, with no error
  boundary.** `Environment preset="sunset"` (`arcaderoom/page.tsx:20`) resolves through drei's
  `presetsObj` to `https://raw.githack.com/pmndrs/drei-assets/456060a.../hdri/
  venice_sunset_1k.hdr` (`node_modules/@react-three/drei/core/useEnvironment.js:8`). I fetched
  it: 1.4 MB, served via a 301 to raw.githubusercontent.com, behind Cloudflare — and it **403s
  any client Cloudflare does not like** (a plain `curl` with no browser UA gets 403; with a
  browser UA it succeeds). So a required asset for one of your only two working project pages
  sits behind a free GitHub proxy you do not control. `useEnvironment` calls `useLoader`, which
  throws on failure, and `Suspense fallback={null}` (`:17`) has **no ErrorBoundary** above it,
  so a bad fetch takes down the whole route instead of degrading to "3D room, plainer lighting."
  Either vendor the `.hdr` into `public/` or drop `Environment` and keep the two lights.
- Same page: 6.4 MB `public/room/arcade.glb` + that 1.4 MB HDRI ≈ 7.8 MB behind
  `Suspense fallback={null}`, with no `useGLTF.preload`. Visitors get a silent black canvas for
  many seconds. A `<Html>` spinner in the fallback is ten minutes.
- **No tests, no test runner, no CI.** The single most valuable test is a pure unit test of the
  frame step — no DOM needed, since `Fruits.ts` is plain classes. Assert that two same-type
  fruits dropped at identical `x` merge within N frames. That is exactly task 1, it would have
  caught it the day the merge code was written, and nothing else in any workflow can see it.
- `src/app/projects/DevilSuika/GameUI.tsx` is orphaned — imported nowhere, calls
  `(window as any).dropFruit` (`:5`) that nothing ever assigns, and its Reset button has no
  `onClick` at all (`:17-19`). Delete it.
- `Fruits.ts:31-45` `update()` handles only the floor — no left/right walls, no ceiling, no
  game-over, and no score anywhere in a Suika clone. I tried to reproduce fruit escaping
  sideways (25 cherries rained into a 100px band, 3000 frames) and **could not** — the heap
  stayed within x∈[313,501] of an 800px canvas. So the missing walls are a real gap in the
  model but not currently a visible bug. Lower priority than it looks.
- `Fruits.ts:60` — the `dist !== 0` guard means two fruits at the exact same point never
  separate (verified: `resolveCollision` on two co-located fruits is a no-op). Merged fruits
  spawn at the exact midpoint (`GameCanvas.tsx:101`), so two simultaneous merges at one spot
  reach it.
- `GameCanvas.tsx:110-111` allocates two fresh arrays every frame forever, even on an empty
  board, and `line 70` allocates a throwaway `Fruit` per frame for the preview. Harmless now,
  but it is 60 allocations/sec of pure garbage.
- Duplicate DOM ids: `page.tsx:9` wraps `<Features />` in `<section id="features">` while
  `Features.tsx:46` also sets `id="features"`; same for `#faq` (`page.tsx:10` /
  `FAQ.tsx:32`). Invalid HTML, and it makes the anchor targets ambiguous.
- `src/app/components/Navbar.tsx:21` — five links plus a `text-3xl` brand in a `flex gap-8
  text-lg` with no `hidden md:flex` and no hamburger. Will overflow on a phone.
