'use client';

import { useState } from 'react';
import Link from 'next/link';

const links = [
  { href: '/#features', label: 'Work' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/projects', label: 'Projects' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 text-white bg-black border-b shadow-xl backdrop-blur-md border-white/10">
      <div className="flex items-center justify-between p-6">
        <Link
          href="/"
          className="text-3xl font-bold tracking-wide transition-transform hover:scale-105"
        >
          Portfolio
        </Link>

        {/* Desktop nav */}
        <div className="hidden gap-8 text-lg font-medium sm:flex">
          {links.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-2 transition-transform group hover:scale-105"
            >
              <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all group-hover:after:w-full">
                {label}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex items-center justify-center w-10 h-10 border rounded-lg sm:hidden border-white/20"
        >
          <span className="relative block w-5 h-[2px] bg-white">
            <span
              className={`absolute left-0 w-5 h-[2px] bg-white transition-transform ${open ? 'rotate-45 top-0' : '-translate-y-2'}`}
            />
            <span
              className={`absolute left-0 w-5 h-[2px] bg-white transition-transform ${open ? '-rotate-45 top-0' : 'translate-y-2'}`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="flex flex-col gap-4 px-6 pb-6 text-lg font-medium sm:hidden">
          {links.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="transition-colors hover:text-gray-300"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
