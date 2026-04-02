// Formulas and configurations for various Agnaa Construction Calculators

// CALCULATOR 2: Plot Area Calculator
// Often plots are irregular. A simple way for a 4-sided plot is using the irregular quadrilateral area formula (Bretschneider's or Brahmagupta's if cyclic), or simply splitting into two triangles. 
// For simplicity and common use, users enter 4 sides and a diagonal, or we just calculate area for rectangular/square plots.
// Let's support a simple Rectangular/Square Plot and an Irregular Plot (4 sides + 1 diagonal).

export const calculatePlotAreaRectangular = (length: number, width: number) => {
  const sqft = length * width;
  const sqyards = sqft / 9;
  const sqm = sqft * 0.092903;
  const acres = sqft / 43560;
  const guntas = sqft / 1089;

  return { sqft, sqyards, sqm, acres, guntas };
};

export const calculatePlotAreaIrregular = (a: number, b: number, c: number, d: number, diagonal: number) => {
  // Split into two triangles: Triangle 1 (a, b, diagonal) and Triangle 2 (c, d, diagonal)
  // Using Heron's formula
  const s1 = (a + b + diagonal) / 2;
  const area1 = Math.sqrt(Math.max(0, s1 * (s1 - a) * (s1 - b) * (s1 - diagonal)));

  const s2 = (c + d + diagonal) / 2;
  const area2 = Math.sqrt(Math.max(0, s2 * (s2 - c) * (s2 - d) * (s2 - diagonal)));

  const sqft = area1 + area2;
  const sqyards = sqft / 9;
  const sqm = sqft * 0.092903;
  const acres = sqft / 43560;
  const guntas = sqft / 1089;

  return { sqft, sqyards, sqm, acres, guntas };
};

// CALCULATOR 4: FAR / FSI Calculator
export const calculateFSI = (plotArea: number, totalBuiltUpArea: number) => {
  const fsi = totalBuiltUpArea / plotArea;
  return { fsi };
};

export const calculateMaxBuiltUpArea = (plotArea: number, fsi: number) => {
  const maxBuiltUpArea = plotArea * fsi;
  return { maxBuiltUpArea };
};

// CALCULATOR 3: Carpet / Built-up / Super Built-up Area
export const calculateBuiltUpAreas = (carpetArea: number) => {
  const builtUpArea = carpetArea * 1.125; // + ~12.5% for walls
  const superBuiltUpArea = builtUpArea * 1.25; // + ~25% for common areas
  return { carpetArea, builtUpArea, superBuiltUpArea };
};

export const calculateRCCSlab = (lengthFt: number, widthFt: number, thicknessInches: number, preset: 'economy' | 'safe' | 'strong' = 'safe', ratio: [number, number, number] = [1, 1.5, 3]) => {
  const wetVolumeCFT = lengthFt * widthFt * (thicknessInches / 12);
  const wetVolumeCUM = wetVolumeCFT / 35.3147;
  const dryVolumeCUM = wetVolumeCUM * 1.54;
  const totalRatio = ratio[0] + ratio[1] + ratio[2];
  
  const cementCUM = (ratio[0] / totalRatio) * dryVolumeCUM;
  const cementBags = cementCUM / 0.034722;
  const sandCUM = (ratio[1] / totalRatio) * dryVolumeCUM;
  const sandCFT = sandCUM * 35.3147;
  const aggCUM = (ratio[2] / totalRatio) * dryVolumeCUM;
  const aggCFT = aggCUM * 35.3147;

  // Preset based steel calculation (percentage of concrete volume)
  // Economy: 0.7%, Safe: 1.0%, Strong: 1.5%
  const steelPct = preset === 'economy' ? 0.007 : preset === 'strong' ? 0.015 : 0.01;
  const steelKg = wetVolumeCUM * steelPct * 7850;

  return { wetVolumeCFT, wetVolumeCUM, cementBags, sandCFT, aggCFT, steelKg, steelPct };
};

