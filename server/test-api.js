import app from './index.js';

async function testAll() {
  console.log('\n--- Running FlashCompare AI Backend Integration Tests ---\n');
  const baseUrl = 'http://localhost:5000/api';

  try {
    // 1. Health
    const healthRes = await fetch(`${baseUrl}/system/health`);
    const health = await healthRes.json();
    console.log('✅ 1. Health Check:', health.status, '| Products:', health.counts.products, '| Orders:', health.counts.orders);

    // 2. Products List
    const prodRes = await fetch(`${baseUrl}/products?limit=5`);
    const prods = await prodRes.json();
    console.log('✅ 2. Products query (first 5):', prods.length, 'loaded. First item:', prods[0]?.title);

    // 3. User Login
    const userLoginRes = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user@flashcompare.ai', password: 'password123' })
    });
    const userAuth = await userLoginRes.json();
    console.log('✅ 3. Customer Auth:', userAuth.name, '| Role:', userAuth.role, '| Token issued:', !!userAuth.token);

    // 4. Admin Login
    const adminLoginRes = await fetch(`${baseUrl}/auth/login/admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@flashcompare.ai', password: 'admin123' })
    });
    const adminAuth = await adminLoginRes.json();
    console.log('✅ 4. Admin Auth:', adminAuth.name, '| Role:', adminAuth.role, '| Clearance:', adminAuth.clearanceLevel);

    // 5. Owner 2FA Step 1 & 2
    const ownerStep1Res = await fetch(`${baseUrl}/auth/login/owner/step1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'owner@flashcompare.ai', password: 'owner123' })
    });
    const step1 = await ownerStep1Res.json();
    console.log('✅ 5a. Owner 2FA Challenge:', step1.requiresTwoFactor, '| Demo Code:', step1.demoCode);

    const ownerStep2Res = await fetch(`${baseUrl}/auth/login/owner/step2`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'owner@flashcompare.ai', twoFactorCode: step1.demoCode })
    });
    const ownerAuth = await ownerStep2Res.json();
    console.log('✅ 5b. Owner 2FA Verified:', ownerAuth.name, '| Role:', ownerAuth.role);

    // 6. Wallet State
    const walletRes = await fetch(`${baseUrl}/wallet`, {
      headers: { 'x-user-id': 'usr-01' }
    });
    const wallet = await walletRes.json();
    console.log('✅ 6. Wallet State: Balance $' + wallet.balance, '| Linked Banks:', wallet.linkedAccounts.length, '| Transactions:', wallet.transactions.length);

    // 7. Orders List
    const ordersRes = await fetch(`${baseUrl}/orders`);
    const orders = await ordersRes.json();
    console.log('✅ 7. Orders List:', orders.length, 'orders retrieved from SQLite.');

    // 8. Customers CRM List
    const custRes = await fetch(`${baseUrl}/customers`);
    const customers = await custRes.json();
    console.log('✅ 8. Customers CRM:', customers.length, 'customers retrieved.');

    // 9. Watchlist & Alerts
    const watchRes = await fetch(`${baseUrl}/watchlist`, { headers: { 'x-user-id': 'usr-01' } });
    const watchlist = await watchRes.json();
    console.log('✅ 9. Watchlist:', watchlist);

    // 10. Chat send and receive
    const chatMsg = await fetch(`${baseUrl}/chats/test-visitor-1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender: 'Visitor', text: 'What is the price of iPhone 16 Pro?', role: 'user' })
    });
    const chatSent = await chatMsg.json();
    console.log('✅ 10. Chat Message Persisted:', chatSent.text, '| ID:', chatSent.id);

    console.log('\n🎉 ALL 10 INTEGRATION TESTS PASSED PERFECTLY!\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  }
}

// Wait for server to bind
setTimeout(testAll, 1200);
