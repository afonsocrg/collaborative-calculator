import { CalculatorInputs, CalculationResult, TimelineEntry, CompoundFrequency} from '../types/calculator';
import { getCompoundFrequencyNumber } from './frequencies';

const MONTHS_PER_YEAR = 12;

const getMonthlyRate = (
  annualRate: number,
  compoundFrequency: CompoundFrequency
): number =>  {
  const frequencyNumber = getCompoundFrequencyNumber(compoundFrequency);
  const periodRate = annualRate / frequencyNumber;
  const nMonthsPerPeriod = 12 / frequencyNumber;
  const monthlyRate = Math.pow(1 + periodRate, 1/nMonthsPerPeriod) - 1
  return monthlyRate;
}

const calculateMonthlyInterest = (balance: number, monthlyRate: number): number => {
  return balance * monthlyRate;
};

const getMonthlyContribution = (
  month: number,
  contributionFrequency: 'month' | 'year',
  additionalContribution: number
): number => {
  if (contributionFrequency === 'month') {
    return additionalContribution;
  }
  // For yearly contributions, only add in the first month of each year
  return month % MONTHS_PER_YEAR === 0 ? additionalContribution : 0;
};

export const calculateInvestment = (inputs: CalculatorInputs): CalculationResult => {
  const startDate = inputs.startDate || new Date();

  const annualRate = inputs.returnRate / 100;
  const monthlyRate = getMonthlyRate(annualRate, inputs.compoundFrequency)

  
  let balance = inputs.startingAmount;
  const timeline: TimelineEntry[] = [];
  let totalContributions = 0;
  
  const totalMonths = inputs.years * MONTHS_PER_YEAR;
  
  for (let month = 1; month <= totalMonths; month++) {
    const contribution = getMonthlyContribution(month, inputs.contributionFrequency, inputs.additionalContribution);
    
    if (inputs.contributionTiming === 'beginning') {
      balance += contribution;
    }
    
    const interest = calculateMonthlyInterest(balance, monthlyRate);
    
    if (inputs.contributionTiming === 'end') {
      balance += contribution;
    }
    
    balance += interest;
    totalContributions += contribution;
    
    timeline.push({
      period: month,
      deposit: contribution + (month === 1 ? inputs.startingAmount : 0),
      interest,
      endingBalance: balance,
      date: new Date(startDate.getFullYear(), startDate.getMonth() + month - 1)
    });
  }
  
  return {
    endBalance: balance,
    startingAmount: inputs.startingAmount,
    totalContributions,
    totalInterest: balance - totalContributions - inputs.startingAmount,
    timeline
  };
};