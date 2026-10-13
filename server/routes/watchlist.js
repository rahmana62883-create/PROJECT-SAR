import express from 'express';
import { getStatement } from '../db.js';

const router = express.Router();

const getUserId = (req) => {
  return req.user?.id || req.headers['x-user-id'] || 'usr-01';
};

// 1. Get Watchlist (Fast index scan on user_id)
router.get('/', (req, res) => {
  try {
    const userId = getUserId(req);
    const rows = getStatement('SELECT product_id FROM watchlist WHERE user_id = ? ORDER BY id DESC').all(userId);
    res.json(rows.map(r => r.product_id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Add / Toggle Product in Watchlist
router.post('/', (req, res) => {
  try {
    const userId = getUserId(req);
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ error: 'productId is required' });
    }

    const existing = getStatement('SELECT id FROM watchlist WHERE user_id = ? AND product_id = ?').get(userId, productId);
    if (existing) {
      getStatement('DELETE FROM watchlist WHERE id = ?').run(existing.id);
      return res.json({ saved: false, productId });
    }

    getStatement('INSERT INTO watchlist (user_id, product_id, created_at) VALUES (?, ?, ?)').run(userId, productId, new Date().toISOString());
    res.json({ saved: true, productId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Remove Product from Watchlist
router.delete('/:productId', (req, res) => {
  try {
    const userId = getUserId(req);
    const { productId } = req.params;
    getStatement('DELETE FROM watchlist WHERE user_id = ? AND product_id = ?').run(userId, productId);
    res.json({ success: true, removedProductId: productId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get Price Alerts
router.get('/alerts/list', (req, res) => {
  try {
    const userId = getUserId(req);
    const rows = getStatement('SELECT * FROM price_alerts WHERE user_id = ? ORDER BY created_at DESC').all(userId);
    res.json(rows.map(r => ({
      id: r.id,
      productId: r.product_id,
      targetPrice: r.target_price,
      currentPrice: r.current_price,
      status: r.status,
      createdAt: r.created_at
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Create / Update Price Alert
router.post('/alerts', (req, res) => {
  try {
    const userId = getUserId(req);
    const { productId, targetPrice, currentPrice } = req.body;
    if (!productId || targetPrice === undefined) {
      return res.status(400).json({ error: 'productId and targetPrice are required' });
    }

    const id = 'alt-' + Date.now();
    const now = new Date().toISOString();

    getStatement(`
      INSERT INTO price_alerts (id, user_id, product_id, target_price, current_price, status, created_at)
      VALUES (?, ?, ?, ?, ?, 'Active', ?)
    `).run(id, userId, productId, Number(targetPrice), Number(currentPrice || targetPrice), now);

    res.status(201).json({
      id,
      productId,
      targetPrice: Number(targetPrice),
      currentPrice: Number(currentPrice || targetPrice),
      status: 'Active',
      createdAt: now
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Delete Price Alert
router.delete('/alerts/:id', (req, res) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;
    getStatement('DELETE FROM price_alerts WHERE id = ? AND user_id = ?').run(id, userId);
    res.json({ success: true, deletedId: id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