export const calculateBrickwork = (lengthFt: number, heightFt: number, thicknessInches: number, preset: 'economy' | 'safe' | 'strong' = 'safe') => {
  const volumeCFT = lengthFt * heightFt * (thicknessInches / 12);
  const volumeCUM = volumeCFT / 35.3147;
  
  // Adjust wastage and mortar based on preset
  const wastage = preset === 'economy' ? 1.05 : preset === 'strong' ? 1.15 : 1.10;
  const mortarRatio = preset === 'economy' ? [1, 6] : preset === 'strong' ? [1, 4] : [1, 5];
  
  const noOfBricks = Math.ceil(volumeCUM * 500 * wastage);
  const mortarVolumeCUM = volumeCUM * 0.25; 
  const dryMortarCUM = mortarVolumeCUM * 1.33; 
  
  const totalRatio = mortarRatio[0] + mortarRatio[1];
  const cementCUM = (mortarRatio[0] / totalRatio) * dryMortarCUM;
  const cementBags = cementCUM / 0.034722;
  const sandCUM = (mortarRatio[1] / totalRatio) * dryMortarCUM;
  const sandCFT = sandCUM * 35.3147;
  
  return { volumeCFT, volumeCUM, noOfBricks, cementBags, sandCFT, wastage, mortarRatioString: `1:${mortarRatio[1]}` };
};

export const calculatePlaster = (areaSqft: number, thicknessMm: number, ratio: [number, number] = [1, 4]) => {
  const areaSqm = areaSqft * 0.092903;
  const wetVolumeCUM = areaSqm * (thicknessMm / 1000);
  const dryVolumeCUM = wetVolumeCUM * 1.3 * 1.33;
  
  const totalRatio = ratio[0] + ratio[1];
  const cementBags = ((ratio[0] / totalRatio) * dryVolumeCUM) / 0.034722;
  const sandCFT = ((ratio[1] / totalRatio) * dryVolumeCUM) * 35.3147;
  
  return { wetVolumeCUM, cementBags, sandCFT };
};

export const calculatePaint = (carpetAreaSqft: number) => {
  const paintAreaSqft = carpetAreaSqft * 3.5;
  const paintLiters = paintAreaSqft / 80;
  const puttyKg = paintAreaSqft / 15;
  const primerLiters = paintAreaSqft / 120;
  
  return { paintAreaSqft, paintLiters, puttyKg, primerLiters };
};

export const calculateTiles = (areaSqft: number, tileSizeSqft: number) => {
  const tilesArea = areaSqft * 1.05; // 5% wastage
  const noOfTiles = Math.ceil(tilesArea / tileSizeSqft);
  return { tilesArea, noOfTiles };
};

export const calculateWaterTank = (lengthFt: number, widthFt: number, depthFt: number) => {
  const volumeCFT = lengthFt * widthFt * depthFt;
  const capacityLiters = volumeCFT * 28.3168;
  return { volumeCFT, capacityLiters };
};

// --- PHASE 2 CALCULATORS BATCH 1 ---

export const calculateGNFloorArea = (plotArea: number, fsiAllowed: number, floorsPlanned: number, maxFloorPlateArea?: number) => {
  const totalBuildableArea = plotArea * fsiAllowed;
  const maxPlate = maxFloorPlateArea && maxFloorPlateArea > 0 ? maxFloorPlateArea : totalBuildableArea;
  
  const perFloorArea = Math.min(totalBuildableArea / floorsPlanned, maxPlate);
  const totalFloorsPossible = totalBuildableArea / maxPlate;
  
  return { totalBuildableArea, perFloorArea, totalFloorsPossible };
};

export const calculateSetbackEnvelope = (plotLength: number, plotWidth: number, front: number, rear: number, left: number, right: number) => {
  const buildableLength = plotLength - front - rear;
  const buildableWidth = plotWidth - left - right;
  
  if (buildableLength <= 0 || buildableWidth <= 0) {
    return { buildableLength: 0, buildableWidth: 0, buildableArea: 0, error: "Setbacks exceed plot dimensions." };
  }
  
  const buildableArea = buildableLength * buildableWidth;
  return { buildableLength, buildableWidth, buildableArea, error: null };
};

export const calculateBuiltUpEfficiency = (carpetArea: number, builtUpArea: number, superBuiltUpArea?: number) => {
  const carpetToBuiltUpPercent = (carpetArea / builtUpArea) * 100;
  let carpetToSuperPercent = 0;
  let loadingFactor = 0;
  
  if (superBuiltUpArea && superBuiltUpArea > 0) {
    carpetToSuperPercent = (carpetArea / superBuiltUpArea) * 100;
    loadingFactor = (superBuiltUpArea / carpetArea) - 1;
  }
  
  return { carpetToBuiltUpPercent, carpetToSuperPercent, loadingFactor };
};

