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

const SPOT_KEY = 'lightswitch';

// Where the switch ended up, kept for the session so it is in the same
// place every time you come back to the hero.
const stored = (): { x: number; y: number } | null => {
  try {
    const raw = window.sessionStorage.getItem(SPOT_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw);
    return typeof v?.x === 'number' && typeof v?.y === 'number' ? v : null;
  } catch {
    return null;
  }
};

export default function Darkroom() {
  const pathname = usePathname();
  const lit = ALWAYS_LIT.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  // The switch lives on one wall, in the hero, and nowhere else.
  const atHome = pathname === '/';

  const darkRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const [touch, setTouch] = useState(false);
  const [on, setOn] = useState(false);
  const [switchPos, setSwitchPos] = useState<{ x: number; y: number } | null>(
    null
  );

  // Stored in document coordinates, not viewport ones, so scrolling back
  // up puts it exactly where it was.
  const place = useCallback((p: { x: number; y: number }) => {
    const spot = { x: p.x, y: p.y + window.scrollY };
    setSwitchPos(spot);
    try {
      window.sessionStorage.setItem(SPOT_KEY, JSON.stringify(spot));
    } catch {
      // Blocked storage. It still works, it just moves on the next load.
    }
  }, []);

  // The drag is tracked on window rather than on the grip, and the id is
  // kept in a ref rather than read back from setPointerCapture. The glass
  // moves out from under the finger the moment the drag starts, so
  // anything that depends on the pointer staying over the grip stops
  // after one frame, which is why this did not work on a phone.
  const dragging = useRef<number | null>(null);
  // Where the lens is, and where on it the finger landed. Without the
  // offset the lens would snap its centre to the finger, which throws the
  // handle out from under you on the first pixel of the drag, and can
  // leave the handle off-screen entirely if you let go near an edge.
  const pos = useRef({ x: 0, y: 0 });
  const grab = useRef({ x: 0, y: 0 });

  const move = useCallback((x: number, y: number) => {
    pos.current = { x, y };
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
    if (!atHome) return;

    const pick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const clear = (touch ? RADIUS_TOUCH : RADIUS) + 130;

      const taken = Array.from(document.querySelectorAll(CONTENT))
        // The lens and the switch are not content. The glass is drawn as
        // a 452px SVG box sitting at the middle of the screen, which on a
        // 375px phone is wider than the phone, so it was swallowing both
        // side strips: x came out between 127 and 248 instead of 41 and
        // 334, and a pick took a median of 12 tries instead of 2. The
        // clear circle already keeps the switch away from the lens. Wide
        // screens never noticed; the switch has to skip its own old rect
        // too, or a re-pick blocks its own new spot.
        .filter((el) => !el.closest('.glass, .lamp'))
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
          place({ x, y });
          return;
        }
      }
      // Nowhere clean. Bottom left is the emptiest corner on every page
      // here, and a findable switch beats a perfectly placed one.
      place({ x: half.w + 10, y: h - half.h - 10 });
    };

    // Wait for the webfonts, because measuring a layout mid-swap puts the
    // switch where the text used to be. Deliberately not
    // requestAnimationFrame: that never fires in a background tab, and the
    // switch would simply never be placed.
    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      const kept = stored();
      if (kept) setSwitchPos(kept);
      else pick();
    };
    document.fonts?.ready.then(run).catch(run);
    const safety = window.setTimeout(run, 600);

    // A resize does not move it. It is screwed to the wall for the rest of
    // the session; it only gets a new spot if the old one is now off the
    // page entirely.
    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const kept = stored();
        if (!kept || kept.x > window.innerWidth || kept.y > document.body.scrollHeight) {
          pick();
        }
      }, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      done = true;
      window.clearTimeout(safety);
      window.clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, [touch, atHome, place]);

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

  const startDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = e.pointerId;
    grab.current = {
      x: e.clientX - pos.current.x,
      y: e.clientY - pos.current.y,
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Capture is a nicety. The window listeners below do the work.
    }
  };

  useEffect(() => {
    if (lit || !touch) return;
    const onMove = (e: PointerEvent) => {
      if (dragging.current !== e.pointerId) return;
      e.preventDefault();
      move(e.clientX - grab.current.x, e.clientY - grab.current.y);
    };
    const onEnd = (e: PointerEvent) => {
      if (dragging.current === e.pointerId) dragging.current = null;
    };
    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onEnd);
    window.addEventListener('pointercancel', onEnd);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onEnd);
      window.removeEventListener('pointercancel', onEnd);
    };
  }, [lit, touch, move]);

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
  // Middle of the handle, measured out from the centre of the glass.
  const grip = (r + HANDLE / 2) * k;

  return (
    <>
      {/*
        The one object on this site allowed to look like an object. It is
        a light switch, so it is drawn as one: a plate on the wall with a
        rocker that actually moves. All SVG, because the base layer sets
        border-radius: 0 !important on everything and would square off
        anything built out of divs.
      */}
      {atHome && (
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
      )}

      <div
        ref={darkRef}
        className="darkroom"
        style={{ ['--lr' as string]: `${r}px` }}
        aria-hidden="true"
      />

      <div ref={glassRef} className="glass" aria-hidden="true">
        {/*
          On a phone you move the glass by its handle, the way you would
          pick up a real one. A plain div rather than the SVG stroke:
          touch-action is honoured unevenly on SVG children, and relying
          on it there is what stopped the drag working at all. The circle
          itself stays untouchable, so the page still scrolls and a link
          under the lens still takes a tap.
        */}
        {touch && (
          <div
            className="glass-grip"
            style={{
              transform: `translate(-50%, -50%) translate(${grip}px, ${grip}px)`,
            }}
            onPointerDown={startDrag}
          />
        )}

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
        </svg>
      </div>
    </>
  );
}
