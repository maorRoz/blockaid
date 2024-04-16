import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Result } from '@app/types';

export interface TypesDAppsPieChartProps {
  results: Result[];
}
export const TypesDAppsPieChart = ({ results }: TypesDAppsPieChartProps) => {
  const { maliciousDAppsCount, benignDAppsCount } = results.reduce(
    (acc, result) =>
      result.isMalicious
        ? { ...acc, maliciousDAppsCount: acc.maliciousDAppsCount + 1 }
        : { ...acc, benignDAppsCount: acc.benignDAppsCount + 1 },
    { maliciousDAppsCount: 0, benignDAppsCount: 0 }
  );

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
