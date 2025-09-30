import Hero from './home/Hero';
import Features from './home/Features';
import FAQ from './home/FAQ';

export default function Home() {
  return (
    <main>
      <section id="hero"><Hero /></section>
      <section id="features"><Features /></section>
      <section id="faq"><FAQ /></section>
    </main>
  );
}
