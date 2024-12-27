import { Card, Switch, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { TimelineEntry } from "../types/calculator";
import { aggregateTimelineByYear } from "../utils/timelineAggregation";

interface TimelineTableProps {
  timeline: TimelineEntry[];
}

export default function TimelineTable({ timeline }: TimelineTableProps) {
  const [showMonthly, setShowMonthly] = useState(false);

  const displayData = showMonthly
    ? timeline
    : aggregateTimelineByYear(timeline);

  const columns: ColumnsType<TimelineEntry> = [
    {
      title: showMonthly ? "Month" : "Year",
      dataIndex: "date",
      render: (value: string) =>
        new Date(value).toLocaleDateString(undefined, {
          month: showMonthly ? "short" : undefined,
          year: "numeric",
        }),
      key: "date",
    },
    {
      title: "Deposit",
      dataIndex: "deposit",
      key: "deposit",
      render: (value: number) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "EUR",
        }).format(value),
    },
    {
      title: "Interest",
      dataIndex: "interest",
      key: "interest",
      render: (value: number) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "EUR",
        }).format(value),
    },
    {
      title: "Total Balance",
      dataIndex: "endingBalance",
      key: "endingBalance",
      render: (value: number) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "EUR",
        }).format(value),
    },
  ];

  return (
    <Card className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Income Schedule</h3>
        <div className="flex items-center gap-2">
          <span>Show Monthly</span>
          <Switch checked={showMonthly} onChange={setShowMonthly} />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={displayData.map((entry) => ({
          ...entry,
          key: entry.period,
        }))}
        pagination={{}}
        scroll={{ x: true }}
      />
    </Card>
  );
}
