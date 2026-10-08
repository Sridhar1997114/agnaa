// ─────────────────────────────────────────────────────────────
// AGNAA INTERDISCIPLINARY DESIGN STUDIO — MASTER DATA REGISTRY
// Spatial Architecture • Software Systems • Bespoke Furniture • 3D Cinema
// Directed by Ar. Sridhar Chauhan (SPA Delhi, CA/2023/161405)
// ─────────────────────────────────────────────────────────────

export type DisciplineType = 
  | 'All Disciplines'
  | 'Spatial Architecture'
  | 'Software & Systems'
  | 'Bespoke Furniture'
  | '3D Cinema & Film'
  | 'Civic & Urbanism';

export interface StudioProject {
  id: string;
  title: string;
  clientOrContext: string;
  location: string;
  year: string;
  discipline: 'Spatial Architecture' | 'Software & Systems' | 'Bespoke Furniture' | '3D Cinema & Film' | 'Civic & Urbanism';
  type: string;
  category: 'Civic & State' | 'Residential' | 'Commercial' | 'Institutional' | 'Software & AI' | 'Real Estate & Media';
  scope: string;
  image?: string;
  isConfidential?: boolean;
  tag?: string;
  bentoSpan?: string;
  bentoHighlight?: string;
  isFlagship?: boolean;
  specs?: string[];
}

export interface DisciplinePillar {
  id: DisciplineType;
  title: string;
  subtitle: string;
  description: string;
  countBadge: string;
  standardsBadge: string;
  accentColor: string;
  gradient: string;
  iconName: string;
  keyDeliverables: string[];
}

export const DISCIPLINE_PILLARS: DisciplinePillar[] = [
  {
    id: 'Spatial Architecture',
    title: 'Spatial Architecture & Urbanism',
    subtitle: 'From Monumental Sanctions to Luxury Villas',
    description: 'State landmarks, 30-storey luxury residential towers, UNESCO buffer pavilions, and private luxury villas designed from first-principles physics and statutory rigor.',
    countBadge: '24+ Commissions',
    standardsBadge: 'NBC 2026 & GHMC Licensed',
    accentColor: '#1C1C72',
    gradient: 'from-[#1C1C72] to-[#2563EB]',
    iconName: 'Building2',
    keyDeliverables: [
      'Statutory Sanction Drawings (GHMC/HMDA/NBC)',
      'Structural Load-Path Coordination',
      'Micro-climate & Daylighting Engineering',
      'Turnkey Architecture & Construction Drawings'
    ]
  },
  {
    id: 'Software & Systems',
    title: 'Software Systems & Spatial UI/UX',
    subtitle: 'Code as Architectural Material',
    description: 'Proprietary speech synthesis AI, real-time client escrow portals, 12 structural engineering calculators, and GIS urban zoning engines built in modern TypeScript and Python.',
    countBadge: '4 Proprietary Engines',
    standardsBadge: 'Next.js 15 • Python • AI',
    accentColor: '#2563EB',
    gradient: 'from-[#2563EB] to-[#7B2DBF]',
    iconName: 'Code2',
    keyDeliverables: [
      'Agnaa Voice Spatial Speech Engine',
      'Client Milestone & Escrow Vault',
      '12 Structural & Cost Calculation Engines',
      'HMDA/GHMC GeoGIS Feasibility Engine'
    ]
  },
  {
    id: 'Bespoke Furniture',
    title: 'Bespoke Furniture & Joinery',
    subtitle: 'Machined Tactility & Spatial Objects',
    description: 'Hand-finished solid Burma teak joinery, custom machined architectural brass door hardware, fluted acoustic panelling, and bespoke luxury interior spaces.',
    countBadge: '12+ Suites Delivered',
    standardsBadge: '1:1 Precision Fabrication',
    accentColor: '#7B2DBF',
    gradient: 'from-[#7B2DBF] to-[#1C1C72]',
    iconName: 'Sparkles',
    keyDeliverables: [
      'Solid Hardwood Architectural Consoles',
      'Custom Machined Brass Spatial Hardware',
      'Fluted Acoustic Wall & Ceiling Systems',
      'Curated Penthouse & Villa Turnkey Interiors'
    ]
  },
  {
    id: '3D Cinema & Film',
    title: 'Computational Design & 3D Cinema',
    subtitle: 'Permanent Museum Loops & 4K Walkthroughs',
    description: 'Permanent UNESCO museum exhibit films, 100+ Unreal Engine 5 architectural cinematic walkthroughs, investor pitch films, and daylight radiation physics.',
    countBadge: '100+ Visualizations',
    standardsBadge: 'Unreal Engine 5 • 4K Cinema',
    accentColor: '#059669',
    gradient: 'from-[#059669] to-[#2563EB]',
    iconName: 'Film',
    keyDeliverables: [
      'Permanent UNESCO Museum Exhibit Loops',
      '4K Real-time Unreal Engine 5 Walkthroughs',
      'Solar Radiation & Atmospheric Daylighting',
      'High-Impact Investor & State Pitch Films'
    ]
  }
];

