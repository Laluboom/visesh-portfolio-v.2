'use client';

const projects = [
  {
    type: 'game',
    title: 'Suika Game (WIP)',
    description:
      'Fruit-fusion puzzle game. Known bug: fruit dropped straight down lands exactly minDist apart, so the merge check never fires — merging doesn\'t work yet. See todo.md.',
    emoji: '🍉',
    link: '/projects/DevilSuika',
  },
  {
    type: 'model',
    title: 'Arcade Room',
    description:
      'Explore my 3D-modeled arcade machine using WebGL. Known issue: the lighting HDRI loads from a remote CDN with no error fallback, so the canvas can come up blank/black on load — that\'s a known bug, not your browser. See reference.md.',
    emoji: '🕹️',
    link: '/projects/arcaderoom'
  },
  {
    type: 'blog',
    title: 'LaluPi',
    description: 'Five Discord-gated agents and 565+ tests keeping my email, calendar, and PRs running on autopilot.',
    emoji: '🤖',
    link: '/projects/LaluPi',
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-6 py-16 text-white bg-black">
      <section className="max-w-6xl mx-auto text-center">
        <h1 className="mb-12 text-4xl font-bold">📁 My Projects</h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <a
              key={idx}
              href={project.link}
              target={project.type === 'game' ? '_blank' : '_self'}
              className="group relative p-6 bg-[#111] border border-white/10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-white/20 flex flex-col justify-between cursor-pointer"
            >
              <div className="mb-4 text-4xl">{project.emoji}</div>
              <h2 className="mb-2 text-xl font-semibold">{project.title}</h2>
              <p className="text-sm text-gray-400">{project.description}</p>

              <div className="absolute text-sm text-gray-500 bottom-4 right-6 group-hover:text-white">
                {project.type === 'game'
                ? '🚧 Try it (known broken) →'
                : project.type === 'model'
                ? '🕹️ View Model →'
                : '📝 Read Post →'}
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
