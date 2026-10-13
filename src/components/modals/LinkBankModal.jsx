import React, { useState, useEffect, useRef } from 'react';
import { useWallet } from '../../context/WalletContext';
import { useApp } from '../../context/AppContext';
import { X, Building2, ShieldCheck, Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react';

export const LinkBankModal = () => {
  const { isLinkBankModalOpen, closeLinkBankModal, linkBankAccount } = useWallet();
  const { showToast } = useApp();

  const [bankName, setBankName] = useState('');
  const [accountType, setAccountType] = useState('Checking');
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  
  const [showAccount, setShowAccount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const modalRef = useRef(null);

  // Focus management and Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isLinkBankModalOpen) {
        handleClose();
      }
    };
    if (isLinkBankModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLinkBankModalOpen]);

  if (!isLinkBankModalOpen) return null;

  const handleClose = () => {
    if (isSubmitting) return;
    setError('');
    closeLinkBankModal();
  };

  const validate = () => {
    if (!bankName.trim()) return 'Financial Institution Name is required.';
    if (routingNumber.length !== 9) return 'Routing number must be exactly 9 digits.';
    if (accountNumber.length < 4) return 'Account number is too short.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError('');
    setIsSubmitting(true);

    try {
      // Simulate secure API verification delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would call a backend service to verify via Plaid, Stripe, etc.
      // We explicitly mark this as a demo simulation.
      const isDemoEnv = true; 
      
      if (isDemoEnv) {
        const linked = linkBankAccount({
          bankName,
          accountType,
          routingNumber,
          accountNumber
        });
        showToast('Bank Account Linked', `${linked.bankName} (${linked.maskedNumber}) is ready for instant ACH.`, 'success');
        
        // Reset form
        setBankName('');
        setRoutingNumber('');
        setAccountNumber('');
        setAccountType('Checking');
        
        closeLinkBankModal();
      }
    } catch (err) {
      setError(err.message || 'Failed to verify account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bank-modal-title"
    >
      {/* Click-away overlay */}
      <div className="absolute inset-0" onClick={handleClose} />
      
      <div 
        ref={modalRef}
        className="relative w-full max-w-[440px] bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 flex flex-col overflow-hidden animate-scale-up"
        role="document"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-white/5 flex items-center justify-between bg-gray-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 id="bank-modal-title" className="text-[17px] font-semibold text-gray-900 dark:text-white tracking-tight leading-tight">
                Connect Your Bank for Cashback
              </h2>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5 leading-snug pr-4">
                Link an eligible bank account to receive your cashback payouts securely and conveniently.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleClose}
            aria-label="Close modal"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Indicator */}
        <div className="px-6 py-2.5 bg-emerald-50/50 dark:bg-emerald-500/5 border-b border-emerald-100 dark:border-emerald-500/10 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">256-bit Bank-Level Encryption</span>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-red-800 dark:text-red-400">{error}</p>
            </div>
          )}

          <form id="link-bank-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="bankName" className="block text-[13px] font-medium text-gray-700 dark:text-gray-300">
                Financial Institution Name
              </label>
              <input
                id="bankName"
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="e.g. Chase Bank, Wells Fargo, Ally, Citibank"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-[14px] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="accountType" className="block text-[13px] font-medium text-gray-700 dark:text-gray-300">
                Account Type
              </label>
              <select
                id="accountType"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-[14px] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow appearance-none"
                disabled={isSubmitting}
              >
                <option value="Checking">Checking Account</option>
                <option value="Savings">Savings Account</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="routingNumber" className="block text-[13px] font-medium text-gray-700 dark:text-gray-300">
                9-Digit Routing Number
              </label>
              <input
                id="routingNumber"
                type="text"
                inputMode="numeric"
                maxLength={9}
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="000000000"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-[14px] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow font-mono"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="accountNumber" className="block text-[13px] font-medium text-gray-700 dark:text-gray-300">
                Account Number
              </label>
              <div className="relative">
                <input
                  id="accountNumber"
                  type={showAccount ? "text" : "password"}
                  inputMode="numeric"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="••••••••••••"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-[14px] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow font-mono"
                  disabled={isSubmitting}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none rounded-md"
                  onClick={() => setShowAccount(!showAccount)}
                  disabled={isSubmitting}
                  aria-label={showAccount ? "Hide account number" : "Show account number"}
                >
                  {showAccount ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="pt-2">
              <p className="text-[11px] text-gray-500 dark:text-gray-400 text-center px-4">
                This is a secure connection. We do not store your full banking credentials on our servers. (Demo Flow)
              </p>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-gray-50/80 dark:bg-white/[0.02] border-t border-gray-100 dark:border-white/5 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-[14px] font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="link-bank-form"
            disabled={isSubmitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[14px] font-medium text-white bg-blue-600 hover:bg-blue-700 border border-transparent shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#1c1c1e] transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Verify & Link Account</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
