import { ResponseStatus } from '../api/types';
import { DocumentInquiryType } from '../redux/document-inquiry/types';

export const getDomainByInquiryType = (inquiryType: DocumentInquiryType) =>
  inquiryType === DocumentInquiryType.ACT ? 'act' : 'aor';


type ApiResponse = {
  [key: string]: any;
  status: ResponseStatus;
};
/**
 * Every API response has a status property which eventually contains a code and message for errors.
 * This function checks if the response is an error or not.
 * WARNING: this function is not complete, it should be updated with all the possible error codes.
 * 
 * @param response
 * @returns boolean
 * 
  */
export const isApiError = (response: ApiResponse) =>  {
  const { status } = response;
  // if the status code is not 0 and there is no retryAfter property, it means that the request failed
  return status && status.code !== 0 && !status.retryAfter;
};


export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));