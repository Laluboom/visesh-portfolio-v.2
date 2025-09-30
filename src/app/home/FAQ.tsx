'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "What technologies do you work with?",
    answer: "I work primarily with JavaScript, TypeScript, React, Next.js, Tailwind CSS, and Python for backend and data projects.",
  },
  {
    question: "Are you open to freelance or collaboration?",
    answer: "Absolutely! I enjoy building with others. You can reach out via the Contact page for freelance or collab inquiries.",
  },
  {
    question: "Can I see your past work or code?",
    answer: "Yes! Check out my Projects page where I showcase my selected work along with GitHub links where available.",
  },
  {
    question: "Do you do design as well?",
    answer: "Yes, I enjoy UI/UX design and often build interfaces from scratch using tools like Figma and Tailwind CSS.",
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
