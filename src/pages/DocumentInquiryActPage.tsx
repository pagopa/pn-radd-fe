import { Grid, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import InquiryFiles from './components/InquiryFiles/InquiryFiles';
import PrintAttachments from './components/PrintAttachments/PrintAttachments';
import InquiryForm from './components/InquiryForm/InquiryForm';
import Stepper from './components/Stepper/Stepper';
import TitleBox from './components/Title/TitleBox';
import { DocumentInquiryType } from '../redux/document-inquiry/types';
import { useAppDispatch } from '../redux/hooks';
import { reset } from '../redux/document-inquiry/slice';
import EndInquiry from './components/EndInquiry/EndInquiry';

export const DocumentInquiryActPage = () => {
    const dispatch = useAppDispatch();
    const [activeStep, setActiveStep] = useState<number>(0); 


    const goToNextStep = () => {
        setActiveStep( currentStep => currentStep + 1 );
    }

    const steps = [
        "Dati richiesta",
        "Carica Documentazione",
        "Stampa atti"
    ];

    useEffect(() => {
        return () => { dispatch(reset()) };
    },[])

    if(activeStep === 3) {
        return <EndInquiry />
    }

    return (
        <Stack spacing={2}>
            <Grid container item>
                <TitleBox title={"Richiesta di atti e attestazioni opponibili a terzi"} variantTitle='h4' />
            </Grid>

            <Grid container item>
                <Stepper steps={steps} activeStep={activeStep} />
            </Grid>

            <Grid container justifyContent={'center'}>
                { activeStep === 0 && <InquiryForm onConfirm={goToNextStep} inquiryType={DocumentInquiryType.ACT} /> }
                { activeStep === 1 && <InquiryFiles onConfirm={goToNextStep} inquiryType={DocumentInquiryType.ACT} /> }
                { activeStep === 2 && <PrintAttachments onConfirm={goToNextStep} inquiryType={DocumentInquiryType.ACT} /> }
            </Grid>
        </Stack>
    )
}
