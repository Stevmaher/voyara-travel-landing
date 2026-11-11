import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../config';
import { useLang } from '../LanguageContext';

// Floating WhatsApp shortcut. Appears after the visitor scrolls past the first screen.
export default function WhatsAppButton() {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={whatsappLink(t.cta.message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.floatingWhatsapp}
      tabIndex={show ? 0 : -1}
      className={`group fixed bottom-5 end-5 z-40 flex items-center gap-2 rounded-full bg-teal py-3.5 pe-4 ps-4 text-white shadow-soft transition duration-300 hover:bg-teal-dark sm:bottom-7 sm:end-7 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:opacity-100 group-focus-visible:max-w-[10rem] group-focus-visible:opacity-100">
        {t.floatingWhatsapp}
      </span>
    </a>
  );
}
