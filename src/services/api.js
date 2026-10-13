/**
 * FlashCompare AI — Ultra-Fast Cached API Client
 * Features intelligent in-memory caching for zero-latency client navigation,
 * automatic cache invalidation on writes, and timeout protection.
 */

// Production-ready API Base URL:
// Reads VITE_API_URL from environment variables when deployed (e.g., on Netlify).
// Falls back to '/api' in local development to utilize Vite's dev proxy to localhost:5000.
const envApiUrl = (import.meta.env?.VITE_API_URL || '').trim().replace(/\/$/, '');
const BASE_URL = envApiUrl ? (envApiUrl.endsWith('/api') ? envApiUrl : `${envApiUrl}/api`) : '/api';


// In-Memory Read Cache for 0ms Route Switching
const cache = new Map();
const CACHE_TTL_MS = 45000; // 45 seconds

const getCached = (key) => {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.time > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.data;
};

const setCache = (key, data) => {
  cache.set(key, { data, time: Date.now() });
};

export const clearCache = (prefix = '') => {
  if (!prefix) {
    cache.clear();
    return;
  }
  for (const k of cache.keys()) {
    if (k.startsWith(prefix)) cache.delete(k);
  }
};

const getHeaders = (extra = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...extra
  };

  try {
    const token = localStorage.getItem('fc_session_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const userStr = localStorage.getItem('fc_current_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user?.id) headers['x-user-id'] = user.id;
    }
  } catch {
    // ignore
  }

  return headers;
};

const fetchWithTimeout = async (url, options = {}, timeoutMs = 8000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
};

