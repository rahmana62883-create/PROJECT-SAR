import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Loader2, 
  AlertCircle, 
  Server, 
  Lock, 
  Cpu,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { DEMO_ACCOUNTS } from '../../services/authService';

export const AdminLoginPage = () => {
  const { signInAdmin } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('admin@flashcompare.ai');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const redirectPath = location.state?.from?.pathname || '/admin';

  const handleAutofillDemo = () => {
    setEmail(DEMO_ACCOUNTS.admin.email);
    setPassword(DEMO_ACCOUNTS.admin.password);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const adminUser = await signInAdmin(email, password, rememberDevice);
      showToast('Admin Clearance Granted', `Authenticated as ${adminUser.name} (${adminUser.tier}).`, 'success');
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.message || "You don't have permission to access the Admin Portal.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0d1117] flex items-center justify-center p-4 sm:p-6 antialiased text-slate-100 selection:bg-electric-blue selection:text-white relative overflow-hidden">
      
      {/* Background Architectural Grid Pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      ></div>

      {/* Subtle Blue Horizon Glow */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-600/10 to-transparent"></div>

      {/* Main Admin Card */}
      <div className="w-full max-w-[440px] bg-[#161b22]/95 backdrop-blur-2xl rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-9 relative z-10">
        
        {/* Top Header: Ops Node Status */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-white hover:opacity-85 transition-opacity"
            title="Return to flashcompare.ai"
          >
            <div className="w-7 h-7 rounded-lg bg-electric-blue/20 text-electric-blue flex items-center justify-center border border-electric-blue/30">
              <ShieldCheck size={16} />
            </div>
            <span className="font-caption text-sm font-bold tracking-tight text-white">
              flashcompare<span className="text-electric-blue font-bold">.ai Ops</span>
            </span>
          </Link>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-[10px] font-mono text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Node v4.19</span>
          </div>
        </div>

        {/* Portal Titles */}
        <div className="mb-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400 font-mono text-[11px] font-semibold uppercase tracking-wider mb-2 border border-blue-500/20">
            <Lock size={11} />
            <span>Staff Administration</span>
          </div>
          <h1 className="font-heading-sm text-2xl sm:text-[26px] font-bold text-white tracking-tight mb-1">
            Admin Portal
          </h1>
          <p className="font-caption text-xs sm:text-sm text-slate-400 leading-relaxed">
            Authorized access to FlashCompare administration &amp; market telemetry.
          </p>
        </div>

        {/* Demo Quickfill Pill */}
        <div className="mb-5 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <KeyRound size={13} className="text-electric-blue shrink-0" />
            <span className="font-mono text-[11px] text-slate-300 truncate">
              Admin: <strong className="text-white font-semibold">admin@flashcompare.ai</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={handleAutofillDemo}
            className="shrink-0 text-electric-blue hover:text-blue-300 font-mono text-xs font-semibold cursor-pointer underline"
          >
            Autofill
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 flex items-start gap-2.5 text-xs animate-shake">
            <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-400" />
            <span className="leading-relaxed font-medium">{error}</span>
          </div>
        )}

        {/* Admin Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Admin Email / Username */}
          <div>
            <label htmlFor="admin-email" className="block font-caption text-xs font-semibold text-slate-300 mb-1.5">
              Admin Email / Operator ID
            </label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@flashcompare.ai"
              autoComplete="username"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d1117] border border-slate-700 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all font-mono"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="admin-password" className="font-caption text-xs font-semibold text-slate-300">
                Security Passcode
              </label>
              <Link
                to="/admin/forgot-password"
                className="font-caption text-xs text-electric-blue hover:text-blue-300 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoComplete="current-password"
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-[#0d1117] border border-slate-700 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember Device & Session Notice */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-electric-blue focus:ring-electric-blue"
              />
              <span className="font-caption text-xs text-slate-400">Remember this workstation</span>
            </label>
            <span className="font-mono text-[10px] text-slate-500">24h Session TTL</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-electric-blue hover:bg-blue-600 text-white font-caption text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-600/20 disabled:opacity-75 mt-3"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Verifying clearance...</span>
              </>
            ) : (
              <>
                <span>Authenticate Operator</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        {/* Security Disclaimers & Audit Notice */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <Server size={12} className="text-slate-400" />
            <span>Audit Trail Active</span>
          </div>
          <Link to="/login" className="hover:text-slate-300 transition-colors">
            Switch to Customer Login &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
