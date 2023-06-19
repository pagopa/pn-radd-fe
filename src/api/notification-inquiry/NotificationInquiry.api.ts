import { DocumentInquiryType } from '../../redux/document-inquiry/types';
import { getDomainByInquiryType } from '../../utils/api.utils';
import { apiClient } from '../axios';
import { NotificationInquiryConverter } from '../converters/NotificationInquiryConverter';
import {
  GET_PRACTICES_BY_IUN_PATH,
  GET_TRANSACTION_BY_OPERATION_ID_PATH,
  GET_PRACTICES_BY_INTERNAL_ID_PATH,
} from '../routes/notification-inquiry.routes';
import { FilterRequest, OperationsResponse } from '../types';

export const NotificationInquiryApi = {
  getPracticesByIun: (
    iun: string,
    inquiryType: DocumentInquiryType
  ): Promise<OperationsResponse> => {
    const domain = getDomainByInquiryType(inquiryType);
    return apiClient.get(GET_PRACTICES_BY_IUN_PATH(domain, iun)).then((res) => res.data);
  },
  getActTransactionByOperationId: (operationId: string): Promise<OperationsResponse> =>
    apiClient
      .get(GET_TRANSACTION_BY_OPERATION_ID_PATH(operationId, 'act'))
      .then((res) =>
        NotificationInquiryConverter.operationActResponseToOperationsResponse(res.data)
      ),
  getAorTransactionByOperationId: (operationId: string): Promise<OperationsResponse> =>
    apiClient
      .get(GET_TRANSACTION_BY_OPERATION_ID_PATH(operationId, 'aor'))
      .then((res) =>
        NotificationInquiryConverter.operationAorResponseToOperationsResponse(res.data)
      ),
  getActPracticesByInternalId: (
    internalId: string,
    filterRequest?: FilterRequest
  ): Promise<OperationsResponse> =>
    apiClient
      .post(GET_PRACTICES_BY_INTERNAL_ID_PATH(internalId, 'act'), filterRequest)
      .then((res) =>
        NotificationInquiryConverter.operationsActDetailsToOperationsResponse(res.data)
      ),
  getAorPracticesByInternalId: (
    internalId: string,
    filterRequest?: FilterRequest
  ): Promise<OperationsResponse> =>
    apiClient
      .post(GET_PRACTICES_BY_INTERNAL_ID_PATH(internalId, 'aor'), filterRequest)
      .then((res) =>
        NotificationInquiryConverter.operationsAorDetailsToOperationsResponse(res.data)
      ),
};
