const projects = [
  {
    type: 'game',
    title: 'Suika Game (WIP)',
    description:
      'Fruit-fusion puzzle game. Known bug: fruit dropped straight down lands exactly minDist apart, so the merge check never fires — merging doesn\'t work yet. See todo.md.',
    emoji: '🍉',
    link: '/projects/DevilSuika',
    cta: '🚧 Try it (known broken) →',
  },
  {
    type: 'model',
    title: 'Arcade Room',
    description:
      'Explore my 3D-modeled arcade machine using WebGL. Known issue: the lighting HDRI loads from a remote CDN with no error fallback, so the canvas can come up blank/black on load — that\'s a known bug, not your browser. See reference.md.',
    emoji: '🕹️',
    link: '/projects/arcaderoom',
    cta: '🕹️ View Model →',
  },
  {
    type: 'blog',
    title: 'LaluPi',
    description: 'Five Discord-gated agents and 565+ tests keeping my email, calendar, and PRs running on autopilot.',
    emoji: '🤖',
    link: '/projects/LaluPi',
    cta: '📝 Read Post →',
  },
];

export default function ProjectsPage() {
  return (
    <main className="px-6 py-16">
      <section className="max-w-6xl mx-auto">
        <h1 className="mb-12 text-4xl">📁 My Projects</h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <div key={idx} className="box flex flex-col justify-between">
              <div>
                <div className="mb-4 text-4xl">{project.emoji}</div>
                <h2 className="mb-2 text-xl">{project.title}</h2>
                <p className="text-sm">{project.description}</p>
              </div>

              <a
                href={project.link}
                target={project.type === 'game' ? '_blank' : '_self'}
                className="btn mt-4"
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
