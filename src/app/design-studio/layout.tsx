import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design Studio & Portfolio | AGNAA Architects Hyderabad',
  description: 'Explore 114+ delivered luxury villa masterworks, heritage restoration, and bespoke interior joinery by Ar. M. Sridhar Chauhan (SPA Delhi).',
  alternates: {
    canonical: 'https://agnaa.in/design-studio',
  },
  openGraph: {
    title: 'Design Studio & Portfolio | AGNAA Architects Hyderabad',
    description: 'Explore 114+ delivered luxury villa masterworks, heritage restoration, and bespoke interior joinery by Ar. M. Sridhar Chauhan (SPA Delhi).',
    url: 'https://agnaa.in/design-studio',
    siteName: 'AGNAA Design Studio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design Studio & Portfolio | AGNAA Architects Hyderabad',
    description: 'Explore 114+ delivered luxury villa masterworks & bespoke interior joinery by Ar. M. Sridhar Chauhan (SPA Delhi).',
  },
};

export default function DesignStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
