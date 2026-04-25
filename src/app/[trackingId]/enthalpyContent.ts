export const ENTHALPY_STYLES = `
:root {
  --navy: #1C1C72;--navy-deep: #0D0D14;--amber: #7B2DBF;--amber-light: #9d4edd;
  --amber-deep: #5a189a;--grey:#6B7280;--white:#F8FAFC;--bg:#0a0f1e;
  --surface:#111827;--surface2:#1a2236;--border:rgba(255,255,255,0.08);
  --text:#e2e8f0;--text-muted:#94a3b8;
}
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);line-height:1.6;}

.header{background:linear-gradient(135deg,var(--navy-deep) 0%,#0c1a3a 100%);padding:48px 32px 40px;text-align:center;border-bottom:1px solid var(--border);position:relative;overflow:hidden;}
.header::before{content:'';position:absolute;top:-80px;left:50%;transform:translateX(-50%);width:400px;height:400px;background:radial-gradient(circle,rgba(244,180,0,0.08) 0%,transparent 70%);pointer-events:none;}
.logo-wrap{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:24px;}
.logo-mark{width:52px;height:52px;}
.brand{font-size:28px;font-weight:700;letter-spacing:-0.5px;}
.brand span{color:var(--grey);font-weight:400;}
.header h1{font-size:clamp(20px,4vw,34px);font-weight:700;color:var(--white);margin-bottom:8px;}
.header p{color:var(--text-muted);font-size:15px;max-width:600px;margin:0 auto 24px;}
.stats-row{display:flex;gap:32px;justify-content:center;flex-wrap:wrap;}
.stat{text-align:center;}
.stat-val{font-size:32px;font-weight:700;color:var(--amber);}
.stat-label{font-size:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;}

.progress-wrap{background:var(--surface);padding:20px 32px;border-bottom:1px solid var(--border);}
.progress-inner{max-width:900px;margin:0 auto;}
.progress-label{display:flex;justify-content:space-between;font-size:13px;color:var(--text-muted);margin-bottom:8px;}
.progress-bar{height:8px;background:var(--surface2);border-radius:99px;overflow:hidden;}
.progress-fill{height:100%;background:linear-gradient(90deg,var(--amber) 0%,var(--amber-light) 100%);border-radius:99px;width:10%;}
.milestone-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;}
.milestone{font-size:11px;padding:3px 10px;border-radius:99px;border:1px solid var(--border);color:var(--text-muted);}
.milestone.paid{border-color:rgba(244,180,0,0.4);color:var(--amber);background:rgba(244,180,0,0.06);}

.main{max-width:960px;margin:0 auto;padding:40px 24px;}

.summary{background:var(--surface);border:1px solid rgba(244,180,0,0.2);border-radius:14px;padding:20px 24px;margin-bottom:40px;display:flex;gap:24px;flex-wrap:wrap;align-items:center;}
.summary-item{text-align:center;flex:1;min-width:100px;}
.summary-num{font-size:26px;font-weight:700;}
.summary-num.amber{color:var(--amber);}
.summary-num.green{color:#4ade80;}
.summary-num.blue{color:#60a5fa;}
.summary-num.grey{color:var(--text-muted);}
.summary-lbl{font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-top:2px;}

.stage{margin-bottom:48px;}
.stage-header{display:flex;align-items:center;gap:12px;margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid var(--border);}
.stage-icon{font-size:22px;}
.stage-title{font-size:18px;font-weight:700;color:var(--white);}
.stage-count{margin-left:auto;font-size:12px;color:var(--text-muted);background:var(--surface2);padding:3px 10px;border-radius:99px;}

.items-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px;}
.item{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px 14px;display:flex;align-items:flex-start;gap:10px;transition:border-color 0.2s,background 0.2s;}
.item:hover{border-color:rgba(244,180,0,0.25);background:var(--surface2);}
.item.done{border-color:rgba(34,197,94,0.2);}
.item.done .item-name{color:#86efac;}
.item-status{width:18px;height:18px;border-radius:50%;border:2px solid var(--border);flex-shrink:0;margin-top:2px;display:flex;align-items:center;justify-content:center;font-size:10px;}
.item.done .item-status{background:rgba(34,197,94,0.15);border-color:rgba(34,197,94,0.5);}
.item.done .item-status::after{content:'✓';color:#4ade80;}
.item-body{flex:1;}
.item-name{font-size:13px;color:var(--text);font-weight:500;line-height:1.4;}
.item-desc{font-size:11px;color:var(--text-muted);margin-top:2px;line-height:1.4;}

.footer{background:var(--surface);border-top:1px solid var(--border);padding:32px;text-align:center;}
.footer-title{font-size:18px;font-weight:700;color:var(--white);margin-bottom:8px;}
.footer-sub{color:var(--text-muted);font-size:13px;margin-bottom:20px;}
.payment-table{display:inline-grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:12px;overflow:hidden;max-width:600px;width:100%;}
.pt-cell{background:var(--surface2);padding:16px 20px;text-align:center;}
.pt-cell.paid{background:rgba(244,180,0,0.06);}
.pt-label{font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;}
.pt-val{font-size:20px;font-weight:700;color:var(--white);}
.pt-tag{font-size:11px;margin-top:4px;}
.pt-tag.green{color:#4ade80;}
.pt-tag.amber{color:var(--amber);}
.pt-tag.grey{color:var(--text-muted);}

@media(max-width:600px){.items-grid{grid-template-columns:1fr;}.stats-row{gap:20px;}.payment-table{grid-template-columns:1fr;}}

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

export const ENTHALPY_HTML = `

