import express from 'express';
import db from '../db.js';
import { seedDatabase } from '../seed.js';

const router = express.Router();

router.get('/health', (req, res) => {
  try {
    const productsCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
    const usersCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    const ordersCount = db.prepare('SELECT COUNT(*) as count FROM orders').get().count;
    const customersCount = db.prepare('SELECT COUNT(*) as count FROM customers').get().count;
    const banksCount = db.prepare('SELECT COUNT(*) as count FROM bank_accounts').get().count;
    const txCount = db.prepare('SELECT COUNT(*) as count FROM transactions').get().count;

    res.json({
      status: 'healthy',
      engine: 'Node.js SQLite (Built-in node:sqlite)',
      version: '2.0.0',
      uptime: process.uptime(),
      counts: {
        products: productsCount,
        users: usersCount,
        orders: ordersCount,
        customers: customersCount,
        bankAccounts: banksCount,
        transactions: txCount
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

router.post('/reset', (req, res) => {
  try {
    seedDatabase({ force: true });
    res.json({ success: true, message: 'Database reset to default seed successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
