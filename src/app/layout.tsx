import type { Metadata } from "next";
import { Inter, Space_Grotesk, Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  variable: "--font-cormorant",
  weight: ["400", "700"],
  style: ["italic", "normal"]
});

export const metadata: Metadata = {
  title: "AGNAA Design Studio | Architect Hyderabad",
  description: "Hyderabad's premier architectural studio & construction engine. 114+ delivered projects across state landmarks, luxury villas, and commercial fitouts.",
  metadataBase: new URL('https://agnaa.in'),
  alternates: {
    canonical: 'https://agnaa.in',
  },
  openGraph: {
    title: 'AGNAA Design Studio | Design. Build. Soul.',
    description: 'Architect, Financial District, Gachibowli HYD | 114+ Projects Delivered',
    url: 'https://agnaa.in',
    siteName: 'AGNAA Design Studio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGNAA Design Studio | Architect Hyderabad',
    description: 'Architect, Financial District, Gachibowli HYD | 114+ Projects Delivered',
  },
};

export const viewport: import("next").Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// LocalBusiness & ArchitecturalFirm Comprehensive Schema
const jsonLdLocalBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://agnaa.in/#localbusiness',
  name: 'AGNAA Design Studio',
  image: 'https://agnaa.in/logo.png',
  url: 'https://agnaa.in',
  telephone: '+91-8826214348',
  email: 'sridhar.ar@agnaa.in',
  priceRange: '₹₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Financial District, Gachibowli',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500032',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 17.4401,
    longitude: 78.3489,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  sameAs: [
    'https://www.agnaa.in',
    'https://blog.agnaa.in',
    'https://www.facebook.com/agnaadesignstudio',
    'https://x.com/agnaastudio',
    'https://www.instagram.com/agnaa.in',
    'https://www.youtube.com/@agnaadesignstudio',
    'https://www.linkedin.com/company/agnaa',
  ],
  founder: {
    '@type': 'Person',
    name: 'M. Sridhar',
    jobTitle: 'Principal Architect & Founder',
    alumniOf: 'School of Planning and Architecture, New Delhi',
  },
  areaServed: ['Hyderabad', 'Gachibowli', 'Financial District', 'Jubilee Hills', 'Banjara Hills', 'Telangana'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-AGNAA2026';
  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '114000000000000';

  return (
    <html lang="en">
      <head>
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
        />

        {/* Google Analytics 4 (GA4) Tracking Script */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { page_path: window.location.pathname });
            `,
          }}
        />

        {/* Meta / Facebook Pixel Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${fbPixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${space.variable} ${outfit.variable} ${cormorant.variable} font-sans`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
