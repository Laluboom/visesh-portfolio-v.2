'use client';

import { useState } from 'react';

const features = [
  {
    title: 'Trial 1',
    description: 'Explore scalable apps and APIs I’ve built using modern web tech.',
    link: '/projects',
    emoji: '🧩',
  },
  {
    title: 'Trial 2',
    description: 'Pixel-perfect components and animations built for real users.',
    link: '/#designs',
    emoji: '🎨',
  },
  {
    title: 'Trial 3',
    description: 'Projects I’ve built while working with other developers.',
    link: '/#collabs',
    emoji: '🤝',
  },
  {
    title: 'Trial 4',
    description: 'Projects I’ve built while working with other developers.',
    link: '/#collabs',
    emoji: '🤝',
  },
  {
    title: 'Trial 5',
    description: 'Projects I’ve built while working with other developers.',
    link: '/#collabs',
    emoji: '🤝',
  },
];


export default function Features() {
  const [active, setActive] = useState(1); // index of expanded panel

  const next = () => setActive((active + 1) % features.length);
  const prev = () => setActive((active - 1 + features.length) % features.length);

  return (
    <section id="features" className="min-h-screen px-4 py-12 overflow-hidden text-white bg-black">
      <h2 className="mb-12 text-4xl font-bold text-center">✨ Features</h2>

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
              <a href={feature.link} className="inline-block px-4 py-2 text-white transition-all border border-white rounded hover:bg-white hover:text-black">
                Visit →
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