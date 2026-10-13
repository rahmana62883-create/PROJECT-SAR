import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layout & Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { Preloader } from './components/common/Preloader';

// Modals
import { CommandPaletteModal } from './components/modals/CommandPaletteModal';
import { AuthModal } from './components/modals/AuthModal';
const LazyLinkBankModal = lazy(() => import('./components/modals/LinkBankModal').then(m => ({ default: m.LinkBankModal })));
import { WithdrawModal } from './components/modals/WithdrawModal';
import { ReceiptModal } from './components/modals/ReceiptModal';
import { ProductEditorModal } from './components/modals/ProductEditorModal';
import { PriceAlertModal } from './components/modals/PriceAlertModal';
import { QuizWidget } from './components/quiz/QuizWidget';

// AI Copilot
import { AIAssistantOrb } from './components/ai/AIAssistantOrb';
import { StrangerChatWidget } from './components/chat/StrangerChatWidget';

// Storefront & Consumer Pages
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { WalletPage } from './pages/WalletPage';
import { AccountPage } from './pages/AccountPage';
import { QuizPage } from './pages/QuizPage';
import { CommunityPage } from './pages/CommunityPage';
import { ReceiptPage } from './pages/ReceiptPage';

// Three Completely Separate Authentication Portals
import { UserLoginPage } from './pages/auth/UserLoginPage';
import { AdminLoginPage } from './pages/auth/AdminLoginPage';
import { OwnerLoginPage } from './pages/auth/OwnerLoginPage';
import { UserForgotPasswordPage } from './pages/auth/UserForgotPasswordPage';
import { AdminForgotPasswordPage } from './pages/auth/AdminForgotPasswordPage';
import { OwnerForgotPasswordPage } from './pages/auth/OwnerForgotPasswordPage';

// Protected Route & Dashboards
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { UserDashboardPage } from './pages/dashboard/UserDashboardPage';

// Admin Layout & Pages
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminPage } from './pages/AdminPage';
import { AdminCatalogPage } from './pages/AdminCatalogPage';
import { AdminOrdersPage } from './pages/AdminOrdersPage';
import { AdminCustomersPage } from './pages/AdminCustomersPage';
import { AdminChatDashboard } from './pages/AdminChatDashboard';

// Owner Console Layout & Pages
import { OwnerLayout } from './components/layout/OwnerLayout';
import { OwnerDashboardPage } from './pages/owner/OwnerDashboardPage';

import { useApp } from './context/AppContext';
import { useWallet } from './context/WalletContext';
import { CustomCursor, ParallaxSection } from './components/common/MotionComponents';

