const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'app', '[trackingId]');
const destDir = path.join(__dirname, '..', 'src', 'app', 'clients');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// 1. Copy and modify enthalpyContent.ts
const contentTsPath = path.join(srcDir, 'enthalpyContent.ts');
if (fs.existsSync(contentTsPath)) {
  let contentTs = fs.readFileSync(contentTsPath, 'utf8');
  
  // Apply white dominant theme
  contentTs = contentTs.replace(
    /--navy: #1C1C72;--navy-deep: #0D0D14;--amber: #7B2DBF;--amber-light: #9d4edd;\s*--amber-deep: #5a189a;--grey:#6B7280;--white:#F8FAFC;--bg:#0a0f1e;\s*--surface:#111827;--surface2:#1a2236;--border:rgba\(255,255,255,0\.08\);\s*--text:#e2e8f0;--text-muted:#94a3b8;/g,
    `--navy: #1C1C72;--navy-deep: #1e293b;--amber: #7B2DBF;--amber-light: #9d4edd;
  --amber-deep: #5a189a;--grey:#6B7280;--white:#ffffff;--bg:#F8FAFC;
  --surface:#ffffff;--surface2:#f1f5f9;--border:rgba(0,0,0,0.1);
  --text:#0f172a;--text-muted:#64748b;`
  );

  // Apply Apple font
  contentTs = contentTs.replace(/font-family:'Inter',sans-serif;/g, 'font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;');
  
  // Additional fixes for white theme visibility
  contentTs = contentTs.replace(/color:var\(--white\);/g, 'color:var(--text);'); // Some texts specifically used white
  contentTs = contentTs.replace(/\.header\{background:[^}]+}/g, '.header{background:linear-gradient(135deg,var(--surface) 0%,var(--surface2) 100%);padding:48px 32px 40px;text-align:center;border-bottom:1px solid var(--border);position:relative;overflow:hidden;}');

  fs.writeFileSync(path.join(destDir, 'enthalpyContent.ts'), contentTs, 'utf8');
}

// 2. Copy and modify page.tsx
const pageTsxPath = path.join(srcDir, 'page.tsx');
if (fs.existsSync(pageTsxPath)) {
  let pageTsx = fs.readFileSync(pageTsxPath, 'utf8');
  
  // Remove `{ params }: { params: { trackingId: string } }`
  pageTsx = pageTsx.replace(/export default function TrackingPage\([^)]*\)\s*\{/g, 'export default function TrackingPage() {');
  pageTsx = pageTsx.replace(/const { trackingId } = params;/g, 'const trackingId = loginId || "UNKNOWN";');
  
  // Fix background in page.tsx
  pageTsx = pageTsx.replace(/bg-\[#0D0D14\]/g, 'bg-white');
  pageTsx = pageTsx.replace(/bg-brand-dark/g, 'bg-white'); // login screen background

  fs.writeFileSync(path.join(destDir, 'page.tsx'), pageTsx, 'utf8');
}

console.log('Files copied and updated successfully.');
