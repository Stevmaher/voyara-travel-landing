import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Packages from './components/Packages';
import WhyChooseUs from './components/WhyChooseUs';
import FAQ from './components/FAQ';
import WhatsAppButton from './components/WhatsAppButton';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { useLang } from './LanguageContext';

export default function App() {
  const { t } = useLang();
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-navy"
      >
        {t.a11y.skip}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Destinations />
        <Packages />
        <WhyChooseUs />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
