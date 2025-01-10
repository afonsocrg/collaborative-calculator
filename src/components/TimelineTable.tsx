import { Card, Switch, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useStateTogether } from "react-together";
import { useSettings } from "../hooks/useSettings";
import { TimelineEntry } from "../types/calculator";
import { formatCurrency } from "../utils/serde";
import { aggregateTimelineByYear } from "../utils/timelineAggregation";

interface TimelineTableProps {
  timeline: TimelineEntry[];
}

export default function TimelineTable({ timeline }: TimelineTableProps) {
  const { currency } = useSettings();
  const [showMonthly, setShowMonthly] = useStateTogether("show-monthly", false);
  const [page, setPage] = useStateTogether("table-page", 1);
  const [pageSize, setPageSize] = useStateTogether("table-page-size", 10);

  const displayData = showMonthly
    ? timeline
    : aggregateTimelineByYear(timeline);

  const columns: ColumnsType<TimelineEntry> = [
    {
      key: "date",
      title: showMonthly ? "Month" : "Year",
      dataIndex: "date",
      render: (value: string) =>
        new Date(value).toLocaleDateString(undefined, {
          month: showMonthly ? "short" : undefined,
          year: "numeric",
        }),
    },
    {
      key: "deposit",
      title: "Deposit",
      dataIndex: "deposit",
      render: (value: number) => formatCurrency(value, currency),
    },
    {
      key: "interest",
      title: "Interest",
      dataIndex: "interest",
      render: (value: number) => formatCurrency(value, currency),
    },
    {
      key: "endingBalance",
      title: "Total Balance",
      dataIndex: "endingBalance",
      render: (value: number) => formatCurrency(value, currency),
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
        pagination={{
          current: page,
          pageSize: pageSize,
          pageSizeOptions: [10, 20, 50, 100],
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
        scroll={{ x: true }}
      />
    </Card>
  );
}
