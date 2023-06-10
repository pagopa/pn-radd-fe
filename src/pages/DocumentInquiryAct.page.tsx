import { Box, Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { DocumentInquiryType } from '../redux/document-inquiry/types';
import { useAppDispatch } from '../redux/hooks';
import { reset } from '../redux/document-inquiry/slice';
import DocumentInquiryFiles from '../components/DocumentInquiry/DocumentInquiryFiles/DocumentInquiryFiles';
import DocumentInquiryPrint from '../components/DocumentInquiry/DocumentInquiryPrint/DocumentInquiryPrint';
import DocumentInquiryForm from '../components/DocumentInquiry/DocumentInquiryForm/DocumentInquiryForm';
import Stepper from '../components/Stepper/Stepper';
import TitleBox from '../components/Title/TitleBox';
import EndInquiry from '../components/DocumentInquiry/EndInquiry/EndInquiry';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import { HOMEPAGE } from '../navigation/routes.const';

const breadcrumbsLinks = [
  {
    linkLabel: 'Homepage',
    linkRoute: HOMEPAGE,
  },
];

const DocumentInquiryAct = () => {
  const dispatch = useAppDispatch();
  const [activeStep, setActiveStep] = useState<number>(0);

  const goToNextStep = () => {
    setActiveStep((currentStep) => currentStep + 1);
  };

  const steps = ['Dati della notifica', 'Caricamento documenti', 'Allegati e attestazioni'];

  useEffect(
    () => () => {
      dispatch(reset());
    },
    []
  );

  if (activeStep === 3) {
    return <EndInquiry />;
  }

  return (
    <>
      <Box py={3}>
        <Breadcrumb
          currentLocationLabel="Documenti allegati e attestazioni opponibili a terzi"
          links={breadcrumbsLinks}
        />
      </Box>

      <Stack spacing={2}>
        <Grid container item>
          <TitleBox
            title={'Documenti allegati e attestazioni opponibili a terzi'}
            variantTitle="h4"
          />
        </Grid>

        <Grid container item>
          <Stepper steps={steps} activeStep={activeStep} />
        </Grid>

        <Grid container justifyContent={'center'}>
          {activeStep === 0 && (
            <DocumentInquiryForm
              title={steps[0]}
              onConfirm={goToNextStep}
              inquiryType={DocumentInquiryType.ACT}
            />
          )}
          {activeStep === 1 && (
            <DocumentInquiryFiles
              title={steps[1]}
              onConfirm={goToNextStep}
              inquiryType={DocumentInquiryType.ACT}
            />
          )}
          {activeStep === 2 && (
            <DocumentInquiryPrint
              title={steps[2]}
              onConfirm={goToNextStep}
              inquiryType={DocumentInquiryType.ACT}
            />
          )}
        </Grid>
      </Stack>
    </>
  );
};

export default DocumentInquiryAct;
