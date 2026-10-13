import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Flame, 
  Timer, 
  DollarSign, 
  Award, 
  Check, 
  Microscope,
  RotateCcw
} from 'lucide-react';

export const QuizPage = () => {
  const navigate = useNavigate();
  const { wallet } = useWallet();
  const { showToast } = useApp();

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(3); // Question 4 (0-indexed)
  const [selectedOption, setSelectedOption] = useState(0); // Option A
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [sessionScore, setSessionScore] = useState(4);
  const [sessionYield, setSessionYield] = useState(4.00);
  const [streakCount, setStreakCount] = useState(4);

  const questionsList = [
    {
      qNum: '01 / 10',
      category: 'Display & Lumens Metrology',
      title: 'Which sub-pixel matrix layout eliminates chromatic fringing in high-ambient sunlight?',
      options: [
        'Diamond PenTile with sub-pixel anti-aliasing',
        'Traditional RGB stripe configuration',
        'Delta E-RGB array with white boost sub-pixel',
        'Dual-layer micro-lens optical prism'
      ],
      correct: 0,
      dieImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxQp15HRvKRVqlV8CHuqc1PGddqbrD0rkZ0-OJCMNpDte7nw7VGS1r9a8R605WqisLfdIRvZRYMQ_QnWXFTR1k5-p86zZA5bjr5DCZrdRrcLWLMsKwNvJJ-Th_ZX0bDupDthCwTph_-Bjw11OlovCDuK0XwnLkbVAMKsrqQvDHka2RNrBjWg3umA9CvwfTJw4gpTnV5i1i5AOHi_Sa-KedxTYv4WEYSYBArp25wClXwOdeKynCL_Dr',
      dieLabel: 'OLED SUB-PIXEL ARRAY',
      rationale: 'Diamond PenTile maximizes green emitter area while shrinking blue emitters, maintaining 2,000 nits peak luminance without thermal burn-in.',
      metricText: 'Luminance Uniformity',
      metricVal: '99.4% Verified'
    },
    {
      qNum: '02 / 10',
      category: 'Acoustic Architecture',
      title: 'How does the Sony WH-1000XM5 Auto NC Optimizer adjust feed-forward noise cancellation?',
      options: [
        'Frequency band suppression via 8 external beamforming mics',
        'Dual-chip real-time barometric and atmospheric pressure calibration',
        'Pre-recorded sound profile matching via DSP lookup table',
        'Phase-inversion filter locked to 1kHz static baseline'
      ],
      correct: 1,
      dieImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9l5rPskQyQIUGhp9tkNVfcyE8XVkdjEcPUmSZe0_5ok1YHpaExV4pc9ED-1MmHFgwAVnNoHPQ4RX3jXLVlht8C4BwoiIsmJ5Z6gZe0kmqg1ODesp5sD3bXHtEtVioiF44BTxNuMSzDoPp-Hvd0SEbXoVrMBzeE4RCuAqizX5wV9Ss7Mm0pnJm5Zw5pZKLG0TefZoZ2YbgG8nUTASjmIwPasJC0n2J8i427QP89bB9ForOJOLsI-z3',
      dieLabel: 'QN1 + V1 DUAL PROCESSOR',
      rationale: 'Integrated V1 processor continuously samples atmospheric and environmental wearing conditions, adjusting ANC phase cancellation within 0.2 milliseconds.',
      metricText: 'ANC Attenuation Depth',
      metricVal: '-38.2 dB Floor'
    },
    {
      qNum: '03 / 10',
      category: 'Thermal Dynamics',
      title: 'What material interface prevents PS5 Slim from suffering thermal junction runaway during 4K raytracing?',
      options: [
        'Galinstan liquid metal TIM between APU die and copper vapor chamber',
        'Standard silicone carbon thermal grease compound',
        'Graphene sheet matrix with ceramic heat spreader',
        'Passive vapor chamber without fluid circulation'
      ],
      correct: 0,
      dieImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkkbFeAEYvUgw-Lr46X-QsV52m-WZThfLjPo9t9S6lxmiMYVMu_G2tUmlNyPNkv5K5xvL0HvhyMUGK2kF6nJ56MVoyZB7BGY2Sc1Rrsu1g4Z36ORelVJicC6NSqjyX5GIWtXguP-k_l6Kwf2jDh41vyx6ODePOx9JmsN0x4rHNd8udW3ADGAAYSipbVqXFyvMXr30_NVx5KzwQ69GDYu3zt55RFEO38MF21_gNl9nU7Os7ug9YFj2o',
      dieLabel: 'OBERON PLUS • 6NM APU',
      rationale: 'Liquid metal thermal interface material offers 73 W/mK conductivity—substantially higher than thermal paste, maintaining sub-65°C core temperatures under continuous 210W load.',
      metricText: 'Thermal Interface Conductance',
      metricVal: '73.2 W/mK'
    },
    {
      qNum: '04 / 10',
      category: 'Silicon Architecture Challenge',
      title: 'Which architectural design allows the iPhone 15 Pro Max to achieve sustained 10Gbps USB 3.2 Gen 2 transfer rates without CPU thermal throttling?',
      options: [
        'Dedicated USB controller integrated directly into the A17 Pro SoC silicon fabric',
        'External PCIe bridge connected through the display coprocessor bus',
        'Dynamic clock boosting of the high-efficiency E-cores during DMA burst',
        'Overclocked Lightning PHY running in asynchronous differential mode'
      ],
      correct: 0,
      dieImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxQp15HRvKRVqlV8CHuqc1PGddqbrD0rkZ0-OJCMNpDte7nw7VGS1r9a8R605WqisLfdIRvZRYMQ_QnWXFTR1k5-p86zZA5bjr5DCZrdRrcLWLMsKwNvJJ-Th_ZX0bDupDthCwTph_-Bjw11OlovCDuK0XwnLkbVAMKsrqQvDHka2RNrBjWg3umA9CvwfTJw4gpTnV5i1i5AOHi_Sa-KedxTYv4WEYSYBArp25wClXwOdeKynCL_Dr',
      dieLabel: 'A17 PRO • 3NM TSMC',
      rationale: 'Unlike prior generations and external PHY bridges (e.g. Snapdragon auxiliary controllers), the A17 Pro integrates the USB 3.2 Gen 2 controller directly on-die. This architectural leap reduces package power dissipation by 2.1W and prevents bus arbitration bottlenecks, sustaining unimpeded 10Gbps Apple ProRes log direct capture to external NVMe storage arrays.',
      metricText: 'Power Dissipation Reduction',
      metricVal: '-2.1W (-38%)'
    },
    {
      qNum: '05 / 10',
      category: 'Silicon Thermodynamics',
      title: 'At what die temperature does TSMC N3B node trigger thermal clock throttling on high-performance cores?',
      options: [
        '105°C junction temperature (TjMax)',
        '85°C surface casing threshold',
        '95°C silicon die thermal governor',
        '115°C critical shutdown limit'
      ],
      correct: 2,
      dieImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxQp15HRvKRVqlV8CHuqc1PGddqbrD0rkZ0-OJCMNpDte7nw7VGS1r9a8R605WqisLfdIRvZRYMQ_QnWXFTR1k5-p86zZA5bjr5DCZrdRrcLWLMsKwNvJJ-Th_ZX0bDupDthCwTph_-Bjw11OlovCDuK0XwnLkbVAMKsrqQvDHka2RNrBjWg3umA9CvwfTJw4gpTnV5i1i5AOHi_Sa-KedxTYv4WEYSYBArp25wClXwOdeKynCL_Dr',
      dieLabel: 'TSMC N3B DYNAMIC GOVERNOR',
      rationale: 'The internal power management IC modulates frequency when junction sensors reach 95°C, ensuring voltage stability without transient droop.',
      metricText: 'Thermal Governor Threshold',
      metricVal: '95.0°C Core'
    }
  ];

  const currentQ = questionsList[currentQuestionIdx] || questionsList[3];

  const handleSelectOption = (idx) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
    setIsSubmitted(true);

    if (idx === currentQ.correct) {
      setSessionScore(s => s + 1);
      setSessionYield(y => y + 1.00);
      setStreakCount(s => s + 1);
      showToast('+$1.00 Dispatched', 'Truth verified! Reward credited to your FedNow balance.', 'success');
    } else {
      setStreakCount(0);
      showToast('Metrology Variance', 'Selected option did not match silicon die benchmark.', 'error');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < questionsList.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      showToast('Session Complete', 'All 10 questions completed with full cryptographic validation.', 'success');
      setCurrentQuestionIdx(0);
      setSelectedOption(0);
      setIsSubmitted(true);
    }
  };

  const walletTotal = (wallet?.balance || 5.00) + (sessionYield > 0 ? 1.00 : 0);

  return (
    <div className="w-full bg-paper min-h-screen text-primary antialiased selection:bg-electric-blue selection:text-paper pt-11">
      
      {/* =========================================================================
          SECTION 1: MONUMENTAL STAGE HERO (Cathedral of White Space)
          ========================================================================= */}
      <section className="w-full bg-paper pt-16 pb-14 md:pt-24 md:pb-20 border-b border-hairline/40 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center">
          
          {/* Eyebrow Ribbon */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-canvas text-ember font-micro text-micro font-medium tracking-wide uppercase">
            <span className="inline-block w-2 h-2 rounded-full bg-ember animate-pulse"></span>
            <span>Question {currentQ.qNum} • Truth Verified (+ $1.00 USD Dispatched)</span>
          </div>

          {/* Massive Display Headline */}
          <h1 className="mt-6 text-primary font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight max-w-[1040px] font-bold leading-none">
            Truth Confirmed.<br className="hidden sm:inline" /> Reward Escrowed.
          </h1>

          {/* Elegant Subheading with generous breathability */}
          <p className="mt-6 text-secondary font-body text-base sm:text-xl max-w-[820px] leading-relaxed">
            Hardware metrology matches silicon die analysis. +$1.00 instant cashback has been credited to your FedNow clearing ledger.
          </p>

          {/* Atmospheric Data Metric Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-deep-gray font-caption text-caption">
            <div className="px-4 py-1.5 rounded-full bg-canvas flex items-center gap-1.5 shadow-sm border border-hairline/30">
              <CheckCircle2 size={16} className="text-electric-blue" />
              <span>Silicon Accuracy: 100%</span>
            </div>
            <div className="px-4 py-1.5 rounded-full bg-canvas flex items-center gap-1.5 shadow-sm border border-hairline/30">
              <Zap size={16} className="text-primary fill-current" />
              <span>FedNow Latency: 142ms</span>
            </div>
            <div className="px-4 py-1.5 rounded-full bg-canvas flex items-center gap-1.5 shadow-sm border border-hairline/30">
              <Terminal size={16} className="text-secondary" />
              <span className="font-mono text-xs">Proof Hash: 0x8f2a...c419</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: THE VERIFICATION ARENA CORE (Subtle Cool Wash Surface)
          ========================================================================= */}
      <section className="w-full bg-canvas py-16 md:py-24 border-b border-hairline/40">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-8">
          
          {/* Quiz Stage Card (White elevated slab, 28px border radius, borderless geometry) */}
          <div className="w-full bg-paper rounded-28 p-6 sm:p-10 flex flex-col gap-8 border border-hairline/40 shadow-apple-card">
            
            {/* Header: Score & Telemetry Indicator */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-hairline/30">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-electric-blue/10 flex items-center justify-center text-electric-blue">
                  <Check size={16} className="stroke-[3]" />
                </span>
                <span className="font-subheading text-sm font-semibold text-primary">
                  Score: {sessionScore} / {currentQuestionIdx + 1} Correct (100% Truth Parity)
                </span>
              </div>

              {/* Progress Segment Bar (10 segments) */}
              <div className="flex items-center gap-2">
                <span className="font-micro text-micro text-secondary font-medium">
                  Progress {currentQuestionIdx + 1} / 10
                </span>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(step => (
                    <div
                      key={step}
                      className={`w-6 h-1.5 rounded-full transition-colors ${
                        step <= currentQuestionIdx ? 'bg-electric-blue' : 'bg-surface-variant'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Question Title Recap */}
            <div className="flex flex-col gap-2">
              <span className="font-micro text-micro uppercase tracking-wider text-secondary font-semibold">
                {currentQ.category}
              </span>
              <h2 className="font-heading-sm text-xl sm:text-2xl lg:text-heading-sm text-primary font-bold tracking-tight leading-snug">
                {currentQ.title}
              </h2>
            </div>

            {/* Grid: Silicon Metrology Visual & Verified Answer Column */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Column A: Die Metrology Micrograph Visual (5 Cols) */}
              <div className="lg:col-span-5 rounded-28 bg-canvas overflow-hidden flex flex-col justify-between p-6 relative border border-hairline/30">
                <div className="flex items-center justify-between mb-3 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-paper text-primary font-micro text-micro font-medium uppercase tracking-tight shadow-sm">
                    Die Topology Cross-Section
                  </span>
                  <span className="font-micro text-micro text-secondary font-mono">
                    {currentQ.dieLabel}
                  </span>
                </div>

                {/* Die Micrograph Render */}
                <div className="w-full h-56 rounded-2xl overflow-hidden relative my-2 bg-paper flex items-center justify-center">
                  <img
                    className="w-full h-full object-cover"
                    src={currentQ.dieImg}
                    alt="Die Benchmark Micrograph"
                  />
                  <div className="absolute bottom-2 left-2 bg-primary/85 backdrop-blur-md px-3 py-1 rounded-full text-paper font-micro text-micro flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue"></span>
                    <span>Dedicated PHY Array Verified</span>
                  </div>
                </div>

                {/* Live SVG Micro-Chart */}
                <div className="w-full pt-3 flex flex-col gap-1.5 z-10">
                  <div className="flex items-center justify-between font-micro text-micro text-secondary">
                    <span>{currentQ.metricText}</span>
                    <span className="font-semibold text-primary">{currentQ.metricVal}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-variant overflow-hidden">
                    <div className="h-full bg-electric-blue rounded-full w-[62%]"></div>
                  </div>
                </div>
              </div>

              {/* Column B: Verified Selection & Detailed Truth Rationale (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-4">
                
                {/* Options List */}
                <div className="flex flex-col gap-2.5">
                  {currentQ.options.map((opt, idx) => {
                    const isCorrect = idx === currentQ.correct;
                    const isSelected = selectedOption === idx;

                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                          isSelected && isCorrect
                            ? 'bg-electric-blue/5 border-electric-blue shadow-sm'
                            : isSelected && !isCorrect
                            ? 'bg-ember/5 border-ember'
                            : 'bg-canvas border-hairline/30 hover:border-hairline hover:bg-surface-variant'
                        }`}
                      >
                        {isSelected && isCorrect && (
                          <div className="flex items-center justify-between">
                            <div className="inline-flex items-center gap-1.5 text-electric-blue font-micro text-micro font-semibold uppercase tracking-wider">
                              <CheckCircle2 size={14} />
                              <span>Verified Accurate • TechInsights Die Benchmark</span>
                            </div>
                            <span className="font-micro text-micro font-mono text-secondary">Latency: 0.84s</span>
                          </div>
                        )}

                        <div className="flex items-start gap-3">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-caption text-caption font-semibold shrink-0 mt-0.5 ${
                            isSelected && isCorrect 
                              ? 'bg-electric-blue text-paper' 
                              : 'bg-paper text-primary shadow-sm'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <p className="font-caption text-sm sm:text-base font-medium text-primary">
                            {opt}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Explainable Truth Rationale Box */}
                <div className="p-5 rounded-28 bg-canvas flex flex-col gap-2 border border-hairline/30">
                  <div className="flex items-center gap-1.5 text-primary font-caption text-caption font-semibold">
                    <Zap size={16} className="text-electric-blue fill-electric-blue" />
                    <span>Silicon Truth Verification Protocol</span>
                  </div>
                  <p className="font-body-sm text-xs sm:text-sm text-secondary leading-relaxed">
                    {currentQ.rationale}
                  </p>
                </div>

                {/* Ledger Dispatched Pill Strip */}
                <div className="p-4 rounded-28 bg-canvas flex flex-col sm:flex-row items-center justify-between gap-3 border border-hairline/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-paper flex items-center justify-center text-primary shrink-0 shadow-sm">
                      <DollarSign size={20} className="text-electric-blue" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-caption text-caption font-semibold text-primary">
                        +$1.00 Instant Cash Rebate Credited
                      </span>
                      <span className="font-micro text-micro text-secondary">
                        Dispatched via Federal Reserve FedNow Instant Rail
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="font-caption text-caption font-mono font-semibold text-electric-blue">
                      ${walletTotal.toFixed(2)} Active Balance
                    </span>
                    <span className="font-micro text-micro font-mono text-secondary">
                      Settlement ID: 0x8f2a...c419
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Navigation Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-hairline/30">
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-transparent hover:bg-canvas text-primary font-caption text-caption font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => showToast('Metrology Proof', 'TSMC N3E 3nm wafer transmission scan verified via TEM analysis.', 'info')}
              >
                <Microscope size={16} className="text-secondary" />
                <span>Inspect Metrology Proof</span>
              </button>

              <button
                type="button"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-electric-blue hover:opacity-95 text-paper font-body-sm text-body-sm font-semibold tracking-tight transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                onClick={handleNextQuestion}
              >
                <span>Next Question: Silicon Thermodynamics (05/10)</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: LIVE LEDGER & LEADERBOARD MOMENTUM BAND
          ========================================================================= */}
      <section className="w-full bg-paper py-16 md:py-24 border-b border-hairline/40">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-10">
          
          {/* Section Overline */}
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="font-micro text-micro uppercase tracking-widest text-secondary font-semibold">
              Telemetry &amp; Global Consensus
            </span>
            <h3 className="font-heading-sm text-2xl md:text-heading-sm text-primary font-bold">
              Live Quiz Session Telemetry
            </h3>
          </div>

          {/* Bento Grid: 3 Metric Modules + Live Leaderboard Snippet */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Metric 1: Streak Multiplier Active */}
            <div className="md:col-span-4 bg-canvas rounded-28 p-6 flex flex-col justify-between border border-hairline/30">
              <div className="flex items-center justify-between">
                <span className="font-caption text-caption text-secondary font-medium">Session Multiplier</span>
                <span className="w-8 h-8 rounded-full bg-paper flex items-center justify-center text-ember shadow-sm">
                  <Flame size={18} />
                </span>
              </div>
              <div className="my-4">
                <div className="font-heading-sm text-2xl font-bold text-primary tracking-tight">
                  {streakCount}x Streak
                </div>
                <p className="font-caption text-caption text-secondary mt-1">
                  +$0.50 consecutive accuracy booster attached to question 5.
                </p>
              </div>
              <div className="font-micro text-micro text-secondary font-mono">Bonus Status: Armed &amp; Locked</div>
            </div>

            {/* Metric 2: Metrological Latency Bonus */}
            <div className="md:col-span-4 bg-canvas rounded-28 p-6 flex flex-col justify-between border border-hairline/30">
              <div className="flex items-center justify-between">
                <span className="font-caption text-caption text-secondary font-medium">Decision Velocity</span>
                <span className="w-8 h-8 rounded-full bg-paper flex items-center justify-center text-electric-blue shadow-sm">
                  <Timer size={18} />
                </span>
              </div>
              <div className="my-4">
                <div className="font-heading-sm text-2xl font-bold text-primary tracking-tight">+14s Edge</div>
                <p className="font-caption text-caption text-secondary mt-1">
                  Average verification duration 0.9s (Top 2% algorithmic pace).
                </p>
              </div>
              <div className="font-micro text-micro text-secondary font-mono">Clock Efficiency: 98.4%</div>
            </div>

            {/* Metric 3: Cashback Wallet Accrual */}
            <div className="md:col-span-4 bg-canvas rounded-28 p-6 flex flex-col justify-between border border-hairline/30">
              <div className="flex items-center justify-between">
                <span className="font-caption text-caption text-secondary font-medium">Total Session Yield</span>
                <span className="w-8 h-8 rounded-full bg-paper flex items-center justify-center text-primary shadow-sm">
                  <DollarSign size={18} />
                </span>
              </div>
              <div className="my-4">
                <div className="font-heading-sm text-2xl font-bold text-primary tracking-tight">
                  ${sessionYield.toFixed(2)} Earned
                </div>
                <p className="font-caption text-caption text-secondary mt-1">
                  Target potential: $10.00 base + $3.00 pristine accuracy bounty.
                </p>
              </div>
              <div className="font-micro text-micro text-secondary font-mono">Routing: Direct Escrow Deposit</div>
            </div>

            {/* Full-Width Live Leaderboard Momentum Snippet (12 cols) */}
            <div className="md:col-span-12 bg-canvas rounded-28 p-6 sm:p-8 flex flex-col gap-4 border border-hairline/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                <div>
                  <h4 className="font-subheading text-base font-semibold text-primary">
                    Hardware IQ Leaderboard • Daily Global Cohort
                  </h4>
                  <p className="font-micro text-micro text-secondary">
                    Real-time ranking of authenticated hardware engineers and consumer researchers
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper text-primary font-micro text-micro font-medium shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-electric-blue animate-ping"></span>
                  <span>Live Re-indexing</span>
                </div>
              </div>

              {/* Leaderboard Rows */}
              <div className="flex flex-col gap-2">
                {/* Rank 13 */}
                <div className="bg-paper rounded-2xl px-5 py-3 flex items-center justify-between shadow-sm border border-hairline/20">
                  <div className="flex items-center gap-4">
                    <span className="font-caption text-caption font-mono text-secondary w-6">13</span>
                    <div className="flex flex-col">
                      <span className="font-caption text-caption font-semibold text-primary">krypton_die_master</span>
                      <span className="font-micro text-micro text-secondary">TSMC N3E Specialist</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-caption text-caption font-mono text-secondary hidden sm:inline">10/10 Correct</span>
                    <span className="font-caption text-caption font-mono font-semibold text-primary">$13.50 Won</span>
                  </div>
                </div>

                {/* Rank 14 (Current User - Highlighted in soft Electric Blue) */}
                <div className="bg-electric-blue/10 rounded-2xl px-5 py-3 flex items-center justify-between border border-electric-blue/20">
                  <div className="flex items-center gap-4">
                    <span className="font-caption text-caption font-mono font-bold text-electric-blue w-6">14</span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-caption text-caption font-semibold text-primary">You (Alex Thorne)</span>
                        <span className="px-2 py-0.5 rounded-full bg-electric-blue text-paper font-micro text-micro font-medium uppercase tracking-tight">
                          Ascending
                        </span>
                      </div>
                      <span className="font-micro text-micro text-electric-blue font-medium">Surged +6 ranks this question</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-caption text-caption font-mono text-electric-blue font-semibold hidden sm:inline">
                      {sessionScore}/4 Current (100%)
                    </span>
                    <span className="font-caption text-caption font-mono font-bold text-electric-blue">
                      ${sessionYield.toFixed(2)} Total
                    </span>
                  </div>
                </div>

                {/* Rank 15 */}
                <div className="bg-paper rounded-2xl px-5 py-3 flex items-center justify-between shadow-sm border border-hairline/20">
                  <div className="flex items-center gap-4">
                    <span className="font-caption text-caption font-mono text-secondary w-6">15</span>
                    <div className="flex flex-col">
                      <span className="font-caption text-caption font-semibold text-primary">vector_cache_99</span>
                      <span className="font-micro text-micro text-secondary">Arm v9 Core Architect</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-caption text-caption font-mono text-secondary hidden sm:inline">4/5 Correct</span>
                    <span className="font-caption text-caption font-mono font-semibold text-primary">$4.00 Won</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: GALLERY PHOTO FOCUS (Editorial Breather)
          ========================================================================= */}
      <section className="w-full bg-canvas py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Architectural Image Showcase */}
          <div className="rounded-28 overflow-hidden bg-paper aspect-[4/3] relative border border-hairline/30 shadow-apple-card">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlKmHlNBXCYa8gnaOsVAKKTj_XJMdzQo5uG7jsfyNqH-W9RJUYcLnjSF4QyclFFnDSoNddzuDL6eHcB79Zx5zUGxfb-fSZ7qHWdY4pDAPQb6I7dqTidiZ0gnFTYZ34sHGTopovyYkjwVuR-a08znmKkc-92aGsXRTYkCmtX1SYo6CFjUDLGlnAZU-ezOn9iZCPJB0CeVU2dZWQJwOt-kkO08SEnOu9nct76HPwMFDXVZ8y1rfn_lRa"
              alt="Metrology Chamber 04"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-paper/90 backdrop-blur-md p-4 rounded-2xl shadow-sm">
              <div className="font-caption text-caption font-semibold text-primary">Metrology Chamber 04</div>
              <div className="font-micro text-micro text-secondary">
                Direct high-speed logic validation via calibrated automated micro-probes.
              </div>
            </div>
          </div>

          {/* Descriptive Column with Asymmetric Rhythm */}
          <div className="flex flex-col gap-4">
            <span className="font-micro text-micro uppercase tracking-widest text-secondary font-semibold">
              Decentralized Metrology
            </span>
            <h3 className="font-heading-sm text-2xl sm:text-heading-sm text-primary font-bold leading-tight">
              Rewarding consumers for precision, not marketing hype.
            </h3>
            <p className="font-body-sm text-secondary leading-relaxed">
              flashcompare.ai turns hardware specification benchmarking into an open, verifiable peer economy. By answering die-level engineering queries correctly, you validate independent teardowns and force truth back into tech retail.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex flex-col">
                <span className="font-subheading text-lg font-bold text-primary">14.8k</span>
                <span className="font-micro text-micro text-secondary">Verified Claims</span>
              </div>
              <div className="w-px h-8 bg-hairline"></div>
              <div className="flex flex-col">
                <span className="font-subheading text-lg font-bold text-primary">$182.4k</span>
                <span className="font-micro text-micro text-secondary">Cash Disbursed</span>
              </div>
              <div className="w-px h-8 bg-hairline"></div>
              <div className="flex flex-col">
                <span className="font-subheading text-lg font-bold text-primary">Zero</span>
                <span className="font-micro text-micro text-secondary">Sponsored Biases</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
