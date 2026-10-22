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

  // Random, but not anywhere: keep clear of the navbar, the Complaints
  // button in the bottom right, and the patch of screen the touch glass
  // already lights up when it opens. Measured in pixels, because a
  // percentage that is safe on a desktop is half a phone. Stored as
  // viewport percentages so a resize or a rotate cannot push it off the
  // page, and picked after mount, because Math.random() during render is
  // a hydration mismatch.
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const clear = (touch ? RADIUS_TOUCH : RADIUS) + 130;
    for (let i = 0; i < 60; i += 1) {
      const x = 8 + Math.random() * 84;
      const y = 18 + Math.random() * 68;
      const px = (x / 100) * w;
      const py = (y / 100) * h;
      const fromCentre = Math.hypot(px - w / 2, py - h / 2);
      const nearComplaints = px > w - 180 && py > h - 110;
      if (fromCentre > clear && !nearComplaints) {
        setSwitchPos({ x, y });
        return;
      }
    }
    setSwitchPos({ x: 16, y: 24 });
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

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className="lamp"
        style={
          switchPos
            ? {
                // Clamped so a narrow phone cannot push the switch off the
                // side of the page, where nobody could ever find it.
                left: `clamp(70px, ${switchPos.x}vw, calc(100vw - 70px))`,
                top: `${switchPos.y}vh`,
              }
            : { left: '50vw', top: '50vh', visibility: 'hidden' }
        }
        aria-label={on ? 'Turn the lights off' : 'Turn the lights on'}
      >
        {on ? '[ lights off ]' : '[ lights on ]'}
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
        <svg width={r * 2 + 48} height={r * 2 + 48} viewBox={`0 0 ${r * 2 + 48} ${r * 2 + 48}`}>
          <line
            x1={r + 24 + r * 0.72}
            y1={r + 24 + r * 0.72}
            x2={r + 24 + r * 0.72 + 30}
            y2={r + 24 + r * 0.72 + 30}
            stroke="#ffffff"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/*
            Two rims. The white one sits just outside the hole where the
            page is dark; the dark one sits on the edge of the lit part,
            where a white rim would disappear into the page.
          */}
          <circle
            cx={r + 24}
            cy={r + 24}
            r={r + 4}
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
          />
          <circle
            cx={r + 24}
            cy={r + 24}
            r={r - 1}
            fill="none"
            stroke="rgba(0,0,0,0.6)"
            strokeWidth="3"
          />
          {/* Invisible, fat, and the only thing on the glass you can grab. */}
          {touch && (
            <circle
              className="glass-grab"
              cx={r + 24}
              cy={r + 24}
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
