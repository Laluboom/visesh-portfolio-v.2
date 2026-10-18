export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-16 text-white bg-black">
      <section className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-2 text-4xl font-bold">About Me</h1>
          <p className="max-w-xl mx-auto text-lg text-gray-400">
            I'm Visesh Akbari. Here's what I've actually built and how I work.
          </p>
        </div>

        {/* Two-Column Block */}
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="p-6 bg-[#111] rounded-xl border border-white/10 hover:border-white/20 transition">
            <h2 className="mb-2 text-2xl font-semibold">My Background</h2>
            <p className="text-gray-400">
              I like building things end-to-end rather than just reading about how they work.
              That's shown up as a full-stack scraping app with Docker and CI (
              <a
                href="https://github.com/Laluboom/map_scraper_systems"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                map_scraper_systems
              </a>
              ), a receipt-OCR and bank-statement analysis tool (
              <a
                href="https://github.com/Laluboom/BudgetSorter"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                BudgetSorter
              </a>
              ), and smaller hands-on builds like an Arduino line-following robot and a
              Minecraft mod. I spent about 10 months working through{' '}
              <a
                href="https://github.com/Laluboom/ml-from-scratch"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                ml-from-scratch
              </a>
              , implementing machine learning fundamentals in both Python and C++ instead of
              just calling a library, which is still the project that taught me the most.
            </p>
          </div>

          <div className="p-6 bg-[#111] rounded-xl border border-white/10 hover:border-white/20 transition">
            <h2 className="mb-2 text-2xl font-semibold">Philosophy</h2>
            <p className="text-gray-400">
              The project I'd point to is Foreman — a Discord-driven multi-agent automation
              system I built with 565+ tests, a four-tier LLM provider cascade, systemd-based
              automation, and an escalation/circuit-breaker safety system. Building something
              meant to run unattended changed how I think about code: I care more about
              failure modes and recovery paths than the happy path, because the tests and the
              circuit breaker exist precisely because autonomous systems fail in ways you
              don't predict in advance. Read more on the{' '}
              <a href="/projects/LaluPi" className="underline hover:text-white">
                Foreman project page
              </a>
              .
            </p>
          </div>
        </div>

        {/* What I've Built */}
        <div className="p-6 bg-[#111] rounded-xl border border-white/10">
          <h2 className="mb-4 text-2xl font-semibold">A Few Other Things I've Built</h2>
          <ul className="grid gap-3 text-sm text-gray-400 sm:grid-cols-2">
            <li>
              <a
                href="https://github.com/Laluboom/pretty_fly_analytics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline hover:text-gray-300"
              >
                pretty_fly_analytics
              </a>{' '}
              — a data/ML analytics project built from a PRD, including a neural net.
            </li>
            <li>
              <a
                href="https://github.com/Laluboom/game_theory"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline hover:text-gray-300"
              >
                game_theory
              </a>{' '}
              — an Axelrod-style iterated prisoner's dilemma tournament.
            </li>
            <li>
              <a
                href="https://github.com/Laluboom/3_Body_problem_Simulation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline hover:text-gray-300"
              >
                3_Body_problem_Simulation
              </a>{' '}
              — a Runge-Kutta integrator simulating the three-body problem.
            </li>
            <li>
              <a
                href="https://github.com/Laluboom/Custom_Extensions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline hover:text-gray-300"
              >
                Custom_Extensions
              </a>{' '}
              — five browser extensions built from scratch.
            </li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            More of this is on{' '}
            <a
              href="https://github.com/Laluboom"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              github.com/Laluboom
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
