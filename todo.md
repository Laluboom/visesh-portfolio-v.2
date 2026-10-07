# todo

Ranked. Reviewed 2026-10-07 against commit `bba2be9` — still the newest source commit, dated
2026-05-31.

**Read this before the list.** This is the third review in a row (2026-09-16, 2026-09-26,
today) and **not one item has been started.** The two prior lists were not wrong — I
re-verified every claim on them today against a running dev server and a headless replication
of the physics, and they all hold. So the bottleneck is not analysis. If the next review finds
this list untouched too, the honest conclusion is that this repo is not actually active and
should move out of `01_active_projects`.

To make that less likely, task 1 is deliberately tiny: **two lines, one file.** Do only that
and the game's core mechanic starts working.

---

## 1. [BUG] Two lines make the fruit-merge game able to merge fruit

The merge rule can never fire on a straight drop, and the fix for it uncovers a second bug —
**change both or you will trade a game that can't merge for one that deletes your best fruit.**

Inside one frame (`GameCanvas.tsx:76-108`) the order is:

1. `update()` — gravity, so a resting pair re-overlaps by a fraction of a pixel.
2. `resolveCollision()` — `Fruits.ts:60-69` separates the pair by *exactly* `minDist - dist`,
   so the post-separation distance is exactly `minDist`.
3. the merge test at `GameCanvas.tsx:95` — a strict `if (dist < minDist)`, which is now false.

Floating-point noise normally rescues this within a frame or two. It cannot when `dx` is
exactly `0`: `nx = dx / dist` is `0`, the `x` correction is a no-op, separation happens purely
on `y`, and every frame lands on `minDist` forever. And `dx` is exactly `0` for the normal way
to play — `dropFruit` (`GameCanvas.tsx:21-28`) always reuses the same clamped `fruitDropX`, and
a `dx == 0` collision imparts no `vx` (`vxTotal` is `0`), so button-dropped fruit stacks in a
perfectly vertical column.

I re-derived `Fruits.ts` plus the `draw()` body headlessly and ran 600 frames (10s) of each:

| scenario | as shipped | with `+ 0.5` slop |
|---|---|---|
| 2 Cherries, identical x | **0 merges**, 500 frames exactly-touching | 1 merge → Strawberry |
| 2 Cherries, 5px x-offset | 1 merge → Strawberry | — |
| 2 Watermelons, identical x | **0 merges**, 506 near-misses | 1 merge → **empty board** |
| 4 Cherries, identical x | 1 merge (a third body nudges `x`) | 3 merges → Orange |
| 2 Watermelons, 12px offset | 1 merge → **empty board** | — |

Note the two `empty board` cells. That is the coupled bug at `GameCanvas.tsx:96-104`: both
indices go into `mergedIndices` unconditionally, but `if (nextIndex < fruitTypes.length)` then
pushes no replacement — so two Watermelons that merge **both delete themselves**. Today it is
rare because merges barely happen. Fix the slop alone and it becomes the normal ending.

**The change:**
- `GameCanvas.tsx:95` — `if (dist < minDist + 0.5)` (or move the merge pass *above*
  `resolveCollision`).
- `GameCanvas.tsx:96-97` — compute `nextIndex` first and only `mergedIndices.add(...)` when a
  replacement will actually be created.

~30 min. Best value-for-effort in the repo, and the smallest real change on this list.

---

## 2. [QUICK WIN ~15min] The site still introduces itself as "My App"

Three mechanical edits, all re-verified against a dev server today:

- `src/app/layout.tsx:4-7` — metadata is still the scaffold default. `curl localhost:3000`
  serves `<title>My App</title>` and `<meta name="description" content="Next.js with
  TailwindCSS and navbar">`. That is the browser tab, the Google result, and every link
  preview anyone pastes.
- No favicon — `src/app/favicon.ico` was deleted in `9357fbd` and never replaced.
- `package.json:9` — `"lint": "next lint"` is broken. `next lint` was removed in Next 16 (this
  repo is on `next ^16.2.6`), so the CLI reads `lint` as a directory and dies:
  `Invalid project directory provided, no such directory: .../lint`. Confirmed again today.
  Nothing has been linted since the upgrade. Replace with `"lint": "eslint ."`.

