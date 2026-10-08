import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Architectural Codex | NBC 2026 & Hyderabad Byelaw Library',
  description: 'Authoritative repository of 10,020 architectural questions covering NBC 2026, GHMC setbacks, Neufert ergonomics, and Deccan civil engineering.',
  alternates: {
    canonical: 'https://agnaa.in/codex',
  },
  openGraph: {
    title: 'Architectural Codex | NBC 2026 & Hyderabad Byelaw Library',
    description: 'Authoritative repository of 10,020 architectural questions covering NBC 2026, GHMC setbacks, Neufert ergonomics, and Deccan civil engineering.',
    url: 'https://agnaa.in/codex',
    siteName: 'AGNAA Design Studio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Architectural Codex | NBC 2026 & Hyderabad Byelaw Library',
    description: 'Authoritative library of 10,020 questions on NBC 2026, GHMC byelaws, and architectural engineering.',
  },
};

export default function CodexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
