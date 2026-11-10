export interface CanonPillarStatutory {
  codeClause: string; // e.g. "NBC 2026, Vol. 1, Part 3, Clause 12.2"
  sourceBook: string; // "National Building Code of India 2026 / SP 7: 2026"
  mandatoryRule: string;
  hyderabadStatutoryRule: string; // GHMC G.O. 168 / TG-bPASS
  parameters: {
    label: string;
    value: string;
    legalStatus: 'mandatory_minimum' | 'permissible_relaxation' | 'strict_prohibition';
  }[];
}

export interface CanonPillarErgonomics {
  sourceBook: string; // "Neufert Architects' Data (4th Ed.) & Time-Saver Standards"
  ergonomicRationale: string;
  keyDimensions: {
    label: string;
    dimension: string;
    clearanceStandard: string;
  }[];
}

export interface CanonPillarSpatialTheory {
  sourceBook: string; // "Francis D.K. Ching: Architecture - Form, Space, and Order"
  coreConcept: string; // Axis, Datum, Rhythm, Hierarchy, Volumetric Enclosure
  architecturalPrinciple: string;
  proportionRatio: string;
}

export interface CanonPillarVastuTreatise {
  treatiseName: string; // "Mayamata", "Manasara", "Samarāṅgaṇa Sūtradhāra", "Brihat Samhita"
  chapterVerseCitation: string; // e.g. "Mayamata Vol. 1, Ch. 26, Verses 12-15"
  classicalSanskritConcept: string; // e.g. "Nairutya (South-West) Sthira Pada"
  bioclimaticAndSolarRationale: string; // Demystified scientific & climatic explanation
  openInterpretationNote: string;
}

export interface CanonPillarAgnaaBenchmark {
  principalArchitect: string; // "Ar. Sridhar (SPA Delhi Alumnus)"
  firmStandard: string;
  volumetricElevation: string;
  hyderabadMicroclimateExecution: string;
  materialTectonics: string;
}

export interface CanonSocialCarousel {
  hookTitle: string;
  slides: {
    slideNumber: number;
    badge: string; // e.g. "SLIDE 1: THE TRAP", "SLIDE 2: NBC MANDATE"
    heading: string;
    bulletPoints: string[];
    visualGraphicPrompt: string; // Direction for carousel graphic designer
  }[];
  caption: string;
  hashtags: string[];
}

export interface CanonCinematicReel {
  reelTitle: string;
  durationSeconds: number; // typically 45s
  rvcVoicePersona: string; // "Ar. Sridhar - Calm, Authoritative, Architectural Tone"
  scriptSceneByScene: {
    timestamp: string; // "00:00 - 00:08"
    visualAction: string; // Camera pan, render movement, dimension overlay
    rvcVoiceoverLine: string; // The exact text to read into RVC
    onScreenText: string;
  }[];
}

export interface CanonLayaRule {
  intentChoiceCategory: string; // e.g. "residential_habitable_volume"
  decisionChecks: {
    question: string;
    expectedBoolean: boolean;
    failingRemedy: string;
  }[];
  relevanceKeywords: string[];
}

export interface AgnaaMasterCanonEntry {
  id: string; // e.g. "AGNAA-CANON-01"
  slug: string; // "master-suite-habitable-volume-nbc-ching-vastu"
  title: string;
  subtitle: string;
  discipline: 'spatial_planning' | 'vertical_circulation' | 'fire_life_safety' | 'services_hydraulics' | 'zoning_climate';
  plate_code?: string; // e.g. "PLATE 03-01"
  
  // 5 Pillars of Truth
  statutory: CanonPillarStatutory;
  ergonomics: CanonPillarErgonomics;
  spatialTheory: CanonPillarSpatialTheory;
  classicalVastu: CanonPillarVastuTreatise;
  agnaaBenchmark: CanonPillarAgnaaBenchmark;

  // Media & Omnichannel Branding (Optional for data portability)
  socialCarousel?: CanonSocialCarousel;
  cinematicReel?: CanonCinematicReel;
  vectorPlateSpec?: {
    plateId: string;
    diagramTitle: string;
    keyAnnotations: string[];
  };

  // AI Inference Contract (Laya + Qwen)
  layaRule?: CanonLayaRule;
  layaRules?: any;
}
