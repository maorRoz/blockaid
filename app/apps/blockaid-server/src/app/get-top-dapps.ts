import { Result } from '@app/types';

export const getTopDApps = (
  results: Result[]
): (Result & { count: number })[] => {
  const dAppsResultsByUrl: Record<string, Result & { count: number }> =
    results.reduce((acc, result) => {
      acc[result.url] ??= { ...result, count: 0 };

      acc[result.url].count++;

      return acc;
    }, {});

  return Object.values(dAppsResultsByUrl)
    .sort((r1, r2) => r2.count - r1.count)
    .slice(0, 10);
};
