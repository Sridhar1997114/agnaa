import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start Your Architectural Project | Feasibility Wizard',
  description: '4-step architectural feasibility wizard. Calculate municipal viability, setback envelopes, and construction budgets for Hyderabad plots.',
  alternates: {
    canonical: 'https://agnaa.in/start-project',
  },
  openGraph: {
    title: 'Start Your Architectural Project | Feasibility Wizard',
    description: '4-step architectural feasibility wizard. Calculate municipal viability, setback envelopes, and construction budgets for Hyderabad plots.',
    url: 'https://agnaa.in/start-project',
    siteName: 'AGNAA Design Studio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Start Your Architectural Project | Feasibility Wizard',
    description: '4-step architectural feasibility wizard for municipal viability and turnkey construction budgets.',
  },
};

export default function StartProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
