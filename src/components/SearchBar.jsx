import { useState } from 'react';
import { Calendar, MapPin, Minus, Plus, Search, Users } from 'lucide-react';
import { destinations } from '../data/travelData';
import { whatsappLink } from '../config';
import { useLang } from '../LanguageContext';

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

const fieldBox =
  'flex items-center gap-3 rounded-xl bg-white px-4 py-2.5 ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-teal';

export default function SearchBar() {
  const { t } = useLang();
  const s = t.search;
  const [dest, setDest] = useState('');
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!dest) next.destination = s.errors.destination;
    if (!date || date < todayISO()) next.date = s.errors.date;
    setErrors(next);
    if (Object.keys(next).length) return;

    const item = t.destinations.items[dest];
    const prettyDate = new Date(`${date}T00:00:00`).toLocaleDateString(t.locale, { day: 'numeric', month: 'long', year: 'numeric' });
    window.open(whatsappLink(s.message(`${item.name} (${item.country})`, prettyDate, travelers)), '_blank', 'noopener,noreferrer');
  };

  const step = (d) => setTravelers((n) => Math.min(20, Math.max(1, n + d)));

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label={s.label}
      className="w-full max-w-5xl rounded-2xl border border-white/25 bg-white/15 p-3 shadow-soft backdrop-blur-md sm:p-4"
    >
      <div className="grid gap-3 md:grid-cols-[1.3fr_1fr_1fr_auto]">
        <label className={fieldBox}>
          <MapPin className="h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-[0.7rem] font-bold uppercase tracking-wider text-muted">{s.destination}</span>
            <select
              value={dest}
              onChange={(e) => setDest(e.target.value)}
              aria-invalid={!!errors.destination}
              className="w-full cursor-pointer bg-transparent text-sm font-semibold text-ink outline-none"
            >
              <option value="">{s.destinationPlaceholder}</option>
              {destinations.map(({ id }) => (
                <option key={id} value={id}>
                  {t.destinations.items[id].name} — {t.destinations.items[id].country}
                </option>
              ))}
            </select>
          </span>
        </label>

        <label className={fieldBox}>
          <Calendar className="h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-[0.7rem] font-bold uppercase tracking-wider text-muted">{s.date}</span>
            <input
              type="date"
              value={date}
              min={todayISO()}
              onChange={(e) => setDate(e.target.value)}
              aria-invalid={!!errors.date}
              className="w-full bg-transparent text-sm font-semibold text-ink outline-none"
            />
          </span>
        </label>

        <div className={fieldBox} role="group" aria-label={s.travelers}>
          <Users className="h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-[0.7rem] font-bold uppercase tracking-wider text-muted">{s.travelers}</span>
            <span className="text-sm font-semibold text-ink" aria-live="polite">
              {travelers.toLocaleString(t.locale)} {s.travelersUnit(travelers)}
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <button type="button" onClick={() => step(-1)} disabled={travelers <= 1} aria-label={s.decrease} className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/20 text-ink transition hover:bg-sand disabled:opacity-30">
              <Minus className="h-3.5 w-3.5" />
            </button>
            <button type="button" onClick={() => step(1)} disabled={travelers >= 20} aria-label={s.increase} className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/20 text-ink transition hover:bg-sand disabled:opacity-30">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </span>
        </div>

        <button type="submit" className="btn-solid min-h-[3.25rem] px-7 text-base">
          <Search className="h-5 w-5" aria-hidden="true" />
          {s.submit}
        </button>
      </div>

      <div className="mt-2 min-h-[1.25rem] px-1 text-xs" role="alert">
        {errors.destination || errors.date ? (
          <span className="font-semibold text-[#ffd9a8]">{[errors.destination, errors.date].filter(Boolean).join(' ')}</span>
        ) : (
          <span className="text-white/75">{s.hint}</span>
        )}
      </div>
    </form>
  );
}
