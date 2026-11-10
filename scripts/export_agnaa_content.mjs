import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Read the TypeScript source and parse entries directly
const canonFilePath = path.join(rootDir, 'src', 'data', 'agnaa-canon', 'master-canon.ts');
const canonContent = fs.readFileSync(canonFilePath, 'utf-8');

// We can dynamically import the compiled/transpiled version or parse the data
console.log('Building AGNAA Master Content Assets...');

const outputDir = path.join(rootDir, 'public', 'agnaa-canon-exports');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Exports directory ready at: ${outputDir}`);
