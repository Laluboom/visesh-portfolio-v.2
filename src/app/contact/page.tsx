const EMAIL = 'viseshakbari2005@gmail.com';

export default function ContactPage() {
  return (
    <main className="px-6 py-16">
      <section className="max-w-3xl mx-auto space-y-12">
        <div className="pb-8">
          <h1 className="text-4xl">Get in Touch</h1>
          <p className="text-lg">
            Email me directly, or check out my work on GitHub.
            {/* TODO(lalu): add real availability/what you're open to, e.g. freelance, full-time, collab */}
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-6 sm:grid-cols-3">
          <a href={`mailto:${EMAIL}`} className="box block">
            <div className="mb-1">Email Me</div>
            <div className="text-sm">{EMAIL}</div>
          </a>

          <a
            href="https://github.com/Laluboom"
            target="_blank"
            rel="noopener noreferrer"
            className="box block"
          >
            <div className="mb-1">GitHub</div>
            <div className="text-sm">github.com/Laluboom</div>
          </a>

          <a
            href="https://www.linkedin.com/in/viseshakbari/"
            target="_blank"
            rel="noopener noreferrer"
            className="box block"
          >
            <div className="mb-1">LinkedIn</div>
            <div className="text-sm">in/viseshakbari</div>
          </a>
        </div>
      </section>
    </main>
  );
}
