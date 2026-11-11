// Official VOYARA logo (white version, for the dark navbar and footer).
// Source files: public/images/logo-white.png and logo-color.png (use the color one on light backgrounds).
export default function Logo({ className = 'h-11 sm:h-12' }) {
  return <img src="/images/logo-white.png" alt="VOYARA Travel" width="1000" height="282" decoding="async" className={`w-auto ${className}`} />;
}
