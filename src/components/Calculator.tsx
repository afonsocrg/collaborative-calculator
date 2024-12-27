import {
  useStateTogether,
  useIsTogether,
  useLeaveSession,
  useCreateRandomSession,
  useJoinUrl,
} from "react-together";
import { Card, Button, Tooltip } from "antd";
import { Calculator as CalculatorIcon } from "lucide-react";
import { CalculatorInputs } from "../types/calculator";
import { CopyOutlined } from "@ant-design/icons";
import { calculateInvestment } from "../utils/calculator";
import InvestmentForm from "./InvestmentForm";
import ResultsDisplay from "./ResultsDisplay";
import TimelineTable from "./TimelineTable";
import Charts from "./Charts";

export default function Calculator() {
  const isTogether = useIsTogether();
  const leaveSession = useLeaveSession();
  const createRandomSession = useCreateRandomSession();
  const joinUrl = useJoinUrl();

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

  const copyJoinUrlToClipboard = () => {
    if (joinUrl) {
      navigator.clipboard.writeText(joinUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <CalculatorIcon className="h-10 w-10 text-blue-600" />
              Collaborative Investment Simulator
            </h1>
            <p className="mt-2 text-xl text-gray-600">
              Plan your financial future collaboratively!
            </p>
          </div>
          {isTogether ? (
            <>
              <p className="mt-2 text-lg text-gray-600">
                Share the link below with your friends to invite them to this
                session:
              </p>
              <p className="mt-2 text-sm text-gray-600">
                <a
                  href={joinUrl!}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {joinUrl}
                </a>
                <span className="ml-2">
                  <Tooltip title="Copy to clipboard" placement="bottom">
                    <Button
                      shape="circle"
                      type="text"
                      icon={<CopyOutlined className="text-gray-600" />}
                      onClick={copyJoinUrlToClipboard}
                    />
                  </Tooltip>
                </span>
              </p>
              <div className="mt-2">
                <Button color="danger" variant="filled" onClick={leaveSession}>
                  Leave Session
                </Button>
              </div>
            </>
          ) : (
            <Button
              color="primary"
              variant="filled"
              onClick={createRandomSession}
            >
              Start a collaborative session
            </Button>
          )}
        </div>

        <Card className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
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
            </div>
            <ResultsDisplay results={results} />
          </div>
        </Card>

        <Charts results={results} />
        <TimelineTable timeline={results.timeline} />
      </div>
    </div>
  );
}
