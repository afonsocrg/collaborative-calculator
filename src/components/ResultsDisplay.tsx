import { Statistic } from "antd";
import { CalculationResult } from "../types/calculator";

interface ResultsDisplayProps {
  results: CalculationResult;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const currencySymbol = "€";
  const statisticProps = {
    precision: 2,
    prefix: currencySymbol,
  };
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <Statistic
          title="Initial Investment"
          value={results.startingAmount}
          {...statisticProps}
        />
        <Statistic
          title="Total Contributions"
          value={results.totalContributions}
          {...statisticProps}
        />
        <Statistic
          title="Total Interest"
          value={results.totalInterest}
          {...statisticProps}
          valueStyle={{ color: "#1677ff" }}
        />
        <Statistic
          title="Final Balance"
          value={results.endBalance}
          {...statisticProps}
          valueStyle={{ color: "#3f8600" }}
        />
      </div>
    </div>
  );
}
