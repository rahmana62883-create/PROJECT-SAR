import bcrypt from 'bcryptjs';
import db, { initSchema } from './db.js';
import {
  defaultProducts,
  defaultUsers,
  defaultBankAccounts,
  defaultAuditLogs,
  mockOrders,
  mockCustomers
} from '../src/data/mockData.js';

export const seedDatabase = ({ force = false } = {}) => {
  initSchema();

  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;

  if (!force && productCount > 0 && userCount > 0) {
    console.log(`[DB Seed] Database already contains ${productCount} products and ${userCount} users. Skipping seed.`);
    return;
  }

  console.log('[DB Seed] Seeding database with fresh initial dataset...');

  if (force) {
    db.exec(`
      DELETE FROM moderation_reports;
      DELETE FROM blocked_users;
      DELETE FROM chats;
      DELETE FROM price_alerts;
      DELETE FROM watchlist;
      DELETE FROM transactions;
      DELETE FROM bank_accounts;
      DELETE FROM customers;
      DELETE FROM orders;
      DELETE FROM products;
      DELETE FROM users;
      DELETE FROM audit_logs;
    `);
  }

  // 1. Seed Users
  const insertUser = db.prepare(`
    INSERT OR REPLACE INTO users (
      id, email, password_hash, name, role, tier, status, avatar, clearance_level, two_factor_code, cashback_balance, joined_date, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const initialUsers = [
    {
      id: 'usr-01',
      email: 'user@flashcompare.ai',
      password: 'password123',
      name: 'Alex Thorne',
      role: 'customer',
      tier: 'Titanium Member',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      clearance_level: null,
      two_factor_code: null,
      cashback_balance: 342.50,
      joined_date: 'Jan 12, 2024'
    },
    {
      id: 'adm-01',
      email: 'admin@flashcompare.ai',
      password: 'admin123',
      name: 'Elena Vance',
      role: 'admin',
      tier: 'SecOps Administrator',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      clearance_level: 'Level 3 - Infrastructure & Arbitrage',
      two_factor_code: null,
      cashback_balance: 0.00,
      joined_date: 'Nov 01, 2023'
    },
    {
      id: 'own-01',
      email: 'owner@flashcompare.ai',
      password: 'owner123',
      name: 'Julian Sterling',
      role: 'owner',
      tier: 'Principal Platform Owner',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      clearance_level: 'Executive Root Clearance (All Systems)',
      two_factor_code: '849201',
      cashback_balance: 1250.00,
      joined_date: 'Aug 15, 2022'
    }
  ];

  for (const u of initialUsers) {
    const hash = bcrypt.hashSync(u.password, 10);
    insertUser.run(
      u.id,
      u.email.toLowerCase(),
      hash,
      u.name,
      u.role,
      u.tier,
      u.status,
      u.avatar,
      u.clearance_level,
      u.two_factor_code,
      u.cashback_balance,
      u.joined_date,
      new Date().toISOString()
    );
  }

  // 2. Seed Products (300+ items)
  const insertProduct = db.prepare(`
    INSERT OR REPLACE INTO products (
      id, title, name, brand, category, sku, rating, reviews_count, featured, in_stock,
      chipset, material, color, colors, images, description, truth_score,
      truth_score_breakdown, specs, stores, current_best_price, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const now = new Date().toISOString();
  for (const p of defaultProducts || []) {
    const title = p.title || p.name || 'Product ' + p.id;
    const name = p.name || p.title || title;
    const colorsJson = JSON.stringify(p.colors || (p.color ? [p.color] : []));
    const imagesJson = JSON.stringify(p.images || []);
    const breakdownJson = JSON.stringify(p.truthScoreBreakdown || {});
    const specsJson = JSON.stringify(p.specs || {});
    const storesJson = JSON.stringify(p.stores || []);
    const bestPrice = p.currentBestPrice || (p.stores && p.stores.length ? Math.min(...p.stores.map(s => s.price || 999999)) : 999);

    insertProduct.run(
      p.id,
      title,
      name,
      p.brand || 'Generic',
      p.category || 'General',
      p.sku || p.id,
      p.rating || 4.5,
      p.reviewsCount || p.reviews_count || 100,
      p.featured ? 1 : 0,
      p.inStock !== false ? 1 : 0,
      p.chipset || null,
      p.material || null,
      p.color || null,
      colorsJson,
      imagesJson,
      p.description || '',
      p.truthScore || 85,
      breakdownJson,
      specsJson,
      storesJson,
      bestPrice,
      now,
      now
    );
  }

  // 3. Seed Orders (120 items)
  const insertOrder = db.prepare(`
    INSERT OR REPLACE INTO orders (
      id, customer_name, customer_email, product_id, product_name, quantity, total, status, payment_status, date, shipping_address
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const o of mockOrders || []) {
    insertOrder.run(
      o.id,
      o.customerName,
      o.customerEmail,
      o.productId,
      o.productName,
      o.quantity || 1,
      o.total || 0,
      o.status || 'Pending',
      o.paymentStatus || 'Paid',
      o.date || now,
      o.shippingAddress || ''
    );
  }

  // 4. Seed Customers (45 items)
  const insertCustomer = db.prepare(`
    INSERT OR REPLACE INTO customers (
      id, name, email, phone, status, total_spend, orders_count, join_date, location
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const c of mockCustomers || []) {
    insertCustomer.run(
      c.id,
      c.name,
      c.email,
      c.phone || '',
      c.status || 'Active',
      c.totalSpend || 0,
      c.ordersCount || 0,
      c.joinDate || '2024-01-01',
      c.location || ''
    );
  }

  // 5. Seed Bank Accounts
  const insertBank = db.prepare(`
    INSERT OR REPLACE INTO bank_accounts (
      id, user_id, bank_name, account_type, masked_number, routing_number, is_default, verified, linked_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const initialBanks = [
    {
      id: 'bank-hdfc-01',
      userId: 'usr-01',
      bankName: 'HDFC Bank',
      accountType: 'Salary Account',
      maskedNumber: '•••• 4289',
      routingNumber: 'HDFC0000128',
      isDefault: 1,
      verified: 1,
      linkedAt: '2024-01-15T10:00:00.000Z'
    },
    {
      id: 'bank-sbi-02',
      userId: 'usr-01',
      bankName: 'State Bank of India',
      accountType: 'Savings',
      maskedNumber: '•••• 9012',
      routingNumber: 'SBIN0004120',
      isDefault: 0,
      verified: 1,
      linkedAt: '2024-02-02T10:00:00.000Z'
    }
  ];

  for (const b of initialBanks) {
    insertBank.run(
      b.id,
      b.userId,
      b.bankName,
      b.accountType,
      b.maskedNumber,
      b.routingNumber,
      b.isDefault,
      b.verified,
      b.linkedAt
    );
  }

  // 6. Seed Transactions
  const insertTx = db.prepare(`
    INSERT OR REPLACE INTO transactions (
      id, user_id, date, type, amount, status, receipt_id, bank_details
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const initialTransactions = [
    {
      id: 'TRX-892104',
      userId: 'usr-01',
      date: '2026-03-14',
      type: 'Cashback Reward (Apple iPhone 16 Pro)',
      amount: 1199.00,
      status: 'Completed',
      receiptId: 'RCP-L89K2J',
      bankDetails: JSON.stringify({ bankName: 'flashcompare.ai Reward', maskedNumber: 'Instant ACH', accountType: 'Direct' })
    },
    {
      id: 'TRX-741920',
      userId: 'usr-01',
      date: '2026-03-08',
      type: 'Transfer to Bank (•••• 4289)',
      amount: -2500.00,
      status: 'Completed',
      receiptId: 'RCP-M98N21',
      bankDetails: JSON.stringify({ bankName: 'HDFC Bank', maskedNumber: '•••• 4289', accountType: 'Salary Account' })
    },
    {
      id: 'TRX-551029',
      userId: 'usr-01',
      date: '2026-02-27',
      type: 'Cashback Reward (boAt Nirvana Ion ANC)',
      amount: 229.00,
      status: 'Completed',
      receiptId: 'RCP-P11K99',
      bankDetails: JSON.stringify({ bankName: 'flashcompare.ai Reward', maskedNumber: 'Instant ACH', accountType: 'Direct' })
    }
  ];

  for (const tx of initialTransactions) {
    insertTx.run(
      tx.id,
      tx.userId,
      tx.date,
      tx.type,
      tx.amount,
      tx.status,
      tx.receiptId,
      tx.bankDetails
    );
  }

  // 7. Seed Watchlist & Price Alerts
  const insertWatchlist = db.prepare(`
    INSERT OR IGNORE INTO watchlist (user_id, product_id, created_at) VALUES (?, ?, ?)
  `);
  insertWatchlist.run('usr-01', 'apple-iphone-16-pro', now);
  insertWatchlist.run('usr-01', 'sony-wh-1000xm5', now);

  const insertAlert = db.prepare(`
    INSERT OR REPLACE INTO price_alerts (id, user_id, product_id, target_price, current_price, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  insertAlert.run('alt-101', 'usr-01', 'sony-wh-1000xm5', 26990.00, 28990.00, 'Active', now);

  // 8. Seed Audit Logs
  const insertAudit = db.prepare(`
    INSERT OR REPLACE INTO audit_logs (id, action, details, email, role, ip_address, user_agent, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertAudit.run('log_init_01', 'SYSTEM_INITIALIZED', 'Initial database schema and mock records seeded', 'system@flashcompare.ai', 'system', '127.0.0.1', 'Node.js SQLite Seeder', now);

  console.log(`[DB Seed] Done! Successfully seeded:
  - Users: ${initialUsers.length}
  - Products: ${defaultProducts.length}
  - Orders: ${mockOrders.length}
  - Customers: ${mockCustomers.length}
  - Bank Accounts: ${initialBanks.length}
  - Transactions: ${initialTransactions.length}
  `);
};

// If run directly: node server/seed.js
if (process.argv[1]?.endsWith('seed.js')) {
  seedDatabase({ force: process.argv.includes('--force') });
}
