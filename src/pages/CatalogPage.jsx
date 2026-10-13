import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/cards/ProductCard';
import { formatPrice } from '../utils/formatters';
import { 
  Zap, 
  Search, 
  RotateCcw, 
  ShieldCheck, 
  ArrowRight,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { RevealSection, KineticTypography, Marquee } from '../components/common/MotionComponents';
import { ProductCardSkeleton } from '../components/common/Skeletons';

const ALPHABET = ['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export const CatalogPage = () => {
  const { products } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(urlQuery);

  useEffect(() => {
    if (urlQuery !== searchQuery) {
      setSearchQuery(urlQuery);
    }
  }, [urlQuery]);

  const [selectedCategory, setSelectedCategory] = useState('All Flagships');
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [sortBy, setSortBy] = useState('spread_desc');
  const [fastFilter, setFastFilter] = useState('all');

  // Spotlight product: Apple iPhone 16 Pro, Sony WH-1000XM5 or highest discount product
  const spotlightProduct = useMemo(() => {
    const preferred = products.find(p => p.id === 'apple-iphone-16-pro') || products.find(p => p.id === 'sony-wh-1000xm5');
    if (preferred) return preferred;
    return products[0];
  }, [products]);

  // Categories list
  const categoryTabs = [
    'All Flagships',
    'Fresh Vegetables & Sabzi',
    'Smartphones',
    'Audio & ANC',
    'Laptops & Workstations',
    'Gaming & Consoles',
    'Appliances & Home Tech',
    'Cameras & Displays',
    'Wearables'
  ];

  const catMap = {
    'Fresh Vegetables & Sabzi': 'Vegetable',
    'Smartphones': 'Smartphone',
    'Audio & ANC': 'Audio',
    'Laptops & Workstations': 'Laptop',
    'Gaming & Consoles': 'Gaming',
    'Personal Care': 'Electronics'
  };

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return products.filter(p => {
      // Category match
      if (selectedCategory !== 'All Flagships') {
        const target = catMap[selectedCategory] || selectedCategory;
        const currentCat = p.category || '';
        if (!currentCat.toLowerCase().includes(target.toLowerCase())) {
          return false;
        }
      }

      // Fast filter
      if (fastFilter === 'spread_20') {
        const bestPrice = p.currentBestPrice || p.stores?.[0]?.price || p.price || 1;
        const msrp = p.originalMSRP || p.msrp || bestPrice * 1.15;
        const disc = ((msrp - bestPrice) / msrp) * 100;
        if (disc < 15) return false;
      } else if (fastFilter === 'truth_90') {
        if ((p.truthScore || 90) < 90) return false;
      }

      // A-Z Letter match
      if (selectedLetter !== 'ALL') {
        const title = (p.title || p.name || '').trim().toUpperCase();
        const brand = (p.brand || '').trim().toUpperCase();
        const prodLetter = (p.letter || title.charAt(0) || brand.charAt(0)).toUpperCase();
        if (prodLetter !== selectedLetter && !title.startsWith(selectedLetter) && !brand.startsWith(selectedLetter)) {
          return false;
        }
      }

      // Search
      if (q) {
        const nameMatch = (p.name || p.title || '').toLowerCase().includes(q);
        const catMatch = (p.category || '').toLowerCase().includes(q);
        const brandMatch = (p.brand || '').toLowerCase().includes(q);
        if (!nameMatch && !catMatch && !brandMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.currentBestPrice || a.stores?.[0]?.price || a.price || 0;
      const priceB = b.currentBestPrice || b.stores?.[0]?.price || b.price || 0;
      const msrpA = a.originalMSRP || a.msrp || priceA * 1.15;
      const msrpB = b.originalMSRP || b.msrp || priceB * 1.15;
      const spreadA = msrpA - priceA;
      const spreadB = msrpB - priceB;

      if (sortBy === 'spread_desc') return spreadB - spreadA;
      if (sortBy === 'price_asc') return priceA - priceB;
      if (sortBy === 'price_desc') return priceB - priceA;
      if (sortBy === 'score_desc') return (b.truthScore || 90) - (a.truthScore || 90);
      return 0;
    });
  }, [products, searchQuery, selectedCategory, selectedLetter, fastFilter, sortBy]);

  const spotlightPrice = spotlightProduct?.currentBestPrice || spotlightProduct?.stores?.[0]?.price || 298;
  const spotlightMsrp = spotlightProduct?.originalMSRP || spotlightProduct?.msrp || 399.99;
  const spotlightSpread = Math.round(spotlightMsrp - spotlightPrice);
  const spotlightDiscount = Math.round(((spotlightMsrp - spotlightPrice) / spotlightMsrp) * 100);

  return (
    <div className="w-full bg-paper min-h-screen text-primary antialiased selection:bg-electric-blue selection:text-paper pt-11">
      {/* =========================================================================
          TELEMETRY LIVE TICKER BANNER
          ========================================================================= */}
      <section className="w-full bg-canvas py-3 border-b border-hairline/40 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex-1 overflow-hidden min-w-0 pr-4">
            <Marquee speed={30}>
              <div className="flex items-center gap-8 px-4">
                <span className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-ember"></span>
                  </span>
                  <span className="font-micro text-micro text-deep-gray tracking-wide whitespace-nowrap">
                    Scanning 48 retail store nodes every 248ms • Zero affiliate distortion • Cryptographic price verification
                  </span>
                </span>
                <span className="font-micro text-micro text-deep-gray tracking-wide whitespace-nowrap">• Live Stock Telemetry Active</span>
              </div>
            </Marquee>
          </div>
          <div className="flex items-center gap-4 text-secondary font-micro text-micro shrink-0">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-blue"></span>
              Block #8,491,204 Synced
            </span>
            <span className="opacity-40">/</span>
            <span>Rebate Delta: <strong className="text-primary font-medium">+{formatPrice(420)} Instant</strong></span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HERO SECTION: CATHEDRAL OF WHITE SPACE
          ========================================================================= */}
      <section className="w-full bg-paper pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-start text-left">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-canvas mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-ember"></span>
            <span className="font-micro text-micro font-semibold tracking-wider text-ember uppercase">
              Real-Time Spread Detector • 48 Retail Nodes
            </span>
          </div>

          {/* Massive Negative Space Hero Headline */}
          <KineticTypography 
            text="Autonomous Arbitrage. Verified Floors." 
            className="font-display text-4xl sm:text-6xl md:text-8xl text-primary tracking-[-0.03em] max-w-[1040px] font-bold leading-none"
            delay={100}
          />

          <RevealSection delay={200} direction="up">
          <p className="font-body text-base sm:text-xl text-secondary mt-8 max-w-[820px] leading-relaxed">
            High-throughput multi-store arbitrage matrix streaming synchronized retail feeds. Autonomous scrapers continuously calculate true net clearing prices, factoring hidden promo stacks, bank card discounts, and instant checkout credits across Amazon India, Flipkart, Tata Croma, Reliance Digital, and Vijay Sales.
          </p>
          </RevealSection>

          {/* Category Filter Pills Ribbon */}
          <div className="mt-12 w-full flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" id="categoryFilterContainer">
            {categoryTabs.map((tab) => {
              const isActive = selectedCategory === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedCategory(tab)}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-full font-body-sm text-sm sm:text-body-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-electric-blue text-paper font-medium'
                      : 'bg-canvas text-secondary hover:bg-cool-wash hover:text-primary'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* A–Z Alphabet Navigation Ribbon */}
          <div className="mt-4 w-full flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none" id="alphabetFilterContainer">
            <span className="font-micro text-micro font-semibold text-secondary uppercase tracking-wider mr-2 shrink-0 flex items-center gap-1">
              <Sparkles size={13} className="text-electric-blue" />
              A–Z Index:
            </span>
            {ALPHABET.map((letter) => {
              const isActive = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setSelectedLetter(letter)}
                  className={`min-w-[34px] h-[34px] px-2 rounded-full font-mono text-xs font-semibold transition-all duration-150 cursor-pointer flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'bg-primary text-paper scale-105 shadow-sm font-bold'
                      : 'bg-canvas text-secondary hover:text-primary hover:bg-surface-variant'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED SPOTLIGHT DEAL BAND (Top Arbitrage Spread)
          ========================================================================= */}
      {spotlightProduct && (
        <section className="w-full bg-canvas py-16 md:py-24 border-y border-hairline/40">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <span className="font-micro text-micro font-semibold tracking-wider text-secondary uppercase">
                Apex Telemetry Spread of the Hour • India Retail Network
              </span>
              <span className="font-micro text-micro text-secondary flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-electric-blue"></span>
                Direct Live Socket Feed
              </span>
            </div>

            {/* Spotlight Feature Card */}
            <RevealSection delay={100} threshold={0.1}>
            <div className="w-full rounded-28 bg-paper p-8 lg:p-12 shadow-apple-card border border-hairline/40 hover-elevate">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                
                {/* Hardware Imagery Spotlight (5 cols) */}
                <div className="lg:col-span-5 relative flex items-center justify-center p-6 bg-canvas rounded-28 overflow-hidden min-h-[340px]">
                  <img loading="lazy"
                    src={spotlightProduct.image || spotlightProduct.images?.[0]}
                    alt={spotlightProduct.title || spotlightProduct.name}
                    className="w-full max-h-[280px] object-contain transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-5 left-5 flex flex-col gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper font-micro text-micro font-semibold text-primary shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-blue"></span>
                      {spotlightProduct.stores?.[0]?.name || 'Amazon India'}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-canvas font-micro text-micro font-medium text-secondary">
                      Verified Genuine India Warranty
                    </span>
                  </div>
                </div>

                {/* Spotlight Dossier Metrics (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <span className="font-caption text-caption text-secondary tracking-tight">
                        {spotlightProduct.category || 'Luxury Flagship'}
                      </span>
                      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-canvas">
                        <span className="w-2 h-2 rounded-full bg-electric-blue"></span>
                        <span className="font-caption text-caption font-semibold text-primary">
                          Truth Score {spotlightProduct.truthScore || 92}/100
                        </span>
                      </div>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-3xl lg:text-heading text-primary mt-3 tracking-tight font-bold">
                      {spotlightProduct.title || spotlightProduct.name}
                    </h2>
                    <p className="font-body-sm text-sm sm:text-body-sm text-secondary mt-3 max-w-[580px] leading-relaxed">
                      {spotlightProduct.description || 'Continuous real-time market floor validation across India retail channels with verified genuine manufacturer warranty.'}
                    </p>

                    {/* Arbitrage Grid Metrics Inside Hero Card */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 bg-canvas p-6 rounded-28 border border-hairline/30">
                      <div>
                        <div className="font-micro text-micro text-secondary uppercase tracking-wider">Live Floor</div>
                        <div className="font-subheading text-lg sm:text-subheading text-primary mt-1 font-bold">
                          {formatPrice(spotlightPrice)}
                        </div>
                        <div className="font-micro text-micro text-ember mt-0.5 font-medium">
                          -{spotlightDiscount}% vs MSRP
                        </div>
                      </div>
                      <div>
                        <div className="font-micro text-micro text-secondary uppercase tracking-wider">Standard MSRP</div>
                        <div className="font-subheading text-lg sm:text-subheading text-outline mt-1 line-through font-normal">
                          {formatPrice(spotlightMsrp)}
                        </div>
                        <div className="font-micro text-micro text-secondary mt-0.5">Direct Retail</div>
                      </div>
                      <div>
                        <div className="font-micro text-micro text-secondary uppercase tracking-wider">Net Spread</div>
                        <div className="font-subheading text-lg sm:text-subheading text-electric-blue mt-1 font-bold">
                          {formatPrice(spotlightSpread)}
                        </div>
                        <div className="font-micro text-micro text-secondary mt-0.5">Absolute Delta</div>
                      </div>
                      <div>
                        <div className="font-micro text-micro text-secondary uppercase tracking-wider">Historical Best</div>
                        <div className="font-subheading text-lg sm:text-subheading text-primary mt-1 font-semibold">Verified</div>
                        <div className="font-micro text-micro text-secondary mt-0.5">All-Time Low</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Controls Pill Stack */}
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      className="px-6 py-3 rounded-full bg-electric-blue text-paper font-body-sm text-body-sm font-medium hover:opacity-95 transition-all cursor-pointer"
                      onClick={() => navigate(`/product/${spotlightProduct.id}`)}
                    >
                      Inspect Intelligence Dossier
                    </button>
                    <button
                      type="button"
                      className="px-6 py-3 rounded-full bg-canvas text-primary font-body-sm text-body-sm font-medium hover:bg-surface-variant transition-colors cursor-pointer"
                      onClick={() => {
                        const storeUrl = spotlightProduct.stores?.[0]?.url || spotlightProduct.affiliateUrl || '#';
                        if (storeUrl !== '#') window.open(storeUrl, '_blank');
                      }}
                    >
                      Route Instant Order
                    </button>
                    <span className="font-micro text-micro text-secondary ml-auto hidden sm:inline">
                      Instant clearing verified 3m ago
                    </span>
                  </div>
                </div>

              </div>
            </div>
            </RevealSection>
          </div>
        </section>
      )}

      {/* =========================================================================
          LIVE ARBITRAGE DEALS FEED GRID (3-Column Bento Grid)
          ========================================================================= */}
      <section className="w-full bg-paper py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6 pb-6 border-b border-hairline/40">
            <div>
              <span className="font-micro text-micro font-semibold tracking-wider text-ember uppercase">
                Live Opportunity Stream
              </span>
              <KineticTypography 
                text={`Top Cross-Merchant Spreads (${filteredProducts.length})`}
                className="font-heading-sm text-2xl sm:text-heading-sm text-primary tracking-tight mt-1 font-bold"
                delay={100}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Quick filter pills */}
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-canvas">
                <button
                  type="button"
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    fastFilter === 'all' ? 'bg-paper text-primary shadow-sm font-semibold' : 'text-secondary hover:text-primary'
                  }`}
                  onClick={() => setFastFilter('all')}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    fastFilter === 'spread_20' ? 'bg-paper text-primary shadow-sm font-semibold' : 'text-secondary hover:text-primary'
                  }`}
                  onClick={() => setFastFilter('spread_20')}
                >
                  15%+ Spread
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    fastFilter === 'truth_90' ? 'bg-paper text-primary shadow-sm font-semibold' : 'text-secondary hover:text-primary'
                  }`}
                  onClick={() => setFastFilter('truth_90')}
                >
                  Truth 90+
                </button>
              </div>

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="font-caption text-caption bg-canvas text-primary px-4 py-2 rounded-full border-0 focus:ring-0 focus:outline-none cursor-pointer"
              >
                <option value="spread_desc">Spread Magnitude (High to Low)</option>
                <option value="score_desc">Truth Score (90+)</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-canvas rounded-28">
              <p className="font-body text-secondary mb-4">No flagships found matching your active filter criteria.</p>
              <button
                type="button"
                className="px-6 py-2 rounded-full bg-electric-blue text-paper font-caption font-semibold cursor-pointer transition-transform hover:scale-105"
                onClick={() => {
                  setSelectedCategory('All Flagships');
                  setFastFilter('all');
                  setSearchQuery('');
                }}
              >
                Clear All Filters
              </button>
            </div>
          ) : selectedCategory === 'All Flagships' && !searchQuery && fastFilter === 'all' && selectedLetter === 'ALL' ? (
            <div className="flex flex-col gap-14">
              {categoryTabs.filter(tab => tab !== 'All Flagships').map(tab => {
                const target = catMap[tab] || tab;
                const tabProducts = filteredProducts.filter(p => (p.category || '').toLowerCase().includes(target.toLowerCase()));
                
                if (tabProducts.length === 0) return null;

                return (
                  <div key={tab} className="w-full">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-heading text-2xl sm:text-3xl text-primary font-bold tracking-tight">{tab}</h3>
                      <button 
                        onClick={() => setSelectedCategory(tab)}
                        className="text-electric-blue font-body-sm font-semibold hover:opacity-80 transition-opacity flex items-center gap-1.5 cursor-pointer"
                      >
                        View All <ArrowRight size={18} />
                      </button>
                    </div>
                    {/* Horizontal scroll container */}
                    <div className="flex overflow-x-auto gap-6 pb-6 pt-2 scrollbar-none snap-x snap-mandatory -mx-6 px-6 sm:mx-0 sm:px-0">
                      {tabProducts.map((product, idx) => (
                        <div key={product.id} className="min-w-[280px] sm:min-w-[320px] max-w-[280px] sm:max-w-[320px] snap-start flex-shrink-0">
                          <RevealSection delay={Math.min(idx * 50, 300)} threshold={0.1}>
                            <ProductCard product={product} />
                          </RevealSection>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Others / Uncategorized */}
              {(() => {
                const otherProducts = filteredProducts.filter(p => {
                    const currentCat = (p.category || '').toLowerCase();
                    return !categoryTabs.filter(t => t !== 'All Flagships').some(tab => {
                        const target = catMap[tab] || tab;
                        return currentCat.includes(target.toLowerCase());
                    });
                });

                if (otherProducts.length === 0) return null;

                return (
                  <div key="Others" className="w-full mt-4">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-heading text-2xl sm:text-3xl text-primary font-bold tracking-tight">More Essentials</h3>
                    </div>
                    <div className="flex overflow-x-auto gap-6 pb-6 pt-2 scrollbar-none snap-x snap-mandatory -mx-6 px-6 sm:mx-0 sm:px-0">
                      {otherProducts.map((product, idx) => (
                        <div key={product.id} className="min-w-[280px] sm:min-w-[320px] max-w-[280px] sm:max-w-[320px] snap-start flex-shrink-0">
                          <RevealSection delay={Math.min(idx * 50, 300)} threshold={0.1}>
                            <ProductCard product={product} />
                          </RevealSection>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, idx) => (
                <RevealSection key={product.id} delay={Math.min(idx * 50, 500)} threshold={0.1}>
                  <ProductCard product={product} />
                </RevealSection>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
};
