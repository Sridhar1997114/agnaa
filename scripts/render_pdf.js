const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function renderPdf(htmlPath, pdfPath) {
  console.log(`Rendering High-Quality PDF: ${htmlPath} -> ${pdfPath}`);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--font-render-hinting=max',
      '--force-color-profile=srgb',
      '--enable-font-antialiasing'
    ]
  });
  
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2
  });

  const fileUrl = 'file:///' + path.resolve(htmlPath).replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: ['load', 'networkidle0'], timeout: 60000 });
  await page.emulateMediaType('print');
  await page.evaluateHandle('document.fonts.ready');
  await new Promise(r => setTimeout(r, 800));
  
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  
  await browser.close();
  const stats = fs.statSync(pdfPath);
  console.log(`Success! High-Quality PDF generated: ${pdfPath} (${stats.size} bytes)`);
}

const inputHtml = process.argv[2];
const outputPdf = process.argv[3];

if (!inputHtml || !outputPdf) {
  console.error("Usage: node render_pdf.js <input.html> <output.pdf>");
  process.exit(1);
}

renderPdf(inputHtml, outputPdf).catch(err => {
  console.error("Error generating PDF:", err);
  process.exit(1);
});
