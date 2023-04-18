import { AxiosError } from 'axios';
import { AppMessage, MessageType } from '../redux/app/types';
import { v1 as uidv1 } from 'uuid';

export const getErrorMessageByApiStatus = (status: number) => {
  switch (status) {
    case 403:
      return 'Non sei in possesso delle autorizzazioni necessarie';
    case 404:
      return 'Risorsa non trovata. Si prega di riprovare più tardi';
    case 500:
    default:
      return 'Problemi con il servizio. Si prega di riprovare';
  }
};

type IError = Error | AxiosError | { status: { code: string; message: string } };

export const createAppError = (error: IError) => {
  if (error instanceof AxiosError) return handleAxiosError(error);

  if (error instanceof Error) return handleRuntimeError(error);

  return handleApiResponse(error);
};

const createErrorMessage = (message: string): AppMessage => {
  return {
    id: uidv1(),
    duration: null,
    type: MessageType.ERROR,
    message,
  };
};

function handleAxiosError(error: AxiosError<unknown, any> | AxiosError<any, any>) {
  const status = error.response?.status ?? 500;
  const message = getErrorMessageByApiStatus(status);
  return createErrorMessage(message);
}
function handleRuntimeError(error: Error) {
  return createErrorMessage(getErrorMessageByApiStatus(500));
}

function handleApiResponse(error: { status: { code: string; message: string } }) {
  return createErrorMessage('TBD');
}
