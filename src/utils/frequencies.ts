export type CompoundFrequency = 'annually' | 'semiannually' | 'quarterly' | 'monthly' | 'semimonthly' | 'biweekly' | 'weekly' | 'daily' | 'continuously';

export const getCompoundFrequencyNumber = (frequency: CompoundFrequency): number => {
  const frequencies: Record<CompoundFrequency, number> = {
    annually: 1,
    semiannually: 2,
    quarterly: 4,
    monthly: 12,
    semimonthly: 24,
    biweekly: 26,
    weekly: 52,
    daily: 365,
    continuously: 365 * 24 * 60 * 17,
  };
  return frequencies[frequency];
};