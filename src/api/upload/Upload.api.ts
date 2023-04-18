import { apiClient } from '../axios';
import { DocumentUploadRequest, DocumentUploadResponse, S3UploadRequest } from '../types';

export const UploadApi = {
  documentUpload: (
    uid: string,
    documentUploadRequest: DocumentUploadRequest
  ): Promise<DocumentUploadResponse> => {
    return apiClient
      .post(`/radd-private/api/v1/documents/upload`, documentUploadRequest, { params: { uid } })
      .then((response) => response.data);
  },
  s3Upload: (presignedUrl: string, payload: S3UploadRequest) => {
    const { file, secret } = payload;
    const config = {
      headers: {
        secret: secret,
      },
    };
    return apiClient.put(presignedUrl, file, config).then((response) => response.data);
  },
};
