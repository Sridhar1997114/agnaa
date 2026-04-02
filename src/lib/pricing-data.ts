export type ServiceTier = 'basic' | 'standard' | 'premium';

export interface Microservice {
  category: string;
  name: string;
  unitType: string;
  unitLabel: string;
  basic: number;
  standard: number;
  premium: number;
  basicScope?: string;
  standardScope?: string;
  premiumScope?: string;
}

export interface Package {
  code: string;
  name: string;
  vertical: string;
  targetClient: string;
  basic: number;
  standard: number;
  premium: number;
  basicServices: string[];
  standardServices: string[];
  premiumServices: string[];
  upsellTrigger?: string;
}

export const CATEGORY_ICONS: Record<string, string> = {
  'Architecture': '🏛️',
  'Drawings': '📐',
  '3D / Visualization': '🎨',
  'Interior Design': '🛋️',
  'Landscape': '🌿',
  'Graphic / Brand / Presentation': '✨',
  'UI/UX / Digital Experience': '💻',
  'Construction / Execution Support': '🔧',
  'Advisory / Premium Thinking': '🧠',
  'AI / Automation Layer': '🤖',
};

export const MICROSERVICES: Microservice[] = [
  // Architecture
  { category: 'Architecture', name: 'Site visit / requirement discovery', unitType: 'per_visit', unitLabel: 'visit', basic: 4000, standard: 7500, premium: 12000, basicScope: 'Single visit, verbal findings only.', standardScope: 'Visit with notes and requirement summary.', premiumScope: 'Visit, requirement mapping, and next-step roadmap.' },
  { category: 'Architecture', name: 'Design consultation', unitType: 'per_meeting', unitLabel: '60 min', basic: 1500, standard: 3000, premium: 5000, basicScope: 'One consultation session.', standardScope: 'Session plus summary notes.', premiumScope: 'Deep session plus strategic recommendation sheet.' },
  { category: 'Architecture', name: 'Concept design', unitType: 'per_sqft', unitLabel: 'sq ft', basic: 18, standard: 28, premium: 40, basicScope: 'One concept direction.', standardScope: '2 concept options with refinement.', premiumScope: 'Multi-option concept with stronger experience thinking.' },
  { category: 'Architecture', name: 'Space planning', unitType: 'per_sqft', unitLabel: 'sq ft', basic: 12, standard: 18, premium: 28, basicScope: 'Basic planning blocks.', standardScope: 'Optimized usable planning.', premiumScope: 'Premium circulation and efficiency planning.' },
  { category: 'Architecture', name: 'Floor plan design', unitType: 'per_sqft', unitLabel: 'sq ft', basic: 20, standard: 32, premium: 48, basicScope: 'Single planning pass.', standardScope: 'Refined plan with furniture logic.', premiumScope: 'Premium plan with better flow and zoning.' },
  { category: 'Architecture', name: 'Furniture layout', unitType: 'per_sqft', unitLabel: 'sq ft', basic: 8, standard: 14, premium: 22 },
  { category: 'Architecture', name: 'Zoning options', unitType: 'per_sqft', unitLabel: 'sq ft', basic: 10, standard: 16, premium: 24 },
  { category: 'Architecture', name: 'Schematic design set', unitType: 'per_sqft', unitLabel: 'sq ft', basic: 22, standard: 36, premium: 55 },
  { category: 'Architecture', name: 'Working drawings', unitType: 'per_sqft', unitLabel: 'sq ft', basic: 25, standard: 40, premium: 60 },
  { category: 'Architecture', name: 'Municipal / approval drawing support', unitType: 'per_project', unitLabel: 'project', basic: 25000, standard: 45000, premium: 70000 },
  { category: 'Architecture', name: 'Presentation drawings', unitType: 'per_sheet', unitLabel: 'sheet', basic: 2500, standard: 4500, premium: 7500 },
  { category: 'Architecture', name: 'Detail drawings', unitType: 'per_detail', unitLabel: 'detail sheet', basic: 3000, standard: 5500, premium: 9000 },
  { category: 'Architecture', name: 'Staircase details', unitType: 'per_staircase', unitLabel: 'staircase', basic: 8000, standard: 14000, premium: 22000 },
  { category: 'Architecture', name: 'Toilet details', unitType: 'per_toilet', unitLabel: 'toilet', basic: 6000, standard: 11000, premium: 18000 },
  { category: 'Architecture', name: 'Kitchen details', unitType: 'per_kitchen', unitLabel: 'kitchen', basic: 12000, standard: 22000, premium: 38000 },
  { category: 'Architecture', name: 'Door-window schedule', unitType: 'per_schedule', unitLabel: 'schedule', basic: 6000, standard: 10000, premium: 16000 },
  { category: 'Architecture', name: 'Material suggestions', unitType: 'per_project', unitLabel: 'project', basic: 5000, standard: 9000, premium: 15000 },
  { category: 'Architecture', name: 'Design revisions', unitType: 'per_revision_round', unitLabel: 'round', basic: 3000, standard: 6000, premium: 10000 },
  { category: 'Architecture', name: 'BOQ support', unitType: 'per_project', unitLabel: 'project', basic: 12000, standard: 22000, premium: 40000 },
  { category: 'Architecture', name: 'Site coordination drawings', unitType: 'per_project', unitLabel: 'project', basic: 10000, standard: 18000, premium: 30000 },

  // Drawings
  { category: 'Drawings', name: 'Floor plans', unitType: 'per_floor', unitLabel: 'floor', basic: 7000, standard: 12000, premium: 18000 },
  { category: 'Drawings', name: 'Sections', unitType: 'per_section', unitLabel: 'section', basic: 5000, standard: 8500, premium: 14000 },
  { category: 'Drawings', name: 'Elevations', unitType: 'per_elevation', unitLabel: 'elevation', basic: 5000, standard: 9000, premium: 15000 },
  { category: 'Drawings', name: 'Terrace plan', unitType: 'per_floor', unitLabel: 'terrace/floor', basic: 5000, standard: 8500, premium: 14000 },
  { category: 'Drawings', name: 'Roof plan', unitType: 'per_floor', unitLabel: 'roof/floor', basic: 5000, standard: 8500, premium: 14000 },
  { category: 'Drawings', name: 'Reflected ceiling plan', unitType: 'per_floor', unitLabel: 'floor', basic: 6000, standard: 10000, premium: 16000 },
  { category: 'Drawings', name: 'Electrical layout', unitType: 'per_floor', unitLabel: 'floor', basic: 6500, standard: 11000, premium: 17000 },
  { category: 'Drawings', name: 'Plumbing layout', unitType: 'per_floor', unitLabel: 'floor', basic: 6500, standard: 11000, premium: 17000 },
  { category: 'Drawings', name: 'HVAC coordination layout', unitType: 'per_floor', unitLabel: 'floor', basic: 8000, standard: 14000, premium: 22000 },
  { category: 'Drawings', name: 'Flooring layout', unitType: 'per_floor', unitLabel: 'floor', basic: 5000, standard: 9000, premium: 15000 },
  { category: 'Drawings', name: 'False ceiling layout', unitType: 'per_floor', unitLabel: 'floor', basic: 6000, standard: 10000, premium: 16000 },
  { category: 'Drawings', name: 'Lighting layout', unitType: 'per_floor', unitLabel: 'floor', basic: 5000, standard: 9000, premium: 15000 },
  { category: 'Drawings', name: 'Joinery drawings', unitType: 'per_item', unitLabel: 'joinery item', basic: 5000, standard: 9000, premium: 15000 },
  { category: 'Drawings', name: 'Wardrobe drawings', unitType: 'per_wardrobe', unitLabel: 'wardrobe', basic: 6000, standard: 11000, premium: 18000 },
  { category: 'Drawings', name: 'Kitchen drawings', unitType: 'per_kitchen', unitLabel: 'kitchen', basic: 12000, standard: 22000, premium: 38000 },
  { category: 'Drawings', name: 'Stair details', unitType: 'per_staircase', unitLabel: 'staircase', basic: 8000, standard: 14000, premium: 22000 },
  { category: 'Drawings', name: 'Compound wall drawings', unitType: 'per_project', unitLabel: 'project', basic: 7000, standard: 12000, premium: 20000 },
  { category: 'Drawings', name: 'Gate drawings', unitType: 'per_gate', unitLabel: 'gate', basic: 5000, standard: 9000, premium: 15000 },
  { category: 'Drawings', name: 'Landscape layout', unitType: 'per_project', unitLabel: 'project', basic: 10000, standard: 18000, premium: 30000 },

  // 3D / Visualization
  { category: '3D / Visualization', name: 'Basic 3D massing', unitType: 'per_project', unitLabel: 'project', basic: 12000, standard: 22000, premium: 35000 },
  { category: '3D / Visualization', name: 'Exterior 3D model', unitType: 'per_project', unitLabel: 'project', basic: 18000, standard: 32000, premium: 55000 },
  { category: '3D / Visualization', name: 'Interior 3D model', unitType: 'per_space', unitLabel: 'space/room', basic: 12000, standard: 22000, premium: 38000 },
  { category: '3D / Visualization', name: 'Still renders', unitType: 'per_view', unitLabel: 'view', basic: 8000, standard: 14000, premium: 24000 },
  { category: '3D / Visualization', name: 'High-quality photoreal renders', unitType: 'per_view', unitLabel: 'view', basic: 12000, standard: 22000, premium: 38000 },
  { category: '3D / Visualization', name: 'Day views', unitType: 'per_view_variant', unitLabel: 'variant', basic: 2500, standard: 4000, premium: 6500 },
  { category: '3D / Visualization', name: 'Night views', unitType: 'per_view_variant', unitLabel: 'variant', basic: 3000, standard: 5000, premium: 8000 },
  { category: '3D / Visualization', name: 'Walkthrough frames', unitType: 'per_frame_set', unitLabel: 'frame set', basic: 8000, standard: 15000, premium: 26000 },
  { category: '3D / Visualization', name: '360 views', unitType: 'per_view', unitLabel: '360 view', basic: 12000, standard: 20000, premium: 32000 },
  { category: '3D / Visualization', name: 'Animated walkthrough', unitType: 'per_minute', unitLabel: 'minute', basic: 45000, standard: 75000, premium: 125000 },
  { category: '3D / Visualization', name: 'Material mood render', unitType: 'per_board', unitLabel: 'board/render', basic: 7000, standard: 12000, premium: 20000 },
  { category: '3D / Visualization', name: 'Facade options render', unitType: 'per_option', unitLabel: 'option', basic: 7000, standard: 12000, premium: 22000 },
  { category: '3D / Visualization', name: 'Before/after design visuals', unitType: 'per_pair', unitLabel: 'image pair', basic: 8000, standard: 14000, premium: 22000 },

  // Interior Design
  { category: 'Interior Design', name: 'Interior consultation', unitType: 'per_meeting', unitLabel: '60 min', basic: 1500, standard: 3000, premium: 5000 },
  { category: 'Interior Design', name: 'Space planning', unitType: 'per_sqft', unitLabel: 'sq ft', basic: 12, standard: 18, premium: 28 },
  { category: 'Interior Design', name: 'Mood board', unitType: 'per_space', unitLabel: 'space/room', basic: 4000, standard: 8000, premium: 15000 },
  { category: 'Interior Design', name: 'Material palette', unitType: 'per_space', unitLabel: 'space/room', basic: 5000, standard: 9000, premium: 16000 },
  { category: 'Interior Design', name: 'Furniture layout', unitType: 'per_space', unitLabel: 'space/room', basic: 3500, standard: 7000, premium: 12000 },
  { category: 'Interior Design', name: 'False ceiling concept', unitType: 'per_space', unitLabel: 'space/room', basic: 6000, standard: 11000, premium: 18000 },
  { category: 'Interior Design', name: 'Lighting concept', unitType: 'per_space', unitLabel: 'space/room', basic: 5000, standard: 9500, premium: 17000 },
  { category: 'Interior Design', name: 'Custom furniture design', unitType: 'per_item', unitLabel: 'item', basic: 6000, standard: 12000, premium: 22000 },
  { category: 'Interior Design', name: 'Modular kitchen design', unitType: 'per_kitchen', unitLabel: 'kitchen', basic: 15000, standard: 28000, premium: 45000 },
  { category: 'Interior Design', name: 'Wardrobe design', unitType: 'per_wardrobe', unitLabel: 'wardrobe', basic: 7000, standard: 12000, premium: 20000 },
  { category: 'Interior Design', name: 'Bedroom detailing', unitType: 'per_room', unitLabel: 'room', basic: 12000, standard: 22000, premium: 38000 },
  { category: 'Interior Design', name: 'Living room detailing', unitType: 'per_room', unitLabel: 'room', basic: 12000, standard: 22000, premium: 38000 },
  { category: 'Interior Design', name: 'Office interior planning', unitType: 'per_sqft', unitLabel: 'sq ft', basic: 18, standard: 30, premium: 48 },
  { category: 'Interior Design', name: 'Retail interior planning', unitType: 'per_sqft', unitLabel: 'sq ft', basic: 20, standard: 34, premium: 55 },
  { category: 'Interior Design', name: 'Interior BOQ', unitType: 'per_project', unitLabel: 'project', basic: 5000, standard: 9500, premium: 18000 },
  { category: 'Interior Design', name: 'Execution drawings', unitType: 'per_room', unitLabel: 'room', basic: 12000, standard: 22000, premium: 38000 },
  { category: 'Interior Design', name: 'Vendor coordination support', unitType: 'per_day', unitLabel: 'day', basic: 5000, standard: 9000, premium: 16000 },

  // Landscape
  { category: 'Landscape', name: 'Landscape concept', unitType: 'per_sqft', unitLabel: 'sq ft', basic: 10, standard: 18, premium: 28 },
  { category: 'Landscape', name: 'Garden zoning', unitType: 'per_sqft', unitLabel: 'sq ft', basic: 8, standard: 14, premium: 22 },
  { category: 'Landscape', name: 'Hardscape layout', unitType: 'per_sqft', unitLabel: 'sq ft', basic: 6, standard: 10, premium: 16 },
  { category: 'Landscape', name: 'Softscape planting plan', unitType: 'per_sqft', unitLabel: 'sq ft', basic: 6, standard: 10, premium: 16 },
  { category: 'Landscape', name: 'Lighting layout', unitType: 'per_project', unitLabel: 'project', basic: 8000, standard: 15000, premium: 25000 },
  { category: 'Landscape', name: 'Water feature concept', unitType: 'per_feature', unitLabel: 'feature', basic: 8000, standard: 15000, premium: 28000 },
  { category: 'Landscape', name: 'Outdoor seating design', unitType: 'per_zone', unitLabel: 'zone', basic: 7000, standard: 12000, premium: 20000 },
  { category: 'Landscape', name: 'Terrace landscape concept', unitType: 'per_terrace', unitLabel: 'terrace', basic: 12000, standard: 22000, premium: 38000 },
  { category: 'Landscape', name: 'Entrance landscape concept', unitType: 'per_entry', unitLabel: 'entry zone', basic: 7000, standard: 12000, premium: 22000 },
  { category: 'Landscape', name: 'Irrigation concept support', unitType: 'per_project', unitLabel: 'project', basic: 6000, standard: 10000, premium: 18000 },
  { category: 'Landscape', name: 'Landscape 3D views', unitType: 'per_view', unitLabel: 'view', basic: 9000, standard: 15000, premium: 26000 },

  // Graphic / Brand / Presentation
  { category: 'Graphic / Brand / Presentation', name: 'Brand consultation', unitType: 'per_meeting', unitLabel: '60 min', basic: 2000, standard: 4000, premium: 7000 },
  { category: 'Graphic / Brand / Presentation', name: 'Logo refinement', unitType: 'per_project', unitLabel: 'project', basic: 12000, standard: 25000, premium: 45000 },
  { category: 'Graphic / Brand / Presentation', name: 'Color palette selection', unitType: 'per_project', unitLabel: 'project', basic: 5000, standard: 10000, premium: 18000 },
  { category: 'Graphic / Brand / Presentation', name: 'Typography selection', unitType: 'per_project', unitLabel: 'project', basic: 5000, standard: 10000, premium: 18000 },
  { category: 'Graphic / Brand / Presentation', name: 'Brand guideline sheet', unitType: 'per_document', unitLabel: 'document', basic: 8000, standard: 18000, premium: 32000 },
  { category: 'Graphic / Brand / Presentation', name: 'Company profile design', unitType: 'per_document', unitLabel: 'document', basic: 12000, standard: 25000, premium: 45000 },
  { category: 'Graphic / Brand / Presentation', name: 'Brochure design', unitType: 'per_document', unitLabel: 'document', basic: 8000, standard: 18000, premium: 32000 },
  { category: 'Graphic / Brand / Presentation', name: 'Presentation deck', unitType: 'per_deck', unitLabel: 'deck', basic: 10000, standard: 22000, premium: 40000 },
  { category: 'Graphic / Brand / Presentation', name: 'Proposal template', unitType: 'per_template', unitLabel: 'template', basic: 6000, standard: 12000, premium: 22000 },
  { category: 'Graphic / Brand / Presentation', name: 'Social media template pack', unitType: 'per_pack', unitLabel: 'pack', basic: 6000, standard: 12000, premium: 22000 },
  { category: 'Graphic / Brand / Presentation', name: 'Business card design', unitType: 'per_set', unitLabel: 'set', basic: 3000, standard: 6000, premium: 10000 },
  { category: 'Graphic / Brand / Presentation', name: 'Letterhead / stationery', unitType: 'per_set', unitLabel: 'set', basic: 5000, standard: 9000, premium: 16000 },
  { category: 'Graphic / Brand / Presentation', name: 'Signage concept', unitType: 'per_item', unitLabel: 'item', basic: 5000, standard: 10000, premium: 18000 },
  { category: 'Graphic / Brand / Presentation', name: 'Hoarding / site board design', unitType: 'per_item', unitLabel: 'item', basic: 5000, standard: 10000, premium: 18000 },
  { category: 'Graphic / Brand / Presentation', name: 'Project sheet design', unitType: 'per_sheet', unitLabel: 'sheet', basic: 2500, standard: 5000, premium: 9000 },

  // UI/UX / Digital Experience
  { category: 'UI/UX / Digital Experience', name: 'Website discovery', unitType: 'per_workshop', unitLabel: 'workshop', basic: 5000, standard: 12000, premium: 22000 },
  { category: 'UI/UX / Digital Experience', name: 'Sitemap planning', unitType: 'per_project', unitLabel: 'project', basic: 8000, standard: 18000, premium: 32000 },
  { category: 'UI/UX / Digital Experience', name: 'Information architecture', unitType: 'per_project', unitLabel: 'project', basic: 10000, standard: 22000, premium: 38000 },
  { category: 'UI/UX / Digital Experience', name: 'UX wireframes', unitType: 'per_page', unitLabel: 'page', basic: 2500, standard: 5000, premium: 9000 },
  { category: 'UI/UX / Digital Experience', name: 'Homepage design', unitType: 'per_page', unitLabel: 'page', basic: 20000, standard: 35000, premium: 60000 },
  { category: 'UI/UX / Digital Experience', name: 'Service page design', unitType: 'per_page', unitLabel: 'page', basic: 10000, standard: 18000, premium: 30000 },
  { category: 'UI/UX / Digital Experience', name: 'Contact funnel design', unitType: 'per_project', unitLabel: 'project', basic: 10000, standard: 18000, premium: 32000 },
  { category: 'UI/UX / Digital Experience', name: 'CTA optimization', unitType: 'per_project', unitLabel: 'project', basic: 12000, standard: 22000, premium: 38000 },
  { category: 'UI/UX / Digital Experience', name: 'Mobile UX optimization', unitType: 'per_project', unitLabel: 'project', basic: 12000, standard: 22000, premium: 38000 },
  { category: 'UI/UX / Digital Experience', name: 'Form flow design', unitType: 'per_project', unitLabel: 'project', basic: 8000, standard: 15000, premium: 26000 },
  { category: 'UI/UX / Digital Experience', name: 'WhatsApp integration planning', unitType: 'per_project', unitLabel: 'project', basic: 8000, standard: 15000, premium: 26000 },
  { category: 'UI/UX / Digital Experience', name: 'Portfolio page design', unitType: 'per_page', unitLabel: 'page', basic: 10000, standard: 18000, premium: 30000 },
  { category: 'UI/UX / Digital Experience', name: 'Blog structure', unitType: 'per_project', unitLabel: 'project', basic: 8000, standard: 15000, premium: 26000 },
  { category: 'UI/UX / Digital Experience', name: 'SEO-ready content structure', unitType: 'per_project', unitLabel: 'project', basic: 15000, standard: 28000, premium: 50000 },
  { category: 'UI/UX / Digital Experience', name: 'Design system / component library', unitType: 'per_project', unitLabel: 'project', basic: 18000, standard: 35000, premium: 65000 },
  { category: 'UI/UX / Digital Experience', name: 'Developer handoff support', unitType: 'per_project', unitLabel: 'project', basic: 10000, standard: 18000, premium: 32000 },

  // Construction / Execution Support
  { category: 'Construction / Execution Support', name: 'Project consultation', unitType: 'per_meeting', unitLabel: '60 min', basic: 2000, standard: 4000, premium: 7000 },
  { category: 'Construction / Execution Support', name: 'Scope definition', unitType: 'per_project', unitLabel: 'project', basic: 8000, standard: 15000, premium: 26000 },
  { category: 'Construction / Execution Support', name: 'Tender package support', unitType: 'per_project', unitLabel: 'project', basic: 18000, standard: 32000, premium: 55000 },
  { category: 'Construction / Execution Support', name: 'BOQ review', unitType: 'per_project', unitLabel: 'project', basic: 10000, standard: 18000, premium: 30000 },
  { category: 'Construction / Execution Support', name: 'Material selection support', unitType: 'per_project', unitLabel: 'project', basic: 8000, standard: 15000, premium: 26000 },
  { category: 'Construction / Execution Support', name: 'Site supervision visit', unitType: 'per_visit', unitLabel: 'visit', basic: 5000, standard: 9000, premium: 15000 },
  { category: 'Construction / Execution Support', name: 'Contractor coordination', unitType: 'per_day', unitLabel: 'day', basic: 8000, standard: 15000, premium: 25000 },
  { category: 'Construction / Execution Support', name: 'Vendor coordination', unitType: 'per_day', unitLabel: 'day', basic: 5000, standard: 9000, premium: 16000 },
  { category: 'Construction / Execution Support', name: 'Quality checklist support', unitType: 'per_project', unitLabel: 'project', basic: 7000, standard: 12000, premium: 20000 },
  { category: 'Construction / Execution Support', name: 'Progress review meeting', unitType: 'per_meeting', unitLabel: 'meeting', basic: 3000, standard: 6000, premium: 10000 },
  { category: 'Construction / Execution Support', name: 'Execution timeline planning', unitType: 'per_project', unitLabel: 'project', basic: 10000, standard: 18000, premium: 30000 },
  { category: 'Construction / Execution Support', name: 'Billing verification support', unitType: 'per_bill_cycle', unitLabel: 'bill cycle', basic: 6000, standard: 12000, premium: 22000 },

  // Advisory / Premium Thinking
  { category: 'Advisory / Premium Thinking', name: 'Monthly design advisor retainer', unitType: 'per_month', unitLabel: 'month', basic: 10000, standard: 22000, premium: 40000 },
  { category: 'Advisory / Premium Thinking', name: 'Review calls', unitType: 'per_call_pack', unitLabel: 'call pack', basic: 5000, standard: 10000, premium: 18000 },
  { category: 'Advisory / Premium Thinking', name: 'Concept critique', unitType: 'per_review', unitLabel: 'review', basic: 5000, standard: 10000, premium: 18000 },
  { category: 'Advisory / Premium Thinking', name: 'Site decision support', unitType: 'per_visit', unitLabel: 'visit', basic: 5000, standard: 9000, premium: 15000 },
  { category: 'Advisory / Premium Thinking', name: 'Vendor selection guidance', unitType: 'per_project', unitLabel: 'project', basic: 8000, standard: 15000, premium: 26000 },
  { category: 'Advisory / Premium Thinking', name: 'Client presentation support', unitType: 'per_presentation', unitLabel: 'presentation', basic: 8000, standard: 15000, premium: 26000 },
  { category: 'Advisory / Premium Thinking', name: 'Design audit', unitType: 'per_project', unitLabel: 'project', basic: 12000, standard: 22000, premium: 38000 },
  { category: 'Advisory / Premium Thinking', name: 'Conversion audit for website', unitType: 'per_project', unitLabel: 'project', basic: 12000, standard: 22000, premium: 38000 },
  { category: 'Advisory / Premium Thinking', name: 'Brand improvement roadmap', unitType: 'per_project', unitLabel: 'project', basic: 15000, standard: 28000, premium: 50000 },
  { category: 'Advisory / Premium Thinking', name: 'Content direction for photos/videos', unitType: 'per_month', unitLabel: 'month', basic: 15000, standard: 30000, premium: 55000 },

  // AI / Automation Layer
  { category: 'AI / Automation Layer', name: 'AI chatbot planning', unitType: 'per_project', unitLabel: 'project', basic: 15000, standard: 30000, premium: 55000 },
  { category: 'AI / Automation Layer', name: 'Lead qualification flow', unitType: 'per_project', unitLabel: 'project', basic: 18000, standard: 35000, premium: 65000 },
  { category: 'AI / Automation Layer', name: 'FAQ automation map', unitType: 'per_project', unitLabel: 'project', basic: 12000, standard: 22000, premium: 38000 },
  { category: 'AI / Automation Layer', name: 'WhatsApp automation planning', unitType: 'per_project', unitLabel: 'project', basic: 18000, standard: 35000, premium: 65000 },
  { category: 'AI / Automation Layer', name: 'AI voice workflow planning', unitType: 'per_project', unitLabel: 'project', basic: 35000, standard: 65000, premium: 120000 },
  { category: 'AI / Automation Layer', name: 'CRM inquiry routing logic', unitType: 'per_project', unitLabel: 'project', basic: 18000, standard: 32000, premium: 58000 },
  { category: 'AI / Automation Layer', name: 'Auto-response copy system', unitType: 'per_project', unitLabel: 'project', basic: 10000, standard: 18000, premium: 32000 },
  { category: 'AI / Automation Layer', name: 'Proposal automation planning', unitType: 'per_project', unitLabel: 'project', basic: 15000, standard: 28000, premium: 50000 },
];

