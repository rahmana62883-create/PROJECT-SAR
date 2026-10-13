import { useEffect, useRef, useState } from 'react';

export const useScrollReveal = (options = { threshold: 0.1, triggerOnce: true }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (options.triggerOnce) {
          observer.unobserve(el);
        }
      } else if (!options.triggerOnce) {
        setIsVisible(false);
      }
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: options.threshold,
      ...options
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.triggerOnce]);

  return [ref, isVisible];
};
