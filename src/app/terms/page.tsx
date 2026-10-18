export default function TermsPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="mb-2 text-4xl">Terms of Service</h1>
          <p className="text-sm">Last updated: 2026-10-18</p>
        </div>

        <p>
          This page sets out terms for two separate things under one roof: this
          portfolio site, which is Visesh Akbari&apos;s personal portfolio, and{' '}
          <strong>Laluboom Foreman</strong>, a personal
          automation tool he built and operates for his own private use.
          Foreman&apos;s OAuth-compliance home page — the small, separate site
          Google&apos;s consent screen checks for domain ownership — lives at{' '}
          <a
            href="https://stalklalu.com"
            target="_blank"
            rel="noreferrer"
          >
            stalklalu.com
          </a>
          , not here. This portfolio is deployed on its own domain, separate
          from stalklalu.com and still being finalized. These terms cover both
          the portfolio and Foreman.
        </p>

        <hr />

        <div className="box">
          <h2 className="mb-3 text-xl">The portfolio site</h2>
          <p>
            Everything here — write-ups, project pages, demos — is provided as-is,
            for personal and informational purposes, with no warranty of any kind.
            Code samples and project write-ups may be incomplete, experimental, or
            describe work still in progress; nothing here is offered as a supported
            product or service. Links to external sites and GitHub repositories are
            provided for reference and are not endorsements of, or representations
            about, anything beyond the developer&apos;s own control.
          </p>
        </div>

        <div className="box">
          <h2 className="mb-3 text-xl">Laluboom Foreman</h2>
          <p>
            Foreman has exactly one user: its own developer. It is not available for
            sign-up, has no other accounts, and is not offered as a service to anyone
            else. Its use of Google user data is governed by the{' '}
            <a href="/privacy">
              privacy policy
            </a>
            . Because it has no other users, these terms exist mainly to satisfy
            Google&apos;s OAuth consent screen requirements rather than to govern any
            third party&apos;s use of the tool.
          </p>
        </div>

        <div className="box">
          <h2 className="mb-3 text-xl">Changes</h2>
          <p>
            These terms may be updated if the site&apos;s content or Foreman&apos;s
            scope changes. The &quot;Last updated&quot; date above reflects the most
            recent revision.
          </p>
        </div>

        <hr />

        <p className="text-sm">
          Contact:{' '}
          <a href="mailto:viseshakbari2005@gmail.com">
            viseshakbari2005@gmail.com
          </a>
        </p>
      </section>
    </main>
  );
}
