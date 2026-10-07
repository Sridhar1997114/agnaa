const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function exportAllPdfs() {
  const projectDir = path.resolve('031026_Abhishek');
  const parentProjectDir = path.resolve('..', '031026_Abhishek');
  const htmlPath = path.join(projectDir, '031026_complete_docket_landscape.html');
  const rootDir = path.resolve('.');

  const masterPdfName = '031026_Abhishek_Complete_Client_Docket_Landscape.pdf';
  const masterPdfPath = path.join(projectDir, masterPdfName);

  console.log(`[1/3] Rendering Master PDF from HTML: ${htmlPath}`);
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

  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: ['load', 'networkidle0'], timeout: 60000 });
  await page.emulateMediaType('print');
  await page.evaluateHandle('document.fonts.ready');
  await new Promise(r => setTimeout(r, 1000));
  
  await page.pdf({
    path: masterPdfPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  
  await browser.close();
  console.log(` Master PDF saved: ${masterPdfPath}`);

  console.log(`[2/3] Extracting Individual High-Quality Page PDFs via pdf-lib...`);
  const masterBytes = fs.readFileSync(masterPdfPath);
  const masterDoc = await PDFDocument.load(masterBytes);
  const pageCount = masterDoc.getPageCount();
  console.log(`Total Pages in Master PDF: ${pageCount}`);

  const pageFiles = [
    {
      num: 1,
      filename: '031026_Page_1_Client_Design_Mandates_and_Discussion_Sheet.pdf',
      title: 'Page 1: Design Mandates & In-Person Discussion Sheet'
    },
    {
      num: 2,
      filename: '031026_Page_2_Commercial_Proposal_and_Payment_Milestones.pdf',
      title: 'Page 2: Commercial Valuation, Privileges, Area Schedule & Milestones'
    },
    {
      num: 3,
      filename: '031026_Page_3_Architectural_Agreement_and_Master_Rate_Sheet.pdf',
      title: 'Page 3: Service Agreement, Covenants & Master Rate Sheet'
    }
  ];

  for (let i = 0; i < pageCount && i < pageFiles.length; i++) {
    const singleDoc = await PDFDocument.create();
    const [copiedPage] = await singleDoc.copyPages(masterDoc, [i]);
    singleDoc.addPage(copiedPage);
    const singleBytes = await singleDoc.save();
    
    // Save in project folder
    const targetProjectFile = path.join(projectDir, pageFiles[i].filename);
    fs.writeFileSync(targetProjectFile, singleBytes);
    
    // Save in parent AGNAA project folder
    if (fs.existsSync(parentProjectDir)) {
      fs.writeFileSync(path.join(parentProjectDir, pageFiles[i].filename), singleBytes);
    }

    // Also save in root folder
    const targetRootFile = path.join(rootDir, pageFiles[i].filename);
    fs.writeFileSync(targetRootFile, singleBytes);
    
    console.log(` Saved ${pageFiles[i].title} -> ${targetProjectFile} (${singleBytes.length} bytes)`);
  }

  // Also copy master PDF to root and parent project dir
  fs.copyFileSync(masterPdfPath, path.join(rootDir, masterPdfName));
  fs.copyFileSync(masterPdfPath, path.join(rootDir, '031026_Complete_Client_Docket.pdf'));
  if (fs.existsSync(parentProjectDir)) {
    fs.copyFileSync(masterPdfPath, path.join(parentProjectDir, masterPdfName));
  }
  console.log(`[3/3] Master PDF shortcuts copied to root and parent directory.`);

  console.log(`\nAll High-Quality Vector PDFs Generated Successfully!`);
}

exportAllPdfs().catch(err => {
  console.error("Error during PDF export:", err);
  process.exit(1);
});
