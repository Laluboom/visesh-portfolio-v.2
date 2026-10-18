export default function TermsPage() {
  return (
    <main className="min-h-screen px-6 py-16 text-white bg-black">
      <section className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="mb-2 text-4xl font-bold">Terms of Service</h1>
          <p className="text-sm text-gray-500">Last updated: 2026-10-18</p>
        </div>

        <p className="text-gray-300">
          This site (stalklalu.com) is Visesh Akbari&apos;s personal portfolio, and
          also serves as the home page and privacy policy reference for{' '}
          <strong className="text-gray-200">Laluboom Foreman</strong>, a personal
          automation tool he built and operates for his own private use. These terms
          cover both.
        </p>

        <div className="p-6 bg-[#111] rounded-xl border border-white/10">
          <h2 className="mb-3 text-xl font-semibold">The portfolio site</h2>
          <p className="text-gray-400">
            Everything here — write-ups, project pages, demos — is provided as-is,
            for personal and informational purposes, with no warranty of any kind.
            Code samples and project write-ups may be incomplete, experimental, or
            describe work still in progress; nothing here is offered as a supported
            product or service. Links to external sites and GitHub repositories are
            provided for reference and are not endorsements of, or representations
            about, anything beyond the developer&apos;s own control.
          </p>
        </div>

        <div className="p-6 bg-[#111] rounded-xl border border-white/10">
          <h2 className="mb-3 text-xl font-semibold">Laluboom Foreman</h2>
          <p className="text-gray-400">
            Foreman has exactly one user: its own developer. It is not available for
            sign-up, has no other accounts, and is not offered as a service to anyone
            else. Its use of Google user data is governed by the{' '}
            <a href="/privacy" className="underline text-white hover:text-gray-300">
              privacy policy
            </a>
            . Because it has no other users, these terms exist mainly to satisfy
            Google&apos;s OAuth consent screen requirements rather than to govern any
            third party&apos;s use of the tool.
          </p>
        </div>

        <div className="p-6 bg-[#111] rounded-xl border border-white/10">
          <h2 className="mb-3 text-xl font-semibold">Changes</h2>
          <p className="text-gray-400">
            These terms may be updated if the site&apos;s content or Foreman&apos;s
            scope changes. The &quot;Last updated&quot; date above reflects the most
            recent revision.
          </p>
        </div>

        <p className="text-sm text-gray-500">
          Contact:{' '}
          <a
            href="mailto:viseshakbari2005@gmail.com"
            className="underline hover:text-gray-300"
          >
            viseshakbari2005@gmail.com
          </a>
        </p>
      </section>
    </main>
  );
}
