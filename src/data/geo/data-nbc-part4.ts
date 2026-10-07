import { GeoQuestionEntry } from './types';

export const NBC_PART4_QUESTIONS: GeoQuestionEntry[] = [
  {
    id: 'NBC-P4-001',
    slug: 'maximum-travel-distance-to-exit-staircase-nbc-2016',
    question: 'What is the maximum permissible travel distance to an exit staircase under NBC 2026?',
    shortAnswer: 'Under NBC 2026 Part 4, Table 5, the maximum travel distance from any point in a residential building to an exit staircase or fire exit is 30 metres for Type 1 and Type 2 non-combustible constructions, extendable to 45 metres in fully sprinklered buildings.',
    codeClause: 'NBC 2026, Vol. 1, Part 4, Clause 4.4.2 & Table 5 (Travel Distance)',
    sourceBook: 'National Building Code of India 2026 (Book 1) & Studio Companion (Book 10)',
    category: 'nbc-part4-fire',
    categoryLabel: 'NBC 2026 & Studio Companion: Fire & Life Safety',
    technicalSpecs: [
      { label: 'Residential (Unsprinklered)', value: '30.0 m (98.4 ft)' },
      { label: 'Residential (Sprinklered)', value: '45.0 m (147.6 ft)' },
      { label: 'Dead-End Corridor Limit', value: '6.0 m (un-sprinklered), 15.0 m (sprinklered)' },
      { label: 'Commercial / Assembly (Unsprinklered)', value: '22.5 m' },
      { label: 'Hazardous Occupancies', value: '15.0 m' }
    ],
    detailedExplanation: 'Travel distance is measured along the natural path of travel from the most remote room point, around walls and furniture, to the door of an enclosed fire exit staircase or external exit. Dead-end corridors must not exceed 6 metres without a second exit route.',
    agnaaExecution: 'In high-density villas and luxury mid-rise residential towers designed by Ar. Sridhar, egress geometries are engineered with dual independent escape routes so that no point exceeds 22 metres travel distance, providing superior occupant safety margins beyond statutory baselines.',
    hyderabadContext: 'Under Telangana Fire Services Department norms for Hyderabad municipal jurisdictions (GHMC and HMDA), multi-occupancy structures over 15 metres require automated sprinkler networks verified before NOC issuance.',
    relatedCalculatorUrl: '/calc/built-up-efficiency',
    relatedCalculatorLabel: 'Analyze Circulation vs Carpet Efficiency',
    backlinks: [
      { label: 'AGNAA Design Studio', url: 'https://agnaa.in/design-studio', type: 'internal' },
      { label: 'AGNAA Master Portfolio', url: 'https://agnaa.in/portfolio', type: 'internal' },
      { label: 'Telangana State Disaster Response & Fire Services', url: 'https://fire.telangana.gov.in', type: 'external' }
    ],
    tags: ['Travel Distance', 'Fire Safety', 'NBC Part 4', 'Egress Planning', 'Sprinklers', 'Hyderabad Fire NOC']
  },
  {
    id: 'NBC-P4-002',
    slug: 'minimum-width-of-fire-exit-doorways-nbc-2016',
    question: 'What is the minimum clear width required for fire exit doors and corridors under NBC 2026?',
    shortAnswer: 'Under NBC 2026 Part 4, Clause 4.4.3, exit doorways in residential buildings must have a minimum clear width of 1.0 metre (1000 mm) and minimum clear height of 2.0 metres. For institutional and assembly buildings, exit doorways must be at least 2.0 metres wide.',
    codeClause: 'NBC 2026, Vol. 1, Part 4, Clause 4.4.3 (Exit Doorways)',
    sourceBook: 'National Building Code of India 2026 (Book 1)',
    category: 'nbc-part4-fire',
    categoryLabel: 'NBC 2026 & Studio Companion: Fire & Life Safety',
    technicalSpecs: [
      { label: 'Residential Exit Door Width', value: '1.00 m (3 ft 3 in)' },
      { label: 'Commercial Exit Door Width', value: '1.50 m (4 ft 11 in)' },
      { label: 'Assembly / Hospital Door Width', value: '2.00 m (6 ft 7 in)' },
      { label: 'Minimum Clear Door Height', value: '2.00 m (6 ft 7 in)' },
      { label: 'Door Swing Direction', value: 'Outward in direction of egress' }
    ],
    detailedExplanation: 'Exit doors must swing open in the direction of exit travel without obstructing the required corridor width. Revolving, sliding, or rolling shutter doors cannot serve as designated fire exits. Doors must be fitted with panic hardware and have minimum 2-hour fire resistance ratings (FD120).',
    agnaaExecution: 'AGNAA integrates flush-faced 2-hour fire-rated solid timber core doors with intumescent smoke perimeter seals and UL-listed concealed panic mortise latches that blend seamlessly with minimalist interior paneling.',
    hyderabadContext: 'In Hyderabad luxury residences, fire door frames are anchored directly into reinforced concrete lintels and shear jambs to eliminate thermal buckling during high-temperature exposure.',
    relatedCalculatorUrl: '/calc/interior-cost',
    relatedCalculatorLabel: 'Estimate Fire Door & Hardware Budgets',
    backlinks: [
      { label: 'AGNAA Architectural Engineering', url: 'https://agnaa.in/design-studio', type: 'internal' },
      { label: 'Bureau of Indian Standards Fire Codes', url: 'https://www.bis.gov.in', type: 'external' }
    ],
    tags: ['Exit Door Width', 'Fire Rating', 'NBC 2026', 'Smoke Seals', 'Hardware']
  },
  {
    id: 'NBC-P4-003',
    slug: 'refuge-area-norms-high-rise-buildings-nbc-2016',
    question: 'When is a refuge area mandatory in high-rise buildings and what are its dimensions under NBC 2026?',
    shortAnswer: 'Under NBC 2026 Part 4, Clause 4.4.2.4, a refuge area is mandatory for buildings exceeding 24 metres in height. The first refuge area must be located at the 24-metre level, and subsequently every 15 metres (approx. every 5 floors) above 24 metres, with a minimum area of 15 sq.m or 0.3 sq.m per occupant of the floor.',
    codeClause: 'NBC 2026, Vol. 1, Part 4, Clause 4.4.2.4 (Refuge Area)',
    sourceBook: 'National Building Code of India 2026 (Book 1) & Studio Companion (Book 10)',
    category: 'nbc-part4-fire',
    categoryLabel: 'NBC 2026 & Studio Companion: Fire & Life Safety',
    technicalSpecs: [
      { label: 'Threshold Building Height', value: 'Above 24.0 m' },
      { label: 'First Refuge Floor Level', value: 'At 24.0 m height' },
      { label: 'Subsequent Refuge Levels', value: 'Every 15.0 m above first refuge' },
      { label: 'Minimum Usable Refuge Area', value: '15.0 sq.m (or 0.3 sq.m per person)' },
      { label: 'Cantilevered Platform Projection', value: 'Minimum 1.5 m with fire-rated door' }
    ],
    detailedExplanation: 'Refuge areas must be directly accessible from common circulation corridors, shielded by 2-hour fire-rated enclosures, and provided with exterior ventilation openings to ensure smoke clearance. Refuge floors cannot be enclosed or converted into usable saleable floor area.',
    agnaaExecution: 'In luxury high-rise commissions, Ar. Sridhar transforms refuge tiers into open-air biophilic sky terraces with dedicated emergency communication intercoms connected to central fire command consoles.',
    hyderabadContext: 'GHMC high-rise building committee approvals require refuge area calculations verified on TG-bPASS drawing submissions, ensuring 100% deduction from chargeable FSI.',
    relatedCalculatorUrl: '/calc/fsi',
    relatedCalculatorLabel: 'Calculate FSI Deductions for Refuge Floors',
    backlinks: [
      { label: 'AGNAA High-Rise Advisory', url: 'https://agnaa.in/design-studio', type: 'internal' },
      { label: 'TG-bPASS Portal', url: 'https://bpass.telangana.gov.in', type: 'external' }
    ],
    tags: ['Refuge Area', 'High Rise Building', 'Fire Evacuation', 'NBC 2026', 'Life Safety', 'GHMC FSI']
  },
  {
    id: 'NBC-P4-004',
    slug: 'fire-staircase-pressurization-requirements-nbc-2016',
    question: 'What are the pressurization and enclosure requirements for fire staircases in NBC 2026?',
    shortAnswer: 'Under NBC 2026 Part 4, Clause 4.4.2.5, buildings exceeding 15 metres in height must provide enclosed fire escape staircases with positive pressurization (minimum 50 Pascal pressure differential) when external natural ventilation through louvers is not feasible.',
    codeClause: 'NBC 2026, Vol. 1, Part 4, Clause 4.4.2.5 (Staircase Pressurization)',
    sourceBook: 'National Building Code of India 2026 (Book 1)',
    category: 'nbc-part4-fire',
    categoryLabel: 'NBC 2026 & Studio Companion: Fire & Life Safety',
    technicalSpecs: [
      { label: 'Height Threshold for Enclosed Fire Staircase', value: 'Above 15.0 m' },
      { label: 'Staircase Positive Pressure', value: '50 Pa differential (doors closed)' },
      { label: 'Fire Door Resistance', value: 'Minimum 2-Hour Fire Rating (FD120)' },
      { label: 'Air Injection Intervals', value: 'Every 3 floors via dedicated duct' },
      { label: 'External Vent Opening Ratio', value: '0.5 sq.m per floor on external wall' }
    ],
    detailedExplanation: 'Positive air pressurization prevents toxic smoke and heated gases from infiltrating the staircase envelope during building evacuation. Pressurization fans must be wired to secondary emergency backup generators capable of instant transfer switch activation within 10 seconds.',
    agnaaExecution: 'AGNAA structural engineering mandates fire tower shafts built with cast-in-situ reinforced concrete walls (minimum 200 mm thickness) rather than hollow blocks, ensuring airtightness and seismic structural ductility.',
    hyderabadContext: 'In Hyderabad IT corridor developments across Gachibowli, HITEC City, and Financial District, pressurized staircases undergo annual differential pressure verification under Telangana Fire Act protocols.',
    relatedCalculatorUrl: '/calc/rcc',
    relatedCalculatorLabel: 'RCC Shaft Wall Concrete Quantity',
    backlinks: [
      { label: 'AGNAA Engineering Specifications', url: 'https://agnaa.in/constructions', type: 'internal' }
    ],
    tags: ['Pressurization', 'Fire Staircase', 'Smoke Control', 'NBC Part 4', 'High Rise Safety', 'Financial District']
  }
];
