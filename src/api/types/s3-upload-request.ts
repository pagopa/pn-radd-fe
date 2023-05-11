export interface S3UploadRequest {
  secret?: string;
  sha256?: string;
  file: Blob;
}
