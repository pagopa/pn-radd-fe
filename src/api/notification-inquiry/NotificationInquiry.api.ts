import { DocumentInquiryType } from '../../redux/document-inquiry/types';
import { getDomainByInquiryType } from '../../utils/api.utils';
import { apiClient } from '../axios';
import { NotificationInquiryConverter } from '../converters/NotificationInquiryConverter';
import { FilterRequest, OperationsResponse, OperationActResponse, OperationAorResponse, OperationsActDetailsResponse, OperationsAorDetailsResponse } from '../types';

export const NotificationInquiryApi = {
  getPracticesByIun: (
    iun: string,
    inquiryType: DocumentInquiryType
  ): Promise<OperationsResponse> => {
    const domain = getDomainByInquiryType(inquiryType);
    return apiClient.get(`/radd-web/${domain}/operations/by-iun/${iun}`).then((res) => res.data);
  },
  getActTransactionByOperationId:(
    operationId: string
  ): Promise<OperationActResponse> => apiClient.get(`/radd-web/act/operations/by-id/${operationId}`)
      .then((res) => NotificationInquiryConverter.operationActResponseToOperationsResponse(res.data)),
  getAorTransactionByOperationId:
  (
    operationId: string
  ): Promise<OperationAorResponse> => apiClient.get(`/radd-web/aor/operations/by-id/${operationId}`)
      .then((res) => NotificationInquiryConverter.operationAorResponseToOperationsResponse(res.data)),
  getActPracticesByInternalId:(
    internalId: string,
    filterRequest?: FilterRequest
  ): Promise<OperationsActDetailsResponse> => apiClient
      .post(`/radd-web/act/operations/by-internalId/${internalId}`, filterRequest)
      .then((res) => NotificationInquiryConverter.operationsActDetailsToOperationsResponse(res.data)),
  getAorPracticesByInternalId:(
    internalId: string,
    filterRequest?: FilterRequest
  ): Promise<OperationsAorDetailsResponse> => apiClient
      .post(`/radd-web/aor/operations/by-internalId/${internalId}`, filterRequest)
      .then((res) => NotificationInquiryConverter.operationsAorDetailsToOperationsResponse(res.data)),
};

