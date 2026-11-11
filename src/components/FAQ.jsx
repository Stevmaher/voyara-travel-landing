import { ChevronDown } from 'lucide-react';
import Reveal from './Reveal';
import { useLang } from '../LanguageContext';

export default function FAQ() {
  const { t } = useLang();
  const f = t.faq;
  return (
    <section id="faq" className="bg-white py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-20">
        <Reveal>
          <span className="eyebrow">{f.eyebrow}</span>
          <h2 className="section-title">{f.title}</h2>
          <p className="mt-4 text-lg leading-8 text-muted">{f.subtitle}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {f.items.map(({ q, a }) => (
              <details key={q} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold text-navy [&::-webkit-details-marker]:hidden">
                  {q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-teal transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="pb-5 pe-8 leading-8 text-muted">{a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
