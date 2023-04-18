import { apiClient } from '../axios';
import { AORInquiryResponse } from '../types';

export const AorDocumentInquiryApi = {
  aorDocumentInquiry: (
    uid: string,
    recipientTaxId: string,
    recipientType: 'PF' | 'PG'
  ): Promise<AORInquiryResponse> => {
    return apiClient
      .get<AORInquiryResponse>(`/radd-private/api/v1/aor/inquiry`, {
        params: { uid, recipientTaxId, recipientType },
      })
      .then((response) => response.data);
  },
};
