import { Form, InputNumber, Select, Tooltip } from 'antd';
import { DollarSign, Clock, Percent, PlusCircle, Settings, HelpCircle } from 'lucide-react';
import { CompoundFrequency, ContributionTiming, ContributionFrequency } from '../types/calculator';

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
  return (
    <Form layout="vertical" className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Form.Item
        label={
          <span className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Starting Amount
            <Tooltip title="The initial amount you're investing with">
              <HelpCircle className="h-4 w-4 cursor-help" />
            </Tooltip>
          </span>
        }
      >
        <InputNumber
          value={startingAmount}
          onChange={value => setStartingAmount(value || 0)}
          className="w-full"
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => parseFloat(value!.replace(/\$\s?|(,*)/g, ''))}
        />
      </Form.Item>

      <Form.Item
        label={
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Years
            <Tooltip title="The time period you plan to keep your investment">
              <HelpCircle className="h-4 w-4 cursor-help" />
            </Tooltip>
          </span>
        }
      >
        <InputNumber
          value={years}
          onChange={value => setYears(value || 0)}
          className="w-full"
          min={1}
        />
      </Form.Item>

      <Form.Item
        label={
          <span className="flex items-center gap-2">
            <Percent className="h-4 w-4" />
            Return Rate (%)
            <Tooltip title="The expected annual rate of return on your investment">
              <HelpCircle className="h-4 w-4 cursor-help" />
            </Tooltip>
          </span>
        }
      >
        <InputNumber
          value={returnRate}
          onChange={value => setReturnRate(value || 0)}
          className="w-full"
          step={0.1}
        />
      </Form.Item>

      <Form.Item
        label={
          <span className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Compound Frequency
            <Tooltip title="How often the interest is calculated and added to your investment">
              <HelpCircle className="h-4 w-4 cursor-help" />
            </Tooltip>
          </span>
        }
      >
        <Select
          value={compoundFrequency}
          onChange={value => setCompoundFrequency(value)}
          className="w-full"
        >
          <Select.Option value="annually">Annually</Select.Option>
          <Select.Option value="semiannually">Semi-annually</Select.Option>
          <Select.Option value="quarterly">Quarterly</Select.Option>
          <Select.Option value="monthly">Monthly</Select.Option>
          <Select.Option value="semimonthly">Semi-monthly</Select.Option>
          <Select.Option value="biweekly">Bi-weekly</Select.Option>
          <Select.Option value="weekly">Weekly</Select.Option>
          <Select.Option value="daily">Daily</Select.Option>
          <Select.Option value="continuously">Continuously</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={
          <span className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Additional Contribution
            <Tooltip title="Regular contributions you plan to make to your investment">
              <HelpCircle className="h-4 w-4 cursor-help" />
            </Tooltip>
          </span>
        }
      >
        <InputNumber
          value={additionalContribution}
          onChange={value => setAdditionalContribution(value || 0)}
          className="w-full"
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => parseFloat(value!.replace(/\$\s?|(,*)/g, ''))}
        />
      </Form.Item>

      <div className="space-y-4">
        <Form.Item 
          label={
            <span className="flex items-center gap-2">
              Contribution Timing
              <Tooltip title="Whether to make contributions at the beginning or end of each period">
                <HelpCircle className="h-4 w-4 cursor-help" />
              </Tooltip>
            </span>
          }
        >
          <Select
            value={contributionTiming}
            onChange={value => setContributionTiming(value)}
            className="w-full"
          >
            <Select.Option value="beginning">Beginning</Select.Option>
            <Select.Option value="end">End</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item 
          label={
            <span className="flex items-center gap-2">
              Contribution Frequency
              <Tooltip title="How often you'll make additional contributions">
                <HelpCircle className="h-4 w-4 cursor-help" />
              </Tooltip>
            </span>
          }
        >
          <Select
            value={contributionFrequency}
            onChange={value => setContributionFrequency(value)}
            className="w-full"
          >
            <Select.Option value="month">Month</Select.Option>
            <Select.Option value="year">Year</Select.Option>
          </Select>
        </Form.Item>
      </div>
    </Form>
  );
}