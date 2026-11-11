import { MessageCircle } from 'lucide-react';
import Reveal from './Reveal';
import SmartImage from './SmartImage';
import { heroImage } from '../data/travelData';
import { whatsappLink } from '../config';
import { useLang } from '../LanguageContext';

export default function CTA() {
  const { t } = useLang();
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-navy py-24 text-white sm:py-32">
      <SmartImage src={heroImage.src} fallback={heroImage.fallback} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 -z-10 bg-navy/75" />
      <Reveal className="container-x text-center">
        <h2 className="text-shadow mx-auto max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">{t.cta.title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/85">{t.cta.description}</p>
        <a href={whatsappLink(t.cta.message)} target="_blank" rel="noopener noreferrer" className="btn-solid mt-9 !px-8 !py-4 text-base">
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          {t.cta.button}
        </a>
      </Reveal>
    </section>
  );
}
