"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { AgnaaLogo } from '../AgnaaLogo';

export const ShopNavbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/shop' },
    { label: 'Services', href: '/shop#services' },
    { label: 'How It Works', href: '/shop/how-it-works' },
    { label: 'FAQs', href: '/shop/faq' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-brand-dark/80 backdrop-blur-xl py-4 border-b border-brand-card/50 shadow-2xl' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo and Brand */}
        <Link href="/shop" className="flex items-center gap-4 group">
          <AgnaaLogo className="w-auto h-8 md:h-9 hover:opacity-90 transition-opacity" />
          <div className="flex flex-col">
            <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-white leading-none">
              AGNAA Shop
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-muted font-bold mt-1">
              by AGNAA Design Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link 
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide transition-all ${
                    pathname === link.href 
                      ? 'text-brand-violet' 
                      : 'text-brand-muted hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="w-px h-6 bg-brand-card mx-2"></div>
          
          <Link 
            href="/shop#services"
            className="flex items-center gap-2 bg-brand-violet hover:bg-brand-violet/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-brand-violet/20 hover:scale-105 active:scale-95"
          >
            <ShoppingBag size={16} />
            Order a Service
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-dark border-b border-brand-card p-6 animate-in fade-in slide-in-from-top-2">
          <ul className="flex flex-col gap-6 mb-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link 
                  href={link.href}
                  className="text-lg font-bold text-white block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link 
            href="/shop#services"
            className="flex items-center justify-center gap-2 bg-brand-violet text-white w-full py-4 rounded-xl font-bold text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            <ShoppingBag size={20} />
            Order a Service
          </Link>
        </div>
      )}
    </nav>
  );
};
