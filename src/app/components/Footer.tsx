import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="px-4 py-5 mt-16 border-t-2 border-black">
      <div className="flex flex-col items-center justify-between gap-2 mx-auto max-w-6xl sm:flex-row">
        <span>&copy; {new Date().getFullYear()} Visesh Akbari</span>
        <div className="flex gap-2">
          <Link href="/privacy">Privacy</Link>
          <span>|</span>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
