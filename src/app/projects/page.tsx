type Project = {
  title: string;
  description: string;
  link: string;
  external: boolean;
  cta: string;
};

const projects: Project[] = [
  {
    title: 'Suika Game (WIP)',
    description:
      "Fruit-merging puzzle game, written on a bare canvas with no physics engine. That wasn't a decision, it's just how it happened. Drop straight down and the merge check never fires, so nothing merges yet. See todo.md.",
    link: '/projects/DevilSuika',
    external: false,
    cta: 'Try it (it is broken)',
  },
  {
    title: 'Arcade Room',
    description:
      "A room with an arcade machine in it, modelled in Blender and put in the browser with WebGL. The HDRI lighting loads from a CDN with no fallback, so the screen sometimes comes up black. Not your browser's fault.",
    link: '/projects/arcaderoom',
    external: false,
    cta: 'View the room',
  },
  {
    title: 'LaluPi',
    description: "Five Discord-gated agents and 565+ tests running my email, calendar, and PRs so I don't have to.",
    link: '/projects/LaluPi',
    external: false,
    cta: 'Read the write-up',
  },
  {
    title: 'map_scraper_systems',
    description: 'Scrapes Google Maps for whatever format you need.',
    link: 'https://github.com/Laluboom/map_scraper_systems',
    external: true,
    cta: 'GitHub',
  },
  {
    title: 'ml-from-scratch',
    description: 'Wrote the math myself in Python and C++. Importing is stupid.',
    link: 'https://github.com/Laluboom/ml-from-scratch',
    external: true,
    cta: 'GitHub',
  },
  {
    title: 'pretty_fly_analytics',
    description:
      'Built for the Wayflyer Visionaries Hackathon off a real spec, with a neural net doing the actual predicting.',
    link: 'https://github.com/Laluboom/pretty_fly_analytics',
    external: true,
    cta: 'GitHub',
  },
  {
    title: 'game_theory',
    description:
      "Pits iterated prisoner's dilemma strategies against each other, Axelrod-style, to see which one actually wins.",
    link: 'https://github.com/Laluboom/game_theory',
    external: true,
    cta: 'GitHub',
  },
  {
    title: 'BudgetSorter',
    description: "Reads your receipts with OCR and checks them against your bank statement so you don't have to.",
    link: 'https://github.com/Laluboom/BudgetSorter',
    external: true,
    cta: 'GitHub',
  },
  {
    title: '3_Body_problem_Simulation',
    description: "N-body gravity sim in 3D. Newton's law plus RK4 integration, nothing fancier than that.",
    link: 'https://github.com/Laluboom/3_Body_problem_Simulation',
    external: true,
    cta: 'GitHub',
  },
  {
    title: 'Custom_Extensions',
    description: 'A handful of browser extensions for YouTube and a few other sites.',
    link: 'https://github.com/Laluboom/Custom_Extensions',
    external: true,
    cta: 'GitHub',
  },
  {
    title: 'Scythe-add-on_minecraft-mod',
    description: "Minecraft Bedrock add-on. Adds a scythe weapon, that's the whole thing.",
    link: 'https://github.com/Laluboom/Scythe-add-on_minecraft-mod',
    external: true,
    cta: 'GitHub',
  },
  {
    title: 'Line-Following-Robot',
    description: 'Arduino robot with three IR sensors that follows a black line on the floor.',
    link: 'https://github.com/Laluboom/Line-Following-Robot',
    external: true,
    cta: 'GitHub',
  },
  {
    title: 'Hackathon-Scraper',
    description: 'Small scraper that checks hackathon and event listing pages for new ones.',
    link: 'https://github.com/Laluboom/Hackathon-Scraper',
    external: true,
    cta: 'GitHub',
  },
  {
    title: 'London-Crime-and-Transport-Data-Analysis',
    description: 'Multi-part analysis of London crime and transport data. Cleaning, plotting, correlations.',
    link: 'https://github.com/Laluboom/London-Crime-and-Transport-Data-Analysis',
    external: true,
    cta: 'GitHub',
  },
  {
    title: 'AI_Researcher',
    description: 'Started as a scraper. Turning it into a proper research automation system now.',
    link: 'https://github.com/Laluboom/AI_Researcher',
    external: true,
    cta: 'GitHub',
  },
];

export default function ProjectsPage() {
  return (
    <main className="px-4 py-10">
      <section className="max-w-7xl mx-auto">
        <h1 className="mb-4 text-3xl">My Projects</h1>

        <p className="mb-8">
          I start by building the ugly version that works, because the
          alternative is three weeks of design decisions about software that
          doesn&apos;t run yet. Then I use it, find the part that annoys me,
          and fix that. I repeat that until it stops annoying me or I run out
          of patience. The first three below have pages of their own, and the
          two that are currently broken say so. The rest are links to the
          code.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {projects.map((project) => (
            <div key={project.title} className="box p-3 flex flex-col justify-between">
              <div>
                <h2 className="mb-1 text-base leading-snug">{project.title}</h2>
                <p className="text-xs leading-snug">{project.description}</p>
              </div>

              <a
                href={project.link}
                target={project.external ? '_blank' : '_self'}
                rel={project.external ? 'noopener noreferrer' : undefined}
                className="btn mt-3 text-xs"
              >
                {project.cta}
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