export const calculateAdvancedFlooring = (roomLength: number, roomWidth: number, unitLength: number, unitWidth: number, pattern: 'straight' | 'diagonal', ratePerUnitArea: number) => {
  const floorArea = roomLength * roomWidth;
  const unitArea = unitLength * unitWidth;
  
  // Guard against division by zero
  if (unitArea <= 0) return { floorArea, piecesBase: 0, piecesWithWastage: 0, totalMaterialArea: 0, materialCost: 0, wastageFactor: 0 };
  
  const piecesBase = floorArea / unitArea;
  
  const wastageFactor = pattern === 'straight' ? 0.05 : 0.12;
  const piecesWithWastage = Math.ceil(piecesBase * (1 + wastageFactor));
  const totalMaterialArea = piecesWithWastage * unitArea;
  const materialCost = totalMaterialArea * ratePerUnitArea;
  
  return { floorArea, piecesBase, piecesWithWastage, totalMaterialArea, materialCost, wastageFactor };
};

// --- PHASE 2 CALCULATORS BATCH 2 ---

export const calculatePCC = (length: number, width: number, thickness: number, cmt: number, snd: number, agg: number) => {
  const wetVolume = length * width * thickness;
  const dryFactor = 1.54;
  const dryVolume = wetVolume * dryFactor;
  
  const totalParts = cmt + snd + agg;
  const cementVolume = dryVolume * (cmt / totalParts);
  const sandVolume = dryVolume * (snd / totalParts);
  const aggregateVolume = dryVolume * (agg / totalParts);
  
  const cementBags = cementVolume / 0.035;
  return { wetVolume, dryVolume, cementBags, sandVolume, aggregateVolume };
};

export const calculateExcavation = (length: number, width: number, depth: number, bulkingFactor: number) => {
  const volumeInSitu = length * width * depth;
  const looseVolume = volumeInSitu * bulkingFactor;
  return { volumeInSitu, looseVolume };
};

export const calculateFoundationFooting = (length: number, width: number, depth: number, count: number) => {
  const singleVolume = length * width * depth;
  const totalVolume = singleVolume * count;
  return { singleVolume, totalVolume };
};

export const calculateSteelRebar = (areaSqft: number, type: 'slab' | 'beam' | 'column' | 'footing') => {
  let thumbRuleKgSqft = 0;
  switch (type) {
    case 'slab': thumbRuleKgSqft = 4.0; break;
    case 'beam': thumbRuleKgSqft = 5.0; break;
    case 'column': thumbRuleKgSqft = 6.5; break;
    case 'footing': thumbRuleKgSqft = 3.0; break;
  }
  const steelWeight = areaSqft * thumbRuleKgSqft;
  const steelTons = steelWeight / 1000;
  return { thumbRuleKgSqft, steelWeight, steelTons };
};

export const calculateStaircase = (floorHeight: number, maxRiser: number, treadDepth: number) => {
  const risersApprox = floorHeight / maxRiser;
  const numberOfRisers = Math.round(risersApprox);
  const actualRiserHeight = floorHeight / numberOfRisers;
  const numberOfTreads = numberOfRisers - 1;
  const totalGoing = numberOfTreads * treadDepth;
  const comfortValue = (2 * actualRiserHeight) + treadDepth;
  
  return { 
    numberOfRisers, 
    actualRiserHeight, 
    numberOfTreads, 
    totalGoing, 
    comfortValue 
  };
};

// --- PHASE 2 CALCULATORS BATCH 3 ---

export const calculateSepticTank = (users: number, desludgingYears: number = 2) => {
  const settlingVolume = users * 130; 
  const sludgeVolume = users * 30 * desludgingYears; 
  const scumVolume = users * 10;
  
  const totalVolumeLiters = settlingVolume + sludgeVolume + scumVolume;
  const totalVolumeCUM = totalVolumeLiters / 1000;
  
  const depthM = 1.5;
  const widthM = Math.sqrt(totalVolumeCUM / (2 * depthM));
  const lengthM = widthM * 2;
  
  return { totalVolumeLiters, totalVolumeCUM, recommendedLength: lengthM, recommendedWidth: widthM, recommendedDepth: depthM };
};

export const calculateCompoundWall = (lengthM: number, heightM: number, thickness: 150 | 230) => {
  const wallAreaSQM = lengthM * heightM;
  const volCUM = wallAreaSQM * (thickness / 1000);
  const noOfBricks = volCUM * 500;
  
  const plasterAreaSQM = wallAreaSQM * 2;
  const concreteVolCUM = lengthM * 0.3 * 0.2; 
  
  return { wallAreaSQM, noOfBricks, plasterAreaSQM, concreteVolCUM };
};

