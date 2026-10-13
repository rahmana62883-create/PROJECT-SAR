import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, ArrowLeft, CheckCircle2, Loader2, KeyRound } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminForgotPasswordPage = () => {
  const { showToast } = useApp();
  const [operatorId, setOperatorId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast('Recovery Dispatched', `Admin recovery protocol sent for ${operatorId}`, 'info');
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#0d1117] flex items-center justify-center p-4 sm:p-6 text-slate-100 selection:bg-electric-blue selection:text-white">
      <div className="w-full max-w-[420px] bg-[#161b22]/95 backdrop-blur-2xl rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-electric-blue" />
            <span className="font-caption text-sm font-bold text-white">
              Admin Ops Recovery
            </span>
          </div>
          <span className="font-mono text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
            SecOps L3
          </span>
        </div>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 text-electric-blue flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
              <CheckCircle2 size={28} />
            </div>
            <h2 className="font-heading-sm text-xl font-bold mb-2 text-white">Recovery Ticket Created</h2>
            <p className="font-body text-xs text-slate-400 mb-6 leading-relaxed">
              Security operations has dispatched a one-time emergency link to your registered hardware email.
            </p>
            <Link
              to="/admin/login"
              className="w-full py-2.5 rounded-xl bg-electric-blue text-white font-caption text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <ArrowLeft size={14} />
              <span>Back to Admin Portal</span>
            </Link>
          </div>
        ) : (
          <>
            <h1 className="font-heading-sm text-xl font-bold tracking-tight mb-1 text-white">
              Administrator Recovery Protocol
            </h1>
            <p className="font-caption text-xs text-slate-400 mb-6 leading-relaxed">
              Enter your Administrator email or Operator ID to verify hardware token status.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-caption text-xs font-semibold text-slate-300 mb-1.5">
                  Operator Email / ID
                </label>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={operatorId}
                    onChange={(e) => setOperatorId(e.target.value)}
                    placeholder="admin@flashcompare.ai"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0d1117] border border-slate-700 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-electric-blue"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-electric-blue hover:bg-blue-600 text-white font-caption text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-75"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <span>Dispatch Clearance Reset</span>}
              </button>

              <div className="text-center pt-2">
                <Link to="/admin/login" className="font-caption text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1">
                  <ArrowLeft size={13} />
                  <span>Return to Admin Login</span>
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
