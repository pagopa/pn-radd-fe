import DateFnsAdapter from "date-fns";

// const dateFns = new DateFnsAdapter();

export const DATE_FORMAT = "dd/MM/yyyy";

const DATE_FORMAT_TIMEZONE = "yyyy-MM-dd'T'00:mm:ss.SSS'Z'";

export const today = new Date();

// export function formatToTimezoneString(date: Date): string {
//   return dateFns.formatByString(date, DATE_FORMAT_TIMEZONE);
// }