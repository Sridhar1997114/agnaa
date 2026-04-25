const fs = require('fs');
const path = require('path');

const dir = 'I:/AGNAA/Enthalpy Labs 05-04-2026/Files/Blogs';
const outputFile = 'I:/AGNAA/Enthalpy Labs 05-04-2026/Files/extracted_prompts_v2.csv';

console.log('Starting extraction...');
let csvContent = 'Topic,Prompt Number,Prompt Text\n';
let totalPrompts = 0;

for (let i = 1; i <= 100; i++) {
    const filename = `topic${i}_complete.md`;
    const filepath = path.join(dir, filename);
    
    if (fs.existsSync(filepath)) {
        const content = fs.readFileSync(filepath, 'utf8');
        // More robust extraction
        const sectionHeader = '**NANO PROMPTS:**';
        const sectionIdx = content.indexOf(sectionHeader);
        
        if (sectionIdx !== -1) {
            let sectionText = content.substring(sectionIdx + sectionHeader.length);
            // Get text until next section header (e.g. **BACKLINKS USED:**) or end of file
            const nextHeaderMatch = sectionText.match(/\*\*[A-Z ]+:\*\*/);
            if (nextHeaderMatch) {
                sectionText = sectionText.substring(0, nextHeaderMatch.index);
            }
            
            const lines = sectionText.split(/\r?\n/);
            let promptCount = 0;
            for (let line of lines) {
                const promptMatch = line.match(/^\d+\.\s*"(.*)"\s*$/);
                if (promptMatch) {
                    promptCount++;
                    const promptText = promptMatch[1].replace(/"/g, '""');
                    csvContent += `${i},${promptCount},"${promptText}"\n`;
                    totalPrompts++;
                }
            }
            if (promptCount === 0) {
                console.log(`Warning: Topic ${i} has no prompts matched!`);
            }
        } else {
            console.log(`Error: Topic ${i} missing **NANO PROMPTS:** section`);
        }
    } else {
        console.log(`Missing file: ${filename}`);
    }
}

fs.writeFileSync(outputFile, csvContent);
console.log(`Done! Extracted ${totalPrompts} prompts to ${outputFile}`);
