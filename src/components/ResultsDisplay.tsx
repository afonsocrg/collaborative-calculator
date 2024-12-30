import { Statistic } from "antd";
import { useSettings } from "../hooks/useSettings";
import { CalculationResult } from "../types/calculator";
import { formatCurrency } from "../utils/serde";

interface ResultsDisplayProps {
  results: CalculationResult;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const { currency } = useSettings();

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <Statistic
          title="Initial Investment"
          value={formatCurrency(results.startingAmount, currency)}
        />
        <Statistic
          title="Total Contributions"
          value={formatCurrency(results.totalContributions, currency)}
        />
        <Statistic
          title="Total Interest"
          value={formatCurrency(results.totalInterest, currency)}
          valueStyle={{ color: "#1677ff" }}
        />
        <Statistic
          title="Final Balance"
          value={formatCurrency(results.endBalance, currency)}
          valueStyle={{ color: "#3f8600" }}
        />
      </div>
    </div>
  );
}
