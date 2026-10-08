import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '8 Free Construction & Architecture Calculators | AGNAA',
  description: 'Free precision calculators for GHMC setbacks, FAR/FSI permissible area, RCC slab concrete, TMT steel, AAC blocks, and turnkey interior costs.',
  alternates: {
    canonical: 'https://agnaa.in/calc',
  },
  openGraph: {
    title: '8 Free Construction & Architecture Calculators | AGNAA',
    description: 'Free precision calculators for GHMC setbacks, FAR/FSI permissible area, RCC slab concrete, TMT steel, AAC blocks, and turnkey interior costs.',
    url: 'https://agnaa.in/calc',
    siteName: 'AGNAA Design Studio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '8 Free Construction & Architecture Calculators | AGNAA',
    description: 'Free precision calculators for GHMC setbacks, RCC slab concrete, TMT steel, and turnkey interior costs.',
  },
};

export default function CalcLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
