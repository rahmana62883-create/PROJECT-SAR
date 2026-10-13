import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Crown, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Loader2, 
  AlertCircle, 
  ShieldAlert, 
  Key, 
  Smartphone, 
  Fingerprint,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { DEMO_ACCOUNTS } from '../../services/authService';

export const OwnerLoginPage = () => {
  const { signInOwnerChallenge, signInOwnerVerify } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  // Multi-step flow: 1 = Password, 2 = Mandatory 2FA OTP
  const [step, setStep] = useState(1);

  // Step 1 fields
  const [email, setEmail] = useState('owner@flashcompare.ai');
  const [password, setPassword] = useState('owner123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);

  // Step 2 fields
  const [twoFactorCode, setTwoFactorCode] = useState('849201');
  const [challengeData, setChallengeData] = useState(null);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const redirectPath = location.state?.from?.pathname || '/owner/dashboard';

  const handleAutofillDemo = () => {
    setEmail(DEMO_ACCOUNTS.owner.email);
    setPassword(DEMO_ACCOUNTS.owner.password);
    setTwoFactorCode(DEMO_ACCOUNTS.owner.twoFactorCode);
    setError('');
  };

  // Step 1: Validate master credentials
  const handleStep1Submit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const challenge = await signInOwnerChallenge(email, password);
      setChallengeData(challenge);
      setStep(2);
      showToast('2FA Required', 'Hardware token challenge initiated.', 'info');
    } catch (err) {
      setError(err.message || "You don't have permission to access the Owner Console.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Validate 2FA OTP
  const handleStep2Submit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const ownerUser = await signInOwnerVerify(email, twoFactorCode, rememberDevice);
      showToast('Owner Console Unlocked', `Root Executive Access granted: ${ownerUser.name}`, 'success');
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid two-factor authentication code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#07090e] flex items-center justify-center p-4 sm:p-6 antialiased text-slate-100 selection:bg-amber-500 selection:text-black relative overflow-hidden">
      
      {/* Executive Obsidian & Amber Ambient Gradients */}
      <div className="pointer-events-none absolute -top-40 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px]"></div>
      <div className="pointer-events-none absolute -bottom-40 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[120px]"></div>

      {/* Grid Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Main Owner Auth Card */}
      <div className="w-full max-w-[460px] bg-[#0d1117]/95 backdrop-blur-2xl rounded-3xl border border-amber-500/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] p-6 sm:p-9 relative z-10">
        
        {/* Top Header: Cryptographic Enclave Indicator */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-white hover:opacity-85 transition-opacity"
            title="Return to flashcompare.ai"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-xs">
              <Crown size={16} />
            </div>
            <span className="font-caption text-sm font-bold tracking-tight text-white">
              flashcompare<span className="text-amber-400 font-bold">.ai Executive</span>
            </span>
          </Link>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            <span>Root Enclave</span>
          </div>
        </div>

        {/* Portal Titles */}
        <div className="mb-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-400/10 text-amber-400 font-mono text-[11px] font-semibold uppercase tracking-wider mb-2 border border-amber-400/20">
            <Fingerprint size={12} />
            <span>Executive Business Access</span>
          </div>
          <h1 className="font-heading-sm text-2xl sm:text-[28px] font-bold text-white tracking-tight mb-1">
            Owner Console
          </h1>
          <p className="font-caption text-xs sm:text-sm text-slate-400 leading-relaxed">
            {step === 1 
              ? 'Secure access to FlashCompare business governance & financial telemetry.'
              : 'Two-factor hardware authentication required for executive clearance.'}
          </p>
        </div>

        {/* Demo Quickfill Pill */}
        <div className="mb-5 p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/20 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Key size={13} className="text-amber-400 shrink-0" />
            <span className="font-mono text-[11px] text-slate-300 truncate">
              Owner: <strong className="text-amber-300 font-semibold">owner@flashcompare.ai</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={handleAutofillDemo}
            className="shrink-0 text-amber-400 hover:text-amber-300 font-mono text-xs font-semibold cursor-pointer underline"
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

        {/* =========================================================================
            STEP 1: MASTER CREDENTIALS
            ========================================================================= */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4">
            {/* Owner Email */}
            <div>
              <label htmlFor="owner-email" className="block font-caption text-xs font-semibold text-slate-300 mb-1.5">
                Principal Owner Email
              </label>
              <input
                id="owner-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@flashcompare.ai"
                autoComplete="username"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090e] border border-slate-700 text-white text-xs sm:text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-mono"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="owner-password" className="font-caption text-xs font-semibold text-slate-300">
                  Master Key Passphrase
                </label>
                <Link
                  to="/owner/forgot-password"
                  className="font-caption text-xs text-amber-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="owner-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-[#07090e] border border-slate-700 text-white text-xs sm:text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-mono"
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

            {/* Remember Device & Strict Session Notice */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-amber-400"
                />
                <span className="font-caption text-xs text-slate-400">Remember this workstation</span>
              </label>
              <span className="font-mono text-[10px] text-amber-400/80">60m TTL Active</span>
            </div>

            {/* Next Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-caption text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20 disabled:opacity-75 mt-3"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin text-black" />
                  <span>Validating Master Key...</span>
                </>
              ) : (
                <>
                  <span>Verify Primary Credentials</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        )}

        {/* =========================================================================
            STEP 2: MANDATORY 2FA HARDWARE OTP
            ========================================================================= */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-5 animate-fade-in">
            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3 text-xs text-slate-300">
              <Smartphone size={18} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block mb-0.5">2FA Challenge Dispatched</span>
                <span>Enter the 6-digit OTP from your authenticator app or hardware token (Demo OTP: <strong className="text-amber-400 font-mono">849201</strong>).</span>
              </div>
            </div>

            <div>
              <label htmlFor="owner-2fa-code" className="block font-caption text-xs font-semibold text-slate-300 mb-1.5">
                6-Digit Security Token
              </label>
              <input
                id="owner-2fa-code"
                type="text"
                required
                maxLength={6}
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="849201"
                autoFocus
                className="w-full text-center tracking-[0.5em] text-xl font-mono py-3 rounded-xl bg-[#07090e] border border-amber-500/40 text-amber-400 placeholder:text-slate-700 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-bold"
              />
            </div>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setError('');
                }}
                className="w-1/3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <RotateCcw size={13} />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-caption text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20 disabled:opacity-75"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-black" />
                    <span>Verifying OTP...</span>
                  </>
                ) : (
                  <>
                    <Crown size={15} />
                    <span>Authorize Owner Session</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Security Disclaimers & Portal Links */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 text-amber-400/70">
            <ShieldAlert size={12} />
            <span>Root Audit Enforcement</span>
          </div>
          <Link to="/admin/login" className="hover:text-slate-300 transition-colors">
            Staff Admin Portal &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
