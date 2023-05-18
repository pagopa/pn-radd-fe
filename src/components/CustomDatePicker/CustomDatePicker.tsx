import { CalendarPickerView, DesktopDatePicker, DesktopDatePickerProps } from '@mui/lab';
// import { DesktopDatePicker, DesktopDatePickerProps } from '@mui/x-date-pickers/DesktopDatePicker';

export type DatePickerTypes = Date | null;

const CustomDatePicker = (
  props: DesktopDatePickerProps<DatePickerTypes> & React.RefAttributes<HTMLDivElement>
) => (
  <DesktopDatePicker
    {...props}
    leftArrowButtonText="Vai al mese precedente" // deprecated
    rightArrowButtonText="Vai al mese successivo" // deprecated
    getViewSwitchingButtonText={(view: CalendarPickerView) =>
      view === 'year'
        ? "modalità di scelta dell'anno attiva, passa alla modalità calendario"
        : "modalità calendario attiva, passa alla modalità di scelta dell'anno"
    }
    getOpenDialogAriaText={(value: Date, utils: any) => {
      if (value instanceof Date && !isNaN(value.getTime())) {
        const date = utils.format(utils.date(value), 'fullDate');
        return `Scegli data, la data selezionata è ${date}`;
      }
      return 'Scegli data';
    }}
  />
);

export default CustomDatePicker;
