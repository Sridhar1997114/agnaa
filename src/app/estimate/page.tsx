"use client";

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Inter, Space_Grotesk } from 'next/font/google';
import {
  CheckCircle2, MapPin, Hammer, Package, LayoutGrid, Hexagon, Waves, 
  AppWindow, Grid as GridIcon, DoorClosed, Zap, Paintbrush, Droplets, Utensils, Ruler, 
  ArrowRight, GripVertical, Download, X, Loader2, Sparkles, ShieldCheck, IndianRupee,
  Building, Check, Phone, ArrowUpRight, ChevronRight, Layers, FileText,
  Sliders, RotateCcw, Plus, Minus, Edit3, Eye, Printer, Calendar, Clock
} from 'lucide-react';
import { generateEstimatePdf } from '@/lib/pdf/generateEstimatePdf';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['400', '500', '600', '700', '800', '900'] });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', weight: ['400', '500', '600', '700'] });

// ─── AGNAA LOGO (Perfect Vector Mask) ───────────────────────────────────────
const AgnaaLogo = ({ className = "h-8 w-auto", fill = "", width, height }: { className?: string, fill?: string, width?: number|string, height?: number|string }) => (
  <svg viewBox="0 0 4000 4000" className={className} width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <defs>
      {!fill && (
        <>
          <filter id="est-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="50" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="est-grad" x1="32%" y1="97%" x2="68%" y2="3%">
            <stop offset="50%" stopColor="#1C1C72" />
            <stop offset="75%" stopColor="#4A259C" />
            <stop offset="100%" stopColor="#7B2DBF" />
          </linearGradient>
        </>
      )}
      <mask id="est-mask">
        <rect width="4000" height="4000" fill="black" />
        <polygon fill="white" points="104.5,3397.1 104.5,1340.9 703.1,1108.1 703.1,3397.1 503.5,3397.1 503.5,2200 304,2200 304,3397.1" />
        <polygon fill="white" points="902.6,3197.6 902.6,3397.1 1501.1,3397.1 1501.1,797.7 902.6,1030.5 902.6,2200 1301.6,2200 1301.6,3197.6" />
        <polygon fill="white" points="1700.7,3397.1 1900.2,3397.1 1900.2,856.7 1999.9,817.8 2099.7,856.7 2099.7,3397.1 2299.2,3397.1 2299.2,720.1 1999.9,603.8 1700.7,720.1" />
        <polygon fill="white" points="2498.9,1011.8 2897.9,1167 2897.9,2000.4 2498.9,2000.4 2498.9,3397.1 3097.4,3397.1 3097.4,1030.5 2498.9,797.7" />
        <polygon fill="white" points="3296.9,1108.1 3895.5,1340.9 3895.5,3397.1 3696,3397.1 3696,2200 3496.5,2200 3496.5,3397.1 3296.9,3397.1" />
        <polygon fill="black" points="304,2000.4 503.5,2000.4 503.5,1399.8 304,1477.3" />
        <polygon fill="black" points="3496.5,1399.8 3696,1477.3 3696,2000.4 3496.5,2000.4" />
        <rect x="2698.4" y="2200" fill="black" width="199.5" height="997.6" />
        <polygon fill="black" points="1102.1,1167 1301.6,1089.4 1301.6,2000.4 1102.1,2000.4" />
      </mask>
    </defs>
    {fill ? (
      <g>
        <rect width="4000" height="4000" fill={fill} mask="url(#est-mask)" />
      </g>
    ) : (
      <g>
        <rect width="4000" height="4000" fill="url(#est-grad)" mask="url(#est-mask)" opacity="0.36" filter="url(#est-glow)" />
        <rect width="4000" height="4000" fill="url(#est-grad)" mask="url(#est-mask)" />
      </g>
    )}
  </svg>
);

// ─── PACKAGES & SPECIFICATIONS (STANDARD DEFAULTS) ─────────────────────────
type PackageTier = 'basic' | 'standard' | 'premium';

interface PackageConfig {
  id: PackageTier;
  name: string;
  tag: string;
  defaultRate: number;
  marketRateMultiplier: number;
  badge?: string;
  themeColor: string;
  specs: {
    cement: string;
    steel: string;
    flooring: string;
    bathrooms: string;
    openings: string;
    electrical: string;
    painting: string;
  };
}

const DEFAULT_PACKAGES: Record<PackageTier, PackageConfig> = {
  basic: {
    id: 'basic',
    name: 'Basic',
    tag: 'Essential Core Quality',
    defaultRate: 1750,
    marketRateMultiplier: 1.114,
    themeColor: '#2563EB',
    specs: {
      cement: '43-Grade OPC / PPC (Coromandel / Sagar)',
      steel: 'Fe500 Primary / Secondary TMT',
      flooring: "2'×2' Vitrified Tiles (₹55/sqft)",
      bathrooms: 'Cera / Hindware Sanitary Fittings',
      openings: 'Flush doors, 2-track aluminium sliding windows',
      electrical: 'Anchor Roma modular, Finolex wiring',
      painting: 'Tractor Emulsion (Asian Paints)'
    }
  },
  standard: {
    id: 'standard',
    name: 'Standard',
    tag: 'A-Grade Construction (Most Popular)',
    defaultRate: 1950,
    marketRateMultiplier: 1.118,
    badge: 'MOST POPULAR',
    themeColor: '#7B2DBF',
    specs: {
      cement: '53-Grade OPC / PPC (UltraTech / ACC / Ramco)',
      steel: 'Fe550D TMT (Tata Tiscon / Jindal Panther)',
      flooring: "4'×2' Double-Charged Vitrified (₹90/sqft)",
      bathrooms: 'Jaquar / Cera Premium Wall-hung',
      openings: 'Teakwood Main Frame + UPVC windows with mosquito mesh',
      electrical: 'Legrand / Havells Modular, Polycab FRLS',
      painting: 'Apex Exterior + Royal Luxury Emulsion Interior'
    }
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    tag: 'Luxury Turnkey Signature Architecture',
    defaultRate: 2250,
    marketRateMultiplier: 1.133,
    badge: 'LUXURY TIER',
    themeColor: '#D97706',
    specs: {
      cement: 'UltraTech Super / ACC Concrete Plus (Water-repellent)',
      steel: 'Tata Tiscon Fe550D High-Ductility Rebar',
      flooring: "4'×4' / 6'×4' Glazed Vitrified / Marble Allowance",
      bathrooms: 'Kohler / Grohe Concealed Diverters',
      openings: 'Ghana Teakwood Doors + Kommerling / Fenesta UPVC',
      electrical: 'Schneider / Legrand Arteor + EV Charging point',
      painting: 'Royale Aspira / PU finish + Texture accent walls'
    }
  }
};

