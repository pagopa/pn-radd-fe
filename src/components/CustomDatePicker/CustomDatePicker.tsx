// import { CalendarPickerView, DesktopDatePicker, DesktopDatePickerProps } from '@mui/lab';
import { CalendarPickerView } from '@mui/lab';
import { DesktopDatePicker, DesktopDatePickerProps } from '@mui/x-date-pickers/DesktopDatePicker';

export type DatePickerTypes = Date | null;

const CustomDatePicker = (
  props: DesktopDatePickerProps<DatePickerTypes> & React.RefAttributes<HTMLDivElement>
) => (
  <DesktopDatePicker
    {...props}
    localeText={{
      nextMonth: 'Vai al mese successivo',
      previousMonth: 'Vai al mese precedente',
      calendarViewSwitchingButtonAriaLabel: (view) =>
        view === 'year'
          ? "modalità di scelta dell'anno attiva, passa alla modalità calendario"
          : "modalità calendario attiva, passa alla modalità di scelta dell'anno",
      openDatePickerDialogue: (value: any, utils: any) => {
        if (value instanceof Date && !isNaN(value.getTime())) {
          const date = utils.format(utils.date(value), 'fullDate');
          return `Scegli data, la data selezionata è ${date}`;
        }
        return 'Scegli data';
      },
    }}
  />
);

export default CustomDatePicker;