<div class="header">
  <div class="logo-wrap">
    <svg class="logo-mark" viewBox="0 0 200 200" aria-label="Agnaa">
      <defs>
        <linearGradient id="hf" x1="50%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFE066"/><stop offset="45%" stop-color="#F4B400"/><stop offset="100%" stop-color="#C2410C"/></linearGradient>
        <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4B5563"/><stop offset="100%" stop-color="#09090B"/></linearGradient>
        <linearGradient id="hn" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stop-color="#0F172A"/><stop offset="100%" stop-color="#020617"/></linearGradient>
      </defs>
      <polygon fill="url(#hf)" points="100,18.76 100,131.62 21.81,154.19"/>
      <polygon fill="url(#hg)" points="100,18.76 100,131.62 178.19,154.19"/>
      <polygon fill="url(#hn)" points="100,131.62 21.81,154.19 178.19,154.19"/>
    </svg>
    <div class="brand">AGNAA</div>
  </div>
  <h1>Agnaa Ongoing Works</h1>
  <p>170+ live deliverables tracked in real time. Every task documented. Every milestone clear. Updated daily.</p>
  <div class="stats-row">
    <div class="stat"><div class="stat-val">170+</div><div class="stat-label">Deliverables</div></div>
    <div class="stat"><div class="stat-val">16</div><div class="stat-label">Stages</div></div>
    <div class="stat"><div class="stat-val" id="days-counter">1</div><div class="stat-label">Days Running</div></div>
  </div>
</div>

<div class="progress-wrap">
  <div class="progress-inner">
    <div class="progress-label"><span>Overall Progress</span><span id="progress-text">16 / 170+ Tasks Done</span></div>
    <div class="progress-bar"><div class="progress-fill"></div></div>
    <div class="milestone-row">
      <div class="milestone paid">✅ Advance Paid — Project Live</div>
      <div class="milestone">⏳ Design Approval</div>
      <div class="milestone">⏳ Development Complete</div>
      <div class="milestone">⏳ Final Handover</div>
    </div>
  </div>
</div>

<div class="main">

<div class="summary">
  <div class="summary-item"><div class="summary-num green">16</div><div class="summary-lbl">Completed</div></div>
  <div class="summary-item"><div class="summary-num amber">154</div><div class="summary-lbl">In Pipeline</div></div>
  <div class="summary-item"><div class="summary-num blue">₹1.25L</div><div class="summary-lbl">Total Value</div></div>
  <div class="summary-item"><div class="summary-num grey" id="eta-days">—</div><div class="summary-lbl">Days Active</div></div>
</div>

