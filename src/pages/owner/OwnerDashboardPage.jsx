import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  Lock, 
  CheckCircle2, 
  Activity, 
  Power,
  RefreshCw,
  Clock,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { getAuthAuditLogs } from '../../services/authService';

export const OwnerDashboardPage = () => {
  const { currentUser } = useAuth();
  const { showToast } = useApp();

  // Platform controls
  const [arbitrageEngineActive, setArbitrageEngineActive] = useState(true);
  const [autoCashbackActive, setAutoCashbackActive] = useState(true);

  // Live audit logs
  const logs = getAuthAuditLogs();

  const toggleArbitrageEngine = () => {
    const nextState = !arbitrageEngineActive;
    setArbitrageEngineActive(nextState);
    showToast(
      nextState ? 'Arbitrage Engine Resumed' : 'Arbitrage Engine Suspended',
      nextState ? '48 retail price feeds polling normally.' : 'All autonomous price routing paused.',
      nextState ? 'success' : 'warning'
    );
  };

  const toggleAutoCashback = () => {
    const nextState = !autoCashbackActive;
    setAutoCashbackActive(nextState);
    showToast(
      nextState ? 'Cashback Reserve Resumed' : 'Cashback Throttle Engaged',
      nextState ? 'Instant FedNow wallet credits active.' : 'Manual review required for disbursements.',
      nextState ? 'success' : 'warning'
    );
  };

  return (
    <div className="max-w-[1360px] mx-auto space-y-8 animate-fade-in">
      
      {/* Top Welcome & KPI Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-semibold block mb-1">
            Executive Governance Console
          </span>
          <h1 className="font-heading-sm text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Platform Master Telemetry
          </h1>
          <p className="font-caption text-xs sm:text-sm text-slate-400 mt-1">
            Real-time business performance, liquidity reserves, and administrative oversight.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>FedNow ACH: 99.98% Uptime</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          EXECUTIVE KPI OVERVIEW
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* KPI 1: Gross Arbitrage GMV */}
        <div className="bg-[#0d1117] rounded-2xl p-5 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 text-slate-400">
            <span className="font-caption text-xs font-medium">30-Day Arbitrage Volume</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <span className="font-heading-sm text-2xl sm:text-3xl font-extrabold text-white block">
            $4,892,400
          </span>
          <span className="font-mono text-[11px] text-emerald-400 mt-1 block">
            +18.4% MoM • 14,280 Orders Routed
          </span>
        </div>

        {/* KPI 2: Retained Spread */}
        <div className="bg-[#0d1117] rounded-2xl p-5 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 text-slate-400">
            <span className="font-caption text-xs font-medium">Net Retained Spread</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <span className="font-heading-sm text-2xl sm:text-3xl font-extrabold text-white block">
            $142,850
          </span>
          <span className="font-mono text-[11px] text-amber-400 mt-1 block">
            3.2% Autonomous Yield Margin
          </span>
        </div>

        {/* KPI 3: Cashback Liability & Escrow */}
        <div className="bg-[#0d1117] rounded-2xl p-5 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 text-slate-400">
            <span className="font-caption text-xs font-medium">Cashback Escrow Reserve</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
          </div>
          <span className="font-heading-sm text-2xl sm:text-3xl font-extrabold text-white block">
            $48,200
          </span>
          <span className="font-mono text-[11px] text-blue-400 mt-1 block">
            140% Over-Collateralized Backing
          </span>
        </div>

        {/* KPI 4: Verified Shoppers */}
        <div className="bg-[#0d1117] rounded-2xl p-5 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 text-slate-400">
            <span className="font-caption text-xs font-medium">Active Platform Users</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <span className="font-heading-sm text-2xl sm:text-3xl font-extrabold text-white block">
            84,200
          </span>
          <span className="font-mono text-[11px] text-purple-400 mt-1 block">
            +3,190 Registered This Week
          </span>
        </div>
      </div>

      {/* =========================================================================
          MIDDLE SPLIT: EXECUTIVE CONTROLS & STAFF CLEARANCE
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Executive Emergency Controls */}
        <div className="bg-[#0d1117] rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Power size={18} className="text-amber-400" />
              <h3 className="font-caption text-sm font-bold text-white">
                Executive Platform Controls
              </h3>
            </div>
            <span className="font-mono text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
              Immediate Impact
            </span>
          </div>

          <div className="space-y-4">
            {/* Control 1 */}
            <div className="p-4 rounded-xl bg-[#07090e] border border-slate-800 flex items-center justify-between gap-4">
              <div>
                <span className="font-caption text-xs font-bold text-white block">
                  Autonomous Arbitrage Poller
                </span>
                <span className="font-caption text-xs text-slate-400 block mt-0.5">
                  Real-time price feed synchronization across 48 merchant nodes.
                </span>
              </div>
              <button
                type="button"
                onClick={toggleArbitrageEngine}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold cursor-pointer transition-colors ${
                  arbitrageEngineActive
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}
              >
                {arbitrageEngineActive ? 'ONLINE' : 'PAUSED'}
              </button>
            </div>

            {/* Control 2 */}
            <div className="p-4 rounded-xl bg-[#07090e] border border-slate-800 flex items-center justify-between gap-4">
              <div>
                <span className="font-caption text-xs font-bold text-white block">
                  Instant ACH Cashback Settlement
                </span>
                <span className="font-caption text-xs text-slate-400 block mt-0.5">
                  Automated FedNow disbursements for verified consumer purchases.
                </span>
              </div>
              <button
                type="button"
                onClick={toggleAutoCashback}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold cursor-pointer transition-colors ${
                  autoCashbackActive
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {autoCashbackActive ? 'ACTIVE' : 'THROTTLED'}
              </button>
            </div>
          </div>
        </div>

        {/* Staff & Admin Access Management */}
        <div className="bg-[#0d1117] rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-blue-400" />
              <h3 className="font-caption text-sm font-bold text-white">
                Admin Clearance Registry
              </h3>
            </div>
            <span className="font-mono text-[10px] text-slate-400">
              1 Active Operator
            </span>
          </div>

          <div className="space-y-3">
            {/* Elena Vance Card */}
            <div className="p-3.5 rounded-xl bg-[#07090e] border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                  alt="Elena Vance"
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <span className="font-caption text-xs font-bold text-white block">Elena Vance</span>
                  <span className="font-mono text-[11px] text-slate-400 block">admin@flashcompare.ai</span>
                  <span className="font-mono text-[10px] text-blue-400 block">Level 3 • SecOps Auditor</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">
                Clearance Valid
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          IMMUTABLE AUTHENTICATION AUDIT TRAIL
          ========================================================================= */}
      <div className="bg-[#0d1117] rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-amber-400" />
            <h3 className="font-caption text-sm font-bold text-white">
              Immutable Authentication &amp; Privilege Audit Log
            </h3>
          </div>
          <span className="font-mono text-[10px] text-slate-500">
            Cryptographically Chained • Real-time
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 text-[11px]">
                <th className="pb-3 font-semibold">Timestamp</th>
                <th className="pb-3 font-semibold">Event</th>
                <th className="pb-3 font-semibold">Account / Identity</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {logs.slice(0, 8).map(log => (
                <tr key={log.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-2.5 text-slate-500 text-[11px]">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.action.includes('SUCCESS') ? 'bg-emerald-500/10 text-emerald-400' :
                      log.action.includes('FAILED') || log.action.includes('DENIED') ? 'bg-red-500/10 text-red-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-2.5 text-white">{log.email}</td>
                  <td className="py-2.5 uppercase text-[10px] text-slate-400">{log.role}</td>
                  <td className="py-2.5 text-slate-400 text-[11px] truncate max-w-xs">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
