import React from 'react';

export const ProductCardSkeleton = () => (
  <div className="bg-white dark:bg-fc-bg-secondary rounded-2xl border border-fc-border overflow-hidden flex flex-col h-full shadow-sm">
    <div className="aspect-[4/3] w-full skeleton-box" />
    <div className="p-4 flex flex-col flex-1 gap-3">
      <div className="h-5 w-3/4 rounded skeleton-box" />
      <div className="h-4 w-1/2 rounded skeleton-box" />
      
      <div className="mt-auto pt-3 border-t border-fc-border flex items-center justify-between">
        <div className="h-6 w-24 rounded skeleton-box" />
        <div className="h-8 w-8 rounded-full skeleton-box" />
      </div>
    </div>
  </div>
);

export const DealCardSkeleton = () => (
  <div className="bg-white dark:bg-fc-bg-secondary rounded-2xl border border-fc-border overflow-hidden flex gap-4 p-4 shadow-sm">
    <div className="w-24 h-24 rounded-lg skeleton-box shrink-0" />
    <div className="flex flex-col flex-1 gap-2 justify-center">
      <div className="h-5 w-full rounded skeleton-box" />
      <div className="h-4 w-2/3 rounded skeleton-box" />
      <div className="h-6 w-24 rounded skeleton-box mt-2" />
    </div>
  </div>
);

export const ChartSkeleton = () => (
  <div className="w-full h-64 rounded-xl border border-fc-border skeleton-box" />
);

export const WalletSkeleton = () => (
  <div className="space-y-6">
    <div className="bg-white dark:bg-fc-bg-secondary rounded-3xl p-6 sm:p-8 border border-fc-border shadow-sm">
      <div className="h-5 w-32 rounded skeleton-box mb-4" />
      <div className="h-12 w-48 rounded skeleton-box mb-6" />
      <div className="flex gap-3">
        <div className="h-10 w-32 rounded-lg skeleton-box" />
        <div className="h-10 w-32 rounded-lg skeleton-box" />
      </div>
    </div>
    
    <div className="space-y-4">
      <div className="h-6 w-40 rounded skeleton-box" />
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white dark:bg-fc-bg-secondary rounded-xl p-4 border border-fc-border flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full skeleton-box" />
            <div className="space-y-2">
              <div className="h-4 w-24 rounded skeleton-box" />
              <div className="h-3 w-16 rounded skeleton-box" />
            </div>
          </div>
          <div className="h-5 w-16 rounded skeleton-box" />
        </div>
      ))}
    </div>
  </div>
);
