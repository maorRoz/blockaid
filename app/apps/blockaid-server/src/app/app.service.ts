import { Injectable } from '@nestjs/common';
import { Result, ResultsByTimeFrameValues } from '@app/types';
import { getResults } from './get-results';
import { getTopDApps } from './get-top-dapps';
import { getResultsPerTimeFrame } from './get-results-per-time-frame';

@Injectable()
export class AppService {
  getResultsStatistics(dateRange?: { from?: string; to?: string }): {
    maliciousDAppsCount: number;
    benignDAppsCount: number;
    topMaliciousDApps: (Result & { count: number })[];
    topBenignDApps: (Result & { count: number })[];
  } {
    const results = getResults(dateRange);

    const maliciousResults = results.filter(
      (result) => result.isMalicious
    );
    const benignResults = results.filter(
      (result) => !result.isMalicious
    );

    const topMaliciousDApps = getTopDApps(maliciousResults);

    const topBenignDApps = getTopDApps(benignResults);

    return {
      maliciousDAppsCount: maliciousResults.length,
      benignDAppsCount: benignResults.length,
      topMaliciousDApps,
      topBenignDApps,
    };
  }

  getResultsByTimeFrameValues({
    timeFrame,
    dateRange,
  }: {
    timeFrame?: 'second' | 'minute' | 'hour' | 'day';
    dateRange?: { from?: string; to?: string };
  }): ResultsByTimeFrameValues {
    console.log(dateRange);
    const results = getResults(dateRange);

    return getResultsPerTimeFrame({
      timeFrame,
      results,
    });
  }
}
