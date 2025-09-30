export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center text-white bg-black">
      <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-6xl">
        👋 Hi, I'm <span className="text-gradient">Visesh</span>
      </h1>
      <p className="max-w-2xl mb-10 text-lg text-gray-300 sm:text-xl">
        I'm a student. Welcome to my digital portfolio.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <a href="/projects" className="px-6 py-3 text-white transition-all duration-300 border border-white rounded-lg hover:bg-white hover:text-black">
          🚀 View Projects
        </a>
        <a href="/contact" className="px-6 py-3 text-black transition-all duration-300 bg-white rounded-lg hover:bg-gray-200">
          📬 Contact Me
        </a>
      </div>
    </section>
  );
}
