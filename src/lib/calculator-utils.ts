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

export const calculateRCCSlab = (lengthFt: number, widthFt: number, thicknessInches: number, ratio: [number, number, number] = [1, 1.5, 3]) => {
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
  const steelKg = wetVolumeCUM * 0.01 * 7850;

  return { wetVolumeCFT, wetVolumeCUM, cementBags, sandCFT, aggCFT, steelKg };
};

export const calculateBrickwork = (lengthFt: number, heightFt: number, thicknessInches: number) => {
  const volumeCFT = lengthFt * heightFt * (thicknessInches / 12);
  const volumeCUM = volumeCFT / 35.3147;
  const noOfBricks = Math.ceil(volumeCUM * 500);
  const mortarVolumeCUM = volumeCUM * 0.25;
  const dryMortarCUM = mortarVolumeCUM * 1.33; 
  
  const cementCUM = (1 / 7) * dryMortarCUM;
  const cementBags = cementCUM / 0.034722;
  const sandCUM = (6 / 7) * dryMortarCUM;
  const sandCFT = sandCUM * 35.3147;
  
  return { volumeCFT, volumeCUM, noOfBricks, cementBags, sandCFT };
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
