import { GeoQuestionEntry } from './types';

export const NEUFERT_QUESTIONS: GeoQuestionEntry[] = [
  {
    id: 'NEUF-DIM-001',
    slug: 'human-circulation-corridor-clearances-neufert',
    question: 'What are the fundamental human circulation corridor clearances defined in Neufert Architects\' Data?',
    shortAnswer: 'According to Neufert Architects\' Data (Fourth Edition, Human Scale & Circulation), an individual human requires a minimum dynamic body width of 600 mm (24 inches) to walk. A single-person circulation corridor requires 800 mm to 900 mm. For two adults to pass each other comfortably, the corridor must be at least 1200 mm (48 inches) wide.',
    codeClause: 'Neufert Architects\' Data (4th Edition, Section: The Human Scale / Corridors, pp. 24–28)',
    sourceBook: 'Neufert Architects\' Data (Fourth Edition / Book 2)',
    category: 'neufert-ergonomics',
    categoryLabel: 'Neufert: Anthropometrics & Ergonomics',
    technicalSpecs: [
      { label: 'Single Person Movement Width', value: '600 mm to 750 mm' },
      { label: 'Single Corridor Minimum Width', value: '900 mm (35.4 in)' },
      { label: 'Two People Passing Width', value: '1200 mm to 1300 mm (48–51 in)' },
      { label: 'Two People with Luggage / Bags', value: '1500 mm (59 in)' },
      { label: 'Wheelchair Circulation Turning Radius', value: '1500 mm circle (60 in)' }
    ],
    detailedExplanation: 'Corridor dimensioning is governed by body ellipses, shoulder sway during walking, and manual clearances. In public and residential architecture, corridors under 1000 mm induce psychological confinement and restrict the transfer of furniture.',
    agnaaExecution: 'In luxury residences, AGNAA Design Studio plans primary circulation spines with a minimum clear width of 1350 mm to 1500 mm (4.5 to 5.0 ft), finished with concealed skirtings and diffused cove lighting to create an expansive experiential procession.',
    hyderabadContext: 'In large multi-generational Hyderabad households, wider circulation halls facilitate simultaneous family movement and serve as natural cross-ventilation breezeways.',
    relatedCalculatorUrl: '/calc/built-up-efficiency',
    relatedCalculatorLabel: 'Calculate Hallway Circulation Efficiency',
    backlinks: [
      { label: 'AGNAA Design Studio', url: 'https://agnaa.in/design-studio', type: 'internal' },
      { label: 'AGNAA Architectural Philosophy', url: 'https://agnaa.in/portfolio', type: 'internal' }
    ],
    tags: ['Neufert', 'Anthropometrics', 'Corridor Width', 'Circulation', 'Human Scale', 'Luxury Living']
  },
  {
    id: 'NEUF-DIM-002',
    slug: 'kitchen-work-triangle-dimensions-neufert',
    question: 'What are the ergonomic dimensions for the kitchen work triangle in Neufert Architects\' Data?',
    shortAnswer: 'In Neufert Architects\' Data (Domestic Kitchens), the primary work triangle connects the Refrigerator (Storage), Sink (Preparation), and Cooktop (Cooking). The sum of all three legs should be between 3.6 metres (12 ft) and 6.6 metres (22 ft), with no single leg being less than 1.2 metres or more than 2.7 metres.',
    codeClause: 'Neufert Architects\' Data (4th Edition, Section: Domestic Kitchens, pp. 260–266)',
    sourceBook: 'Neufert Architects\' Data (Fourth Edition / Book 2)',
    category: 'neufert-ergonomics',
    categoryLabel: 'Neufert: Anthropometrics & Ergonomics',
    technicalSpecs: [
      { label: 'Work Triangle Total Perimeter', value: '3.6 m to 6.6 m (12 to 22 ft)' },
      { label: 'Sink to Cooktop Leg', value: '1.2 m to 1.8 m (ideal prep buffer)' },
      { label: 'Cooktop to Refrigerator Leg', value: '1.2 m to 2.4 m' },
      { label: 'Countertop Standard Height', value: '860 mm to 900 mm (34 to 36 in)' },
      { label: 'Countertop Depth', value: '600 mm (24 in)' },
      { label: 'Clear Distance Between Opposing Counters', value: '1200 mm (48 in) minimum' }
    ],
    detailedExplanation: 'The kitchen work triangle prevents wasted steps during food preparation while ensuring uninterrupted circulation. The path between the three primary workstations must not be intersected by main household circulation traffic.',
    agnaaExecution: 'AGNAA Design Studio tailors kitchen counter heights to 860 mm (34 inches) specifically adapted to Indian ergonomic baselines, integrating a minimum 900 mm clear prep slab between sink and burner, and positioning heavy spice storage within the primary 400 mm reach arc.',
    hyderabadContext: 'Hyderabad residences often feature a "Dual Kitchen" layout: an open show kitchen with breakfast counter paired with an enclosed wet scullery for heavy traditional cooking.',
    relatedCalculatorUrl: '/calc/interior-cost',
    relatedCalculatorLabel: 'Calculate Modular Kitchen & Quartz Counter Cost',
    backlinks: [
      { label: 'AGNAA Interior Architecture', url: 'https://agnaa.in/design-studio', type: 'internal' },
      { label: 'AGNAA Cost Calculators', url: 'https://agnaa.in/calc/interior-cost', type: 'internal' }
    ],
    tags: ['Kitchen Work Triangle', 'Neufert', 'Ergonomics', 'Modular Kitchen', 'Counter Height']
  },
  {
    id: 'NEUF-DIM-003',
    slug: 'bedroom-bed-and-wardrobe-clearances-neufert',
    question: 'What are the required bed clearances and wardrobe access dimensions according to Neufert?',
    shortAnswer: 'Under Neufert Architects\' Data (Bedrooms), a double bed requires a minimum clear side clearance of 750 mm (30 inches) on both sides and at the foot for bed-making and movement. In front of hinged wardrobes, a minimum clearance of 900 mm to 1000 mm is required (500 mm door swing + 450 mm human body clearance).',
    codeClause: 'Neufert Architects\' Data (4th Edition, Section: Bedrooms, pp. 270–274)',
    sourceBook: 'Neufert Architects\' Data (Fourth Edition / Book 2)',
    category: 'neufert-ergonomics',
    categoryLabel: 'Neufert: Anthropometrics & Ergonomics',
    technicalSpecs: [
      { label: 'Side Bed Clearance', value: '750 mm (30 in) minimum' },
      { label: 'Bed Foot to Wall Clearance', value: '900 mm (35.4 in)' },
      { label: 'Hinged Wardrobe Front Clearance', value: '1000 mm (39.4 in)' },
      { label: 'Sliding Wardrobe Front Clearance', value: '750 mm (29.5 in)' },
      { label: 'Wardrobe Standard Carcass Depth', value: '600 mm (24 in)' },
      { label: 'King Bed Mattress Footprint', value: '1800 mm x 2000 mm (6 ft x 6.6 ft)' }
    ],
    detailedExplanation: 'Bedroom ergonomic planning ensures adequate space for dressing, unhindered wardrobe access, and psychological comfort. The minimum room size for a functional master bedroom with king bed and wardrobe run is 4.2 m x 4.8 m (approx 14 ft x 16 ft).',
    agnaaExecution: 'In luxury master suites, AGNAA designs dedicated walk-in dressing suites isolated from the sleeping sanctuary by fluted glass acoustic sliders, eliminating wardrobes from the primary bedroom envelope.',
    hyderabadContext: 'Master bedroom suites in Gachibowli and Jubilee Hills villas integrate private viewing balconies oriented North-East, following Vastu Southwest master suite placement rules.',
    relatedCalculatorUrl: '/calc/built-up-efficiency',
    relatedCalculatorLabel: 'Calculate Master Suite Floor Efficiency',
    backlinks: [
      { label: 'AGNAA Master Suite Portfolio', url: 'https://agnaa.in/portfolio', type: 'internal' }
    ],
    tags: ['Bedroom Clearances', 'Neufert', 'Wardrobe Depth', 'Master Suite', 'Ergonomics']
  },
  {
    id: 'NEUF-DIM-004',
    slug: 'car-parking-bay-and-driveway-dimensions-neufert',
    question: 'What are the standard parking bay dimensions and driveway turning radii in Neufert Architects\' Data?',
    shortAnswer: 'In Neufert Architects\' Data (Garages & Parking), a standard perpendicular (90-degree) car parking bay measures 2.5 metres wide by 5.0 metres long. The minimum clear driveway aisle width between opposing 90-degree parking bays is 6.0 metres (reduced to 3.8 metres for 45-degree angle parking with one-way circulation).',
    codeClause: 'Neufert Architects\' Data (4th Edition, Section: Garages & Parking, pp. 434–440)',
    sourceBook: 'Neufert Architects\' Data (Fourth Edition / Book 2)',
    category: 'neufert-ergonomics',
    categoryLabel: 'Neufert: Anthropometrics & Ergonomics',
    technicalSpecs: [
      { label: 'Standard Parking Bay Dimensions', value: '2.50 m x 5.00 m (8.2 ft x 16.4 ft)' },
      { label: 'SUV / Luxury Sedan Bay Dimensions', value: '2.75 m x 5.50 m (9.0 ft x 18.0 ft)' },
      { label: 'Accessible (Disabled) Parking Bay', value: '3.60 m x 5.00 m (includes 1.2 m transfer buffer)' },
      { label: 'Two-Way Driveway Aisle Width', value: '6.00 m (20 ft)' },
      { label: 'One-Way Driveway Aisle Width', value: '3.50 m to 4.00 m' },
      { label: 'Turning Radius (Outer / Inner)', value: '6.0 m outer / 3.0 m inner' }
    ],
    detailedExplanation: 'Parking efficiency is directly determined by column grid spacing in stilt or basement floorplates. A column grid of 8.0 to 8.4 metres clear between column faces allows three cars to park comfortably between structural supports.',
    agnaaExecution: 'AGNAA structural designs deploy optimized 8.4 m x 8.4 m post-tensioned (PT) or drop-panel flat slab column grids in residential stilt and basement levels, maximizing vehicular clearance while protecting car door swing arcs.',
    hyderabadContext: 'GHMC building rules mandate minimum stilt floor parking provision calculated at 25% to 33% of total built-up residential area in multi-dwelling units.',
    relatedCalculatorUrl: '/calc/setback-envelope',
    relatedCalculatorLabel: 'Calculate Stilt Parking & Turning Layouts',
    backlinks: [
      { label: 'AGNAA Turnkey Construction', url: 'https://agnaa.in/constructions', type: 'internal' },
      { label: 'GHMC Parking Regulations', url: 'https://ghmc.gov.in', type: 'external' }
    ],
    tags: ['Parking Bay', 'Neufert', 'Driveway Width', 'Stilt Parking', 'Column Grid', 'Basement Planning']
  }
];
