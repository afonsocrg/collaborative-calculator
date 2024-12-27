import { Statistic, Card, Row, Col } from 'antd';
import { CalculationResult } from '../types/calculator';

interface ResultsDisplayProps {
  results: CalculationResult;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  return (
    <Card title="Results Summary">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Statistic
            title="End Balance"
            value={results.endBalance}
            precision={2}
            prefix="$"
            valueStyle={{ color: '#1677ff' }}
          />
        </Col>
        <Col span={24}>
          <Statistic
            title="Starting Amount"
            value={results.startingAmount}
            precision={2}
            prefix="$"
          />
        </Col>
        <Col span={24}>
          <Statistic
            title="Total Contributions"
            value={results.totalContributions}
            precision={2}
            prefix="$"
          />
        </Col>
        <Col span={24}>
          <Statistic
            title="Total Interest"
            value={results.totalInterest}
            precision={2}
            prefix="$"
            valueStyle={{ color: '#3f8600' }}
          />
        </Col>
      </Row>
    </Card>
  );
}