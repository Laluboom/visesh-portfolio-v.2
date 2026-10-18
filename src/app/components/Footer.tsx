import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="px-6 py-8 text-sm text-gray-500 border-t border-white/10 bg-black">
      <div className="flex flex-col items-center justify-between gap-4 mx-auto max-w-6xl sm:flex-row">
        <Link href="/" className="transition-colors hover:text-white">
          Visesh Akbari
        </Link>

        <div className="flex gap-6">
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-white">
            Terms
          </Link>
        </div>

        <p>&copy; {new Date().getFullYear()} Visesh Akbari</p>
      </div>
    </footer>
  );
}
