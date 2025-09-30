export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-16 text-white bg-black">
      <section className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-2 text-4xl font-bold">👋 About Me</h1>
          <p className="max-w-xl mx-auto text-lg text-gray-400">
            I'm a passionate full-stack developer who loves solving problems with code.
            Below is a little more about who I am and what I do.
          </p>
        </div>

        {/* Two-Column Block */}
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="p-6 bg-[#111] rounded-xl border border-white/10 hover:border-white/20 transition">
            <h2 className="mb-2 text-2xl font-semibold">💻 My Background</h2>
            <p className="text-gray-400">
              I started programming in my early teens. What began as curiosity turned into a deep love for building things—from small tools to complete web platforms. I've dabbled in game development, UI design, and AI.
            </p>
          </div>

          <div className="p-6 bg-[#111] rounded-xl border border-white/10 hover:border-white/20 transition">
            <h2 className="mb-2 text-2xl font-semibold">🧠 Philosophy</h2>
            <p className="text-gray-400">
              I believe simplicity wins. Whether in code or design, my goal is always to build with purpose and elegance. I'm also deeply influenced by open source and the beauty of shared knowledge.
            </p>
          </div>
        </div>

        {/* Horizontal Feature Strip */}
        <div className="flex flex-col gap-6 mt-8 md:flex-row">
          {['Creativity', 'Curiosity', 'Collaboration'].map((item, idx) => (
            <div
              key={idx}
              className="flex-1 p-6 bg-[#181818] rounded-xl border border-white/10 hover:scale-105 transition-transform duration-300"
            >
              <h3 className="mb-2 text-xl font-semibold">✨ {item}</h3>
              <p className="text-sm text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis autem vel eum iure reprehenderit.
              </p>
            </div>
          ))}
        </div>

        {/* Personal Note Block */}
        <div className="p-8 mt-12 bg-gradient-to-br from-[#111] to-[#222] rounded-xl border border-white/10 shadow-inner">
          <h2 className="mb-4 text-2xl font-bold">🗒️ A Quick Note</h2>
          <p className="text-gray-300">
            This portfolio is a reflection of my passion and persistence. Whether you're a client, a fellow dev, or just passing by—thank you for visiting. You’re always welcome to get in touch.
          </p>
        </div>
      </section>
    </main>
  );
}
