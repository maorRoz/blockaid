import { Result, ResultsByTimeFrameValues } from '@app/types';
import dayjs from 'dayjs';

export const getResultsPerTimeFrame = ({
  timeFrame = 'hour',
  results,
}: {
  timeFrame?: 'second' | 'minute' | 'hour' | 'day';
  results: Result[];
}): ResultsByTimeFrameValues => {
  return results.reduce((acc: ResultsByTimeFrameValues, result) => {
    const currentTimeFrame = dayjs(result.startedAt)
      .startOf(timeFrame)
      .valueOf();

    acc[currentTimeFrame] ??= { malicious: 0, benign: 0 };

    if (result.isMalicious) {
      acc[currentTimeFrame].malicious++;
    } else {
      acc[currentTimeFrame].benign++;
    }

    return acc;
  }, {});
};
