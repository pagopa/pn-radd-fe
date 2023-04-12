import { Grid, Paper, Box, Button, Link, Alert } from "@mui/material"
import TitleBox from "../Title/TitleBox"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { urlListSelector } from "../../../redux/document-inquiry/slice"
import { completeTransaction } from "../../../redux/document-inquiry/actions"
import { DocumentInquiryType } from "../../../redux/document-inquiry/types"
import ControlledLink from "./ControlledLink"

type Props = {
    onConfirm: () => void,
    inquiryType: DocumentInquiryType
}

const PrintAttachments = ({ onConfirm, inquiryType } : Props) => {
    const dispatch = useAppDispatch();
    const attachments = useAppSelector(urlListSelector);
    
    const handleSubmit = () => {
        dispatch(completeTransaction({inquiryType}))
            .unwrap()
            .then(res => {onConfirm()})
    }

    const handleClick = () => {

    }

    return (
        <Grid item xs={12}>
            <Paper>
                <Box p={2}>
                    <TitleBox title={"Stampa atti"} variantTitle={"h6"} />

                    <ul>
                        {attachments.map(attachmentUrl => <li key={attachmentUrl}><Link href={attachmentUrl}>{attachmentUrl}</Link></li>)}
                    </ul>

                    <Alert severity="info">Prima di poter terminare la richiesta è necessario cliccare su tutti i link.</Alert>

                    <Grid container mt={2} direction="row-reverse">
                        <Button color="primary" variant="contained" onClick={handleSubmit}>
                            Termina richiesta
                        </Button>
                    </Grid>
                </Box>
            </Paper>
        </Grid>
    )
}

export default PrintAttachments