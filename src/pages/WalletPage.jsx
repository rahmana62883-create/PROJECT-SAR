import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { formatPrice } from '../utils/formatters';
import { 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Ticket, 
  ExternalLink,
  Copy,
  Check,
  Smartphone,
  Gift,
  Plus
} from 'lucide-react';
import { RevealSection, KineticTypography } from '../components/common/MotionComponents';
import { AnimatedNumber } from '../components/common/AnimatedNumber';

export const WalletPage = () => {
  const {
    wallet,
    openWithdrawModal,
    openLinkBankModal,
    unlinkBankAccount,
    openReceipt
  } = useWallet();

  const [selectedPreset, setSelectedPreset] = useState(500);
  const [copiedCode, setCopiedCode] = useState(null);

  const balanceNumber = wallet?.balance ?? 500;
  const formattedBalance = formatPrice(balanceNumber);

  const vouchers = [
    { code: 'HDFC1500', discount: '-₹1,500 Instant', store: 'Amazon India', successRate: '99.2%', expires: 'Today' },
    { code: 'FLIPKARTAXIS', discount: '-₹2,000 Instant', store: 'Flipkart', successRate: '98.4%', expires: '2 Days' },
    { code: 'CROMANEW', discount: '₹1,000 Tata Neu', store: 'Tata Croma', successRate: '96.8%', expires: '4 Days' },
    { code: 'RELIANCE500', discount: '-₹500 Voucher', store: 'Reliance Digital', successRate: '97.5%', expires: 'Live' },
  ];

  const handleCopyCode = (code) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  const handleTransferClick = () => {
    openWithdrawModal();
  };

  return (
    <div className="w-full bg-paper min-h-screen text-primary antialiased selection:bg-electric-blue selection:text-paper pt-11">
      
      {/* =========================================================================
          TOP EDITORIAL HERO BAND (White Canvas)
          ========================================================================= */}
      <section className="w-full bg-paper pt-16 pb-14 md:pt-24 md:pb-20 border-b border-hairline/40">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col gap-6 max-w-4xl">
            
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-canvas text-ember font-micro text-micro font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-ember"></span>
                Automated Escrow &amp; Shopping Inbox
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-secondary font-micro text-micro">
                <ShieldCheck size={14} className="text-electric-blue" />
                Direct FedNow / ACH Rail Active
              </span>
            </div>

            <KineticTypography 
              text="Your Rewards. Cash in Hand." 
              className="font-heading-lg text-4xl sm:text-6xl md:text-heading-lg tracking-tight text-primary leading-[1.02] font-bold"
            />

            <RevealSection delay={200} direction="up">
              <p className="font-body text-base sm:text-xl text-secondary max-w-2xl leading-relaxed">
                Earn 1% instant spendable cashback across 48 integrated retail nodes with zero-cost instant ACH transfers and automated voucher harvesting.
              </p>
            </RevealSection>

            {/* Stat Pill Quick Glance */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-hairline/40">
              <div className="flex flex-col">
                <span className="font-micro text-micro uppercase tracking-wider text-secondary">Settlement Latency</span>
                <span className="font-body-sm text-sm sm:text-body-sm font-semibold text-primary">Sub-2 Second UPI / IMPS</span>
              </div>
              <div className="w-px h-8 bg-hairline hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="font-micro text-micro uppercase tracking-wider text-secondary">Harvested Vouchers</span>
                <span className="font-body-sm text-sm sm:text-body-sm font-semibold text-primary">14 Active Real-Time Codes</span>
              </div>
              <div className="w-px h-8 bg-hairline hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="font-micro text-micro uppercase tracking-wider text-secondary">Price Guard Protection</span>
                <span className="font-body-sm text-sm sm:text-body-sm font-semibold text-primary">{formatPrice(18420)} Recovered This Month</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE DASHBOARD DUAL-COLUMN SPLIT (Pale Gray Canvas Band)
          ========================================================================= */}
      <section className="w-full bg-canvas py-16 md:py-24 border-b border-hairline/40">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Cashback Wallet & Instant Bank Settlement (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              
              {/* Primary Balance Card */}
              <RevealSection delay={100} threshold={0.1}>
              <div className="bg-paper rounded-28 p-8 sm:p-10 flex flex-col gap-8 border border-hairline/40 shadow-apple-card hover-elevate">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-micro text-micro font-semibold uppercase tracking-wider text-secondary">
                      Available for Direct Wire
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl sm:text-6xl font-bold tracking-tight text-primary leading-none">
                        <AnimatedNumber value={balanceNumber} formatter={formatPrice} />
                      </span>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-canvas text-primary">
                        <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse"></span>
                        <span className="font-micro text-micro font-medium">Ready</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-micro text-micro text-secondary block">Lifetime Arbitrage</span>
                    <span className="font-caption text-caption font-semibold text-primary">{formatPrice(12540)}</span>
                  </div>
                </div>

                {/* Linked Bank Entity Tile */}
                <div className="bg-canvas rounded-xl p-5 flex items-center justify-between border border-hairline/30">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-paper flex items-center justify-center text-primary shadow-sm">
                      <Building2 size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-caption text-caption font-semibold text-primary">
                        {wallet.linkedAccounts?.[0]?.bankName || 'HDFC Bank Salary Account'} (•••• {wallet.linkedAccounts?.[0]?.last4 || '4289'})
                      </span>
                      <span className="font-micro text-micro text-secondary">
                        Verified Instant UPI &amp; IMPS Rail • IFSC HDFC0000240
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={openLinkBankModal}
                    className="text-secondary hover:text-primary p-1"
                    title="Manage Linked Accounts"
                  >
                    <CheckCircle2 size={20} className="text-electric-blue" />
                  </button>
                </div>

                {/* Transfer Preset Actions */}
                <div className="flex flex-col gap-3">
                  <span className="font-micro text-micro font-medium text-secondary uppercase tracking-wider">
                    Select Withdrawal Amount
                  </span>
                  <div className="grid grid-cols-4 gap-2.5">
                    {[500, 1000, 2500, 'all'].map((amt) => {
                      const isSel = selectedPreset === amt;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setSelectedPreset(amt)}
                          className={`py-3 rounded-full font-caption text-caption font-semibold transition-all cursor-pointer text-center ${
                            isSel
                              ? 'bg-canvas text-primary ring-2 ring-primary'
                              : 'bg-canvas text-secondary hover:text-primary hover:bg-surface-variant'
                          }`}
                        >
                          {amt === 'all' ? `All (${formattedBalance})` : formatPrice(amt)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Primary CTA Action Button */}
                <div className="flex flex-col gap-3 pt-2">
                  <button
                    type="button"
                    className="w-full py-3.5 px-6 rounded-full bg-electric-blue text-paper font-body-sm text-body-sm font-medium hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    onClick={handleTransferClick}
                  >
                    <Zap size={18} className="fill-current" />
                    <span>Instant UPI / IMPS Transfer (₹0.00 Fee)</span>
                  </button>
                  <p className="font-micro text-micro text-center text-secondary">
                    Zero processing fees. Transferred directly to linked bank account in 1–3 seconds via NPCI UPI / IMPS direct settlement.
                  </p>
                </div>

                {/* 14-Day Price Drop Escrow Badge */}
                <div className="bg-canvas rounded-xl p-4 flex items-center gap-3 border border-hairline/30">
                  <ShieldCheck size={24} className="text-ember shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-caption text-caption font-semibold text-primary">
                      Autonomous 14-Day Price Drop Escrow Active
                    </span>
                    <span className="font-micro text-micro text-secondary">
                      If retail nodes lower prices within 14 days of purchase, the delta is directly deposited into your wallet.
                    </span>
                  </div>
                </div>
              </div>
              </RevealSection>

              {/* Chronological Cashback Ledger Card */}
              <RevealSection delay={200} threshold={0.1}>
              <div className="bg-paper rounded-28 p-8 sm:p-10 flex flex-col gap-6 border border-hairline/40 shadow-apple-card hover-elevate">
                <div className="flex items-center justify-between pb-4 border-b border-hairline/40">
                  <div>
                    <h2 className="font-subheading text-xl md:text-subheading text-primary font-semibold">
                      Cashback Ledger
                    </h2>
                    <span className="font-micro text-micro text-secondary">
                      Real-time settlement stream from verified retail nodes
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 font-micro text-micro text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue"></span>
                    Node Auto-Sync
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Ledger Item 1 */}
                  <RevealSection delay={300} direction="up">
                  <div className="p-4 rounded-xl bg-canvas flex items-center justify-between border border-hairline/30">
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-full bg-paper flex items-center justify-center text-primary shadow-sm">
                        <Gift size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-caption text-caption font-semibold text-primary">
                          Welcome Bonus Cashback
                        </span>
                        <span className="font-micro text-micro text-secondary">
                          Sign-up arbitrage reward • flashcompare.ai Treasury
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-caption text-caption font-semibold text-primary">+ {formatPrice(500)}</span>
                      <span className="font-micro text-micro text-secondary block">Settled</span>
                    </div>
                  </div>
                  </RevealSection>

                  {/* Ledger Item 2 */}
                  <RevealSection delay={400} direction="up">
                  <div className="p-4 rounded-xl bg-canvas flex items-center justify-between border border-hairline/30">
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-full bg-paper flex items-center justify-center text-primary shadow-sm">
                        <Smartphone size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-caption text-caption font-semibold text-primary">
                          Apple iPhone 16 Pro 128GB
                        </span>
                        <span className="font-micro text-micro text-secondary">
                          Amazon India Node Relay #FC-71092 • 1.0% rebate
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-caption text-caption font-semibold text-primary">+ {formatPrice(1199)}</span>
                      <span className="font-micro text-micro text-secondary block">Pending Clearance</span>
                    </div>
                  </div>
                  </RevealSection>

                  {/* Ledger Item 3 */}
                  <RevealSection delay={500} direction="up">
                  <div className="p-4 rounded-xl bg-canvas flex items-center justify-between border border-hairline/30">
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-full bg-paper flex items-center justify-center text-primary shadow-sm">
                        <Zap size={16} className="text-electric-blue" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-caption text-caption font-semibold text-primary">
                          boAt Nirvana Ion ANC Earbuds
                        </span>
                        <span className="font-micro text-micro text-secondary">
                          Flipkart Assured Direct Node • Arbitrage Match
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-caption text-caption font-semibold text-primary">+ {formatPrice(230)}</span>
                      <span className="font-micro text-micro text-secondary block">Settled</span>
                    </div>
                  </div>
                  </RevealSection>
                </div>
              </div>
              </RevealSection>

            </div>

            {/* Right Column: Shopping Inbox & Harvested Vouchers (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Voucher Chamber Card */}
              <RevealSection delay={150} threshold={0.1}>
              <div className="bg-paper rounded-28 p-8 flex flex-col gap-6 border border-hairline/40 shadow-apple-card hover-elevate">
                <div className="flex items-center justify-between pb-3 border-b border-hairline/40">
                  <div className="flex items-center gap-2">
                    <Ticket size={18} className="text-electric-blue" />
                    <h3 className="font-subheading text-lg font-semibold text-primary">
                      Verified Voucher Vault
                    </h3>
                  </div>
                  <span className="font-micro text-micro text-secondary">
                    4 Codes Ready
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {vouchers.map((v) => (
                    <div
                      key={v.code}
                      className="p-4 rounded-xl bg-canvas flex items-center justify-between border border-hairline/30 group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <code className="font-mono font-bold text-sm text-primary">{v.code}</code>
                          <span className="px-2 py-0.5 rounded-full bg-paper text-ember font-micro text-micro font-semibold shadow-sm">
                            {v.discount}
                          </span>
                        </div>
                        <span className="font-micro text-micro text-secondary block mt-1">
                          {v.store} • {v.successRate} success rate
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(v.code)}
                        className="px-3 py-1.5 rounded-full bg-paper hover:bg-surface-variant transition-colors text-primary font-caption text-xs font-medium shadow-sm flex items-center gap-1 cursor-pointer"
                      >
                        {copiedCode === v.code ? (
                          <>
                            <Check size={12} className="text-electric-blue" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              </RevealSection>

              {/* Shopping Inbox Alerts Card */}
              <RevealSection delay={250} threshold={0.1}>
              <div className="bg-paper rounded-28 p-8 flex flex-col gap-6 border border-hairline/40 shadow-apple-card hover-elevate">
                <div className="flex items-center justify-between pb-3 border-b border-hairline/40">
                  <h3 className="font-subheading text-lg font-semibold text-primary">
                    Autonomous Price Alerts
                  </h3>
                  <span className="font-micro text-micro text-secondary">Active Feeds</span>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="p-4 rounded-xl bg-canvas border border-hairline/30 flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-ember mt-1.5 shrink-0"></span>
                    <div className="flex flex-col">
                      <span className="font-caption text-caption font-semibold text-primary">
                        Voltas 1.5T Inverter AC Price Drop Triggered
                      </span>
                      <span className="font-micro text-micro text-secondary mt-0.5">
                        Target floor {formatPrice(37990)} met on Croma ({formatPrice(36490)} flash deal).
                      </span>
                      <span className="font-micro text-micro text-electric-blue mt-1">12 minutes ago</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-canvas border border-hairline/30 flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-electric-blue mt-1.5 shrink-0"></span>
                    <div className="flex flex-col">
                      <span className="font-caption text-caption font-semibold text-primary">
                        Sony WH-1000XM5 Parity Alert
                      </span>
                      <span className="font-micro text-micro text-secondary mt-0.5">
                        Amazon India and Reliance Digital matching at {formatPrice(26990)} (-15% spread).
                      </span>
                      <span className="font-micro text-micro text-electric-blue mt-1">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
              </RevealSection>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
