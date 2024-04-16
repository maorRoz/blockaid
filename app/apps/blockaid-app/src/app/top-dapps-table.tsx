import { Result } from '@app/types';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

export interface TopDAppsTableProps {
  results: Result[];
}

export const TopDAppsTable = ({ results }: TopDAppsTableProps) => {
  const resultsCountsMap = results.reduce(
    (acc: Record<string, Result & { count: number }>, result) => {
      acc[result.url] ??= { ...result, count: 0 };

      acc[result.url].count++;

      return acc;
    },
    {}
  );

  const rows = Object.values(resultsCountsMap)
    .sort((r1, r2) => r2.count - r1.count)
    .slice(0, 10);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Requests</TableCell>
            <TableCell align="right">Latency</TableCell>
            <TableCell align="right">Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.url}
              </TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">{row.latency}</TableCell>
              <TableCell align="right">{row.startedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
