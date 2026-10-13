import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';

export const LiveChatWidget = () => {
  const { messages, isOpen, toggleChat, sendMessage, unreadCount } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isSending) return;
    
    setIsSending(true);
    await sendMessage(inputValue);
    setInputValue('');
    setIsSending(false);
  };

  return (
    <>
      {/* Floating Chat Trigger */}
      <button 
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-fc-accent text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all z-50 focus:outline-none" 
        onClick={toggleChat}
        aria-label="Toggle Live Chat"
      >
        <span className="text-2xl">💬</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-fc-danger text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full border-2 border-fc-base">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-fc-surface border border-fc-border rounded-fc-2xl shadow-2xl flex flex-col z-50 overflow-hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-5 pointer-events-none'
        }`}
      >
        <div className="px-5 py-4 bg-fc-glass border-b border-fc-border flex justify-between items-center shrink-0">
          <div>
            <strong className="block text-sm font-semibold text-fc-primary">Support Chat</strong>
            <small className="text-xs text-fc-secondary flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> We typically reply in minutes
            </small>
          </div>
          <button 
            className="text-xl leading-none text-fc-secondary hover:text-fc-primary transition-colors p-1" 
            onClick={toggleChat}
          >
            &times;
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-fc-base flex flex-col gap-3 min-h-0">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-fc-secondary text-sm">
              <p className="text-2xl mb-2">👋</p>
              <p className="font-semibold text-fc-primary">Hi there!</p>
              <p className="text-xs text-fc-secondary">How can we help you today?</p>
            </div>
          ) : (
            messages.map((m, idx) => {
              const isVisitor = m.sender === 'visitor';
              return (
                <div 
                  key={m.id || idx} 
                  className={`flex flex-col ${isVisitor ? 'self-end items-end max-w-[85%]' : 'self-start items-start max-w-[85%]'}`}
                >
                  <div 
                    className={
                      isVisitor 
                        ? 'bg-fc-accent text-white px-3.5 py-2.5 rounded-2xl rounded-br-sm text-sm leading-relaxed' 
                        : 'bg-fc-surface border border-fc-border text-fc-primary px-3.5 py-2.5 rounded-2xl rounded-bl-sm text-sm leading-relaxed'
                    }
                  >
                    {m.text}
                  </div>
                  <div className="text-[10px] text-fc-secondary mt-1 px-1">
                    {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="flex items-center gap-2 p-3 bg-fc-surface border-t border-fc-border shrink-0" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Type your message..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isSending}
            className="flex-1 bg-fc-base border border-fc-border rounded-full px-4 py-2 text-sm text-fc-primary placeholder:text-fc-muted focus:outline-none focus:border-fc-accent disabled:opacity-50"
          />
          <button 
            type="submit" 
            disabled={!inputValue.trim() || isSending}
            className="p-2 text-base text-fc-accent disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95 transition-transform shrink-0"
          >
            ➤
          </button>
        </form>
      </div>
    </>
  );
};
