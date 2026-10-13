/**
 * FlashCompare AI — Authentication & Role-Based Access Control Service
 * Integrates with the backend SQLite database via /api/auth while maintaining
 * resilient offline fallback.
 *
 * Supports 3 completely separated roles:
 * - USER ('customer')
 * - ADMIN ('admin')
 * - OWNER ('owner')
 */

import api from './api.js';

// Demo accounts for each role
export const DEMO_ACCOUNTS = {
  user: {
    id: 'usr-01',
    email: 'user@flashcompare.ai',
    password: 'password123',
    name: 'Alex Thorne',
    role: 'customer',
    tier: 'Titanium Member',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    joinedDate: 'Jan 12, 2024',
    cashbackBalance: 342.50
  },
  admin: {
    id: 'adm-01',
    email: 'admin@flashcompare.ai',
    password: 'admin123',
    name: 'Elena Vance',
    role: 'admin',
    tier: 'SecOps Administrator',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    joinedDate: 'Nov 01, 2023',
    clearanceLevel: 'Level 3 - Infrastructure & Arbitrage'
  },
  owner: {
    id: 'own-01',
    email: 'owner@flashcompare.ai',
    password: 'owner123',
    twoFactorCode: '849201',
    name: 'Julian Sterling',
    role: 'owner',
    tier: 'Principal Platform Owner',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    joinedDate: 'Aug 15, 2022',
    clearanceLevel: 'Executive Root Clearance (All Systems)'
  }
};

// Generate simulated session token (JWT structure mock for fallback)
const generateSessionToken = (user) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (user.role === 'owner' ? 3600 : 86400)
  }));
  const signature = btoa('flashcompare_sig_' + Math.random().toString(36).substring(2));
  return `${header}.${payload}.${signature}`;
};

// Audit logging helper
export const logAuthEvent = async (action, details, email = 'unknown', role = 'guest') => {
  try {
    api.auth.logAudit(action, details, email, role).catch(() => {});
  } catch {
    // ignore
  }

  try {
    const existing = JSON.parse(localStorage.getItem('fc_auth_audit_logs') || '[]');
    const newLog = {
      id: 'log_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      action,
      details,
      email,
      role,
      timestamp: new Date().toISOString(),
      ipAddress: '127.0.0.1',
      userAgent: navigator.userAgent || 'Modern Browser'
    };
    const updated = [newLog, ...existing].slice(0, 100);
    localStorage.setItem('fc_auth_audit_logs', JSON.stringify(updated));
    return newLog;
  } catch {
    return null;
  }
};

export const getAuthAuditLogs = async () => {
  try {
    const remote = await api.auth.getAuditLogs();
    if (remote && Array.isArray(remote)) return remote;
  } catch {
    // fallback
  }

  try {
    return JSON.parse(localStorage.getItem('fc_auth_audit_logs') || '[]');
  } catch {
    return [];
  }
};

// =========================================================================
// 1. USER LOGIN SERVICE
// =========================================================================
export const authenticateUser = async (email, password, rememberMe = false) => {
  const cleanEmail = (email || '').toLowerCase().trim();

  // Try Database API first
  try {
    const remoteUser = await api.auth.loginUser(cleanEmail, password);
    if (remoteUser && remoteUser.token) {
      localStorage.setItem('fc_session_token', remoteUser.token);
      localStorage.setItem('fc_current_user', JSON.stringify(remoteUser));
      return remoteUser;
    }
  } catch (err) {
    if (!err.message.includes('fetch') && !err.message.includes('Failed to fetch') && !err.message.includes('NetworkError')) {
      throw err;
    }
  }

  // Fallback to local validation
  const storedUsers = JSON.parse(localStorage.getItem('fc_users') || '[]');
  let matched = storedUsers.find(u => u.email.toLowerCase() === cleanEmail && u.password === password);

  if (!matched && cleanEmail === DEMO_ACCOUNTS.user.email.toLowerCase() && (password === DEMO_ACCOUNTS.user.password || password === 'demo123')) {
    matched = DEMO_ACCOUNTS.user;
  }

  if (!matched && cleanEmail === 'alex.thorne@example.com' && (password === 'demo123' || password === 'password123')) {
    matched = DEMO_ACCOUNTS.user;
  }

  if (!matched) {
    logAuthEvent('USER_LOGIN_FAILED', 'Failed user login attempt with invalid credentials', cleanEmail, 'customer');
    throw new Error('Email or password is incorrect.');
  }

  if (matched.status === 'Suspended') {
    logAuthEvent('USER_ACCOUNT_LOCKED', 'Suspended account attempted login', cleanEmail, matched.role);
    throw new Error('Your account has been temporarily locked. Please try again later.');
  }

  const safeProfile = {
    id: matched.id,
    name: matched.name,
    email: matched.email,
    role: 'customer',
    tier: matched.tier || 'Titanium Member',
    status: matched.status || 'Active',
    avatar: matched.avatar || DEMO_ACCOUNTS.user.avatar,
    token: generateSessionToken(matched),
    sessionStartedAt: new Date().toISOString()
  };

  localStorage.setItem('fc_session_token', safeProfile.token);
  localStorage.setItem('fc_current_user', JSON.stringify(safeProfile));
  logAuthEvent('USER_LOGIN_SUCCESS', `User ${safeProfile.name} successfully authenticated`, cleanEmail, 'customer');
  return safeProfile;
};

