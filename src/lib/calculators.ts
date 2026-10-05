import { 
  Home, Ruler, Percent, 
  IndianRupee, Compass, Layout, Layers, Grid, Box
} from 'lucide-react';

export interface CalculatorMeta {
  id: string;
  name: string;
  path: string;
  category: 'Structure' | 'Interior' | 'Financial' | 'Tools';
  icon: any;
  description: string;
  popular?: boolean;
  isImportant?: boolean;
}

export const calculators: CalculatorMeta[] = [
  // 8 Important Core Calculators (Shown by Default)
  { id: 'gn-floor', name: 'Total Construction Estimator', path: '/estimate', category: 'Structure', icon: Layers, description: 'Turnkey construction cost per sft, Basic/Standard/Premium tiers & BOQ', popular: true, isImportant: true },
  { id: 'rcc', name: 'RCC Slab & Steel Estimator', path: '/calc/rcc', category: 'Structure', icon: Box, description: 'Cement bags, sand, aggregate & TMT steel rebar quantity weight', popular: true, isImportant: true },
  { id: 'fsi', name: 'GHMC / HMDA FSI Calculator', path: '/calc/fsi', category: 'Financial', icon: Percent, description: 'Permissible buildable area & coverage based on road width', popular: true, isImportant: true },
  { id: 'envelope', name: 'Building Setback & Height', path: '/calc/setback-envelope', category: 'Structure', icon: Home, description: 'Front, rear & side setback requirements for local norms', popular: true, isImportant: true },
  { id: 'interior', name: 'Turnkey Interior Estimator', path: '/calc/interior-cost', category: 'Interior', icon: Grid, description: 'Luxury residential & commercial interior design budgeting', popular: true, isImportant: true },
  { id: 'paint', name: 'Paint & Wall Finish Estimator', path: '/calc/paint', category: 'Interior', icon: Grid, description: 'Primer, wall putty, and emulsion paint quantity calculator', popular: true, isImportant: true },
  { id: 'tiles', name: 'Tile & Flooring Estimator', path: '/calc/tiles', category: 'Interior', icon: Layout, description: 'Floor tile count, box count & wastage buffer for luxury spaces', popular: true, isImportant: true },
  { id: 'vastu', name: 'Cosmic Vastu & Ayadi', path: '/calc/vastu', category: 'Tools', icon: Compass, description: 'Shadvarga directional alignment & Ayadi dimension optimizer', popular: true, isImportant: true },

  // 4 Extra Calculators (Shown Only on Clicking Button)
  { id: 'aac-blocks', name: 'AAC Block & Mortar Calculator', path: '/calc/aac-blocks', category: 'Structure', icon: Layers, description: 'Block count & thin-set adhesive bags for thermal masonry walls', isImportant: false },
  { id: 'efficiency', name: 'Carpet Area Efficiency', path: '/calc/built-up-efficiency', category: 'Financial', icon: Layout, description: 'Usable carpet area vs total super built-up ratio analysis', isImportant: false },
  { id: 'roi', name: 'Rental Yield & Commercial ROI', path: '/calc/roi', category: 'Financial', icon: IndianRupee, description: 'Rental returns, payback period & commercial feasibility', isImportant: false },
  { id: 'plot-area', name: 'Plot Area & Land Converter', path: '/calc/plot-area', category: 'Tools', icon: Ruler, description: 'Convert Sq. Yards (Gajam), Sq. Ft, Acres & plot boundaries', isImportant: false }
];
