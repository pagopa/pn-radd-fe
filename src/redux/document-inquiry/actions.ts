import { AORInquiryResponse, AbortTransactionResponse, ActInquiryResponse, CompleteTransactionResponse, DocumentUploadRequest, StartTransactionResponse } from '../../api/types';
import { DocumentInquiryFile, DocumentInquiryForm, DocumentInquiryType } from './types';
import { createAppAsyncThunk } from '../thunk';
import { v4 as uuidv4 } from 'uuid'
import { S3UploadRequest } from '../../api/types';
import { setInquiryFileData, setInquiryFormData, setTransactionData } from './slice';
import { ActDocumentInquiryApi, AorDocumentInquiryApi, TransactionApi, UploadApi } from '../../api';
import { setLoadingStatus } from '../app/slice';

type InquiryRequest = {
    inquiryType: DocumentInquiryType
}

export type DocumentInquiryFormAction = DocumentInquiryForm & InquiryRequest;
export const startInquiry = createAppAsyncThunk<
    ActInquiryResponse | AORInquiryResponse, 
    DocumentInquiryFormAction
>('startInquiry', async (params: DocumentInquiryFormAction, { rejectWithValue, getState, dispatch }) => {
    try {
        dispatch(setLoadingStatus());
        const state = getState();
        const uid = state.user.user.uid;
        const { recipientTaxId, recipientType, qrCode, delegateTaxId } = params;
        if(params.inquiryType === DocumentInquiryType.ACT) {
            const inquiryRes = await ActDocumentInquiryApi.actDocumentInquiry(uid, recipientTaxId, recipientType, qrCode!);

            const inquiryFormData = {
                recipientTaxId, recipientType, qrCode, delegateTaxId
            }
            dispatch(setInquiryFormData(inquiryFormData));
            return inquiryRes;
        }
       
        if(params.inquiryType === DocumentInquiryType.AOR) {
            const inquiryRes = await AorDocumentInquiryApi.aorDocumentInquiry(uid, recipientTaxId, recipientType);
            
            const inquiryFormData = {
                recipientTaxId, recipientType, qrCode, delegateTaxId
            }
            dispatch(setInquiryFormData(inquiryFormData));
            return inquiryRes;
        }

        throw Error("Unsupported Inquiry request type");
    } catch (error) {
        return rejectWithValue(error);
    }
});

type UploadFileAndStartTransactionArgs = {
    checksum: string,
    bundleId: string,
    zip: Blob
}
export const uploadFile = createAppAsyncThunk<
    void, 
    UploadFileAndStartTransactionArgs
>('uploadFile', async (params : UploadFileAndStartTransactionArgs, {getState, rejectWithValue, dispatch}) => {
    const state = getState();
    const uid = state.user.user.uid;
    
    const { checksum, bundleId, zip } = params;
    try {
        
        const contentType = "application/gzip";
    
        const { url, secret, fileKey } = await raddDocumentUpload({contentType, checksum, bundleId, uid});
            
        await s3Upload({url: url!, file: zip, secret});
    
        const fileData : DocumentInquiryFile = {checksum, fileKey: fileKey!};

        dispatch(setInquiryFileData(fileData));

    } catch (error) {
        return rejectWithValue(error);
    }
});

type UploadFileArgs = DocumentUploadRequest & {uid: string}
const raddDocumentUpload = async ({contentType, bundleId, checksum, uid}: UploadFileArgs) => {
    return await UploadApi.documentUpload(uid, {contentType, checksum, bundleId});
} 

type S3UploadArgs = S3UploadRequest & { url: string };
const s3Upload = async ({url, file, secret}: S3UploadArgs) => {
    return await UploadApi.s3Upload(url!, {secret, file});
}

type TransactionArgs = {
    inquiryType: DocumentInquiryType
}
export const startTransaction = createAppAsyncThunk<
    StartTransactionResponse, 
    TransactionArgs
>('startTransaction', async ({ inquiryType } : TransactionArgs, {getState, rejectWithValue, dispatch}) => {
    try {
        const state = getState();
        const uid = state.user.user.uid;
        const { checksum, fileKey} = state.documentInquiry.fileData;
        const { delegateTaxId, recipientTaxId, recipientType, qrCode } = state.documentInquiry.formData;
        const previousOperationId = state.documentInquiry.transactionData.operationId;

        const operationId = previousOperationId ?? uuidv4();
        const operationDate = new Date().toISOString();

        const res = await TransactionApi.startTransaction(uid, {
            operationId,
            operationDate,
            checksum: checksum!,
            fileKey: fileKey!,
            recipientType,
            delegateTaxId,
            recipientTaxId,
            qrCode: qrCode!,
            versionToken: "",
        }, inquiryType);

        dispatch(setTransactionData({operationId, urlList: res.urlList!}));
        return res;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const completeTransaction = createAppAsyncThunk<
    CompleteTransactionResponse, 
    InquiryRequest
>('completeTransaction', async (params: InquiryRequest, {getState, rejectWithValue, dispatch}) => {
    dispatch(setLoadingStatus());
    const state = getState();
    const uid = state.user.user.uid;
    try {
        const operationId = state.documentInquiry.transactionData.operationId;
        const operationDate = new Date().toISOString();

        return await TransactionApi.completeTransaction(uid, {
            operationId,
            operationDate,
        },params.inquiryType);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const abortTransaction = createAppAsyncThunk<
    AbortTransactionResponse, 
    InquiryRequest
>('abortTransaction', async (params: InquiryRequest, {getState, rejectWithValue, dispatch}) => {
    dispatch(setLoadingStatus());
    const state = getState();
    const uid = state.user.user.uid;
    try {
        const operationId = state.documentInquiry.transactionData.operationId;
        const operationDate = new Date().toISOString();

        return await TransactionApi.abortTransaction(uid, {
            operationId,
            operationDate,
        },params.inquiryType);
       
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default { startInquiry, uploadFile, startTransaction, completeTransaction, abortTransaction };