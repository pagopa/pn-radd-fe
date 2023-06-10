import { apiClient } from '../axios';
import { AOR_DOCUMENT_INQUIRY_PATH } from '../routes/document-inquiry.routes';
import { AORInquiryResponse } from '../types';

export const AorDocumentInquiryApi = {
  aorDocumentInquiry: (
    recipientTaxId: string,
    recipientType: 'PF' | 'PG'
  ): Promise<AORInquiryResponse> =>
    apiClient
      .get<AORInquiryResponse>(AOR_DOCUMENT_INQUIRY_PATH, {
        params: { recipientTaxId, recipientType },
      })
      .then((response) => response.data),
};
