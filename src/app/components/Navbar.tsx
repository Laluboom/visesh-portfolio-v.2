import Link from 'next/link';

const links = [
  { href: '/#features', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/projects', label: 'Projects' },
];

export default function Navbar() {
  return (
    <nav className="border-b-2 border-black">
      <input type="checkbox" id="nav-toggle" className="peer" />

      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold">
          &lt;LaluBoom/&gt;
        </Link>

        <div className="hidden gap-1 sm:flex">
          {links.map(({ href, label }, i) => (
            <span key={label}>
              <Link href={href} className="px-1">
                {label}
              </Link>
              {i < links.length - 1 && <span className="text-black">|</span>}
            </span>
          ))}
        </div>

        <label htmlFor="nav-toggle" className="btn sm:hidden">
          Menu
        </label>
      </div>

      <div className="hidden flex-col gap-2 px-4 pb-4 border-t-2 border-black peer-checked:flex sm:hidden">
        {links.map(({ href, label }) => (
          <Link key={label} href={href} className="pt-2">
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
