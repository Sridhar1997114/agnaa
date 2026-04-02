"use client";

import React from 'react';

interface VisualizerProps {
  type: 'PLOT' | 'BUILT_UP' | 'FSI' | 'RCC' | 'EXCAVATION' | 'FOOTING' | 'STAIRCASE' | 'WALL' | 'TANK' | 'ROOF' | 'FLOOR' | 'SHAPE' | 'PLASTER' | 'PAINT' | 'ANTI_TERMITE' | 'STEEL' | 'PCC' | 'SETBACK' | 'G_N_FLOOR' | 'SHUTTERING' | 'SCAFFOLDING' | 'ELECTRICAL' | 'INTERIOR';
  data: any;
  className?: string;
}


import { BlueprintSlab } from '../visualizers/BlueprintSlab';
import { BlueprintFoundation } from '../visualizers/BlueprintFoundation';
import { BlueprintLayout } from '../visualizers/BlueprintLayout';
import { BlueprintWall } from '../visualizers/BlueprintWall';
import { BlueprintStaircase } from '../visualizers/BlueprintStaircase';
import { BlueprintSeptic } from '../visualizers/BlueprintSeptic';
import { BlueprintRoofing } from '../visualizers/BlueprintRoofing';
import { BlueprintFlooring } from '../visualizers/BlueprintFlooring';
import { BlueprintShape } from '../visualizers/BlueprintShape';

