import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import SearchBar from './SearchBar';
import SmartImage from './SmartImage';
import { heroImage } from '../data/travelData';
import { useLang } from '../LanguageContext';

export default function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const fade = (delay) =>
    reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } };

  return (
    <section id="home" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy text-white">
      <SmartImage src={heroImage.src} fallback={heroImage.fallback} alt="" eager className="absolute inset-0 -z-20 h-full w-full object-cover" />
      {/* Dark veil: keeps the photo visible while the copy stays readable */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/60 via-navy/20 to-navy/85" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/55 via-transparent to-transparent rtl:bg-gradient-to-l" />

      <div className="container-x flex w-full flex-col gap-10 pb-10 pt-32 sm:pb-14 lg:gap-14 lg:pt-40">
        <div className="max-w-2xl">
          <motion.p {...fade(0.05)} className="text-shadow text-xl font-medium text-white/90 sm:text-2xl">
            {t.hero.eyebrow}
          </motion.p>
          <motion.h1 {...fade(0.15)} className="text-shadow mt-2 text-[2.6rem] font-bold leading-[1.15] sm:text-6xl lg:text-7xl">
            {t.hero.title}
          </motion.h1>
          <motion.p {...fade(0.3)} className="text-shadow mt-5 max-w-xl text-base leading-8 text-white/90 sm:text-lg">
            {t.hero.description}
          </motion.p>
          <motion.div {...fade(0.45)} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#destinations" className="btn-outline">
              {t.hero.primary}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </a>
            <a href="#packages" className="inline-flex items-center gap-2 px-3 py-3 text-sm font-semibold text-white/90 underline decoration-teal decoration-2 underline-offset-8 transition hover:text-white">
              {t.hero.secondary}
            </a>
          </motion.div>
        </div>

        <motion.div {...fade(0.6)} className="w-full">
          <SearchBar />
        </motion.div>
      </div>
    </section>
  );
}
