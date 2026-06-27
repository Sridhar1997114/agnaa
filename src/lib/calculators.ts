import { 
  Grid, Home, Ruler, Activity, HardHat, Droplets, Zap, 
  Layers, Construction, Mountain, Box, TrendingUp,
  LucideIcon, IndianRupee, Percent, Truck, Trees, Fan,
  Weight, Sprout, ShieldAlert, Waves, Shovel,
  ArrowUpRight, Layout, Square, Paintbrush
} from 'lucide-react';

export interface CalculatorMeta {
  id: string;
  name: string;
  path: string;
  category: 'Structure' | 'Interior' | 'Site' | 'MEP' | 'Financial' | 'Tools';
  icon: any;
  description: string;
  popular?: boolean;
}

export const calculators: CalculatorMeta[] = [
  // Phase 1 (Core)
  { id: 'brick', name: 'Brickwork Estimator', path: '/calc/brick', category: 'Structure', icon: Grid, description: 'Bricks, Cement, Sand count', popular: true },
  { id: 'rcc', name: 'RCC Slab / Rebar', path: '/calc/rcc', category: 'Structure', icon: Activity, description: 'Concrete & Steel estimation', popular: true },
  { id: 'fsi', name: 'FSI / FAR Calculator', path: '/calc/fsi', category: 'Financial', icon: Percent, description: 'Buildable area ratios', popular: true },
  
  // Phase 2 (Advanced Structure)
  { id: 'gn-floor', name: 'G+N Floor Estimator', path: '/calc/g-n-floor-estimator', category: 'Structure', icon: Layers, description: 'Multi-floor buildable area', popular: true },
  { id: 'envelope', name: 'Building Envelope', path: '/calc/setback-envelope', category: 'Structure', icon: Home, description: 'Setbacks & buildable zones' },
  { id: 'efficiency', name: 'Area Efficiency', path: '/calc/built-up-efficiency', category: 'Financial', icon: Layout, description: 'Carpet vs Super Built-up' },
  { id: 'pcc', name: 'PCC Foundation', path: '/calc/pcc-concrete', category: 'Structure', icon: Construction, description: 'Plain Cement Concrete beds' },
  { id: 'excavation', name: 'Earthwork / Excavation', path: '/calc/excavation-earthwork', category: 'Site', icon: Shovel, description: 'Pit volume & loose soil' },
  { id: 'foundation', name: 'Footing Concrete', path: '/calc/foundation-footing', category: 'Structure', icon: Box, description: 'Isolated/Combined footing vol' },
  { id: 'steel', name: 'Rebar / Steel Weight', path: '/calc/steel-rebar', category: 'Structure', icon: Weight, description: 'Thumb rule rebar weight', popular: true },
  { id: 'staircase', name: 'Staircase Designer', path: '/calc/staircase', category: 'Structure', icon: TrendingUp, description: 'Risers, Treads & Slopes', popular: true },
  { id: 'septic', name: 'Septic Tank Size', path: '/calc/septic-tank', category: 'MEP', icon: Droplets, description: 'IS-code based tank sizing' },
  { id: 'compound-wall', name: 'Compound Wall', path: '/calc/compound-wall', category: 'Structure', icon: Square, description: 'Boundary wall material count' },
  { id: 'electrical', name: 'Electrical Load', path: '/calc/electrical', category: 'MEP', icon: Zap, description: 'Points & Load calculation', popular: true },
  { id: 'roofing', name: 'Roofing Materials', path: '/calc/roofing', category: 'Structure', icon: Home, description: 'Sheets, ridge & area' },
  { id: 'interior', name: 'Interior Cost', path: '/calc/interior-cost', category: 'Interior', icon: Layout, description: 'Lumpsum interior estimation' },
  
  // Phase 3 (Specialist)
  { id: 'aac-blocks', name: 'AAC Blockwork', path: '/calc/aac-blocks', category: 'Structure', icon: Box, description: 'Lightweight block estimation' },
  { id: 'anti-termite', name: 'Anti-Termite', path: '/calc/anti-termite', category: 'Site', icon: ShieldAlert, description: 'Chemical treatment requirement' },
  { id: 'scaffolding', name: 'Scaffolding/Formwork', path: '/calc/scaffolding', category: 'Tools', icon: HardHat, description: 'Pipes & ply requirements' },
  { id: 'shapes', name: 'Concrete Shape Lib', path: '/calc/concrete-shapes', category: 'Tools', icon: Box, description: 'Cylinders, cones, prisms' },
  { id: 'paver', name: 'Paver / Driveway', path: '/calc/paver', category: 'Site', icon: Grid, description: 'Interlocking tiles count' },
  { id: 'landscaping', name: 'Landscaping / Turf', path: '/calc/landscaping', category: 'Site', icon: Sprout, description: 'Soil & grass rolls' },
  { id: 'hvac', name: 'HVAC Heat Load', path: '/calc/hvac', category: 'MEP', icon: Fan, description: 'Estimated Tonnage (TR)' },
  { id: 'load-calc', name: 'Structural Load', path: '/calc/load', category: 'Structure', icon: Weight, description: 'Dead & Live load estimation' },
  { id: 'green-roof', name: 'Green Roof Load', path: '/calc/green-roof', category: 'Site', icon: Trees, description: 'Wet soil load on slab' },
  { id: 'pool', name: 'Pool / Sump', path: '/calc/pool', category: 'MEP', icon: Waves, description: 'Volume & liner area' },
  { id: 'advanced-roof', name: 'Advanced Roof', path: '/calc/roofing-adv', category: 'Structure', icon: ArrowUpRight, description: 'Complex pitched roofs' },
  { id: 'roi', name: 'Rental Yield / ROI', path: '/calc/roi', category: 'Financial', icon: IndianRupee, description: 'Investment & Payback' },
  { id: 'paint', name: 'Paint Surface Yield', path: '/calc/paint', category: 'Interior', icon: Paintbrush, description: 'Gallons and coverage ratio', popular: true },

  // Newly Registered Working Modules
  { id: 'advanced-flooring', name: 'Advanced Flooring', path: '/calc/advanced-flooring', category: 'Interior', icon: Layers, description: 'Complex tile & pattern calculations' },
  { id: 'built-up', name: 'Built-up Area', path: '/calc/built-up', category: 'Financial', icon: Square, description: 'Super built-up and carpet area analysis' },
  { id: 'flooring-cost', name: 'Flooring Cost', path: '/calc/flooring-cost', category: 'Interior', icon: IndianRupee, description: 'Material & labor cost estimation' },
  { id: 'geometry', name: 'Geometry Helper', path: '/calc/geometry', category: 'Tools', icon: Ruler, description: 'Area and perimeter shapes library' },
  { id: 'insulation', name: 'Insulation Cost', path: '/calc/insulation', category: 'MEP', icon: ShieldAlert, description: 'Thermal insulation sheet counts' },
  { id: 'markup', name: 'Markup & Margin', path: '/calc/markup', category: 'Financial', icon: Percent, description: 'Contractor pricing & markup tool' },
  { id: 'mulch', name: 'Mulch & Soil', path: '/calc/mulch', category: 'Site', icon: Sprout, description: 'Gardening mulch volume & weight' },
  { id: 'plaster', name: 'Plaster Estimator', path: '/calc/plaster', category: 'Interior', icon: Paintbrush, description: 'Cement-sand mortar for walls' },
  { id: 'plot-area', name: 'Plot Area', path: '/calc/plot-area', category: 'Financial', icon: Ruler, description: 'Irregular or regular plot layouts' },
  { id: 'ramp', name: 'Ramp Designer', path: '/calc/ramp', category: 'Structure', icon: TrendingUp, description: 'Ramp slope, rise & runs' },
  { id: 'shuttering', name: 'Shuttering Area', path: '/calc/shuttering', category: 'Tools', icon: HardHat, description: 'Plywood & staging area calculations' },
  { id: 'tank', name: 'Water Tank Sizing', path: '/calc/tank', category: 'MEP', icon: Waves, description: 'Sump & water tank capacity calculator' },
  { id: 'tiles', name: 'Tiles Estimator', path: '/calc/tiles', category: 'Interior', icon: Grid, description: 'Floor & wall tiles material count' },
  { id: 'unit-conversion', name: 'Unit Converter', path: '/calc/unit-conversion', category: 'Tools', icon: Layers, description: 'Length, area & volume units' },
  { id: 'vastu', name: 'Cosmic Vastu & Ayadi', path: '/calc/vastu', category: 'Tools', icon: Compass, description: 'Shadvarga alignment & Yard Optimizer', popular: true }
];

