const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'api', 'chat.ts');

try {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log('SUCCESS: Deleted', filePath);
    
    // Also try to remove the api dir if empty
    const apiDir = path.join(__dirname, 'src', 'pages', 'api');
    const pagesDir = path.join(__dirname, 'src', 'pages');
    try { fs.rmdirSync(apiDir); console.log('Removed empty api dir'); } catch(e) {}
    try { fs.rmdirSync(pagesDir); console.log('Removed empty pages dir'); } catch(e) {}
  } else {
    console.log('File not found at:', filePath);
  }
} catch (err) {
  console.error('ERROR:', err.message);
}
