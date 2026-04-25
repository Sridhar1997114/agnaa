const fs = require('fs');
const path = require('path');

const dir = 'I:/AGNAA/Enthalpy Labs 05-04-2026/Files/Blogs';
const outputFile = 'I:/AGNAA/Enthalpy Labs 05-04-2026/Files/extracted_prompts.csv';

let csvContent = 'Topic,Prompt Number,Prompt Text\n';

for (let i = 1; i <= 100; i++) {
    const filename = `topic${i}_complete.md`;
    const filepath = path.join(dir, filename);
    
    if (fs.existsSync(filepath)) {
        const content = fs.readFileSync(filepath, 'utf8');
        // Extract prompts under **NANO PROMPTS:**
        const nanoPromptsMatch = content.match(/\*\*NANO PROMPTS:\*\*\s*\r?\n([\s\S]*?)(\r?\n\r?\n|$)/);
        
        if (nanoPromptsMatch) {
            const promptsText = nanoPromptsMatch[1];
            const lines = promptsText.split(/\r?\n/);
            let promptCount = 0;
            for (let line of lines) {
                const promptMatch = line.match(/^\d+\.\s*"(.*)"\s*$/);
                if (promptMatch) {
                    promptCount++;
                    const promptText = promptMatch[1].replace(/"/g, '""');
                    csvContent += `${i},${promptCount},"${promptText}"\n`;
                }
            }
        }
    }
}

fs.writeFileSync(outputFile, csvContent);
console.log('done');
