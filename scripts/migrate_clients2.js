const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src', 'app', '[trackingId]');
const destDir = path.join(process.cwd(), 'src', 'app', 'clients');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// 1. Copy and modify enthalpyContent.ts
const contentTsPath = path.join(srcDir, 'enthalpyContent.ts');
if (fs.existsSync(contentTsPath)) {
  let contentTs = fs.readFileSync(contentTsPath, 'utf8');
  
  // Apply white dominant theme
  contentTs = contentTs.replace(
    '--bg:#0a0f1e;',
    '--bg:#ffffff;'
  ).replace(
    '--surface:#111827;',
    '--surface:#ffffff;'
  ).replace(
    '--surface2:#1a2236;',
    '--surface2:#f1f5f9;'
  ).replace(
    '--text:#e2e8f0;',
    '--text:#0f172a;'
  ).replace(
    '--text-muted:#94a3b8;',
    '--text-muted:#64748b;'
  ).replace(
    '--border:rgba(255,255,255,0.08);',
    '--border:rgba(0,0,0,0.1);'
  ).replace(
    '--navy-deep: #0D0D14;',
    '--navy-deep: #f8fafc;'
  );

  // Apply Apple font
  contentTs = contentTs.replace(
    "font-family:'Inter',sans-serif;",
    'font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;'
  );
  
  // Fix header background to be white-friendly
  contentTs = contentTs.replace(
    '.header{background:linear-gradient(135deg,var(--navy-deep) 0%,#0c1a3a 100%);',
    '.header{background:linear-gradient(135deg,var(--surface) 0%,var(--surface2) 100%);'
  ).replace(
    '.header h1{font-size:clamp(20px,4vw,34px);font-weight:700;color:var(--white);margin-bottom:8px;}',
    '.header h1{font-size:clamp(20px,4vw,34px);font-weight:700;color:var(--text);margin-bottom:8px;}'
  ).replace(
    '.stage-title{font-size:18px;font-weight:700;color:var(--white);}',
    '.stage-title{font-size:18px;font-weight:700;color:var(--text);}'
  ).replace(
    '.footer-title{font-size:18px;font-weight:700;color:var(--white);margin-bottom:8px;}',
    '.footer-title{font-size:18px;font-weight:700;color:var(--text);margin-bottom:8px;}'
  ).replace(
    '.pt-val{font-size:20px;font-weight:700;color:var(--white);}',
    '.pt-val{font-size:20px;font-weight:700;color:var(--text);}'
  );

  fs.writeFileSync(path.join(destDir, 'enthalpyContent.ts'), contentTs, 'utf8');
}

// 2. Copy and modify page.tsx
const pageTsxPath = path.join(srcDir, 'page.tsx');
if (fs.existsSync(pageTsxPath)) {
  let pageTsx = fs.readFileSync(pageTsxPath, 'utf8');
  
  // Update export header
  pageTsx = pageTsx.replace(
    'export default function TrackingPage({ params }: { params: { trackingId: string } }) {',
    'export default function TrackingPage() {'
  );
  
  // Update trackingId definition
  pageTsx = pageTsx.replace(
    'const { trackingId } = params;',
    'const trackingId = loginId || "UNKNOWN";'
  );
  
  // Fix background rendering
  pageTsx = pageTsx.replace(
    'bg-[#0D0D14]',
    'bg-white'
  ).replace(
    'bg-brand-dark',
    'bg-white'
  );

  fs.writeFileSync(path.join(destDir, 'page.tsx'), pageTsx, 'utf8');
}

console.log('Files successfully written to clients folder.');
