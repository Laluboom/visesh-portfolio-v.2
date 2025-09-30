import Link from 'next/link';

const links = [
  { href: '/#features', icon: '✨', label: 'Features' },
  { href: '/#faq', icon: '❓', label: 'FAQ' },
  { href: '/about', icon: '👤', label: 'About' },
  { href: '/contact', icon: '✉️', label: 'Contact' },
  { href: '/projects', icon: '📁', label: 'Projects' },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between p-6 text-white bg-black border-b shadow-xl backdrop-blur-md border-white/10">
      <Link
        href="/"
        className="text-3xl font-bold tracking-wide transition-transform hover:scale-105"
      >
        🧠 Portfolio
      </Link>

      <div className="flex gap-8 text-lg font-medium">
        {links.map(({ href, icon, label }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-2 transition-transform group hover:scale-105"
          >
            <span className="text-xl">{icon}</span>
            <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all group-hover:after:w-full">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}