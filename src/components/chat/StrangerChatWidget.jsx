import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';

// --- Subcomponents ---

const AnonymousProfileSetup = () => {
  const { setupProfile } = useChat();
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && agreed) {
      setupProfile(name.trim());
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-bold text-fc-primary mb-1">Welcome to Flash Community Chat</h3>
      <p className="text-sm text-fc-secondary mb-4">Discuss products, ask for advice, and connect with other shoppers safely.</p>
      
      <div className="bg-red-500/10 border-l-[3px] border-fc-danger p-3 rounded text-xs text-fc-primary mt-4">
        <strong className="font-semibold">Community Guidelines:</strong>
        <ul className="mt-2 pl-5 list-disc space-y-1 text-fc-secondary">
          <li>Be respectful and helpful.</li>
          <li>Do not share personal information (real name, phone, email, address).</li>
          <li>No spam, scams, or malicious links.</li>
          <li>Chats are moderated for safety.</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-fc-secondary">Choose a temporary display name</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 bg-fc-surface border border-fc-border rounded-fc-md text-fc-primary placeholder:text-fc-muted focus:outline-none focus:border-fc-accent text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. DealHunter99"
            maxLength={15}
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="agree" 
            checked={agreed} 
            onChange={(e) => setAgreed(e.target.checked)} 
            className="w-4 h-4 rounded border-fc-border text-fc-accent focus:ring-0 cursor-pointer"
          />
          <label htmlFor="agree" className="m-0 text-xs text-fc-secondary cursor-pointer">I agree to the Community Guidelines</label>
        </div>
        <button 
          type="submit" 
          className="w-full py-2.5 px-4 bg-fc-accent text-white font-medium rounded-fc-md text-sm transition-all hover:bg-fc-accent-hover active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed" 
          disabled={!name.trim() || !agreed}
        >
          Join Chat
        </button>
      </form>
    </div>
  );
};

