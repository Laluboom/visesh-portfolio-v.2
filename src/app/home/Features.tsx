'use client';

import { useState } from 'react';

const features = [
  {
    title: 'map_scraper_systems',
    description:
      'A full-stack scraping app with a separate backend and frontend, containerized with Docker and wired up with CI.',
    link: 'https://github.com/Laluboom/map_scraper_systems',
    emoji: '🗺️',
  },
  {
    title: 'ml-from-scratch',
    description:
      'ML fundamentals implemented from the ground up in both Python and C++, built over about 10 months.',
    link: 'https://github.com/Laluboom/ml-from-scratch',
    emoji: '🧮',
  },
  {
    title: 'pretty_fly_analytics',
    description:
      'A data/ML analytics project with a written PRD and a neural-net component for the prediction side.',
    link: 'https://github.com/Laluboom/pretty_fly_analytics',
    emoji: '📊',
  },
  {
    title: 'game_theory',
    description:
      'An Axelrod-style iterated prisoner’s dilemma tournament for comparing strategies head-to-head.',
    link: 'https://github.com/Laluboom/game_theory',
    emoji: '♟️',
  },
  {
    title: 'BudgetSorter',
    description:
      'Receipt OCR paired with bank statement analysis to reconcile spending automatically.',
    link: 'https://github.com/Laluboom/BudgetSorter',
    emoji: '🧾',
  },
];


export default function Features() {
  const [active, setActive] = useState(1); // index of expanded panel

  const next = () => setActive((active + 1) % features.length);
  const prev = () => setActive((active - 1 + features.length) % features.length);

  return (
    <section id="features" className="min-h-screen px-4 py-12 overflow-hidden text-white bg-black">
      <h2 className="mb-12 text-4xl font-bold text-center">Projects</h2>

      <div className="flex items-center justify-center gap-4 overflow-x-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() => setActive(index)}
            className={`relative flex-shrink-0 transition-all duration-500 ease-in-out cursor-pointer border border-white/20 rounded-xl overflow-hidden ${active === index ? 'w-[60vw]' : 'w-[15vw]'} h-[75vh] flex flex-col justify-between p-6 hover:brightness-110`}
            style={{backgroundColor: active === index ? '#1f1f1f' : '#111',}}>
            <div>
              <div className="mb-4 text-5xl">{feature.emoji}</div>
              <h3 className="mb-2 text-2xl font-semibold">{feature.title}</h3>
              {active === index && (
                <p className="mb-4 text-gray-400">{feature.description}</p>
              )}
            </div>
            {active === index && (
              <a
                href={feature.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 text-white transition-all border border-white rounded hover:bg-white hover:text-black"
              >
                View on GitHub →
              </a>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-8 mt-8">
        <button onClick={prev} className="px-4 py-2 transition-all border border-white rounded hover:bg-white hover:text-black">
          ← Previous
        </button>
        <button onClick={next} className="px-4 py-2 transition-all border border-white rounded hover:bg-white hover:text-black">
          Next →
        </button>
      </div>
    </section>
  );
}
