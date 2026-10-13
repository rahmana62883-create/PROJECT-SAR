import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data directory
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'flashcompare.db');
const db = new DatabaseSync(dbPath);

// =========================================================================
// High-Performance SQLite Tuning for Sub-Millisecond Latency & Zero Locks
// =========================================================================
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA synchronous = NORMAL;
  PRAGMA foreign_keys = ON;
  PRAGMA temp_store = MEMORY;
  PRAGMA cache_size = -64000;
  PRAGMA busy_timeout = 5000;
  PRAGMA mmap_size = 268435456;
`);

// Initialize Tables and Performance B-Tree Indexes
export const initSchema = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'customer',
      tier TEXT,
      status TEXT NOT NULL DEFAULT 'Active',
      avatar TEXT,
      clearance_level TEXT,
      two_factor_code TEXT,
      cashback_balance REAL NOT NULL DEFAULT 342.50,
      joined_date TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      name TEXT,
      brand TEXT,
      category TEXT,
      sku TEXT,
      rating REAL DEFAULT 4.5,
      reviews_count INTEGER DEFAULT 0,
      featured INTEGER DEFAULT 0,
      in_stock INTEGER DEFAULT 1,
      chipset TEXT,
      material TEXT,
      color TEXT,
      colors TEXT,
      images TEXT,
      description TEXT,
      truth_score INTEGER DEFAULT 80,
      truth_score_breakdown TEXT,
      specs TEXT,
      stores TEXT,
      current_best_price REAL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      product_id TEXT,
      product_name TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      total REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'Pending',
      payment_status TEXT NOT NULL DEFAULT 'Paid',
      date TEXT NOT NULL,
      shipping_address TEXT
    );

    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      status TEXT NOT NULL DEFAULT 'Active',
      total_spend REAL NOT NULL DEFAULT 0,
      orders_count INTEGER NOT NULL DEFAULT 0,
      join_date TEXT NOT NULL,
      location TEXT
    );

    CREATE TABLE IF NOT EXISTS bank_accounts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      bank_name TEXT NOT NULL,
      account_type TEXT NOT NULL,
      masked_number TEXT NOT NULL,
      routing_number TEXT,
      is_default INTEGER DEFAULT 0,
      verified INTEGER DEFAULT 1,
      linked_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      date TEXT NOT NULL,
      type TEXT NOT NULL,
      amount REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'Completed',
      receipt_id TEXT,
      bank_details TEXT
    );

    CREATE TABLE IF NOT EXISTS watchlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      product_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      UNIQUE(user_id, product_id)
    );

    CREATE TABLE IF NOT EXISTS price_alerts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      product_id TEXT NOT NULL,
      target_price REAL NOT NULL,
      current_price REAL,
      status TEXT NOT NULL DEFAULT 'Active',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS chats (
      id TEXT PRIMARY KEY,
      visitor_id TEXT NOT NULL,
      sender TEXT NOT NULL,
      text TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      timestamp TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS moderation_reports (
      id TEXT PRIMARY KEY,
      msg_id TEXT NOT NULL,
      reason TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS blocked_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      blocked_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      action TEXT NOT NULL,
      details TEXT,
      email TEXT,
      role TEXT,
      ip_address TEXT,
      user_agent TEXT,
      timestamp TEXT NOT NULL
    );

    -- Optimized B-Tree Indexes for Instant Lookups & Filtering
    CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
    CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
    CREATE INDEX IF NOT EXISTS idx_products_current_best_price ON products(current_best_price);
    CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
    CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating);
    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
    CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
    CREATE INDEX IF NOT EXISTS idx_orders_date ON orders(date);
    CREATE INDEX IF NOT EXISTS idx_watchlist_user_id ON watchlist(user_id);
    CREATE INDEX IF NOT EXISTS idx_price_alerts_user_id ON price_alerts(user_id);
    CREATE INDEX IF NOT EXISTS idx_chats_visitor_id ON chats(visitor_id);
    CREATE INDEX IF NOT EXISTS idx_chats_timestamp ON chats(timestamp);
    CREATE INDEX IF NOT EXISTS idx_bank_accounts_user_id ON bank_accounts(user_id);
    CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
    CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp);
  `);
};

// Prepared Statement Cache for High-Throughput Reusability
const statementCache = new Map();
export const getStatement = (sql) => {
  let stmt = statementCache.get(sql);
  if (!stmt) {
    stmt = db.prepare(sql);
    statementCache.set(sql, stmt);
  }
  return stmt;
};

// Safe Atomic Transaction Runner
export const runTransaction = (fn) => {
  db.exec('BEGIN IMMEDIATE TRANSACTION;');
  try {
    const result = fn();
    db.exec('COMMIT;');
    return result;
  } catch (err) {
    try {
      db.exec('ROLLBACK;');
    } catch {
      // rollback error ignore
    }
    throw err;
  }
};

// Initialize schema on load
initSchema();

export default db;
