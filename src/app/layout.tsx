import './styles/globals.css';
import Navbar from './components/Navbar';
import NotesSheet from './components/NotesSheet';

export const metadata = {
  title: 'Lalu Boom',
  description: "Lalu Boom's portfolio. A pile of real projects, mostly code.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <NotesSheet />
      </body>
    </html>
  );
}
