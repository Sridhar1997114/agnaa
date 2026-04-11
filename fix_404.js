const fs = require('fs');
const path = require('path');

const root = __dirname;

// 1. Delete stale .next cache
const nextDir = path.join(root, '.next');
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log('[OK] Deleted .next cache');
} else {
  console.log('[SKIP] .next does not exist');
}

// 2. Delete legacy invoice directory
const invoiceDir = path.join(root, 'src', 'app', 'commercial', 'invoice');
if (fs.existsSync(invoiceDir)) {
  fs.rmSync(invoiceDir, { recursive: true, force: true });
  console.log('[OK] Deleted legacy invoice directory');
} else {
  console.log('[SKIP] invoice directory already removed');
}

// 3. Verify quotation directory exists
const quotationDir = path.join(root, 'src', 'app', 'commercial', 'quotation');
const files = fs.readdirSync(quotationDir);
console.log('[OK] Quotation directory contains:', files.join(', '));

console.log('\nDone. Run "npm run dev" to restart the server.');
