import {
  Grid,
  Paper,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  TextField,
  TextFieldProps,
} from '@mui/material';
import currentLocale from 'date-fns/locale/it';
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LocalizationProvider } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DATE_FORMAT, today } from '../../utils/date.utils';
import CustomDatePicker, { DatePickerTypes } from '../CustomDatePicker/CustomDatePicker';
import { defaultRequiredMessage, dataRegex } from '../../utils/string.utils';

type FormType = {
  iun?: string;
  operationId: string;
  taxId: string;
  searchType: SearchType;
  from: string;
  to: string;
};

enum SearchType {
  IUN = 'IUN',
  OPERATION_ID = 'OPERATION_ID',
  TAX_ID = 'TAX_ID',
}

const formValidationSchema = yup.object().shape({
  iun: yup.string().when('searchType', {
    is: (searchType: SearchType) => searchType === SearchType.IUN,
    then: (schema) => schema.required(defaultRequiredMessage('IUN')),
  }),
  taxId: yup.string().when('searchType', {
    is: (searchType: SearchType) => searchType === SearchType.TAX_ID,
    then: (schema) =>
      schema
        .required(defaultRequiredMessage('Id Operazione'))
        .matches(RegExp(dataRegex.fiscalCode), 'Codice fiscale invalido'),
  }),
  operationId: yup.string().when('searchType', {
    is: (searchType: SearchType) => searchType === SearchType.OPERATION_ID,
    then: (schema) => schema.required(defaultRequiredMessage('Id Operazione')),
  }),
});

const SearchInquiryForm = () => {
  const handleSubmit = (values: FormType) => {};

  const form = useFormik<FormType>({
    initialValues: {
      iun: '',
      operationId: '',
      taxId: '',
      searchType: SearchType.IUN,
      from: '',
      to: '',
    },
    validationSchema: formValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleSearchTypeChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    void form.setFieldValue('searchType', event.target.value as SearchType);
  };
  return (
    <Grid item xs={12}>
      <Paper>
        <Box p={2}>
          <form onSubmit={form.handleSubmit}>
            <Grid container rowSpacing={2}>
              <Grid container item justifyContent={'center'}>
                <Grid item xs={10}>
                  <FormControl margin="normal" fullWidth>
                    <FormLabel id="search-type-label">
                      <Typography fontWeight={600} fontSize={16}>
                        Ricerca per:
                      </Typography>
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="search-type-label"
                      name="searchType"
                      row
                      value={form.values.searchType}
                      onChange={handleSearchTypeChange}
                    >
                      <FormControlLabel
                        value={SearchType.IUN}
                        control={<Radio />}
                        label={'IUN'}
                        data-testid="recipientTypeIun"
                      />
                      <FormControlLabel
                        value={SearchType.OPERATION_ID}
                        control={<Radio />}
                        label={'Id Operazione'}
                        data-testid="recipientTypeOperationId"
                      />
                      <FormControlLabel
                        value={SearchType.TAX_ID}
                        control={<Radio />}
                        label={'Codice Fiscale'}
                        data-testid="recipientTypeTaxId"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>

              {form.values.searchType === SearchType.IUN && (
                <Grid container item>
                  <Grid item xs={6}>
                    <TextField
                      id="iun"
                      name="iun"
                      label={'IUN'}
                      variant="outlined"
                      value={form.values.iun}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      error={form.touched.iun && Boolean(form.errors.iun)}
                      helperText={form.touched.iun && form.errors.iun}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              )}

              {form.values.searchType === SearchType.OPERATION_ID && (
                <Grid container item>
                  <Grid item xs={6}>
                    <TextField
                      id="operationId"
                      name="operationId"
                      label={'Id Operazione'}
                      variant="outlined"
                      value={form.values.operationId}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      error={form.touched.operationId && Boolean(form.errors.operationId)}
                      helperText={form.touched.operationId && form.errors.operationId}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              )}

              {form.values.searchType === SearchType.TAX_ID && (
                <Grid container item>
                  <Grid item xs={4}>
                    <TextField
                      id="taxId"
                      name="taxId"
                      label={'Codice Fiscale'}
                      variant="outlined"
                      value={form.values.taxId}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      error={form.touched.taxId && Boolean(form.errors.taxId)}
                      helperText={form.touched.taxId && form.errors.taxId}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <LocalizationProvider
                      id="endDate"
                      name="endDate"
                      dateAdapter={AdapterDateFns}
                      adapterLocale={currentLocale}
                    >
                      <CustomDatePicker
                        label={'dal'}
                        inputFormat={DATE_FORMAT}
                        value={form.values.from}
                        onChange={(value: DatePickerTypes) => {
                          form.setFieldValue('from', value || today).catch(() => 'error');
                        }}
                        renderInput={(params: TextFieldProps) => (
                          <TextField
                            id="from"
                            name="endDate"
                            {...params}
                            fullWidth
                            size="small"
                            aria-label={'Dal'}
                            inputProps={{
                              ...params.inputProps,
                              inputMode: 'text',
                              'aria-label': 'Dal',
                              type: 'text',
                              placeholder: 'gg/mm/aaaa',
                            }}
                          />
                        )}
                        disableFuture={true}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </form>
        </Box>
      </Paper>
    </Grid>
  );
};

export default SearchInquiryForm;
