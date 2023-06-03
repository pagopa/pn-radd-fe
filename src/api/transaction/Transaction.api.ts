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

export const START_TRANSACTION_PATH = `/radd-web/:domain/transaction/start`;
export const GET_START_TRANSACTION_PATH = (domain: string) => START_TRANSACTION_PATH.replace(":domain", domain);

export const COMPLETE_TRANSACTION_PATH = `/radd-web/:domain/transaction/complete`;
export const GET_COMPLETE_TRANSACTION_PATH = (domain: string) => COMPLETE_TRANSACTION_PATH.replace(":domain", domain);

export const ABORT_TRANSACTION_PATH = `/radd-web/:domain/transaction/abort`;
export const GET_ABORT_TRANSACTION_PATH = (domain: string) => ABORT_TRANSACTION_PATH.replace(":domain", domain);

export const TransactionApi = {
  startTransaction: (
    startTransactionRequest: StartTransactionRequest,
    inquiryType: DocumentInquiryType
  ): Promise<StartTransactionResponse> => {
    const domain = getDomainByInquiryType(inquiryType);
    return apiClient
      .post<StartTransactionResponse>(GET_START_TRANSACTION_PATH(domain), startTransactionRequest)
      .then((response) => response.data);
  },
  completeTransaction: (
    completeTransactionRequest: CompleteTransactionRequest,
    inquiryType: DocumentInquiryType
  ): Promise<CompleteTransactionResponse> => {
    const domain = getDomainByInquiryType(inquiryType);
    return apiClient
      .post<CompleteTransactionResponse>(
        GET_COMPLETE_TRANSACTION_PATH(domain),
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
      .post<AbortTransactionResponse>(GET_ABORT_TRANSACTION_PATH(domain), abortTransactionRequest)
      .then((response) => response.data);
  },
};
