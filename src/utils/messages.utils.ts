import { AxiosError } from 'axios';
import { v1 as uidv1 } from 'uuid';
import { AppMessage, MessageType } from '../redux/app/types';
import { ApiException } from '../api/exception/ApiException';
import { ResponseStatus } from '../api/types';

export const getErrorMessageByApiStatus = (status: number) => {
  switch (status) {
    case 403:
      return 'Non sei in possesso delle autorizzazioni necessarie';
    case 404:
      return 'Risorsa non trovata';
    case 500:
    default:
      return 'Si è verificato un problema. Riprova tra qualche minuto';
  }
};

type IError = Error | AxiosError | ApiException;

export const createAppError = (error: IError) => {
  if (error instanceof AxiosError) {
    return handleAxiosError(error);
  }

  if (error instanceof ApiException) {
    return handleApiError(error.error);
  }

  if (error instanceof Error) {
    return handleRuntimeError();
  }

  return createErrorMessage(getErrorMessageByApiStatus(500));
};

const createErrorMessage = (message: string, status?: number): AppMessage => ({
  id: uidv1(),
  duration: null,
  type: MessageType.ERROR,
  message,
  status,
});

function handleAxiosError(error: AxiosError<unknown, any> | AxiosError<any, any>) {
  const status = error.response?.status ?? 500;
  const message = getErrorMessageByApiStatus(status);
  return createErrorMessage(message, status);
}

function handleRuntimeError() {
  return createErrorMessage(getErrorMessageByApiStatus(500));
}

function handleApiError(error: ResponseStatus) {
  return createErrorMessage(error.message);
}
