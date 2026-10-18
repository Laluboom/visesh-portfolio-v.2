'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "What technologies do you work with?",
    answer:
      "Across my real projects: Python and C++ (ml-from-scratch), JavaScript/TypeScript with Docker and CI (map_scraper_systems), data and ML tooling including a neural-net component (pretty_fly_analytics), plus Arduino (Line-Following-Robot) and Minecraft Bedrock addon development (Scythe-add-on_minecraft-mod).",
  },
  {
    question: "Are you open to freelance or collaboration?",
    // TODO(visesh): confirm real current availability/timeline before shipping — the line below is a placeholder, not a commitment.
    answer:
      "Reach out via the Contact page with what you have in mind and I'll let you know if the timing works.",
  },
  {
    question: "Can I see your past work or code?",
    answer: "Yes — check out my Projects page, or browse the repos directly at github.com/Laluboom.",
  },
  {
    question: "Do you do design as well?",
    answer: "My focus is more on the engineering side — full-stack apps, ML fundamentals, and automation systems — rather than visual/UI design.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="min-h-screen px-6 py-16 text-white bg-black">
      <h2 className="mb-12 text-4xl font-bold text-center">❓ FAQ</h2>

      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="border border-white/10 rounded-xl transition-all duration-300 bg-[#111] hover:border-white/20"
          >
            <button
              onClick={() => toggle(index)}
              className="flex items-center justify-between w-full px-6 py-4 text-lg font-medium text-left transition-colors hover:text-white"
            >
              <span>{item.question}</span>
              <span className="text-xl">{openIndex === index ? '−' : '+'}</span>
            </button>

            {openIndex === index && (
              <div className="px-6 pb-4 text-base text-gray-400 transition-all duration-300">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
