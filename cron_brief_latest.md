# Daily brief — visesh-portfolio-v.2 — 2026-10-22

Reviewed at commit `f1c7618`. Read every file under `src/app/`, the configs, and both doc
files; ran the dev server on port 4100 and inspected the served markup; and replayed the Suika
physics headlessly to check a claim the repo makes about itself.

## The headline: the repo got unstuck, and now it lies about it

The last three reviews (2026-09-16, -09-26, -10-07) all ended with the same complaint — not
one proposed task had been started, and the 10-07 list said flatly that if the next review
found it untouched again, the honest conclusion was that this repo is not active. That is no
longer the situation. Five real commits landed on 2026-10-18/19: the merge fix, a content
merge from the archived v1, a brutalist redesign, a rebrand to Lalu Boom, and the Cloudflare
Workers adapter. Most of the old TODO is genuinely done, and I verified that rather than
taking it on trust — all nine routes return 200, the served `<title>` is `Lalu Boom` instead
of `My App`, `/contact` has real details, and the duplicate `id="features"` is gone.

Task 1 on the old list — the two-line merge fix — is also done, in `aede087`. I re-derived the
**current** `Fruits.ts` plus the body of `draw()` and replayed it: 64 Cherries dropped at a
single fixed x, so `dx` is exactly `0` — the precise "straight drop" case the old analysis
proved was mathematically unreachable. 3000 frames gave **62 merges**, the full chain
`Cherry → Strawberry → Orange → Apple → Melon → Watermelon`, and a board ending with two
Watermelons sitting correctly un-merged (the top-tier guard works, so they no longer delete
themselves). The mechanic works.

Nobody updated the copy. `projects/DevilSuika/page.tsx:18-21` still shows a banner reading
"fruit can't currently merge on a straight drop," `projects/page.tsx:14` still says "the merge
check never fires, so nothing merges yet," and the CTA on that card — the first card on
`/projects`, the one a visitor clicks — still reads `🚧 Try it (broken) →`. The site is
actively defaming its only working interaction. That is task 1 and the quick win: four string
edits in two files, fifteen minutes, and it is the highest value-per-minute change available.

## The finding worth reading carefully

The one real trap is in `GameCanvas.tsx`, and it is a trap specifically because the obvious
half-fix makes things much worse.

The effect at `:39-123` lists `[mouseX]` as its only dependency. Its cleanup at `:119-122`
removes both event listeners but **never calls `cancelAnimationFrame`**, while `draw` re-arms
itself unconditionally at `:114`. So in principle every change to `mouseX` abandons a running
loop and starts another one over the same `fruitsRef` — unbounded accumulation, each loop
applying gravity to one shared array.

It causes no harm today, and the reason is the second bug. `page.tsx:25-28` lays
`<div className="absolute inset-0 z-10">` across the viewport to catch clicks, and that div is
a **sibling** of the canvas, not an ancestor. Mouse events bubble upward from their target, so
the canvas's own `mousemove` listener at `:58` never fires, `mouseX` stays `null` for the
page's whole life, the effect runs exactly once, and the ghost-fruit preview at `:69-74` is
unreachable code. The input bug is the only thing holding the leak shut.

That same overlay causes a visible bug on its own. `page.tsx:11` measures
`(e.target as HTMLCanvasElement).getBoundingClientRect()` — but `e.target` is the overlay. The
canvas is `w-[90vw] max-w-[800px]` centred in a `p-4` flex box, so on a 1280px viewport it
occupies roughly x∈[240,1040] while the overlay starts at 0. Every drop lands about 240px
right of where you clicked, and anything past x≈770 saturates on the clamp at `:24`. The
`as HTMLCanvasElement` cast is a lie TypeScript cannot catch, because `e.target` is typed
`EventTarget` — which is exactly why this survived.

So the proposal is one change, not two: pointer x into a `useRef` instead of state, `mouseX`
out of the dep array, capture and cancel the rAF id, and measure against
`canvasRef.current.getBoundingClientRect()`. While in `draw`, clamp `dt` — rAF pauses in a
background tab, and at `dt = 3.0` a falling Cherry picks up `vy += 1500`, jumps past the
floor, and reflects off that inflated value, so it *gains* energy and tunnels through the
stack. `Math.min(dt, 1/30)`.

## What else I am proposing

A test file, third. There is still no runner and no CI, and `aede087` is precisely the bug
class a test catches and a code review does not: `dist < minDist` versus `dist < minDist + 0.5`
reads correct line by line, and it only fails when `dx` is exactly zero. It is cheap because
`Fruits.ts` is DOM-free plain classes — only the frame *sequencing* is stuck inside the
component. Lift `draw`'s body into an exported `stepFrame(fruits, dt, height)` and assert three
things: identical-x fruits merge (the regression guard), two Watermelons stay two, and a
`dt = 3.0` frame does not increase `|vy|` (fails today — it is task 2's clamp as an assertion).

Fourth is a bundle of three mechanical things that have been broken for months and are dull
individually. `npm run lint` has not worked since the Next 16 bump — I reproduced it:
`next lint` was removed, so the CLI reads `lint` as a directory and dies. Nothing here has
been linted in months, and there is drift to catch (`Hero.tsx:10` and `about/page.tsx` use raw
`'` in JSX text where the newer files use `&apos;`). There is also no favicon at all —
`/favicon.ico` 404s, confirmed over HTTP. And `GameUI.tsx` is dead: imported nowhere, calling
a `window` global nothing assigns, with a Reset button that has no handler.

Fifth, `/projects/arcaderoom` still pulls its HDRI from `raw.githack.com` at runtime.
`useEnvironment` calls `useLoader`, which throws, and the `Suspense fallback={null}` has no
ErrorBoundary above it — so a CDN 403 unmounts the entire route instead of falling back to the
`ambientLight` and `directionalLight` sitting two lines above it. Vendor the `.hdr` or drop
`Environment`. Its own warning banner is the one on the site that is still honest, which is
why I am proposing keeping that one while deleting the Suika ones.

One small thing I noted but did not schedule: `public/resume.pdf` serves at `/resume.pdf` with
a 200 and is linked from nowhere in `src/`. Either put a link on `/about` or delete it.

## Verdict

Healthy and genuinely moving. Content and design are finished and the writing is good —
the hero's "this site exists because I needed a domain to verify some cloud API requests" is
the most honest line on any portfolio I have reviewed. All the remaining debt is concentrated
in the two interactive pages, and the single biggest issue is now a documentation problem
rather than a code one.

Note on the browser check: I ran the dev server and inspected served markup and status codes,
but the headless-Chrome screenshot was blocked by the sandbox, so I did not look at the
rendered page visually. Worth a human eye on the borderless design at some point — the
`--surface` fix in `f1c7618` was patching exactly that kind of invisible-block problem, and a
screenshot would confirm nothing else got lost when the borders came off. Dev server stopped;
port 4100 confirmed closed.
