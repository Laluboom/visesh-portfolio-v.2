# Daily review — 2026-09-26

## What I looked at

Full source read: both entry points (`layout.tsx`, `page.tsx`), the nav, all three home
sections, `/about`, `/contact`, the projects index, and both interactive project pages —
`DevilSuika` (`Fruits.ts`, `GameCanvas.tsx`, `page.tsx`, `GameUI.tsx`) and `arcaderoom`. Plus
config, and drei's internals to find out where `Environment preset="sunset"` actually loads from.

**I did run it.** `npm run dev` came up on Next 16.2.6/Turbopack and I exercised it over HTTP:
status codes for all nine routes, the served `<title>`/`<meta description>`, and the rendered
anchor markup on `/projects`. A headless Chrome screenshot was denied by the sandbox, so this was
markup-level inspection rather than a visual render. Dev server stopped afterwards.

Where reading code left a question I couldn't settle by eye, I replicated `Fruits.ts` plus the
`draw()` frame body headlessly in Node (in `/tmp`, nothing in the repo) and ran the physics. That
is where the main finding came from.

## The finding

**The fruit-merge game cannot merge fruit on a normal drop, and it is not a tuning problem — the
physics pass structurally cancels the merge pass.** Inside one frame `GameCanvas.tsx` runs
gravity, then `resolveCollision`, then the merge check. `resolveCollision` (`Fruits.ts:60-69`)
separates an overlapping pair by *exactly* `overlap = minDist - dist`, so afterwards the distance
is exactly `minDist`. The merge test at `GameCanvas.tsx:95` is a strict `if (dist < minDist)`.
False.

Floating-point noise usually rescues that within a frame or two. It cannot when `dx` is exactly
`0`: `nx = dx / dist` is `0`, the x separation is a literal no-op, and the y separation lands on
`minDist` with no rounding slop. And `dx` is exactly `0` for the normal way to play — `dropFruit`
always uses the same clamped `fruitDropX`, and a `dx == 0` collision imparts no `vx`, so
button-dropped fruit forms a perfectly vertical column forever. Simulated: two Cherries at
identical x, **0 merges in 600 frames**, with 502 frames sitting at exactly-touching. The same
pair offset by 5px merges immediately. Two Watermelons: same, 0 merges, 508 near-misses.

The fix is nearly one line (`dist < minDist + 0.5`, or move the merge pass ahead of resolution),
which makes it the best value-for-effort change in the repo. The same block has a second bug I
confirmed: two max-tier Watermelons that *do* merge both delete themselves, because
`GameCanvas.tsx:96-104` marks both as merged but creates no replacement — simulated, board ends
empty.

This reorders last review's plan. Task 1 was the input-overlay/rAF pair; that is all still true
and re-verified, but fixing it would only have made it easier to watch fruit refuse to merge. It
is now task 2, with a `dt` clamp folded in — I confirmed a single `dt = 3.0s` frame (returning to
a background tab) teleports a fruit to the floor and launches it back up at `vy = -600`.

## Also new

`/projects/arcaderoom` fetches its HDRI from `raw.githack.com` at runtime — a free third-party
GitHub proxy, 1.4 MB, Cloudflare-fronted, resolved through drei's `presetsObj`. `useLoader` throws
on failure and the `Suspense fallback={null}` has **no ErrorBoundary**, so a bad fetch takes down
one of your only two working project pages instead of degrading to plainer lighting. I first
recorded that URL as a hard 403; that turned out to be curl's default User-Agent, and with a
browser UA it returns 200. So this is a dependency-and-error-handling risk, not a present outage.

Going the other way: I tried to reproduce fruit escaping sideways through the missing left/right
walls (`Fruits.ts:31-45`) — 25 cherries rained into a 100px band, 3000 frames — and could not.
The heap stayed well inside the canvas. That item is demoted to a noted gap, not a bug.

## What I'm proposing

Ranked in `todo.md`: (1) the merge-rule fix plus max-tier annihilation, ~25 min; (2) the
overlay + uncancelled rAF + `dt` clamp as one change, ~45 min; (3) **quick win** — real metadata
(the site still serves `<title>My App</title>`), a favicon, and `package.json:9` where
`"next lint"` has been silently broken since the Next 16 bump so nothing has been linted in four
months; (4) the three project cards that 404, re-confirmed today; (5) purge `Trial 1`–`Trial 5`
and `you@example.com`.

## Honest read

Nothing has been committed to source since 2026-05-31, and **none of the five tasks from the
2026-09-16 review were started.** The scaffolding is genuinely decent — it builds, it serves, the
structure is sensible, `Navbar.tsx` is clean. But three of five project cards 404, the one
interactive demo doesn't work, and the tab still says "My App". The value here is not in the
backlog length; it is in driving one item to actually done. Task 1 is 25 minutes and turns a
broken demo into a working one. If that doesn't happen in the next couple of weeks, the honest
move is to demote this out of active projects rather than keep reviewing it.

Health: solid bones, zero shipped content, stalled.
