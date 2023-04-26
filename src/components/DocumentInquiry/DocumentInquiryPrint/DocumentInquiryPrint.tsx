import { Grid, Paper, Box, Button, Alert } from '@mui/material';
import { useState } from 'react';
import TitleBox from '../../Title/TitleBox';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { urlListSelector } from '../../../redux/document-inquiry/slice';
import { completeTransaction } from '../../../redux/document-inquiry/actions';
import { DocumentInquiryType } from '../../../redux/document-inquiry/types';
import AttachmentDownloader from './AttachmentDownloader';

type Props = {
  title: string;
  onConfirm: () => void;
  inquiryType: DocumentInquiryType;
};

const DocumentInquiryPrint = ({ title, inquiryType, onConfirm }: Props) => {
  const [completedDownload, setCompletedDownload] = useState<Array<string>>([]);
  const dispatch = useAppDispatch();
  const attachments = useAppSelector(urlListSelector);

  const handleSubmit = () => {
    dispatch(completeTransaction({ inquiryType }))
      .unwrap()
      .then(() => {
        onConfirm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDownload = (url: string) => {
    setCompletedDownload([...completedDownload, url]);
  };

  const canComplete = completedDownload.length === attachments.length;

  return (
    <Grid item xs={12}>
      <Paper>
        <Box p={2}>
          <TitleBox title={title} variantTitle={'h6'} />

          <Grid container mt={2} mb={2}>
            <Grid item xs={12}>
              <Alert severity="info">Assicurati di scaricare tutti i documenti.</Alert>
            </Grid>
          </Grid>

          {attachments.map((attachmentUrl, index) => (
            <Grid container key={attachmentUrl}>
              <Grid item xs={6}>
                <AttachmentDownloader
                  clicked={completedDownload.includes(attachmentUrl)}
                  fileName={`Documento ${index + 1}`}
                  fileUrl={attachmentUrl}
                  onDownload={handleDownload}
                />
              </Grid>
            </Grid>
          ))}

          <Grid container mt={2} direction="row-reverse">
            <Button
              disabled={!canComplete}
              color="primary"
              variant="contained"
              onClick={handleSubmit}
            >
              Ho finito
            </Button>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
};

export default DocumentInquiryPrint;