// ── 12 FLAGSHIP BENTO SHOWCASES (ACROSS ALL 4 DISCIPLINES) ──
export const BENTO_SHOWCASES: StudioProject[] = [
  {
    id: 'nizamuddin-dargah-aga-khan',
    title: 'Nizamuddin Dargah Heritage Exhibit Film',
    clientOrContext: 'Aga Khan Trust for Culture (AKTC)',
    location: "Humayun's Tomb Museum, Delhi",
    year: '2021 – Present',
    discipline: '3D Cinema & Film',
    type: '3D Cinema & Video',
    category: 'Civic & State',
    scope: 'Permanent daily loop museum exhibit film & cultural documentation.',
    image: '/projects/nizamuddin-aktc-heritage.webp',
    isConfidential: true,
    tag: 'UNESCO World Heritage',
    bentoSpan: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-2',
    bentoHighlight: 'Permanent Daily Loop Inside Humayun\'s Tomb Museum',
    specs: ['Permanent museum installation', 'Historical accuracy 3D model', 'Atmospheric volumetric lighting', 'Archival cultural audio sync']
  },
  {
    id: 'marvella-luxury-tower',
    title: 'Marvella 30-Storey Luxury Residential Tower',
    clientOrContext: 'Marvella Living / Manila Visuals',
    location: 'High-Density Luxury Sector',
    year: '2023 – 2024',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Residential',
    scope: '30-floor iconic tower, cantilevered aerodynamic balconies & sky lounge.',
    image: '/projects/manila/marvella-luxury-residences-tower.webp',
    isConfidential: true,
    tag: '30-Storey Tower',
    bentoSpan: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-2',
    bentoHighlight: 'Aerodynamic Cantilever Balconies',
    specs: ['30-Floor aerodynamic envelope', 'Wind-shear analysis balustrades', 'Sky lounge infinity cantilever', 'High-speed elevator core']
  },
  {
    id: 'agnaa-voice-ai-engine',
    title: 'Agnaa Voice AI & Speech Synthesis Engine',
    clientOrContext: 'AGNAA Spatial Technology',
    location: 'Autonomous Cloud & Local Edge',
    year: '2024 – 2026',
    discipline: 'Software & Systems',
    type: 'Software & UI/UX',
    category: 'Software & AI',
    scope: 'Proprietary speech synthesis AI and autonomous spatial voice dispatch engine.',
    image: '/projects/manila/curated-luxury-residence-living-interior.webp',
    isConfidential: false,
    tag: 'Proprietary AI Engine',
    bentoSpan: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1',
    bentoHighlight: 'Sub-200ms Spatial Voice AI',
    specs: ['Local offline model inference', 'Sub-200ms latency speech pipeline', 'Voice-to-blueprint dispatch', 'Next.js 15 Web Audio integration']
  },
  {
    id: 'sunder-nursery-garden-house',
    title: 'Sunder Nursery Ecological Garden House',
    clientOrContext: 'AKTC Buffer / Manila Visuals',
    location: 'Sunder Nursery Park, Delhi',
    year: '2021 – 2023',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Civic & State',
    scope: 'Ecological heritage glass pavilion & botanical conservatory buffer.',
    image: '/projects/manila/sunder-nursery-garden-house.webp',
    isConfidential: true,
    tag: 'UNESCO Buffer',
    bentoSpan: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1',
    bentoHighlight: 'Ecological Glass Conservatory',
    specs: ['Thermally broken steel glass framing', 'Passive solar ventilation chimneys', 'Heritage buffer zone compliance', 'Native flora integration']
  },
  {
    id: 'curated-penthouse-interior',
    title: 'French Oak Joinery & Fluted Brass Suite',
    clientOrContext: 'Private Penthouse / Manila Visuals',
    location: 'Metropolitan Penthouse',
    year: '2023 – 2024',
    discipline: 'Bespoke Furniture',
    type: 'Turnkey Interior',
    category: 'Residential',
    scope: 'Fluted brass chandelier, French oak joinery, custom oriental mural & marble floors.',
    image: '/projects/manila/curated-luxury-residence-living-interior.webp',
    isConfidential: true,
    tag: 'Bespoke Joinery Suite',
    bentoSpan: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1',
    bentoHighlight: 'Hand-Finished French Oak & Brass',
    specs: ['Quarter-sawn white oak millwork', 'Hand-brushed natural brass trims', 'Acoustic fluted backing', 'Concealed Blum motion hardware']
  },
  {
    id: 'balinese-resort-villa',
    title: 'Balinese Tropical Luxury Resort Villa & Pavilion',
    clientOrContext: 'Private Resort Developer / Manila Visuals',
    location: 'Eco-Resort Belt',
    year: '2023 – 2024',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Residential',
    scope: 'Thatched-roof Balinese architecture, infinity reflection pool & living pavilion.',
    image: '/projects/manila/balinese-luxury-resort-villa-exterior.webp',
    isConfidential: true,
    tag: 'Tropical Luxury',
    bentoSpan: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1',
    bentoHighlight: 'Infinity Reflection Waterscape',
    specs: ['Open-air living pavilions', 'Black basalt stone infinity pool', 'Alang-alang thatched roof geometry', 'Cross-ventilation tropical bioclimatic']
  },
  {
    id: 'agnaa-client-escrow-portal',
    title: 'Client Milestone Escrow & Live-Cam Portal',
    clientOrContext: 'AGNAA Engineering Engine',
    location: 'Financial District, Hyderabad',
    year: '2024 – 2026',
    discipline: 'Software & Systems',
    type: 'Software & UI/UX',
    category: 'Software & AI',
    scope: 'Client portal with milestone escrow releases, live site camera feeds & automatic bills.',
    image: '/projects/gachibowli-tngos-facade.webp',
    isConfidential: false,
    tag: 'Client Escrow Vault',
    bentoSpan: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1',
    bentoHighlight: 'Zero-Trust Milestone Escrow',
    specs: ['Automated milestone escrow release', 'Live RTSP site camera proxy', 'GST compliant automated invoicing', 'Direct Ar. Sridhar chat dispatch']
  },
  {
    id: 'aiims-safdarjung-delhi',
    title: 'AIIMS Safdarjung Apex Healthcare Complex',
    clientOrContext: 'Ministry of Health / Manila Visuals',
    location: 'Safdarjung, New Delhi',
    year: '2021 – 2022',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Institutional',
    scope: 'Multi-block tertiary healthcare campus & trauma emergency wing.',
    image: '/projects/manila/aiims-safdarjung.webp',
    isConfidential: true,
    tag: 'Apex Healthcare',
    bentoSpan: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1',
    bentoHighlight: 'Tertiary Medical Center',
    specs: ['Tertiary trauma wing logistics', 'Negative pressure isolation wards', 'Sterile corridor circulation loops', 'Mass casualty triage ramp']
  },
  {
    id: 'yadagirigutta-telangana-cm',
    title: 'Yadagirigutta Sacred Temple Corridor Masterplan',
    clientOrContext: "Hon'ble Chief Minister of Telangana / YTDA",
    location: 'Yadagirigutta, Telangana',
    year: '2020 – 2021',
    discipline: 'Civic & Urbanism',
    type: 'Urban Masterplan',
    category: 'Civic & State',
    scope: 'Sacred urban masterplan, hilltown pedestrian concourse & 4K reel.',
    image: '/projects/yadagirigutta-temple-hilltown.webp',
    isConfidential: true,
    tag: 'Sacred Masterplan',
    bentoSpan: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1',
    bentoHighlight: 'Chief Minister Sanction',
    specs: ['Pedestrian concourse capacity 100,000/day', 'Vedic spatial geometry alignment', 'Hilltown contour terracing', 'Shaded pilgrimage colonnades']
  },
  {
    id: 'sculptural-stair-atrium',
    title: 'Sculptural Teak Staircase Atrium & Zen Garden',
    clientOrContext: 'Private Villa / Manila Visuals',
    location: 'Luxury Villa Enclave',
    year: '2023',
    discipline: 'Bespoke Furniture',
    type: 'Turnkey Interior',
    category: 'Residential',
    scope: 'Cantilevered treads, frameless glass balustrade, river pebble bed & bronze sculpture.',
    image: '/projects/manila/double-height-sculptural-atrium-lobby.webp',
    isConfidential: true,
    tag: 'Sculptural Atrium',
    bentoSpan: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1',
    bentoHighlight: 'Solid Teak Floating Cantilever',
    specs: ['Hand-selected solid Burma teak treads', 'Hidden internal steel box-girder', 'Low-iron optical glass balustrade', 'Zen river pebble reflecting bed']
  },
  {
    id: 'siri-construction-pitch-films',
    title: '100+ Architectural Films & Spatial Visualizers',
    clientOrContext: 'Siri Construction & Manila Visuals Collaborative',
    location: 'National & Regional',
    year: '2020 – 2026',
    discipline: '3D Cinema & Film',
    type: '3D Cinema & Video',
    category: 'Real Estate & Media',
    scope: 'High-impact 3D architectural walkthroughs, pitch films & investor reels.',
    image: '/projects/siri-construction-pitch.webp',
    isConfidential: true,
    tag: '100+ Video Films',
    bentoSpan: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1',
    bentoHighlight: '100+ Cinematic 3D Investor Walkthroughs',
    specs: ['Unreal Engine 5 Lumen raytracing', 'Physically accurate camera focal lengths', 'Custom architectural sound design', '4K 60fps master deliverables']
  }
];

