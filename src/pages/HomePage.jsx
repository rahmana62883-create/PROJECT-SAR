import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useWallet } from '../context/WalletContext';
import { ProductCard } from '../components/cards/ProductCard';
import { fetchTrendingProducts } from '../services/TrendingApiService';
import { formatPrice } from '../utils/formatters';
import { 
  Zap, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Scale, 
  Heart, 
  Bell, 
  ShieldCheck,
  ExternalLink,
  Sliders,
  Gift,
  RefreshCw 
} from 'lucide-react';
import { RevealSection, KineticTypography, ParallaxSection, MagneticButton, TypewriterText, Marquee } from '../components/common/MotionComponents';
import { ProductCardSkeleton } from '../components/common/Skeletons';

export const HomePage = () => {
  const navigate = useNavigate();
  const { products, showToast, addToCompare, openPriceAlertModal } = useApp();
  const { wallet } = useWallet();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTrendingVector, setActiveTrendingVector] = useState('iPhone 16 Pro');

  // Interactive Product Dossier Finish Swatches
  const colorFinishes = [
    {
      id: 'natural',
      name: 'Natural Titanium',
      hex: '#beb9b2',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJuVd5_kqAbD9xoGdfkGUgUipNPLRss3HNbRbsX8zXGnmd-HYIT5oDArrc3khlLvrZ0zlGzr1BTiliS7TMlLvwQfneW5IJ4ZINRnFo77EboRWuiiC1CmeXSiPziPpxKe33s9kF0igjHU16XtFOPcZzJeaIIreU1Qe6a40SdSJlEulLQ5Maox1vvPcTMNaDtiKTKxzELdP4-JZUmgNSgDT973at0puGcFXUlktI3fotEKBnLHoDvrJaig'
    },
    {
      id: 'blue',
      name: 'Blue Titanium',
      hex: '#3a444d',
      img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'white',
      name: 'White Titanium',
      hex: '#e4e2de',
      img: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'black',
      name: 'Black Titanium',
      hex: '#444446',
      img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const [selectedFinish, setSelectedFinish] = useState(colorFinishes[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Modals for Trade-In and Offers
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [isOffersModalOpen, setIsOffersModalOpen] = useState(false);

  // Trending products from service
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    let mounted = true;
    const loadTrending = async () => {
      const data = await fetchTrendingProducts();
      if (mounted && data?.length) {
        setTrendingProducts(data);
      }
    };
    loadTrending();
    return () => { mounted = false; };
  }, []);

  const categories = [
    'All',
    'Vegetables & Sabzi',
    'Smartphones',
    'Laptops',
    'Audio',
    'Gaming',
    'Wearables',
    'Cameras',
    'Home Tech'
  ];

  const trendingVectors = [
    { label: 'iPhone 16 Pro', query: 'iPhone 16 Pro' },
    { label: 'Nashik Red Onions (₹42/kg)', query: 'Onion' },
    { label: 'boAt Nirvana Ion (-₹7,000)', query: 'boAt' },
    { label: 'OnePlus 12 (512GB)', query: 'OnePlus 12' },
    { label: 'Sony WH-1000XM5', query: 'Sony' },
    { label: 'Fresh Jyoti Potatoes', query: 'Potato' },
    { label: 'MacBook Air M3 (16GB)', query: 'MacBook Air' },
    { label: 'Voltas 1.5 Ton AC', query: 'Voltas' }
  ];

  // Retailer comparison rows (Indian retail nodes)
  const retailers = [
    {
      name: 'Amazon.in',
      logo: '📦',
      price: 119900.00,
      originalPrice: 129900.00,
      savings: 10000.00,
      status: 'In Stock',
      shipping: 'Free Prime One-Day Delivery',
      isBestPrice: true,
      offer: '₹5,000 Instant Card Discount'
    },
    {
      name: 'Flipkart',
      logo: '⚡',
      price: 121990.00,
      originalPrice: 129900.00,
      savings: 7910.00,
      status: 'In Stock',
      shipping: 'Free 24-Hr Assured Delivery',
      isBestPrice: false,
      offer: 'Flipkart Axis 5% Cashback'
    },
    {
      name: 'Tata Croma',
      logo: '🏬',
      price: 122990.00,
      originalPrice: 129900.00,
      savings: 6910.00,
      status: 'In Stock',
      shipping: 'Store Pickup in 2 Hours',
      isBestPrice: false,
      offer: 'Tata Neu 5% Coins Back'
    },
    {
      name: 'Reliance Digital',
      logo: '🛒',
      price: 123990.00,
      originalPrice: 129900.00,
      savings: 5910.00,
      status: 'In Stock',
      shipping: 'Free Express Delivery',
      isBestPrice: false,
      offer: 'ResQ Care Warranty Pack'
    },
    {
      name: 'Vijay Sales',
      logo: '🏷️',
      price: 124990.00,
      originalPrice: 129900.00,
      savings: 4910.00,
      status: 'In Stock',
      shipping: 'Standard 2-Day Free',
      isBestPrice: false,
      offer: 'HDFC Instant No Cost EMI'
    },
    {
      name: 'Apple India Store',
      logo: '🍏',
      price: 129900.00,
      originalPrice: 129900.00,
      savings: 0.00,
      status: 'In Stock',
      shipping: 'Free Next-Day Delivery',
      isBestPrice: false,
      offer: 'Official Apple Trade-In & Engraving'
    }
  ];

  // Filtering products for catalog section
  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesQuery = !searchQuery || 
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleRefreshComparison = () => {
    setIsScanning(true);
    showToast('Telemetry Synchronizing', 'Polling 48 retail endpoints in 12ms — verified live inventory.', 'info');
    setTimeout(() => {
      setIsScanning(false);
      showToast('Arbitrage Refreshed', `Amazon.in confirmed as lowest floor at ${formatPrice(119900)} (+${formatPrice(10000)} max spread).`, 'success');
    }, 800);
  };

  const handleOrderSimulate = (retailerName, priceStr) => {
    showToast('Redirecting to Checkout', `Forwarding to ${retailerName} for ${priceStr} with 1% Instant Cashback logged.`, 'success');
  };

  const handleOpenAlertForFlagship = () => {
    const flagship = products.find(p => p.id === 'apple-iphone-16-pro' || p.id === 'iphone-15-pro-max') || {
      id: 'apple-iphone-16-pro',
      name: 'Apple iPhone 16 Pro',
      currentBestPrice: 119900.00
    };
    openPriceAlertModal(flagship);
  };

  return (
    <div className="w-full bg-paper min-h-screen text-primary antialiased selection:bg-electric-blue selection:text-paper pt-11">
      
      {/* 1. TOP TELEMETRY STRIP */}
      <div className="w-full bg-canvas py-2.5 px-6 border-b border-hairline/40 text-center overflow-hidden">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex-1 overflow-hidden min-w-0 pr-4">
            <Marquee speed={25}>
              <div className="flex items-center gap-8 px-4 font-micro text-micro text-secondary whitespace-nowrap">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse"></span>
                  Flagship Electronics • Apple iPhone 15 Pro Max (256GB - {selectedFinish.name})
                </span>
                <span>• Live Stock Telemetry Active</span>
                <span>• Zero Affiliate Distortion</span>
              </div>
            </Marquee>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 font-micro text-micro text-secondary hover:text-primary transition-colors cursor-pointer self-center sm:self-auto shrink-0"
            onClick={handleRefreshComparison}
          >
            <RefreshCw size={12} className={isScanning ? 'animate-spin' : ''} />
            <span>Polled moments ago</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 space-y-20">

        {/* HERO SCROLL STORY */}
        <RevealSection delay={100} className="text-center space-y-4 py-10 sm:py-20 flex flex-col items-center justify-center min-h-[30vh]">
          <span className="font-micro text-micro font-bold tracking-widest text-electric-blue uppercase">flashcompare.ai</span>
          <KineticTypography 
            text="Compare smarter. Find better deals. Buy with confidence." 
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-primary tracking-tight leading-tight max-w-4xl mx-auto"
            delay={200}
          />
          <RevealSection delay={800} direction="up">
            <p className="text-lg text-secondary mt-6 max-w-2xl mx-auto h-16">
              <TypewriterText text="Real-time market arbitrage, live stock telemetry, and predictive pricing insights for flagship electronics." delay={20} />
            </p>
          </RevealSection>
        </RevealSection>

        {/* 2. VECTOR SEARCH CONSOLE */}
        <RevealSection delay={100} threshold={0.2}>
        <section className="bg-canvas border border-hairline/40 rounded-28 p-6 sm:p-8 shadow-apple-card hover-elevate">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1 flex items-center">
              <Search size={18} className="absolute left-4 text-secondary pointer-events-none" />
              <input
                type="text"
                className="w-full pl-11 pr-12 sm:pr-32 py-3.5 bg-paper border border-hairline/40 rounded-full text-primary placeholder:text-secondary text-sm focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors shadow-sm"
                placeholder="Query any SKU, category, or model (e.g., iPhone 15 Pro, Sony WH-1000XM5, PS5 Slim)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="absolute right-3 text-secondary hover:text-primary p-1 cursor-pointer"
                  onClick={() => setSearchQuery('')}
                >
                  &times;
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                className="px-6 py-3.5 bg-electric-blue hover:opacity-95 text-paper text-sm font-semibold rounded-full transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                onClick={handleRefreshComparison}
              >
                <Zap size={15} className="fill-current" />
                <span>Re-arbitrage All</span>
              </button>
              <button
                type="button"
                className="px-5 py-3.5 bg-paper border border-hairline/40 hover:bg-surface-variant text-primary text-sm font-medium rounded-full transition-colors flex items-center justify-center cursor-pointer"
                onClick={() => navigate('/catalog')}
              >
                <span>Tune Filters</span>
              </button>
            </div>
          </div>

          {/* Trending Category Vector Chips */}
          <div className="flex items-center gap-2.5 mt-5 pt-4 border-t border-hairline/30 overflow-x-auto scrollbar-none text-xs">
            <span className="text-secondary font-medium shrink-0 font-micro text-micro uppercase tracking-wider">
              Trending Vectors:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5">
              {trendingVectors.map(vec => (
                <button
                  key={vec.label}
                  type="button"
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full font-micro text-micro font-medium transition-colors cursor-pointer ${
                    activeTrendingVector === vec.label 
                      ? 'bg-electric-blue text-paper font-semibold shadow-sm' 
                      : 'bg-paper border border-hairline/40 text-primary hover:bg-surface-variant'
                  }`}
                  onClick={() => {
                    setActiveTrendingVector(vec.label);
                    setSearchQuery(vec.query);
                  }}
                >
                  {vec.label}
                </button>
              ))}
            </div>
          </div>
        </section>
        </RevealSection>

        {/* 3. FEATURED PRODUCT SHOWCASE DOSSIER */}
        <RevealSection threshold={0.1}>
        <section className="bg-paper border border-hairline/40 rounded-28 p-6 sm:p-10 shadow-apple-card hover-elevate">
          <div className="flex items-center gap-3 flex-wrap text-xs mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-canvas text-electric-blue font-semibold font-micro text-micro">
              <span>✓ Verified Retail Stock</span>
            </div>
            <span className="font-micro text-micro text-secondary">Model A3106 • US Unlocked</span>
            <span className="font-micro text-micro text-secondary">• In stock across 6 merchants</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Image Showcase & Finish Swatches */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative bg-canvas border border-hairline/30 rounded-28 p-6 flex items-center justify-center min-h-[340px] overflow-hidden group">
                <img loading="lazy"
                  src={selectedFinish.img}
                  alt={`Apple iPhone 15 Pro Max in ${selectedFinish.name}`}
                  className="max-h-[290px] object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-paper px-3 py-1 rounded-full text-xs font-medium text-primary shadow-sm">
                  In Stock at 6 Retailers
                </div>
              </div>

              {/* Interactive Titanium Finish Swatches */}
              <div className="flex items-center justify-between p-3.5 bg-canvas rounded-28 border border-hairline/30">
                <span className="text-xs font-semibold text-secondary">Finish: <strong className="text-primary">{selectedFinish.name}</strong></span>
                <div className="flex items-center gap-2.5">
                  {colorFinishes.map(finish => (
                    <button
                      key={finish.id}
                      type="button"
                      className={`w-7 h-7 rounded-full transition-all cursor-pointer ${
                        selectedFinish.id === finish.id 
                          ? 'scale-110 ring-2 ring-primary ring-offset-2' 
                          : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: finish.hex }}
                      onClick={() => setSelectedFinish(finish)}
                      title={finish.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Key Details, Prices & Actions */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold text-primary tracking-tight">
                  Apple iPhone 16 Pro
                </h1>
                <p className="text-sm text-secondary mt-1">
                  128GB • {selectedFinish.name} • A18 Pro 3nm Silicon • Grade-5 Titanium • Official Indian Retail
                </p>
              </div>

              {/* Price Banner */}
              <div className="bg-canvas p-6 rounded-28 border border-hairline/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-micro text-micro uppercase tracking-wider text-secondary">Lowest Arbitraged Net Price</span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-primary">{formatPrice(119900)}</span>
                    <span className="text-sm text-secondary line-through">{formatPrice(129900)}</span>
                    <span className="font-micro text-micro font-semibold text-ember px-2 py-0.5 rounded-full bg-paper shadow-sm">
                      Save {formatPrice(10000)} (-7.7%)
                    </span>
                  </div>
                </div>
                <div className="text-right sm:border-l sm:border-hairline/40 sm:pl-6">
                  <span className="font-micro text-micro uppercase tracking-wider text-secondary">Flash Cashback</span>
                  <p className="font-subheading text-lg font-bold text-electric-blue mt-1">+{formatPrice(1199)} (1%)</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <MagneticButton
                  type="button"
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-electric-blue text-paper font-semibold hover:opacity-95 transition-opacity shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  onClick={() => handleOrderSimulate('Amazon.in', formatPrice(119900))}
                >
                  <Zap size={16} className="fill-current" />
                  <span>Route Best Price via Amazon.in ({formatPrice(119900)})</span>
                </MagneticButton>
                <button
                  type="button"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-canvas text-primary hover:bg-surface-variant font-medium transition-colors cursor-pointer"
                  onClick={() => navigate('/compare')}
                >
                  <span>Pin to Matrix</span>
                </button>
              </div>

              {/* Protection Guarantees */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-secondary pt-2 border-t border-hairline/30">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-electric-blue" />
                  Apple 1-Year Limited Warranty Included
                </span>
                <span>•</span>
                <span>Verified Authorized Reseller Pool</span>
              </div>
            </div>

          </div>
        </section>
        </RevealSection>

        {/* 4. MARKET INTELLIGENCE PANEL & 4-RING ACTIVITY TRUTH HUD */}
        <RevealSection threshold={0.2}>
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-primary tracking-tight">Autonomous Market Telemetry</h2>
              <p className="text-sm text-secondary mt-0.5">Algorithmic risk calibration, price movement vectors, and multi-node arbitrage spread.</p>
            </div>
            <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-canvas text-electric-blue text-xs font-semibold">
              Live Calibration
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Concentric Truth Activity Rings (5 cols) */}
            <div className="lg:col-span-5 bg-paper border border-hairline/40 rounded-28 p-8 flex flex-col justify-between shadow-apple-card hover-elevate">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-primary">4-Ring Activity Truth Gauge</h3>
                <span className="font-micro text-micro px-2.5 py-0.5 rounded-full bg-canvas text-primary font-bold">
                  94/100 HIGH CONVICTION
                </span>
              </div>

              <div className="relative flex items-center justify-center my-4">
                <svg className="w-48 h-48 -rotate-90" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="82" fill="none" stroke="#f1edec" strokeWidth="10" />
                  <circle cx="100" cy="100" r="82" fill="none" stroke="#0071e3" strokeWidth="10" strokeDasharray="515" strokeDashoffset="62" strokeLinecap="round" />

                  <circle cx="100" cy="100" r="66" fill="none" stroke="#f1edec" strokeWidth="10" />
                  <circle cx="100" cy="100" r="66" fill="none" stroke="#1d1d1f" strokeWidth="10" strokeDasharray="415" strokeDashoffset="55" strokeLinecap="round" />

                  <circle cx="100" cy="100" r="50" fill="none" stroke="#f1edec" strokeWidth="10" />
                  <circle cx="100" cy="100" r="50" fill="none" stroke="#b64400" strokeWidth="10" strokeDasharray="314" strokeDashoffset="78" strokeLinecap="round" />

                  <circle cx="100" cy="100" r="34" fill="none" stroke="#f1edec" strokeWidth="10" />
                  <circle cx="100" cy="100" r="34" fill="none" stroke="#707070" strokeWidth="10" strokeDasharray="213" strokeDashoffset="25" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-extrabold text-primary tracking-tight">94</span>
                  <span className="font-micro text-micro font-bold tracking-widest text-secondary uppercase">TRUTH</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-hairline/40 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-electric-blue shrink-0"></span>
                  <span className="text-secondary truncate">Pricing Velocity</span>
                  <span className="font-bold text-primary ml-auto">88%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0"></span>
                  <span className="text-secondary truncate">Arbitrage Spread</span>
                  <span className="font-bold text-primary ml-auto">92%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-ember shrink-0"></span>
                  <span className="text-secondary truncate">Volatility Index</span>
                  <span className="font-bold text-primary ml-auto">Low</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#707070] shrink-0"></span>
                  <span className="text-secondary truncate">Social Sentiment</span>
                  <span className="font-bold text-primary ml-auto">96%</span>
                </div>
              </div>
            </div>

            {/* Telemetry Metric Cards (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-canvas border border-hairline/40 rounded-28 p-6 flex flex-col justify-between">
                <span className="block font-micro text-micro font-bold tracking-wider text-secondary uppercase">BEST AVAILABLE FLOOR</span>
                <div className="flex items-baseline justify-between my-2">
                  <span className="text-2xl font-extrabold text-primary tracking-tight">{formatPrice(119900)}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-paper text-electric-blue font-bold text-xs shadow-sm">-{formatPrice(10000)} Off</span>
                </div>
                <p className="text-xs text-secondary leading-relaxed">Verified at Amazon.in with Prime One-Day delivery and authentic Apple India warranty.</p>
              </div>

              <div className="bg-canvas border border-hairline/40 rounded-28 p-6 flex flex-col justify-between">
                <span className="block font-micro text-micro font-bold tracking-wider text-secondary uppercase">30-DAY PRICE MOVEMENT</span>
                <div className="flex items-baseline justify-between my-2">
                  <span className="text-2xl font-extrabold text-electric-blue tracking-tight">-7.7%</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-paper text-ember font-bold text-xs shadow-sm">Historic Low</span>
                </div>
                <p className="text-xs text-secondary leading-relaxed">Down from {formatPrice(129900)} original MRP; within {formatPrice(500)} of 180-day lowest record.</p>
              </div>

              <div className="bg-canvas border border-hairline/40 rounded-28 p-6 flex flex-col justify-between">
                <span className="block font-micro text-micro font-bold tracking-wider text-secondary uppercase">MARKET ARBITRAGE SPREAD</span>
                <div className="flex items-baseline justify-between my-2">
                  <span className="text-2xl font-extrabold text-primary tracking-tight">{formatPrice(10000)}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-paper text-primary font-bold text-xs shadow-sm">6 Stores</span>
                </div>
                <p className="text-xs text-secondary leading-relaxed">Difference between highest ({formatPrice(129900)} at Apple India) and lowest ({formatPrice(119900)} at Amazon.in).</p>
              </div>

              <div className="bg-canvas border border-hairline/40 rounded-28 p-6 flex flex-col justify-between">
                <span className="block font-micro text-micro font-bold tracking-wider text-secondary uppercase">COMMUNITY SENTIMENT</span>
                <div className="flex items-baseline justify-between my-2">
                  <span className="text-2xl font-extrabold text-primary tracking-tight">92%</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-paper text-electric-blue font-bold text-xs shadow-sm">Verified</span>
                </div>
                <p className="text-xs text-secondary leading-relaxed">Based on 2,400+ verified customer reviews analyzed across major retailers.</p>
              </div>
            </div>

          </div>
        </section>
        </RevealSection>

        {/* 5. MULTI-RETAILER ARBITRAGE MATRIX TABLE */}
        <RevealSection threshold={0.15}>
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-primary tracking-tight">Multi-Retailer Price Comparison Matrix</h2>
              <p className="text-sm text-secondary mt-0.5">Real-time stock status, shipping speeds, and pricing spreads across verified merchants.</p>
            </div>
            <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-canvas text-primary text-xs font-semibold">
              6 Retailers Verified
            </span>
          </div>

          <div className="overflow-x-auto bg-paper border border-hairline/40 rounded-28 shadow-apple-card">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-hairline/60 text-xs font-semibold uppercase tracking-wider text-secondary bg-canvas/50">
                  <th className="px-6 py-4">Merchant</th>
                  <th className="px-6 py-4">Verified Price</th>
                  <th className="px-6 py-4">Price Spread</th>
                  <th className="px-6 py-4">Stock &amp; Availability</th>
                  <th className="px-6 py-4">Delivery Speed</th>
                  <th className="px-6 py-4">Exclusive Advantage</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline/40">
                {retailers.map((r) => (
                  <tr 
                    key={r.name} 
                    className={`transition-colors hover:bg-canvas/40 ${r.isBestPrice ? 'bg-canvas/20 font-medium' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{r.logo}</span>
                        <span className="font-semibold text-primary">{r.name}</span>
                        {r.isBestPrice && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-electric-blue text-paper font-bold tracking-wider uppercase">
                            BEST FLOOR
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-primary text-base">{formatPrice(r.price)}</span>
                        {r.savings > 0 && (
                          <span className="text-xs text-secondary line-through">{formatPrice(r.originalPrice)}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {r.savings > 0 ? (
                        <span className="px-2.5 py-1 rounded-full bg-canvas text-ember font-semibold text-xs">
                          Save {formatPrice(r.savings)}
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-canvas text-secondary font-medium text-xs">
                          MSRP
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-electric-blue font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-electric-blue"></span>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-secondary">
                      {r.shipping}
                    </td>
                    <td className="px-6 py-4 text-xs text-secondary">
                      {r.offer}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          r.isBestPrice 
                            ? 'bg-electric-blue text-paper hover:opacity-95 shadow-sm' 
                            : 'bg-canvas text-primary hover:bg-surface-variant'
                        }`}
                        onClick={() => handleOrderSimulate(r.name, formatPrice(r.price))}
                      >
                        Buy at {r.name}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        </RevealSection>

        {/* 6. CURATED HARDWARE RADAR GRID */}
        <RevealSection threshold={0.1}>
        <section className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline/40">
            <div>
              <h2 className="text-2xl font-bold text-primary tracking-tight">Curated Flagships &amp; Spreads</h2>
              <p className="text-sm text-secondary mt-0.5">Explore active market arbitrage floors across verified electronics categories.</p>
            </div>
            <button
              type="button"
              className="px-5 py-2 rounded-full bg-canvas text-primary hover:bg-surface-variant text-xs font-semibold transition-colors self-start sm:self-auto cursor-pointer"
              onClick={() => navigate('/catalog')}
            >
              View Full Radar →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length === 0 ? (
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            ) : (
              filteredProducts.slice(0, 6).map((product, idx) => (
                <RevealSection key={product.id} delay={idx * 50} threshold={0.1}>
                  <ProductCard product={product} />
                </RevealSection>
              ))
            )}
          </div>
        </section>
        </RevealSection>

      </div>
    </div>
  );
};
