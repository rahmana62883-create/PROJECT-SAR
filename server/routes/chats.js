import express from 'express';
import { getStatement } from '../db.js';

const router = express.Router();

// 1. Get All Chats (for Admin Dashboard)
router.get('/', (req, res) => {
  try {
    const rows = getStatement('SELECT * FROM chats ORDER BY timestamp ASC LIMIT 200').all();
    const grouped = {};
    for (const r of rows) {
      if (!grouped[r.visitor_id]) grouped[r.visitor_id] = [];
      grouped[r.visitor_id].push({
        id: r.id,
        visitorId: r.visitor_id,
        sender: r.sender,
        text: r.text,
        role: r.role,
        timestamp: r.timestamp
      });
    }
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Moderation: Get Flagged Reports
router.get('/moderation/reports', (req, res) => {
  try {
    const rows = getStatement('SELECT * FROM moderation_reports ORDER BY created_at DESC LIMIT 100').all();
    res.json(rows.map(r => ({
      id: r.id,
      msgId: r.msg_id,
      reason: r.reason,
      createdAt: r.created_at
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Moderation: Report Flagged Message
router.post('/moderation/reports', (req, res) => {
  try {
    const { msgId, reason } = req.body;
    const id = 'rep_' + Date.now();
    getStatement('INSERT INTO moderation_reports (id, msg_id, reason, created_at) VALUES (?, ?, ?, ?)').run(
      id, msgId || 'unknown', reason || 'Inappropriate content', new Date().toISOString()
    );
    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Moderation: Get Blocked Users
router.get('/moderation/blocked', (req, res) => {
  try {
    const rows = getStatement('SELECT username FROM blocked_users ORDER BY blocked_at DESC').all();
    res.json(rows.map(r => r.username));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Moderation: Block User
router.post('/moderation/block', (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username required' });
    getStatement('INSERT OR IGNORE INTO blocked_users (username, blocked_at) VALUES (?, ?)').run(
      username.trim(), new Date().toISOString()
    );
    res.json({ success: true, blockedUser: username.trim() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Get Chat Messages for a Specific Visitor (Index scan on visitor_id)
router.get('/:visitorId', (req, res) => {
  try {
    const { visitorId } = req.params;
    const rows = getStatement('SELECT * FROM chats WHERE visitor_id = ? ORDER BY timestamp ASC LIMIT 100').all(visitorId);
    res.json(rows.map(r => ({
      id: r.id,
      visitorId: r.visitor_id,
      sender: r.sender,
      text: r.text,
      role: r.role,
      timestamp: r.timestamp
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Send Message for Visitor
router.post('/:visitorId', (req, res) => {
  try {
    const { visitorId } = req.params;
    const { text, sender, role } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ error: 'Message text is required' });

    const id = Date.now().toString();
    const timestamp = new Date().toISOString();

    getStatement(`
      INSERT INTO chats (id, visitor_id, sender, text, role, timestamp)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, visitorId, sender || 'Visitor', text.trim(), role || 'user', timestamp);

    res.status(201).json({
      id,
      visitorId,
      sender: sender || 'Visitor',
      text: text.trim(),
      role: role || 'user',
      timestamp
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
