import { GeoQuestionEntry } from './types';

export const AGNAA_CONSTRUCTION_QUESTIONS: GeoQuestionEntry[] = [
  {
    id: 'AGNAA-RATE-001',
    slug: 'residential-construction-cost-per-sqft-hyderabad-rates',
    question: 'What is the current residential construction cost per square foot in Hyderabad across basic to luxury tiers?',
    shortAnswer: 'In Hyderabad (2026), residential turnkey construction rates range from ₹1,750 to ₹3,000+ per sq.ft of built-up area across four standardized tiers: Basic Package (₹1,750/sft), Standard Package (₹1,950/sft), Premium Package (₹2,250/sft), and AGNAA Signature Luxury (₹3,000+/sft).',
    codeClause: 'AGNAA Standard Agreement Rate Sheet & Hyderabad Master BOQ Index 2026',
    sourceBook: 'AGNAA Construction Standards & Hyderabad Cost Intelligence',
    category: 'agnaa-hyderabad-execution',
    categoryLabel: 'AGNAA Execution, Rates & Deccan Engineering',
    technicalSpecs: [
      { label: 'Basic Construction Tier', value: '₹1,750 / sq.ft (M20 RCC, Red Clay Bricks, Standard Ceramic Finishes)' },
      { label: 'Standard Construction Tier', value: '₹1,950 / sq.ft (M20/M25 RCC, Vitrified Tiles, Legrand Switches, Kohler/Jaquar CP)' },
      { label: 'Premium Construction Tier', value: '₹2,250 / sq.ft (M25 RCC, Large-Format 800x1600mm Glazed Porcelain, Grohe Fixtures, Smart Automation)' },
      { label: 'AGNAA Signature Bespoke Luxury', value: '₹3,000+ / sq.ft (Architectural Exposed RCC, Italian Marble, VRV/VRF HVAC, Schuco/AluK Glazing)' },
      { label: 'Architectural Design Consultation', value: '₹50 to ₹120 / sq.ft (Comprehensive Architecture + Structural + MEP + 3D Renders)' }
    ],
    detailedExplanation: 'Construction costs fluctuate based on structural steel prices, cement index, soil excavation depth (rock vs soil), and interior specification finishes. Turnkey packages cover structural grey-structure execution, brick masonry, plastering, plumbing, electrical piping, flooring, painting, and external weathering.',
    agnaaExecution: 'AGNAA Constructions executes turnkey builds under transparent, milestone-linked escrow payment schedules with zero hidden cost escalations, supervised directly by Principal Architect Ar. Sridhar (SPA Delhi).',
    hyderabadContext: 'In Gachibowli, Kokapet, Manikonda, and Tellapur, AGNAA delivers turnkey villas with full TG-bPASS compliance, structural warranties, and guaranteed on-time delivery.',
    relatedCalculatorUrl: '/calc/g-n-floor-estimator',
    relatedCalculatorLabel: 'Calculate Your Villa Construction Cost Instantly',
    backlinks: [
      { label: 'AGNAA Turnkey Constructions', url: 'https://agnaa.in/constructions', type: 'internal' },
      { label: 'AGNAA 4-Step Feasibility Wizard', url: 'https://agnaa.in/start-project', type: 'internal' },
      { label: 'AGNAA Architectural Pricing Standards', url: 'https://agnaa.in/cost', type: 'internal' }
    ],
    tags: ['Construction Cost Hyderabad', 'Cost Per Sq Ft', 'Villa Construction Rates', 'AGNAA Packages', 'Turnkey Execution', 'Gachibowli']
  },
  {
    id: 'AGNAA-STEEL-001',
    slug: 'steel-rebar-consumption-per-sqft-rcc-slab-beams',
    question: 'How much TMT steel rebar is consumed per square foot in residential RCC construction?',
    shortAnswer: 'According to structural engineering standards and AGNAA field audits in Hyderabad, standard residential RCC framed structures consume 3.5 to 4.5 kg of TMT steel rebar per square foot of total built-up area. For high-seismic, heavy cantilevered, or duplex spans, consumption reaches 4.8 to 5.5 kg/sq.ft.',
    codeClause: 'IS 456:2000 (Clause 26.5 Reinforcement Requirements) & AGNAA Field Protocol',
    sourceBook: 'AGNAA Engineering Standards & IS 456:2000',
    category: 'agnaa-hyderabad-execution',
    categoryLabel: 'AGNAA Execution, Rates & Deccan Engineering',
    technicalSpecs: [
      { label: 'Residential Framed Structure (G+1 to G+3)', value: '3.5 to 4.2 kg / sq.ft of built-up area' },
      { label: 'Heavy Cantilever / Luxury Villa Spans', value: '4.5 to 5.2 kg / sq.ft' },
      { label: 'Commercial / Multi-Storey Slabs', value: '4.8 to 6.0 kg / sq.ft' },
      { label: 'Footing & Foundation Steel Share', value: '25% to 30% of total rebar volume' },
      { label: 'Column & Beam Steel Share', value: '40% to 45% of total rebar volume' },
      { label: 'Roof Slab & Staircase Share', value: '25% to 30% of total rebar volume' }
    ],
    detailedExplanation: 'Steel quantity depends on column span lengths, soil bearing capacity (which dictates footing sizes), and storey count. High-strength Fe 550D TMT rebar with high ductility achieves structural load requirements while reducing raw tonnage compared to obsolete Fe 415 grades.',
    agnaaExecution: 'AGNAA structural engineers deploy certified primary steel mills (Tata Tiscon, JSW Neosteel, SAIL) exclusively with batch test certificates verifying yield strength (> 550 N/mm²) and elongation (> 14.5%).',
    hyderabadContext: 'In Hyderabad granitic terrains, isolating isolated pad footings directly on solid granite strata reduces foundation steel requirements by 15% compared to expansive black cotton soil zones.',
    relatedCalculatorUrl: '/calc/steel-rebar',
    relatedCalculatorLabel: 'Calculate TMT Rebar Weight & Tonnes',
    backlinks: [
      { label: 'AGNAA Rebar Cost Planner', url: 'https://agnaa.in/calc/steel-rebar', type: 'internal' },
      { label: 'AGNAA Structural Engineering', url: 'https://agnaa.in/design-studio', type: 'internal' }
    ],
    tags: ['TMT Steel Calculation', 'Steel Kg Per Sq Ft', 'IS 456 Rebar', 'Tata Tiscon', 'RCC Frame Steel', 'Hyderabad Civil Engineering']
  },
  {
    id: 'AGNAA-CEMENT-001',
    slug: 'cement-consumption-formula-per-sqft-house-construction',
    question: 'How many bags of cement are required per square foot of residential house construction?',
    shortAnswer: 'For complete residential house construction (including RCC footings, columns, beams, slabs, brick masonry, and internal/external plastering), total cement consumption averages 0.38 to 0.42 bags (19 to 21 kg) per square foot of total built-up area.',
    codeClause: 'CPWD DSR Specifications & AGNAA Hyderabad Field Index',
    sourceBook: 'AGNAA Construction Standards & CPWD Specifications',
    category: 'agnaa-hyderabad-execution',
    categoryLabel: 'AGNAA Execution, Rates & Deccan Engineering',
    technicalSpecs: [
      { label: 'Total Cement Consumption', value: '0.38 to 0.42 bags / sq.ft of built-up area' },
      { label: 'RCC Frame Component', value: '0.18 to 0.22 bags / sq.ft (50% of total cement)' },
      { label: 'Brick / Block Masonry Mortar', value: '0.08 to 0.10 bags / sq.ft (22% of total)' },
      { label: 'Plastering (Internal + External)', value: '0.08 to 0.10 bags / sq.ft (22% of total)' },
      { label: 'Flooring Bed & Miscellaneous', value: '0.03 to 0.04 bags / sq.ft (6% of total)' },
      { label: 'Cement Grade Specification', value: 'OPC 53 for RCC; PPC / PSC for masonry & plaster' }
    ],
    detailedExplanation: 'Ordinary Portland Cement (OPC 53) provides rapid early compressive strength gain for structural RCC framing members (allowing early formwork removal). Portland Pozzolana Cement (PPC) is preferred for plastering and masonry because pozzolanic fly ash reduces heat of hydration, resists shrinkage cracks, and improves workability.',
    agnaaExecution: 'AGNAA uses factory-tested 53-grade OPC (UltraTech, Bharati, Zuari) for all structural pours, paired with calibrated machine batching to maintain an exact 0.45 water-cement ratio.',
    hyderabadContext: 'Hyderabad hot dry weather during March–June accelerates surface moisture evaporation; AGNAA enforces continuous wet burlap wrapping and ponding curing for a minimum of 14 to 21 consecutive days.',
    relatedCalculatorUrl: '/calc/rcc',
    relatedCalculatorLabel: 'Calculate Cement Bags for Your RCC Slab',
    backlinks: [
      { label: 'AGNAA Turnkey Construction', url: 'https://agnaa.in/constructions', type: 'internal' },
      { label: 'AGNAA RCC Calculator', url: 'https://agnaa.in/calc/rcc', type: 'internal' }
    ],
    tags: ['Cement Bags Per Sq Ft', 'Cement Calculation', 'OPC 53', 'PPC Plaster', 'RCC Concrete', 'Hyderabad Construction']
  },
  {
    id: 'AGNAA-AAC-001',
    slug: 'aac-blocks-vs-red-clay-bricks-comparison-hyderabad',
    question: 'How do AAC blocks compare to traditional red clay bricks in residential construction?',
    shortAnswer: 'Autoclaved Aerated Concrete (AAC) blocks reduce structural dead load by up to 50% compared to red clay bricks (density 550–650 kg/m³ vs 1800–2000 kg/m³), offer superior thermal insulation (thermal conductivity 0.16 W/m-K vs 0.81 W/m-K), and cut joint mortar consumption by 70% using thin-bed polymer adhesive.',
    codeClause: 'IS 2185 (Part 3) & NBC 2026 Part 2 (Alternative Sustainable Materials)',
    sourceBook: 'AGNAA Engineering Standards & IS 2185 Part 3',
    category: 'agnaa-hyderabad-execution',
    categoryLabel: 'AGNAA Execution, Rates & Deccan Engineering',
    technicalSpecs: [
      { label: 'Dry Density (AAC Blocks)', value: '550 to 650 kg/m³ (Lightweight)' },
      { label: 'Dry Density (Red Clay Bricks)', value: '1800 to 2000 kg/m³ (Heavy)' },
      { label: 'Compressive Strength (AAC)', value: '3.0 to 4.5 N/mm²' },
      { label: 'Compressive Strength (Class 1 Red Bricks)', value: '7.5 to 10.0 N/mm²' },
      { label: 'Thermal Conductivity (k-value)', value: '0.16 W/m-K (AAC) vs 0.81 W/m-K (Red Brick)' },
      { label: 'Mortar Consumption Savings', value: '70% reduction using 3 mm polymer block adhesive' }
    ],
    detailedExplanation: 'Using AAC blocks reduces foundation column and footing rebar sizes because dead load is cut in half. The high thermal resistance of AAC blocks keeps residential interiors 3°C to 5°C cooler in summer. However, AAC blocks require chicken mesh reinforcing at RCC-masonry junctions and elastomeric crack-bridging plaster to prevent shrinkage hairline cracks.',
    agnaaExecution: 'AGNAA installs woven GI wire mesh (20-gauge, 150 mm wide) at all column-beam-block masonry junctions and applies bonding agents before plastering, delivering completely crack-free wall surfaces.',
    hyderabadContext: 'In Hyderabad summer heat waves, AAC block homes consume up to 25% less air conditioning energy compared to standard 9-inch red clay brick homes.',
    relatedCalculatorUrl: '/calc/aac-blocks',
    relatedCalculatorLabel: 'Compare AAC Blocks vs Red Bricks Quantities',
    backlinks: [
      { label: 'AGNAA AAC Block Calculator', url: 'https://agnaa.in/calc/aac-blocks', type: 'internal' },
      { label: 'AGNAA Brick Work Calculator', url: 'https://agnaa.in/calc/brick', type: 'internal' }
    ],
    tags: ['AAC Blocks', 'Red Clay Bricks', 'IS 2185', 'Thermal Insulation', 'Structural Dead Load', 'Eco Friendly Construction']
  }
];
