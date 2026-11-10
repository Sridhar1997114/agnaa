import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk, Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FooterWrapper } from "@/components/FooterWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "AGNAA | Architecture, Urban Design, Institutional & Turnkey Execution",
  description: "Directed by Ar. M. Sridhar Chauhan (SPA Delhi, CA/2023/161405). Comprehensive architectural practice, urban master planning, institutional campuses, high-density residential habitats & bespoke turnkey estates in Hyderabad.",
  metadataBase: new URL('https://agnaa.in'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  keywords: [
    "Architects in Hyderabad",
    "Urban Design Master Planning India",
    "Institutional Campus Architects",
    "Mass Housing & Habitat Architecture",
    "Luxury Villa Architects Hyderabad",
    "Architects Financial District Hyderabad",
    "Turnkey Architecture & Construction Hyderabad",
    "Ar. M. Sridhar Chauhan",
    "SPA Delhi Architects Hyderabad",
    "Architects in Gachibowli",
    "Architects Kokapet",
    "GHMC Setback Rules",
    "NBC 2026 Architectural Standards",
    "National Building Code Visualized",
    "Best Architecture Firms Hyderabad"
  ],
  alternates: {
    canonical: 'https://agnaa.in',
  },
  openGraph: {
    title: 'AGNAA | Architecture, Urban Design, Institutional & Turnkey Execution',
    description: 'Directed by Ar. M. Sridhar Chauhan (SPA Delhi, CA/2023/161405). Comprehensive architectural practice, urban master planning, institutional campuses, high-density residential habitats & bespoke turnkey estates across Hyderabad.',
    url: 'https://agnaa.in',
    siteName: 'AGNAA Design Studio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGNAA | Architecture, Urban Design, Institutional & Turnkey Execution',
    description: 'Directed by Ar. M. Sridhar Chauhan (SPA Delhi, CA/2023/161405). 114+ delivered masterworks spanning urban planning, institutional campuses & bespoke turnkey estates.',
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
    identifier: 'CA/2023/161405',
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'School of Planning and Architecture, New Delhi (SPA Delhi)',
      sameAs: 'https://en.wikipedia.org/wiki/School_of_Planning_and_Architecture,_New_Delhi',
    },
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
    name: 'AGNAA Architecture, Urban Design & Civil Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Urban Design & Territorial Master Planning',
          description: 'Regional master plans, industrial corridors, transit-oriented development, and ecological zoning envelopes under HMDA Master Plan 2031.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Institutional, Campus & Cultural Architecture',
          description: 'University campuses, research laboratories, civic assembly halls, and cultural heritage complexes meeting high-occupancy NBC Part 4 life safety standards.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'High-Density Housing & Mixed-Use Habitats',
          description: 'Multi-acre residential communities and high-rise apartment ensembles optimizing solar azimuth, natural cross-ventilation, and permissible FAR/FSI.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Bespoke Turnkey Residential Estates & Sanctuaries',
          description: 'Contemporary estate and villa design with bioclimatic principles, Deccan solar orientation, and COA Rule 33 Pure Agent zero-markup material escrow.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'The Visualized National Building Code (NBC 2026)',
          description: 'Illustrated vector companions and algorithmic calculators decoding complex statutory building codes for architects, engineers, and civic authorities.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Computational Architecture & On-Device AI Tools',
          description: 'AGNAA Voice v2.0 offline Whisper F8 CAD dictation and Checkpoint-250 LoRA reasoning engine for statutory byelaw and Ayadi Shadvarga calculations.'
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

      </head>
      <body className={`${inter.variable} ${space.variable} ${outfit.variable} ${spaceMono.variable} font-sans`}>
        {/* Google Analytics 4 (GA4) Tracking Script */}
        <Script
          id="google-analytics-tag"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', { page_path: window.location.pathname });
          `}
        </Script>

        {/* Meta / Facebook Pixel Script */}
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
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
          `}
        </Script>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </body>
    </html>
  );
}
