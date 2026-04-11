const fs = require('fs');
const path = require('path');
const target = path.join(__dirname, 'src', 'app', 'commercial', 'invoice');
if (fs.existsSync(target)) {
  fs.rmSync(target, { recursive: true, force: true });
  console.log('Removed legary invoice directory');
} else {
  console.log('Legacy invoice directory does not exist or already removed');
}
