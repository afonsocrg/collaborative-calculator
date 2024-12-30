import { Avatar, Tabs } from "antd";
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
import { useMyId, useStateTogetherWithPerUserValues } from "react-together";
import { CalculationResult } from "../types/calculator";

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

function getBarData(results: CalculationResult) {
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
        backgroundColor: "rgba(54, 162, 235, 0.8)",
      },
      {
        label: "Contributions",
        data: timelineData.map(
          (entry) => entry.contributions - entry.startingAmount
        ),
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
      {
        label: "Interest",
        data: timelineData.map((entry) => entry.interest),
        backgroundColor: "rgba(153, 102, 255, 0.8)",
      },
    ],
  };
}

function BarChart({ results }: ChartsProps) {
  const barData = getBarData(results);
  return (
    <div className="h-[300px] relative">
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

function getPieData(results: CalculationResult) {
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
          "rgba(54, 162, 235, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
}

function PieChart({ results }: ChartsProps) {
  const pieData = getPieData(results);
  return (
    <div className="h-[300px] relative">
      <Pie data={pieData} options={{ maintainAspectRatio: false }} />
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
          <Avatar
            key={userId}
            src={`https://api.dicebear.com/9.x/miniavs/svg?seed=${userId}`}
            size={20}
          />
        ))}
      </Avatar.Group>
    </div>
  );
}

export default function Charts({ results }: ChartsProps) {
  const [activeKey, setActiveKey, allActiveKeys] =
    useStateTogetherWithPerUserValues("active-keys", "1");
  const myId = useMyId();

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
              (id) => id !== myId && allActiveKeys[id] === key
            )}
          />
        ),
        ...rest,
      }))}
    />
  );
}
