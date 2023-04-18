import { Grid, Paper, Box } from '@mui/material';
import { useReducer } from 'react';
import TitleBox from '../Title/TitleBox';
import { DocumentInquiryType } from '../../../redux/document-inquiry/types';
import InquiryFilesUpload from './InquiryFilesUpload';
import InquiryFilesWaitTransaction from './InquiryFilesWaitTransaction';
import {
  DocumentOwner,
  InquiryFilesState,
  Phases,
  UploadFilePayload,
  WaitingPhaseAction,
  WaitingPhasePayload,
  inquiryFilesReducer,
  removeFileAction,
  uploadFileAction,
  uploadPhaseAction,
  waitingPhaseAction,
} from './inquiryFilesReducer';

type Props = {
  onConfirm: () => void;
  inquiryType: DocumentInquiryType;
};

const initialState: InquiryFilesState = {
  phase: Phases.UPLOAD_PHASE,
  files: {
    delegate: undefined,
    recipient: undefined,
  },
};

const InquiryFiles = ({ onConfirm, inquiryType }: Props) => {
  const [data, dispatch] = useReducer(inquiryFilesReducer, initialState);

  const goToWaitingPhase = (payload: WaitingPhasePayload) => {
    dispatch(waitingPhaseAction(payload));
  };

  const goToUploadPhase = () => {
    dispatch(uploadPhaseAction());
  };

  const handleUpload = (payload: UploadFilePayload) => {
    dispatch(uploadFileAction(payload));
  };

  const handleRemove = (owner: DocumentOwner) => {
    dispatch(removeFileAction(owner));
  };

  return (
    <Grid item xs={12}>
      <Paper>
        <Box p={2}>
          <TitleBox title={'Carica Documentazione'} variantTitle={'h6'} />

          {data.phase === Phases.UPLOAD_PHASE && (
            <InquiryFilesUpload
              onNext={goToWaitingPhase}
              onUpload={handleUpload}
              onRemove={handleRemove}
            />
          )}
          {data.phase === Phases.WAITING_PHASE && (
            <InquiryFilesWaitTransaction
              onNext={onConfirm}
              onError={goToUploadPhase}
              inquiryType={inquiryType}
              uploadData={data.uploadData!}
            />
          )}
        </Box>
      </Paper>
    </Grid>
  );
};

export default InquiryFiles;
