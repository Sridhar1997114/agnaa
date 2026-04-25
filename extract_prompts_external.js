const fs = require('fs');
const path = require('path');

const blogsDir = 'I:\\AGNAA\\Enthalpy Labs 05-04-2026\\Files\\Blogs';
const promptsDir = path.join(blogsDir, 'prompts');

if (!fs.existsSync(promptsDir)) {
    fs.mkdirSync(promptsDir);
}

const files = fs.readdirSync(blogsDir);
const mdFiles = files.filter(f => f.endsWith('.md'));

console.log(`Found ${mdFiles.length} markdown files.`);

let allPrompts = [];

mdFiles.forEach(file => {
    try {
        const content = fs.readFileSync(path.join(blogsDir, file), 'utf8');
        
        // Extract title from frontmatter
        let title = file;
        const titleMatch = content.match(/^title:\s*['"](.+?)['"]/m);
        if (titleMatch) {
            title = titleMatch[1];
        }

        // Extract prompts under **NANO PROMPTS:**
        const promptsSectionMatch = content.match(/\*\*NANO PROMPTS:\*\*([\s\S]+?)(?=\n\n|\n\*\*BACKLINKS|\n$)/);
        if (promptsSectionMatch) {
            const lines = promptsSectionMatch[1].trim().split('\n');
            const extractedPrompts = lines
                .map(line => line.replace(/^\d+\.\s*['"]?(.+?)['"]?$/, '$1').trim())
                .filter(line => line.length > 0 && !line.startsWith('**') && !line.includes('BACKLINKS'));
            
            if (extractedPrompts.length > 0) {
                allPrompts.push(`${title} = ${extractedPrompts.join(', ')}`);
            }
        }
    } catch (e) {
        console.error(`Error processing ${file}: ${e.message}`);
    }
});

const outputPath = path.join(promptsDir, 'all_prompts.txt');
fs.writeFileSync(outputPath, allPrompts.join('\n'));
console.log(`Successfully extracted prompts from ${allPrompts.length} blogs to ${outputPath}`);
