"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Calculator, Sparkles } from 'lucide-react';
import { AgnaaLogo } from './AgnaaLogo';
import { Button } from './Button';

export const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'design-studio', label: 'Design Studio', href: '/design-studio' },
    { id: 'constructions', label: 'Constructions', href: '/constructions' },
    { id: 'tools-ai', label: 'Tools & AI', href: '/calc' },
    { id: 'codex', label: 'Codex', href: '/blog' },
    { id: 'foundation', label: 'Foundation', href: '/foundation' }
  ];

  const isDarkPage = !isScrolled && (pathname === '/voice');

  const isPortal = pathname?.startsWith('/app') || pathname?.startsWith('/admin') || pathname?.startsWith('/login') || pathname?.startsWith('/shop') || pathname?.startsWith('/client');

  if (isPortal) return null;

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-xl py-4 shadow-sm border-b border-gray-200' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center cursor-pointer group">
          <AgnaaLogo className="w-auto h-8 md:h-10 hover:opacity-90 transition-opacity drop-shadow-[0_0_15px_rgba(123,45,191,0.2)]" />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10 font-bold text-sm tracking-wide">
          {navLinks.map(link => (
            <Link 
              key={link.id} 
              href={link.href}
              className={`transition-colors relative ${
                pathname === link.href 
                  ? (isDarkPage ? 'text-white' : 'text-[#1C1C72]') 
                  : (isDarkPage ? 'text-slate-300 hover:text-white' : 'text-gray-500 hover:text-[#7B2DBF]')
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span className={`absolute -bottom-2 left-0 w-full h-0.5 ${
                  isDarkPage 
                    ? 'bg-gradient-to-r from-purple-400 to-indigo-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]' 
                    : 'bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] shadow-[0_0_10px_rgba(123,45,191,0.5)]'
                } rounded-full`}></span>
              )}
            </Link>
          ))}
        </nav>
        
        {/* Desktop Single Action Pill Right Cluster */}
        <div className="hidden lg:flex items-center gap-6">
          <Link 
            href="/client" 
            className={`text-xs font-mono font-bold tracking-wider uppercase transition-colors ${
              pathname === '/client' 
                ? 'text-[#7B2DBF]' 
                : isDarkPage ? 'text-slate-300 hover:text-white' : 'text-gray-500 hover:text-[#1C1C72]'
            }`}
          >
            Client Portal
          </Link>

          <div className={`w-px h-5 ${isDarkPage ? 'bg-white/15' : 'bg-gray-200'}`}></div>

          <a 
            href="https://wa.me/918826214348?text=Hello%20Ar.%20Sridhar%20Chauhan,%20I%20would%20like%20to%20consult%20regarding%20an%20architectural%20commission." 
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] hover:opacity-95 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Phone size={14} className="text-purple-200" />
            <span>Consult Ar. Sridhar</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button aria-label="Toggle menu" className="lg:hidden text-[#1C1C72] hover:text-[#7B2DBF] transition-all p-2 -mr-2 bg-white/50 backdrop-blur-md rounded-full shadow-sm border border-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white animate-in fade-in duration-300">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/[0.06]">
              <AgnaaLogo className="h-8 w-auto" />
              <button aria-label="Close menu" className="p-2 -mr-2 text-[#1C1C72] bg-[#F8F9FA] rounded-full border border-black/[0.08]" onClick={() => setIsMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
              <div className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#5F6368]">Studio Navigation</div>
              <div className="flex flex-col gap-4">
                {navLinks.map(link => (
                  <Link 
                    key={link.id} 
                    href={link.href}
                    className={`text-xl font-bold tracking-tight transition-colors ${pathname === link.href ? 'text-[#7B2DBF]' : 'text-[#1C1C72] hover:text-[#7B2DBF]'}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              <div className="h-px w-full bg-black/[0.06] my-2"></div>
              
              <div className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#5F6368]">Engineering Systems</div>
              <Link 
                href="/calc"
                className={`text-lg font-bold tracking-tight flex items-center gap-3 ${pathname === '/calc' ? 'text-[#7B2DBF]' : 'text-[#1C1C72]'}`}
              >
                <Calculator size={20} className="text-[#2563EB]" /> AGNAA Calc & Engineering Engines
              </Link>
              
              <div className="mt-auto pt-6 flex flex-col gap-3 pb-6">
                <a 
                  href="https://wa.me/918826214348?text=Hello%20Ar.%20Sridhar%20Chauhan,%20I%20would%20like%20to%20consult%20regarding%20an%20architectural%20commission."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 text-sm font-semibold py-3.5 rounded-full bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] text-white shadow-sm"
                >
                  <Phone size={16} className="text-purple-200" /> Consult Ar. Sridhar
                </a>
                <Link 
                  href="/client" 
                  className="flex items-center justify-center py-3 rounded-full text-xs font-mono font-bold text-[#1C1C72] bg-[#F8F9FA] border border-black/[0.08]"
                >
                  Client Portal Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
