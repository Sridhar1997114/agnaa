const fs = require('fs');

try {
  fs.renameSync('./src/app/commercial/invoice', './src/app/commercial/quotation');
  fs.renameSync('./src/app/commercial/quotation/InvoiceForm.tsx', './src/app/commercial/quotation/QuotationForm.tsx');
  fs.renameSync('./src/app/commercial/quotation/InvoicePreview.tsx', './src/app/commercial/quotation/QuotationPreview.tsx');
  console.log('Success');
} catch(e) {
  console.error(e);
}
