import './styles/globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'My App',
  description: 'Next.js with TailwindCSS and navbar',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-gray-800 bg-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
