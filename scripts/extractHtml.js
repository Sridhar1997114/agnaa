const fs = require('fs');
const path = require('path');

const srcFile = path.join('I:', 'AGNAA', 'agnaa_in', 'Clients', 'Branding clients', 'Enthalpy Labs', 'Enthalpylabs.html');
const destFile = path.join('I:', 'AGNAA', 'agnaa_in', 'src', 'app', '[trackingId]', 'enthalpyContent.ts');

try {
  const html = fs.readFileSync(srcFile, 'utf8');
  
  // Extract body content and styles
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/i);
  const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/i);
  
  if (styleMatch && bodyMatch) {
    let styles = styleMatch[1];
    let body = bodyMatch[1];
    
    // Replace Enthalpy amber/navy with AGNAA colors in styles
    // AGNAA colors: Navy (#1C1C72), Violet (#7B2DBF)
    styles = styles.replace(/--amber:\s*#[a-fA-F0-9]+/g, '--amber: #7B2DBF');
    styles = styles.replace(/--amber-light:\s*#[a-fA-F0-9]+/g, '--amber-light: #9d4edd');
    styles = styles.replace(/--amber-deep:\s*#[a-fA-F0-9]+/g, '--amber-deep: #5a189a');
    styles = styles.replace(/--navy:\s*#[a-fA-F0-9]+/g, '--navy: #1C1C72');
    styles = styles.replace(/--navy-deep:\s*#[a-fA-F0-9]+/g, '--navy-deep: #0D0D14');
    
    // Also inline style overrides for the button
    styles += `
      @media print {
        body { background: white; color: black; }
        .progress-wrap, .header::before, .invoice-btn-wrap { display: none !important; }
        .main, .summary, .stage, .item { border-color: #ddd !important; break-inside: avoid; }
        .item { background: white !important; }
        .item.done .item-name { color: black !important; }
        .stage-title { color: black !important; }
        .header h1 { color: black !important; }
        .header { background: white !important; border-bottom: 2px solid #1C1C72 !important; padding: 24px; }
        .brand { color: #1C1C72 !important; }
        .stat-val { color: #1C1C72 !important; }
        .footer { display: none !important; }
      }
      .custom-invoice-btn {
         background: linear-gradient(135deg, #1C1C72, #7B2DBF);
         color: white; font-weight: bold; border: none; padding: 16px 32px;
         border-radius: 99px; cursor: pointer; display: flex; align-items: center; gap: 8px;
         margin: 40px auto; font-size: 16px; box-shadow: 0 10px 25px rgba(123,45,191,0.3);
         transition: transform 0.2s, box-shadow 0.2s;
         font-family: 'Inter', sans-serif;
      }
      .custom-invoice-btn:hover {
         transform: translateY(-2px); box-shadow: 0 15px 30px rgba(123,45,191,0.4);
      }
    `;

    // Export as a TS string
    const tsCode = `export const ENTHALPY_STYLES = \`${styles}\`;\n\nexport const ENTHALPY_HTML = \`${body.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;\n`;
    
    fs.writeFileSync(destFile, tsCode, 'utf8');
    console.log('Successfully generated enthalpyContent.ts');
  } else {
    console.log('Failed to match style or body tags.');
  }
} catch (e) {
  console.error(e);
}
