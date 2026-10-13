import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Flame, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Bot, 
  Paperclip, 
  ArrowUpRight, 
  ChevronRight, 
  BarChart2, 
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { RevealSection, KineticTypography } from '../components/common/MotionComponents';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/formatters';

export const CommunityPage = () => {
  const { products, showToast } = useApp();
  const { currentUser } = useAuth();

  const [activeChannel, setActiveChannel] = useState('#all-flagships');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Elena Vance',
      initials: 'EV',
      badge: 'Verified Buyer',
      score: '98 Truth Score',
      time: '2m ago',
      content: `Just routed the iPhone 16 Pro at ${formatPrice(119900)} through Amazon India price match. The 5x telephoto optical clarity in low light is astounding compared to my previous phone.`,
      productSnippet: {
        title: 'Apple iPhone 16 Pro 128GB',
        price: `Floor: ${formatPrice(119900)}`,
        delta: `(-${formatPrice(10000)})`,
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZjpi6RnQIcalbRnMuAahkwcBNbsoSNKbCnHqwYCOJQ-i09tQlBTLAbc8t-4An27MdsywWdE-yunO5Wp8ZSLHLLdFLJ38yJP2kD1EDo0MRMKBlBwEJWaKKN4h9a0jX9NOP9LB70iTwkWmoKAlWf_vylPuy77HZ3zdxtvi5dOQXNPC20I5vLNgPErEzfpBXNrqxb9KAaUbN2stqmRkkRVhfs3a1atc1HeAARCOiHBBvcNBHRw4NTgeo',
        link: '/product/apple-iphone-16-pro'
      }
    },
    {
      id: 2,
      sender: 'Marcus K.',
      initials: 'MK',
      badge: 'Benchmark Engineer',
      score: null,
      time: '8m ago',
      content: 'Geekbench 6 single-core compute holds 3,420 pts on A18 Pro after 30 min stress run. The thermals are stabilized under iOS 18, no aggressive throttling observed in Delhi ambient temps.',
      benchmarks: {
        single: '3,420',
        multi: '8,510',
        deltaTemp: '+3.8°C sustained'
      }
    },
    {
      id: 3,
      sender: 'David Chen',
      initials: 'DC',
      badge: 'Arbitrage Hunter',
      score: null,
      time: '14m ago',
      content: `Has anyone tested the HDFC1500 card offer on Amazon India? Worked on checkout session, knocked floor to ${formatPrice(118400)} with +${formatPrice(1184)} cashback instantly logged!`
    },
    {
      id: 4,
      isBot: true,
      sender: 'Flash AI Telemetry Core',
      badge: 'Autonomous',
      time: 'Just now',
      content: `Verified 48-store parity check: Sony WH-1000XM5 all-time floor ${formatPrice(26990)} confirmed. Stock remaining: 18 units at Amazon India Node 2. Parity drift likelihood: High (89% probability of price recovery within 45 minutes).`
    }
  ]);

  const channels = [
    '#all-flagships',
    '#deals-arbitrage',
    '#apple-silicon',
    '#anc-acoustics',
    '#gpu-benchmarks',
    '#cashback-proofs'
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: currentUser?.name || 'Alex Thorne (You)',
      initials: currentUser?.name?.slice(0, 2).toUpperCase() || 'AT',
      badge: 'Tier 1 Verified',
      score: '100 Truth Score',
      time: 'Just now',
      content: inputText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    showToast('Intel Submitted', 'Your report has been broadcast to 4,892 live researchers.', 'success');

    // Simulated quick confirmation from Telemetry Core
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          isBot: true,
          sender: 'Flash AI Telemetry Core',
          badge: 'Autonomous Consensus',
          time: 'Just now',
          content: 'Telemetry verification node acknowledged report. Price oracle updated across network.'
        }
      ]);
    }, 1800);
  };

  return (
    <div className="w-full bg-surface">
      {/* 1. Monumental Hero Band (Cathedral of White Space) */}
      <section className="w-full bg-paper pt-12 pb-10 border-b border-hairline/60">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center">
          
          {/* Ember Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ember/10 text-ember font-micro text-micro uppercase tracking-widest font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-ember animate-ping"></span>
            <span>4,892 HARDWARE ARBITRAGEURS ONLINE • ZERO SPONSORED BIAS</span>
          </div>

          {/* Monumental Headline */}
          <KineticTypography 
            text="Collective Intelligence. Real-Time Telemetry."
            className="text-4xl sm:text-6xl font-extrabold text-primary tracking-tight max-w-4xl mb-4"
            delay={100}
          />

          <RevealSection delay={200} direction="up">
          <p className="font-body text-body sm:text-xl text-secondary max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Real-time discussion with verified hardware owners, deal hunters, and metrology benchmarkers.
          </p>
          </RevealSection>

          {/* Pill-Shaped Channel Switcher (Segmented Control) */}
          <div className="inline-flex p-1 rounded-full bg-canvas gap-1 overflow-x-auto max-w-full no-scrollbar shadow-inner" role="tablist">
            {channels.map(channel => (
              <button
                key={channel}
                type="button"
                onClick={() => setActiveChannel(channel)}
                className={`px-4 py-2 rounded-full font-caption text-caption font-medium whitespace-nowrap transition-all ${
                  activeChannel === channel
                    ? 'bg-electric-blue text-white shadow-sm'
                    : 'text-secondary hover:text-primary hover:bg-paper'
                }`}
              >
                {channel}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Community Intelligence Workspace (Canvas Band) */}
      <section className="w-full bg-canvas py-10 sm:py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <RevealSection delay={100} threshold={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Stream: Chat & Intel Feed (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              
              {/* Pinned Deal Alert Bar */}
              <div className="bg-paper p-4 rounded-2xl flex items-center justify-between gap-4 shadow-sm border border-hairline/60">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-ember/10 flex items-center justify-center shrink-0 text-ember">
                    <Flame size={20} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-micro text-micro uppercase tracking-wider text-ember font-semibold">Live Arbitrage Drop</span>
                      <span className="w-1 h-1 rounded-full bg-secondary"></span>
                      <span className="font-micro text-micro text-secondary">Verified by 14 users</span>
                    </div>
                    <div className="font-caption text-caption sm:text-sm text-primary font-semibold truncate">
                      Sony WH-1000XM5 hit {formatPrice(26990)} at Amazon India (All-time low)
                    </div>
                  </div>
                </div>
                <Link
                  to="/product/sony-wh-1000xm5"
                  className="shrink-0 px-4 py-1.5 rounded-full bg-canvas hover:bg-surface-variant text-primary font-caption text-caption font-semibold transition-colors"
                >
                  Claim Arbitrage
                </Link>
              </div>

              {/* Main Message Stream Card */}
              <div className="bg-paper rounded-[28px] p-6 sm:p-8 flex flex-col gap-6 shadow-sm border border-hairline/60">
                <div className="flex items-center justify-between pb-3 border-b border-hairline/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-caption text-caption font-semibold text-primary">{activeChannel}</span>
                    <span className="font-micro text-micro text-secondary">Stream Active</span>
                  </div>
                  <span className="font-micro text-micro text-secondary font-mono">Channel Latency: 42ms</span>
                </div>

                {/* Messages List */}
                <div className="flex flex-col gap-6">
                  {messages.map(msg => (
                    msg.isBot ? (
                      <article key={msg.id} className="relative p-4 rounded-2xl bg-canvas border border-electric-blue/20">
                        <div className="absolute left-0 top-3 bottom-3 w-1 bg-electric-blue rounded-r-full"></div>
                        <div className="flex items-start gap-3 pl-2">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                            <Bot size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-caption text-caption font-semibold text-primary">{msg.sender}</span>
                              <span className="px-2 py-0.5 rounded-full bg-electric-blue text-white font-micro text-micro uppercase tracking-wider font-semibold">
                                {msg.badge}
                              </span>
                              <span className="font-micro text-micro text-secondary ml-auto">{msg.time}</span>
                            </div>
                            <p className="font-body-sm text-body-sm text-primary leading-relaxed">
                              {msg.content}
                            </p>
                          </div>
                        </div>
                      </article>
                    ) : (
                      <article key={msg.id} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-canvas flex items-center justify-center shrink-0 text-primary font-caption font-bold shadow-inner">
                          {msg.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-caption text-caption font-semibold text-primary">{msg.sender}</span>
                            {msg.badge && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-canvas text-secondary font-micro text-micro font-medium">
                                <CheckCircle2 size={12} className="text-electric-blue" />
                                {msg.badge}
                              </span>
                            )}
                            {msg.score && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-electric-blue/10 text-electric-blue font-micro text-micro font-semibold">
                                {msg.score}
                              </span>
                            )}
                            <span className="font-micro text-micro text-secondary ml-auto">{msg.time}</span>
                          </div>
                          
                          <p className="font-body-sm text-body-sm text-primary leading-relaxed mb-3">
                            {msg.content}
                          </p>

                          {/* Embedded Hardware Specimen */}
                          {msg.productSnippet && (
                            <div className="bg-canvas rounded-2xl p-3 flex items-center justify-between gap-4 max-w-md border border-hairline/60">
                              <div className="flex items-center gap-3">
                                <img
                                  src={msg.productSnippet.img}
                                  alt={msg.productSnippet.title}
                                  className="w-12 h-12 rounded-xl object-cover bg-paper border border-hairline/60"
                                />
                                <div>
                                  <div className="font-caption text-caption font-semibold text-primary">{msg.productSnippet.title}</div>
                                  <div className="font-micro text-micro text-secondary">
                                    {msg.productSnippet.price} <span className="text-electric-blue font-semibold">{msg.productSnippet.delta}</span>
                                  </div>
                                </div>
                              </div>
                              <Link
                                to={msg.productSnippet.link}
                                className="px-3 py-1 rounded-full bg-paper hover:bg-surface-variant text-primary font-micro text-micro font-semibold transition-colors shadow-sm"
                              >
                                Dossier
                              </Link>
                            </div>
                          )}

                          {/* Benchmark Telemetry Gauges */}
                          {msg.benchmarks && (
                            <div className="inline-flex flex-wrap items-center gap-4 p-2.5 rounded-xl bg-canvas border border-hairline/60">
                              <div className="flex items-center gap-1.5">
                                <span className="font-micro text-micro text-secondary">S-Core:</span>
                                <span className="font-micro text-micro font-semibold text-primary">{msg.benchmarks.single}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-micro text-micro text-secondary">M-Core:</span>
                                <span className="font-micro text-micro font-semibold text-primary">{msg.benchmarks.multi}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-micro text-micro text-secondary">Thermals:</span>
                                <span className="font-micro text-micro font-semibold text-electric-blue">{msg.benchmarks.deltaTemp}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </article>
                    )
                  ))}
                </div>

                {/* Input Dock */}
                <div className="pt-4 mt-2 border-t border-hairline/60">
                  <form onSubmit={handleSendMessage} className="bg-canvas p-1.5 rounded-full flex items-center gap-2 border border-hairline">
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full bg-paper hover:bg-surface-variant flex items-center justify-center text-secondary transition-colors"
                      title="Attach Metrology Specimen"
                      onClick={() => showToast('Specimen Picker', 'Attach die shot or benchmark log', 'info')}
                    >
                      <Paperclip size={16} />
                    </button>
                    
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Share hardware insights, coupon codes, or die benchmark telemetry..."
                      className="flex-1 bg-transparent px-3 py-2 font-body-sm text-body-sm text-primary placeholder:text-secondary focus:outline-none"
                    />

                    <button
                      type="submit"
                      className="px-5 py-2 rounded-full bg-electric-blue hover:bg-link-blue text-white font-caption text-caption font-semibold transition-all flex items-center gap-1 shadow-sm"
                    >
                      <span>Send Intel</span>
                      <ArrowUpRight size={15} />
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Right Sidebar: Consensus & Arbitrage Radar (4 Cols) */}
            <aside className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Hardware Consensus Gauges */}
              <div className="bg-paper rounded-[28px] p-6 shadow-sm border border-hairline/60">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-caption text-caption font-semibold text-primary uppercase tracking-wider">
                    Hardware Consensus Radar
                  </div>
                  <BarChart2 size={16} className="text-secondary" />
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between font-caption text-caption mb-1">
                      <span className="text-primary font-medium">iPhone 15 Pro Max</span>
                      <span className="font-semibold text-electric-blue">94% Positive</span>
                    </div>
                    <div className="w-full bg-canvas h-2 rounded-full overflow-hidden">
                      <div className="bg-electric-blue h-full rounded-full" style={{ width: '94%' }}></div>
                    </div>
                    <div className="flex justify-between font-micro text-micro text-secondary mt-1">
                      <span>Thermal Fix Stability</span>
                      <span>1.4k signals</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-caption text-caption mb-1">
                      <span className="text-primary font-medium">Sony WH-1000XM5</span>
                      <span className="font-semibold text-electric-blue">97% Positive</span>
                    </div>
                    <div className="w-full bg-canvas h-2 rounded-full overflow-hidden">
                      <div className="bg-electric-blue h-full rounded-full" style={{ width: '97%' }}></div>
                    </div>
                    <div className="flex justify-between font-micro text-micro text-secondary mt-1">
                      <span>ANC Comfort Vector</span>
                      <span>892 signals</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-caption text-caption mb-1">
                      <span className="text-primary font-medium">PlayStation 5 Slim</span>
                      <span className="font-semibold text-electric-blue">92% Positive</span>
                    </div>
                    <div className="w-full bg-canvas h-2 rounded-full overflow-hidden">
                      <div className="bg-electric-blue h-full rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <div className="flex justify-between font-micro text-micro text-secondary mt-1">
                      <span>Footprint &amp; Decibels</span>
                      <span>564 signals</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Arbitrage Mini Cards */}
              <div className="bg-paper rounded-[28px] p-6 shadow-sm border border-hairline/60">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-caption text-caption font-semibold text-primary uppercase tracking-wider">
                    Live Arbitrage Deals
                  </div>
                  <span className="font-micro text-micro text-electric-blue font-semibold">Active Feeds</span>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-canvas transition-colors">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD62jcc4M8-otsnOwjppx75pSTOz7mUE-upiU17WhAtAvhRN2AX68zjtmYf7K3T570lwMB2p_08TsixyBBiD6ckVOeoZVA1h0WNUZ_UPdcoNGVVHpLVTKdl4P8_kdR6lxl94r69IYTLwXoHEMnxddDMnJ7T3oqA2u4gi18G5jkkl0uKUQuBYyHETq-cl6MtkFvhcNJsngkrsKtsCaKo0JZV_64pPLRaBgunA-J5xXIM_LKxMVXQq-iI"
                      alt="Sony WH-1000XM5"
                      className="w-12 h-12 rounded-xl object-cover bg-canvas shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-caption text-caption font-semibold text-primary truncate">Sony WH-1000XM5</div>
                      <div className="font-micro text-micro text-secondary">{formatPrice(26990)} <span className="line-through opacity-60">{formatPrice(34990)}</span></div>
                      <Link to="/product/sony-wh-1000xm5" className="font-micro text-micro text-electric-blue hover:underline font-medium inline-flex items-center gap-0.5 mt-0.5">
                        Inspect Dossier <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-canvas transition-colors">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPC2oBeTmle3G8DUDerxIoCKVSiUE54Is_q5AzyyizHK-w1pWLzNXKHnbNOm_VMXfXCdxSoLxPfNveLczH53wDSvNwTK_DU7t1VmsT3gfwJ7tKx99xmC_Ep0RzlucbWJBZmX_kuuCGR2xQ7PKcN9KJaMzJn07Y7JxMMcQNVUjuKkCSzhVtxdAQgpJ7roMz-2IIehbrbcdWkY2jdHoCNMHGQ-YDSqWCFn4gMLoi2NoIIZ_b2UIus8od"
                      alt="MacBook Pro"
                      className="w-12 h-12 rounded-xl object-cover bg-canvas shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-caption text-caption font-semibold text-primary truncate">MacBook Pro 14" M3 Pro</div>
                      <div className="font-micro text-micro text-secondary">{formatPrice(169900)} <span className="text-ember font-medium">-{formatPrice(30000)}</span></div>
                      <Link to="/product/macbook-pro-14-m3" className="font-micro text-micro text-electric-blue hover:underline font-medium inline-flex items-center gap-0.5 mt-0.5">
                        Inspect Dossier <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-canvas transition-colors">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn-dnihAR-iadbUTNYWD50Q15grSgiaMDzPwZOF3yuQWbeffXbMghIG7dkVAu1sIB2ieTe3PZoIRAEWpFr2efXA0sGeCp_5dZ0bsb9j4XkNYAXfhmtMoUuEp5K1jYozxIMEdBwlKlOxQLc5hz-YwplaTEdco2tq562Cjh0deyVrTWT9egVDIcQsEaNvGyELxVFqb6J8bsBXeemv9bCSDV2Iju9LkI8wtvPnEafpu0pC0DjcBJbpzsL"
                      alt="PS5 Slim"
                      className="w-12 h-12 rounded-xl object-cover bg-canvas shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-caption text-caption font-semibold text-primary truncate">PlayStation 5 Slim</div>
                      <div className="font-micro text-micro text-secondary">{formatPrice(44990)} <span className="text-electric-blue font-medium">+{formatPrice(1500)} Back</span></div>
                      <Link to="/product/playstation-5-slim" className="font-micro text-micro text-electric-blue hover:underline font-medium inline-flex items-center gap-0.5 mt-0.5">
                        Inspect Dossier <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Scouts Consensus Leaderboard */}
              <div className="bg-paper rounded-[28px] p-6 shadow-sm border border-hairline/60">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-caption text-caption font-semibold text-primary uppercase tracking-wider">
                    Top Deal Scouts
                  </div>
                  <Sparkles size={16} className="text-ember" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-caption">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-secondary text-xs">01</span>
                      <span className="font-semibold text-primary">krypton_die_master</span>
                    </div>
                    <span className="font-mono text-electric-blue font-semibold">+142 Drops</span>
                  </div>
                  <div className="flex items-center justify-between text-caption">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-secondary text-xs">02</span>
                      <span className="font-semibold text-primary">vector_cache_99</span>
                    </div>
                    <span className="font-mono text-electric-blue font-semibold">+98 Drops</span>
                  </div>
                  <div className="flex items-center justify-between text-caption">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-secondary text-xs">03</span>
                      <span className="font-semibold text-primary">Elena Vance</span>
                    </div>
                    <span className="font-mono text-electric-blue font-semibold">+76 Drops</span>
                  </div>
                </div>
              </div>

            </aside>

          </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
};