<div class="stage">
  <div class="stage-header">
    <span class="stage-icon">🔺</span>
    <span class="stage-title">Logo & Identity System</span>
    <span class="stage-count">6/12 done</span>
  </div>
  <div class="items-grid">
    <div class="item done">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">ΔH Tetrahedron logomark — sacred geometry fire symbol</div>
        <div class="item-desc">Your ΔH = enthalpy heat icon. Unique worldwide.</div>
      </div>
    </div>
    <div class="item done">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Logo gradient version with fire facets</div>
        <div class="item-desc">Amber fire → orange glow depth effect.</div>
      </div>
    </div>
    <div class="item done">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Full wordmark SVG — ENTHALPY bold + LABS grey</div>
        <div class="item-desc">Hierarchy locked. Navy + grey system.</div>
      </div>
    </div>
    <div class="item done">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Inline logo — icon replaces 'A' in ENTHALPY</div>
        <div class="item-desc">FedEx-arrow level cleverness. Iconic.</div>
      </div>
    </div>
    <div class="item done">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Standalone icon SVG (favicon-ready)</div>
        <div class="item-desc">32px–512px perfect clarity.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Logo on white background PNG</div>
        <div class="item-desc">Print, presentations, email use.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Logo on dark background PNG</div>
        <div class="item-desc">Website header, dark slides.</div>
      </div>
    </div>
    <div class="item done">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Logo B&W monotone version</div>
        <div class="item-desc">Stamp, watermark, legal docs.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Inverted white logo version</div>
        <div class="item-desc">Dark print, embossing.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Stacked mobile logo (icon above text)</div>
        <div class="item-desc">App icon, square formats.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Logo minimum size rules (32px floor)</div>
        <div class="item-desc">Brand guideline protection.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Trademark-ready SVG master file</div>
        <div class="item-desc">IP protection filing ready.</div>
      </div>
    </div>
  </div>
</div>