export const PACKAGES: Package[] = [
  // Architecture
  { code: 'PKG-ARC-001', name: 'Discovery & Feasibility Pack', vertical: 'Architecture', targetClient: 'Plot owners / first-time clients', basic: 5225, standard: 17955, premium: 28847, basicServices: ['Site visit / requirement discovery', 'Design consultation'], standardServices: ['Site visit / requirement discovery', 'Design consultation', 'Zoning options', 'Material suggestions'], premiumServices: ['Site visit / requirement discovery', 'Design consultation', 'Zoning options', 'Space planning', 'Material suggestions'], upsellTrigger: 'Upsell to Concept Design Package' },
  { code: 'PKG-ARC-002', name: 'Concept Design Package', vertical: 'Architecture', targetClient: 'Homeowners / early-stage developers', basic: 48, standard: 6526, premium: 10976, basicServices: ['Concept design', 'Space planning', 'Floor plan design'], standardServices: ['Concept design', 'Space planning', 'Floor plan design', 'Furniture layout', 'Zoning options'], premiumServices: ['Concept design', 'Space planning', 'Floor plan design', 'Furniture layout', 'Zoning options', 'Schematic design set'], upsellTrigger: 'Upsell to Drawing Development Package' },
  { code: 'PKG-ARC-003', name: 'Drawing Development Package', vertical: 'Architecture', targetClient: 'Clients ready for detailed design', basic: 9519, standard: 25366, premium: 75697, basicServices: ['Floor plan design', 'Sections', 'Elevations'], standardServices: ['Floor plan design', 'Sections', 'Elevations', 'Working drawings', 'Door-window schedule'], premiumServices: ['Floor plan design', 'Sections', 'Elevations', 'Working drawings', 'Door-window schedule', 'Detail drawings', 'Site coordination drawings'], upsellTrigger: 'Upsell to Approval / Execution Package' },
  { code: 'PKG-ARC-004', name: 'Approval & Submission Package', vertical: 'Architecture', targetClient: 'Clients needing authority submission support', basic: 33269, standard: 61669, premium: 104893, basicServices: ['Floor plan design', 'Sections', 'Elevations', 'Municipal / approval drawing support'], standardServices: ['Floor plan design', 'Sections', 'Elevations', 'Municipal / approval drawing support', 'Presentation drawings'], premiumServices: ['Floor plan design', 'Sections', 'Elevations', 'Municipal / approval drawing support', 'Presentation drawings', 'Design revisions'], upsellTrigger: 'Upsell to Full Architecture Package' },
  { code: 'PKG-ARC-005', name: 'Full Architecture Package', vertical: 'Architecture', targetClient: 'Serious residential / commercial clients', basic: 9470, standard: 39271, premium: 114184, basicServices: ['Concept design', 'Space planning', 'Floor plan design', 'Sections', 'Elevations', 'Working drawings'], standardServices: ['Concept design', 'Space planning', 'Floor plan design', 'Furniture layout', 'Zoning options', 'Sections', 'Elevations', 'Working drawings', 'Door-window schedule', 'Material suggestions'], premiumServices: ['Concept design', 'Space planning', 'Floor plan design', 'Furniture layout', 'Zoning options', 'Schematic design set', 'Working drawings', 'Presentation drawings', 'Detail drawings', 'Door-window schedule', 'Material suggestions', 'BOQ support', 'Site coordination drawings'], upsellTrigger: 'Upsell to Execution Support Package' },

  // Drawings
  { code: 'PKG-DRW-001', name: 'Drawing Essentials', vertical: 'Drawings', targetClient: 'Small projects / drafting-only clients', basic: 16150, standard: 42780, premium: 90000, basicServices: ['Floor plans', 'Sections', 'Elevations'], standardServices: ['Floor plans', 'Sections', 'Elevations', 'Terrace plan', 'Roof plan'], premiumServices: ['Floor plans', 'Sections', 'Elevations', 'Terrace plan', 'Roof plan', 'Door-window schedule', 'Detail drawings'] },
  { code: 'PKG-DRW-002', name: 'Technical Layout Package', vertical: 'Drawings', targetClient: 'Execution-ready drawing clients', basic: 19950, standard: 56120, premium: 115200, basicServices: ['Electrical layout', 'Plumbing layout', 'Lighting layout'], standardServices: ['Electrical layout', 'Plumbing layout', 'HVAC coordination layout', 'Lighting layout', 'Reflected ceiling plan'], premiumServices: ['Electrical layout', 'Plumbing layout', 'HVAC coordination layout', 'Lighting layout', 'Reflected ceiling plan', 'False ceiling layout', 'Flooring layout'] },
  { code: 'PKG-DRW-003', name: 'Joinery & Detail Package', vertical: 'Drawings', targetClient: 'Interior execution clients', basic: 10450, standard: 38640, premium: 83700, basicServices: ['Joinery drawings', 'Wardrobe drawings'], standardServices: ['Joinery drawings', 'Wardrobe drawings', 'Kitchen drawings'], premiumServices: ['Joinery drawings', 'Wardrobe drawings', 'Kitchen drawings', 'Stair details'] },
  { code: 'PKG-DRW-004', name: 'Site Elements Package', vertical: 'Drawings', targetClient: 'Residential plot owners', basic: 11400, standard: 35880, premium: 65250, basicServices: ['Compound wall drawings', 'Gate drawings'], standardServices: ['Compound wall drawings', 'Gate drawings', 'Landscape layout'], premiumServices: ['Compound wall drawings', 'Gate drawings', 'Landscape layout', 'Presentation drawings'] },

  // 3D / Visualization
  { code: 'PKG-VIZ-001', name: '3D Starter Package', vertical: '3D / Visualization', targetClient: 'Clients needing visual clarity', basic: 19000, standard: 46000, premium: 96750, basicServices: ['Basic 3D massing', 'Still renders'], standardServices: ['Exterior 3D model', 'Still renders', 'Day views'], premiumServices: ['Exterior 3D model', 'High-quality photoreal renders', 'Day views', 'Night views'] },
  { code: 'PKG-VIZ-002', name: 'Interior Visualization Package', vertical: '3D / Visualization', targetClient: 'Interior clients needing approval visuals', basic: 19000, standard: 51520, premium: 115200, basicServices: ['Interior 3D model', 'Still renders'], standardServices: ['Interior 3D model', 'High-quality photoreal renders', 'Material mood render'], premiumServices: ['Interior 3D model', 'High-quality photoreal renders', 'Material mood render', '360 views'] },
  { code: 'PKG-VIZ-003', name: 'Marketing Visualization Pack', vertical: '3D / Visualization', targetClient: 'Developers / brand-led projects', basic: 16625, standard: 52440, premium: 110250, basicServices: ['High-quality photoreal renders', 'Day views', 'Night views'], standardServices: ['High-quality photoreal renders', 'Day views', 'Night views', 'Facade options render', 'Before/after design visuals'], premiumServices: ['High-quality photoreal renders', 'Day views', 'Night views', 'Facade options render', 'Before/after design visuals', 'Walkthrough frames'] },
  { code: 'PKG-VIZ-004', name: 'Walkthrough Package', vertical: '3D / Visualization', targetClient: 'Premium clients / launch presentations', basic: 50350, standard: 86480, premium: 177750, basicServices: ['Walkthrough frames', 'Animated walkthrough'], standardServices: ['Walkthrough frames', 'Animated walkthrough', 'Day views'], premiumServices: ['Walkthrough frames', 'Animated walkthrough', 'Day views', 'Night views', '360 views'] },

  // Interior Design
  { code: 'PKG-INT-001', name: 'Interior Starter Room Package', vertical: 'Interior Design', targetClient: 'Middle-budget first-time interiors clients', basic: 8550, standard: 33580, premium: 74700, basicServices: ['Interior consultation', 'Mood board', 'Furniture layout'], standardServices: ['Interior consultation', 'Mood board', 'Material palette', 'Furniture layout', 'Lighting concept'], premiumServices: ['Interior consultation', 'Mood board', 'Material palette', 'Furniture layout', 'False ceiling concept', 'Lighting concept'] },
  { code: 'PKG-INT-002', name: 'Room Detailing Package', vertical: 'Interior Design', targetClient: 'Bedroom / living room clients', basic: 12000, standard: 41800, premium: 104880, basicServices: ['Bedroom detailing'], standardServices: ['Bedroom detailing', 'Living room detailing'], premiumServices: ['Bedroom detailing', 'Living room detailing', 'Execution drawings'] },
  { code: 'PKG-INT-003', name: 'Kitchen & Storage Package', vertical: 'Interior Design', targetClient: 'Residential interiors clients', basic: 20900, standard: 57040, premium: 128700, basicServices: ['Modular kitchen design', 'Wardrobe design'], standardServices: ['Modular kitchen design', 'Wardrobe design', 'Kitchen drawings'], premiumServices: ['Modular kitchen design', 'Wardrobe design', 'Kitchen drawings', 'Wardrobe drawings', 'Custom furniture design'] },
  { code: 'PKG-INT-004', name: 'Full Interior Package', vertical: 'Interior Design', targetClient: 'Homeowners doing complete interiors', basic: 18050, standard: 63957, premium: 159325, basicServices: ['Interior consultation', 'Mood board', 'Material palette', 'Furniture layout', 'Lighting concept'], standardServices: ['Interior consultation', 'Space planning', 'Mood board', 'Material palette', 'Furniture layout', 'False ceiling concept', 'Lighting concept', 'Execution drawings'], premiumServices: ['Interior consultation', 'Space planning', 'Mood board', 'Material palette', 'Furniture layout', 'False ceiling concept', 'Lighting concept', 'Custom furniture design', 'Execution drawings', 'Interior BOQ', 'Vendor coordination support'] },
  { code: 'PKG-INT-005', name: 'Commercial Interior Package', vertical: 'Interior Design', targetClient: 'Office / retail clients', basic: 18, standard: 8611, premium: 65415, basicServices: ['Office interior planning'], standardServices: ['Office interior planning', 'Retail interior planning', 'Material palette'], premiumServices: ['Office interior planning', 'Retail interior planning', 'Material palette', 'Lighting concept', 'Execution drawings'] },

  // Landscape
  { code: 'PKG-LND-001', name: 'Landscape Starter Package', vertical: 'Landscape', targetClient: 'Residential plot owners', basic: 17, standard: 48, premium: 22574, basicServices: ['Landscape concept', 'Garden zoning'], standardServices: ['Landscape concept', 'Garden zoning', 'Hardscape layout', 'Softscape planting plan'], premiumServices: ['Landscape concept', 'Garden zoning', 'Hardscape layout', 'Softscape planting plan', 'Lighting layout'] },
  { code: 'PKG-LND-002', name: 'Outdoor Experience Package', vertical: 'Landscape', targetClient: 'Lifestyle homes / villas', basic: 6661, standard: 22098, premium: 86429, basicServices: ['Hardscape layout', 'Softscape planting plan', 'Outdoor seating design'], standardServices: ['Hardscape layout', 'Softscape planting plan', 'Outdoor seating design', 'Entrance landscape concept'], premiumServices: ['Hardscape layout', 'Softscape planting plan', 'Outdoor seating design', 'Entrance landscape concept', 'Water feature concept', 'Landscape 3D views'] },
  { code: 'PKG-LND-003', name: 'Terrace Landscape Package', vertical: 'Landscape', targetClient: 'Urban homes / hospitality terraces', basic: 12000, standard: 35150, premium: 116840, basicServices: ['Terrace landscape concept'], standardServices: ['Terrace landscape concept', 'Lighting layout'], premiumServices: ['Terrace landscape concept', 'Lighting layout', 'Outdoor seating design', 'Landscape 3D views', 'Irrigation concept support'] },

  // Brand
  { code: 'PKG-BRD-001', name: 'Brand Foundation Package', vertical: 'Graphic / Brand / Presentation', targetClient: 'Small businesses entering structured branding', basic: 11400, standard: 61640, premium: 131400, basicServices: ['Brand consultation', 'Color palette selection', 'Typography selection'], standardServices: ['Brand consultation', 'Logo refinement', 'Color palette selection', 'Typography selection', 'Brand guideline sheet'], premiumServices: ['Brand consultation', 'Logo refinement', 'Color palette selection', 'Typography selection', 'Brand guideline sheet', 'Business card design', 'Letterhead / stationery'] },
  { code: 'PKG-BRD-002', name: 'Profile & Pitch Package', vertical: 'Graphic / Brand / Presentation', targetClient: 'B2B firms / labs / consultancies', basic: 20900, standard: 54280, premium: 133200, basicServices: ['Company profile design', 'Presentation deck'], standardServices: ['Company profile design', 'Presentation deck', 'Proposal template'], premiumServices: ['Company profile design', 'Presentation deck', 'Proposal template', 'Brochure design', 'Project sheet design'] },
  { code: 'PKG-BRD-003', name: 'Brand Visibility Package', vertical: 'Graphic / Brand / Presentation', targetClient: 'Businesses needing sales collateral', basic: 13300, standard: 34040, premium: 75600, basicServices: ['Social media template pack', 'Business card design', 'Letterhead / stationery'], standardServices: ['Social media template pack', 'Business card design', 'Letterhead / stationery', 'Signage concept'], premiumServices: ['Social media template pack', 'Business card design', 'Letterhead / stationery', 'Signage concept', 'Hoarding / site board design'] },

  // Digital
  { code: 'PKG-DIG-001', name: 'Website Starter Package', vertical: 'UI/UX / Digital Experience', targetClient: 'Clients starting digital presence upgrade', basic: 31350, standard: 96600, premium: 206100, basicServices: ['Website discovery', 'Sitemap planning', 'Homepage design'], standardServices: ['Website discovery', 'Sitemap planning', 'Information architecture', 'Homepage design', 'Service page design'], premiumServices: ['Website discovery', 'Sitemap planning', 'Information architecture', 'UX wireframes', 'Homepage design', 'Service page design', 'Mobile UX optimization'] },
  { code: 'PKG-DIG-002', name: 'Conversion Package', vertical: 'UI/UX / Digital Experience', targetClient: 'Lead-driven businesses', basic: 28500, standard: 64400, premium: 154800, basicServices: ['Contact funnel design', 'CTA optimization', 'Form flow design'], standardServices: ['Contact funnel design', 'CTA optimization', 'Form flow design', 'WhatsApp integration planning'], premiumServices: ['Contact funnel design', 'CTA optimization', 'Form flow design', 'WhatsApp integration planning', 'SEO-ready content structure'] },
  { code: 'PKG-DIG-003', name: 'Digital Authority Package', vertical: 'UI/UX / Digital Experience', targetClient: 'Established businesses wanting credibility and leads', basic: 49820, standard: 148500, premium: 430320, basicServices: ['Website discovery', 'Sitemap planning', 'Homepage design', 'Service page design', 'Contact funnel design'], standardServices: ['Website discovery', 'Sitemap planning', 'Information architecture', 'UX wireframes', 'Homepage design', 'Service page design', 'Contact funnel design', 'CTA optimization', 'WhatsApp integration planning'], premiumServices: ['Website discovery', 'Sitemap planning', 'Information architecture', 'UX wireframes', 'Homepage design', 'Service page design', 'Portfolio page design', 'Blog structure', 'Contact funnel design', 'CTA optimization', 'Mobile UX optimization', 'Form flow design', 'WhatsApp integration planning', 'SEO-ready content structure', 'Developer handoff support'] },
  { code: 'PKG-DIG-004', name: 'Website System Package', vertical: 'UI/UX / Digital Experience', targetClient: 'Scale-up businesses / productized firms', basic: 38000, standard: 95680, premium: 218700, basicServices: ['Homepage design', 'Service page design', 'Portfolio page design'], standardServices: ['Homepage design', 'Service page design', 'Portfolio page design', 'Blog structure', 'Developer handoff support'], premiumServices: ['Homepage design', 'Service page design', 'Portfolio page design', 'Blog structure', 'Design system / component library', 'Developer handoff support'] },

  // Execution
  { code: 'PKG-EXE-001', name: 'Inspection & Review Package', vertical: 'Construction / Execution Support', targetClient: 'Site-stage residential clients', basic: 9500, standard: 31280, premium: 70200, basicServices: ['Project consultation', 'Site supervision visit', 'Progress review meeting'], standardServices: ['Project consultation', 'Scope definition', 'Site supervision visit', 'Progress review meeting'], premiumServices: ['Project consultation', 'Scope definition', 'Site supervision visit', 'Progress review meeting', 'Quality checklist support'] },
  { code: 'PKG-EXE-002', name: 'Coordination Package', vertical: 'Construction / Execution Support', targetClient: 'Clients managing contractors/vendors', basic: 12350, standard: 38640, premium: 83700, basicServices: ['Contractor coordination', 'Vendor coordination'], standardServices: ['Contractor coordination', 'Vendor coordination', 'Execution timeline planning'], premiumServices: ['Contractor coordination', 'Vendor coordination', 'Execution timeline planning', 'Billing verification support'] },
  { code: 'PKG-EXE-003', name: 'Tender & BOQ Package', vertical: 'Construction / Execution Support', targetClient: 'Clients entering contractor selection phase', basic: 26600, standard: 59800, premium: 123300, basicServices: ['Tender package support', 'BOQ review'], standardServices: ['Tender package support', 'BOQ review', 'Material selection support'], premiumServices: ['Tender package support', 'BOQ review', 'Material selection support', 'Scope definition'] },

  // Advisory
  { code: 'PKG-ADV-001', name: 'Monthly Advisory Package', vertical: 'Advisory / Premium Thinking', targetClient: 'Clients needing ongoing expert input', basic: 10000, standard: 39900, premium: 107640, basicServices: ['Monthly design advisor retainer'], standardServices: ['Monthly design advisor retainer', 'Review calls', 'Concept critique'], premiumServices: ['Monthly design advisor retainer', 'Review calls', 'Concept critique', 'Site decision support', 'Client presentation support'] },
  { code: 'PKG-ADV-002', name: 'Audit & Improvement Package', vertical: 'Advisory / Premium Thinking', targetClient: 'Businesses/design clients needing clarity', basic: 12000, standard: 47500, premium: 166520, basicServices: ['Design audit'], standardServices: ['Design audit', 'Brand improvement roadmap'], premiumServices: ['Design audit', 'Brand improvement roadmap', 'Conversion audit for website', 'Content direction for photos/videos'] },

  // AI / Automation
  { code: 'PKG-AUT-001', name: 'WhatsApp Automation Starter', vertical: 'AI / Automation Layer', targetClient: 'Businesses wanting faster response systems', basic: 28500, standard: 84640, premium: 232200, basicServices: ['FAQ automation map', 'WhatsApp automation planning'], standardServices: ['Lead qualification flow', 'FAQ automation map', 'WhatsApp automation planning'], premiumServices: ['Lead qualification flow', 'FAQ automation map', 'WhatsApp automation planning', 'CRM inquiry routing logic', 'Auto-response copy system'] },
  { code: 'PKG-AUT-002', name: 'AI Lead System Package', vertical: 'AI / Automation Layer', targetClient: 'Lead-heavy service businesses', basic: 31350, standard: 89240, premium: 234000, basicServices: ['AI chatbot planning', 'Lead qualification flow'], standardServices: ['AI chatbot planning', 'Lead qualification flow', 'CRM inquiry routing logic'], premiumServices: ['AI chatbot planning', 'Lead qualification flow', 'CRM inquiry routing logic', 'Auto-response copy system', 'Proposal automation planning'] },
  { code: 'PKG-AUT-003', name: 'AI Voice Workflow Package', vertical: 'AI / Automation Layer', targetClient: 'Premium automation clients', basic: 35000, standard: 95000, premium: 269560, basicServices: ['AI voice workflow planning'], standardServices: ['AI voice workflow planning', 'Lead qualification flow'], premiumServices: ['AI voice workflow planning', 'Lead qualification flow', 'CRM inquiry routing logic', 'Proposal automation planning'] },
];

export const CATEGORIES = [...new Set(MICROSERVICES.map(m => m.category))];

export const multipliers = {
  city: { 'T1 (Metro)': 1.2, 'T2 (City)': 1.0, 'T3 (Town)': 0.9 },
  complexity: { 'Low': 1.0, 'Medium': 1.15, 'High': 1.3 },
  urgency: { 'Normal': 1.0, 'Express': 1.25, 'Critical': 1.5 },
};

export const BRAND = {
  navy: '#1C1C72',
  violet: '#7B2DBF',
  background: '#FFFFFF',
  text: '#111111',
  muted: '#6B7280',
  border: '#E5E7EB',
  accent: '#F3F0FF',
};
