import React, { useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, Cone } from '@react-three/drei';
import {
  Download, Camera, Share, Mail, MessageCircle,
  ChevronUp, ChevronDown, RotateCw, Trash2,
  Eye, EyeOff, Lock, Unlock, Copy
} from 'lucide-react';

/* ───────────── Constants ───────────── */
const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

const BLOCK_TYPES = [
  { id: 'wall',    label: '🧱 Wall',    icon: '🧱', shape: 'box',      defaultSize: [0.3, 2, 2],    color: '#FFFFFF' },
  { id: 'floor',   label: '🟫 Floor',   icon: '🟫', shape: 'box',      defaultSize: [4, 0.2, 4],    color: '#F5F5F5' },
  { id: 'roof',    label: '🔺 Roof',    icon: '🔺', shape: 'cone',     defaultSize: [2.5, 1.5, 4],  color: '#EEEEEE' },
  { id: 'pillar',  label: '🏛️ Pillar',  icon: '🏛️', shape: 'cylinder', defaultSize: [0.2, 2, 0.2],  color: '#FAFAFA' },
  { id: 'window',  label: '🪟 Window',  icon: '🪟', shape: 'box',      defaultSize: [0.05, 0.8, 0.6], color: '#D4EAFF' },
  { id: 'door',    label: '🚪 Door',    icon: '🚪', shape: 'box',      defaultSize: [0.05, 1.5, 0.8], color: '#E8D5B7' },
  { id: 'block',   label: '📦 Block',   icon: '📦', shape: 'box',      defaultSize: [1, 1, 1],      color: '#FFFFFF' },
  { id: 'stair',   label: '🪜 Stairs',  icon: '🪜', shape: 'box',      defaultSize: [1, 0.3, 0.5],  color: '#F0F0F0' },
];

const COLOR_PALETTE = [
  '#FFFFFF', '#F5F5F5', '#EEEEEE', '#D4EAFF',
  '#E8D5B7', '#FFE4E1', '#E8F5E9', '#FFF9C4',
  '#F3E5F5', '#E1F5FE', '#FCE4EC', '#F1F8E9',
];

type BuildingBlock = {
  id: string;
  type: string;
  shape: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  rotation: [number, number, number];
  visible: boolean;
  locked: boolean;
};

/* ───────────── Brand SVG ───────────── */
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

/* ───────────── Toast ───────────── */
const Toast = ({ message, visible }: { message: string; visible: boolean }) => (
  <div style={{
    position: 'fixed', bottom: 40, left: '50%',
    transform: `translate(-50%, ${visible ? '0' : '20px'})`,
    opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none',
    transition: 'all 0.3s ease', zIndex: 9999, background: 'var(--bg-card)',
    border: '1px solid var(--border-glow)', padding: '12px 24px', borderRadius: 8,
    fontFamily: 'Inter', fontSize: 13, color: '#FFFFFF',
    display: 'flex', alignItems: 'center', gap: 8,
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  }}>
    <span style={{ color: '#4ADE80' }}>✓</span> {message}
  </div>
);

/* ───────────── Mobile Block ───────────── */
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

/* ───────────── Loading ───────────── */
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

/* ───────────── Splash ───────────── */
const SplashScreen = ({ onLoadScene }: { onLoadScene: (target: string) => void }) => (
  <div style={{ backgroundColor: '#0D0D14', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
    <svg style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }}>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 40 M 0 0 L 40 40" fill="none" stroke="#7B2DBF" strokeWidth="1" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
    <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ height: 72, width: 200, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/logo-full-light.svg" style={{ height: '100%' }} alt="Agnaa" />
      </div>
      <h1 style={{ fontSize: 56, color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0, marginBottom: 8 }}>Arc</h1>
      <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#8888AA', marginBottom: 8 }}>by Agnaa Design Studio</p>
      <p style={{ fontFamily: 'Inter', fontSize: 15, color: '#8888AA', fontStyle: 'italic', marginBottom: 40 }}>"Where Every Line Has Purpose."</p>
      <div style={{ display: 'flex', gap: 24, marginBottom: 60 }}>
        <button onClick={() => onLoadScene('blank')} style={{ background: 'var(--brand-gradient)', color: '#FFFFFF', fontSize: 14, padding: '14px 32px', borderRadius: 8 }}>
          + New Project
        </button>
        <button onClick={() => {
          const input = document.createElement('input');
          input.type = 'file'; input.accept = '.json'; input.click();
        }} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glow)', color: '#FFFFFF', fontSize: 14, padding: '14px 32px', borderRadius: 8 }}>
          ⤴ Load Scene
        </button>
      </div>
      <p style={{ fontFamily: 'Inter', fontSize: 12, color: '#8888AA' }}>Agnaa Design Studio · Hyderabad · agnaa.in</p>
    </div>
  </div>
);

