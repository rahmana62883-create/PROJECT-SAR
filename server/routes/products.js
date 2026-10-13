import express from 'express';
import db, { getStatement } from '../db.js';
import { seedDatabase } from '../seed.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

const safeJsonParse = (str, fallback = null) => {
  if (!str || typeof str !== 'string') return fallback;
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
};

export const formatProduct = (p) => {
  if (!p) return null;
  return {
    id: p.id,
    title: p.title || p.name || 'Untitled',
    name: p.name || p.title || 'Untitled',
    brand: p.brand || 'Generic',
    category: p.category || 'General',
    sku: p.sku || p.id,
    rating: Number(p.rating) || 4.5,
    reviewsCount: Number(p.reviews_count) || 0,
    featured: Boolean(p.featured),
    inStock: Boolean(p.in_stock),
    chipset: p.chipset || null,
    material: p.material || null,
    color: p.color || null,
    colors: safeJsonParse(p.colors, []),
    images: safeJsonParse(p.images, []),
    description: p.description || '',
    truthScore: Number(p.truth_score) || 80,
    truthScoreBreakdown: safeJsonParse(p.truth_score_breakdown, { buildQuality: 85, performance: 85, reliability: 85, value: 85 }),
    specs: safeJsonParse(p.specs, {}),
    stores: safeJsonParse(p.stores, []),
    currentBestPrice: Number(p.current_best_price) || 0,
    createdAt: p.created_at,
    updatedAt: p.updated_at
  };
};

