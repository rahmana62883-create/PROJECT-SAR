import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const RevealSection = ({ children, className = '', delay = 0, threshold = 0.1, direction = 'up' }) => {
  const [ref, isVisible] = useScrollReveal({ threshold });

  let transformValue = 'translateY(20px)';
  if (direction === 'left') transformValue = 'translateX(20px)';
  if (direction === 'right') transformValue = 'translateX(-20px)';
  if (direction === 'none') transformValue = 'none';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : transformValue,
        transition: `opacity var(--motion-normal) var(--ease-standard), transform var(--motion-normal) var(--ease-standard)`,
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

export const KineticTypography = ({ text, as: Component = 'h1', className = '', delay = 0 }) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });
  
  // Respect reduced motion
  const isReduced = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  
  if (isReduced) {
    return <Component className={className}>{text}</Component>;
  }

  const words = text.split(' ');

  return (
    <Component ref={ref} className={`${className} flex flex-wrap`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex overflow-hidden mr-[0.25em] last:mr-0">
          {word.split('').map((char, charIndex) => {
            const charDelay = delay + (wordIndex * 50) + (charIndex * 20);
            return (
              <span
                key={charIndex}
                className="inline-block"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                  transition: `opacity var(--motion-normal) var(--ease-standard), transform var(--motion-normal) var(--ease-standard)`,
                  transitionDelay: `${charDelay}ms`,
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </Component>
  );
};

export const ParallaxSection = ({ children, className = '', speed = 0.5 }) => {
  const sectionRef = React.useRef(null);
  
  React.useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    let rafId;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (sectionRef.current) {
          sectionRef.current.style.transform = `translate3d(0, ${window.pageYOffset * speed}px, 0)`;
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div ref={sectionRef} className={`${className} will-change-transform`}>
      {children}
    </div>
  );
};

export const MagneticButton = ({ children, className = '', onClick, type = "button" }) => {
  const buttonRef = React.useRef(null);

  const handleMouseMove = (e) => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced || !buttonRef.current) return;

    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.2;
    const y = (e.clientY - (top + height / 2)) * 0.2;
    
    requestAnimationFrame(() => {
      if (buttonRef.current) {
        buttonRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    });
  };

  const handleMouseLeave = () => {
    requestAnimationFrame(() => {
      if (buttonRef.current) {
        buttonRef.current.style.transform = `translate3d(0px, 0px, 0)`;
      }
    });
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      className={`${className} transition-transform duration-300 ease-out will-change-transform`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

export const TypewriterText = ({ text, delay = 50, className = '', startDelay = 0 }) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [isStarted, setIsStarted] = React.useState(false);
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  React.useEffect(() => {
    if (isVisible && !isStarted) {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReduced) {
        setDisplayedText(text);
        setIsStarted(true);
        return;
      }

      setTimeout(() => {
        setIsStarted(true);
      }, startDelay);
    }
  }, [isVisible, isStarted, startDelay, text]);

  React.useEffect(() => {
    if (isStarted && displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, isStarted, text, delay]);

  return (
    <span ref={ref} className={className}>
      {displayedText}
      <span className={`inline-block w-1 bg-current ml-1 animate-pulse ${displayedText.length === text.length ? 'opacity-0' : ''}`}>&nbsp;</span>
    </span>
  );
};

export const Marquee = ({ children, className = '', speed = 20 }) => {
  const isReduced = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  
  if (isReduced) {
    return <div className={`overflow-hidden ${className}`}>{children}</div>;
  }

  return (
    <div className={`overflow-hidden whitespace-nowrap flex group ${className}`}>
      <div 
        className="flex animate-marquee group-hover:[animation-play-state:paused] will-change-transform" 
        style={{ animationDuration: `${speed}s`, animationTimingFunction: 'linear', animationIterationCount: 'infinite' }}
      >
        {children}
        {children}
      </div>
      <div 
        className="flex animate-marquee group-hover:[animation-play-state:paused] will-change-transform" 
        style={{ animationDuration: `${speed}s`, animationTimingFunction: 'linear', animationIterationCount: 'infinite' }}
        aria-hidden="true"
      >
        {children}
        {children}
      </div>
    </div>
  );
};

export const CustomCursor = () => {
  const dotRef = React.useRef(null);
  const outlineRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || isReduced) return;

    let rafId;

    const handleMouseMove = (e) => {
      setIsVisible(true);
      
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        if (dotRef.current && outlineRef.current) {
          // Hardware accelerated 3D transform for max FPS
          const transformStr = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
          dotRef.current.style.transform = transformStr;
          outlineRef.current.style.transform = transformStr;
        }
      });
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target?.tagName?.toLowerCase() === 'a' || 
        target?.tagName?.toLowerCase() === 'button' ||
        target?.closest?.('a') || 
        target?.closest?.('button') ||
        target?.classList?.contains('cursor-pointer');
      
      if (containerRef.current) {
        if (isInteractive) {
          containerRef.current.classList.add('custom-cursor-hovering');
        } else {
          containerRef.current.classList.remove('custom-cursor-hovering');
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="custom-cursor-container">
      <div 
        ref={outlineRef}
        className="custom-cursor-wrapper"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div className="custom-cursor-outline" />
      </div>
      <div 
        ref={dotRef}
        className="custom-cursor-wrapper"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div className="custom-cursor-dot" />
      </div>
    </div>
  );
};
