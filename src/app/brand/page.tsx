'use client';

import React, { useState } from 'react';
import { Download, Lock, CheckCircle2, FileText, ImageIcon, Box } from 'lucide-react';

const BRAND_ASSETS = {
  svgs: [
    { name: 'ΔH Tetrahedron Logomark', file: 'delta-h-tetrahedron.svg', desc: 'Sacred geometry fire symbol' },
    { name: 'Full Wordmark', file: 'enthalpy-labs-wordmark.svg', desc: 'ENHALPY Bold + LABS Grey' },
    { name: 'Inline Wordmark', file: 'enthalpy-labs-inline.svg', desc: 'Icon replaces A in ENTHALPY' },
    { name: 'Monotone Black', file: 'enthalpy-labs-monotone.svg', desc: 'Single color stamp version' },
    { name: 'Stacked Mobile', file: 'enthalpy-labs-stacked.svg', desc: 'Optimized for square/app formats' },
  ],
  pngs: [
    { name: 'High-Res Logo (White)', file: 'logo-on-white.png', desc: 'Transparent background for print' },
    { name: 'High-Res Logo (Dark)', file: 'logo-on-dark.png', desc: 'Optimized for navy backgrounds' },
    { name: 'Favicon Set', file: 'favicon-set.png', desc: 'Multi-resolution browser icons' },
    { name: 'Watermark Logo', file: 'logo-watermark.png', desc: '30% opacity for documents' },
  ],
  documents: [
    { name: 'Brand Guidelines v3.1', file: 'Enthalpy-Labs-Brand-Guidelines-v3.html', desc: 'Interactive style guide & specifications' },
    { name: 'SVG to PNG Toolkit', file: 'SVG-to-PNG-Converter.html', desc: 'Internal asset transformation utility' },
  ],
};

export default function BrandPortal() {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'entlabs') {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FFAB00] to-[#FF4D00] rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
              <Lock className="text-white w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-white mb-2">Enthalpy Labs</h1>
          <p className="text-slate-400 text-center text-sm mb-8">Secure Brand Asset Portal</p>
          
          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter access password"
                className={`w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFAB00] transition-all`}
              />
              {error && <p className="text-red-400 text-xs mt-2 text-center">Invalid access code. Please try again.</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FFAB00] to-[#FF4D00] text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Access Assets
            </button>
          </form>
          <p className="text-slate-500 text-[10px] text-center mt-8 uppercase tracking-widest">Authorized Access Only</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-slate-200">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0A0F1C]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FFAB00] to-[#FF4D00] rounded-lg"></div>
            <span className="text-xl font-bold text-white tracking-tight">ENTHALPY LABS <span className="text-slate-500 font-light">BRAND</span></span>
          </div>
          <div className="flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-semibold border border-green-500/20">
            <CheckCircle2 size={14} />
            SECURE ACCESS
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Official Brand Assets</h2>
          <p className="text-slate-400 max-w-2xl">
            Download production-ready logos, color systems, and brand documentation. 
            All vector files are optimized for CMYK and Digital applications.
          </p>
        </div>

        {/* Section: SVGs */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Box className="text-[#FFAB00]" size={20} />
            <h3 className="text-xl font-semibold text-white">Vector Assets (SVG)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRAND_ASSETS.svgs.map((asset) => (
              <AssetCard key={asset.file} asset={asset} type="svgs" />
            ))}
          </div>
        </section>

        {/* Section: PNGs */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <ImageIcon className="text-[#FFAB00]" size={20} />
            <h3 className="text-xl font-semibold text-white">High-Resolution Raster (PNG)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRAND_ASSETS.pngs.map((asset) => (
              <AssetCard key={asset.file} asset={asset} type="pngs" />
            ))}
          </div>
        </section>

        {/* Section: Documents */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <FileText className="text-[#FFAB00]" size={20} />
            <h3 className="text-xl font-semibold text-white">Guidelines & Tools</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRAND_ASSETS.documents.map((asset) => (
              <AssetCard key={asset.file} asset={asset} type="documents" />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-500 text-sm">© 2026 Enthalpy Labs. All rights reserved. Managed by Agnaa.</p>
        </div>
      </footer>
    </div>
  );
}

function AssetCard({ asset, type }: { asset: { name: string, file: string, desc: string }, type: string }) {
  const downloadUrl = `/brand-assets/${type}/${asset.file}`;
  
  return (
    <div className="group bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.08] hover:border-[#FFAB00]/50 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-[#FFAB00] transition-colors">
          {type === 'svgs' ? <Box size={20} /> : type === 'pngs' ? <ImageIcon size={20} /> : <FileText size={20} />}
        </div>
        <a 
          href={downloadUrl} 
          download 
          className="bg-[#FFAB00]/10 hover:bg-[#FFAB00] text-[#FFAB00] hover:text-white p-2 rounded-lg transition-all"
        >
          <Download size={18} />
        </a>
      </div>
      <h4 className="text-white font-medium mb-1">{asset.name}</h4>
      <p className="text-slate-500 text-xs leading-relaxed">{asset.desc}</p>
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{asset.file.split('.').pop()}</span>
        <span className="text-[10px] text-slate-600">Production Ready</span>
      </div>
    </div>
  );
}
