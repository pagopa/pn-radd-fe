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
export const isApiError = (response: ApiResponse) => {
  const { status } = response;
  // if the status code is not 0 and there is no retryAfter property, it means that the request failed
  return status && status.code !== 0 && !status.retryAfter;
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/* eslint-disable functional/no-let,no-async-promise-executor */
export const recursivePolling = (
  apiFn: () => Promise<any>,
  successVerifierFn: (apiResponse: any) => boolean,
  retryNumber: number = 5,
  delay: number = 1000
) =>
  new Promise(async (res, rej) => {
    const handleApiCall = async () => await apiFn();

    let internalCounter = 1;
    let timeoutId: NodeJS.Timeout;
    const handleRecursion = async () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      try {
        const apiResponse = await handleApiCall();
        if (successVerifierFn(apiResponse)) {
          res(apiResponse);
          return;
        }
      } catch (error) {
        rej();
        return;
      }

      if (internalCounter === retryNumber) {
        rej();
        return;
      }
      internalCounter++;
      timeoutId = setTimeout(handleRecursion, delay);
    };

    await handleRecursion();
  });
/* eslint-enable functional/no-let,no-async-promise-executor */
