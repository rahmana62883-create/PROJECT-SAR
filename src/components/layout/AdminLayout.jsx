import React from 'react';
import { NavLink, Outlet, useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useWallet } from '../../context/WalletContext';
import { AccessDeniedPage } from '../../pages/auth/AccessDeniedPage';

export const AdminLayout = () => {
  const { isAdmin, currentUser, signOut } = useAuth();
  const { showToast } = useApp();
  const { wallet } = useWallet();
  const navigate = useNavigate();

  const formattedBalance = `$${(wallet?.balance ?? 5.0).toFixed(2)}`;

  if (!isAdmin) {
    if (!currentUser) {
      return <Navigate to="/admin/login" replace />;
    }
    return <AccessDeniedPage requiredRole="Administrator" currentRole={currentUser.role} />;
  }

  const navLinkStyle = ({ isActive }) =>
    `flex items-center px-space-sm py-2 rounded-lg font-caption text-caption transition-colors ${
      isActive
        ? 'bg-paper text-primary font-semibold shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-hairline/40'
        : 'text-on-surface-variant hover:bg-cool-wash hover:text-on-surface'
    }`;

  return (
    <div className="flex min-h-screen w-full bg-surface antialiased font-body">
      {/* Stitch Ops Aside Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-canvas z-50 flex flex-col pt-space-md pb-space-lg border-r border-hairline/60">
        {/* Brand Ops Header */}
        <div className="px-space-md mb-space-lg flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-space-xs text-primary hover:opacity-85 transition-opacity">
            <span className="material-symbols-outlined text-[22px] text-electric-blue">bolt</span>
            <span className="font-heading-sm text-[16px] font-semibold tracking-tight text-primary">
              flashcompare<span className="text-electric-blue ml-0.5">.ai Ops</span>
            </span>
          </Link>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary text-on-primary">
            v4.19
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-space-sm space-y-1">
          <NavLink to="/admin" end className={navLinkStyle}>
            <span className="material-symbols-outlined mr-space-sm text-[18px]">monitoring</span>
            Market Telemetry
          </NavLink>
          <NavLink to="/admin/orders" className={navLinkStyle}>
            <span className="material-symbols-outlined mr-space-sm text-[18px]">tune</span>
            Arbitrage Engines
          </NavLink>
          <NavLink to="/admin/customers" className={navLinkStyle}>
            <span className="material-symbols-outlined mr-space-sm text-[18px]">account_balance</span>
            Cashback Reserve
          </NavLink>
          <NavLink to="/admin/catalog" className={navLinkStyle}>
            <span className="material-symbols-outlined mr-space-sm text-[18px]">inventory_2</span>
            Specimen Registry
          </NavLink>
          <NavLink to="/admin/chat" className={navLinkStyle}>
            <span className="material-symbols-outlined mr-space-sm text-[18px]">support_agent</span>
            Support Console
          </NavLink>
          <Link
            to="/catalog"
            className="flex items-center px-space-sm py-2 rounded-lg font-caption text-caption text-on-surface-variant hover:bg-cool-wash hover:text-on-surface transition-colors mt-2"
          >
            <span className="material-symbols-outlined mr-space-sm text-[18px]">arrow_back</span>
            Back to Catalog
          </Link>
        </nav>

        {/* Cluster Status Footer Pod */}
        <div className="px-space-md pt-space-sm">
          <div className="p-space-sm bg-paper rounded-lg border border-hairline/40 shadow-sm">
            <span className="font-micro text-micro text-secondary block">Cluster Status</span>
            <span className="font-caption text-caption font-medium text-primary flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse"></span>
              Global Mesh Synced
            </span>
          </div>
        </div>
      </aside>

      {/* Main Container Offset by Sidebar (64 = 16rem = 256px) */}
      <div className="pl-64 flex-1 flex flex-col min-w-0">
        {/* Stitch Ops Top Fixed Header */}
        <header className="fixed top-0 left-64 right-0 h-11 bg-paper/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg border-b border-hairline/50 transition-colors">
          <div className="flex items-center gap-space-sm font-micro text-micro text-secondary">
            <span className="text-primary font-medium">Autonomous Node</span>
            <span className="text-hairline">/</span>
            <span>Admin Operations</span>
          </div>

          <div className="flex items-center space-x-space-md">
            <Link
              to="/wallet"
              className="flex items-center gap-1.5 px-space-sm py-1 bg-cool-wash hover:bg-hairline/40 rounded-full transition-colors text-primary"
            >
              <span className="material-symbols-outlined text-[14px] text-electric-blue">
                account_balance_wallet
              </span>
              <span className="font-micro text-micro font-medium">{formattedBalance}</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                signOut();
                navigate('/admin/login');
              }}
              className="text-xs text-secondary hover:text-danger px-3 py-1 rounded-lg border border-hairline/60 hover:bg-danger/5 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Content Outlet with Header Spacing */}
        <main className="relative pt-11 bg-surface min-h-screen w-full flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
