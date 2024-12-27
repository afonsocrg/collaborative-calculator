export type CompoundFrequency = 'annually' | 'semiannually' | 'quarterly' | 'monthly' | 'semimonthly' | 'biweekly' | 'weekly' | 'daily' | 'continuously';
export type ContributionTiming = 'beginning' | 'end';
export type ContributionFrequency = 'month' | 'year';

export interface CalculatorInputs {
  startingAmount: number;
  years: number;
  returnRate: number;
  compoundFrequency: CompoundFrequency;
  additionalContribution: number;
  contributionTiming: ContributionTiming;
  contributionFrequency: ContributionFrequency;
  startDate?: Date;
}

export interface TimelineEntry {
  period: number;
  deposit: number;
  interest: number;
  endingBalance: number;
  date: Date;
}

export interface CalculationResult {
  endBalance: number;
  startingAmount: number;
  totalContributions: number;
  totalInterest: number;
  timeline: TimelineEntry[];
}