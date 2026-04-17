import React from 'react';
import { ShopNavbar } from '@/components/shop/ShopNavbar';
import { ShopFooter } from '@/components/shop/ShopFooter';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-brand-dark text-white min-h-screen font-sans selection:bg-brand-violet/30 selection:text-white">
      <ShopNavbar />
      <main className="pt-20">
        {children}
      </main>
      <ShopFooter />
    </div>
  );
}