const handleResponse = async (res) => {
  if (!res.ok) {
    let errorMsg = `HTTP Error ${res.status}`;
    try {
      const data = await res.json();
      if (data.error) errorMsg = data.error;
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }
  return res.json();
};

export const api = {
  // System
  system: {
    health: () => fetchWithTimeout(`${BASE_URL}/system/health`).then(handleResponse),
    reset: () => {
      clearCache();
      return fetchWithTimeout(`${BASE_URL}/system/reset`, { method: 'POST', headers: getHeaders() }).then(handleResponse);
    }
  },

  // Auth
  auth: {
    loginUser: (email, password) =>
      fetchWithTimeout(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password })
      }).then(handleResponse),

    loginAdmin: (email, password) =>
      fetchWithTimeout(`${BASE_URL}/auth/login/admin`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password })
      }).then(handleResponse),

    loginOwnerStep1: (email, password) =>
      fetchWithTimeout(`${BASE_URL}/auth/login/owner/step1`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password })
      }).then(handleResponse),

    loginOwnerStep2: (email, twoFactorCode) =>
      fetchWithTimeout(`${BASE_URL}/auth/login/owner/step2`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, twoFactorCode })
      }).then(handleResponse),

    register: (name, email, password) =>
      fetchWithTimeout(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ name, email, password })
      }).then(handleResponse),

    getMe: () => fetchWithTimeout(`${BASE_URL}/auth/me`, { headers: getHeaders() }).then(handleResponse),

    getAuditLogs: () => fetchWithTimeout(`${BASE_URL}/auth/audit-logs`).then(handleResponse),

    logAudit: (action, details, email, role) =>
      fetchWithTimeout(`${BASE_URL}/auth/audit-logs`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ action, details, email, role })
      }).then(handleResponse)
  },

  // Products Catalog (with in-memory cache)
  products: {
    getAll: async (params = {}) => {
      const q = new URLSearchParams(params).toString();
      const cacheKey = `products_${q}`;
      const cached = getCached(cacheKey);
      if (cached) return cached;

      const data = await fetchWithTimeout(`${BASE_URL}/products${q ? `?${q}` : ''}`).then(handleResponse);
      setCache(cacheKey, data);
      return data;
    },
    getCategories: async () => {
      const cacheKey = 'product_categories';
      const cached = getCached(cacheKey);
      if (cached) return cached;

      const data = await fetchWithTimeout(`${BASE_URL}/products/categories`).then(handleResponse);
      setCache(cacheKey, data);
      return data;
    },
    getBrands: async () => {
      const cacheKey = 'product_brands';
      const cached = getCached(cacheKey);
      if (cached) return cached;

      const data = await fetchWithTimeout(`${BASE_URL}/products/brands`).then(handleResponse);
      setCache(cacheKey, data);
      return data;
    },
    getById: (id) => fetchWithTimeout(`${BASE_URL}/products/${encodeURIComponent(id)}`).then(handleResponse),
    create: async (data) => {
      clearCache('products');
      return fetchWithTimeout(`${BASE_URL}/products`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      }).then(handleResponse);
    },
    update: async (id, data) => {
      clearCache('products');
      return fetchWithTimeout(`${BASE_URL}/products/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data)
      }).then(handleResponse);
    },
    delete: async (id) => {
      clearCache('products');
      return fetchWithTimeout(`${BASE_URL}/products/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: getHeaders()
      }).then(handleResponse);
    },
    reset: async () => {
      clearCache();
      return fetchWithTimeout(`${BASE_URL}/products/reset`, {
        method: 'POST',
        headers: getHeaders()
      }).then(handleResponse);
    }
  },

  // Orders
  orders: {
    getAll: async (params = {}) => {
      const q = new URLSearchParams(params).toString();
      return fetchWithTimeout(`${BASE_URL}/orders${q ? `?${q}` : ''}`).then(handleResponse);
    },
    create: async (data) =>
      fetchWithTimeout(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      }).then(handleResponse),
    updateStatus: async (id, status, paymentStatus) =>
      fetchWithTimeout(`${BASE_URL}/orders/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status, paymentStatus })
      }).then(handleResponse)
  },

  // Customers (CRM)
  customers: {
    getAll: (params = {}) => {
      const q = new URLSearchParams(params).toString();
      return fetchWithTimeout(`${BASE_URL}/customers${q ? `?${q}` : ''}`).then(handleResponse);
    },
    create: (data) =>
      fetchWithTimeout(`${BASE_URL}/customers`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      }).then(handleResponse),
    update: (id, data) =>
      fetchWithTimeout(`${BASE_URL}/customers/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(data)
      }).then(handleResponse)
  },

  // Wallet & Disbursements
  wallet: {
    getState: () => fetchWithTimeout(`${BASE_URL}/wallet`, { headers: getHeaders() }).then(handleResponse),
    linkBank: (bankData) =>
      fetchWithTimeout(`${BASE_URL}/wallet/banks`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(bankData)
      }).then(handleResponse),
    unlinkBank: (id) =>
      fetchWithTimeout(`${BASE_URL}/wallet/banks/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: getHeaders()
      }).then(handleResponse),
    withdraw: (amount, bankAccountId, otpCode) =>
      fetchWithTimeout(`${BASE_URL}/wallet/withdraw`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ amount, bankAccountId, otpCode })
      }).then(handleResponse)
  },

  // Watchlist & Price Alerts
  watchlist: {
    getList: () => fetchWithTimeout(`${BASE_URL}/watchlist`, { headers: getHeaders() }).then(handleResponse),
    toggle: (productId) =>
      fetchWithTimeout(`${BASE_URL}/watchlist`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ productId })
      }).then(handleResponse),
    remove: (productId) =>
      fetchWithTimeout(`${BASE_URL}/watchlist/${encodeURIComponent(productId)}`, {
        method: 'DELETE',
        headers: getHeaders()
      }).then(handleResponse),
    getAlerts: () => fetchWithTimeout(`${BASE_URL}/watchlist/alerts/list`, { headers: getHeaders() }).then(handleResponse),
    createAlert: (data) =>
      fetchWithTimeout(`${BASE_URL}/watchlist/alerts`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      }).then(handleResponse),
    deleteAlert: (id) =>
      fetchWithTimeout(`${BASE_URL}/watchlist/alerts/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: getHeaders()
      }).then(handleResponse)
  },

  // Chat & Moderation
  chats: {
    getAll: () => fetchWithTimeout(`${BASE_URL}/chats`, { headers: getHeaders() }).then(handleResponse),
    getByVisitor: (visitorId) => fetchWithTimeout(`${BASE_URL}/chats/${encodeURIComponent(visitorId)}`, { headers: getHeaders() }).then(handleResponse),
    send: (visitorId, data) =>
      fetchWithTimeout(`${BASE_URL}/chats/${encodeURIComponent(visitorId)}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      }).then(handleResponse),
    getReports: () => fetchWithTimeout(`${BASE_URL}/chats/moderation/reports`, { headers: getHeaders() }).then(handleResponse),
    reportMessage: (msgId, reason) =>
      fetchWithTimeout(`${BASE_URL}/chats/moderation/reports`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ msgId, reason })
      }).then(handleResponse),
    getBlocked: () => fetchWithTimeout(`${BASE_URL}/chats/moderation/blocked`, { headers: getHeaders() }).then(handleResponse),
    blockUser: (username) =>
      fetchWithTimeout(`${BASE_URL}/chats/moderation/block`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ username })
      }).then(handleResponse)
  }
};

export default api;
