// Real-time chat & alerts database service connected to SQLite Express backend
import api from './api.js';

class RealtimeDatabase {
  constructor() {
    this.chats = JSON.parse(localStorage.getItem('fc_chats')) || {};
    this.alerts = JSON.parse(localStorage.getItem('fc_alerts')) || [];
    this.listeners = {};
    this._syncFromBackend();
  }

  async _syncFromBackend() {
    try {
      const remoteChats = await api.chats.getAll();
      if (remoteChats && typeof remoteChats === 'object') {
        this.chats = { ...this.chats, ...remoteChats };
        this._save();
      }
    } catch {
      // offline fallback
    }

    try {
      const remoteAlerts = await api.watchlist.getAlerts();
      if (remoteAlerts && Array.isArray(remoteAlerts)) {
        this.alerts = remoteAlerts;
        this._save();
      }
    } catch {
      // offline fallback
    }
  }

  _save() {
    localStorage.setItem('fc_chats', JSON.stringify(this.chats));
    localStorage.setItem('fc_alerts', JSON.stringify(this.alerts));
    this._notifyListeners();
  }

  _notifyListeners() {
    Object.values(this.listeners).forEach(listener => listener());
  }

  subscribeToChats(callback) {
    const id = Date.now().toString();
    this.listeners[id] = () => callback(this.chats);
    callback(this.chats);
    return () => {
      delete this.listeners[id];
    };
  }

  async getChat(visitorId) {
    try {
      const remote = await api.chats.getByVisitor(visitorId);
      if (remote && Array.isArray(remote)) {
        this.chats[visitorId] = remote;
        this._save();
        return remote;
      }
    } catch {
      // fallback
    }
    return this.chats[visitorId] || [];
  }

  async sendMessage(visitorId, message) {
    let saved = null;
    try {
      saved = await api.chats.send(visitorId, message);
    } catch {
      saved = {
        id: Date.now().toString(),
        ...message,
        timestamp: new Date().toISOString()
      };
    }

    if (!this.chats[visitorId]) {
      this.chats[visitorId] = [];
    }
    this.chats[visitorId].push(saved);
    this._save();
    return saved;
  }

  async savePriceAlert(alert) {
    let saved = null;
    try {
      saved = await api.watchlist.createAlert(alert);
    } catch {
      saved = {
        id: Date.now().toString(),
        ...alert,
        createdAt: new Date().toISOString()
      };
    }

    this.alerts.push(saved);
    this._save();
    return saved;
  }
}

export const db = new RealtimeDatabase();

// Anonymous authentication for chat visitors
export const signInAnonymously = async () => {
  let visitorId = localStorage.getItem('fc_visitor_id');
  if (!visitorId) {
    visitorId = 'visitor_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('fc_visitor_id', visitorId);
  }
  return { uid: visitorId, isAnonymous: true };
};
