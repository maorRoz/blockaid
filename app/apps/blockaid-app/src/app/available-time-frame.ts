export const AVAILABLE_TIME_FRAMES = [
  'seconds',
  'minutes',
  'hours',
  'days',
] as const;

export type AvailableTimeFrame = (typeof AVAILABLE_TIME_FRAMES)[number];
