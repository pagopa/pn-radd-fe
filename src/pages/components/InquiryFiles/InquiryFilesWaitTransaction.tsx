import { Typography, Button, Grid, Box } from "@mui/material"
import { InquiryFilesAction, waitTransactionAction } from "./inquiryFilesReducer"
import { DocumentInquiryType } from "../../../redux/document-inquiry/types"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { startTransaction } from "../../../redux/document-inquiry/actions"
import { useEffect, useState } from "react"
import { operationIdSelector } from "../../../redux/document-inquiry/slice"
import { IllusQuick } from "@pagopa/mui-italia"
import { LoadingButton } from "@mui/lab"

type Props = {
    parentDispatch: React.Dispatch<InquiryFilesAction>,
    onConfirm: () => void,
    inquiryType: DocumentInquiryType,
    retryAfter: number
}

const InquiryFilesWaitTransaction = ({parentDispatch, onConfirm, inquiryType, retryAfter}: Props) => {
    const previousOperationId = useAppSelector(operationIdSelector);
    const [remainingTime, setRemainingTime] = useState<number>(Math.ceil(retryAfter/1000));
    const isTimerActive = remainingTime > 0;

    const calculateTimeLeft = () => {
        if(remainingTime > 0) {
            setRemainingTime(remainingTime => remainingTime - 1);
        } else {
            dispatch(startTransaction({inquiryType, previousOperationId }))
                .unwrap()
                .then((res) => {
                    if(res.status?.code === 2 && res.status.retryAfter !== 0) {
                        parentDispatch(waitTransactionAction(res.status.retryAfter!))
                        return;
                    }
                        
                    onConfirm();
                });
        }
    }

    useEffect(() => {
        setRemainingTime(Math.ceil(retryAfter/1000));
    }, [retryAfter])
    
    useEffect(() => {
        const interval = setInterval(calculateTimeLeft, 1000);
        return () => { clearInterval(interval) }
    }, [remainingTime])

    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(startTransaction({inquiryType, previousOperationId }))
            .unwrap()
            .then((res) => {
                if(res.status?.code === 2 && res.status.retryAfter !== 0) {
                    parentDispatch(waitTransactionAction(res.status.retryAfter!))
                    return;
                }
                    
                onConfirm();
            });
    }
    return (
        <>
            <Box sx={{ minHeight: '300px', height: '100%', display: 'flex' }}>
                <Box sx={{ margin: 'auto', textAlign: 'center' }}>
                    <IllusQuick />
                    <Typography variant="body1" color="text.primary" sx={{ margin: '20px 0 10px 0' }}>
                        Ci scusiamo per il disagio
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        Per completare la richiesta è necessario attendere {remainingTime} secondi
                    </Typography>
                </Box>
            </Box>
            {/* <Grid container mt={2} direction="row-reverse">
                <LoadingButton
                    loading={isTimerActive}
                    variant="contained" 
                    sx={{ marginTop: '30px' }} 
                    onClick={handleClick} 
                    disabled={isTimerActive} 
                >
                    Riprova
                </LoadingButton>
            </Grid> */}
        </>
    )
}

export default InquiryFilesWaitTransaction