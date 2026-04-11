const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src/app/commercial/invoice');
const destDir = path.join(__dirname, 'src/app/commercial/quotation');

try {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Copy files
  fs.copyFileSync(
    path.join(srcDir, 'InvoiceForm.tsx'),
    path.join(destDir, 'QuotationForm.tsx')
  );
  fs.copyFileSync(
    path.join(srcDir, 'InvoicePreview.tsx'),
    path.join(destDir, 'QuotationPreview.tsx')
  );
  fs.copyFileSync(
    path.join(srcDir, 'page.tsx'),
    path.join(destDir, 'page.tsx')
  );
  fs.copyFileSync(
    path.join(srcDir, 'types.ts'),
    path.join(destDir, 'types.ts')
  );
  console.log('Copy successful');
} catch (error) {
  console.error("Error during copy:", error);
}
