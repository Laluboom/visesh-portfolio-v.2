import './styles/globals.css';
import Navbar from './components/Navbar';
import NotesSheet from './components/NotesSheet';
import Darkroom from './components/Darkroom';
import SpamAd from './components/SpamAd';

/*
  opengraph-image.png and twitter-image.png sit next to this file and Next
  picks them up by name. They are the home page as a stranger first sees it:
  lights off, the glass parked in the middle, shot on a phone. metadataBase
  is what turns those into the absolute URLs a link preview needs.
*/
export const metadata = {
  metadataBase: new URL('https://stalklalu.com'),
  title: 'Lalu Boom',
  description: "Lalu Boom's portfolio. A pile of real projects, mostly code and sarcasm.",
  openGraph: {
    title: 'Lalu Boom',
    description: 'The lights are off. Find the switch.',
    url: 'https://stalklalu.com',
    siteName: 'stalklalu',
    type: 'website',
  },
  twitter: {
    /*
      summary, not summary_large_image: the card is the phone screen, and the
      wide card would slice a 375 by 812 image down to a letterbox strip.
    */
    card: 'summary',
    title: 'Lalu Boom',
    description: 'The lights are off. Find the switch.',
  },
};

/*
  Runs before the first paint. Without it the page flashes dark on every
  navigation for anyone who has already found the light switch.

  <html> carries suppressHydrationWarning because of it: the script flips
  data-lights before React hydrates, so the server's "off" and the client's
  "on" disagree by design. It covers that element's own attributes only.
*/
const lights = `try{if(sessionStorage.getItem('lights')==='on')document.documentElement.dataset.lights='on'}catch(e){}document.documentElement.dataset.spam=Math.random()<0.5?'left':'right'`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-lights="off" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: lights }} />
      </head>
      <body>
        <Navbar />
        {children}
        <NotesSheet />
        <SpamAd />
        <Darkroom />
      </body>
    </html>
  );
}
