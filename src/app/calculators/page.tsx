"use client";

import React, { useState } from 'react';
import { Calculator, Users } from 'lucide-react';
import { Button } from '@/components/Button';

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState('design');

  const tabs = [
    { id: 'design', label: 'Design Cost' },
    { id: 'manpower', label: 'Manpower' },
    { id: 'area', label: 'Area/Volume' },
    { id: 'tdr', label: 'TDR Est.' }
  ];

  return (
    <div className="bg-white min-h-screen text-[#1C1C72] pt-24">
      <section className="py-24 text-center px-4 bg-[#F5F5F7] border-b border-gray-200 relative overflow-hidden">
        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7B2DBF]/20 to-transparent"></div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-[#1C1C72]">AGNAA Precision Tools</h1>
        <p className="text-xl text-gray-500 font-bold">Free Calculators for Smart Decisions</p>
      </section>

      <section className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="flex overflow-x-auto gap-4 mb-12 pb-4 scrollbar-hide justify-start md:justify-center">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-8 py-4 rounded-full font-bold transition-all duration-300 text-lg border ${activeTab === tab.id ? 'bg-[#1C1C72] text-white border-[#7B2DBF] shadow-[0_0_15px_rgba(123,45,191,0.4)]' : 'bg-[#F5F5F7] text-gray-500 border-gray-200 hover:border-[#7B2DBF]/50 hover:text-[#7B2DBF]'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-[#F5F5F7] p-12 md:p-20 rounded-[3rem] border border-gray-200 shadow-sm hover:border-[#7B2DBF]/30 hover:shadow-[0_20px_60px_rgba(123,45,191,0.08)] transition-all duration-700">
          {activeTab === 'design' && (
            <div className="text-center py-12">
              <Calculator size={64} strokeWidth={1.5} className="mx-auto text-[#7B2DBF] mb-8"/>
              <h3 className="text-3xl font-black mb-6 tracking-tight text-[#1C1C72]">Detailed Design Calculator available in Studio</h3>
              <Button href="/design-studio" variant="primary" className="mx-auto px-10 py-4 text-lg">Go to Design Studio</Button>
            </div>
          )}
          {activeTab === 'manpower' && (
            <div className="text-center py-12">
              <Users size={64} strokeWidth={1.5} className="mx-auto text-[#7B2DBF] mb-8"/>
              <h3 className="text-3xl font-black mb-6 tracking-tight text-[#1C1C72]">Advanced Manpower Planning</h3>
              <Button href="/constructions" variant="primary" className="mx-auto px-10 py-4 text-lg">Go to Constructions</Button>
            </div>
          )}
          {activeTab === 'area' && (
            <div className="text-center py-12">
              <h3 className="text-3xl font-black mb-6 tracking-tight text-[#1C1C72]">Area & Volume Calculator</h3>
              <p className="text-gray-500 text-lg mb-10 font-bold max-w-xl mx-auto">Coming Soon: Instantly calculate material volumes based on room dimensions.</p>
              <Button variant="outline" className="mx-auto px-10 py-4 bg-white text-lg" href="/start-project">Request Custom Calc</Button>
            </div>
          )}
          {activeTab === 'tdr' && (
            <div className="text-center py-12">
              <h3 className="text-3xl font-black mb-6 tracking-tight text-[#1C1C72]">Transferable Development Rights (TDR) Estimator</h3>
              <p className="text-gray-500 text-lg mb-10 font-bold max-w-xl mx-auto">Coming Soon: Calculate G+5 rules and floor bonuses for Hyderabad municipality.</p>
              <Button variant="outline" className="mx-auto px-10 py-4 bg-white text-lg" href="/start-project">Consult with Architect</Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
