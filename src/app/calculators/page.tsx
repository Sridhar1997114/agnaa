"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import {
  CheckCircle, MapPin, Hammer, AlertCircle, Package, LayoutGrid, Hexagon, Waves, 
  AppWindow, Grid as GridIcon, DoorClosed, Zap, Paintbrush, Droplets, Utensils, Ruler, 
  ArrowRight, GripVertical, Download, X, Loader2, Phone, ShieldCheck
} from 'lucide-react';
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  ConfirmationResult 
} from "firebase/auth";
import { auth } from '@/lib/firebase';

// ─── AGNAA LOGO ────────────────────────────────────────────────────────────
const AgnaaLogo = ({ className = "h-8 w-auto", fill = "", width, height }: { className?: string, fill?: string, width?: number|string, height?: number|string }) => (
  <svg viewBox="0 0 4000 4000" className={className} width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    {!fill && (
      <defs>
        <linearGradient id="lg2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7B2DBF" />
          <stop offset="100%" stopColor="#1C1C72" />
        </linearGradient>
      </defs>
    )}
    <g fill={fill || "url(#lg2)"}>
      <path fillRule="evenodd" d="M104.5,3397.1 L104.5,1340.9 L703.1,1108.1 L703.1,3397.1 L503.5,3397.1 L503.5,2200 L304,2200 L304,3397.1 Z M304,2000.4 L503.5,2000.4 L503.5,1399.8 L304,1477.3 Z"/>
      <path fillRule="evenodd" d="M902.6,3197.6 L902.6,3397.1 L1501.1,3397.1 L1501.1,797.7 L902.6,1030.5 L902.6,2200 L1301.6,2200 L1301.6,3197.6 Z M1102.1,1167 L1301.6,1089.4 L1301.6,2000.4 L1102.1,2000.4 Z"/>
      <polygon fillRule="evenodd" points="1700.7,3397.1 1900.2,3397.1 1900.2,856.7 1999.9,817.8 2099.7,856.7 2099.7,3397.1 2299.2,3397.1 2299.2,720.1 1999.9,603.8 1700.7,720.1"/>
      <path fillRule="evenodd" d="M2498.9,1011.8 L2897.9,1167 L2897.9,2000.4 L2498.9,2000.4 L2498.9,3397.1 L3097.4,3397.1 L3097.4,1030.5 L2498.9,797.7 Z M2698.4,2200 L2897.9,2200 L2897.9,3197.6 L2698.4,3197.6 Z"/>
      <path fillRule="evenodd" d="M3296.9,1108.1 L3895.5,1340.9 L3895.5,3397.1 L3696,3397.1 L3696,2200 L3496.5,2200 L3496.5,3397.1 L3296.9,3397.1 Z M3496.5,1399.8 L3696,1477.3 L3696,2000.4 L3496.5,2000.4 Z"/>
    </g>
  </svg>
);

