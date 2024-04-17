import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

export interface TypesDAppsPieChartProps {
  maliciousDAppsCount: number;
  benignDAppsCount: number;
}
export const TypesDAppsPieChart = ({
  maliciousDAppsCount,
  benignDAppsCount,
}: TypesDAppsPieChartProps) => {
  return (
    <div className="relative top-1/2 translate-y-1/2 ">
      <PieChart
        series={[
          {
            data: [
              {
                id: 0,
                value: maliciousDAppsCount,
                label: 'Malicious DApps Results',
              },
              { id: 1, value: benignDAppsCount, label: 'Benign DApps Results' },
            ],
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            stroke: 'red',
            strokeWidth: 0,
          },
        }}
        width={800}
        height={400}
      />
    </div>
  );
};