/* ───────────── Header ───────────── */
const Header = ({ onShare, blockCount }: { onShare: () => void; blockCount: number }) => (
  <header style={{ height: 52, background: 'var(--bg-darkest)', borderBottom: '1px solid rgba(123,45,191,0.2)', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 32, height: 32 }}><img src="/logo-icon.svg" style={{ width: '100%', height: '100%' }} alt="Logo" /></div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 18, fontWeight: 600, color: '#FFFFFF' }}>Arc</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>by Agnaa</span>
        <span style={{ color: 'var(--text-muted)' }}>·</span>
        <span style={{ color: 'var(--accent-violet)', fontWeight: 600 }}>3D</span>
      </div>
      <span style={{ fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '2px 8px', borderRadius: 4, marginLeft: 8 }}>
        {blockCount} blocks
      </span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <a href="https://agnaa.in" style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--text-muted)' }}>&larr; agnaa.in</a>
      <button onClick={onShare} style={{ fontFamily: 'Inter', fontSize: 13, border: '1px solid var(--border-glow)', background: 'var(--bg-card)', color: '#FFFFFF', borderRadius: 6, padding: '6px 12px' }}>
        Share &nearr;
      </button>
      <a href="https://agnaa.in/#contact" style={{ fontFamily: 'Space Grotesk', fontSize: 13, background: 'var(--brand-gradient)', color: '#FFFFFF', borderRadius: 8, padding: '8px 20px', textDecoration: 'none' }}>
        Start a Project &rarr;
      </a>
    </div>
  </header>
);

/* ───────────── WhatsApp Float ───────────── */
const WhatsAppFloat = () => (
  <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{
    position: 'fixed', bottom: 24, right: 24, width: 48, height: 48, borderRadius: '50%',
    background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 16px rgba(37,211,102,0.4)', zIndex: 100, color: 'white', animation: 'wa-pulse 2s infinite',
  }}>
    <MessageCircle size={24} />
    <style>{`@keyframes wa-pulse { 0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.6); } 70% { box-shadow: 0 0 0 10px rgba(37,211,102,0); } 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); } }`}</style>
  </a>
);

/* ───────────── 3D Block Component ───────────── */
const Block3D = ({ block, isSelected, onClick }: { block: BuildingBlock; isSelected: boolean; onClick: () => void }) => {
  if (!block.visible) return null;

  const meshProps = {
    position: block.position as [number, number, number],
    rotation: block.rotation.map(r => (r * Math.PI) / 180) as [number, number, number],
    onClick: (e: any) => { e.stopPropagation(); onClick(); },
  };

  const matProps = {
    color: block.color,
    transparent: isSelected,
    opacity: isSelected ? 0.85 : 1,
  };

  if (block.shape === 'cylinder') {
    return (
      <group {...meshProps}>
        <Cylinder args={[block.size[0], block.size[0], block.size[1], 16]}>
          <meshStandardMaterial {...matProps} />
        </Cylinder>
        {isSelected && (
          <Cylinder args={[block.size[0] + 0.05, block.size[0] + 0.05, block.size[1] + 0.05, 16]}>
            <meshBasicMaterial color="#7B2DBF" wireframe />
          </Cylinder>
        )}
      </group>
    );
  }

  if (block.shape === 'cone') {
    return (
      <group {...meshProps}>
        <Cone args={[block.size[0], block.size[1], 4]}>
          <meshStandardMaterial {...matProps} />
        </Cone>
        {isSelected && (
          <Cone args={[block.size[0] + 0.05, block.size[1] + 0.05, 4]}>
            <meshBasicMaterial color="#7B2DBF" wireframe />
          </Cone>
        )}
      </group>
    );
  }

  return (
    <group {...meshProps}>
      <Box args={block.size as [number, number, number]}>
        <meshStandardMaterial {...matProps} />
      </Box>
      {isSelected && (
        <Box args={block.size.map(s => s + 0.05) as [number, number, number]}>
          <meshBasicMaterial color="#7B2DBF" wireframe />
        </Box>
      )}
    </group>
  );
};

