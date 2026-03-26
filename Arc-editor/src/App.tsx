import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { Download, Camera, Share, Navigation, Mail, MessageCircle, ChevronUp, ChevronDown } from 'lucide-react';

const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

const AgnaaIcon = () => (
  <svg viewBox="0 0 4000 4000" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lgArc" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7B2DBF" />
        <stop offset="100%" stopColor="#1C1C72" />
      </linearGradient>
    </defs>
    <g fill="url(#lgArc)">
      <path fillRule="evenodd" d="M104.5,3397.1 L104.5,1340.9 L703.1,1108.1 L703.1,3397.1 L503.5,3397.1 L503.5,2200 L304,2200 L304,3397.1 Z M304,2000.4 L503.5,2000.4 L503.5,1399.8 L304,1477.3 Z"/>
      <path fillRule="evenodd" d="M902.6,3197.6 L902.6,3397.1 L1501.1,3397.1 L1501.1,797.7 L902.6,1030.5 L902.6,2200 L1301.6,2200 L1301.6,3197.6 Z M1102.1,1167 L1301.6,1089.4 L1301.6,2000.4 L1102.1,2000.4 Z"/>
      <polygon fillRule="evenodd" points="1700.7,3397.1 1900.2,3397.1 1900.2,856.7 1999.9,817.8 2099.7,856.7 2099.7,3397.1 2299.2,3397.1 2299.2,720.1 1999.9,603.8 1700.7,720.1"/>
      <path fillRule="evenodd" d="M2498.9,1011.8 L2897.9,1167 L2897.9,2000.4 L2498.9,2000.4 L2498.9,3397.1 L3097.4,3397.1 L3097.4,1030.5 L2498.9,797.7 Z M2698.4,2200 L2897.9,2200 L2897.9,3197.6 L2698.4,3197.6 Z"/>
      <path fillRule="evenodd" d="M3296.9,1108.1 L3895.5,1340.9 L3895.5,3397.1 L3696,3397.1 L3696,2200 L3496.5,2200 L3496.5,3397.1 L3296.9,3397.1 Z M3496.5,1399.8 L3696,1477.3 L3696,2000.4 L3496.5,2000.4 Z"/>
    </g>
  </svg>
);

const Toast = ({ message, visible }: { message: string, visible: boolean }) => (
  <div style={{
    position: 'fixed', bottom: 40, left: '50%', transform: `translate(-50%, ${visible ? '0' : '20px'})`,
    opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none',
    transition: 'all 0.3s ease', zIndex: 9999, background: 'var(--bg-card)',
    border: '1px solid var(--border-glow)', padding: '12px 24px', borderRadius: 8,
    fontFamily: 'Inter', fontSize: 13, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 8,
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
  }}>
    <span style={{ color: '#4ADE80' }}>✓</span> {message}
  </div>
);

