"use client";

import React, { useState } from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { Button } from '@/components/Button';
import Image from 'next/image';

export default function FoundationPage() {
  const [complaint, setComplaint] = useState('');
  const [aiStatus, setAiStatus] = useState<any>(null);

  const handleVoiceMock = () => {
    setComplaint('Massive pothole near Gachibowli junction causing traffic block.');
    setTimeout(() => {
      setAiStatus({ status: 'success', dept: '@AGNAARoads', msg: '✅ Identified: Road Issue. Ready to dispatch.' });
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen text-[#1C1C72] pt-24">
      <section className="relative py-32 overflow-hidden bg-[#F5F5F7] border-b border-gray-200">
        <div className="container mx-auto px-4 z-10 relative text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-[#1C1C72]">Voice Your Justice. <br/> Plant Your Legacy.</h1>
          <p className="text-xl text-gray-500 font-bold max-w-2xl mx-auto mb-16">AI-Filtered Complaints | 30 Dept Accounts | Direct Action</p>
          
          <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] p-10 md:p-14 border border-gray-200 shadow-[0_20px_60px_-15px_rgba(28,28,114,0.05)] hover:border-[#7B2DBF]/30 hover:shadow-[0_20px_60px_rgba(123,45,191,0.1)] transition-all duration-700">
            <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-3 text-[#1C1C72]"><MessageSquare size={28} className="text-[#7B2DBF]"/> Record Complaint (10s)</h2>
            <div className="bg-[#F5F5F7] rounded-2xl p-6 mb-8 border border-gray-100 focus-within:border-[#7B2DBF] focus-within:ring-4 focus-within:ring-[#7B2DBF]/20 transition-all">
              <textarea 
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                placeholder="Click the mic or type your complaint (e.g., Road pothole in Jubilee Hills...)" 
                className="w-full bg-transparent text-2xl text-center resize-none focus:outline-none text-[#1C1C72] placeholder:text-gray-400 font-medium leading-relaxed"
                rows={3}
              />
            </div>
            
            <div className="flex justify-center mb-8">
              <button onClick={handleVoiceMock} className="w-24 h-24 bg-[#1C1C72] border border-transparent hover:border-[#7B2DBF] hover:bg-gradient-to-r hover:from-[#1C1C72] hover:to-[#7B2DBF] rounded-full flex items-center justify-center hover:scale-105 transition-all duration-500 shadow-[0_10px_30px_rgba(28,28,114,0.2)] hover:shadow-[0_0_30px_rgba(123,45,191,0.5)]">
                <Phone size={36} className="text-white" />
              </button>
            </div>

            {aiStatus && (
              <div className="animate-in fade-in slide-in-from-bottom-4 bg-white border border-[#7B2DBF] shadow-[0_0_20px_rgba(123,45,191,0.15)] text-[#1C1C72] p-6 rounded-2xl font-bold text-xl mb-8">
                {aiStatus.msg} <br/>
                <Button variant="primary" className="mt-6 w-full py-4 text-lg">Post to {aiStatus.dept}</Button>
              </div>
            )}
            
            <div className="pt-8 border-t border-gray-200 flex flex-wrap justify-around gap-4 text-gray-500 text-sm font-bold uppercase tracking-widest">
              <span>1,247 Complaints</span>
              <span className="text-[#7B2DBF]">127 Fixed</span>
              <span>₹8.4L Raised</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-12 tracking-tight text-[#1C1C72]">Targeted Departments</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['@AGNAARoads', '@AGNAAHealth', '@AGNAAClean', '@AGNAAEdu', '@AGNAAWater', '@AGNAAPower'].map(dept => (
              <span key={dept} className="px-8 py-4 bg-[#F5F5F7] rounded-full font-bold text-gray-500 border border-gray-200 hover:border-[#7B2DBF] hover:text-[#7B2DBF] hover:shadow-[0_0_15px_rgba(123,45,191,0.2)] cursor-pointer transition-all duration-300">
                {dept}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#F5F5F7] border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-[3rem] p-10 md:p-20 border border-gray-200 shadow-[0_20px_60px_-15px_rgba(28,28,114,0.05)] hover:border-[#7B2DBF]/30 hover:shadow-[0_20px_60px_rgba(123,45,191,0.1)] transition-all duration-700 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-5xl font-black text-[#1C1C72] tracking-tight">The Tree Economy</h2>
              <p className="text-2xl text-gray-500 font-bold">Rent Tree: City Joy → Farmer ₹10k/mo</p>
              <p className="text-gray-600 text-lg leading-relaxed font-medium">By renting a tree, you bring greenery to the urban landscape while providing direct monthly sustenance to local farmers nurturing the saplings.</p>
              <div className="text-5xl font-black text-[#1C1C72] pt-4">₹150 <span className="text-xl text-[#7B2DBF] font-bold">/ year</span></div>
              <div className="pt-4">
                 <Button onClick={() => alert('Initiating Stripe Checkout...')} variant="primary" className="py-4 px-12 text-lg">Assign My Plot</Button>
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <div className="absolute -inset-4 bg-brand-gradient opacity-10 blur-3xl rounded-full" />
              <div className="relative aspect-square md:aspect-video rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(28,28,114,0.1)] grayscale group-hover:grayscale-0 transition-all duration-1000 border border-gray-100 hover:border-[#7B2DBF]/30">
                <Image 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" 
                  alt="Tree planting economy" 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C72]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
