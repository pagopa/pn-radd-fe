import { Grid, Paper, Box } from '@mui/material';
import { useReducer } from 'react';
import TitleBox from '../../Title/TitleBox';
import { DocumentInquiryType } from '../../../redux/document-inquiry/types';
import { useAppSelector } from '../../../redux/hooks';
import { isDelegatePresentSelector } from '../../../redux/document-inquiry/slice';
import InquiryFilesUpload from './InquiryFilesUpload';
import InquiryFilesWaitTransaction from './InquiryFilesWaitTransaction';
import {
  DocumentType,
  InquiryFilesState,
  Phases,
  UploadFilePayload,
  WaitingPhasePayload,
  inquiryFilesReducer,
  removeFileAction,
  uploadFileAction,
  uploadPhaseAction,
  waitingPhaseAction,
} from './reducer/inquiryFilesReducer';

type Props = {
  title: string;
  onConfirm: () => void;
  inquiryType: DocumentInquiryType;
};

const initialState: InquiryFilesState = {
  phase: Phases.UPLOAD_PHASE,
  files: {
    'delegate-act': undefined,
    'delegate-id': undefined,
    'recipient-id': undefined,
  },
  uploadData: {
    checksum: '',
    bundleId: '',
    zip: new Blob(),
  },
};

const DocumentInquiryFiles = ({ title, inquiryType, onConfirm }: Props) => {
  const [data, dispatch] = useReducer(inquiryFilesReducer, initialState);
  const isDelegatePresent = useAppSelector(isDelegatePresentSelector);

  const goToWaitingPhase = (payload: WaitingPhasePayload) => {
    dispatch(waitingPhaseAction(payload));
  };

  const goToUploadPhase = () => {
    dispatch(uploadPhaseAction());
  };

  const handleUpload = (payload: UploadFilePayload) => {
    dispatch(uploadFileAction(payload));
  };

  const handleRemove = (type: DocumentType) => {
    dispatch(removeFileAction(type));
  };

  return (
    <Grid item xs={12}>
      <Paper>
        <Box p={2}>
          <TitleBox title={title} variantTitle={'h6'} />

          {data.phase === Phases.UPLOAD_PHASE && (
            <InquiryFilesUpload
              onNext={goToWaitingPhase}
              onUpload={handleUpload}
              onRemove={handleRemove}
              files={data.files}
              isDelegatePresent={isDelegatePresent}
            />
          )}
          {data.phase === Phases.WAITING_PHASE && (
            <InquiryFilesWaitTransaction
              onNext={onConfirm}
              onError={goToUploadPhase}
              inquiryType={inquiryType}
              uploadData={data.uploadData}
            />
          )}
        </Box>
      </Paper>
    </Grid>
  );
};

export default DocumentInquiryFiles;
