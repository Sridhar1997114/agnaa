"use client";

import React, { useState } from 'react';
import { Mic, Download, ShieldCheck, Zap, Layers, Sparkles, Volume2, Globe, Heart, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/Button';
import { AgnaaLogo } from '@/components/AgnaaLogo';
import Link from 'next/link';

export default function VoicePage() {
  const [activeTab, setActiveTab] = useState<'cad' | 'natural' | 'translate'>('cad');
  const [isSimulating, setIsSimulating] = useState(false);
  const [demoText, setDemoText] = useState("Wall dimension 14' 8\" with beam BEAM B4 at LVL +450");

  const handleSimulate = (mode: 'cad' | 'natural' | 'translate') => {
    setActiveTab(mode);
    setIsSimulating(true);
    if (mode === 'cad') {
      setDemoText("Wall dimension 14' 8\" with beam BEAM B4 at LVL +450");
    } else if (mode === 'natural') {
      setDemoText("AGNAA Voice allows me to dictate emails, site notes, and specifications without touching my keyboard.");
    } else {
      setDemoText("English Translation: The structural footing casting has begun for the southern foundation column.");
    }
    setTimeout(() => setIsSimulating(false), 800);
  };

  return (
    <div className="bg-[#09090E] min-h-screen text-white pt-24 selection:bg-[#7B2DBF] selection:text-white">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-[#1E1E2C]">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#1C1C72]/40 via-[#7B2DBF]/30 to-transparent rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 z-10 relative text-center max-w-5xl">
          {/* Foundation Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#181826] border border-[#2E2E42] text-[#A78BFA] text-xs md:text-sm font-bold uppercase tracking-wider mb-8 shadow-inner">
            <Sparkles size={16} className="text-[#A78BFA]" />
            <span>AGNAA Foundation • Public Digital Initiative</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-tight md:leading-none">
            Speak Your Design. <br />
            <span className="bg-gradient-to-r from-[#818CF8] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent">
              Type at the Speed of Thought.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
            The world’s fastest offline voice typing companion for architects, engineers, & creators. 
            Powered by local OpenAI Whisper. Press <span className="text-white font-mono bg-[#1E1E2E] px-2 py-1 rounded border border-gray-700">F8</span> anywhere to speak directly into AutoCAD, Revit, Word, Chrome, & any Windows app.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
            <a
              href="/downloads/AGNAA-Voice-v1.0-Windows.zip"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] hover:from-[#26269A] hover:to-[#9333EA] text-white flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(123,45,191,0.5)] transition-all duration-300 hover:scale-105"
            >
              <Download size={22} />
              <span>Download AGNAA Voice for Windows</span>
            </a>

            <Link
              href="/foundation"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg bg-[#141420] hover:bg-[#1E1E2E] text-gray-300 hover:text-white border border-[#2A2A3E] flex items-center justify-center gap-3 transition-all duration-300"
            >
              <Heart size={20} className="text-[#F43F5E]" />
              <span>Support Agnaa Foundation</span>
            </Link>
          </div>

          {/* Guarantee Pills */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 font-medium">
            <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-400" /> 100% Offline & Private</span>
            <span className="flex items-center gap-2"><Zap size={18} className="text-amber-400" /> &lt;0.4s Instant Transcribe</span>
            <span className="flex items-center gap-2"><Layers size={18} className="text-indigo-400" /> Works across all 32-bit & 64-bit Apps</span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. INTERACTIVE FLOATING CAPSULE HUD DEMO */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 bg-[#0B0B12] border-b border-[#1A1A28]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            The Floating Dynamic Capsule HUD
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            A discreet glassmorphism pill that hovers smoothly over your software. Never steals keyboard focus from AutoCAD, Revit, or your active editor.
          </p>

          {/* Interactive Mock HUD Widget */}
          <div className="inline-block p-1 bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] rounded-full shadow-[0_15px_40px_rgba(123,45,191,0.25)] mb-12">
            <div className="bg-[#0B0B14] px-6 py-3 rounded-full flex items-center gap-4 text-sm font-bold">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400">Listening (F8)...</span>
              {/* Waveform bars */}
              <div className="flex items-center gap-1 h-4">
                <span className="w-1 bg-[#818CF8] h-2 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1 bg-[#C084FC] h-4 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1 bg-[#818CF8] h-3 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="w-1 bg-[#C084FC] h-5 rounded-full animate-bounce" style={{ animationDelay: '450ms' }} />
                <span className="w-1 bg-[#818CF8] h-2 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
              </div>
              <span className="text-gray-400 font-mono text-xs">00:04</span>
            </div>
          </div>

          {/* Live Simulator Preview Card */}
          <div className="bg-[#12121C] rounded-2xl p-6 md:p-8 border border-[#242436] text-left shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#202030] mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A78BFA]">Interactive Mode Simulator</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleSimulate('cad')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'cad' ? 'bg-[#7B2DBF] text-white shadow-md' : 'bg-[#1A1A28] text-gray-400 hover:text-white'}`}
                >
                  <Layers size={14} />
                  <span>CAD / Architecture</span>
                </button>
                <button
                  onClick={() => handleSimulate('natural')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'natural' ? 'bg-[#7B2DBF] text-white shadow-md' : 'bg-[#1A1A28] text-gray-400 hover:text-white'}`}
                >
                  <Zap size={14} />
                  <span>Natural Dictation</span>
                </button>
                <button
                  onClick={() => handleSimulate('translate')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'translate' ? 'bg-[#7B2DBF] text-white shadow-md' : 'bg-[#1A1A28] text-gray-400 hover:text-white'}`}
                >
                  <Globe size={14} />
                  <span>Speech Translation</span>
                </button>
              </div>
            </div>

            <div className="bg-[#0A0A10] p-6 rounded-xl border border-[#1C1C28] font-mono text-base md:text-lg min-h-[100px] flex items-center text-gray-200">
              {isSimulating ? (
                <span className="text-amber-400 animate-pulse flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-400" /> Transcribing with Whisper base...
                </span>
              ) : (
                <span>{demoText}</span>
              )}
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              {activeTab === 'cad' && "✦ Notice how spoken words like 'fourteen feet eight inches' automatically format as 14' 8\" and structural items format in standard CAD naming."}
              {activeTab === 'natural' && "✦ Conversational sentences flow seamlessly with natural capitalization, commas, and periods."}
              {activeTab === 'translate' && "✦ Speak in Telugu, Hindi, or vernacular languages — AGNAA Voice translates and pastes in clean English."}
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. FEATURE PILLARS */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 bg-[#09090E]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              Engineered for Architecture & High-Performance Work
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Built by AGNAA Design Studio to eliminate the fatigue of manual typing during drafting, BIM modeling, and client specifications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#10101A] p-8 rounded-2xl border border-[#202032] hover:border-[#7B2DBF]/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#1C1C72] flex items-center justify-center text-[#A78BFA] mb-6">
                <ShieldCheck size={26} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">100% Offline &amp; Zero Cloud</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Whisper AI runs locally on your PC’s CPU or NVIDIA GPU. No audio, transcripts, or proprietary project drawings are ever uploaded to cloud servers.
              </p>
            </div>

            <div className="bg-[#10101A] p-8 rounded-2xl border border-[#202032] hover:border-[#7B2DBF]/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#7B2DBF] flex items-center justify-center text-white mb-6">
                <Zap size={26} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Any App, Any Window</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Works globally across AutoCAD, Revit, Rhino, Excel, Chrome, WhatsApp, Word, Slack, and Notion. Wherever your cursor blinks, AGNAA Voice types.
              </p>
            </div>

            <div className="bg-[#10101A] p-8 rounded-2xl border border-[#202032] hover:border-[#7B2DBF]/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#1E1B4B] flex items-center justify-center text-[#C7D2FE] mb-6">
                <Volume2 size={26} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Dual Mode: Speech &amp; TTS Reader</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Press <span className="font-mono text-xs bg-[#242436] px-2 py-0.5 rounded">F8</span> to speak and write. Highlight any document or drawing note and press <span className="font-mono text-xs bg-[#242436] px-2 py-0.5 rounded">F9</span> to have your PC read it aloud.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. FOUNDATION CONTRIBUTION SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 bg-gradient-to-b from-[#0B0B12] to-[#121222] border-t border-[#1E1E2E]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="w-16 h-16 rounded-full bg-[#1C1C72]/80 border border-[#7B2DBF] flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(123,45,191,0.3)]">
            <Heart size={28} className="text-[#F43F5E]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            A Public Gift from AGNAA Foundation
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            AGNAA Voice is free software developed to democratize digital accessibility for students, engineers, and creators. If this tool saves you hours of time every week, consider supporting our foundation’s green canopy, tree economy, and urban civic initiatives.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/foundation"
              className="px-8 py-4 rounded-full font-bold text-base bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] hover:from-[#26269A] hover:to-[#9333EA] text-white shadow-lg shadow-purple-900/30 transition-all hover:scale-105"
            >
              Donate to AGNAA Foundation
            </Link>

            <a
              href="/downloads/AGNAA-Voice-v1.0-Windows.zip"
              className="px-8 py-4 rounded-full font-bold text-base bg-[#181826] hover:bg-[#222236] text-gray-200 border border-[#2E2E44] transition-all"
            >
              Download Windows Software (.zip)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
