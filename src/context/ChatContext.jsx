import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

// Mock Data for Strangers
const MOCK_STRANGERS = ["TechGuru99", "BargainHunter", "GadgetFreak", "PixelPeeker", "AudioSnob"];
const MOCK_GREETINGS = [
  "Hey, what are you looking to buy?",
  "Anyone know if the new iPhone is worth it?",
  "Looking for laptop recommendations under 60k.",
  "I heard the battery life on that model is terrible, true?",
  "Hi! I can help you compare if you want."
];

export const ChatProvider = ({ children }) => {
  // --- UI State ---
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // --- Session & Profile State ---
  // null if not setup, else { displayName: 'User', agreedToRules: true }
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('fc_chat_profile');
    return saved ? JSON.parse(saved) : null;
  });

  // --- Matchmaking & 1-to-1 State ---
  // status: 'idle', 'searching', 'connected'
  const [matchStatus, setMatchStatus] = useState('idle');
  const [activeStranger, setActiveStranger] = useState(null);
  const [oneToOneMessages, setOneToOneMessages] = useState([]);
  const [isStrangerTyping, setIsStrangerTyping] = useState(false);

  // --- Public Rooms State ---
  const [publicRooms, setPublicRooms] = useState([
    { id: 'smartphones', name: 'Smartphones & Mobile', activeUsers: 142, description: 'Discuss iOS, Android, and mobile accessories.' },
    { id: 'laptops', name: 'Laptops & PCs', activeUsers: 89, description: 'Find the best laptops for gaming, coding, and work.' },
    { id: 'gaming', name: 'Gaming Consoles', activeUsers: 215, description: 'PS5, Xbox, Switch, and gaming deals.' },
    { id: 'audio', name: 'Audiophiles', activeUsers: 56, description: 'Headphones, earbuds, and sound systems.' }
  ]);
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [roomMessages, setRoomMessages] = useState({}); // { roomId: [msgs] }

  // --- Moderation Store (For Admin) ---
  const [reportedMessages, setReportedMessages] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [adminLogs, setAdminLogs] = useState([]); // Master log of all chats

  // Simulation Refs
  const typingTimer = useRef(null);
  const replyTimer = useRef(null);

  useEffect(() => {
    if (profile) {
      localStorage.setItem('fc_chat_profile', JSON.stringify(profile));
    }
  }, [profile]);

  // Generate unique ID
  const generateId = () => Math.random().toString(36).substring(2, 9);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) setUnreadCount(0);
  };

  const openChat = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  const setupProfile = (displayName) => {
    setProfile({ displayName, agreedToRules: true });
    logAdminEvent('USER_JOINED', `User joined as ${displayName}`);
  };

  const clearProfile = () => {
    setProfile(null);
    localStorage.removeItem('fc_chat_profile');
    endMatch();
  };

  // --- 1-to-1 Matchmaking ---
  const startMatchmaking = (preferences) => {
    setMatchStatus('searching');
    logAdminEvent('MATCHMAKING_STARTED', `User looking for: ${preferences.category}`);
    
    // Simulate finding a match after 2-4 seconds
    setTimeout(() => {
      const strangerName = MOCK_STRANGERS[Math.floor(Math.random() * MOCK_STRANGERS.length)];
      setActiveStranger(strangerName);
      setMatchStatus('connected');
      setOneToOneMessages([{
        id: generateId(),
        sender: 'system',
        text: `You are now chatting with a random stranger interested in ${preferences.category}. Say hi!`,
        timestamp: Date.now()
      }]);
      logAdminEvent('MATCH_FOUND', `Matched with ${strangerName}`);

      // Simulate stranger greeting after 2s
      simulateStrangerTyping();
      setTimeout(() => {
        receiveStrangerMessage(MOCK_GREETINGS[Math.floor(Math.random() * MOCK_GREETINGS.length)]);
      }, 3500);

    }, 2000 + Math.random() * 2000);
  };

  const endMatch = () => {
    setMatchStatus('idle');
    setActiveStranger(null);
    setOneToOneMessages([]);
    setIsStrangerTyping(false);
    clearTimeout(typingTimer.current);
    clearTimeout(replyTimer.current);
    logAdminEvent('MATCH_ENDED', `User disconnected from stranger`);
  };

  const sendOneToOneMessage = (text, type = 'text', payload = null) => {
    const msg = {
      id: generateId(),
      sender: 'me',
      name: profile?.displayName || 'Anonymous',
      text,
      type, // 'text', 'product'
      payload,
      timestamp: Date.now()
    };
    setOneToOneMessages(prev => [...prev, msg]);
    logAdminEvent('MESSAGE_SENT', `1-to-1: ${text}`);

    // Simulate reply
    simulateStrangerReply(text);
  };

  const receiveStrangerMessage = (text) => {
    setIsStrangerTyping(false);
    const msg = {
      id: generateId(),
      sender: 'stranger',
      name: activeStranger,
      text,
      type: 'text',
      timestamp: Date.now()
    };
    setOneToOneMessages(prev => [...prev, msg]);
    if (!isOpen) setUnreadCount(c => c + 1);
  };

  const simulateStrangerTyping = () => {
    setIsStrangerTyping(true);
    typingTimer.current = setTimeout(() => {
      setIsStrangerTyping(false);
    }, 4000); // Failsafe
  };

  const simulateStrangerReply = (userText) => {
    clearTimeout(replyTimer.current);
    const delay = 1000 + Math.random() * 2000;
    
    setTimeout(() => {
      simulateStrangerTyping();
      replyTimer.current = setTimeout(() => {
        let reply = "That's interesting.";
        const lower = userText.toLowerCase();
        if (lower.includes('price') || lower.includes('cost')) reply = "Prices are crazy right now, check the trends.";
        else if (lower.includes('battery')) reply = "Battery life is usually the biggest issue for me.";
        else if (lower.includes('hi') || lower.includes('hello')) reply = "Hey! What's up?";
        else if (lower.includes('product')) reply = "Which one exactly? Can you share it?";
        
        receiveStrangerMessage(reply);
      }, 2000 + Math.random() * 1500);
    }, delay);
  };

  // --- Public Rooms ---
  const joinRoom = (roomId) => {
    setActiveRoomId(roomId);
    if (!roomMessages[roomId]) {
      // Seed with some mock messages
      setRoomMessages(prev => ({
        ...prev,
        [roomId]: [
          { id: generateId(), sender: 'system', text: `Welcome to the ${roomId} room!`, timestamp: Date.now() }
        ]
      }));
    }
    logAdminEvent('ROOM_JOINED', `User joined room: ${roomId}`);
  };

  const leaveRoom = () => {
    setActiveRoomId(null);
  };

  const sendRoomMessage = (roomId, text, type = 'text', payload = null) => {
    const msg = {
      id: generateId(),
      sender: 'me',
      name: profile?.displayName || 'Anonymous',
      text,
      type,
      payload,
      timestamp: Date.now()
    };
    setRoomMessages(prev => ({
      ...prev,
      [roomId]: [...(prev[roomId] || []), msg]
    }));
    logAdminEvent('ROOM_MSG', `[${roomId}]: ${text}`);

    // Randomly simulate a community member replying
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const strangers = ["AdminBot", "DealSeeker", "TechEnthusiast"];
        const s = strangers[Math.floor(Math.random() * strangers.length)];
        const replyMsg = {
          id: generateId(),
          sender: 'stranger',
          name: s,
          text: `I agree with ${profile?.displayName} about that.`,
          type: 'text',
          timestamp: Date.now()
        };
        setRoomMessages(prev => ({
          ...prev,
          [roomId]: [...(prev[roomId] || []), replyMsg]
        }));
        if (!isOpen) setUnreadCount(c => c + 1);
      }, 3000 + Math.random() * 3000);
    }
  };

  // --- Moderation & Safety ---
  const reportMessage = (msgId, reason) => {
    setReportedMessages(prev => [...prev, { msgId, reason, timestamp: Date.now() }]);
    logAdminEvent('MSG_REPORTED', `Message ${msgId} reported for ${reason}`);
  };

  const blockUser = (username) => {
    setBlockedUsers(prev => [...prev, username]);
    logAdminEvent('USER_BLOCKED', `Blocked user ${username}`);
    if (activeStranger === username) {
      endMatch();
    }
  };

  const logAdminEvent = (type, detail) => {
    setAdminLogs(prev => [...prev, { id: generateId(), type, detail, timestamp: Date.now() }]);
  };


  return (
    <ChatContext.Provider value={{
      isOpen, toggleChat, openChat, unreadCount,
      profile, setupProfile, clearProfile,
      
      // Matchmaking
      matchStatus, activeStranger, oneToOneMessages, isStrangerTyping,
      startMatchmaking, endMatch, sendOneToOneMessage,
      
      // Rooms
      publicRooms, activeRoomId, roomMessages,
      joinRoom, leaveRoom, sendRoomMessage,

      // Moderation
      reportMessage, blockUser,
      reportedMessages, blockedUsers, adminLogs
    }}>
      {children}
    </ChatContext.Provider>
  );
};