// 1. Get Distinct Categories (Cached & Fast Index Scan)
router.get('/categories', (req, res) => {
  try {
    const rows = getStatement('SELECT DISTINCT category FROM products WHERE category IS NOT NULL AND category != "" ORDER BY category ASC').all();
    res.json(rows.map(r => r.category));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get Distinct Brands
router.get('/brands', (req, res) => {
  try {
    const rows = getStatement('SELECT DISTINCT brand FROM products WHERE brand IS NOT NULL AND brand != "" ORDER BY brand ASC').all();
    res.json(rows.map(r => r.brand));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get All Products (with multi-faceted filters, instant sorting & pagination)
router.get('/', (req, res) => {
  try {
    const { search, category, brand, featured, sort, limit, offset } = req.query;
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (LOWER(title) LIKE ? OR LOWER(name) LIKE ? OR LOWER(brand) LIKE ? OR LOWER(category) LIKE ?)';
      const term = `%${search.toLowerCase().trim()}%`;
      params.push(term, term, term, term);
    }

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (brand && brand !== 'All') {
      query += ' AND brand = ?';
      params.push(brand);
    }

    if (featured === 'true' || featured === '1') {
      query += ' AND featured = 1';
    }

    // Dynamic sorting
    switch (sort) {
      case 'price-desc':
        query += ' ORDER BY current_best_price DESC';
        break;
      case 'rating':
        query += ' ORDER BY rating DESC, reviews_count DESC';
        break;
      case 'truthScore':
        query += ' ORDER BY truth_score DESC';
        break;
      case 'newest':
        query += ' ORDER BY created_at DESC';
        break;
      case 'price-asc':
      default:
        query += ' ORDER BY current_best_price ASC';
        break;
    }

    if (limit) {
      query += ' LIMIT ?';
      params.push(Math.min(1000, Math.max(1, Number(limit))));
      if (offset) {
        query += ' OFFSET ?';
        params.push(Math.max(0, Number(offset)));
      }
    }

    const rows = db.prepare(query).all(...params);
    res.json(rows.map(formatProduct));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get Single Product by ID
router.get('/:id', (req, res) => {
  try {
    const row = getStatement('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!row) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(formatProduct(row));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Create Product (Admin / Owner Authorization Required)
router.post('/', requireAuth, requireRole(['admin', 'owner']), (req, res) => {
  try {
    const body = req.body;
    const id = body.id || (body.title || body.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36);
    const now = new Date().toISOString();

    const title = body.title || body.name || 'Untitled Product';
    const name = body.name || body.title || title;
    const colors = JSON.stringify(body.colors || (body.color ? [body.color] : []));
    const images = JSON.stringify(body.images || []);
    const breakdown = JSON.stringify(body.truthScoreBreakdown || { buildQuality: 85, performance: 85, reliability: 85, value: 85 });
    const specs = JSON.stringify(body.specs || {});
    const stores = JSON.stringify(body.stores || []);
    const bestPrice = body.currentBestPrice || (body.stores && body.stores.length ? Math.min(...body.stores.map(s => s.price || 999999)) : 999);

    db.prepare(`
      INSERT INTO products (
        id, title, name, brand, category, sku, rating, reviews_count, featured, in_stock,
        chipset, material, color, colors, images, description, truth_score,
        truth_score_breakdown, specs, stores, current_best_price, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      title,
      name,
      body.brand || 'Generic',
      body.category || 'General',
      body.sku || id,
      Number(body.rating) || 4.5,
      Number(body.reviewsCount) || 0,
      body.featured ? 1 : 0,
      body.inStock !== false ? 1 : 0,
      body.chipset || null,
      body.material || null,
      body.color || null,
      colors,
      images,
      body.description || '',
      Number(body.truthScore) || 85,
      breakdown,
      specs,
      stores,
      bestPrice,
      now,
      now
    );

    const created = getStatement('SELECT * FROM products WHERE id = ?').get(id);
    res.status(201).json(formatProduct(created));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Update Product (Admin / Owner Authorization Required)
router.put('/:id', requireAuth, requireRole(['admin', 'owner']), (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const existing = getStatement('SELECT * FROM products WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const now = new Date().toISOString();
    const title = body.title !== undefined ? body.title : existing.title;
    const name = body.name !== undefined ? body.name : existing.name;
    const brand = body.brand !== undefined ? body.brand : existing.brand;
    const category = body.category !== undefined ? body.category : existing.category;
    const sku = body.sku !== undefined ? body.sku : existing.sku;
    const rating = body.rating !== undefined ? Number(body.rating) : existing.rating;
    const reviewsCount = body.reviewsCount !== undefined ? Number(body.reviewsCount) : existing.reviews_count;
    const featured = body.featured !== undefined ? (body.featured ? 1 : 0) : existing.featured;
    const inStock = body.inStock !== undefined ? (body.inStock ? 1 : 0) : existing.in_stock;
    const chipset = body.chipset !== undefined ? body.chipset : existing.chipset;
    const material = body.material !== undefined ? body.material : existing.material;
    const color = body.color !== undefined ? body.color : existing.color;
    const colors = body.colors !== undefined ? JSON.stringify(body.colors) : existing.colors;
    const images = body.images !== undefined ? JSON.stringify(body.images) : existing.images;
    const description = body.description !== undefined ? body.description : existing.description;
    const truthScore = body.truthScore !== undefined ? Number(body.truthScore) : existing.truth_score;
    const breakdown = body.truthScoreBreakdown !== undefined ? JSON.stringify(body.truthScoreBreakdown) : existing.truth_score_breakdown;
    const specs = body.specs !== undefined ? JSON.stringify(body.specs) : existing.specs;
    const stores = body.stores !== undefined ? JSON.stringify(body.stores) : existing.stores;
    const bestPrice = body.currentBestPrice !== undefined ? Number(body.currentBestPrice) : existing.current_best_price;

    db.prepare(`
      UPDATE products SET
        title = ?, name = ?, brand = ?, category = ?, sku = ?, rating = ?, reviews_count = ?,
        featured = ?, in_stock = ?, chipset = ?, material = ?, color = ?, colors = ?, images = ?,
        description = ?, truth_score = ?, truth_score_breakdown = ?, specs = ?, stores = ?,
        current_best_price = ?, updated_at = ?
      WHERE id = ?
    `).run(
      title, name, brand, category, sku, rating, reviewsCount,
      featured, inStock, chipset, material, color, colors, images,
      description, truthScore, breakdown, specs, stores,
      bestPrice, now, id
    );

    const updated = getStatement('SELECT * FROM products WHERE id = ?').get(id);
    res.json(formatProduct(updated));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Delete Product (Admin / Owner Authorization Required)
router.delete('/:id', requireAuth, requireRole(['admin', 'owner']), (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM products WHERE id = ?').run(id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ success: true, deletedId: id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Reset Products to Default Catalog Seed (Owner Clearance Required)
router.post('/reset', requireAuth, requireRole(['owner']), (req, res) => {
  try {
    seedDatabase({ force: true });
    const count = getStatement('SELECT COUNT(*) as count FROM products').get().count;
    res.json({ success: true, count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
