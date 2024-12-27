import { InputNumber, InputNumberProps, Select, SelectProps } from "antd";
import {
  CompoundFrequency,
  ContributionFrequency,
  ContributionTiming,
} from "../types/calculator";

function formatCurrency(value: number | undefined) {
  if (value === undefined) {
    return "";
  }
  return new Intl.NumberFormat().format(value);
}

function parseCurrency(value: string | undefined) {
  return parseFloat(value!.replace(/\$\s?|(,*)/g, "")) ?? 0;
}

interface InvestmentFormProps {
  startingAmount: number;
  setStartingAmount: (value: number) => void;
  years: number;
  setYears: (value: number) => void;
  returnRate: number;
  setReturnRate: (value: number) => void;
  compoundFrequency: CompoundFrequency;
  setCompoundFrequency: (value: CompoundFrequency) => void;
  additionalContribution: number;
  setAdditionalContribution: (value: number) => void;
  contributionTiming: ContributionTiming;
  setContributionTiming: (value: ContributionTiming) => void;
  contributionFrequency: ContributionFrequency;
  setContributionFrequency: (value: ContributionFrequency) => void;
}

export default function InvestmentForm({
  startingAmount,
  setStartingAmount,
  years,
  setYears,
  returnRate,
  setReturnRate,
  compoundFrequency,
  setCompoundFrequency,
  additionalContribution,
  setAdditionalContribution,
  contributionTiming,
  setContributionTiming,
  contributionFrequency,
  setContributionFrequency,
}: InvestmentFormProps) {
  const currencySymbol = "€";

  const selectProps: SelectProps = {
    variant: "borderless",
    style: {
      padding: "0 4px",
      margin: 0,
    },
    labelRender: ({ label }) => <span className="font-bold">{label}</span>,
  };

  const inputNumberProps: InputNumberProps<number> = {
    variant: "borderless",
    size: "small",
    controls: false,
    style: {
      padding: 0,
      margin: 0,
      display: "inline-flex",
      alignItems: "center",
      fontWeight: "bold",
    },
  };

  const currencyInputProps: InputNumberProps<number> = {
    ...inputNumberProps,
    formatter: formatCurrency,
    parser: parseCurrency,
  };

  return (
    <ul>
      <li>
        Investing{" "}
        <InputNumber
          value={startingAmount}
          onChange={(value) => setStartingAmount(value || 0)}
          formatter={(value) => value?.toLocaleString() ?? ""}
          parser={(value) => parseFloat(value!.replace(/\$\s?|(,*)/g, "")) ?? 0}
          {...currencyInputProps}
        />
        {currencySymbol + " "}
        for
        <InputNumber
          value={years}
          onChange={(value) => setYears(value || 0)}
          min={1}
          {...inputNumberProps}
        />{" "}
        years
      </li>
      <li>
        With an annual interest rate of{" "}
        <InputNumber
          value={returnRate}
          onChange={(value) => setReturnRate(value || 0)}
          min={0}
          {...inputNumberProps}
        />
        % compounded{" "}
        <Select
          value={compoundFrequency}
          onChange={(value) => setCompoundFrequency(value)}
          options={[
            { value: "annually", label: "annually" },
            { value: "semiannually", label: "semiannually" },
            { value: "quarterly", label: "quarterly" },
            { value: "monthly", label: "monthly" },
            { value: "semimonthly", label: "semi-monthly" },
            { value: "biweekly", label: "bi-weekly" },
            { value: "weekly", label: "weekly" },
            { value: "daily", label: "daily" },
            { value: "continuously", label: "continuously" },
          ]}
          {...selectProps}
        />
      </li>
      <li>
        And adding{" "}
        <InputNumber
          value={additionalContribution}
          onChange={(value) => setAdditionalContribution(value || 0)}
          {...currencyInputProps}
        />
        {currencySymbol + " "}
        at the{" "}
        <Select
          value={contributionTiming}
          onChange={(value) => setContributionTiming(value)}
          options={[
            { value: "beginning", label: "beginning" },
            { value: "end", label: "end" },
          ]}
          {...selectProps}
        />
        of each{" "}
        <Select
          value={contributionFrequency}
          onChange={(value) => setContributionFrequency(value)}
          options={[
            { value: "month", label: "month" },
            { value: "year", label: "year" },
          ]}
          {...selectProps}
        />
      </li>
    </ul>
  );
}
