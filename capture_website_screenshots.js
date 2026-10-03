import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function captureScreenshots() {
  const outputDir = path.join(__dirname, 'public', 'screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Wait 3 seconds for React hydration
  await new Promise(r => setTimeout(r, 3000));

  // Scroll down to load lazy assets
  console.log('Scrolling page...');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 80);
    });
  });

  await new Promise(r => setTimeout(r, 1500));

  // 1. Capture full page screenshot
  console.log('Capturing full page screenshot...');
  const fullPagePath = path.join(outputDir, 'full_website_page.png');
  await page.screenshot({ path: fullPagePath, fullPage: true });

  // 2. Capture viewport screenshot (Hero)
  console.log('Capturing hero & navigation...');
  await page.screenshot({
    path: path.join(outputDir, '01_hero_navigation.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });

  // Capture VIP Site Visit Modal
  console.log('Capturing VIP Site Visit Modal...');
  try {
    const buttons = await page.$$('button');
    for (const button of buttons) {
      const text = await page.evaluate(el => el.textContent, button);
      if (text && text.includes('BOOK VIP SITE VISIT')) {
        await button.click();
        await new Promise(r => setTimeout(r, 800));
        await page.screenshot({ path: path.join(outputDir, 'modal_vip_site_visit.png') });
        await page.keyboard.press('Escape');
        await new Promise(r => setTimeout(r, 400));
        break;
      }
    }
  } catch (e) {
    console.log('Site Visit Modal note:', e.message);
  }

  // Capture Buyer Leads Vault Modal (Ctrl+Shift+L)
  console.log('Capturing Buyer Leads Vault Modal...');
  try {
    await page.keyboard.down('Control');
    await page.keyboard.down('Shift');
    await page.keyboard.press('L');
    await page.keyboard.up('Shift');
    await page.keyboard.up('Control');
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(outputDir, 'modal_buyer_leads_vault.png') });
    await page.keyboard.press('Escape');
  } catch (e) {
    console.log('Vault Modal note:', e.message);
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

captureScreenshots().catch(err => {
  console.error('Screenshot capture error:', err);
  process.exit(1);
});