---

## 3. [BUG] The click overlay steals input, and fixing it alone detonates a latent rAF leak

**Fix these together or you will make the game dramatically worse.** Re-verified today.

`src/app/projects/DevilSuika/page.tsx:20-23` lays `<div className="absolute inset-0 z-10">`
over the canvas to catch clicks. Two consequences:

- `handleCanvasClick` (`page.tsx:10-14`) reads `(e.target as HTMLCanvasElement)
  .getBoundingClientRect()`, but `e.target` is the **overlay**, not the canvas. The overlay is
  viewport-sized; the canvas is `w-[90vw] max-w-[800px]` centred in a `p-4` flex box
  (`GameCanvas.tsx:126-127`). At 1280px the canvas sits at roughly x∈[240,1040], so drops land
  ~240px right of the cursor and anything past x≈800 saturates on the clamp at
  `GameCanvas.tsx:24`. The `as HTMLCanvasElement` cast is a lie TypeScript cannot catch,
  because `e.target` is typed `EventTarget`.
- The overlay also swallows `mousemove`, so the canvas listener at `GameCanvas.tsx:58` never
  fires, `mouseX` stays `null` forever, and the ghost preview at `GameCanvas.tsx:69-74` is
  dead code.

The trap: `mouseX` is the only dep of the effect at `GameCanvas.tsx:39-123`, and its cleanup
(`119-122`) removes both listeners but **never calls `cancelAnimationFrame`**, while `draw`
re-arms itself at `line 114`. The moment mousemove reaches the canvas — the obvious fix —
every mouse movement sets state, re-runs the effect, and spawns *another* self-perpetuating
rAF loop over the same `fruitsRef`. A second of movement gives you dozens of concurrent loops
each applying gravity to one shared array. The input bug is the only thing masking the leak.

Do it as one change: hold the pointer in a `useRef` (no state, no re-render, no effect churn),
drop `mouseX` from the deps so the effect runs once, capture the id from
`requestAnimationFrame` and cancel it in cleanup, and compute drop-x from
`canvasRef.current.getBoundingClientRect()`.

Clamp `dt` while you are in `draw` (`GameCanvas.tsx:62-64`). rAF pauses in a background tab, so
on return one frame carries a multi-second `dt`. Measured today: a single `dt = 3.0` frame
teleports a falling Cherry to `y = 788` and launches it back up at `vy = -600` — it *gains*
energy and tunnels through everything between. `const step = Math.min(dt, 1/30)` fixes it.

~45 min.

---

## 4. [BUG] Stop the site lying to visitors: dead cards, no working contact, a clipboard that fibs

Everything here is user-facing dishonesty on the two pages a visitor actually goes to.

**`/projects` — 3 of the 5 cards 404.** Re-confirmed by HTTP today: `/projects/2048Game`,
`/projects/js-mini-tools`, `/projects/how-i-built-my-portfolio` all **404**; only
`/projects/DevilSuika` and `/projects/arcaderoom` return 200. They are linked from
`src/app/projects/page.tsx:16`, `:37`, `:30`. Render those three as non-clickable coming-soon
`<div>`s (no `href`) — the honest 10-minute version. While in the file: `page.tsx:52` sets
`target={project.type === 'game' ? '_blank' : '_self'}`, and the served markup confirms
`href="/projects/DevilSuika" target="_blank"` — an *internal* Next route opening a new tab.
Drop the `target`.

**`/contact` — there is no working way to reach you.** `you@example.com` (`:9`, `:31`),
`github.com/yourusername` (`:39`), `linkedin.com/in/yourprofile` (`:49`), `yourportfolio.com`
(`:59`). A portfolio whose contact page cannot be contacted has failed at its only job.
And `handleCopyEmail` (`:8-12`) calls `navigator.clipboard.writeText(...)` without awaiting or
catching, then sets `setCopied(true)` unconditionally — on a non-secure origin or with
clipboard permission denied, the promise rejects unhandled and the UI still says "Copied!",
telling the user the exact opposite of the truth. Await it; confirm only on success.

~45 min.

---

## 5. [TEST] One pure unit test over the frame step — the test that would have caught task 1

