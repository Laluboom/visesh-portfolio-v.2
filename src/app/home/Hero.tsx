export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-dvh px-4 text-center">
      <h1 className="text-7xl font-bold uppercase sm:text-9xl">Lalu Boom</h1>

      <p className="mt-8 max-w-xl text-lg">
        This site exists because I needed a domain to verify some cloud API requests.
      </p>
      <p className="mt-2 text-sm text-[color:var(--muted)]">
        PS: Try not to complaint too much, not that I'm listening
      </p>

      {/*
        Both halves are server-rendered and one is hidden in CSS, by pointer
        type and by data-lights. Deciding this in React would either mismatch
        on hydration or land after Darkroom has already measured the layout,
        and the switch would get placed on top of this line.
      */}
      <p className="hint mt-6 text-sm text-[color:var(--muted)]">
        find the light switch using the glass{' '}
        <span className="hint-coarse">(drag it from the handle)</span>
        <span className="hint-fine">(your cursor is the glass)</span>
      </p>
    </section>
  );
}
