"use client";

import React, { useState } from 'react';
import { Mic, Volume2 } from 'lucide-react';

export function VoiceSimulatorIsland() {
  const [voiceTab, setVoiceTab] = useState<'cad' | 'natural' | 'translate'>('cad');
  const [voiceSimulating, setVoiceSimulating] = useState(false);
  const [voiceText, setVoiceText] = useState("Wall dimension 14' 8\" with beam BEAM B4 at LVL +450");

  const runSimulation = (text: string) => {
    setVoiceSimulating(true);
    setVoiceText(text);
    setTimeout(() => setVoiceSimulating(false), 2400);
  };

  return (
    <div className="rounded-3xl border border-black/[0.08] bg-[#F8F9FA] p-8 flex flex-col justify-between">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C72]/10 text-[#1C1C72] text-xs font-mono font-bold">
            <Mic size={14} className={voiceSimulating ? "text-red-500 animate-pulse" : "text-[#7B2DBF]"} />
            <span>AGNAA VOICE v2.0 (WHISPER F8 ENGINE)</span>
          </div>
          <span className="text-xs text-[#5F6368] font-mono">ON-DEVICE OFFLINE</span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-[#1C1C72]">
            Autonomous CAD Speech Interface
          </h3>
          <p className="text-sm text-[#5F6368] mt-2 leading-relaxed">
            Zero-latency technical speech transcription tuned for Indian site terminology, structural notations, and multilingual architectural dictation.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2 p-1 bg-black/[0.04] rounded-xl text-xs font-mono font-bold">
          <button 
            onClick={() => { setVoiceTab('cad'); runSimulation("Offset 9 inches masonry from Grid Line C-4 to C-9"); }}
            className={`flex-1 py-2 px-3 rounded-lg transition-all ${voiceTab === 'cad' ? 'bg-white shadow text-[#1C1C72]' : 'text-[#5F6368] hover:text-[#1C1C72]'}`}
          >
            CAD Syntax
          </button>
          <button 
            onClick={() => { setVoiceTab('natural'); runSimulation("Set cantilever projection to 1.8 meters with waterproof membrane"); }}
            className={`flex-1 py-2 px-3 rounded-lg transition-all ${voiceTab === 'natural' ? 'bg-white shadow text-[#1C1C72]' : 'text-[#5F6368] hover:text-[#1C1C72]'}`}
          >
            Site Notes
          </button>
          <button 
            onClick={() => { setVoiceTab('translate'); runSimulation("క్రింది ఫ్లోరింగ్ గ్రానైట్ లెవెల్ చెక్ చేయండి (Telugu to English CAD annotation)"); }}
            className={`flex-1 py-2 px-3 rounded-lg transition-all ${voiceTab === 'translate' ? 'bg-white shadow text-[#1C1C72]' : 'text-[#5F6368] hover:text-[#1C1C72]'}`}
          >
            Telugu / Hindi
          </button>
        </div>

        {/* Acoustic Waveform Monitor */}
        <div className="p-4 rounded-2xl bg-white border border-black/[0.06] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#5F6368]">
            <span className="flex items-center gap-1.5">
              <Volume2 size={14} className="text-[#2563EB]" />
              <span>Acoustic Waveform Input</span>
            </span>
            <span className="text-[#10B981] font-bold">16kHz PCM</span>
          </div>

          <div className="h-10 flex items-center justify-center gap-1">
            {[40, 70, 30, 85, 60, 95, 45, 80, 50, 100, 35, 75, 55, 90, 65, 40, 85, 30].map((h, i) => {
              const activeHeights = [75, 95, 50, 90, 70, 100, 60, 85, 65, 95, 55, 80, 70, 90, 80, 60, 85, 50];
              return (
                <span 
                  key={i} 
                  style={{ height: `${voiceSimulating ? activeHeights[i] : Math.round(h * 0.4)}%` }}
                  className={`w-1 rounded-full transition-all duration-150 ${voiceSimulating ? 'bg-[#7B2DBF]' : 'bg-black/20'}`}
                />
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-[#F8F9FA] border border-black/[0.04] font-mono text-xs text-[#1C1C72] min-h-[48px] flex items-center">
            {voiceSimulating ? (
              <span className="text-[#7B2DBF] animate-pulse">Transcribing acoustics via on-device quantized model...</span>
            ) : (
              <span>"{voiceText}"</span>
            )}
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-black/[0.08] mt-6 flex items-center justify-between text-xs">
        <a 
          href="/downloads/Agnaa-Voice-v2.0-Windows-Portable.zip"
          download
          className="text-[#2563EB] font-bold hover:underline font-mono inline-flex items-center gap-1"
        >
          <span>Download Portable App (.zip, 442 MB)</span>
        </a>
        <span className="text-[#5F6368] font-mono">Whisper F8 Engine</span>
      </div>
    </div>
  );
}

export default VoiceSimulatorIsland;