const MobileBlock = () => (
  <div style={{ backgroundColor: '#0D0D14', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
    <div style={{ width: 48, height: 48, marginBottom: 24 }}><AgnaaIcon /></div>
    <h1 style={{ fontSize: 24, color: '#FFFFFF', marginBottom: 16 }}>Arc works best on desktop.</h1>
    <p style={{ fontFamily: 'Inter', fontSize: 15, color: '#8888AA', maxWidth: 320, marginBottom: 32 }}>
      Open this link on a laptop or desktop for the full 3D experience.
    </p>
    <a href="https://agnaa.in/portfolio" style={{ background: 'var(--brand-gradient)', color: '#FFFFFF', fontFamily: 'Space Grotesk', fontSize: 14, padding: '14px 32px', borderRadius: 8, textDecoration: 'none' }}>
      View Agnaa Portfolio &rarr;
    </a>
  </div>
);

const LoadingScreen = () => (
  <div style={{ backgroundColor: '#0D0D14', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: 56, height: 56, animation: 'pulse 1.5s ease-in-out infinite' }}><AgnaaIcon /></div>
    <div style={{ width: 200, height: 3, background: '#14141F', marginTop: 24, borderRadius: 2, overflow: 'hidden' }}>
      <div style={{ height: '100%', background: 'var(--brand-gradient)', width: '100%', animation: 'load 2s ease-out forwards' }} />
    </div>
    <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#8888AA', marginTop: 16 }}>Loading Arc...</p>
    <style>{`
      @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.7; } }
      @keyframes load { 0% { width: 0%; } 100% { width: 100%; } }
    `}</style>
  </div>
);

const SplashScreen = ({ onLoadScene }: { onLoadScene: (target: string) => void }) => (
  <div style={{ backgroundColor: '#0D0D14', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
    <svg style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }}>
       <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
         <path d="M 40 0 L 0 40 M 0 0 L 40 40" fill="none" stroke="#7B2DBF" strokeWidth="1" />
       </pattern>
       <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
    <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ height: 72, width: 200, marginBottom: 24, display:'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/logo-full-light.svg" style={{ height: '100%' }} alt="Agnaa" />
      </div>
      <h1 style={{ fontSize: 56, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: 8, margin: 0 }}>Arc</h1>
      <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#8888AA', marginBottom: 8 }}>by Agnaa Design Studio</p>
      <p style={{ fontFamily: 'Inter', fontSize: 15, color: '#8888AA', fontStyle: 'italic', marginBottom: 40 }}>"Where Every Line Has Purpose."</p>
      <div style={{ display: 'flex', gap: 24, marginBottom: 60 }}>
        <button onClick={() => onLoadScene('blank')} style={{ background: 'var(--brand-gradient)', color: '#FFFFFF', fontSize: 14, padding: '14px 32px', borderRadius: 8 }}>
          + New Project
        </button>
        <button onClick={() => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '.json';
          input.click();
        }} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glow)', color: '#FFFFFF', fontSize: 14, padding: '14px 32px', borderRadius: 8 }}>
          ⤴ Load Scene
        </button>
      </div>
      <p style={{ fontFamily: 'Inter', fontSize: 12, color: '#8888AA' }}>Agnaa Design Studio · Hyderabad · agnaa.in</p>
    </div>
  </div>
);

const Header = ({ onShare }: { onShare: () => void }) => {
  return (
    <header style={{ height: 52, background: 'var(--bg-darkest)', borderBottom: '1px solid rgba(123,45,191,0.2)', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 32, height: 32 }}><img src="/logo-icon.svg" style={{ width: '100%', height: '100%' }} alt="Logo" /></div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: '#FFFFFF' }}>Arc</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>by Agnaa</span>
          <span style={{ color: 'var(--text-muted)' }}>·</span>
          <span style={{ color: 'var(--accent-violet)', fontWeight: 600 }}>3D</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <a href="https://agnaa.in" style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--text-muted)' }}>&larr; agnaa.in</a>
        <button onClick={onShare} style={{ fontFamily: 'Inter', fontSize: 13, border: '1px solid var(--border-glow)', background: 'var(--bg-card)', color: '#FFFFFF', borderRadius: 6, padding: '6px 12px' }}>
          Share &nearr;
        </button>
        <a href="https://agnaa.in/#contact" style={{ fontFamily: 'Space Grotesk', fontSize: 13, background: 'var(--brand-gradient)', color: '#FFFFFF', borderRadius: 8, padding: '8px 20px' }}>
          Start a Project &rarr;
        </a>
      </div>
    </header>
  );
};

const WhatsAppFloat = () => (
  <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{
    position: 'fixed', bottom: 24, right: 24, width: 48, height: 48, borderRadius: '50%',
    background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 16px rgba(37,211,102,0.4)', zIndex: 100, color: 'white', animation: 'wa-pulse 2s infinite'
  }}>
    <MessageCircle size={24} />
    <style>{`
      @keyframes wa-pulse { 0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.6); } 70% { box-shadow: 0 0 0 10px rgba(37,211,102,0); } 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); } }
    `}</style>
  </a>
);

const ProjectInfo = ({ sceneId }: { sceneId: string }) => {
  const [info, setInfo] = useState<any>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    fetch('/scenes/index.json').then(r => r.json()).then(data => {
      if (data[sceneId]) setInfo(data[sceneId]);
    }).catch(e => console.warn('Could not load scene metadata', e));
  }, [sceneId]);

  if (!info) return null;

  return (
    <div style={{
      position: 'fixed', top: 64, right: 16, width: 240, background: 'var(--bg-card)',
      border: '1px solid var(--border-glow)', borderRadius: 8, padding: 16, zIndex: 50,
      fontFamily: 'Space Grotesk'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setCollapsed(!collapsed)}>
        <h3 style={{ fontSize: 14, color: '#FFFFFF', margin: 0, textTransform: 'uppercase' }}>📐 {info.name}</h3>
        {collapsed ? <ChevronDown size={16} color="#8888AA" /> : <ChevronUp size={16} color="#8888AA" />}
      </div>
      {!collapsed && (
        <div style={{ marginTop: 12, fontFamily: 'Inter' }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 4px 0' }}>{info.location} · {info.year}</p>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 16px 0' }}>Architect: {info.architect}</p>
          <a href={info.portfolioUrl} target="_blank" rel="noreferrer" style={{
            fontSize: 12, color: 'var(--accent-violet)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4
          }}>
            View on agnaa.in <Navigation size={12} />
          </a>
        </div>
      )}
    </div>
  );
};

