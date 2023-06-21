import { createMockedFile } from '../../../FileUpload/__test__/test-util';
import {
  InquiryFilesState,
  Phases,
  RemoveFileAction,
  UploadFileAction,
  UploadPhaseAction,
  WaitingPhaseAction,
  inquiryFilesReducer,
} from '../reducer/inquiryFilesReducer';

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

describe('inquiryFilesReducer', () => {
  it('FILE_UPLOAD action', () => {
    let file = createMockedFile('test', 'plain/text');
    const fileUploadAction: UploadFileAction = {
      type: 'FILE_UPLOAD',
      payload: { file: file, type: 'recipient-id' },
    };
    const updatedState = inquiryFilesReducer(initialState, fileUploadAction);
    expect(updatedState.files).toEqual({ 'recipient-id': file });
  });

  it('FILE_REMOVE action', () => {
    const fileRemoveAction: RemoveFileAction = {
      type: 'FILE_REMOVE',
      payload: 'recipient-id',
    };
    const updatedState = inquiryFilesReducer(initialState, fileRemoveAction);
    expect(updatedState.files).toEqual({ 'recipient-id': undefined });
  });

  it('UPLOAD_PHASE action', () => {
    const uploadPhaseAction: UploadPhaseAction = {
      type: 'UPLOAD_PHASE',
    };
    const updatedState = inquiryFilesReducer(initialState, uploadPhaseAction);
    expect(updatedState.phase).toEqual(Phases.UPLOAD_PHASE);
  });

  it('WAITING_PHASE action', () => {
    let file = createMockedFile('test', 'plain/text');
    const waitingPhaseAction: WaitingPhaseAction = {
      type: 'WAITING_PHASE',
      payload: { bundleId: 'test', checksum: 'test', zip: file },
    };
    const updatedState = inquiryFilesReducer(initialState, waitingPhaseAction);
    expect(updatedState.phase).toEqual(Phases.WAITING_PHASE);
    expect(updatedState.uploadData).toEqual({
      bundleId: 'test',
      checksum: 'test',
      zip: file,
    });
  });
});
