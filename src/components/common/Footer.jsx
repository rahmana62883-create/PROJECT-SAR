import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Zap, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  const { openCommandPalette, resetDemo } = useApp();

  return (
    <footer className="w-full bg-paper border-t border-hairline/60 pt-16 pb-12 mt-auto text-primary antialiased">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-hairline/40">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-lg font-bold text-primary tracking-tight">
            <Zap size={20} className="text-electric-blue fill-electric-blue" />
            <span>flashcompare<span className="text-electric-blue">.ai</span></span>
          </div>
          <p className="font-caption text-caption text-secondary leading-relaxed max-w-sm">
            Autonomous consumer market intelligence and price verification engine. Built with minimal luxury precision, generous white space, and zero affiliate distortion.
          </p>
          <div className="flex items-center gap-2 font-micro text-micro font-medium text-electric-blue">
            <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse"></span>
            <span>All 48 Retailer Feed Nodes Active &amp; Calibrated</span>
          </div>
        </div>

        {/* Navigation Column */}
        <div className="flex flex-col gap-3 font-caption text-caption">
          <h4 className="font-micro text-micro font-semibold text-primary uppercase tracking-wider mb-1">
            Navigation
          </h4>
          <Link to="/" className="text-secondary hover:text-primary transition-colors py-0.5">Dossier (PDP)</Link>
          <Link to="/catalog" className="text-secondary hover:text-primary transition-colors py-0.5">Hot Deals Arbitrage</Link>
          <Link to="/compare" className="text-secondary hover:text-primary transition-colors py-0.5">Comparison Matrix</Link>
          <Link to="/wallet" className="text-secondary hover:text-primary transition-colors py-0.5">Cashback Wallet &amp; Inbox</Link>
        </div>

        {/* Platform Column */}
        <div className="flex flex-col gap-3 font-caption text-caption">
          <h4 className="font-micro text-micro font-semibold text-primary uppercase tracking-wider mb-1">
            Platform
          </h4>
          <Link to="/account" className="text-secondary hover:text-primary transition-colors py-0.5">Customer Account</Link>
          <Link to="/admin" className="text-secondary hover:text-primary transition-colors py-0.5">Admin Command Center</Link>
          <button
            type="button"
            className="text-left text-secondary hover:text-primary transition-colors cursor-pointer py-0.5"
            onClick={openCommandPalette}
          >
            Command Palette (⌘K)
          </button>
          <button
            type="button"
            className="text-left text-secondary hover:text-primary transition-colors cursor-pointer py-0.5"
            onClick={resetDemo}
          >
            Reset Demo Baseline
          </button>
        </div>

        {/* Security & Banking Column */}
        <div className="flex flex-col gap-3 font-caption text-caption">
          <h4 className="font-micro text-micro font-semibold text-primary uppercase tracking-wider mb-1">
            Security &amp; Banking
          </h4>
          <p className="font-micro text-micro text-secondary leading-relaxed">
            Instant ACH bank transfers and cashback wallet balances are guaranteed via simulated 256-bit AES cryptographic rails.
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-micro text-micro font-medium bg-canvas text-secondary">
              Instant ACH
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-micro text-micro font-medium bg-canvas text-secondary">
              Zero Fee Guarantee
            </span>
          </div>
        </div>

      </div>

      <div className="max-w-[1200px] mx-auto px-6 pt-8 text-center font-micro text-micro text-secondary">
        <p>&copy; 2026 flashcompare.ai Platform. Cathedral of White Space Design System. All flagship product marks belong to their respective holders.</p>
      </div>
    </footer>
  );
};
