import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck, 
  Printer, 
  Download, 
  Share2, 
  ExternalLink,
  Check,
  Building,
  Clock,
  FileText
} from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { useApp } from '../context/AppContext';

export const ReceiptPage = () => {
  const navigate = useNavigate();
  const { wallet } = useWallet();
  const { showToast } = useApp();

  const [activeStep, setActiveStep] = useState(5); // 5/5 finalized

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast('Receipt Downloaded', 'Cryptographic settlement receipt saved as PDF.', 'success');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link Copied', 'Receipt verification link copied to clipboard.', 'info');
  };

  return (
    <div className="w-full bg-surface min-h-screen">
      {/* 1. Monumental Hero (Cathedral of White Space) */}
      <section className="w-full bg-paper py-16 sm:py-24 border-b border-hairline/60">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center">
          
          {/* Ember Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low text-ember mb-6">
            <span className="w-2 h-2 rounded-full bg-ember animate-pulse"></span>
            <span className="font-micro text-micro uppercase tracking-wider font-semibold">
              FEDNOW &amp; RTP REAL-TIME RAILS • $0.00 SETTLEMENT FEE GUARANTEE
            </span>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-primary max-w-4xl tracking-tight mb-4">
            Instant Liquidity.<br />Cryptographic Escrow.
          </h1>

          <p className="font-body text-body sm:text-xl text-secondary max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Transfer verified consumer surplus directly from the flashcompare.ai decentralized ledger into your checking or high-yield savings account in under 3 seconds.
          </p>

          {/* Protocol Verification Pill Indicator */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-secondary font-caption text-caption">
            <span className="flex items-center gap-1.5 text-primary font-medium">
              <ShieldCheck size={18} className="text-electric-blue" />
              Zero Affiliate Leakage
            </span>
            <span className="w-1 h-1 rounded-full bg-secondary"></span>
            <span className="flex items-center gap-1.5 text-primary font-medium">
              <Zap size={18} className="text-electric-blue" />
              1.42s Clearing Latency
            </span>
            <span className="w-1 h-1 rounded-full bg-secondary"></span>
            <span className="flex items-center gap-1.5 text-primary font-medium">
              <CheckCircle2 size={18} className="text-electric-blue" />
              256-Bit Cryptographic Nonce
            </span>
          </div>
        </div>
      </section>

      {/* 2. 5-Step Progressive Settlement Stage */}
      <section className="w-full bg-paper pb-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="bg-surface-container-low rounded-[28px] p-6 sm:p-10 shadow-sm border border-hairline/60">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-hairline">
              <div>
                <span className="font-micro text-micro font-semibold uppercase tracking-wider text-secondary">
                  Ledger Pipeline v4.18
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-primary mt-0.5">
                  Autonomous Settlement Lifecycle
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-paper font-micro text-micro font-semibold text-electric-blue shadow-sm border border-hairline">
                State: Terminal Confirmation (5/5)
              </span>
            </div>

            {/* Horizontal Step Progress Chain */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              
              {/* Step 1 */}
              <div className="bg-paper p-4 rounded-2xl shadow-sm flex flex-col justify-between border border-hairline/60">
                <div className="flex items-center justify-between">
                  <span className="font-micro text-micro uppercase font-semibold text-secondary">Step 01</span>
                  <span className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <Check size={12} />
                  </span>
                </div>
                <div className="mt-3">
                  <span className="font-caption text-caption font-semibold text-primary block">Capital Amount</span>
                  <span className="font-micro text-micro text-secondary block mt-0.5">$50.00 USD Cleared</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-paper p-4 rounded-2xl shadow-sm flex flex-col justify-between border border-hairline/60">
                <div className="flex items-center justify-between">
                  <span className="font-micro text-micro uppercase font-semibold text-secondary">Step 02</span>
                  <span className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <Check size={12} />
                  </span>
                </div>
                <div className="mt-3">
                  <span className="font-caption text-caption font-semibold text-primary block">Routing Verification</span>
                  <span className="font-micro text-micro text-secondary block mt-0.5">ABA 021000021 Passed</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-paper p-4 rounded-2xl shadow-sm flex flex-col justify-between border border-hairline/60">
                <div className="flex items-center justify-between">
                  <span className="font-micro text-micro uppercase font-semibold text-secondary">Step 03</span>
                  <span className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <Check size={12} />
                  </span>
                </div>
                <div className="mt-3">
                  <span className="font-caption text-caption font-semibold text-primary block">SMS Cryptographic OTP</span>
                  <span className="font-micro text-micro text-secondary block mt-0.5">Signed: Nonce • 1234</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-paper p-4 rounded-2xl shadow-sm flex flex-col justify-between border border-hairline/60">
                <div className="flex items-center justify-between">
                  <span className="font-micro text-micro uppercase font-semibold text-secondary">Step 04</span>
                  <span className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <Check size={12} />
                  </span>
                </div>
                <div className="mt-3">
                  <span className="font-caption text-caption font-semibold text-primary block">FedNow Ingestion</span>
                  <span className="font-micro text-micro text-secondary block mt-0.5">Direct Node 8A</span>
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-primary text-white p-4 rounded-2xl shadow-md flex flex-col justify-between border border-primary">
                <div className="flex items-center justify-between">
                  <span className="font-micro text-micro uppercase font-semibold text-white/70">Step 05</span>
                  <span className="w-5 h-5 rounded-full bg-electric-blue flex items-center justify-center text-white animate-pulse">
                    <CheckCircle2 size={13} />
                  </span>
                </div>
                <div className="mt-3">
                  <span className="font-caption text-caption font-semibold text-white block">Settlement Receipt</span>
                  <span className="font-micro text-micro text-white/70 block mt-0.5">Immutable Record Finalized</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. The Official Cryptographic Settlement Receipt Card */}
      <section className="w-full bg-canvas py-16 sm:py-20">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6 flex flex-col items-center">
          
          <div className="text-center mb-8">
            <span className="font-micro text-micro font-semibold uppercase tracking-wider text-secondary">
              Deterministic Liquidity Node
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-primary mt-1">
              Official FedNow Clearing Receipt
            </h3>
          </div>

          {/* Receipt Paper Slab */}
          <div className="w-full bg-paper rounded-[28px] p-8 sm:p-10 shadow-lg border border-hairline/70 flex flex-col gap-8">
            
            {/* Top Receipt Brand Header */}
            <div className="flex items-center justify-between pb-6 border-b border-hairline">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-electric-blue/10 flex items-center justify-center text-electric-blue">
                  <Zap size={20} />
                </div>
                <div>
                  <div className="font-caption text-caption font-bold text-primary">flashcompare.ai Autonomous Settlement</div>
                  <div className="font-micro text-micro text-secondary">Federal Reserve FedNow Rail ID: #FN-4892-0x8f</div>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-micro text-micro font-semibold uppercase tracking-wide">
                Settled &amp; Deposited
              </span>
            </div>

            {/* Big Dispatched Amount */}
            <div className="flex flex-col items-center justify-center py-4 bg-canvas rounded-2xl border border-hairline/60">
              <span className="font-micro text-micro uppercase tracking-wider text-secondary font-semibold">Net Payout Dispatched</span>
              <div className="text-5xl font-extrabold text-primary font-mono tracking-tight mt-1">
                $50.00 <span className="text-xl font-normal text-secondary font-sans">USD</span>
              </div>
              <span className="text-xs text-electric-blue font-medium mt-1">
                Zero Fees Deducted ($0.00 Network Cost)
              </span>
            </div>

            {/* Cryptographic Key Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-body-sm text-sm">
              <div className="p-4 rounded-xl bg-canvas flex flex-col gap-1 border border-hairline/50">
                <span className="font-micro text-micro text-secondary uppercase font-semibold">Settlement Transaction ID</span>
                <span className="font-mono text-xs text-primary font-semibold truncate">0x8f2a7b9c41d8e5f2a1b9c3d4e5</span>
              </div>

              <div className="p-4 rounded-xl bg-canvas flex flex-col gap-1 border border-hairline/50">
                <span className="font-micro text-micro text-secondary uppercase font-semibold">Beneficiary Account</span>
                <span className="font-mono text-xs text-primary font-semibold">Chase Premier Checking (•••• 4821)</span>
              </div>

              <div className="p-4 rounded-xl bg-canvas flex flex-col gap-1 border border-hairline/50">
                <span className="font-micro text-micro text-secondary uppercase font-semibold">Clearing Rail / Protocol</span>
                <span className="text-xs text-primary font-semibold">Federal Reserve FedNow Real-Time ACH</span>
              </div>

              <div className="p-4 rounded-xl bg-canvas flex flex-col gap-1 border border-hairline/50">
                <span className="font-micro text-micro text-secondary uppercase font-semibold">Execution Latency</span>
                <span className="font-mono text-xs text-electric-blue font-semibold">1,420ms (P99 Optimal)</span>
              </div>

              <div className="p-4 rounded-xl bg-canvas flex flex-col gap-1 border border-hairline/50 sm:col-span-2">
                <span className="font-micro text-micro text-secondary uppercase font-semibold">Cryptographic Nonce Proof</span>
                <span className="font-mono text-[11px] text-secondary break-all">
                  SHA-256: 8a4f932e67c8b12d5930e14a782f9d6c3847e192a5b8c3d4e7f9a1b2c3d4e5f6
                </span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-hairline">
              <Link
                to="/wallet"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-canvas hover:bg-surface-variant text-primary font-caption text-caption font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} />
                <span>Return to Wallet</span>
              </Link>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="p-2.5 rounded-full bg-canvas hover:bg-surface-variant text-secondary hover:text-primary transition-colors"
                  title="Print Settlement Receipt"
                >
                  <Printer size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-canvas hover:bg-surface-variant text-secondary hover:text-primary transition-colors"
                  title="Copy Verification Link"
                >
                  <Share2 size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-electric-blue hover:bg-link-blue text-white font-caption text-caption font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Download size={15} />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
