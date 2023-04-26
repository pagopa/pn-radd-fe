import { v4 as uuidv4 } from 'uuid';
import { createAppAsyncThunk } from '../thunk';
import {
  AORInquiryResponse,
  AbortTransactionResponse,
  ActInquiryResponse,
  CompleteTransactionResponse,
  DocumentUploadRequest,
  StartTransactionResponse,
} from '../../api/types';
import { S3UploadRequest } from '../../api/types';
import { ActDocumentInquiryApi, AorDocumentInquiryApi, TransactionApi, UploadApi } from '../../api';
import { setLoadingStatus } from '../app/slice';
import { DocumentInquiryFile, DocumentInquiryForm, DocumentInquiryType } from './types';
import { setInquiryFileData, setInquiryFormData, setTransactionData } from './slice';

type InquiryRequest = {
  inquiryType: DocumentInquiryType;
};

export type DocumentInquiryFormAction = DocumentInquiryForm & InquiryRequest;
export const startInquiry = createAppAsyncThunk<
  ActInquiryResponse | AORInquiryResponse,
  DocumentInquiryFormAction
>('startInquiry', async (params: DocumentInquiryFormAction, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setLoadingStatus());
    const { recipientTaxId, recipientType, qrCode, delegateTaxId } = params;
    if (params.inquiryType === DocumentInquiryType.ACT) {
      const inquiryRes = await ActDocumentInquiryApi.actDocumentInquiry(
        recipientTaxId,
        recipientType,
        qrCode ?? '',
      );

      const inquiryFormData = {
        recipientTaxId,
        recipientType,
        qrCode,
        delegateTaxId,
      };
      dispatch(setInquiryFormData(inquiryFormData));
      return inquiryRes;
    }

    if (params.inquiryType === DocumentInquiryType.AOR) {
      const inquiryRes = await AorDocumentInquiryApi.aorDocumentInquiry(
        recipientTaxId,
        recipientType
      );

      const inquiryFormData = {
        recipientTaxId,
        recipientType,
        qrCode,
        delegateTaxId,
      };
      dispatch(setInquiryFormData(inquiryFormData));
      return inquiryRes;
    }

    throw Error('Unsupported Inquiry request type');
  } catch (error) {
    return rejectWithValue(error);
  }
});

type UploadFileAndStartTransactionArgs = {
  checksum: string;
  bundleId: string;
  zip: Blob;
  inquiryType: DocumentInquiryType;
};
export const uploadFileAndStartTransaction = createAppAsyncThunk<
  StartTransactionResponse,
  UploadFileAndStartTransactionArgs
>(
  'uploadFile',
  async (params: UploadFileAndStartTransactionArgs, { getState, rejectWithValue, dispatch }) => {
    const state = getState();
    const { checksum, bundleId, zip, inquiryType } = params;
    try {
      const contentType = 'application/gzip';

      const { url, secret, fileKey } = await raddDocumentUpload({
        contentType,
        checksum,
        bundleId,
      });

      await s3Upload({ url: url ?? "", file: zip, secret });

      const fileData: DocumentInquiryFile = { checksum, fileKey };

      dispatch(setInquiryFileData(fileData));

      const { delegateTaxId, recipientTaxId, recipientType, qrCode } =
        state.documentInquiry.formData;

      const operationId = uuidv4();
      const operationDate = new Date().toISOString();

      const res = await TransactionApi.startTransaction(
        {
          operationId,
          operationDate,
          checksum,
          fileKey,
          recipientType,
          delegateTaxId,
          recipientTaxId,
          qrCode: qrCode ?? "",
          versionToken: '',
        },
        inquiryType
      );

      dispatch(setTransactionData({ operationId, urlList: res.urlList ?? [] }));
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

type UploadFileArgs = DocumentUploadRequest;
const raddDocumentUpload = async ({ contentType, bundleId, checksum }: UploadFileArgs) =>
  await UploadApi.documentUpload({ contentType, checksum, bundleId });

type S3UploadArgs = S3UploadRequest & { url: string };
const s3Upload = async ({ url, file, secret }: S3UploadArgs) =>
  await UploadApi.s3Upload(url, { secret, file });

type TransactionArgs = {
  inquiryType: DocumentInquiryType;
};
export const startTransaction = createAppAsyncThunk<StartTransactionResponse, TransactionArgs>(
  'startTransaction',
  async ({ inquiryType }: TransactionArgs, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState();
      const { checksum, fileKey } = state.documentInquiry.fileData;
      const { delegateTaxId, recipientTaxId, recipientType, qrCode } =
        state.documentInquiry.formData;
      const previousOperationId = state.documentInquiry.transactionData.operationId;

      const operationId = previousOperationId ?? uuidv4();
      const operationDate = new Date().toISOString();

      const res = await TransactionApi.startTransaction(
        {
          operationId,
          operationDate,
          checksum,
          fileKey,
          recipientType,
          delegateTaxId,
          recipientTaxId,
          qrCode: qrCode!,
          versionToken: '',
        },
        inquiryType
      );

      dispatch(setTransactionData({ operationId, urlList: res.urlList! }));
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const completeTransaction = createAppAsyncThunk<CompleteTransactionResponse, InquiryRequest>(
  'completeTransaction',
  async (params: InquiryRequest, { getState, rejectWithValue, dispatch }) => {
    dispatch(setLoadingStatus());
    const state = getState();
    try {
      const operationId = state.documentInquiry.transactionData.operationId;
      const operationDate = new Date().toISOString();

      return await TransactionApi.completeTransaction(
        {
          operationId,
          operationDate,
        },
        params.inquiryType
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const abortTransaction = createAppAsyncThunk<AbortTransactionResponse, InquiryRequest>(
  'abortTransaction',
  async (params: InquiryRequest, { getState, rejectWithValue, dispatch }) => {
    dispatch(setLoadingStatus());
    const state = getState();
    try {
      const operationId = state.documentInquiry.transactionData.operationId;
      const operationDate = new Date().toISOString();

      return await TransactionApi.abortTransaction(
        {
          operationId,
          operationDate,
        },
        params.inquiryType
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default {
  startInquiry,
  uploadFileAndStartTransaction,
  startTransaction,
  completeTransaction,
  abortTransaction,
};
