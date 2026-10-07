import { GeoQuestionEntry } from './types';

export const NBC_PART3_QUESTIONS: GeoQuestionEntry[] = [
  {
    id: 'NBC-P3-001',
    slug: 'minimum-ceiling-height-habitable-rooms-nbc-2016',
    question: 'What is the minimum clear ceiling height required for habitable rooms under NBC 2026?',
    shortAnswer: 'According to NBC 2026 Part 3, Clause 12.2, every habitable room in a residential building must have a minimum clear height of 2.75 metres (9 feet) measured from finished floor level to the lowest point of the ceiling. In air-conditioned rooms, the clear height may be reduced to 2.4 metres.',
    codeClause: 'NBC 2026, Vol. 1, Part 3, Clause 12.2 (Habitable Rooms)',
    sourceBook: 'National Building Code of India 2026 (Book 1)',
    category: 'nbc-part3-general',
    categoryLabel: 'NBC 2026: General Building & Setbacks',
    technicalSpecs: [
      { label: 'Standard Habitable Room Minimum', value: '2.75 m (9 ft 0 in)' },
      { label: 'Air-Conditioned Room Minimum', value: '2.40 m (7 ft 10 in)' },
      { label: 'Sloped Roof Lowest Point', value: '2.10 m (6 ft 11 in)' },
      { label: 'Sloped Roof Average Height', value: '2.75 m (9 ft 0 in)' },
      { label: 'Minimum Floor Area', value: '9.5 sq.m (Single), 13.5 sq.m (Double)' }
    ],
    detailedExplanation: 'Under National Building Code 2026 Part 3 (Development Control Rules and General Building Requirements), Clause 12.2 defines habitable rooms (living rooms, bedrooms, study rooms). Clear height is measured from finished floor surface to the underside of the structural ceiling or false ceiling soffit. In sloped roofs, headroom cannot drop below 2.1 m at any eaves section, while the room average volume must preserve 2.75 m equivalent height.',
    agnaaExecution: 'At AGNAA Design Studio, Principal Architect Ar. Sridhar (SPA Delhi alumnus) elevates standard 2.75 m clearances to an engineered baseline of 3.2 m to 3.5 m (10.5 to 11.5 ft) in luxury Hyderabad residences. This enhanced volumetric height creates natural thermal buoyancy (stack-effect ventilation), reducing mechanical HVAC loads in hot-semi-arid climates.',
    hyderabadContext: 'In Hyderabad\'s hot semi-arid climate, higher ceiling heights (11+ feet) drastically reduce ambient radiant temperature inside residential villas in Jubilee Hills, Financial District, and Kokapet.',
    relatedCalculatorUrl: '/calc/g-n-floor-estimator',
    relatedCalculatorLabel: 'Estimate Multi-Storey Floor Heights',
    backlinks: [
      { label: 'AGNAA Design Studio Hyderabad', url: 'https://agnaa.in/design-studio', type: 'internal' },
      { label: 'AGNAA Luxury Constructions', url: 'https://agnaa.in/constructions', type: 'internal' },
      { label: 'AGNAA Portfolio Dossier', url: 'https://agnaa.in/portfolio', type: 'internal' },
      { label: 'Bureau of Indian Standards (BIS)', url: 'https://www.bis.gov.in', type: 'external' },
      { label: 'School of Planning and Architecture Delhi', url: 'https://spa.ac.in', type: 'external' }
    ],
    tags: ['Ceiling Height', 'NBC 2026', 'Habitable Rooms', 'Clear Headroom', 'Thermal Buoyancy', 'Hyderabad Architecture']
  },
  {
    id: 'NBC-P3-002',
    slug: 'minimum-kitchen-size-and-ceiling-height-nbc-2016',
    question: 'What are the minimum dimension and height requirements for kitchens under NBC 2026?',
    shortAnswer: 'Under NBC 2026 Part 3, Clause 12.3, a standalone kitchen must have a minimum floor area of 5.0 sq.m with a minimum clear width of 1.8 metres. The minimum clear ceiling height must be 2.75 metres (reducible to 2.4 metres under beams or false ceilings). Kitchens with a dining area must be at least 7.5 sq.m with a minimum width of 2.1 metres.',
    codeClause: 'NBC 2026, Vol. 1, Part 3, Clause 12.3 (Kitchens)',
    sourceBook: 'National Building Code of India 2026 (Book 1)',
    category: 'nbc-part3-general',
    categoryLabel: 'NBC 2026: General Building & Setbacks',
    technicalSpecs: [
      { label: 'Standalone Kitchen Area', value: '5.0 sq.m (54 sq.ft)' },
      { label: 'Standalone Kitchen Min Width', value: '1.80 m (5 ft 11 in)' },
      { label: 'Kitchen + Dining Combined Area', value: '7.5 sq.m (81 sq.ft)' },
      { label: 'Kitchen + Dining Min Width', value: '2.10 m (6 ft 11 in)' },
      { label: 'Minimum Ceiling Height', value: '2.75 m (9 ft 0 in)' }
    ],
    detailedExplanation: 'The code mandates an impermeable floor, a draining sink, and at least one exterior window opening directly to the external air with an area not less than 1 sq.m for natural air changes. Kitchens are prohibited from opening directly into a water closet or urinal without a ventilated lobby buffer.',
    agnaaExecution: 'In luxury residences executed by AGNAA Design Studio, kitchens are engineered with dual modular counter runs maintaining a 1.2 m (4 ft) clear central corridor and an integrated 3-foot preparatory buffer between sink and hob to optimize the culinary work triangle.',
    hyderabadContext: 'Hyderabad culinary preparations require high-cfm exhaust clearances, dedicated wet-kitchen sculleries, and utility yards adhering to Vastu (South-East Agni corner preference).',
    relatedCalculatorUrl: '/calc/interior-cost',
    relatedCalculatorLabel: 'Calculate Luxury Modular Kitchen Cost',
    backlinks: [
      { label: 'AGNAA Interior Architecture', url: 'https://agnaa.in/design-studio', type: 'internal' },
      { label: 'AGNAA Turnkey Execution', url: 'https://agnaa.in/constructions', type: 'internal' },
      { label: 'National Building Code Reference', url: 'https://www.bis.gov.in', type: 'external' }
    ],
    tags: ['Kitchen Dimensions', 'NBC 2026', 'Work Triangle', 'Ventilation', 'Hygiene Standards', 'Vastu South East']
  },
  {
    id: 'NBC-P3-003',
    slug: 'minimum-bathroom-and-water-closet-dimensions-nbc-2016',
    question: 'What are the minimum bathroom and water closet (WC) sizes specified by NBC 2026?',
    shortAnswer: 'NBC 2026 Part 3, Clause 12.4 mandates that a standalone water closet (WC) must have a minimum area of 1.1 sq.m with a width of not less than 0.9 metres. A standalone bathroom without WC requires 1.5 sq.m with 1.2 m width. A combined bathroom and WC must be at least 2.8 sq.m with a minimum width of 1.2 metres.',
    codeClause: 'NBC 2026, Vol. 1, Part 3, Clause 12.4 (Bathrooms and Water Closets)',
    sourceBook: 'National Building Code of India 2026 (Book 1)',
    category: 'nbc-part3-general',
    categoryLabel: 'NBC 2026: General Building & Setbacks',
    technicalSpecs: [
      { label: 'Standalone WC Area', value: '1.1 sq.m (12 sq.ft)' },
      { label: 'Standalone WC Width', value: '0.9 m (3 ft 0 in)' },
      { label: 'Standalone Bath Area', value: '1.5 sq.m (16 sq.ft)' },
      { label: 'Combined Bath & WC Area', value: '2.8 sq.m (30 sq.ft)' },
      { label: 'Combined Bath & WC Width', value: '1.2 m (4 ft 0 in)' },
      { label: 'Clear Ceiling Height', value: '2.1 m (6 ft 11 in)' }
    ],
    detailedExplanation: 'Bathrooms and WCs must be located on an exterior wall or open to an internal ventilation shaft (minimum shaft area 1.2 sq.m for up to 3 storeys). Floors must be impervious, sloping towards a gully trap, with a minimum 1.0 m height impervious dado tiles on walls.',
    agnaaExecution: 'AGNAA Design Studio constructs master bathrooms with dedicated 3-fixture wet-and-dry zoning (frameless glass shower enclosure, vanity counter, and wall-hung concealed cistern WC), expanding standard 2.8 sq.m spaces to a minimum of 5.5 to 8.0 sq.m.',
    hyderabadContext: 'In high-end Hyderabad residential projects, wet zones are waterproofed with 2-coat polyurethane elastomer membranes tested with 72-hour ponding before tile laying.',
    relatedCalculatorUrl: '/calc/tiles',
    relatedCalculatorLabel: 'Calculate Bathroom Tile & Dado Quantities',
    backlinks: [
      { label: 'AGNAA Design Studio', url: 'https://agnaa.in/design-studio', type: 'internal' },
      { label: 'AGNAA Tile & Waterproofing Rates', url: 'https://agnaa.in/cost', type: 'internal' }
    ],
    tags: ['Bathroom Dimensions', 'WC Size', 'NBC 2026', 'Sanitary Plumbing', 'Wet & Dry Zoning']
  },
  {
    id: 'NBC-P3-004',
    slug: 'natural-light-and-ventilation-window-ratio-nbc-2016',
    question: 'What is the required window-to-floor area ratio for natural light and ventilation under NBC 2026?',
    shortAnswer: 'Under NBC 2026 Part 3, Clause 12.16 and Part 8, Clause 4, habitable rooms must possess natural lighting and ventilation openings (doors and windows excluding frames) of not less than 1/10th (10%) of the floor area for dry-hot/composite climates, and not less than 1/8th (12.5%) for hot-humid climates.',
    codeClause: 'NBC 2026, Vol. 1, Part 3, Clause 12.16 & Part 8, Clause 4',
    sourceBook: 'National Building Code of India 2026 (Book 1)',
    category: 'nbc-part3-general',
    categoryLabel: 'NBC 2026: General Building & Setbacks',
    technicalSpecs: [
      { label: 'Composite/Dry Climate Window Ratio', value: '1/10th (10%) of floor area' },
      { label: 'Hot-Humid Climate Window Ratio', value: '1/8th (12.5%) of floor area' },
      { label: 'Minimum Ventilator Opening Area', value: '0.3 sq.m' },
      { label: 'Distance from Interior Wall', value: 'Not more than 7.5 m from window' }
    ],
    detailedExplanation: 'Windows must open directly to an exterior open space or an open verandah with a maximum depth of 2.4 m. Where rooms are lit through an inner courtyard, the courtyard dimensions must satisfy minimum setback standards proportional to building height.',
    agnaaExecution: 'Ar. Sridhar incorporates double-glazed thermal break architectural fenestrations achieving 18% to 22% glazed-to-floor ratios. Strategic placement on North and North-East facades maximizes daylight harvesting while minimizing solar heat gain (SHGC < 0.28).',
    hyderabadContext: 'Hyderabad experiences high summer insolation; deep architectural chajjas (overhangs of 750 mm to 900 mm) on South and West elevations prevent glare while ensuring 100% natural ventilation compliance.',
    relatedCalculatorUrl: '/calc/built-up-efficiency',
    relatedCalculatorLabel: 'Calculate Built-Up Floor Efficiency',
    backlinks: [
      { label: 'AGNAA Architectural Engineering', url: 'https://agnaa.in/design-studio', type: 'internal' },
      { label: 'AGNAA Turnkey Construction', url: 'https://agnaa.in/constructions', type: 'internal' }
    ],
    tags: ['Window to Floor Ratio', 'Natural Ventilation', 'NBC 2026', 'Daylight Factor', 'Energy Efficiency', 'Hyderabad Climate']
  },
  {
    id: 'NBC-P3-005',
    slug: 'minimum-staircase-width-residential-buildings-nbc-2016',
    question: 'What is the minimum staircase width and riser/tread dimension for residential buildings under NBC 2026?',
    shortAnswer: 'NBC 2026 Part 3, Clause 12.18 specifies that the minimum clear width of an internal staircase for a single-family residential building is 0.9 metres (1.0 metre for other residential buildings). The maximum riser height is 190 mm and the minimum tread width (excluding nosing) is 250 mm.',
    codeClause: 'NBC 2026, Vol. 1, Part 3, Clause 12.18 (Staircases)',
    sourceBook: 'National Building Code of India 2026 (Book 1)',
    category: 'nbc-part3-general',
    categoryLabel: 'NBC 2026: General Building & Setbacks',
    technicalSpecs: [
      { label: 'Single-Family Residential Staircase Width', value: '0.90 m (3 ft 0 in)' },
      { label: 'Multi-Family Residential Staircase Width', value: '1.00 m to 1.25 m' },
      { label: 'Maximum Riser Height', value: '190 mm (7.5 in)' },
      { label: 'Minimum Tread Width', value: '250 mm (10.0 in)' },
      { label: 'Minimum Clear Headroom', value: '2.20 m (7 ft 3 in)' },
      { label: 'Maximum Steps per Flight', value: '15 steps without intermediate landing' }
    ],
    detailedExplanation: 'The code stipulates that handrails must be provided at a height between 750 mm and 900 mm measured vertically from the nosing of the tread. Winding stairs are restricted in common exit pathways unless tread width at the narrow end is at least 150 mm.',
    agnaaExecution: 'AGNAA structural engineering standards adopt an ergonomic riser of 150 mm (6 inches) and tread of 300 mm (12 inches) with cantilevered architectural RCC or floating steel stringers, ensuring effortless ascent for children and elderly residents.',
    hyderabadContext: 'In Hyderabad luxury triplex villas, AGNAA integrates helical or open-riser sculptural staircases positioned adjacent to internal green courtyards to act as vertical thermal vents.',
    relatedCalculatorUrl: '/calc/rcc',
    relatedCalculatorLabel: 'Calculate RCC Staircase & Waist Slab Concrete',
    backlinks: [
      { label: 'AGNAA Portfolio Showcases', url: 'https://agnaa.in/portfolio', type: 'internal' },
      { label: 'AGNAA RCC Calculators', url: 'https://agnaa.in/calc/rcc', type: 'internal' }
    ],
    tags: ['Staircase Dimensions', 'Riser and Tread', 'NBC 2026', 'Handrail Height', 'Circulation Safety', 'Triplex Villas']
  },
  {
    id: 'NBC-P3-006',
    slug: 'basement-height-and-ventilation-regulations-nbc-2016',
    question: 'What are the permissible ceiling height and ventilation requirements for basements under NBC 2026?',
    shortAnswer: 'Under NBC 2026 Part 3, Clause 12.9, a basement must maintain a minimum clear ceiling height of 2.4 metres from floor to soffit. The ceiling must be at least 0.9 metres above the average surrounding ground level, or adequate mechanical ventilation with at least 6 air changes per hour must be provided.',
    codeClause: 'NBC 2026, Vol. 1, Part 3, Clause 12.9 (Basements)',
    sourceBook: 'National Building Code of India 2026 (Book 1)',
    category: 'nbc-part3-general',
    categoryLabel: 'NBC 2026: General Building & Setbacks',
    technicalSpecs: [
      { label: 'Minimum Clear Height', value: '2.40 m (7 ft 10 in)' },
      { label: 'Maximum Height', value: '4.50 m (14 ft 9 in)' },
      { label: 'Ceiling Above Ground Level', value: '0.90 m to 1.20 m' },
      { label: 'Mechanical Air Changes (Parking)', value: '6 to 10 ACH' },
      { label: 'Waterproofing Requirement', value: 'Impermeable tanking to highest groundwater table' }
    ],
    detailedExplanation: 'Basements cannot be utilized for residential living; permitted uses include parking, storage, air-conditioning plant rooms, and electric substations. Waterproofing must be certified against hydrostatic pressure, and two independent staircases are mandatory if basement area exceeds 200 sq.m.',
    agnaaExecution: 'AGNAA Engineering deploys bentonite geotextile waterproofing membranes and crystalline concrete waterproofing (IS 2645 compliant) with sump pump redundancies and CO sensor-driven exhaust ventilation systems.',
    hyderabadContext: 'In Hyderabad granitic rock terrains (e.g. Jubilee Hills, Gachibowli, Madhapur), basement excavation requires controlled chemical rock splitting or diamond-wire saw cutting without dynamic blast vibrations.',
    relatedCalculatorUrl: '/calc/setback-envelope',
    relatedCalculatorLabel: 'Check Basement Setbacks & Footprint',
    backlinks: [
      { label: 'AGNAA Turnkey Constructions', url: 'https://agnaa.in/constructions', type: 'internal' },
      { label: 'GHMC Building Rules Reference', url: 'https://ghmc.gov.in', type: 'external' }
    ],
    tags: ['Basement Height', 'NBC 2026', 'Waterproofing', 'Parking Ventilation', 'Retaining Walls', 'Hyderabad Rock Excavation']
  },
  {
    id: 'NBC-P3-007',
    slug: 'parapet-wall-height-and-balcony-safety-nbc-2016',
    question: 'What is the mandatory height for parapet walls and balcony railings under NBC 2026?',
    shortAnswer: 'Under NBC 2026 Part 3, Clause 12.11 and 12.21, parapet walls and handrails on roof terraces and cantilevered balconies must have a minimum height of 1.05 metres (1050 mm) measured from the finished terrace or balcony floor surface.',
    codeClause: 'NBC 2026, Vol. 1, Part 3, Clause 12.11 & Clause 12.21',
    sourceBook: 'National Building Code of India 2026 (Book 1)',
    category: 'nbc-part3-general',
    categoryLabel: 'NBC 2026: General Building & Setbacks',
    technicalSpecs: [
      { label: 'Minimum Parapet Height', value: '1.05 m (3 ft 5 in)' },
      { label: 'Maximum Solid Parapet Height', value: '1.20 m (without wind load relief)' },
      { label: 'Balcony Railing Height', value: '1.05 m to 1.20 m' },
      { label: 'Maximum Spacing Between Balusters', value: '100 mm (4 in) clear' }
    ],
    detailedExplanation: 'Balusters and decorative grille openings must not allow a 100 mm diameter sphere to pass through, preventing children from falling. Railings must withstand horizontal lateral thrust loads of not less than 0.75 kN/m along the handrail crest.',
    agnaaExecution: 'AGNAA villas utilize 12 mm + 1.52 PVB + 12 mm toughened laminated structural glass railings mounted on base U-channels with grade 316 stainless steel top copings rated for 1.5 kN/m impact loads.',
    hyderabadContext: 'For high-wind hillock plots in Manikonda, Gandipet, and Mokila, AGNAA increases top coping anchorage depths to 150 mm embedded into reinforced concrete ring beams.',
    relatedCalculatorUrl: '/calc/built-up-efficiency',
    relatedCalculatorLabel: 'Calculate Balcony Built-Up Footprint',
    backlinks: [
      { label: 'AGNAA Structural Standards', url: 'https://agnaa.in/design-studio', type: 'internal' }
    ],
    tags: ['Parapet Height', 'Balcony Railing', 'Fall Protection', 'NBC 2026', 'Structural Glass']
  },
  {
    id: 'NBC-P3-008',
    slug: 'mezzanine-floor-area-and-headroom-nbc-2016',
    question: 'What are the restrictions on mezzanine floors under NBC 2026?',
    shortAnswer: 'According to NBC 2026 Part 3, Clause 12.8, a mezzanine floor cannot exceed 1/3rd (33.3%) of the plinth area of the room in which it is situated. It must have a minimum clear height of 2.2 metres both above and below the mezzanine platform.',
    codeClause: 'NBC 2026, Vol. 1, Part 3, Clause 12.8 (Mezzanine Floors)',
    sourceBook: 'National Building Code of India 2026 (Book 1)',
    category: 'nbc-part3-general',
    categoryLabel: 'NBC 2026: General Building & Setbacks',
    technicalSpecs: [
      { label: 'Maximum Floor Coverage', value: '33.3% of main room plinth area' },
      { label: 'Clear Headroom Above Mezzanine', value: '2.20 m (7 ft 3 in)' },
      { label: 'Clear Headroom Below Mezzanine', value: '2.20 m (7 ft 3 in)' },
      { label: 'Minimum Overall Room Height', value: '4.60 m to 4.80 m (slab to slab)' }
    ],
    detailedExplanation: 'Mezzanines count towards total Floor Area Ratio (FAR/FSI) unless exempted under local regional byelaws. A mezzanine cannot be subdivided into smaller rooms and must directly overlook the primary volume.',
    agnaaExecution: 'AGNAA Design Studio creates mezzanine study lofts and home libraries within double-height living areas (6.2 m slab heights), framing panoramic views and integrating spiral structural steel stairs.',
    hyderabadContext: 'In Hyderabad luxury villas, double-height mezzanines overlooking North-facing private garden courtyards provide acoustic privacy while preserving open visual connectivity.',
    relatedCalculatorUrl: '/calc/fsi',
    relatedCalculatorLabel: 'Check FAR / FSI Impact of Mezzanine',
    backlinks: [
      { label: 'AGNAA Design Studio Projects', url: 'https://agnaa.in/portfolio', type: 'internal' },
      { label: 'AGNAA FSI Calculator', url: 'https://agnaa.in/calc/fsi', type: 'internal' }
    ],
    tags: ['Mezzanine Floor', 'FAR/FSI', 'Double Height Living', 'NBC 2026', 'Volumetric Architecture']
  }
];