// ─── 14-TRADE MATERIAL & SCOPE MATRIX (Sum = ₹1,950/sqft in Standard) ───────
interface MaterialItem {
  id: string;
  category: 'Civil & Structure' | 'Finishing & Surfaces' | 'MEP Services' | 'Engineering & Management';
  label: string;
  unit: string;
  icon: any;
  getQty: (a: number) => number;
  baseRatePerUnit: number;
}

const MATERIAL_BASE: MaterialItem[] = [
  // 1. Civil & Structure (~49%)
  { id: 'cement',     category: 'Civil & Structure', label: 'Cement (UltraTech / ACC)', unit: 'Bags',  icon: Package,      getQty: (a: number) => Math.ceil(a * 0.45),      baseRatePerUnit: 433 },
  { id: 'steel',      category: 'Civil & Structure', label: 'TMT Steel Rebar (Tata / Jindal)', unit: 'KG',    icon: GripVertical, getQty: (a: number) => Math.ceil(a * 3.5),       baseRatePerUnit: 76  },
  { id: 'bricks',     category: 'Civil & Structure', label: 'Masonry Red Bricks / AAC', unit: 'PCS',   icon: LayoutGrid,   getQty: (a: number) => Math.ceil(a * 19),        baseRatePerUnit: 9.5 },
  { id: 'sand',       category: 'Civil & Structure', label: 'River / Robo Sand (M-Sand)', unit: 'Tons',  icon: Waves,        getQty: (a: number) => +(a * 0.09).toFixed(1),   baseRatePerUnit: 1400 },
  { id: 'aggregate',  category: 'Civil & Structure', label: 'Coarse Aggregate (20mm & 40mm)', unit: 'Tons',  icon: Hexagon,      getQty: (a: number) => +(a * 0.0855).toFixed(1), baseRatePerUnit: 1150 },

  // 2. Finishing & Surfaces (~24%)
  { id: 'flooring',   category: 'Finishing & Surfaces', label: 'Flooring & Vitrified Tiling', unit: 'Sqft',  icon: GridIcon,     getQty: (a: number) => a,                        baseRatePerUnit: 120 },
  { id: 'doors',      category: 'Finishing & Surfaces', label: 'Doors & Teakwood Frames',     unit: 'Sqft',  icon: DoorClosed,   getQty: (a: number) => Math.ceil(a * 0.18),      baseRatePerUnit: 650 },
  { id: 'windows',    category: 'Finishing & Surfaces', label: 'Windows & Glazed UPVC',       unit: 'Sqft',  icon: AppWindow,    getQty: (a: number) => Math.ceil(a * 0.17),      baseRatePerUnit: 500 },
  { id: 'painting',   category: 'Finishing & Surfaces', label: 'Putty, Primer & Emulsion',    unit: 'Sqft',  icon: Paintbrush,   getQty: (a: number) => Math.ceil(a * 6),         baseRatePerUnit: 32  },

  // 3. MEP Services (~15%)
  { id: 'electrical', category: 'MEP Services', label: 'Electrical Modular & Wiring', unit: 'Sqft',  icon: Zap,          getQty: (a: number) => a,                        baseRatePerUnit: 85  },
  { id: 'sanitary',   category: 'MEP Services', label: 'Plumbing & Concealed Sanitary', unit: 'Sqft',  icon: Droplets,     getQty: (a: number) => a,                        baseRatePerUnit: 110 },
  { id: 'kitchen',    category: 'MEP Services', label: 'Granite Counter & SS Sink',   unit: 'Sqft',  icon: Utensils,     getQty: (a: number) => Math.ceil(a * 0.055),     baseRatePerUnit: 1300 },

  // 4. Engineering & Management (~12%)
  { id: 'contractor', category: 'Engineering & Management', label: 'Turnkey Site Execution & Labor', unit: 'Sqft',  icon: Hammer,       getQty: (a: number) => a,                        baseRatePerUnit: 205 },
  { id: 'architect',  category: 'Engineering & Management', label: 'Architectural & Struct Engineering', unit: 'Sqft',  icon: Ruler,        getQty: (a: number) => a,                        baseRatePerUnit: 100 },
];

const COLORS = ['#1C1C72','#2A1B81','#3B1A91','#4D1AA1','#6019B1','#7B2DBF','#9335D2','#AA3CE5','#C445F8','#38B6FF','#0094FF','#0071FF','#4A4A4A','#8B5CF6'];

const STATES = ['Telangana', 'Andhra Pradesh', 'Karnataka', 'Tamil Nadu', 'Maharashtra'];

