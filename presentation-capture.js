import puppeteer from 'puppeteer-core';
import path from 'path';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    defaultViewport: { width: 1920, height: 1080, deviceScaleFactor: 2 } // 4K Retina resolution
  });

  const page = await browser.newPage();
  
  // Go to Home Page
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  
  // Set dark theme for premium look
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  });

  // Wait a bit for animations/gradients to render
  await new Promise(r => setTimeout(r, 2000));
  
  // Take screenshot
  const outPath = path.join(process.cwd(), 'screenshots', 'flashcompare-ai', 'presentation-hero-shot.png');
  await page.screenshot({ path: outPath });
  
  await browser.close();
  console.log(`Saved perfect screenshot to ${outPath}`);
}

run();
