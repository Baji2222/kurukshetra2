import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Animates a numeric value from 0 to `target` once the attached ref
 * scrolls into view. Returns [ref, displayValue].
 */
export function useCountUp(target, { duration = 1600, decimals = 0 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (prefersReducedMotion()) {
      setValue(target);
      return undefined;
    }

    let frame;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);

          const start = performance.now();
          const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = easeOutExpo(progress);
            setValue(Number((target * eased).toFixed(decimals)));
            if (progress < 1) {
              frame = requestAnimationFrame(tick);
            }
          };
          frame = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target, duration, decimals]);

  return [ref, value];
}
