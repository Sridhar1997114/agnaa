"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { pricingData, calculateServicePrice, PricingCategory, PricingBasis } from '@/data/pricingData';
import { QuotePDF } from '@/components/QuotePDF';
import { FileText, Download, CheckCircle, MapPin, Building, Activity, Layers, ArrowRight } from 'lucide-react';
// Dynamic loading of html2pdf.js via CDN to bypass local environment install issues
const loadHtml2Pdf = () => {
  return new Promise((resolve) => {
    if ((window as any).html2pdf) {
      resolve((window as any).html2pdf);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => resolve((window as any).html2pdf);
    document.head.appendChild(script);
  });
};

export default function CostCalculator() {
  const [activeTab, setActiveTab] = useState<string>('architecture');
  
  // Project Parameters
  const [params, setParams] = useState({
    name: '',
    location: '',
    planArea: 2500,
    elevationArea: 1000,
    floors: 1,
    complexity: 'medium' as 'simple' | 'medium' | 'complex' | 'very-complex',
    hasInterior: false
  });

  // Selected Services
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set(['gf_plan'])); // Default architecture
  
  // Computed Totals
  const [totals, setTotals] = useState({ agnaaLow: 0, agnaaHigh: 0, market: 0 });

  // PDF Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }));
  }, []);

  // Toggle Service Selection
  const toggleService = (id: string) => {
    const newSelected = new Set(selectedServices);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedServices(newSelected);
  };

  const getComplexityMultiplier = (level: string) => {
    switch(level) {
      case 'simple': return 0.8;
      case 'medium': return 1.05;
      case 'complex': return 1.3;
      case 'very-complex': return 1.65;
      default: return 1.05;
    }
  };

  // Recalculate totals whenever params or selected services change
  useEffect(() => {
    let agnaaLow = 0;
    let agnaaHigh = 0;
    let market = 0;
    
    const mult = getComplexityMultiplier(params.complexity);

    selectedServices.forEach(id => {
      // Find service
      let service = null;
      for (const cat of pricingData) {
        const found = cat.services.find(s => s.id === id);
        if (found) {
          service = found;
          break;
        }
      }

      if (service) {
        const agnaaPrice = calculateServicePrice(
          service,
          params.planArea,
          params.elevationArea,
          0, // seconds
          mult
        );

        agnaaLow += agnaaPrice.low;
        agnaaHigh += agnaaPrice.high;
      }
    });

    // Market price is roughly 2.5x Agnaa price
    market = Math.round((agnaaLow * 2.5) / 1000) * 1000;

    setTotals({ agnaaLow, agnaaHigh, market });
  }, [params, selectedServices]);

  // Selected Service Details for PDF
  const selectedServiceDetails = Array.from(selectedServices).map(id => {
    let service = null;
    let categoryName = '';
    for (const cat of pricingData) {
      const found = cat.services.find(s => s.id === id);
      if (found) {
        service = found;
        categoryName = cat.name;
        break;
      }
    }
    if (!service) return null;

    const price = calculateServicePrice(
      service,
      params.planArea,
      params.elevationArea,
      0, // seconds
      getComplexityMultiplier(params.complexity)
    );

    return {
      id: service.id,
      name: service.name,
      scope: `${categoryName} • ${service.basis === 'Flat' ? 'Flat Fee' : service.basis}`,
      days: service.days,
      revisions: service.revisions,
      priceLow: price.low,
      priceHigh: price.high
    };
  }).filter(Boolean) as any[];

  // Generate PDF
  const handleDownloadQuote = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById('quote-pdf-content');
      if (!element) return;

      // Make element temporarily visible for html2pdf rendering
      element.style.display = 'block';

      const opt = {
        margin:       0,
        filename:     `AGNAA_Quote_${params.name || 'Project'}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      const html2pdfLib: any = await loadHtml2Pdf();
      await html2pdfLib().set(opt).from(element).save();

      // Hide again
      element.style.display = 'none';
      
    } catch (error) {
      console.error('Failed to generate PDF', error);
      const element = document.getElementById('quote-pdf-content');
      if (element) element.style.display = 'none';
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#7B2DBF]/30 selection:text-white pb-20">
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1C1C72]/40 via-[#0A0A0A] to-transparent"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#7B2DBF]/10 rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#7B2DBF] animate-pulse"></span>
              <span className="text-xs font-semibold tracking-widest text-[#E0E0E0] uppercase">Enterprise Grade Estimator</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
              Predictable <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Pricing.</span><br/>
              Unmatched Value.
            </h1>
            
            <p className="text-xl text-gray-400 max-w-xl leading-relaxed mb-8">
              Configure your project parameters to get a real-time, transparent estimate. 
              Our optimized workflow delivers ~60% savings compared to standard market rates.
            </p>
          </div>
          
          {/* Quick Summary Card - Hidden on mobile, shown on lg */}
          <div className="hidden lg:block bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#7B2DBF]/20 blur-[50px] rounded-full"></div>
             <p className="text-gray-400 font-medium mb-2 uppercase tracking-widest text-xs">Estimated Value</p>
             <div className="text-5xl font-black tracking-tighter mb-4 text-white">
               ₹{totals.agnaaLow.toLocaleString()}
             </div>
             <div className="flex items-center gap-4 border-t border-white/10 pt-4 mt-4">
               <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Market Price</p>
                  <p className="text-gray-300 font-bold line-through">₹{totals.market.toLocaleString()}</p>
               </div>
               <div className="h-8 w-px bg-white/10"></div>
               <div>
                  <p className="text-[#7B2DBF] text-xs uppercase tracking-wider mb-1 font-bold">Your Savings</p>
                  <p className="text-[#7B2DBF] font-bold">~60%</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Main Configuration Area */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_400px] gap-12">
          
          {/* Left Column: Configuration */}
          <div className="space-y-12">
            
            {/* Step 1: Project Details */}
            <div className="bg-[#111] border border-white/5 rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-[#1C1C72]/30 flex items-center justify-center text-[#7B2DBF] font-bold shrink-0">1</div>
                <h2 className="text-xl md:text-2xl font-bold">Project Parameters</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Project Name</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18}/>
                    <input 
                      type="text" 
                      value={params.name}
                      onChange={(e) => setParams({...params, name: e.target.value})}
                      placeholder="e.g. Modern Villa Project"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#7B2DBF] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18}/>
                    <input 
                      type="text"
                      value={params.location}
                      onChange={(e) => setParams({...params, location: e.target.value})} 
                      placeholder="e.g. Hyderabad"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#7B2DBF] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Total Plan Area (sqft)</label>
                  <div className="relative">
                    <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18}/>
                    <input 
                      type="number" 
                      value={params.planArea}
                      onChange={(e) => setParams({...params, planArea: parseInt(e.target.value) || 0})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#7B2DBF] transition-colors"
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider ml-1">Sum of all floors</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Elevation Area (sqft)</label>
                  <div className="relative">
                    <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18}/>
                    <input 
                      type="number" 
                      value={params.elevationArea}
                      onChange={(e) => setParams({...params, elevationArea: parseInt(e.target.value) || 0})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#7B2DBF] transition-colors"
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider ml-1">Front facade surface area</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Number of Floors</label>
                  <div className="relative">
                    <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                      type="number"
                      value={params.floors}
                      onChange={(e) => setParams({...params, floors: parseInt(e.target.value) || 0})} 
                      min="1"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#7B2DBF] transition-colors"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-400 mb-4">Design Complexity Level</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: 'simple', label: 'Simple', desc: 'Basic, functional' },
                    { id: 'medium', label: 'Medium', desc: 'Standard details' },
                    { id: 'complex', label: 'Complex', desc: 'Intricate styling' },
                    { id: 'very-complex', label: 'Parametric', desc: 'Avant-garde' }
                  ].map(lvl => (
                    <button
                      key={lvl.id}
                      onClick={() => setParams({...params, complexity: lvl.id as any})}
                      className={`p-5 rounded-2xl border text-left transition-all ${
                        params.complexity === lvl.id 
                          ? 'border-[#7B2DBF] bg-[#7B2DBF]/10 ring-1 ring-[#7B2DBF]/50' 
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="font-bold mb-1 text-sm md:text-base">{lvl.label}</div>
                      <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">{lvl.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Service Selection */}
            <div className="bg-[#111] border border-white/5 rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-[#1C1C72]/30 flex items-center justify-center text-[#7B2DBF] font-bold shrink-0">2</div>
                <h2 className="text-xl md:text-2xl font-bold">Select Services</h2>
              </div>

              {/* Category Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-4 mb-6 hide-scrollbar">
                {pricingData.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                      activeTab === cat.id 
                        ? 'bg-white text-black' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Service List */}
              <div className="space-y-3">
                {pricingData.find(c => c.id === activeTab)?.services.map(service => {
                  const isSelected = selectedServices.has(service.id);
                  const price = calculateServicePrice(
                    service, 
                    params.planArea, 
                    params.elevationArea, 
                    0, 
                    getComplexityMultiplier(params.complexity)
                  );
                  
                  return (
                    <div 
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`p-4 md:p-5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-[#7B2DBF] bg-[#1C1C72]/20 shadow-[0_0_20px_rgba(123,45,191,0.1)]' 
                          : 'border-white/5 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                        <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center border transition-colors shrink-0 ${
                          isSelected ? 'bg-[#7B2DBF] border-[#7B2DBF]' : 'border-gray-600'
                        }`}>
                          {isSelected && <CheckCircle size={12} className="text-white md:size-14" />}
                        </div>
                        <div className="truncate">
                          <h3 className={`font-bold text-sm md:text-base ${isSelected ? 'text-white' : 'text-gray-300'}`}>{service.name}</h3>
                          <p className="text-[10px] md:text-sm text-gray-500 mt-0.5 truncate uppercase tracking-widest">{service.basis === 'Flat' ? 'Fixed Fee' : service.basis} • {service.days}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <div className={`font-bold text-sm md:text-base ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                          {price.low === price.high 
                            ? `₹${price.low.toLocaleString()}` 
                            : `₹${Math.round(price.low/1000)}k - ₹${Math.round(price.high/1000)}k`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Summary - Desktop Only */}
          <div className="hidden lg:block lg:sticky lg:top-32 h-fit">
            <div className="bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#7B2DBF]/10 blur-[60px] rounded-full pointer-events-none"></div>
               
               <h3 className="text-xl font-bold mb-6">Quote Summary</h3>
               
               <div className="space-y-4 mb-8">
                 {Array.from(selectedServices).slice(0, 4).map(id => {
                   const s = selectedServiceDetails.find(d => d.id === id);
                   if (!s) return null;
                   return (
                     <div key={id} className="flex justify-between text-sm">
                       <span className="text-gray-400 truncate pr-4">{s.name}</span>
                       <span className="text-white font-medium">₹{s.priceLow.toLocaleString()}</span>
                     </div>
                   );
                 })}
                 {selectedServices.size > 4 && (
                   <div className="text-sm text-gray-500 italic">
                     + {selectedServices.size - 4} more services...
                   </div>
                 )}
                 {selectedServices.size === 0 && (
                   <div className="text-sm text-gray-500 italic py-2">
                     No services selected
                   </div>
                 )}
               </div>

               <div className="border-t border-white/10 pt-6 mb-8">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-gray-400 text-sm">Market Standard</span>
                   <span className="text-gray-500 line-through">₹{totals.market.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-end mt-4">
                   <span className="text-gray-300 font-bold uppercase tracking-wider text-xs">Total Estimation</span>
                   <span className="text-4xl font-black text-white">₹{totals.agnaaLow.toLocaleString()}</span>
                 </div>
                 <div className="text-right mt-1 text-[10px] text-[#7B2DBF] font-bold uppercase tracking-widest">+ 18% GST</div>
               </div>

               <button 
                 onClick={handleDownloadQuote}
                 disabled={isGenerating || selectedServices.size === 0}
                 className="w-full bg-white text-black font-bold h-14 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                 {isGenerating ? (
                   <span className="animate-pulse">Generating Quote...</span>
                 ) : (
                   <>
                     <FileText size={18} />
                     Generate PDF Quote
                     <Download size={16} className="ml-2 group-hover:-translate-y-1 transition-transform"/>
                   </>
                 )}
               </button>
               
               <p className="text-center text-xs text-gray-500 mt-4 px-4 leading-relaxed">
                 This is a provisional estimate. Final quotation will be shared after detailed project analysis.
               </p>
            </div>
          </div>

        </div>
      </section>

      {/* Sticky Mobile Summary Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/80 backdrop-blur-xl border-t border-white/10 safe-area-bottom">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#7B2DBF] font-bold uppercase tracking-[0.2em] mb-0.5">Estimated Total</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">₹{totals.agnaaLow.toLocaleString()}</span>
              {selectedServices.size > 0 && (
                <span className="text-[10px] text-gray-500 font-medium">({selectedServices.size} {selectedServices.size === 1 ? 'Service' : 'Services'})</span>
              )}
            </div>
            <div className="text-[8px] text-gray-600 uppercase tracking-widest mt-0.5">Market Price: ₹{totals.market.toLocaleString()}</div>
          </div>
          
          <button 
            onClick={handleDownloadQuote}
            disabled={isGenerating || selectedServices.size === 0}
            className="bg-[#7B2DBF] text-white font-bold h-12 px-6 rounded-xl flex items-center gap-2 hover:bg-[#6A24A8] transition-all active:scale-95 disabled:opacity-50"
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <FileText size={16} />
                <span>Get Quote</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hidden PDF Component */}
      <QuotePDF 
        projectDetails={params}
        services={selectedServiceDetails}
        totalAgnaaLow={totals.agnaaLow}
        totalAgnaaHigh={totals.agnaaHigh}
        totalMarketPrice={totals.market}
        date={currentDate}
      />
    </div>
  );
}