// ─── DATA ──────────────────────────────────────────────────────────────────
const MATERIALS = [
  { id: 'cement',     label: 'Cement',        unit: 'Bags',  icon: Package,      getQty: (a: number) => Math.ceil(a * 0.45),            rates: { Basic: 380,  Standard: 413,  Premium: 450  } },
  { id: 'steel',      label: 'Steel',         unit: 'KG',    icon: GripVertical, getQty: (a: number) => Math.ceil(a * 3.5),             rates: { Basic: 65,   Standard: 75,   Premium: 85   } },
  { id: 'bricks',     label: 'Bricks',        unit: 'PCS',   icon: LayoutGrid,   getQty: (a: number) => Math.ceil(a * 19),              rates: { Basic: 7,    Standard: 9,    Premium: 12   } },
  { id: 'aggregate',  label: 'Aggregate',     unit: 'Tons',  icon: Hexagon,      getQty: (a: number) => +(a * 1.9 * 0.045).toFixed(1), rates: { Basic: 900,  Standard: 1100, Premium: 1350 } },
  { id: 'sand',       label: 'Sand',          unit: 'Tons',  icon: Waves,        getQty: (a: number) => +(a * 2.0 * 0.045).toFixed(1), rates: { Basic: 1100, Standard: 1350, Premium: 1650 } },
  { id: 'flooring',   label: 'Flooring',      unit: 'Sqft',  icon: GridIcon,     getQty: (a: number) => a,                              rates: { Basic: 80,   Standard: 120,  Premium: 200  } },
  { id: 'windows',    label: 'Windows',       unit: 'Sqft',  icon: AppWindow,    getQty: (a: number) => Math.ceil(a * 0.17),            rates: { Basic: 300,  Standard: 450,  Premium: 600  } },
  { id: 'doors',      label: 'Doors',         unit: 'Sqft',  icon: DoorClosed,   getQty: (a: number) => Math.ceil(a * 0.18),            rates: { Basic: 400,  Standard: 600,  Premium: 900  } },
  { id: 'electrical', label: 'Electrical',    unit: 'Sqft',  icon: Zap,          getQty: (a: number) => a,                              rates: { Basic: 50,   Standard: 75,   Premium: 110  } },
  { id: 'painting',   label: 'Painting',      unit: 'Sqft',  icon: Paintbrush,   getQty: (a: number) => Math.ceil(a * 6),               rates: { Basic: 20,   Standard: 30,   Premium: 45   } },
  { id: 'sanitary',   label: 'Plumbing',      unit: 'Sqft',  icon: Droplets,     getQty: (a: number) => a,                              rates: { Basic: 70,   Standard: 100,  Premium: 150  } },
  { id: 'kitchen',    label: 'Kitchen',       unit: 'Sqft',  icon: Utensils,     getQty: (a: number) => Math.ceil(a * 0.055),           rates: { Basic: 950,  Standard: 1200, Premium: 1800 } },
  { id: 'contractor', label: 'Service Cost',  unit: 'Sqft',  icon: Hammer,       getQty: (a: number) => a,                              rates: { Basic: 220,  Standard: 250,  Premium: 300  } },
  { id: 'architect',  label: 'Architect Fee', unit: 'Sqft',  icon: Ruler,        getQty: (a: number) => a,                              rates: { Basic: 100,  Standard: 150,  Premium: 250  } },
];
const COLORS    = ['#1C1C72','#2A1B81','#3B1A91','#4D1AA1','#6019B1','#7B2DBF','#9335D2','#AA3CE5','#C445F8','#38B6FF','#0094FF','#0071FF','#4A4A4A','#8B5CF6'];
const LOCATIONS = ['Hyderabad', 'Bengaluru', 'Chennai', 'Mumbai', 'Delhi NCR', 'Pune', 'Kolkata'];
const QUALITIES = ['Basic', 'Standard', 'Premium'] as const;

