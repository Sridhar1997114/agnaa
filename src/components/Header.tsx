"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Calculator, Sparkles, FileText } from 'lucide-react';
import { AgnaaLogo } from './AgnaaLogo';
import { Button } from './Button';

export const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const getBaseURL = () => {
    if (typeof window === 'undefined') return 'https://agnaa.in';
    const host = window.location.host;
    if (host.includes('localhost')) {
      return `http://${host.replace(/^ai\./, '')}`;
    }
    return 'https://agnaa.in';
  };

  const baseURL = getBaseURL();

  const navLinks = [
    { id: 'home', label: 'Home', href: `${baseURL}/` },
    { id: 'portfolio', label: 'Portfolio', href: `${baseURL}/portfolio` },
    { id: 'design-studio', label: 'Design Studio', href: `${baseURL}/design-studio` },
    { id: 'constructions', label: 'Constructions', href: `${baseURL}/constructions` },
    { id: 'foundation', label: 'Foundation', href: `${baseURL}/foundation` }
  ];

  const getActiveLink = (links: typeof navLinks, currentPath: string) => {
    return links.find(link => {
      try {
        const url = new URL(link.href);
        return url.pathname === currentPath;
      } catch (e) {
        return link.href === currentPath;
      }
    })?.id || '';
  };

  const currentId = getActiveLink(navLinks, pathname || '/');

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
              className={`transition-colors relative ${pathname === link.href ? 'text-[#1C1C72]' : 'text-gray-500 hover:text-[#7B2DBF]'}`}
            >
              {link.label}
              {pathname === link.href && <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] shadow-[0_0_10px_rgba(123,45,191,0.5)] rounded-full"></span>}
            </Link>
          ))}
        </nav>
        
        <div className="hidden lg:flex items-center gap-6">
          <Link 
            href="https://ai.agnaa.in" 
            className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center border border-transparent relative group/ai ${pathname === '/agnaa-intelligence' || (typeof window !== 'undefined' && window.location.hostname === 'ai.agnaa.in') ? 'bg-[#7B2DBF] text-white shadow-[0_0_15px_rgba(123,45,191,0.4)] border-[#1C1C72]' : 'text-gray-400 hover:text-[#7B2DBF] hover:shadow-[0_0_15px_rgba(123,45,191,0.2)] hover:border-[#7B2DBF]/30 bg-white'}`}
            title="Agnaa Intelligence AI"
          >
            <Sparkles size={20} strokeWidth={2} className="group-hover/ai:animate-pulse" />
            <span className="absolute -top-1 -right-2 bg-[#7B2DBF] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-lg border border-white">NEW</span>
          </Link>
          <Link 
            href="/calc" 
            className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center border border-transparent ${pathname === '/calc' ? 'bg-[#1C1C72] text-white shadow-[0_0_15px_rgba(123,45,191,0.4)] border-[#7B2DBF]' : 'text-gray-400 hover:text-[#7B2DBF] hover:shadow-[0_0_15px_rgba(123,45,191,0.2)] hover:border-[#7B2DBF]/30 bg-white'}`}
            title="Agnaa Calc"
          >
            <Calculator size={20} strokeWidth={2} />
          </Link>
          <Link 
            href="/commercial/invoice" 
            className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center border border-transparent ${pathname === '/commercial/invoice' ? 'bg-[#7B2DBF] text-white shadow-[0_0_15px_rgba(123,45,191,0.4)] border-[#1C1C72]' : 'text-gray-400 hover:text-[#7B2DBF] hover:shadow-[0_0_15px_rgba(123,45,191,0.2)] hover:border-[#7B2DBF]/30 bg-white'}`}
            title="Create Service Invoice (Internal)"
          >
            <FileText size={20} strokeWidth={2} />
          </Link>
          <div className="w-px h-6 bg-gray-200"></div>
          <a href="https://wa.me/918826214348" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#7B2DBF] transition-colors">
            <Phone size={18} className="text-[#1C1C72]" /> +91-8826214348
          </a>
          <Button href="/start-project" variant="primary" className="py-2.5 px-6 text-sm">Start Project</Button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-[#1C1C72] hover:text-[#7B2DBF] transition-all p-2 -mr-2 bg-white/50 backdrop-blur-md rounded-full shadow-sm border border-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white animate-in fade-in duration-300">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <AgnaaLogo className="h-8 w-auto" />
              <button className="p-2 -mr-2 text-[#1C1C72] bg-[#F5F5F7] rounded-full" onClick={() => setIsMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Navigation Matrix</div>
              {navLinks.map(link => (
                <Link 
                  key={link.id} 
                  href={link.href}
                  className={`text-3xl font-black tracking-tighter transition-colors ${pathname === link.href ? 'text-[#7B2DBF]' : 'text-[#1C1C72] hover:text-[#7B2DBF]'}`}
                >
                  {link.label.toUpperCase()}
                </Link>
              ))}
              
              <div className="h-px w-full bg-gray-100 my-4"></div>
              
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Technical Portal</div>
              <Link 
                href="/calc"
                className={`text-2xl font-black tracking-tighter flex items-center gap-3 ${pathname === '/calc' ? 'text-[#7B2DBF]' : 'text-[#1C1C72]'}`}
              >
                <Calculator size={24} /> AGNAA CALC
              </Link>
              <Link 
                href="/commercial/invoice"
                className={`text-2xl font-black tracking-tighter flex items-center gap-3 ${pathname === '/commercial/invoice' ? 'text-[#7B2DBF]' : 'text-[#1C1C72]'}`}
              >
                <FileText size={24} /> CREATE INVOICE <span className="bg-[#1C1C72] text-white text-[10px] px-2 py-0.5 rounded-full font-black tracking-normal">INTERNAL</span>
              </Link>
              
              <div className="mt-auto pt-10 flex flex-col gap-4 pb-8">
                <a href="https://wa.me/918826214348" className="flex items-center justify-center gap-3 text-lg font-black bg-[#F5F5F7] py-5 rounded-2xl text-[#1C1C72] border border-gray-200">
                  <Phone size={20} className="text-[#1C1C72]" /> 8826214348
                </a>
                <Button href="/start-project" variant="primary" className="w-full py-5 text-lg shadow-[0_10px_30px_rgba(123,45,191,0.3)]">START PROJECT</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