const ExportPanel = ({ sceneData, onShare }: { sceneData: any, onShare: () => void }) => {
  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(sceneData || { name: 'Empty Scene' })], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Arc-project.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const screenshot = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'Arc-screenshot.png';
      a.click();
    }
  };

  return (
    <div className="export-panel" style={{
      position: 'absolute', top: 16, left: 16, background: 'var(--bg-card)',
      border: '1px solid var(--border-glow)', borderRadius: 8, padding: 12, width: 200, zIndex: 50,
      fontFamily: 'Inter', fontSize: 14, color: '#FFFFFF'
    }}>
      <div style={{ fontFamily: 'Space Grotesk', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>EXPORT PROJECT</div>
      <button onClick={downloadJson} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 4px', width: '100%', textAlign: 'left', color: 'inherit', background: 'none' }}>
        <Download size={14} /> Download Scene (.json)
      </button>
      <button onClick={screenshot} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 4px', width: '100%', textAlign: 'left', color: 'inherit', background: 'none' }}>
        <Camera size={14} /> Screenshot (PNG)
      </button>
      <button onClick={onShare} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 4px', width: '100%', textAlign: 'left', color: 'inherit', background: 'none' }}>
        <Share size={14} /> Copy Share Link
      </button>
      <button onClick={() => window.open('mailto:?subject=My Agnaa Project&body=View in 3D: ' + encodeURIComponent(window.location.href))} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 4px', width: '100%', textAlign: 'left', color: 'inherit', background: 'none' }}>
        <Mail size={14} /> Email to Client
      </button>
      <button onClick={() => window.open('https://wa.me/?text=' + encodeURIComponent('View my Agnaa project in 3D: ' + window.location.href))} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 4px', width: '100%', textAlign: 'left', color: 'inherit', background: 'none' }}>
        <MessageCircle size={14} /> Share on WhatsApp
      </button>
      <style>{`
        .export-panel button:hover { background: rgba(123,45,191,0.1) !important; border-radius: 4px; }
      `}</style>
    </div>
  );
};

export default function App() {
  const [sceneData, setSceneData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleShare = () => {
    const base64 = btoa(JSON.stringify(sceneData || { empty: true }));
    const url = \`\${window.location.protocol}//\${window.location.host}?data=\${base64}\`;
    navigator.clipboard.writeText(url);
    showToast("Link copied! Share with your client.");
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sceneName = params.get('scene');
    const data = params.get('data');
    
    setTimeout(() => {
      setLoading(false);
      if (sceneName) {
        setSceneData({ id: sceneName, name: sceneName });
      } else if (data) {
        try {
          setSceneData(JSON.parse(atob(data)));
        } catch {
          setSceneData({ broken: true });
        }
      }
    }, 1500);
  }, []);

  if (isMobile) return <MobileBlock />;

  if (loading) return <LoadingScreen />;

  if (!sceneData) return <SplashScreen onLoadScene={(d) => setSceneData({ id: d, name: d })} />;

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onShare={handleShare} />
      <div style={{ flex: 1, position: 'relative', background: '#0A0A12' }}>
         <ExportPanel sceneData={sceneData} onShare={handleShare} />
         {sceneData?.id && <ProjectInfo sceneId={sceneData.id} />}
         <WhatsAppFloat />
         <Toast message={toastMsg} visible={!!toastMsg} />
         
         <Canvas frameloop="demand" camera={{ position: [5, 5, 5] }} gl={{ powerPreference: 'high-performance', preserveDrawingBuffer: true }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <OrbitControls makeDefault />
            <group position={[0, -0.5, 0]}>
              <Box args={[4, 0.2, 4]} receiveShadow>
                 <meshStandardMaterial color="#14141F" />
              </Box>
              <Box args={[1, 1, 1]} position={[0, 0.6, 0]} castShadow>
                 <meshStandardMaterial color="#7B2DBF" />
              </Box>
            </group>
         </Canvas>
      </div>
    </div>
  );
}
