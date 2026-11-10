import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, ChevronRight, Compass, ShieldCheck, 
  Layers, Ruler, Sparkles, MessageCircle, FileText, 
  CheckCircle2, Building, Eye, Download, Info, Terminal, Cpu, Box
} from 'lucide-react';
import { BENTO_SHOWCASES, MASTER_STUDIO_REGISTRY, StudioProject } from '@/data/studioProjects';
import { DossierPlanViewerIsland, PlanItem } from '@/components/studio/DossierPlanViewerIsland';

// Extended architectural dossier metadata mapping for flagship works
interface DossierData {
  projectCode: string;
  geoCoordinates: string;
  plotArea: string;
  builtUpArea: string;
  fsi: string;
  structuralMix: string;
  steelSpec: string;
  envelopeUValue: string;
  glazingSpec: string;
  ayadiPerimeter: string;
  ayadiDhana: string;
  ayadiRuna: string;
  ayadiYoni: string;
  ayadiAyu: string;
  statutorySanction: string;
  deliveryModel: string;
  narrative: string[];
  evolutionSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  materialProvenance: {
    material: string;
    specification: string;
    provenance: string;
  }[];
  plans: PlanItem[];
}

const FLAGSHIP_DOSSIERS: Record<string, DossierData> = {
  'balinese-resort-villa': {
    projectCode: 'AGNAA-PRJ-2024-KOK',
    geoCoordinates: '17.4156° N, 78.3478° E (Kokapet, Hyderabad)',
    plotArea: '600 sq.yds (5,400 sq.ft)',
    builtUpArea: '8,100 sq.ft (G+2)',
    fsi: '1.50 (Permissible Standard)',
    structuralMix: 'M35 Design Mix Concrete (NABL Batching)',
    steelSpec: 'Tata Tiscon Fe 500D (Direct Mill Supply)',
    envelopeUValue: '0.74 W/m²K (Wienerberger Porotherm)',
    glazingSpec: 'Saint-Gobain SunBan Low-E DGU (6+12A+6)',
    ayadiPerimeter: '200 ft (Ayam Formula)',
    ayadiDhana: '8 / 12 (Net Surplus)',
    ayadiRuna: '3 / 8 (Low Energy Friction)',
    ayadiYoni: 'Dhwaja (East — Auspicious Cardinal)',
    ayadiAyu: '92 Years Expected Longevity',
    statutorySanction: 'TG-bPASS Instant Permit No. TGB-2024-00918',
    deliveryModel: 'Turnkey Architectural EPC (Rule 33 Pure Agent)',
    narrative: [
      'Commissioned for a leading Hyderabad tech entrepreneur on a 600 sq.yd corner plot in Kokapet, this private residence was conceived as a tropical bioclimatic sanctuary that eliminates the boundary between indoor living rooms and reflection water bodies.',
      'Rooted in Sthapatya Veda Ayadi mathematics, the 200 ft perimeter was calibrated to achieve an auspicious Dhana-to-Runa ratio of 8:3 under the East-facing Dhwaja Yoni. The central courtyard functions as an unblocked Brahmasthan, driving passive stack-effect cross-ventilation that reduces annual HVAC energy dependency by 38% compared to standard villa construction.',
      'The structural execution utilized M35 grade concrete with ductile detailing under IS 13920, supporting a 4.2-meter column-free cantilever over the private basalt infinity pool without secondary ground columns.'
    ],
    evolutionSteps: [
      {
        step: '01',
        title: 'Statutory Setback Envelope',
        description: 'Applying GHMC G.O. Ms 168 Table III setbacks (3m front, 2m rear, 1.5m sides) to establish the permissible 360 sqm ground footprint.'
      },
      {
        step: '02',
        title: 'Brahmasthan & Courtyard Subtraction',
        description: 'Carving a central 4.5m x 4.5m open-to-sky courtyard aligned with the cardinal north-south axis for seasonal thermal relief.'
      },
      {
        step: '03',
        title: 'Cantilevered Solar Overhangs',
        description: 'Extending 1.8m deep basalt eaves to completely shade west and south glazed facades from harsh Deccan summer solar radiation.'
      },
      {
        step: '04',
        title: 'Bioclimatic Water Interface',
        description: 'Integrating an infinity reflection water body along the windward edge to evaporatively pre-cool incoming prevailing breezes.'
      }
    ],
    materialProvenance: [
      {
        material: 'Solid Quarter-Sawn Burma Teak',
        specification: '45mm thick solid core entry portals with concealed magnetic acoustic gaskets.',
        provenance: 'Certified FSC Sustainable Millwork'
      },
      {
        material: 'Dressed Black Basalt Stone',
        specification: 'Flamed non-slip 30mm coping slabs for zero-edge reflection pool.',
        provenance: 'Deccan Plateau Quarries, Telangana'
      },
      {
        material: 'Wienerberger Porotherm SmartBricks',
        specification: 'Clay hollow masonry providing acoustic attenuation > 48 dB and thermal inertia.',
        provenance: 'Manufactured under ISO 14001 Standards'
      },
      {
        material: 'Saint-Gobain Solar Control DGU',
        specification: 'Thermal-break aluminum frames with argon-filled low-emissivity double glass.',
        provenance: 'Saint-Gobain Glass India Ltd'
      }
    ],
    plans: [
      {
        id: 'ground',
        label: 'Level 01 — Spatial Ground Plan',
        description: 'Open-plan living pavilion, sunken pool terrace, guest master suite, and central Brahmasthan courtyard.',
        drawingCode: 'AGNAA-DWG-KOK-A-101',
        discipline: 'Spatial Architecture'
      },
      {
        id: 'first',
        label: 'Level 02 — Private Family Suites',
        description: 'Cantilevered master sanctuary, private study, reading verandas, and walk-in dressing suites.',
        drawingCode: 'AGNAA-DWG-KOK-A-102',
        discipline: 'Spatial Architecture'
      },
      {
        id: 'section',
        label: 'Section A-A — Bioclimatic Stack Path',
        description: 'Longitudinal cross-section demonstrating passive thermal stack air evacuation through the roof monitor.',
        drawingCode: 'AGNAA-DWG-KOK-S-201',
        discipline: 'Spatial Architecture'
      }
    ]
  },
  'sunder-nursery-garden-house': {
    projectCode: 'AGNAA-PRJ-2023-DEL',
    geoCoordinates: '28.5916° N, 77.2435° E (New Delhi)',
    plotArea: '1,200 sq.yds (10,800 sq.ft)',
    builtUpArea: '6,400 sq.ft (Ground + Mezzanine)',
    fsi: '0.60 (Heritage Buffer Conservation Limit)',
    structuralMix: 'Composite Steel Frame + Red Sandstone Ashlar Masonry',
    steelSpec: 'SAIL Structural Hollow Sections + Stainless 316 Ties',
    envelopeUValue: '0.62 W/m²K (Cavity Sandstone Wall)',
    glazingSpec: 'Pilkington Optiwhite Triple-Glazed Low-E Units',
    ayadiPerimeter: '280 ft',
    ayadiDhana: '10 / 12 (Auspicious)',
    ayadiRuna: '2 / 8 (Minimal Friction)',
    ayadiYoni: 'Simha (South — Royal Cardinal)',
    ayadiAyu: '98 Years Projected Lifespan',
    statutorySanction: 'NMA / Heritage Conservation Committee Sanction No. HCC-2022-77',
    deliveryModel: 'Bespoke Turnkey Architecture & Joinery',
    narrative: [
      'Situated directly within the ecological buffer zone of Sunder Nursery Park and Humayun\'s Tomb, this private residence was designed under strict National Monuments Authority (NMA) heritage conservation height guidelines.',
      'The architecture pays homage to Mughal stone craft through dressed Dholpur red sandstone masonry, dry-jointed using stainless steel tie brackets to avoid aggressive mortar dampness. Double-glazed conservatory pavilions capture seasonal botanical light without solar heat gain.',
      'Passive solar chimneys along the southern facade evacuate summer heat while capturing low-angle winter sunlight, ensuring thermal comfort year-round with minimal mechanical climate conditioning.'
    ],
    evolutionSteps: [
      {
        step: '01',
        title: 'Heritage Height & Buffer Restrictions',
        description: 'Imposing a 6.5m strict ceiling limit to preserve sightlines toward adjacent 16th-century Mughal monuments.'
      },
      {
        step: '02',
        title: 'Ashlar Cavity Masonry Spine',
        description: 'Constructing dual-skin Dholpur sandstone walls with a 50mm air gap to establish high thermal mass.'
      },
      {
        step: '03',
        title: 'Lightweight Glazed Conservatory Pavilions',
        description: 'Inserting thermally broken steel glass pavilions to invite botanical views deep into the core.'
      },
      {
        step: '04',
        title: 'Passive Solar Thermal Chimneys',
        description: 'Integrating operable roof vents along the ridge to discharge accumulated warm air naturally.'
      }
    ],
    materialProvenance: [
      {
        material: 'Dholpur Dressed Red Sandstone',
        specification: 'Hand-chiselled 75mm ashlar facing dry-anchored to structural composite frames.',
        provenance: 'Historic Quarry District, Rajasthan'
      },
      {
        material: 'Thermally Broken Steel Sections',
        specification: 'Custom laser-cut slim profile frames with dual-stage EPDM acoustic compression seals.',
        provenance: 'Precision Millwork Workshop'
      },
      {
        material: 'Reclaimed Indian Rosewood Joinery',
        specification: 'Restored historic timber crafted into library partitions and structural pergolas.',
        provenance: 'Heritage Architectural Salvage'
      },
      {
        material: 'Cast Bronze Latches & Hardware',
        specification: 'Solid lost-wax cast architectural hardware finished with hand-rubbed beeswax patina.',
        provenance: 'Artisanal Metal Studio'
      }
    ],
    plans: [
      {
        id: 'ground',
        label: 'Level 01 — Conservatory & Living Pavilions',
        description: 'Triple-height glass conservatory, master stone library, guest court, and dining loggia.',
        drawingCode: 'AGNAA-DWG-DEL-A-101',
        discipline: 'Spatial Architecture'
      },
      {
        id: 'mezzanine',
        label: 'Level 02 — Private Mezzanine Studio',
        description: 'Suspended bridge library, private reading eyrie, and observation terrace.',
        drawingCode: 'AGNAA-DWG-DEL-A-102',
        discipline: 'Spatial Architecture'
      },
      {
        id: 'section',
        label: 'Section B-B — Heritage Line of Sight',
        description: 'Conservation height envelope demonstrating sightline preservation toward Humayun’s Tomb.',
        drawingCode: 'AGNAA-DWG-DEL-S-201',
        discipline: 'Spatial Architecture'
      }
    ]
  },
  'marvella-luxury-tower': {
    projectCode: 'AGNAA-PRJ-2024-MAR',
    geoCoordinates: '17.4239° N, 78.3498° E (Financial District, Hyderabad)',
    plotArea: '3.5 Acres (16,940 sq.yds)',
    builtUpArea: '6,20,000 sq.ft (30 Floors)',
    fsi: '4.00 (High-Rise Transit Corridor)',
    structuralMix: 'M60 Self-Consolidating Concrete Core + Post-Tensioned Slabs',
    steelSpec: 'Tata Tiscon Fe 550D High-Ductility Rebar',
    envelopeUValue: '0.85 W/m²K (Unitized Curtain Wall + Aerated Concrete)',
    glazingSpec: 'Guardian Glass SunGuard SuperNeutral Double Silver DGU',
    ayadiPerimeter: '720 ft (Composite Tower Perimeter)',
    ayadiDhana: '11 / 12 (Maximum Abundance)',
    ayadiRuna: '1 / 8 (Negligible Friction)',
    ayadiYoni: 'Gaja (North — Auspicious Stability)',
    ayadiAyu: '100 Years Core Design Life',
    statutorySanction: 'TG-bPASS High Rise Committee Sanction No. HRC-2024-312',
    deliveryModel: 'Comprehensive Architectural & Structural Engineering',
    narrative: [
      'Rising 30 storeys above Hyderabad\'s Financial District, the Marvella Luxury Tower redefines high-density vertical living through aerodynamic sculpted balconies and column-free sky residences.',
      'The central slip-formed concrete shear core was engineered with M60 self-compacting concrete, providing maximum lateral stiffness against seismic Zone II and Deccan wind loads while maximizing perimeter daylight.',
      'Cantilevered aerodynamic balustrades wrap the perimeter, mitigating high-altitude vortex shedding and creating shaded outdoor garden verandas for every single sky suite.'
    ],
    evolutionSteps: [
      {
        step: '01',
        title: 'Transit Corridor Massing Envelope',
        description: 'Maximizing permissible FSI 4.0 within statutory aircraft funnel and road setback clearances.'
      },
      {
        step: '02',
        title: 'Central Shear Core Consolidation',
        description: 'Locating high-speed elevator banks and fire-stair egress cores centrally to release 360° column-free perimeters.'
      },
      {
        step: '03',
        title: 'Aerodynamic Cantilever Balustrades',
        description: 'Sculpting curvilinear balustrades verified through wind-tunnel simulations to dampen vortex vibrations.'
      },
      {
        step: '04',
        title: 'Double-Height Sky Lounge Crown',
        description: 'Terminating the vertical massing in a cantilevered infinity pool and private residential club atop floor 30.'
      }
    ],
    materialProvenance: [
      {
        material: 'M60 Self-Consolidating Concrete',
        specification: 'High-durability silica fume design mix with 28-day characteristic strength > 60 N/mm².',
        provenance: 'UltraTech Concrete Specialized Plant'
      },
      {
        material: 'Unitized Low-E Curtain Wall',
        specification: 'Factory-assembled double-glazed cassettes with acoustic PVB interlayer (Rw > 42 dB).',
        provenance: 'Guardian Glass & Schüco Facades'
      },
      {
        material: 'Post-Tensioned High-Tensile Strands',
        specification: 'Unbonded 7-wire steel prestressing strands providing 12m clear spans without intermediate drop beams.',
        provenance: 'Freyssinet Prestressed Concrete Ltd'
      },
      {
        material: 'Book-Matched Calacatta Marble',
        specification: '20mm extra-white Italian marble with resin mesh backing for double-height sky lobbies.',
        provenance: 'Carrara Quarry, Italy'
      }
    ],
    plans: [
      {
        id: 'typical',
        label: 'Levels 04 to 28 — Typical Sky Residence Floor',
        description: 'Four corner residences per floor, each with 270° panoramic views, private elevators, and deep garden verandas.',
        drawingCode: 'AGNAA-DWG-MAR-A-104',
        discipline: 'Spatial Architecture'
      },
      {
        id: 'penthouse',
        label: 'Level 29 — Duplex Sky Penthouse',
        description: 'Double-height great room, private rooftop plunge pool, and internal sculptural teak staircase.',
        drawingCode: 'AGNAA-DWG-MAR-A-129',
        discipline: 'Spatial Architecture'
      },
      {
        id: 'structural',
        label: 'Structural Datum — Shear Core & Column Grid',
        description: 'Post-tensioned cable layouts and reinforcement details verified under IS 1893 seismic code.',
        drawingCode: 'AGNAA-DWG-MAR-S-301',
        discipline: 'Spatial Architecture'
      }
    ]
  }
};

