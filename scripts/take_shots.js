const puppeteer = require('puppeteer');
const path = require('path');

async function shot(htmlPath, outPrefix) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1700, deviceScaleFactor: 2 });
  const url = 'file:///' + path.resolve(htmlPath).replace(/\\/g, '/');
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');
  const pages = await page.$$('.page');
  for (let i = 0; i < pages.length; i++) {
    const outPath = `${outPrefix}_page_${i + 1}.png`;
    await pages[i].screenshot({ path: outPath });
    console.log(`Saved screenshot: ${outPath}`);
  }
  await browser.close();
}

const inputHtml = process.argv[2];
const outPrefix = process.argv[3];
shot(inputHtml, outPrefix).catch(console.error);
