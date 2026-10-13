import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export const AuthPage = () => {
  const { signIn, loginCustomer, loginAdmin } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('alex.thorne@example.com');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleExit = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const applyPreset = (presetRole) => {
    setError('');
    if (presetRole === 'customer') {
      setEmail('alex.thorne@example.com');
      setPassword('demo123');
      loginCustomer();
      showToast('Customer Preset Active', 'Signed in as Alex Thorne ($5.00 Balance).', 'success');
      setTimeout(() => navigate('/account'), 600);
    } else {
      setEmail('admin@flashcompare.ai');
      setPassword('admin2026');
      loginAdmin();
      showToast('Admin Clearance Granted', 'Signed in as Elena Rostova (SecOps Auditor).', 'success');
      setTimeout(() => navigate('/admin'), 600);
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsVerifying(true);

    setTimeout(() => {
      try {
        const user = signIn(email, password);
        showToast('Login Successful', `Welcome back, ${user.name}!`, 'success');
        setIsVerifying(false);
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/account');
        }
      } catch (err) {
        setIsVerifying(false);
        setError(err.message || 'Invalid email or password.');
        showToast('Login Error', err.message, 'error');
      }
    }, 600);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 antialiased"
      style={{
        background: 'linear-gradient(135deg, #2f80ed 0%, #4468d7 35%, #6a4ec5 70%, #903cb6 100%)'
      }}
    >
      {/* Floating Crisp White Login Card */}
      <div className="relative w-full max-w-[370px] bg-white rounded-[20px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] px-8 py-9 sm:px-9 sm:py-10 transition-all">
        
        {/* Exit Option '✕' Button */}
        <button
          type="button"
          onClick={handleExit}
          aria-label="Exit"
          className="absolute top-4 right-4 w-7 h-7 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer text-xl leading-none"
          title="Exit to Storefront"
        >
          &times;
        </button>

        {/* Title */}
        <h1 className="text-[26px] font-bold text-gray-900 text-center mb-8 tracking-tight font-sans">
          {isSignUpMode ? 'Sign Up' : 'Login'}
        </h1>

        {/* Error message */}
        {error && (
          <div className="mb-5 p-2.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium border border-red-200 text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-6">
          {/* Email Underline Input */}
          <div className="relative">
            <input
              id="auth-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pb-2 pt-1 border-b border-gray-300 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#4468d7] focus:outline-none transition-colors bg-transparent rounded-none"
            />
          </div>

          {/* Password Underline Input */}
          <div className="relative">
            <input
              id="auth-password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pb-2 pt-1 pr-8 border-b border-gray-300 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#4468d7] focus:outline-none transition-colors bg-transparent rounded-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-0 bottom-2 text-gray-400 hover:text-gray-600 transition-colors p-0.5 cursor-pointer bg-transparent border-none flex items-center justify-center"
              aria-label="Toggle password visibility"
            >
              <span className="material-symbols-outlined text-[18px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>

          {/* Gradient Submit Button */}
          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-2.5 rounded-[6px] text-white font-medium text-sm transition-opacity hover:opacity-95 shadow-sm cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2 mt-2"
            style={{
              background: 'linear-gradient(90deg, #2b86c5 0%, #4f6bd4 50%, #8c3ab9 100%)'
            }}
          >
            {isVerifying ? (
              <span className="inline-flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                <span>Authenticating...</span>
              </span>
            ) : (
              <span>{isSignUpMode ? 'Sign Up' : 'Login'}</span>
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-center text-xs text-gray-500 space-y-2">
          <div>
            Forgot{' '}
            <button
              type="button"
              onClick={() => showToast('Password Assistance', 'Use default demo credentials: password is demo123 (Customer) or admin2026 (Admin).', 'info')}
              className="text-[#2b86c5] hover:underline font-normal cursor-pointer bg-transparent border-none p-0"
            >
              Password
            </button>
            ?
          </div>
          <div>
            {isSignUpMode ? (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUpMode(false)}
                  className="text-[#2b86c5] hover:underline font-semibold cursor-pointer bg-transparent border-none p-0"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUpMode(true)}
                  className="text-[#2b86c5] hover:underline font-semibold cursor-pointer bg-transparent border-none p-0"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>

        {/* 1-Click Quick Demo Access */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-2">
          <span className="text-[11px] text-gray-400 font-medium">1-Click:</span>
          <button
            type="button"
            onClick={() => applyPreset('customer')}
            className="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors cursor-pointer"
          >
            Alex (Customer)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('admin')}
            className="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors cursor-pointer"
          >
            Elena (Admin)
          </button>
        </div>

      </div>
    </div>
  );
};
