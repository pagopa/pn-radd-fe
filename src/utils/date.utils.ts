import { format } from 'date-fns';

export const DATE_FORMAT = 'dd/MM/yyyy';
export const FULL_DATE_FORMAT = 'dd/MM/yyyy HH:mm:ss';

const DATE_FORMAT_TIMEZONE = "yyyy-MM-dd'T'00:mm:ss.SSS'Z'";

export const today = new Date();

export function formatToTimezoneString(date: Date): string {
  return format(date, DATE_FORMAT_TIMEZONE);
}

export function formatString(date?: string): string {
  if (!date) {
    return '';
  }

  return format(new Date(date), FULL_DATE_FORMAT);
}
