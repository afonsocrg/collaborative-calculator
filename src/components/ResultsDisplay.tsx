import { Statistic } from "antd";
import colors from "tailwindcss/colors";
import { useSettings } from "../hooks/useSettings";
import { CalculationResult } from "../types/calculator";
import { formatCurrency } from "../utils/serde";

interface ResultsDisplayProps {
  results: CalculationResult;
}

const lightModeLightness = 600;
const darkModeLightness = 300;

const lightModeGreen = colors.green[lightModeLightness];
const darkModeGreen = colors.green[darkModeLightness];

const lightModeBlue = colors.blue[lightModeLightness];
const darkModeBlue = colors.blue[darkModeLightness];

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const { currency, isDarkMode } = useSettings();

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
          valueStyle={{ color: isDarkMode ? darkModeBlue : lightModeBlue }}
        />
        <Statistic
          title="Final Balance"
          value={formatCurrency(results.endBalance, currency)}
          valueStyle={{
            color: isDarkMode ? darkModeGreen : lightModeGreen,
          }}
        />
      </div>
    </div>
  );
}
