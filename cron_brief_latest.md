# daily brief — visesh-portfolio-v.2 — 2026-10-07

## What I looked at

Every source file under `src/app/` (15 files), `package.json`, and the two prior review
outputs. I ran the dev server and checked all nine routes over HTTP plus the served markup for
`/`, `/projects` and `/projects/DevilSuika` — so yes, this was checked in a browser sense,
though headless-Chrome screenshots were blocked in this session, so the visual review is
markup-level rather than pixel-level. Dev server stopped before finishing.

The review before this one made a strong, specific claim — that the Suika merge rule is
mathematically unreachable — so rather than carry it forward on trust I re-derived `Fruits.ts`
and the body of `draw()` as a standalone script outside the repo and ran it. It reproduces, and
it turned up something the previous run had right but under-weighted.

## What I found

**The headline is a two-line fix, and it is a two-line fix with a trap in it.**

The merge test at `GameCanvas.tsx:95` is a strict `dist < minDist`, but it runs *after*
`resolveCollision` (`Fruits.ts:60-69`) has already pushed the pair apart by exactly
`minDist - dist`. The distance is therefore exactly `minDist` when the test runs, and the test
is false. Normally float noise rescues this within a frame or two; it cannot when `dx` is
exactly `0`, because `nx = dx / dist` is `0` and the separation happens purely on `y` with no
rounding slop at all. And `dx` is exactly `0` for the normal way to play — `dropFruit` always
reuses the same clamped `fruitDropX`, and a `dx == 0` collision imparts no `vx`, so
button-dropped fruit stacks in a perfectly vertical column forever. Two Cherries at identical
x: 600 frames, **zero merges**, 500 of those frames sitting at exactly-touching. Offset them
5px and they merge immediately.

The trap is the coupling. When I applied the obvious `dist < minDist + 0.5` fix and re-ran, two
Watermelons at identical x merged — and left an **empty board**. That is a second bug at
`GameCanvas.tsx:96-104`: both indices go into `mergedIndices` unconditionally, but
`if (nextIndex < fruitTypes.length)` then pushes no replacement, so a top-tier merge deletes
both fruits. Today it is rare because merges barely happen at all. Fix the merge test alone and
losing your Watermelons becomes the normal ending. That pairing is the main thing this run adds,
and it is why task 1 specifies both edits as one change.

The same shape repeats in task 3: the full-bleed click overlay at `DevilSuika/page.tsx:20-23`
is a real bug on its own (`e.target` is the overlay, not the canvas, so drops land ~240px right
of the cursor at 1280px wide), but it is also the only thing currently preventing `mousemove`
from reaching the canvas — and the effect at `GameCanvas.tsx:39-123` never calls
`cancelAnimationFrame` while `draw` re-arms itself. Remove the overlay in isolation and every
mouse movement spawns another concurrent animation loop over the same fruit array.

Beyond the game: 3 of the 5 project cards 404 (confirmed by HTTP, so roughly a 60% chance that
a visitor's most likely click fails), `/contact` offers no working way to reach Visesh and its
copy button reports "Copied!" even when the clipboard write rejects, the served `<title>` is
still `My App`, and `npm run lint` has been broken since the Next 16 bump — `next lint` was
removed, so nothing has been linted in four months.

## What I'm proposing, and the uncomfortable part

Ranked list in `todo.md`: (1) the coupled merge fix, (2) the 15-minute identity/metadata/lint
quick win, (3) overlay + rAF leak + `dt` clamp as one change, (4) the user-facing honesty pass
across `/projects` and `/contact`, (5) one pure unit test over the frame step — which is
genuinely the test that would have caught task 1, and is cheap because `Fruits.ts` has no DOM
dependency once the step function is lifted out of the component.

The uncomfortable part: **this is the third review in a row and not one proposed item has been
started.** Newest source commit is still `bba2be9` from 2026-05-31; the only commits since are
the two automated notes commits. I re-verified every claim on both prior lists today and they
all hold, so the problem is not that the analysis was wrong or too vague. That's why task 1 is
deliberately the smallest real change on the list — two lines, one file, and the game's core
mechanic starts working. If the next review finds this untouched again, the right call is to
move the repo out of `01_active_projects` rather than keep generating lists for it.
