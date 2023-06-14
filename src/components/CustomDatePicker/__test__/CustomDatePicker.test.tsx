import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import currentLocale from 'date-fns/locale/it';

import { render } from '../../../test-utils';
import CustomDatePicker from '../CustomDatePicker';
import { fireEvent } from '@testing-library/react';

const WrappedCustomDatePicker = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={currentLocale}>
      <CustomDatePicker
        label={'DatePicker'}
        onChange={() => {}}
        value={new Date()}
        slotProps={{
          textField: {
            name: 'startDate',
            id: 'startDate',
            fullWidth: true,
            inputProps: {
              inputMode: 'text',
              'aria-label': 'Dal',
              type: 'text',
              placeholder: 'datepickerinputa',
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

describe('test CustomDatePicker component', () => {
  it('renders the component', () => {
    const result = render(<WrappedCustomDatePicker />);
    const input = result.getByPlaceholderText(/datepickerinput/i);

    expect(result.container).toHaveTextContent(/datepicker/i);
    fireEvent.click(input);
  });
});
