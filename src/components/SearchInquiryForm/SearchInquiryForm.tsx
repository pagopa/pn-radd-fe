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
  Button,
} from '@mui/material';
import currentLocale from 'date-fns/locale/it';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';
import { DATE_FORMAT, today } from '../../utils/date.utils';
import CustomDatePicker, { DatePickerTypes } from '../CustomDatePicker/CustomDatePicker';
import { defaultRequiredMessage, dataRegex } from '../../utils/string.utils';
import { DocumentInquiryType } from '../../redux/document-inquiry/types';
import { SearchType, InquirySearchForm } from '../../redux/inquiry-history/types';
import { useAppDispatch } from '../../redux/hooks';
import { searchInquiry } from '../../redux/inquiry-history/actions';
import { SEARCH_INQUIRY_RESULT } from '../../navigation/routes.const';

const formValidationSchema = yup.object().shape({
  iun: yup.string().when('searchType', {
    is: (searchType: SearchType) => searchType === SearchType.IUN,
    then: (schema) => schema.required(defaultRequiredMessage('IUN')),
  }),
  taxId: yup.string().when('searchType', {
    is: (searchType: SearchType) => searchType === SearchType.TAX_ID,
    then: (schema) =>
      schema
        .required(defaultRequiredMessage('Codice Fiscale'))
        .matches(RegExp(dataRegex.fiscalCode), 'Codice Fiscale invalido'),
  }),
  operationId: yup.string().when('searchType', {
    is: (searchType: SearchType) => searchType === SearchType.OPERATION_ID,
    then: (schema) => schema.required(defaultRequiredMessage('Id Operazione')),
  }),
});

const SearchInquiryForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values: InquirySearchForm) => {
    void dispatch(searchInquiry(values))
      .unwrap()
      .then((res) => {
        if (res.result) {
          navigate(SEARCH_INQUIRY_RESULT);
        }
      });
  };

  const form = useFormik<InquirySearchForm>({
    initialValues: {
      inquiryType: DocumentInquiryType.ACT,
      iun: '',
      operationId: '',
      taxId: '',
      searchType: SearchType.IUN,
      from: null,
      to: null,
    },
    validationSchema: formValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleSearchTypeChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    form.resetForm({
      values: {
        ...form.values,
        inquiryType: form.values.inquiryType,
        [event.target.name]: event.target.value,
      },
    });
  };

  return (
    <Grid item xs={12}>
      <Paper>
        <Box p={2}>
          <form onSubmit={form.handleSubmit}>
            <Grid container rowSpacing={2}>
              <Grid container item>
                <Grid item xs={10}>
                  <FormControl margin="none" fullWidth>
                    <FormLabel id="search-type-label">
                      <Typography fontWeight={600} fontSize={16}>
                        Tipo richiesta:
                      </Typography>
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="inquiry-type-label"
                      name="inquiryType"
                      row
                      value={form.values.inquiryType}
                      onChange={form.handleChange}
                    >
                      <FormControlLabel
                        value={DocumentInquiryType.ACT}
                        control={<Radio />}
                        label={'Documenti allegati e attestazioni opponibili a terzi'}
                        data-testid="inquiryTypeAct"
                      />
                      <FormControlLabel
                        value={DocumentInquiryType.AOR}
                        control={<Radio />}
                        label={'Avvisi di avvenuta ricezione'}
                        data-testid="inquiryTypeAor"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container item>
                <Grid item xs={10}>
                  <FormControl margin="none" fullWidth>
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
                  <Grid item xs={4}>
                    <TextField
                      id="iun"
                      name="iun"
                      label={'IUN*'}
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
                  <Grid item xs={4}>
                    <TextField
                      id="operationId"
                      name="operationId"
                      label={'Id Operazione*'}
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
                <Grid container item spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      id="taxId"
                      name="taxId"
                      label={'Codice Fiscale*'}
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
                      dateAdapter={AdapterDateFns}
                      adapterLocale={currentLocale}
                    >
                      <CustomDatePicker
                        label={'Dal'}
                        format={DATE_FORMAT}
                        value={form.values.from}
                        onChange={(value: DatePickerTypes) => {
                          form.setFieldValue('from', value || today).catch(() => 'error');
                        }}
                        slotProps={{
                          textField: {
                            name: 'from',
                            id: 'from',
                            fullWidth: true,
                            inputProps: {
                              inputMode: 'text',
                              'aria-label': 'Dal',
                              type: 'text',
                              placeholder: 'gg/mm/aaaa',
                            },
                          },
                        }}
                        disableFuture={true}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={4}>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      adapterLocale={currentLocale}
                    >
                      <CustomDatePicker
                        label={'Al'}
                        format={DATE_FORMAT}
                        value={form.values.to}
                        onChange={(value: DatePickerTypes) => {
                          form.setFieldValue('to', value || today).catch(() => 'error');
                        }}
                        slotProps={{
                          textField: {
                            name: 'to',
                            id: 'to',
                            fullWidth: true,
                            inputProps: {
                              inputMode: 'text',
                              'aria-label': 'Al',
                              type: 'text',
                              placeholder: 'gg/mm/aaaa',
                            },
                          },
                        }}
                        disableFuture={true}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              )}
            </Grid>

            <Grid container direction={'row-reverse'} mt={3}>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={!form.dirty || !form.isValid || form.isSubmitting}
                >
                  Cerca
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Grid>
  );
};

export default SearchInquiryForm;