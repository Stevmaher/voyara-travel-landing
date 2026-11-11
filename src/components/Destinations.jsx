import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import SmartImage from './SmartImage';
import { destinations } from '../data/travelData';
import { whatsappLink } from '../config';
import { useLang } from '../LanguageContext';

export default function Destinations() {
  const { t } = useLang();
  const d = t.destinations;
  return (
    <section id="destinations" className="bg-sand py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">{d.eyebrow}</span>
          <h2 className="section-title">{d.title}</h2>
          <p className="mt-4 text-lg leading-8 text-muted">{d.subtitle}</p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((item, i) => {
            const text = d.items[item.id];
            return (
              <Reveal as="li" key={item.id} delay={i * 0.07}>
                <a
                  href={whatsappLink(`${t.search.message(`${text.name} (${text.country})`, '—', 2)}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${d.cta}: ${text.name}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-navy shadow-soft"
                >
                  <SmartImage src={item.image} fallback={item.fallback} alt={`${text.name} — ${text.country}`} className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-transparent transition-opacity duration-500 group-hover:from-navy/95" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal">{text.country}</p>
                    <h3 className="mt-1 text-2xl font-bold">{text.name}</h3>
                    <p className="mt-2 max-h-0 overflow-hidden text-sm leading-6 text-white/85 opacity-0 transition-all duration-500 group-hover:max-h-28 group-hover:opacity-100 group-focus-visible:max-h-28 group-focus-visible:opacity-100 max-md:max-h-28 max-md:opacity-100">
                      {text.description}
                    </p>
                  </div>
                  <span className="absolute end-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 text-white backdrop-blur-sm transition group-hover:bg-teal group-hover:border-teal">
                    <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
