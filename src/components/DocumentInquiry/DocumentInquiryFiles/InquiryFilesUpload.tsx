import { Grid, Button, Typography } from '@mui/material';
import JSZip from 'jszip';
import { v4 as uuidv4 } from 'uuid';
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE, calcSha256String } from '../../../utils/file.utils';
import FileUpload from '../../FileUpload/FileUpload';
import {
  DocumentType,
  InquiryFile,
  UploadFilePayload,
  WaitingPhasePayload,
} from './reducer/inquiryFilesReducer';

type Props = {
  files: InquiryFile;
  onNext: (payload: WaitingPhasePayload) => void;
  onUpload: (payload: UploadFilePayload) => void;
  onRemove: (payload: DocumentType) => void;
};

const InquiryFilesUpload = ({ files, onNext, onUpload, onRemove }: Props) => {
  const requiredFilesUploaded = files['recipient-id'] !== undefined;

  const handleSubmit = () => {
    const zip = new JSZip();

    const fileTypes = Object.keys(files) as Array<DocumentType>;
    fileTypes.forEach((fileType) => {
      zip.file(files[fileType]!.name, files[fileType]!);
    });

    zip
      .generateAsync({ type: 'blob' })
      .then(async function (blob) {
        // FileSaver.saveAs(blob, "hello.zip");
        const checksum = await calcSha256String(blob).then((sha) => sha.hashBase64);
        const bundleId = uuidv4();
        onNext({ bundleId, checksum, zip: blob });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpload = (file: any, type: DocumentType) => {
    onUpload({ file, type });
  };

  const handleRemove = (type: DocumentType) => {
    onRemove(type);
  };

  return (
    <>
      <Grid container justifyContent={'center'} mt={2}>
        <Grid item xs={10}>
          <Typography fontWeight={600}>
            Carica il documento di riconoscimento del destinatario*
          </Typography>
          <FileUpload
            uploadText="Trascina qui il tuo documento oppure"
            accept={ALLOWED_MIME_TYPES}
            maxFileSize={MAX_FILE_SIZE}
            onFileUploaded={(file: any) => {
              handleUpload(file, 'recipient-id');
            }}
            onRemoveFile={() => {
              handleRemove('recipient-id');
            }}
            file={files['recipient-id']}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent={'center'} mt={2}>
        <Grid item xs={10}>
          <Typography fontWeight={600}>
            Carica il documento di riconoscimento del delegato
          </Typography>
          <FileUpload
            uploadText="Trascina qui il tuo documento oppure"
            accept={ALLOWED_MIME_TYPES}
            maxFileSize={MAX_FILE_SIZE}
            onFileUploaded={(file: any) => {
              handleUpload(file, 'delegate-id');
            }}
            onRemoveFile={() => {
              handleRemove('delegate-id');
            }}
            file={files['delegate-id']}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent={'center'} mt={2}>
        <Grid item xs={10}>
          <Typography fontWeight={600}>Modulo di delega</Typography>
          <FileUpload
            uploadText="Trascina qui il tuo documento oppure"
            maxFileSize={MAX_FILE_SIZE}
            accept={ALLOWED_MIME_TYPES}
            onFileUploaded={(file: any) => {
              handleUpload(file, 'delegate-act');
            }}
            onRemoveFile={() => {
              handleRemove('delegate-act');
            }}
            file={files['delegate-act']}
          />
        </Grid>
      </Grid>

      <Grid container mt={2} direction="row-reverse">
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          disabled={!requiredFilesUploaded}
        >
          Continua
        </Button>
      </Grid>
    </>
  );
};

export default InquiryFilesUpload;
