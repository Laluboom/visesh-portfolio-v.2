'use client';

import { useEffect, useRef, useState } from 'react';

/*
  A complaints pad. Opens from the bottom right corner into the middle of
  the page: ruled paper, a checkbox on every line. The first two lines are
  already ticked and fixed, because the site has already admitted to those.
  The rest are blank for whatever else you have.

  Sending is a stub. There is no backend, and a form that pretends to
  deliver is worse than one that admits it doesn't.
*/

const ALREADY_NOTED = [
  'The Suika game does not merge anything.',
  'The arcade room is already too zoomed in',
  'This Laluboom guy is very corny',
];

const BLANK_LINES = 8;

type Line = { text: string; checked: boolean };

const emptyLines = (): Line[] =>
  Array.from({ length: BLANK_LINES }, () => ({ text: '', checked: false }));

export default function NotesSheet() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(emptyLines);
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
      setLines(emptyLines());
      openerRef.current?.focus();
    }, 2600);
    return () => window.clearTimeout(t);
  }, [sent]);

  // Nothing typed on any blank line means they had nothing to add.
  const tattled = lines.some((line) => line.text.trim() !== '');

  const setLine = (i: number, patch: Partial<Line>) =>
    setLines((prev) =>
      prev.map((line, n) => (n === i ? { ...line, ...patch } : line))
    );

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="fixed z-[47] bottom-4 right-4"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        Complaints
      </button>

      {open && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 notes-backdrop${
            sent ? ' notes-dismissing' : ''
          }`}
          onClick={() => !sent && setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Complaints pad"
            className="notes-sheet relative w-full max-w-lg bg-[color:var(--bg)] px-6 py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl">Complaints</h2>
            <p className="mt-2 mb-4 text-sm">
              The first three are already noted and on the record. Add yours underneath.
              This sends nowhere, which I am obligted to tell you up front so I don't feel bad.
            </p>

            <div className="notes-pad">
              {ALREADY_NOTED.map((item) => (
                <div key={item} className="notes-line">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    readOnly
                    aria-label={`Already noted: ${item}`}
                  />
                  <span className="notes-line-text notes-line-fixed">
                    {item}
                  </span>
                </div>
              ))}

              {lines.map((line, i) => (
                <div key={i} className="notes-line">
                  <input
                    type="checkbox"
                    checked={line.checked}
                    onChange={(e) => setLine(i, { checked: e.target.checked })}
                    aria-label={`Tick complaint ${i + 1}`}
                  />
                  <input
                    type="text"
                    value={line.text}
                    onChange={(e) =>
                      setLine(i, {
                        text: e.target.value,
                        checked: e.target.value ? true : line.checked,
                      })
                    }
                    className="notes-line-text"
                    aria-label={`Complaint ${i + 1}`}
                  />
                </div>
              ))}
            </div>

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
                <span>
                  {tattled
                    ? 'Congratulations, your tattles have been noted 🙏'
                    : 'Nothing to complain about? Have a cookie 🍪'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
