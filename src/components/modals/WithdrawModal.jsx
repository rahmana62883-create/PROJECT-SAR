import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { useApp } from '../../context/AppContext';

export const WithdrawModal = () => {
  const {
    wallet,
    isWithdrawModalOpen,
    closeWithdrawModal,
    withdrawStep,
    setWithdrawStep,
    pendingWithdrawal,
    initiateWithdrawal,
    proceedToOtp,
    confirmWithdrawal,
    openReceipt
  } = useWallet();

  const { showToast } = useApp();

  const [selectedBankId, setSelectedBankId] = useState(() => {
    return wallet.linkedAccounts[0]?.id || '';
  });
  const [amount, setAmount] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [lastCompletedTx, setLastCompletedTx] = useState(null);

  if (!isWithdrawModalOpen) return null;

  const handleStep1Submit = (e) => {
    e.preventDefault();
    setError('');

    const targetBankId = selectedBankId || wallet.linkedAccounts[0]?.id;
    if (!targetBankId) {
      setError('Please select or link a bank account first.');
      return;
    }

    try {
      initiateWithdrawal(targetBankId, amount);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStep3Submit = (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = confirmWithdrawal(otp);
      setLastCompletedTx(result);
      showToast('Transfer Authorized', 'Funds are processing via Instant ACH.', 'info');
    } catch (err) {
      setError(err.message);
    }
  };

  const setPresetAmount = (val) => {
    if (val === 'max') {
      setAmount(wallet.balance.toFixed(2));
    } else {
      setAmount(String(val));
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 animate-fade-in"
      onClick={closeWithdrawModal}
      role="dialog"
      aria-modal="true"
      aria-label="Withdraw Funds"
    >
      <div className="relative w-full max-w-md bg-fc-surface border border-fc-border rounded-fc-lg shadow-fc-modal p-6 sm:p-8 animate-scale-up" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-fc-secondary hover:bg-fc-tertiary text-fc-text-secondary hover:text-fc-text-primary flex items-center justify-center text-xl cursor-pointer transition-colors"
          onClick={closeWithdrawModal}
          aria-label="Close Modal"
        >
          &times;
        </button>

        {/* Step Indicator Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-fc-accent font-bold">
              Step {withdrawStep} of 5
            </span>
            <h3 className="text-xl font-bold text-fc-text-primary tracking-tight">Instant ACH Withdrawal</h3>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(s => (
              <div
                key={s}
                className={`w-4 h-1 rounded-full transition-colors ${s <= withdrawStep ? 'bg-fc-accent' : 'bg-fc-border'}`}
              />
            ))}
          </div>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-fc-sm bg-fc-danger/15 text-fc-danger text-xs font-medium border border-fc-danger/20">
            {error}
          </div>
        )}

        {/* Step 1: Amount & Destination */}
        {withdrawStep === 1 && (
          <form onSubmit={handleStep1Submit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-fc-text-secondary">Destination Bank Account</label>
              {wallet.linkedAccounts.length === 0 ? (
                <p className="text-fc-warning text-xs">
                  No linked bank accounts found. Please link a bank first.
                </p>
              ) : (
                <select
                  className="w-full px-3.5 py-2.5 rounded-fc-sm bg-fc-secondary border border-fc-border text-sm text-fc-text-primary focus:outline-none focus:border-fc-accent transition-colors"
                  value={selectedBankId || wallet.linkedAccounts[0]?.id}
                  onChange={(e) => setSelectedBankId(e.target.value)}
                >
                  {wallet.linkedAccounts.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.bankName} ({b.maskedNumber}) — {b.accountType}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs text-fc-text-secondary">
                <label className="font-semibold">Transfer Amount ($ USD)</label>
                <span>
                  Available: <strong className="text-fc-text-primary font-bold">${wallet.balance.toFixed(2)}</strong>
                </span>
              </div>
              <input
                type="number"
                className="w-full px-3.5 py-2.5 rounded-fc-sm bg-fc-secondary border border-fc-border text-sm text-fc-text-primary focus:outline-none focus:border-fc-accent transition-colors"
                step="0.01"
                min="5"
                max={wallet.balance}
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />

              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  className="flex-1 py-1 px-2 rounded-fc-sm text-xs font-medium bg-fc-secondary hover:bg-fc-tertiary border border-fc-border text-fc-text-primary transition-colors cursor-pointer disabled:opacity-40"
                  onClick={() => setPresetAmount(25)}
                  disabled={wallet.balance < 25}
                >
                  $25
                </button>
                <button
                  type="button"
                  className="flex-1 py-1 px-2 rounded-fc-sm text-xs font-medium bg-fc-secondary hover:bg-fc-tertiary border border-fc-border text-fc-text-primary transition-colors cursor-pointer disabled:opacity-40"
                  onClick={() => setPresetAmount(50)}
                  disabled={wallet.balance < 50}
                >
                  $50
                </button>
                <button
                  type="button"
                  className="flex-1 py-1 px-2 rounded-fc-sm text-xs font-medium bg-fc-secondary hover:bg-fc-tertiary border border-fc-border text-fc-text-primary transition-colors cursor-pointer disabled:opacity-40"
                  onClick={() => setPresetAmount(100)}
                  disabled={wallet.balance < 100}
                >
                  $100
                </button>
                <button
                  type="button"
                  className="flex-1 py-1 px-2 rounded-fc-sm text-xs font-semibold bg-fc-accent text-white hover:bg-fc-accent-hover transition-colors cursor-pointer disabled:opacity-40 shadow-sm"
                  onClick={() => setPresetAmount('max')}
                  disabled={wallet.balance <= 0}
                >
                  All (${wallet.balance.toFixed(2)})
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-fc-border mt-2">
              <button
                type="button"
                className="py-2.5 px-4 rounded-fc-md text-xs font-semibold border border-fc-border text-fc-text-secondary hover:text-fc-text-primary hover:bg-fc-secondary transition-colors cursor-pointer"
                onClick={closeWithdrawModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2.5 px-5 rounded-fc-md text-xs font-semibold bg-fc-accent hover:bg-fc-accent-hover text-white shadow-md transition-colors cursor-pointer disabled:opacity-40"
                disabled={wallet.balance < 5 || wallet.linkedAccounts.length === 0}
              >
                Review Transfer &rarr;
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Review & Fee Breakdown */}
        {withdrawStep === 2 && pendingWithdrawal && (
          <div className="flex flex-col gap-4">
            <div className="bg-fc-secondary/70 border border-fc-border rounded-fc-md p-4 flex flex-col gap-2 text-xs">
              <div className="flex justify-between text-fc-text-secondary">
                <span>Transfer Amount</span>
                <strong className="text-fc-text-primary">${pendingWithdrawal.amount.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between text-fc-text-secondary">
                <span>Transfer Fee</span>
                <span className="text-fc-success font-semibold">$0.00 (Guaranteed Free)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-fc-border font-bold text-sm text-fc-text-primary">
                <span>Net ACH Deposit</span>
                <strong className="text-base text-fc-accent">${pendingWithdrawal.netAmount.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between text-fc-text-secondary">
                <span>Destination</span>
                <span className="text-fc-text-primary">{pendingWithdrawal.bankName} ({pendingWithdrawal.maskedNumber})</span>
              </div>
              <div className="flex justify-between text-fc-text-secondary">
                <span>Speed</span>
                <span className="text-fc-accent font-medium">⚡ Instant Settlement (FedNow / Direct ACH)</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-fc-border">
              <button
                type="button"
                className="py-2.5 px-4 rounded-fc-md text-xs font-semibold border border-fc-border text-fc-text-secondary hover:text-fc-text-primary hover:bg-fc-secondary transition-colors cursor-pointer"
                onClick={() => setWithdrawStep(1)}
              >
                &larr; Back
              </button>
              <button
                type="button"
                className="py-2.5 px-5 rounded-fc-md text-xs font-semibold bg-fc-accent hover:bg-fc-accent-hover text-white shadow-md transition-colors cursor-pointer"
                onClick={proceedToOtp}
              >
                Continue to Verification &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Step 3: OTP Verification */}
        {withdrawStep === 3 && (
          <form onSubmit={handleStep3Submit} className="flex flex-col gap-4">
            <div className="p-3 rounded-fc-md bg-fc-secondary/60 border border-fc-border text-center">
              <div className="text-[10px] font-extrabold text-fc-text-tertiary tracking-wider mb-1">2-FACTOR VERIFICATION CODE</div>
              <p className="text-xs text-fc-text-secondary">
                Enter the demo authorization passcode: <strong className="text-fc-text-primary font-bold">1234</strong>
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-fc-text-secondary text-center" htmlFor="withdraw-otp-input">4-Digit Security Code</label>
              <input
                id="withdraw-otp-input"
                type="text"
                className="w-full py-3 px-4 rounded-fc-sm bg-fc-secondary border border-fc-border text-2xl text-center font-mono tracking-[0.5em] text-fc-text-primary focus:outline-none focus:border-fc-accent transition-colors"
                maxLength={4}
                placeholder="1234"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                autoFocus
                required
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-fc-border">
              <button
                type="button"
                className="py-2.5 px-4 rounded-fc-md text-xs font-semibold border border-fc-border text-fc-text-secondary hover:text-fc-text-primary hover:bg-fc-secondary transition-colors cursor-pointer"
                onClick={() => setWithdrawStep(2)}
              >
                &larr; Back
              </button>
              <button
                type="submit"
                className="py-2.5 px-5 rounded-fc-md text-xs font-semibold bg-fc-accent hover:bg-fc-accent-hover text-white shadow-md transition-colors cursor-pointer disabled:opacity-40"
                disabled={otp.length !== 4}
              >
                Confirm & Transfer &rarr;
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Transfer in Progress */}
        {withdrawStep === 4 && (
          <div className="text-center py-8 px-2">
            <div className="w-14 h-14 border-4 border-fc-border border-t-fc-accent rounded-full animate-fc-spin mx-auto mb-4" />
            <h4 className="text-lg font-bold text-fc-text-primary mb-2">Processing Instant ACH Transfer</h4>
            <p className="text-xs text-fc-text-secondary max-w-xs mx-auto leading-relaxed">
              Validating routing credentials and clearing transfer through the banking network...
            </p>
          </div>
        )}

        {/* Step 5: Transfer Complete */}
        {withdrawStep === 5 && (
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-fc-success-bg text-fc-success rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
              ✓
            </div>
            <h4 className="text-lg font-bold text-fc-text-primary mb-1">Transfer Completed Successfully!</h4>
            <p className="text-xs text-fc-text-secondary mb-6 max-w-xs mx-auto leading-relaxed">
              Your transfer of <strong className="text-fc-text-primary font-bold">${pendingWithdrawal?.amount.toFixed(2)}</strong> has cleared and is on its way to your {pendingWithdrawal?.bankName} account.
            </p>

            <div className="flex justify-center gap-3 pt-4 border-t border-fc-border">
              <button
                type="button"
                className="py-2.5 px-4 rounded-fc-md text-xs font-semibold border border-fc-border text-fc-text-secondary hover:text-fc-text-primary hover:bg-fc-secondary transition-colors cursor-pointer"
                onClick={() => {
                  if (lastCompletedTx) openReceipt(lastCompletedTx);
                }}
              >
                Print Official Receipt 🖨️
              </button>
              <button
                type="button"
                className="py-2.5 px-5 rounded-fc-md text-xs font-semibold bg-fc-accent hover:bg-fc-accent-hover text-white shadow-md transition-colors cursor-pointer"
                onClick={closeWithdrawModal}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
