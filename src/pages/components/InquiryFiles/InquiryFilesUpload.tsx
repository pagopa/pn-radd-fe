import { Grid, Paper, Box, Button, Divider } from "@mui/material"
import { useState } from "react"
import TitleBox from "../Title/TitleBox"
import UploadBox from "../UploadBox/UploadBox"
import AttachmentBox from "./AttachmentBox"
import { ALLOWED_MIME_TYPES, calcSha256String } from "../../../utils/file.utils"
import { DocumentInquiryType } from "../../../redux/document-inquiry/types"
import JSZip from 'jszip'
import FileSaver from "file-saver"
import { v4 as uuidv4 } from 'uuid'
import { uploadFile } from '../../../redux/document-inquiry/actions'
import { useAppDispatch } from "../../../redux/hooks"
import AttachmentContainer from "./AttachmentContainer"
import { DocumentOwner, UploadFilePayload, WaitingPhasePayload } from "./inquiryFilesReducer"

type Props = {
    onNext: (payload: WaitingPhasePayload) => void,
    onUpload: (payload: UploadFilePayload) => void,
    onRemove: (payload: DocumentOwner) => void
}

const InquiryFilesUpload = ({ onNext, onUpload, onRemove } : Props) => {
    const [fileList, setFileList] = useState<Array<File>>([]);

    const handleUpload = (file: File, sha256?: { hashBase64: string; hashHex: string }) => {

        setFileList([...fileList, file]);
    }

    const handleRemove = (fileToBeRemoved: File) => {
        setFileList(fileList.filter((file) => file.name !== fileToBeRemoved.name));
    }

    const handleSubmit = () => {
        const zip = new JSZip();
        fileList.forEach((file) => {zip.file(file.name, file)});

        zip.generateAsync({type:"blob"})
            .then(async function (blob) {
                //FileSaver.saveAs(blob, "hello.zip");
                const checksum = await calcSha256String(blob).then(sha => sha.hashBase64);
                const bundleId = uuidv4();
                onNext({ bundleId, checksum, zip: blob});
                // dispatch(uploadFile())
                //     .unwrap()
                //     .then((response) => {
                //         parentDispatch(startTransactionAction());
                //     })
            });
    }

    return (
        <>
            <Grid container justifyContent={"center"} rowSpacing={1}>
                <Grid item xs={10}>
                    <AttachmentContainer fileList={fileList} onRemove={handleRemove} />
                </Grid>
            </Grid>
            
            <Grid container justifyContent={"center"} mt={2}>
                <Grid item xs={10}>
                    <UploadBox 
                        uploadText="Trascina i file qui o scegli dal sistema" 
                        accept={ALLOWED_MIME_TYPES}
                        onFileUploaded={handleUpload}
                        calcSha256={true}
                    />
                </Grid>
            </Grid>

            <Grid container mt={2} direction="row-reverse">
                <Button color="primary" variant="contained" onClick={handleSubmit} disabled={fileList.length == 0}>
                    Continua
                </Button>
            </Grid>
        </>
    )
}

export default InquiryFilesUpload;