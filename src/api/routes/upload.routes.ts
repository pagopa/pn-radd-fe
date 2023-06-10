export const DOCUMENT_UPLOAD_PATH = `/radd-web/documents/upload`;
export const DOCUMENT_READY_PATH = `/radd-web/document-ready/:fileKey`;
export const GET_DOCUMENT_READY_PATH = (fileKey: string) => DOCUMENT_READY_PATH.replace(":fileKey", fileKey);