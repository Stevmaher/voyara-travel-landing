import Reveal from './Reveal';
import { features } from '../data/travelData';
import { useLang } from '../LanguageContext';

export default function WhyChooseUs() {
  const { t } = useLang();
  const w = t.why;
  return (
    <section id="about" className="bg-sand py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">{w.eyebrow}</span>
          <h2 className="section-title">{w.title}</h2>
          <p className="mt-4 text-lg leading-8 text-muted">{w.subtitle}</p>
        </Reveal>

        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {features.map(({ id, icon: Icon }, i) => (
            <Reveal as="li" key={id} delay={i * 0.07} className="border-t border-navy/15 pt-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white">
                <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-navy">{w.items[id].title}</h3>
              <p className="mt-2 leading-7 text-muted">{w.items[id].description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
