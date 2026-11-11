# VOYARA — Travel Agency Landing Page

React 19 + Tailwind CSS 3 + Parcel 2. Arabic (RTL, default) and English (LTR). No backend.

## Run
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build in dist/
```

## Edit
| What | Where |
|---|---|
| WhatsApp number, phone, email, social links | `src/config.js` (`whatsappNumber`: digits only, e.g. `201000000000`) |
| Prices (EGP), days/nights, images, destinations | `src/data/travelData.js` |
| All Arabic / English text | `src/locales/ar.js`, `src/locales/en.js` (keep both files in the same shape) |
| Colors and fonts | `tailwind.config.js` |
| Local images / fallbacks | `public/images/` |

### Images
Photos load from Unsplash. If one fails, a local SVG from `public/images/` is shown instead.
To use your own photos, drop them in `public/images/` and set `image: '/images/my-photo.jpg'` in `travelData.js`.

### Add a package or destination
Add an entry in `travelData.js`, then add its text under the same `id` in both locale files.

## Deploy
`npm run build`, then upload `dist/` to Netlify, Vercel, Cloudflare Pages or any static host
(for Netlify/Vercel: build command `npm run build`, publish directory `dist`).
Replace `https://voyara.example/` (canonical, Open Graph) in `index.html` with your real domain.
