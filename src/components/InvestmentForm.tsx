import { Avatar, Badge, Select, SelectProps, Slider, Typography } from "antd";
import { useMyId, useStateTogetherWithPerUserValues } from "react-together";
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

function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getUserColor(userId: string): string {
  const colors = [
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
  ];
  const h = hashString(userId);
  const color = colors[h % colors.length] + "-300";
  return color;
}

function PresenceEditableText({
  rtKey,
  value,
  onChange,
}: {
  rtKey: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const myId = useMyId();
  const [isEditing, setIsEditing, allEditing] =
    useStateTogetherWithPerUserValues(rtKey, false);

  const othersEditing = Object.entries(allEditing)
    .filter(([id, editing]) => id !== myId && editing)
    .map(([id]) => id);

  const triggerType: ("text" | "icon")[] = ["text"];
  const inputClassName = "font-bold underline cursor-pointer";

  const color = isEditing
    ? "transparent"
    : othersEditing.length > 0
    ? getUserColor(othersEditing[0])
    : "transparent";

  const borderClassName = `border-solid border-${color} border-2 rounded-md p-1`;

  return (
    <Badge
      count={
        <Avatar.Group max={{ count: 1 }} size={16}>
          {!isEditing &&
            othersEditing.map((id) => (
              <Avatar
                key={id}
                size={16}
                src={`https://api.dicebear.com/9.x/miniavs/svg?seed=${id}&backgroundColor=eeeeee`}
              />
            ))}
        </Avatar.Group>
      }
      size="small"
    >
      <span className={borderClassName}>
        <Text
          className={inputClassName}
          editable={{
            triggerType,
            enterIcon: null,
            onStart: () => setIsEditing(true),
            onChange: (v) => {
              onChange(v);
              setIsEditing(false);
            },
            onEnd: () => setIsEditing(false),
            onCancel: () => setIsEditing(false),
          }}
        >
          {value}
        </Text>
      </span>
    </Badge>
  );
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
  const inputClassName = "font-bold underline cursor-pointer";

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
          value={formatCurrency(startingAmount)}
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
          <Slider
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
        <PresenceEditableText
          rtKey="additional-contribution-presence"
          value={formatCurrency(additionalContribution)}
          onChange={(value) => setAdditionalContribution(parseCurrency(value))}
        />
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
