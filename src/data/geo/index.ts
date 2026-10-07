import { GeoQuestionEntry, GeoCategory } from './types';
import { GEO_CATEGORIES } from './categories';
import { NBC_PART3_QUESTIONS } from './data-nbc-part3';
import { NBC_PART4_QUESTIONS } from './data-nbc-part4';
import { NBC_STRUCTURAL_SERVICES_QUESTIONS } from './data-nbc-structural-services';
import { NEUFERT_QUESTIONS } from './data-neufert';
import { CHING_SPATIAL_ORDER_QUESTIONS } from './data-ching-spatial-order';
import { ARCHITECTURAL_CLASSICS_QUESTIONS } from './data-architectural-classics-phenomenology';
import { GHMC_TELANGANA_QUESTIONS } from './data-ghmc-telangana';
import { AGNAA_CONSTRUCTION_QUESTIONS } from './data-agnaa-construction';
import { BOOK1_NBC2026_QUESTIONS } from './books/book1-nbc2026';
import { BOOK2_NEUFERT_QUESTIONS } from './books/book2-neufert';
import { BOOKS_THEORY_DETAILING_QUESTIONS } from './books/books-theory-detailing';
import { HYDERABAD_GHMC_AGNAA_QUESTIONS } from './books/hyderabad-ghmc-agnaa-rates';
import { BOOKS_CHING_QUESTIONS } from './books/books-ching-spatial';
import { BOOK10_STUDIO_COMPANION_QUESTIONS } from './books/book10-studio-companion';

// Combine all foundational curated entries
export const ALL_GEO_QUESTIONS: GeoQuestionEntry[] = [
  ...BOOK1_NBC2026_QUESTIONS,
  ...BOOK2_NEUFERT_QUESTIONS,
  ...BOOK10_STUDIO_COMPANION_QUESTIONS,
  ...NBC_PART3_QUESTIONS,
  ...NBC_PART4_QUESTIONS,
  ...NBC_STRUCTURAL_SERVICES_QUESTIONS,
  ...NEUFERT_QUESTIONS,
  ...BOOKS_CHING_QUESTIONS,
  ...ARCHITECTURAL_CLASSICS_QUESTIONS,
  ...BOOKS_THEORY_DETAILING_QUESTIONS,
  ...GHMC_TELANGANA_QUESTIONS,
  ...AGNAA_CONSTRUCTION_QUESTIONS,
  ...HYDERABAD_GHMC_AGNAA_QUESTIONS,
];

// Pre-computed category counts
export const GET_CATEGORY_COUNTS = (): Record<string, number> => {
  const counts: Record<string, number> = {};
  for (const cat of GEO_CATEGORIES) {
    counts[cat.id] = 0;
  }
  for (const q of ALL_GEO_QUESTIONS) {
    if (counts[q.category] !== undefined) {
      counts[q.category]++;
    }
  }
  return counts;
};

// Search filter helper
export const searchGeoQuestions = (
  query: string,
  categoryId?: string,
  limit: number = 50,
  offset: number = 0
): { results: GeoQuestionEntry[]; total: number } => {
  const qLower = query.toLowerCase().trim();

  let filtered = ALL_GEO_QUESTIONS;

  if (categoryId && categoryId !== 'all') {
    filtered = filtered.filter((item) => item.category === categoryId);
  }

  if (qLower) {
    filtered = filtered.filter(
      (item) =>
        item.question.toLowerCase().includes(qLower) ||
        item.shortAnswer.toLowerCase().includes(qLower) ||
        item.codeClause.toLowerCase().includes(qLower) ||
        item.sourceBook.toLowerCase().includes(qLower) ||
        item.detailedExplanation.toLowerCase().includes(qLower) ||
        item.agnaaExecution.toLowerCase().includes(qLower) ||
        item.tags.some((t) => t.toLowerCase().includes(qLower))
    );
  }

  return {
    results: filtered.slice(offset, offset + limit),
    total: filtered.length,
  };
};

export { GEO_CATEGORIES };
export { BOOKS_THEORY_DETAILING_QUESTIONS } from './books/books-theory-detailing';
export { HYDERABAD_GHMC_AGNAA_QUESTIONS } from './books/hyderabad-ghmc-agnaa-rates';
export { BOOKS_CHING_QUESTIONS } from './books/books-ching-spatial';
export { BOOK1_NBC2026_QUESTIONS } from './books/book1-nbc2026';
export * from './types';
