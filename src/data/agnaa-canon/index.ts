export * from './types';
export * from './master-canon';

import { AGNAA_MASTER_CANON } from './master-canon';
import { AgnaaMasterCanonEntry } from './types';

// Fast lookup by ID
export const getCanonEntryById = (id: string): AgnaaMasterCanonEntry | undefined => {
  return AGNAA_MASTER_CANON.find((entry) => entry.id === id);
};

// Fast lookup by slug
export const getCanonEntryBySlug = (slug: string): AgnaaMasterCanonEntry | undefined => {
  return AGNAA_MASTER_CANON.find((entry) => entry.slug === slug);
};

// Filter by discipline
export const getCanonEntriesByDiscipline = (discipline: AgnaaMasterCanonEntry['discipline']): AgnaaMasterCanonEntry[] => {
  return AGNAA_MASTER_CANON.filter((entry) => entry.discipline === discipline);
};

// Search helper
export const searchCanonEntries = (query: string): AgnaaMasterCanonEntry[] => {
  const q = query.toLowerCase().trim();
  if (!q) return AGNAA_MASTER_CANON;

  return AGNAA_MASTER_CANON.filter((entry) => {
    return (
      entry.title.toLowerCase().includes(q) ||
      entry.subtitle.toLowerCase().includes(q) ||
      (entry.statutory?.codeClause?.toLowerCase().includes(q) ?? false) ||
      (entry.classicalVastu?.treatiseName?.toLowerCase().includes(q) ?? false) ||
      (entry.layaRule?.relevanceKeywords?.some((k) => k.toLowerCase().includes(q)) ?? false)
    );
  });
};
