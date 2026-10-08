import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Turnkey Villa Construction Hyderabad | AGNAA Civil Works',
  description: 'Turnkey villa construction in Hyderabad from ₹1,750/sft. Strict NBC 2026, IS 456 RCC framing, and GHMC byelaw compliance led by Ar. Sridhar Chauhan.',
  alternates: {
    canonical: 'https://agnaa.in/constructions',
  },
  openGraph: {
    title: 'Turnkey Villa Construction Hyderabad | AGNAA Civil Works',
    description: 'Turnkey villa construction in Hyderabad from ₹1,750/sft. Strict NBC 2026, IS 456 RCC framing, and GHMC byelaw compliance led by Ar. Sridhar Chauhan.',
    url: 'https://agnaa.in/constructions',
    siteName: 'AGNAA Design Studio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turnkey Villa Construction Hyderabad | AGNAA Civil Works',
    description: 'Turnkey villa construction from ₹1,750/sft in Hyderabad with strict NBC 2026 and IS 456 compliance.',
  },
};

export default function ConstructionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
