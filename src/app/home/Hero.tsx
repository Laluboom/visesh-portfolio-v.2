export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-7xl font-bold uppercase sm:text-9xl">Lalu Boom</h1>

      <p className="mt-8 max-w-xl text-lg">
        This site exists because I needed a domain to verify some cloud API requests.
      </p>
      <p className="mt-2 text-sm text-[color:var(--muted)]">
        PS: Try not to complaint too much, not that I'm listening
      </p>
    </section>
  );
}
