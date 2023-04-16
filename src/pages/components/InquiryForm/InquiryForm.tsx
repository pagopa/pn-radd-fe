import { useFormik } from 'formik';
import * as yup from 'yup';
import { defaultRequiredMessage } from '../../../utils/form.utils';
import { useAppDispatch } from '../../../redux/hooks'
import { startInquiry } from '../../../redux/document-inquiry/actions'
import { DocumentInquiryType } from '../../../redux/document-inquiry/types';

import { Grid, TextField, Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography, InputAdornment, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import TitleBox from '../Title/TitleBox';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

type Props = {
  onConfirm: () => void,
  inquiryType: DocumentInquiryType
}

type FormType = {
  iun: string,
  recipientTaxId: string,
  delegateTaxId: string,
  recipientType: RecipientType
}

enum RecipientType {
  PERSONA_FISICA = "PF",
  PERSONA_GIURIDICA = "PG"
}

const formValidationSchema = yup.object().shape({
  iun: yup.string().required(defaultRequiredMessage("IUN")),
  recipientTaxId: yup.string().required(defaultRequiredMessage("Codice fiscale")).matches(RegExp("^([A-Z]{6}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1})$"), "Codice fiscale invalido"),
  delegateTaxId: yup.string().matches(RegExp("^([A-Z]{6}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1})$"), "Codice fiscale invalido"),
  recipientType: yup.string().required(defaultRequiredMessage("Tipologia destinatario"))
});

const InfoIconWithTooltip = ({title} : {title: string}) => <Tooltip title={title}><InfoOutlinedIcon /></Tooltip>

const InquiryForm = ({ onConfirm, inquiryType } : Props) => {
  const dispatch = useAppDispatch();

  const handleSubmit = (values: FormType) => {
    const {iun, recipientTaxId, recipientType, delegateTaxId} = values;
    dispatch(startInquiry({delegateTaxId, inquiryType, recipientTaxId, recipientType, qrCode: iun}))
      .unwrap()
      .then(res => {
        if(res.result)
          onConfirm();
      })
  }

  const form = useFormik<FormType>({
    initialValues: {
      iun: '',
      recipientTaxId: '',
      delegateTaxId: '',
      recipientType: RecipientType.PERSONA_FISICA
    },
    validationSchema: formValidationSchema,
    onSubmit: handleSubmit
  });

  const recipientTaxIdLabel = form.values.recipientType === RecipientType.PERSONA_FISICA ? "Codice Fiscale destinatario*" : "Codice Fiscale o Partita IVA destinatario*" 

  return (
    <>
      <Grid item xs={12}>
        <Paper>
          <Box p={2}>
            <TitleBox title={"Dati richiesta"} variantTitle={"h6"} />
            
            <form onSubmit={form.handleSubmit}>
              <Grid container rowSpacing={2}>
                <Grid item xs={6}>
                  <TextField 
                    id="iun" 
                    name="iun"
                    label="Codice IUN*" 
                    variant="outlined" 
                    value={form.values.iun} 
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={form.touched.iun && Boolean(form.errors.iun)}
                    helperText={form.touched.iun && form.errors.iun}
                    fullWidth
                    InputProps={{
                      endAdornment: <InputAdornment position="end">
                        <InfoIconWithTooltip title="Lo trovi nell'avviso di avvenuta ricezione, di fianco al Codice QR." />
                      </InputAdornment>
                    }}
                  />
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>

                  <FormControl margin="normal" fullWidth>
                    <FormLabel id="recipient-type-label">
                      <Typography fontWeight={600} fontSize={16}>
                        Tipologia destinatario*
                      </Typography>
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="recipient-type-label"
                      name="recipientType"
                      row
                      value={form.values.recipientType}
                      onChange={form.handleChange}
                    >
                      <FormControlLabel
                        value={RecipientType.PERSONA_FISICA}
                        control={<Radio />}
                        label={"Persona fisica"}
                        data-testid="recipientTypePf"
                      />
                      <FormControlLabel
                        value={RecipientType.PERSONA_GIURIDICA}
                        control={<Radio />}
                        label={"Persona giuridica"}
                        data-testid="recipientTypePf"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <TextField 
                    id="recipientTaxId"
                    name="recipientTaxId"
                    label={recipientTaxIdLabel}
                    variant="outlined" 
                    value={form.values.recipientTaxId} 
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={form.touched.recipientTaxId && Boolean(form.errors.recipientTaxId)}
                    helperText={form.touched.recipientTaxId && form.errors.recipientTaxId}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <TextField 
                    id="delegateTaxId"
                    name="delegateTaxId"
                    label="Codice Fiscale delegato"
                    variant="outlined" 
                    value={form.values.delegateTaxId} 
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={form.touched.delegateTaxId && Boolean(form.errors.delegateTaxId)}
                    helperText={form.touched.delegateTaxId && form.errors.delegateTaxId}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>

              <Grid container direction={"row-reverse"} mt={3}>
                <Grid item>
                  <Button color="primary" variant="contained" type="submit"  disabled={!form.isValid}>
                    Continua
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Grid>
      
      
    </>
  )
}

export default InquiryForm