const features = [
  {
    title: 'Visesh Portfolio Website',
    description: "Words that make Lalu seem cool, version 2, voila!",
    link: 'https://github.com/Laluboom/visesh-portfolio-v.2',
  },
  {
    title: 'map_scraper_systems',
    description: 'Dysfunctional bloatware, but if it works, Scrapes Google Maps for whatever format you need.',
    link: 'https://github.com/Laluboom/map_scraper_systems',
  },
  {
    title: 'ml-from-scratch',
    description: 'Wrote the math myself for basic machine learning algorithms in Python and C++. Importing is stupid.',
    link: 'https://github.com/Laluboom/ml-from-scratch',
  },
  {
    title: 'pretty_fly_analytics',
    description:
      'Built for a hackathon off a real specs, with a neural net doing the actual predicting. Didn\'t win tho so probably not great',
    link: 'https://github.com/Laluboom/pretty_fly_analytics',
  },
  {
    title: 'game_theory',
    description:
      "Pits iterated prisoner's dilemma strategies against each other, Axelrod-style, mostly just called the library functions and felt smart.",
    link: 'https://github.com/Laluboom/game_theory',
  },
  {
    title: 'BudgetSorter',
    description: "Reads your receipts with OCR and checks them against your bank statement. Haven't used it once. YET",
    link: 'https://github.com/Laluboom/BudgetSorter',
  },
];

export default function Features() {
  return (
    <section id="features" className="px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="mb-4 text-3xl">Projects</h2>

        <p className="mb-8">
          Five of these live on GitHub. The ones with write-ups, including the
          two that are visibly broken, are on the{' '}
          <a href="/projects">projects page</a>.
        </p>

        <div className="flex flex-col gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="box">
              <h3 className="mb-2 text-xl">{feature.title}</h3>
              <p className="mb-4">{feature.description}</p>
              <a href={feature.link} target="_blank" rel="noopener noreferrer" className="btn">
                View on GitHub
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
