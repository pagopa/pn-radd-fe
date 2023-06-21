import { AxiosError } from 'axios';
import { createAppError, getErrorMessageByApiStatus } from '../messages.utils';
import { ApiException } from '../../api/exception/ApiException';
import { ResponseStatusCodeEnum } from '../../api/types';

describe('messages.utils', () => {
  it('getErrorMessageByApiStatus', () => {
    const badRequestMessage = getErrorMessageByApiStatus(403);
    const notFoundMessage = getErrorMessageByApiStatus(404);
    const internalServerErrorMessage = getErrorMessageByApiStatus(500);
    const defaultMessage = getErrorMessageByApiStatus(503);

    expect(badRequestMessage).toEqual('Non sei in possesso delle autorizzazioni necessarie');
    expect(notFoundMessage).toEqual('Risorsa non trovata');
    expect(internalServerErrorMessage).toEqual(
      'Si è verificato un problema. Riprova tra qualche minuto'
    );
    expect(defaultMessage).toEqual('Si è verificato un problema. Riprova tra qualche minuto');
  });

  it('createAppError', () => {
    const axiosError: AxiosError = {
      message: 'mocked message',
      isAxiosError: true,
      name: 'error',
      toJSON: () => ({}),
      status: 404,
    };
    const createdAxiosError = createAppError(axiosError);
    expect(createdAxiosError.message).toEqual(
      'Si è verificato un problema. Riprova tra qualche minuto'
    );

    const apiError = new ApiException({ code: ResponseStatusCodeEnum.NUMBER_1, message: 'KO' });
    const createdApiError = createAppError(apiError);
    expect(createdApiError.message).toEqual(apiError.message);

    const jsError = new Error('custom error');
    const createdJsError = createAppError(jsError);
    expect(createdJsError.message).toEqual(
      'Si è verificato un problema. Riprova tra qualche minuto'
    );
  });
});
