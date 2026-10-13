import express from 'express';
import db, { getStatement } from '../db.js';

const router = express.Router();

export const formatOrder = (o) => {
  if (!o) return null;
  return {
    id: o.id,
    customerName: o.customer_name,
    customerEmail: o.customer_email,
    productId: o.product_id,
    productName: o.product_name,
    quantity: Number(o.quantity) || 1,
    total: Number(o.total) || 0,
    status: o.status || 'Pending',
    paymentStatus: o.payment_status || 'Paid',
    date: o.date,
    shippingAddress: o.shipping_address || ''
  };
};

// 1. Get All Orders (Filtered & Indexed)
router.get('/', (req, res) => {
  try {
    const { status, search, limit, offset } = req.query;
    let query = 'SELECT * FROM orders WHERE 1=1';
    const params = [];

    if (status && status !== 'All') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (LOWER(id) LIKE ? OR LOWER(customer_name) LIKE ? OR LOWER(customer_email) LIKE ? OR LOWER(product_name) LIKE ?)';
      const term = `%${search.toLowerCase().trim()}%`;
      params.push(term, term, term, term);
    }

    query += ' ORDER BY date DESC';

    if (limit) {
      query += ' LIMIT ?';
      params.push(Math.min(500, Math.max(1, Number(limit))));
      if (offset) {
        query += ' OFFSET ?';
        params.push(Math.max(0, Number(offset)));
      }
    }

    const rows = db.prepare(query).all(...params);
    res.json(rows.map(formatOrder));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Create Order
router.post('/', (req, res) => {
  try {
    const { customerName, customerEmail, productId, productName, quantity, total, shippingAddress } = req.body;
    const id = 'ORD-IN-' + Math.floor(5000 + Math.random() * 50000);
    const date = new Date().toISOString();

    getStatement(`
      INSERT INTO orders (id, customer_name, customer_email, product_id, product_name, quantity, total, status, payment_status, date, shipping_address)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Confirmed', 'Paid', ?, ?)
    `).run(
      id,
      customerName || 'Valued Customer',
      customerEmail || 'customer@flashcompare.in',
      productId || 'prod-custom',
      productName || 'Order Item',
      Number(quantity) || 1,
      Number(total) || 0,
      date,
      shippingAddress || 'Standard Delivery Address'
    );

    const created = getStatement('SELECT * FROM orders WHERE id = ?').get(id);
    res.status(201).json(formatOrder(created));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Update Order Status
router.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;

    const existing = getStatement('SELECT * FROM orders WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const newStatus = status !== undefined ? status : existing.status;
    const newPayment = paymentStatus !== undefined ? paymentStatus : 
      (newStatus === 'Cancelled' ? 'Void' : (newStatus === 'Pending' ? 'Unpaid' : 'Paid'));

    getStatement(`
      UPDATE orders SET status = ?, payment_status = ? WHERE id = ?
    `).run(newStatus, newPayment, id);

    const updated = getStatement('SELECT * FROM orders WHERE id = ?').get(id);
    res.json(formatOrder(updated));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
