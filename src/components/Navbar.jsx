import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import Logo from './Logo';
import { navItems } from '../data/travelData';
import { useLang } from '../LanguageContext';

function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return scrolled;
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export default function Navbar() {
  const { t, toggleLang } = useLang();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const active = useActiveSection(navItems);

  // Close the mobile menu with Escape and lock page scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkClass = (id) =>
    `relative py-1 text-[0.95rem] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-center after:bg-teal after:transition-transform ${
      active === id ? 'text-white after:scale-x-100' : 'text-white/80 after:scale-x-0 hover:text-white hover:after:scale-x-100'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-all duration-300 ${
        scrolled || open ? 'bg-navy/90 shadow-lg backdrop-blur-md' : 'bg-black/20 backdrop-blur-[2px]'
      }`}
    >
      <nav aria-label={t.a11y.mainNav} className="container-x flex h-16 items-center justify-between sm:h-[4.25rem]">
        <a href="#home" aria-label={t.a11y.logo} className="text-white">
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navItems.map((id) => (
            <li key={id}>
              <a href={`#${id}`} className={linkClass(id)} aria-current={active === id ? 'true' : undefined}>
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t.nav.switchTo}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/50 px-3 py-1.5 text-sm font-bold tracking-wider transition hover:bg-white hover:text-navy"
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            <span dir="ltr">{t.nav.otherLang}</span>
          </button>
          <a href="#contact" className="btn-outline hidden !py-1.5 sm:inline-flex">
            {t.nav.cta}
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/50 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
          >
            <ul className="container-x flex flex-col py-3">
              {navItems.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={`block border-b border-white/10 py-3.5 text-lg font-semibold ${active === id ? 'text-teal' : 'text-white'}`}
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
              <li className="py-4">
                <a href="#contact" onClick={() => setOpen(false)} className="btn-solid w-full">
                  {t.nav.cta}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
