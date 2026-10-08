import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AGNAA Foundation | Architectural Literacy & Heritage',
  description: 'Democratizing NBC 2026 building safety, advocating urban canopy cooling in Hyderabad, and archiving endangered vernacular Indian construction traditions.',
  alternates: {
    canonical: 'https://agnaa.in/foundation',
  },
  openGraph: {
    title: 'AGNAA Foundation | Architectural Literacy & Heritage',
    description: 'Democratizing NBC 2026 building safety, advocating urban canopy cooling in Hyderabad, and archiving endangered vernacular Indian construction traditions.',
    url: 'https://agnaa.in/foundation',
    siteName: 'AGNAA Design Studio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGNAA Foundation | Architectural Literacy & Heritage',
    description: 'Democratizing NBC 2026 building safety and advocating urban canopy cooling in Hyderabad.',
  },
};

export default function FoundationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
