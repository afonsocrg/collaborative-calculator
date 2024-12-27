import { Card } from "antd";
import { useStateTogether } from "react-together";
import { CalculatorInputs } from "../types/calculator";
import { calculateInvestment } from "../utils/calculator";
import Charts from "./Charts";
import InvestmentForm from "./InvestmentForm";
import ResultsDisplay from "./ResultsDisplay";
import TimelineTable from "./TimelineTable";

export default function Calculator() {
  const [startingAmount, setStartingAmount] = useStateTogether<number>(
    "startingAmount",
    20000
  );
  const [years, setYears] = useStateTogether<number>("years", 25);
  const [returnRate, setReturnRate] = useStateTogether<number>(
    "returnRate",
    10
  );
  const [compoundFrequency, setCompoundFrequency] = useStateTogether<
    CalculatorInputs["compoundFrequency"]
  >("compoundFrequency", "annually");
  const [additionalContribution, setAdditionalContribution] =
    useStateTogether<number>("additionalContribution", 500);
  const [contributionTiming, setContributionTiming] = useStateTogether<
    CalculatorInputs["contributionTiming"]
  >("contributionTiming", "beginning");
  const [contributionFrequency, setContributionFrequency] = useStateTogether<
    CalculatorInputs["contributionFrequency"]
  >("contributionFrequency", "month");

  const inputs: CalculatorInputs = {
    startingAmount,
    years,
    returnRate,
    compoundFrequency,
    additionalContribution,
    contributionTiming,
    contributionFrequency,
  };

  const results = calculateInvestment(inputs);

  return (
    <>
      <Card className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="grid grid-rows-2">
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
            <ResultsDisplay results={results} />
          </div>
          <Charts results={results} />
        </div>
      </Card>

      <TimelineTable timeline={results.timeline} />
    </>
  );
}
