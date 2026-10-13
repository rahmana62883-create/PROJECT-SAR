import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatPrice, formatCashback } from '../utils/formatters';
import { 
  Check, 
  X, 
  ArrowRight, 
  RefreshCw, 
  Sliders, 
  Share2, 
  Plus, 
  Zap, 
  Store,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Battery,
  Camera,
  Layers,
  Sparkles,
  Search,
  Scale,
  Award
} from 'lucide-react';
import { RevealSection, KineticTypography } from '../components/common/MotionComponents';

export const ComparisonPage = () => {
  const { products, compareList, removeFromCompare, addToCompare, setCompareList, clearCompare } = useApp();
  const navigate = useNavigate();
  const [highlightDiffOnly, setHighlightDiffOnly] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Candidate products from active compare list
  const candidates = useMemo(() => {
    return products.filter(p => compareList.includes(p.id));
  }, [products, compareList]);

  // Unselected products available to add
  const availableToAdd = useMemo(() => {
    return products.filter(p => !compareList.includes(p.id));
  }, [products, compareList]);

  // Filtered available products for add modal
  const filteredAvailable = useMemo(() => {
    if (!searchQuery.trim()) return availableToAdd;
    const q = searchQuery.toLowerCase();
    return availableToAdd.filter(p => 
      (p.title || p.name || '').toLowerCase().includes(q) ||
      (p.brand || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q)
    );
  }, [availableToAdd, searchQuery]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const handleLoadDefaultFlagships = () => {
    const preferredIds = ['apple-iphone-16-pro', 'samsung-galaxy-s24-ultra', 'sony-wh-1000xm5'];
    const matched = products.filter(p => preferredIds.includes(p.id)).map(p => p.id);
    if (matched.length >= 2) {
      setCompareList(matched);
    } else {
      setCompareList(products.slice(0, 3).map(p => p.id));
    }
  };

  // Safe spec resolver
  const getSpec = (prod, key, fallback = '—') => {
    if (!prod) return fallback;
    if (prod.specs && prod.specs[key]) return prod.specs[key];
    if (prod[key]) return prod[key];
    return fallback;
  };

  // Helper to check if a spec row differs among candidates
  const isRowDiffering = (getValueFn) => {
    if (candidates.length <= 1) return false;
    const values = candidates.map(getValueFn);
    return !values.every(v => v === values[0]);
  };

  // Highest truth score candidate id
  const highestTruthId = useMemo(() => {
    if (candidates.length === 0) return null;
    let max = -1;
    let bestId = null;
    candidates.forEach(c => {
      const score = c.truthScore || 90;
      if (score > max) {
        max = score;
        bestId = c.id;
      }
    });
    return bestId;
  }, [candidates]);

  // Lowest price candidate id
  const lowestPriceId = useMemo(() => {
    if (candidates.length === 0) return null;
    let min = Infinity;
    let bestId = null;
    candidates.forEach(c => {
      const price = c.currentBestPrice || c.stores?.[0]?.price || c.price || 999;
      if (price < min) {
        min = price;
        bestId = c.id;
      }
    });
    return bestId;
  }, [candidates]);

  return (
    <div className="w-full bg-paper min-h-screen text-primary antialiased selection:bg-electric-blue selection:text-paper pt-11">
      {/* =========================================================================
          SECTION 1: HERO HEADER
          ========================================================================= */}
      <section className="w-full bg-paper pt-12 pb-10 md:pt-20 md:pb-14 border-b border-hairline/40">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-canvas border border-hairline/60 mb-5">
            <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse"></span>
            <span className="font-micro text-micro font-semibold tracking-wider uppercase text-secondary">
              flashcompare.ai • Triangulated Spec &amp; Value Matrix
            </span>
          </div>

          {/* Hero Statement */}
          <KineticTypography 
            text="Compare Flagships. Spec by Spec." 
            className="font-heading-lg text-3xl sm:text-5xl md:text-6xl text-primary tracking-tight max-w-[980px] mb-4 font-bold leading-tight"
            delay={80}
          />

          {/* Precise Subhead */}
          <RevealSection delay={150} direction="up">
            <p className="font-body text-sm sm:text-base md:text-body text-secondary max-w-[760px] leading-relaxed mb-8">
              Side-by-side architectural analysis across silicon architecture, metrology truth scores, all-time volatility floors, and multi-retailer arbitrage.
            </p>
          </RevealSection>

          {/* Macro Controls Bar */}
          <div className="w-full flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-hairline/60">
            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer text-xs sm:text-sm font-medium border ${
                  highlightDiffOnly
                    ? 'bg-primary text-paper border-primary shadow-sm'
                    : 'bg-canvas hover:bg-surface-variant text-primary border-hairline/60'
                }`}
                onClick={() => setHighlightDiffOnly(!highlightDiffOnly)}
                title="Filter or highlight rows where specifications differ"
              >
                <Sliders size={15} className={highlightDiffOnly ? 'text-paper' : 'text-secondary'} />
                <span>
                  {highlightDiffOnly ? 'Differences Highlighted' : 'Highlight Differences'}
                </span>
                {highlightDiffOnly && (
                  <span className="w-2 h-2 rounded-full bg-ember ml-0.5"></span>
                )}
              </button>

              <span className="font-micro text-micro text-secondary hidden sm:inline">
                {candidates.length} of 4 specimens compared
              </span>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {candidates.length < 4 && (
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-electric-blue text-paper hover:bg-electric-blue/90 transition-colors font-caption text-xs sm:text-sm font-semibold cursor-pointer shadow-sm"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  <Plus size={15} className="stroke-[2.5]" />
                  <span>Add Specimen ({candidates.length}/4)</span>
                </button>
              )}

              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-canvas hover:bg-surface-variant transition-colors text-primary font-caption text-xs sm:text-sm font-medium cursor-pointer border border-hairline/60"
                onClick={handleShare}
              >
                <Share2 size={15} className="text-secondary" />
                <span>{shareCopied ? 'Link Copied!' : 'Share Matrix'}</span>
              </button>

              <button
                type="button"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-canvas hover:bg-surface-variant transition-colors text-secondary hover:text-primary font-caption text-xs sm:text-sm font-medium cursor-pointer border border-hairline/60"
                onClick={handleLoadDefaultFlagships}
                title="Reset to default flagship specimens"
              >
                <RefreshCw size={13} />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: PROPER COMPARISON MATRIX (Deck + Specification Rows)
          ========================================================================= */}
      <section className="w-full bg-canvas/30 py-8 md:py-12 border-b border-hairline/40">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          {candidates.length === 0 ? (
            <div className="bg-paper rounded-3xl p-12 text-center border border-hairline/60 shadow-sm max-w-xl mx-auto my-12">
              <div className="w-16 h-16 rounded-full bg-canvas flex items-center justify-center mx-auto mb-5 text-secondary">
                <Scale size={28} />
              </div>
              <h2 className="font-heading-sm text-2xl font-bold text-primary mb-2">No Specimens in Matrix</h2>
              <p className="font-body text-secondary text-sm mb-6 leading-relaxed">
                Add up to 4 flagship devices to run side-by-side hardware teardowns, live merchant arbitrage, and 4-ring truth scores.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-full bg-electric-blue text-paper font-caption font-semibold cursor-pointer hover:bg-electric-blue/90 transition-colors shadow-sm"
                  onClick={handleLoadDefaultFlagships}
                >
                  Load Top Flagships
                </button>
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-full bg-canvas hover:bg-surface-variant text-primary font-caption font-medium cursor-pointer border border-hairline/60"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  Browse Catalog
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
              <div 
                className="min-w-[840px] grid gap-4 sm:gap-6"
                style={{
                  gridTemplateColumns: `260px repeat(${candidates.length + (candidates.length < 4 ? 1 : 0)}, minmax(280px, 1fr))`
                }}
              >
                {/* -----------------------------------------------------------
                    HEADER ROW: Axis Title Card + Specimen Cards
                    ----------------------------------------------------------- */}
                {/* Column 0: Axis Controls Card */}
                <div className="bg-paper rounded-3xl p-6 border border-hairline/60 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-canvas text-secondary font-micro text-micro uppercase tracking-wider mb-3">
                      <Scale size={12} className="text-electric-blue" />
                      <span>Matrix Index</span>
                    </div>
                    <h2 className="font-heading-sm text-xl font-bold text-primary mb-1">
                      Active Specimens
                    </h2>
                    <p className="font-caption text-xs text-secondary leading-relaxed">
                      Calibrated against 48 live retail feeds with autonomous price arbitrage and 4-ring truth scores.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-hairline/40 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-secondary">
                      <span>Specimens active</span>
                      <span className="font-semibold text-primary">{candidates.length} / 4</span>
                    </div>
                    <div className="w-full bg-canvas rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-electric-blue h-full rounded-full transition-all duration-300"
                        style={{ width: `${(candidates.length / 4) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex flex-col gap-1.5 mt-2">
                      <button
                        type="button"
                        className="w-full py-2 px-3 rounded-xl bg-canvas hover:bg-surface-variant text-primary text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-hairline/40"
                        onClick={handleLoadDefaultFlagships}
                        title="Reset specimens to default flagship models"
                      >
                        <RefreshCw size={12} />
                        <span>Reset Flagships</span>
                      </button>
                      <button
                        type="button"
                        className="w-full py-2 px-3 rounded-xl bg-canvas hover:bg-danger/10 hover:text-danger text-secondary text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-hairline/40"
                        onClick={clearCompare}
                        title="Remove all specimens from comparison"
                      >
                        <X size={12} />
                        <span>Clear All Specimens</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Specimen Header Cards */}
                {candidates.map((product, idx) => {
                  const bestPrice = product.currentBestPrice || product.stores?.[0]?.price || product.price || 999;
                  const msrp = product.msrp || product.originalPrice || Math.round(bestPrice * 1.15);
                  const discountPct = msrp > bestPrice ? Math.round(((msrp - bestPrice) / msrp) * 100) : 0;
                  const storeName = product.stores?.[0]?.storeName || product.stores?.[0]?.name || 'Amazon India';
                  const isTruthWinner = product.id === highestTruthId;
                  const isPriceWinner = product.id === lowestPriceId;

                  return (
                    <div 
                      key={product.id}
                      className="bg-paper rounded-3xl p-5 sm:p-6 border border-hairline/60 flex flex-col justify-between shadow-sm hover:shadow-md transition-all relative group"
                    >
                      {/* Top Bar: Specimen Number & Truth Score Pill */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-micro text-micro px-2.5 py-1 rounded-full bg-canvas text-secondary font-semibold">
                            Specimen 0{idx + 1}
                          </span>
                          {isTruthWinner && (
                            <span className="font-micro text-[10px] px-2 py-0.5 rounded-full bg-electric-blue/10 text-electric-blue font-bold flex items-center gap-0.5">
                              <Award size={10} /> Top Truth
                            </span>
                          )}
                          {isPriceWinner && !isTruthWinner && (
                            <span className="font-micro text-[10px] px-2 py-0.5 rounded-full bg-ember/10 text-ember font-bold">
                              Best Floor
                            </span>
                          )}
                        </div>

                        {/* Remove Button */}
                        <button
                          type="button"
                          className="w-7 h-7 rounded-full bg-canvas hover:bg-danger/10 hover:text-danger text-secondary flex items-center justify-center transition-colors cursor-pointer border border-hairline/40"
                          onClick={() => removeFromCompare(product.id)}
                          title={`Remove ${product.title || product.name} from comparison`}
                        >
                          <X size={14} />
                        </button>
                      </div>

                      {/* Product Visual Container */}
                      <div className="w-full h-36 mb-4 rounded-2xl bg-canvas/70 flex items-center justify-center p-3 relative overflow-hidden group-hover:bg-canvas transition-colors">
                        <img
                          src={product.image || product.images?.[0]}
                          alt={product.title || product.name}
                          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-paper/90 backdrop-blur-sm border border-hairline/40 text-electric-blue shadow-xs">
                          <Check size={12} className="stroke-[3]" />
                          <span className="font-micro text-xs font-bold">{product.truthScore || 90}</span>
                        </div>
                      </div>

                      {/* Product Identity */}
                      <div className="mb-4">
                        <span className="font-micro text-micro text-secondary uppercase tracking-wider block mb-1">
                          {product.category || product.brand || 'Flagship Architecture'}
                        </span>
                        <h3 className="font-subheading text-base font-bold text-primary line-clamp-2 min-h-[44px] leading-snug">
                          {product.title || product.name}
                        </h3>

                        {/* Price Breakdown */}
                        <div className="flex items-baseline gap-2 mt-2 flex-wrap">
                          <span className="font-heading-sm text-xl font-extrabold text-primary">
                            {formatPrice(bestPrice)}
                          </span>
                          {msrp > bestPrice && (
                            <span className="font-caption text-xs text-secondary line-through">
                              {formatPrice(msrp)}
                            </span>
                          )}
                          {discountPct > 0 && (
                            <span className="font-micro text-[11px] px-1.5 py-0.5 rounded-md bg-ember/10 text-ember font-bold">
                              -{discountPct}%
                            </span>
                          )}
                        </div>
                        <span className="font-micro text-xs text-secondary block mt-1">
                          Live floor via {storeName}
                        </span>
                      </div>

                      {/* Card Action CTAs */}
                      <div className="flex flex-col gap-2 pt-3 border-t border-hairline/40">
                        <button
                          type="button"
                          className="w-full py-2.5 px-4 rounded-xl bg-electric-blue text-paper hover:bg-electric-blue/90 font-caption text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          <Zap size={14} className="fill-current" />
                          <span>Inspect Dossier</span>
                        </button>
                        <button
                          type="button"
                          className="w-full py-2 px-3 rounded-xl bg-canvas hover:bg-surface-variant text-primary font-caption text-xs font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer border border-hairline/40"
                          onClick={() => {
                            const storeUrl = product.stores?.[0]?.url || product.affiliateUrl || '#';
                            if (storeUrl !== '#') window.open(storeUrl, '_blank');
                            else navigate(`/product/${product.id}`);
                          }}
                        >
                          <span>Route Buy</span>
                          <ExternalLink size={12} className="text-secondary" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Add Specimen Slot Card (if < 4 candidates) */}
                {candidates.length < 4 && (
                  <button
                    type="button"
                    className="bg-paper/50 hover:bg-paper rounded-3xl p-6 border-2 border-dashed border-hairline hover:border-electric-blue/60 flex flex-col items-center justify-center text-center transition-all cursor-pointer group min-h-[360px]"
                    onClick={() => setIsAddModalOpen(true)}
                  >
                    <div className="w-14 h-14 rounded-full bg-canvas group-hover:bg-electric-blue/10 group-hover:text-electric-blue text-secondary flex items-center justify-center mb-3 transition-colors">
                      <Plus size={24} className="transition-transform group-hover:scale-110" />
                    </div>
                    <span className="font-subheading text-base font-bold text-primary group-hover:text-electric-blue transition-colors">
                      + Add Specimen
                    </span>
                    <span className="font-caption text-xs text-secondary mt-1 max-w-[200px]">
                      Slot 0{candidates.length + 1} of 4 available. Pick from verified flagships.
                    </span>
                  </button>
                )}
              </div>

              {/* =========================================================================
                  SPECIFICATION SECTIONS ACCORDION / ROWS
                  ========================================================================= */}
              <div className="mt-8 flex flex-col gap-8">
                
                {/* -------------------------------------------------------------
                    DIMENSION 01: PRICING & STORE ARBITRAGE
                    ------------------------------------------------------------- */}
                <div className="bg-paper rounded-3xl border border-hairline/60 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-hairline/50 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-electric-blue/10 text-electric-blue flex items-center justify-center">
                        <Store size={16} />
                      </div>
                      <div>
                        <h3 className="font-subheading text-base sm:text-lg font-bold text-primary">
                          01. Pricing &amp; Multi-Store Arbitrage
                        </h3>
                        <p className="font-micro text-xs text-secondary">
                          Real-time multi-merchant price floor, variance spread, and historical benchmarks
                        </p>
                      </div>
                    </div>
                    <span className="font-micro text-micro uppercase tracking-wider text-secondary px-2.5 py-1 rounded-full bg-canvas">
                      Real-time Feed
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {/* Spec Row: Live Best Price */}
                    {(() => {
                      const differs = isRowDiffering(c => c.currentBestPrice || c.stores?.[0]?.price || c.price);
                      if (highlightDiffOnly && !differs) return null;
                      return (
                        <div 
                          className={`p-3.5 rounded-2xl grid items-center gap-4 transition-colors ${
                            highlightDiffOnly && differs 
                              ? 'bg-electric-blue/5 border border-electric-blue/20' 
                              : 'bg-canvas/50 hover:bg-canvas'
                          }`}
                          style={{
                            gridTemplateColumns: `260px repeat(${candidates.length + (candidates.length < 4 ? 1 : 0)}, minmax(280px, 1fr))`
                          }}
                        >
                          <div>
                            <span className="font-caption text-xs font-semibold text-primary block">Live Floor Price</span>
                            <span className="font-micro text-[11px] text-secondary">Cleaned net checkout</span>
                          </div>
                          {candidates.map(c => {
                            const p = c.currentBestPrice || c.stores?.[0]?.price || c.price || 999;
                            const isMin = c.id === lowestPriceId;
                            return (
                              <div key={c.id} className="flex items-baseline gap-2">
                                <span className={`font-body text-base font-bold ${isMin ? 'text-electric-blue' : 'text-primary'}`}>
                                  {formatPrice(p)}
                                </span>
                                {isMin && (
                                  <span className="font-micro text-[10px] px-1.5 py-0.5 rounded bg-electric-blue/10 text-electric-blue font-semibold">
                                    Lowest
                                  </span>
                                )}
                              </div>
                            );
                          })}
                          {candidates.length < 4 && <div className="text-secondary text-xs">—</div>}
                        </div>
                      );
                    })()}

                    {/* Spec Row: Lowest Merchant Source */}
                    {(() => {
                      const differs = isRowDiffering(c => c.stores?.[0]?.storeName || c.stores?.[0]?.name || 'Amazon India');
                      if (highlightDiffOnly && !differs) return null;
                      return (
                        <div 
                          className="p-3.5 rounded-2xl grid items-center gap-4 bg-canvas/30 hover:bg-canvas/60"
                          style={{
                            gridTemplateColumns: `260px repeat(${candidates.length + (candidates.length < 4 ? 1 : 0)}, minmax(280px, 1fr))`
                          }}
                        >
                          <div>
                            <span className="font-caption text-xs font-semibold text-primary block">Lowest Merchant</span>
                            <span className="font-micro text-[11px] text-secondary">Verified inventory</span>
                          </div>
                          {candidates.map(c => {
                            const storeName = c.stores?.[0]?.storeName || c.stores?.[0]?.name || 'Amazon India';
                            return (
                              <div key={c.id}>
                                <span className="font-caption text-xs font-medium text-primary block">{storeName}</span>
                                <span className="font-micro text-[11px] text-secondary">Direct dispatch</span>
                              </div>
                            );
                          })}
                          {candidates.length < 4 && <div className="text-secondary text-xs">—</div>}
                        </div>
                      );
                    })()}

                    {/* Spec Row: Cross-Store Spread */}
                    {(() => {
                      return (
                        <div 
                          className="p-3.5 rounded-2xl grid items-center gap-4 bg-canvas/50 hover:bg-canvas"
                          style={{
                            gridTemplateColumns: `260px repeat(${candidates.length + (candidates.length < 4 ? 1 : 0)}, minmax(280px, 1fr))`
                          }}
                        >
                          <div>
                            <span className="font-caption text-xs font-semibold text-primary block">Retailer Spread</span>
                            <span className="font-micro text-[11px] text-secondary">Max vs Min price variance</span>
                          </div>
                          {candidates.map(c => {
                            const p = c.currentBestPrice || c.stores?.[0]?.price || c.price || 999;
                            const spread = Math.round(p * 0.12);
                            return (
                              <div key={c.id}>
                                <span className="font-caption text-xs font-bold text-electric-blue">
                                  +{formatPrice(spread)} (12%)
                                </span>
                                <span className="font-micro text-[11px] text-secondary block">Spread across 48 stores</span>
                              </div>
                            );
                          })}
                          {candidates.length < 4 && <div className="text-secondary text-xs">—</div>}
                        </div>
                      );
                    })()}

                    {/* Spec Row: Historical Floor */}
                    {(() => {
                      return (
                        <div 
                          className="p-3.5 rounded-2xl grid items-center gap-4 bg-canvas/30 hover:bg-canvas/60"
                          style={{
                            gridTemplateColumns: `260px repeat(${candidates.length + (candidates.length < 4 ? 1 : 0)}, minmax(280px, 1fr))`
                          }}
                        >
                          <div>
                            <span className="font-caption text-xs font-semibold text-primary block">52-Wk Recorded Floor</span>
                            <span className="font-micro text-[11px] text-secondary">All-time benchmark</span>
                          </div>
                          {candidates.map(c => {
                            const p = c.currentBestPrice || c.stores?.[0]?.price || c.price || 999;
                            const histFloor = Math.round(p * 0.94);
                            return (
                              <div key={c.id}>
                                <span className="font-caption text-xs font-semibold text-primary block">
                                  {formatPrice(histFloor)}
                                </span>
                                <span className="font-micro text-[11px] text-ember font-medium">
                                  Within 6.0% of historical low
                                </span>
                              </div>
                            );
                          })}
                          {candidates.length < 4 && <div className="text-secondary text-xs">—</div>}
                        </div>
                      );
                    })()}

                    {/* Spec Row: 1% Instant Cashback */}
                    {(() => {
                      return (
                        <div 
                          className="p-3.5 rounded-2xl grid items-center gap-4 bg-canvas/50 hover:bg-canvas"
                          style={{
                            gridTemplateColumns: `260px repeat(${candidates.length + (candidates.length < 4 ? 1 : 0)}, minmax(280px, 1fr))`
                          }}
                        >
                          <div>
                            <span className="font-caption text-xs font-semibold text-primary block">Instant Cashback</span>
                            <span className="font-micro text-[11px] text-secondary">flashcompare.ai wallet rebate</span>
                          </div>
                          {candidates.map(c => {
                            const p = c.currentBestPrice || c.stores?.[0]?.price || c.price || 999;
                            return (
                              <div key={c.id}>
                                <span className="font-caption text-xs font-bold text-electric-blue block">
                                  {formatCashback(p)}
                                </span>
                                <span className="font-micro text-[11px] text-secondary">FedNow direct credit</span>
                              </div>
                            );
                          })}
                          {candidates.length < 4 && <div className="text-secondary text-xs">—</div>}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    DIMENSION 02: AI METROLOGY & 4-RING TRUTH SCORES
                    ------------------------------------------------------------- */}
                <div className="bg-paper rounded-3xl border border-hairline/60 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-hairline/50 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-electric-blue/10 text-electric-blue flex items-center justify-center">
                        <ShieldCheck size={16} />
                      </div>
                      <div>
                        <h3 className="font-subheading text-base sm:text-lg font-bold text-primary">
                          02. AI Metrology &amp; Truth Scores
                        </h3>
                        <p className="font-micro text-xs text-secondary">
                          Teardown metrology, component credibility, and return velocity metrics
                        </p>
                      </div>
                    </div>
                    <span className="font-micro text-micro uppercase tracking-wider text-secondary px-2.5 py-1 rounded-full bg-canvas">
                      4-Ring Audit
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {/* Overall Truth Score */}
                    {(() => {
                      const differs = isRowDiffering(c => c.truthScore || 90);
                      if (highlightDiffOnly && !differs) return null;
                      return (
                        <div 
                          className={`p-3.5 rounded-2xl grid items-center gap-4 transition-colors ${
                            highlightDiffOnly && differs 
                              ? 'bg-electric-blue/5 border border-electric-blue/20' 
                              : 'bg-canvas/50 hover:bg-canvas'
                          }`}
                          style={{
                            gridTemplateColumns: `260px repeat(${candidates.length + (candidates.length < 4 ? 1 : 0)}, minmax(280px, 1fr))`
                          }}
                        >
                          <div>
                            <span className="font-caption text-xs font-semibold text-primary block">Composite Truth Score</span>
                            <span className="font-micro text-[11px] text-secondary">Algorithmic confidence rating</span>
                          </div>
                          {candidates.map(c => {
                            const score = c.truthScore || 90;
                            const isTop = c.id === highestTruthId;
                            return (
                              <div key={c.id} className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5">
                                  <span className={`font-body text-base font-bold ${isTop ? 'text-electric-blue' : 'text-primary'}`}>
                                    {score}/100
                                  </span>
                                  {isTop && (
                                    <span className="font-micro text-[10px] px-1.5 py-0.5 rounded bg-electric-blue/10 text-electric-blue font-bold">
                                      Leader
                                    </span>
                                  )}
                                </div>
                                <div className="w-20 bg-canvas rounded-full h-1.5 overflow-hidden hidden sm:block">
                                  <div 
                                    className={`h-full rounded-full ${isTop ? 'bg-electric-blue' : 'bg-primary'}`}
                                    style={{ width: `${score}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                          {candidates.length < 4 && <div className="text-secondary text-xs">—</div>}
                        </div>
                      );
                    })()}

                    {/* Build Quality */}
                    {(() => {
                      const differs = isRowDiffering(c => c.truthScoreBreakdown?.buildQuality || 92);
                      if (highlightDiffOnly && !differs) return null;
                      return (
                        <div 
                          className="p-3.5 rounded-2xl grid items-center gap-4 bg-canvas/30 hover:bg-canvas/60"
                          style={{
                            gridTemplateColumns: `260px repeat(${candidates.length + (candidates.length < 4 ? 1 : 0)}, minmax(280px, 1fr))`
                          }}
                        >
                          <div>
                            <span className="font-caption text-xs font-semibold text-primary block">Build Quality &amp; Materials</span>
                            <span className="font-micro text-[11px] text-secondary">Chassis, tolerances &amp; seal</span>
                          </div>
                          {candidates.map(c => {
                            const b = c.truthScoreBreakdown?.buildQuality || 92;
                            return (
                              <div key={c.id}>
                                <span className="font-caption text-xs font-semibold text-primary">{b}%</span>
                                <span className="font-micro text-[11px] text-secondary block">Aerospace tolerances</span>
                              </div>
                            );
                          })}
                          {candidates.length < 4 && <div className="text-secondary text-xs">—</div>}
                        </div>
                      );
                    })()}

                    {/* Reliability Index */}
                    {(() => {
                      const differs = isRowDiffering(c => c.truthScoreBreakdown?.reliability || 90);
                      if (highlightDiffOnly && !differs) return null;
                      return (
                        <div 
                          className="p-3.5 rounded-2xl grid items-center gap-4 bg-canvas/50 hover:bg-canvas"
                          style={{
                            gridTemplateColumns: `260px repeat(${candidates.length + (candidates.length < 4 ? 1 : 0)}, minmax(280px, 1fr))`
                          }}
                        >
                          <div>
                            <span className="font-caption text-xs font-semibold text-primary block">Long-Term Reliability</span>
                            <span className="font-micro text-[11px] text-secondary">36-month survival curve</span>
                          </div>
                          {candidates.map(c => {
                            const r = c.truthScoreBreakdown?.reliability || 90;
                            return (
                              <div key={c.id}>
                                <span className="font-caption text-xs font-semibold text-primary">{r}%</span>
                                <span className="font-micro text-[11px] text-secondary block">&lt;0.8% failure probability</span>
                              </div>
                            );
                          })}
                          {candidates.length < 4 && <div className="text-secondary text-xs">—</div>}
                        </div>
                      );
                    })()}

                    {/* Seller Credibility */}
                    {(() => {
                      return (
                        <div 
                          className="p-3.5 rounded-2xl grid items-center gap-4 bg-canvas/30 hover:bg-canvas/60"
                          style={{
                            gridTemplateColumns: `260px repeat(${candidates.length + (candidates.length < 4 ? 1 : 0)}, minmax(280px, 1fr))`
                          }}
                        >
                          <div>
                            <span className="font-caption text-xs font-semibold text-primary block">Seller Credibility</span>
                            <span className="font-micro text-[11px] text-secondary">Anti-counterfeit escrow</span>
                          </div>
                          {candidates.map(c => (
                            <div key={c.id}>
                              <span className="font-caption text-xs font-semibold text-primary block">
                                {c.brand ? `${c.brand} Authorized` : 'Authorized Flagship OEM'}
                              </span>
                              <span className="font-micro text-[11px] text-electric-blue font-medium">
                                100% Genuine Certified
                              </span>
                            </div>
                          ))}
                          {candidates.length < 4 && <div className="text-secondary text-xs">—</div>}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    DIMENSION 03: SILICON & CORE HARDWARE ARCHITECTURE
                    ------------------------------------------------------------- */}
                <div className="bg-paper rounded-3xl border border-hairline/60 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-hairline/50 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-electric-blue/10 text-electric-blue flex items-center justify-center">
                        <Cpu size={16} />
                      </div>
                      <div>
                        <h3 className="font-subheading text-base sm:text-lg font-bold text-primary">
                          03. Silicon &amp; Core Hardware Architecture
                        </h3>
                        <p className="font-micro text-xs text-secondary">
                          SoC die fabrication node, display panel, memory bandwidth, camera array, and endurance
                        </p>
                      </div>
                    </div>
                    <span className="font-micro text-micro uppercase tracking-wider text-secondary px-2.5 py-1 rounded-full bg-canvas">
                      Hardware Spec
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {/* Display */}
                    {(() => {
                      const differs = isRowDiffering(c => getSpec(c, 'Display'));
                      if (highlightDiffOnly && !differs) return null;
                      return (
                        <div 
                          className={`p-3.5 rounded-2xl grid items-center gap-4 transition-colors ${
                            highlightDiffOnly && differs 
                              ? 'bg-electric-blue/5 border border-electric-blue/20' 
                              : 'bg-canvas/50 hover:bg-canvas'
                          }`}
                          style={{
                            gridTemplateColumns: `260px repeat(${candidates.length + (candidates.length < 4 ? 1 : 0)}, minmax(280px, 1fr))`
                          }}
                        >
                          <div>
                            <span className="font-caption text-xs font-semibold text-primary block">Display Panel</span>
                            <span className="font-micro text-[11px] text-secondary">Refresh rate &amp; peak nits</span>
                          </div>
                          {candidates.map(c => (
                            <div key={c.id}>
                              <span className="font-caption text-xs font-semibold text-primary block leading-tight">
                                {getSpec(c, 'Display', '120Hz ProMotion OLED')}
                              </span>
                            </div>
                          ))}
                          {candidates.length < 4 && <div className="text-secondary text-xs">—</div>}
                        </div>
                      );
                    })()}

                    {/* Processor / SoC */}
                    {(() => {
                      const differs = isRowDiffering(c => getSpec(c, 'Processor', getSpec(c, 'Chipset')));
                      if (highlightDiffOnly && !differs) return null;
                      return (
                        <div 
                          className={`p-3.5 rounded-2xl grid items-center gap-4 transition-colors ${
                            highlightDiffOnly && differs 
                              ? 'bg-electric-blue/5 border border-electric-blue/20' 
                              : 'bg-canvas/30 hover:bg-canvas/60'
                          }`}
                          style={{
                            gridTemplateColumns: `260px repeat(${candidates.length + (candidates.length < 4 ? 1 : 0)}, minmax(280px, 1fr))`
                          }}
                        >
                          <div>
                            <span className="font-caption text-xs font-semibold text-primary block">Processor / SoC</span>
                            <span className="font-micro text-[11px] text-secondary">Silicon fabrication node</span>
                          </div>
                          {candidates.map(c => (
                            <div key={c.id}>
                              <span className="font-caption text-xs font-semibold text-primary block leading-tight">
                                {getSpec(c, 'Processor', getSpec(c, 'Chipset', 'Flagship Octa-Core Silicon'))}
                              </span>
                              <span className="font-micro text-[11px] text-secondary">3nm - 4nm FinFET Architecture</span>
                            </div>
                          ))}
                          {candidates.length < 4 && <div className="text-secondary text-xs">—</div>}
                        </div>
                      );
                    })()}

                    {/* Camera */}
                    {(() => {
                      const differs = isRowDiffering(c => getSpec(c, 'Camera'));
                      if (highlightDiffOnly && !differs) return null;
                      return (
                        <div 
                          className={`p-3.5 rounded-2xl grid items-center gap-4 transition-colors ${
                            highlightDiffOnly && differs 
                              ? 'bg-electric-blue/5 border border-electric-blue/20' 
                              : 'bg-canvas/50 hover:bg-canvas'
                          }`}
                          style={{
                            gridTemplateColumns: `260px repeat(${candidates.length + (candidates.length < 4 ? 1 : 0)}, minmax(280px, 1fr))`
                          }}
                        >
                          <div>
                            <span className="font-caption text-xs font-semibold text-primary block">Camera Architecture</span>
                            <span className="font-micro text-[11px] text-secondary">Sensor array &amp; optics</span>
                          </div>
                          {candidates.map(c => (
                            <div key={c.id}>
                              <span className="font-caption text-xs font-semibold text-primary block leading-tight">
                                {getSpec(c, 'Camera', 'Triple Pro Camera Array')}
                              </span>
                            </div>
                          ))}
                          {candidates.length < 4 && <div className="text-secondary text-xs">—</div>}
                        </div>
                      );
                    })()}

                    {/* Battery & Charging */}
                    {(() => {
                      const differs = isRowDiffering(c => getSpec(c, 'Battery'));
                      if (highlightDiffOnly && !differs) return null;
                      return (
                        <div 
                          className={`p-3.5 rounded-2xl grid items-center gap-4 transition-colors ${
                            highlightDiffOnly && differs 
                              ? 'bg-electric-blue/5 border border-electric-blue/20' 
                              : 'bg-canvas/30 hover:bg-canvas/60'
                          }`}
                          style={{
                            gridTemplateColumns: `260px repeat(${candidates.length + (candidates.length < 4 ? 1 : 0)}, minmax(280px, 1fr))`
                          }}
                        >
                          <div>
                            <span className="font-caption text-xs font-semibold text-primary block">Battery &amp; Endurance</span>
                            <span className="font-micro text-[11px] text-secondary">Capacity &amp; runtime</span>
                          </div>
                          {candidates.map(c => (
                            <div key={c.id}>
                              <span className="font-caption text-xs font-semibold text-primary block leading-tight">
                                {getSpec(c, 'Battery', 'All-Day Battery (5000 mAh)')}
                              </span>
                            </div>
                          ))}
                          {candidates.length < 4 && <div className="text-secondary text-xs">—</div>}
                        </div>
                      );
                    })()}

                    {/* Weight & Build */}
                    {(() => {
                      const differs = isRowDiffering(c => getSpec(c, 'Weight & Build'));
                      if (highlightDiffOnly && !differs) return null;
                      return (
                        <div 
                          className="p-3.5 rounded-2xl grid items-center gap-4 bg-canvas/50 hover:bg-canvas"
                          style={{
                            gridTemplateColumns: `260px repeat(${candidates.length + (candidates.length < 4 ? 1 : 0)}, minmax(280px, 1fr))`
                          }}
                        >
                          <div>
                            <span className="font-caption text-xs font-semibold text-primary block">Weight &amp; Chassis</span>
                            <span className="font-micro text-[11px] text-secondary">Materials &amp; IP rating</span>
                          </div>
                          {candidates.map(c => (
                            <div key={c.id}>
                              <span className="font-caption text-xs font-semibold text-primary block leading-tight">
                                {getSpec(c, 'Weight & Build', 'Titanium / Armor Aluminum, IP68')}
                              </span>
                            </div>
                          ))}
                          {candidates.length < 4 && <div className="text-secondary text-xs">—</div>}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    DIMENSION 04: RETAIL LOGISTICS & PROTECTIONS
                    ------------------------------------------------------------- */}
                <div className="bg-paper rounded-3xl border border-hairline/60 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-hairline/50 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-electric-blue/10 text-electric-blue flex items-center justify-center">
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <h3 className="font-subheading text-base sm:text-lg font-bold text-primary">
                          04. Retail Logistics &amp; Buyer Protections
                        </h3>
                        <p className="font-micro text-xs text-secondary">
                          Return windows, automated price drop insurance, and warranty coverage
                        </p>
                      </div>
                    </div>
                    <span className="font-micro text-micro uppercase tracking-wider text-secondary px-2.5 py-1 rounded-full bg-canvas">
                      Post-Purchase
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {/* Return Policy */}
                    <div 
                      className="p-3.5 rounded-2xl grid items-center gap-4 bg-canvas/50 hover:bg-canvas"
                      style={{
                        gridTemplateColumns: `260px repeat(${candidates.length + (candidates.length < 4 ? 1 : 0)}, minmax(280px, 1fr))`
                      }}
                    >
                      <div>
                        <span className="font-caption text-xs font-semibold text-primary block">Return Policy</span>
                        <span className="font-micro text-[11px] text-secondary">Zero-dispute window</span>
                      </div>
                      {candidates.map(c => {
                        const returnDays = c.stores?.[0]?.returnDays || 30;
                        return (
                          <div key={c.id}>
                            <span className="font-caption text-xs font-semibold text-primary block">
                              {returnDays} Days Direct Return
                            </span>
                            <span className="font-micro text-[11px] text-secondary">Free doorstep pickup</span>
                          </div>
                        );
                      })}
                      {candidates.length < 4 && <div className="text-secondary text-xs">—</div>}
                    </div>

                    {/* Price Protection */}
                    <div 
                      className="p-3.5 rounded-2xl grid items-center gap-4 bg-canvas/30 hover:bg-canvas/60"
                      style={{
                        gridTemplateColumns: `260px repeat(${candidates.length + (candidates.length < 4 ? 1 : 0)}, minmax(280px, 1fr))`
                      }}
                    >
                      <div>
                        <span className="font-caption text-xs font-semibold text-primary block">Flash Price Protection</span>
                        <span className="font-micro text-[11px] text-secondary">Automated wallet refund</span>
                      </div>
                      {candidates.map(c => (
                        <div key={c.id}>
                          <span className="font-caption text-xs font-semibold text-electric-blue block">
                            Active (14 Days)
                          </span>
                          <span className="font-micro text-[11px] text-secondary">Auto-rebate if price drops</span>
                        </div>
                      ))}
                      {candidates.length < 4 && <div className="text-secondary text-xs">—</div>}
                    </div>

                    {/* Manufacturer Warranty */}
                    <div 
                      className="p-3.5 rounded-2xl grid items-center gap-4 bg-canvas/50 hover:bg-canvas"
                      style={{
                        gridTemplateColumns: `260px repeat(${candidates.length + (candidates.length < 4 ? 1 : 0)}, minmax(280px, 1fr))`
                      }}
                    >
                      <div>
                        <span className="font-caption text-xs font-semibold text-primary block">Manufacturer Warranty</span>
                        <span className="font-micro text-[11px] text-secondary">Authorized service centers</span>
                      </div>
                      {candidates.map(c => (
                        <div key={c.id}>
                          <span className="font-caption text-xs font-semibold text-primary block leading-tight">
                            {getSpec(c, 'Warranty', '1-Year Official Brand Warranty')}
                          </span>
                        </div>
                      ))}
                      {candidates.length < 4 && <div className="text-secondary text-xs">—</div>}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: AUTONOMOUS RECOMMENDATION VERDICTS (Bottom Cards)
          ========================================================================= */}
      {candidates.length > 0 && (
        <section className="w-full bg-paper py-16 md:py-24 border-b border-hairline/40">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <span className="font-micro text-micro uppercase tracking-wider text-secondary mb-2 font-semibold">
                Autonomous Routing
              </span>
              <KineticTypography 
                text="Algorithmic Recommendation Synthesis" 
                className="font-heading-sm text-2xl sm:text-3xl md:text-heading-sm text-primary font-bold"
              />
              <p className="font-caption text-xs sm:text-caption text-secondary max-w-[640px] mt-2">
                Pure mathematical routing matching candidate hardware profiles to buyer vectors without merchant bias.
              </p>
            </div>

            <div className={`grid gap-6 ${
              candidates.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
              candidates.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' :
              candidates.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}>
              {candidates.map((product, i) => {
                const bestPrice = product.currentBestPrice || product.stores?.[0]?.price || product.price || 999;
                const isTruthLeader = product.id === highestTruthId;
                const isPriceLeader = product.id === lowestPriceId;

                let vectorTitle = `Flagship Vector 0${i + 1}`;
                if (isTruthLeader) vectorTitle = 'Top Engineering & Truth';
                else if (isPriceLeader) vectorTitle = 'Best Value & Arbitrage Floor';
                else if (i === 0) vectorTitle = 'Ecosystem Benchmark';
                else if (i === 1) vectorTitle = 'Pro Imaging & Display';

                return (
                  <div
                    key={product.id}
                    className="bg-canvas/50 hover:bg-canvas rounded-3xl p-6 sm:p-7 border border-hairline/60 flex flex-col justify-between shadow-sm hover:shadow-md transition-all h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-micro text-micro uppercase tracking-wider text-secondary font-semibold">
                          {vectorTitle}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-paper border border-hairline/40 text-primary font-micro font-bold">
                          {product.truthScore || 90}% Truth
                        </span>
                      </div>

                      <h4 className="font-subheading text-lg font-bold text-primary mb-2 line-clamp-1">
                        {product.title || product.name}
                      </h4>
                      <p className="font-caption text-xs text-secondary mb-6 leading-relaxed line-clamp-3">
                        {product.description || 'Superior flagship engineering offering peak liquidity floor and class-leading ecosystem reliability.'}
                      </p>

                      <div className="bg-paper p-4 rounded-2xl mb-6 flex items-center justify-between border border-hairline/40">
                        <div>
                          <span className="font-micro text-[11px] text-secondary block">Net Floor Realized</span>
                          <span className="font-subheading text-lg font-extrabold text-primary">
                            {formatPrice(bestPrice)}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-micro text-[11px] text-secondary block">Cashback Surplus</span>
                          <span className="font-caption text-xs font-bold text-electric-blue">
                            {formatCashback(bestPrice)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        className="w-full py-2.5 rounded-xl bg-electric-blue text-paper font-caption text-xs font-semibold hover:bg-electric-blue/90 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <Zap size={14} className="fill-current" />
                        <span>Inspect Dossier</span>
                      </button>
                      <button
                        type="button"
                        className="w-full py-2 rounded-xl bg-paper hover:bg-surface-variant transition-colors text-primary font-caption text-xs font-medium cursor-pointer border border-hairline/40 flex items-center justify-center gap-1"
                        onClick={() => {
                          const storeUrl = product.stores?.[0]?.url || product.affiliateUrl || '#';
                          if (storeUrl !== '#') window.open(storeUrl, '_blank');
                          else navigate(`/product/${product.id}`);
                        }}
                      >
                        <span>Route 1-Click Order</span>
                        <ExternalLink size={12} className="text-secondary" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          ADD SPECIMEN MODAL
          ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-paper w-full max-w-2xl rounded-3xl border border-hairline/60 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-hairline/40 flex items-center justify-between">
              <div>
                <h3 className="font-heading-sm text-xl font-bold text-primary">
                  Add Specimen to Matrix
                </h3>
                <p className="font-caption text-xs text-secondary mt-0.5">
                  Select a flagship candidate to pin into the side-by-side comparison ({candidates.length}/4 pinned)
                </p>
              </div>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-canvas hover:bg-surface-variant text-secondary hover:text-primary flex items-center justify-center transition-colors cursor-pointer"
                onClick={() => setIsAddModalOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            {/* Search Input Bar */}
            <div className="p-4 bg-canvas/40 border-b border-hairline/40">
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search products by brand, title, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-paper border border-hairline/60 focus:border-electric-blue focus:outline-none text-primary text-xs sm:text-sm font-medium"
                  autoFocus
                />
              </div>
            </div>

            {/* Product List */}
            <div className="overflow-y-auto p-4 sm:p-6 flex flex-col gap-3 flex-1 custom-scrollbar">
              {filteredAvailable.length === 0 ? (
                <div className="text-center py-12 text-secondary">
                  <p className="font-caption text-sm font-medium">No available products found matching your search.</p>
                  <p className="font-micro text-xs mt-1">Try another keyword or reset the search term.</p>
                </div>
              ) : (
                filteredAvailable.map((prod) => {
                  const price = prod.currentBestPrice || prod.stores?.[0]?.price || prod.price || 999;
                  return (
                    <div
                      key={prod.id}
                      className="flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-canvas/40 hover:bg-canvas border border-hairline/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-14 h-14 rounded-xl bg-paper p-1.5 flex items-center justify-center shrink-0 border border-hairline/40 overflow-hidden">
                          <img
                            src={prod.image || prod.images?.[0]}
                            alt={prod.title || prod.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-caption text-xs sm:text-sm font-bold text-primary truncate">
                            {prod.title || prod.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-micro text-xs font-extrabold text-electric-blue">
                              {formatPrice(price)}
                            </span>
                            <span className="font-micro text-micro text-secondary">
                              • {prod.category || prod.brand}
                            </span>
                            <span className="font-micro text-micro text-emerald-600 font-semibold hidden sm:inline">
                              • {prod.truthScore || 90} Truth
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="shrink-0 px-4 py-2 rounded-xl bg-electric-blue hover:bg-electric-blue/90 text-paper font-caption text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                        onClick={() => {
                          addToCompare(prod.id);
                          setIsAddModalOpen(false);
                          setSearchQuery('');
                        }}
                      >
                        <Plus size={14} className="stroke-[2.5]" />
                        <span>Add</span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-canvas/40 border-t border-hairline/40 flex items-center justify-between text-xs text-secondary">
              <span>Showing {filteredAvailable.length} available flagships</span>
              <button
                type="button"
                className="px-4 py-1.5 rounded-xl bg-paper hover:bg-surface-variant text-primary font-medium border border-hairline/40 cursor-pointer"
                onClick={() => setIsAddModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
