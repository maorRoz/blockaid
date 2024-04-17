import { Route, Routes, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AppBar from '@mui/material/AppBar';
import axios from 'axios';
import Button from '@mui/material/Button';
import { TypesDAppsPieChart } from './types-dapps-piechart';
import Blockaid from './blockaid.svg';
import {
  ResultsByTimeFrameValues,
  ResultsStatistics,
  TimeFrame,
} from '@app/types';
import { TopDAppsTable } from './top-dapps-table';
import { ResultsCountPerTimeFrameStackingChart } from './results-count-per-time-frame-stacking-chart';
import { useState } from 'react';
import { AvailableTimeFrame } from './available-time-frame';
import { DataTimeRangePicker } from './data-time-range-picker';

const pages = [
  { label: 'Results Count Per Time frame', route: '/' },
  { label: 'Result Types', route: '/types-dapps' },
  { label: 'Top Malicious Results', route: '/top-malicious' },
  { label: 'Top Benign Results', route: '/top-benign' },
];

const availableTimeFrameToTimeFrame: Record<AvailableTimeFrame, TimeFrame> = {
  seconds: 'second',
  minutes: 'minute',
  hours: 'hour',
  days: 'day',
};

export function App() {
  const [selectedTimeFrame, setSelectedTimeFrame] =
    useState<AvailableTimeFrame>('hours');

  const [dateRange, setDateRange] = useState<{ from: string; to: string }>();

  const {
    data: {
      maliciousDAppsCount,
      benignDAppsCount,
      topMaliciousDApps,
      topBenignDApps,
    } = {
      maliciousDAppsCount: 0,
      benignDAppsCount: 0,
      topMaliciousDApps: [],
      topBenignDApps: [],
    },
  } = useQuery<ResultsStatistics>({
    queryKey: ['getResultsStatistics', dateRange],
    queryFn: async () => {
      const { data } = await axios.get('/api/resultsStatistics', {
        params: { ...dateRange },
      });
      return data;
    },
  });

  const { data: resultsByTimeFrameValues = {} } =
    useQuery<ResultsByTimeFrameValues>({
      queryKey: ['getResultsByTimeFrameValues', dateRange, selectedTimeFrame],
      queryFn: async () => {
        const { data } = await axios.get('/api/resultsByTimeFrameValues', {
          params: {
            ...dateRange,
            timeFrame: availableTimeFrameToTimeFrame[selectedTimeFrame],
          },
        });
        return data;
      },
    });

  return (
    <div className="max-w-[1920px] m-auto min-h-screen">
      <AppBar position="static" role="navigation" sx={{ bgcolor: 'black' }}>
        <div className="flex justify-between items-center px-4 py-1">
          <img src={Blockaid} alt="blockaid" className="w-20 h-20" />
          <div className="flex gap-4">
            {pages.map((page) => (
              <Button
                key={page.route}
                to={page.route}
                component={Link}
                style={{ textTransform: 'none' }}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  fontSize: '1rem',
                }}
              >
                {page.label}
              </Button>
            ))}
          </div>
          <DataTimeRangePicker
            dateRange={dateRange}
            onDateRangeChange={
              setDateRange as (dateRange: {
                from?: string;
                to?: string;
              }) => void
            }
          />
        </div>
      </AppBar>
      <Routes>
        <Route
          path="/"
          element={
            <ResultsCountPerTimeFrameStackingChart
              resultsByTimeFrameValues={resultsByTimeFrameValues}
              selectedTimeFrame={selectedTimeFrame}
              onTimeFrameSelect={setSelectedTimeFrame}
            />
          }
        />
        <Route
          path="/types-dapps"
          element={
            <TypesDAppsPieChart
              maliciousDAppsCount={maliciousDAppsCount}
              benignDAppsCount={benignDAppsCount}
            />
          }
        />
        <Route
          path="/top-malicious"
          element={<TopDAppsTable results={topMaliciousDApps} />}
        />
        <Route
          path="/top-benign"
          element={<TopDAppsTable results={topBenignDApps} />}
        />
      </Routes>
    </div>
  );
}

export default App;
