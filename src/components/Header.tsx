"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Calculator } from 'lucide-react';
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

  const navLinks = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'portfolio', label: 'Portfolio', href: '/portfolio' },
    { id: 'design-studio', label: 'Design Studio', href: '/design-studio' },
    { id: 'constructions', label: 'Constructions', href: '/constructions' },
    { id: 'foundation', label: 'Foundation', href: '/foundation' }
  ];

  const currentId = navLinks.find(link => link.href === pathname)?.id || '';

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
            href="/cost" 
            className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center border border-transparent ${pathname === '/cost' ? 'bg-[#1C1C72] text-white shadow-[0_0_15px_rgba(123,45,191,0.4)] border-[#7B2DBF]' : 'text-gray-400 hover:text-[#7B2DBF] hover:shadow-[0_0_15px_rgba(123,45,191,0.2)] hover:border-[#7B2DBF]/30 bg-white'}`}
            title="Cost Calculator"
          >
            <Calculator size={20} strokeWidth={2} />
          </Link>
          <div className="w-px h-6 bg-gray-200"></div>
          <a href="https://wa.me/918826214348" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#7B2DBF] transition-colors">
            <Phone size={18} className="text-[#1C1C72]" /> +91-8826214348
          </a>
          <Button href="/start-project" variant="primary" className="py-2.5 px-6 text-sm">Start Project</Button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-[#1C1C72] hover:text-[#7B2DBF] transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-2xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          {navLinks.map(link => (
            <Link 
              key={link.id} 
              href={link.href}
              className={`text-left text-lg py-3 border-b border-gray-100 font-bold ${pathname === link.href ? 'text-[#7B2DBF]' : 'text-gray-500'}`}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href="/cost"
            className={`text-left text-lg py-3 border-b border-gray-100 font-bold flex items-center gap-3 ${pathname === '/cost' ? 'text-[#7B2DBF]' : 'text-gray-500'}`}
          >
            <Calculator size={20} /> Cost Calculator
          </Link>
          <div className="pt-6 flex flex-col gap-4">
            <a href="https://wa.me/918826214348" className="flex items-center justify-center gap-2 text-lg font-bold bg-[#F5F5F7] py-4 rounded-2xl text-[#1C1C72] border border-gray-200 hover:border-[#7B2DBF]/50 transition-all">
              <Phone size={20} className="text-[#1C1C72]" /> +91-8826214348
            </a>
            <Button href="/start-project" variant="primary" className="w-full py-4 text-lg">Start Project</Button>
          </div>
        </div>
      )}
    </header>
  );
};
