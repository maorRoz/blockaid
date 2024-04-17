import dayjs from 'dayjs';
import { Result } from '@app/types';
import rawResultsList from './blockaid_results.json';

interface RawResult {
  URL: string;
  IS_MALICIOUS: string;
  LATENCY: number;
  STARTED_AT: string;
}

const rawResultToResult = (rawResult: RawResult): Result => ({
  url: rawResult.URL,
  isMalicious: rawResult.IS_MALICIOUS === 'true',
  latency: rawResult.LATENCY,
  startedAt: rawResult.STARTED_AT,
});

export const getResults = (dateRange?: {
  from?: string;
  to?: string;
}): Result[] => {
  const results = (rawResultsList as RawResult[]).map(rawResultToResult);

  return dateRange
    ? results.filter((result) => {
        const isAfter =
          !dateRange.from ||
          dayjs(result.startedAt).isAfter(dayjs(dateRange.from));
        const isBefore =
          !dateRange.to ||
          dayjs(result.startedAt).isBefore(dayjs(dateRange.from));

        return isAfter && isBefore;
      })
    : results;
};