export const CalculationVisualizer: React.FC<VisualizerProps> = ({ type, data, className = "" }) => {
  if (!data) return null;


  // ─── RENDERER DISPATCH ───
  return (
    <div className={`relative bg-transparent rounded-xl overflow-hidden ${className}`}>
      {/* SHAPE VISUALIZER */}
      {type === 'SHAPE' && data.shape && (
        <BlueprintShape shape={data.shape} data={data} />
      )}

      {/* RCC SLAB VISUALIZER */}
      {type === 'RCC' && (data.length || data.l) && (
        <BlueprintSlab 
          length={parseFloat(data.length || data.l || 0)} 
          width={parseFloat(data.width || data.w || 0)} 
          thickness={parseFloat(data.thickness || data.t || 0)} 
          preset={data.preset?.toLowerCase() as any}
        />
      )}
      
      {(type === 'FOOTING' || type === 'EXCAVATION') && (data.length || data.l) && (
        <BlueprintFoundation 
          length={parseFloat(data.length || data.l || 0)} 
          width={parseFloat(data.width || data.w || 0)} 
          depth={parseFloat(data.depth || data.d || 0)} 
        />
      )}

      {/* WALL VISUALIZER */}
      {type === 'WALL' && (data.length || data.l) && (
        <BlueprintWall 
          length={parseFloat(data.length || data.l || 0)} 
          height={parseFloat(data.height || data.h || 0)}
          thickness={parseFloat(data.thickness || data.t || 9)} 
        />
      )}

      {/* STAIRCASE VISUALIZER */}
      {type === 'STAIRCASE' && (data.totalRise || data.rise) && (
        <BlueprintStaircase 
          totalRise={parseFloat(data.totalRise || data.rise || 120)} 
          totalRun={parseFloat(data.totalRun || data.run || 180)} 
          riserCount={parseInt(data.riserCount || data.steps || 18)} 
          treadWidth={parseFloat(data.treadWidth || data.tread || 10)} 
          riserHeight={parseFloat(data.riserHeight || data.riseHeight || 6.5)} 
        />
      )}

      {/* TANK VISUALIZER */}
      {type === 'TANK' && (data.length || data.l) && (
        <BlueprintSeptic 
          length={parseFloat(data.length || data.l || 10)} 
          width={parseFloat(data.width || data.w || 6)} 
          depth={parseFloat(data.depth || data.d || 8)} 
          chambers={parseInt(data.chambers || 3)}
        />
      )}


      {/* ROOF VISUALIZER */}
      {type === 'ROOF' && (data.length || data.l) && (
        <BlueprintRoofing 
          length={parseFloat(data.length || data.l || 20)} 
          width={parseFloat(data.width || data.w || 30)} 
          type={data.roofType || 'TILES'} 
          slope={data.slope || 25}
        />
      )}

      {/* FLOOR VISUALIZER */}
      {type === 'FLOOR' && (data.length || data.l) && (
        <BlueprintFlooring 
          length={parseFloat(data.length || data.l || 15)} 
          width={parseFloat(data.width || data.w || 12)} 
          pattern={data.pattern || 'GRID'} 
          tileSize={data.tileSize || 24}
        />
      )}

      {/* PLOT / BUILT-UP / FSI VISUALIZERS */}

      {(type === 'PLOT' || type === 'BUILT_UP' || type === 'FSI' || type === 'ELECTRICAL' || type === 'INTERIOR') && (data.length || data.plotArea || data.carpetArea || data.area) && (
        <BlueprintLayout 
          length={parseFloat(data.length || data.plotArea || data.carpetArea || data.area || 0)} 
          width={parseFloat(data.width || (data.plotArea ? Math.sqrt(data.plotArea) : (data.carpetArea ? Math.sqrt(data.carpetArea) : (data.area ? Math.sqrt(data.area) : 0))))} 
          label={
            type === 'BUILT_UP' ? 'Carpet Area' : 
            type === 'FSI' ? 'Plot Boundary' : 
            type === 'ELECTRICAL' ? 'Electrical Layout' :
            type === 'INTERIOR' ? 'Interior Blueprint' :
            'Property Layout'
          }
          subLabel={
            type === 'FSI' ? `FSI: ${data.fsi || '0.0'}` : 
            type === 'BUILT_UP' ? `S.Built-up: ${Math.round(data.superBuiltUpArea || 0)}` : 
            type === 'ELECTRICAL' ? `Points: ${data.totalPoints || 0}` :
            type === 'INTERIOR' ? `Tier: ${data.tier?.toUpperCase()}` :
            undefined
          }
        />
      )}

      {/* PLASTER & PAINT VISUALIZERS (USING WALL AS BASE) */}
      {(type === 'PLASTER' || type === 'PAINT') && (data.area || data.carpetArea) && (
        <BlueprintWall 
          length={Math.sqrt(parseFloat(data.area || data.carpetArea || 100))} 
          height={Math.sqrt(parseFloat(data.area || data.carpetArea || 100))}
          thickness={0.5}
          label={type === 'PLASTER' ? 'Plaster Surface' : 'Painted Surface'}
        />
      )}

      {/* ANTI-TERMITE VISUALIZER */}
      {type === 'ANTI_TERMITE' && (data.length || data.l) && (
        <BlueprintLayout 
          length={parseFloat(data.length || data.l || 10)} 
          width={parseFloat(data.width || data.w || 8)} 
          label="Anti-Termite Treatment Zone"
          subLabel={`Perimeter: ${data.perimeter || 0}m`}
        />
      )}

      {/* STEEL REBAR VISUALIZER */}
      {type === 'STEEL' && (data.area || data.a) && (
        <BlueprintSlab 
          length={Math.sqrt(parseFloat(data.area || data.a || 1000))} 
          width={Math.sqrt(parseFloat(data.area || data.a || 1000))}
          thickness={6}
          preset="strong"
          label="Steel Reinforcement Grid"
        />
      )}

      {/* PCC / CONCRETE SLAB VISUALIZER */}
      {(type === 'PCC' || type === 'SHAPE') && (data.length || data.l || data.area) && (
        <BlueprintSlab 
          length={parseFloat(data.length || data.l || Math.sqrt(data.area || 100))} 
          width={parseFloat(data.width || data.w || Math.sqrt(data.area || 100))}
          thickness={parseFloat(data.thickness || data.t || 4)}
          label={type === 'PCC' ? 'PCC Layer' : 'Concrete Volume'}
        />
      )}

      {/* SETBACK / ENVELOPE VISUALIZER */}
      {type === 'SETBACK' && data.length && (
        <BlueprintLayout 
          length={parseFloat(data.length)} 
          width={parseFloat(data.width)} 
          label="Building Envelope"
          subLabel={`Total Area: ${data.area || 0} sq.ft`}
        />
      )}

      {/* G+N FLOOR ESTIMATOR VISUALIZER */}
      {type === 'G_N_FLOOR' && data.areaPerFloor && (
        <BlueprintSlab 
          length={Math.sqrt(parseFloat(data.areaPerFloor))} 
          width={Math.sqrt(parseFloat(data.areaPerFloor))}
          thickness={12 * (parseInt(data.floors || 1))}
          label={`Building Mass (${data.floors} Floors)`}
        />
      )}

      {/* SHUTTERING VISUALIZER */}
      {type === 'SHUTTERING' && data.area && (
        <BlueprintSlab
          length={Math.sqrt(parseFloat(data.area))}
          width={Math.sqrt(parseFloat(data.area))}
          thickness={1}
          preset="strong"
          label="Shuttering Board Area"
        />
      )}

      {/* SCAFFOLDING VISUALIZER */}
      {type === 'SCAFFOLDING' && data.area && (
        <BlueprintWall
          length={parseFloat(data.length) || Math.sqrt(parseFloat(data.area))}
          height={parseFloat(data.height) || Math.sqrt(parseFloat(data.area))}
          thickness={2}
          label="Scaffolding Elevation"
        />
      )}

      {/* Fallback pattern if type not handled yet or data missing */}
      {(!data.length && !data.plotArea && !data.carpetArea && !data.l) && (
        <div className="w-full aspect-video flex flex-col items-center justify-center bg-[#FDFDFF] border border-gray-200 rounded-2xl text-[#1C1C72] font-mono text-[10px]">
          <div className="mb-2 italic uppercase tracking-widest opacity-30">Awaiting System Input...</div>
          <svg className="w-12 h-12 opacity-10 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2v20M2 12h20" strokeLinecap="round" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
      )}
    </div>
  );
};
