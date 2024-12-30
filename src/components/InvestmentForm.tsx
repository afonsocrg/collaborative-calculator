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
  const inputClassName = "font-bold underline cursor-pointer";

  console.log({ currency });

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
          onChange={(value) => setYears(Math.floor(parseCurrency(value)) || 1)}
        />{" "}
        years;
      </Paragraph>
      <Paragraph>With an annual interest rate of</Paragraph>
      <div className="flex flex-row gap-2 max-w-[50%]">
        <PresenceEditableText
          rtKey="return-rate-presence"
          value={formatPercentage(returnRate)}
          onChange={(value) => setReturnRate(parseCurrency(value) || 0)}
        />
        <div className="grow">
          <PresenceSlider
            rtKey="return-rate-slider"
            value={returnRate}
            onChange={(value) => setReturnRate(value)}
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
