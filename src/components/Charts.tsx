import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { CalculationResult } from '../types/calculator';

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

export default function Charts({ results }: ChartsProps) {
  const pieData = {
    labels: ['Starting Amount', 'Total Contributions', 'Total Interest'],
    datasets: [
      {
        data: [
          results.startingAmount,
          results.totalContributions,
          results.totalInterest
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Calculate cumulative contributions and interest for each period
  const timelineData = results.timeline.map((entry, index) => {
    const previousContributions = index > 0 
      ? results.timeline.slice(0, index).reduce((sum, e) => sum + e.deposit, 0) 
      : 0;
    const previousInterest = index > 0
      ? results.timeline.slice(0, index).reduce((sum, e) => sum + e.interest, 0)
      : 0;
    
    return {
      period: entry.period,
      startingAmount: results.startingAmount,
      contributions: previousContributions + entry.deposit,
      interest: previousInterest + entry.interest,
      date: entry.date
    };
  });

  const barData = {
    labels: timelineData.map(entry => entry.date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })),
    datasets: [
      {
        label: 'Starting Amount',
        data: timelineData.map(entry => entry.startingAmount),
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
      {
        label: 'Contributions',
        data: timelineData.map(entry => entry.contributions - entry.startingAmount),
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
      },
      {
        label: 'Interest',
        data: timelineData.map(entry => entry.interest),
        backgroundColor: 'rgba(153, 102, 255, 0.8)',
      }
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Breakdown</h3>
        <div className="h-[300px] relative">
          <Pie data={pieData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Over Time</h3>
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
                    label: function(context) {
                      const label = context.dataset.label || '';
                      const value = context.parsed.y;
                      return `${label}: $${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
                    }
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}