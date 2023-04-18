import { apiClient } from '../axios';
import { ActInquiryResponse } from '../types';

export const ActDocumentInquiryApi = {
  actDocumentInquiry: (
    uid: string,
    recipientTaxId: string,
    recipientType: 'PF' | 'PG',
    qrCode: string
  ): Promise<ActInquiryResponse> => apiClient
      .get<ActInquiryResponse>(`/radd-private/api/v1/act/inquiry`, {
        params: { uid, recipientTaxId, recipientType, qrCode },
      })
      .then((response) => response.data),
};
