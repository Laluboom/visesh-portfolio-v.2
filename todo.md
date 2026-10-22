# todo

Ranked. Reviewed 2026-10-22 against commit `f1c7618`, with a running dev server.

**What changed since the last review (2026-10-07).** The bottleneck broke. The previous three
reviews produced zero code changes; between then and now the repo took five real commits —
the merge fix (`aede087`), a full content rewrite (`c9dc2a2`), a brutalist redesign
(`5d0b092`), and two follow-ups. Most of the old list is genuinely done, so this is a mostly
new list:

- ~~Task 1, the two-line merge fix~~ — **done** in `aede087`. Re-verified today, see task 1.
- ~~Task 2, scaffold metadata~~ — **done**. Served `<title>` is now `Lalu Boom`.
- ~~Task 4, placeholder contact / 404 project cards / lying clipboard~~ — **done**. All nine
  routes 200, every contact detail is real, the clipboard button was deleted outright.
- ~~"Trial 1"–"Trial 5" carousel, lorem ipsum about-strip, duplicate `id="features"`,
  missing mobile nav, needless `'use client'` on `/projects`~~ — all **done**.

Three things on the old list are still open and have been carried forward: the rAF leak
(task 2), the missing test runner (task 3), and the broken `lint` script (task 4).

---

## 1. [QUICK WIN ~15min] The game works now. Three strings still tell visitors it doesn't.

`aede087` fixed the merge. Nobody updated the copy, so the site is actively defaming its own
one working interaction — on the first card of `/projects`, which is where a visitor clicks.

I re-derived the **current** `Fruits.ts` + `draw()` body headlessly and replayed it: 64
Cherries dropped at a single fixed x (so `dx == 0` exactly — the precise "straight drop" case
the banner claims is impossible), 3000 frames. Result: **62 merges**, the chain climbing
`Cherry → Strawberry → Orange → Apple → Melon → Watermelon`, and the board ending with two
Watermelons sitting correctly un-merged. Both coupled bugs are gone — `GameCanvas.tsx:95` now
has the `+ 0.5` slop, and `mergedIndices.add` at `:98-99` now sits *inside* the
`nextIndex < fruitTypes.length` guard, so a top-tier pair no longer deletes itself.

Delete or rewrite:

- `src/app/projects/DevilSuika/page.tsx:18-21` — the whole `⚠️ Known issue: fruit can't
  currently merge on a straight drop` banner. Remove the element.
- `src/app/projects/page.tsx:14` — "Drop straight down and the merge check never fires, so
  nothing merges yet. See todo.md." It does fire. Describe the game instead.
- `src/app/projects/page.tsx:18` — `cta: '🚧 Try it (broken) →'`.
- `src/app/projects/page.tsx:12` — `'Suika Game (WIP)'`; WIP is fair, "broken" is not.

Keep the *arcaderoom* warning (`arcaderoom/page.tsx:17-21`) — that one is still true, see
task 5.

---

## 2. [BUG] Fixing the click overlay detonates an uncancelled rAF loop. Do both at once.

This is the one real trap in the repo. The input bug is the only thing hiding the leak, so
anyone who fixes the obvious half makes the game dramatically worse.

**The leak.** The effect at `GameCanvas.tsx:39-123` declares `[mouseX]` as its only dep. Its
cleanup (`:119-122`) removes both listeners but **never calls `cancelAnimationFrame`**, while
`draw` re-arms itself unconditionally at `:114`. So every change to `mouseX` leaves the
previous loop running forever and starts another one over the same `fruitsRef`.

**Why it's dormant.** `handleMouseMove` is bound to the canvas (`:58`), but
`page.tsx:25-28` lays `<div className="absolute inset-0 z-10">` across the viewport as a
**sibling** of the canvas, not an ancestor. Mouse events bubble *up* from their target, and
the overlay is not inside the canvas, so the canvas listener never fires, `mouseX` stays
`null` forever, the effect runs exactly once, and the ghost preview at `:69-74` is dead code.
Route mousemove to the canvas and every pixel of mouse travel spawns another self-perpetuating
loop, each applying `gravity * dt` to one shared array — physics runs at N× speed and each
stale closure draws its own ghost fruit at its own frozen `mouseX`.

