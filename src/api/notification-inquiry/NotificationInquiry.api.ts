import { DocumentInquiryType } from '../../redux/document-inquiry/types';
import { getDomainByInquiryType } from '../../utils/api.utils';
import { apiClient } from '../axios';
import { FilterRequest, OperationResponse, OperationsResponse } from '../types';

export const NotificationInquiryApi = {
  getPracticesByIun: (
    iun: string,
    inquiryType: DocumentInquiryType
  ): Promise<OperationsResponse> => {
    const domain = getDomainByInquiryType(inquiryType);
    return apiClient
      .get(`/radd-private/api/v1/${domain}/operations/by-iun/${iun}`)
      .then((res) => res.data);
  },
  getTransactionByOperationId: (
    operationId: string,
    inquiryType: DocumentInquiryType
  ): Promise<OperationResponse> => {
    const domain = getDomainByInquiryType(inquiryType);
    return apiClient
      .get(`/radd-private/api/v1/${domain}/operations/by-id/${operationId}`)
      .then((res) => res.data);
  },
  getPracticesByInternalId: (
    internalId: string,
    inquiryType: DocumentInquiryType,
    filterRequest?: FilterRequest
  ): Promise<OperationResponse> => {
    const domain = getDomainByInquiryType(inquiryType);
    return apiClient
      .post(`/radd-private/api/v1/${domain}/operations/by-internalId/${internalId}`, filterRequest)
      .then((res) => res.data);
  },
};
