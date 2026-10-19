'use client';

import { useEffect, useRef, useState } from 'react';

/*
  A complaints pad. Opens from the bottom right corner into the middle of
  the page, takes a list of grievances, and sends them precisely nowhere.
  The send handler is deliberately a stub: there is no backend, and a form
  that pretends to deliver is worse than one that admits it doesn't.
*/

const COMPLAINTS = [
  'Too much text and not enough pictures.',
  'The Suika game does not merge anything.',
  'The arcade room came up black.',
  'Everything is black and white.',
  'Nothing looks like a box any more.',
  'I was promised a feature grid.',
];

export default function NotesSheet() {
  const [open, setOpen] = useState(false);
  const [ticked, setTicked] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // The congratulations notice clears itself, then puts the pad away.
  useEffect(() => {
    if (!sent) return;
    const t = window.setTimeout(() => {
      setSent(false);
      setOpen(false);
      setTicked([]);
      setNote('');
      openerRef.current?.focus();
    }, 2600);
    return () => window.clearTimeout(t);
  }, [sent]);

  const toggle = (item: string) =>
    setTicked((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="fixed z-40 bottom-4 right-4"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        Complaints
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 notes-backdrop"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Complaints pad"
            className="notes-sheet relative w-full max-w-lg bg-[color:var(--bg)] px-6 py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl">Complaints</h2>
            <p className="mt-2 text-sm">
              Tick what is wrong. Add anything I missed. This sends nowhere,
              which I am telling you up front.
            </p>

            <ul className="mt-5 space-y-2 text-sm">
              {COMPLAINTS.map((item) => (
                <li key={item}>
                  <label className="flex gap-3 cursor-pointer items-baseline">
                    <input
                      type="checkbox"
                      checked={ticked.includes(item)}
                      onChange={() => toggle(item)}
                    />
                    <span>{item}</span>
                  </label>
                </li>
              ))}
            </ul>

            <label htmlFor="other-complaint" className="block mt-5 text-sm">
              Something else
            </label>
            <textarea
              id="other-complaint"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full mt-1 p-2 text-sm bg-transparent notes-pad"
              placeholder="Go on."
            />

            <div className="flex justify-end gap-6 mt-5">
              <button type="button" onClick={() => setOpen(false)}>
                Close
              </button>
              <button type="button" onClick={() => setSent(true)}>
                Send
              </button>
            </div>

            {sent && (
              <div className="notes-cheer" role="status">
                <span>Congratulations, your tattles have been noted 🙏</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
