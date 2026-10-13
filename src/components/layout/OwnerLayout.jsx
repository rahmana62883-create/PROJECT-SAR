import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  Crown, 
  LayoutDashboard, 
  TrendingUp, 
  ShieldAlert, 
  Users, 
  FileText, 
  LogOut, 
  ArrowLeft,
  Lock,
  Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export const OwnerLayout = () => {
  const { currentUser, signOut } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    showToast('Owner Session Terminated', 'Executive session revoked.', 'info');
    navigate('/owner/login');
  };

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-caption text-xs font-medium transition-all ${
      isActive
        ? 'bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30 shadow-xs'
        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
    }`;

  return (
    <div className="flex min-h-screen w-full bg-[#07090e] antialiased font-body text-slate-100 selection:bg-amber-500 selection:text-black">
      
      {/* Executive Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#0d1117] z-50 flex flex-col pt-5 pb-6 border-r border-slate-800">
        
        {/* Brand Header */}
        <div className="px-5 mb-8 flex items-center justify-between">
          <Link to="/owner/dashboard" className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Crown size={16} />
            </div>
            <div>
              <span className="font-heading-sm text-sm font-bold tracking-tight text-white block">
                flashcompare<span className="text-amber-400">.ai</span>
              </span>
              <span className="font-mono text-[9px] text-amber-400/80 uppercase tracking-widest block">
                Owner Console
              </span>
            </div>
          </Link>
        </div>

        {/* Executive Navigation */}
        <nav className="flex-1 px-3 space-y-1" aria-label="Owner Navigation">
          <NavLink to="/owner/dashboard" end className={navLinkStyle}>
            <LayoutDashboard size={15} />
            <span>Executive Overview</span>
          </NavLink>
          <NavLink to="/owner/business" className={navLinkStyle}>
            <TrendingUp size={15} />
            <span>Business Analytics</span>
          </NavLink>
          <NavLink to="/owner/admins" className={navLinkStyle}>
            <Users size={15} />
            <span>Staff &amp; Admin Access</span>
          </NavLink>
          <NavLink to="/owner/security" className={navLinkStyle}>
            <ShieldAlert size={15} />
            <span>Security &amp; Enclave</span>
          </NavLink>
          <NavLink to="/owner/audit-logs" className={navLinkStyle}>
            <FileText size={15} />
            <span>Immutable Audit Logs</span>
          </NavLink>

          <div className="pt-4 border-t border-slate-800/80 my-2"></div>

          <Link
            to="/admin"
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-caption text-xs text-blue-400 hover:bg-blue-500/10 transition-colors"
          >
            <Activity size={15} />
            <span>Switch to Admin Ops</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-caption text-xs text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft size={15} />
            <span>Public Storefront</span>
          </Link>
        </nav>

        {/* Current Owner Profile Pod */}
        <div className="px-3 pt-4 border-t border-slate-800">
          <div className="p-3 bg-[#07090e] rounded-2xl border border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 border border-amber-500/30">
                JS
              </div>
              <div className="min-w-0">
                <span className="font-caption text-xs font-bold text-white block truncate">
                  {currentUser?.name || 'Julian Sterling'}
                </span>
                <span className="font-mono text-[10px] text-amber-400 block truncate">
                  Root Owner
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="p-1.5 rounded-lg text-slate-500 hover:text-danger hover:bg-danger/10 transition-colors cursor-pointer"
              title="Terminate Owner Session"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container Offset by Sidebar (64 = 16rem = 256px) */}
      <div className="pl-64 flex-1 flex flex-col min-w-0">
        
        {/* Top Fixed Executive Header */}
        <header className="fixed top-0 left-64 right-0 h-12 bg-[#0d1117]/90 backdrop-blur-xl border-b border-slate-800 z-40 flex items-center justify-between px-6">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="text-amber-400 font-semibold">Executive Root Clearance</span>
            <span className="text-slate-700">/</span>
            <span>Platform Governance</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono text-amber-300">
              <Lock size={12} />
              <span>Hardware 2FA Active</span>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="px-3 py-1 rounded-full bg-slate-800 hover:bg-danger/20 hover:text-danger text-slate-300 text-xs font-medium transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Content Outlet with Header Spacing */}
        <main className="relative pt-12 min-h-screen w-full flex-1 p-6 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
