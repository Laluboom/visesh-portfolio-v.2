'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

/*
  The site is called stalklalu, so the site stalks you back. The page loads
  dark and you read it through a magnifying glass: the mouse on a desktop,
  a glass you drag on a phone. A light switch is hidden somewhere on the
  page, and the only way to find it is to look for it.

  The lens reveals, it does not magnify. Actual magnification means cloning
  the DOM into a second scaled copy, which is slow and breaks every input on
  the page. A hole of light reads the same and costs nothing.

  The dark is painted by one fixed element with pointer-events: none, so
  everything underneath stays clickable. Position is written straight to CSS
  custom properties on that element, never through React state, because this
  runs on every pointer move.
*/

// Pages you play with a mouse. Doing those in the dark is just annoying.
const ALWAYS_LIT = ['/projects/DevilSuika', '/projects/arcaderoom'];

const RADIUS = 86;
const RADIUS_TOUCH = 74;

// The handle, and the padding the SVG box needs so it does not clip it.
const HANDLE = 122;
const PAD = HANDLE + 30;

// The switch plate, in CSS pixels. Used to test candidate spots for
// overlap before one is chosen.
const SWITCH_W = 52;
const SWITCH_H = 84;

// How far from the edge the switch may sit. It belongs on a wall, which
// here means the empty margin, not the middle of a paragraph.
const EDGE = 150;

// Anything that is content. A candidate spot that touches one of these
// rectangles is thrown away.
const CONTENT =
  'p,h1,h2,h3,h4,h5,h6,a,li,button,input,textarea,label,img,canvas,svg,table,pre,code';

