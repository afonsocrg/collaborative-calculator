import { Select, SelectProps, Typography } from "antd";
import {
  CompoundFrequency,
  ContributionFrequency,
  ContributionTiming,
} from "../types/calculator";

const { Text, Paragraph } = Typography;

function formatCurrency(value: number | undefined) {
  if (value === undefined) {
    return "";
  }
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function formatPercentage(value: number | undefined) {
  if (value === undefined) {
    return "";
  }
  return `${value}%`;
}

function formatNumber(value: number | undefined) {
  if (value === undefined) {
    return "";
  }
  return new Intl.NumberFormat(undefined, {
    style: "decimal",
  }).format(value);
}

function parseCurrency(value: string | undefined) {
  if (value === undefined) {
    return 0;
  }
  value = value.replace(/[^0-9.]/g, "");
  if (value === "") {
    return 0;
  }
  return parseFloat(value) ?? 0;
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
  const triggerType: ("text" | "icon")[] = ["text"];
  const inputClassName = "font-bold cursor-pointer";

  const selectProps: SelectProps = {
    variant: "borderless",
    style: {
      padding: "0 4px",
      margin: 0,
    },
    labelRender: ({ label }) => <span className={inputClassName}>{label}</span>,
  };

  return (
    <div id="investment-form">
      <Paragraph>
        Investing{" "}
        <Text
          className={inputClassName}
          editable={{
            triggerType,
            onChange: (value) => setStartingAmount(parseCurrency(value)),
            enterIcon: null,
          }}
        >
          {formatCurrency(startingAmount)}
        </Text>{" "}
        for{" "}
        <Text
          className={inputClassName}
          editable={{
            triggerType,
            onChange: (value) =>
              setYears(Math.floor(parseCurrency(value)) || 1),
            enterIcon: null,
          }}
        >
          {formatNumber(years)}
        </Text>{" "}
        years;
      </Paragraph>
      <Paragraph>
        With an annual interest rate of{" "}
        <Text
          className={inputClassName}
          editable={{
            triggerType,
            onChange: (value) => setReturnRate(parseCurrency(value) || 0),
            enterIcon: null,
          }}
        >
          {formatPercentage(returnRate)}
        </Text>
        {" compounded "}
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
      </Paragraph>
      <Paragraph>
        And adding{" "}
        <Text
          className={inputClassName}
          editable={{
            triggerType,
            onChange: (value) =>
              setAdditionalContribution(parseCurrency(value)),
            enterIcon: null,
          }}
        >
          {formatCurrency(additionalContribution)}
        </Text>
        {" at the "}
        <Select
          value={contributionTiming}
          onChange={(value) => setContributionTiming(value)}
          options={[
            { value: "beginning", label: "beginning" },
            { value: "end", label: "end" },
          ]}
          {...selectProps}
        />
        {" of each "}
        <Select
          value={contributionFrequency}
          onChange={(value) => setContributionFrequency(value)}
          options={[
            { value: "month", label: "month" },
            { value: "year", label: "year" },
          ]}
          {...selectProps}
        />
      </Paragraph>
      <Paragraph>Results in</Paragraph>
    </div>
  );
}
