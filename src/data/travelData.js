import { Compass, Headset, ShieldCheck, Wallet } from 'lucide-react';

// Remote photos (Unsplash). If one fails to load, the local SVG in /public/images is used.
const u = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

// Image loading order: your own photo in public/images/photos/ -> remote photo -> local SVG placeholder.

export const heroImage = {
  src: '/images/photos/hero.jpg',
  fallback: [u('photo-1439066615861-d1af74d74000', 2000), '/images/hero.svg'],
};

// Text for each id lives in src/locales/{ar,en}.js
export const destinations = [
  { id: 'santorini', image: '/images/photos/santorini.jpg', fallback: [u('photo-1570077188670-e3a8d69ac5ff', 900), '/images/santorini.svg'] },
  { id: 'amalfi', image: '/images/photos/amalfi.jpg', fallback: [u('photo-1534113414509-0eec2bfb493f', 900), '/images/amalfi.svg'] },
  { id: 'istanbul', image: '/images/photos/istanbul.jpg', fallback: [u('photo-1524231757912-21f4fe3a7200', 900), '/images/istanbul.svg'] },
  { id: 'alps', image: '/images/photos/alps.jpg', fallback: [u('photo-1531366936337-7c912a4589a7', 900), '/images/alps.svg'] },
];

// Indicative prices in EGP per person (sample values — edit freely).
export const packages = [
  { id: 'santorini', image: '/images/photos/santorini.jpg', fallback: [u('photo-1613395877344-13d4a8e0d49e', 1000), '/images/santorini.svg'], days: 6, nights: 5, priceEGP: 52500 },
  { id: 'italy', image: '/images/photos/italy.jpg', fallback: [u('photo-1523906834658-6e24ef2386f9', 1000), '/images/amalfi.svg'], days: 9, nights: 8, priceEGP: 89000 },
  { id: 'istanbul', image: '/images/photos/istanbul.jpg', fallback: [u('photo-1541432901042-2d8bd64b4a9b', 1000), '/images/istanbul.svg'], days: 5, nights: 4, priceEGP: 38500 },
];

export const features = [
  { id: 'custom', icon: Compass },
  { id: 'assist', icon: Headset },
  { id: 'trusted', icon: ShieldCheck },
  { id: 'value', icon: Wallet },
];

// Section ids used by the navbar and footer
export const navItems = ['home', 'destinations', 'packages', 'about', 'contact'];
