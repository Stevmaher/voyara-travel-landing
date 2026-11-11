import { useState } from 'react';

// Lazy-loaded image that swaps to a local fallback if the remote photo fails.
export default function SmartImage({ src, fallback, alt = '', eager = false, className = '' }) {
  // `fallback` may be one URL or a list tried in order.
  const chain = [src, ...(Array.isArray(fallback) ? fallback : fallback ? [fallback] : [])];
  const [index, setIndex] = useState(0);
  const current = chain[index];
  return (
    <img
      src={current}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={eager ? 'high' : 'auto'}
      onError={() => setIndex((i) => (i < chain.length - 1 ? i + 1 : i))}
      className={className}
    />
  );
}