const ChatHub = ({ setView }) => {
  const { profile, clearProfile, publicRooms, joinRoom } = useChat();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="m-0 font-bold text-base text-fc-primary">Hi, {profile.displayName}</h4>
        <button 
          className="px-2.5 py-1 text-xs border border-fc-border rounded-fc-md text-fc-secondary hover:text-fc-primary hover:border-fc-muted transition-colors" 
          onClick={clearProfile}
        >
          Leave
        </button>
      </div>

      <div 
        className="bg-fc-surface border border-fc-border p-4 rounded-fc-md flex items-center gap-4 cursor-pointer hover:border-fc-accent transition-colors" 
        onClick={() => setView('match_prefs')}
      >
        <div className="text-2xl bg-fc-base p-3 rounded-full flex items-center justify-center shrink-0">🤝</div>
        <div>
          <strong className="block text-sm font-semibold text-fc-primary">Stranger Match</strong>
          <p className="text-xs text-fc-secondary mt-0.5">Find someone to discuss a specific product or budget.</p>
        </div>
      </div>

      <h5 className="mt-5 mb-2.5 text-xs font-semibold uppercase tracking-wider text-fc-secondary">Public Topic Rooms</h5>
      <div className="space-y-2">
        {publicRooms.map(room => (
          <div 
            key={room.id} 
            className="bg-fc-surface border border-fc-border px-4 py-3 rounded-fc-sm cursor-pointer hover:border-fc-accent transition-colors" 
            onClick={() => { joinRoom(room.id); setView('public_room'); }}
          >
            <div className="flex justify-between items-center">
              <strong className="text-sm font-semibold text-fc-primary">#{room.name}</strong>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">{room.activeUsers} online</span>
            </div>
            <p className="text-xs text-fc-secondary mt-1">{room.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const MatchPreferences = ({ setView }) => {
  const { startMatchmaking } = useChat();
  const [category, setCategory] = useState('Smartphones');
  const [goal, setGoal] = useState('Need advice');

  const handleStart = () => {
    startMatchmaking({ category, goal });
    setView('matchmaking');
  };

  return (
    <div className="p-6">
      <button 
        className="text-xs font-medium text-fc-secondary hover:text-fc-primary mb-3 flex items-center gap-1 transition-colors" 
        onClick={() => setView('hub')}
      >
        &larr; Back
      </button>
      <h3 className="text-lg font-bold text-fc-primary">Find a Shopping Buddy</h3>
      
      <div className="mt-4 space-y-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-fc-secondary">What are you looking for?</label>
          <select 
            className="w-full px-3 py-2 bg-fc-surface border border-fc-border rounded-fc-md text-fc-primary text-sm focus:outline-none focus:border-fc-accent" 
            value={category} 
            onChange={e=>setCategory(e.target.value)}
          >
            <option>Smartphones</option>
            <option>Laptops</option>
            <option>Audio & Headphones</option>
            <option>Gaming Consoles</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-fc-secondary">Your Goal</label>
          <select 
            className="w-full px-3 py-2 bg-fc-surface border border-fc-border rounded-fc-md text-fc-primary text-sm focus:outline-none focus:border-fc-accent" 
            value={goal} 
            onChange={e=>setGoal(e.target.value)}
          >
            <option>Need advice</option>
            <option>Comparing two products</option>
            <option>Just discussing</option>
          </select>
        </div>

        <button 
          className="w-full py-2.5 px-4 bg-fc-accent text-white font-medium rounded-fc-md text-sm transition-all hover:bg-fc-accent-hover active:scale-[0.99] mt-6" 
          onClick={handleStart}
        >
          Start Matchmaking
        </button>
      </div>
    </div>
  );
};

const MatchmakingScreen = ({ setView }) => {
  const { matchStatus, endMatch } = useChat();

  useEffect(() => {
    if (matchStatus === 'connected') {
      setView('one_to_one');
    }
  }, [matchStatus, setView]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="w-10 h-10 border-3 border-fc-accent border-t-transparent rounded-full animate-spin"></div>
      <h3 className="mt-4 text-base font-bold text-fc-primary">Finding a match...</h3>
      <p className="text-xs text-fc-secondary mt-1">Looking for someone discussing similar topics.</p>
      
      <button 
        className="px-4 py-2 border border-fc-border rounded-fc-md text-xs text-fc-secondary hover:text-fc-primary hover:border-fc-muted transition-colors mt-6" 
        onClick={() => { endMatch(); setView('hub'); }}
      >
        Cancel
      </button>
    </div>
  );
};

const ChatInterface = ({ messages, onSend, onLeave, title, subtitle, isTyping }) => {
  const [input, setInput] = useState('');
  const [showHelper, setShowHelper] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  const insertSuggestion = (text) => {
    setInput(text);
    setShowHelper(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center px-4 py-3 bg-fc-surface border-b border-fc-border shrink-0">
        <button className="text-xs font-medium text-fc-secondary hover:text-fc-primary transition-colors" onClick={onLeave}>&larr; Leave</button>
        <div className="text-center flex-1 mx-2 min-w-0">
          <strong className="block text-sm font-semibold text-fc-primary truncate">{title}</strong>
          {subtitle && <small className="block text-[11px] text-fc-secondary truncate">{subtitle}</small>}
        </div>
        <button className="text-xs font-medium text-fc-danger hover:underline transition-colors">Report</button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 min-h-0">
        {messages.map(m => {
          const isMe = m.sender === 'me';
          const isSystem = m.sender === 'system';
          return (
            <div 
              key={m.id} 
              className={`flex flex-col ${isSystem ? 'self-center items-center max-w-[95%]' : isMe ? 'self-end items-end max-w-[85%]' : 'self-start items-start max-w-[85%]'}`}
            >
              {!isSystem && !isMe && <span className="text-[11px] text-fc-secondary mb-1 ml-1">{m.name}</span>}
              <div 
                className={
                  isSystem 
                    ? 'bg-transparent text-fc-secondary text-xs italic text-center py-1' 
                    : isMe 
                      ? 'bg-fc-accent text-white px-3.5 py-2.5 rounded-2xl rounded-br-sm text-sm leading-relaxed' 
                      : 'bg-fc-surface border border-fc-border text-fc-primary px-3.5 py-2.5 rounded-2xl rounded-bl-sm text-sm leading-relaxed'
                }
              >
                {m.text}
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div className="self-start items-start max-w-[85%] flex flex-col">
            <div className="bg-fc-surface border border-fc-border text-fc-secondary px-3.5 py-2.5 rounded-2xl rounded-bl-sm text-sm font-bold tracking-widest animate-pulse">
              ...
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {showHelper && (
        <div className="p-3 bg-fc-base border-t border-fc-border shrink-0">
          <div className="text-xs font-bold mb-2 text-fc-accent flex items-center gap-1">✨ AI Suggestions</div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button 
              type="button"
              className="whitespace-nowrap bg-fc-surface border border-fc-border rounded-full px-3 py-1.5 text-xs text-fc-primary hover:bg-fc-accent/10 hover:border-fc-accent transition-colors" 
              onClick={() => insertSuggestion("How is the battery life in real use?")}
            >
              Battery Life?
            </button>
            <button 
              type="button"
              className="whitespace-nowrap bg-fc-surface border border-fc-border rounded-full px-3 py-1.5 text-xs text-fc-primary hover:bg-fc-accent/10 hover:border-fc-accent transition-colors" 
              onClick={() => insertSuggestion("What are the main disadvantages?")}
            >
              Disadvantages?
            </button>
            <button 
              type="button"
              className="whitespace-nowrap bg-fc-surface border border-fc-border rounded-full px-3 py-1.5 text-xs text-fc-primary hover:bg-fc-accent/10 hover:border-fc-accent transition-colors" 
              onClick={() => insertSuggestion("Is there a better alternative at this price?")}
            >
              Alternatives?
            </button>
          </div>
        </div>
      )}

      <form className="flex items-center gap-2 p-3 bg-fc-surface border-t border-fc-border shrink-0" onSubmit={handleSubmit}>
        <button 
          type="button" 
          className="p-2 text-base text-fc-secondary hover:text-fc-accent transition-colors shrink-0" 
          onClick={() => setShowHelper(!showHelper)}
        >
          ✨
        </button>
        <input 
          type="text" 
          value={input}
          onChange={e=>setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-fc-base border border-fc-border rounded-full px-4 py-2 text-sm text-fc-primary placeholder:text-fc-muted focus:outline-none focus:border-fc-accent"
        />
        <button 
          type="submit" 
          className="p-2 text-base text-fc-accent disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95 transition-transform shrink-0" 
          disabled={!input.trim()}
        >
          ➤
        </button>
      </form>
    </div>
  );
};

// --- Main Widget Container ---

export const StrangerChatWidget = () => {
  const { isOpen, toggleChat, unreadCount, profile, matchStatus, endMatch, leaveRoom, 
          oneToOneMessages, sendOneToOneMessage, isStrangerTyping, activeStranger,
          activeRoomId, roomMessages, sendRoomMessage, publicRooms } = useChat();
          
  const [view, setView] = useState('hub'); // setup, hub, match_prefs, matchmaking, one_to_one, public_room

  // Sync view state based on context
  useEffect(() => {
    if (!profile) setView('setup');
    else if (view === 'setup') setView('hub');
  }, [profile, view]);

  useEffect(() => {
    if (matchStatus === 'connected') setView('one_to_one');
  }, [matchStatus]);

  useEffect(() => {
    if (activeRoomId) setView('public_room');
  }, [activeRoomId]);

  if (!isOpen) {
    return (
      <button 
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-36 md:sm:right-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-fc-accent text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all z-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-fc-accent cursor-pointer" 
        onClick={toggleChat} 
        aria-label="Toggle Community Chat"
      >
        <span className="text-xl sm:text-2xl">💬</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-fc-danger text-white text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-full border-2 border-fc-surface">
            {unreadCount}
          </span>
        )}
      </button>
    );
  }

  const handleLeaveOneToOne = () => {
    endMatch();
    setView('hub');
  };

  const handleLeaveRoom = () => {
    leaveRoom();
    setView('hub');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-20 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] h-[580px] max-h-[calc(100vh-6rem)] bg-fc-surface/95 backdrop-blur-xl border border-fc-border rounded-fc-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-fade-in">
      {view !== 'one_to_one' && view !== 'public_room' && (
        <div className="px-5 py-4 bg-fc-surface/80 backdrop-blur-md border-b border-fc-border flex justify-between items-center rounded-t-fc-2xl shrink-0">
          <strong className="text-sm font-semibold text-fc-primary">Community & Stranger Chat</strong>
          <button 
            className="w-8 h-8 rounded-full flex items-center justify-center text-lg leading-none text-fc-secondary hover:text-fc-primary hover:bg-fc-secondary transition-colors p-1" 
            onClick={toggleChat}
            aria-label="Close Community Chat"
          >
            &times;
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto bg-fc-base flex flex-col min-h-0">
        {view === 'setup' && <AnonymousProfileSetup />}
        {view === 'hub' && <ChatHub setView={setView} />}
        {view === 'match_prefs' && <MatchPreferences setView={setView} />}
        {view === 'matchmaking' && <MatchmakingScreen setView={setView} />}
        
        {view === 'one_to_one' && (
          <ChatInterface 
            messages={oneToOneMessages}
            onSend={sendOneToOneMessage}
            onLeave={handleLeaveOneToOne}
            title={`Chatting with ${activeStranger}`}
            subtitle="Anonymous 1-to-1 Match"
            isTyping={isStrangerTyping}
          />
        )}

        {view === 'public_room' && activeRoomId && (
          <ChatInterface 
            messages={roomMessages[activeRoomId] || []}
            onSend={(text) => sendRoomMessage(activeRoomId, text)}
            onLeave={handleLeaveRoom}
            title={`#${publicRooms.find(r=>r.id === activeRoomId)?.name}`}
            subtitle="Public Room"
            isTyping={false}
          />
        )}
      </div>
    </div>
  );
};
