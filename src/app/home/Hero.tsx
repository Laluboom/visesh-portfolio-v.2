export default function Hero() {
  return (
    <section className="px-4 py-16 border-b-2 border-black">
      <div className="max-w-3xl mx-auto">
        <p className="mb-2">Hi, I'm</p>
        <h1 className="mb-6 text-5xl sm:text-6xl">Visesh Akbari</h1>
        <p className="mb-8 text-lg">
          I build full-stack apps, ML fundamentals from scratch, and automation
          systems — this is where that work lives.
        </p>

        <div className="flex flex-wrap gap-3">
          <a href="/projects" className="btn">
            View Projects
          </a>
          <a href="/contact" className="btn">
            Contact Me
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn">
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}
