import React from 'react';

export const TruthRingsGauge = ({
  priceScore = 88,
  stockHealth = 92,
  sellerCredibility = 95,
  sentimentScore = 89,
  size = 200,
  showLegend = true,
  overallScore = null
}) => {
  const calcOffset = (score, circumference) => {
    const clamped = Math.max(0, Math.min(100, score || 0));
    return circumference - (clamped / 100) * circumference;
  };

  const avgScore = overallScore !== null ? overallScore : Math.round((priceScore + stockHealth + sellerCredibility + sentimentScore) / 4);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 200 200"
        >
          {/* Ring 1: Price Health (Outer) */}
          <circle cx="100" cy="100" r="85" className="stroke-fc-ring-track" strokeWidth="12" fill="none" />
          <circle
            cx="100"
            cy="100"
            r="85"
            className="stroke-fc-ring-price"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="534"
            strokeDashoffset={calcOffset(priceScore, 534)}
            style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
          />

          {/* Ring 2: Stock Velocity */}
          <circle cx="100" cy="100" r="68" className="stroke-fc-ring-track" strokeWidth="12" fill="none" />
          <circle
            cx="100"
            cy="100"
            r="68"
            className="stroke-fc-ring-stock"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="427"
            strokeDashoffset={calcOffset(stockHealth, 427)}
            style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s' }}
          />

          {/* Ring 3: Merchant Credibility */}
          <circle cx="100" cy="100" r="51" className="stroke-fc-ring-track" strokeWidth="12" fill="none" />
          <circle
            cx="100"
            cy="100"
            r="51"
            className="stroke-fc-ring-seller"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="320"
            strokeDashoffset={calcOffset(sellerCredibility, 320)}
            style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s' }}
          />

          {/* Ring 4: Review Sentiment (Inner) */}
          <circle cx="100" cy="100" r="34" className="stroke-fc-ring-track" strokeWidth="12" fill="none" />
          <circle
            cx="100"
            cy="100"
            r="34"
            className="stroke-fc-ring-sentiment"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="213"
            strokeDashoffset={calcOffset(sentimentScore, 213)}
            style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s' }}
          />
        </svg>

        {/* Center Truth Score Callout */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <span className={`font-extrabold text-fc-text-primary ${size > 160 ? 'text-2xl' : 'text-lg'}`}>
            {avgScore}
          </span>
          <span className="block text-[10px] text-fc-text-tertiary uppercase tracking-wider">
            Score
          </span>
        </div>
      </div>

      {showLegend && (
        <div className="flex flex-col gap-1.5 text-xs text-fc-text-secondary w-full max-w-[200px]">
          <div className="flex items-center justify-between gap-2 py-0.5">
            <span className="w-2 h-2 rounded-full shrink-0 bg-fc-ring-price"></span>
            <span className="text-fc-text-secondary truncate flex-1">Price Health</span>
            <span className="font-semibold text-fc-text-primary tabular-nums">{priceScore}%</span>
          </div>
          <div className="flex items-center justify-between gap-2 py-0.5">
            <span className="w-2 h-2 rounded-full shrink-0 bg-fc-ring-stock"></span>
            <span className="text-fc-text-secondary truncate flex-1">Stock Velocity</span>
            <span className="font-semibold text-fc-text-primary tabular-nums">{stockHealth}%</span>
          </div>
          <div className="flex items-center justify-between gap-2 py-0.5">
            <span className="w-2 h-2 rounded-full shrink-0 bg-fc-ring-seller"></span>
            <span className="text-fc-text-secondary truncate flex-1">Merchant Credibility</span>
            <span className="font-semibold text-fc-text-primary tabular-nums">{sellerCredibility}%</span>
          </div>
          <div className="flex items-center justify-between gap-2 py-0.5">
            <span className="w-2 h-2 rounded-full shrink-0 bg-fc-ring-sentiment"></span>
            <span className="text-fc-text-secondary truncate flex-1">Review Sentiment</span>
            <span className="font-semibold text-fc-text-primary tabular-nums">{sentimentScore}%</span>
          </div>
        </div>
      )}
    </div>
  );
};