// ── MASTER ARCHITECTURAL & SYSTEMS LEDGER (ALL 52+ VERIFIED COMMISSIONS) ──
export const MASTER_STUDIO_REGISTRY: StudioProject[] = [
  // ── SOFTWARE SYSTEMS & SPATIAL UI/UX ──
  {
    id: 'agnaa-voice-ai-engine',
    title: 'Agnaa Voice AI & Speech Synthesis Engine',
    clientOrContext: 'AGNAA Spatial Technology',
    location: 'Autonomous Cloud & Local Edge',
    year: '2024 – 2026',
    discipline: 'Software & Systems',
    type: 'Software & UI/UX',
    category: 'Software & AI',
    scope: 'Speech synthesis AI and autonomous spatial voice dispatch engine.',
    image: '/projects/manila/curated-luxury-residence-living-interior.webp',
    tag: 'Proprietary AI Engine',
    specs: ['Local offline model inference', 'Sub-200ms latency', 'Voice-to-blueprint dispatch']
  },
  {
    id: 'agnaa-client-escrow-portal',
    title: 'Client Milestone Escrow & Live-Cam Vault',
    clientOrContext: 'AGNAA Engineering Engine',
    location: 'Financial District, Hyderabad',
    year: '2024 – 2026',
    discipline: 'Software & Systems',
    type: 'Software & UI/UX',
    category: 'Software & AI',
    scope: 'Client portal with milestone escrow releases, live site camera feeds & automatic bills.',
    image: '/projects/gachibowli-tngos-facade.webp',
    tag: 'Client Escrow Vault',
    specs: ['Automated milestone escrow release', 'Live RTSP site camera proxy', 'GST compliant automated invoicing']
  },
  {
    id: 'agnaa-engineering-calculators',
    title: '12 NBC 2026 & GHMC Architectural Calculation Engines',
    clientOrContext: 'Open Architectural Toolkit',
    location: 'Web & API',
    year: '2023 – 2026',
    discipline: 'Software & Systems',
    type: 'Software & UI/UX',
    category: 'Software & AI',
    scope: 'Instant FSI, Setback Envelope, RCC Steel Tonnage, Vastu Geometry & Villa Cost calculation suite.',
    tag: 'Engineering Calc Suite',
    specs: ['NBC 2026 compliance', 'GHMC bylaw verification', 'Export stamped PDF', 'Client-side calculation']
  },
  {
    id: 'agnaa-geogis-engine',
    title: 'Hyderabad Architectural GeoGIS & Zoning Map Engine',
    clientOrContext: 'HMDA & GHMC Zoning Data',
    location: 'Hyderabad Metropolitan Region',
    year: '2024 – 2026',
    discipline: 'Software & Systems',
    type: 'Software & UI/UX',
    category: 'Software & AI',
    scope: 'Real-time HMDA 2031 & GHMC zoning rules, road-width FSI calculators, plot coordinate feasibility.',
    tag: 'GeoGIS Engine',
    specs: ['HMDA Master Plan 2031 layers', 'Real-time FSI calculator', 'Survey coordinate mapper']
  },

  // ── BESPOKE FURNITURE & JOINERY ──
  {
    id: 'curated-penthouse-interior',
    title: 'Curated French Oak Joinery & Fluted Brass Suite',
    clientOrContext: 'Private Penthouse / Manila Visuals',
    location: 'Metropolitan Penthouse',
    year: '2023 – 2024',
    discipline: 'Bespoke Furniture',
    type: 'Turnkey Interior',
    category: 'Residential',
    scope: 'Fluted Brass Chandelier, Custom Oriental Mural Art, French Oak Joinery & Marble Floors',
    image: '/projects/manila/curated-luxury-residence-living-interior.webp',
    isConfidential: true,
    tag: 'Luxury Penthouse Suite'
  },
  {
    id: 'sculptural-stair-atrium',
    title: 'Double-Height Sculptural Teak Staircase Atrium',
    clientOrContext: 'Private Villa / Manila Visuals',
    location: 'Luxury Villa Enclave',
    year: '2023',
    discipline: 'Bespoke Furniture',
    type: 'Turnkey Interior',
    category: 'Residential',
    scope: 'Cantilevered Treads, Frameless Glass Balustrade, River Pebble Bed & Bronze Sculpture',
    image: '/projects/manila/double-height-sculptural-atrium-lobby.webp',
    isConfidential: true,
    tag: 'Sculptural Atrium'
  },
  {
    id: 'tausif-daycare-interiors',
    title: 'Tausif Child Development & Sensory Playzone Interiors',
    clientOrContext: 'Institutional Client Tausif',
    location: 'Hyderabad',
    year: '2024',
    discipline: 'Bespoke Furniture',
    type: 'Turnkey Interior',
    category: 'Institutional',
    scope: '30+ Enscape Interior Scenes, Reception, Interactive Sensory Zones & Acoustic Seating',
    image: '/projects/tausif-daycare-playzone.webp',
    isConfidential: true,
    tag: '30+ Enscape Scenes'
  },
  {
    id: 'sai-koushik-apartment-interiors',
    title: 'Sai Koushik Turnkey Luxury Apartment Interiors',
    clientOrContext: 'Sai Koushik',
    location: 'Hyderabad',
    year: '2023 – 2024',
    discipline: 'Bespoke Furniture',
    type: 'Turnkey Interior',
    category: 'Residential',
    scope: 'Biophilic Living Room, Turnkey Woodwork & Acoustic False Ceiling',
    image: '/projects/sai-apartment-interior.webp',
    tag: 'Turnkey Interiors'
  },
  {
    id: 'sai-koushik-terrace-deck',
    title: 'Penthouse Biophilic Skydeck & Terrace Pergola',
    clientOrContext: 'Sai Koushik',
    location: 'Hyderabad',
    year: '2023 – 2024',
    discipline: 'Bespoke Furniture',
    type: 'Turnkey Interior',
    category: 'Residential',
    scope: 'Pergola Skydeck, Green Planters, Ambient Deck Lighting & Outdoor Lounge',
    image: '/projects/sai-terrace-deck.webp',
    tag: 'Rooftop Skydeck'
  },

  // ── 3D CINEMA & VISUAL SIMULATION ──
  {
    id: 'nizamuddin-dargah-aga-khan',
    title: 'Nizamuddin Dargah Heritage & Museum Exhibit Film',
    clientOrContext: 'Aga Khan Trust for Culture (AKTC)',
    location: "Humayun's Tomb Museum, Delhi",
    year: '2021 – Present',
    discipline: '3D Cinema & Film',
    type: '3D Cinema & Video',
    category: 'Civic & State',
    scope: 'Permanent Daily Loop Museum Exhibit Film & Cultural Documentation',
    image: '/projects/nizamuddin-aktc-heritage.webp',
    isConfidential: true,
    tag: 'UNESCO World Heritage'
  },
  {
    id: 'siri-construction-pitch-films',
    title: '100+ Architectural Films & Spatial Visualizers',
    clientOrContext: 'Siri Construction & Manila Visuals Collaborative',
    location: 'National & Regional',
    year: '2020 – 2026',
    discipline: '3D Cinema & Film',
    type: '3D Cinema & Video',
    category: 'Real Estate & Media',
    scope: 'High-Impact 3D Architectural Walkthroughs, Pitch Films & Investor Reels',
    image: '/projects/siri-construction-pitch.webp',
    isConfidential: true,
    tag: '100+ Video Films'
  },
  {
    id: 'olympic-sports-complex-aerial',
    title: 'Olympic Sports Complex Master Aerial Concourse',
    clientOrContext: 'Sports Infrastructure Council',
    location: 'Regional Sports City',
    year: '2022 – 2024',
    discipline: '3D Cinema & Film',
    type: 'Urban Masterplan',
    category: 'Civic & State',
    scope: 'Masterplan Aerial Spatial Integration, Transit Plazas & Athletic Track Circulation',
    image: '/projects/manila/olympic-sports-complex-aerial.webp',
    isConfidential: true,
    tag: 'Athletic Masterplan'
  },

  // ── CIVIC & STATE LANDMARKS ──
  {
    id: 'patiala-heritage-punjab-cm',
    title: 'Patiala Heritage & Urban Corridor Revitalization',
    clientOrContext: "Hon'ble Chief Minister of Punjab",
    location: 'Patiala, Punjab',
    year: '2020 – 2021',
    discipline: 'Civic & Urbanism',
    type: 'Urban Masterplan',
    category: 'Civic & State',
    scope: 'State Urban Masterplan & Heritage Revitalization (Official Government Work Order)',
    image: '/projects/patiala-work-order.webp',
    isConfidential: true,
    tag: 'Official Govt Order'
  },
  {
    id: 'yadagirigutta-telangana-cm',
    title: 'Yadagirigutta Sacred Temple Corridor Masterplan',
    clientOrContext: "Hon'ble Chief Minister of Telangana / YTDA",
    location: 'Yadagirigutta, Telangana',
    year: '2020 – 2021',
    discipline: 'Civic & Urbanism',
    type: 'Urban Masterplan',
    category: 'Civic & State',
    scope: 'Sacred Urban Masterplan, Hilltown Pedestrian Concourse & 4K Visualization',
    image: '/projects/yadagirigutta-temple-hilltown.webp',
    isConfidential: true,
    tag: 'Sacred Masterplan'
  },
  {
    id: 'sunder-nursery-garden-house',
    title: 'Sunder Nursery Ecological Garden House & Pavilion',
    clientOrContext: 'Aga Khan Heritage Buffer / Manila Visuals',
    location: 'Sunder Nursery Heritage Park, Delhi',
    year: '2021 – 2023',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Civic & State',
    scope: 'Ecological Heritage Glass Pavilion, Conservatory Framing & Botanical Buffer',
    image: '/projects/manila/sunder-nursery-garden-house.webp',
    isConfidential: true,
    tag: 'UNESCO Buffer'
  },
  {
    id: 'iccc-smart-city-centre',
    title: 'Integrated Command & Control Centre (ICCC)',
    clientOrContext: 'Smart Cities Mission / Manila Visuals',
    location: 'Smart City Metro Hub',
    year: '2022 – 2023',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Civic & State',
    scope: 'High-Security Central Operations Facility, Kinetic Louvered Facade & Civic Plaza',
    image: '/projects/manila/iccc-smart-city-centre.webp',
    isConfidential: true,
    tag: 'Smart City Operations'
  },
  {
    id: 'national-academy-archery',
    title: 'National Academy of Archery & Sports Arena',
    clientOrContext: 'National Sports Council / Manila Visuals',
    location: 'National Sports Complex',
    year: '2022 – 2023',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Civic & State',
    scope: 'Olympic-Standard Archery Training Arena, Tensile Canopy & Spectator Seating',
    image: '/projects/manila/national-academy-archery.webp',
    isConfidential: true,
    tag: 'Olympic Academy'
  },
  {
    id: 'olympic-sports-complex-stadium',
    title: 'Olympic Sports Complex & 40,000-Seat Stadium',
    clientOrContext: 'State Sports Authority / Manila Visuals',
    location: 'Regional Sports City',
    year: '2022 – 2024',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Civic & State',
    scope: '40,000-Seat Multi-Sport Stadium, Atmospheric Floodlit Concourses & Arena Facade',
    image: '/projects/manila/olympic-sports-stadium-facade.webp',
    isConfidential: true,
    tag: 'Olympic Arena'
  },
  {
    id: 'thub-incubation-campus',
    title: 'T-Hub Phase II Incubation Center & Campus',
    clientOrContext: 'Telangana Tech & Innovation Hub',
    location: 'Raidurg, Hyderabad',
    year: '2020 – 2022',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Civic & State',
    scope: 'Fractal Menger Sponge Massing & Stepped Terraced Floor Plates',
    image: '/projects/thub-perspective.webp',
    isConfidential: true,
    tag: 'Innovation Hub'
  },
  {
    id: 'bihar-sharif-flyover',
    title: 'Flyover Bihar Sharif & Civic Infrastructure Alignment',
    clientOrContext: 'Bihar State Government',
    location: 'Bihar',
    year: '2020 – 2021',
    discipline: 'Civic & Urbanism',
    type: 'Urban Masterplan',
    category: 'Civic & State',
    scope: 'Civic Infrastructure, Flyover Alignment & Urban Housing Developments',
    image: '/projects/bihar-sharif-flyover.webp',
    isConfidential: true,
    tag: 'Civic Infrastructure'
  },
  {
    id: 'aramaisamma-temple',
    title: 'Aramaisamma Sacred Temple Shrine & Vimana Gopuram',
    clientOrContext: 'Temple Trust & Community',
    location: 'Telangana',
    year: '2021',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Civic & State',
    scope: 'Sacred Vimana Gopuram Proportions, Dravidian Geometry & Sanctum Enclosure',
    image: '/projects/aramaisamma-temple-axonometric.webp',
    tag: 'Sacred Shrine'
  },

  // ── RESIDENTIAL & LUXURY VILLAS ──
  {
    id: 'marvella-luxury-tower',
    title: 'Marvella 30-Storey Luxury Residential Tower',
    clientOrContext: 'Marvella Living / Manila Visuals',
    location: 'High-Density Luxury Sector',
    year: '2023 – 2024',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Residential',
    scope: '30-Floor Iconic Tower, Cantilevered Aerodynamic Balconies & Sky Lounge',
    image: '/projects/manila/marvella-luxury-residences-tower.webp',
    isConfidential: true,
    tag: '30-Storey Tower'
  },
  {
    id: 'balinese-resort-villa',
    title: 'Balinese Tropical Luxury Resort Villa & Pavilion',
    clientOrContext: 'Private Resort Developer / Manila Visuals',
    location: 'Eco-Resort Belt',
    year: '2023 – 2024',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Residential',
    scope: 'Thatched-Roof Balinese Architecture, Infinity Reflection Pool & Living Pavilion',
    image: '/projects/manila/balinese-luxury-resort-villa-exterior.webp',
    isConfidential: true,
    tag: 'Tropical Luxury'
  },
  {
    id: 'gachibowli-residence',
    title: 'TNGOs Colony Commercial-Residential Complex',
    clientOrContext: 'AGNAA Built Execution',
    location: 'Gachibowli, Hyderabad',
    year: '2021 – 2024',
    discipline: 'Spatial Architecture',
    type: 'Built Execution',
    category: 'Residential',
    scope: '8,100 Sq. Ft G+3+Penthouse Built Execution Complex with Ground Retail',
    image: '/projects/gachibowli-tngos-facade.webp',
    isConfidential: true,
    tag: 'Built Execution'
  },
  {
    id: 'bandlaguda-jagir-villa',
    title: 'Bandlaguda Jagir G+2 Triplex Luxury Villa',
    clientOrContext: 'High-Net-Worth Private Client',
    location: 'Bandlaguda Jagir, Hyderabad',
    year: '2022 – 2023',
    discipline: 'Spatial Architecture',
    type: 'Statutory Sanction',
    category: 'Residential',
    scope: '3,800 Sq. Ft Triplex Luxury Villa with GHMC Online Building Approval',
    image: '/projects/bandlaguda-villa.webp',
    tag: 'Triplex Villa'
  },
  {
    id: 'nagole-luxury-residence',
    title: 'Nagole G+2 Independent Modern Residence',
    clientOrContext: 'Private Family Commission',
    location: 'Nagole, Hyderabad',
    year: '2021 – 2022',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Residential',
    scope: '3,200 Sq. Ft Contemporary Elevation, Double-Height Living & GHMC Sanction',
    image: '/projects/nagole-residence.webp',
    tag: 'Private Residence'
  },
  {
    id: 'alwal-g2-residence',
    title: 'Alwal G+2 Contemporary Family Villa',
    clientOrContext: 'Private Client Commission',
    location: 'Alwal, Secunderabad',
    year: '2022 – 2023',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Residential',
    scope: '3,450 Sq. Ft Multi-Generational Villa with Cantilevered Balconies & Terraces',
    image: '/projects/alwal-g2-residence.webp',
    tag: 'Family Villa'
  },
  {
    id: 'kollur-villa-enclave',
    title: 'Kollur Gated Luxury Villa & Farmhouse Estate',
    clientOrContext: 'Private Developer / Manila Visuals',
    location: 'Kollur ORR Growth Corridor, Hyderabad',
    year: '2023 – 2024',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Residential',
    scope: '5,200 Sq. Ft Ultra-Luxury Contemporary Villa, Plunge Pool & Louvered Pergolas',
    image: '/projects/kollur-villa-enclave.webp',
    isConfidential: true,
    tag: 'Luxury Estate'
  },
  {
    id: 'peerzadiguda-residence',
    title: 'Peerzadiguda G+2 Dual-Unit Residential Villa',
    clientOrContext: 'Private Client Commission',
    location: 'Peerzadiguda, Hyderabad',
    year: '2022 – 2023',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Residential',
    scope: '2,900 Sq. Ft Dual-Unit Urban Home with Integrated Rental Stilt Parking',
    image: '/projects/peerzadiguda-residence.webp',
    tag: 'Urban Home'
  },
  {
    id: 'ramanthapur-g3-apartments',
    title: 'Ramanthapur G+3 Boutique Residential Apartments',
    clientOrContext: 'Boutique Developer',
    location: 'Ramanthapur, Hyderabad',
    year: '2021 – 2023',
    discipline: 'Spatial Architecture',
    type: 'Built Execution',
    category: 'Residential',
    scope: '5,600 Sq. Ft Stilt+3 Multi-Family Apartment Building & Statutory Approvals',
    image: '/projects/ramanthapur-apartments.webp',
    tag: 'Boutique Apartments'
  },
  {
    id: 'tellapur-eco-villa',
    title: 'Tellapur Biophilic Courtyard Residence',
    clientOrContext: 'Private Villa Commission',
    location: 'Tellapur, Hyderabad',
    year: '2023 – 2024',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Residential',
    scope: '4,400 Sq. Ft Central Courtyard Villa with Exposed Brick & Microclimate Shading',
    image: '/projects/tellapur-eco-villa.webp',
    isConfidential: true,
    tag: 'Courtyard Villa'
  },
  {
    id: 'kokapet-neopolis-penthouse',
    title: 'Kokapet Neopolis High-Rise Luxury Penthouse',
    clientOrContext: 'HNW Private Owner',
    location: 'Kokapet Neopolis, Hyderabad',
    year: '2024',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Residential',
    scope: '6,200 Sq. Ft Panoramic Sky-Villa Interior Architectural Design & Wrap Balconies',
    image: '/projects/kokapet-penthouse.webp',
    isConfidential: true,
    tag: 'Sky Villa'
  },
  {
    id: 'attapur-g3-residence',
    title: 'Attapur G+3 Stilt-Floor Urban Residence',
    clientOrContext: 'Private Commission',
    location: 'Attapur, Hyderabad',
    year: '2022',
    discipline: 'Spatial Architecture',
    type: 'Statutory Sanction',
    category: 'Residential',
    scope: '4,100 Sq. Ft Urban Building, Structural Design & GHMC Sanction File',
    image: '/projects/attapur-residence.webp',
    tag: 'Stilt Residence'
  },
  {
    id: 'tanda-home-circle',
    title: 'Tanda Cylindrical Signature Villa Elevation',
    clientOrContext: 'Private Commission',
    location: 'Telangana',
    year: '2022',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Residential',
    scope: 'Modern Residence Elevation with Signature Cylindrical Concrete Column',
    image: '/projects/tanda-home-circle.webp',
    tag: 'Contemporary Home'
  },
  {
    id: 'modernist-brick-apartments',
    title: 'Modernist Brick Urban Residences (G+4 Stilt+4)',
    clientOrContext: 'Housing Consortium / Manila Visuals',
    location: 'Metro Residential Sector',
    year: '2022 – 2023',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Residential',
    scope: 'Stilt+4 Premium Urban Apartments, Wirecut Brick Pilasters & Cantilevered Balconies',
    image: '/projects/manila/modernist-brick-urban-residences.webp',
    isConfidential: true,
    tag: 'Boutique Apartments'
  },
  {
    id: 'boutique-residential-apartments',
    title: 'Boutique Terraced Residential Living (G+4)',
    clientOrContext: 'Residential Developer / Manila Visuals',
    location: 'Urban Living Sector',
    year: '2023',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Residential',
    scope: 'Multi-Tier Balconied Urban Residences, Textured Terracotta Brick & Corner Planters',
    image: '/projects/manila/modern-boutique-residential-apartments.webp',
    isConfidential: true,
    tag: 'Terraced Living'
  },

  // ── COMMERCIAL & CORPORATE HEADQUARTERS ──
  {
    id: 'big-red-group-hq',
    title: 'Big Red Group Commercial Corporate Headquarters',
    clientOrContext: 'Big Red Group / Manila Visuals',
    location: 'Prime Business District',
    year: '2023 – 2024',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Commercial',
    scope: 'Grade-A Corporate HQ, Double-Height Glazed Atrium & Landscaped Executive Rooftop',
    image: '/projects/manila/big-red-group-commercial-hq.webp',
    isConfidential: true,
    tag: 'Corporate HQ'
  },
  {
    id: 'commercial-tech-tower',
    title: 'Financial District Grade-A Commercial Tower (G+12)',
    clientOrContext: 'Commercial Developer / Manila Visuals',
    location: 'Financial District, Hyderabad',
    year: '2023 – 2024',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Commercial',
    scope: 'High-Efficiency Floor Plates, Double-Glazed Curtain Wall & IGBC Platinum Target',
    image: '/projects/commercial-tech-tower.webp',
    isConfidential: true,
    tag: 'Grade-A Tech Park'
  },
  {
    id: 'hitec-city-retail-hub',
    title: 'HITEC City Boutique Retail & Dining Concourse',
    clientOrContext: 'Hospitality Group',
    location: 'Madhapur, Hyderabad',
    year: '2022 – 2023',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Commercial',
    scope: 'Multi-Level F&B Retail Concourse with Open-Air Promenade & Terraces',
    image: '/projects/hitec-retail-concourse.webp',
    isConfidential: true,
    tag: 'Retail Concourse'
  },
  {
    id: 'madhapur-co-working-hub',
    title: 'Madhapur Collaborative Co-Working Floorplates',
    clientOrContext: 'Enterprise Workspace Client',
    location: 'Madhapur, Hyderabad',
    year: '2023',
    discipline: 'Spatial Architecture',
    type: 'Turnkey Interior',
    category: 'Commercial',
    scope: '14,000 Sq. Ft Biophilic Agile Workplace with Acoustic Pods & Townhall Steps',
    image: '/projects/madhapur-coworking.webp',
    tag: 'Agile Workplace'
  },
  {
    id: 'jubilee-hills-clinic',
    title: 'Jubilee Hills Aesthetic Dermatology & Wellness Clinic',
    clientOrContext: 'Medical Wellness Client',
    location: 'Road No. 36, Jubilee Hills, Hyderabad',
    year: '2023',
    discipline: 'Spatial Architecture',
    type: 'Turnkey Interior',
    category: 'Commercial',
    scope: 'Bespoke Curvilinear Minimalist Clinical Interiors with Terrazzo & Concealed Lighting',
    image: '/projects/jubilee-wellness-clinic.webp',
    isConfidential: true,
    tag: 'Wellness Clinic'
  },

  // ── INSTITUTIONAL & HEALTHCARE ──
  {
    id: 'aiims-safdarjung-delhi',
    title: 'AIIMS Safdarjung Apex Healthcare Complex',
    clientOrContext: 'Ministry of Health / Manila Visuals',
    location: 'Safdarjung, New Delhi',
    year: '2021 – 2022',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Institutional',
    scope: 'Multi-Block Tertiary Healthcare Campus, Trauma Emergency Wing & Central Courtyards',
    image: '/projects/manila/aiims-safdarjung.webp',
    isConfidential: true,
    tag: 'Apex Healthcare'
  },
  {
    id: 'hyderabad-public-school-annex',
    title: 'Heritage School Performing Arts Auditorium & Annex',
    clientOrContext: 'Institutional School Trust',
    location: 'Begumpet, Hyderabad',
    year: '2022 – 2023',
    discipline: 'Spatial Architecture',
    type: 'Architectural Design',
    category: 'Institutional',
    scope: '800-Seat Acoustic Auditorium, Stone Colonnades & Heritage Integration',
    image: '/projects/school-performing-arts.webp',
    isConfidential: true,
    tag: 'Performing Arts'
  },
  {
    id: 'narsingi-diagnostic-center',
    title: 'Narsingi Multi-Specialty Imaging & Diagnostics Hub',
    clientOrContext: 'Healthcare Consortium',
    location: 'Narsingi, Hyderabad',
    year: '2023 – 2024',
    discipline: 'Spatial Architecture',
    type: 'Built Execution',
    category: 'Institutional',
    scope: 'G+4 Healthcare Facility with Lead-Lined MRI/CT Suites, ICU Ward & GHMC Approvals',
    image: '/projects/narsingi-diagnostic-hub.webp',
    tag: 'Healthcare Hub'
  }
];

export const CATEGORIES = [
  'All Disciplines',
  'Spatial Architecture',
  'Software & Systems',
  'Bespoke Furniture',
  '3D Cinema & Film',
  'Civic & Urbanism'
] as const;
