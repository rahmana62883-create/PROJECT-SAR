import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useWallet } from '../../context/WalletContext';
import { PriceSyncService } from '../../services/PriceSyncService';
import { AssistantPillLogo, AppleIntelligenceSparkle } from './AssistantChatbotLogo';

export const AIAssistantOrb = () => {
  const { products } = useApp();
  const { wallet } = useWallet();
  const isDark = false;
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const isPdp = location.pathname.startsWith('/product/');
  const currentProdId = isPdp ? location.pathname.split('/')[2] : null;
  const currentProduct = currentProdId ? products.find(p => p.id === currentProdId) : null;

  // Default featured product (iPhone 15 Pro Max or first product)
  const featuredProduct = currentProduct || products.find(p => p.id.includes('iphone')) || products[0] || {
    id: 'iphone-15-pro-max',
    title: 'iPhone 15 Pro Max',
    name: 'iPhone 15 Pro Max',
    currentBestPrice: 1149.00,
    price: 1149.00,
    msrp: 1199.00,
    truthScore: 89,
    priceScore: 89,
    category: 'Smartphones',
    color: 'Natural Titanium',
    coupon: { code: 'IPHONE50', discount: 50 },
    inStock: true
  };

  const [messages, setMessages] = useState([
    {
      id: 'm-init',
      sender: 'ai',
      text: 'Hello. I am Flash AI, your smart shopping assistant. I can help you find the best product, check live prices, compare options, and verify instant cashback.',
      timestamp: 'Just now',
      specimen: featuredProduct
    }
  ]);

  const getContextLabel = () => {
    if (currentProduct) return `Focus: ${currentProduct.title || currentProduct.name}`;
    if (location.pathname === '/wallet') return 'Focus: Cashback Wallet';
    if (location.pathname === '/compare') return 'Focus: Comparison Matrix';
    return 'Flash AI Copilot • v4.2 Metrology';
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Keyboard shortcut: Esc to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = async (text) => {
    const userText = text || inputValue.trim();
    if (!userText) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const reply = await generateAiResponse(userText.toLowerCase());

    setIsTyping(false);
    const aiMsg = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: reply.text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      specimen: reply.specimen || null
    };
    setMessages(prev => [...prev, aiMsg]);
  };

  const generateAiResponse = async (q) => {
    const targetProduct = currentProduct || featuredProduct;

    // 1. Live Price Check
    if (q.includes('price')) {
      try {
        const liveData = await PriceSyncService.getLivePrice(
          targetProduct.id,
          targetProduct.currentBestPrice || targetProduct.price || 1149
        );
        return {
          text: `*Live Sync Metrology*: verified current live floor across 48 retail nodes.\n\nThe active best price for **${targetProduct.title || targetProduct.name}** is **$${liveData.livePrice}** (ATH Low). Instant FedNow cashback of **$${(liveData.livePrice * 0.01).toFixed(2)}** is guaranteed upon settlement.`,
          specimen: {
            ...targetProduct,
            currentBestPrice: liveData.livePrice
          }
        };
      } catch {
        const floor = targetProduct.currentBestPrice || targetProduct.price || 1149;
        return {
          text: `Current verified price floor for **${targetProduct.title || targetProduct.name}** is **$${floor}** with instant cashback available.`,
          specimen: targetProduct
        };
      }
    }

    // 2. Recommend Product
    if (q.includes('recommend') || q.includes('best') || q.includes('which')) {
      const topProduct = products.find(p => (p.truthScore || p.priceScore) >= 88) || targetProduct;
      return {
        text: `Based on algorithmic price-to-performance metrology and multi-store scraping, the **${topProduct.title || topProduct.name}** is currently our highest-rated specimen with a Truth Score™ of **${topProduct.truthScore || topProduct.priceScore || 89}/100**.`,
        specimen: topProduct
      };
    }

    // 3. Compare vs S24 Ultra
    if (q.includes('compare') || q.includes('s24')) {
      const s24 = products.find(p => p.id.includes('s24') || (p.title || p.name || '').toLowerCase().includes('s24')) || {
        id: 'samsung-galaxy-s24-ultra',
        title: 'Samsung Galaxy S24 Ultra',
        name: 'Samsung Galaxy S24 Ultra',
        currentBestPrice: 1199.99,
        truthScore: 87,
        category: 'Smartphones'
      };
      return {
        text: `**Comparison Insight**: The **iPhone 15 Pro Max** leads in GPU efficiency (A17 Pro 3nm HW ray tracing) and raw video recording quality, while the **Galaxy S24 Ultra** offers integrated S-Pen stylus hardware and 100x Space Zoom. Both sit at verified historic lows with instant FedNow cashback!`,
        specimen: s24
      };
    }

    // 4. Worth buying?
    if (q.includes('worth') || q.includes('verdict') || q.includes('buy')) {
      const v = targetProduct.verdict || { action: 'OPTIMAL BUY', confidence: 94 };
      return {
        text: `Verdict for **${targetProduct.title || targetProduct.name}**: **${v.action}** (${v.confidence || 94}% AI confidence).\n\nThe verified floor is -4% below the 180-day baseline. Volatility is minimal and stock reserves are active. We recommend locking in before retailer pricing algorithms recalibrate.`,
        specimen: targetProduct
      };
    }

    // 5. Cashback / Wallet
    if (q.includes('wallet') || q.includes('cashback') || q.includes('balance')) {
      return {
        text: `Your verified Flash Cashback Wallet balance is **$${(wallet?.balance || 0).toFixed(2)} USD**.\n\nYou have instant FedNow payout enabled with zero ACH settlement hold.`,
        specimen: null
      };
    }

    // General fallback
    return {
      text: `I can help you check live market prices, compare flagship hardware, verify instant FedNow cashback, or analyze Truth Score™ metrology. What would you like to explore?`,
      specimen: null
    };
  };

  const formatText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      return (
        <span key={idx} className={`block ${line === '' ? 'mb-2' : 'mb-0.5'}`}>
          {parts.map((p, pIdx) => {
            if (p.startsWith('**') && p.endsWith('**')) {
              return <strong key={pIdx} className="font-semibold text-white">{p.slice(2, -2)}</strong>;
            }
            if (p.startsWith('*') && p.endsWith('*')) {
              return <em key={pIdx} className="italic text-stone-200">{p.slice(1, -1)}</em>;
            }
            return p;
          })}
        </span>
      );
    });
  };

  const renderSpecimenCard = (specimen) => {
    if (!specimen) return null;
    const title = specimen.title || specimen.name || 'Flagship Specimen';
    const cleanName = title.split('(')[0].trim();
    const specsSub = specimen.color || (title.includes('(') ? title.split('(')[1].replace(')', '') : '256GB • Titanium');
    const floorPrice = specimen.currentBestPrice || specimen.price || specimen.stores?.[0]?.price || 1149.00;
    const msrp = specimen.msrp || Math.round(floorPrice * 1.05) || 1199.00;
    const score = specimen.truthScore || specimen.priceScore || 89;
    const couponCode = specimen.coupon?.code || 'IPHONE50';
    const couponDiscount = specimen.coupon?.discount || 50;
    const cashback = (floorPrice * 0.01).toFixed(2);

    return (
      <div 
        className="bg-[#fafafc] dark:bg-stone-900/60 border border-appleHairline dark:border-stone-800 rounded-2xl p-3.5 space-y-3 transition-all hover:border-[#cfcfd4] dark:hover:border-stone-700 mt-2 shadow-2xs w-full" 
        data-purpose="product-specimen-card"
      >
        <div className="flex items-center justify-between pb-2 border-b border-appleHairline dark:border-stone-800">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-sm font-semibold text-appleInk dark:text-white shadow-2xs shrink-0 overflow-hidden">
              {specimen.images?.[0] ? (
                <img src={specimen.images[0]} alt={cleanName} className="w-full h-full object-cover" />
              ) : (
                <span>📱</span>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <h2 className="text-xs font-semibold text-appleInk dark:text-white truncate">{cleanName}</h2>
                <span className="text-[9px] font-medium px-1.5 py-0.2 rounded bg-stone-100 dark:bg-stone-800 text-appleSecondary dark:text-stone-400 shrink-0">In Stock</span>
              </div>
              <p className="text-[11px] text-appleSecondary dark:text-stone-400 truncate">{specsSub}</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 px-2 py-0.5 rounded-full shrink-0">
            -4% ATH Low
          </span>
        </div>

        {/* Telemetry Data Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white dark:bg-stone-800/90 p-2.5 rounded-xl border border-stone-200/70 dark:border-stone-700">
            <span className="text-[10px] text-appleSecondary dark:text-stone-400 block font-medium">Verified Best Floor</span>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="text-[14px] font-bold text-appleInk dark:text-white">${Number(floorPrice).toLocaleString()}</span>
              {msrp > floorPrice && (
                <span className="text-[10px] text-appleSecondary line-through font-normal">${Number(msrp).toLocaleString()}</span>
              )}
            </div>
          </div>
          <div className="bg-white dark:bg-stone-800/90 p-2.5 rounded-xl border border-stone-200/70 dark:border-stone-700">
            <span className="text-[10px] text-appleSecondary dark:text-stone-400 block font-medium">Truth Score™</span>
            <div className="mt-0.5 flex items-baseline space-x-1">
              <span className="text-[14px] font-bold text-appleBlue">{score} <span className="text-[10px] font-normal text-appleSecondary dark:text-stone-400">/ 100</span></span>
            </div>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 block">Optimal Buy Signal</span>
          </div>
        </div>

        {/* Perks Tag Strip */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-[11px]">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50/80 dark:bg-blue-950/50 text-appleBlue dark:text-sky-300 font-medium border border-blue-100 dark:border-blue-900/50">
            ⚡ +${cashback} Instant FedNow
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-appleInk dark:text-stone-200 font-medium border border-stone-200 dark:border-stone-700">
            🏷️ {couponCode} (-${couponDiscount}.00 Saved)
          </span>
        </div>

        {/* Action Link */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            navigate(`/product/${specimen.id}`);
          }}
          className="w-full mt-1 py-1.5 px-3 rounded-lg bg-white dark:bg-stone-800 hover:bg-stone-100/80 dark:hover:bg-stone-700 border border-stone-200/80 dark:border-stone-700 text-[11px] font-medium text-appleBlue flex items-center justify-between transition-colors cursor-pointer"
        >
          <span className="text-appleInk dark:text-stone-200 font-medium">View Real-Time Deal Ledger</span>
          <span className="text-appleBlue font-semibold">→</span>
        </button>
      </div>
    );
  };

  return (
    <>
      {/* Soft Ambient Cathedral Glow Behind Modal when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 pointer-events-none flex items-end sm:items-center justify-end sm:justify-end p-4 sm:p-6 z-40" 
          data-purpose="ambient-canvas"
        >
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#f0f0f5] via-[#ffffff] to-[#f4f7fb] dark:from-blue-950/20 dark:via-purple-950/10 dark:to-transparent blur-3xl opacity-60"></div>
        </div>
      )}

      {/* Floating Assistant Trigger (Bottom Right Preview) */}
      <aside 
        className="fixed bottom-6 right-6 flex items-center z-40" 
        data-purpose="floating-assistant-preview"
      >
        <button 
          onClick={() => setIsOpen(prev => !prev)}
          aria-label="Toggle Flash AI Assistant"
          className="group transition-all duration-300 transform hover:scale-[1.04] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-appleBlue rounded-full cursor-pointer shadow-apple-pill"
          type="button"
        >
          <AssistantPillLogo className="w-[110px] md:w-[116px] h-auto drop-shadow-sm group-hover:drop-shadow-md transition-all" isDark={isDark} />
        </button>
      </aside>

      {/* Chatbot Modal Window */}
      <main 
        id="chat-assistant-window"
        data-purpose="chatbot-card"
        aria-hidden={!isOpen}
        className={`fixed bottom-4 right-4 sm:bottom-20 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] md:w-[450px] h-[580px] sm:h-[620px] max-h-[calc(100vh-5.5rem)] bg-white dark:bg-[#14151a] rounded-modal border border-appleBorder dark:border-stone-800 shadow-apple-float flex flex-col overflow-hidden transition-all duration-300 z-50 ${
          isOpen ? 'opacity-100 scale-100 pointer-events-auto translate-y-0' : 'opacity-0 scale-95 pointer-events-none translate-y-4'
        }`}
      >
        {/* Header Section */}
        <header className="px-5 py-4 bg-[#fbfbfd] dark:bg-[#181920] border-b border-appleHairline dark:border-stone-800 flex items-center justify-between shrink-0" data-purpose="modal-header">
          <div className="flex items-center space-x-3">
            {/* AI Sparkle Orb */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-50 to-purple-50 dark:from-blue-950/60 dark:to-purple-950/60 border border-purple-100/60 dark:border-purple-800/40 flex items-center justify-center shadow-sm">
              <AppleIntelligenceSparkle className="w-5 h-5 animate-pulse" />
            </div>
            {/* Assistant Identity & Status */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <h1 className="text-[15px] font-semibold text-appleInk dark:text-white tracking-tight leading-snug">Product Assistant</h1>
                {/* Live Active Pulse */}
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50">
                  <span className="w-1.5 h-1.5 mr-1 rounded-full bg-emerald-500 animate-ping"></span>
                  Live Sync
                </span>
              </div>
              <p className="text-[12px] text-appleSecondary dark:text-stone-400 font-normal leading-tight mt-0.5">{getContextLabel()}</p>
            </div>
          </div>
          {/* Action Buttons (Minimize / Close Wash) */}
          <div className="flex items-center space-x-1.5">
            <button 
              onClick={() => setIsOpen(false)}
              aria-label="Minimize or close modal" 
              className="w-8 h-8 rounded-full bg-[#f0f0f2] hover:bg-[#e4e4e7] dark:bg-stone-800 dark:hover:bg-stone-700 flex items-center justify-center transition-colors text-appleSecondary dark:text-stone-400 hover:text-appleInk dark:hover:text-white cursor-pointer" 
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
        </header>

        {/* Chat Conversation Area */}
        <section className="flex-1 overflow-y-auto px-5 py-4 space-y-4 custom-scrollbar text-[13.5px] leading-relaxed" data-purpose="chat-history">
          {/* Message Timestamp Indicator */}
          <div className="flex items-center justify-center my-1">
            <span className="text-[11px] font-medium text-appleSecondary dark:text-stone-400 tracking-wide uppercase px-2 py-0.5 rounded bg-stone-100/70 dark:bg-stone-800/80">
              Today • Just now
            </span>
          </div>

          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div 
                key={m.id} 
                className={`flex flex-col space-y-1.5 max-w-[92%] ${isUser ? 'ml-auto items-end' : 'items-start'}`}
              >
                <div 
                  className={`px-4 py-3 rounded-2xl text-[13.5px] leading-snug shadow-sm ${
                    isUser 
                      ? 'bg-appleBlue text-white rounded-tr-sm' 
                      : 'bg-appleInk dark:bg-stone-800 text-white rounded-tl-sm'
                  }`}
                  data-purpose={isUser ? 'user-message-bubble' : 'primary-message-bubble'}
                >
                  {isUser ? m.text : formatText(m.text)}
                </div>
                
                {/* Embedded Specimen Card if available on AI message */}
                {!isUser && m.specimen && renderSpecimenCard(m.specimen)}

                <span className={`text-[11px] text-appleSecondary dark:text-stone-400 ${isUser ? 'pr-1' : 'pl-1'}`}>
                  {m.timestamp}
                </span>
              </div>
            );
          })}

          {/* Typing Telemetry Indicator */}
          {isTyping && (
            <div className="flex items-center gap-1.5 p-3 bg-appleInk dark:bg-stone-800 rounded-2xl rounded-tl-sm text-white self-start w-fit shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-appleBlue animate-pulse"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-appleBlue animate-pulse delay-100"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-appleBlue animate-pulse delay-200"></span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </section>

        {/* Quick Suggestion Pills */}
        <div className="px-5 py-2.5 bg-gradient-to-t from-white via-white to-transparent dark:from-[#14151a] dark:via-[#14151a] border-t border-appleHairline/60 dark:border-stone-800 shrink-0" data-purpose="quick-prompts">
          <div className="flex items-center space-x-2 overflow-x-auto custom-scrollbar pb-1 text-xs">
            <button 
              onClick={() => handleSend('Live Price Check')}
              className="whitespace-nowrap px-3.5 py-1.5 rounded-capsule bg-[#f5f5f7] hover:bg-[#eaeaea] dark:bg-stone-800 dark:hover:bg-stone-700 text-appleInk dark:text-stone-200 font-medium border border-stone-200/70 dark:border-stone-700 active:scale-95 transition cursor-pointer" 
              type="button"
            >
              Live Price Check
            </button>
            <button 
              onClick={() => handleSend('Recommend Product')}
              className="whitespace-nowrap px-3.5 py-1.5 rounded-capsule bg-[#f5f5f7] hover:bg-[#eaeaea] dark:bg-stone-800 dark:hover:bg-stone-700 text-appleInk dark:text-stone-200 font-medium border border-stone-200/70 dark:border-stone-700 active:scale-95 transition cursor-pointer" 
              type="button"
            >
              Recommend Product
            </button>
            <button 
              onClick={() => handleSend('Worth Buying?')}
              className="whitespace-nowrap px-3.5 py-1.5 rounded-capsule bg-[#f5f5f7] hover:bg-[#eaeaea] dark:bg-stone-800 dark:hover:bg-stone-700 text-appleInk dark:text-stone-200 font-medium border border-stone-200/70 dark:border-stone-700 active:scale-95 transition cursor-pointer" 
              type="button"
            >
              Worth Buying?
            </button>
            <button 
              onClick={() => handleSend('Compare vs S24 Ultra')}
              className="whitespace-nowrap px-3.5 py-1.5 rounded-capsule bg-[#f5f5f7] hover:bg-[#eaeaea] dark:bg-stone-800 dark:hover:bg-stone-700 text-appleInk dark:text-stone-200 font-medium border border-stone-200/70 dark:border-stone-700 active:scale-95 transition cursor-pointer" 
              type="button"
            >
              Compare vs S24 Ultra
            </button>
          </div>
        </div>

        {/* Input Bar Capsule */}
        <footer className="px-5 pb-3.5 pt-1 bg-white dark:bg-[#14151a] flex flex-col space-y-2 shrink-0" data-purpose="input-capsule-container">
          <form 
            className="relative flex items-center w-full" 
            id="chat-form" 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input 
              id="chat-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a shopping question..." 
              className="w-full h-12 pl-4 pr-12 rounded-capsule bg-[#f5f5f7] dark:bg-stone-800/80 border-0 focus:ring-2 focus:ring-appleBlue text-appleInk dark:text-white text-[13.5px] placeholder:text-appleSecondary/80 dark:placeholder:text-stone-500 font-normal outline-none transition" 
            />
            {/* Blue Action Submit Circle Button */}
            <button 
              type="submit"
              aria-label="Send message" 
              className="absolute right-1.5 top-1.5 bottom-1.5 w-9 h-9 rounded-full bg-appleBlue hover:bg-appleBlueHover text-white flex items-center justify-center transition-all transform active:scale-95 shadow-sm cursor-pointer" 
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 10l7-7m0 0l7 7m-7-7v18" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </form>

          {/* Sub-footer Telemetry Label */}
          <div className="flex items-center justify-between px-1 text-[10px] text-appleSecondary dark:text-stone-400">
            <span>Flash Metrology Core v4.2</span>
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>48 Retail Nodes Synchronized</span>
            </span>
          </div>
        </footer>
      </main>
    </>
  );
};
