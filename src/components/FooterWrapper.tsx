"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

export function FooterWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal = 
    pathname?.startsWith('/app') || 
    pathname?.startsWith('/admin') || 
    pathname?.startsWith('/login') || 
    pathname?.startsWith('/shop') || 
    pathname?.startsWith('/client');

  if (isPortal) return null;

  return <>{children}</>;
}
