import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  X, 
  Loader2, 
  ChevronDown, 
  User, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  Zap,
  HelpCircle,
  Menu,
  Wallet,
  Crown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useWallet } from '../../context/WalletContext';
import { useChat } from '../../context/ChatContext';

export const Navbar = () => {
  const { currentUser, isAuthenticated, openAuthModal } = useAuth();
  const { openCommandPalette } = useApp();
  const { wallet } = useWallet();
  const { openChat } = useChat();
  const navigate = useNavigate();
  const location = useLocation();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const searchInputRef = useRef(null);
  const moreDropdownRef = useRef(null);

  // Sync search input if user enters catalog with query
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q) {
      setSearchQuery(q);
    }
  }, [location.search]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(e.target)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMoreOpen(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleOpenQuiz = () => {
    window.dispatchEvent(new CustomEvent('open-quiz'));
    closeMobileMenu();
    setIsMoreOpen(false);
  };

  const handleOpenCommunityChat = () => {
    openChat();
    closeMobileMenu();
    setIsMoreOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setIsSearchOpen(false);
      navigate(`/catalog?q=${encodeURIComponent(query)}`);
      closeMobileMenu();
    }, 200);
  };

  const balanceNumber = wallet?.balance ?? 342.50;
  const formattedBalance = `$${balanceNumber.toFixed(2)}`;

  // Active navigation styling helper
  const getNavLinkClass = ({ isActive }) =>
    `relative py-1.5 px-2.5 rounded-lg text-[13px] font-medium tracking-tight transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue ${
      isActive
        ? 'text-primary font-semibold bg-canvas/80 shadow-xs'
        : 'text-secondary hover:text-primary hover:bg-canvas/50'
    }`;

  return (
    <>
      {/* 48px Fixed Minimal Header (Cathedral of White Space) */}
      <header className="fixed top-0 inset-x-0 z-50 bg-paper/90 backdrop-blur-[20px] border-b border-hairline/60 transition-colors">
        <div className="h-12 max-w-[1360px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Desktop/Tablet Navigation */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-primary hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue rounded-md px-1 py-0.5"
              onClick={closeMobileMenu}
              aria-label="flashcompare.ai Home"
            >
              <Zap size={18} className="text-electric-blue fill-electric-blue" />
              <span className="font-caption text-sm font-bold tracking-tight text-primary">
                flashcompare<span className="text-electric-blue font-bold">.ai</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-1.5" aria-label="Main Navigation">
              {/* Primary 4 items (Visible on Tablet & Desktop) */}
              <NavLink to="/" className={getNavLinkClass} end>
                Products
              </NavLink>
              <NavLink to="/catalog" className={getNavLinkClass}>
                Deals
              </NavLink>
              <NavLink to="/compare" className={getNavLinkClass}>
                Compare
              </NavLink>
              <NavLink to="/wallet" className={getNavLinkClass}>
                Cashback
              </NavLink>

              {/* Items 5 & 6 (Visible on Desktop >= 1024px; collapsed into More on Tablet) */}
              <NavLink to="/community" className={`hidden lg:inline-flex ${getNavLinkClass({ isActive: location.pathname === '/community' })}`}>
                Community
              </NavLink>
              <NavLink to="/quiz" className={`hidden lg:inline-flex ${getNavLinkClass({ isActive: location.pathname === '/quiz' })}`}>
                Tech Quiz
              </NavLink>

              {/* More Actions Dropdown */}
              <div className="relative" ref={moreDropdownRef}>
                <button
                  type="button"
                  className={`flex items-center gap-1 py-1.5 px-2.5 rounded-lg text-[13px] font-medium tracking-tight transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue ${
                    isMoreOpen
                      ? 'text-primary bg-canvas font-semibold'
                      : 'text-secondary hover:text-primary hover:bg-canvas/50'
                  }`}
                  onClick={() => setIsMoreOpen(prev => !prev)}
                  aria-expanded={isMoreOpen}
                  aria-haspopup="true"
                  aria-label="More navigation options"
                >
                  <span>More</span>
                  <ChevronDown 
                    size={13} 
                    className={`transition-transform duration-200 text-secondary ${isMoreOpen ? 'rotate-180 text-primary' : ''}`} 
                  />
                </button>

                {isMoreOpen && (
                  <div className="absolute left-0 top-full mt-2 w-56 rounded-2xl bg-paper/95 backdrop-blur-2xl border border-hairline/80 shadow-apple-float py-2 z-50 flex flex-col animate-scale-up">
                    {/* Tablet-only collapsed items */}
                    <div className="lg:hidden border-b border-hairline/50 pb-1.5 mb-1.5">
                      <NavLink
                        to="/community"
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-primary hover:bg-canvas transition-colors"
                        onClick={() => setIsMoreOpen(false)}
                      >
                        <MessageSquare size={14} className="text-electric-blue" />
                        <span>Community</span>
                      </NavLink>
                      <NavLink
                        to="/quiz"
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-primary hover:bg-canvas transition-colors"
                        onClick={() => setIsMoreOpen(false)}
                      >
                        <Sparkles size={14} className="text-ember" />
                        <span>Tech Quiz</span>
                      </NavLink>
                    </div>

                    {/* Rich tool actions */}
                    <button
                      type="button"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-primary hover:bg-canvas transition-colors text-left cursor-pointer"
                      onClick={handleOpenQuiz}
                    >
                      <Sparkles size={14} className="text-electric-blue" />
                      <span>Quick Quiz Challenge</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-primary hover:bg-canvas transition-colors text-left cursor-pointer"
                      onClick={handleOpenCommunityChat}
                    >
                      <MessageSquare size={14} className="text-secondary" />
                      <span>Community Chat</span>
                    </button>
                    <div className="border-t border-hairline/50 my-1"></div>
                    <Link
                      to={isAuthenticated ? "/dashboard" : "/login"}
                      className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-primary hover:bg-canvas transition-colors text-left"
                      onClick={() => setIsMoreOpen(false)}
                    >
                      <User size={14} className="text-secondary" />
                      <span>{isAuthenticated ? 'My Dashboard' : 'Customer Sign In'}</span>
                    </Link>
                    <Link
                      to="/admin/login"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-electric-blue hover:bg-canvas transition-colors text-left"
                      onClick={() => setIsMoreOpen(false)}
                    >
                      <ShieldCheck size={14} />
                      <span>Staff Admin Portal</span>
                    </Link>
                    <Link
                      to="/owner/login"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-amber-500 hover:bg-canvas transition-colors text-left"
                      onClick={() => setIsMoreOpen(false)}
                    >
                      <Crown size={14} />
                      <span>Executive Owner Console</span>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right Controls: Search, Balance, Profile, Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Search Button / ⌘K Command Palette */}
            <button
              type="button"
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-canvas hover:bg-surface-variant text-secondary hover:text-primary transition-all cursor-pointer border border-hairline/60 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
              onClick={openCommandPalette}
              aria-label="Search hardware or open command palette (Press Command K)"
              title="Search products, compare SKUs, run actions (⌘K)"
            >
              <Search size={14} className="text-secondary" />
              <span className="hidden sm:inline font-caption text-xs font-medium">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-paper font-mono text-[10px] text-secondary shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-hairline/60">
                ⌘K
              </kbd>
            </button>

            {/* Balance Pill Button */}
            <Link
              to="/wallet"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-electric-blue text-paper hover:bg-electric-blue/90 transition-all font-caption text-xs font-semibold shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
              aria-label={`Wallet balance: ${formattedBalance}`}
              title="View Cashback Wallet & Transfer Balance"
            >
              <span>{formattedBalance}</span>
              <span className="opacity-90 hidden sm:inline font-medium">Balance</span>
            </Link>

            {/* Profile Avatar Button */}
            <button
              type="button"
              onClick={handleUserClick}
              aria-label={isAuthenticated ? `Profile: ${currentUser?.name || 'User'}` : 'Sign In or Create Account'}
              className="w-8 h-8 rounded-full bg-canvas hover:bg-surface-variant flex items-center justify-center text-primary transition-colors cursor-pointer border border-hairline/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
              title={isAuthenticated ? 'Account Profile' : 'Sign In'}
            >
              {isAuthenticated ? (
                <span className="font-caption text-xs font-bold uppercase text-primary">
                  {currentUser?.name?.charAt(0) || 'A'}
                </span>
              ) : (
                <User size={14} className="text-secondary" />
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden w-8 h-8 rounded-full bg-canvas hover:bg-surface-variant flex items-center justify-center text-primary transition-colors cursor-pointer border border-hairline/60"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Global Search Overlay Modal (if opened directly via input) */}
        {isSearchOpen && (
          <div className="absolute top-12 inset-x-0 bg-paper/95 backdrop-blur-xl border-b border-hairline shadow-apple-float py-3 px-6 animate-slide-down z-50">
            <div className="max-w-[720px] mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search size={16} className="absolute left-3.5 text-secondary pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products by brand, model, or specs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-20 py-2 bg-canvas rounded-full text-xs sm:text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-electric-blue border border-hairline/60"
                  autoFocus
                />
                <div className="absolute right-2.5 flex items-center gap-1.5">
                  {isSearching ? (
                    <Loader2 size={15} className="animate-spin text-electric-blue" />
                  ) : searchQuery ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-secondary hover:text-primary text-xs p-1 cursor-pointer"
                      aria-label="Clear query"
                    >
                      <X size={14} />
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="px-2 py-0.5 rounded-full bg-paper text-secondary font-mono text-xs hover:text-primary border border-hairline/40 cursor-pointer"
                  >
                    Esc
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Clean Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-paper/98 backdrop-blur-2xl border-b border-hairline/80 py-4 px-6 space-y-2 animate-slide-down shadow-apple-float">
            <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={({ isActive }) => `flex items-center justify-between font-caption text-sm py-2 px-3 rounded-xl transition-colors ${
                  isActive ? 'bg-canvas text-primary font-bold' : 'text-secondary hover:text-primary'
                }`}
                end
              >
                <span>Products</span>
                <span className="font-micro text-[11px] text-secondary">Catalog Home</span>
              </NavLink>

              <NavLink
                to="/catalog"
                onClick={closeMobileMenu}
                className={({ isActive }) => `flex items-center justify-between font-caption text-sm py-2 px-3 rounded-xl transition-colors ${
                  isActive ? 'bg-canvas text-primary font-bold' : 'text-secondary hover:text-primary'
                }`}
              >
                <span>Deals</span>
                <span className="font-micro text-[11px] text-ember font-semibold">Live Arbitrage</span>
              </NavLink>

              <NavLink
                to="/compare"
                onClick={closeMobileMenu}
                className={({ isActive }) => `flex items-center justify-between font-caption text-sm py-2 px-3 rounded-xl transition-colors ${
                  isActive ? 'bg-canvas text-primary font-bold' : 'text-secondary hover:text-primary'
                }`}
              >
                <span>Compare</span>
                <span className="font-micro text-[11px] text-electric-blue font-semibold">Spec Matrix</span>
              </NavLink>

              <NavLink
                to="/wallet"
                onClick={closeMobileMenu}
                className={({ isActive }) => `flex items-center justify-between font-caption text-sm py-2 px-3 rounded-xl transition-colors ${
                  isActive ? 'bg-canvas text-primary font-bold' : 'text-secondary hover:text-primary'
                }`}
              >
                <span>Cashback</span>
                <span className="font-micro text-[11px] text-primary font-bold">{formattedBalance}</span>
              </NavLink>

              <NavLink
                to="/community"
                onClick={closeMobileMenu}
                className={({ isActive }) => `flex items-center justify-between font-caption text-sm py-2 px-3 rounded-xl transition-colors ${
                  isActive ? 'bg-canvas text-primary font-bold' : 'text-secondary hover:text-primary'
                }`}
              >
                <span>Community</span>
                <span className="font-micro text-[11px] text-secondary">Discussions</span>
              </NavLink>

              <NavLink
                to="/quiz"
                onClick={closeMobileMenu}
                className={({ isActive }) => `flex items-center justify-between font-caption text-sm py-2 px-3 rounded-xl transition-colors ${
                  isActive ? 'bg-canvas text-primary font-bold' : 'text-secondary hover:text-primary'
                }`}
              >
                <span>Tech Quiz</span>
                <span className="font-micro text-[11px] text-secondary">Earn Rewards</span>
              </NavLink>
            </nav>

            <div className="pt-3 border-t border-hairline/60 flex flex-col gap-2">
              <Link
                to={isAuthenticated ? "/dashboard" : "/login"}
                onClick={closeMobileMenu}
                className="flex items-center justify-between font-caption text-xs py-2 px-3 rounded-xl bg-canvas text-primary font-medium"
              >
                <div className="flex items-center gap-2">
                  <User size={14} className="text-secondary" />
                  <span>{isAuthenticated ? (currentUser?.name || 'My Dashboard') : 'Customer Sign In'}</span>
                </div>
                <span className="font-micro text-micro text-electric-blue font-semibold">User</span>
              </Link>

              <Link
                to="/admin/login"
                onClick={closeMobileMenu}
                className="flex items-center justify-between font-caption text-xs py-2 px-3 rounded-xl bg-canvas text-primary font-medium"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-electric-blue" />
                  <span>Staff Admin Portal</span>
                </div>
                <span className="font-micro text-micro text-secondary">Admin</span>
              </Link>

              <Link
                to="/owner/login"
                onClick={closeMobileMenu}
                className="flex items-center justify-between font-caption text-xs py-2 px-3 rounded-xl bg-canvas text-amber-400 font-medium"
              >
                <div className="flex items-center gap-2">
                  <Crown size={14} className="text-amber-400" />
                  <span>Executive Owner Console</span>
                </div>
                <span className="font-mono text-micro text-amber-500">Root</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
