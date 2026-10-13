import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

export const Preloader = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [status, setStatus] = useState('Initializing comparison engine...');

  useEffect(() => {
    // Stage 0: Initial render
    // Stage 1: Line appears & scans (300ms)
    // Stage 2: Logo fades in (800ms)
    // Stage 3: Status updates (1500ms)
    // Stage 4: Finish & fade out (2200ms)
    
    const timers = [
      setTimeout(() => setStage(1), 100),
      setTimeout(() => {
        setStage(2);
        setStatus('Fetching current deals...');
      }, 800),
      setTimeout(() => {
        setStage(3);
        setStatus('Preparing price intelligence...');
      }, 1500),
      setTimeout(() => {
        setStage(4);
      }, 2200),
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 2600) // 400ms for fade out
    ];
    
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#030304] transition-opacity duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${stage === 4 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Energy Line / Signal */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-transform duration-1000 ease-[cubic-bezier(0.3,0,0,1)]"
          style={{ 
            transform: stage >= 1 ? 'translateX(100%)' : 'translateX(-100%)',
            width: '100%',
            opacity: stage >= 1 && stage < 3 ? 1 : 0
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo/Text */}
        <div 
          className={`flex items-center gap-2 mb-4 transition-all duration-700 ease-out transform ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            flashcompare<span className="text-blue-500">.ai</span>
          </span>
        </div>

        {/* Small comparison indicators */}
        <div className={`flex items-center gap-1.5 mb-6 transition-all duration-500 delay-200 transform ${stage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '150ms' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>

        {/* Loading Status */}
        <div 
          className={`text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wide transition-opacity duration-300 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}
        >
          {status}
        </div>
      </div>
    </div>
  );
};
