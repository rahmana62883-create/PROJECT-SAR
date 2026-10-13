import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'screenshots/flashcompare-ai');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
  const missing = [];
  const success = [];

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    defaultViewport: { width: 1280, height: 900 }
  });

  const page = await browser.newPage();
  
  try {
    // 1. Login Page
    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(OUT_DIR, '01-login-page.png'), fullPage: true });
    success.push('01-login-page.png');
  } catch (e) {
    missing.push('01-login-page.png: ' + e.message);
  }

  try {
    // 2. Home Page Light Theme
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    });
    await sleep(500);
    await page.screenshot({ path: path.join(OUT_DIR, '02-home-page-light-theme.png'), fullPage: true });
    success.push('02-home-page-light-theme.png');
  } catch (e) {
    missing.push('02-home-page-light-theme.png: ' + e.message);
  }

  try {
    // 3. Product Detail Page: Truth Gauge and Verdict
    await page.goto('http://localhost:5173/product/1', { waitUntil: 'networkidle0' });
    await sleep(2000); // Wait for animations
    await page.screenshot({ path: path.join(OUT_DIR, '03-product-detail-truth-gauge-verdict.png'), fullPage: true });
    success.push('03-product-detail-truth-gauge-verdict.png');
  } catch (e) {
    missing.push('03-product-detail-truth-gauge-verdict.png: ' + e.message);
  }

  try {
    // 4. 180-Day Volatility Chart and Ownership Cost Matrix
    // The previous screenshot is full page, so it probably includes it. Let's just take another one just in case or capture the same page with a different name.
    await page.screenshot({ path: path.join(OUT_DIR, '04-180-day-volatility-chart-ownership-cost-matrix.png'), fullPage: true });
    success.push('04-180-day-volatility-chart-ownership-cost-matrix.png');
  } catch (e) {
    missing.push('04-180-day-volatility-chart-ownership-cost-matrix.png: ' + e.message);
  }

  try {
    // Login as customer
    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });
    
    // Check if we can just set localStorage to bypass or actually type
    const loginSuccess = await page.evaluate(async () => {
      const emailInput = document.querySelector('input[type="email"]');
      const passInput = document.querySelector('input[type="password"]');
      if(emailInput && passInput) {
        emailInput.value = 'alex.thorne@example.com';
        passInput.value = 'demo123';
        emailInput.dispatchEvent(new Event('input', { bubbles: true }));
        passInput.dispatchEvent(new Event('input', { bubbles: true }));
        
        const form = emailInput.closest('form');
        if(form) {
           form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
           const btn = form.querySelector('button[type="submit"]');
           if(btn) btn.click();
           return true;
        }
      }
      return false;
    });

    await sleep(2000);

    // 5. Customer Dashboard
    await page.goto('http://localhost:5173/dashboard', { waitUntil: 'networkidle0' });
    await sleep(1000);
    await page.screenshot({ path: path.join(OUT_DIR, '05-customer-dashboard-active-triggered-alerts.png'), fullPage: true });
    success.push('05-customer-dashboard-active-triggered-alerts.png');
  } catch (e) {
    missing.push('05-customer-dashboard-active-triggered-alerts.png: ' + e.message);
  }

  try {
    // 6. Wallet Amount Step
    await page.goto('http://localhost:5173/wallet', { waitUntil: 'networkidle0' });
    await sleep(1000);
    await page.screenshot({ path: path.join(OUT_DIR, '06-wallet-amount-step.png'), fullPage: true });
    success.push('06-wallet-amount-step.png');
  } catch (e) {
    missing.push('06-wallet-amount-step.png: ' + e.message);
  }

  try {
    // 7. Wallet OTP
    // Try clicking Withdraw to open OTP
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const withdraw = buttons.find(b => b.textContent.toLowerCase().includes('withdraw') || b.textContent.toLowerCase().includes('cash out'));
      if(withdraw) withdraw.click();
    });
    await sleep(1500);
    await page.screenshot({ path: path.join(OUT_DIR, '07-wallet-otp-verification-confirmation.png') });
    success.push('07-wallet-otp-verification-confirmation.png');
  } catch (e) {
    missing.push('07-wallet-otp-verification-confirmation.png: ' + e.message);
  }

  try {
    // Logout and Admin Login
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.goto('http://localhost:5173/admin/login', { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      const emailInput = document.querySelector('input[type="email"]');
      const passInput = document.querySelector('input[type="password"]');
      if(emailInput && passInput) {
        emailInput.value = 'admin@flashcompare.ai';
        passInput.value = 'admin2026';
        emailInput.dispatchEvent(new Event('input', { bubbles: true }));
        passInput.dispatchEvent(new Event('input', { bubbles: true }));
        const form = emailInput.closest('form');
        if(form) {
           const btn = form.querySelector('button[type="submit"]');
           if(btn) btn.click();
        }
      }
    });
    await sleep(2000);

    // 8. Admin Command Center
    await page.goto('http://localhost:5173/admin', { waitUntil: 'networkidle0' });
    await sleep(1000);
    await page.screenshot({ path: path.join(OUT_DIR, '08-admin-command-center.png'), fullPage: true });
    success.push('08-admin-command-center.png');
  } catch (e) {
    missing.push('08-admin-command-center.png: ' + e.message);
  }

  try {
    // 9. Admin Product Catalog with Image Upload
    await page.goto('http://localhost:5173/admin/catalog', { waitUntil: 'networkidle0' });
    await sleep(1000);
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const addBtn = buttons.find(b => b.textContent.toLowerCase().includes('add') || b.textContent.toLowerCase().includes('new product'));
      if(addBtn) addBtn.click();
    });
    await sleep(1000);
    await page.screenshot({ path: path.join(OUT_DIR, '09-admin-product-catalog-image-upload.png'), fullPage: true });
    success.push('09-admin-product-catalog-image-upload.png');
  } catch (e) {
    missing.push('09-admin-product-catalog-image-upload.png: ' + e.message);
  }

  try {
    // 10. Command Palette
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
    await sleep(500);
    await page.keyboard.down('Control');
    await page.keyboard.press('k');
    await page.keyboard.up('Control');
    await sleep(1000);
    await page.screenshot({ path: path.join(OUT_DIR, '10-command-palette.png') });
    success.push('10-command-palette.png');
  } catch (e) {
    missing.push('10-command-palette.png: ' + e.message);
  }

  try {
    // 11. Flash Copilot Answer
    // Close command palette
    await page.keyboard.press('Escape');
    await sleep(500);
    // Find orb and click
    await page.evaluate(() => {
      // Find anything that looks like orb or copilot
      const orb = document.querySelector('.ai-orb, .copilot-button, button[aria-label*="AI"], button[aria-label*="Assistant"]');
      if(orb) orb.click();
    });
    await sleep(1500);
    await page.screenshot({ path: path.join(OUT_DIR, '11-flash-copilot-answer-with-citations.png') });
    success.push('11-flash-copilot-answer-with-citations.png');
  } catch (e) {
    missing.push('11-flash-copilot-answer-with-citations.png: ' + e.message);
  }

  await browser.close();

  fs.writeFileSync('capture-results.json', JSON.stringify({ success, missing }, null, 2));
  console.log("Done");
}

run().catch(console.error);
