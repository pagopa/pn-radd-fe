import { apiClient } from '../axios';
import { AORInquiryResponse } from '../types';

export const AorDocumentInquiryApi = {
  aorDocumentInquiry: (
    recipientTaxId: string,
    recipientType: 'PF' | 'PG'
  ): Promise<AORInquiryResponse> =>
    apiClient
      .get<AORInquiryResponse>(`/radd-web/aor/inquiry`, {
        params: { recipientTaxId, recipientType },
      })
      .then((response) => response.data),
};
