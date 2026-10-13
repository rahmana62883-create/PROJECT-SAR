import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api.js';
import { defaultBankAccounts } from '../data/mockData';

const WalletContext = createContext();

const initialWalletSeed = {
  balance: 342.50,
  lifetimeEarnings: 520.00,
  lifetimeWithdrawn: 177.50,
  linkedAccounts: defaultBankAccounts || [
    {
      id: "bank-chase-01",
      bankName: "Chase Bank",
      accountType: "Checking",
      maskedNumber: "•••• 4289",
      routingNumber: "021000021",
      isDefault: true,
      verified: true,
      linkedAt: "2024-01-15T10:00:00.000Z"
    },
    {
      id: "bank-boa-02",
      bankName: "Bank of America",
      accountType: "Savings",
      maskedNumber: "•••• 9012",
      routingNumber: "121000358",
      isDefault: false,
      verified: true,
      linkedAt: "2024-02-02T10:00:00.000Z"
    }
  ],
  transactions: [
    {
      id: "TRX-892104",
      date: "2026-03-14",
      type: "Cashback Reward (Apple iPhone 15 Pro Max)",
      amount: 35.80,
      status: "Completed",
      receiptId: "RCP-L89K2J",
      bankDetails: { bankName: "flashcompare.ai Reward", maskedNumber: "Instant ACH", accountType: "Direct" }
    },
    {
      id: "TRX-741920",
      date: "2026-03-08",
      type: "Transfer to Bank (•••• 4289)",
      amount: -120.00,
      status: "Completed",
      receiptId: "RCP-M98N21",
      bankDetails: { bankName: "Chase Bank", maskedNumber: "•••• 4289", accountType: "Checking" }
    },
    {
      id: "TRX-551029",
      date: "2026-02-27",
      type: "Cashback Reward (Sony WH-1000XM5)",
      amount: 14.90,
      status: "Completed",
      receiptId: "RCP-P11K99",
      bankDetails: { bankName: "flashcompare.ai Reward", maskedNumber: "Instant ACH", accountType: "Direct" }
    }
  ]
};

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(() => {
    try {
      const stored = localStorage.getItem('fc_wallet');
      return stored ? JSON.parse(stored) : initialWalletSeed;
    } catch {
      return initialWalletSeed;
    }
  });

  const [isLinkBankModalOpen, setIsLinkBankModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawStep, setWithdrawStep] = useState(1);
  const [pendingWithdrawal, setPendingWithdrawal] = useState(null);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // Sync from SQLite Database on load
  useEffect(() => {
    let isMounted = true;
    const syncWalletFromDb = async () => {
      try {
        const remote = await api.wallet.getState();
        if (!isMounted) return;
        if (remote && typeof remote.balance === 'number') {
          setWallet(prev => ({
            ...prev,
            balance: remote.balance,
            lifetimeEarnings: remote.lifetimeEarnings || prev.lifetimeEarnings,
            lifetimeWithdrawn: remote.lifetimeWithdrawn || prev.lifetimeWithdrawn,
            linkedAccounts: remote.linkedAccounts?.length ? remote.linkedAccounts : prev.linkedAccounts,
            transactions: remote.transactions?.length ? remote.transactions : prev.transactions
          }));
        }
      } catch (err) {
        console.warn('[WalletContext] Database sync notice (operating in local fallback):', err.message);
      }
    };
    syncWalletFromDb();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    localStorage.setItem('fc_wallet', JSON.stringify(wallet));
    localStorage.setItem('fc_wallet_balance', wallet.balance.toFixed(2));
  }, [wallet]);

  const linkBankAccount = async (bankData) => {
    if (!bankData.bankName || !bankData.accountNumber || !bankData.routingNumber) {
      throw new Error('Bank name, account number, and routing number are required.');
    }

    const rawNum = String(bankData.accountNumber).replace(/\D/g, '');
    if (rawNum.length < 4) {
      throw new Error('Account number must contain at least 4 digits.');
    }

    const last4 = rawNum.slice(-4);
    const masked = '•••• ' + last4;

    const newAccount = {
      id: 'bank_' + Date.now(),
      bankName: bankData.bankName.trim(),
      accountType: bankData.accountType || 'Checking',
      maskedNumber: masked,
      routingNumber: bankData.routingNumber.trim(),
      isDefault: !!bankData.isDefault || wallet.linkedAccounts.length === 0,
      verified: true,
      linkedAt: new Date().toISOString()
    };

    // Sync with backend API
    api.wallet.linkBank(bankData).catch(() => {});

    setWallet(prev => ({
      ...prev,
      linkedAccounts: [...prev.linkedAccounts, newAccount]
    }));

    setIsLinkBankModalOpen(false);
    return newAccount;
  };

  const unlinkBankAccount = (bankId) => {
    api.wallet.unlinkBank(bankId).catch(() => {});
    setWallet(prev => ({
      ...prev,
      linkedAccounts: prev.linkedAccounts.filter(b => b.id !== bankId)
    }));
  };

  const openWithdrawModal = () => {
    setWithdrawStep(1);
    setPendingWithdrawal(null);
    setIsWithdrawModalOpen(true);
  };

  const closeWithdrawModal = () => {
    setIsWithdrawModalOpen(false);
    setWithdrawStep(1);
  };

  const initiateWithdrawal = (bankAccountId, amount) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      throw new Error('Please enter a valid withdrawal amount.');
    }
    if (numAmount < 5) {
      throw new Error('Minimum withdrawal amount is $5.00.');
    }
    if (numAmount > wallet.balance) {
      throw new Error(`Insufficient balance. Available: $${wallet.balance.toFixed(2)}`);
    }

    const bank = wallet.linkedAccounts.find(a => a.id === bankAccountId);
    if (!bank) {
      throw new Error('Selected bank account not found.');
    }

    const demoOtp = '1234';
    const transferId = 'TRX-' + Math.floor(100000 + Math.random() * 900000);

    const pending = {
      transferId,
      bankAccountId: bank.id,
      bankName: bank.bankName,
      maskedNumber: bank.maskedNumber,
      accountType: bank.accountType,
      amount: numAmount,
      fee: 0.00,
      netAmount: numAmount,
      otp: demoOtp,
      createdAt: new Date().toISOString()
    };

    setPendingWithdrawal(pending);
    setWithdrawStep(2); // Go to review
    return pending;
  };

  const proceedToOtp = () => {
    setWithdrawStep(3); // OTP verification
  };

  const confirmWithdrawal = (enteredOtp) => {
    if (!pendingWithdrawal) {
      throw new Error('No pending withdrawal session.');
    }

    const cleanOtp = String(enteredOtp).trim();
    if (cleanOtp !== pendingWithdrawal.otp && cleanOtp !== '1234') {
      throw new Error('Invalid verification code. Please use demo code 1234.');
    }

    setWithdrawStep(4); // Processing

    const receiptId = 'RCP-' + Date.now().toString(36).toUpperCase();
    const newTx = {
      id: pendingWithdrawal.transferId,
      date: new Date().toISOString().split('T')[0],
      type: `Transfer to Bank (${pendingWithdrawal.maskedNumber})`,
      amount: -pendingWithdrawal.amount,
      status: 'Processing',
      bankDetails: {
        bankName: pendingWithdrawal.bankName,
        maskedNumber: pendingWithdrawal.maskedNumber,
        accountType: pendingWithdrawal.accountType
      },
      receiptId
    };

    const updatedBalance = Math.max(0, wallet.balance - pendingWithdrawal.amount);
    const updatedWithdrawn = (wallet.lifetimeWithdrawn || 0) + pendingWithdrawal.amount;

    setWallet(prev => ({
      ...prev,
      balance: updatedBalance,
      lifetimeWithdrawn: updatedWithdrawn,
      transactions: [newTx, ...prev.transactions]
    }));

    // Sync withdrawal with SQLite backend
    api.wallet.withdraw(pendingWithdrawal.amount, pendingWithdrawal.bankAccountId, cleanOtp).catch(console.warn);

    // Simulate instant 3-second ACH settlement
    setTimeout(() => {
      setWallet(prev => ({
        ...prev,
        transactions: prev.transactions.map(t =>
          t.id === newTx.id ? { ...t, status: 'Completed' } : t
        )
      }));
      setWithdrawStep(5); // Completed
    }, 3000);

    return { ...pendingWithdrawal, receiptId };
  };

  const openReceipt = (transactionOrPending) => {
    const receiptData = {
      receiptId: transactionOrPending.receiptId || 'RCP-LIVE-' + Math.floor(Math.random() * 8999 + 1000),
      transferId: transactionOrPending.id || transactionOrPending.transferId,
      date: transactionOrPending.date || new Date().toISOString().split('T')[0],
      amount: Math.abs(transactionOrPending.amount),
      fee: 0.00,
      netAmount: Math.abs(transactionOrPending.amount),
      status: transactionOrPending.status || 'Completed',
      bankName: transactionOrPending.bankDetails?.bankName || transactionOrPending.bankName || 'Chase Bank',
      maskedNumber: transactionOrPending.bankDetails?.maskedNumber || transactionOrPending.maskedNumber || '•••• 4289',
      accountType: transactionOrPending.bankDetails?.accountType || transactionOrPending.accountType || 'Checking',
      routingNumber: '021000021'
    };
    setCurrentReceipt(receiptData);
    setIsReceiptModalOpen(true);
  };

  const closeReceipt = () => {
    setIsReceiptModalOpen(false);
    setCurrentReceipt(null);
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        isLinkBankModalOpen,
        openLinkBankModal: () => setIsLinkBankModalOpen(true),
        closeLinkBankModal: () => setIsLinkBankModalOpen(false),
        linkBankAccount,
        unlinkBankAccount,
        isWithdrawModalOpen,
        openWithdrawModal,
        closeWithdrawModal,
        withdrawStep,
        setWithdrawStep,
        pendingWithdrawal,
        initiateWithdrawal,
        proceedToOtp,
        confirmWithdrawal,
        currentReceipt,
        isReceiptModalOpen,
        openReceipt,
        closeReceipt
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
