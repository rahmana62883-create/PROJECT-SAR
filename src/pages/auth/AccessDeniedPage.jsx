import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, LogOut, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AccessDeniedPage = ({ requiredRole = 'Administrator', currentRole = 'Customer' }) => {
  const { signOut, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSwitchAccount = () => {
    signOut();
    if (requiredRole.toLowerCase().includes('owner')) {
      navigate('/owner/login');
    } else if (requiredRole.toLowerCase().includes('admin')) {
      navigate('/admin/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen w-full bg-paper flex items-center justify-center p-6 antialiased text-primary selection:bg-electric-blue selection:text-paper">
      <div className="max-w-md w-full bg-canvas/70 backdrop-blur-xl rounded-3xl p-8 border border-hairline/80 shadow-apple-card text-center flex flex-col items-center">
        
        {/* Security Shield Icon */}
        <div className="w-16 h-16 rounded-2xl bg-danger/10 text-danger flex items-center justify-center mb-5 border border-danger/20 shadow-xs">
          <ShieldAlert size={32} />
        </div>

        {/* 403 Eyebrow */}
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-danger px-3 py-1 rounded-full bg-danger/10 border border-danger/20 mb-3">
          403 — Access Denied
        </span>

        {/* Heading */}
        <h1 className="font-heading-sm text-2xl font-bold text-primary mb-2">
          Clearance Level Insufficient
        </h1>

        {/* Subhead with context */}
        <p className="font-body text-secondary text-sm leading-relaxed mb-6">
          You are currently signed in as <span className="font-semibold text-primary capitalize">{currentUser?.name || currentRole} ({currentRole})</span>. 
          This portal requires verified <span className="font-semibold text-danger capitalize">{requiredRole}</span> privileges.
        </p>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3">
          <button
            type="button"
            className="w-full py-3 px-4 rounded-xl bg-electric-blue hover:bg-electric-blue/90 text-paper font-caption text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            onClick={handleSwitchAccount}
          >
            <KeyRound size={15} />
            <span>Sign In with {requiredRole} Account</span>
          </button>

          <Link
            to="/dashboard"
            className="w-full py-2.5 px-4 rounded-xl bg-paper hover:bg-surface-variant text-primary font-caption text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-hairline/60"
          >
            <ArrowLeft size={14} />
            <span>Return to User Dashboard</span>
          </Link>

          <button
            type="button"
            className="w-full py-2 px-3 text-secondary hover:text-danger text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            onClick={() => {
              signOut();
              navigate('/login');
            }}
          >
            <LogOut size={13} />
            <span>Sign Out Completely</span>
          </button>
        </div>
      </div>
    </div>
  );
};
