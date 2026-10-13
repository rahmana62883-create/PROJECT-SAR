import React, { useEffect, useState } from 'react';

export const AnimatedNumber = ({ value, formatter, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  // Respect reduced motion
  const isReduced = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  useEffect(() => {
    if (isReduced) {
      setDisplayValue(value);
      return;
    }

    let startTimestamp = null;
    let timeoutId;
    
    // Animation duration in ms
    const duration = 1000;
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setDisplayValue(Math.floor(easeProgress * value));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    timeoutId = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay);
    
    return () => clearTimeout(timeoutId);
  }, [value, isReduced, delay]);

  return <span>{formatter ? formatter(displayValue) : displayValue}</span>;
};
