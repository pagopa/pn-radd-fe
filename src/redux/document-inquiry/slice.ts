import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  DocumentInquiryFile,
  DocumentInquiryForm,
  DocumentInquiryRequest,
  DocumentInquiryTransaction,
} from './types';
import { RootState } from '../store';

const initialState: DocumentInquiryRequest = {
  formData: {
    recipientTaxId: '',
    recipientType: 'PF',
    delegateTaxId: '',
    qrCode: '',
  },
  fileData: {
    checksum: '',
    fileKey: '',
  },
  transactionData: {
    operationId: '',
    urlList: [],
  },
};

const slice = createSlice({
  name: 'document-inquiry',
  initialState,
  reducers: {
    setInquiryFormData: (state, action: PayloadAction<DocumentInquiryForm>) => {
      state.formData = action.payload;
    },
    setInquiryFileData: (state, action: PayloadAction<DocumentInquiryFile>) => {
      state.fileData = action.payload;
    },
    setTransactionData: (state, action: PayloadAction<DocumentInquiryTransaction>) => {
      state.transactionData = action.payload;
    },
    reset: () => initialState,
  },
});

export const urlListSelector = (state: RootState) => state.documentInquiry.transactionData.urlList;

export const operationIdSelector = (state: RootState) =>
  state.documentInquiry.transactionData.operationId;

const { actions, reducer } = slice;

export const { reset, setInquiryFormData, setInquiryFileData, setTransactionData } = actions;

export default reducer;
