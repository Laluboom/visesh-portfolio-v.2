export default function AboutPage() {
  return (
    <main className="px-6 py-16">
      <section className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="pb-8">
          <h1 className="mb-2 text-4xl">About Me</h1>
          <p className="max-w-xl text-lg">
            I&apos;m Lalu Boom. Here&apos;s why I am, what I&apos;ve actually 
            built and how I work.
          </p>
          {/*
            One beat per line. Newlines inside a single <p> collapse to
            spaces, which ran all five of these together.
          */}
          <div className="mt-4 space-y-1">
            <p>Existed in upper quartile of scholastic ranking cause smart parents (exposition)</p>
            <p>Wasted a year on mechanical engineering cause bad priority (conflict)</p>
            <p>Built a CLI physics calculator using chatgpt cause lazy (Rising Action)</p>
            <p>Studied Math and Data Science and made softwares cause money. (Falling Action)</p>
            <p>Idk yet, obviously (Resolution)</p>
          </div>
        </div>

        {/* Two-Column Block */}
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="box">
            <h2 className="mb-2 text-2xl">My Background</h2>
            <p>
              I study math and data science, and I&apos;d rather build broken things
              than just read about how they work for now. That's a full-stack scraping app with Docker and CI, (doesn't work)(
              <a
                href="https://github.com/Laluboom/map_scraper_systems"
                target="_blank"
                rel="noopener noreferrer"
              >
                map_scraper_systems
              </a>
              ), a receipt-OCR and bank-statement tool (I haven't used it yet)(
              <a
                href="https://github.com/Laluboom/BudgetSorter"
                target="_blank"
                rel="noopener noreferrer"
              >
                BudgetSorter
              </a>
              ), and smaller stuff like an Arduino line-following robot and a Minecraft mod.
              I spent about 10 months grinding through why I can't tell you{' '}
              <a
                href="https://github.com/Laluboom/ml-from-scratch"
                target="_blank"
                rel="noopener noreferrer"
              >
                ml-from-scratch
              </a>
              , building machine learning fundamentals in both Python and C++ of hundreds of lines instead of just
              importing a library in one line. cause recruiters like that(I think).
            </p>
          </div>
          <div className="box">
            <h2 className="mb-2 text-2xl">Foreman, and what it taught me</h2>
            <div className="space-y-1">
              <p>Started with OpenClaw, was all the rage and thought it&apos;d be cool even though no use case yet</p>
              <p>Then heard about hermes and thought it&apos;d be even cooler. so I moved to that. Still no use case.</p>
              <p>It sat rotting on my old laptop/server cause no use case. Deleted everything cause purging feels good.</p>
              <p>Found some use cases 3 months later, but I realized don&apos;t need a whole harness for simple scripts (duh).</p>
              <p>Anyways, Here is the AI summary of my project description (its a little pretentious, forgive me):</p>
            </div>
            <p className="mt-3 pl-4">
              The project I&apos;d point to is Foreman. It&apos;s a Discord-driven multi-agent
              automation system I built with 565+ tests, a four-tier LLM provider cascade,
              systemd-based automation, and an escalation/circuit-breaker safety system.
              Building something that&apos;s meant to run unattended changed how I think about
              code. I care more about failure modes and recovery paths than the happy path,
              because the tests and the circuit breaker only exist because autonomous systems
              fail in ways you don&apos;t see coming. Read more on the{' '}
              <a href="/projects/LaluPi">Foreman project page</a>.
            </p>
          </div>
        </div>

        {/* What I'm good at / not good at */}
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="box">
            <h2 className="mb-2 text-2xl">What I&apos;m good at</h2>
            <p className="mb-4">
              Getting a first version running. The first version is always bad.
              That part is normal and it isn&apos;t the problem.
            </p>
            <p className="mb-4">
              Saying so. I can read my own code two months later and admit
              it&apos;s bad instead of defending it. Not admitting it is how
              bad code stays bad.
            </p>
            <p>
              Staying with something until I understand it. When something on
              screen looks wrong, I&apos;ll sit with it for an hour until I see
              why, and usually that is how long it takes. Ofcourse LLMs help
            </p>
          </div>

          <div className="box">
            <h2 className="mb-2 text-2xl">What I&apos;m not good at</h2>
            <p className="mb-4">
              Finishing. I have a folder of projects that are eighty percent
              done and will stay that way, and the honest reason is that the
              interesting problem was solved at sixty percent and I lost
              interest at seventy-five.
            </p>
            <p>
              Estimating. Ask me how long something will take and double it.
              Then double it again if it touches a build tool.
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
              'Bash',
              'AutoCAD',
              'CI/CD',
              'SQL',
              'Math(really good)',
            ].map((skill) => (
              <span key={skill} className="pr-6 py-1 text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* What I've Built */}
        <div className="box">
          <h2 className="mb-4 text-2xl">A Few Other Things I've been "passionate" about</h2>
          <ul className="grid gap-3 text-sm sm:grid-cols-2">
            <li>
              <a
                href="https://github.com/Laluboom/pretty_fly_analytics"
                target="_blank"
                rel="noopener noreferrer"
              >
                pretty_fly_analytics
              </a>
              : a data/ML analytics project built from a PRD, including a neural net. oooh so cool.
            </li>
            <li>
              <a
                href="https://github.com/Laluboom/game_theory"
                target="_blank"
                rel="noopener noreferrer"
              >
                game_theory
              </a>
              : an Axelrod-style iterated prisoner's dilemma tournament. Good guys win surprisingly.
            </li>
            <li>
              <a
                href="https://github.com/Laluboom/3_Body_problem_Simulation"
                target="_blank"
                rel="noopener noreferrer"
              >
                3_Body_problem_Simulation
              </a>
              : a Runge-Kutta integrator simulating the three-body problem. Didn't understand much, looks cool though.
            </li>
            <li>
              <a
                href="https://github.com/Laluboom/Custom_Extensions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Custom_Extensions
              </a>
              : five browser extensions. Cause I'm lazy.
            </li>
          </ul>
          <p className="mt-4 text-sm">
            More of like this? --&gt;{' '}
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
