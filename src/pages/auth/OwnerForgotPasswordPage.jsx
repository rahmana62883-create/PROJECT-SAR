import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, ArrowLeft, CheckCircle2, Loader2, ShieldAlert, Key } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OwnerForgotPasswordPage = () => {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast('Executive Protocol Armed', 'Out-of-band recovery challenge generated', 'warning');
    }, 700);
  };

  return (
    <div className="min-h-screen w-full bg-[#07090e] flex items-center justify-center p-4 sm:p-6 text-slate-100 selection:bg-amber-500 selection:text-black">
      <div className="w-full max-w-[440px] bg-[#0d1117]/95 backdrop-blur-2xl rounded-3xl border border-amber-500/20 shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-amber-400">
            <Crown size={18} />
            <span className="font-caption text-sm font-bold text-white">
              Owner Disaster Recovery
            </span>
          </div>
          <span className="font-mono text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            Root Protocol
          </span>
        </div>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
              <CheckCircle2 size={28} />
            </div>
            <h2 className="font-heading-sm text-xl font-bold mb-2 text-white">Out-of-Band Challenge Armed</h2>
            <p className="font-body text-xs text-slate-400 mb-6 leading-relaxed">
              Due to executive root privilege, recovery requires out-of-band multi-party hardware confirmation sent to your registered physical security enclave.
            </p>
            <Link
              to="/owner/login"
              className="w-full py-2.5 rounded-xl bg-amber-500 text-black font-caption text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <ArrowLeft size={14} />
              <span>Back to Owner Console</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-2.5 text-xs text-slate-300 mb-5">
              <ShieldAlert size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <span>Master Key recovery triggers immutable audit alerts to all platform security nodes.</span>
            </div>

            <h1 className="font-heading-sm text-xl font-bold tracking-tight mb-1 text-white">
              Executive Key Recovery
            </h1>
            <p className="font-caption text-xs text-slate-400 mb-6 leading-relaxed">
              Enter your Principal Owner credentials to initiate cryptographic identity verification.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-caption text-xs font-semibold text-slate-300 mb-1.5">
                  Principal Owner Email
                </label>
                <div className="relative">
                  <Key size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="owner@flashcompare.ai"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#07090e] border border-slate-700 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-caption text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-75"
              >
                {loading ? <Loader2 size={16} className="animate-spin text-black" /> : <span>Initiate Out-of-Band Challenge</span>}
              </button>

              <div className="text-center pt-2">
                <Link to="/owner/login" className="font-caption text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1">
                  <ArrowLeft size={13} />
                  <span>Return to Owner Console</span>
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
