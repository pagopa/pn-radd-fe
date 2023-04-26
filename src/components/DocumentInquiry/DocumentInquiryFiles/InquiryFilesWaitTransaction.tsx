import { Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { DocumentInquiryType } from '../../../redux/document-inquiry/types';
import { useAppDispatch } from '../../../redux/hooks';
import {
  startTransaction,
  uploadFileAndStartTransaction,
} from '../../../redux/document-inquiry/actions';
import { StartTransactionResponse } from '../../../api/types';
import { WaitingPhasePayload } from './reducer/inquiryFilesReducer';

type Props = {
  onError: () => void;
  onNext: () => void;
  inquiryType: DocumentInquiryType;
  uploadData: WaitingPhasePayload;
};

const InquiryFilesWaitTransaction = ({ onError, onNext, inquiryType, uploadData }: Props) => {
  const [retries, setRetries] = useState<number>(0);
  const dispatch = useAppDispatch();

  const retryTransaction = (retryAfter: number = 0) => {
    window.setTimeout(() => setRetries((oldRetries) => oldRetries + 1), retryAfter);
  };

  const handleTransactionResponse = (transactionResponse: StartTransactionResponse) => {
    if (transactionResponse.status?.code === 2 && transactionResponse.status.retryAfter !== 0) {
      retryTransaction(transactionResponse.status.retryAfter);
    } else {
      onNext();
    }
  };

  useEffect(() => {
    // eslint-disable-next-line functional/no-let
    let didCancel = false;

    const uploadAndTransactionProcess = async () => {
      try {
        const transactionResponse = await dispatch(
          uploadFileAndStartTransaction({ ...uploadData, inquiryType })
        ).unwrap();
        if (!didCancel) {
          handleTransactionResponse(transactionResponse);
        }
      } catch (error) {
        onError();
      }
    };

    const transactionProcess = async () => {
      try {
        const transactionResponse = await dispatch(startTransaction({ inquiryType })).unwrap();

        if (!didCancel) {
          handleTransactionResponse(transactionResponse);
        }
      } catch (error) {
        onError();
      }
    };

    if (retries === 0) {
      void uploadAndTransactionProcess();
    } else {
      void transactionProcess();
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
