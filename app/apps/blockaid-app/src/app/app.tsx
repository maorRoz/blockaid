import { Route, Routes, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AppBar from '@mui/material/AppBar';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from '@mui/material/Button';
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';
import { TypesDAppsPieChart } from './types-dapps-piechart';
import Blockaid from './blockaid.svg';
import { Result } from '@app/types';
import { TopDAppsTable } from './top-dapps-table';
import { ResultsCountPerTimeFrameStackingChart } from './results-count-per-time-frame-stacking-chart';

const pages = [
  { label: 'Results Count Per Time frame', route: '/' },
  { label: 'Result Types', route: '/types-dapps' },
  { label: 'Top Malicious Results', route: '/top-malicious' },
  { label: 'Top Benign Results', route: '/top-benign' },
];

export function App() {
  const { data: results = [] } = useQuery<Result[]>({
    queryKey: ['getResults'],
    queryFn: async () => {
      const { data } = await axios.get('/api');
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <SingleInputTimeRangeField
              label="From - To"
              color="primary"
              sx={{ bgcolor: 'white' }}
            />
          </LocalizationProvider>
        </div>
      </AppBar>
      <Routes>
        <Route
          path="/"
          element={<ResultsCountPerTimeFrameStackingChart results={results} />}
        />
        <Route
          path="/types-dapps"
          element={<TypesDAppsPieChart results={results} />}
        />
        <Route
          path="/top-malicious"
          element={
            <TopDAppsTable
              results={results.filter((result) => result.isMalicious)}
            />
          }
        />
        <Route
          path="/top-benign"
          element={
            <TopDAppsTable
              results={results.filter((result) => !result.isMalicious)}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
