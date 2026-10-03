import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function captureAllSectionScreenshots() {
  const outputDir = path.join(__dirname, 'public', 'screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Launching browser for comprehensive section capture...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  // Helper to capture element screenshot or clip region
  async function captureElement(selector, filename) {
    try {
      const el = await page.$(selector);
      if (el) {
        await el.scrollIntoView();
        await new Promise(r => setTimeout(r, 600));
        const filePath = path.join(outputDir, filename);
        await el.screenshot({ path: filePath });
        console.log(`Captured ${filename}`);
        return true;
      }
    } catch (e) {
      console.log(`Could not capture ${selector}:`, e.message);
    }
    return false;
  }

  // 1. Capture Full Viewport Hero & Nav
  console.log('Capturing Hero & Nav...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({
    path: path.join(outputDir, '01_hero_navigation.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });

  // Scroll through page once to trigger any lazy mounts
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
      }, 50);
    });
  });
  await new Promise(r => setTimeout(r, 1000));

  // Sections
  const sections = [
    { name: '02_legacy_metrics.png', selector: '[data-section="metrics"], section:nth-of-type(2)' },
    { name: '03_developments_typologies.png', selector: '#shops, section:nth-of-type(3)' },
    { name: '04_pricing_schedules.png', selector: '#pricing, section:nth-of-type(4)' },
    { name: '05_amenities_pillars.png', selector: '#amenities, section:nth-of-type(5)' },
    { name: '06_brand_philosophy.png', selector: '#philosophy, section:nth-of-type(6)' },
    { name: '07_property_finder_emi.png', selector: '#finder, section:nth-of-type(7)' },
    { name: '08_location_connectivity.png', selector: '#location, section:nth-of-type(8)' },
    { name: '09_investment_roi.png', selector: '#roi, section:nth-of-type(9)' },
    { name: '10_mall_management.png', selector: '#management, section:nth-of-type(10)' },
    { name: '11_press_accolades.png', selector: 'section:nth-of-type(11)' },
    { name: '12_buyer_journey.png', selector: 'section:nth-of-type(12)' },
    { name: '13_footer.png', selector: 'footer' }
  ];

  for (const sec of sections) {
    await captureElement(sec.selector, sec.name);
  }

  // Capture Modals
  async function clickAndCaptureModal(btnText, filename) {
    try {
      const buttons = await page.$$('button');
      for (const button of buttons) {
        const text = await page.evaluate(el => el.textContent, button);
        if (text && text.includes(btnText)) {
          await button.click();
          await new Promise(r => setTimeout(r, 800));
          await page.screenshot({ path: path.join(outputDir, filename) });
          console.log(`Captured modal ${filename}`);
          await page.keyboard.press('Escape');
          await new Promise(r => setTimeout(r, 500));
          return true;
        }
      }
    } catch (e) {
      console.log(`Modal capture error for ${btnText}:`, e.message);
    }
    return false;
  }

  console.log('Capturing Modals...');
  await clickAndCaptureModal('BOOK VIP SITE VISIT', 'modal_vip_site_visit.png');
  await clickAndCaptureModal('VIEW FLOOR PLANS', 'modal_floor_plans.png');
  await clickAndCaptureModal('DOWNLOAD PRICE LIST', 'modal_e_brochure.png');

  // Trigger AI Bot Chat Widget
  try {
    const aiWidget = await page.$('[aria-label="Open KB Concierge AI Assistant"], button:has-text("KB Concierge"), div[style*="position: fixed"] button');
    if (aiWidget) {
      await aiWidget.click();
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({ path: path.join(outputDir, 'modal_ai_concierge_bot.png') });
      console.log('Captured modal_ai_concierge_bot.png');
      await page.keyboard.press('Escape');
      await new Promise(r => setTimeout(r, 500));
    }
  } catch (e) {
    console.log('AI Widget capture note:', e.message);
  }

  // Trigger Buyer Vault Modal via Shortcut
  try {
    await page.keyboard.down('Control');
    await page.keyboard.down('Shift');
    await page.keyboard.press('L');
    await page.keyboard.up('Shift');
    await page.keyboard.up('Control');
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(outputDir, 'modal_buyer_leads_vault.png') });
    console.log('Captured modal_buyer_leads_vault.png');
    await page.keyboard.press('Escape');
  } catch (e) {
    console.log('Vault modal capture note:', e.message);
  }

  await browser.close();
  console.log('All section & modal screenshots captured successfully!');
}

captureAllSectionScreenshots().catch(err => {
  console.error('Error in capture script:', err);
  process.exit(1);
});
