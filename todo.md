# todo

Ranked. Reviewed 2026-09-16 against commit `bba2be9`.

---

## 1. [BUG] Suika: the overlay steals input, and fixing it alone detonates a hidden rAF leak

**Fix these two together or you will make the game dramatically worse.**

`src/app/projects/DevilSuika/page.tsx:20-23` renders `<div className="absolute inset-0 z-10">` on top of the canvas to catch clicks. Two consequences:

- `handleCanvasClick` (`page.tsx:10-14`) does `(e.target as HTMLCanvasElement).getBoundingClientRect()` — but `e.target` is the **overlay**, not the canvas. The overlay is viewport-sized; the canvas is `w-[90vw] max-w-[800px]` centred inside a `p-4` flex box (`GameCanvas.tsx:127`). So `x = e.clientX - overlayRect.left` is a viewport coordinate, and `dropFruit` then clamps it to `[30, canvas.width-30]` (`GameCanvas.tsx:24`). On a 1280px window the canvas sits at roughly x∈[240,1040], so every drop lands ~240px right of the click and anything past x≈800 saturates at the right wall. The `as HTMLCanvasElement` cast is a lie TypeScript cannot catch, because `e.target` is typed `EventTarget`.
- The overlay also swallows `mousemove`, so the listener bound on the canvas at `GameCanvas.tsx:58` never fires. `mouseX` stays `null` forever, making the translucent preview fruit at `GameCanvas.tsx:69-74` dead code — nothing shows where the fruit will land.

Now the trap. `mouseX` is the dep of the effect at `GameCanvas.tsx:39-123`, and its cleanup (`119-122`) removes both listeners but **never calls `cancelAnimationFrame`**, while `draw` re-arms itself at `line 114`. The moment you let mousemove reach the canvas — the obvious fix — every mouse movement sets state, re-runs the effect, and spawns *another* self-perpetuating rAF loop over the same `fruitsRef`. A second of mouse movement gives you dozens of concurrent loops all applying gravity to the same array; physics runs at N× speed and never recovers. The input bug is currently the only thing masking the leak.

Do it as one change: hold the pointer position in a `useRef` (no state, no re-render, no effect churn), drop `mouseX` from the dep array so the effect runs once, capture the id from `requestAnimationFrame` and `cancelAnimationFrame` it in cleanup, and compute drop-x from `canvasRef.current.getBoundingClientRect()` instead of the overlay's.

*Why it matters:* this is the only interactive thing on the site and it is the first card on `/projects`. It currently does not work, and the naive fix makes it worse.

~45 min.

---

## 2. [QUICK WIN ~15min] The site still introduces itself as "My App"

Three mechanical edits, all verified this run:

- `src/app/layout.tsx:4-7` — metadata is still the scaffold default. `curl localhost:3000` serves `<title>My App</title>` and `<meta name="description" content="Next.js with TailwindCSS and navbar">`. That is the browser tab, the search result, and every link preview.
- No favicon — `src/app/favicon.ico` was deleted in `9357fbd` and never replaced.
- `package.json:9` — `"lint": "next lint"` is broken. Running it gives `Invalid project directory provided, no such directory: .../lint`, because `next lint` was removed in Next 16 (this repo is on `next ^16.2.6`) and the CLI now reads `lint` as a directory argument. Nothing has been linted since the upgrade. Replace with `"lint": "eslint ."`.

~15 min.

---

## 3. [BUG] Three of the five project cards 404

Verified by hitting the dev server: `/projects/2048Game`, `/projects/js-mini-tools` and `/projects/how-i-built-my-portfolio` all return **404**. They are linked from `src/app/projects/page.tsx:16`, `:37` and `:30`. Only DevilSuika and arcaderoom resolve (both 200).

Either mark the three as coming-soon (non-clickable card, no `href`) or stub the routes. Coming-soon is the honest 10-minute version.

While in the file: `page.tsx:52` sets `target={project.type === 'game' ? '_blank' : '_self'}`, which opens *internal* Next routes in a new tab. And every card is a raw `<a>` rather than `next/link`, so each navigation is a full page reload — same in `home/Hero.tsx:12,15`. Swap to `Link`. The `'use client'` at `page.tsx:1` is also unnecessary (no hooks, no handlers) and ships a client bundle for a static list.

*Why it matters:* a visitor's most likely click on a portfolio is a project card, and it has a 60% chance of hitting a 404.

~30 min.

---

## 4. [IMPROVEMENT] The contact page cannot actually be contacted

`src/app/contact/page.tsx` is entirely scaffold placeholder: `you@example.com` (`:9`, `:31`), `github.com/yourusername` (`:39`), `linkedin.com/in/yourprofile` (`:49`), `yourportfolio.com` (`:59`). There is no working way to reach you from this site.

Also fix the copy button while you are there: `handleCopyEmail` (`:8-12`) calls `navigator.clipboard.writeText(...)` without awaiting or catching it, then calls `setCopied(true)` unconditionally. On a non-secure origin or with clipboard permission denied, the promise rejects (unhandled) and the UI still cheerfully says "Copied!" — a silent failure that tells the user the opposite of the truth. Await it, show the confirmation only on success, and fall back to selecting the text.

~30 min.

---

## 5. [IMPROVEMENT] The landing page advertises "Trial 1" through "Trial 5"

`src/app/home/Features.tsx:5-36` is the carousel directly below the hero — the second thing anyone sees. Titles are literally `Trial 1`…`Trial 5`, and three of the five share a byte-identical description ("Projects I've built while working with other developers.", lines `20`, `26`, `32`).

The links are dead too: `/#designs` (`:15`) and `/#collabs` (`:21`, `:27`, `:33`) point at anchors that do not exist — `src/app/page.tsx:8-10` only renders `#hero`, `#features` and `#faq`. Four of five "Visit →" buttons jump nowhere.

Either write three real features with working targets, or cut the section until there is something to put in it. Three honest cards beat five placeholder ones.

~40 min.

---

### Noted, not scheduled

- **No tests, no test runner, no CI.** The one test worth writing first is a jsdom test that mounts `GameCanvas`, fires N `mousemove` events, and asserts `requestAnimationFrame` was scheduled by exactly one live loop — that is the regression in task 1, and it is invisible to every other kind of check.
- `src/app/projects/DevilSuika/GameUI.tsx` is orphaned — imported nowhere, calls `(window as any).dropFruit` (`:5`) that nothing ever assigns, and its Reset button has no `onClick` at all (`:17-19`). Delete it.
- `Fruits.ts:31-45` `update()` handles only the floor — no left/right walls, so `resolveCollision` shoves fruit off-canvas with nothing to stop it. No ceiling or game-over either, and no score anywhere in a Suika clone.
- `GameCanvas.tsx:100` — when two max-tier Watermelons touch, both land in `mergedIndices` but the `nextIndex < fruitTypes.length` guard pushes no replacement, so they silently annihilate.
- `Fruits.ts:60` — the `dist !== 0` guard means two fruits at exactly the same point never separate. Merged fruits spawn at the exact midpoint (`GameCanvas.tsx:101`), so this is reachable.
- `src/app/components/Navbar.tsx:21` — five links plus a `text-3xl` brand in a `flex gap-8 text-lg` with no `hidden md:flex` and no hamburger. Will overflow on a phone.
- `public/room/arcade.glb` is 6.4 MB committed to git, loaded with `Suspense fallback={null}` (`arcaderoom/page.tsx:17`) and no `useGLTF.preload` — a long blank black canvas with zero loading indication.