const LOCALITIES: Record<string, string[]> = {
  'Telangana': ['Hyderabad', 'Gachibowli', 'Jubilee Hills', 'Financial District', 'Tellapur', 'Kokapet', 'Banjara Hills', 'Madhapur', 'Mokila', 'Secunderabad', 'Warangal'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Kurnool', 'Rajahmundry'],
  'Karnataka': ['Bengaluru', 'Whitefield', 'Indiranagar', 'Koramangala', 'Mysuru'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur']
};

function EstimateContent() {
  const searchParams = useSearchParams();
  const initialSqft = searchParams?.get('sqft') || '2000';
  const initialTier = (searchParams?.get('tier') as PackageTier) || 'standard';

  // State Management
  const [state, setState] = useState<string>('Telangana');
  const [city, setCity] = useState<string>('Hyderabad');
  const [customLocality, setCustomLocality] = useState<string>('Gachibowli');
  const [area, setArea] = useState<string>(initialSqft);
  const [tier, setTier] = useState<PackageTier>(initialTier);
  const [floors, setFloors] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'Civil & Structure' | 'Finishing & Surfaces' | 'MEP Services' | 'Engineering & Management'>('all');

  // USER-EDITABLE RATES PER SFT
  const [customRates, setCustomRates] = useState<Record<PackageTier, number>>({
    basic: DEFAULT_PACKAGES.basic.defaultRate,
    standard: DEFAULT_PACKAGES.standard.defaultRate,
    premium: DEFAULT_PACKAGES.premium.defaultRate
  });

  const numArea = Math.max(100, parseFloat(area) || 0);
  const currentRatePerSqft = customRates[tier] || DEFAULT_PACKAGES[tier].defaultRate;
  const activePackage = DEFAULT_PACKAGES[tier];
  
  // Rate scale factor relative to 1950 baseline
  const rateMultiplier = currentRatePerSqft / 1950;

  const fullLocation = customLocality ? `${customLocality}, ${city}, ${state}` : `${city}, ${state}`;

  const fmt = (n: number) => Math.round(n).toLocaleString('en-IN');
  const fmtLakhs = (n: number) => (n / 100000).toFixed(2);
  const fmtCrores = (n: number) => (n / 10000000).toFixed(2);

  const d = new Date();
  const dd = String(d.getDate()).padStart(2,'0');
  const mmm = d.toLocaleString('en-GB',{month:'short'});
  const yyyy = d.getFullYear();
  const dateStr = `${dd} ${mmm} ${yyyy}`;
  const fileDateStr = `${dd}-${mmm}-${yyyy}`;

  useEffect(() => {
    document.title = `AGNAA | ${activePackage.name} Construction Cost - ${fullLocation}`;
  }, [activePackage, fullLocation]);

  // Adjust rate by step (+/- ₹50)
  const adjustRate = (tierKey: PackageTier, delta: number) => {
    setCustomRates(prev => ({
      ...prev,
      [tierKey]: Math.max(800, Math.min(10000, prev[tierKey] + delta))
    }));
  };

  const handleRateInputChange = (tierKey: PackageTier, value: string) => {
    const val = parseInt(value.replace(/\D/g, ''), 10) || 0;
    setCustomRates(prev => ({
      ...prev,
      [tierKey]: val
    }));
  };

  const resetRatesToDefault = () => {
    setCustomRates({
      basic: DEFAULT_PACKAGES.basic.defaultRate,
      standard: DEFAULT_PACKAGES.standard.defaultRate,
      premium: DEFAULT_PACKAGES.premium.defaultRate
    });
  };

  // Detailed 14-resource breakdown dynamically scaled to match customRatePerSqft
  const breakdown = useMemo(() => {
    return MATERIAL_BASE.map((mat, i) => {
      const qty = mat.getQty(numArea);
      const unitRate = Math.round(mat.baseRatePerUnit * rateMultiplier);
      const agnaaAmt = Math.round(qty * unitRate);
      const marketRate = Math.round(unitRate * activePackage.marketRateMultiplier);
      const mktAmt = Math.round(qty * marketRate);
      const savings = Math.max(0, mktAmt - agnaaAmt);
      return {
        ...mat,
        qty,
        unitRate,
        marketRate,
        mktAmt,
        agnaaAmt,
        savings,
        color: COLORS[i % COLORS.length]
      };
    });
  }, [numArea, rateMultiplier, activePackage]);

  const totalAgnaa = numArea * currentRatePerSqft;
  const totalMkt = numArea * Math.round(currentRatePerSqft * activePackage.marketRateMultiplier);
  const totalSavings = totalMkt - totalAgnaa;
  const savingPercent = totalMkt > 0 ? ((totalSavings / totalMkt) * 100).toFixed(0) : '11';

  // Phase-wise Category Totals
  const categoryTotals = useMemo(() => {
    const cats = ['Civil & Structure', 'Finishing & Surfaces', 'MEP Services', 'Engineering & Management'] as const;
    return cats.map(cat => {
      const items = breakdown.filter(b => b.category === cat);
      const sum = items.reduce((acc, curr) => acc + curr.agnaaAmt, 0);
      const percent = totalAgnaa > 0 ? Math.round((sum / totalAgnaa) * 100) : 25;
      return { category: cat, sum, percent };
    });
  }, [breakdown, totalAgnaa]);

  const filteredBreakdown = activeTab === 'all' 
    ? breakdown 
    : breakdown.filter(b => b.category === activeTab);

  // ─── HIGH-PRECISION 1-PAGE PDF GENERATION (300 DPI, ZERO CLIPPING) ───
  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    setDownloadSuccess(false);

    try {
      const cleanLoc = (customLocality || city).replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      const fileName = `AGNAA_Estimate_${numArea}sqft_${cleanLoc}_${tier}_${currentRatePerSqft}rate_${fileDateStr}.pdf`;

      const pdfBlob = await generateEstimatePdf({
        area: numArea,
        floors,
        location: fullLocation,
        tier,
        tierName: activePackage.name,
        tierTag: activePackage.tag,
        ratePerSqft: currentRatePerSqft,
        benchmarkRate: activePackage.defaultRate,
        totalCost: totalAgnaa,
        totalMarketCost: totalMkt,
        totalSavings: totalSavings,
        savingPercent,
        dateStr,
        fileDateStr,
        refCode: `AGNAA/EST/${numArea}SQFT/${fileDateStr}`,
        specs: activePackage.specs,
        categoryTotals,
        breakdown: breakdown.map(b => ({
          id: b.id,
          label: b.label,
          category: b.category,
          qty: b.qty,
          unit: b.unit,
          unitRate: b.unitRate,
          marketRate: b.marketRate,
          mktAmt: b.mktAmt,
          agnaaAmt: b.agnaaAmt
        }))
      });

      // Native browser download
      const downloadUrl = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 2000);

      setDownloadSuccess(true);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      alert('Unable to generate PDF dossier. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleWhatsAppContact = () => {
    const waMsg = `Hi AGNAA, I just calculated my ${activePackage.name} Construction Estimate for ${numArea} SQFT in ${fullLocation} at ₹${currentRatePerSqft}/sft (Total: ₹${fmt(totalAgnaa)}). I'd like to schedule an architectural consultation.`;
    const waUrl = `https://wa.me/918826214348?text=${encodeURIComponent(waMsg)}`;
    window.open(waUrl, '_blank');
  };

  const QUICK_AREAS = [1000, 1500, 2000, 2500, 3000, 4000];

  return (
    <div className={`antialiased bg-[#FBFBFE] text-[#0F172A] min-h-screen relative flex flex-col items-center py-12 px-4 sm:px-6 ${inter.variable} ${space.variable}`}>
      {/* ─── APPLE STYLE AMBIENT BACKDROP ─── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#7B2DBF]/10 via-[#1C1C72]/5 to-transparent blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        
        {/* ─── DYNAMIC ISLAND CAPSULE BADGE ─── */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-sm shadow-[#1C1C72]/5 mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="w-2 h-2 rounded-full bg-[#7B2DBF] animate-pulse" />
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1C1C72]">
            AGNAA Precision Engine • Construction Calculator
          </span>
          <span className="bg-[#7B2DBF]/10 text-[#7B2DBF] text-[9px] font-bold px-2 py-0.5 rounded-full">v2.6</span>
        </div>

        {/* ─── HERO TYPOGRAPHY ─── */}
        <div className="text-center max-w-3xl mb-10">
          <h1 className="text-4xl sm:text-6xl font-black font-[var(--font-space)] tracking-tight text-[#0F172A] mb-4 uppercase">
            Home Construction <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#1C1C72] via-[#4A259C] to-[#7B2DBF] bg-clip-text text-transparent">
              Cost Estimator
            </span>
          </h1>
          <p className="text-slate-500 font-[var(--font-inter)] text-base sm:text-lg leading-relaxed">
            Architectural accuracy meets live turnkey budgeting. Select your micro-market, define built-up area, and calibrate rates across <strong className="text-[#0F172A]">Basic</strong>, <strong className="text-[#7B2DBF]">Standard</strong>, and <strong className="text-[#D97706]">Premium</strong> quality tiers.
          </p>
        </div>

        {/* ─── STEP PROGRESS CAPSULES ─── */}
        <div className="w-full grid grid-cols-3 gap-3 sm:gap-4 mb-8">
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/70 p-3 sm:p-4 rounded-2xl flex items-center gap-3 shadow-sm hover:border-[#1C1C72]/40 transition-all">
            <span className="w-7 h-7 rounded-xl bg-[#1C1C72] text-white text-xs font-black flex items-center justify-center shrink-0 shadow-sm">1</span>
            <div className="min-w-0">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Location</span>
              <span className="text-xs sm:text-sm font-bold text-[#0F172A] truncate block">{city}</span>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/70 p-3 sm:p-4 rounded-2xl flex items-center gap-3 shadow-sm hover:border-[#1C1C72]/40 transition-all">
            <span className="w-7 h-7 rounded-xl bg-[#1C1C72] text-white text-xs font-black flex items-center justify-center shrink-0 shadow-sm">2</span>
            <div className="min-w-0">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Built-Up Area</span>
              <span className="text-xs sm:text-sm font-bold text-[#0F172A] truncate block">{fmt(numArea)} SQFT</span>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-md border-2 border-[#7B2DBF] p-3 sm:p-4 rounded-2xl flex items-center gap-3 shadow-md shadow-[#7B2DBF]/10 bg-gradient-to-r from-white to-[#7B2DBF]/5">
            <span className="w-7 h-7 rounded-xl bg-[#7B2DBF] text-white text-xs font-black flex items-center justify-center shrink-0 shadow-sm">3</span>
            <div className="min-w-0">
              <span className="text-[9px] font-black text-[#7B2DBF] uppercase tracking-widest block">Live Tiers</span>
              <span className="text-xs sm:text-sm font-bold text-[#7B2DBF] truncate block">₹{currentRatePerSqft}/sft ({activePackage.name})</span>
            </div>
          </div>
        </div>

        {/* ─── SECTION 1: LOCATION & BUILT-UP AREA CONTROLS ─── */}
        <div className="w-full bg-white rounded-[32px] border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-10 mb-8 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* STEP 1: LOCATION */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#1C1C72]/10 flex items-center justify-center text-[#1C1C72]">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#1C1C72]">Project Location</h2>
                    <p className="text-[11px] text-slate-500">Material logistics & municipal norms vary by region.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">State</label>
                  <select
                    value={state}
                    onChange={e => {
                      setState(e.target.value);
                      const defaultCity = LOCALITIES[e.target.value]?.[0] || 'Hyderabad';
                      setCity(defaultCity);
                    }}
                    className="w-full bg-slate-50 hover:bg-slate-100 rounded-2xl px-4 py-3.5 text-sm font-bold text-[#0F172A] outline-none border border-slate-200 focus:border-[#7B2DBF] transition-all cursor-pointer"
                  >
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">City / Hub</label>
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100 rounded-2xl px-4 py-3.5 text-sm font-bold text-[#0F172A] outline-none border border-slate-200 focus:border-[#7B2DBF] transition-all cursor-pointer"
                  >
                    {(LOCALITIES[state] || ['Hyderabad']).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Locality / Micro-Market</label>
                <input
                  type="text"
                  value={customLocality}
                  onChange={e => setCustomLocality(e.target.value)}
                  placeholder="e.g. Gachibowli, Financial District, Jubilee Hills"
                  className="w-full bg-slate-50 hover:bg-slate-100 rounded-2xl px-4 py-3.5 text-sm font-bold text-[#0F172A] outline-none border border-slate-200 focus:border-[#7B2DBF] transition-all"
                />
              </div>

              {/* Quick Locality Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Gachibowli', 'Jubilee Hills', 'Financial District', 'Tellapur', 'Kokapet', 'Mokila'].map(loc => (
                  <button
                    key={loc}
                    onClick={() => setCustomLocality(loc)}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border transition-all ${
                      customLocality === loc 
                        ? 'bg-[#1C1C72] text-white border-[#1C1C72] shadow-sm' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2: BUILT-UP AREA */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#7B2DBF]/10 flex items-center justify-center text-[#7B2DBF]">
                    <Ruler size={16} />
                  </div>
                  <div>
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#1C1C72]">Total Built-Up Area</h2>
                    <p className="text-[11px] text-slate-500">Gross area across all planned floors.</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  {[1, 2, 3].map(fl => (
                    <button
                      key={fl}
                      onClick={() => setFloors(fl)}
                      className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${
                        floors === fl ? 'bg-white text-[#1C1C72] shadow-xs' : 'text-slate-500'
                      }`}
                    >
                      {fl === 1 ? 'G only' : `G+${fl-1}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Big Apple Style Numeric Input with Stepper */}
              <div className="relative flex items-center bg-slate-50 border-2 border-slate-200 hover:border-slate-300 focus-within:border-[#7B2DBF] rounded-2xl p-2 transition-all">
                <button
                  onClick={() => setArea((Math.max(200, numArea - 100)).toString())}
                  className="w-12 h-12 rounded-xl bg-white hover:bg-slate-100 active:scale-95 text-[#1C1C72] flex items-center justify-center shadow-xs border border-slate-200/80 transition-all cursor-pointer shrink-0"
                >
                  <Minus size={18} />
                </button>

                <div className="flex-1 text-center px-4">
                  <input
                    type="number"
                    min="100"
                    step="50"
                    value={area}
                    onChange={e => setArea(e.target.value)}
                    className="w-full text-center text-3xl sm:text-4xl font-black text-[#0F172A] font-[var(--font-space)] outline-none bg-transparent tabular-nums"
                  />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block -mt-1">
                    SQUARE FEET (SQFT)
                  </span>
                </div>

                <button
                  onClick={() => setArea((numArea + 100).toString())}
                  className="w-12 h-12 rounded-xl bg-white hover:bg-slate-100 active:scale-95 text-[#1C1C72] flex items-center justify-center shadow-xs border border-slate-200/80 transition-all cursor-pointer shrink-0"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Smooth Slider */}
              <div className="pt-1">
                <input 
                  type="range" 
                  min="500" 
                  max="8000" 
                  step="50"
                  value={numArea}
                  onChange={e => setArea(e.target.value)}
                  className="w-full accent-[#7B2DBF] cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                  <span>500 SFT</span>
                  <span>4,000 SFT</span>
                  <span>8,000 SFT</span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {QUICK_AREAS.map(val => (
                  <button
                    key={val}
                    onClick={() => setArea(val.toString())}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border transition-all ${
                      numArea === val 
                        ? 'bg-[#7B2DBF] text-white border-[#7B2DBF] shadow-sm' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {val.toLocaleString('en-IN')} SFT
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ─── SECTION 2: THE 3 EDITABLE QUALITY TIERS ─── */}
        <div className="w-full mb-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-5 px-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#0F172A]">
                  Step 3: Quality Specifications & Live Calibrated Rates
                </h2>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Edit3 size={11} /> Rates Editable
                </span>
              </div>
              <p className="text-xs text-slate-500">
                You can directly edit the Rate Per SFT on any card below or adjust with steppers.
              </p>
            </div>

            <button
              onClick={resetRatesToDefault}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-[#7B2DBF] bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
            >
              <RotateCcw size={12} />
              Reset Benchmark Rates
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(Object.keys(DEFAULT_PACKAGES) as PackageTier[]).map((pkgKey) => {
              const pkg = DEFAULT_PACKAGES[pkgKey];
              const isSelected = tier === pkgKey;
              const rateVal = customRates[pkgKey];
              const pkgTotal = numArea * rateVal;
              const isModified = rateVal !== pkg.defaultRate;

              return (
                <div
                  key={pkgKey}
                  onClick={() => setTier(pkgKey)}
                  className={`relative rounded-[32px] p-7 cursor-pointer transition-all duration-300 flex flex-col justify-between border-2 ${
                    isSelected 
                      ? 'bg-white border-[#7B2DBF] shadow-2xl shadow-[#7B2DBF]/15 scale-[1.02] ring-4 ring-[#7B2DBF]/10' 
                      : 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  {pkg.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#7B2DBF] to-[#1C1C72] text-white text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                      {pkg.badge}
                    </div>
                  )}

                  <div>
                    {/* Header Row */}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-2xl font-black text-[#0F172A] font-[var(--font-space)] tracking-tight">
                          {pkg.name}
                        </h3>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{pkg.tag}</p>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#7B2DBF] text-white shadow-sm' : 'bg-slate-100 text-slate-400'
                      }`}>
                        <Check size={18} strokeWidth={3} />
                      </div>
                    </div>

                    {/* LIVE EDITABLE RATE PER SFT INPUT */}
                    <div 
                      className={`my-5 p-4 rounded-2xl border transition-all ${
                        isSelected 
                          ? 'bg-[#F8FAFC] border-slate-200 shadow-inner' 
                          : 'bg-slate-50 border-slate-100'
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                          Rate Per SFT {isModified && <span className="text-amber-600 font-bold">• Edited</span>}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => adjustRate(pkgKey, -50)}
                            title="Decrease rate by ₹50/sft"
                            className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center active:scale-95 text-xs font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <button
                            onClick={() => adjustRate(pkgKey, 50)}
                            title="Increase rate by ₹50/sft"
                            className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center active:scale-95 text-xs font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-2xl font-black text-slate-400">₹</span>
                        <input
                          type="text"
                          value={rateVal}
                          onChange={(e) => handleRateInputChange(pkgKey, e.target.value)}
                          className="w-32 text-center text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-[var(--font-space)] outline-none bg-transparent border-b-2 border-transparent focus:border-[#7B2DBF] tabular-nums"
                        />
                        <span className="text-sm font-bold text-slate-400">/ sft</span>
                      </div>
                      <div className="text-center text-[10px] text-slate-400 mt-1">
                        Benchmark: ₹{pkg.defaultRate}/sft
                      </div>
                    </div>

                    {/* TOTAL CALCULATED AMOUNT */}
                    <div className="mb-6 p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">
                        Total for {numArea.toLocaleString('en-IN')} SFT:
                      </div>
                      <div className="text-2xl font-black text-[#1C1C72] tabular-nums">
                        ₹{fmt(pkgTotal)}
                      </div>
                      <div className="text-xs font-bold text-[#7B2DBF]">
                        ≈ ₹{fmtLakhs(pkgTotal)} Lakhs {pkgTotal >= 10000000 && `(₹${fmtCrores(pkgTotal)} Cr)`}
                      </div>
                    </div>

                    {/* SPECS LIST */}
                    <div className="space-y-2.5 border-t border-slate-100 pt-4 text-xs text-slate-600">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span><strong>Cement:</strong> {pkg.specs.cement}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span><strong>Steel:</strong> {pkg.specs.steel}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span><strong>Flooring:</strong> {pkg.specs.flooring}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span><strong>Sanitary:</strong> {pkg.specs.bathrooms}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span><strong>Openings:</strong> {pkg.specs.openings}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span><strong>Painting:</strong> {pkg.specs.painting}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-[#1C1C72] text-white shadow-xl shadow-[#1C1C72]/20' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {isSelected ? '✓ Selected Quality' : 'Select Tier'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── SECTION 3: APPLE STYLE RESULTS HUD HERO ─── */}
        <div className="w-full bg-gradient-to-br from-[#1C1C72] via-[#2A1B81] to-[#7B2DBF] rounded-[36px] shadow-2xl p-8 sm:p-12 text-white mb-10 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#7B2DBF]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-widest text-[#E0E7FF] border border-white/20">
                <ShieldCheck size={14} className="text-emerald-400" /> Authenticated AGNAA Quote • {activePackage.name} Quality
              </div>

              <div className="flex items-baseline gap-3">
                <h3 className="text-4xl sm:text-6xl font-black font-[var(--font-space)] tracking-tight tabular-nums">
                  ₹{fmt(totalAgnaa)}
                </h3>
              </div>

              <p className="text-white/80 text-sm sm:text-base font-medium max-w-xl leading-relaxed">
                Total Turnkey Construction for <strong className="text-white">{numArea.toLocaleString('en-IN')} SFT</strong> in <strong className="text-white">{fullLocation}</strong> calculated at <strong className="text-white font-mono">₹{currentRatePerSqft}/sft</strong>.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                <span className="text-emerald-300 font-bold bg-emerald-500/20 px-3 py-1 rounded-lg border border-emerald-500/30">
                  Save ₹{fmt(totalSavings)} ({savingPercent}%) vs market markup
                </span>
                <span className="text-white/60">Market baseline: ₹{fmt(totalMkt)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className="bg-white text-[#1C1C72] hover:bg-slate-100 active:scale-95 font-black text-sm uppercase tracking-wider px-8 py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    Download A4 Dossier
                  </>
                )}
              </button>

              <button
                onClick={() => setShowPreviewModal(true)}
                className="bg-white/15 hover:bg-white/20 border border-white/20 active:scale-95 text-white font-bold text-sm uppercase tracking-wider px-6 py-5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye size={17} />
                Preview Dossier
              </button>

              <button
                onClick={handleWhatsAppContact}
                className="bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-black text-sm uppercase tracking-wider px-6 py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Phone size={17} />
                WhatsApp
              </button>
            </div>
          </div>

          {downloadSuccess && (
            <div className="mt-6 pt-4 border-t border-white/20 flex items-center gap-2 text-xs font-bold text-emerald-300 animate-in fade-in">
              <CheckCircle2 size={16} /> Official PDF Dossier Downloaded! Check your browser downloads folder.
            </div>
          )}
        </div>

        {/* ─── SECTION 4: PHASE-WISE BUDGET DISTRIBUTION CARDS ─── */}
        <div className="w-full mb-8">
          <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#0F172A]">
              Phase-Wise Budget Distribution
            </h2>
            <span className="text-xs font-bold text-slate-400">Click a phase to filter BOQ</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoryTotals.map(cat => (
              <div 
                key={cat.category}
                onClick={() => setActiveTab(cat.category)}
                className={`p-5 rounded-3xl border-2 transition-all cursor-pointer ${
                  activeTab === cat.category 
                    ? 'bg-white border-[#7B2DBF] shadow-xl ring-4 ring-[#7B2DBF]/10 scale-[1.02]' 
                    : 'bg-white/90 border-slate-200/80 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">{cat.category}</div>
                <div className="text-2xl font-black text-[#1C1C72] font-[var(--font-space)] tabular-nums">₹{fmt(cat.sum)}</div>
                
                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full my-2.5 overflow-hidden">
                  <div className="bg-[#7B2DBF] h-full rounded-full transition-all duration-500" style={{ width: `${cat.percent}%` }} />
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-[#7B2DBF]">{cat.percent}% of total</span>
                  <span className="text-slate-400 font-medium font-mono text-[11px]">₹{Math.round(cat.sum / numArea)}/sft</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── SECTION 5: 14-TRADE MATERIAL QUANTITIES & BOQ TABLE ─── */}
        <div className="w-full bg-white rounded-[32px] shadow-xl border border-slate-200/80 overflow-hidden mb-16">
          <div className="px-8 py-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-slate-50/70">
            <div>
              <h3 className="text-xl font-black text-[#0F172A] font-[var(--font-space)]">
                Detailed Material Quantities & Work BOQ
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Accurate quantities computed for {numArea.toLocaleString('en-IN')} SQFT • Calibrated at ₹{currentRatePerSqft}/sft ({activePackage.name} Quality)
              </p>
            </div>
            
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
              {(['all', 'Civil & Structure', 'Finishing & Surfaces', 'MEP Services', 'Engineering & Management'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab ? 'bg-[#1C1C72] text-white shadow-xs' : 'text-slate-500 hover:text-black'
                  }`}
                >
                  {tab === 'all' ? 'All (14 Items)' : tab.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4">Resource / Work Head</th>
                  <th className="px-6 py-4 text-center">Estimated Quantity</th>
                  <th className="px-6 py-4 text-right">Unit Rate</th>
                  <th className="px-6 py-4 text-right">Market Est.</th>
                  <th className="px-8 py-4 text-right text-[#1C1C72] bg-[#1C1C72]/5">AGNAA Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredBreakdown.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-8 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 text-[#1C1C72]">
                        <item.icon size={15} />
                      </div>
                      <div>
                        <div className="font-bold text-[#0F172A]">{item.label}</div>
                        <div className="text-[10px] text-slate-400 font-medium">{item.category}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-700 font-bold whitespace-nowrap">
                      {fmt(item.qty)} <span className="text-slate-400 text-xs font-medium uppercase">{item.unit}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-500 font-mono text-xs tabular-nums">
                      ₹{fmt(item.unitRate)} / {item.unit}
                    </td>
                    <td className="px-6 py-4 text-right text-slate-400 font-mono text-xs tabular-nums line-through">
                      ₹{fmt(item.mktAmt)}
                    </td>
                    <td className="px-8 py-4 text-right font-black text-[#1C1C72] font-mono tabular-nums bg-[#1C1C72]/[0.02]">
                      ₹{fmt(item.agnaaAmt)}
                    </td>
                  </tr>
                ))}
                
                {/* FINAL TOTAL ROW */}
                <tr className="bg-slate-50 font-black">
                  <td className="px-8 py-5 text-base text-[#0F172A]" colSpan={2}>
                    TOTAL ESTIMATE ({activePackage.name.toUpperCase()} TIER • {numArea} SQFT)
                  </td>
                  <td className="px-6 py-5 text-right text-[#7B2DBF] font-mono text-base">
                    ₹{currentRatePerSqft}/sft
                  </td>
                  <td className="px-6 py-5 text-right text-slate-400 font-mono line-through">
                    ₹{fmt(totalMkt)}
                  </td>
                  <td className="px-8 py-5 text-right text-xl text-[#1C1C72] font-mono bg-[#1C1C72]/10">
                    ₹{fmt(totalAgnaa)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── SECTION 6: MILESTONE PAYMENT DISBURSEMENT SCHEDULE ─── */}
        <div className="w-full bg-white rounded-[32px] border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-10 mb-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-[#1C1C72]" />
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#0F172A]">
                  Stage-Wise Milestone Payment Schedule
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Disbursement linked strictly to verified site progress. Zero upfront lump-sum risk.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
              Stage-Gate Escrow Protected
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              { phase: '01', title: 'Soil & Design', pct: 10, desc: 'Architectural drawings, structural approval & soil test' },
              { phase: '02', title: 'Plinth Level', pct: 20, desc: 'Excavation, footings & plinth beam casting' },
              { phase: '03', title: 'RCC Structure', pct: 25, desc: 'Columns, beams & roof slab concrete casting' },
              { phase: '04', title: 'Brickwork & MEP', pct: 20, desc: 'Masonry, concealed plumbing & electrical piping' },
              { phase: '05', title: 'Flooring & Tiling', pct: 15, desc: 'Vitrified tiling, doors, windows & sanitary fittings' },
              { phase: '06', title: 'Handover & QA', pct: 10, desc: 'Final painting, deep cleaning & snag rectification' },
            ].map(stage => {
              const stageAmt = Math.round(totalAgnaa * (stage.pct / 100));
              return (
                <div key={stage.phase} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#7B2DBF]/50 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#7B2DBF]">Phase {stage.phase}</span>
                      <span className="text-xs font-black text-[#1C1C72]">{stage.pct}%</span>
                    </div>
                    <div className="text-sm font-extrabold text-[#0F172A] leading-tight mb-1">{stage.title}</div>
                    <div className="text-[10px] text-slate-500 leading-snug mb-3">{stage.desc}</div>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60">
                    <div className="text-xs font-black text-[#1C1C72] font-mono tabular-nums">
                      ₹{fmt(stageAmt)}
                    </div>
                    <div className="text-[9px] font-bold text-slate-400">
                      ≈ ₹{fmtLakhs(stageAmt)} L
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── SECTION 7: MATERIAL SPECIFICATIONS COMPARISON SHEET ─── */}
        <div className="w-full bg-white rounded-[32px] border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-10 mb-8 backdrop-blur-xl">
          <div className="mb-6">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#0F172A]">
              Material Specifications Matrix • {activePackage.name} Quality Tier
            </h2>
            <p className="text-xs text-slate-500">
              Contractually guaranteed brand names and technical specifications for {fullLocation}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F172A] block">Structural Cement:</strong>
                  <span className="text-slate-600">{activePackage.specs.cement}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F172A] block">Primary Steel Reinforcement:</strong>
                  <span className="text-slate-600">{activePackage.specs.steel}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F172A] block">Flooring & Tiling:</strong>
                  <span className="text-slate-600">{activePackage.specs.flooring}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F172A] block">Sanitary & CP Fittings:</strong>
                  <span className="text-slate-600">{activePackage.specs.bathrooms}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F172A] block">Doors & Windows:</strong>
                  <span className="text-slate-600">{activePackage.specs.openings}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F172A] block">Electrical & Conduits:</strong>
                  <span className="text-slate-600">{activePackage.specs.electrical}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F172A] block">Internal & External Paint:</strong>
                  <span className="text-slate-600">{activePackage.specs.painting}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F172A] block">Quality Control & Assurance:</strong>
                  <span className="text-slate-600">Daily digital site logs, cube compressive strength tests, & 10-year structural warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── SECTION 8: BOTTOM CTA ACTION BAR ─── */}
        <div className="w-full bg-slate-900 rounded-[32px] p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 mb-16 shadow-2xl">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black font-[var(--font-space)] tracking-tight mb-2">
              Ready to Turn This Estimate into Reality?
            </h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Lock in your ₹{currentRatePerSqft}/sft turnkey rate for {numArea.toLocaleString('en-IN')} SFT in {fullLocation}. Schedule a consultation with AGNAA's principal architects.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="bg-[#7B2DBF] hover:bg-[#6824a3] active:scale-95 text-white font-black text-xs uppercase tracking-widest px-7 py-4 rounded-xl flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              Download A4 Dossier
            </button>
            <button
              onClick={handleWhatsAppContact}
              className="bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-black text-xs uppercase tracking-widest px-7 py-4 rounded-xl flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <Phone size={16} />
              Book Consultation
            </button>
          </div>
        </div>

      </div>

      {/* ─── LIVE INTERACTIVE DOSSIER PREVIEW MODAL ─── */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2.5">
                <FileText size={18} className="text-[#1C1C72]" />
                <div>
                  <span className="font-extrabold text-sm text-[#1C1C72] block">A4 Architectural Estimate Dossier</span>
                  <span className="text-[10px] text-slate-400">Single-Page Official Commercial Protocol</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isGenerating}
                  className="bg-[#1C1C72] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#2A1B81] transition-all cursor-pointer"
                >
                  {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                  Download A4 PDF
                </button>
                <button 
                  onClick={() => setShowPreviewModal(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-black transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* Modal Body: High-Fidelity A4 Document Sheet */}
            <div className="p-4 sm:p-6 overflow-y-auto flex justify-center bg-slate-100">
              <div className="bg-white shadow-2xl rounded-xl overflow-hidden border border-slate-300 w-full max-w-2xl font-[var(--font-inter)] text-[#0F172A]">
                
                {/* 1. Header Banner */}
                <div className="bg-gradient-to-r from-[#1C1C72] via-[#2A1B81] to-[#7B2DBF] p-6 text-white flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <AgnaaLogo fill="#FFFFFF" width={36} height={36} />
                    <div>
                      <div className="text-base font-black tracking-tight uppercase">AGNAA DESIGN STUDIO</div>
                      <div className="text-[9px] text-white/80">Architecture • Structural Engineering • Turnkey Execution</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] font-black text-white/70 uppercase tracking-widest">ESTIMATE PROTOCOL</div>
                    <div className="text-xs font-black text-white">{dateStr}</div>
                    <div className="text-[8px] text-white/50">REF: AGNAA/EST/{numArea}SQFT/{fileDateStr}</div>
                  </div>
                </div>

                {/* 2. Scope Strip */}
                <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-4 gap-2 text-center">
                  <div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">LOCATION</span>
                    <strong className="text-[11px] text-[#1C1C72] truncate block">{fullLocation}</strong>
                  </div>
                  <div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">BUILT-UP AREA</span>
                    <strong className="text-[11px] text-[#1C1C72] block">{fmt(numArea)} SQFT</strong>
                  </div>
                  <div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">RATE / SFT</span>
                    <strong className="text-[11px] text-[#7B2DBF] block">₹{currentRatePerSqft}/sft ({activePackage.name})</strong>
                  </div>
                  <div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">VALIDITY</span>
                    <strong className="text-[11px] text-[#0F172A] block">30 DAYS</strong>
                  </div>
                </div>

                {/* 3. KPI Cards */}
                <div className="p-4 grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[8px] font-black text-slate-400 uppercase">UNIT RATE</div>
                    <div className="text-base font-black text-[#1C1C72]">₹{currentRatePerSqft} <span className="text-[10px] text-slate-400">/ SFT</span></div>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] text-white">
                    <div className="text-[8px] font-black text-white/70 uppercase">TOTAL INVESTMENT</div>
                    <div className="text-lg font-black">₹{fmt(totalAgnaa)}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="text-[8px] font-black text-emerald-700 uppercase">DIRECT SAVINGS</div>
                    <div className="text-base font-black text-emerald-700">₹{fmt(totalSavings)} ({savingPercent}%)</div>
                  </div>
                </div>

                {/* 4. Phase Pills */}
                <div className="px-4 pb-2 grid grid-cols-4 gap-2">
                  {categoryTotals.map(c => (
                    <div key={c.category} className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
                      <span className="text-[8px] font-bold text-slate-400 block">{c.category.split(' ')[0]}</span>
                      <strong className="text-[10px] text-[#1C1C72]">₹{fmt(c.sum)} ({c.percent}%)</strong>
                    </div>
                  ))}
                </div>

                {/* 5. 14-Trade BOQ Summary */}
                <div className="p-4">
                  <div className="text-[10px] font-black text-[#1C1C72] uppercase tracking-wider mb-2">Itemized Resource & BOQ Matrix</div>
                  <table className="w-full text-[10px] border-collapse">
                    <thead>
                      <tr className="bg-[#1C1C72] text-white text-left">
                        <th className="p-2">Resource / Work Head</th>
                        <th className="p-2 text-center">Qty</th>
                        <th className="p-2 text-right">Unit Rate</th>
                        <th className="p-2 text-right">Market</th>
                        <th className="p-2 text-right">AGNAA Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {breakdown.map((b, idx) => (
                        <tr key={b.id} className={`border-b border-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}>
                          <td className="p-1.5 font-bold text-slate-800">{b.label}</td>
                          <td className="p-1.5 text-center text-slate-600">{fmt(b.qty)} {b.unit}</td>
                          <td className="p-1.5 text-right text-slate-500">₹{fmt(b.unitRate)}</td>
                          <td className="p-1.5 text-right text-slate-400 line-through">₹{fmt(b.mktAmt)}</td>
                          <td className="p-1.5 text-right font-black text-[#1C1C72]">₹{fmt(b.agnaaAmt)}</td>
                        </tr>
                      ))}
                      <tr className="bg-slate-100 font-black border-t-2 border-[#1C1C72]">
                        <td className="p-2 text-[#1C1C72]" colSpan={2}>TOTAL TURNKEY CONTRACT</td>
                        <td className="p-2 text-right text-[#7B2DBF]">₹{currentRatePerSqft}/sft</td>
                        <td className="p-2 text-right text-slate-400 line-through">₹{fmt(totalMkt)}</td>
                        <td className="p-2 text-right text-sm text-[#1C1C72]">₹{fmt(totalAgnaa)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 6. Milestone Schedule in Preview */}
                <div className="px-4 pb-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-[9px] font-black text-[#1C1C72] uppercase mb-1.5">Payment Milestones (Escrow Linked):</div>
                    <div className="grid grid-cols-6 gap-1 text-[8px] text-center">
                      <div className="bg-white p-1 rounded border">P1 (10%): ₹{fmt(totalAgnaa * 0.1)}</div>
                      <div className="bg-white p-1 rounded border">P2 (20%): ₹{fmt(totalAgnaa * 0.2)}</div>
                      <div className="bg-white p-1 rounded border">P3 (25%): ₹{fmt(totalAgnaa * 0.25)}</div>
                      <div className="bg-white p-1 rounded border">P4 (20%): ₹{fmt(totalAgnaa * 0.2)}</div>
                      <div className="bg-white p-1 rounded border">P5 (15%): ₹{fmt(totalAgnaa * 0.15)}</div>
                      <div className="bg-white p-1 rounded border">P6 (10%): ₹{fmt(totalAgnaa * 0.1)}</div>
                    </div>
                  </div>
                </div>

                {/* 7. Footer */}
                <div className="p-3 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-[8px] text-slate-500">
                  <span>UDYAM-TS-09-0010399 • Financial District, Gachibowli, Hyderabad</span>
                  <strong className="text-[#1C1C72]">+91 8826214348 | www.agnaa.in</strong>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
              <span className="text-xs text-slate-500">
                100% Guaranteed 1-Page A4 PDF • 300 DPI Vector Quality
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleDownloadPDF}
                  disabled={isGenerating}
                  className="bg-[#7B2DBF] text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#6824a3] transition-all cursor-pointer shadow-md"
                >
                  {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                  Download Official PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



    </div>
  );
}

export default function EstimatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBFE]">
        <Loader2 className="w-12 h-12 text-[#1C1C72] animate-spin" />
      </div>
    }>
      <EstimateContent />
    </Suspense>
  );
}
