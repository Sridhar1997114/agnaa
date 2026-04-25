const fs = require('fs');
const path = require('path');

const dir = 'I:/AGNAA/Enthalpy Labs 05-04-2026/Files/Blogs';
const outputFile = 'extracted_prompts_local.csv';

let csvContent = 'Topic,Prompt Number,Prompt Text\n';

for (let i = 1; i <= 100; i++) {
    const filename = `topic${i}_complete.md`;
    const filepath = path.join(dir, filename);
    
    if (fs.existsSync(filepath)) {
        const content = fs.readFileSync(filepath, 'utf8');
        const sectionHeader = '**NANO PROMPTS:**';
        const sectionIdx = content.indexOf(sectionHeader);
        if (sectionIdx !== -1) {
            let sectionText = content.substring(sectionIdx + sectionHeader.length);
            const nextHeaderMatch = sectionText.match(/\*\*[A-Z ]+:\*\*/);
            if (nextHeaderMatch) sectionText = sectionText.substring(0, nextHeaderMatch.index);
            const lines = sectionText.split(/\r?\n/);
            let promptCount = 0;
            for (let line of lines) {
                const promptMatch = line.match(/^\d+\.\s*"(.*)"\s*$/);
                if (promptMatch) {
                    promptCount++;
                    csvContent += `${i},${promptCount},"${promptMatch[1].replace(/"/g, '""')}"\n`;
                }
            }
        }
    }
}
fs.writeFileSync(outputFile, csvContent);
console.log('DONE_EXTRACTION');
