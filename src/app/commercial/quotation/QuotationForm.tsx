"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Trash2, Package, Search, ChevronRight, Calculator, Check, X, Filter, Zap } from 'lucide-react';
import { MICROSERVICES, PACKAGES, multipliers, ServiceTier } from '@/lib/pricing-data';
import { ClientInfo, QuotationState, LineItem } from './types';

interface Props {
  onUpdate: (state: QuotationState) => void;
}

export default function QuotationForm({ onUpdate }: Props) {
  const [client, setClient] = useState<ClientInfo>({
    name: '', company: '', email: '', phone: '', address: '', projectLocation: ''
  });
  const [items, setItems] = useState<LineItem[]>([]);
  const [globalTier, setGlobalTier] = useState<ServiceTier>('standard');
  const [complexity, setComplexity] = useState<keyof typeof multipliers.complexity>('Medium');
  const [urgency, setUrgency] = useState<keyof typeof multipliers.urgency>('Normal');
  const [cityTier, setCityTier] = useState<keyof typeof multipliers.city>('T2 (City)');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = new Set(MICROSERVICES.map(s => s.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredServices = useMemo(() => {
    return MICROSERVICES.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.18;
    const total = subtotal + tax;
    const advanceAmount = total * 0.3;

    onUpdate({
      quotationNumber: `QTN-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-IN'),
      client,
      items,
      subtotal,
      discount: 0,
      tax,
      total,
      advanceAmount,
      notes: "30% Advance Payment required for activation. All prices in INR."
    });
  };

  useEffect(() => {
    calculateTotals();
  }, [client, items, cityTier, complexity, urgency, globalTier]);

  const addService = (service: typeof MICROSERVICES[0]) => {
    const mult = (multipliers.city[cityTier] || 1) * (multipliers.complexity[complexity] || 1) * (multipliers.urgency[urgency] || 1);
    const basePrice = service[globalTier];
    
    const newItem: LineItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: service.name,
      category: service.category,
      tier: globalTier,
      basePrice,
      quantity: 1,
      unit: service.unitLabel,
      multiplier: mult,
      total: basePrice * mult
    };
    setItems([...items, newItem]);
  };

  const addPackage = (pkg: typeof PACKAGES[0]) => {
    const mult = (multipliers.city[cityTier] || 1) * (multipliers.complexity[complexity] || 1) * (multipliers.urgency[urgency] || 1);
    const basePrice = pkg[globalTier];
    
    const newItem: LineItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: pkg.name,
      category: pkg.vertical,
      tier: globalTier,
      basePrice,
      quantity: 1,
      unit: "package",
      multiplier: mult,
      total: basePrice * mult
    };
    setItems([...items, newItem]);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
      {/* Client Intelligence */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#F3F4F6] rounded-lg">
            <Package className="text-[#1C1C72]" size={20} />
          </div>
          <h3 className="text-xl font-space font-bold text-[#1C1C72]">Protocol Subject</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#9CA3AF] ml-1">Client Name</label>
            <input 
              className="w-full bg-[#F9FAFB] border border-[#E5E7EB] p-3 rounded-xl focus:border-[#7B2DBF] focus:ring-1 focus:ring-[#7B2DBF] outline-none transition-all text-[#1C1C72]" 
              placeholder="Full Name" 
              onChange={e => setClient({...client, name: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#9CA3AF] ml-1">Entity / Project</label>
            <input 
              className="w-full bg-[#F9FAFB] border border-[#E5E7EB] p-3 rounded-xl focus:border-[#7B2DBF] focus:ring-1 focus:ring-[#7B2DBF] outline-none transition-all text-[#1C1C72]" 
              placeholder="Company or Residence Name" 
              onChange={e => setClient({...client, company: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#9CA3AF] ml-1">Location</label>
            <input 
              className="w-full bg-[#F9FAFB] border border-[#E5E7EB] p-3 rounded-xl focus:border-[#7B2DBF] focus:ring-1 focus:ring-[#7B2DBF] outline-none transition-all text-[#1C1C72]" 
              placeholder="City, Area" 
              onChange={e => setClient({...client, projectLocation: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#9CA3AF] ml-1">Email</label>
            <input 
              className="w-full bg-[#F9FAFB] border border-[#E5E7EB] p-3 rounded-xl focus:border-[#7B2DBF] focus:ring-1 focus:ring-[#7B2DBF] outline-none transition-all text-[#1C1C72]" 
              placeholder="client@email.com" 
              onChange={e => setClient({...client, email: e.target.value})}
            />
          </div>
        </div>
      </div>

      {/* Commercial Parameters */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#F3F4F6] rounded-lg">
            <Calculator className="text-[#1C1C72]" size={20} />
          </div>
          <h3 className="text-xl font-space font-bold text-[#1C1C72]">Market Parameters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#9CA3AF] ml-1">Service Tier</label>
            <select 
              className="w-full bg-[#F9FAFB] border border-[#E5E7EB] p-3 rounded-xl focus:border-[#7B2DBF] outline-none text-[#1C1C72] appearance-none"
              value={globalTier}
              onChange={e => setGlobalTier(e.target.value as ServiceTier)}
            >
              <option value="basic">Basic (Entry)</option>
              <option value="standard">Standard (Growth)</option>
              <option value="premium">Premium (Legacy)</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#9CA3AF] ml-1">City Class</label>
            <select 
              className="w-full bg-[#F9FAFB] border border-[#E5E7EB] p-3 rounded-xl focus:border-[#7B2DBF] outline-none text-[#1C1C72]"
              value={cityTier}
              onChange={e => setCityTier(e.target.value as any)}
            >
              {Object.keys(multipliers.city).map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#9CA3AF] ml-1">Complexity</label>
            <select 
              className="w-full bg-[#F9FAFB] border border-[#E5E7EB] p-3 rounded-xl focus:border-[#7B2DBF] outline-none text-[#1C1C72]"
              value={complexity}
              onChange={e => setComplexity(e.target.value as any)}
            >
              {Object.keys(multipliers.complexity).map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#9CA3AF] ml-1">Delivery</label>
            <select 
              className="w-full bg-[#F9FAFB] border border-[#E5E7EB] p-3 rounded-xl focus:border-[#7B2DBF] outline-none text-[#1C1C72]"
              value={urgency}
              onChange={e => setUrgency(e.target.value as any)}
            >
              {Object.keys(multipliers.urgency).map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Service Selection */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#F3F4F6] rounded-lg">
              <Filter className="text-[#1C1C72]" size={20} />
            </div>
            <h3 className="text-xl font-space font-bold text-[#1C1C72]">Catalog Activation</h3>
          </div>
          
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
              <input 
                className="pl-10 pr-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm focus:border-[#7B2DBF] outline-none w-full"
                placeholder="Search 141 services..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#1C1C72] outline-none"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        {/* Selected Items */}
        <div className="space-y-3 mb-8">
          <p className="text-[10px] uppercase font-bold text-[#9CA3AF] mb-2 tracking-widest">Protocol Components</p>
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 group hover:border-[#1C1C72]/20 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-[#F3F4F6] rounded-lg group-hover:bg-[#1C1C72]/5 transition-colors">
                  <Check className="text-[#059669]" size={16} />
                </div>
                <div>
                  <p className="font-bold text-[#1C1C72]">{item.name}</p>
                  <p className="text-[10px] text-[#6B7280] uppercase mt-0.5">{item.category} • {item.tier} • {item.multiplier.toFixed(2)}x Factor</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-space font-bold text-[#1C1C72]">₹{item.total.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-[#9CA3AF]">Base: ₹{item.basePrice.toLocaleString('en-IN')}</p>
                </div>
                <button 
                  onClick={() => setItems(items.filter(i => i.id !== item.id))}
                  className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
              <Zap className="mx-auto text-gray-200 mb-2" size={32} />
              <p className="text-[#9CA3AF] text-sm">Activate services from the catalog or packages below</p>
            </div>
          )}
        </div>

        {/* Service Picker */}
        <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 border-t pt-6 scrollbar-thin scrollbar-thumb-gray-200">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
             {filteredServices.slice(0, 30).map(service => (
               <button 
                key={service.name}
                onClick={() => addService(service)}
                className="text-left p-3 border border-transparent hover:border-[#E5E7EB] hover:bg-gray-50 rounded-xl transition-all flex items-center justify-between group"
               >
                 <div className="flex-grow">
                   <p className="text-xs font-bold text-[#1C1C72] truncate max-w-[200px]">{service.name}</p>
                   <p className="text-[9px] uppercase text-[#9CA3AF]">{service.category} • {service.unitLabel}</p>
                 </div>
                 <Plus size={14} className="text-[#9CA3AF] group-hover:text-[#1C1C72] transition-colors" />
               </button>
             ))}
           </div>
           {filteredServices.length > 30 && (
             <p className="text-[10px] text-center text-[#9CA3AF] py-4 bg-gray-50 rounded-xl mt-2 font-bold uppercase tracking-widest leading-loose">
               Refine search to access all 141 services
             </p>
           )}
        </div>

        {/* Strategic Packages */}
        <div className="mt-8 border-t pt-6">
          <p className="text-[10px] uppercase font-bold text-[#9CA3AF] mb-4 tracking-widest">Industry Standard Packages</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {PACKAGES.slice(0, 10).map(pkg => (
              <button 
                key={pkg.code}
                onClick={() => addPackage(pkg)}
                className="p-3 border border-[#E5E7EB] hover:border-[#1C1C72] hover:bg-[#F3F4F6] rounded-xl text-center transition-all group relative overflow-hidden"
              >
                <p className="text-[10px] font-bold text-[#1C1C72] mb-1 leading-tight">{pkg.name}</p>
                <p className="text-[9px] text-[#7B2DBF] font-bold">₹{pkg[globalTier]?.toLocaleString('en-IN')}</p>
                <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Zap size={10} className="text-[#7B2DBF]" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
