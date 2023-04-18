import { Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { DocumentInquiryType } from '../../../redux/document-inquiry/types';
import { useAppDispatch } from '../../../redux/hooks';
import { startTransaction, uploadFile } from '../../../redux/document-inquiry/actions';
import { WaitingPhasePayload } from './inquiryFilesReducer';

type Props = {
  onError: () => void;
  onNext: () => void;
  inquiryType: DocumentInquiryType;
  uploadData: WaitingPhasePayload;
};

const InquiryFilesWaitTransaction = ({ onError, onNext, inquiryType, uploadData }: Props) => {
  const [retries, setRetries] = useState<number>(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let didCancel = false;
    const uploadProcess = async () => {
      try {
        await dispatch(uploadFile(uploadData)).unwrap();
      } catch (error) {
        onError();
      }
    };

    const transactionProcess = async () => {
      try {
        const transactionResponse = await dispatch(startTransaction({ inquiryType })).unwrap();

        if (!didCancel) {
          if (
            transactionResponse.status?.code === 2 &&
            transactionResponse.status.retryAfter !== 0
          ) {
            window.setTimeout(
              () => setRetries((oldRetries) => oldRetries + 1),
              transactionResponse.status.retryAfter
            );
          } else {
            onNext();
          }
        }
      } catch (error) {
        onError();
      }
    };

    if (retries == 0) {
      uploadProcess();
      transactionProcess();
    } else {
      transactionProcess();
    }

    return () => {
      didCancel = true;
    };
  }, [retries]);

  return (
    <>
      <Box sx={{ minHeight: '300px', height: '100%', display: 'flex' }}>
        <Box sx={{ margin: 'auto', textAlign: 'center' }}>
          <CircularProgress />
          <Typography
            variant="body1"
            color="text.primary"
            fontWeight={600}
            sx={{ margin: '20px 0 10px 0' }}
          >
            Stiamo caricando i documenti
          </Typography>
          <Typography variant="body2" color="text.primary">
            Attendi qualche secondo
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default InquiryFilesWaitTransaction;
