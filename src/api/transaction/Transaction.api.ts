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
    uid: string,
    startTransactionRequest: StartTransactionRequest,
    inquiryType: DocumentInquiryType
  ): Promise<StartTransactionResponse> => {
    const domain = getDomainByInquiryType(inquiryType);
    return apiClient
      .post<StartTransactionResponse>(
        `/radd-private/api/v1/${domain}/transaction/start`,
        startTransactionRequest,
        { params: { uid } }
      )
      .then((response) => response.data);
  },
  completeTransaction: (
    uid: string,
    completeTransactionRequest: CompleteTransactionRequest,
    inquiryType: DocumentInquiryType
  ): Promise<CompleteTransactionResponse> => {
    const domain = getDomainByInquiryType(inquiryType);
    return apiClient
      .post<CompleteTransactionResponse>(
        `/radd-private/api/v1/${domain}/transaction/complete`,
        completeTransactionRequest,
        { params: { uid } }
      )
      .then((response) => response.data);
  },
  abortTransaction: (
    uid: string,
    abortTransactionRequest: AbortTransactionRequest,
    inquiryType: DocumentInquiryType
  ): Promise<AbortTransactionResponse> => {
    const domain = getDomainByInquiryType(inquiryType);
    return apiClient
      .post<AbortTransactionResponse>(
        `/radd-private/api/v1/${domain}/transaction/abort`,
        abortTransactionRequest,
        { params: { uid } }
      )
      .then((response) => response.data);
  },
};
