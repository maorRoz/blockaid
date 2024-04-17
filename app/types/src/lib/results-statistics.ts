import { Result } from './result';

export interface ResultsStatistics {
  maliciousDAppsCount: number;
  benignDAppsCount: number;
  topMaliciousDApps: (Result & { count: number })[];
  topBenignDApps: (Result & { count: number })[];
}
