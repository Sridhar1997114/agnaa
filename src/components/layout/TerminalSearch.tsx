"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, X, ArrowRight } from 'lucide-react';
import { calculators, CalculatorMeta } from '@/lib/calculators';
import { useRouter } from 'next/navigation';

export const TerminalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = calculators.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSelect = (calc: CalculatorMeta) => {
    router.push(calc.path);
    setIsOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => (i + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => (i - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex]);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(true)}
        className="hidden sm:flex items-center gap-4 px-4 py-2 bg-white/50 hover:bg-white rounded-xl text-gray-500 transition-all border border-gray-200/50 hover:border-[#7B2DBF]/30 group shadow-sm hover:shadow-md"
      >
        <div className="flex items-center gap-2">
          <Search size={14} className="group-hover:text-[#7B2DBF] transition-colors" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#1C1C72]/60 group-hover:text-[#7B2DBF]">Search Systems</span>
        </div>
        <kbd className="text-[9px] bg-[#1C1C72] text-[#A5B4FC] px-1.5 py-0.5 rounded-md font-mono border border-[#1C1C72]">⌘K</kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
            >
              <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50">
                <Command size={18} className="text-[#7B2DBF]" />
                <input 
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Search engines (e.g. 'steel', 'roi', 'septic')..."
                  className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-[#1C1C72] placeholder:text-gray-400"
                />
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-200 rounded text-gray-400 transition-colors">
                  <X size={16} />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-none">
                {filtered.length > 0 ? (
                  filtered.map((calc, i) => (
                    <div 
                      key={calc.id}
                      onClick={() => handleSelect(calc)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                        selectedIndex === i ? 'bg-[#7B2DBF]/10 border border-[#7B2DBF]/20' : 'border border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg transition-colors ${selectedIndex === i ? 'bg-[#7B2DBF] text-white shadow-lg' : 'bg-gray-100 text-[#1C1C72]'}`}>
                          <calc.icon size={18} />
                        </div>
                        <div>
                          <div className={`text-xs font-black uppercase tracking-tight transition-colors ${selectedIndex === i ? 'text-[#7B2DBF]' : 'text-[#1C1C72]'}`}>
                            {calc.name}
                          </div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">{calc.category} // {calc.description}</div>
                        </div>
                      </div>
                      {selectedIndex === i && (
                        <motion.div layoutId="arrow" className="text-[#7B2DBF]">
                          <ArrowRight size={14} />
                        </motion.div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-gray-400 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <Search size={24} className="opacity-20" />
                    </div>
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">System Error: No Matches</div>
                    <div className="text-[10px] mt-2 max-w-[200px] leading-relaxed">The search query "{query}" did not match any operational modules in the AGNAA database.</div>
                  </div>
                )}
              </div>

              <div className="bg-[#1C1C72] p-2 flex items-center justify-between text-[8px] font-black text-[#A5B4FC] uppercase tracking-[0.2em] px-4">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1 opacity-70"><div className="bg-[#A5B4FC] text-[#1C1C72] px-1 rounded-sm">↑↓</div> NAVIGATE</span>
                  <span className="flex items-center gap-1 opacity-70"><div className="bg-[#A5B4FC] text-[#1C1C72] px-1 rounded-sm">↵</div> SELECT</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-[#7B2DBF] rounded-full animate-pulse shadow-[0_0_5px_rgba(123,45,191,0.8)]" />
                  <span>AGNAA OS v4.0 PRECISION ENGINE</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
