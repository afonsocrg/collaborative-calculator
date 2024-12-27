import { CalculatorInputs, CalculationResult, TimelineEntry, CompoundFrequency} from '../types/calculator';
import { getCompoundFrequencyNumber } from './frequencies';

const MONTHS_PER_YEAR = 12;

const getMonthlyRate = (
  annualRate: number,
  compoundFrequency: CompoundFrequency
): number =>  {

  
  // annually: 1,
  // semiannually: 2,
  const frequencyNumber = getCompoundFrequencyNumber(compoundFrequency);
  
  const periodRate = annualRate / frequencyNumber;
  // const periodInterest = Math.pow(1 + annualRate, 1 / frequencyNumber) - 1;
  
  const nMonthsPerPeriod = 12 / frequencyNumber;

  // This returns if compound anually
  // const monthlyRate = Math.pow(1 + annualRate, 1/12) - 1;

  // This returns if compound monthly
  // const monthlyRate = annualRate / 12;
  
  const monthlyRate = Math.pow(1 + periodRate, 1/nMonthsPerPeriod) - 1
  console.log({compoundFrequency, frequencyNumber, periodRate, nMonthsPerPeriod, monthlyRate})

  return monthlyRate;
}

const calculateMonthlyInterest = (balance: number, monthlyRate: number): number => {
  // if (compoundFrequency === Infinity) {
  //   // For continuous compounding, calculate the monthly effective rate
  //   // const monthlyRate = annualRate / MONTHS_PER_YEAR;
  //   const monthlyRate = Math.pow(1 + annualRate, 1/12) - 1
  //   return balance * (Math.exp(monthlyRate) - 1);
  // }

  // For other frequencies, calculate the monthly portion of the periodic interest
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
      endingBalance: balance
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