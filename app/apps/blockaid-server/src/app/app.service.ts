import { Injectable } from '@nestjs/common';
import rawResultsList from './blockaid_results.json';
import { Result } from '@app/types';

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

@Injectable()
export class AppService {
  getData(): Result[] {
    const results = (rawResultsList as RawResult[])
      .map(rawResultToResult);
    return results;
  }
}
