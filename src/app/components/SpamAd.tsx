'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ALWAYS_LIT } from './Darkroom';

/*
  A banner ad for my own news digest, behaving the way a banner ad behaves:
  stuck to one edge of the screen, tilted, lunging at you and backing off
  again. Which edge is decided by the inline script in layout.tsx and read in
  CSS, not here. Deciding it in React would either mismatch on hydration or
  land after Darkroom has measured the layout, and the switch would get
  placed under the ad.

  It sits above the dark on purpose. Spam does not wait for you to find the
  light switch.
*/

// The plate, in its own SVG pixels. The CSS box around it is sized for this
// at the largest point of the animation.
const AD_W = 148;
const AD_H = 118;

// How far each notch bites into the edge.
const TOOTH = 6;

/*
  One sawtooth edge. Walks from (x0,y0) to (x1,y1) in `count` steps and
  pushes every other point out along the edge's normal, so the outline comes
  out as teeth rather than a straight line.

  `count` has to be even: the last point is the corner, and it has to land
  flush or the four edges will not meet.
*/
function teeth(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  count: number,
  nx: number,
  ny: number
) {
  const pts: string[] = [];
  for (let i = 1; i <= count; i += 1) {
    const t = i / count;
    const out = i % 2 ? TOOTH : 0;
    pts.push(
      `${(x0 + (x1 - x0) * t + nx * out).toFixed(1)} ${(
        y0 +
        (y1 - y0) * t +
        ny * out
      ).toFixed(1)}`
    );
  }
  return pts;
}

/*
  Drawn as SVG, not CSS. The base layer sets border-radius: 0 !important and
  box-shadow: none !important on everything, and an !important inside a layer
  beats one outside it, so anything with an edge on this site has to be a
  shape rather than a border.
*/
const inner = { l: TOOTH, t: TOOTH, r: AD_W - TOOTH, b: AD_H - TOOTH };
const plate = [
  `M ${inner.l} ${inner.t}`,
  'L',
  [
    ...teeth(inner.l, inner.t, inner.r, inner.t, 12, 0, -1),
    ...teeth(inner.r, inner.t, inner.r, inner.b, 10, 1, 0),
    ...teeth(inner.r, inner.b, inner.l, inner.b, 12, 0, 1),
    ...teeth(inner.l, inner.b, inner.l, inner.t, 10, -1, 0),
  ].join(' L '),
  'Z',
].join(' ');

export default function SpamAd() {
  const pathname = usePathname();
  const [closed, setClosed] = useState(false);
  const lit = ALWAYS_LIT.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  // The game pages are played with a mouse. A thing jumping at the edge of
  // the screen while you aim is the exact annoyance ALWAYS_LIT exists for.
  if (lit || closed) return null;

  return (
    /*
      The outer box is fixed and never moves, so Darkroom's placement pass
      measures one stable rectangle, sized for the card at its largest and
      most tilted. The card inside it is the thing that moves.

      Not an anchor any more: the close button is a button, and a button
      inside a link is invalid and unclickable on half the browsers that
      accept it. The link is the plate, the cross sits next to it.
    */
    <div className="spam">
      <div className="spam-card">
        <a
          className="spam-link"
          href="https://laluboom.github.io/news-digest/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="spam-plate"
            width={AD_W}
            height={AD_H}
            viewBox={`0 0 ${AD_W} ${AD_H}`}
            aria-hidden="true"
          >
            <path
              d={plate}
              fill="var(--highlight)"
              stroke="#000000"
              strokeWidth="2"
            />
          </svg>

          <span className="spam-text">
            <span className="spam-kicker">ad</span>
            <span className="spam-title">GWS Wire</span>
            <span className="spam-line">five feeds, one page, every morning</span>
            <span className="spam-cta">click here</span>
          </span>
        </a>

        {/* Drawn, not typed: a multiplication sign in this mono face sits off
            centre, and the base layer would underline a text label. */}
        <button
          type="button"
          className="spam-close"
          onClick={() => setClosed(true)}
          aria-label="Close the ad"
          title="Close"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" aria-hidden="true">
            <path
              d="M2 2 L13 13 M13 2 L2 13"
              stroke="#000000"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
