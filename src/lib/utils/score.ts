/**
 * Sridhar-Score™ Calculation Utility
 * Computes a reliability score (0-100) based on weighted business factors.
 */

export interface ScoreFactors {
  paymentPromptness: number; // 0-1 (normalized)
  engagementRate: number;    // 0-1
  responseLatency: number;   // 0-1
  loyaltyFactor: number;     // 0-1
}

const DEFAULT_WEIGHTS = {
  payment: 0.40,
  engagement: 0.25,
  latency: 0.20,
  loyalty: 0.15
};

export function calculateSridharScore(factors: ScoreFactors, weights = DEFAULT_WEIGHTS): number {
  const score = (
    (factors.paymentPromptness * weights.payment) +
    (factors.engagementRate * weights.engagement) +
    (factors.responseLatency * weights.latency) +
    (factors.loyaltyFactor * weights.loyalty)
  ) * 100;

  return Math.min(100, Math.max(0, parseFloat(score.toFixed(1))));
}

export function getScoreCategory(score: number): 'Elite' | 'Premium' | 'Standard' | 'At Risk' {
  if (score >= 90) return 'Elite';
  if (score >= 75) return 'Premium';
  if (score >= 50) return 'Standard';
  return 'At Risk';
}
