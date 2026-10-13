import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Zap, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { DEMO_ACCOUNTS } from '../../services/authService';

export const UserLoginPage = () => {
  const { signInUser, signUpUser } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  // Mode: Sign In vs Sign Up
  const [isSignUp, setIsSignUp] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('user@flashcompare.ai');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const redirectPath = location.state?.from?.pathname || '/dashboard';

  const handleAutofillDemo = () => {
    setEmail(DEMO_ACCOUNTS.user.email);
    setPassword(DEMO_ACCOUNTS.user.password);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        const newUser = await signUpUser(name, email, password);
        showToast('Account Created', `Welcome to flashcompare.ai, ${newUser.name}!`, 'success');
        navigate(redirectPath, { replace: true });
      } else {
        const user = await signInUser(email, password, rememberMe);
        showToast('Welcome Back', `Signed in as ${user.name}.`, 'success');
        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = (provider) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const user = await signInUser('user@flashcompare.ai', 'password123', true);
        showToast('Social Sign-In', `Authenticated with ${provider} as ${user.name}.`, 'success');
        navigate(redirectPath, { replace: true });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-paper flex items-center justify-center p-4 sm:p-6 antialiased text-primary selection:bg-electric-blue selection:text-paper relative overflow-hidden">
      
      {/* Subtle Liquid Morphism Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-electric-blue/10 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"></div>

      {/* Main Glassmorphic Auth Card */}
      <div className="w-full max-w-[440px] bg-paper/90 backdrop-blur-2xl rounded-3xl border border-hairline/80 shadow-apple-card p-6 sm:p-9 relative z-10 animate-scale-up">
        
        {/* Top Brand & Home Link */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/" 
            className="flex items-center gap-1.5 text-primary hover:opacity-85 transition-opacity"
            title="Return to flashcompare.ai"
          >
            <Zap size={18} className="text-electric-blue fill-electric-blue" />
            <span className="font-caption text-sm font-bold tracking-tight text-primary">
              flashcompare<span className="text-electric-blue font-bold">.ai</span>
            </span>
          </Link>

          <span className="font-micro text-[11px] px-2.5 py-0.5 rounded-full bg-canvas text-secondary font-semibold">
            Customer Portal
          </span>
        </div>

        {/* Header Titles */}
        <div className="mb-7 text-left">
          <h1 className="font-heading-sm text-2xl sm:text-[28px] font-bold text-primary tracking-tight mb-1.5">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="font-caption text-xs sm:text-sm text-secondary">
            {isSignUp 
              ? 'Join 84,000+ smart shoppers tracking verified hardware pricing' 
              : 'Sign in to your FlashCompare account'}
          </p>
        </div>

        {/* Demo Quickfill Pill */}
        <div className="mb-5 p-2.5 rounded-2xl bg-canvas/60 border border-hairline/60 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse shrink-0"></span>
            <span className="font-micro text-[11px] text-secondary truncate">
              Demo: <strong className="text-primary font-semibold">user@flashcompare.ai</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={handleAutofillDemo}
            className="shrink-0 text-electric-blue hover:underline font-caption text-xs font-semibold cursor-pointer"
          >
            Autofill
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 rounded-2xl bg-danger/10 border border-danger/20 text-danger flex items-start gap-2.5 text-xs animate-shake">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{error}</span>
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name (Sign Up only) */}
          {isSignUp && (
            <div>
              <label htmlFor="user-name" className="block font-caption text-xs font-semibold text-primary mb-1.5">
                Full Name
              </label>
              <input
                id="user-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Thorne"
                autoComplete="name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-hairline/70 text-primary text-xs sm:text-sm placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-electric-blue transition-all"
              />
            </div>
          )}

          {/* Email Address */}
          <div>
            <label htmlFor="user-email" className="block font-caption text-xs font-semibold text-primary mb-1.5">
              Email address
            </label>
            <input
              id="user-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              autoComplete="email"
              className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-hairline/70 text-primary text-xs sm:text-sm placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-electric-blue transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="user-password" className="font-caption text-xs font-semibold text-primary">
                Password
              </label>
              {!isSignUp && (
                <Link
                  to="/forgot-password"
                  className="font-caption text-xs text-electric-blue hover:underline"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative">
              <input
                id="user-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-canvas border border-hairline/70 text-primary text-xs sm:text-sm placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-electric-blue transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-electric-blue border-hairline focus:ring-electric-blue"
              />
              <span className="font-caption text-xs text-secondary">Remember me</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-electric-blue hover:bg-electric-blue/90 text-paper font-caption text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-75 mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>{isSignUp ? 'Create Free Account' : 'Sign In'}</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        {/* Social Sign-In Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-[1px] flex-1 bg-hairline/60"></div>
          <span className="font-micro text-[11px] text-secondary uppercase tracking-wider">Or continue with</span>
          <div className="h-[1px] flex-1 bg-hairline/60"></div>
        </div>

        {/* Google & Apple 1-Click Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleSocialSignIn('Google')}
            className="py-2.5 px-3 rounded-xl bg-canvas hover:bg-surface-variant border border-hairline/60 font-caption text-xs font-medium text-primary flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn('Apple')}
            className="py-2.5 px-3 rounded-xl bg-canvas hover:bg-surface-variant border border-hairline/60 font-caption text-xs font-medium text-primary flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current text-primary" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.59-7.7-11.72-13.98-6.09-9.13-10.74-19.34-13.96-30.64-3.21-11.3-4.83-22.06-4.83-32.28 0-14.12 3.69-25.75 11.06-34.88 7.37-9.13 16.51-13.79 27.42-13.98 4.58 0 9.83 1.25 15.75 3.75 5.92 2.5 9.77 3.81 11.55 3.93 1.57-.12 5.56-1.46 11.97-4.03 6.41-2.57 11.72-3.77 15.94-3.6 11.83.63 21.36 4.96 28.58 12.98-10.37 6.27-15.43 14.99-15.18 26.15.25 8.78 3.65 16.14 10.21 22.08 6.56 5.94 14.38 9.38 23.46 10.32-2.12 6.55-4.7 13.13-7.74 19.74zM119.22 33.05c0-7.39 2.66-14.15 7.98-20.27 5.32-6.13 11.89-9.96 19.7-11.51.22 1.34.33 2.54.33 3.61 0 7.39-2.77 14.3-8.31 20.73-5.54 6.43-12.27 10.15-20.2 11.16-.23-1.07-.35-2.31-.35-3.72z" />
            </svg>
            <span>Apple</span>
          </button>
        </div>

        {/* Toggle between Login and Sign Up */}
        <div className="text-center pt-2 border-t border-hairline/60">
          <p className="font-caption text-xs text-secondary">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(p => !p);
                setError('');
              }}
              className="text-electric-blue hover:underline font-semibold cursor-pointer"
            >
              {isSignUp ? 'Sign in' : 'Create account'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
