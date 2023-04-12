import { AORInquiryResponse, AbortTransactionResponse, ActInquiryResponse, CompleteTransactionResponse, DocumentUploadRequest, DocumentUploadResponse, StartTransactionResponse } from '../../api/generated/types';
import { DocumentInquiryFile, DocumentInquiryForm, DocumentInquiryType } from './types';
import { createAppAsyncThunk } from '../thunk';
import { actDocumentInquiryApi, actTransactionManagementApi, aorDocumentInquiryApi, aorTransactionManagementApi, documentUploadApi } from '../../api/services';
import { S3Api } from '../../api/non-generated/services/s3-api';
import { v4 as uuidv4 } from 'uuid'
import { S3PutPayload } from '../../api/non-generated/types/S3PutPayload';
import { setInquiryFileData, setInquiryFormData, setTransactionData } from './slice';

type InquiryRequest = {
    inquiryType: DocumentInquiryType
}

export type DocumentInquiryFormAction = DocumentInquiryForm & InquiryRequest;
export const startInquiry = createAppAsyncThunk<
    ActInquiryResponse | AORInquiryResponse, 
    DocumentInquiryFormAction
>('startInquiry', async (params: DocumentInquiryFormAction, { rejectWithValue, getState, dispatch }) => {
    try {

        const state = getState();
        const uid = state.user.user.uid;
        const { recipientTaxId, recipientType, qrCode, delegateTaxId } = params;
        if(params.inquiryType === DocumentInquiryType.ACT) {
            const inquiryRes = await actDocumentInquiryApi.actInquiry(uid, recipientTaxId, recipientType, qrCode!)
                .then((data) => data.data);

            const inquiryFormData = {
                recipientTaxId, recipientType, qrCode, delegateTaxId
            }
            dispatch(setInquiryFormData(inquiryFormData));
            return inquiryRes;
        }
       
        if(params.inquiryType === DocumentInquiryType.AOR) {
            const inquiryRes = await aorDocumentInquiryApi.aorInquiry(uid, recipientTaxId, recipientType)
                .then((data) => data.data);
            
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
    return await documentUploadApi.documentUpload(uid, {contentType, checksum, bundleId})
        .then(res => res.data);
} 

type S3UploadArgs = S3PutPayload & { url: string };
const s3Upload = async ({url, file, secret}: S3UploadArgs) => {
    return await S3Api.upload(url!, {secret, file})
        .then(res => res.data);
}

type TransactionArgs = {
    inquiryType: DocumentInquiryType,
    previousOperationId?: string
}
export const startTransaction = createAppAsyncThunk<
    StartTransactionResponse, 
    TransactionArgs
>('startTransaction', async ({ inquiryType, previousOperationId } : TransactionArgs, {getState, rejectWithValue, dispatch}) => {
    try {
        const state = getState();
        const uid = state.user.user.uid;
        const { checksum, fileKey} = state.documentInquiry.fileData;
        const { delegateTaxId, recipientTaxId, recipientType, qrCode } = state.documentInquiry.formData;

        const operationId = previousOperationId ?? uuidv4();
        const operationDate = new Date().toISOString();

        if(inquiryType === DocumentInquiryType.ACT) {
            const res = await actTransactionManagementApi.startActTransaction(uid, {
                operationId,
                operationDate,
                checksum: checksum!,
                fileKey: fileKey!,
                recipientType,
                delegateTaxId,
                recipientTaxId,
                qrCode: qrCode!,
                versionToken: "",
            }).then(res => res.data);

            dispatch(setTransactionData({operationId, urlList: res.urlList!}));
            return res;
        } 

        if(inquiryType === DocumentInquiryType.AOR) {
            const res = await aorTransactionManagementApi.startAorTransaction(uid, {
                operationId,
                operationDate,
                checksum: checksum!,
                fileKey: fileKey!,
                recipientType,
                delegateTaxId,
                recipientTaxId,
                versionToken: "",
            }).then(res => res.data);

            dispatch(setTransactionData({operationId, urlList: res.urlList!}));
            return res;
        }

        throw Error("Unsupported Inquiry request type");
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const completeTransaction = createAppAsyncThunk<
    CompleteTransactionResponse, 
    InquiryRequest
>('completeTransaction', async (params: InquiryRequest, {getState, rejectWithValue}) => {
    const state = getState();
    const uid = state.user.user.uid;
    try {
        const operationId = state.documentInquiry.transactionData.operationId;
        const operationDate = new Date().toISOString();
        if(params.inquiryType === DocumentInquiryType.ACT) {
            return await actTransactionManagementApi.completeActTransaction(uid, {
                operationId,
                operationDate,
            }).then(res => res.data);
        } 

        if(params.inquiryType === DocumentInquiryType.AOR) {
            return await aorTransactionManagementApi.completeAorTransaction(uid, {
                operationId,
                operationDate,
            }).then(res => res.data);
        }

        throw Error("Unsupported Inquiry request type");
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const abortTransaction = createAppAsyncThunk<
    AbortTransactionResponse, 
    InquiryRequest
>('abortTransaction', async (params: InquiryRequest, {getState, rejectWithValue}) => {
    const state = getState();
    const uid = state.user.user.uid;
    try {
        const operationId = state.documentInquiry.transactionData.operationId;
        const operationDate = new Date().toISOString();
        if(params.inquiryType === DocumentInquiryType.ACT) {
            return await actTransactionManagementApi.abortActTransaction(uid, {
                operationId,
                operationDate,
            }).then(res => res.data);
        } 

        if(params.inquiryType === DocumentInquiryType.AOR) {
            return await aorTransactionManagementApi.abortAorTransaction(uid, {
                operationId,
                operationDate,
            }).then(res => res.data);
        }

        throw Error("Unsupported Inquiry request type");
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default { startInquiry, uploadFile, startTransaction, completeTransaction, abortTransaction };