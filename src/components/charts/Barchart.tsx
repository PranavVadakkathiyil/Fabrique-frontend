import { BarChart } from '@mui/x-charts/BarChart';
import { shortMonths } from '../../constents/Date';

type BarChartProps = {
  chartdata: number[];
};

export default function ChartsOverviewDemo({ chartdata }: BarChartProps) {
  return (
    <BarChart
      series={[
        { data: chartdata },  // using prop data
      ]}
      height={290}
      xAxis={[{ data: shortMonths }]}
    />
  );
}
