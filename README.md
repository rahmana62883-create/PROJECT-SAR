# FlashCompare AI — Luxury Shopping Intelligence & Autonomous Market Arbitrage

A modern e-commerce intelligence and autonomous price arbitrage platform inspired by Apple's minimal luxury design aesthetic. Built with vanilla HTML5, CSS3, and modern modular JavaScript (`window.FC` architecture).

---

## Key Features & Architecture

### 1. Apple-Inspired Minimal Luxury Design System
- **Surfaces & Glassmorphism**: Translucent frosted glass sticky navigation with `backdrop-filter: saturate(180%) blur(20px)`, generous spacing, crisp borders, and refined multi-layer elevation shadows.
- **Complete Light & Dark Theme**: Seamless toggle between pristine Apple white/soft gray surfaces (`#fbfbfd`, `#ffffff`, `#f5f5f7`) and sleek OLED dark mode (`#000000`, `#161617`, `#1c1c1e`).
- **Typography & Responsive Layout**: SF Pro / Inter font system, fluid typography, mobile hamburger drawer, and clean accessibility focus outlines.

### 2. Multi-Store Arbitrage & PDP Intelligence
- **4-Ring Apple Activity Truth Gauge**: Real-time multi-dimensional scoring evaluating Price Health, Inventory Velocity, Seller Credibility, and Verified Review Sentiment.
- **180-Day Volatility SVG Chart**: Responsive SVG visualization with price floor markers and historical trajectory.
- **Explainable "Buy Now / Wait" Engine**: Actionable decision verdicts with confidence percentage and AI synthesized rationale bullets.
- **Total Ownership Cost Matrix**: Transparent price breakdown comparing base prices, shipping speeds, estimated sales taxes (7.5%), and verified coupon codes across national retailers (Amazon, Best Buy, B&H, Walmart, Apple).

### 3. Customer Account, Watchlist & Price Drop Alerts
- **Profile Management**: Customer dashboard (Alex Thorne / custom users) with active watchlist and price drop notifications.
- **Autonomous Price Alert Triggers**: Set target floor prices; platform evaluates alerts on live ticks and issues toast notices and inbox alerts.

### 4. Wallet & Bank Transfers (Instant ACH Simulation)
- **Bank Account Linking**: Link US checking or high-yield savings accounts with automatic number masking (`•••• 4289`).
- **5-Step Withdrawal Flow**: 
  1. Amount selection & bank account picker ($25, $50, $100, or Full Balance).
  2. Review & fee transparency ($0.00 fee guarantee).
  3. Security Verification: 4-digit OTP challenge modal (`Demo Code: 1234`).
  4. Status Lifecycle: Transitions from `Processing` to `Completed` (simulated 4-second instant ACH settlement).
  5. Printable / PDF-ready official transaction receipt.

### 5. Admin Intelligence Command Center
- **Access**: Sign in as `admin@flashcompare.ai` (Passcode: `admin2026`) or click the **1-Click Admin Demo Login**.
- **Metrics Dashboard**: Real-time totals for catalog items, retailer offers, average price, active users, and alerts.
- **Product Catalog CRUD**: Create, edit, and delete products with local image drag-and-drop / file upload converting images into local Base64 data URLs.
- **User Account Management**: Toggle user status between `Active` and `Suspended`.
- **Security Audit Trail**: Chronological event logs for compliance and accountability.

### 6. Contextual Flash AI Shopping Copilot
- **Floating Intelligence Orb**: Located at the bottom right with ambient glowing pulse and collision-free z-indexing.
- **Context-Aware Recommendations**: Detects active product PDP, catalog, or wallet context and provides instant pricing citations and coupon discovery.

### 7. ⌘K Command Palette & Live Market Simulation
- **Global Command Palette**: Press `⌘K` or `Ctrl+K` from any screen to search devices, navigate views, trigger demo resets, or toggle theme modes.
- **Autonomous Price Ticks**: Background simulation ticks periodically simulate live retail price movements.

---

## Project Structure

```
PROJECT SAR/
├── index.html                     # Main application shell with Apple minimal layout
├── style.css                      # Apple-inspired luxury CSS system (Light & Dark mode)
├── package.json                   # NPM configuration with start and serve scripts
├── serve.ps1                      # Windows PowerShell lightweight HTTP server
├── README.md                      # Documentation & architecture guide
└── js/
    ├── mockData.js                # 12+ curated flagship products, users, bank accounts, seed data
    ├── state.js                   # Reactive state manager with LocalStorage synchronization
    ├── main.js                    # Bootstrapper, router, modal bindings, theme listeners
    ├── services/
    │   ├── authService.js         # Customer & Admin auth, role checks, audit logging
    │   ├── walletService.js       # Bank linking, withdrawal validation, OTP, transaction receipts
    │   ├── adminService.js        # Product CRUD, Base64 image reader, metrics, demo reset
    │   └── liveSimulationService.js # Background price fluctuation ticks & toast notifications
    └── ui/
        ├── navigation.js          # Navigation bar, route dispatcher, breadcrumbs, ⌘K command overlay
        ├── homeView.js            # Apple-style landing view, category ribbon, 4-ring explainer
        ├── catalogView.js         # Multi-faceted filter sidebar, search, and sort grid
        ├── productDetailView.js   # Multi-image gallery, 4-ring truth gauge, 180-day chart, PDP table
        ├── comparisonView.js      # Side-by-side spec matrix with diff highlighting
        ├── walletView.js          # Wallet balance, linked banks, 5-step withdrawal, receipt modal
        ├── accountView.js         # Customer profile, watchlist, price alerts, preferences
        ├── adminView.js           # Admin metrics, product editor modal with image upload, audit trail
        └── aiAssistant.js         # Contextual Flash AI assistant drawer with quick chips
```

---

## How to Run Full-Stack (Frontend + Backend + SQLite Database)

### 1. Unified Full-Stack Runner (Recommended)
```bash
npm run dev
```
This runs both the **Express SQLite backend** (`http://localhost:5000`) and the **Vite React frontend** (`http://localhost:5173`) concurrently. Vite automatically proxies `/api` requests to the backend server.

### 2. Standalone Backend Server
```bash
npm run server
```
Runs the Express SQLite server on port 5000.

### 3. Re-seed SQLite Database
```bash
npm run seed
```
Re-populates `server/data/flashcompare.db` with all 312+ products, demo accounts, orders, and CRM records.

### 4. Run Backend Integration Tests
```bash
node server/test-api.js
```
Runs the end-to-end integration test suite across all 10 API route domains.

---

## Demo Credentials

- **Customer Demo Account**:
  - Email: `alex.thorne@example.com`
  - Password: `demo123`
  - *Or click "Customer Demo (Alex)" in the sign-in modal.*
- **Admin Demo Account**:
  - Email: `admin@flashcompare.ai`
  - Password: `admin2026`
  - *Or click "Admin Demo (Elena)" in the sign-in modal.*
- **Withdrawal OTP Verification Code**:
  - `1234`
