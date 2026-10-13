import React, { useState } from 'react';
import { db } from '../../services/firebaseMock';

export const PriceAlertModal = ({ product, isOpen, onClose }) => {
  const [targetPrice, setTargetPrice] = useState(product?.currentBestPrice || 0);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Sync state if product changes
  React.useEffect(() => {
    if (product && !targetPrice) {
      setTargetPrice(product.currentBestPrice);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || targetPrice <= 0) {
      setError('Please provide a valid email and target price.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      await db.savePriceAlert({
        productId: product.id,
        targetPrice: parseFloat(targetPrice),
        email,
        productName: product.name || product.title,
      });
      setSuccess(true);
    } catch (err) {
      setError('Failed to save alert. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 animate-fade-in">
        <div className="relative w-full max-w-md bg-fc-surface border border-fc-border rounded-fc-lg shadow-fc-modal overflow-hidden animate-scale-up">
          <div className="flex items-center justify-between px-6 py-4 border-b border-fc-border bg-fc-secondary/50">
            <h3 className="text-base font-bold text-fc-text-primary tracking-tight">Alert Created ✨</h3>
            <button
              className="w-8 h-8 rounded-full bg-fc-secondary hover:bg-fc-tertiary text-fc-text-secondary hover:text-fc-text-primary flex items-center justify-center text-xl cursor-pointer transition-colors"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <div className="p-6 flex flex-col gap-4">
            <p className="text-sm text-fc-text-secondary leading-relaxed">
              You'll receive an email at <strong className="text-fc-text-primary">{email}</strong> when <strong className="text-fc-text-primary">{product.name || product.title}</strong> drops to <strong className="text-fc-text-primary">${targetPrice}</strong> or below.
            </p>
            <button
              className="w-full py-2.5 px-4 rounded-fc-md font-semibold text-xs bg-fc-accent hover:bg-fc-accent-hover text-white shadow-sm transition-colors cursor-pointer mt-2"
              onClick={() => { setSuccess(false); onClose(); }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-fc-surface border border-fc-border rounded-fc-lg shadow-fc-modal overflow-hidden animate-scale-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-fc-border bg-fc-secondary/50">
          <h3 className="text-base font-bold text-fc-text-primary tracking-tight">Track Price Drops</h3>
          <button
            className="w-8 h-8 rounded-full bg-fc-secondary hover:bg-fc-tertiary text-fc-text-secondary hover:text-fc-text-primary flex items-center justify-center text-xl cursor-pointer transition-colors"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <form className="p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <p className="text-xs text-fc-text-secondary">
            Current best price: <strong className="text-fc-text-primary font-bold">${product.currentBestPrice}</strong>
          </p>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-fc-text-secondary">Target Price ($)</label>
            <input 
              type="number" 
              className="w-full px-3.5 py-2.5 rounded-fc-sm bg-fc-secondary border border-fc-border text-sm text-fc-text-primary focus:outline-none focus:border-fc-accent transition-colors"
              step="0.01"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-fc-text-secondary">Notification Email</label>
            <input 
              type="email" 
              className="w-full px-3.5 py-2.5 rounded-fc-sm bg-fc-secondary border border-fc-border text-sm text-fc-text-primary placeholder:text-fc-text-tertiary focus:outline-none focus:border-fc-accent transition-colors"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <small className="text-[11px] text-fc-text-tertiary">We respect your privacy. No spam.</small>
          </div>

          {error && <div className="p-3 rounded-fc-sm bg-fc-danger/15 text-fc-danger text-xs font-medium border border-fc-danger/20">{error}</div>}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-fc-border mt-2">
            <button
              type="button"
              className="py-2.5 px-4 rounded-fc-md text-xs font-semibold border border-fc-border text-fc-text-secondary hover:text-fc-text-primary hover:bg-fc-secondary transition-colors cursor-pointer"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-5 rounded-fc-md text-xs font-semibold bg-fc-accent hover:bg-fc-accent-hover text-white shadow-md transition-colors cursor-pointer disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Setting Alert...' : 'Set Alert'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