export const calculateElectrical = (carpetAreaSQFT: number, roomsCount: number) => {
  const lightPoints = Math.ceil(carpetAreaSQFT / 50);
  const fanPoints = roomsCount;
  const switchPoints = lightPoints + fanPoints + (roomsCount * 2);
  const totalLoadKW = Math.max((carpetAreaSQFT * 3) / 1000, 2); 
  
  return { lightPoints, fanPoints, switchPoints, totalLoadKW };
};

export const calculateRoofing = (roofAreaSQFT: number, isPitched: boolean, pitchDegrees: number = 0) => {
  let actualArea = roofAreaSQFT;
  if (isPitched && pitchDegrees > 0) {
    const pitchRad = pitchDegrees * (Math.PI / 180);
    actualArea = roofAreaSQFT / Math.cos(pitchRad);
  }
  
  const noOfSheets = Math.ceil(actualArea / 30);
  const ridgeLengthFT = Math.sqrt(actualArea) * 1.5; 
  
  return { actualArea, noOfSheets, ridgeLengthFT };
};

export const calculateInteriorCost = (carpetAreaSQFT: number, tier: 'budget' | 'medium' | 'premium') => {
  let rate = 0;
  switch (tier) {
    case 'budget': rate = 800; break;
    case 'medium': rate = 1500; break;
    case 'premium': rate = 2500; break;
  }
  const totalCost = carpetAreaSQFT * rate;
  
  const woodwork = totalCost * 0.40;
  const painting = totalCost * 0.15;
  const flooring = totalCost * 0.20;
  const electrical = totalCost * 0.10;
  const miscellaneous = totalCost * 0.15;
  
  return { totalCost, woodwork, painting, flooring, electrical, miscellaneous };
};

// --- PHASE 3 CALCULATORS BATCH 1 ---

export const calculateAACBlocks = (lengthM: number, heightM: number, thicknessM: number) => {
  const wallVol = lengthM * heightM * thicknessM;
  const blockVol = 0.6 * 0.2 * thicknessM;
  
  const blocksCount = Math.ceil(wallVol / blockVol);
  const mortarVol = wallVol * 0.05;
  const mortarBags = Math.ceil((mortarVol * 1800) / 40);

  return { wallVolCUM: wallVol, blocksCount, mortarBags };
};

export const calculateAntiTermite = (lengthExt: number, widthExt: number, perimeter: number) => {
  const planAreaSQM = lengthExt * widthExt;
  const totalChemicalLiters = (planAreaSQM * 5) + (perimeter * 5);
  
  return { planAreaSQM, totalChemicalLiters };
};

export const calculateShuttering = (concreteVolCUM: number, elementType: 'slab' | 'beam' | 'column' | 'footing') => {
  let factor = 0;
  switch (elementType) {
    case 'slab': factor = 8.0; break;
    case 'beam': factor = 10.0; break;
    case 'column': factor = 12.0; break;
    case 'footing': factor = 4.0; break;
  }
  const shutteringAreaSQM = concreteVolCUM * factor;
  const plySheets = Math.ceil(shutteringAreaSQM / 2.97);
  
  return { shutteringAreaSQM, plySheets, factor };
};

export const calculateScaffolding = (lengthM: number, heightM: number) => {
  const scaffoldingAreaSQM = lengthM * heightM;
  const pipesRM = scaffoldingAreaSQM * 10; 
  
  return { scaffoldingAreaSQM, pipesRM };
};

export const calculateConcreteShapes = (shape: 'cylinder' | 'trapezoidal' | 'cone', dims: any) => {
  let volume = 0;
  if (shape === 'cylinder') { 
    volume = Math.PI * Math.pow(dims.r, 2) * dims.h;
  } else if (shape === 'cone') { 
    volume = (1/3) * Math.PI * Math.pow(dims.r, 2) * dims.h;
  } else if (shape === 'trapezoidal') { 
    volume = ((dims.a + dims.b) / 2) * dims.h * dims.l;
  }
  return { volume };
};

// --- PHASE 3 BATCH 2 ---

export const calculateFlooringPro = (areaSQM: number, matCost: number, labCost: number, wastagePct: number) => {
  const totalArea = areaSQM * (1 + (wastagePct / 100));
  const totalMat = totalArea * matCost;
  const totalLab = areaSQM * labCost; // labor usually on actual area laid
  return { totalArea, totalMat, totalLab, total: totalMat + totalLab };
};