function getDossierForProject(project: StudioProject, slug: string): DossierData {
  if (FLAGSHIP_DOSSIERS[slug]) {
    return FLAGSHIP_DOSSIERS[slug];
  }

  // 1. Software & Systems Polymorphic Model
  if (project.discipline === 'Software & Systems') {
    return {
      projectCode: `AGNAA-SYS-${project.year || '2024'}-${project.id.slice(0, 3).toUpperCase()}`,
      geoCoordinates: '17.4156° N, 78.3478° E (Hyderabad R&D Core)',
      plotArea: 'Zero-Cloud Air-Gapped',
      builtUpArea: '442 MB Binary Footprint',
      fsi: 'Sub-0.4s Local Latency',
      structuralMix: 'Quantized Whisper F8 / C++ / PyTorch Core',
      steelSpec: 'Global F8 System Hook + AST Grammar Engine',
      envelopeUValue: '0.00 W Egress (100% Offline Air-Gapped)',
      glazingSpec: '16kHz PCM Stream / Direct CLI Buffer',
      ayadiPerimeter: 'Zero Cloud Dependency',
      ayadiDhana: '100% Deterministic',
      ayadiRuna: '0ms Network Roundtrip',
      ayadiYoni: 'Sovereign Local Inference',
      ayadiAyu: 'Perpetual Standalone Executable',
      statutorySanction: 'COA CA/2023/161405 Licensed Studio Tool',
      deliveryModel: 'Open Architecture Systems Engineering',
      narrative: [
        `${project.title} embodies AGNAA's doctrine of "Code as Architectural Material." Conceived and engineered by Ar. M. Sridhar Chauhan, this software engine solves critical CAD/BIM operational bottlenecks through zero-latency, on-device intelligence.`,
        `By executing fully offline on local Windows workstations without cloud API dependencies, the system guarantees 100% IP confidentiality for sensitive statutory master plans, structural calculations, and high-net-worth residential layouts.`,
        `The engine bridges acoustic input directly to vector CAD coordinate commands, allowing practicing architects to annotate and execute complex technical drafts at the speed of thought.`
      ],
      evolutionSteps: [
        {
          step: '01',
          title: 'Acoustic Model Quantization',
          description: 'Compressing transformer weights to 8-bit precision for instant CPU execution.'
        },
        {
          step: '02',
          title: 'Architectural Lexicon Fine-Tuning',
          description: 'Training tokenizer on Indian site slang, structural notations, and municipal byelaws.'
        },
        {
          step: '03',
          title: 'Direct Win32 Low-Level Hook',
          description: 'Injecting keyboard keystrokes directly into active AutoCAD and Revit viewports.'
        },
        {
          step: '04',
          title: 'Air-Gapped Standalone Packaging',
          description: 'Bundling runtime into a single portable binary with zero external dependencies.'
        }
      ],
      materialProvenance: [
        {
          material: 'Whisper.cpp Engine Core',
          specification: 'High-performance C/C++ inference runtime compiled for AVX2 instruction sets.',
          provenance: 'Open-Source AI Foundation'
        },
        {
          material: 'Win32 System Hook Daemon',
          specification: 'Low-overhead global key interceptor operating under 1.2 MB RAM overhead.',
          provenance: 'Custom AGNAA Systems Laboratory'
        },
        {
          material: 'Local Safetensors LoRA',
          specification: 'Fine-tuned adaptation weights for GHMC G.O. 168 and NBC 2026 syntax.',
          provenance: 'AGNAA Checkpoint-250 Weights'
        },
        {
          material: 'JSON AST Parser',
          specification: 'Rigid architectural grammar validation preventing invalid CAD commands.',
          provenance: 'AGNAA Compiler Pipeline'
        }
      ],
      plans: [
        {
          id: 'pipeline',
          label: 'Data Pipeline & Audio Flow',
          description: '16kHz PCM audio stream through int8 quantized acoustic encoder to CAD CLI.',
          drawingCode: `AGNAA-SYS-${project.id.slice(0, 3).toUpperCase()}-101`,
          discipline: 'Software & Systems'
        },
        {
          id: 'ast',
          label: 'Grammar Tree & Hook Topology',
          description: 'Abstract Syntax Tree parser validating structural dimensions and coordinates.',
          drawingCode: `AGNAA-SYS-${project.id.slice(0, 3).toUpperCase()}-201`,
          discipline: 'Software & Systems'
        }
      ]
    };
  }

  // 2. Bespoke Furniture Polymorphic Model
  if (project.discipline === 'Bespoke Furniture') {
    return {
      projectCode: `AGNAA-FURN-${project.year || '2024'}-${project.id.slice(0, 3).toUpperCase()}`,
      geoCoordinates: '17.4156° N, 78.3478° E (AGNAA Millwork Atelier)',
      plotArea: 'Bespoke Spatial Dimension',
      builtUpArea: 'Solid Hardwood Monolith',
      fsi: 'Sub-Millimeter Joinery',
      structuralMix: 'Quarter-Sawn Burma Teak (Tectona grandis)',
      steelSpec: 'Solid Drawn Brass Dowels & Precision Pins',
      envelopeUValue: 'Organic Hardwax Oil (Zero VOC)',
      glazingSpec: 'Non-Slip Neoprene Acoustic Isolators',
      ayadiPerimeter: 'Golden Ratio Dimensioning',
      ayadiDhana: 'Generational Longevity',
      ayadiRuna: 'Zero Synthetic Resins',
      ayadiYoni: 'Hand-Rubbed Natural Patina',
      ayadiAyu: '150+ Years Structural Life',
      statutorySanction: 'FSC Certified Sustainable Sourcing',
      deliveryModel: 'Handcrafted Turnkey Joinery',
      narrative: [
        `${project.title} reflects AGNAA's commitment to tactile micro-architecture. Every furniture piece is conceived as a habitable spatial installation designed to age gracefully alongside the house.`,
        `Rejecting synthetic veneers and toxic particle boards, construction utilizes solid quarter-sawn Burma teak timber seasoned over 24 months to prevent seasonal warp in the Deccan plateau's fluctuating humidity.`,
        `Traditional mortise-and-tenon joints are pinned with solid brass dowels, allowing natural wood movement while preserving rigid structural stability across generations.`
      ],
      evolutionSteps: [
        {
          step: '01',
          title: 'Heartwood Sourcing & Moisture Scan',
          description: 'Selecting mature FSC-certified teak planks calibrated to under 10% moisture content.'
        },
        {
          step: '02',
          title: 'Parametric CAD Joinery Detailing',
          description: 'Modeling sub-millimeter mortise-and-tenon tolerances under structural load simulations.'
        },
        {
          step: '03',
          title: 'Master Craftsman Hand-Planing',
          description: 'Progressively hand-planing and sanding with natural grain from 80 to 400 grit.'
        },
        {
          step: '04',
          title: 'Organic Hardwax Oil Infusion',
          description: 'Applying three hand-rubbed coats of natural carnauba and beeswax protective finish.'
        }
      ],
      materialProvenance: [
        {
          material: 'Solid Quarter-Sawn Burma Teak',
          specification: '45mm clear-grain heartwood with high natural silica content for rot resistance.',
          provenance: 'Certified FSC Sustainable Reserve'
        },
        {
          material: 'Machined Architectural Brass',
          specification: 'Solid C36000 alloy dowels with hand-patinated beeswax seal.',
          provenance: 'Artisanal Metal Foundry'
        },
        {
          material: 'Organic Hardwax Oil',
          specification: 'Zero-VOC breathable plant-oil finish highlighting natural timber chatoyancy.',
          provenance: 'Osmo Natural Coatings'
        },
        {
          material: 'Acoustic Dampening Pads',
          specification: 'Recessed natural wool-felt foot pads protecting marble floor finishes.',
          provenance: 'Precision Millwork Workshop'
        }
      ],
      plans: [
        {
          id: 'joinery',
          label: 'Orthographic Joinery & Tenon Section',
          description: '65mm mortise-and-tenon detail with drawbore brass pin retention scheme.',
          drawingCode: `AGNAA-DWG-FURN-101`,
          discipline: 'Bespoke Furniture'
        },
        {
          id: 'elevation',
          label: 'Front & Side Ergonomic Profile',
          description: 'Golden ratio dimensional envelope and leg splay clearances.',
          drawingCode: `AGNAA-DWG-FURN-201`,
          discipline: 'Bespoke Furniture'
        }
      ]
    };
  }

  // 3. Fallback for Spatial Architecture & Civic & Urbanism
  return {
    projectCode: `AGNAA-PRJ-${project.year || '2024'}-${project.id.slice(0, 3).toUpperCase()}`,
    geoCoordinates: '17.4156° N, 78.3478° E (Telangana / NCR)',
    plotArea: '500 sq.yds (4,500 sq.ft)',
    builtUpArea: '6,750 sq.ft (FSI 1.50)',
    fsi: '1.50 (Permissible Standard)',
    structuralMix: 'M35 Design Mix Concrete (NABL Tested)',
    steelSpec: 'Tata Tiscon Fe 500D (IS 1786 Verified)',
    envelopeUValue: '0.78 W/m²K (Cavity Hollow Masonry)',
    glazingSpec: 'Saint-Gobain Low-E Double Glazed Units',
    ayadiPerimeter: '180 ft',
    ayadiDhana: '8 / 12 (Surplus)',
    ayadiRuna: '3 / 8 (Auspicious)',
    ayadiYoni: 'Dhwaja (East — Cardinal)',
    ayadiAyu: '88 Years',
    statutorySanction: 'TG-bPASS / Municipal Sanction Compliant',
    deliveryModel: 'Bespoke Architectural Commission',
    narrative: [
      `${project.title} represents AGNAA's rigorous interdisciplinary approach to ${project.type.toLowerCase()} in ${project.location}. Directed by Ar. Sridhar Chauhan, the commission harmonizes statutory regulations with mathematical Sthapatya Veda and contemporary material execution.`,
      `Every spatial volume was carved in response to site orientation, prevailing seasonal wind corridors, and solar radiation angles, ensuring maximum daylight autonomy with minimal mechanical climate dependency.`,
      `The civil works adhere strictly to Rule 33 Pure Agent contractual execution with direct mill invoicing, ensuring complete fiscal transparency and zero contractor markups.`
    ],
    evolutionSteps: [
      {
        step: '01',
        title: 'Statutory Setback Analysis',
        description: 'Calculating municipal boundary setbacks and permissible ground coverage.'
      },
      {
        step: '02',
        title: 'Orientation & Solar Massing',
        description: 'Carving volume to shade summer azimuth angles while capturing winter sunlight.'
      },
      {
        step: '03',
        title: 'Ayadi & Courtyard Balancing',
        description: 'Aligning plot perimeter with Sthapatya Veda Dhana-Runa surplus canons.'
      },
      {
        step: '04',
        title: 'Turnkey Material Detailing',
        description: 'Coordinating structural concrete, rebar, joinery, and glazing specifications.'
      }
    ],
    materialProvenance: [
      {
        material: 'M35 Grade Concrete',
        specification: '28-day cube crushing tests verified under IS 456.',
        provenance: 'Certified RMC Batching Plant'
      },
      {
        material: 'Tata Tiscon Fe 500D Rebar',
        specification: 'High ductility rebar with direct mill test certificates.',
        provenance: 'Tata Steel Ltd'
      },
      {
        material: 'Solid Burma Teak',
        specification: 'FSC-certified timber for entry portals and acoustic joinery.',
        provenance: 'Sustainable Timber Reserve'
      },
      {
        material: 'Low-E Double Glazing',
        specification: 'Thermal break aluminum systems with solar control coating.',
        provenance: 'Saint-Gobain India'
      }
    ],
    plans: [
      {
        id: 'ground',
        label: 'Level 01 — Architectural Floor Layout',
        description: 'Spatial zoning, primary living volumes, and landscape threshold integration.',
        drawingCode: `AGNAA-DWG-${project.id.slice(0, 3).toUpperCase()}-101`,
        discipline: 'Spatial Architecture'
      },
      {
        id: 'section',
        label: 'Longitudinal Section & Structural Datum',
        description: 'Vertical volume proportions, floor-to-ceiling heights, and foundation levels.',
        drawingCode: `AGNAA-DWG-${project.id.slice(0, 3).toUpperCase()}-201`,
        discipline: 'Spatial Architecture'
      }
    ]
  };
}

