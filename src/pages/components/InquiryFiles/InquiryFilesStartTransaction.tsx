import { Typography, Button, Grid, Box } from "@mui/material"
import { InquiryFilesAction, waitTransactionAction } from "./inquiryFilesReducer"
import { useAppDispatch } from "../../../redux/hooks"
import { startTransaction } from "../../../redux/document-inquiry/actions"
import { DocumentInquiryType } from "../../../redux/document-inquiry/types"
import { IllusCompleted } from "@pagopa/mui-italia"

type Props = {
    parentDispatch: React.Dispatch<InquiryFilesAction>,
    onConfirm: () => void,
    inquiryType: DocumentInquiryType
}

const InquiryFilesStartTransaction = ({parentDispatch, onConfirm, inquiryType}: Props) => {
    const dispatch = useAppDispatch();
    const handleClick = () => {
        dispatch(startTransaction({inquiryType}))
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
                    <IllusCompleted />
                    <Typography variant="body1" color="text.primary" sx={{ margin: '20px 0 10px 0' }}>
                        L'upload è stato completato con successo
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        Per completare la richiesta è necessario stampare tutti gli atti.
                    </Typography>
                </Box>
            </Box>
            <Grid container mt={2} direction="row-reverse">
                <Button variant="contained" sx={{ marginTop: '30px' }} onClick={handleClick}>
                    Ottieni atti
                </Button>
            </Grid>
        </>
    )
}

export default InquiryFilesStartTransaction