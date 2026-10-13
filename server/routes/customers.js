import express from 'express';
import db, { getStatement } from '../db.js';

const router = express.Router();

export const formatCustomer = (c) => {
  if (!c) return null;
  return {
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone || '',
    status: c.status || 'Active',
    totalSpend: Number(c.total_spend) || 0,
    ordersCount: Number(c.orders_count) || 0,
    joinDate: c.join_date || '',
    location: c.location || ''
  };
};

// 1. Get All Customers
router.get('/', (req, res) => {
  try {
    const { status, search, limit, offset } = req.query;
    let query = 'SELECT * FROM customers WHERE 1=1';
    const params = [];

    if (status && status !== 'All') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (LOWER(id) LIKE ? OR LOWER(name) LIKE ? OR LOWER(email) LIKE ?)';
      const term = `%${search.toLowerCase().trim()}%`;
      params.push(term, term, term);
    }

    query += ' ORDER BY total_spend DESC';

    if (limit) {
      query += ' LIMIT ?';
      params.push(Math.min(500, Math.max(1, Number(limit))));
      if (offset) {
        query += ' OFFSET ?';
        params.push(Math.max(0, Number(offset)));
      }
    }

    const rows = db.prepare(query).all(...params);
    res.json(rows.map(formatCustomer));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Create Customer
router.post('/', (req, res) => {
  try {
    const { name, email, phone, location } = req.body;
    const id = 'CUST-IN-' + Math.floor(1000 + Math.random() * 9000);
    const joinDate = new Date().toISOString().split('T')[0];

    getStatement(`
      INSERT INTO customers (id, name, email, phone, status, total_spend, orders_count, join_date, location)
      VALUES (?, ?, ?, ?, 'Active', 0, 0, ?, ?)
    `).run(id, name, email, phone || '+91 9800000000', joinDate, location || 'Bengaluru, Karnataka');

    const created = getStatement('SELECT * FROM customers WHERE id = ?').get(id);
    res.status(201).json(formatCustomer(created));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Update Customer Status
router.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status, phone, location } = req.body;

    const existing = getStatement('SELECT * FROM customers WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    getStatement(`
      UPDATE customers SET
        status = COALESCE(?, status),
        phone = COALESCE(?, phone),
        location = COALESCE(?, location)
      WHERE id = ?
    `).run(status || null, phone || null, location || null, id);

    const updated = getStatement('SELECT * FROM customers WHERE id = ?').get(id);
    res.json(formatCustomer(updated));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
