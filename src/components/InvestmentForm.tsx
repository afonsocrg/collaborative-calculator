import { SelectProps, Typography } from "antd";
import { useSettings } from "../hooks/useSettings";
import {
  CompoundFrequency,
  ContributionFrequency,
  ContributionTiming,
} from "../types/calculator";
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
  parseCurrency,
} from "../utils/serde";
import { PresenceEditableText } from "./PresenceEditableText";
import { PresenceSelect } from "./PresenceSelect";
import { PresenceSlider } from "./PresenceSlider";

const { Paragraph } = Typography;

const MAX_YEARS = 75;

function putInRange(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function adjustYears(value: number) {
  return putInRange(Math.floor(value), 1, MAX_YEARS);
}

function adjustReturnRate(value: number) {
  return putInRange(value, 0, 25);
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
  const { currency } = useSettings();
  const inputClassName = "font-semibold underline cursor-pointer";

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
        <PresenceEditableText
          rtKey="starting-amount-presence"
          value={formatCurrency(startingAmount, currency)}
          onChange={(value) => setStartingAmount(parseCurrency(value))}
        />
        {" for "}
        <PresenceEditableText
          rtKey="years-presence"
          value={formatNumber(years)}
          onChange={(value) => setYears(adjustYears(parseCurrency(value)))}
        />{" "}
        years;
      </Paragraph>
      <Paragraph>With an annual interest rate of</Paragraph>
      <div className="flex flex-row gap-2 max-w-[50%]">
        <PresenceEditableText
          rtKey="return-rate-presence"
          value={formatPercentage(returnRate)}
          onChange={(value) =>
            setReturnRate(adjustReturnRate(parseCurrency(value) || 0))
          }
        />
        <div className="grow">
          <PresenceSlider
            rtKey="return-rate-slider"
            value={returnRate}
            onChange={(value) => setReturnRate(adjustReturnRate(value))}
            min={0}
            max={25}
            step={0.1}
          />
        </div>
      </div>

      <Paragraph>
        {" compounded "}
        <PresenceSelect
          rtKey="compound-frequency-presence"
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
        <PresenceEditableText
          rtKey="additional-contribution-presence"
          value={formatCurrency(additionalContribution, currency)}
          onChange={(value) => setAdditionalContribution(parseCurrency(value))}
        />
        {" at the "}
        <PresenceSelect
          rtKey="contribution-timing-presence"
          value={contributionTiming}
          onChange={(value) => setContributionTiming(value)}
          options={[
            { value: "beginning", label: "beginning" },
            { value: "end", label: "end" },
          ]}
          {...selectProps}
        />
        {" of each "}
        <PresenceSelect
          rtKey="contribution-frequency-presence"
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