export const calculatePaver = (lengthM: number, widthM: number, paverLM: number, paverWM: number) => {
  const area = lengthM * widthM;
  const paverArea = paverLM * paverWM;
  const count = Math.ceil(area / paverArea * 1.05); // 5% wastage
  const edgeLength = (lengthM + widthM) * 2;
  return { area, count, edgeLength };
};

export const calculateLandscaping = (areaSQM: number, soilDepthM: number) => {
  const soilVol = areaSQM * soilDepthM;
  const turfRolls = Math.ceil(areaSQM / 1.0); // assume 1 sqm per roll
  return { areaSQM, soilVol, turfRolls };
};

export const calculateHVAC = (areaSQM: number, heightM: number) => {
  const volume = areaSQM * heightM;
  // Thumb rule: 1 TR per ~14 CUM of volume roughly
  const tr = Math.max(1, volume / 14);
  return { volume, estimatedTonnage: Math.ceil(tr * 10) / 10 };
};

export const calculateLoad = (areaSQM: number, deadLoadKNM2: number, liveLoadKNM2: number) => {
  const totalDead = areaSQM * deadLoadKNM2;
  const totalLive = areaSQM * liveLoadKNM2;
  return { totalDead, totalLive, total: totalDead + totalLive };
};

// --- PHASE 3 BATCH 3 ---

export const calculateGreenRoof = (areaSQM: number, depthM: number, wetDensityKG: number) => {
  const volume = areaSQM * depthM;
  const weightKG = volume * wetDensityKG;
  return { volume, weightKG, weightPerSQM: weightKG / areaSQM };
};

export const calculatePool = (lengthM: number, widthM: number, avgDepthM: number) => {
  const volume = lengthM * widthM * avgDepthM;
  const liters = volume * 1000;
  // liner area = bottom + 2*long sides + 2*short sides
  const linerArea = (lengthM * widthM) + (2 * lengthM * avgDepthM) + (2 * widthM * avgDepthM);
  return { volume, liters, linerArea: linerArea * 1.1 }; // 10% wastage
};

export const calculateAdvancedRoofing = (planAreaSQM: number, pitchDeg: number, overhangM: number, perimeterM: number) => {
  const areaWithOverhang = planAreaSQM + (overhangM * perimeterM);
  const pitchRad = pitchDeg * (Math.PI / 180);
  const roofArea = pitchDeg ? areaWithOverhang / Math.cos(pitchRad) : areaWithOverhang;
  return { roofArea, flatArea: areaWithOverhang };
};

export const calculateInsulation = (areaSQM: number, rValue: number) => {
  const costPerR = 50; // generic metric
  return { areaSQM, estimatedCost: areaSQM * rValue * costPerR };
};

export const calculateMarkup = (material: number, labor: number, overheadPct: number, profitPct: number) => {
  const base = material + labor;
  const overhead = base * (overheadPct / 100);
  const profit = (base + overhead) * (profitPct / 100);
  return { base, overhead, profit, sellingPrice: base + overhead + profit };
};

// --- PHASE 3 BATCH 4 ---

export const calculateROI = (investment: number, rentMonthly: number, expensesYr: number) => {
  const netIncome = (rentMonthly * 12) - expensesYr;
  const roi = (netIncome / investment) * 100;
  const payback = roi > 0 ? 100 / roi : 0;
  return { netIncome, roi, paybackYears: payback };
};

export const convertUnits = (value: number, conversionFactor: number) => {
  return value * conversionFactor;
};

export const calculateMulch = (areaSQM: number, depthM: number) => {
  const volumeCUM = areaSQM * depthM;
  const bags50L = Math.ceil((volumeCUM * 1000) / 50);
  return { volumeCUM, bags50L };
};

export const calculateRamp = (riseM: number, slopeRatio: number) => {
  // slopeRatio = Run / Rise. e.g. 1:12 slope -> slopeRatio = 12
  const runM = riseM * slopeRatio;
  const lengthM = Math.sqrt((riseM * riseM) + (runM * runM));
  return { riseM, runM, lengthM };
};

export const calculateGeometry = (shape: 'rect'|'circle'|'triangle', a: number, b: number) => {
  if (shape === 'rect') return { area: a * b, perimeter: 2 * (a + b) };
  if (shape === 'circle') return { area: Math.PI * a * a, perimeter: 2 * Math.PI * a };
  if (shape === 'triangle') return { area: 0.5 * a * b, perimeter: a + b + Math.sqrt(a*a + b*b) }; // assuming right triangle for simplicity
  return { area: 0, perimeter: 0 };
};

