const fs = require('fs');
const path = require('path');

const calcDir = path.join(__dirname, 'src', 'app', 'calc');

function walk(dir) {
    if (!fs.existsSync(dir)) {
        console.error(`Directory not found: ${dir}`);
        return;
    }
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            console.log(`Visiting: ${fullPath}`);
            walk(fullPath);
        } else if (file === 'page.tsx') {
            console.log(`Checking: ${fullPath}`);
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            
            // Fix inputs grid
            content = content.replace(/grid grid-cols-2 gap-4/g, 'grid grid-cols-1 sm:grid-cols-2 gap-4');
            
            // Fix results grid
            content = content.replace(/grid grid-cols-2 gap-y-6 gap-x-4/g, 'grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4');
            
            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated: ${fullPath}`);
            } else {
                console.log(`No change: ${fullPath}`);
            }
        }
    }
}

walk(calcDir);
console.log('Bulk update complete.');
