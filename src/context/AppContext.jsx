import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/api.js';
import {
  defaultProducts,
  defaultUsers,
  defaultBankAccounts,
  defaultAuditLogs,
  mockOrders,
  mockCustomers,
  resetToDefaultSeed
} from '../data/mockData';

const AppContext = createContext();

const CURRENT_SEED_VERSION = 'v_india_vegetables_2026';

export const AppProvider = ({ children }) => {
  // Products with automatic seed version check
  const [products, setProducts] = useState(() => {
    try {
      const savedVersion = localStorage.getItem('fc_seed_version');
      const stored = localStorage.getItem('fc_products');
      if (savedVersion === CURRENT_SEED_VERSION && stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length >= 240) return parsed;
      }
      // Re-seed with fresh comprehensive Indian catalog (A-Z + Fresh Vegetables)
      localStorage.setItem('fc_seed_version', CURRENT_SEED_VERSION);
      localStorage.setItem('fc_products', JSON.stringify(defaultProducts));
      return defaultProducts;
    } catch {
      return defaultProducts;
    }
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    try {
      const savedVersion = localStorage.getItem('fc_seed_version');
      const stored = localStorage.getItem('fc_orders');
      if (savedVersion === CURRENT_SEED_VERSION && stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length) return parsed;
      }
      localStorage.setItem('fc_orders', JSON.stringify(mockOrders || []));
      return mockOrders || [];
    } catch {
      return mockOrders || [];
    }
  });

  // Customers
  const [customers, setCustomers] = useState(() => {
    try {
      const savedVersion = localStorage.getItem('fc_seed_version');
      const stored = localStorage.getItem('fc_customers');
      if (savedVersion === CURRENT_SEED_VERSION && stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length) return parsed;
      }
      localStorage.setItem('fc_customers', JSON.stringify(mockCustomers || []));
      return mockCustomers || [];
    } catch {
      return mockCustomers || [];
    }
  });

  // Watchlist
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem('fc_watchlist');
      return stored ? JSON.parse(stored) : ['apple-iphone-16-pro', 'sony-wh-1000xm5'];
    } catch {
      return ['apple-iphone-16-pro', 'sony-wh-1000xm5'];
    }
  });

  // Price Alerts
  const [priceAlerts, setPriceAlerts] = useState(() => {
    try {
      const stored = localStorage.getItem('fc_price_alerts');
      return stored ? JSON.parse(stored) : [
        { id: 'alt-101', productId: 'sony-wh-1000xm5', targetPrice: 26990.00, currentPrice: 28990.00, status: 'Active' }
      ];
    } catch {
      return [
        { id: 'alt-101', productId: 'sony-wh-1000xm5', targetPrice: 26990.00, currentPrice: 28990.00, status: 'Active' }
      ];
    }
  });

  // Compare candidates (up to 4 products)
  const [compareList, setCompareList] = useState(() => {
    try {
      const stored = localStorage.getItem('fc_compare_list');
      return stored ? JSON.parse(stored) : ['apple-iphone-16-pro', 'samsung-galaxy-s24-ultra', 'sony-wh-1000xm5'];
    } catch {
      return ['apple-iphone-16-pro', 'samsung-galaxy-s24-ultra', 'sony-wh-1000xm5'];
    }
  });

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState(() => {
    try {
      const stored = localStorage.getItem('fc_audit_logs');
      return stored ? JSON.parse(stored) : defaultAuditLogs || [];
    } catch {
      return defaultAuditLogs || [];
    }
  });

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: '⚡ Welcome to flashcompare.ai',
      message: 'Autonomous multi-store arbitrage is active for 12+ flagships.',
      date: 'Just now',
      unread: true
    },
    {
      id: 'notif-2',
      title: '🛡️ 4-Ring Truth Scoring Active',
      message: 'Verified review sentiments and seller credibility calibrated.',
      date: '10 min ago',
      unread: true
    }
  ]);

  // Micro-toasts
  const [toasts, setToasts] = useState([]);

  // Modals state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isPriceAlertModalOpen, setIsPriceAlertModalOpen] = useState(false);
  const [activeAlertProduct, setActiveAlertProduct] = useState(null);
  const [isProductEditorOpen, setIsProductEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Simulation status
  const [isSimulationRunning, setIsSimulationRunning] = useState(true);
  const simulationTimerRef = useRef(null);

  // Sync from SQLite Database on load
  useEffect(() => {
    let isMounted = true;
    const syncFromDatabase = async () => {
      try {
        const [remoteProducts, remoteOrders, remoteCustomers, remoteWatchlist, remoteAlerts] = await Promise.all([
          api.products.getAll().catch(() => null),
          api.orders.getAll().catch(() => null),
          api.customers.getAll().catch(() => null),
          api.watchlist.getList().catch(() => null),
          api.watchlist.getAlerts().catch(() => null)
        ]);

        if (!isMounted) return;
        if (remoteProducts && Array.isArray(remoteProducts) && remoteProducts.length > 0) {
          setProducts(remoteProducts);
        }
        if (remoteOrders && Array.isArray(remoteOrders) && remoteOrders.length > 0) {
          setOrders(remoteOrders);
        }
        if (remoteCustomers && Array.isArray(remoteCustomers) && remoteCustomers.length > 0) {
          setCustomers(remoteCustomers);
        }
        if (remoteWatchlist && Array.isArray(remoteWatchlist)) {
          setWatchlist(remoteWatchlist);
        }
        if (remoteAlerts && Array.isArray(remoteAlerts)) {
          setPriceAlerts(remoteAlerts);
        }
      } catch (err) {
        console.warn('[AppContext] Database sync notice (operating in local fallback):', err.message);
      }
    };
    syncFromDatabase();
    return () => { isMounted = false; };
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('fc_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('fc_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('fc_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('fc_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('fc_price_alerts', JSON.stringify(priceAlerts));
  }, [priceAlerts]);

  useEffect(() => {
    localStorage.setItem('fc_compare_list', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('fc_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Toast helper
  const showToast = useCallback((title, message, type = 'info') => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    const newToast = { id, title, message, type };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Audit logger
  const addAuditLog = useCallback((action, details) => {
    const newLog = {
      id: 'log_' + Date.now(),
      action,
      details,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  }, []);

  // Watchlist operations
  const toggleWatchlist = useCallback((productId) => {
    api.watchlist.toggle(productId).catch(() => {});
    setWatchlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Watchlist Updated', 'Item removed from your watchlist.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to Watchlist', 'You will receive market updates on this item.', 'success');
        return [...prev, productId];
      }
    });
  }, [showToast]);

  const isInWatchlist = useCallback((productId) => {
    return watchlist.includes(productId);
  }, [watchlist]);

  // Comparison operations
  const addToCompare = useCallback((productId) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        showToast('Comparison Matrix', 'Product is already in comparison table.', 'info');
        return prev;
      }
      if (prev.length >= 4) {
        showToast('Matrix Limit', 'Comparison matrix supports up to 4 flagships at once.', 'warning');
        return prev;
      }
      showToast('Added to Compare', 'Product added to comparison matrix.', 'success');
      return [...prev, productId];
    });
  }, [showToast]);

  const removeFromCompare = useCallback((productId) => {
    setCompareList(prev => prev.filter(id => id !== productId));
    showToast('Specimen Removed', 'Product removed from comparison.', 'info');
  }, [showToast]);

  const clearCompare = useCallback(() => {
    setCompareList([]);
    showToast('Matrix Cleared', 'All specimens removed from comparison matrix.', 'info');
  }, [showToast]);

  // Price Alert operations
  const openPriceAlertModal = useCallback((product) => {
    setActiveAlertProduct(product);
    setIsPriceAlertModalOpen(true);
  }, []);

  const closePriceAlertModal = useCallback(() => {
    setIsPriceAlertModalOpen(false);
    setActiveAlertProduct(null);
  }, []);

  const addPriceAlert = useCallback((alertData) => {
    const newAlert = {
      id: 'alt_' + Date.now(),
      productId: alertData.productId,
      targetPrice: parseFloat(alertData.targetPrice),
      currentPrice: parseFloat(alertData.currentPrice),
      createdAt: new Date().toISOString(),
      status: 'Active'
    };

    api.watchlist.createAlert(newAlert).catch(() => {});
    setPriceAlerts(prev => [newAlert, ...prev]);
    showToast('Autonomous Alert Armed', `Target floor set at $${newAlert.targetPrice}.`, 'success');
    addAuditLog('Price Alert Set', `Alert armed for ${alertData.productName || alertData.productId} at $${newAlert.targetPrice}`);
    closePriceAlertModal();
    return newAlert;
  }, [addAuditLog, closePriceAlertModal, showToast]);

  const removePriceAlert = useCallback((alertId) => {
    api.watchlist.deleteAlert(alertId).catch(() => {});
    setPriceAlerts(prev => prev.filter(a => a.id !== alertId));
    showToast('Alert Dismissed', 'Price drop tracking alert removed.', 'info');
  }, [showToast]);

  // Notifications
  const markNotificationsAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  }, []);

  const addNotification = useCallback((notif) => {
    setNotifications(prev => [notif, ...prev]);
  }, []);

  // Admin Product CRUD
  const openProductEditor = useCallback((product = null) => {
    setEditingProduct(product);
    setIsProductEditorOpen(true);
  }, []);

  const closeProductEditor = useCallback(() => {
    setIsProductEditorOpen(false);
    setEditingProduct(null);
  }, []);

  const saveProduct = useCallback((productData) => {
    const currentBest = parseFloat(productData.currentBestPrice);
    if (!productData.name || isNaN(currentBest) || currentBest <= 0) {
      throw new Error('Valid product name and current best price are required.');
    }

    const prodId = productData.id || ('prod_' + productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '_' + Date.now().toString(36));

    const finalProduct = {
      ...productData,
      id: prodId,
      name: productData.name,
      title: productData.name,
      category: productData.category || 'Smartphones',
      currentBestPrice: currentBest,
      originalMSRP: parseFloat(productData.originalMSRP) || Math.round(currentBest * 1.15),
      priceScore: productData.priceScore || 89,
      stockHealth: productData.stockHealth || 92,
      sellerCredibility: productData.sellerCredibility || 96,
      sentimentScore: productData.sentimentScore || 88,
      images: productData.images && productData.images.length ? productData.images : [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
      ],
      offers: productData.offers && productData.offers.length ? productData.offers : [
        {
          retailer: productData.retailerName || 'Primary Retailer',
          logo: 'https://images.unsplash.com/photo-1523474253246-72dc9922da8a?auto=format&fit=crop&w=80&q=80',
          price: currentBest,
          shipping: 'Free 2-Day Delivery',
          deliveryDays: 2,
          returnDays: 30,
          coupon: productData.coupon || null,
          stock: 'In Stock',
          url: '#'
        }
      ],
      specs: productData.specs || {
        'Model': productData.name,
        'Category': productData.category,
        'Warranty': '1-Year Limited'
      },
      verdict: productData.verdict || {
        action: 'BUY NOW',
        title: 'Prime Purchase Window',
        confidence: 90,
        summary: 'Priced competitively with verified retailer stock.',
        reasoning: ['Historical price floor reached.', 'Authorized seller fulfillment.']
      }
    };

    setProducts(prev => {
      const idx = prev.findIndex(p => p.id === finalProduct.id);
      if (idx !== -1) {
        api.products.update(finalProduct.id, finalProduct).catch(console.warn);
        const copy = [...prev];
        copy[idx] = { ...copy[idx], ...finalProduct };
        return copy;
      }
      api.products.create(finalProduct).catch(console.warn);
      return [finalProduct, ...prev];
    });

    addAuditLog('Product Saved', `Admin updated product "${finalProduct.name}" (${finalProduct.id})`);
    showToast('Product Saved', `"${finalProduct.name}" is now live in the catalog.`, 'success');
    closeProductEditor();
    return finalProduct;
  }, [addAuditLog, closeProductEditor, showToast]);

  const deleteProduct = useCallback((productId) => {
    api.products.delete(productId).catch(console.warn);
    setProducts(prev => prev.filter(p => p.id !== productId));
    addAuditLog('Product Deleted', `Admin deleted product ${productId}`);
    showToast('Product Deleted', 'Product record was permanently removed.', 'info');
  }, [addAuditLog, showToast]);

  const updateOrderStatus = useCallback((orderId, newStatus) => {
    api.orders.updateStatus(orderId, newStatus).catch(console.warn);
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    addAuditLog('Order Updated', `Admin updated order ${orderId} status to ${newStatus}`);
    showToast('Order Updated', `Order ${orderId} is now ${newStatus}.`, 'success');
  }, [addAuditLog, showToast]);

  // Reset Demo Seed
  const resetDemo = useCallback(() => {
    api.system.reset().catch(console.warn);
    resetToDefaultSeed();
    setProducts(defaultProducts);
    setWatchlist(['iphone-15-pro-max', 'sony-wh-1000xm5']);
    setPriceAlerts([
      { id: 'alt-101', productId: 'sony-wh-1000xm5', targetPrice: 280.00, currentPrice: 298.00, status: 'Active' }
    ]);
    setCompareList(['iphone-15-pro-max', 'galaxy-s24-ultra', 'sony-wh-1000xm5']);
    setAuditLogs(defaultAuditLogs || []);
    showToast('Baseline Restored', 'Catalog, wallet, and alerts restored to factory demo seed.', 'success');
  }, [showToast]);

  // Live price fluctuation ticker
  const runSimulationTick = useCallback(() => {
    setProducts(prevProducts => {
      if (!prevProducts.length) return prevProducts;
      const randomIdx = Math.floor(Math.random() * prevProducts.length);
      const target = prevProducts[randomIdx];

      // Fluctuate between -3.5% and +1.5%
      const delta = ((Math.random() * 5) - 3.5) / 100;
      const newPrice = Math.max(15, Math.round(target.currentBestPrice * (1 + delta)));

      if (newPrice === target.currentBestPrice) return prevProducts;

      const isDrop = newPrice < target.currentBestPrice;
      const diff = Math.abs(newPrice - target.currentBestPrice);

      const updatedTarget = {
        ...target,
        currentBestPrice: newPrice,
        offers: (target.offers || []).map((o, idx) => (idx === 0 ? { ...o, price: newPrice } : o)),
        priceHistory: [
          ...(target.priceHistory || []).slice(-15),
          { date: new Date().toISOString().split('T')[0], price: newPrice }
        ]
      };

      // Check price alerts
      priceAlerts.forEach(alert => {
        if (alert.productId === target.id && alert.status === 'Active' && newPrice <= alert.targetPrice) {
          const notif = {
            id: 'notif_alert_' + Date.now(),
            title: `🎯 Price Alert Reached: ${target.name}`,
            message: `${target.name} hit your target price of $${alert.targetPrice}! Currently $${newPrice}.`,
            date: 'Just now',
            unread: true
          };
          addNotification(notif);
          showToast(notif.title, notif.message, 'success');
        }
      });

      if (isDrop && diff >= 10) {
        showToast('⚡ Live Market Price Drop', `${target.name} dropped $${diff} to $${newPrice}!`, 'info');
      }

      const updated = [...prevProducts];
      updated[randomIdx] = updatedTarget;
      return updated;
    });
  }, [addNotification, priceAlerts, showToast]);

  useEffect(() => {
    if (!isSimulationRunning) return;
    simulationTimerRef.current = setInterval(runSimulationTick, 30000); // 30s ticks
    return () => {
      if (simulationTimerRef.current) clearInterval(simulationTimerRef.current);
    };
  }, [isSimulationRunning, runSimulationTick]);

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        products,
        orders,
        customers,
        watchlist,
        priceAlerts,
        compareList,
        setCompareList,
        auditLogs,
        notifications,
        unreadNotifCount: notifications.filter(n => n.unread).length,
        toasts,
        showToast,
        dismissToast,
        toggleWatchlist,
        isInWatchlist,
        addToCompare,
        removeFromCompare,
        clearCompare,
        openPriceAlertModal,
        closePriceAlertModal,
        isPriceAlertModalOpen,
        activeAlertProduct,
        addPriceAlert,
        removePriceAlert,
        markNotificationsAsRead,
        openProductEditor,
        closeProductEditor,
        isProductEditorOpen,
        editingProduct,
        saveProduct,
        deleteProduct,
        updateOrderStatus,
        resetDemo,
        isSimulationRunning,
        toggleSimulation: () => setIsSimulationRunning(p => !p),
        isCommandPaletteOpen,
        openCommandPalette: () => setIsCommandPaletteOpen(true),
        closeCommandPalette: () => setIsCommandPaletteOpen(false)
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
