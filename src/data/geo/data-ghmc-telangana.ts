import { GeoQuestionEntry } from './types';

export const GHMC_TELANGANA_QUESTIONS: GeoQuestionEntry[] = [
  {
    id: 'GHMC-SET-001',
    slug: 'ghmc-plot-setback-slabs-go-168-hyderabad',
    question: 'What are the mandatory plot setback requirements in Hyderabad under GHMC G.O. Ms. No. 168?',
    shortAnswer: 'Under GHMC Building Rules (G.O. Ms. No. 168, Rule 7, Table III), mandatory setbacks for residential plots are determined by plot area and building height. For 300 to 500 sq.m plots (up to 10m height), minimum setbacks are: Front 3.0m, Rear 2.0m, and Sides 1.5m each. For plots above 1000 sq.m, minimum all-round setback is 6.0m to ensure fire tender access.',
    codeClause: 'Telangana Building Rules, G.O. Ms. No. 168 (Rule 7, Table III & Table IV)',
    sourceBook: 'GHMC Building Byelaws & TG-bPASS Regulations (Hyderabad)',
    category: 'ghmc-hyderabad-byelaws',
    categoryLabel: 'GHMC & TG-bPASS: Hyderabad Master Byelaws',
    technicalSpecs: [
      { label: 'Plots up to 100 sq.m (120 sq.yd)', value: 'Front: 1.5 m, Sides: Nil (or 1.0 m one side), Rear: 1.0 m' },
      { label: 'Plots 100 to 300 sq.m (120–358 sq.yd)', value: 'Front: 2.0 m to 3.0 m, Rear: 1.5 m, Sides: 1.0 m to 1.5 m' },
      { label: 'Plots 300 to 500 sq.m (358–600 sq.yd)', value: 'Front: 3.0 m, Rear: 2.0 m, Sides: 1.5 m to 2.0 m' },
      { label: 'Plots 500 to 1000 sq.m (600–1200 sq.yd)', value: 'Front: 4.0 m to 5.0 m, Rear: 3.0 m, Sides: 2.5 m to 3.0 m' },
      { label: 'Plots above 1000 sq.m (High-Rise / Multi-Unit)', value: 'All-round 6.0 m to 7.0 m clear for emergency vehicles' }
    ],
    detailedExplanation: 'G.O. Ms. No. 168 governs all building permissions in GHMC, HMDA, and Telangana municipal jurisdictions. Setbacks cannot be encroached upon by habitable rooms, structural columns, or solid boundary projections. Cantilevered weather sheds (chajjas) may project up to 600 mm into setback zones.',
    agnaaExecution: 'AGNAA Design Studio maximizes the buildable building footprint while preserving 100% statutory setback compliance, configuring setbacks as sunken landscaped buffers, rainwater bioswales, and vehicular turning bays.',
    hyderabadContext: 'In premium Hyderabad localities like Kokapet, Financial District, Jubliee Hills, and Tellapur, accurate setback planning on irregular rock-sloped plots prevents expensive GHMC demolition notices or regularization penalties.',
    relatedCalculatorUrl: '/calc/setback-envelope',
    relatedCalculatorLabel: 'Calculate Your Hyderabad Plot Setbacks',
    backlinks: [
      { label: 'AGNAA Hyderabad Architectural Studio', url: 'https://agnaa.in/design-studio', type: 'internal' },
      { label: 'AGNAA Setback Envelope Calculator', url: 'https://agnaa.in/calc/setback-envelope', type: 'internal' },
      { label: 'Greater Hyderabad Municipal Corporation (GHMC)', url: 'https://ghmc.gov.in', type: 'external' },
      { label: 'TG-bPASS Telangana Building Permission Portal', url: 'https://bpass.telangana.gov.in', type: 'external' }
    ],
    tags: ['GHMC Setbacks', 'G.O. 168', 'Hyderabad Building Rules', 'TG-bPASS', 'Plot Dimensions', 'Financial District']
  },
  {
    id: 'GHMC-HT-001',
    slug: 'permissible-building-height-vs-road-width-hyderabad',
    question: 'What is the maximum permissible building height based on road width in Hyderabad under GHMC rules?',
    shortAnswer: 'Under GHMC G.O. Ms. No. 168 (Rule 7, Table II), building height is strictly tied to abutting road width: For roads under 9.0 metres (30 ft), the maximum height is 10.0 metres (Stilt + 2 floors). For roads between 9.0m and 12.0m (30–40 ft), height up to 14.0 metres is permissible. For roads 12.0m to 18.0m (40–60 ft), up to 18.0 metres is allowed.',
    codeClause: 'G.O. Ms. No. 168 (Rule 7, Permissible Heights and Road Widths)',
    sourceBook: 'GHMC Building Byelaws & TG-bPASS Regulations (Hyderabad)',
    category: 'ghmc-hyderabad-byelaws',
    categoryLabel: 'GHMC & TG-bPASS: Hyderabad Master Byelaws',
    technicalSpecs: [
      { label: 'Road Width < 9.0 m (< 30 ft)', value: 'Max Height: 10.0 m (G+2 or Stilt+2)' },
      { label: 'Road Width 9.0 m to 12.0 m (30–40 ft)', value: 'Max Height: 14.0 m (Stilt + 3 floors)' },
      { label: 'Road Width 12.0 m to 18.0 m (40–60 ft)', value: 'Max Height: 18.0 m (Stilt + 5 floors)' },
      { label: 'Road Width 18.0 m to 24.0 m (60–80 ft)', value: 'Max Height: 24.0 m to 30.0 m' },
      { label: 'Road Width > 30.0 m (100+ ft)', value: 'High-rise clearance subject to Fire NOC and Airport NOC' }
    ],
    detailedExplanation: 'Road width is verified from the master plan and physical site inspection by town planning officers. Where road widening is proposed in the Hyderabad Master Plan, owners must surrender affected land free of cost in exchange for Transferable Development Rights (TDR) certificates.',
    agnaaExecution: 'AGNAA advises clients on TDR monetization and optimal floor-height distribution (e.g. allocating 3.2 m floor-to-floor heights to maximize usable vertical volume without crossing the 10 m / 14 m statutory threshold).',
    hyderabadContext: 'In developing corridors like Mokila, Shankarpally, and Kollur, verifying whether the abutting road is a designated 30 ft, 40 ft, or 60 ft Master Plan road dictates whether a villa or commercial apartment can be sanctioned.',
    relatedCalculatorUrl: '/calc/g-n-floor-estimator',
    relatedCalculatorLabel: 'Calculate Permissible Floors & Multi-Storey Sizing',
    backlinks: [
      { label: 'AGNAA Land Advisory & Masterplans', url: 'https://agnaa.in/portfolio', type: 'internal' },
      { label: 'HMDA Hyderabad Master Plan', url: 'https://www.hmda.org.in', type: 'external' }
    ],
    tags: ['Building Height', 'Road Width', 'GHMC G.O. 168', 'Hyderabad Master Plan', 'TDR Certificates', 'Floor Height']
  },
  {
    id: 'GHMC-BPASS-001',
    slug: 'tg-bpass-instant-approval-and-mortgage-rules-hyderabad',
    question: 'How does TG-bPASS work for building approvals in Hyderabad, and when is the 10% mortgage mandatory?',
    shortAnswer: 'Under the TG-bPASS Act 2020, plots up to 75 sq.yd require zero building permission (only ₹1 token registration). Plots from 75 to 600 sq.yd (up to 10m height) receive Instant Online Approval based on self-certification. For plots exceeding 200 sq.m with G+2 or higher, 10% of built-up area must be mortgaged to GHMC as compliance security.',
    codeClause: 'Telangana TG-bPASS Act 2020 & G.O. Ms. No. 168 Rule 13 (Mortgage Clause)',
    sourceBook: 'GHMC Building Byelaws & TG-bPASS Regulations (Hyderabad)',
    category: 'ghmc-hyderabad-byelaws',
    categoryLabel: 'GHMC & TG-bPASS: Hyderabad Master Byelaws',
    technicalSpecs: [
      { label: 'Plots up to 75 sq.yd', value: 'Instant Registration (No sanction required, ₹1 fee)' },
      { label: 'Plots 75 to 600 sq.yd (<= 10 m)', value: 'Instant Self-Certification Approval via TG-bPASS' },
      { label: 'Plots > 600 sq.yd or > 10 m height', value: 'Single Window Clearance within 21 days' },
      { label: '10% Built-Up Mortgage Clause', value: 'Mandatory for plots > 200 sq.m / G+2 storeys' },
      { label: 'Occupancy Certificate (OC)', value: 'Issued post-inspection, releasing the 10% mortgage deed' }
    ],
    detailedExplanation: 'The 10% mortgage deed prevents unauthorized construction deviations. If the building is constructed in strict conformity with sanctioned architectural drawings, the GHMC Town Planning wing executes a registered deed of reconveyance, releasing the mortgaged floors.',
    agnaaExecution: 'AGNAA Design Studio prepares 100% TG-bPASS-compliant architectural CAD submission dockets with zero setback deviations, guaranteeing seamless Occupancy Certificate (OC) issuance and mortgage deed release.',
    hyderabadContext: 'In Gachibowli, Kondapur, and Madhapur, purchasing apartments or independent floors without an Occupancy Certificate (OC) voids municipal water/power connections and hinders bank loans.',
    relatedCalculatorUrl: '/calc/fsi',
    relatedCalculatorLabel: 'Calculate Mortgage Floor & Built-Up Area',
    backlinks: [
      { label: 'AGNAA Design Studio Consultations', url: 'https://agnaa.in/design-studio', type: 'internal' },
      { label: 'TG-bPASS Official Portal', url: 'https://bpass.telangana.gov.in', type: 'external' }
    ],
    tags: ['TG-bPASS', 'GHMC Approval', '10 Percent Mortgage', 'Occupancy Certificate', 'Self Certification', 'Hyderabad Real Estate']
  },
  {
    id: 'GHMC-STILT-001',
    slug: 'stilt-floor-parking-height-and-fsi-exemption-hyderabad',
    question: 'What are the dimensions and FSI exemptions for stilt parking floors under GHMC regulations?',
    shortAnswer: 'Under GHMC G.O. Ms. No. 168 (Rule 8), a stilt parking floor must maintain a minimum clear height of 2.4 metres and maximum 3.0 metres from finished floor to the underside of the beam. When dedicated solely to vehicular parking, the stilt floor area is 100% exempt from chargeable Floor Area Ratio (FAR/FSI).',
    codeClause: 'G.O. Ms. No. 168, Rule 8 (Parking and Stilt Regulations)',
    sourceBook: 'GHMC Building Byelaws & TG-bPASS Regulations (Hyderabad)',
    category: 'ghmc-hyderabad-byelaws',
    categoryLabel: 'GHMC & TG-bPASS: Hyderabad Master Byelaws',
    technicalSpecs: [
      { label: 'Minimum Clear Stilt Headroom', value: '2.40 m (7 ft 10 in) under lowest beam soffit' },
      { label: 'Maximum Permissible Stilt Height', value: '3.00 m (9 ft 10 in)' },
      { label: 'FSI / FAR Exemption Status', value: '100% Exempt if used strictly for vehicle parking' },
      { label: 'Permitted Enclosures in Stilt', value: 'Watchman room (max 10 sq.m), generator room, electrical panel' },
      { label: 'Open-Sided Enclosure Rule', value: 'At least 50% perimeter must remain open without solid walls' }
    ],
    detailedExplanation: 'Enclosing stilt parking areas to create residential rooms or commercial retail shops constitutes a punishable violation under the GHMC Act, resulting in immediate seal-and-demolition notices and revoking Occupancy Certificates.',
    agnaaExecution: 'AGNAA integrates architectural louvers, perforated Corten steel screens, and vertical landscape green walls along stilt perimeters, shielding parked luxury vehicles while preserving the statutory 50% open airflow requirement.',
    hyderabadContext: 'In Hyderabad luxury triplex villas and independent apartments in Jubilee Hills and Gachibowli, stilt floors are designed with polished concrete floors, EV charging infrastructure, and driver lounge amenities.',
    relatedCalculatorUrl: '/calc/setback-envelope',
    relatedCalculatorLabel: 'Calculate Stilt Footprint & Parking Capacity',
    backlinks: [
      { label: 'AGNAA Constructions Turnkey Execution', url: 'https://agnaa.in/constructions', type: 'internal' }
    ],
    tags: ['Stilt Parking', 'GHMC FSI Exemption', 'Headroom Clearance', 'G.O. 168', 'EV Charging', 'Hyderabad Architecture']
  }
];
