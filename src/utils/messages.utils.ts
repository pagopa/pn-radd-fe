import { AxiosError } from 'axios';
import { v1 as uidv1 } from 'uuid';
import { AppMessage, MessageType } from '../redux/app/types';

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

type IError = Error | AxiosError | { status: { code: number; message: string } };

export const createAppError = (error: IError) => {
  if (error instanceof AxiosError) {
    return handleAxiosError(error);
  }

  if (error instanceof Error) {
    return handleRuntimeError();
  }

  return handleApiResponse(error);
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

function handleApiResponse(error: { status: { code: number; message: string } }) {
  return createErrorMessage(error.status.message);
}
