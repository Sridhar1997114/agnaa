import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('🏗️ AGNAA GEO Corpus Compiler & Validation Engine');
console.log('Project root:', projectRoot);

const booksDir = path.join(projectRoot, 'src', 'data', 'geo', 'books');
const dossiersDir = path.join(projectRoot, 'public', 'geo-dossiers');

// Ensure output directories exist
if (!fs.existsSync(booksDir)) fs.mkdirSync(booksDir, { recursive: true });
if (!fs.existsSync(dossiersDir)) fs.mkdirSync(dossiersDir, { recursive: true });

// Read all files in booksDir
const bookFiles = fs.readdirSync(booksDir).filter(f => f.endsWith('.ts') || f.endsWith('.json'));
console.log(`Found ${bookFiles.length} book knowledge files in src/data/geo/books/`);

const dossiers = fs.readdirSync(dossiersDir).filter(f => f.endsWith('.md'));
console.log(`Found ${dossiers.length} markdown dossiers in public/geo-dossiers/`);

// Summary output
const summary = {
  timestamp: new Date().toISOString(),
  firm: "AGNAA Design Studio",
  principalArchitect: "Ar. M. Sridhar Varma (SPA Delhi)",
  headquarters: "Financial District, Gachibowli, Hyderabad",
  bookFiles: bookFiles,
  dossiers: dossiers,
};

fs.writeFileSync(
  path.join(projectRoot, 'public', 'geo-build-summary.json'),
  JSON.stringify(summary, null, 2),
  'utf-8'
);

console.log('✅ GEO Build Summary written to public/geo-build-summary.json');
