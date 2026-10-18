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
  return (
    <section id="features" className="px-4 py-16 border-b-2 border-black">
      <div className="max-w-3xl mx-auto">
        <h2 className="mb-8 text-3xl">Projects</h2>

        <div className="flex flex-col gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="box">
              <h3 className="mb-2 text-xl">
                {feature.emoji} {feature.title}
              </h3>
              <p className="mb-4">{feature.description}</p>
              <a href={feature.link} target="_blank" rel="noopener noreferrer" className="btn">
                View on GitHub →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
