import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instant Construction Cost Estimator | AGNAA Hyderabad',
  description: 'Calculate realistic turnkey villa construction and architectural design fees for residential plots across Hyderabad with instant live BOQ breakdowns.',
  alternates: {
    canonical: 'https://agnaa.in/estimate',
  },
  openGraph: {
    title: 'Instant Construction Cost Estimator | AGNAA Hyderabad',
    description: 'Calculate realistic turnkey villa construction and architectural design fees for residential plots across Hyderabad with instant live BOQ breakdowns.',
    url: 'https://agnaa.in/estimate',
    siteName: 'AGNAA Design Studio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instant Construction Cost Estimator | AGNAA Hyderabad',
    description: 'Calculate realistic turnkey villa construction and architectural design fees across Hyderabad.',
  },
};

export default function EstimateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