There is no test runner and no CI, and task 1 is precisely the class of bug a test catches and
a code review does not: it is a floating-point equality edge case that *looks* correct line by
line.

It is cheap here because `Fruits.ts` is plain classes with no DOM dependency — only the frame
sequencing lives in the component. Lift the body of `draw()` (`GameCanvas.tsx:66-112`) into an
exported `stepFrame(fruits, dt, height): Fruit[]` in `Fruits.ts` (or a new `step.ts`), have
`draw` call it, then assert:

- two same-type fruits dropped at **identical x** merge within ~120 frames (fails today);
- two Watermelons that merge leave **one** Watermelon on the board, not zero (fails today);
- one `dt = 3.0` frame does not increase a fruit's `|vy|` (fails today).

`node --test` with `tsx`, or Vitest. No jsdom, no canvas mock. The refactor is also the right
shape regardless — it gets physics out of the React component.

~30 min. Do it right after task 1 while the expected behaviour is fresh.

---

### Noted, not scheduled

- **The homepage carousel reads "Trial 1"–"Trial 5".** `src/app/home/Features.tsx:5-36`, the
  section directly below the hero. Three of the five share a byte-identical description
  (lines `20`, `26`, `32`), and four of five "Visit →" buttons jump nowhere: `/#designs`
  (`:15`) and `/#collabs` (`:21`, `:27`, `:33`) target anchors that do not exist —
  `page.tsx:8-10` only renders `#hero`, `#features`, `#faq`. Decide whether this section earns
  its place before writing copy for it; cutting it is a legitimate answer.
- `src/app/about/page.tsx:40` — the three-card strip is still lorem ipsum, rendered three
  times.
- **`/projects/arcaderoom` depends on a free third-party CDN at runtime with no error
  boundary.** `Environment preset="sunset"` (`arcaderoom/page.tsx:20`) resolves through drei's
  `presetsObj` to a `raw.githack.com` URL (`node_modules/@react-three/drei/core/
  useEnvironment.js:8`) — 1.4 MB, 301 to raw.githubusercontent.com, behind Cloudflare, and it
  403s clients Cloudflare dislikes. `useEnvironment` calls `useLoader`, which throws on
  failure, and `Suspense fallback={null}` (`:17`) has **no ErrorBoundary** above it, so a bad
  fetch takes down the whole route rather than degrading to plainer lighting. Vendor the
  `.hdr` into `public/`, or drop `Environment` and keep the two lights.
- Same page: 6.4 MB `public/room/arcade.glb` + that 1.4 MB HDRI ≈ 7.8 MB behind
  `fallback={null}`, with no `useGLTF.preload`. Visitors get a silent black canvas for
  seconds. An `<Html>` spinner is ten minutes.
- `DevilSuika/GameUI.tsx` is orphaned — imported nowhere, calls `(window as any).dropFruit`
  (`:5`) that nothing assigns, and its Reset button has no `onClick` (`:17-19`). Delete it.
- `Fruits.ts:31-45` handles only the floor — no side walls, no ceiling, no game-over, no score
  anywhere in a Suika clone. A previous run tried to make fruit escape sideways and could not,
  so this is a real gap in the model but not a visible bug. Lower priority than it looks.
- `Fruits.ts:60` — the `dist !== 0` guard means two exactly co-located fruits never separate,
  and merged fruit spawns at the exact midpoint (`GameCanvas.tsx:101`), so two simultaneous
  merges in one spot can reach that state.
- **Duplicate DOM ids**, confirmed in served markup today: `id="features"` and `id="faq"` each
  appear **twice** — `page.tsx:9-10` wraps the components in `<section id=...>` and
  `Features.tsx:46` / `FAQ.tsx:32` set the same id internally. Invalid HTML, ambiguous anchors.
- `Navbar.tsx:21` — five links plus a `text-3xl` brand in `flex gap-8 text-lg`, no
  `hidden md:flex`, no hamburger. Will overflow on a phone.
- `projects/page.tsx:1` and `FAQ`/`Features` aside, the `'use client'` on `projects/page.tsx`
  is unnecessary (no hooks, no handlers) and ships a client bundle for a static list.