// Scroll to top helper on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Live Price Drop Toast (dark mode only demo)
const LivePriceDropToast = () => {
  const isDark = false;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isDark) return;
    const timer = setTimeout(() => {
      setVisible(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isDark]);

  if (!visible || !isDark) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 border border-slate-700/80 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-slide-up">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-electric-blue/20 text-electric-blue flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-lg">bolt</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-bold text-white flex items-center gap-1.5">
            <span>Live Market Price Drop</span>
          </div>
          <div className="text-xs text-slate-400 mt-0.5 truncate">
            Dell XPS 15 9530 (Intel Core i7-13700H, 3.5...
          </div>
        </div>
        <button
          className="text-slate-500 hover:text-white transition-colors p-0.5 leading-none shrink-0 cursor-pointer"
          onClick={() => setVisible(false)}
          aria-label="Dismiss price drop notification"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export const App = () => {
  const [isPreloading, setIsPreloading] = useState(true);
  
  const { 
    isPriceAlertModalOpen,
    activeAlertProduct,
    closePriceAlertModal
  } = useApp();
  
  const { isLinkBankModalOpen } = useWallet();

  const location = useLocation();
  
  // Specific route scoping
  const isAdminRoute = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login' && location.pathname !== '/admin/forgot-password';
  const isOwnerRoute = location.pathname.startsWith('/owner') && location.pathname !== '/owner/login' && location.pathname !== '/owner/forgot-password';
  const isAuthRoute = location.pathname === '/signin' || 
                      location.pathname === '/login' || 
                      location.pathname === '/admin/login' || 
                      location.pathname === '/owner/login' || 
                      location.pathname === '/forgot-password' || 
                      location.pathname === '/admin/forgot-password' || 
                      location.pathname === '/owner/forgot-password';

  return (
    <>
      {isPreloading && <Preloader onComplete={() => setIsPreloading(false)} />}
      <ScrollToTop />

      {/* Ambient Accent Blobs (Consumer routes only) */}
      {!isAuthRoute && !isAdminRoute && !isOwnerRoute && (
        <ParallaxSection speed={0.15} className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-700" aria-hidden="true">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-sky-400/15 to-blue-600/5 blur-3xl transform-gpu"></div>
          <div className="absolute top-1/4 -right-32 w-[32rem] h-[32rem] rounded-full bg-gradient-to-bl from-purple-400/10 to-indigo-600/5 blur-3xl transform-gpu"></div>
          <div className="absolute bottom-1/3 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-emerald-400/8 to-teal-500/3 blur-3xl transform-gpu"></div>
        </ParallaxSection>
      )}

      {/* Global Frosted Glass Header (Hidden on Admin, Owner & Auth Routes) */}
      {!isAdminRoute && !isOwnerRoute && !isAuthRoute && <Navbar />}

      {/* Live Price Drop Toast (dark mode only, non-admin, non-auth) */}
      {!isAdminRoute && !isOwnerRoute && !isAuthRoute && <LivePriceDropToast />}

      {/* Main Routed Content */}
      <main className={`relative z-10 min-h-screen w-full flex-1 ${!isAdminRoute && !isOwnerRoute && !isAuthRoute ? 'pt-11' : ''}`}>
        <div key={location.pathname} className="page-transition-enter h-full w-full">
          <Routes>
            {/* Public Storefront Routes */}
            <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/deals" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/compare" element={<ComparisonPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/receipt" element={<ReceiptPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/community" element={<CommunityPage />} />

          {/* =========================================================================
              1. USER AUTHENTICATION & DASHBOARD
              ========================================================================= */}
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/signin" element={<UserLoginPage />} />
          <Route path="/forgot-password" element={<UserForgotPasswordPage />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['customer', 'admin', 'owner']} loginPath="/login">
                <UserDashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/account" 
            element={
              <ProtectedRoute allowedRoles={['customer', 'admin', 'owner']} loginPath="/login">
                <AccountPage />
              </ProtectedRoute>
            } 
          />

          {/* =========================================================================
              2. ADMIN AUTHENTICATION & DASHBOARD
              ========================================================================= */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPasswordPage />} />
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'owner']} loginPath="/admin/login">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminPage />} />
            <Route path="dashboard" element={<AdminPage />} />
            <Route path="catalog" element={<AdminCatalogPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="customers" element={<AdminCustomersPage />} />
            <Route path="chat" element={<AdminChatDashboard />} />
          </Route>

          {/* =========================================================================
              3. OWNER AUTHENTICATION & DASHBOARD (HIGHEST SECURITY LEVEL)
              ========================================================================= */}
          <Route path="/owner/login" element={<OwnerLoginPage />} />
          <Route path="/owner/forgot-password" element={<OwnerForgotPasswordPage />} />

          <Route 
            path="/owner" 
            element={
              <ProtectedRoute allowedRoles={['owner']} loginPath="/owner/login">
                <OwnerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/owner/dashboard" replace />} />
            <Route path="dashboard" element={<OwnerDashboardPage />} />
            <Route path="business" element={<OwnerDashboardPage />} />
            <Route path="admins" element={<OwnerDashboardPage />} />
            <Route path="security" element={<OwnerDashboardPage />} />
            <Route path="audit-logs" element={<OwnerDashboardPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </div>
      </main>

      {/* Luxury Footer (Hidden on Admin, Owner & Auth Routes) */}
      {!isAdminRoute && !isOwnerRoute && !isAuthRoute && <Footer />}

      {/* Ambient Flash AI Shopping Copilot (Hidden on Auth Routes) */}
      {!isAuthRoute && !isAdminRoute && !isOwnerRoute && <AIAssistantOrb />}

      {/* Stranger Chat & Community Widget (Hidden on Auth Routes) */}
      {!isAuthRoute && !isAdminRoute && !isOwnerRoute && <StrangerChatWidget />}

      {/* Micro-Toast Notification Stack */}
      <ToastContainer />

      {/* Quiz Game (Hidden on Auth Routes) */}
      {!isAuthRoute && !isAdminRoute && !isOwnerRoute && <QuizWidget />}

      {/* Global Overlays & Modals */}
      <CommandPaletteModal />
      <AuthModal />
      {isLinkBankModalOpen && (
        <Suspense fallback={null}>
          <LazyLinkBankModal />
        </Suspense>
      )}
      <WithdrawModal />
      <ReceiptModal />
      <ProductEditorModal />
      <PriceAlertModal 
        isOpen={isPriceAlertModalOpen} 
        product={activeAlertProduct} 
        onClose={closePriceAlertModal} 
      />
      
      <CustomCursor />
    </>
  );
};
