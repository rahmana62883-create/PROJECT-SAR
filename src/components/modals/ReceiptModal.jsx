import React from 'react';
import { useWallet } from '../../context/WalletContext';

export const ReceiptModal = () => {
  const { currentReceipt, isReceiptModalOpen, closeReceipt } = useWallet();

  if (!isReceiptModalOpen || !currentReceipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 animate-fade-in"
      onClick={closeReceipt}
      role="dialog"
      aria-modal="true"
      aria-label="Official Transaction Receipt"
    >
      <div className="relative w-full max-w-lg bg-fc-surface border border-fc-border rounded-fc-lg shadow-fc-modal p-6 sm:p-8 animate-scale-up" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-fc-secondary hover:bg-fc-tertiary text-fc-text-secondary hover:text-fc-text-primary flex items-center justify-center text-xl cursor-pointer transition-colors"
          onClick={closeReceipt}
          aria-label="Close Modal"
        >
          &times;
        </button>

        <div className="py-2">
          <div className="text-center border-b border-fc-border pb-4 mb-5">
            <div className="text-3xl mb-1">⚡</div>
            <h3 className="text-xl font-extrabold text-fc-text-primary tracking-tight">flashcompare<span className="text-electric-blue">.ai</span></h3>
            <p className="text-xs text-fc-text-secondary mt-1">
              Official ACH Transfer & Cashback Settlement Receipt
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3.5 mb-5 text-sm">
            <div>
              <span className="text-xs text-fc-text-tertiary block">Receipt ID</span>
              <strong className="text-xs font-mono text-fc-text-primary">{currentReceipt.receiptId}</strong>
            </div>
            <div>
              <span className="text-xs text-fc-text-tertiary block">Transfer ID</span>
              <strong className="text-xs font-mono text-fc-text-primary">{currentReceipt.transferId}</strong>
            </div>
            <div>
              <span className="text-xs text-fc-text-tertiary block">Settlement Date</span>
              <span className="text-xs text-fc-text-primary">{currentReceipt.date}</span>
            </div>
            <div>
              <span className="text-xs text-fc-text-tertiary block">Payment Status</span>
              <span className="text-xs text-fc-success font-semibold">✓ {currentReceipt.status}</span>
            </div>
            <div>
              <span className="text-xs text-fc-text-tertiary block">Target Institution</span>
              <span className="text-xs text-fc-text-primary">{currentReceipt.bankName}</span>
            </div>
            <div>
              <span className="text-xs text-fc-text-tertiary block">Account Details</span>
              <span className="text-xs text-fc-text-primary">{currentReceipt.maskedNumber} ({currentReceipt.accountType})</span>
            </div>
          </div>

          <div className="bg-fc-secondary/70 border border-fc-border rounded-fc-md p-4 mb-5 flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-xs text-fc-text-secondary">
              <span>Gross Withdrawal Amount</span>
              <span className="text-fc-text-primary font-medium">${currentReceipt.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-fc-text-secondary">
              <span>Transfer & Processing Fee</span>
              <span className="text-fc-success font-semibold">$0.00 (Zero Fee)</span>
            </div>
            <div className="flex justify-between pt-2.5 mt-1 border-t border-fc-border font-extrabold text-base text-fc-text-primary">
              <span>Net Settled ACH Deposit</span>
              <span className="text-fc-accent">${currentReceipt.netAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="text-[11px] text-fc-text-tertiary text-center leading-relaxed">
            Transaction completed via FedNow / Direct US ACH Clearinghouse network. Simulated record issued by flashcompare.ai Autonomous Arbitrage Intelligence.
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-fc-border mt-4">
          <button
            type="button"
            className="py-2.5 px-4 rounded-fc-md text-xs font-semibold border border-fc-border text-fc-text-secondary hover:text-fc-text-primary hover:bg-fc-secondary transition-colors cursor-pointer"
            onClick={closeReceipt}
          >
            Close
          </button>
          <button
            type="button"
            className="py-2.5 px-5 rounded-fc-md text-xs font-semibold bg-fc-accent hover:bg-fc-accent-hover text-white shadow-md transition-colors cursor-pointer"
            onClick={handlePrint}
          >
            Print / Save as PDF 🖨️
          </button>
        </div>
      </div>
    </div>
  );
};
