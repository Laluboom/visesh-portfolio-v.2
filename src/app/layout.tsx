import './styles/globals.css';
import Navbar from './components/Navbar';
import NotesSheet from './components/NotesSheet';
import Darkroom from './components/Darkroom';

export const metadata = {
  title: 'Lalu Boom',
  description: "Lalu Boom's portfolio. A pile of real projects, mostly code and sarcasm.",
};

/*
  Runs before the first paint. Without it the page flashes dark on every
  navigation for anyone who has already found the light switch.
*/
const lights = `try{if(sessionStorage.getItem('lights')==='on')document.documentElement.dataset.lights='on'}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-lights="off">
      <head>
        <script dangerouslySetInnerHTML={{ __html: lights }} />
      </head>
      <body>
        <Navbar />
        {children}
        <NotesSheet />
        <Darkroom />
      </body>
    </html>
  );
}
