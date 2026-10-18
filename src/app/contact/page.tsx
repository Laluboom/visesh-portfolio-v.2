'use client';

import { useState } from 'react';

const EMAIL = 'viseshakbari@gmail.com';

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen px-6 py-16 text-white bg-black">
      <section className="max-w-3xl mx-auto space-y-12 text-center">
        <h1 className="text-4xl font-bold">Get in Touch</h1>
        <p className="text-lg text-gray-400">
          Email me directly, or check out my work on GitHub.
          {/* TODO(visesh): add real availability/what you're open to, e.g. freelance, full-time, collab */}
        </p>

        {/* Contact Cards */}
        <div className="grid gap-6 text-left sm:grid-cols-3">
          <a
            href={`mailto:${EMAIL}`}
            className="p-6 bg-[#111] rounded-xl border border-white/10 hover:scale-105 transition-transform"
          >
            <div className="mb-2 text-3xl">✉️</div>
            <div className="mb-1 font-semibold">Email Me</div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{EMAIL}</span>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCopyEmail();
                }}
                className="text-gray-500 hover:text-white"
                title="Copy email"
              >
                📋
              </span>
              <span className="text-green-400">{copied && 'Copied!'}</span>
            </div>
          </a>

          <a
            href="https://github.com/Laluboom"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-[#111] rounded-xl border border-white/10 hover:scale-105 transition-transform"
          >
            <div className="mb-2 text-3xl">💻</div>
            <div className="mb-1 font-semibold">GitHub</div>
            <div className="text-sm text-gray-400">github.com/Laluboom</div>
          </a>

          <a
            href="https://www.linkedin.com/in/viseshakbari/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-[#111] rounded-xl border border-white/10 hover:scale-105 transition-transform"
          >
            <div className="mb-2 text-3xl">🔗</div>
            <div className="mb-1 font-semibold">LinkedIn</div>
            <div className="text-sm text-gray-400">in/viseshakbari</div>
          </a>
        </div>
      </section>
    </main>
  );
}
