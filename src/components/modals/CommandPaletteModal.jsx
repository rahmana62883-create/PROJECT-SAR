import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Zap,
  Brain,
  Wallet,
  Tag,
  Sun,
  Moon,
  CreditCard,
  BarChart3,
  Scale,
  MessageSquare,
  Sliders,
  ShieldCheck,
  Trophy
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useWallet } from '../../context/WalletContext';

export const CommandPaletteModal = () => {
  const {
    isCommandPaletteOpen,
    closeCommandPalette,
    products = [],
    showToast
  } = useApp();
  const { openWithdrawModal, openLinkBankModal, wallet } = useWallet();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'specimens' | 'actions' | 'views'
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsContainerRef = useRef(null);

  // Focus input and reset state on open
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setActiveTab('all');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  // Current balance display
  const balanceDisplay = wallet?.balance ? `$${Number(wallet.balance).toFixed(2)}` : '$5.00';

  // Base Quick Actions
  const quickActions = useMemo(() => [
    {
      id: 'act-quiz',
      category: 'actions',
      icon: <Brain size={18} className="text-ember" />,
      iconBg: 'bg-ember/10',
      title: 'Start Hardware IQ Quiz Challenge',
      badge: '+$25.00 Pool',
      badgeType: 'ember',
      subtitle: 'Win up to $25.00 FedNow cashback instantly via daily speed test',
      shortcut: 'G Q',
      action: () => navigate('/quiz')
    },
    {
      id: 'act-arbitrage',
      category: 'actions',
      icon: <Zap size={18} className="text-electric-blue" />,
      iconBg: 'bg-electric-blue/10',
      title: 'Route Order via Amazon Prime ($298.00)',
      badge: 'All-Time Low',
      badgeType: 'blue',
      subtitle: 'Sony WH-1000XM5 all-time low arbitrage floor ($101.99 delta under MSRP)',
      shortcut: '↵ Enter',
      primaryActionText: 'Execute Arbitrage',
      action: () => {
        const sony = products.find(p => p.id === 'sony-wh1000xm5' || p.name?.toLowerCase().includes('sony'));
        if (sony) {
          navigate(`/product/${sony.id}`);
        } else {
          navigate('/catalog');
        }
      }
    },
    {
      id: 'act-withdraw',
      category: 'actions',
      icon: <Wallet size={18} className="text-emerald-600 dark:text-emerald-400" />,
      iconBg: 'bg-emerald-500/10',
      title: 'Transfer Cashback to Bank (FedNow ACH)',
      badge: '• 0-sec transfer',
      badgeType: 'neutral',
      subtitle: `Current spendable verified ledger: ${balanceDisplay} USD available to drain`,
      shortcut: 'G W',
      action: () => openWithdrawModal()
    },
    {
      id: 'act-vouchers',
      category: 'actions',
      icon: <Tag size={18} className="text-purple-600 dark:text-purple-400" />,
      iconBg: 'bg-purple-500/10',
      title: 'Scan 48-Store Voucher Repositories',
      badge: 'Autonomous Stack',
      badgeType: 'cool',
      subtitle: 'Run automated token injector across verified merchant checkout flows',
      shortcut: '⌘ S',
      action: () => {
        showToast('Autonomous Coupon Injector: Verified 14 active voucher tokens across national retailers (Saved up to $42.00).');
      }
    },
    {
      id: 'act-link-bank',
      category: 'actions',
      icon: <CreditCard size={18} className="text-blue-600 dark:text-blue-400" />,
      iconBg: 'bg-blue-500/10',
      title: 'Link US Checking or Savings Account',
      badge: 'Instant ACH',
      badgeType: 'cool',
      subtitle: 'Simulated Plaid token exchange for sub-second automated cashback transfers',
      shortcut: '⌘ B',
      action: () => openLinkBankModal()
    }
  ], [balanceDisplay, navigate, openLinkBankModal, openWithdrawModal, products, showToast]);

  // System Navigation Views
  const systemViews = useMemo(() => [
    {
      id: 'nav-dossier',
      category: 'views',
      icon: <BarChart3 size={18} className="text-electric-blue" />,
      iconBg: 'bg-electric-blue/10',
      title: 'Product Intelligence Dossier',
      subtitle: 'Active metrology benchmarks & 4-ring truth gauge',
      action: () => navigate('/catalog')
    },
    {
      id: 'nav-compare',
      category: 'views',
      icon: <Scale size={18} className="text-amber-600 dark:text-amber-400" />,
      iconBg: 'bg-amber-500/10',
      title: 'Comparison Matrix',
      subtitle: 'Side-by-side multi-spec delta analyzer',
      action: () => navigate('/compare')
    },
    {
      id: 'nav-community',
      category: 'views',
      icon: <MessageSquare size={18} className="text-emerald-600 dark:text-emerald-400" />,
      iconBg: 'bg-emerald-500/10',
      title: 'Community Chat & Telemetry',
      subtitle: 'Verified owner deal consensus & live discussion lounge',
      action: () => navigate('/community')
    },
    {
      id: 'nav-admin',
      category: 'views',
      icon: <Sliders size={18} className="text-rose-600 dark:text-rose-400" />,
      iconBg: 'bg-rose-500/10',
      title: 'Crawler Governance & Command Center',
      subtitle: '48/48 node scraper health & catalog administration',
      action: () => navigate('/admin')
    },
    {
      id: 'nav-wallet',
      category: 'views',
      icon: <Wallet size={18} className="text-emerald-600 dark:text-emerald-400" />,
      iconBg: 'bg-emerald-500/10',
      title: 'Cashback Wallet & Transaction Ledger',
      subtitle: 'Instant ACH withdrawals, cashback history & linked accounts',
      action: () => navigate('/wallet')
    },
    {
      id: 'nav-quiz',
      category: 'views',
      icon: <Trophy size={18} className="text-ember" />,
      iconBg: 'bg-ember/10',
      title: 'Hardware IQ Quiz Arena',
      subtitle: 'Speed test your tech knowledge & win cashback pool rewards',
      action: () => navigate('/quiz')
    }
  ], [navigate]);

  // Hardware Intelligence Specimens (from products data)
  const hardwareSpecimens = useMemo(() => {
    const list = products.length > 0 ? products : [
      {
        id: 'sony-wh1000xm5',
        name: 'Sony WH-1000XM5 Wireless ANC',
        category: 'Audio',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2gjGiudU7FxPnMkksgtsgqMgSX3HNjbla7ZoA_S1vM9vae9r2A21aAqR2ZBslsdSjMSbKV93hKSK6KKQPMYpK7I-IK1EulTrpyY2YEIV-fBgCcGQJKAOhd-J4HT_UD26lvELcGhhQMjER1XI_4LwASFuLskkN0tDr8v16KgYJ3pmqY4Oxj16yC92p7hElqIQbdNS3GsBzY2bXAjqJSf8Z4yemxctaUCQFTUFK9_ty_JxMk8HZuccs',
        currentBestPrice: 298.00,
        dealBadge: '-25.5% ALL-TIME LOW',
        dealBadgeType: 'ember',
        truthScore: 92,
        seller: 'Prime Fast Delivery'
      },
      {
        id: 'iphone-15-pro-max',
        name: 'Apple iPhone 15 Pro Max (256GB Titanium)',
        category: 'Smartphones',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_hCEdLnpGnwj99Fy91-XWYGZZ8ECFKLz1uzfP7U4g1EdNPIa5VwWNWrh02BzBSGrAMNRUs5-Dwh4t1s0qMls1jF9_U9rmiJcnP3AUkbCOvhP1Zk9Lx7JekkWH31NT-TC2HICZNHzgBpbsJuuYj_0LDCaHa0j8yrBdiHi7x-UPk9JdVaAG-n6ApIhRAC4J2Aj126ZrDG4d7nq0ppIEDHN0xSWlwS2eKKLidckO7g9LL7ljb6ytA3zw',
        currentBestPrice: 1149.00,
        dealBadge: '-$50 Delta',
        dealBadgeType: 'neutral',
        truthScore: 89,
        seller: '5 Stores Monitored'
      },
      {
        id: 'ps5-slim',
        name: 'Sony PlayStation 5 Slim Console',
        category: 'Gaming',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj05RjtPQikAb6X9fvu72sP1vBg2sG_HiIOyG7xRuRnqSV8s3Mg6tsLb9-fcz5ZTHt6KbDVrR6Z0ivzUqkqxq6Ugx-a4fNKBFlACoNAvWWQ5X5pVNnypzo01QRkOphq6BF146dwGU9yEkEWmbMD7bhTghSN9TiOemHxZgcFals5amwSaxdtYxpI-9fW68GtLY2ID229O3sPe7xPGG-MmTGp1yHbEbAcRKrdm27zSqdlF6CowEK9jgc',
        currentBestPrice: 449.00,
        dealBadge: 'In Stock',
        dealBadgeType: 'neutral',
        truthScore: 94,
        seller: 'Best Buy & Amazon'
      },
      {
        id: 'macbook-air-m3',
        name: 'MacBook Air 13" (M3, Midnight, 16GB)',
        category: 'Laptops',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKS5x3S-dNXRSVjnm2gPRoGT3aaYIhzvatg1hzUzLufr_zbpjCjJp-PbpJER5i1M94-wFt6SrZ_tg5tUPaxvRT5LENLdPawGohU1JHZKzdZDJ3VKdViJ_QRlZcqFBu3J9qao_CUOXMslw8KvMx15_vcJOqGMrmYIoosI-URMS2EDmktsaEFxGggpTGUtaRyIX16K0ndqmJT-99EwAK8vgYClI1_bPoRszo7aDh1ElbwsUJKMnOZhoY',
        currentBestPrice: 899.00,
        dealBadge: '-$200 MSRP',
        dealBadgeType: 'blue',
        truthScore: 91,
        seller: 'B&H Photo Video'
      }
    ];

    return list.map(p => ({
      id: 'specimen-' + p.id,
      productId: p.id,
      category: 'specimens',
      title: p.name || p.title,
      image: p.image || p.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
      price: p.currentBestPrice || p.price || 0,
      badge: p.dealBadge || (p.discount ? `-${p.discount}%` : 'Best Floor'),
      badgeType: p.dealBadgeType || 'ember',
      truthScore: p.priceScore || p.truthScore || 92,
      seller: p.seller || p.bestStore || 'Verified Retailer',
      action: () => navigate(`/product/${p.id}`)
    }));
  }, [navigate, products]);

  // Filtering based on search query and active tab
  const cleanQuery = query.toLowerCase().trim();

  const filteredActions = useMemo(() => {
    if (activeTab === 'specimens' || activeTab === 'views') return [];
    if (!cleanQuery) return quickActions;
    return quickActions.filter(a =>
      a.title.toLowerCase().includes(cleanQuery) ||
      a.subtitle.toLowerCase().includes(cleanQuery)
    );
  }, [activeTab, cleanQuery, quickActions]);

  const filteredSpecimens = useMemo(() => {
    if (activeTab === 'actions' || activeTab === 'views') return [];
    if (!cleanQuery) return hardwareSpecimens.slice(0, 4);
    return hardwareSpecimens.filter(s =>
      s.title.toLowerCase().includes(cleanQuery) ||
      s.seller.toLowerCase().includes(cleanQuery)
    );
  }, [activeTab, cleanQuery, hardwareSpecimens]);

  const filteredViews = useMemo(() => {
    if (activeTab === 'specimens' || activeTab === 'actions') return [];
    if (!cleanQuery) return systemViews;
    return systemViews.filter(v =>
      v.title.toLowerCase().includes(cleanQuery) ||
      v.subtitle.toLowerCase().includes(cleanQuery)
    );
  }, [activeTab, cleanQuery, systemViews]);

  // Combined flat list for sequential keyboard navigation
  const flatResults = useMemo(() => [
    ...filteredActions,
    ...filteredSpecimens,
    ...filteredViews
  ], [filteredActions, filteredSpecimens, filteredViews]);

  // Ensure selectedIndex is always within range
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeTab]);

  // Keyboard navigation & shortcuts
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeCommandPalette();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (flatResults.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + flatResults.length) % (flatResults.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flatResults[selectedIndex]) {
        flatResults[selectedIndex].action();
        closeCommandPalette();
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const tabs = ['all', 'specimens', 'actions', 'views'];
      const nextTabIdx = (tabs.indexOf(activeTab) + 1) % tabs.length;
      setActiveTab(tabs[nextTabIdx]);
    }
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div
      id="spotlight-overlay"
      className="fixed inset-0 z-[2500] flex items-start justify-center pt-14 sm:pt-20 md:pt-24 px-4 bg-primary/25 dark:bg-black/70 backdrop-blur-[24px] backdrop-saturate-[180%] transition-opacity duration-200 animate-fade-in"
      onClick={closeCommandPalette}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette Spotlight"
    >
      {/* Clickable background scrim */}
      <div className="absolute inset-0 -z-10" />

      {/* The Spotlight Dialog Window (~760px fluid container) */}
      <div
        className="w-full max-w-[760px] bg-paper dark:bg-[#1c1c1e] text-on-surface dark:text-[#f5f5f7] rounded-2xl border border-hairline/60 dark:border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.18),0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col transform transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Spotlight Header & Search Input Row (68px) */}
        <div className="h-[68px] px-5 sm:px-6 bg-paper dark:bg-[#1c1c1e] flex items-center justify-between gap-3 border-b border-surface-container dark:border-white/10">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Search className="w-5 h-5 text-secondary dark:text-gray-400 shrink-0 select-none" />
            <input
              ref={inputRef}
              id="spotlight-input"
              type="text"
              autoComplete="off"
              spellCheck="false"
              autoFocus
              className="w-full bg-transparent font-body text-base text-on-surface dark:text-white placeholder:text-outline/70 dark:placeholder:text-gray-400 focus:outline-none tracking-tight selection:bg-electric-blue selection:text-on-primary"
              placeholder="Search hardware, compare SKUs, run actions, or type a command..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="p-1 rounded-full text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer shrink-0"
                title="Clear query"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0 select-none">
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full font-micro text-[11px] bg-canvas dark:bg-white/10 text-secondary dark:text-gray-400 tracking-tight">
              ESC to close
            </span>
            <kbd className="inline-flex items-center justify-center h-6 min-w-[28px] px-1.5 rounded-full bg-cool-wash dark:bg-white/15 text-primary dark:text-white font-mono text-[11px] font-medium shadow-sm border border-hairline/40 dark:border-white/10">
              ⌘K
            </kbd>
            <button
              onClick={closeCommandPalette}
              className="w-7 h-7 rounded-full hover:bg-canvas dark:hover:bg-white/10 flex items-center justify-center text-secondary hover:text-primary dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Quick Filter Pills Ribbon */}
        <div className="px-5 sm:px-6 py-2.5 bg-canvas/60 dark:bg-[#161617] flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-hairline/30 dark:border-white/5">
          <button
            type="button"
            className={`px-3 py-1 rounded-full font-micro text-micro font-medium shrink-0 transition-transform active:scale-95 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-primary text-on-primary dark:bg-white dark:text-black shadow-sm'
                : 'bg-paper dark:bg-white/10 text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-white'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All Modules
          </button>
          <button
            type="button"
            className={`px-3 py-1 rounded-full font-micro text-micro font-medium shrink-0 transition-colors cursor-pointer ${
              activeTab === 'specimens'
                ? 'bg-primary text-on-primary dark:bg-white dark:text-black shadow-sm'
                : 'bg-paper dark:bg-white/10 text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-white'
            }`}
            onClick={() => setActiveTab('specimens')}
          >
            Specimens ({hardwareSpecimens.length})
          </button>
          <button
            type="button"
            className={`px-3 py-1 rounded-full font-micro text-micro font-medium shrink-0 transition-colors cursor-pointer ${
              activeTab === 'actions'
                ? 'bg-primary text-on-primary dark:bg-white dark:text-black shadow-sm'
                : 'bg-paper dark:bg-white/10 text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-white'
            }`}
            onClick={() => setActiveTab('actions')}
          >
            Arbitrage Actions ({quickActions.length})
          </button>
          <button
            type="button"
            className={`px-3 py-1 rounded-full font-micro text-micro font-medium shrink-0 transition-colors cursor-pointer ${
              activeTab === 'views'
                ? 'bg-primary text-on-primary dark:bg-white dark:text-black shadow-sm'
                : 'bg-paper dark:bg-white/10 text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-white'
            }`}
            onClick={() => setActiveTab('views')}
          >
            System Views ({systemViews.length})
          </button>

          <div className="ml-auto hidden sm:flex items-center gap-1.5 font-micro text-micro text-secondary dark:text-gray-400 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>48/48 Scrapers Syncing</span>
          </div>
        </div>

        {/* Scrollable Live Results Body */}
        <div
          ref={resultsContainerRef}
          className="max-h-[480px] overflow-y-auto overscroll-contain p-3 space-y-4"
          id="results-container"
        >
          {flatResults.length === 0 ? (
            <div className="py-12 px-4 text-center flex flex-col items-center justify-center text-secondary dark:text-gray-400">
              <Search className="w-8 h-8 mb-2 opacity-40 text-secondary" />
              <p className="font-caption text-caption font-semibold text-primary dark:text-white">
                No telemetry results found for "{query}"
              </p>
              <p className="font-micro text-micro text-secondary dark:text-gray-400 mt-1 max-w-sm">
                Try searching for brands like Sony, Apple, PS5, or keywords like "cashback", "quiz", "compare", or "admin".
              </p>
            </div>
          ) : (
            <>
              {/* Category 1: Quick Actions & Arbitrage */}
              {filteredActions.length > 0 && (
                <section aria-label="Quick Actions & Arbitrage" className="space-y-1">
                  <div className="px-3 pt-2 pb-1.5 flex items-center justify-between">
                    <span className="font-micro text-micro font-semibold uppercase tracking-[0.08em] text-secondary dark:text-gray-400">
                      Quick Actions &amp; Arbitrage
                    </span>
                    <span className="font-micro text-micro text-outline dark:text-gray-500">Real-time settlement</span>
                  </div>

                  {filteredActions.map((item) => {
                    const idx = flatResults.findIndex(r => r.id === item.id);
                    const isSelected = idx === selectedIndex;

                    return (
                      <div
                        key={item.id}
                        role="button"
                        tabIndex={0}
                        className={`palette-item group flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all cursor-pointer text-left ${
                          isSelected
                            ? 'bg-canvas/90 dark:bg-white/10 shadow-sm border border-hairline/40 dark:border-white/10'
                            : 'hover:bg-canvas dark:hover:bg-white/5 border border-transparent'
                        }`}
                        onClick={() => {
                          item.action();
                          closeCommandPalette();
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                      >
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                              item.primaryActionText && isSelected
                                ? 'bg-electric-blue text-white'
                                : `${item.iconBg || 'bg-canvas dark:bg-white/10'}`
                            }`}
                          >
                            {item.icon}
                          </div>
                          <div className="flex flex-col min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-caption text-caption font-semibold text-primary dark:text-white truncate">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span
                                  className={`px-1.5 py-0.5 rounded-full font-micro text-[11px] font-medium shrink-0 ${
                                    item.badgeType === 'ember'
                                      ? 'bg-ember/10 text-ember'
                                      : item.badgeType === 'blue'
                                      ? 'bg-electric-blue/10 text-electric-blue dark:bg-electric-blue/20'
                                      : 'bg-cool-wash dark:bg-white/10 text-on-surface dark:text-gray-300'
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <span className="font-micro text-micro text-secondary dark:text-gray-400 truncate mt-0.5">
                              {item.subtitle}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-3">
                          {item.primaryActionText && isSelected && (
                            <span className="hidden md:inline-flex font-micro text-micro font-medium text-electric-blue">
                              {item.primaryActionText}
                            </span>
                          )}
                          <kbd
                            className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[11px] ${
                              isSelected
                                ? 'bg-electric-blue text-white font-medium'
                                : 'bg-canvas dark:bg-white/10 group-hover:bg-paper dark:group-hover:bg-white/15 text-secondary dark:text-gray-400'
                            }`}
                          >
                            {item.shortcut}
                          </kbd>
                        </div>
                      </div>
                    );
                  })}
                </section>
              )}

              {/* Category 2: Hardware Intelligence Specimens */}
              {filteredSpecimens.length > 0 && (
                <section aria-label="Hardware Intelligence Specimens" className="space-y-1 pt-1">
                  <div className="px-3 pt-2 pb-1.5 flex items-center justify-between">
                    <span className="font-micro text-micro font-semibold uppercase tracking-[0.08em] text-secondary dark:text-gray-400">
                      Hardware Intelligence Specimens
                    </span>
                    <span className="font-micro text-micro text-outline dark:text-gray-500">Live Floor &amp; Truth Scores</span>
                  </div>

                  {filteredSpecimens.map((specimen) => {
                    const idx = flatResults.findIndex(r => r.id === specimen.id);
                    const isSelected = idx === selectedIndex;

                    return (
                      <div
                        key={specimen.id}
                        role="button"
                        tabIndex={0}
                        className={`palette-item group flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer text-left ${
                          isSelected
                            ? 'bg-canvas/90 dark:bg-white/10 shadow-sm border border-hairline/40 dark:border-white/10'
                            : 'bg-canvas/40 dark:bg-white/[0.03] hover:bg-canvas dark:hover:bg-white/5 border border-transparent'
                        }`}
                        onClick={() => {
                          specimen.action();
                          closeCommandPalette();
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                      >
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          <div className="w-12 h-12 rounded-xl bg-paper dark:bg-white/5 border border-hairline/30 dark:border-white/5 overflow-hidden shrink-0 flex items-center justify-center p-1">
                            <img
                              src={specimen.image}
                              alt={specimen.title}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80';
                              }}
                            />
                          </div>

                          <div className="flex flex-col min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-caption text-caption font-semibold text-primary dark:text-white truncate">
                                {specimen.title}
                              </span>
                              {specimen.badge && (
                                <span
                                  className={`px-2 py-0.5 rounded-full font-micro text-[11px] font-medium shrink-0 ${
                                    specimen.badgeType === 'ember'
                                      ? 'bg-ember text-on-primary'
                                      : specimen.badgeType === 'blue'
                                      ? 'bg-electric-blue/10 text-electric-blue dark:bg-electric-blue/20'
                                      : 'bg-canvas dark:bg-white/10 text-secondary dark:text-gray-300'
                                  }`}
                                >
                                  {specimen.badge}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2 text-secondary dark:text-gray-400 font-micro text-micro mt-0.5">
                              <span className="text-primary dark:text-white font-medium">
                                ${Number(specimen.price).toFixed(2)} Floor
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                                <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                                Truth Score {specimen.truthScore}/100
                              </span>
                              <span className="hidden sm:inline">• {specimen.seller}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-3">
                          <span className="hidden md:inline-flex font-micro text-micro text-link-blue group-hover:underline">
                            Open Dossier
                          </span>
                          <kbd
                            className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-micro text-micro ${
                              isSelected
                                ? 'bg-electric-blue text-white font-medium'
                                : 'bg-paper dark:bg-white/15 text-primary dark:text-white shadow-sm'
                            }`}
                          >
                            ↵
                          </kbd>
                        </div>
                      </div>
                    );
                  })}
                </section>
              )}

              {/* Category 3: Navigation & System Destinations */}
              {filteredViews.length > 0 && (
                <section aria-label="Navigation & System Destinations" className="space-y-1 pt-1">
                  <div className="px-3 pt-2 pb-1.5 flex items-center justify-between">
                    <span className="font-micro text-micro font-semibold uppercase tracking-[0.08em] text-secondary dark:text-gray-400">
                      Navigation &amp; System Destinations
                    </span>
                    <span className="font-micro text-micro text-outline dark:text-gray-500">Telemetry views</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {filteredViews.map((navItem) => {
                      const idx = flatResults.findIndex(r => r.id === navItem.id);
                      const isSelected = idx === selectedIndex;

                      return (
                        <div
                          key={navItem.id}
                          role="button"
                          tabIndex={0}
                          className={`palette-item group flex items-center gap-3 p-3 rounded-2xl transition-all cursor-pointer text-left ${
                            isSelected
                              ? 'bg-canvas/90 dark:bg-white/10 shadow-sm border border-hairline/40 dark:border-white/10'
                              : 'hover:bg-canvas dark:hover:bg-white/5 border border-transparent'
                          }`}
                          onClick={() => {
                            navItem.action();
                            closeCommandPalette();
                          }}
                          onMouseEnter={() => setSelectedIndex(idx)}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${navItem.iconBg || 'bg-canvas dark:bg-white/10'}`}>
                            {navItem.icon}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-caption text-caption font-medium text-primary dark:text-white group-hover:text-electric-blue transition-colors truncate">
                              {navItem.title}
                            </span>
                            <span className="font-micro text-micro text-secondary dark:text-gray-400 truncate">
                              {navItem.subtitle}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </>
          )}
        </div>

        {/* Spotlight Footer Bar (~48px) */}
        <div className="h-12 px-5 sm:px-6 bg-canvas dark:bg-[#161617] border-t border-surface-container dark:border-white/10 flex items-center justify-between select-none">
          <div className="flex items-center gap-4 text-secondary dark:text-gray-400 font-micro text-micro">
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-paper dark:bg-white/15 shadow-sm font-mono text-[11px] text-primary dark:text-white border border-hairline/30 dark:border-white/10">
                ↑↓
              </kbd>
              <span className="hidden sm:inline">Navigate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-paper dark:bg-white/15 shadow-sm font-mono text-[11px] text-primary dark:text-white border border-hairline/30 dark:border-white/10">
                ↵
              </kbd>
              <span className="hidden sm:inline">Select</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-paper dark:bg-white/15 shadow-sm font-mono text-[11px] text-primary dark:text-white border border-hairline/30 dark:border-white/10">
                esc
              </kbd>
              <span className="hidden sm:inline">Dismiss</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-paper dark:bg-white/15 shadow-sm font-mono text-[11px] text-primary dark:text-white border border-hairline/30 dark:border-white/10">
                tab
              </kbd>
              <span>Category</span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-micro text-micro text-on-surface-variant dark:text-gray-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-electric-blue shrink-0"></span>
            <span>Node Ingestion 248ms</span>
            <span className="hidden sm:inline text-outline dark:text-gray-500">• Zero Sponsored Bias</span>
          </div>
        </div>
      </div>
    </div>
  );
};