// ─── MINI DONUT CHART ──────────────────────────────────────────────────────
const DonutChart = ({ data, total }: { data: { value: number; color: string; label: string }[]; total: number }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  if (!total) return null;
  let cum = 0;
  const slices = data.map(d => {
    const pct = d.value / total; const start = cum; cum += pct;
    return { ...d, pct, start, end: cum };
  }).filter(s => s.pct > 0.005);
  const arc = (s: number, e: number) => {
    const sx = Math.cos(2*Math.PI*s - Math.PI/2), sy = Math.sin(2*Math.PI*s - Math.PI/2);
    const ex = Math.cos(2*Math.PI*e - Math.PI/2), ey = Math.sin(2*Math.PI*e - Math.PI/2);
    return `M ${sx} ${sy} A 1 1 0 ${(e-s)>0.5?1:0} 1 ${ex} ${ey} L 0 0`;
  };
  return (
    <div className="w-full aspect-square max-w-[170px] mx-auto">
      <svg viewBox="-1.1 -1.1 2.2 2.2" className="w-full h-full">
        {slices.map((s, i) => (
          <path key={i} d={arc(s.start,s.end)} fill={s.color}
            className="transition-all duration-200 cursor-pointer stroke-white stroke-[0.03]"
            style={{ transform: hovered===s.label?'scale(1.06)':'scale(1)', transformOrigin:'0 0' }}
            onMouseEnter={()=>setHovered(s.label)} onMouseLeave={()=>setHovered(null)} />
        ))}
        <circle cx="0" cy="0" r="0.58" fill="white" />
        <text x="0" y="-0.1" textAnchor="middle" style={{ fontSize:'0.17px', fontWeight:700, fill:'#9ca3af' }}>TOTAL</text>
        <text x="0" y="0.19" textAnchor="middle" style={{ fontSize:'0.29px', fontWeight:900, fill:'#1C1C72' }}>{(total/100000).toFixed(1)}L</text>
      </svg>
    </div>
  );
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta' });

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────
export default function CalculatorsPage() {
  const [area,     setArea]     = useState<string>('2000');
  const [location, setLocation] = useState('Hyderabad');
  const [isCalculated, setIsCalculated] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [toast,    setToast]    = useState<{ msg: string; err?: boolean } | null>(null);
  const [qualities, setQualities] = useState<Record<string, string>>(
    MATERIALS.reduce((a, m) => ({ ...a, [m.id]: 'Standard' }), {})
  );

  const numArea    = parseFloat(area) || 0;
  const isSupported = location === 'Hyderabad';
  const today      = new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
  const fmt        = (n: number) => n.toLocaleString('en-IN');

  useEffect(() => {
    document.title = "AGNAA DESIGN STUDIO | Precision Calculator";
    
    // Cleanup recaptcha on unmount
    return () => {
      if ((window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier.clear();
      }
    };
  }, []);

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  // ─── AUTH LOGIC ───────────────────────────────────────────────────────────
  const setupRecaptcha = () => {
    if ((window as any).recaptchaVerifier) return;
    (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': () => console.log('Recaptcha resolved')
    });
  };

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      setToast({ msg: "Please enter a valid phone number", err: true });
      return;
    }
    setIsSendingOtp(true);
    try {
      setupRecaptcha();
      const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
      const result = await signInWithPhoneNumber(auth, formattedPhone, (window as any).recaptchaVerifier);
      setConfirmationResult(result);
      setToast({ msg: "OTP sent to your phone", err: false });
    } catch (err: any) {
      console.error(err);
      setToast({ msg: err.message || "Failed to send OTP", err: true });
      if ((window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier.clear();
        (window as any).recaptchaVerifier = null;
      }
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || !confirmationResult) return;
    setIsVerifyingOtp(true);
    try {
      await confirmationResult.confirm(otp);
      setIsVerified(true);
      setShowOtpModal(false);
      setToast({ msg: "Verification Successful!", err: false });
      
      // Post-verification: Trigger download
      setTimeout(() => executeGatedDownload(), 500);
    } catch (err: any) {
      setToast({ msg: "Invalid OTP. Please try again.", err: true });
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const executeGatedDownload = async () => {
    setLoadingPdf(true);
    try {
      await handleDownloadPdf();
      
      // WhatsApp Lead Capture
      const waMsg = `Hi AGNAA, I just downloaded my ${numArea}sqft precision estimate for Hyderabad. I'd like to discuss the next steps.`;
      const waUrl = `https://wa.me/918826214348?text=${encodeURIComponent(waMsg)}`;
      window.open(waUrl, '_blank');
    } catch (err) {
      console.error("Gated flow failed:", err);
    } finally {
      setLoadingPdf(false);
    }
  };

  const handleStartDownloadFlow = () => {
    if (isVerified) {
      executeGatedDownload();
    } else {
      setShowOtpModal(true);
    }
  };

  const breakdown = useMemo(() => MATERIALS.map((mat, i) => {
    const qty      = mat.getQty(numArea);
    const q        = qualities[mat.id] as 'Basic'|'Standard'|'Premium';
    const rate     = mat.rates[q];
    const disc     = (mat.id==='contractor'||mat.id==='architect') ? 0.10 : 0.05;
    const agnaaAmt = qty * rate * (1 - disc);
    return { ...mat, qty, quality:q, mktAmt:qty*rate, agnaaAmt, color:COLORS[i%COLORS.length] };
  }), [numArea, qualities]);

  const totalMkt   = breakdown.reduce((s,r)=>s+r.mktAmt,   0);
  const totalAgnaa = breakdown.reduce((s,r)=>s+r.agnaaAmt, 0);
  const savings    = totalMkt - totalAgnaa;
  const chartData  = breakdown.map(r=>({ value:r.agnaaAmt, color:r.color, label:r.label }));

  const handleGenerate = () => {
    if (numArea <= 0) { setToast({ msg:'Enter a valid area', err:true }); return; }
    setIsCalculated(true); setToast(null);
  };

  const handleDownloadPdf = async () => {
    if (loadingPdf) return;
    
    try {
      const html2pdf = (window as any).html2pdf;
      if (!html2pdf) {
        setToast({ msg: 'PDF Library still loading...', err: true });
        return;
      }

      const el = document.getElementById('agnaa-pdf-view-hq');
      if (!el) throw new Error('PDF container not found');

      const dateStr = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }).replace(/ /g, '-');
      const fileName = `agnaa_estimate_${numArea}sqft_hyderabad_${dateStr}.pdf`;
      
      const opt = {
        margin:       0,
        filename:     fileName,
        image:        { type: 'jpeg', quality: 1.0 },
        html2canvas:  { 
          scale: 3, 
          useCORS: true, 
          letterRendering: true,
          windowWidth: 794
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      await html2pdf().set(opt).from(el).save();
      setToast({ msg: 'Precision Estimate Downloaded!', err: false });
    } catch(err) {
      console.error('PDF Generation Error:', err);
      setToast({ msg: 'PDF Export Failed', err: true });
    }
  };

  if (showPreview) {
    return (
      <div className={`min-h-screen bg-[#0F172A] overflow-y-auto py-10 ${inter.variable} ${plusJakarta.variable}`}>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" strategy="afterInteractive" />
        <div className="fixed top-4 right-4 z-[9999] flex gap-3">
          <button onClick={() => setShowPreview(false)} className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-md transition-all">
            <X size={20} />
          </button>
          <button onClick={handleDownloadPdf} disabled={loadingPdf} className="flex items-center gap-2 bg-[#7B2DBF] hover:bg-[#5B21A0] text-white font-bold rounded-full px-6 py-3 shadow-lg transition-all">
            {loadingPdf ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            Export PDF Now
          </button>
        </div>

        {/* ─── HIDDEN A4 PDF EXPORT — 794×1123px (A4 @ 96dpi) ─── */}
        <div style={{ position:'fixed', top:0, left:'50%', transform:'translateX(-50%)', zIndex:-100, opacity:0, pointerEvents:'none', overflow:'hidden', width:'794px', height:'1123px' }}>
          <div id="agnaa-pdf-view-hq" style={{ width:'794px', height:'1123px', background:'#fff', position:'relative', fontFamily:'Inter,sans-serif', color:'#0F172A', display:'flex', flexDirection:'column', overflow:'hidden' }}>

            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:420, opacity:0.03, zIndex:0, pointerEvents:'none' }}>
              <AgnaaLogo fill="#1C1C72" />
            </div>

            {/* 1. HEADER — 70px */}
            <div style={{ background:'linear-gradient(135deg,#1C1C72 0%,#7B2DBF 100%)', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 48px', height:'70px', flexShrink:0, zIndex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <AgnaaLogo fill="#FFFFFF" width={32} height={32} />
                <div style={{ width:1, height:30, background:'rgba(255,255,255,0.2)', margin:'0 6px' }} />
                <div>
                  <div style={{ fontSize:16, fontWeight:900, color:'#fff', letterSpacing:'-0.02em', textTransform:'uppercase', lineHeight:1.1 }}>AGNAA DESIGN STUDIO</div>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,0.6)', fontStyle:'italic' }}>Design. Build. Soul.</div>
                </div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:9, fontWeight:900, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.2em', marginBottom:2 }}>Precision Construction Estimate</div>
                <div style={{ fontSize:14, fontWeight:700, color:'#fff' }}>{today}</div>
              </div>
            </div>

            {/* 2. SCOPE BAR — 52px */}
            <div style={{ background:'#fff', borderBottom:'1px solid #E5E7EB', display:'flex', flexShrink:0, height:'52px', zIndex:1 }}>
              {([['Built-up Area', `${fmt(numArea)} SQFT`], ['Location', location], ['Standard', 'A-GRADE PRECISION']] as [string,string][]).map(([label, val], i) => (
                <div key={i} style={{ flex:1, borderRight: i<2 ? '1px solid #E5E7EB' : 'none', display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 24px' }}>
                  <div style={{ fontSize:8, fontWeight:900, color:'#94A3B8', textTransform:'uppercase', letterSpacing:'0.15em', marginBottom:1 }}>{label}</div>
                  <div style={{ fontSize:13, fontWeight:800, color: i===2 ? '#7B2DBF' : '#0F172A' }}>{val}</div>
                </div>
              ))}
            </div>

            {/* 3. KPI CARDS — 68px */}
            <div style={{ display:'flex', gap:10, padding:'8px 40px', flexShrink:0, height:'68px', alignItems:'center' }}>
              {[
                { label:'Market Total', value:`₹${fmt(totalMkt)}`, bg:'#F8F8FC', border:'1px solid rgba(28,28,114,0.15)', color:'#0F172A', labelColor:'#64748B' },
                { label:'Agnaa Intelligent', value:`₹${fmt(totalAgnaa)}`, bg:'linear-gradient(135deg,#7B2DBF,#1C1C72)', border:'none', color:'#fff', labelColor:'rgba(255,255,255,0.6)' },
                { label:'Total Savings', value:`₹${fmt(savings)}`, bg:'#F0FDF4', border:'1px solid #BBF7D0', color:'#15803D', labelColor:'#16A34A' },
              ].map((card, i) => (
                <div key={i} style={{ flex:1, height:52, background:card.bg, border:card.border, borderRadius:10, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 16px' }}>
                  <div style={{ fontSize:8, fontWeight:900, color:card.labelColor, textTransform:'uppercase', letterSpacing:'0.15em' }}>{card.label}</div>
                  <div style={{ fontSize:18, fontWeight:700, color:card.color, fontVariantNumeric:'tabular-nums' }}>{card.value}</div>
                </div>
              ))}
            </div>

            {/* 4. TABLE — fills remaining space */}
            <div style={{ flex:1, overflow:'hidden', minHeight:0, display:'flex', flexDirection:'column' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', tableLayout:'fixed' }}>
                <thead>
                  <tr style={{ background:'#0F172A' }}>
                    <th style={{ padding:'6px 18px', fontSize:9, color:'#fff', textTransform:'uppercase', fontWeight:900, letterSpacing:'0.15em', textAlign:'left', width:'34%' }}>Construction Resource</th>
                    <th style={{ padding:'6px 18px', fontSize:9, color:'rgba(255,255,255,0.7)', textTransform:'uppercase', fontWeight:900, letterSpacing:'0.15em', textAlign:'center', width:'22%' }}>Quantity</th>
                    <th style={{ padding:'6px 18px', fontSize:9, color:'rgba(255,255,255,0.7)', textTransform:'uppercase', fontWeight:900, letterSpacing:'0.15em', textAlign:'center', width:'18%' }}>Quality</th>
                    <th style={{ padding:'6px 18px', fontSize:9, color:'#fff', textTransform:'uppercase', fontWeight:900, letterSpacing:'0.15em', textAlign:'right', width:'26%' }}>Agnaa Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {breakdown.map((item: any, idx: number) => (
                    <tr key={item.id} style={{ background: idx % 2 === 0 ? '#fff' : '#F8FAFC', borderBottom:'1px solid #F1F5F9' }}>
                      <td style={{ padding:'4px 18px' }}><span style={{ fontSize:11, fontWeight:800, color:'#0F172A', textTransform:'uppercase' }}>{item.label}</span></td>
                      <td style={{ padding:'4px 18px', textAlign:'center' }}>
                        <span style={{ fontSize:12, fontWeight:900, color:'#0F172A', fontVariantNumeric:'tabular-nums' }}>{fmt(item.qty)}</span>
                        <span style={{ fontSize:8, color:'#94A3B8', fontWeight:700, marginLeft:4, textTransform:'uppercase' }}>{item.unit}</span>
                      </td>
                      <td style={{ padding:'4px 18px', textAlign:'center' }}>
                        <span style={{ fontSize:8, fontWeight:900, color:'#7B2DBF', background:'rgba(123,45,191,0.06)', padding:'2px 8px', borderRadius:6, textTransform:'uppercase', letterSpacing:'0.1em' }}>{item.quality}</span>
                      </td>
                      <td style={{ padding:'4px 18px', textAlign:'right' }}>
                        <span style={{ fontSize:12, fontWeight:900, color:'#7B2DBF', fontVariantNumeric:'tabular-nums' }}>₹{fmt(item.agnaaAmt)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 5. SAVINGS BADGE — 52px */}
            <div style={{ background:'linear-gradient(90deg,#0F172A,#1E293B)', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 40px', height:'52px', flexShrink:0 }}>
              <div>
                <div style={{ fontSize:10, fontWeight:900, color:'#fff', textTransform:'uppercase', letterSpacing:'0.25em' }}>AGNAA INTELLIGENT COST</div>
                <div style={{ fontSize:8, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.1em' }}>Save {((savings/totalMkt)*100).toFixed(1)}% vs market — Hyderabad</div>
              </div>
              <div style={{ fontSize:26, fontWeight:900, color:'#fff', fontVariantNumeric:'tabular-nums' }}>₹{fmt(totalAgnaa)}</div>
            </div>

            {/* 6. FOOTER — 40px */}
            <div style={{ borderTop:'1px solid #E5E7EB', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 40px', height:'40px', flexShrink:0, background:'#fff' }}>
              <div style={{ fontSize:8, color:'#94A3B8', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>© 2026 AGNAA DESIGN STUDIO PRIVATE LIMITED • A-GRADE CONSTRUCTION</div>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <span style={{ fontSize:9, fontWeight:900, color:'#7B2DBF' }}>+91 8826214348</span>
                <span style={{ fontSize:9, color:'#CBD5E1' }}>|</span>
                <span style={{ fontSize:9, fontWeight:900, color:'#0F172A' }}>WWW.AGNAA.IN</span>
                <span style={{ fontSize:7, background:'#FEF2F2', color:'#DC2626', fontWeight:900, padding:'2px 6px', borderRadius:4, textTransform:'uppercase', letterSpacing:'0.1em' }}>VALID 30 DAYS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── SCREEN UI ───
  return (
    <div className={`antialiased bg-white text-[#0F172A] min-h-screen relative ${inter.variable} ${plusJakarta.variable}`}>
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3.5 flex items-center justify-between shadow-sm">
        <AgnaaLogo className="h-7 w-auto" />
        <span className="text-[10px] font-black uppercase tracking-widest text-[#7B2DBF]">Precision Calculator</span>
      </div>

      <div className="px-4 pt-5 pb-3 max-w-2xl mx-auto">
        <div className="bg-[#F5F5F7] rounded-2xl border border-gray-200 p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
          <div className="flex-1">
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Built-up Area (Sqft)</label>
            <input type="number" value={area}
              onChange={e=>{setArea(e.target.value);setIsCalculated(false);}}
              className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors"
              placeholder="e.g. 2000" />
          </div>
          <div className="flex-1">
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Location</label>
            <select value={location} onChange={e=>{setLocation(e.target.value);setIsCalculated(false);}}
              className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors appearance-none cursor-pointer">
              {LOCATIONS.map(l=><option key={l}>{l}</option>)}
            </select>
          </div>
          <button onClick={handleGenerate}
            className="flex items-center justify-center gap-2 bg-[#1C1C72] hover:bg-[#7B2DBF] text-white font-black rounded-xl px-6 py-2.5 transition-all duration-300 text-sm shadow-lg active:scale-95">
            Generate <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {isCalculated && (
        <div className="px-4 pb-10 max-w-2xl mx-auto">
          {isSupported ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                <div className="bg-[#F5F5F7] rounded-xl p-3 border border-gray-100">
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Market Total</p>
                  <p className="text-sm font-black text-[#1C1C72] font-[var(--font-space)]">₹{fmt(totalMkt)}</p>
                </div>
                <div className="bg-[#1C1C72] rounded-xl p-3 border border-[#7B2DBF]">
                  <p className="text-[9px] font-black uppercase tracking-widest text-indigo-300 mb-0.5">Agnaa Total</p>
                  <p className="text-sm font-black text-white font-[var(--font-space)]">₹{fmt(totalAgnaa)}</p>
                </div>
                <div className="bg-[#7B2DBF] rounded-xl p-3 border border-purple-400 sm:col-span-2 shadow-[0_4px_20px_rgba(123,45,191,0.2)]">
                  <p className="text-[9px] font-black uppercase tracking-widest text-purple-200 mb-0.5">You Save</p>
                  <p className="text-sm font-black text-white font-[var(--font-space)]">₹{fmt(savings)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="bg-[#F5F5F7] rounded-2xl border border-gray-200 p-4 flex flex-col items-center justify-center">
                  <DonutChart data={chartData} total={totalAgnaa} />
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-2">Cost Breakdown</p>
                </div>
                <div className="bg-gradient-to-br from-[#1C1C72] to-[#2D1B69] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden min-h-[160px]">
                  <div className="absolute -right-6 -bottom-6 opacity-[0.06] scale-[2.2]"><AgnaaLogo fill="#fff"/></div>
                  <div className="relative z-10">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-300 mb-1">Agnaa Intelligent Design</p>
                    <p className="text-3xl font-bold text-white tracking-tight mb-3 font-[var(--font-space)]">₹{fmt(totalAgnaa)}</p>
                  </div>
                  <div className="relative z-10 inline-flex items-center gap-1.5 bg-white text-[#7B2DBF] rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider w-fit shadow">
                    <CheckCircle size={12}/> Save ₹{fmt(savings)} with Agnaa
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm mb-5">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse" style={{ minWidth:'540px' }}>
                    <thead>
                      <tr className="bg-[#F5F5F7] border-b border-gray-200 text-[9px] uppercase tracking-[0.15em] text-gray-400 font-[var(--font-inter)]">
                        <th className="px-3 py-3 font-semibold">Resource</th>
                        <th className="px-3 py-3 font-semibold">Qty</th>
                        <th className="px-3 py-3 font-semibold text-center">Quality</th>
                        <th className="px-3 py-3 font-semibold text-right">Market ₹</th>
                        <th className="px-3 py-3 font-semibold text-right text-[#7B2DBF]">Savings ₹</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {breakdown.map((item: any)=>(
                        <tr key={item.id} className="hover:bg-[#F5F5F7]/40 transition-colors text-[11px] group">
                          <td className="px-3 py-2.5 font-bold text-[#1C1C72] font-[var(--font-space)] text-[13px]">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full flex-shrink-0 bg-[#1C1C72] opacity-60 group-hover:opacity-100 transition-opacity"/>
                              {item.label}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-[#1C1C72] font-semibold whitespace-nowrap">
                            {fmt(item.qty)} <span className="text-[9px] text-gray-400 font-normal">{item.unit}</span>
                          </td>
                          <td className="px-3 py-2.5">
                            <div className="flex flex-col gap-1.5 items-center px-1 w-32 mx-auto">
                              <div className="flex justify-between w-full text-[8px] font-black uppercase leading-none">
                                <span className={`cursor-pointer transition-colors ${item.quality === 'Basic' ? 'text-[#1C1C72]' : 'text-gray-400 hover:text-gray-600'}`} onClick={() => setQualities(p => ({ ...p, [item.id]: 'Basic' }))}>Basic</span>
                                <span className={`cursor-pointer transition-colors ${item.quality === 'Standard' ? 'text-[#1C1C72]' : 'text-gray-400 hover:text-gray-600'}`} onClick={() => setQualities(p => ({ ...p, [item.id]: 'Standard' }))}>Std</span>
                                <span className={`cursor-pointer transition-colors ${item.quality === 'Premium' ? 'text-[#1C1C72]' : 'text-gray-400 hover:text-gray-600'}`} onClick={() => setQualities(p => ({ ...p, [item.id]: 'Premium' }))}>Prem</span>
                              </div>
                              <input 
                                type="range" 
                                min="0" max="2" step="1" 
                                value={QUALITIES.indexOf(item.quality)}
                                onChange={(e) => setQualities(p => ({ ...p, [item.id]: QUALITIES[parseInt(e.target.value)] }))}
                                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1C1C72]"
                                style={{ accentColor: '#1C1C72' }}
                              />
                            </div>
                          </td>
                          <td className="px-3 py-2.5 text-right font-bold text-[#1C1C72] whitespace-nowrap font-[var(--font-space)] text-[13px]">₹{fmt(item.mktAmt)}</td>
                          <td className="px-3 py-2.5 text-right font-bold text-[#7B2DBF] whitespace-nowrap font-[var(--font-space)] text-[13px]">+₹{fmt(item.mktAmt-item.agnaaAmt)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={3} className="px-4 py-3 font-bold text-[11px] uppercase tracking-wider bg-[#1C1C72] text-white font-[var(--font-space)]">Grand Total</td>
                        <td className="px-3 py-3 text-right font-bold bg-[#1C1C72] text-white whitespace-nowrap font-[var(--font-space)] text-[14px]">₹{fmt(totalMkt)}</td>
                        <td className="px-3 py-3 text-right font-bold bg-[#1C1C72] text-[#C445F8] whitespace-nowrap font-[var(--font-space)] text-[14px]">+₹{fmt(savings)}</td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="px-4 py-3 font-bold text-[11px] uppercase tracking-widest bg-gradient-to-r from-[#7B2DBF] to-[#1C1C72] text-white font-[var(--font-space)]">Agnaa Intelligent Cost</td>
                        <td colSpan={2} className="px-3 py-3 text-right font-bold text-lg bg-[#1C1C72] text-white whitespace-nowrap font-[var(--font-space)]">₹{fmt(totalAgnaa)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={handleStartDownloadFlow}
                  disabled={loadingPdf}
                  className="flex items-center gap-2.5 bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] text-white font-black rounded-full px-10 py-3.5 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(123,45,191,0.5)] hover:-translate-y-0.5 active:scale-95 text-sm disabled:opacity-50"
                >
                  {loadingPdf ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Generating Estimate...
                    </>
                  ) : (
                    <>
                      <Download size={17}/> Download Precision PDF
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="bg-[#F5F5F7] p-10 rounded-2xl text-center border border-gray-200 mt-4">
              <MapPin size={32} className="text-[#7B2DBF] mx-auto mb-3 opacity-40"/>
              <h3 className="text-lg font-black text-[#1C1C72] mb-2 font-[var(--font-space)]">Coming Soon to {location}</h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">Agnaa is expanding its vendor network to your city.</p>
            </div>
          )}
        </div>
      )}

      {/* ─── OTP MODAL ─── */}
      {showOtpModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0F172A]/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl border border-white/20 relative">
            <button 
              onClick={() => setShowOtpModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="bg-gradient-to-br from-[#1C1C72] to-[#7B2DBF] p-8 text-center">
              <div className="bg-white/10 w-16 h-16 rounded-2xl backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-4">
                <Phone size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Identity Check</h3>
              <p className="text-indigo-200 text-sm mt-1">Authenticate to unlock your Precision PDF</p>
            </div>

            <div className="p-8">
              {!confirmationResult ? (
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">Mobile Number</label>
                    <div className="relative">
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="9XXXXXXXXX"
                        className="w-full bg-[#F8F9FA] rounded-2xl px-6 py-4 text-lg font-bold text-[#1C1C72] outline-none border-2 border-transparent focus:border-[#7B2DBF] transition-all"
                      />
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300">+91</div>
                    </div>
                  </div>
                  <button 
                    onClick={handleSendOtp}
                    disabled={isSendingOtp || !phone}
                    className="w-full bg-[#1C1C72] text-white font-black rounded-2xl py-4 flex items-center justify-center gap-3 shadow-lg hover:shadow-[#1C1C72]/30 transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSendingOtp ? <Loader2 className="animate-spin" size={20} /> : "Send Quick OTP"}
                    <ArrowRight size={20} />
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">Verification Code</label>
                    <input 
                      type="text" 
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      placeholder="ENTER 6-DIGIT OTP"
                      maxLength={6}
                      className="w-full bg-[#F8F9FA] rounded-2xl px-6 py-4 text-center text-2xl font-black text-[#1C1C72] tracking-[0.5em] outline-none border-2 border-[#7B2DBF]/20 focus:border-[#7B2DBF] transition-all"
                    />
                  </div>
                  <button 
                    onClick={handleVerifyOtp}
                    disabled={isVerifyingOtp || otp.length < 6}
                    className="w-full bg-[#7B2DBF] text-white font-black rounded-2xl py-4 flex items-center justify-center gap-3 shadow-lg hover:shadow-[#7B2DBF]/30 transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {isVerifyingOtp ? <Loader2 className="animate-spin" size={20} /> : <ShieldCheck size={20} />}
                    Verify & Download
                  </button>
                  <button 
                    onClick={() => setConfirmationResult(null)}
                    className="w-full text-center text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-[#1C1C72] transition-colors"
                  >
                    Change Phone Number
                  </button>
                </div>
              )}
              
              <div id="recaptcha-container" className="mt-4 flex justify-center"></div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3 justify-center text-gray-400">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure Firebase Auth</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-5 right-5 z-50">
          <div className={`px-5 py-3 rounded-xl border shadow-lg text-white flex items-center gap-2 text-sm font-bold ${toast.err?'bg-red-600 border-red-500':'bg-[#1C1C72] border-[#7B2DBF]'}`}>
            {toast.err ? <AlertCircle size={16}/> : <CheckCircle size={16}/>}
            {toast.msg}
          </div>
        </div>
      )}
    </div>
  );
}
