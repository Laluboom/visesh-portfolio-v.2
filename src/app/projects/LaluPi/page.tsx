export default function LaluPiPage() {
  return (
    <main className="min-h-screen px-6 py-16 text-white bg-black">
      <section className="max-w-3xl mx-auto">
        <h1 className="mb-2 text-4xl font-bold">🤖 LaluPi</h1>
        <p className="mb-10 text-gray-400">
          A Discord-driven multi-agent automation system that runs my own
          corner of the internet — email, calendar, PR review, and more —
          with a human in the loop on anything that matters.
        </p>

        <div className="space-y-6 text-gray-300">
          <p>
            Foreman is the core of it: a set of small, single-purpose Python
            agents (a briefer, a doer, a validator, a PR watch, a login
            watchdog) that read a shared append-only ledger instead of each
            inventing their own state, and report into Discord rather than
            acting silently. A 4-tier LLM provider cascade (two Antigravity
            accounts, then Groq, then OpenRouter&apos;s free tier) means a
            single provider outage degrades a summary rather than breaking
            the run.
          </p>

          <p>
            Keeping Gmail and Calendar access working reliably turned into
            its own small project: Google auto-expires an unverified app&apos;s
            refresh tokens every 7 days unless the OAuth consent screen is
            published to production, which itself requires a domain you can
            prove you own. That&apos;s what{' '}
            <a
              href="https://stalklalu.com"
              target="_blank"
              rel="noreferrer"
              className="underline text-white hover:text-gray-300"
            >
              stalklalu.com
            </a>{' '}
            is for — a small home page and the{' '}
            <a
              href="https://stalklalu.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="underline text-white hover:text-gray-300"
            >
              privacy policy
            </a>{' '}
            Google&apos;s consent screen checks, hosted free on Cloudflare
            Pages now that the domain exists anyway.
          </p>

          <p>
            Everything here runs on a home server under systemd timers, with
            a test suite (500+ tests) covering the parts that would
            otherwise fail silently — provider fallbacks, alert
            deduplication, escalation after repeated failures, and the usual
            edge cases around &quot;the API returned nothing&quot; meaning
            two very different things.
          </p>
        </div>
      </section>
    </main>
  );
}