**The input bug, separately.** `page.tsx:11` does
`(e.target as HTMLCanvasElement).getBoundingClientRect()`, but `e.target` is the overlay.
The canvas is `w-[90vw] max-w-[800px]` centred in a `p-4` flex box (`GameCanvas.tsx:126-127`),
so on a 1280px viewport it occupies roughly x∈[240,1040] while the overlay starts at 0. Every
drop lands ~240px right of the cursor, and anything past `canvas.width - 30` (770) saturates
on the clamp at `GameCanvas.tsx:24`. The `as HTMLCanvasElement` cast is a lie TypeScript
cannot catch, because `e.target` is typed `EventTarget`.

**Do it as one change:**
1. Hold the pointer x in a `useRef`, not state — no re-render, no effect churn.
2. Drop `mouseX` from the dep array so the effect runs once on mount.
3. Capture the id from `requestAnimationFrame(draw)` and `cancelAnimationFrame` it in cleanup.
4. Compute drop-x from `canvasRef.current.getBoundingClientRect()`, never `e.target`.
5. Either delete the overlay and put `onClick`/`onMouseMove` on the `<canvas>` itself, or
   keep it and still measure against the canvas rect.

**While you are in `draw`, clamp `dt` (`:62-64`).** rAF is throttled or paused in a background
tab, so the first frame after refocus carries a multi-second `dt`. At `dt = 3.0` a falling
Cherry gets `vy += 1500`, jumps `vy * 3` pixels through the floor, then reflects at
`vy *= -0.4` off that inflated value — it *gains* energy and tunnels through the stack.
`const step = Math.min(dt, 1 / 30)` is the whole fix.

~45 min.

---

## 3. [TEST] One pure test file over the frame step — the test that would have caught `aede087`

There is still no test runner and no CI. `aede087` is exactly the bug class a test catches and
a code review does not: `dist < minDist` vs `dist < minDist + 0.5` reads correct line by line,
and the failure only appears when `dx` is *exactly* zero.

It is cheap because `Fruits.ts` is plain classes with no DOM dependency — only the frame
*sequencing* is trapped inside the component. Lift the body of `draw()`
(`GameCanvas.tsx:66-112`, minus the `ctx` calls) into an exported
`stepFrame(fruits, dt, height): Fruit[]` in `Fruits.ts` or a new `step.ts`, have `draw` call
it, then assert:

- two same-type fruits dropped at **identical x** merge within ~120 frames — the `aede087`
  regression guard, and the one that fails if anyone reverts the `+ 0.5`;
- two Watermelons in contact leave **two** Watermelons, not zero and not one — guards the
  `nextIndex < fruitTypes.length` branch at `:97`;
- one `dt = 3.0` frame does not increase a fruit's `|vy|` — **fails today**, and is task 2's
  clamp written as an assertion.

`node --test` with `tsx`, or Vitest. No jsdom, no canvas mock. The extraction is the right
shape regardless: it gets physics out of a React component.

~45 min. Pair it with task 2 so the dt assertion goes green in the same sitting.

---

## 4. [CHORE] Three mechanical things that have been broken for months

All re-verified today. Bundle them; none is interesting alone.

- **`package.json:9` — `npm run lint` has been dead since the Next 16 bump.** Reproduced:
  `Invalid project directory provided, no such directory: .../lint`. `next lint` was removed
  in Next 16 and the CLI now reads `lint` as a path. Nothing here has been linted in months,
  and there *is* something to catch: `src/app/home/Hero.tsx:10` and `src/app/about/page.tsx`
  (`:9`, `:18`, `:45`, `:52`…) use raw `'` apostrophes in JSX text while `LaluPi/page.tsx` and
  `arcaderoom/page.tsx` use `&apos;` — `react/no-unescaped-entities` would flag the drift.
  Replace with `"lint": "eslint ."`.
