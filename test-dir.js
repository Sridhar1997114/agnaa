console.log('Test start');
const fs = require('fs');
const path = require('path');
console.log('__dirname:', __dirname);
const calcDir = path.join(__dirname, 'src', 'app', 'calc');
console.log('calcDir:', calcDir);
console.log('exists:', fs.existsSync(calcDir));
if (fs.existsSync(calcDir)) {
    console.log('contents:', fs.readdirSync(calcDir));
}
console.log('Test end');
