import { useState } from 'react';
import { Table, Card, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TimelineEntry } from '../types/calculator';
import { aggregateTimelineByYear } from '../utils/timelineAggregation';

interface TimelineTableProps {
  timeline: TimelineEntry[];
}

export default function TimelineTable({ timeline }: TimelineTableProps) {
  const [showMonthly, setShowMonthly] = useState(true);

  const displayData = showMonthly ? timeline : aggregateTimelineByYear(timeline);

  const columns: ColumnsType<TimelineEntry> = [
    {
      title: showMonthly ? 'Month' : 'Year',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: 'Deposit',
      dataIndex: 'deposit',
      key: 'deposit',
      render: (value: number) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value),
    },
    {
      title: 'Interest',
      dataIndex: 'interest',
      key: 'interest',
      render: (value: number) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value),
    },
    {
      title: 'Ending Balance',
      dataIndex: 'endingBalance',
      key: 'endingBalance',
      render: (value: number) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value),
    },
  ];

  return (
    <Card className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Accumulation Schedule</h3>
        <div className="flex items-center gap-2">
          <span>Show Monthly</span>
          <Switch checked={showMonthly} onChange={setShowMonthly} />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={displayData.map(entry => ({ ...entry, key: entry.period }))}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />
    </Card>
  );
}