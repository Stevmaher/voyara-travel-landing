import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Clock, MessageCircle, Moon, X } from 'lucide-react';
import Reveal from './Reveal';
import SmartImage from './SmartImage';
import { packages } from '../data/travelData';
import { whatsappLink } from '../config';
import { useLang } from '../LanguageContext';

const useMoney = () => {
  const { t } = useLang();
  return (n) => new Intl.NumberFormat(t.locale, { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(n);
};

function Badge({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1 text-xs font-bold text-ink">
      <Icon className="h-3.5 w-3.5 text-teal" aria-hidden="true" />
      {children}
    </span>
  );
}

function DetailsModal({ pkg, onClose }) {
  const { t } = useLang();
  const money = useMoney();
  const p = t.packages;
  const text = p.items[pkg.id];
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-navy/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${p.details}: ${text.title}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white sm:rounded-3xl"
      >
        <button ref={closeRef} type="button" onClick={onClose} aria-label={p.close} className="absolute end-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy shadow transition hover:bg-white">
          <X className="h-5 w-5" />
        </button>
        <SmartImage src={pkg.image} fallback={pkg.fallback} alt={text.title} className="h-56 w-full object-cover sm:h-64" />
        <div className="p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-navy">{text.title}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge icon={Clock}>{p.days(pkg.days.toLocaleString(t.locale))}</Badge>
            <Badge icon={Moon}>{p.nights(pkg.nights.toLocaleString(t.locale))}</Badge>
          </div>
          <p className="mt-4 leading-8 text-muted">{text.description}</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-teal">{p.highlights}</h4>
              <ul className="mt-3 space-y-2 text-sm text-ink">
                {text.highlights.map((h) => (
                  <li key={h} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />{h}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-teal">{p.includes}</h4>
              <ul className="mt-3 space-y-2 text-sm text-ink">
                {text.includes.map((h) => (
                  <li key={h} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />{h}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6">
            <div>
              <p className="text-xs text-muted">{p.from} · {p.perPerson}</p>
              <p className="text-2xl font-bold text-navy">{money(pkg.priceEGP)}</p>
              <p className="text-xs text-muted">{p.note}</p>
            </div>
            <a href={whatsappLink(p.inquiryMessage(text.title))} target="_blank" rel="noopener noreferrer" className="btn-solid">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {p.inquire}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Packages() {
  const { t } = useLang();
  const money = useMoney();
  const p = t.packages;
  const [selected, setSelected] = useState(null);

  return (
    <section id="packages" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">{p.eyebrow}</span>
          <h2 className="section-title">{p.title}</h2>
          <p className="mt-4 text-lg leading-8 text-muted">{p.subtitle}</p>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, i) => {
            const text = p.items[pkg.id];
            return (
              <Reveal as="li" key={pkg.id} delay={i * 0.08} className="flex">
                <article className="group flex w-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-24px_rgba(16,42,67,.45)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-navy">
                    <SmartImage src={pkg.image} fallback={pkg.fallback} alt={text.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap gap-2">
                      <Badge icon={Clock}>{p.days(pkg.days.toLocaleString(t.locale))}</Badge>
                      <Badge icon={Moon}>{p.nights(pkg.nights.toLocaleString(t.locale))}</Badge>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-navy">{text.title}</h3>
                    <p className="mt-2 flex-1 leading-7 text-muted">{text.description}</p>
                    <div className="mt-6 flex items-end justify-between gap-3 border-t border-ink/10 pt-5">
                      <div>
                        <p className="text-xs text-muted">{p.from} · {p.perPerson}</p>
                        <p className="text-xl font-bold text-navy">{money(pkg.priceEGP)}</p>
                      </div>
                      <button type="button" onClick={() => setSelected(pkg)} className="inline-flex items-center rounded-lg border border-navy px-4 py-2.5 text-sm font-bold text-navy transition hover:bg-navy hover:text-white" dir="ltr">
                        {p.viewDetails}
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>

      <AnimatePresence>{selected && <DetailsModal pkg={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  );
}
