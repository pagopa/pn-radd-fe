import { DocumentInquiryType } from '../../redux/document-inquiry/types';
import { getDomainByInquiryType } from '../../utils/api.utils';
import { apiClient } from '../axios';
import {
  AbortTransactionRequest,
  AbortTransactionResponse,
  StartTransactionRequest,
  StartTransactionResponse,
  CompleteTransactionRequest,
  CompleteTransactionResponse,
} from '../types';

export const TransactionApi = {
  startTransaction: (
    startTransactionRequest: StartTransactionRequest,
    inquiryType: DocumentInquiryType
  ): Promise<StartTransactionResponse> => {
    const domain = getDomainByInquiryType(inquiryType);
    return apiClient
      .post<StartTransactionResponse>(`/radd-web/${domain}/transaction/start`, startTransactionRequest)
      .then((response) => response.data);
  },
  completeTransaction: (
    completeTransactionRequest: CompleteTransactionRequest,
    inquiryType: DocumentInquiryType
  ): Promise<CompleteTransactionResponse> => {
    const domain = getDomainByInquiryType(inquiryType);
    return apiClient
      .post<CompleteTransactionResponse>(
        `/radd-web/${domain}/transaction/complete`,
        completeTransactionRequest
      )
      .then((response) => response.data);
  },
  abortTransaction: (
    abortTransactionRequest: AbortTransactionRequest,
    inquiryType: DocumentInquiryType
  ): Promise<AbortTransactionResponse> => {
    const domain = getDomainByInquiryType(inquiryType);
    return apiClient
      .post<AbortTransactionResponse>(`/radd-web/${domain}/transaction/abort`, abortTransactionRequest)
      .then((response) => response.data);
  },
};