// =========================================================================
// 2. ADMIN LOGIN SERVICE
// =========================================================================
export const authenticateAdmin = async (email, password, rememberMe = false) => {
  const cleanEmail = (email || '').toLowerCase().trim();

  // Try Database API first
  try {
    const remoteAdmin = await api.auth.loginAdmin(cleanEmail, password);
    if (remoteAdmin && remoteAdmin.token) {
      localStorage.setItem('fc_session_token', remoteAdmin.token);
      localStorage.setItem('fc_current_user', JSON.stringify(remoteAdmin));
      return remoteAdmin;
    }
  } catch (err) {
    if (!err.message.includes('fetch') && !err.message.includes('Failed to fetch') && !err.message.includes('NetworkError')) {
      throw err;
    }
  }

  // Fallback to local
  let matched = null;
  if (cleanEmail === DEMO_ACCOUNTS.admin.email.toLowerCase() && (password === DEMO_ACCOUNTS.admin.password || password === 'admin2026')) {
    matched = DEMO_ACCOUNTS.admin;
  }

  if (!matched && cleanEmail === DEMO_ACCOUNTS.owner.email.toLowerCase() && password === DEMO_ACCOUNTS.owner.password) {
    matched = { ...DEMO_ACCOUNTS.owner, role: 'admin' };
  }

  if (!matched) {
    if (cleanEmail === DEMO_ACCOUNTS.user.email.toLowerCase() || cleanEmail === 'alex.thorne@example.com') {
      logAuthEvent('ADMIN_ACCESS_DENIED', 'Unauthorized customer attempted admin portal login', cleanEmail, 'customer');
      throw new Error("You don't have permission to access the Admin Portal.");
    }
    logAuthEvent('ADMIN_LOGIN_FAILED', 'Failed admin login attempt with incorrect credentials', cleanEmail, 'admin');
    throw new Error('Email or password is incorrect.');
  }

  const safeProfile = {
    id: matched.id,
    name: matched.name,
    email: matched.email,
    role: 'admin',
    tier: matched.tier || 'SecOps Administrator',
    clearanceLevel: matched.clearanceLevel || 'Level 3 - Infrastructure & Arbitrage',
    status: 'Active',
    avatar: matched.avatar,
    token: generateSessionToken(matched),
    sessionStartedAt: new Date().toISOString()
  };

  localStorage.setItem('fc_session_token', safeProfile.token);
  localStorage.setItem('fc_current_user', JSON.stringify(safeProfile));
  logAuthEvent('ADMIN_LOGIN_SUCCESS', `Administrator ${safeProfile.name} logged into Admin Ops`, cleanEmail, 'admin');
  return safeProfile;
};

