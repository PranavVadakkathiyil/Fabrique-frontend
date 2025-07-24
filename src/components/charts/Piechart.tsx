import { PieChart } from '@mui/x-charts/PieChart';
type PieDataObj = {
  id: number,
  value: number,
  label: string
}
type PieProps = {
  PieChartData: PieDataObj[]
}
export default function Piechart({ PieChartData }: PieProps) {
  return (
    <PieChart
      series={[
        {
          data: PieChartData,
        },
      ]}
      width={350}
      height={350}
    />
  );
}