export default function Darkroom() {
  const pathname = usePathname();
  const lit = ALWAYS_LIT.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  const darkRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const [touch, setTouch] = useState(false);
  const [on, setOn] = useState(false);
  const [switchPos, setSwitchPos] = useState<{ x: number; y: number } | null>(
    null
  );

  const move = useCallback((x: number, y: number) => {
    const dark = darkRef.current;
    const glass = glassRef.current;
    if (dark) {
      dark.style.setProperty('--lx', `${x}px`);
      dark.style.setProperty('--ly', `${y}px`);
    }
    if (glass) {
      glass.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    }
  }, []);

  // Coarse pointer means a finger, which cannot hover. That gets a draggable
  // glass instead. Decided by input type, not by screen width.
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const sync = () => setTouch(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Read the lights back from the attribute the inline head script set, so
  // the button's label agrees with what the page is actually doing.
  useEffect(() => {
    setOn(document.documentElement.dataset.lights === 'on');
  }, []);

  // Random, but only where there is room for it: along the edges of the
  // page, clear of the navbar, clear of the Complaints button, clear of
  // the patch the touch glass already lights up, and not on top of a
  // single word of text. Candidates are tested against the bounding box
  // of everything on screen and thrown away if they touch anything.
  //
  // Picked after mount, because Math.random() during render is a
  // hydration mismatch, and re-picked on resize, because a spot that was
  // empty at one width is in the middle of a sentence at another.
  useEffect(() => {
    const pick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const clear = (touch ? RADIUS_TOUCH : RADIUS) + 130;

      const taken = Array.from(document.querySelectorAll(CONTENT))
        .map((el) => el.getBoundingClientRect())
        .filter((r) => r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < h);

      const half = { w: SWITCH_W / 2 + 14, h: SWITCH_H / 2 + 14 };

      const rand = (span: number) =>
        half.h + 70 + Math.random() * Math.max(1, span - half.h * 2 - 140);

      const candidate = () => {
        // Four strips: left, right, top, bottom. Weighted to the sides,
        // which is where this layout actually leaves room.
        const edge = Math.random();
        if (edge < 0.38) {
          return { x: half.w + Math.random() * (EDGE - half.w), y: rand(h) };
        }
        if (edge < 0.76) {
          return { x: w - half.w - Math.random() * (EDGE - half.w), y: rand(h) };
        }
        if (edge < 0.88) {
          return { x: rand(w), y: half.h + 60 + Math.random() * 60 };
        }
        return { x: rand(w), y: h - half.h - Math.random() * 90 };
      };

      for (let i = 0; i < 300; i += 1) {
        const { x, y } = candidate();
        if (x < half.w || x > w - half.w || y < half.h + 60 || y > h - half.h) {
          continue;
        }
        if (Math.hypot(x - w / 2, y - h / 2) < clear) continue;
        // The Complaints button's corner.
        if (x > w - 190 && y > h - 120) continue;

        const box = {
          left: x - half.w,
          right: x + half.w,
          top: y - half.h,
          bottom: y + half.h,
        };
        const hits = taken.some(
          (r) =>
            r.left < box.right &&
            r.right > box.left &&
            r.top < box.bottom &&
            r.bottom > box.top
        );
        if (!hits) {
          setSwitchPos({ x, y });
          return;
        }
      }
      // Nowhere clean. Bottom left is the emptiest corner on every page
      // here, and a findable switch beats a perfectly placed one.
      setSwitchPos({ x: half.w + 10, y: h - half.h - 10 });
    };

    // Wait for the webfonts, because measuring a layout mid-swap puts the
    // switch where the text used to be. Deliberately not
    // requestAnimationFrame: that never fires in a background tab, and the
    // switch would simply never be placed.
    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      pick();
    };
    document.fonts?.ready.then(run).catch(run);
    const safety = window.setTimeout(run, 600);

    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(pick, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      done = true;
      window.clearTimeout(safety);
      window.clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, [touch]);

  // Start the lens in the middle, then follow the mouse on a desktop.
  useEffect(() => {
    if (lit) return;
    move(window.innerWidth / 2, window.innerHeight / 2);
    if (touch) return;
    const onMove = (e: PointerEvent) => move(e.clientX, e.clientY);
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [lit, touch, move]);

  // On a desktop the mouse IS the glass, so the arrow goes away. Flagged
  // on <html> rather than in a blanket rule, so the lit game pages and
  // anyone who has hit the switch keep a normal cursor.
  useEffect(() => {
    if (lit || touch) return;
    document.documentElement.dataset.lens = 'mouse';
    return () => {
      delete document.documentElement.dataset.lens;
    };
  }, [lit, touch]);

  // Tabbing through a dark page would otherwise be completely blind.
  useEffect(() => {
    if (lit) return;
    const onFocus = (e: FocusEvent) => {
      const el = e.target;
      if (!(el instanceof HTMLElement)) return;
      // Keyboard focus only. focusin also fires on a plain click, which
      // would yank the lens to whatever link you just pressed.
      if (!el.matches(':focus-visible')) return;
      const r = el.getBoundingClientRect();
      move(r.left + r.width / 2, r.top + r.height / 2);
    };
    window.addEventListener('focusin', onFocus);
    return () => window.removeEventListener('focusin', onFocus);
  }, [lit, move]);

  const toggle = () => {
    const next = !on;
    setOn(next);
    document.documentElement.dataset.lights = next ? 'on' : 'off';
    try {
      window.sessionStorage.setItem('lights', next ? 'on' : 'off');
    } catch {
      // Private browsing, blocked storage. The switch still works, it just
      // forgets on the next page load.
    }
  };

  if (lit) return null;

  const r = touch ? RADIUS_TOUCH : RADIUS;
  // Centre of the SVG box, and cos(45 degrees): the handle leaves the rim
  // on the diagonal, so both of its coordinates move by the same amount.
  const c = r + PAD;
  const k = Math.SQRT1_2;

  return (
    <>
      {/*
        The one object on this site allowed to look like an object. It is
        a light switch, so it is drawn as one: a plate on the wall with a
        rocker that actually moves. All SVG, because the base layer sets
        border-radius: 0 !important on everything and would square off
        anything built out of divs.
      */}
      <button
        type="button"
        onClick={toggle}
        className="lamp"
        style={
          switchPos
            ? { left: `${switchPos.x}px`, top: `${switchPos.y}px` }
            : { left: '-200px', top: '-200px' }
        }
        aria-pressed={on}
        aria-label={on ? 'Turn the lights off' : 'Turn the lights on'}
        title={on ? 'Lights off' : 'Lights on'}
      >
        <svg
          width={SWITCH_W}
          height={SWITCH_H}
          viewBox="0 0 52 84"
          aria-hidden="true"
        >
          <rect
            x="1"
            y="1"
            width="50"
            height="82"
            rx="5"
            fill="#efece2"
            stroke="#8c8574"
            strokeWidth="1.5"
          />
          <circle cx="26" cy="9" r="2.2" fill="#9c9382" />
          <circle cx="26" cy="75" r="2.2" fill="#9c9382" />
          {/* the well the rocker sits in */}
          <rect x="13" y="18" width="26" height="48" rx="3" fill="#2b2b2b" />
          {/* the rocker itself */}
          <rect
            className="lamp-rocker"
            x="15"
            y="20"
            width="22"
            height="22"
            rx="2"
            fill="#fbfaf6"
            transform={on ? 'translate(0 22)' : undefined}
          />
        </svg>
      </button>

      <div
        ref={darkRef}
        className="darkroom"
        style={{ ['--lr' as string]: `${r}px` }}
        aria-hidden="true"
      />

      <div
        ref={glassRef}
        className={`glass${touch ? ' glass-draggable' : ''}`}
        aria-hidden="true"
        onPointerDown={
          touch
            ? (e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
              }
            : undefined
        }
        onPointerMove={
          touch
            ? (e) => {
                if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                  move(e.clientX, e.clientY);
                }
              }
            : undefined
        }
      >
        {/*
          Drawn as SVG on purpose. The base layer sets border-radius: 0
          !important on everything, and an !important inside a layer beats
          one outside it, so a CSS circle would come out a square.
        */}
        <svg width={c * 2} height={c * 2} viewBox={`0 0 ${c * 2} ${c * 2}`}>
          {/*
            The handle, drawn before the rims so the rim sits on top of
            where the two meet. Wood, because a white stick on a black
            page reads as a scratch rather than a thing you hold.
          */}
          <line
            x1={c + r * k}
            y1={c + r * k}
            x2={c + (r + HANDLE) * k}
            y2={c + (r + HANDLE) * k}
            stroke="#4a2f16"
            strokeWidth="26"
            strokeLinecap="round"
          />
          <line
            x1={c + r * k}
            y1={c + r * k}
            x2={c + (r + HANDLE) * k}
            y2={c + (r + HANDLE) * k}
            stroke="#a9733c"
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* a highlight down one side, so it reads as round, not flat */}
          <line
            x1={c + (r + 10) * k}
            y1={c + (r + 10) * k}
            x2={c + (r + HANDLE - 12) * k}
            y2={c + (r + HANDLE - 12) * k}
            stroke="rgba(255,228,190,0.35)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* the brass collar where the handle meets the glass */}
          <line
            x1={c + (r - 2) * k}
            y1={c + (r - 2) * k}
            x2={c + (r + 20) * k}
            y2={c + (r + 20) * k}
            stroke="#c9a227"
            strokeWidth="24"
            strokeLinecap="butt"
          />
          {/*
            Two rims. The white one sits just outside the hole where the
            page is dark; the dark one sits on the edge of the lit part,
            where a white rim would disappear into the page.
          */}
          <circle
            cx={c}
            cy={c}
            r={r + 4}
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
          />
          <circle
            cx={c}
            cy={c}
            r={r - 1}
            fill="none"
            stroke="rgba(0,0,0,0.6)"
            strokeWidth="3"
          />
          {/* Invisible, fat, and the only thing on the glass you can grab. */}
          {touch && (
            <circle
              className="glass-grab"
              cx={c}
              cy={c}
              r={r}
              fill="none"
              stroke="transparent"
              strokeWidth="30"
            />
          )}
        </svg>
      </div>
    </>
  );
}
