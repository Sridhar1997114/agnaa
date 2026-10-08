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
  title: "AGNAA Design Studio | Premier Architects & Turnkey Villa Constructions Hyderabad",
  description: "Founded by Ar. M. Sridhar Chauhan (SPA Delhi, India Rank #1). 114+ delivered masterworks across luxury villas, state civic corridors, and turnkey constructions in Financial District, Kokapet, and Jubilee Hills, Hyderabad.",
  metadataBase: new URL('https://agnaa.in'),
  keywords: [
    "Architects in Hyderabad",
    "Luxury Villa Architects Hyderabad",
    "Architects Financial District Hyderabad",
    "Turnkey Villa Construction Hyderabad",
    "Ar. M. Sridhar Chauhan",
    "SPA Delhi Architects Hyderabad",
    "Architects in Gachibowli",
    "Architects Kokapet",
    "GHMC Setback Rules",
    "NBC 2026 Architectural Standards",
    "Best Architecture Firms Hyderabad"
  ],
  alternates: {
    canonical: 'https://agnaa.in',
  },
  openGraph: {
    title: 'AGNAA Design Studio | Ar. M. Sridhar Chauhan (SPA Delhi)',
    description: 'Premier architectural firm & turnkey villa construction engine based in Financial District, Gachibowli, Hyderabad. 114+ delivered landmark projects.',
    url: 'https://agnaa.in',
    siteName: 'AGNAA Design Studio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGNAA Design Studio | Luxury Architects Hyderabad',
    description: 'Founded by Ar. M. Sridhar Chauhan (SPA Delhi). 114+ delivered projects across civic landmarks & private villas.',
  },
  other: {
    'geo.region': 'IN-TG',
    'geo.placename': 'Hyderabad, Financial District, Gachibowli',
    'geo.position': '17.4156;78.3478',
    'ICBM': '17.4156, 78.3478',
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
  '@type': ['LocalBusiness', 'ArchitecturalService', 'ProfessionalService'],
  '@id': 'https://agnaa.in/#localbusiness',
  name: 'AGNAA Design Studio & Constructions',
  image: 'https://agnaa.in/logo.png',
  url: 'https://agnaa.in',
  telephone: '+91-8826214348',
  email: 'sridhar.ar@agnaa.in',
  priceRange: '₹1,750 - ₹3,000+ per sq.ft',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '469 TNGOS Colony, Financial District, Gachibowli',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500032',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 17.4156,
    longitude: 78.3478,
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
    name: 'Ar. M. Sridhar Chauhan',
    jobTitle: 'Principal Architect & Founder',
    alumniOf: 'School of Planning and Architecture, New Delhi (SPA Delhi)',
  },
  areaServed: [
    'Hyderabad', 
    'Financial District', 
    'Gachibowli', 
    'Kokapet', 
    'Jubilee Hills', 
    'Banjara Hills', 
    'Tellapur', 
    'Manikonda', 
    'Mokila', 
    'Telangana'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AGNAA Architecture & Construction Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Luxury Residential & Villa Architecture',
          description: 'Contemporary villa design with bioclimatic principles, Deccan solar orientation, and bespoke spatial envelopes.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Turnkey Villa Construction (EPC)',
          description: 'Full-cycle residential construction with milestone escrow verification, M30/M35 RCC foundations, and ₹1,750–₹3,000+/sft transparent rates.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'GHMC & TG-bPASS Municipal Sanction Planning',
          description: '100% compliant building permission drawings harmonized with Telangana G.O. Ms. No. 168 and NBC 2026.'
        }
      }
    ]
  }
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
