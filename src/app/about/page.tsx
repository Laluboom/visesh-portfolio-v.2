export default function AboutPage() {
  return (
    <main className="px-6 py-16">
      <section className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="pb-8">
          <h1 className="mb-2 text-4xl">About Me</h1>
          <p className="max-w-xl text-lg">
            I'm Lalu Boom. Here's what I've actually built and how I work.
          </p>
        </div>

        {/* Two-Column Block */}
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="box">
            <h2 className="mb-2 text-2xl">My Background</h2>
            <p>
              I'm a math student and I'd rather build things end-to-end than just read about
              how they work. That's a full-stack scraping app with Docker and CI (
              <a
                href="https://github.com/Laluboom/map_scraper_systems"
                target="_blank"
                rel="noopener noreferrer"
              >
                map_scraper_systems
              </a>
              ), a receipt-OCR and bank-statement tool (
              <a
                href="https://github.com/Laluboom/BudgetSorter"
                target="_blank"
                rel="noopener noreferrer"
              >
                BudgetSorter
              </a>
              ), and smaller stuff like an Arduino line-following robot and a Minecraft mod.
              I spent about 10 months grinding through{' '}
              <a
                href="https://github.com/Laluboom/ml-from-scratch"
                target="_blank"
                rel="noopener noreferrer"
              >
                ml-from-scratch
              </a>
              , building machine learning fundamentals in both Python and C++ instead of just
              importing a library. It's still the project that taught me the most.
            </p>
          </div>

          <div className="box">
            <h2 className="mb-2 text-2xl">Philosophy</h2>
            <p>
              The project I'd point to is Foreman. It's a Discord-driven multi-agent
              automation system I built with 565+ tests, a four-tier LLM provider cascade,
              systemd-based automation, and an escalation/circuit-breaker safety system.
              Building something that's meant to run unattended changed how I think about
              code. I care more about failure modes and recovery paths than the happy path,
              because the tests and the circuit breaker only exist because autonomous systems
              fail in ways you don't see coming. Read more on the{' '}
              <a href="/projects/LaluPi">Foreman project page</a>.
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="box">
          <h2 className="mb-4 text-2xl">Skills &amp; Tools</h2>
          <div className="flex flex-wrap gap-3">
            {[
              'Python',
              'JavaScript',
              'HTML/CSS',
              'SolidWorks',
              'AutoCAD',
              'Inventor',
              'Raspberry Pi',
              'Arduino',
            ].map((skill) => (
              <span key={skill} className="px-4 py-2 text-sm bg-[color:var(--bg)]">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* What I've Built */}
        <div className="box">
          <h2 className="mb-4 text-2xl">A Few Other Things I've Built</h2>
          <ul className="grid gap-3 text-sm sm:grid-cols-2">
            <li>
              <a
                href="https://github.com/Laluboom/pretty_fly_analytics"
                target="_blank"
                rel="noopener noreferrer"
              >
                pretty_fly_analytics
              </a>
              : a data/ML analytics project built from a PRD, including a neural net.
            </li>
            <li>
              <a
                href="https://github.com/Laluboom/game_theory"
                target="_blank"
                rel="noopener noreferrer"
              >
                game_theory
              </a>
              : an Axelrod-style iterated prisoner's dilemma tournament.
            </li>
            <li>
              <a
                href="https://github.com/Laluboom/3_Body_problem_Simulation"
                target="_blank"
                rel="noopener noreferrer"
              >
                3_Body_problem_Simulation
              </a>
              : a Runge-Kutta integrator simulating the three-body problem.
            </li>
            <li>
              <a
                href="https://github.com/Laluboom/Custom_Extensions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Custom_Extensions
              </a>
              : five browser extensions built from scratch.
            </li>
          </ul>
          <p className="mt-4 text-sm">
            More of this is on{' '}
            <a href="https://github.com/Laluboom" target="_blank" rel="noopener noreferrer">
              github.com/Laluboom
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
