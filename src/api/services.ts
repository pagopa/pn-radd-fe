import { 
    ActDocumentInquiryApi, 
    AorDocumentInquiryApi, 
    ActTransactionManagementApi,
    AorTransactionManagementApi,
    DocumentUploadApi,
    NotificationInquiryApi
} from "./generated";
import { BASE_URL, apiClient } from './axios';

export const actDocumentInquiryApi = new ActDocumentInquiryApi(undefined, BASE_URL, apiClient);
export const aorDocumentInquiryApi = new AorDocumentInquiryApi(undefined, BASE_URL, apiClient);
export const actTransactionManagementApi = new ActTransactionManagementApi(undefined, BASE_URL, apiClient);
export const aorTransactionManagementApi = new AorTransactionManagementApi(undefined, BASE_URL, apiClient);
export const documentUploadApi = new DocumentUploadApi(undefined, BASE_URL, apiClient);
export const aotificationInquiryApi = new NotificationInquiryApi(undefined, BASE_URL, apiClient);