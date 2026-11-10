"use client";

import React, { useState } from 'react';
import { Compass, Layers, Maximize2, Terminal, Cpu, Box, Film } from 'lucide-react';

export interface PlanItem {
  id: string;
  label: string;
  description: string;
  drawingCode: string;
  discipline?: string;
}

interface DossierPlanViewerIslandProps {
  plans: PlanItem[];
  discipline: string;
  projectTitle: string;
}

export function DossierPlanViewerIsland({ plans, discipline, projectTitle }: DossierPlanViewerIslandProps) {
  const [activePlanId, setActivePlanId] = useState<string>(plans[0]?.id || 'plan-1');
  const [showGrid, setShowGrid] = useState<boolean>(true);

  const selectedPlan = plans.find(p => p.id === activePlanId) || plans[0];

  return (
    <div className="space-y-6">
      {/* Plan Selector Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.08] pb-4">
        <div className="flex flex-wrap gap-2">
          {plans.map((plan) => {
            const isActive = plan.id === activePlanId;
            return (
              <button
                key={plan.id}
                onClick={() => setActivePlanId(plan.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1C1C72] text-white shadow-sm'
                    : 'bg-[#F8F9FA] text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#1C1C72] border border-black/[0.06]'
                }`}
              >
                {plan.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <button 
            onClick={() => setShowGrid(!showGrid)}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              showGrid ? 'bg-black/5 text-[#1C1C72] border-black/10' : 'bg-transparent text-[#5F6368] border-transparent'
            }`}
          >
            Grid: {showGrid ? 'ON' : 'OFF'}
          </button>
          <span className="text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            {selectedPlan?.drawingCode}
          </span>
        </div>
      </div>

      {/* Interactive Architectural / Systems Vector Canvas */}
      <div className="rounded-3xl bg-[#0D0D14] border border-white/10 p-6 sm:p-10 relative overflow-hidden text-white shadow-inner">
        {/* Vector Background Grid */}
        {showGrid && (
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />
        )}

        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-4">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{discipline.toUpperCase()} SPECIFICATION SCHEMATIC</span>
            </span>
            <span className="text-purple-400 font-bold">1:1 SCALED VECTOR DATUM</span>
          </div>

          {/* Dynamic Discipline-Aware Vector Schematic */}
          <div className="aspect-[16/9] w-full rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center p-6 relative overflow-hidden">
            {discipline === 'Software & Systems' ? (
              // System Architecture Flow Schematic
              <div className="w-full max-w-2xl space-y-6 font-mono text-xs">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
                  <div className="p-4 rounded-xl bg-white/[0.06] border border-white/10 space-y-2">
                    <span className="text-[10px] text-purple-300">01. CAPTURE</span>
                    <div className="font-bold text-white">16kHz PCM</div>
                    <div className="text-[10px] text-slate-400">Low-latency buffer</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.06] border border-white/10 space-y-2">
                    <span className="text-[10px] text-blue-300">02. INFERENCE</span>
                    <div className="font-bold text-white">Whisper F8</div>
                    <div className="text-[10px] text-slate-400">Int8 Quantized Core</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.06] border border-white/10 space-y-2">
                    <span className="text-[10px] text-emerald-300">03. PARSER</span>
                    <div className="font-bold text-white">CAD Syntax AST</div>
                    <div className="text-[10px] text-slate-400">Zero-error grammar</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.06] border border-white/10 space-y-2">
                    <span className="text-[10px] text-amber-300">04. DISPATCH</span>
                    <div className="font-bold text-white">AutoCAD / Revit</div>
                    <div className="text-[10px] text-slate-400">Global F8 Hook</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-slate-300">
                  <div className="text-[11px] text-slate-400">Inference Benchmark Stream:</div>
                  <div className="text-emerald-400 font-bold">&gt; [TRANSCRIPTION 0.38s] "Offset 9 inches masonry from Grid Line C-4 to C-9"</div>
                  <div className="text-[10px] text-slate-500">Execution: AutoCAD command dispatched with zero network egress (Air-Gapped).</div>
                </div>
              </div>
            ) : discipline === 'Bespoke Furniture' ? (
              // Furniture Joinery Orthographic Blueprint
              <div className="w-full max-w-xl space-y-4 font-mono text-xs">
                <div className="border border-white/20 rounded-xl p-6 bg-white/[0.02] relative space-y-4">
                  <div className="flex justify-between text-[11px] text-slate-400 border-b border-white/10 pb-2">
                    <span>SECTION A-A: TEAK TRESTLE JOINERY</span>
                    <span className="text-purple-300">TOLERANCE ±0.25mm</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center py-4">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="text-[10px] text-slate-400 uppercase">Mortise Depth</div>
                      <div className="text-base font-bold text-white">65 mm</div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="text-[10px] text-slate-400 uppercase">Tenon Width</div>
                      <div className="text-base font-bold text-white">45 mm</div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="text-[10px] text-slate-400 uppercase">Brass Pin Dia</div>
                      <div className="text-base font-bold text-white">12 mm</div>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 text-center">
                    Concealed drawbore brass pins drive tight shoulder fit without synthetic resin adhesives.
                  </div>
                </div>
              </div>
            ) : discipline === '3D Cinema & Film' ? (
              // Cinematic Raytraced Pipeline Schematic
              <div className="w-full max-w-xl space-y-4 font-mono text-xs">
                <div className="border border-white/20 rounded-xl p-6 bg-white/[0.02] space-y-4">
                  <div className="flex justify-between text-[11px] text-slate-400 border-b border-white/10 pb-2">
                    <span>OPTICAL DATUM: 4K DCI CINEMATIC PIPELINE</span>
                    <span className="text-purple-300">ACEScg COLOR PROFILE</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center py-4">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="text-[10px] text-slate-400 uppercase">Focal Length</div>
                      <div className="text-base font-bold text-white">35 mm Prime</div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="text-[10px] text-slate-400 uppercase">Aperture</div>
                      <div className="text-base font-bold text-white">f/1.8 T-Stop</div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="text-[10px] text-slate-400 uppercase">Sampling</div>
                      <div className="text-base font-bold text-white">2048 Rays/px</div>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 text-center">
                    Deccan solar azimuth and volumetric dust atmospheric scattering calculated under real physical optics.
                  </div>
                </div>
              </div>
            ) : (
              // Spatial Architecture Blueprint Plan Vector
              <div className="w-full max-w-xl space-y-4 font-mono text-xs">
                <div className="border border-white/20 rounded-xl p-6 bg-white/[0.02] space-y-4">
                  <div className="flex justify-between text-[11px] text-slate-400 border-b border-white/10 pb-2">
                    <span>ARCHITECTURAL FLOOR DATUM: {selectedPlan?.label}</span>
                    <span className="text-emerald-400 font-bold">{selectedPlan?.drawingCode}</span>
                  </div>
                  
                  {/* Schematic Architectural Grid Wireframe */}
                  <div className="py-6 flex flex-col items-center justify-center space-y-2">
                    <div className="w-full border-2 border-purple-400/40 rounded-lg p-4 bg-purple-950/20 grid grid-cols-3 gap-2 text-center text-[10px]">
                      <div className="border border-white/20 p-2 rounded">
                        <span className="text-purple-300 font-bold">GRID A-1</span>
                        <div className="text-white mt-1">Living Loggia</div>
                      </div>
                      <div className="border-2 border-emerald-400/50 p-2 rounded bg-emerald-950/30">
                        <span className="text-emerald-300 font-bold">BRAHMASTHAN</span>
                        <div className="text-white mt-1">Open Courtyard</div>
                      </div>
                      <div className="border border-white/20 p-2 rounded">
                        <span className="text-purple-300 font-bold">GRID C-3</span>
                        <div className="text-white mt-1">Private Suite</div>
                      </div>
                    </div>
                    <div className="flex justify-between w-full text-[10px] text-slate-500 pt-1">
                      <span>West Setback: 3.00m (G.O. 168)</span>
                      <span>Column-Free Cantilever: 4.20m</span>
                      <span>East Setback: 2.00m</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 text-center border-t border-white/10 pt-3">
                    {selectedPlan?.description}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-4 gap-2">
            <div>
              <span className="text-white font-bold">{selectedPlan?.label}: </span>
              <span>{selectedPlan?.description}</span>
            </div>
            <div className="text-emerald-400 font-mono text-[11px] shrink-0">
              ✓ Verified Engineering Drawing
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
