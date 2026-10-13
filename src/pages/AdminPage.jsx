import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { useWallet } from '../context/WalletContext';

export const AdminPage = () => {
  const { users } = useAuth();
  const {
    products,
    saveProduct,
    deleteProduct,
    openProductEditor,
    showToast
  } = useApp();
  const { wallet } = useWallet();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Purge & Export Feedback States
  const [isPurging, setIsPurging] = useState(false);
  const [isPurged, setIsPurged] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // New Specimen Form State
  const [specimenName, setSpecimenName] = useState('');
  const [specimenSku, setSpecimenSku] = useState('');
  const [specimenMsrp, setSpecimenMsrp] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [previewFileName, setPreviewFileName] = useState('');
  const fileInputRef = useRef(null);
  const ingestFormRef = useRef(null);

  // Circuit Breakers State
  const [breakers, setBreakers] = useState({
    autoBuy: true,
    feedIngestion: true,
    settlementRail: true
  });

  // Operators State
  const [operators, setOperators] = useState([
    {
      id: 'op-1',
      name: 'Alex Thorne',
      initials: 'AT',
      role: 'Lead Protocol Admin • 2 Linked ACH',
      spendable: '$1,840.50',
      active: true,
      avatarBg: 'bg-primary text-on-primary'
    },
    {
      id: 'op-2',
      name: 'Elena Rostova',
      initials: 'ER',
      role: 'SecOps Auditor • 1 Linked ACH',
      spendable: '$490.00',
      active: true,
      avatarBg: 'bg-cool-wash text-primary'
    },
    {
      id: 'op-3',
      name: 'Marcus Vance',
      initials: 'MV',
      role: 'Treasury Operator • 3 Linked ACH',
      spendable: '$12,210.00',
      active: false,
      avatarBg: 'bg-cool-wash text-primary'
    }
  ]);

  // Purge Cache action
  const handlePurgeCache = () => {
    setIsPurging(true);
    showToast('Cache Invalidation', 'Broadcasting purge command to 48 edge CDN PoPs...', 'info');
    setTimeout(() => {
      setIsPurging(false);
      setIsPurged(true);
      showToast('Cache Purged', 'All 48 edge nodes successfully flushed.', 'success');
      setTimeout(() => setIsPurged(false), 2400);
    }, 900);
  };

  // Export Audit CSV
  const handleExportAudit = () => {
    setIsExporting(true);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Timestamp,Event,Details,Status\n' +
      '14:02:18 UTC,FEDNOW_ACH_WITHDRAWAL,$2450.00 liquidated to Escrow Primary Vault #8012,SUCCESS\n' +
      '13:58:44 UTC,PRICE_FLOOR_BREACH_HIT,Amazon Prime SKU-A17P dipped below target $1150.00 threshold,LOGGED\n' +
      '13:41:02 UTC,COUPON_PAYLOAD_DECRYPTED,Zero-knowledge proof validated for merchant affiliate key,VERIFIED\n' +
      '12:20:00 UTC,ADMIN_SIGNIN_SUCCESS,Alex Thorne authenticated via Hardware YubiKey OTP,AUTHORIZED\n';

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `flashcompare_audit_trail_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Export Completed', 'Audit trail exported as cryptographic CSV report.', 'success');
    setTimeout(() => setIsExporting(false), 1800);
  };

  // 1-Click Catalog Ingestion button scrolls to form
  const handleScrollToIngest = () => {
    if (ingestFormRef.current) {
      ingestFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const nameInput = document.getElementById('input-specimen-name');
      if (nameInput) nameInput.focus();
    }
  };

  // File drop & select handling
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setPreviewImage(evt.target.result);
        setPreviewFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  // Register New Specimen
  const handleRegisterSpecimen = (e) => {
    e.preventDefault();
    if (!specimenName.trim() || !specimenMsrp) {
      showToast('Validation Error', 'Hardware label and Floor MSRP are required.', 'error');
      return;
    }

    const priceNum = parseFloat(specimenMsrp);
    const newSpecimen = {
      id: specimenSku.trim().toLowerCase() || `sku-${Date.now().toString(36)}`,
      name: specimenName.trim(),
      title: specimenName.trim(),
      category: selectedCategory !== 'all' ? selectedCategory : 'Smartphones',
      currentBestPrice: priceNum,
      originalMSRP: Math.round(priceNum * 1.12),
      priceScore: 94,
      stockHealth: 98,
      sellerCredibility: 95,
      sentimentScore: 92,
      images: [
        previewImage ||
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAhJNOE5uIjv0HC7BXexJihgVxEtlT7CQHZhJBgvB2PwcXMc4N00kd3M10A72DBhCqB2dBnaTpxQDn5TSXY0UPS_RqGoD2pxMtsRJGxK9WwCZ5lBV7i03kgPpU5I0uTEyh7SqM1AxqrhUsa1mt-D9wkCJG3yANAUy_AlWTbQ48-PHLSMaK-QrorsrsSjCOCgG1KGiQmvK9jnBzCNfbie4cB04In3nvEt8WmIPnuvl0EF3O4xDECaD6B'
      ],
      offers: [
        {
          retailer: 'Amazon Prime',
          price: priceNum,
          shipping: 'Free Next-Day Delivery',
          deliveryDays: 1,
          returnDays: 30,
          coupon: null,
          inStock: true
        }
      ]
    };

    try {
      saveProduct(newSpecimen);
      showToast('Specimen Registered', `${specimenName} successfully registered to global mesh!`, 'success');
      setSpecimenName('');
      setSpecimenSku('');
      setSpecimenMsrp('');
      setPreviewImage(null);
      setPreviewFileName('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      showToast('Ingestion Error', err.message, 'error');
    }
  };

  // Toggle Operator
  const toggleOperator = (id) => {
    setOperators(prev =>
      prev.map(op => {
        if (op.id === id) {
          const updated = !op.active;
          showToast(
            'ACL Policy Modified',
            `${op.name} session clearance is now ${updated ? 'ACTIVE' : 'SUSPENDED'}.`,
            updated ? 'success' : 'warning'
          );
          return { ...op, active: updated };
        }
        return op;
      })
    );
  };

  // Toggle Breakers
  const toggleBreaker = (key, label) => {
    setBreakers(prev => {
      const updated = !prev[key];
      showToast(
        updated ? 'Circuit Breaker Armed' : 'Circuit Breaker Tripped',
        `${label} is now ${updated ? 'ONLINE & ACTIVE' : 'MUTED / SAFEGUARD ENGAGED'}.`,
        updated ? 'success' : 'warning'
      );
      return { ...prev, [key]: updated };
    });
  };

  // Filter Catalog Products
  const filteredProducts = products.filter(prod => {
    const matchesSearch =
      prod.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      (prod.category && prod.category.toLowerCase().includes(selectedCategory.toLowerCase()));

    return matchesSearch && matchesCategory;
  });

  const displayProducts = filteredProducts.slice(0, 10);

  return (
    <div className="flex flex-col w-full bg-surface min-h-screen text-on-surface antialiased font-body">
      
      {/* SECTION 1: HEADER & LIVE TELEMETRY HERO */}
      <section className="w-full bg-paper px-4 sm:px-6 md:px-margin pt-space-xl pb-space-lg border-b border-hairline/60">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-space-lg">
          
          {/* Overline & Breadcrumb Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-xs font-micro text-micro tracking-wider uppercase text-secondary">
              <span className="font-medium text-electric-blue">Enterprise Intelligence Core</span>
              <span className="text-hairline">/</span>
              <span className="text-on-surface">Command Center</span>
              <span className="text-hairline">•</span>
              <span className="text-secondary font-mono">v4.19-PROD</span>
            </div>

            {/* Live System Node Status Tag */}
            <div className="flex items-center gap-space-sm px-space-md py-1.5 rounded-full bg-canvas text-secondary border border-hairline/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-blue"></span>
              </span>
              <span className="font-caption text-caption text-primary font-medium">System Status: Nominal</span>
              <span className="text-hairline">|</span>
              <span className="font-caption text-caption text-secondary">48 Nodes Active (248ms)</span>
              <span className="text-hairline">|</span>
              <span className="font-caption text-caption text-ember font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">verified_user</span> Circuit Breaker Armed
              </span>
            </div>
          </div>

          {/* Main Heading & Primary Controls Cluster */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
            <div className="max-w-2xl">
              <h1 className="font-heading-sm text-3xl sm:text-heading-sm text-primary tracking-tight font-semibold">
                Autonomous Market Telemetry &amp; Admin Console
              </h1>
              <p className="font-body-sm text-body-sm text-secondary mt-space-xs leading-relaxed">
                Real-time arbitrage execution, high-frequency merchant node sync, and cryptographic liquidity reserve governance.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-space-sm">
              <button
                className="h-11 px-space-lg rounded-full bg-canvas text-primary font-body-sm text-body-sm font-medium hover:bg-cool-wash transition-colors flex items-center gap-space-xs cursor-pointer border border-hairline/40"
                id="btn-purge-cache"
                onClick={handlePurgeCache}
                disabled={isPurging}
                type="button"
              >
                <span className={`material-symbols-outlined text-[18px] ${isPurging ? 'animate-spin' : isPurged ? 'text-electric-blue' : ''}`}>
                  {isPurged ? 'done' : 'cached'}
                </span>
                <span>{isPurging ? 'Purging 48 Edges...' : isPurged ? 'Cache Purged' : 'Purge Edge Cache'}</span>
              </button>

              <button
                className="h-11 px-space-lg rounded-full bg-canvas text-primary font-body-sm text-body-sm font-medium hover:bg-cool-wash transition-colors flex items-center gap-space-xs cursor-pointer border border-hairline/40"
                id="btn-export-audit"
                onClick={handleExportAudit}
                disabled={isExporting}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isExporting ? 'download_done' : 'ios_share'}
                </span>
                <span>{isExporting ? 'Exported CSV' : 'Export Audit Trail'}</span>
              </button>

              <button
                className="h-11 px-space-lg rounded-full bg-electric-blue text-on-primary font-body-sm text-body-sm font-medium hover:opacity-95 transition-opacity flex items-center gap-space-xs shadow-sm cursor-pointer"
                id="btn-open-ingest"
                onClick={handleScrollToIngest}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">bolt</span>
                <span>1-Click Catalog Ingestion</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: 4-COLUMN REAL-TIME KPI CARDS (Pale Gray Canvas Band) */}
      <section className="w-full bg-canvas px-4 sm:px-6 md:px-margin py-space-xl border-b border-hairline/60">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            
            {/* KPI 1: Total Catalog Items */}
            <div className="bg-paper rounded-[28px] p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-hairline/50">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-caption text-caption text-secondary uppercase tracking-wider">Total Catalog Items</span>
                  <span className="w-8 h-8 rounded-full bg-canvas flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                  </span>
                </div>
                <div className="font-heading-sm text-heading-sm text-primary tracking-tight font-semibold">
                  {products.length || 148}
                </div>
                <div className="font-caption text-caption text-secondary mt-1">Verified Hardware SKUs</div>
              </div>
              <div className="mt-space-lg pt-space-sm flex items-center justify-between text-secondary border-t border-hairline/40">
                <span className="font-micro text-micro text-electric-blue font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span> +12 added today
                </span>
                <span className="font-micro text-micro font-mono">99.8% parity</span>
              </div>
            </div>

            {/* KPI 2: Live Retailer Feeds */}
            <div className="bg-paper rounded-[28px] p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-hairline/50">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-caption text-caption text-secondary uppercase tracking-wider">Live Retailer Feeds</span>
                  <span className="w-8 h-8 rounded-full bg-canvas flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">hub</span>
                  </span>
                </div>
                <div className="font-heading-sm text-heading-sm text-primary tracking-tight font-semibold">48</div>
                <div className="font-caption text-caption text-secondary mt-1">Connected Scraper Hubs</div>
              </div>
              <div className="mt-space-lg pt-space-sm flex items-center justify-between text-secondary border-t border-hairline/40">
                <span className="font-micro text-micro text-secondary truncate max-w-[180px]">Amazon, Best Buy, B&amp;H</span>
                <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse"></span>
              </div>
            </div>

            {/* KPI 3: Cashback Reserve */}
            <div className="bg-paper rounded-[28px] p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-hairline/50">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-caption text-caption text-secondary uppercase tracking-wider">Cashback Reserve</span>
                  <span className="w-8 h-8 rounded-full bg-canvas flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">payments</span>
                  </span>
                </div>
                <div className="font-heading-sm text-heading-sm text-primary tracking-tight font-semibold">
                  $24,850
                </div>
                <div className="font-caption text-caption text-secondary mt-1">Escrowed FedNow Pool</div>
              </div>
              <div className="mt-space-lg pt-space-sm flex items-center justify-between text-secondary border-t border-hairline/40">
                <span className="font-micro text-micro text-secondary">Zero dispute claims</span>
                <span className="font-micro text-micro font-mono text-primary font-medium">Instant ACH</span>
              </div>
            </div>

            {/* KPI 4: Autonomous Radars */}
            <div className="bg-paper rounded-[28px] p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-hairline/50">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-caption text-caption text-secondary uppercase tracking-wider">Autonomous Radars</span>
                  <span className="w-8 h-8 rounded-full bg-canvas flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">radar</span>
                  </span>
                </div>
                <div className="font-heading-sm text-heading-sm text-primary tracking-tight font-semibold">1,842</div>
                <div className="font-caption text-caption text-secondary mt-1">Active Arbitrage Triggers</div>
              </div>
              <div className="mt-space-lg pt-space-sm flex items-center justify-between text-secondary border-t border-hairline/40">
                <span className="font-micro text-micro text-electric-blue font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">flash_on</span> 428 routed (7d)
                </span>
                <span className="font-micro text-micro font-mono">&lt;62ms avg</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: PRODUCT CATALOG CRUD & INGESTION (Pure White Band) */}
      <section className="w-full bg-paper px-4 sm:px-6 md:px-margin py-space-xl border-b border-hairline/60">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-space-lg">
          
          {/* Section Title & Filter Ribbon */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div>
              <span className="font-micro text-micro uppercase tracking-wider text-secondary">Catalog Management</span>
              <h2 className="font-subheading text-2xl sm:text-subheading text-primary font-semibold">
                Hardware Specimen Registry
              </h2>
            </div>

            {/* Search Bar and Category Pills */}
            <div className="flex flex-wrap items-center gap-space-xs">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-secondary">
                  search
                </span>
                <input
                  className="h-10 pl-9 pr-space-md rounded-full bg-canvas font-caption text-caption text-primary placeholder-secondary focus:outline-none focus:bg-cool-wash transition-colors w-60 border border-hairline/40"
                  id="catalog-search-input"
                  placeholder="Search SKU, Chipset, Model..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-1 p-1 bg-canvas rounded-full border border-hairline/40">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'smartphones', label: 'Smartphones' },
                  { id: 'audio', label: 'Audio' },
                  { id: 'laptops', label: 'Laptops' },
                  { id: 'consoles', label: 'Consoles' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`catalog-filter-btn px-space-md py-1.5 rounded-full font-caption text-caption font-medium transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-paper text-primary shadow-sm'
                        : 'text-secondary hover:text-primary'
                    }`}
                    type="button"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Layout: Table (8 cols) + Side Ingestion Pod (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            
            {/* Inventory Table (8 Cols) */}
            <div className="lg:col-span-8 bg-canvas rounded-[28px] p-space-md overflow-hidden border border-hairline/50">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="font-micro text-micro uppercase tracking-wider text-secondary border-b border-hairline/60">
                      <th className="py-space-sm px-space-md font-medium">Specimen</th>
                      <th className="py-space-sm px-space-md font-medium">Floor / MSRP</th>
                      <th className="py-space-sm px-space-md font-medium">Merchant Hub</th>
                      <th className="py-space-sm px-space-md font-medium">Truth Score</th>
                      <th className="py-space-sm px-space-md font-medium">State</th>
                      <th className="py-space-sm px-space-md font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="font-caption text-caption divide-y divide-hairline/30" id="catalog-table-body">
                    {displayProducts.map((product, idx) => {
                      const bestOffer = product.offers?.[0] || {};
                      const floor = product.currentBestPrice || 0;
                      const msrp = product.originalMSRP || Math.round(floor * 1.15);
                      const truthScore = product.priceScore || 92;

                      return (
                        <tr
                          key={product.id || idx}
                          className="specimen-row bg-paper rounded-2xl transition-colors hover:bg-surface-container-low"
                        >
                          {/* Specimen Info */}
                          <td className="py-3.5 px-space-md rounded-l-2xl">
                            <div className="flex items-center gap-space-sm">
                              <div className="w-12 h-12 rounded-xl bg-canvas flex-shrink-0 flex items-center justify-center overflow-hidden border border-hairline/40">
                                <img
                                  className="w-full h-full object-cover"
                                  alt={product.name}
                                  src={
                                    product.images?.[0] ||
                                    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=120&q=80'
                                  }
                                />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="font-medium text-primary truncate max-w-[180px]">
                                  {product.name}
                                </span>
                                <div className="flex items-center gap-1.5 font-micro text-micro text-secondary">
                                  <span className="font-mono uppercase">{product.id.slice(0, 14)}</span>
                                  <span>•</span>
                                  <span className="text-primary font-medium">{product.category || 'Hardware'}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Floor / MSRP */}
                          <td className="py-3.5 px-space-md whitespace-nowrap">
                            <div className="font-medium text-primary font-mono">
                              ${floor.toFixed(2)}
                            </div>
                            <div className="font-micro text-micro text-secondary line-through font-mono">
                              ${msrp.toFixed(2)}
                            </div>
                          </td>

                          {/* Merchant Hub */}
                          <td className="py-3.5 px-space-md whitespace-nowrap">
                            <div className="flex items-center gap-1.5 text-primary">
                              <span className="w-2 h-2 rounded-full bg-electric-blue"></span>
                              <span className="font-medium">{bestOffer.retailer || 'Amazon Prime'}</span>
                            </div>
                            <span className="font-micro text-micro text-secondary">
                              {idx % 2 === 0 ? 'Direct API' : 'Partner Scraper'}
                            </span>
                          </td>

                          {/* Truth Score */}
                          <td className="py-3.5 px-space-md whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-medium text-primary">{truthScore}</span>
                              <span className="text-secondary text-micro font-mono">/100</span>
                            </div>
                            <div className="w-16 h-1 rounded-full bg-cool-wash overflow-hidden mt-1">
                              <div
                                className="h-full bg-electric-blue rounded-full transition-all"
                                style={{ width: `${truthScore}%` }}
                              ></div>
                            </div>
                          </td>

                          {/* State */}
                          <td className="py-3.5 px-space-md whitespace-nowrap">
                            {idx === 2 ? (
                              <span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-micro text-micro font-medium">
                                Stock Alert
                              </span>
                            ) : idx === 1 ? (
                              <span className="px-2.5 py-1 rounded-full bg-canvas text-secondary font-micro text-micro font-medium">
                                Syncing
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full bg-canvas text-primary font-micro text-micro font-medium">
                                Active
                              </span>
                            )}
                          </td>

                          {/* Action Buttons */}
                          <td className="py-3.5 px-space-md rounded-r-2xl text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                className="w-8 h-8 rounded-full hover:bg-canvas text-secondary hover:text-primary flex items-center justify-center transition-colors cursor-pointer"
                                title="Inspect Feeds"
                                type="button"
                                onClick={() =>
                                  showToast(
                                    'Feed Telemetry',
                                    `Audited 48 retailer nodes for ${product.name}. Latency: 18ms.`,
                                    'info'
                                  )
                                }
                              >
                                <span className="material-symbols-outlined text-[16px]">visibility</span>
                              </button>

                              <button
                                className="w-8 h-8 rounded-full hover:bg-canvas text-secondary hover:text-primary flex items-center justify-center transition-colors cursor-pointer"
                                title="Edit Specimen"
                                type="button"
                                onClick={() => openProductEditor(product)}
                              >
                                <span className="material-symbols-outlined text-[16px]">edit</span>
                              </button>

                              <button
                                className="w-8 h-8 rounded-full hover:bg-canvas text-secondary hover:text-error flex items-center justify-center transition-colors cursor-pointer"
                                title="Remove Specimen"
                                type="button"
                                onClick={() => {
                                  if (window.confirm(`Remove specimen ${product.name} from catalog mesh?`)) {
                                    deleteProduct(product.id);
                                    showToast('Specimen Removed', `${product.name} was removed from the registry.`, 'info');
                                  }
                                }}
                              >
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Pagination / Count Footer */}
              <div className="mt-space-md pt-space-sm flex items-center justify-between text-secondary px-space-sm border-t border-hairline/40">
                <span className="font-caption text-caption">
                  Showing {displayProducts.length} of {products.length} verified specimens
                </span>
                <div className="flex items-center gap-2">
                  <button
                    className="w-8 h-8 rounded-full bg-paper flex items-center justify-center text-primary disabled:opacity-40 cursor-pointer border border-hairline/40"
                    disabled
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                  </button>
                  <button
                    className="w-8 h-8 rounded-full bg-paper flex items-center justify-center text-primary hover:bg-cool-wash transition-colors cursor-pointer border border-hairline/40"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Add New Hardware Specimen Card (4 Cols) */}
            <div
              ref={ingestFormRef}
              className="lg:col-span-4 bg-canvas rounded-[28px] p-space-lg flex flex-col gap-space-md border border-hairline/50"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-subheading text-[20px] text-primary font-semibold">New Specimen</h3>
                  <span className="font-micro text-micro text-secondary font-mono">SPEC-IN-09</span>
                </div>
                <p className="font-caption text-caption text-secondary mt-1">
                  Register new hardware node for continuous price monitoring.
                </p>
              </div>

              <form className="flex flex-col gap-space-sm" id="ingest-specimen-form" onSubmit={handleRegisterSpecimen}>
                <div>
                  <label className="font-micro text-micro uppercase tracking-wider text-secondary block mb-1">
                    Hardware Label
                  </label>
                  <input
                    className="w-full h-10 px-space-sm rounded-xl bg-paper font-caption text-caption text-primary placeholder-secondary focus:outline-none focus:ring-1 focus:ring-primary border border-hairline/40"
                    id="input-specimen-name"
                    placeholder="e.g. Sony PlayStation 5 Pro"
                    required
                    type="text"
                    value={specimenName}
                    onChange={(e) => setSpecimenName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-space-xs">
                  <div>
                    <label className="font-micro text-micro uppercase tracking-wider text-secondary block mb-1">
                      SKU Tag
                    </label>
                    <input
                      className="w-full h-10 px-space-sm rounded-xl bg-paper font-caption text-caption text-primary placeholder-secondary font-mono focus:outline-none border border-hairline/40"
                      id="input-specimen-sku"
                      placeholder="PS5-PRO-2TB"
                      required
                      type="text"
                      value={specimenSku}
                      onChange={(e) => setSpecimenSku(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="font-micro text-micro uppercase tracking-wider text-secondary block mb-1">
                      Floor MSRP
                    </label>
                    <input
                      className="w-full h-10 px-space-sm rounded-xl bg-paper font-caption text-caption text-primary placeholder-secondary font-mono focus:outline-none border border-hairline/40"
                      id="input-specimen-msrp"
                      placeholder="699.99"
                      required
                      step="0.01"
                      type="number"
                      value={specimenMsrp}
                      onChange={(e) => setSpecimenMsrp(e.target.value)}
                    />
                  </div>
                </div>

                {/* Drag & Drop Photography Upload Zone (Base64 ready) */}
                <div>
                  <label className="font-micro text-micro uppercase tracking-wider text-secondary block mb-1">
                    Specimen Master Shot
                  </label>
                  <div
                    className="w-full h-32 rounded-2xl bg-paper flex flex-col items-center justify-center p-space-sm text-center cursor-pointer hover:bg-cool-wash/50 transition-colors group relative border border-hairline/40"
                    id="drop-zone"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      id="file-input"
                      type="file"
                      onChange={handleFileChange}
                    />

                    {!previewImage ? (
                      <div className="flex flex-col items-center" id="drop-empty-state">
                        <span className="material-symbols-outlined text-[24px] text-secondary group-hover:text-primary transition-colors">
                          cloud_upload
                        </span>
                        <span className="font-caption text-caption text-primary font-medium mt-1">
                          Drop image here or click
                        </span>
                        <span className="font-micro text-micro text-secondary">
                          Lossless PNG, WebP up to 10MB
                        </span>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center" id="drop-preview-state">
                        <div className="w-12 h-12 rounded-lg bg-canvas overflow-hidden border border-hairline/50">
                          <img
                            className="w-full h-full object-cover"
                            alt="Preview of uploaded electronic hardware product specimen"
                            id="preview-img"
                            src={previewImage}
                          />
                        </div>
                        <span
                          className="font-micro text-micro text-primary font-medium mt-1 truncate max-w-[180px]"
                          id="preview-name"
                        >
                          {previewFileName || 'specimen-image.png'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  className="mt-space-xs h-11 w-full rounded-full bg-primary text-on-primary font-body-sm text-body-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-space-xs cursor-pointer shadow-sm"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  <span>Register to Mesh</span>
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: USER REGISTRY & SECURITY AUDIT TRAIL (Pale Gray Canvas Band) */}
      <section className="w-full bg-canvas px-4 sm:px-6 md:px-margin py-space-xl border-b border-hairline/60">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-space-lg">
          <div>
            <span className="font-micro text-micro uppercase tracking-wider text-secondary">Platform Governance</span>
            <h2 className="font-subheading text-2xl sm:text-subheading text-primary font-semibold">
              User Registry &amp; Cryptographic Audit
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
            
            {/* Column A: Active User Registry & Role Matrix */}
            <div className="bg-paper rounded-[28px] p-space-lg flex flex-col justify-between shadow-sm border border-hairline/50">
              <div>
                <div className="flex items-center justify-between pb-space-md border-b border-hairline/40">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[20px] text-primary">group</span>
                    <h3 className="font-body text-[18px] text-primary font-semibold">Authorized Operators</h3>
                  </div>
                  <span className="font-micro text-micro text-secondary font-mono">3 SESSIONS ACTIVE</span>
                </div>

                <div className="space-y-space-sm mt-space-md">
                  {operators.map((op) => (
                    <div
                      key={op.id}
                      className="p-space-md rounded-2xl bg-canvas flex items-center justify-between gap-space-sm border border-hairline/40"
                    >
                      <div className="flex items-center gap-space-sm min-w-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-medium text-caption flex-shrink-0 ${op.avatarBg}`}
                        >
                          {op.initials}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-caption text-caption font-medium text-primary truncate">
                            {op.name}
                          </span>
                          <span className="font-micro text-micro text-secondary truncate">
                            {op.role}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-space-md flex-shrink-0">
                        <div className="text-right">
                          <span className="font-micro text-micro text-secondary block">Spendable</span>
                          <span className="font-mono font-medium text-caption text-primary">{op.spendable}</span>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            checked={op.active}
                            onChange={() => toggleOperator(op.id)}
                            className="sr-only peer"
                            type="checkbox"
                          />
                          <div className="w-9 h-5 bg-cool-wash peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-electric-blue"></div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-space-lg pt-space-sm flex items-center justify-between text-secondary border-t border-hairline/40">
                <span className="font-caption text-caption">Identity sync via FIDO2 WebAuthn</span>
                <button
                  className="font-caption text-caption font-medium text-electric-blue hover:underline cursor-pointer bg-transparent border-none p-0"
                  type="button"
                  onClick={() => showToast('Role Matrix', 'FIDO2 WebAuthn security policies synchronized across all instances.', 'info')}
                >
                  Manage Role ACL
                </button>
              </div>
            </div>

            {/* Column B: Security & Audit Event Log */}
            <div className="bg-paper rounded-[28px] p-space-lg flex flex-col justify-between shadow-sm border border-hairline/50">
              <div>
                <div className="flex items-center justify-between pb-space-md border-b border-hairline/40">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[20px] text-primary">security</span>
                    <h3 className="font-body text-[18px] text-primary font-semibold">Security &amp; Audit Trail</h3>
                  </div>
                  <span className="font-micro text-micro text-secondary font-mono">APPEND-ONLY DB</span>
                </div>

                <div className="space-y-space-sm mt-space-md font-mono">
                  {/* Event 1 */}
                  <div className="p-space-sm rounded-xl bg-canvas flex items-start gap-space-sm border border-hairline/30">
                    <span className="w-2 h-2 rounded-full bg-electric-blue mt-1.5 flex-shrink-0"></span>
                    <div className="flex-1 text-micro">
                      <div className="flex items-center justify-between text-secondary">
                        <span className="text-primary font-medium">FEDNOW_ACH_WITHDRAWAL</span>
                        <span>14:02:18 UTC</span>
                      </div>
                      <p className="text-secondary mt-0.5">
                        $2,450.00 liquidated to Escrow Primary Vault #8012 [TxID: 0x8a9f...c421]
                      </p>
                    </div>
                  </div>

                  {/* Event 2 */}
                  <div className="p-space-sm rounded-xl bg-canvas flex items-start gap-space-sm border border-hairline/30">
                    <span className="w-2 h-2 rounded-full bg-electric-blue mt-1.5 flex-shrink-0"></span>
                    <div className="flex-1 text-micro">
                      <div className="flex items-center justify-between text-secondary">
                        <span className="text-primary font-medium">PRICE_FLOOR_BREACH_HIT</span>
                        <span>13:58:44 UTC</span>
                      </div>
                      <p className="text-secondary mt-0.5">
                        Amazon Prime SKU-A17P dipped below target $1,150.00 threshold ($1,149.00)
                      </p>
                    </div>
                  </div>

                  {/* Event 3 */}
                  <div className="p-space-sm rounded-xl bg-canvas flex items-start gap-space-sm border border-hairline/30">
                    <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                    <div className="flex-1 text-micro">
                      <div className="flex items-center justify-between text-secondary">
                        <span className="text-primary font-medium">COUPON_PAYLOAD_DECRYPTED</span>
                        <span>13:41:02 UTC</span>
                      </div>
                      <p className="text-secondary mt-0.5">
                        Zero-knowledge proof validated for merchant affiliate key [Token 90x-BESTBUY]
                      </p>
                    </div>
                  </div>

                  {/* Event 4 */}
                  <div className="p-space-sm rounded-xl bg-canvas flex items-start gap-space-sm border border-hairline/30">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-1.5 flex-shrink-0"></span>
                    <div className="flex-1 text-micro">
                      <div className="flex items-center justify-between text-secondary">
                        <span className="text-primary font-medium">ADMIN_SIGNIN_SUCCESS</span>
                        <span>12:20:00 UTC</span>
                      </div>
                      <p className="text-secondary mt-0.5">
                        Alex Thorne authenticated via Hardware YubiKey OTP from 192.88.99.12
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-space-lg pt-space-sm flex items-center justify-between text-secondary border-t border-hairline/40">
                <span className="font-caption text-caption">SHA-256 Merkle tree root signed</span>
                <span className="font-micro text-micro font-mono text-primary font-semibold">Block #9,481,203</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: EMERGENCY ESCROW & CIRCUIT BREAKER CONTROL PANEL (White Band) */}
      <section className="w-full bg-paper px-4 sm:px-6 md:px-margin py-space-xl">
        <div className="max-w-[1200px] mx-auto">
          <div className="p-space-xl rounded-[28px] bg-canvas flex flex-col lg:flex-row items-center justify-between gap-space-lg border border-hairline/50">
            <div className="max-w-xl">
              <div className="flex items-center gap-space-xs font-micro text-micro tracking-wider uppercase text-ember font-medium">
                <span className="material-symbols-outlined text-[16px]">warning</span>
                <span>Escrow &amp; Arbitrage Safeguard Suite</span>
              </div>
              <h2 className="font-subheading text-[24px] text-primary font-semibold mt-1">
                Autonomous Execution Circuit Breakers
              </h2>
              <p className="font-caption text-caption text-secondary mt-space-xs leading-relaxed">
                Instantly trip autonomous execution layers in the event of upstream API rate deviations or merchant flash crashes. All safety rails are cryptographically verified.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md w-full lg:w-auto">
              
              {/* Breaker 1: Auto-Buy Engine */}
              <div className="bg-paper p-space-md rounded-2xl flex flex-col justify-between gap-space-sm min-w-[190px] border border-hairline/40 shadow-sm">
                <div>
                  <span className="font-micro text-micro text-secondary uppercase tracking-wider block">Auto-Buy Engine</span>
                  <span className="font-caption text-caption font-medium text-primary mt-0.5 block">1-Click Checkout</span>
                </div>
                <div className="flex items-center justify-between pt-space-xs">
                  <span className={`font-micro text-micro font-medium ${breakers.autoBuy ? 'text-electric-blue' : 'text-secondary'}`}>
                    {breakers.autoBuy ? 'ENABLED' : 'DISABLED'}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      checked={breakers.autoBuy}
                      onChange={() => toggleBreaker('autoBuy', 'Auto-Buy Engine')}
                      className="sr-only peer"
                      type="checkbox"
                    />
                    <div className="w-9 h-5 bg-cool-wash peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-electric-blue"></div>
                  </label>
                </div>
              </div>

              {/* Breaker 2: Feed Ingestion */}
              <div className="bg-paper p-space-md rounded-2xl flex flex-col justify-between gap-space-sm min-w-[190px] border border-hairline/40 shadow-sm">
                <div>
                  <span className="font-micro text-micro text-secondary uppercase tracking-wider block">Feed Ingestion</span>
                  <span className="font-caption text-caption font-medium text-primary mt-0.5 block">Sub-Second Pings</span>
                </div>
                <div className="flex items-center justify-between pt-space-xs">
                  <span className={`font-micro text-micro font-medium ${breakers.feedIngestion ? 'text-electric-blue' : 'text-secondary'}`}>
                    {breakers.feedIngestion ? 'ENABLED' : 'DISABLED'}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      checked={breakers.feedIngestion}
                      onChange={() => toggleBreaker('feedIngestion', 'Feed Ingestion Hub')}
                      className="sr-only peer"
                      type="checkbox"
                    />
                    <div className="w-9 h-5 bg-cool-wash peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-electric-blue"></div>
                  </label>
                </div>
              </div>

              {/* Breaker 3: Settlement Rail */}
              <div className="bg-paper p-space-md rounded-2xl flex flex-col justify-between gap-space-sm min-w-[190px] border border-hairline/40 shadow-sm">
                <div>
                  <span className="font-micro text-micro text-secondary uppercase tracking-wider block">Settlement Rail</span>
                  <span className="font-caption text-caption font-medium text-primary mt-0.5 block">FedNow Instant ACH</span>
                </div>
                <div className="flex items-center justify-between pt-space-xs">
                  <span className={`font-micro text-micro font-medium ${breakers.settlementRail ? 'text-electric-blue' : 'text-secondary'}`}>
                    {breakers.settlementRail ? 'ENABLED' : 'DISABLED'}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      checked={breakers.settlementRail}
                      onChange={() => toggleBreaker('settlementRail', 'FedNow Settlement Rail')}
                      className="sr-only peer"
                      type="checkbox"
                    />
                    <div className="w-9 h-5 bg-cool-wash peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-electric-blue"></div>
                  </label>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
