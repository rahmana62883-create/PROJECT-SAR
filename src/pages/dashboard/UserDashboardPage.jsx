import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Wallet, 
  Bookmark, 
  Bell, 
  Scale, 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  ShoppingBag, 
  ExternalLink, 
  LogOut, 
  User, 
  CheckCircle2, 
  Trash2,
  TrendingDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useWallet } from '../../context/WalletContext';
import { formatPrice } from '../../utils/formatters';

export const UserDashboardPage = () => {
  const { currentUser, signOut } = useAuth();
  const { products, watchlist, toggleWatchlist, priceAlerts, compareList, notifications } = useApp();
  const { wallet, openWithdrawModal } = useWallet();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('saved');

  // Filter saved watchlist products
  const savedProducts = products.filter(p => watchlist.includes(p.id));

  // Balance formatting
  const balance = wallet?.balance ?? 342.50;
  const formattedBalance = `$${balance.toFixed(2)}`;

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full bg-paper text-primary antialiased pt-16 pb-20 selection:bg-electric-blue selection:text-paper">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* =========================================================================
            TOP USER WELCOME BANNER
            ========================================================================= */}
        <div className="bg-canvas rounded-3xl p-6 sm:p-8 border border-hairline/60 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-paper overflow-hidden border border-hairline/60 flex items-center justify-center shrink-0 shadow-xs">
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                <User size={28} className="text-secondary" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="font-heading-sm text-2xl font-bold text-primary">
                  {currentUser?.name || 'Alex Thorne'}
                </h1>
                <span className="font-micro text-[11px] px-2.5 py-0.5 rounded-full bg-electric-blue/10 text-electric-blue font-bold">
                  {currentUser?.tier || 'Titanium Member'}
                </span>
              </div>
              <p className="font-caption text-xs text-secondary">
                {currentUser?.email || 'user@flashcompare.ai'} • Member since {currentUser?.joinedDate || 'Jan 2024'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/compare"
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-paper hover:bg-surface-variant text-primary font-caption text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-hairline/60"
            >
              <Scale size={14} className="text-electric-blue" />
              <span>Compare ({compareList.length})</span>
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="px-4 py-2.5 rounded-xl bg-paper hover:bg-danger/10 hover:text-danger text-secondary font-caption text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-hairline/60 cursor-pointer"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            USER METRICS OVERVIEW CARDS
            ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Card 1: Cashback Balance */}
          <div className="bg-paper rounded-2xl p-5 border border-hairline/60 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-secondary mb-3">
              <span className="font-caption text-xs font-semibold text-primary">Cashback Balance</span>
              <div className="w-7 h-7 rounded-lg bg-electric-blue/10 text-electric-blue flex items-center justify-center">
                <Wallet size={15} />
              </div>
            </div>
            <div>
              <span className="font-heading-sm text-2xl font-extrabold text-primary block">
                {formattedBalance}
              </span>
              <span className="font-micro text-[11px] text-emerald-600 font-semibold block mt-0.5">
                +$35.80 earned this week
              </span>
            </div>
            <button
              type="button"
              onClick={openWithdrawModal}
              className="mt-4 w-full py-2 rounded-xl bg-electric-blue text-paper font-caption text-xs font-semibold hover:bg-electric-blue/90 transition-colors cursor-pointer"
            >
              Instant Transfer
            </button>
          </div>

          {/* Card 2: Saved Flagships */}
          <div className="bg-paper rounded-2xl p-5 border border-hairline/60 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-secondary mb-3">
              <span className="font-caption text-xs font-semibold text-primary">Saved Flagships</span>
              <div className="w-7 h-7 rounded-lg bg-canvas text-secondary flex items-center justify-center">
                <Bookmark size={15} />
              </div>
            </div>
            <div>
              <span className="font-heading-sm text-2xl font-extrabold text-primary block">
                {savedProducts.length} Devices
              </span>
              <span className="font-micro text-[11px] text-secondary block mt-0.5">
                Tracked across 48 retail feeds
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('saved')}
              className="mt-4 w-full py-2 rounded-xl bg-canvas hover:bg-surface-variant text-primary font-caption text-xs font-medium transition-colors"
            >
              View Watchlist
            </button>
          </div>

          {/* Card 3: Price Alerts */}
          <div className="bg-paper rounded-2xl p-5 border border-hairline/60 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-secondary mb-3">
              <span className="font-caption text-xs font-semibold text-primary">Price Drop Alerts</span>
              <div className="w-7 h-7 rounded-lg bg-ember/10 text-ember flex items-center justify-center">
                <TrendingDown size={15} />
              </div>
            </div>
            <div>
              <span className="font-heading-sm text-2xl font-extrabold text-primary block">
                {priceAlerts.length} Active
              </span>
              <span className="font-micro text-[11px] text-ember font-semibold block mt-0.5">
                Automated threshold monitoring
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('alerts')}
              className="mt-4 w-full py-2 rounded-xl bg-canvas hover:bg-surface-variant text-primary font-caption text-xs font-medium transition-colors"
            >
              Manage Alerts
            </button>
          </div>

          {/* Card 4: Hardware IQ Arena */}
          <div className="bg-paper rounded-2xl p-5 border border-hairline/60 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-secondary mb-3">
              <span className="font-caption text-xs font-semibold text-primary">Hardware IQ</span>
              <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <Sparkles size={15} />
              </div>
            </div>
            <div>
              <span className="font-heading-sm text-2xl font-extrabold text-primary block">
                850 XP
              </span>
              <span className="font-micro text-[11px] text-purple-600 font-semibold block mt-0.5">
                Top 5% Teardown Auditor
              </span>
            </div>
            <Link
              to="/quiz"
              className="mt-4 w-full py-2 rounded-xl bg-canvas hover:bg-surface-variant text-primary font-caption text-xs font-medium transition-colors text-center block"
            >
              Take Quiz
            </Link>
          </div>
        </div>

        {/* =========================================================================
            DASHBOARD CONTENT TABS & VIEWS
            ========================================================================= */}
        <div className="bg-paper rounded-3xl border border-hairline/60 p-6 sm:p-8 shadow-sm">
          
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-hairline/60 pb-4 mb-6 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('saved')}
              className={`px-4 py-2 rounded-xl font-caption text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'saved' 
                  ? 'bg-primary text-paper shadow-xs' 
                  : 'bg-canvas text-secondary hover:text-primary'
              }`}
            >
              Saved Flagships ({savedProducts.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('alerts')}
              className={`px-4 py-2 rounded-xl font-caption text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'alerts' 
                  ? 'bg-primary text-paper shadow-xs' 
                  : 'bg-canvas text-secondary hover:text-primary'
              }`}
            >
              Price Drop Alerts ({priceAlerts.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('notifications')}
              className={`px-4 py-2 rounded-xl font-caption text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'notifications' 
                  ? 'bg-primary text-paper shadow-xs' 
                  : 'bg-canvas text-secondary hover:text-primary'
              }`}
            >
              Telemetry Notifications ({notifications.length})
            </button>
          </div>

          {/* TAB 1: SAVED PRODUCTS */}
          {activeTab === 'saved' && (
            <div>
              {savedProducts.length === 0 ? (
                <div className="text-center py-12 text-secondary">
                  <Bookmark size={32} className="mx-auto mb-3 text-secondary/40" />
                  <p className="font-caption text-sm font-semibold text-primary">Your watchlist is empty</p>
                  <p className="font-micro text-xs mt-1 mb-4">Save flagships to monitor price fluctuations and multi-store arbitrage.</p>
                  <Link to="/catalog" className="px-5 py-2 rounded-xl bg-electric-blue text-paper font-caption text-xs font-semibold">
                    Browse Flagship Deals
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedProducts.map(product => {
                    const price = product.currentBestPrice || product.stores?.[0]?.price || product.price || 999;
                    return (
                      <div key={product.id} className="p-4 rounded-2xl bg-canvas/40 hover:bg-canvas border border-hairline/60 flex items-center justify-between gap-3 transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={product.image || product.images?.[0]}
                            alt={product.title || product.name}
                            className="w-14 h-14 object-contain rounded-xl bg-paper p-1.5 shrink-0 border border-hairline/40"
                          />
                          <div className="min-w-0">
                            <h3 className="font-caption text-xs font-bold text-primary truncate">
                              {product.title || product.name}
                            </h3>
                            <span className="font-caption text-xs font-extrabold text-electric-blue block mt-0.5">
                              {formatPrice(price)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Link
                            to={`/product/${product.id}`}
                            className="p-2 rounded-lg bg-paper hover:bg-surface-variant text-primary"
                            title="Inspect Dossier"
                          >
                            <ExternalLink size={14} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => toggleWatchlist(product.id)}
                            className="p-2 rounded-lg bg-paper hover:bg-danger/10 text-secondary hover:text-danger cursor-pointer"
                            title="Remove from watchlist"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRICE ALERTS */}
          {activeTab === 'alerts' && (
            <div>
              <div className="flex flex-col gap-3">
                {priceAlerts.map(alert => (
                  <div key={alert.id} className="p-4 rounded-2xl bg-canvas/40 border border-hairline/60 flex items-center justify-between">
                    <div>
                      <span className="font-caption text-xs font-bold text-primary block">
                        Product: {alert.productId}
                      </span>
                      <span className="font-micro text-xs text-secondary">
                        Target Floor: <strong className="text-emerald-600">{formatPrice(alert.targetPrice)}</strong> • Status: {alert.status}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-micro text-xs font-semibold">
                      Armed
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-3">
              {notifications.map(n => (
                <div key={n.id} className="p-4 rounded-2xl bg-canvas/40 border border-hairline/60 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-electric-blue/10 text-electric-blue flex items-center justify-center shrink-0 mt-0.5">
                    <Bell size={14} />
                  </div>
                  <div>
                    <h4 className="font-caption text-xs font-bold text-primary">{n.title}</h4>
                    <p className="font-caption text-xs text-secondary mt-0.5">{n.message}</p>
                    <span className="font-micro text-[11px] text-secondary/70 mt-1 block">{n.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
