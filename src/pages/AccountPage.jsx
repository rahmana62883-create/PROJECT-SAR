import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { useWallet } from '../context/WalletContext';
import { 
  ShieldCheck, 
  Zap, 
  Bell, 
  PlusCircle, 
  Trash2, 
  Sliders, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  TrendingDown,
  RefreshCw,
  Clock,
  Key,
  LogOut,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { RevealSection, KineticTypography } from '../components/common/MotionComponents';
import { AnimatedNumber } from '../components/common/AnimatedNumber';

export const AccountPage = () => {
  const { currentUser, isAuthenticated, signOut, openAuthModal } = useAuth();
  const {
    products,
    watchlist,
    toggleWatchlist,
    priceAlerts,
    removePriceAlert,
    addPriceAlert,
    showToast
  } = useApp();
  const { wallet } = useWallet();
  const navigate = useNavigate();

  const [pushRelaysActive, setPushRelaysActive] = useState(true);
  const [smsFloorAlertsActive, setSmsFloorAlertsActive] = useState(true);
  const [autoCheckoutArmed, setAutoCheckoutArmed] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // Fallback if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="w-full bg-surface min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="bg-paper border border-hairline/80 rounded-[28px] p-8 sm:p-12 text-center max-w-lg mx-auto shadow-lg space-y-6">
          <div className="w-16 h-16 rounded-full bg-electric-blue/10 text-electric-blue flex items-center justify-center mx-auto">
            <Zap size={28} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
              Access Your Surveillance Hub
            </h2>
            <p className="text-sm text-secondary leading-relaxed">
              Sign in to manage autonomous 1-click checkout rules, live hardware surveillance vectors, and FedNow instant liquidity rails.
            </p>
          </div>
          <button
            type="button"
            className="w-full py-3.5 px-6 bg-electric-blue hover:bg-link-blue active:scale-[0.99] text-white font-semibold rounded-full text-sm transition-all shadow-sm"
            onClick={() => openAuthModal('signin')}
          >
            Sign In or Authenticate &rarr;
          </button>
        </div>
      </div>
    );
  }

  // Watchlist products
  const watchlistProducts = products.filter(p => watchlist.includes(p.id));

  const handleSyncRadar = () => {
    setIsSyncing(true);
    showToast('Polling Nodes', 'Scanning 48 retail endpoints for floor price shifts...', 'info');
    setTimeout(() => {
      setIsSyncing(false);
      showToast('Surveillance Synchronized', 'All 14 active vectors verified against live order books.', 'success');
    }, 750);
  };

  return (
    <div className="w-full bg-surface">
      {/* 1. Cathedral of White Space Hero */}
      <section className="w-full bg-paper pt-16 pb-20 sm:pb-24 border-b border-hairline/60">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center">
          <RevealSection delay={50} direction="up">
          
          {/* Ember Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ember/10 text-ember mb-6">
            <span className="w-2 h-2 rounded-full bg-ember animate-ping"></span>
            <span className="w-1.5 h-1.5 -ml-3.5 rounded-full bg-ember"></span>
            <span className="font-micro text-micro uppercase tracking-widest font-semibold">
              12 ACTIVE RADAR DAEMONS • ZERO MISSED DROPS
            </span>
          </div>

          {/* Monumental Headline */}
          <KineticTypography 
            text="Autonomous Watchlist."
            className="text-4xl sm:text-6xl font-extrabold text-primary max-w-5xl tracking-tight leading-[1.05]"
            delay={100}
          />
          <KineticTypography 
            text="Sub-Second Triggers."
            className="text-4xl sm:text-6xl font-extrabold text-primary max-w-5xl tracking-tight mb-4 leading-[1.05]"
            delay={200}
          />

          {/* Subtitle */}
          <p className="font-body text-body sm:text-xl text-secondary max-w-3xl mx-auto mb-8 font-normal leading-relaxed">
            Manage cryptographic price alerts, autonomous 1-click checkout rules, and personal surveillance vectors across 48 merchant nodes.
          </p>

          {/* Action cluster */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleSyncRadar}
              disabled={isSyncing}
              className="h-12 px-6 rounded-full bg-electric-blue text-white font-caption text-caption font-semibold hover:bg-link-blue transition-all shadow-sm flex items-center gap-2"
            >
              <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
              <span>{isSyncing ? 'Syncing...' : 'Scan Market Feeds'}</span>
            </button>
            <Link
              to="/catalog"
              className="h-12 px-6 rounded-full bg-canvas text-primary font-caption text-caption font-semibold hover:bg-surface-variant transition-colors flex items-center gap-2"
            >
              <PlusCircle size={16} />
              <span>Add Surveillance Vector</span>
            </Link>
          </div>
          </RevealSection>
        </div>
      </section>

      {/* 2. User Profile & Security Identity (Canvas Band) */}
      <section className="w-full bg-paper py-12 sm:py-16 border-b border-hairline/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <RevealSection delay={100} threshold={0.1}>
          <div className="bg-canvas rounded-[28px] p-6 sm:p-10 border border-hairline/60 shadow-sm">
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-hairline/60">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-paper flex items-center justify-center shadow-sm text-primary text-2xl font-bold shrink-0 border border-hairline/80">
                  {currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : 'AT'}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <KineticTypography 
                      text={currentUser.name || 'Alex Thorne'}
                      className="text-2xl font-bold text-primary"
                    />
                    <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-paper text-primary font-micro text-micro font-medium shadow-sm border border-hairline/60">
                      <CheckCircle2 size={13} className="text-electric-blue" />
                      Tier 1 Verified Arbitrageur
                    </span>
                  </div>
                  <p className="font-caption text-caption text-secondary mt-1 flex flex-wrap items-center gap-2">
                    <span>{currentUser.email || 'alex.thorne@example.com'}</span>
                    <span>•</span>
                    <span>Member since Oct 2024</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 text-primary font-mono text-micro">
                      <ShieldCheck size={13} className="text-electric-blue" />
                      SOC-2 FedNow Token Linked
                    </span>
                  </p>
                </div>
              </div>

              {/* Notification & Trigger Toggles */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPushRelaysActive(prev => !prev)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-caption text-caption shadow-sm border transition-all ${
                    pushRelaysActive ? 'bg-paper text-primary border-hairline' : 'bg-canvas text-secondary border-dashed border-hairline'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${pushRelaysActive ? 'bg-electric-blue' : 'bg-secondary'}`}></span>
                  <span className="font-medium">Push Relays</span>
                  <span className="font-micro text-micro uppercase opacity-70">{pushRelaysActive ? 'Active' : 'Off'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSmsFloorAlertsActive(prev => !prev)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-caption text-caption shadow-sm border transition-all ${
                    smsFloorAlertsActive ? 'bg-paper text-primary border-hairline' : 'bg-canvas text-secondary border-dashed border-hairline'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${smsFloorAlertsActive ? 'bg-electric-blue' : 'bg-secondary'}`}></span>
                  <span className="font-medium">SMS Alerts</span>
                  <span className="font-micro text-micro uppercase opacity-70">{smsFloorAlertsActive ? 'Active' : 'Off'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAutoCheckoutArmed(prev => !prev)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-caption text-caption shadow-sm transition-all ${
                    autoCheckoutArmed ? 'bg-primary text-white' : 'bg-surface-variant text-secondary'
                  }`}
                >
                  <Zap size={14} className={autoCheckoutArmed ? 'text-ember fill-ember' : 'text-secondary'} />
                  <span className="font-semibold">Auto-Checkout</span>
                  <span className="text-ember font-micro text-micro font-bold uppercase">{autoCheckoutArmed ? 'Armed' : 'Disarmed'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    navigate('/');
                  }}
                  className="p-2.5 rounded-full bg-paper hover:bg-surface-variant text-secondary hover:text-red-500 transition-colors border border-hairline ml-2"
                  title="Sign Out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>

            {/* Telemetry Stats Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              <div className="bg-paper p-4 rounded-2xl shadow-sm flex flex-col border border-hairline/60">
                <span className="font-micro text-micro uppercase tracking-wider text-secondary">Active Watches</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-primary">{watchlist.length || 14}</span>
                  <span className="font-micro text-micro text-electric-blue">Nodes synced</span>
                </div>
                <span className="font-caption text-caption text-secondary mt-1">Across 48 regional brokers</span>
              </div>

              <div className="bg-paper p-4 rounded-2xl shadow-sm flex flex-col border border-hairline/60">
                <span className="font-micro text-micro uppercase tracking-wider text-secondary">Total Surplus Recovered</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-primary flex items-baseline">
                    $<AnimatedNumber value={184.20} prefix="" decimals={2} />
                  </span>
                  <span className="font-micro text-micro text-ember font-semibold">+18.4% MoM</span>
                </div>
                <span className="font-caption text-caption text-secondary mt-1">Direct via FedNow rebate</span>
              </div>

              <div className="bg-paper p-4 rounded-2xl shadow-sm flex flex-col border border-hairline/60">
                <span className="font-micro text-micro uppercase tracking-wider text-secondary">Average Ingestion Speed</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-primary flex items-baseline">
                    <AnimatedNumber value={248} />
                    <span className="text-sm font-normal text-secondary ml-1">ms</span>
                  </span>
                  <span className="font-micro text-micro text-electric-blue">P99 SLA</span>
                </div>
                <span className="font-caption text-caption text-secondary mt-1">WebSocket microtick stream</span>
              </div>

              <div className="bg-paper p-4 rounded-2xl shadow-sm flex flex-col border border-hairline/60">
                <span className="font-micro text-micro uppercase tracking-wider text-secondary">Floor Guarantee</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-primary flex items-baseline">
                    <AnimatedNumber value={100} />%
                  </span>
                  <span className="font-micro text-micro text-primary">Escrowed</span>
                </div>
                <span className="font-caption text-caption text-secondary mt-1">14-day downside shield</span>
              </div>
            </div>

          </div>
          </RevealSection>
        </div>
      </section>

      {/* 3. Active Hardware Surveillance Deck (Canvas Gray) */}
      <section className="w-full bg-canvas py-16 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="font-micro text-micro uppercase tracking-widest text-secondary font-semibold">
                Decentralized Hardware Radar
              </span>
              <KineticTypography 
                text="Active Hardware Surveillance"
                className="text-2xl sm:text-3xl font-bold text-primary tracking-tight mt-1"
                delay={100}
              />
            </div>
            <span className="text-xs text-secondary">
              {watchlistProducts.length} items actively monitored for instant arbitrage drops
            </span>
          </div>

          {/* Watchlist Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlistProducts.map(product => {
              const bestOffer = product.offers?.[0] || {};
              return (
                <RevealSection key={product.id} delay={100} threshold={0.1}>
                <div 
                  className="bg-paper rounded-[28px] p-6 shadow-sm border border-hairline/70 flex flex-col justify-between gap-5 transition-all hover-elevate h-full"
                >
                  <div className="flex items-start gap-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-20 h-20 rounded-2xl object-cover bg-canvas shrink-0 border border-hairline/60"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="font-micro text-micro uppercase font-semibold text-secondary">{product.category}</span>
                      <h3 className="font-caption text-caption font-bold text-primary truncate mt-0.5">{product.name}</h3>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xl font-extrabold text-primary">${product.currentBestPrice}</span>
                        {product.originalPrice > product.currentBestPrice && (
                          <span className="text-xs text-secondary line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <span className="font-micro text-micro text-emerald-600 font-semibold block mt-0.5">
                        Lowest: {bestOffer.retailer || 'Amazon US'}
                      </span>
                    </div>
                  </div>

                  {/* Surveillance Rules */}
                  <div className="p-3 bg-canvas rounded-xl flex flex-col gap-2 border border-hairline/50 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-secondary font-medium">Trigger Alert Floor:</span>
                      <span className="font-bold text-primary">${Math.round(product.currentBestPrice * 0.95)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-secondary font-medium">Auto-Checkout:</span>
                      <span className="text-electric-blue font-semibold">Ready (&lt; ${Math.round(product.currentBestPrice * 0.90)})</span>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-hairline/60">
                    <button
                      type="button"
                      onClick={() => toggleWatchlist(product.id)}
                      className="text-xs text-secondary hover:text-red-500 font-medium flex items-center gap-1 transition-colors"
                    >
                      <Trash2 size={14} />
                      <span>Remove Vector</span>
                    </button>

                    <Link
                      to={`/product/${product.id}`}
                      className="px-4 py-1.5 rounded-full bg-canvas hover:bg-surface-variant text-primary font-caption text-caption font-semibold transition-colors flex items-center gap-1"
                    >
                      <span>Inspect Dossier</span>
                      <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
                </RevealSection>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
};
