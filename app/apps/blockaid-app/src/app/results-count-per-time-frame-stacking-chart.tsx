import { BarChart } from '@mui/x-charts/BarChart';
import dayjs from 'dayjs';
import { ResultsByTimeFrameValues } from '@app/types';
import { TextField, MenuItem } from '@mui/material';
import {
  AVAILABLE_TIME_FRAMES,
  AvailableTimeFrame,
} from './available-time-frame';

export interface ResultsCountPerTimeFrameStackingChartProps {
  resultsByTimeFrameValues: ResultsByTimeFrameValues;
  selectedTimeFrame: AvailableTimeFrame;
  onTimeFrameSelect: (timeFrame: AvailableTimeFrame) => void;
}

export const ResultsCountPerTimeFrameStackingChart = ({
  resultsByTimeFrameValues,
  selectedTimeFrame,
  onTimeFrameSelect
}: ResultsCountPerTimeFrameStackingChartProps) => {

  const sortedResultsPerTimeFrameEntries = Object.entries(
    resultsByTimeFrameValues
  )
    .slice(0, 50)
    .sort(([t1], [t2]) => Number(t1) - Number(t2));

  const seriesMaliciousData = sortedResultsPerTimeFrameEntries.map(
    ([, value]) => value.malicious
  );
  const seriesBenignData = sortedResultsPerTimeFrameEntries.map(
    ([, value]) => value.benign
  );

  return (
    <div className="relative top-1/2 translate-y-1/2 ">
      <TextField
        sx={{ minWidth: 150, mr: 5, mt: 1 }}
        select
        label="Time Frame"
        value={selectedTimeFrame}
        onChange={(event) =>
          onTimeFrameSelect(event.target.value as AvailableTimeFrame)
        }
      >
        {AVAILABLE_TIME_FRAMES.map((offset) => (
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
            label: selectedTimeFrame,
            scaleType: 'band' as const,
            data: sortedResultsPerTimeFrameEntries.map(([timeFrame]) =>
              dayjs(Number(timeFrame)).format('DD/MM/YYYY HH:mm:ss')
            ),
          },
        ]}
      />
    </div>
  );
};
