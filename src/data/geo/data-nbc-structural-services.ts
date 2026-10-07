import { GeoQuestionEntry } from './types';

export const NBC_STRUCTURAL_SERVICES_QUESTIONS: GeoQuestionEntry[] = [
  {
    id: 'NBC-STR-001',
    slug: 'minimum-concrete-cover-rcc-elements-is-456-nbc',
    question: 'What is the minimum clear concrete cover required for RCC slabs, beams, columns, and footings under IS 456 and NBC 2026?',
    shortAnswer: 'Under IS 456:2000 (Table 16 & Clause 26.4) and NBC 2026 Part 6 Section 5, minimum nominal concrete cover to reinforcement bars is: 20 mm for slabs, 25 mm for beams, 40 mm for columns, and 50 mm for foundations and footings (increased to 75 mm if cast against uneven ground).',
    codeClause: 'IS 456:2000 Table 16 & NBC 2026 Part 6 Section 5 (Concrete)',
    sourceBook: 'National Building Code of India 2026 (Part C Structural) & IS 456:2000',
    category: 'nbc-structural-services',
    categoryLabel: 'NBC 2026: Structural RCC & MEP Services',
    technicalSpecs: [
      { label: 'RCC Slab Nominal Cover', value: '20 mm (or bar diameter, whichever is greater)' },
      { label: 'RCC Beam Nominal Cover', value: '25 mm (30 mm for severe exposure)' },
      { label: 'RCC Column Nominal Cover', value: '40 mm (minimum 25 mm for columns < 200 mm)' },
      { label: 'RCC Raft / Footing (Against Blinding)', value: '50 mm' },
      { label: 'RCC Footing (Direct Earth Contact)', value: '75 mm' },
      { label: 'Minimum Fire Cover (2-Hour Rating)', value: '20 mm (slab), 40 mm (beam/column)' }
    ],
    detailedExplanation: 'Clear concrete cover protects steel reinforcement bars against ambient corrosion, carbonation, and fire-induced yield loss. The cover thickness must never be less than the diameter of the longitudinal bar. In coastal or chemically aggressive environments, nominal covers must be increased by 15 mm to 25 mm.',
    agnaaExecution: 'AGNAA Turnkey Construction enforces manufactured factory-grade polymer/concrete cover blocks (50 MPa compressive strength) with mechanical tie wires tied at 800 mm grid intervals, completely eliminating site-made timber or porous mortar spacers.',
    hyderabadContext: 'In Hyderabad granitic black-cotton or red-loam soils, column footings are cast over a 100 mm thick M10 Grade Plain Cement Concrete (PCC) mud mat with 50 mm certified cover blocks.',
    relatedCalculatorUrl: '/calc/rcc',
    relatedCalculatorLabel: 'Calculate RCC Concrete & Reinforcement Quantities',
    backlinks: [
      { label: 'AGNAA Structural Engineering Hyderabad', url: 'https://agnaa.in/constructions', type: 'internal' },
      { label: 'AGNAA RCC Slab Calculator', url: 'https://agnaa.in/calc/rcc', type: 'internal' },
      { label: 'Bureau of Indian Standards IS 456', url: 'https://www.bis.gov.in', type: 'external' }
    ],
    tags: ['IS 456', 'Concrete Cover', 'RCC Slabs', 'Footing Cover', 'Corrosion Protection', 'Hyderabad Civil Engineering']
  },
  {
    id: 'NBC-STR-002',
    slug: 'per-capita-domestic-water-requirement-nbc-2026',
    question: 'What is the standard per-capita daily water supply requirement under NBC 2026?',
    shortAnswer: 'Under NBC 2026 Part 9 Section 1 (Plumbing Services, Clause 4.1.1), the standard domestic water requirement for residential buildings with full flushing systems is 135 litres per capita per day (LPCD), distributed into 90 LPCD for domestic usage and 45 LPCD for flushing.',
    codeClause: 'NBC 2026, Vol. 2, Part 9, Section 1, Clause 4.1.1 (Water Supply)',
    sourceBook: 'National Building Code of India 2026 (Part F Plumbing) & IS 1172',
    category: 'nbc-structural-services',
    categoryLabel: 'NBC 2026: Structural RCC & MEP Services',
    technicalSpecs: [
      { label: 'Standard Residential Requirement', value: '135 LPCD (Litres/Capita/Day)' },
      { label: 'Luxury Multi-Bath Residential', value: '200 LPCD' },
      { label: 'Commercial Office Occupancy', value: '45 LPCD' },
      { label: 'Flushing Component', value: '45 LPCD (dual flush saves 25%)' },
      { label: 'Domestic Cooking & Drinking', value: '10 to 15 LPCD' },
      { label: 'Fire Reserve Storage Buffer', value: '50,000 to 100,000 Litres underground' }
    ],
    detailedExplanation: 'Water distribution must maintain minimum residual pressure of 1.0 bar (10 metres head) at the highest fixture. Storage capacities must balance 24 to 36 hours of total household consumption distributed 2/3rd in underground sump tanks and 1/3rd in overhead tanks (OHT).',
    agnaaExecution: 'AGNAA Design Studio engineers dual-plumbed piping configurations (PPR-C hot/cold domestic lines and lead-free CPVC reclaimed greywater flushing lines) paired with VFD (variable frequency drive) booster pumps to maintain a constant 2.5 bar water pressure at every shower fixture.',
    hyderabadContext: 'With Hyderabad Metro Water Supply (HMWSSB) water alternate-day schedules, AGNAA residential masterplans integrate minimum 3-day buffer sump capacities (12,000 to 20,000 litres) with automated rainwater harvesting recharge pits.',
    relatedCalculatorUrl: '/calc/cost',
    relatedCalculatorLabel: 'Estimate Plumbing Infrastructure Cost',
    backlinks: [
      { label: 'AGNAA MEP Engineering', url: 'https://agnaa.in/design-studio', type: 'internal' },
      { label: 'Hyderabad Metropolitan Water Supply and Sewerage Board (HMWSSB)', url: 'https://www.hyderabadwater.gov.in', type: 'external' }
    ],
    tags: ['Water Supply', '135 LPCD', 'NBC Part 9', 'Plumbing Engineering', 'HMWSSB', 'Rainwater Harvesting']
  },
  {
    id: 'NBC-STR-003',
    slug: 'sewer-pipe-gradient-and-drainage-slopes-nbc-2026',
    question: 'What are the required gradients and slopes for building drainage pipes under NBC 2026?',
    shortAnswer: 'Under NBC 2026 Part 9 Section 2 (Drainage & Sanitation, Clause 5.3), building sewer pipes must maintain self-cleansing velocity between 0.75 m/s and 2.4 m/s. For 100 mm (4-inch) pipes, the gradient is 1 in 50 to 1 in 60; for 150 mm (6-inch) pipes, the gradient is 1 in 100.',
    codeClause: 'NBC 2026, Vol. 2, Part 9, Section 2, Clause 5.3 (Drainage Gradients)',
    sourceBook: 'National Building Code of India 2026 (Part F Plumbing) & IS 1742',
    category: 'nbc-structural-services',
    categoryLabel: 'NBC 2026: Structural RCC & MEP Services',
    technicalSpecs: [
      { label: '100 mm (4 in) Pipe Gradient', value: '1 in 50 to 1 in 60 (approx 2%)' },
      { label: '150 mm (6 in) Pipe Gradient', value: '1 in 100 (approx 1%)' },
      { label: 'Self-Cleansing Velocity', value: '0.75 m/s minimum' },
      { label: 'Scouring Prevention Velocity', value: '2.4 m/s maximum' },
      { label: 'Manhole Maximum Spacing', value: '15.0 m for pipes up to 150 mm' }
    ],
    detailedExplanation: 'Adequate gradient prevents solids from settling in the sewer run. Gradients steeper than 1 in 20 can cause liquid to run away from solid waste, leaving blockages. Inspection chambers (manholes) are required at all direction changes, diameter transitions, and junction junctions.',
    agnaaExecution: 'AGNAA MEP specialists deploy acoustic-insulated multi-layer uPVC soil and waste pipes suspended with rubber-lined vibration isolators in service shafts, paired with air admittance valves (AAV) to prevent siphonage of water seals.',
    hyderabadContext: 'In Hyderabad municipal zones, sewer outlets connect to GHMC trunk sewer mains through non-return backwater valves to prevent city backflow during monsoon cloudbursts.',
    relatedCalculatorUrl: '/calc/cost',
    relatedCalculatorLabel: 'Calculate Site Drainage & Chambers Cost',
    backlinks: [
      { label: 'AGNAA Foundation & Infrastructure', url: 'https://agnaa.in/foundation', type: 'internal' }
    ],
    tags: ['Drainage Gradient', 'Plumbing NBC', 'Sewer Slope', 'Self Cleansing Velocity', 'Manholes']
  },
  {
    id: 'NBC-STR-004',
    slug: 'seismic-ductile-detailing-norms-is-13920-nbc-2026',
    question: 'What are the seismic ductile detailing requirements for RCC frames under IS 13920 and NBC 2026?',
    shortAnswer: 'Under IS 13920:2016 and NBC 2026 Part 6 Section 1, RCC columns in seismic zones must provide special confining transverse reinforcement with 135-degree hooks with 10 times bar diameter extensions, and hoop spacing not exceeding 100 mm or 1/4th the minimum member dimension in potential plastic hinge zones.',
    codeClause: 'IS 13920:2016 Clause 7 & NBC 2026 Part 6 Section 1 (Earthquake Detailing)',
    sourceBook: 'National Building Code of India 2026 & IS 13920:2016 (Book 1 Part C)',
    category: 'nbc-structural-services',
    categoryLabel: 'NBC 2026: Structural RCC & MEP Services',
    technicalSpecs: [
      { label: 'Stirrup / Link Hook Angle', value: '135 degrees mandatory' },
      { label: 'Hook Extension Length', value: '10 x bar diameter (minimum 75 mm)' },
      { label: 'Hinge Zone Stirrup Spacing', value: 'Minimum of 100 mm or column min dimension / 4' },
      { label: 'Longitudinal Bar Splice Zone', value: 'Middle half of column (never in joint zone)' },
      { label: 'Minimum Column Dimension', value: '300 mm (or 20 x largest longitudinal bar)' }
    ],
    detailedExplanation: 'Ductile detailing ensures the structural frame dissipates earthquake energy through plastic deformation without catastrophic brittle failure. Splices must be staggered, and lap lengths must meet minimum development lengths (50 times bar diameter for Fe 500D / Fe 550D TMT steel).',
    agnaaExecution: 'Ar. Sridhar mandates Fe 550D primary TMT rebar with verified elongation ratios exceeding 14.5%, coupled with welded or mechanical coupler splices for columns exceeding 25 mm diameter to eliminate rebar congestion.',
    hyderabadContext: 'Hyderabad lies in Seismic Zone II (low to moderate hazard), but AGNAA structural designs engineer all multi-storey frames to Zone III ductile parameters as a safety factor against Deccan fault tremors.',
    relatedCalculatorUrl: '/calc/steel-rebar',
    relatedCalculatorLabel: 'Calculate TMT Rebar Weight & Hook Allowances',
    backlinks: [
      { label: 'AGNAA Structural Detailing', url: 'https://agnaa.in/design-studio', type: 'internal' },
      { label: 'AGNAA Rebar Estimator', url: 'https://agnaa.in/calc/steel-rebar', type: 'internal' }
    ],
    tags: ['IS 13920', 'Seismic Detailing', 'Ductile Frame', 'TMT Fe 550D', 'Plastic Hinge', 'Earthquake Engineering']
  }
];
