import { apiClient } from '../axios';
import { DocumentUploadRequest, DocumentUploadResponse, S3UploadRequest } from '../types';

export const UploadApi = {
  documentUpload: (documentUploadRequest: DocumentUploadRequest): Promise<DocumentUploadResponse> =>
    apiClient
      .post(`/radd/documents/upload`, documentUploadRequest)
      .then((response) => response.data),
  s3Upload: (presignedUrl: string, payload: S3UploadRequest) => {
    const { file, secret } = payload;
    const config = {
      headers: {
        secret,
      },
    };
    return apiClient.put(presignedUrl, file, config).then((response) => response.data);
  },
};
