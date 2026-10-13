import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const UserForgotPasswordPage = () => {
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
      showToast('Reset Link Dispatched', `Password instructions sent to ${email}`, 'success');
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-paper flex items-center justify-center p-4 sm:p-6 text-primary selection:bg-electric-blue selection:text-paper relative">
      <div className="w-full max-w-[420px] bg-paper/95 backdrop-blur-2xl rounded-3xl border border-hairline/80 shadow-apple-card p-6 sm:p-8 relative z-10 animate-scale-up">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center gap-1.5 text-primary hover:opacity-85">
            <Zap size={18} className="text-electric-blue fill-electric-blue" />
            <span className="font-caption text-sm font-bold tracking-tight">
              flashcompare<span className="text-electric-blue">.ai</span>
            </span>
          </Link>
          <span className="font-micro text-[11px] px-2.5 py-0.5 rounded-full bg-canvas text-secondary font-semibold">
            Customer Recovery
          </span>
        </div>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={28} />
            </div>
            <h2 className="font-heading-sm text-xl font-bold mb-2">Check your inbox</h2>
            <p className="font-body text-xs text-secondary mb-6 leading-relaxed">
              We've sent password reset instructions to <strong className="text-primary">{email}</strong>.
            </p>
            <Link
              to="/login"
              className="w-full py-2.5 rounded-xl bg-electric-blue text-paper font-caption text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <ArrowLeft size={14} />
              <span>Back to Customer Sign In</span>
            </Link>
          </div>
        ) : (
          <>
            <h1 className="font-heading-sm text-2xl font-bold tracking-tight mb-1.5">
              Reset password
            </h1>
            <p className="font-caption text-xs text-secondary mb-6 leading-relaxed">
              Enter your email address and we'll send you a secure link to recover your account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-caption text-xs font-semibold text-primary mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@flashcompare.ai"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-canvas border border-hairline/70 text-primary text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-electric-blue"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-electric-blue hover:bg-electric-blue/90 text-paper font-caption text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-75"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <span>Send Recovery Email</span>}
              </button>

              <div className="text-center pt-2">
                <Link to="/login" className="font-caption text-xs text-secondary hover:text-primary flex items-center justify-center gap-1">
                  <ArrowLeft size={13} />
                  <span>Return to login</span>
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