<div class="stage">
  <div class="stage-header">
    <span class="stage-icon">🎨</span>
    <span class="stage-title">Brand Color & Typography System</span>
    <span class="stage-count">5/10 done</span>
  </div>
  <div class="items-grid">
    <div class="item done">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">4-color palette locked — Navy, Amber, Grey, Off-White</div>
        <div class="item-desc">Global industrial trust palette.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Color psychology rationale document</div>
        <div class="item-desc">Amber=heat, Navy=authority, Grey=precision.</div>
      </div>
    </div>
    <div class="item done">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">WCAG AA contrast verified (5.12:1)</div>
        <div class="item-desc">Accessibility compliance certified.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Dark mode color variants</div>
        <div class="item-desc">Website dark/light toggle ready.</div>
      </div>
    </div>
    <div class="item done">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Inter variable font system</div>
        <div class="item-desc">Bold 700 / Regular 400 / Mono locked.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Typography specimen PDF</div>
        <div class="item-desc">H1 48px → Body 16px → Mono 14px.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Brand guidelines PDF (dos/don'ts)</div>
        <div class="item-desc">Permanent usage bible.</div>
      </div>
    </div>
    <div class="item done">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Color hex codes + Tailwind config</div>
        <div class="item-desc">Developer-ready tokens.</div>
      </div>
    </div>
    <div class="item done">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">CSS variables export</div>
        <div class="item-desc">Website + email + print consistent.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Social media color templates</div>
        <div class="item-desc">LinkedIn, Instagram consistent.</div>
      </div>
    </div>
  </div>
</div>

<div class="stage">
  <div class="stage-header">
    <span class="stage-icon">📄</span>
    <span class="stage-title">Business Document Templates</span>
    <span class="stage-count">0/12 done</span>
  </div>
  <div class="items-grid">
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Invoice template — Inter Bold + Navy header</div>
        <div class="item-desc">Professional billing every client.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Quotation format PDF template</div>
        <div class="item-desc">Faster deal closing.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">MOU / Agreement format</div>
        <div class="item-desc">Legal protection on every project.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Study report cover page template</div>
        <div class="item-desc">DSC/RC1/TGA reports branded.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Payment receipt template</div>
        <div class="item-desc">Instant trust on payment.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Client NDA template</div>
        <div class="item-desc">Confidentiality protection.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Company letterhead — print + digital</div>
        <div class="item-desc">Govt correspondence ready.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Business card design (front + back)</div>
        <div class="item-desc">Amber back, Navy front.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Email signature HTML</div>
        <div class="item-desc">Every email = brand impression.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Presentation template (10 slides)</div>
        <div class="item-desc">Pitch decks, client proposals.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Lab report watermark system</div>
        <div class="item-desc">Secure proprietary reports.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Certificate of analysis template</div>
        <div class="item-desc">Official test result delivery.</div>
      </div>
    </div>
  </div>
</div>

<div class="stage">
  <div class="stage-header">
    <span class="stage-icon">🌐</span>
    <span class="stage-title">Website Structure & Core</span>
    <span class="stage-count">3/14 done</span>
  </div>
  <div class="items-grid">
    <div class="item done">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Next.js 15 production build — zero errors</div>
        <div class="item-desc">Enterprise-grade foundation.</div>
      </div>
    </div>
    <div class="item done">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Tailwind config locked to brand system</div>
        <div class="item-desc">Pixel-perfect brand consistency.</div>
      </div>
    </div>
    <div class="item done">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Responsive design (375px to 1440px)</div>
        <div class="item-desc">Perfect on all screens.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Custom domain setup (enthalpylabs.com)</div>
        <div class="item-desc">Your professional address live.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Vercel deployment + CDN</div>
        <div class="item-desc">99.99% uptime guaranteed.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">SSL certificate (HTTPS green lock)</div>
        <div class="item-desc">Security trust signal.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">DNS configuration (Hostinger → Vercel)</div>
        <div class="item-desc">Domain points to website.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Custom 404 error page (branded)</div>
        <div class="item-desc">Even errors look professional.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Robots.txt (admin areas protected)</div>
        <div class="item-desc">Search engine access control.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">XML Sitemap (auto-generated)</div>
        <div class="item-desc">Google indexes faster.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">PWA manifest (install on mobile)</div>
        <div class="item-desc">Works like an app offline.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Security headers (A+ rating)</div>
        <div class="item-desc">Enterprise security grade.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Dark/Light mode toggle</div>
        <div class="item-desc">User preference respected.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Page load speed < 2 seconds</div>
        <div class="item-desc">Visitor retention optimized.</div>
      </div>
    </div>
  </div>
</div>

<div class="stage">
  <div class="stage-header">
    <span class="stage-icon">🔥</span>
    <span class="stage-title">Homepage & Hero Experience</span>
    <span class="stage-count">0/10 done</span>
  </div>
  <div class="items-grid">
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">ΔH tetrahedron 3D animated hero section</div>
        <div class="item-desc">First impression = fire energy.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">India's #1 Mettler Toledo headline</div>
        <div class="item-desc">Authority positioning locked.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Animated stats counters (studies/clients)</div>
        <div class="item-desc">Trust proof above fold.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">METTLER TOLEDO partner badge display</div>
        <div class="item-desc">Instant credibility signal.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Industries served marquee (pharma/polymer/battery)</div>
        <div class="item-desc">Visitor says 'this is for me'.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Services overview bento grid</div>
        <div class="item-desc">DSC/RC1/TGA visual hierarchy.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">'How it Works' 3-step visual</div>
        <div class="item-desc">Book → Ship → Receive report.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Client logo cloud (hover → testimonial)</div>
        <div class="item-desc">Social proof interactive.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">WhatsApp sticky enquiry button</div>
        <div class="item-desc">0-friction lead capture.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Primary CTA — 'Book Free Consultation'</div>
        <div class="item-desc">Every visitor to enquiry.</div>
      </div>
    </div>
  </div>
</div>

<div class="stage">
  <div class="stage-header">
    <span class="stage-icon">🧪</span>
    <span class="stage-title">Service Pages (DSC / RC1 / TGA)</span>
    <span class="stage-count">0/10 done</span>
  </div>
  <div class="items-grid">
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">DSC differential scanning calorimetry page</div>
        <div class="item-desc">Ranks 'DSC testing Hyderabad'.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">RC1 calorimetry reaction safety page</div>
        <div class="item-desc">Reaction safety authority.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">TGA thermal analysis service page</div>
        <div class="item-desc">Polymer/pharma audience.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Isothermal titration calorimetry page</div>
        <div class="item-desc">Niche high-value service.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Process safety assessment page</div>
        <div class="item-desc">Premium B2B offering.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Sample submission guide page</div>
        <div class="item-desc">Client friction removed.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Turnaround time + pricing guide</div>
        <div class="item-desc">Faster decision making.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Equipment specifications page</div>
        <div class="item-desc">Technical trust builder.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Industries served page (pharma/battery/polymer)</div>
        <div class="item-desc">Sector-specific landing.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">FAQ page with schema markup</div>
        <div class="item-desc">Google featured snippets.</div>
      </div>
    </div>
  </div>
</div>

<div class="stage">
  <div class="stage-header">
    <span class="stage-icon">📸</span>
    <span class="stage-title">Content & Media</span>
    <span class="stage-count">0/11 done</span>
  </div>
  <div class="items-grid">
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Branding video embed (hero + about)</div>
        <div class="item-desc">60s lab tour = instant trust.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Equipment photo gallery (DSC/RC1/TGA)</div>
        <div class="item-desc">Proof of world-class facility.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Lab interior photo series</div>
        <div class="item-desc">Clean room credibility.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Team photos (Hari Sir + scientists)</div>
        <div class="item-desc">Human trust signals.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Equipment spec sheets PDF</div>
        <div class="item-desc">Downloadable technical proof.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Case study 1 — pharma DSC project</div>
        <div class="item-desc">Real result testimonial.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Case study 2 — polymer RC1 project</div>
        <div class="item-desc">Industry-specific proof.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Case study 3 — battery TGA project</div>
        <div class="item-desc">Emerging sector authority.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Client testimonials (5-8 verified)</div>
        <div class="item-desc">Social proof for every page.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Stats verified (projects/industries/accuracy)</div>
        <div class="item-desc">Trust numbers homepage.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">About page — Hari Sir bio + mission</div>
        <div class="item-desc">Founder story = trust.</div>
      </div>
    </div>
  </div>
</div>

<div class="stage">
  <div class="stage-header">
    <span class="stage-icon">✍️</span>
    <span class="stage-title">Blog & SEO Content (100 Posts)</span>
    <span class="stage-count">2/15 done</span>
  </div>
  <div class="items-grid">
    <div class="item done">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">100 blog topics researched and mapped</div>
        <div class="item-desc">Keyword goldmine complete.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Blog 1–10: DSC fundamentals series</div>
        <div class="item-desc">Foundation traffic cluster.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Blog 11–20: RC1 reaction safety series</div>
        <div class="item-desc">Safety buyer intent.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Blog 21–30: TGA polymer applications</div>
        <div class="item-desc">Materials science traffic.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Blog 31–40: Pharma compliance guides</div>
        <div class="item-desc">ICH/USP regulatory traffic.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Blog 41–50: Industry application series</div>
        <div class="item-desc">Battery/food/agrochem.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Blog 51–60: Advanced technique guides</div>
        <div class="item-desc">Expert authority content.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Blog 61–70: Case study write-ups</div>
        <div class="item-desc">Conversion-focused posts.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Blog 71–80: Equipment comparison posts</div>
        <div class="item-desc">High buyer-intent traffic.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Blog 81–90: Regulatory compliance posts</div>
        <div class="item-desc">FDA/EU audience.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Blog 91–100: Future trends series</div>
        <div class="item-desc">Industry thought leadership.</div>
      </div>
    </div>
    <div class="item done">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Backlinks mapped (3–5 per post)</div>
        <div class="item-desc">DR 50–90 authority sources.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Internal linking structure (all 100)</div>
        <div class="item-desc">Topic cluster architecture.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Featured images prompt system</div>
        <div class="item-desc">Visual SEO + dwell time.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Sanity CMS upload (all 100 posts)</div>
        <div class="item-desc">Client editable forever.</div>
      </div>
    </div>
  </div>
</div>

<div class="stage">
  <div class="stage-header">
    <span class="stage-icon">🔍</span>
    <span class="stage-title">SEO Architecture</span>
    <span class="stage-count">1/11 done</span>
  </div>
  <div class="items-grid">
    <div class="item done">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">100 'best [keyword]' meta title system</div>
        <div class="item-desc">Page 1 for 100 searches.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">JSON-LD Organization schema</div>
        <div class="item-desc">Google knowledge panel.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">JSON-LD LocalBusiness schema</div>
        <div class="item-desc">Maps + local ranking.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">FAQ schema (20 pages)</div>
        <div class="item-desc">Featured snippet capture.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Open Graph tags (all pages)</div>
        <div class="item-desc">Perfect social sharing.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Canonical URLs (no duplicate content)</div>
        <div class="item-desc">SEO authority preserved.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Alt text system (all images)</div>
        <div class="item-desc">Image SEO + accessibility.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Core Web Vitals optimized (95+ score)</div>
        <div class="item-desc">Google ranking factor.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Google Search Console setup</div>
        <div class="item-desc">Search performance tracked.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Google My Business setup guide</div>
        <div class="item-desc">'DSC Hyderabad' local #1.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">XML sitemap submission</div>
        <div class="item-desc">Faster Google indexing.</div>
      </div>
    </div>
  </div>
</div>

<div class="stage">
  <div class="stage-header">
    <span class="stage-icon">🔐</span>
    <span class="stage-title">Client Portal & Security</span>
    <span class="stage-count">0/8 done</span>
  </div>
  <div class="items-grid">
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Client login portal (/account)</div>
        <div class="item-desc">Track studies in real time.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Study status dashboard</div>
        <div class="item-desc">Sample received → In progress → Report ready.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">PDF report secure downloads</div>
        <div class="item-desc">No email attachments needed.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Study history archive</div>
        <div class="item-desc">All past analyses accessible.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Profile & billing management</div>
        <div class="item-desc">Self-serve account control.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Supabase authentication (OTP login)</div>
        <div class="item-desc">Passwordless modern auth.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Data privacy (RLS policies)</div>
        <div class="item-desc">Client data never crosses.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Session management + auto-logout</div>
        <div class="item-desc">Secure enterprise standard.</div>
      </div>
    </div>
  </div>
</div>

<div class="stage">
  <div class="stage-header">
    <span class="stage-icon">⚙️</span>
    <span class="stage-title">Admin Command Center</span>
    <span class="stage-count">0/9 done</span>
  </div>
  <div class="items-grid">
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Admin dashboard (/admin)</div>
        <div class="item-desc">All studies at a glance.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Lead management system</div>
        <div class="item-desc">Enquiry to client pipeline.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Study assignment workflow</div>
        <div class="item-desc">Assign analyst to study.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Status update system (triggers emails)</div>
        <div class="item-desc">Client auto-notified.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">PDF report upload system</div>
        <div class="item-desc">Drag-drop delivery.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Client database management</div>
        <div class="item-desc">Full CRM functionality.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Analytics overview (enquiries/revenue)</div>
        <div class="item-desc">Business intelligence.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Export CSV (clients/studies/revenue)</div>
        <div class="item-desc">Accounts + reporting.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">WhatsApp lead management</div>
        <div class="item-desc">All enquiries tracked.</div>
      </div>
    </div>
  </div>
</div>

<div class="stage">
  <div class="stage-header">
    <span class="stage-icon">💳</span>
    <span class="stage-title">Booking & Payment System</span>
    <span class="stage-count">0/8 done</span>
  </div>
  <div class="items-grid">
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">5-step booking wizard (/book)</div>
        <div class="item-desc">Guided service selection.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Service calculator (instant price estimate)</div>
        <div class="item-desc">Faster conversion.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Razorpay payment gateway</div>
        <div class="item-desc">All Indian payment methods.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">UPI payment support</div>
        <div class="item-desc">India's preferred method.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Booking confirmation emails</div>
        <div class="item-desc">Professional auto-response.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Invoice PDF auto-generation</div>
        <div class="item-desc">GST-compliant billing.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">WhatsApp booking confirmation</div>
        <div class="item-desc">Instant client notification.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Calendar booking integration</div>
        <div class="item-desc">Schedule sample pickup.</div>
      </div>
    </div>
  </div>
</div>

<div class="stage">
  <div class="stage-header">
    <span class="stage-icon">📊</span>
    <span class="stage-title">Analytics & Growth Tracking</span>
    <span class="stage-count">0/7 done</span>
  </div>
  <div class="items-grid">
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">GA4 property setup</div>
        <div class="item-desc">Every visitor tracked.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Conversion event tracking</div>
        <div class="item-desc">Bookings, CTA clicks, enquiries.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Scroll depth + exit intent tracking</div>
        <div class="item-desc">Understand drop-off points.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Hotjar heatmap setup</div>
        <div class="item-desc">See where users click.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">UTM parameter handling</div>
        <div class="item-desc">Campaign ROI tracking.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Monthly performance report template</div>
        <div class="item-desc">Enquiries/traffic/conversions.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Goal funnel setup (visit→book→pay)</div>
        <div class="item-desc">Conversion rate optimization.</div>
      </div>
    </div>
  </div>
</div>

<div class="stage">
  <div class="stage-header">
    <span class="stage-icon">📧</span>
    <span class="stage-title">Integrations & Automation</span>
    <span class="stage-count">0/6 done</span>
  </div>
  <div class="items-grid">
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">WhatsApp webhook — enquiries auto-logged</div>
        <div class="item-desc">Zero missed leads.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Contact form → email + WhatsApp notify</div>
        <div class="item-desc">Instant alert system.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Study status → auto email to client</div>
        <div class="item-desc">No manual follow-up.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Admin notification on every new lead</div>
        <div class="item-desc">Instant Hari Sir alert.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Google Maps embed (lab location)</div>
        <div class="item-desc">Walk-in + delivery clarity.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Resend email service setup</div>
        <div class="item-desc">99.9% email delivery rate.</div>
      </div>
    </div>
  </div>
</div>

<div class="stage">
  <div class="stage-header">
    <span class="stage-icon">🚀</span>
    <span class="stage-title">Performance & Mobile</span>
    <span class="stage-count">0/6 done</span>
  </div>
  <div class="items-grid">
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Lighthouse score 95+ (all 4 categories)</div>
        <div class="item-desc">Google's top grade.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">iPhone Safari full optimization</div>
        <div class="item-desc">60% Indian mobile users.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Android Chrome optimization</div>
        <div class="item-desc">Full mobile coverage.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Image optimization (WebP format)</div>
        <div class="item-desc">3x faster page loads.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Lazy loading all images</div>
        <div class="item-desc">Instant above-fold speed.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Mobile booking flow tested end-to-end</div>
        <div class="item-desc">Conversion on mobile.</div>
      </div>
    </div>
  </div>
</div>

<div class="stage">
  <div class="stage-header">
    <span class="stage-icon">🛡️</span>
    <span class="stage-title">Launch & Handover</span>
    <span class="stage-count">0/8 done</span>
  </div>
  <div class="items-grid">
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Staging preview → production deploy</div>
        <div class="item-desc">Zero downtime launch.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Post-launch 24hr monitoring</div>
        <div class="item-desc">Issues caught immediately.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Client walkthrough call (2 hours)</div>
        <div class="item-desc">Full system training.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Admin panel training — Hari Sir</div>
        <div class="item-desc">Manages studies independently.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Sanity CMS content training</div>
        <div class="item-desc">Update blogs independently.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Passwords + credentials secure vault</div>
        <div class="item-desc">Secure handover.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">Post-launch Lighthouse verification</div>
        <div class="item-desc">Performance certified.</div>
      </div>
    </div>
    <div class="item">
      <div class="item-status"></div>
      <div class="item-body">
        <div class="item-name">30-day post-launch support</div>
        <div class="item-desc">We've got your back.</div>
      </div>
    </div>
  </div>
</div>

</div>

<div class="footer">
  <div class="footer-title">Project Milestones</div>
  <div class="footer-sub">157 total deliverables · 17 completed · 140 in pipeline</div>
  <div class="payment-table">
    <div class="pt-cell paid">
      <div class="pt-label">Advance</div>
      <div class="pt-val">✅ Paid</div>
      <div class="pt-tag green">Project started</div>
    </div>
    <div class="pt-cell">
      <div class="pt-label">Design Approval</div>
      <div class="pt-val">⏳ Pending</div>
      <div class="pt-tag amber">On preview sign-off</div>
    </div>
    <div class="pt-cell">
      <div class="pt-label">Final Handover</div>
      <div class="pt-val">⏳ Pending</div>
      <div class="pt-tag grey">On project delivery</div>
    </div>
  </div>
  <p style="color:var(--text-muted);font-size:12px;margin-top:20px;">AGNAA Design Studio · agnaa.in · Hyderabad</p>
</div>

<script>
  (function() {
    const start = new Date('2026-04-08T00:00:00+05:30');
    const now = new Date();
    const days = Math.max(1, Math.floor((now - start) / (1000 * 60 * 60 * 24)) + 1);
    const el = document.getElementById('days-counter');
    const eta = document.getElementById('eta-days');
    if (el) el.textContent = days;
    if (eta) eta.textContent = 'Day ' + days;
  })();
</script>

`;
