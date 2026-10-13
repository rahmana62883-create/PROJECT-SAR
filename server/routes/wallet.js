import express from 'express';
import db, { getStatement, runTransaction } from '../db.js';

const router = express.Router();

const getUserId = (req) => {
  return req.user?.id || req.headers['x-user-id'] || 'usr-01';
};

// 1. Get Wallet State (Instant query via user_id indexes)
router.get('/', (req, res) => {
  try {
    const userId = getUserId(req);
    const user = getStatement('SELECT cashback_balance FROM users WHERE id = ?').get(userId);
    const balance = user ? Number(user.cashback_balance) : 342.50;

    const bankRows = getStatement('SELECT * FROM bank_accounts WHERE user_id = ? ORDER BY is_default DESC, linked_at DESC').all(userId);
    const linkedAccounts = bankRows.map(b => ({
      id: b.id,
      bankName: b.bank_name,
      accountType: b.account_type,
      maskedNumber: b.masked_number,
      routingNumber: b.routing_number,
      isDefault: Boolean(b.is_default),
      verified: Boolean(b.verified),
      linkedAt: b.linked_at
    }));

    const txRows = getStatement('SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC, id DESC LIMIT 100').all(userId);
    const transactions = txRows.map(t => {
      let details = null;
      try {
        details = t.bank_details ? JSON.parse(t.bank_details) : null;
      } catch {
        details = null;
      }
      return {
        id: t.id,
        date: t.date,
        type: t.type,
        amount: Number(t.amount),
        status: t.status,
        receiptId: t.receipt_id,
        bankDetails: details
      };
    });

    const lifetimeEarnings = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const lifetimeWithdrawn = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));

    res.json({
      balance,
      lifetimeEarnings,
      lifetimeWithdrawn,
      linkedAccounts,
      transactions
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Link Bank Account
router.post('/banks', (req, res) => {
  try {
    const userId = getUserId(req);
    const { bankName, accountType, accountNumber, routingNumber } = req.body;

    if (!bankName || !accountNumber || !routingNumber) {
      return res.status(400).json({ error: 'Bank name, account number, and routing number are required.' });
    }

    const rawNum = String(accountNumber).replace(/\D/g, '');
    if (rawNum.length < 4) {
      return res.status(400).json({ error: 'Account number must contain at least 4 digits.' });
    }

    const last4 = rawNum.slice(-4);
    const masked = '•••• ' + last4;
    const id = 'bank_' + Date.now();
    const linkedAt = new Date().toISOString();

    const existingCount = getStatement('SELECT COUNT(*) as count FROM bank_accounts WHERE user_id = ?').get(userId).count;
    const isDefault = existingCount === 0 ? 1 : 0;

    getStatement(`
      INSERT INTO bank_accounts (id, user_id, bank_name, account_type, masked_number, routing_number, is_default, verified, linked_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)
    `).run(id, userId, bankName.trim(), accountType || 'Checking', masked, routingNumber.trim(), isDefault, linkedAt);

    const created = getStatement('SELECT * FROM bank_accounts WHERE id = ?').get(id);
    res.status(201).json({
      id: created.id,
      bankName: created.bank_name,
      accountType: created.account_type,
      maskedNumber: created.masked_number,
      routingNumber: created.routing_number,
      isDefault: Boolean(created.is_default),
      verified: Boolean(created.verified),
      linkedAt: created.linked_at
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Unlink Bank Account
router.delete('/banks/:id', (req, res) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;

    const count = getStatement('SELECT COUNT(*) as count FROM bank_accounts WHERE user_id = ?').get(userId).count;
    if (count <= 1) {
      return res.status(400).json({ error: 'You must maintain at least one linked account for disbursements.' });
    }

    db.prepare('DELETE FROM bank_accounts WHERE id = ? AND user_id = ?').run(id, userId);
    res.json({ success: true, removedId: id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Submit Withdrawal with Security OTP & Atomic ACID Transaction
router.post('/withdraw', (req, res) => {
  try {
    const userId = getUserId(req);
    const { amount, bankAccountId, otpCode } = req.body;
    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ error: 'Please enter a valid withdrawal amount.' });
    }

    if (numericAmount < 10) {
      return res.status(400).json({ error: 'Minimum withdrawal amount is $10.00.' });
    }

    // Security OTP challenge check (Demo PIN: 1234)
    if (otpCode !== '1234') {
      return res.status(400).json({ error: 'Invalid verification code. Please use security code 1234.' });
    }

    const bank = getStatement('SELECT * FROM bank_accounts WHERE id = ? AND user_id = ?').get(bankAccountId, userId);
    if (!bank) {
      return res.status(400).json({ error: 'Selected disbursement bank account could not be verified.' });
    }

    const txId = 'TRX-' + Math.floor(100000 + Math.random() * 900000);
    const receiptId = 'RCP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const now = new Date().toISOString();

    const bankDetails = {
      bankName: bank.bank_name,
      maskedNumber: bank.masked_number,
      accountType: bank.account_type
    };

    // Execute atomic balance deduction and ledger creation inside a single ACID transaction
    const withdrawalResult = runTransaction(() => {
      const user = getStatement('SELECT cashback_balance FROM users WHERE id = ?').get(userId);
      const currentBalance = user ? Number(user.cashback_balance) : 0;
      if (numericAmount > currentBalance) {
        throw new Error(`Insufficient funds. Your current balance is $${currentBalance.toFixed(2)}.`);
      }

      const newBalance = currentBalance - numericAmount;
      getStatement('UPDATE users SET cashback_balance = ? WHERE id = ?').run(newBalance, userId);

      getStatement(`
        INSERT INTO transactions (id, user_id, date, type, amount, status, receipt_id, bank_details)
        VALUES (?, ?, ?, ?, ?, 'Completed', ?, ?)
      `).run(
        txId,
        userId,
        now.split('T')[0],
        `Transfer to Bank (${bank.masked_number})`,
        -numericAmount,
        receiptId,
        JSON.stringify(bankDetails)
      );

      return { newBalance };
    });

    const receipt = {
      id: receiptId,
      transactionId: txId,
      date: now,
      amount: numericAmount,
      fee: 0.00,
      totalTransferred: numericAmount,
      bank: bankDetails,
      status: 'Completed',
      settlementSpeed: 'Instant ACH Clearing Network'
    };

    res.json({
      success: true,
      newBalance: withdrawalResult.newBalance,
      receipt
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
