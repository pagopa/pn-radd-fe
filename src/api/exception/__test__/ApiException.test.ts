import { ResponseStatusCodeEnum } from '../../types';
import { ApiException } from '../ApiException';

describe('ApiException', () => {
  it('test exception', () => {
    const exception = new ApiException({ code: ResponseStatusCodeEnum.NUMBER_1, message: 'KO' });

    expect(exception.name).toEqual('ApiException');
    expect(exception.message).toEqual('KO');
  });
});
