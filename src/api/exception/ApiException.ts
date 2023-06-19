import { ResponseStatus } from '../types';

export class ApiException extends Error {
  error: ResponseStatus;
  constructor(error: ResponseStatus) {
    super(error.message || 'Unknown error');
    this.error = error;
    this.name = 'ApiException';
  }
}
