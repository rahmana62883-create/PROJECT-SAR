import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { seedDatabase } from './seed.js';

import authRouter from './routes/auth.js';
import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';
import customersRouter from './routes/customers.js';
import walletRouter from './routes/wallet.js';
import watchlistRouter from './routes/watchlist.js';
import chatsRouter from './routes/chats.js';
import systemRouter from './routes/system.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure database is initialized & seeded on startup
try {
  seedDatabase();
} catch (err) {
  console.error('[Database Init Error]:', err.message);
}

// Middleware - Configurable CORS for production deployment
const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({
  origin: corsOrigin === '*' ? '*' : corsOrigin.split(',').map(o => o.trim()),
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id']
}));


// Generous limit for product base64 image uploads
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== 'test') {
      console.log(`[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/customers', customersRouter);
app.use('/api/wallet', walletRouter);
app.use('/api/watchlist', watchlistRouter);
app.use('/api/chats', chatsRouter);
app.use('/api/system', systemRouter);

// Root & Health check
app.get('/api', (req, res) => {
  res.json({
    name: 'FlashCompare AI Backend API',
    version: '2.0.0',
    status: 'online',
    database: 'SQLite (Embedded node:sqlite)',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[API Server Error]:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

const server = app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 FlashCompare AI Backend Server running on http://localhost:${PORT}`);
  console.log(`📡 API Endpoints live at http://localhost:${PORT}/api`);
  console.log(`💾 SQLite Database connected: server/data/flashcompare.db`);
  console.log(`======================================================\n`);
});

export default app;
