import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ResultsByTimeFrameValues, ResultsStatistics } from '@app/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/resultsStatistics')
  getResultsStatistics(
    @Query()
    query: {
      from: string;
      to: string;
    }
  ): ResultsStatistics {
    return this.appService.getResultsStatistics(query);
  }

  @Get('/resultsByTimeFrameValues')
  getResultsByTimeFrameValues(
    @Query()
    {
      timeFrame,
      from,
      to,
    }: {
      timeFrame?: 'second' | 'minute' | 'hour' | 'day';
      from: string;
      to: string;
    }
  ): ResultsByTimeFrameValues {
    return this.appService.getResultsByTimeFrameValues({
      timeFrame,
      dateRange: { from, to },
    });
  }
}
