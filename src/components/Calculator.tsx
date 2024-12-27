import { useStateTogether } from 'react-together';
import { Card } from 'antd';
import { Calculator as CalculatorIcon } from 'lucide-react';
import { CalculatorInputs } from '../types/calculator';
import { calculateInvestment } from '../utils/calculator';
import InvestmentForm from './InvestmentForm';
import ResultsDisplay from './ResultsDisplay';
import TimelineTable from './TimelineTable';
import Charts from './Charts';

export default function Calculator() {
  const [startingAmount, setStartingAmount] = useStateTogether<number>('startingAmount', 20000);
  const [years, setYears] = useStateTogether<number>('years', 10);
  const [returnRate, setReturnRate] = useStateTogether<number>('returnRate', 10);
  const [compoundFrequency, setCompoundFrequency] = useStateTogether<CalculatorInputs['compoundFrequency']>('compoundFrequency', 'annually');
  const [additionalContribution, setAdditionalContribution] = useStateTogether<number>('additionalContribution', 1000);
  const [contributionTiming, setContributionTiming] = useStateTogether<CalculatorInputs['contributionTiming']>('contributionTiming', 'end');
  const [contributionFrequency, setContributionFrequency] = useStateTogether<CalculatorInputs['contributionFrequency']>('contributionFrequency', 'year');

  const inputs: CalculatorInputs = {
    startingAmount,
    years,
    returnRate,
    compoundFrequency,
    additionalContribution,
    contributionTiming,
    contributionFrequency
  };

  const results = calculateInvestment(inputs);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <CalculatorIcon className="h-10 w-10 text-blue-600" />
            Investment Calculator
          </h1>
          <p className="mt-2 text-lg text-gray-600">Plan your financial future with precision</p>
        </div>

        <Card className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <InvestmentForm
                startingAmount={startingAmount}
                setStartingAmount={setStartingAmount}
                years={years}
                setYears={setYears}
                returnRate={returnRate}
                setReturnRate={setReturnRate}
                compoundFrequency={compoundFrequency}
                setCompoundFrequency={setCompoundFrequency}
                additionalContribution={additionalContribution}
                setAdditionalContribution={setAdditionalContribution}
                contributionTiming={contributionTiming}
                setContributionTiming={setContributionTiming}
                contributionFrequency={contributionFrequency}
                setContributionFrequency={setContributionFrequency}
              />
            </div>
            <ResultsDisplay results={results} />
          </div>
        </Card>

        <Charts results={results} />
        <TimelineTable timeline={results.timeline} />
      </div>
    </div>
  );
}