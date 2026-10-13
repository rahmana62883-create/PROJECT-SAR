import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  DEMO_ACCOUNTS, 
  authenticateUser, 
  authenticateAdmin, 
  authenticateOwnerStep1, 
  authenticateOwnerStep2, 
  logAuthEvent 
} from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Session storage user state
  const [currentUser, setCurrentUserState] = useState(() => {
    try {
      const session = sessionStorage.getItem('fc_current_user') || localStorage.getItem('fc_current_user');
      if (session) return JSON.parse(session);
      // Default to unauthenticated or demo customer
      return null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('signin');
  const [onAuthSuccessCallback, setOnAuthSuccessCallback] = useState(null);

  // Sync session changes
  const setCurrentUser = useCallback((user, remember = false) => {
    setCurrentUserState(user);
    if (user) {
      sessionStorage.setItem('fc_current_user', JSON.stringify(user));
      if (remember) {
        localStorage.setItem('fc_current_user', JSON.stringify(user));
      }
    } else {
      sessionStorage.removeItem('fc_current_user');
      localStorage.removeItem('fc_current_user');
    }
  }, []);

  // Modal helpers for header quick login
  const openAuthModal = (tab = 'signin', onSuccess = null) => {
    setAuthModalTab(tab);
    setOnAuthSuccessCallback(() => onSuccess);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setOnAuthSuccessCallback(null);
  };

  // 1. User Sign-In
  const signInUser = async (email, password, rememberMe = false) => {
    const profile = await authenticateUser(email, password, rememberMe);
    setCurrentUser(profile, rememberMe);
    closeAuthModal();
    if (onAuthSuccessCallback) onAuthSuccessCallback(profile);
    return profile;
  };

  // 2. Admin Sign-In
  const signInAdmin = async (email, password, rememberMe = false) => {
    const profile = await authenticateAdmin(email, password, rememberMe);
    setCurrentUser(profile, rememberMe);
    closeAuthModal();
    if (onAuthSuccessCallback) onAuthSuccessCallback(profile);
    return profile;
  };

  // 3. Owner Sign-In (2-Step)
  const signInOwnerChallenge = async (email, password) => {
    return await authenticateOwnerStep1(email, password);
  };

  const signInOwnerVerify = async (email, code, rememberMe = false) => {
    const profile = await authenticateOwnerStep2(email, code, rememberMe);
    setCurrentUser(profile, rememberMe);
    closeAuthModal();
    if (onAuthSuccessCallback) onAuthSuccessCallback(profile);
    return profile;
  };

  // User Sign-Up (Customer only)
  const signUpUser = async (name, email, password) => {
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    const cleanEmail = email.toLowerCase().trim();
    const storedUsers = JSON.parse(localStorage.getItem('fc_users') || '[]');
    if (storedUsers.some(u => u.email.toLowerCase() === cleanEmail) || cleanEmail === DEMO_ACCOUNTS.user.email.toLowerCase()) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: 'usr_' + Date.now().toString(36),
      name: name.trim(),
      email: cleanEmail,
      password, // in real app hashed backend-side
      role: 'customer',
      tier: 'Standard Member',
      status: 'Active',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };

    localStorage.setItem('fc_users', JSON.stringify([...storedUsers, newUser]));

    const profile = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: 'customer',
      tier: newUser.tier,
      status: newUser.status,
      avatar: newUser.avatar,
      sessionStartedAt: new Date().toISOString()
    };

    logAuthEvent('USER_REGISTERED', `New customer ${profile.name} registered`, cleanEmail, 'customer');
    setCurrentUser(profile, false);
    closeAuthModal();
    return profile;
  };

  // Sign out
  const signOut = (redirectPath = '/login') => {
    if (currentUser) {
      logAuthEvent('LOGOUT', `User ${currentUser.name} signed out`, currentUser.email, currentUser.role);
    }
    setCurrentUser(null, false);
  };

  // Legacy compatibility helpers
  const signIn = (email, password) => signInUser(email, password, false);
  const signUp = (name, email, password) => signUpUser(name, email, password);
  const loginCustomer = () => {
    const user = { ...DEMO_ACCOUNTS.user };
    setCurrentUser(user, false);
    return user;
  };
  const loginAdmin = () => {
    const admin = { ...DEMO_ACCOUNTS.admin };
    setCurrentUser(admin, false);
    return admin;
  };
  const loginOwner = () => {
    const owner = { ...DEMO_ACCOUNTS.owner, twoFactorVerified: true };
    setCurrentUser(owner, false);
    return owner;
  };

  const role = currentUser?.role || null;
  const isAuthenticated = Boolean(currentUser);
  const isAdmin = Boolean(currentUser && (currentUser.role === 'admin' || currentUser.role === 'owner'));
  const isOwner = Boolean(currentUser && currentUser.role === 'owner');

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        role,
        isAdmin,
        isOwner,
        signInUser,
        signInAdmin,
        signInOwnerChallenge,
        signInOwnerVerify,
        signUpUser,
        signOut,
        // Legacy shims
        signIn,
        signUp,
        loginCustomer,
        loginAdmin,
        loginOwner,
        isAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
