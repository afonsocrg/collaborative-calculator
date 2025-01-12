import { Avatar, Tabs, theme } from "antd";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { useStateTogetherWithPerUserValues } from "react-together";
import colors from "tailwindcss/colors";
import { useSettings } from "../hooks/useSettings";
import { CalculationResult } from "../types/calculator";
import { getUserAvatarUrl } from "../utils/users";

const { useToken } = theme;

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface ChartsProps {
  results: CalculationResult;
}

const lightModeLightness = 400;
const darkModeLightness = 500;

const purple = colors.violet[lightModeLightness];
const darkModePurple = colors.violet[darkModeLightness];

const blue = colors.blue[lightModeLightness];
const darkModeBlue = colors.blue[darkModeLightness];

const green = colors.teal[lightModeLightness];
const darkModeGreen = colors.teal[darkModeLightness];

function getBarData(results: CalculationResult, isDarkMode: boolean) {
  const timelineData = results.timeline.map((entry, index) => {
    const previousContributions =
      index > 0
        ? results.timeline
            .slice(0, index)
            .reduce((sum, e) => sum + e.deposit, 0)
        : 0;
    const previousInterest =
      index > 0
        ? results.timeline
            .slice(0, index)
            .reduce((sum, e) => sum + e.interest, 0)
        : 0;

    return {
      period: entry.period,
      startingAmount: results.startingAmount,
      contributions: previousContributions + entry.deposit,
      interest: previousInterest + entry.interest,
      date: entry.date,
    };
  });

  return {
    labels: timelineData.map((entry) =>
      entry.date.toLocaleDateString(undefined, {
        month: "short",
        year: "numeric",
      })
    ),
    datasets: [
      {
        label: "Initial Investment",
        data: timelineData.map((entry) => entry.startingAmount),
        backgroundColor: isDarkMode ? darkModeBlue : blue,
      },
      {
        label: "Contributions",
        data: timelineData.map(
          (entry) => entry.contributions - entry.startingAmount
        ),
        backgroundColor: isDarkMode ? darkModeGreen : green,
      },
      {
        label: "Interest",
        data: timelineData.map((entry) => entry.interest),
        backgroundColor: isDarkMode ? darkModePurple : purple,
      },
    ],
  };
}

function BarChart({ results }: ChartsProps) {
  const { isDarkMode } = useSettings();
  const { token } = useToken();
  const barData = getBarData(results, isDarkMode);
  return (
    <div className="h-[300px] relative text-gray-900">
      <Bar
        data={barData}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              labels: {
                color: token.colorText,
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.dataset.label || "";
                  const value = context.parsed.y;
                  return `${label}: $${value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
}

function getPieData(results: CalculationResult, isDarkMode: boolean) {
  return {
    labels: ["Initial Investment", "Total Contributions", "Total Interest"],
    datasets: [
      {
        data: [
          results.startingAmount,
          results.totalContributions,
          results.totalInterest,
        ],
        backgroundColor: [
          isDarkMode ? darkModeBlue : blue,
          isDarkMode ? darkModeGreen : green,
          isDarkMode ? darkModePurple : purple,
        ],
        borderColor: [
          isDarkMode ? darkModeBlue : blue,
          isDarkMode ? darkModeGreen : green,
          isDarkMode ? darkModePurple : purple,
        ],
        borderWidth: 1,
      },
    ],
  };
}

function PieChart({ results }: ChartsProps) {
  const { isDarkMode } = useSettings();
  const { token } = useToken();
  const pieData = getPieData(results, isDarkMode);
  return (
    <div className="h-[300px] relative">
      <Pie
        data={pieData}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: token.colorText,
              },
            },
          },
        }}
      />
    </div>
  );
}

interface PresenceLabelProps {
  label: string;
  userIds: string[];
}
function PresenceLabel({ label, userIds }: PresenceLabelProps) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <span>{label}</span>
      <Avatar.Group>
        {userIds.map((userId) => (
          <Avatar key={userId} src={getUserAvatarUrl(userId)} size={20} />
        ))}
      </Avatar.Group>
    </div>
  );
}

export default function Charts({ results }: ChartsProps) {
  const [activeKey, setActiveKey, allActiveKeys] =
    useStateTogetherWithPerUserValues("active-keys", "1", {
      omitMyValue: true,
    });

  const tabs = [
    {
      key: "1",
      label: "Growth Forecast",
      children: <BarChart results={results} />,
    },
    {
      key: "2",
      label: "Investment Breakdown",
      children: <PieChart results={results} />,
    },
  ];

  return (
    <Tabs
      activeKey={activeKey}
      onChange={(key) => setActiveKey(key)}
      items={tabs.map(({ key, label, ...rest }) => ({
        key,
        label: (
          <PresenceLabel
            label={label}
            userIds={Object.keys(allActiveKeys).filter(
              (id) => allActiveKeys[id] === key
            )}
          />
        ),
        ...rest,
      }))}
    />
  );
}
