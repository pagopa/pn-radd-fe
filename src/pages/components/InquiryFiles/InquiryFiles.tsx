import { Grid, Paper, Box } from "@mui/material"
import { useReducer } from "react"
import TitleBox from "../Title/TitleBox"
import { DocumentInquiryType } from "../../../redux/document-inquiry/types"
import InquiryFilesUpload from "./InquiryFilesUpload"
import InquiryFilesStartTransaction from "./InquiryFilesStartTransaction"
import InquiryFilesWaitTransaction from "./InquiryFilesWaitTransaction"
import { InquiryFilesState, Phases, inquiryFilesReducer } from "./inquiryFilesReducer"

type Props = {
    onConfirm: () => void,
    inquiryType: DocumentInquiryType
}

const initialState : InquiryFilesState = {
    phase: Phases.UPLOAD_PHASE
}

const InquiryFiles = ({ onConfirm, inquiryType } : Props) => {
    const [data, dispatch] = useReducer(inquiryFilesReducer, initialState);

    return (
        <Grid item xs={12}>
            <Paper>
                <Box p={2}>
                    <TitleBox title={"Carica Documentazione"} variantTitle={"h6"} />

                    { data.phase === Phases.UPLOAD_PHASE && <InquiryFilesUpload parentDispatch={dispatch} /> }
                    { data.phase === Phases.START_TRANSACTION && <InquiryFilesStartTransaction onConfirm={onConfirm} parentDispatch={dispatch} inquiryType={inquiryType} /> }
                    { data.phase === Phases.WAIT_TRANSACTION && <InquiryFilesWaitTransaction onConfirm={onConfirm} parentDispatch={dispatch} inquiryType={inquiryType} retryAfter={data.retryAfter!} /> }
                </Box>
            </Paper>
        </Grid>
    )
}

export default InquiryFiles;