'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('you@example.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen px-6 py-16 text-white bg-black">
      <section className="max-w-3xl mx-auto space-y-12 text-center">
        <h1 className="text-4xl font-bold">📬 Let’s Get in Touch</h1>
        <p className="text-lg text-gray-400">
          Whether it’s a project, opportunity, or just a hello — I’d love to hear from you!
        </p>

        {/* Contact Cards */}
        <div className="grid gap-6 text-left sm:grid-cols-2">
          <button
            onClick={handleCopyEmail}
            className="p-6 bg-[#111] rounded-xl border border-white/10 hover:scale-105 transition-transform"
          >
            <div className="mb-2 text-3xl">✉️</div>
            <div className="mb-1 font-semibold">Email Me</div>
            <div className="text-sm text-gray-400">
              you@example.com
              <span className="ml-2 text-green-400">
                {copied && 'Copied!'}
              </span>
            </div>
          </button>

          <a
            href="https://github.com/yourusername"
            target="_blank"
            className="p-6 bg-[#111] rounded-xl border border-white/10 hover:scale-105 transition-transform"
          >
            <div className="mb-2 text-3xl">💻</div>
            <div className="mb-1 font-semibold">GitHub</div>
            <div className="text-sm text-gray-400">/yourusername</div>
          </a>

          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            className="p-6 bg-[#111] rounded-xl border border-white/10 hover:scale-105 transition-transform"
          >
            <div className="mb-2 text-3xl">🔗</div>
            <div className="mb-1 font-semibold">LinkedIn</div>
            <div className="text-sm text-gray-400">/yourprofile</div>
          </a>

          <a
            href="https://yourportfolio.com/#contact"
            target="_blank"
            className="p-6 bg-[#111] rounded-xl border border-white/10 hover:scale-105 transition-transform"
          >
            <div className="mb-2 text-3xl">🌐</div>
            <div className="mb-1 font-semibold">Website</div>
            <div className="text-sm text-gray-400">yourportfolio.com</div>
          </a>
        </div>

        {/* Signature Note */}
        <div className="mt-16 text-sm text-gray-500">
          Built with ❤️ by V
        </div>
      </section>
    </main>
  );
}
