const fs = require('fs');
const path = require('path');

const dir = 'I:/AGNAA/Enthalpy Labs 05-04-2026/Files/Blogs';
const outputFile = path.join(dir, 'MEGA.md');

try {
    if (!fs.existsSync(dir)) {
        console.error(`Directory not found: ${dir}`);
        process.exit(1);
    }

    const files = fs.readdirSync(dir)
        .filter(f => f.endsWith('.md') && f !== 'MEGA.md')
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    console.log(`Found ${files.length} files to merge.`);

    if (files.length === 0) {
        console.log('No markdown files found to merge.');
        process.exit(0);
    }

    const writeStream = fs.createWriteStream(outputFile);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const data = fs.readFileSync(filePath, 'utf8');
        writeStream.write(`<!-- FILE: ${file} -->\n`);
        writeStream.write(data);
        writeStream.write('\n\n---\n\n');
    }

    writeStream.end();
    console.log(`Successfully merged ${files.length} files into ${outputFile}`);
} catch (err) {
    console.error('Error merging files:', err);
    process.exit(1);
}
