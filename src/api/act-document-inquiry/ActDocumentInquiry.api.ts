import { apiClient } from '../axios';
import { ActInquiryResponse } from '../types';

export const ActDocumentInquiryApi = {
  actDocumentInquiry: (
    recipientTaxId: string,
    recipientType: 'PF' | 'PG',
    qrCode: string
  ): Promise<ActInquiryResponse> =>
    apiClient
      .get<ActInquiryResponse>(`/radd/act/inquiry`, {
        params: { recipientTaxId, recipientType, qrCode },
      })
      .then((response) => response.data),
};