/* ───────────── Toolbar Section ───────────── */
const ToolbarSection = ({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: 4 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 12px', background: 'rgba(123,45,191,0.08)', borderRadius: 6,
          color: '#FFFFFF', fontSize: 11, fontFamily: 'Space Grotesk', letterSpacing: '0.08em',
          textTransform: 'uppercase', cursor: 'pointer', border: 'none',
        }}
      >
        {title}
        {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>
      {open && <div style={{ padding: '8px 4px' }}>{children}</div>}
    </div>
  );
};

/* ───────────── Building Toolbar (Left) ───────────── */
const BuildToolbar = ({
  onAddBlock, selectedBlock, onUpdateBlock, onDeleteBlock,
  onDuplicateBlock, blocks
}: {
  onAddBlock: (type: typeof BLOCK_TYPES[0]) => void;
  selectedBlock: BuildingBlock | null;
  onUpdateBlock: (id: string, updates: Partial<BuildingBlock>) => void;
  onDeleteBlock: (id: string) => void;
  onDuplicateBlock: (id: string) => void;
  blocks: BuildingBlock[];
}) => {
  return (
    <div style={{
      width: 240, height: '100%', background: 'var(--bg-card)',
      borderRight: '1px solid var(--border-glow)', overflowY: 'auto',
      fontFamily: 'Inter', fontSize: 13, color: '#FFFFFF',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* ── Add Blocks ── */}
      <ToolbarSection title="🏗️ Add Building Blocks">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {BLOCK_TYPES.map(bt => (
            <button
              key={bt.id}
              onClick={() => onAddBlock(bt)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                padding: '10px 4px', background: 'var(--bg-darkest)', border: '1px solid rgba(123,45,191,0.15)',
                borderRadius: 8, color: '#FFFFFF', fontSize: 11, cursor: 'pointer',
                transition: 'all 0.2s', fontFamily: 'Inter',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#7B2DBF';
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(123,45,191,0.12)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(123,45,191,0.15)';
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-darkest)';
              }}
            >
              <span style={{ fontSize: 22 }}>{bt.icon}</span>
              <span>{bt.label.split(' ')[1]}</span>
            </button>
          ))}
        </div>
      </ToolbarSection>

      {/* ── Selected Block Settings ── */}
      {/* ── Basic Edit (simple) ── */}
      {selectedBlock && (
        <ToolbarSection title={"✏️ " + selectedBlock.type}>
          {/* Position — simple sliders */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>📍 Move It</div>
            {(['Left / Right', 'Up / Down', 'Front / Back'] as const).map((label, i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ width: 70, fontSize: 10, color: ['#FF6B6B', '#4ADE80', '#60A5FA'][i] }}>{label}</span>
                <input
                  type="range" min={-10} max={10} step={0.5}
                  value={selectedBlock.position[i]}
                  onChange={e => {
                    const pos = [...selectedBlock.position] as [number, number, number];
                    pos[i] = parseFloat(e.target.value);
                    onUpdateBlock(selectedBlock.id, { position: pos });
                  }}
                  style={{ flex: 1, accentColor: '#7B2DBF' }}
                />
              </div>
            ))}
          </div>

          {/* Quick actions — just duplicate & delete */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => onDuplicateBlock(selectedBlock.id)}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 0', background: 'var(--bg-darkest)', border: '1px solid rgba(123,45,191,0.2)', borderRadius: 6, color: '#FFFFFF', fontSize: 11, cursor: 'pointer', fontFamily: 'Inter' }}
            >
              <Copy size={12} /> Copy
            </button>
            <button
              onClick={() => onDeleteBlock(selectedBlock.id)}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 0', background: 'var(--bg-darkest)', border: '1px solid rgba(255,80,80,0.25)', borderRadius: 6, color: '#FF6B6B', fontSize: 11, cursor: 'pointer', fontFamily: 'Inter' }}
            >
              <Trash2 size={12} /> Remove
            </button>
          </div>
        </ToolbarSection>
      )}

      {/* ── Advanced Tools (collapsed by default) ── */}
      {selectedBlock && (
        <ToolbarSection title="⚙️ Advanced Tools" defaultOpen={false}>
          {/* Size */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>📐 Resize</div>
            {(['Width', 'Height', 'Depth'] as const).map((label, i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ width: 40, fontSize: 10, color: '#8888AA' }}>{label}</span>
                <input
                  type="range" min={0.1} max={10} step={0.1}
                  value={selectedBlock.size[i]}
                  onChange={e => {
                    const sz = [...selectedBlock.size] as [number, number, number];
                    sz[i] = parseFloat(e.target.value);
                    onUpdateBlock(selectedBlock.id, { size: sz });
                  }}
                  style={{ flex: 1, accentColor: '#7B2DBF' }}
                />
                <span style={{ width: 28, fontSize: 10, color: 'var(--text-muted)', textAlign: 'right' }}>
                  {selectedBlock.size[i].toFixed(1)}
                </span>
              </div>
            ))}
          </div>

          {/* Rotation */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>🔄 Rotate</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <RotateCw size={12} color="#8888AA" />
              <input
                type="range" min={0} max={360} step={15}
                value={selectedBlock.rotation[1]}
                onChange={e => {
                  const rot = [...selectedBlock.rotation] as [number, number, number];
                  rot[1] = parseFloat(e.target.value);
                  onUpdateBlock(selectedBlock.id, { rotation: rot });
                }}
                style={{ flex: 1, accentColor: '#7B2DBF' }}
              />
              <span style={{ width: 28, fontSize: 10, color: 'var(--text-muted)', textAlign: 'right' }}>
                {selectedBlock.rotation[1]}°
              </span>
            </div>
          </div>

          {/* Color */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>🎨 Color</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {COLOR_PALETTE.map(c => (
                <button
                  key={c}
                  onClick={() => onUpdateBlock(selectedBlock.id, { color: c })}
                  style={{
                    width: 24, height: 24, borderRadius: 4, background: c, cursor: 'pointer',
                    border: selectedBlock.color === c ? '2px solid #7B2DBF' : '1px solid rgba(255,255,255,0.15)',
                    transition: 'transform 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.15)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
                />
              ))}
            </div>
          </div>

          {/* Visibility & Lock */}
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={() => onUpdateBlock(selectedBlock.id, { visible: !selectedBlock.visible })}
              style={{ ...actionBtnStyle, flex: 1, width: 'auto', gap: 4, fontSize: 10 }}
              title={selectedBlock.visible ? 'Hide' : 'Show'}
            >
              {selectedBlock.visible ? <Eye size={12} /> : <EyeOff size={12} />}
              <span>{selectedBlock.visible ? 'Visible' : 'Hidden'}</span>
            </button>
            <button
              onClick={() => onUpdateBlock(selectedBlock.id, { locked: !selectedBlock.locked })}
              style={{ ...actionBtnStyle, flex: 1, width: 'auto', gap: 4, fontSize: 10 }}
              title={selectedBlock.locked ? 'Unlock' : 'Lock'}
            >
              {selectedBlock.locked ? <Lock size={12} /> : <Unlock size={12} />}
              <span>{selectedBlock.locked ? 'Locked' : 'Free'}</span>
            </button>
          </div>
        </ToolbarSection>
      )}

      {/* ── Scene Layers ── */}
      <ToolbarSection title="📋 Scene Layers" defaultOpen={false}>
        {blocks.length === 0 && (
          <p style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', padding: 12 }}>
            Add blocks above to start building! 🏠
          </p>
        )}
        {blocks.map(b => (
          <div
            key={b.id}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px',
              borderRadius: 4, cursor: 'pointer', fontSize: 11,
              background: 'transparent', marginBottom: 2,
              opacity: b.visible ? 1 : 0.4,
            }}
          >
            <span>{BLOCK_TYPES.find(t => t.id === b.type)?.icon || '📦'}</span>
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {b.type}
            </span>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: b.color, border: '1px solid rgba(255,255,255,0.2)' }} />
          </div>
        ))}
      </ToolbarSection>

      {/* ── Quick Tips ── */}
      <ToolbarSection title="💡 Tips" defaultOpen={false}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.6, padding: '0 4px' }}>
          <p>🖱️ <strong>Click</strong> a block to select it</p>
          <p>🔄 <strong>Drag</strong> to orbit the view</p>
          <p>🔍 <strong>Scroll</strong> to zoom in/out</p>
          <p>📦 Click shapes above to add blocks</p>
          <p>🎨 Use sliders to move & resize</p>
        </div>
      </ToolbarSection>

      {/* ── Footer ── */}
      <div style={{ marginTop: 'auto', padding: '12px', borderTop: '1px solid rgba(123,45,191,0.15)', textAlign: 'center' }}>
        <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>Arc by Agnaa · v1.0</p>
      </div>
    </div>
  );
};

const actionBtnStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 32, height: 32, borderRadius: 6, cursor: 'pointer',
  background: 'var(--bg-darkest)', border: '1px solid rgba(123,45,191,0.2)',
  color: '#FFFFFF', transition: 'all 0.15s',
};

/* ───────────── Export Panel (Right) ───────────── */
const ExportPanel = ({ sceneData, onShare }: { sceneData: any; onShare: () => void }) => {
  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(sceneData || { name: 'Empty Scene' })], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'Arc-project.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const screenshot = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl; a.download = 'Arc-screenshot.png'; a.click();
    }
  };

  return (
    <div className="export-panel" style={{
      position: 'absolute', top: 16, right: 16, background: 'var(--bg-card)',
      border: '1px solid var(--border-glow)', borderRadius: 8, padding: 12, width: 200, zIndex: 50,
      fontFamily: 'Inter', fontSize: 14, color: '#FFFFFF',
    }}>
      <div style={{ fontFamily: 'Space Grotesk', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>EXPORT PROJECT</div>
      <button onClick={downloadJson} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 4px', width: '100%', textAlign: 'left', color: 'inherit', background: 'none', cursor: 'pointer', border: 'none' }}>
        <Download size={14} /> Download Scene (.json)
      </button>
      <button onClick={screenshot} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 4px', width: '100%', textAlign: 'left', color: 'inherit', background: 'none', cursor: 'pointer', border: 'none' }}>
        <Camera size={14} /> Screenshot (PNG)
      </button>
      <button onClick={onShare} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 4px', width: '100%', textAlign: 'left', color: 'inherit', background: 'none', cursor: 'pointer', border: 'none' }}>
        <Share size={14} /> Copy Share Link
      </button>
      <button onClick={() => window.open('mailto:?subject=My Agnaa Project&body=View in 3D: ' + encodeURIComponent(window.location.href))} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 4px', width: '100%', textAlign: 'left', color: 'inherit', background: 'none', cursor: 'pointer', border: 'none' }}>
        <Mail size={14} /> Email to Client
      </button>
      <button onClick={() => window.open('https://wa.me/?text=' + encodeURIComponent('View my Agnaa project in 3D: ' + window.location.href))} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 4px', width: '100%', textAlign: 'left', color: 'inherit', background: 'none', cursor: 'pointer', border: 'none' }}>
        <MessageCircle size={14} /> Share on WhatsApp
      </button>
      <style>{`.export-panel button:hover { background: rgba(123,45,191,0.1) !important; border-radius: 4px; }`}</style>
    </div>
  );
};

/* ───────────── Main App ───────────── */
export default function App() {
  const [blocks, setBlocks] = useState<BuildingBlock[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sceneData, setSceneData] = useState<any>(null);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg: string) => { setToastMsg(msg); setTimeout(() => setToastMsg(""), 3000); };

  const selectedBlock = blocks.find(b => b.id === selectedId) || null;

  /* ── block CRUD ── */
  const addBlock = useCallback((type: typeof BLOCK_TYPES[0]) => {
    const newBlock: BuildingBlock = {
      id: `block_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      type: type.id,
      shape: type.shape,
      position: [0, type.defaultSize[1] / 2, 0],
      size: type.defaultSize as [number, number, number],
      color: type.color,
      rotation: [0, 0, 0],
      visible: true,
      locked: false,
    };
    setBlocks(prev => [...prev, newBlock]);
    setSelectedId(newBlock.id);
    showToast(`Added ${type.label}`);
  }, []);

  const updateBlock = useCallback((id: string, updates: Partial<BuildingBlock>) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
    if (selectedId === id) setSelectedId(null);
    showToast("Block removed");
  }, [selectedId]);

  const duplicateBlock = useCallback((id: string) => {
    const original = blocks.find(b => b.id === id);
    if (!original) return;
    const dup: BuildingBlock = {
      ...original,
      id: `block_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      position: [original.position[0] + 1, original.position[1], original.position[2] + 1],
    };
    setBlocks(prev => [...prev, dup]);
    setSelectedId(dup.id);
    showToast("Block duplicated");
  }, [blocks]);

  const handleShare = () => {
    const exportData = { blocks, meta: { name: 'Arc Project', version: '1.0' } };
    const base64 = btoa(JSON.stringify(exportData));
    const url = window.location.origin + "?data=" + base64;
    navigator.clipboard.writeText(url);
    showToast("Link copied! Share with your client.");
  };

  /* ── Init ── */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    setTimeout(() => {
      setLoading(false);
      if (data) {
        try {
          const parsed = JSON.parse(atob(data));
          if (parsed.blocks) setBlocks(parsed.blocks);
          setSceneData(parsed);
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
      <Header onShare={handleShare} blockCount={blocks.length} />
      <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
        {/* Left Toolbar */}
        <BuildToolbar
          onAddBlock={addBlock}
          selectedBlock={selectedBlock}
          onUpdateBlock={updateBlock}
          onDeleteBlock={deleteBlock}
          onDuplicateBlock={duplicateBlock}
          blocks={blocks}
        />

        {/* 3D Canvas */}
        <div style={{ flex: 1, position: 'relative', background: '#0A0A12' }}>
          <ExportPanel sceneData={{ blocks }} onShare={handleShare} />
          <WhatsAppFloat />
          <Toast message={toastMsg} visible={!!toastMsg} />

          <Canvas camera={{ position: [8, 6, 8] }} gl={{ powerPreference: 'high-performance', preserveDrawingBuffer: true }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 10]} intensity={1.2} />
            <directionalLight position={[-5, 5, -5]} intensity={0.4} />
            <OrbitControls makeDefault enableDamping dampingFactor={0.08} />
            <gridHelper args={[20, 20, '#2A2A3A', '#1A1A2A']} />

            {/* Ground plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial color="#12121E" />
            </mesh>

            {/* Blocks */}
            {blocks.map(block => (
              <Block3D
                key={block.id}
                block={block}
                isSelected={block.id === selectedId}
                onClick={() => setSelectedId(block.id)}
              />
            ))}
          </Canvas>
        </div>
      </div>
    </div>
  );
}
