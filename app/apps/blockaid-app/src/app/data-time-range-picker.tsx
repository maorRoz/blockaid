import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimeRangePicker as BaseDateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker';
import { SingleInputDateTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputDateTimeRangeField';

export interface DataTimeRangePickerProps {
  dateRange?: { from: string; to: string };
  onDateRangeChange: (dateRange: { from?: string; to?: string }) => void;
}

export const DataTimeRangePicker = ({
  dateRange,
  onDateRangeChange,
}: DataTimeRangePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BaseDateTimeRangePicker
        value={dateRange && [dayjs(dateRange.from), dayjs(dateRange.to)]}
        slots={{ field: SingleInputDateTimeRangeField }}
        sx={{ minWidth: 400, bgcolor: 'white' }}
        onChange={(time) => {
          onDateRangeChange({
            from: time[0]?.toISOString(),
            to: time[1]?.toISOString(),
          });
        }}
      />
    </LocalizationProvider>
  );
};
