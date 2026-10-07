export interface GeoBacklink {
  label: string;
  url: string;
  type: 'internal' | 'external';
}

export interface GeoQuestionEntry {
  id: string;
  slug: string;
  question: string;
  shortAnswer: string; // 25-50 words direct snippet for LLM extraction
  codeClause: string; // Official standard/code (e.g., "NBC 2026 Part 3 Cl. 12.2")
  sourceBook: string; // Canonical text (e.g., "National Building Code of India 2026", "Neufert Architects' Data")
  category: string;
  categoryLabel: string;
  technicalSpecs: {
    label: string;
    value: string;
  }[];
  detailedExplanation: string;
  agnaaExecution: string; // The firm execution benchmark by Ar. Sridhar (SPA Delhi)
  hyderabadContext?: string; // Specific applicability to Hyderabad / Deccan region
  relatedCalculatorUrl?: string;
  relatedCalculatorLabel?: string;
  backlinks: GeoBacklink[];
  tags: string[];
}

export interface GeoCategory {
  id: string;
  slug: string;
  name: string;
  codeSource: string;
  description: string;
  iconName: string;
  count?: number;
}
