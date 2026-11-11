import { Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from './SocialIcons';
import { navItems } from '../data/travelData';
import { siteConfig, whatsappLink } from '../config';
import { useLang } from '../LanguageContext';

const socials = [
  { key: 'instagram', Icon: InstagramIcon },
  { key: 'facebook', Icon: FacebookIcon },
  { key: 'youtube', Icon: YoutubeIcon },
];

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const year = new Date().getFullYear().toLocaleString('en-US', { useGrouping: false });
  const linkCls = 'text-white/70 transition hover:text-teal';

  return (
    <footer className="bg-[#0b1f33] text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
        <div>
          <a href="#home" aria-label={t.a11y.logo}><Logo className="h-16" /></a>
          <p className="mt-5 max-w-sm leading-8 text-white/70">{f.about}</p>
        </div>

        <nav aria-label={f.quickLinks}>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-teal">{f.quickLinks}</h3>
          <ul className="mt-5 space-y-3">
            {navItems.map((id) => (
              <li key={id}><a href={`#${id}`} className={linkCls}>{t.nav[id]}</a></li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-teal">{f.contact}</h3>
          <ul className="mt-5 space-y-3 text-white/70">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-teal" aria-hidden="true" />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" dir="ltr" className={linkCls}>{siteConfig.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-teal" aria-hidden="true" />
              <a href={`mailto:${siteConfig.email}`} dir="ltr" className={linkCls}>{siteConfig.email}</a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-teal" aria-hidden="true" />
              {f.address}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-teal">{f.follow}</h3>
          <ul className="mt-5 flex gap-3">
            {socials.map(({ key, Icon }) => (
              <li key={key}>
                <a href={siteConfig.socials[key]} target="_blank" rel="noopener noreferrer" aria-label={f.social[key]} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-teal hover:bg-teal">
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-white/55">
        © {year} VOYARA. {f.rights}
      </div>
    </footer>
  );
}
