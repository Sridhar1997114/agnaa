export type PricingBasis = 'Plan' | 'Elevation' | 'Flat' | 'Second';

export interface PricingService {
  id: string;
  name: string;
  scope: string;
  basePrice: number;
  perUnitRateLow: number;
  perUnitRateHigh: number;
  minPrice: number;
  maxPrice: number;
  basis: PricingBasis;
  days: string;
  revisions: string;
}

export interface PricingCategory {
  id: string;
  name: string;
  description?: string;
  services: PricingService[];
}

export const complexityFactors = [
  { id: 'simple', name: 'Simple', description: 'Single-floor, basic layouts', multiplier: 0.8 },
  { id: 'standard', name: 'Standard', description: 'Typical 2–3 floor residential', multiplier: 1.05 },
  { id: 'complex', name: 'Complex', description: 'Multi-floor, MEP coordination needed', multiplier: 1.3 },
  { id: 'very_complex', name: 'Very Complex', description: 'High-rise, structural calcs, mixed-use', multiplier: 1.65 }
] as const;

export const pricingData: PricingCategory[] = [
  {
    id: 'arch_floor_plans',
    name: 'Architectural - Floor Plans',
    services: [
      { id: 'gf_plan', name: 'Ground Floor Plan', scope: 'Single floor layout', basePrice: 2000, perUnitRateLow: 1.5, perUnitRateHigh: 2.5, minPrice: 2000, maxPrice: 5000, basis: 'Plan', days: '2-3', revisions: '1 Round' },
      { id: 'all_floors_plan', name: 'All Floors Plan', scope: 'Complete building layout', basePrice: 8000, perUnitRateLow: 2, perUnitRateHigh: 4, minPrice: 8000, maxPrice: 18000, basis: 'Plan', days: '3-5', revisions: '1 Round' },
    ]
  },
  {
    id: 'arch_elevations',
    name: 'Architectural - Elevations',
    services: [
      { id: 'single_elevation', name: 'Single Facade Elevation', scope: 'Front facade with dimensions', basePrice: 3000, perUnitRateLow: 2, perUnitRateHigh: 3, minPrice: 3000, maxPrice: 7000, basis: 'Elevation', days: '2-3', revisions: '1 Round' },
      { id: 'all_elevations', name: 'All 4 Side Elevations', scope: 'Complete building perimeter', basePrice: 8000, perUnitRateLow: 3, perUnitRateHigh: 5, minPrice: 8000, maxPrice: 16000, basis: 'Elevation', days: '3-5', revisions: '2 Rounds' },
    ]
  },
  {
    id: 'arch_sections',
    name: 'Architectural - Sections & Details',
    services: [
      { id: 'section_single', name: 'Section - Single Cut', scope: 'Vertical cross-section (A-A, B-B)', basePrice: 1500, perUnitRateLow: 1, perUnitRateHigh: 1.5, minPrice: 1500, maxPrice: 4000, basis: 'Plan', days: '2', revisions: '1 Round' },
      { id: 'section_multiple', name: 'Sections - Multiple (3+)', scope: 'All building cross-sections', basePrice: 5000, perUnitRateLow: 2, perUnitRateHigh: 3, minPrice: 5000, maxPrice: 10000, basis: 'Plan', days: '3-5', revisions: '2 Rounds' },
      { id: 'dimension_drawing', name: 'Dimension Drawing', scope: 'Complete construction dimensions', basePrice: 3000, perUnitRateLow: 2, perUnitRateHigh: 3, minPrice: 3000, maxPrice: 8000, basis: 'Plan', days: '2-3', revisions: '1 Round' },
      { id: 'staircase_detail', name: 'Staircase Detail', scope: 'Riser, tread, handrail specs', basePrice: 2500, perUnitRateLow: 1.5, perUnitRateHigh: 2.5, minPrice: 2500, maxPrice: 6000, basis: 'Plan', days: '2-3', revisions: '1 Round' },
      { id: 'door_window_elevation', name: 'Door & Window Elevation', scope: 'All opening details & frames', basePrice: 2000, perUnitRateLow: 1, perUnitRateHigh: 2, minPrice: 2000, maxPrice: 5000, basis: 'Plan', days: '2', revisions: '1 Round' },
    ]
  },
  {
    id: '2d_working',
    name: '2D Working Drawings (RERA)',
    description: 'Complete construction-ready documentation.',
    services: [
      { id: 'g_g2_set', name: 'G–G+2 Complete Set', scope: 'All drawings, all trades, RERA-ready', basePrice: 12000, perUnitRateLow: 2, perUnitRateHigh: 3, minPrice: 10000, maxPrice: 25000, basis: 'Plan', days: '7-10', revisions: '2 Rounds' },
      { id: 'g3_g5_set', name: 'G+3–G+5 Complete Set', scope: 'Multi-floor, schedules', basePrice: 15000, perUnitRateLow: 2.5, perUnitRateHigh: 3.5, minPrice: 12000, maxPrice: 30000, basis: 'Plan', days: '10-12', revisions: '2 Rounds' },
      { id: 'g6_plus_set', name: 'G+6+ Complete Set', scope: 'High-rise, complex coordination', basePrice: 18000, perUnitRateLow: 3, perUnitRateHigh: 4.5, minPrice: 15000, maxPrice: 40000, basis: 'Plan', days: '12-14', revisions: '2 Rounds' },
      { id: 'room_schedule', name: 'Room Schedule & Areas', scope: 'All rooms, finishes, areas', basePrice: 5000, perUnitRateLow: 1, perUnitRateHigh: 1.5, minPrice: 4000, maxPrice: 10000, basis: 'Plan', days: '3-5', revisions: '1 Round' },
      { id: 'dw_schedule', name: 'Door & Window Schedule', scope: 'Type, size, material, hardware', basePrice: 4000, perUnitRateLow: 0.8, perUnitRateHigh: 1.2, minPrice: 3000, maxPrice: 8000, basis: 'Plan', days: '3-5', revisions: '1 Round' },
      { id: 'finish_schedule', name: 'Finish Schedule', scope: 'All surface finishes', basePrice: 3500, perUnitRateLow: 0.8, perUnitRateHigh: 1.2, minPrice: 3000, maxPrice: 7000, basis: 'Plan', days: '2-3', revisions: '1 Round' },
      { id: 'roof_plan', name: 'Roof Plan & Terrace', scope: 'Terrace design, drainage', basePrice: 4000, perUnitRateLow: 1, perUnitRateHigh: 1.5, minPrice: 3500, maxPrice: 8000, basis: 'Plan', days: '3-4', revisions: '1 Round' },
      { id: 'site_plan', name: 'Site Plan & Boundaries', scope: 'Plot layout, setbacks', basePrice: 5000, perUnitRateLow: 1, perUnitRateHigh: 2, minPrice: 4000, maxPrice: 10000, basis: 'Plan', days: '3-5', revisions: '1 Round' },
    ]
  },
  {
    id: 'structural',
    name: 'Structural Drawings',
    services: [
      { id: 'beam_column', name: 'Beams & Columns Layout', scope: 'Beam sizes, grids', basePrice: 6000, perUnitRateLow: 2, perUnitRateHigh: 3, minPrice: 6000, maxPrice: 14000, basis: 'Plan', days: '5-7', revisions: '2 Rounds' },
      { id: 'slab_rebar', name: 'Slabs & Reinforcement', scope: 'Thickness, rebar schedules', basePrice: 7000, perUnitRateLow: 2.5, perUnitRateHigh: 3.5, minPrice: 7000, maxPrice: 16000, basis: 'Plan', days: '5-7', revisions: '2 Rounds' },
      { id: 'foundation', name: 'Foundation Plan', scope: 'Footing design, pile cap', basePrice: 8000, perUnitRateLow: 2, perUnitRateHigh: 3, minPrice: 8000, maxPrice: 18000, basis: 'Plan', days: '5-7', revisions: '2 Rounds' },
      { id: 'staircase_struct', name: 'Staircase Structural', scope: 'Load calculations', basePrice: 3500, perUnitRateLow: 1.5, perUnitRateHigh: 2.5, minPrice: 3500, maxPrice: 8000, basis: 'Plan', days: '3-4', revisions: '1 Round' },
      { id: 'lintel', name: 'Lintel Details', scope: 'Beam reinforcement', basePrice: 2500, perUnitRateLow: 1, perUnitRateHigh: 2, minPrice: 2500, maxPrice: 6000, basis: 'Plan', days: '2-3', revisions: '1 Round' },
      { id: 'struct_calc', name: 'Structural Calculations', scope: 'Load analysis, certification', basePrice: 10000, perUnitRateLow: 2, perUnitRateHigh: 3, minPrice: 10000, maxPrice: 20000, basis: 'Plan', days: '7-10', revisions: '1 Round' },
    ]
  },
  {
    id: 'mep_plumbing',
    name: 'MEP - Plumbing',
    services: [
      { id: 'water_gf', name: 'Water Supply - Ground Floor', scope: 'Main line, risers', basePrice: 3500, perUnitRateLow: 1.5, perUnitRateHigh: 2.5, minPrice: 3500, maxPrice: 8000, basis: 'Plan', days: '3-4', revisions: '1 Round' },
      { id: 'water_all', name: 'Water Supply - All Floors', scope: 'Complete distribution', basePrice: 8000, perUnitRateLow: 2, perUnitRateHigh: 3, minPrice: 8000, maxPrice: 16000, basis: 'Plan', days: '5-7', revisions: '2 Rounds' },
      { id: 'sewage', name: 'Sewage & Drainage', scope: 'Drain lines, sump pit', basePrice: 6000, perUnitRateLow: 1.5, perUnitRateHigh: 2.5, minPrice: 6000, maxPrice: 14000, basis: 'Plan', days: '4-6', revisions: '2 Rounds' },
      { id: 'water_tank', name: 'Water Tank & Pump', scope: 'Capacity, location', basePrice: 3000, perUnitRateLow: 0, perUnitRateHigh: 0, minPrice: 3000, maxPrice: 7000, basis: 'Flat', days: '2-3', revisions: '1 Round' },
      { id: 'fixtures', name: 'Kitchen & Bath Fixtures', scope: 'Positions', basePrice: 2000, perUnitRateLow: 0, perUnitRateHigh: 0, minPrice: 2000, maxPrice: 5000, basis: 'Flat', days: '2', revisions: '1 Round' },
    ]
  },
  {
    id: 'mep_electrical',
    name: 'MEP - Electrical',
    services: [
      { id: 'power_dist', name: 'Power Distribution', scope: 'Panels, breakers', basePrice: 4000, perUnitRateLow: 1.5, perUnitRateHigh: 2.5, minPrice: 4000, maxPrice: 9000, basis: 'Plan', days: '3-5', revisions: '2 Rounds' },
      { id: 'lighting', name: 'Lighting & Points', scope: 'Fixtures, switches', basePrice: 3500, perUnitRateLow: 1, perUnitRateHigh: 2, minPrice: 3500, maxPrice: 8000, basis: 'Plan', days: '3-4', revisions: '1 Round' },
      { id: 'elec_all', name: 'Electrical Layout All', scope: 'Complete distribution', basePrice: 10000, perUnitRateLow: 2, perUnitRateHigh: 3, minPrice: 10000, maxPrice: 20000, basis: 'Plan', days: '5-7', revisions: '2 Rounds' },
      { id: 'sld', name: 'Single Line Diagram', scope: 'Schematic', basePrice: 4000, perUnitRateLow: 0, perUnitRateHigh: 0, minPrice: 4000, maxPrice: 9000, basis: 'Flat', days: '3-4', revisions: '1 Round' },
      { id: 'earthing', name: 'Earthing Details', scope: 'Pit, conductor', basePrice: 2500, perUnitRateLow: 0, perUnitRateHigh: 0, minPrice: 2500, maxPrice: 6000, basis: 'Flat', days: '2-3', revisions: '1 Round' },
    ]
  },
  {
    id: 'mep_hvac',
    name: 'MEP - HVAC',
    services: [
      { id: 'hvac_layout', name: 'HVAC Layout & Ductwork', scope: 'Distribution', basePrice: 5000, perUnitRateLow: 2, perUnitRateHigh: 3, minPrice: 5000, maxPrice: 12000, basis: 'Plan', days: '5-7', revisions: '2 Rounds' },
      { id: 'hvac_specs', name: 'HVAC Specifications', scope: 'Equipment list', basePrice: 4000, perUnitRateLow: 0, perUnitRateHigh: 0, minPrice: 4000, maxPrice: 9000, basis: 'Flat', days: '3-4', revisions: '1 Round' },
    ]
  },
  {
    id: '3d_renders',
    name: '3D Models & Renders',
    services: [
      { id: '3d_basic', name: 'Basic 3D Model', scope: 'Massing, textures', basePrice: 5000, perUnitRateLow: 2, perUnitRateHigh: 3, minPrice: 5000, maxPrice: 12000, basis: 'Elevation', days: '3-5', revisions: '1 Round' },
      { id: '3d_detailed', name: 'Detailed 3D Model', scope: 'Materials, landscaping', basePrice: 8000, perUnitRateLow: 3, perUnitRateHigh: 5, minPrice: 8000, maxPrice: 18000, basis: 'Elevation', days: '5-7', revisions: '2 Rounds' },
      { id: 'render_std', name: 'Render - Standard', scope: 'Daylight elevation', basePrice: 3000, perUnitRateLow: 1.5, perUnitRateHigh: 2.5, minPrice: 3000, maxPrice: 8000, basis: 'Elevation', days: '2-3', revisions: '1 Round' },
      { id: 'render_4k', name: 'Render - Premium 4K', scope: 'High-res, print', basePrice: 5000, perUnitRateLow: 2, perUnitRateHigh: 3, minPrice: 5000, maxPrice: 12000, basis: 'Elevation', days: '3-4', revisions: '2 Rounds' },
      { id: 'render_360', name: '360° Render Package', scope: 'All sides, drone', basePrice: 15000, perUnitRateLow: 5, perUnitRateHigh: 8, minPrice: 12000, maxPrice: 30000, basis: 'Elevation', days: '7-10', revisions: '3 Rounds' },
      { id: 'render_var', name: 'Render Variations (3)', scope: 'Styles', basePrice: 7000, perUnitRateLow: 3, perUnitRateHigh: 5, minPrice: 7000, maxPrice: 15000, basis: 'Elevation', days: '5-7', revisions: '2 Rounds' },
      { id: 'render_int', name: 'Interior Render', scope: 'Furnished room', basePrice: 4000, perUnitRateLow: 2, perUnitRateHigh: 3, minPrice: 4000, maxPrice: 10000, basis: 'Plan', days: '3-5', revisions: '1 Round' },
    ]
  },
  {
    id: 'video_anim',
    name: 'Videos & Animations',
    services: [
      { id: 'video_reel', name: 'Reel Cut', scope: '15-30 sec', basePrice: 8000, perUnitRateLow: 530, perUnitRateHigh: 530, minPrice: 8000, maxPrice: 12000, basis: 'Second', days: '5-7', revisions: '1 Round' },
      { id: 'video_studio', name: 'Studio Walk', scope: '45-60 sec', basePrice: 15000, perUnitRateLow: 250, perUnitRateHigh: 250, minPrice: 12000, maxPrice: 22000, basis: 'Second', days: '7-10', revisions: '1 Round' },
      { id: 'video_cinema', name: 'Cinematic Tour', scope: '90-120 sec', basePrice: 25000, perUnitRateLow: 210, perUnitRateHigh: 210, minPrice: 20000, maxPrice: 35000, basis: 'Second', days: '10-14', revisions: '2 Rounds' },
      { id: 'video_full', name: 'Full Property Tour', scope: '3-4 min', basePrice: 40000, perUnitRateLow: 170, perUnitRateHigh: 170, minPrice: 35000, maxPrice: 60000, basis: 'Second', days: '14-21', revisions: '2 Rounds' },
      { id: 'video_int', name: 'Interior Flythrough', scope: '60-90 sec', basePrice: 20000, perUnitRateLow: 250, perUnitRateHigh: 250, minPrice: 18000, maxPrice: 30000, basis: 'Second', days: '10-14', revisions: '1 Round' },
    ]
  },
  {
    id: 'site_services',
    name: 'Site Services & Consultations',
    services: [
      { id: 'site_survey', name: 'Site Survey', scope: 'Boundary, levels', basePrice: 3000, perUnitRateLow: 0, perUnitRateHigh: 0, minPrice: 2500, maxPrice: 5000, basis: 'Flat', days: '1', revisions: 'N/A' },
      { id: 'site_doc', name: 'Site Documentation', scope: 'Photos, ref', basePrice: 2000, perUnitRateLow: 0, perUnitRateHigh: 0, minPrice: 1500, maxPrice: 3500, basis: 'Flat', days: '1', revisions: 'N/A' },
      { id: 'site_audit', name: 'Complete Site Audit', scope: 'Measure + photos + analysis', basePrice: 6000, perUnitRateLow: 0, perUnitRateHigh: 0, minPrice: 5000, maxPrice: 10000, basis: 'Flat', days: '1', revisions: 'N/A' },
      { id: 'consult_30', name: 'Design Consultation 30m', scope: 'Feasibility', basePrice: 1500, perUnitRateLow: 0, perUnitRateHigh: 0, minPrice: 1500, maxPrice: 1500, basis: 'Flat', days: 'N/A', revisions: 'N/A' },
      { id: 'consult_60', name: 'Design Consultation 1hr', scope: 'Strategy', basePrice: 2500, perUnitRateLow: 0, perUnitRateHigh: 0, minPrice: 2500, maxPrice: 2500, basis: 'Flat', days: 'N/A', revisions: 'N/A' },
      { id: 'design_review', name: 'Design Review', scope: 'Critique', basePrice: 3000, perUnitRateLow: 0, perUnitRateHigh: 0, minPrice: 3000, maxPrice: 3000, basis: 'Flat', days: 'N/A', revisions: 'N/A' },
      { id: 'unlimited_rev', name: 'Unlimited Revisions', scope: '7 days', basePrice: 8000, perUnitRateLow: 0, perUnitRateHigh: 0, minPrice: 6000, maxPrice: 12000, basis: 'Flat', days: '7', revisions: 'Unlimited' },
    ]
  }
];

export const calculateServicePrice = (service: PricingService, sqftPlan: number, sqftElevation: number, seconds: number, complexityMultiplier: number) => {
  let paramValue = 0;
  if (service.basis === 'Plan') paramValue = sqftPlan;
  if (service.basis === 'Elevation') paramValue = sqftElevation;
  if (service.basis === 'Second') paramValue = seconds;

  if (service.basis === 'Flat') {
    return {
      low: Math.min(Math.max(service.basePrice * complexityMultiplier, service.minPrice), service.maxPrice),
      high: Math.min(Math.max(service.basePrice * complexityMultiplier, service.minPrice), service.maxPrice)
    };
  }

  // Calculate bound limits based on Per Unit rates
  const calcLow = paramValue * service.perUnitRateLow * complexityMultiplier;
  const calcHigh = paramValue * service.perUnitRateHigh * complexityMultiplier;

  // Use basePrice as the baseline if calculated is too low, but bound by absolute min/max
  const finalLow = Math.min(Math.max(calcLow, service.minPrice, service.basePrice), service.maxPrice);
  const finalHigh = Math.min(Math.max(calcHigh, service.minPrice, service.basePrice), service.maxPrice);

  return { low: finalLow, high: finalHigh };
};
