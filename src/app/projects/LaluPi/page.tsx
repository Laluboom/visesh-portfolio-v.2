export default function LaluPiPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-3xl mx-auto">
        <h1 className="mb-2 text-4xl">🤖 LaluPi</h1>
        <p className="mb-10">
          A Discord-driven multi-agent automation system that runs my own
          corner of the internet — email, calendar, PR review, and more —
          with every write action gated behind a 👍 Discord reaction before
          it&apos;s allowed to run.
        </p>

        <hr />

        <div className="space-y-6">
          <p>
            Foreman is the core of it: a set of small, single-purpose Python
            agents (a briefer, a doer, a validator, a PR watch, a login
            watchdog) that read and write a shared append-only ledger,{' '}
            <code>runlog.jsonl</code>, instead of each inventing their own
            state, and report into Discord rather than acting silently. A
            4-tier LLM provider cascade (two Antigravity CLI accounts —
            &quot;agy&quot; and &quot;agy-rainy&quot; — then Groq, then
            OpenRouter restricted to free-tier models only) means a single
            provider outage degrades a summary rather than breaking the run.
          </p>

          {/* TODO(visesh): add a real screenshot of Foreman's Discord output here */}

          <div className="box">
            <h2 className="mb-3 text-xl">
              What each agent actually does
            </h2>
            <ul className="pl-5 space-y-3 list-disc">
              <li>
                <strong>Briefer</strong> — runs
                daily at 07:30 and proposes a ranked list of tasks in
                Discord. It doesn&apos;t touch anything itself; it just makes
                the case for what&apos;s worth doing next.
              </li>
              <li>
                <strong>Doer</strong> — implements
                exactly one task per run, and only after it&apos;s cleared
                the gate: a 👍 Discord reaction from me on the briefer&apos;s
                proposal. No reaction, no code gets touched.
              </li>
              <li>
                <strong>Validator</strong> — every
                3 days, audits the health of Foreman itself — the system,
                not the project code it manages — and posts the result to a
                dedicated #system-health Discord channel.
              </li>
              <li>
                <strong>PR watch</strong> — runs
                nightly, fully mechanical, no model calls involved. It just
                counts open PRs and flags when the backlog is growing.
              </li>
              <li>
                <strong>Login watchdog</strong> —
                checks auth health across all 5 providers every 30 minutes.
                Alerting is edge-triggered: it only fires on a
                healthy-to-broken transition, not on every failed check, so
                a persistent outage doesn&apos;t turn into a Discord spam
                cannon.
              </li>
            </ul>
            <p className="mt-4">
              Two more pieces hold the rest of it together: an escalation
              circuit-breaker that refuses to retry a task after 3
              consecutive failures on it — burning budget retrying a broken
              contract helps no one, so it stops and waits for a human
              instead — and a shared <code>alert_lib.py</code> that combines
              and deduplicates alerts with per-key cooldowns, so the five
              agents above aren&apos;t all separately racing to spam the same
              Discord channel about the same problem.
            </p>
          </div>

          <p>
            Keeping Gmail and Calendar access working reliably turned into
            its own small project: Google auto-expires an unverified
            app&apos;s refresh tokens every 7 days unless the OAuth consent
            screen is published to production, which itself requires a
            domain you can prove you own. I didn&apos;t have a spare domain
            sitting around that I trusted handing to a background script, so
            the actual fix was to buy an entire domain — for the sole purpose
            of satisfying one checkbox in Google&apos;s API console.
            That&apos;s what{' '}
            <a
              href="https://stalklalu.com"
              target="_blank"
              rel="noreferrer"
            >
              stalklalu.com
            </a>{' '}
            is: a small, standalone page with the{' '}
            <a
              href="https://stalklalu.com/privacy"
              target="_blank"
              rel="noreferrer"
            >
              privacy policy
            </a>{' '}
            Google&apos;s consent screen checks, hosted free on Cloudflare
            Pages, that exists for no reason other than &quot;Google
            wouldn&apos;t let my calendar bot keep working otherwise.&quot;
          </p>

          <p>
            Everything here runs on a home server under systemd timers, with
            a test suite (565+ tests) covering the parts that would
            otherwise fail silently — provider fallbacks, alert
            deduplication, escalation after repeated failures, and the usual
            edge cases around &quot;the API returned nothing&quot; meaning
            two very different things.
          </p>

          <p>
            The repo backing all of this,{' '}
            <strong>Laluboom/agent-system</strong>,
            is private — it touches personal credentials and home-server
            infrastructure directly, so it stays off the public internet
            rather than becoming a liability.
          </p>
        </div>
      </section>
    </main>
  );
}