- **No favicon at all.** `/favicon.ico` returns **404** (checked over HTTP today).
  `src/app/favicon.ico` was deleted in `9357fbd` and never replaced. A black-on-white `<L/>`
  as `src/app/icon.svg` fits the brutalist system and is one file.
- **`src/app/projects/DevilSuika/GameUI.tsx` is dead code.** `grep -rn GameUI src/` returns
  only its own definition. It calls `(window as any).dropFruit?.()` (`:5`) that nothing
  assigns, its Reset button has no `onClick` (`:17-19`), and the `as any` defeats
  `strict: true` for no benefit. Delete the file.

~20 min for all three.

---

## 5. [BUG] `/projects/arcaderoom` takes down its own route when a free CDN says no

The last honest warning banner on the site, and worth retiring properly.

`Environment preset="sunset"` (`arcaderoom/page.tsx:27`) resolves through drei's `presetsObj`
to a **`raw.githack.com`** URL — a free third-party GitHub proxy, ~1.4 MB, 301ing to
raw.githubusercontent.com behind Cloudflare, which 403s clients it dislikes. `useEnvironment`
calls `useLoader`, which **throws** on failure, and the `Suspense fallback={null}` at `:24`
has **no ErrorBoundary above it** — so a bad fetch unmounts the whole route instead of
degrading to the `ambientLight` + `directionalLight` already sitting right there on `:25-26`.

Two fixes, either is fine:
- Vendor the `.hdr` into `public/` and point `Environment` at `files=` locally; or
- drop `Environment` entirely and keep the two lights. The scene is one arcade cabinet.

Same page, same symptom from a different cause: `public/room/arcade.glb` is **6.4 MB**
committed, loaded with no `useGLTF.preload` behind `fallback={null}`, so a visitor stares at a
silent black canvas for seconds with no indication anything is happening. An `<Html>` spinner
in the `Suspense` fallback is ten minutes and fixes the *perceived* failure even before the
CDN fix lands.

~30 min.

---

### Noted, not scheduled

- **`public/resume.pdf` is served at `/resume.pdf` (200) and linked from nowhere.**
  `grep -rn resume src/` finds nothing. Either surface it (an `/about` link is the obvious
  home) or delete it — right now it is a personal document published with no path to it.
- `GameCanvas.tsx:51-54` — `canvas.width = canvas.clientWidth` with no `devicePixelRatio`
  scaling, so the whole game renders soft on any HiDPI screen. Multiply by `dpr` and scale the
  context; ~10 min, but invisible on the review machine.
- **No bound on the fruit count.** `dropFruit` (`:21-28`) appends forever — no game-over line,
  no cap — and `draw` runs **two** O(n²) passes per frame (`:77-81`, `:86-108`). 200 fruits is
  80k pair checks per frame. Multiply by task 2's leak and it locks the tab.
- `Fruits.ts:31-45` handles the floor only. No side walls, no ceiling, no game-over, no score
  anywhere in a Suika clone. A real gap in the model, but not a visible bug, and a previous run
  could not get fruit to escape sideways in practice.
- `Fruits.ts:60` — the `dist !== 0` guard means two exactly co-located fruits never separate,
  and merged fruit spawns at the exact midpoint (`GameCanvas.tsx:101`), so two simultaneous
  merges at one spot can reach that state.
- `GameCanvas.tsx:96` — `fruitTypes.findIndex(f => f.name === a.type.name)` searches by name
  when `a.type` *is* an element of `fruitTypes`. `fruitTypes.indexOf(a.type)` is the same
  answer without the scan, inside a loop that already runs O(n²) per frame.
- **Make this app (or the stalklalu.com OAuth page) a private Cloud Run service if it is ever
  moved there.** `cloud-run-private-endpoint-cheatsheet.md` (repo root, gitignored — personal
  ops reference, not site content) has the exact `gcloud` steps. Not relevant while this runs
  on Cloudflare Workers; revisit only if something here moves to Cloud Run and needs to stop
  being publicly invokable.
