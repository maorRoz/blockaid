import { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import dayjs from 'dayjs';
import { Result } from '@app/types';
import { TextField, MenuItem } from '@mui/material';

const availableStackOrder = ['seconds', 'minutes', 'hours', 'days'] as const;

export interface ResultsCountPerTimeFrameStackingChartProps {
  results: Result[];
}

export const ResultsCountPerTimeFrameStackingChart = ({
  results,
}: ResultsCountPerTimeFrameStackingChartProps) => {
  const [stackOrder, setStackOrder] = useState('none');

  const resultsPerHours = results.reduce(
    (acc: Record<number, { malicious: number; benign: number }>, result) => {
      const resultHour = dayjs(result.startedAt).hour();

      acc[resultHour] ??= { malicious: 0, benign: 0 };

      if (result.isMalicious) {
        acc[resultHour].malicious++;
      } else {
        acc[resultHour].benign++;
      }

      return acc;
    },
    {}
  );
  const seriesMaliciousData = Object.values(resultsPerHours).map(
    (value) => value.malicious
  );
  const seriesBenignData = Object.values(resultsPerHours).map(
    (value) => value.benign
  );
  return (
    <div className="relative top-1/2 translate-y-1/2 ">
      <TextField
        sx={{ minWidth: 150, mr: 5, mt: 1 }}
        select
        label="Time Frame"
        value={stackOrder}
        onChange={(event) => setStackOrder(event.target.value as any)}
      >
        {availableStackOrder.map((offset) => (
          <MenuItem key={offset} value={offset}>
            {offset}
          </MenuItem>
        ))}
      </TextField>
      <BarChart
        height={300}
        series={[
          { data: seriesMaliciousData, label: 'Malicious', stack: 'total' },
          { data: seriesBenignData, label: 'Benign', stack: 'total' },
        ]}
        xAxis={[
          {
            label: 'Hours',
            scaleType: 'band' as const,
            data: Object.keys(resultsPerHours),
          },
        ]}
      />
    </div>
  );
};
