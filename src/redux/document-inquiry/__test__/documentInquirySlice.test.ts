import { t } from 'msw/lib/glossary-de6278a9';
import data from '../../../mocks/data';
import { store } from '../../store';
import {
  DocumentInquiryFormAction,
  abortTransaction,
  completeTransaction,
  startInquiry,
  startTransaction,
  uploadFileAndStartTransaction,
} from '../actions';
import { setInquiryFileData, setInquiryFormData, setTransactionData } from '../slice';
import { DocumentInquiryType } from '../types';

jest.setTimeout(30000);

describe('Document Inquiry state test', () => {
  it('Test initial state', () => {
    const state = store.getState();

    expect(state.documentInquiry).toEqual({
      formData: {
        recipientTaxId: '',
        recipientType: 'PF',
        delegateTaxId: '',
        qrCode: '',
      },
      fileData: {
        checksum: '',
        fileKey: '',
        versionToken: '',
      },
      transactionData: {
        operationId: '',
        urlList: [],
      },
    });
  });

  it('Handle startInquiry action', async () => {
    const input: DocumentInquiryFormAction = {
      recipientTaxId: 'test',
      recipientType: 'PF',
      qrCode: 'test',
      inquiryType: DocumentInquiryType.ACT,
      delegateTaxId: '',
    };

    const action = await store.dispatch(startInquiry(input));
    expect(action.type).toBe('startInquiry/fulfilled');
    const stateAfter = store.getState().documentInquiry;

    expect(stateAfter.formData).toEqual({
      recipientTaxId: 'test',
      recipientType: 'PF',
      qrCode: 'test',
      delegateTaxId: '',
    });
  });

  it('Handle uploadFileAndStartTransaction action', async () => {
    const action = await store.dispatch(
      uploadFileAndStartTransaction({
        checksum: 'test',
        bundleId: 'test',
        zip: new Blob(),
        inquiryType: DocumentInquiryType.AOR,
      })
    );
    expect(action.type).toBe('uploadFile/fulfilled');
    const stateAfter = store.getState().documentInquiry;

    const uploadResponse = data.UPLOAD.UPLOAD_OK;
    const startTransactionResponse = data.TRANSACTION.START_TRANSACTION_OK;

    expect(stateAfter.transactionData.operationId).toBeTruthy();
    expect(stateAfter.transactionData.urlList).toEqual(startTransactionResponse.urlList);

    expect(stateAfter.fileData.fileKey).toEqual(uploadResponse.fileKey);
  });

  it('Handle startTransaction action', async () => {
    //Prepare state
    store.dispatch(
      setInquiryFormData({
        recipientTaxId: 'test',
        recipientType: 'PF',
        qrCode: 'test',
        delegateTaxId: '',
      })
    );
    store.dispatch(
      setInquiryFileData({
        checksum: 'test',
        fileKey: 'test',
        versionToken: 'test',
      })
    );
    store.dispatch(
      setTransactionData({
        operationId: 'test',
        urlList: [],
      })
    );

    const action = await store.dispatch(startTransaction({ inquiryType: DocumentInquiryType.AOR }));
    expect(action.type).toBe('startTransaction/fulfilled');
    const stateAfter = store.getState().documentInquiry;

    const startTransactionResponse = data.TRANSACTION.START_TRANSACTION_OK;

    expect(stateAfter.transactionData.operationId).toBeTruthy();
    expect(stateAfter.transactionData.urlList).toEqual(startTransactionResponse.urlList);
  });

  it('Handle completeTransaction action', async () => {
    //Prepare state
    store.dispatch(
      setTransactionData({
        operationId: 'test',
        urlList: [],
      })
    );
    const action = await store.dispatch(
      completeTransaction({ inquiryType: DocumentInquiryType.AOR })
    );
    expect(action.type).toBe('completeTransaction/fulfilled');
  });

  it('Handle abortTransaction action', async () => {
    //Prepare state
    store.dispatch(
      setTransactionData({
        operationId: 'test',
        urlList: [],
      })
    );
    const action = await store.dispatch(abortTransaction({ inquiryType: DocumentInquiryType.AOR }));
    expect(action.type).toBe('abortTransaction/fulfilled');
  });
});
