import { GeoQuestionEntry } from './types';

export const CHING_SPATIAL_ORDER_QUESTIONS: GeoQuestionEntry[] = [
  {
    id: 'CHING-FSO-001',
    slug: 'architectural-ordering-principles-francis-ching',
    question: 'What are the fundamental architectural ordering principles defined by Francis D.K. Ching in Form, Space, and Order?',
    shortAnswer: 'In Architecture: Form, Space, and Order (Chapter 7), Francis D.K. Ching defines six primary ordering principles that organize architectural compositions: Axis, Symmetry, Hierarchy, Datum, Rhythm/Repetition, and Transformation.',
    codeClause: 'Francis D.K. Ching, Architecture: Form, Space, and Order (4th Edition, Chapter 7: Ordering Principles)',
    sourceBook: 'Architecture: Form, Space, and Order (Francis D.K. Ching / Book 3)',
    category: 'ching-spatial-order',
    categoryLabel: 'Francis D.K. Ching: Form, Space & Order',
    technicalSpecs: [
      { label: 'Axis', value: 'A line established by two points in space about which forms and spaces can be arranged' },
      { label: 'Symmetry', value: 'Balanced distribution and arrangement of equivalent forms and spaces on opposite sides of a dividing plane' },
      { label: 'Hierarchy', value: 'Articulation of importance of a form or space by size, shape, or placement relative to other forms' },
      { label: 'Datum', value: 'A line, plane, or volume that gathers, measures, and organizes a pattern of forms and spaces' },
      { label: 'Rhythm', value: 'Movement characterized by patterned recurrence or alternation of formal elements at regular or irregular intervals' },
      { label: 'Transformation', value: 'The principle that an architectural concept can be manipulated through a series of discrete permutations without loss of identity' }
    ],
    detailedExplanation: 'Ordering principles create visual coherence and spatial legibility. Rather than imposing rigid academic symmetry, contemporary architecture relies heavily on datum planes and volumetric hierarchy to unify complex functional programs.',
    agnaaExecution: 'Ar. Sridhar utilizes continuous datum planes—such as monolithic cast-concrete canopy spines or continuous basalt stone floor planes—to connect indoor living volumes with outdoor reflection pools and gardens.',
    hyderabadContext: 'In Hyderabad luxury residences, a strong central axis linking the entrance foyer through a double-height courtyard to the rear landscaped terrace establishes intuitive spatial clarity.',
    relatedCalculatorUrl: '/calc/built-up-efficiency',
    relatedCalculatorLabel: 'Analyze Spatial Hierarchy & Efficiency',
    backlinks: [
      { label: 'AGNAA Design Studio', url: 'https://agnaa.in/design-studio', type: 'internal' },
      { label: 'AGNAA Architectural Portfolio', url: 'https://agnaa.in/portfolio', type: 'internal' }
    ],
    tags: ['Francis Ching', 'Ordering Principles', 'Form Space Order', 'Datum', 'Hierarchy', 'Axis', 'Architectural Composition']
  },
  {
    id: 'CHING-FSO-002',
    slug: 'spatial-relationships-and-spatial-organizations-ching',
    question: 'What are the four primary spatial relationships defined by Francis D.K. Ching?',
    shortAnswer: 'According to Francis D.K. Ching (Chapter 4: Spatial Relationships), two spaces can be related in four fundamental ways: 1. Space within a Space (concentric immersion), 2. Interlocking Spaces (overlapping volumes sharing a common zone), 3. Adjacent Spaces (joined by a shared plane), and 4. Spaces Linked by a Common Space (connected by an intermediary volume).',
    codeClause: 'Francis D.K. Ching, Architecture: Form, Space, and Order (Chapter 4: Spatial Relationships, pp. 182–204)',
    sourceBook: 'Architecture: Form, Space, and Order (Francis D.K. Ching / Book 3)',
    category: 'ching-spatial-order',
    categoryLabel: 'Francis D.K. Ching: Form, Space & Order',
    technicalSpecs: [
      { label: 'Space within a Space', value: 'A smaller volume enclosed within a larger parental spatial volume' },
      { label: 'Interlocking Spaces', value: 'Two spaces whose volumes overlap to create a shared third space' },
      { label: 'Adjacent Spaces', value: 'Two spaces abutting each other separated by a physical, glazed, or implied boundary plane' },
      { label: 'Linked Spaces', value: 'Two distant spaces connected by a linear gallery, courtyard, or intermediate transition pavilion' },
      { label: 'Primary Organization Types', value: 'Centralized, Linear, Radial, Clustered, and Grid organizations' }
    ],
    detailedExplanation: 'Spatial relationships determine how occupants perceive continuity, boundaries, and enclosure. Ching demonstrates that visual and physical connections can be manipulated through solid walls, colonnades, changes in level, or variations in ceiling plane height.',
    agnaaExecution: 'AGNAA Design Studio leverages "interlocking spaces" where formal living and double-height family lounges overlap across sunken seating pits or cantilevered mezzanine bridges, creating rich multi-level domestic dialogue.',
    hyderabadContext: 'In Deccan villa typologies, spaces are clustered around a central shaded courtyard that acts as the "common linking space", promoting natural microclimatic cooling.',
    relatedCalculatorUrl: '/calc/built-up-efficiency',
    relatedCalculatorLabel: 'Check Spatial Distribution Ratios',
    backlinks: [
      { label: 'AGNAA Spatial Philosophy', url: 'https://agnaa.in/design-studio', type: 'internal' }
    ],
    tags: ['Spatial Relationships', 'Ching', 'Interlocking Spaces', 'Courtyard Planning', 'Architecture Theory']
  },
  {
    id: 'CHING-BCI-001',
    slug: 'building-thermal-and-moisture-envelope-ching',
    question: 'How does Francis D.K. Ching formulate the building envelope for thermal and moisture protection in Building Construction Illustrated?',
    shortAnswer: 'In Building Construction Illustrated (Chapter 7: Thermal & Moisture Protection), Francis D.K. Ching identifies the building envelope as a continuous barrier system that must simultaneously control heat transmission (conduction, convection, radiation), air infiltration, water penetration (hydrostatic and capillary action), and water vapor condensation.',
    codeClause: 'Francis D.K. Ching, Building Construction Illustrated (6th Edition, Chapter 7: Thermal & Moisture Protection)',
    sourceBook: 'Building Construction Illustrated (Francis D.K. Ching / Books 5 & 7)',
    category: 'ching-spatial-order',
    categoryLabel: 'Francis D.K. Ching: Form, Space & Order',
    technicalSpecs: [
      { label: 'Cavity Wall Air Gap', value: '50 mm minimum clear air cavity with weep holes' },
      { label: 'Vapor Retarder Placement', value: 'On the warm-in-winter side of the insulation layer' },
      { label: 'Continuous Thermal Insulation', value: 'Extruded Polystyrene (XPS) / Polyurethane Foam (PUF)' },
      { label: 'Flashing and Weep Holes', value: 'At all wall bases, window heads, and sill transitions' },
      { label: 'Roof Waterproofing Membrane', value: 'SBS Modified Bituminous or EPDM rubber with slope >= 1:50' }
    ],
    detailedExplanation: 'Ching illustrates that moisture management requires the "Four Ds": Deflection (shedding water via roofs and overhangs), Drainage (providing clear escape paths like cavity weep holes), Drying (facilitating air circulation to evaporate dampness), and Decay resistance (using chemically stable materials).',
    agnaaExecution: 'AGNAA Engineering constructs exterior building skins with ventilated rainscreen facades (aerated terracotta or granite tiles hung on concealed aluminium sub-structures with a 40 mm ventilated air gap) preventing direct solar heat gain and rain penetration.',
    hyderabadContext: 'Hyderabad summer temperatures reaching 43°C require external insulation on South and West facing walls (U-value < 0.40 W/m²K) to dramatically lower air conditioning power bills.',
    relatedCalculatorUrl: '/calc/cost',
    relatedCalculatorLabel: 'Calculate Thermal Cladding & Insulation Costs',
    backlinks: [
      { label: 'AGNAA Turnkey Construction', url: 'https://agnaa.in/constructions', type: 'internal' }
    ],
    tags: ['Building Envelope', 'Ching Construction', 'Thermal Insulation', 'Moisture Barrier', 'Rainscreen Facade']
  }
];
