import { apiClient } from '../axios';
import { ACT_DOCUMENT_INQUIRY_PATH } from '../routes/document-inquiry.routes';
import { ActInquiryResponse } from '../types';

export const ActDocumentInquiryApi = {
  actDocumentInquiry: (
    recipientTaxId: string,
    recipientType: 'PF' | 'PG',
    qrCode: string
  ): Promise<ActInquiryResponse> =>
    apiClient
      .get<ActInquiryResponse>(ACT_DOCUMENT_INQUIRY_PATH, {
        params: { recipientTaxId, recipientType, qrCode },
      })
      .then((response) => response.data),
};
