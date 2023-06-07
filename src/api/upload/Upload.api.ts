import { apiClient, authClient } from '../axios';
import { DOCUMENT_UPLOAD_PATH } from '../routes/upload.routes';
import { DocumentUploadRequest, DocumentUploadResponse, S3UploadRequest } from '../types';

export const UploadApi = {
  documentUpload: (documentUploadRequest: DocumentUploadRequest): Promise<DocumentUploadResponse> =>
    apiClient
      .post(DOCUMENT_UPLOAD_PATH, documentUploadRequest)
      .then((response) => response.data),
  s3Upload: (presignedUrl: string, payload: S3UploadRequest): Promise<string> => {
    const { file, secret, sha256 } = payload;
    const config = {
      headers: {
        "content-type": "application/zip",
        "x-amz-meta-secret": secret,
        "x-amz-checksum-sha256": sha256
      },
    };
    return authClient.put(presignedUrl, file, config).then((response) => response.headers["x-amz-version-id"]);
  },
};
