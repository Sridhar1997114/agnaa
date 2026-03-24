"use client";

import React, { useState } from 'react';
import { Button } from '@/components/Button';

export default function StartProjectPage() {
  const [formData, setFormData] = useState({ name: '', phone: '+918826214348', type: 'Design Studio', budget: '', msg: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi AGNAA, I am ${formData.name}. Interested in: ${formData.type}. Budget: ${formData.budget}. Details: ${formData.msg}`;
    const waUrl = `https://wa.me/918826214348?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="bg-white min-h-screen text-[#1C1C72] pt-24 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000" alt="Architecture" className="w-full h-full object-cover opacity-10 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/80" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-[#1C1C72]">Start Your Journey</h1>
          <p className="text-2xl text-gray-500 font-bold">3 Min Inquiry → Custom Proposal</p>
        </div>

        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] border border-gray-200 shadow-[0_30px_60px_-15px_rgba(28,28,114,0.1)] hover:border-[#7B2DBF]/30 hover:shadow-[0_30px_60px_rgba(123,45,191,0.15)] transition-all duration-700">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Name</label>
                <input required type="text" className="w-full bg-[#F5F5F7] border border-gray-200 rounded-2xl px-5 py-4 font-bold text-[#1C1C72] focus:outline-none focus:border-[#7B2DBF] focus:ring-4 focus:ring-[#7B2DBF]/20 transition-all shadow-sm" 
                  onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Phone</label>
                <input required type="text" defaultValue={formData.phone} className="w-full bg-[#F5F5F7] border border-gray-200 rounded-2xl px-5 py-4 font-bold text-[#1C1C72] focus:outline-none focus:border-[#7B2DBF] focus:ring-4 focus:ring-[#7B2DBF]/20 transition-all shadow-sm" 
                  onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Interest</label>
                <select className="w-full bg-[#F5F5F7] border border-gray-200 rounded-2xl px-5 py-4 font-bold text-[#1C1C72] focus:outline-none focus:border-[#7B2DBF] focus:ring-4 focus:ring-[#7B2DBF]/20 transition-all appearance-none shadow-sm"
                  onChange={e => setFormData({...formData, type: e.target.value})}>
                  <option>Design Studio</option>
                  <option>Constructions</option>
                  <option>Foundation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Est. Budget</label>
                <input type="text" placeholder="e.g. ₹50L" className="w-full bg-[#F5F5F7] border border-gray-200 rounded-2xl px-5 py-4 font-bold text-[#1C1C72] focus:outline-none focus:border-[#7B2DBF] focus:ring-4 focus:ring-[#7B2DBF]/20 transition-all placeholder:text-gray-400 shadow-sm"
                  onChange={e => setFormData({...formData, budget: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Project Details</label>
              <textarea rows={4} placeholder="Location, dimensions, vision..." className="w-full bg-[#F5F5F7] border border-gray-200 rounded-2xl px-5 py-4 font-bold text-[#1C1C72] focus:outline-none focus:border-[#7B2DBF] focus:ring-4 focus:ring-[#7B2DBF]/20 transition-all resize-none placeholder:text-gray-400 shadow-sm"
                onChange={e => setFormData({...formData, msg: e.target.value})}></textarea>
            </div>

            <Button type="submit" variant="primary" className="w-full py-5 text-xl rounded-2xl">Send to Studio → Reply in 2hrs</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
