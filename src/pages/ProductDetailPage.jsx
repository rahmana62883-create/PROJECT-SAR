import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/formatters';
import { 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Scale, 
  Heart, 
  Bookmark, 
  Bell, 
  Share2,
  ChevronRight
} from 'lucide-react';
import { RevealSection, KineticTypography } from '../components/common/MotionComponents';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    products,
    isInWatchlist,
    toggleWatchlist,
    addToCompare,
    compareList,
    openPriceAlertModal,
    showToast
  } = useApp();

  const product = products.find(p => p.id === id) || products[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState('Natural Titanium');
  const [chartRange, setChartRange] = useState('180D');
  const [couponApplied, setCouponApplied] = useState(true);

  if (!product) {
    return (
      <div className="pt-24 text-center py-20">
        <h2 className="text-xl font-semibold">Product Not Found</h2>
        <button
          className="mt-4 px-6 py-2 rounded-full bg-electric-blue text-paper font-caption"
          onClick={() => navigate('/catalog')}
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const isWish = isInWatchlist(product.id);
  const isCompared = compareList.includes(product.id);
  const bestPrice = product.currentBestPrice || product.stores?.[0]?.price || product.price || 999;
  const msrp = product.originalMSRP || product.volatilityTrajectory?.msrp || product.msrp || Math.round(bestPrice * 1.15);
  const savings = Math.max(0, msrp - bestPrice);
  const savingsPercent = Math.round((savings / msrp) * 100);
  const cashbackAmount = (bestPrice * 0.01).toFixed(2);

  const images = product.images && product.images.length ? product.images : [
    product.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
  ];
  const currentImg = images[activeImageIdx] || images[0];

  const finishes = [
    { name: 'Natural Titanium', hex: '#beb9b2' },
    { name: 'Black Titanium', hex: '#444446' },
    { name: 'White Titanium', hex: '#e4e2de' },
    { name: 'Blue Titanium', hex: '#3a444d' },
  ];

  // Stores array
  const stores = product.stores && product.stores.length ? product.stores : [
    { id: 'amz', name: 'Amazon.in', price: bestPrice, badge: 'Arbitrage Floor', note: 'Direct Shipped • Free One-Day', cashback: `+${formatPrice(cashbackAmount)} (1%)` },
    { id: 'fk', name: 'Flipkart', price: Math.round(bestPrice * 1.03), note: 'Assured Delivery • Axis Bank Offer', cashback: `+${formatPrice(Math.round(bestPrice * 0.01))} (1%)` },
    { id: 'croma', name: 'Tata Croma', price: Math.round(bestPrice * 1.05), note: 'In-store pickup available today', cashback: `+${formatPrice(Math.round(bestPrice * 0.005))} (0.5%)` },
    { id: 'rel', name: 'Reliance Digital', price: Math.round(bestPrice * 1.04), note: 'Express 4-Hour Delivery', cashback: `+${formatPrice(Math.round(bestPrice * 0.01))} (1%)` },
  ];

  return (
    <div className="w-full bg-paper min-h-screen text-primary antialiased selection:bg-electric-blue selection:text-paper pt-11">
      
      {/* Top Telemetry Breadcrumb Ribbon */}
      <div className="w-full bg-canvas py-2 px-6 border-b border-hairline/40 text-center">
        <p className="font-micro text-micro text-secondary tracking-tight font-medium">
          Autonomous Shopping Intelligence • Real-time Arbitrage across 48 Stores • Zero Hidden Fees
        </p>
      </div>

      {/* =========================================================================
          SECTION 1: HERO PRODUCT DOSSIER
          ========================================================================= */}
      <section className="w-full bg-paper pt-8 pb-16 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          
          {/* Eyebrow & Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-caption text-caption uppercase tracking-wider text-secondary font-medium">
                Flash Intelligence Dossier
              </span>
              <span className="text-secondary opacity-30">•</span>
              <span className="font-micro text-micro tracking-normal font-semibold text-ember px-2.5 py-0.5 rounded-full bg-canvas">
                HISTORICAL FLOOR REACHED
              </span>
            </div>
            <div className="flex items-center gap-2 text-secondary font-caption text-caption">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-blue"></span>
              <span>Verified 4 minutes ago via Node US-East</span>
            </div>
          </div>

          {/* Hero Header */}
          <div className="max-w-4xl mb-10">
            <KineticTypography 
              text={product.name || product.title}
              className="font-display text-4xl sm:text-6xl md:text-7xl text-primary tracking-tight mb-3 font-bold leading-none"
              delay={100}
            />
            <RevealSection delay={200} direction="up">
            <p className="font-body text-base sm:text-body text-secondary max-w-2xl leading-relaxed">
              {product.category || 'Luxury Hardware'} • Grade 5 Architectural Chassis • A17 Pro Silicon Matrix
            </p>
            </RevealSection>
          </div>

          {/* Visual Stage & Real-time Delta */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Studio Product View in 28px Radius Vessel (7 cols) */}
            <div className="lg:col-span-7 bg-canvas rounded-28 p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden border border-hairline/40">
              <div className="absolute top-6 left-8 flex items-center gap-2">
                <span className="font-micro text-micro font-medium uppercase tracking-wider text-secondary">
                  Specimen ID #{product.id.slice(0, 8).toUpperCase()}
                </span>
              </div>

              <div className="w-full max-w-[400px] aspect-square flex items-center justify-center py-6">
                <img
                  src={currentImg}
                  alt={product.title || product.name}
                  className="w-full h-full object-contain select-none"
                />
              </div>

              {/* Color Finish Swatches */}
              <div className="mt-4 flex flex-col items-center gap-2.5">
                <span className="font-micro text-micro text-secondary tracking-tight">
                  Finish: <strong className="text-primary font-medium">{selectedFinish}</strong>
                </span>
                <div className="flex items-center gap-3">
                  {finishes.map((f) => (
                    <button
                      key={f.name}
                      type="button"
                      onClick={() => setSelectedFinish(f.name)}
                      className={`w-8 h-8 rounded-full transition-transform cursor-pointer ${
                        selectedFinish === f.name
                          ? 'scale-110 ring-2 ring-primary ring-offset-2'
                          : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: f.hex }}
                      title={f.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Real-time Delta & Direct Actions (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="mb-8">
                <span className="font-caption text-caption text-secondary block mb-1">
                  Live Arbitraged Net Best
                </span>
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span className="font-heading-lg text-4xl sm:text-heading-lg text-primary tracking-tight font-bold">
                    {formatPrice(bestPrice)}
                  </span>
                  {savings > 0 && (
                    <span className="font-subheading text-xl text-secondary line-through opacity-60">
                      {formatPrice(msrp)}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-canvas text-primary font-caption text-caption font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue"></span>
                    Save {formatPrice(savings)} ({savingsPercent}% Below Market Avg)
                  </span>
                  <span className="font-caption text-caption text-secondary">MSRP {formatPrice(msrp)}</span>
                </div>
              </div>

              {/* Direct Execution Module */}
              <div className="flex flex-col gap-3.5 mb-8">
                <button
                  type="button"
                  className="w-full h-12 rounded-full bg-electric-blue text-paper font-body-sm text-body-sm font-semibold flex items-center justify-center gap-2 hover:opacity-95 transition-opacity text-center cursor-pointer shadow-sm"
                  onClick={() => {
                    const storeUrl = product.stores?.[0]?.url || product.affiliateUrl || '#';
                    if (storeUrl !== '#') window.open(storeUrl, '_blank');
                    else showToast(`Routing instant order for ${product.title || product.name}`);
                  }}
                >
                  <span>Route Order via {product.stores?.[0]?.name || 'Amazon India'} ({formatPrice(bestPrice)})</span>
                  <ArrowRight size={18} />
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="h-11 rounded-full bg-canvas text-primary font-caption text-caption font-medium hover:bg-surface-variant transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    onClick={() => {
                      const promoCode = product.coupon?.code || 'INDIA500';
                      const promoDisc = product.coupon?.discount ? formatPrice(product.coupon.discount) : formatPrice(Math.round(bestPrice * 0.05));
                      setCouponApplied(!couponApplied);
                      showToast(couponApplied ? 'Coupon unapplied' : `Code ${promoCode} applied: -${promoDisc}`);
                    }}
                  >
                    <CheckCircle2 size={16} className={couponApplied ? 'text-electric-blue' : 'text-secondary'} />
                    <span>{couponApplied ? `Code ${product.coupon?.code || 'INDIA500'} Applied` : 'Apply Promo Code'}</span>
                  </button>

                  <button
                    type="button"
                    className="h-11 rounded-full bg-canvas text-primary font-caption text-caption font-medium hover:bg-surface-variant transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    onClick={() => {
                      addToCompare(product.id);
                      navigate('/compare');
                    }}
                  >
                    <Scale size={16} className={isCompared ? 'text-electric-blue' : 'text-secondary'} />
                    <span>{isCompared ? 'In Matrix' : 'Pin to Matrix'}</span>
                  </button>
                </div>
              </div>

              {/* Value Guarantees Card */}
              <div className="bg-canvas rounded-28 p-6 flex flex-col gap-3 border border-hairline/40">
                <div className="flex items-center gap-3">
                  <Zap size={18} className="text-electric-blue fill-electric-blue shrink-0" />
                  <p className="font-caption text-caption text-primary font-medium">
                    Earn +1.0% (${cashbackAmount}) Flash Cashback direct to Wallet
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-secondary shrink-0" />
                  <p className="font-caption text-caption text-secondary">
                    Backed by 30-Day Zero-Dispute Price Drop Assurance
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: 4-RING ACTIVITY TRUTH SCORE & REASONER
          ========================================================================= */}
      <section className="w-full bg-canvas py-16 md:py-24 border-y border-hairline/40">
        <div className="max-w-[1200px] mx-auto px-6">
          <RevealSection delay={100} threshold={0.1}>
          <div className="mb-12">
            <span className="font-caption text-caption text-secondary font-medium tracking-wide uppercase">
              Algorithmic Synthesis
            </span>
            <KineticTypography 
              text="Autonomous Quality & Timing Signal" 
              className="font-heading text-2xl sm:text-3xl lg:text-heading text-primary mt-1 font-bold"
              delay={150}
            />
          </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Concentric Activity Gauge Card (5 cols) */}
            <div className="lg:col-span-5 bg-paper rounded-28 p-8 md:p-10 flex flex-col justify-between border border-hairline/40 shadow-apple-card">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-caption text-caption uppercase tracking-wider text-secondary font-semibold">
                    Truth Score Audit
                  </span>
                  <span className="font-micro text-micro px-2.5 py-0.5 rounded-full bg-canvas text-primary font-medium">
                    98.4% Confidence
                  </span>
                </div>

                {/* Concentric Rings Visual */}
                <div className="relative w-60 h-60 mx-auto my-4 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 240 240">
                    {/* Ring 1: Build Quality (Radius 100) */}
                    <circle cx="120" cy="120" fill="transparent" r="100" stroke="#f1edec" strokeWidth="10" />
                    <circle cx="120" cy="120" fill="transparent" r="100" stroke="#1d1d1f" strokeDasharray="628.3" strokeDashoffset="31.4" strokeLinecap="round" strokeWidth="10" />
                    {/* Ring 2: Performance (Radius 82) */}
                    <circle cx="120" cy="120" fill="transparent" r="82" stroke="#f1edec" strokeWidth="10" />
                    <circle cx="120" cy="120" fill="transparent" r="82" stroke="#0071e3" strokeDasharray="515.2" strokeDashoffset="10.3" strokeLinecap="round" strokeWidth="10" />
                    {/* Ring 3: Reliability (Radius 64) */}
                    <circle cx="120" cy="120" fill="transparent" r="64" stroke="#f1edec" strokeWidth="10" />
                    <circle cx="120" cy="120" fill="transparent" r="64" stroke="#707070" strokeDasharray="402.1" strokeDashoffset="36.2" strokeLinecap="round" strokeWidth="10" />
                    {/* Ring 4: Value Arbitrage (Radius 46) */}
                    <circle cx="120" cy="120" fill="transparent" r="46" stroke="#f1edec" strokeWidth="10" />
                    <circle cx="120" cy="120" fill="transparent" r="46" stroke="#b64400" strokeDasharray="289.0" strokeDashoffset="80.9" strokeLinecap="round" strokeWidth="10" />
                  </svg>
                  {/* Center Certified Value */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-heading text-4xl font-bold text-primary tracking-tight">
                      {product.truthScore || 89}
                    </span>
                    <span className="font-micro text-micro uppercase tracking-wider text-secondary font-semibold -mt-1">
                      / 100 Certified
                    </span>
                  </div>
                </div>
              </div>

              {/* Ring Metric Legend */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-6 border-t border-hairline/40">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1d1d1f]"></span>
                  <span className="font-caption text-caption text-secondary">Build Quality <strong className="text-primary font-medium">95%</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-electric-blue"></span>
                  <span className="font-caption text-caption text-secondary">Performance <strong className="text-primary font-medium">98%</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#707070]"></span>
                  <span className="font-caption text-caption text-secondary">Reliability <strong className="text-primary font-medium">91%</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-ember"></span>
                  <span className="font-caption text-caption text-secondary">Value Index <strong className="text-primary font-medium">72%</strong></span>
                </div>
              </div>
            </div>

            {/* Explainable Intelligence Reasoner Card (7 cols) */}
            <div className="lg:col-span-7 bg-paper rounded-28 p-8 md:p-10 flex flex-col justify-between border border-hairline/40 shadow-apple-card">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-caption text-caption uppercase tracking-wider text-secondary font-semibold">
                    Predictive Recommendation
                  </span>
                  <span className="font-micro text-micro text-secondary">Model v4.8 deterministic</span>
                </div>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-heading-sm text-2xl sm:text-heading-sm text-primary font-bold">STRONG BUY</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-canvas text-electric-blue font-caption text-caption font-semibold">
                    94% Confidence
                  </span>
                </div>

                <p className="font-body-sm text-sm sm:text-body-sm text-secondary mb-8 leading-relaxed">
                  Based on historical telemetry of previous retail cycles, current retailer inventory saturation, and verified clearance momentum, the current {formatPrice(bestPrice)} price sits safely in the lowest 2.1st percentile of observed trading values.
                </p>

                {/* Evidence List */}
                <div className="flex flex-col gap-3.5 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-electric-blue shrink-0 mt-0.5" />
                    <span className="font-caption text-caption text-primary">
                      Within 4.5% of verified all-time historical best ({formatPrice(Math.round(bestPrice * 0.95))} recorded Festive Sale Flash).
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-electric-blue shrink-0 mt-0.5" />
                    <span className="font-caption text-caption text-primary">
                      {formatPrice(savings)} real-time cross-merchant spread between Amazon India and authorized retail stores.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-electric-blue shrink-0 mt-0.5" />
                    <span className="font-caption text-caption text-primary">
                      Verified authentic Indian retailer inventory with official manufacturer warranty and GST invoice support.
                    </span>
                  </div>
                </div>
              </div>

              {/* Fair Price Range Scale */}
              <div className="p-5 bg-canvas rounded-28 border border-hairline/30">
                <div className="flex items-center justify-between text-caption font-caption mb-2">
                  <span className="text-secondary">Optimal Acquisition Range</span>
                  <span className="text-primary font-semibold">
                    {formatPrice(Math.round(bestPrice * 0.95))} – {formatPrice(Math.round(bestPrice * 1.05))}
                  </span>
                </div>
                <div className="w-full h-2 bg-hairline rounded-full overflow-hidden relative">
                  <div className="absolute left-[15%] w-[45%] h-full bg-electric-blue rounded-full"></div>
                  <div className="absolute left-[38%] top-0 bottom-0 w-1 bg-primary"></div>
                </div>
                <div className="flex justify-between font-micro text-micro text-secondary mt-1.5">
                  <span>{formatPrice(Math.round(bestPrice * 0.9))} (Extreme Low)</span>
                  <span className="text-primary font-medium">Current: {formatPrice(bestPrice)}</span>
                  <span>{formatPrice(msrp)} (MSRP Cap)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: 180-DAY VOLATILITY & TRAJECTORY SVG CHART
          ========================================================================= */}
      <section className="w-full bg-paper py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <RevealSection delay={100} threshold={0.1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="font-caption text-caption text-secondary font-medium tracking-wide uppercase">
                Historical Feed
              </span>
              <KineticTypography 
                text="180-Day Volatility & Floor Trajectory"
                className="font-heading text-2xl sm:text-heading text-primary mt-1 font-bold"
                delay={150}
              />
            </div>

            {/* Period Switcher */}
            <div className="flex items-center bg-canvas p-1 rounded-full">
              {['30D', '90D', '180D', '1Y'].map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setChartRange(range)}
                  className={`px-4 py-1.5 rounded-full font-caption text-caption transition-all cursor-pointer ${
                    chartRange === range
                      ? 'bg-paper text-primary font-medium shadow-sm'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Chart Container */}
          <div className="bg-canvas rounded-28 p-6 md:p-10 border border-hairline/40">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <span className="font-micro text-micro text-secondary uppercase">Observed Peak</span>
                  <p className="font-caption text-caption font-semibold text-primary">
                    {formatPrice(Math.round(bestPrice * 1.15))} (Jul)
                  </p>
                </div>
                <div>
                  <span className="font-micro text-micro text-secondary uppercase">Verified Floor</span>
                  <p className="font-caption text-caption font-semibold text-electric-blue">
                    {formatPrice(bestPrice)} (Today)
                  </p>
                </div>
                <div>
                  <span className="font-micro text-micro text-secondary uppercase">Volatility Index</span>
                  <p className="font-caption text-caption font-semibold text-primary">3.8% Low</p>
                </div>
              </div>
              <span className="font-micro text-micro text-secondary">Hourly aggregation across 48 storefront nodes</span>
            </div>

            {/* SVG Wave */}
            <div className="w-full h-56 md:h-64 my-4">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 240">
                <defs>
                  <linearGradient id="curveGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0071e3" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="#0071e3" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal Guide Lines */}
                <line stroke="#e5e2e1" strokeDasharray="4 4" x1="0" x2="1000" y1="40" y2="40" />
                <line stroke="#e5e2e1" strokeDasharray="4 4" x1="0" x2="1000" y1="120" y2="120" />
                <line stroke="#e5e2e1" strokeDasharray="4 4" x1="0" x2="1000" y1="200" y2="200" />
                {/* Filled Path */}
                <path
                  d="M 0 60 Q 200 70 350 110 T 700 150 T 1000 180 L 1000 240 L 0 240 Z"
                  fill="url(#curveGradient)"
                />
                {/* Trajectory Stroke */}
                <path
                  d="M 0 60 Q 200 70 350 110 T 700 150 T 1000 180"
                  fill="none"
                  stroke="#0071e3"
                  strokeWidth="3"
                />
                {/* Live Node Marker */}
                <circle cx="1000" cy="180" fill="#0071e3" r="6" />
                <circle cx="1000" cy="180" fill="none" stroke="#0071e3" strokeWidth="2" r="10" opacity="0.5" />
              </svg>
            </div>
          </div>
          </RevealSection>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: MULTI-STORE ARBITRAGE MATRIX
          ========================================================================= */}
      <section className="w-full bg-canvas py-16 md:py-24 border-t border-hairline/40">
        <div className="max-w-[1200px] mx-auto px-6">
          <RevealSection delay={100} threshold={0.1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-caption text-caption text-secondary uppercase tracking-wider font-semibold">
                Multi-Node Breakdown
              </span>
              <KineticTypography 
                text="Real-Time Merchant Clearance Spreads"
                className="font-heading text-2xl sm:text-heading text-primary font-bold mt-1"
                delay={150}
              />
            </div>
            <p className="font-caption text-caption text-secondary max-w-sm">
              Prices inclusive of direct checkout merchant coupons, logistics fees, and flashcompare.ai instantaneous wallet rebates.
            </p>
          </div>
          </RevealSection>

          {/* Borderless Matrix Container */}
          <div className="bg-paper rounded-28 overflow-hidden border border-hairline/40 shadow-apple-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-hairline/60 bg-canvas/50">
                    <th className="py-4 px-6 font-caption text-caption uppercase tracking-wider text-secondary font-medium">Merchant &amp; Node</th>
                    <th className="py-4 px-6 font-caption text-caption uppercase tracking-wider text-secondary font-medium">Item Base</th>
                    <th className="py-4 px-6 font-caption text-caption uppercase tracking-wider text-secondary font-medium">Adjustments</th>
                    <th className="py-4 px-6 font-caption text-caption uppercase tracking-wider text-secondary font-medium">Net Realized</th>
                    <th className="py-4 px-6 font-caption text-caption uppercase tracking-wider text-secondary font-medium">Flash Cashback</th>
                    <th className="py-4 px-6 font-caption text-caption uppercase tracking-wider text-secondary font-medium text-right">Route Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline/40">
                  {stores.map((store, i) => (
                    <tr key={store.id || i} className={i === 0 ? 'bg-canvas/30' : 'hover:bg-canvas/20 transition-colors'}>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-canvas flex items-center justify-center font-caption text-caption font-bold text-primary">
                            {store.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-caption text-caption font-semibold text-primary">{store.name}</span>
                              {store.badge && (
                                <span className="font-micro text-micro px-2 py-0.5 rounded-full bg-electric-blue/10 text-electric-blue font-medium">
                                  {store.badge}
                                </span>
                              )}
                            </div>
                            <span className="font-micro text-micro text-secondary">{store.note}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6 font-caption text-caption text-secondary">{formatPrice(Math.round(store.price * 1.05))}</td>
                      <td className="py-5 px-6">
                        <span className="font-caption text-caption text-ember font-medium">-{formatPrice(Math.max(500, Math.round(store.price * 0.05)))} Promo</span>
                      </td>
                      <td className="py-5 px-6">
                        <span className="font-subheading text-lg font-bold text-primary">{formatPrice(store.price)}</span>
                      </td>
                      <td className="py-5 px-6">
                        <span className="font-caption text-caption font-semibold text-electric-blue">
                          {store.cashback || `+${formatPrice(Math.max(1, Math.round(store.price * 0.01)))} (1%)`}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 px-5 py-2 rounded-full bg-electric-blue text-paper font-caption text-caption font-semibold hover:opacity-95 transition-opacity cursor-pointer"
                          onClick={() => {
                            if (store.url) window.open(store.url, '_blank');
                            else showToast(`Opening ${store.name} store route`);
                          }}
                        >
                          <span>Route Order</span>
                          <ExternalLink size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
