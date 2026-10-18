export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="mb-2 text-4xl">Privacy Policy for Laluboom Foreman</h1>
          <p className="text-sm">Last updated: 2026-10-18</p>
        </div>

        <p>
          Laluboom Foreman (&quot;Foreman&quot;) is a personal automation tool built,
          operated, and used exclusively by its developer, Lalu Boom. It has no
          other users, no customers, and no public sign-up. This policy describes how
          Foreman handles the developer&apos;s own Google account data, since it
          requests access to Gmail and Google Calendar under Google&apos;s OAuth
          framework.
        </p>

        <hr />

        <div className="box">
          <h2 className="mb-3 text-xl">What data Foreman accesses</h2>
          <p className="mb-3">
            Foreman connects to a small, fixed set of Google accounts that the
            developer personally owns and controls. Specifically, it accesses:
          </p>
          <ul className="pl-5 space-y-2 list-disc">
            <li>
              <strong>Gmail (read-only):</strong> message
              metadata, subject lines, and short snippets of recent inbox messages, in
              order to identify mail worth a human&apos;s attention.
            </li>
            <li>
              <strong>
                Google Calendar (read, and create/update/delete of events):
              </strong>{' '}
              upcoming event details (title, time, location, description), in order to
              generate reminders and to let the developer create or modify calendar
              events through the tool.
            </li>
          </ul>
          <p className="mt-3">
            Foreman never reads, sends, or deletes email, and never modifies Gmail
            labels or settings.
          </p>
        </div>

        <div className="box">
          <h2 className="mb-3 text-xl">How this data is used</h2>
          <p>
            Data is used solely to generate the developer&apos;s own personal
            reminders and summaries, like a notification that a new email looks worth
            reading, or a reminder that a calendar event is starting soon. All output
            is delivered only to the developer himself, through his own private
            Discord server and personal messaging (WhatsApp). No other person or
            account receives any output derived from this data.
          </p>
        </div>

        <div className="box">
          <h2 className="mb-3 text-xl">Data sharing</h2>
          <p>
            Foreman does not share, sell, transfer, or otherwise disclose Google user
            data to any third party. Data is not used for advertising or marketing, is
            not sold or passed to data brokers, is not used to train or improve any AI
            or machine-learning model, and is not used for credit assessment or lending
            decisions of any kind. The only destinations for any derived output are
            the developer&apos;s own Discord server and his own messaging account,
            both of which he exclusively controls.
          </p>
        </div>

        <div className="box">
          <h2 className="mb-3 text-xl">
            Data storage, retention, and security
          </h2>
          <p className="mb-3">
            Foreman runs entirely on infrastructure the developer personally owns and
            operates. OAuth credentials are stored locally in a permissions-restricted
            configuration file on that infrastructure and are never transmitted
            anywhere except directly to Google&apos;s own token endpoint to
            authenticate API calls.
          </p>
          <p>
            Foreman stores, locally only, the minimum state needed to avoid duplicate
            notifications: internal message and event identifiers already seen. It
            does not permanently store email or calendar content itself. Stored
            identifiers are retained only as long as the tool remains in active use and
            are deleted if the tool is decommissioned.
          </p>
        </div>

        <div className="box">
          <h2 className="mb-3 text-xl">Revoking access</h2>
          <p>
            Because this application has only one user, its own developer, he can
            revoke its access at any time via his Google Account&apos;s{' '}
            <a
              href="https://myaccount.google.com/permissions"
              target="_blank"
              rel="noreferrer"
            >
              Security &gt; Third-party access
            </a>{' '}
            settings.
          </p>
        </div>

        <hr />

        <p className="text-sm">
          This policy may be updated if the application&apos;s data access or use
          changes. The &quot;Last updated&quot; date above reflects the most recent
          revision.
        </p>

        <p className="text-sm">
          <a href="mailto:viseshakbari2005@gmail.com">Developer contact</a>
        </p>
      </section>
    </main>
  );
}