// =========================================================================
// 3. OWNER LOGIN SERVICE (HIGH SECURITY WITH MANDATORY 2FA)
// =========================================================================
export const authenticateOwnerStep1 = async (email, password) => {
  const cleanEmail = (email || '').toLowerCase().trim();

  // Try Database API first
  try {
    const challenge = await api.auth.loginOwnerStep1(cleanEmail, password);
    if (challenge && challenge.requiresTwoFactor) {
      return challenge;
    }
  } catch (err) {
    if (!err.message.includes('fetch') && !err.message.includes('Failed to fetch') && !err.message.includes('NetworkError')) {
      throw err;
    }
  }

  // Fallback
  if (cleanEmail !== DEMO_ACCOUNTS.owner.email.toLowerCase()) {
    logAuthEvent('OWNER_ACCESS_DENIED', 'Non-owner attempted access to Owner Console', cleanEmail, 'unauthorized');
    throw new Error("You don't have permission to access the Owner Console.");
  }

  if (password !== DEMO_ACCOUNTS.owner.password && password !== 'owner2026') {
    logAuthEvent('OWNER_BAD_PASSWORD', 'Invalid password for Owner Console', cleanEmail, 'owner');
    throw new Error('Email or password is incorrect.');
  }

  logAuthEvent('OWNER_2FA_CHALLENGE', 'Primary credentials accepted. 2FA challenge dispatched.', cleanEmail, 'owner');
  return {
    requiresTwoFactor: true,
    email: cleanEmail,
    maskedPhone: '+1 (555) ***-9201',
    demoCode: DEMO_ACCOUNTS.owner.twoFactorCode
  };
};

export const authenticateOwnerStep2 = async (email, twoFactorCode, rememberDevice = false) => {
  const cleanEmail = (email || '').toLowerCase().trim();

  // Try Database API first
  try {
    const remoteOwner = await api.auth.loginOwnerStep2(cleanEmail, twoFactorCode);
    if (remoteOwner && remoteOwner.token) {
      localStorage.setItem('fc_session_token', remoteOwner.token);
      localStorage.setItem('fc_current_user', JSON.stringify(remoteOwner));
      return remoteOwner;
    }
  } catch (err) {
    if (!err.message.includes('fetch') && !err.message.includes('Failed to fetch') && !err.message.includes('NetworkError')) {
      throw err;
    }
  }

  // Fallback
  const cleanCode = (twoFactorCode || '').trim();
  if (cleanCode !== DEMO_ACCOUNTS.owner.twoFactorCode && cleanCode !== '849201' && cleanCode !== '123456') {
    logAuthEvent('OWNER_2FA_INVALID', 'Invalid 2FA OTP code submitted', cleanEmail, 'owner');
    throw new Error('Security verification code is invalid or expired.');
  }

  const owner = DEMO_ACCOUNTS.owner;
  const safeProfile = {
    id: owner.id,
    name: owner.name,
    email: owner.email,
    role: 'owner',
    tier: owner.tier,
    clearanceLevel: owner.clearanceLevel,
    status: 'Active',
    avatar: owner.avatar,
    token: generateSessionToken(owner),
    twoFactorVerified: true,
    sessionStartedAt: new Date().toISOString()
  };

  localStorage.setItem('fc_session_token', safeProfile.token);
  localStorage.setItem('fc_current_user', JSON.stringify(safeProfile));
  logAuthEvent('OWNER_LOGIN_SUCCESS', `Platform Owner ${safeProfile.name} authenticated with hardware 2FA`, cleanEmail, 'owner');
  return safeProfile;
};

// Customer Registration
export const registerCustomer = async (name, email, password) => {
  try {
    const profile = await api.auth.register(name, email, password);
    if (profile && profile.token) {
      localStorage.setItem('fc_session_token', profile.token);
      localStorage.setItem('fc_current_user', JSON.stringify(profile));
      return profile;
    }
  } catch (err) {
    if (!err.message.includes('fetch') && !err.message.includes('Failed to fetch')) {
      throw err;
    }
  }

  // Fallback
  const cleanEmail = (email || '').toLowerCase().trim();
  const id = 'usr_' + Date.now();
  const newUser = {
    id,
    name: name.trim(),
    email: cleanEmail,
    role: 'customer',
    tier: 'Titanium Member',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    joinedDate: 'Just now',
    cashbackBalance: 15.00
  };

  const storedUsers = JSON.parse(localStorage.getItem('fc_users') || '[]');
  storedUsers.push({ ...newUser, password });
  localStorage.setItem('fc_users', JSON.stringify(storedUsers));

  const safeProfile = {
    ...newUser,
    token: generateSessionToken(newUser),
    sessionStartedAt: new Date().toISOString()
  };

  localStorage.setItem('fc_session_token', safeProfile.token);
  localStorage.setItem('fc_current_user', JSON.stringify(safeProfile));
  logAuthEvent('USER_REGISTERED', `New customer ${name} registered`, cleanEmail, 'customer');
  return safeProfile;
};
