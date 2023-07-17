import { format } from 'date-fns';

export const IT_DATE_FORMAT = 'dd/MM/yyyy';
export const IT_FULL_DATE_FORMAT = 'dd/MM/yyyy HH:mm:ss';

const DATE_FORMAT_TIMEZONE = "yyyy-MM-dd'T'00:mm:ss.SSS'Z'";

export const today = new Date();

export function formatToTimezoneString(date: Date): string {
  return format(date, DATE_FORMAT_TIMEZONE);
}

/**
 * 
 * @param isoStringDate string which represents a date in iso format eg(2011-08-12T20:17:46.384Z)
 * @param outputFormat output format desired (if not passed, dd/MM/yyyy format is used )
 * @returns formatted date
 */
export function formatIsoString(isoStringDate?: string, outputFormat = IT_FULL_DATE_FORMAT): string {
  if (!isoStringDate) {
    return '';
  }

  const OUTPUT_FORMAT = outputFormat ?? IT_FULL_DATE_FORMAT;

  return format(new Date(isoStringDate), OUTPUT_FORMAT);
}