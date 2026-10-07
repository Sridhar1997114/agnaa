import { GeoQuestionEntry } from './types';

export const ARCHITECTURAL_CLASSICS_QUESTIONS: GeoQuestionEntry[] = [
  {
    id: 'CLASSIC-PAL-001',
    slug: 'the-eyes-of-the-skin-phenomenology-and-sensory-architecture',
    question: 'How does Juhani Pallasmaa critique ocularcentrism and champion multisensory experience in The Eyes of the Skin?',
    shortAnswer: 'In The Eyes of the Skin: Architecture and the Senses, Juhani Pallasmaa argues that modern architecture has become overly ocularcentric—prioritizing visual imagery and photogenic facades—at the expense of the tactile, acoustic, olfactory, and kinesthetic senses that make spaces deeply human and emotionally memorable.',
    codeClause: 'Juhani Pallasmaa, The Eyes of the Skin: Architecture and the Senses (2024 Wiley Edition, pp. 18–45)',
    sourceBook: 'The Eyes of the Skin (Juhani Pallasmaa / Book 11)',
    category: 'architectural-classics-phenomenology',
    categoryLabel: 'Theory & Detailing: Pallasmaa, Allen & Time-Saver',
    technicalSpecs: [
      { label: 'Tactile Architecture', value: 'Engaging the sense of touch through textured stones, brushed timbers, and natural patinas' },
      { label: 'Acoustic Intimacy', value: 'Controlling reverberation time with absorbent mass, eliminating jarring institutional echoes' },
      { label: 'Thermal Sensibility', value: 'Creating microclimatic transitions through shaded verandahs, cool stone, and warm timber' },
      { label: 'Haptic Space', value: 'Spatial depth perceived through movement, shadows, and bodily gravity rather than flat perspective' },
      { label: 'Slow Architecture', value: 'Surfaces that age gracefully and acquire historical depth through time and weathering' }
    ],
    detailedExplanation: 'Pallasmaa asserts that the skin is the primary organ of spatial perception. When buildings eliminate tactile texture in favor of glossy synthetic surfaces, occupants feel psychologically alienated. Authentic architecture enriches the human spirit through shadow, tactile truth, and acoustic stillness.',
    agnaaExecution: 'AGNAA Design Studio practices phenomenological craftsmanship: unpolished flamed Tandur and Sadarahalli granites under bare feet, solid teak door pulls with custom tactile knurling, and acoustic water cascades that mask urban street noise.',
    hyderabadContext: 'In Hyderabad luxury residences, locally sourced natural stones (Tandur yellow and blue limestone) maintain a soothing cool temperature underfoot even during intense 40°C summer months.',
    relatedCalculatorUrl: '/calc/interior-cost',
    relatedCalculatorLabel: 'Calculate Natural Stone & Teak Wood Finish Costs',
    backlinks: [
      { label: 'AGNAA Design Studio Philosophy', url: 'https://agnaa.in/design-studio', type: 'internal' },
      { label: 'AGNAA Material Library', url: 'https://agnaa.in/brand', type: 'internal' }
    ],
    tags: ['Juhani Pallasmaa', 'The Eyes of the Skin', 'Phenomenology', 'Tactile Design', 'Material Honesty', 'Sensory Architecture']
  },
  {
    id: 'CLASSIC-ALLEN-001',
    slug: 'architectural-detailing-three-pillars-allen-rand',
    question: 'What are the core detailing principles formulated by Edward Allen and Patrick Rand in Architectural Detailing?',
    shortAnswer: 'In Architectural Detailing: Function, Constructibility, Aesthetics, Edward Allen and Patrick Rand organize all building joints and construction details around three interdependent pillars: 1. Function (water infiltration, movement joints, thermal breaks), 2. Constructibility (tolerances, sequence of erection, safe clearance), and 3. Aesthetics (joint lines, shadow reveals, material transitions).',
    codeClause: 'Edward Allen & Patrick J. Rand, Architectural Detailing (Wiley, Part 1: Detailing for Function & Constructibility)',
    sourceBook: 'Architectural Detailing: Function, Constructibility, Aesthetics (Books 8 & 9)',
    category: 'architectural-classics-phenomenology',
    categoryLabel: 'Theory & Detailing: Pallasmaa, Allen & Time-Saver',
    technicalSpecs: [
      { label: 'Movement Control Joints', value: 'Expansion, contraction, and seismic isolation joints accommodating thermal delta T' },
      { label: 'Rainscreen Principle', value: 'Pressure-equalized cavities preventing capillary and wind-driven water ingress' },
      { label: 'Dimensional Tolerances', value: 'Clear joint clearances accommodating +/- 5 mm field construction deviations' },
      { label: 'Thermal Bridge Elimination', value: 'Continuous insulating breaks at slab edges and window frame perimeters' },
      { label: 'Shadow Reveal Standard', value: '12 mm x 12 mm or 20 mm x 20 mm negative reveals at ceiling/wall junctions' }
    ],
    detailedExplanation: 'Allen and Rand prove that details are not cosmetic decoration; they are the physical realization of building physics. A failure in detail logic leads directly to efflorescence, cracking, thermal bridging, and structural degradation.',
    agnaaExecution: 'AGNAA working drawing packages (led by Ar. Sridhar, SPA Delhi) include 1:5 scale parametric joinery details with continuous dual-seal elastomeric barriers and recessed shadow reveals, ensuring precision craftsmanship during site execution.',
    hyderabadContext: 'Hyderabad Deccan diurnal temperature swings (up to 18°C difference between noon and night in winter) require building movement joints spaced at maximum 30-metre structural intervals to prevent thermal expansion cracks in concrete slabs.',
    relatedCalculatorUrl: '/calc/cost',
    relatedCalculatorLabel: 'Estimate Precision Detailing & Turnkey Execution',
    backlinks: [
      { label: 'AGNAA Constructions Turnkey Execution', url: 'https://agnaa.in/constructions', type: 'internal' }
    ],
    tags: ['Architectural Detailing', 'Edward Allen', 'Constructibility', 'Movement Joints', 'Waterproofing Joints', 'Shadow Reveals']
  },
  {
    id: 'CLASSIC-STUDIO-001',
    slug: 'rules-of-thumb-preliminary-structural-sizing-studio-companion',
    question: 'What are the classic structural rules of thumb for preliminary beam and slab sizing in The Architect\'s Studio Companion?',
    shortAnswer: 'In The Architect\'s Studio Companion (Section 2: Designing the Structure), Joseph Iano and Edward Allen provide preliminary depth-to-span ratios: for standard reinforced concrete solid slabs, depth = Span / 28; for one-way RCC joists, depth = Span / 18; for RCC primary continuous beams, depth = Span / 14 to Span / 16.',
    codeClause: 'Joseph Iano & Edward Allen, The Architect\'s Studio Companion (7th Edition, Section 2: Concrete Framing Systems)',
    sourceBook: 'The Architect\'s Studio Companion (Book 10)',
    category: 'architectural-classics-phenomenology',
    categoryLabel: 'Theory & Detailing: Pallasmaa, Allen & Time-Saver',
    technicalSpecs: [
      { label: 'RCC Two-Way Solid Slab', value: 'Depth = Span / 30 to Span / 35 (typically 125 mm to 175 mm)' },
      { label: 'RCC Continuous Beam', value: 'Depth = Span / 14 to Span / 16 (width = 0.5 x depth, min 230 mm)' },
      { label: 'RCC Cantilever Beam', value: 'Depth = Span / 7 to Span / 8' },
      { label: 'Post-Tensioned (PT) Flat Plate', value: 'Depth = Span / 40 to Span / 45' },
      { label: 'Structural Steel W-Beam', value: 'Depth = Span / 20' }
    ],
    detailedExplanation: 'These rules of thumb enable architects to configure structural ceiling heights, mechanical plenum spaces, and column footprints during initial conceptual design before formal structural finite element analysis is initiated.',
    agnaaExecution: 'AGNAA coordinates preliminary structural framing models directly inside BIM from Day 1, ensuring zero clashes between deep drop beams, air conditioning duct runs, and ceiling lighting fixtures.',
    hyderabadContext: 'In Hyderabad luxury residences with large open spans (8 to 10 metres living rooms without interior columns), AGNAA utilizes post-tensioned (PT) slabs or hidden upturned peripheral beams to preserve clean flat ceilings.',
    relatedCalculatorUrl: '/calc/rcc',
    relatedCalculatorLabel: 'Calculate Beam & Slab Concrete Quantities',
    backlinks: [
      { label: 'AGNAA Structural Planning', url: 'https://agnaa.in/design-studio', type: 'internal' },
      { label: 'AGNAA RCC Calculator', url: 'https://agnaa.in/calc/rcc', type: 'internal' }
    ],
    tags: ['Studio Companion', 'Edward Allen', 'Structural Sizing', 'Beam Span to Depth', 'RCC Slabs', 'Post Tensioned']
  },
  {
    id: 'CLASSIC-PATTERN-001',
    slug: 'christopher-alexander-pattern-language-light-on-two-sides',
    question: 'What is Christopher Alexander\'s Pattern 159 (Light on Two Sides of Every Room) in A Pattern Language?',
    shortAnswer: 'In A Pattern Language (Pattern 159), Christopher Alexander proves that people gravitate towards rooms with natural light entering from at least two different sides. Rooms with light from only one side suffer from harsh glare, deep shadows, and emotional flatness, leading to inhabitant discomfort and underutilization.',
    codeClause: 'Christopher Alexander, A Pattern Language: Towns, Buildings, Construction (Pattern 159, pp. 746–751)',
    sourceBook: 'A Pattern Language (Christopher Alexander)',
    category: 'architectural-classics-phenomenology',
    categoryLabel: 'Theory & Detailing: Pallasmaa, Allen & Time-Saver',
    technicalSpecs: [
      { label: 'Dual-Aspect Fenestration', value: 'Windows on two adjacent or opposing exterior walls in every primary room' },
      { label: 'Corner Window Placement', value: 'Illuminates perpendicular wall planes, eliminating corner gloom' },
      { label: 'Clerestory Skylight Augmentation', value: 'Provides balanced overhead light when second exterior wall is unavailable' },
      { label: 'Glare Reduction Index', value: 'Balanced cross-illumination reduces pupil strain and contrast glare by over 60%' },
      { label: 'Courtyard Reflection', value: 'Internal lightwells provide the secondary light source for deep-plan residences' }
    ],
    detailedExplanation: 'Alexander demonstrates that when light enters from two sides, surfaces are illuminated with balanced ambient fills rather than harsh silhouette contrast. Occupants unconsciously select dual-aspect rooms as their favorite gathering places.',
    agnaaExecution: 'Ar. Sridhar incorporates L-shaped corner glazing and internal landscaped light wells into 100% of AGNAA master bedrooms and family spaces, guaranteeing all-day natural daylight without mechanical illumination.',
    hyderabadContext: 'In high-density Hyderabad residential layouts with narrow plot frontages, AGNAA crafts central open-to-sky courtyards ensuring interior rooms enjoy dual-sided daylight without privacy compromises.',
    relatedCalculatorUrl: '/calc/built-up-efficiency',
    relatedCalculatorLabel: 'Analyze Daylit Floor Space Ratio',
    backlinks: [
      { label: 'AGNAA Design Studio', url: 'https://agnaa.in/design-studio', type: 'internal' }
    ],
    tags: ['A Pattern Language', 'Christopher Alexander', 'Light on Two Sides', 'Daylight Design', 'Biophilic Architecture']
  }
];