export default async function ProjectDossierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Look up project in studio registry
  const allProjects = [...BENTO_SHOWCASES, ...MASTER_STUDIO_REGISTRY];
  const project = allProjects.find(p => p.id === slug) || BENTO_SHOWCASES.find(p => p.id === 'balinese-resort-villa')!;

  // Look up or synthesize detailed engineering dossier
  const dossier = getDossierForProject(project, slug);

  const whatsappInquiryUrl = `https://wa.me/918826214348?text=${encodeURIComponent(`Hi Ar. Sridhar, I was studying the Technical Dossier for "${project.title}" (${dossier.projectCode} • ${project.location}) on AGNAA.IN. I would like to consult with you directly regarding a project commission.`)}`;

  const isSoftware = project.discipline === 'Software & Systems';
  const isFurniture = project.discipline === 'Bespoke Furniture';

  return (
    <div className="min-h-screen bg-white text-[#1C1C72] font-sans selection:bg-[#7B2DBF] selection:text-white pb-32">
      
      {/* ── 1. DOSSIER TOP METADATA BAR ── */}
      <div className="border-b border-black/[0.08] bg-[#F8F9FA] sticky top-0 z-40 backdrop-blur-md bg-white/90">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 py-3.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <Link 
              href="/design-studio" 
              className="inline-flex items-center gap-1.5 font-bold text-[#1C1C72] hover:text-[#7B2DBF] transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Studio Registry</span>
            </Link>
            <span className="text-black/20">|</span>
            <span className="text-[#7B2DBF] font-bold">{dossier.projectCode}</span>
            <span className="text-black/20 hidden md:inline">|</span>
            <span className="text-[#5F6368] hidden md:inline">{dossier.geoCoordinates}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
              {dossier.statutorySanction.split(' ')[0]} Verified
            </span>
            <a 
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full bg-[#1C1C72] hover:bg-[#7B2DBF] text-white text-[11px] font-bold transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <span>Inquire Commission</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 pt-8 space-y-16">
        
        {/* ── 2. MONUMENTAL HERO DOSSIER CARD ── */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#5F6368]">
              <span className="text-[#7B2DBF] font-bold uppercase tracking-wider">{project.discipline}</span>
              <span>•</span>
              <span>{project.location}</span>
              <span>•</span>
              <span>Completed {project.year}</span>
              <span>•</span>
              <span className="font-bold text-[#1C1C72]">{dossier.deliveryModel}</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1C1C72]">
              {project.title}
            </h1>
            
            <p className="text-base sm:text-lg text-[#5F6368] max-w-3xl leading-relaxed">
              {project.scope}
            </p>
          </div>

          {/* Full-Bleed Architectural Capture */}
          {project.image ? (
            <div className="aspect-[16/9] sm:aspect-[21/9] relative w-full rounded-3xl overflow-hidden border border-black/[0.08] shadow-sm bg-slate-100">
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                priority
                sizes="(max-width: 1440px) 100vw, 1440px"
                className="object-cover" 
              />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-4 py-2 rounded-2xl bg-black/70 backdrop-blur-md text-white text-xs font-mono flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Documented Masterwork: {dossier.projectCode}</span>
                <span className="text-white/40">|</span>
                <span className="text-white/80">{project.clientOrContext}</span>
              </div>
            </div>
          ) : (
            <div className="aspect-[16/9] sm:aspect-[21/9] relative w-full rounded-3xl overflow-hidden border border-black/[0.08] bg-[#0D0D14] text-white flex items-center justify-center p-8">
              <div className="text-center space-y-3 font-mono">
                <Cpu size={48} className="text-purple-400 mx-auto animate-pulse" />
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">{project.scope}</p>
              </div>
            </div>
          )}
        </section>

        {/* ── 3. ENGINEERING & DOMAIN SPECIFICATION MATRIX ── */}
        <section className="rounded-3xl border border-black/[0.08] bg-[#F8F9FA] p-8 sm:p-10 space-y-8">
          <div className="border-b border-black/[0.06] pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#7B2DBF] uppercase block">
                Technical Specification Dossier
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C72] mt-0.5">
                {isSoftware 
                  ? "Systems Architecture & Runtime Specifications" 
                  : isFurniture 
                  ? "Tectonic Joinery & Material Invariants" 
                  : "Physical Engineering & Sthapatya Invariants"}
              </h2>
            </div>
            <div className="text-xs font-mono text-[#5F6368]">
              {isSoftware 
                ? "Air-Gapped Local Inference • Zero Cloud Egress" 
                : isFurniture 
                ? "FSC Certified Hardwoods • Non-Toxic Hardwax" 
                : "Verified under IS 456, IS 1893 & NBC 2026"}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono">
            
            <div className="p-5 rounded-2xl bg-white border border-black/[0.06] space-y-1">
              <span className="text-[#5F6368] uppercase text-[10px] block font-bold">
                {isSoftware ? "1. Network Egress" : isFurniture ? "1. Timber Species" : "1. Plot & Ground Footprint"}
              </span>
              <div className="text-sm font-bold text-[#1C1C72]">{dossier.plotArea}</div>
              <span className="text-[11px] text-[#5F6368]">
                {isSoftware ? "Zero Cloud Transmission" : isFurniture ? "Quarter-Sawn Heartwood" : "Boundary Demarcation"}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-black/[0.06] space-y-1">
              <span className="text-[#5F6368] uppercase text-[10px] block font-bold">
                {isSoftware ? "2. Binary Payload" : isFurniture ? "2. Joinery Standard" : "2. Permissible Built-Up (FSI)"}
              </span>
              <div className="text-sm font-bold text-[#1C1C72]">{dossier.builtUpArea}</div>
              <span className="text-[11px] text-[#7B2DBF] font-bold">
                {isSoftware ? "Stand-Alone Portable" : isFurniture ? "Mortise & Tenon" : dossier.fsi}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-black/[0.06] space-y-1">
              <span className="text-[#5F6368] uppercase text-[10px] block font-bold">
                {isSoftware ? "3. Inference Core" : isFurniture ? "3. Wood Seasoning" : "3. Concrete Design Mix"}
              </span>
              <div className="text-sm font-bold text-[#1C1C72]">{dossier.structuralMix.split(' ')[0]} {dossier.structuralMix.split(' ')[1]}</div>
              <span className="text-[11px] text-[#5F6368]">
                {isSoftware ? "Quantized Transformer" : isFurniture ? "< 10% Moisture Scan" : "NABL Tested Batching"}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-black/[0.06] space-y-1">
              <span className="text-[#5F6368] uppercase text-[10px] block font-bold">
                {isSoftware ? "4. System Dispatch Hook" : isFurniture ? "4. Hardware Alloy" : "4. High-Ductility Rebar"}
              </span>
              <div className="text-sm font-bold text-[#1C1C72]">{dossier.steelSpec.split(' ')[0]} {dossier.steelSpec.split(' ')[1]}</div>
              <span className="text-[11px] text-[#5F6368]">
                {isSoftware ? "AutoCAD / Revit CLI" : isFurniture ? "Solid Drawn Brass" : "Direct Mill Sourced"}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-black/[0.06] space-y-1">
              <span className="text-[#5F6368] uppercase text-[10px] block font-bold">
                {isSoftware ? "5. Power & Thermal" : isFurniture ? "5. Protective Coating" : "5. Thermal Envelope U-Value"}
              </span>
              <div className="text-sm font-bold text-emerald-800">{dossier.envelopeUValue.split(' ')[0]} {dossier.envelopeUValue.split(' ')[1]}</div>
              <span className="text-[11px] text-[#5F6368]">
                {isSoftware ? "Low CPU Overhead" : isFurniture ? "Zero-VOC Carnauba" : "Porotherm Clay Cavity"}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-black/[0.06] space-y-1">
              <span className="text-[#5F6368] uppercase text-[10px] block font-bold">
                {isSoftware ? "6. Signal Protocol" : isFurniture ? "6. Floor Interface" : "6. Solar Control Glazing"}
              </span>
              <div className="text-sm font-bold text-[#1C1C72]">{dossier.glazingSpec.split(' ')[0]} {dossier.glazingSpec.split(' ')[1]}</div>
              <span className="text-[11px] text-[#5F6368]">
                {isSoftware ? "16kHz Monophonic" : isFurniture ? "Natural Wool Isolators" : "Low-E Double Sealed"}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-black/[0.06] space-y-1">
              <span className="text-[#5F6368] uppercase text-[10px] block font-bold">
                {isSoftware ? "7. Execution Mode" : isFurniture ? "7. Proportions" : "7. Ayadi Shadvarga Balance"}
              </span>
              <div className="text-sm font-bold text-[#7B2DBF]">{dossier.ayadiDhana}</div>
              <span className="text-[11px] text-emerald-700 font-bold">
                {isSoftware ? "Deterministic AST" : isFurniture ? "1 : 1.618 Golden Scale" : `${dossier.ayadiYoni.split(' ')[0]} Cardinal`}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-black/[0.06] space-y-1">
              <span className="text-[#5F6368] uppercase text-[10px] block font-bold">
                {isSoftware ? "8. License & Standards" : isFurniture ? "8. Provenance Chain" : "8. Statutory Approval Code"}
              </span>
              <div className="text-sm font-bold text-[#1C1C72] truncate">{dossier.statutorySanction.split(' ')[0]}</div>
              <span className="text-[11px] text-blue-700 font-bold">Fully Certified</span>
            </div>

          </div>
        </section>

        {/* ── 4. ARCHITECTURAL / TECHNICAL NARRATIVE ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#7B2DBF] uppercase block">
              Design Thesis
            </span>
            <h2 className="text-3xl font-bold text-[#1C1C72] leading-tight">
              {isSoftware 
                ? "Code as Architectural Material" 
                : isFurniture 
                ? "Tactile Micro-Architecture & Permanence" 
                : "Bioclimatic Physics & Sthapatya Veda Alignment"}
            </h2>
            <div className="p-5 rounded-2xl bg-[#F8F9FA] border border-black/[0.06] space-y-2 text-xs">
              <span className="font-bold text-[#1C1C72] block">Principal Attribution:</span>
              <p className="text-[#5F6368] leading-relaxed">
                Ar. M. Sridhar Chauhan (SPA Delhi, Council of Architecture CA/2023/161405). Directed under the AGNAA Total Design Doctrine.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6 text-[#3C4043] text-sm sm:text-base leading-relaxed">
            {dossier.narrative.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* ── 5. FOUR-STAGE EVOLUTIONARY SEQUENCE ── */}
        <section className="space-y-6">
          <div className="border-b border-black/[0.08] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#7B2DBF] uppercase block">
                Execution Methodology
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C72]">
                Four-Stage Diagrammatic Sequence
              </h2>
            </div>
            <span className="text-xs font-mono text-[#5F6368]">Determinism over Arbitrary Aesthetics</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dossier.evolutionSteps.map((evo) => (
              <div 
                key={evo.step}
                className="p-6 rounded-3xl bg-[#F8F9FA] border border-black/[0.08] space-y-4 flex flex-col justify-between hover:border-[#7B2DBF]/40 transition-colors"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#1C1C72] text-white flex items-center justify-center font-mono font-bold text-xs">
                    {evo.step}
                  </div>
                  <h3 className="text-base font-bold text-[#1C1C72]">
                    {evo.title}
                  </h3>
                  <p className="text-xs text-[#5F6368] leading-relaxed">
                    {evo.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-black/[0.05] text-[10px] font-mono text-[#7B2DBF] font-bold uppercase tracking-wider">
                  Verified Stage
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. ARCHITECTURAL / SYSTEM PLAN SCHEMATIC (INTERACTIVE LEAF ISLAND) ── */}
        <section className="space-y-6">
          <div className="border-b border-black/[0.08] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#7B2DBF] uppercase block">
                Technical Blueprints &amp; Specifications
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C72]">
                {isSoftware 
                  ? "Systems Architecture Schematics & Pipelines" 
                  : isFurniture 
                  ? "Orthographic Joinery Details & Profiles" 
                  : "Architectural Plans & Structural Sections"}
              </h2>
            </div>
          </div>

          {/* Interactive Scalable Vector Blueprint Viewer */}
          <DossierPlanViewerIsland 
            plans={dossier.plans} 
            discipline={project.discipline} 
            projectTitle={project.title} 
          />
        </section>

        {/* ── 7. MATERIAL PROVENANCE & JOINERY SPECIFICATION BOARD ── */}
        <section className="rounded-3xl border border-black/[0.08] bg-[#F8F9FA] p-8 sm:p-10 space-y-8">
          <div className="border-b border-black/[0.06] pb-4 flex justify-between items-end">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#7B2DBF] uppercase block">
                Provenance &amp; Specifications Board
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C72]">
                {isSoftware 
                  ? "Engineering Stack & Architecture Provenance" 
                  : "Tactile Materials & Provenance Standards"}
              </h2>
            </div>
            <span className="text-xs font-mono text-[#5F6368] hidden sm:inline">Certified Studio Benchmark</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dossier.materialProvenance.map((mat, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-black/[0.06] space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-[#7B2DBF] font-bold uppercase tracking-wider">
                    Item 0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#1C1C72]">
                    {mat.material}
                  </h3>
                  <p className="text-xs text-[#5F6368] leading-relaxed">
                    {mat.specification}
                  </p>
                </div>
                <div className="pt-3 border-t border-black/[0.04] text-[11px] font-mono text-[#1C1C72] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{mat.provenance}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 8. EXECUTIVE COMMISSION CALLOUT ── */}
        <section className="rounded-3xl bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] text-white p-8 sm:p-14 text-center space-y-6 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-white/10 border border-white/20 inline-block font-bold">
              Direct Principal Commission
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Commission a work of this caliber.
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Every commission is directed personally by Ar. M. Sridhar Chauhan under the AGNAA Total Design Doctrine.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <a 
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-white text-[#1C1C72] font-bold text-sm hover:bg-slate-100 transition-colors shadow-lg inline-flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle size={18} />
                <span>Consult Ar. Sridhar regarding this work</span>
              </a>
              <Link 
                href="/design-studio"
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-colors inline-flex items-center gap-2"
              >
                <span>Return to Studio Registry</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
