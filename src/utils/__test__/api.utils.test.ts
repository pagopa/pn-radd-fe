import { ResponseStatusCodeEnum } from '../../api/types';
import { DocumentInquiryType } from '../../redux/document-inquiry/types';
import { getDomainByInquiryType, isApiError, recursivePolling } from '../api.utils';

describe('api utils', () => {
  it('getDomainByInquiryType', () => {
    const actDomain = getDomainByInquiryType(DocumentInquiryType.ACT);
    const aorDomain = getDomainByInquiryType(DocumentInquiryType.AOR);
    expect(actDomain).toEqual('act');
    expect(aorDomain).toEqual('aor');
  });

  it('isApiError', () => {
    const apiError = {
      status: {
        code: ResponseStatusCodeEnum.NUMBER_99,
        message: 'API Error',
      },
    };

    expect(isApiError(apiError)).toBeTruthy();
  });

  it('recursivePolling ok', async () => {
    const fakeApi = jest
      .fn()
      .mockResolvedValue('Not done yet')
      .mockResolvedValue('Not done yet')
      .mockResolvedValue('Done');
    const successVerifierFn = (res: string) => res === 'Done';
    const res = await recursivePolling(fakeApi, successVerifierFn, 3, 100);
    expect(res).toEqual('Done');
  });

  it('recursivePolling ko', async () => {
    const fakeApi = jest
      .fn()
      .mockResolvedValue('Not done yet')
      .mockResolvedValue('Not done yet')
      .mockResolvedValue('Not done yet');
    const successVerifierFn = (res: string) => res === 'Done';
    try {
      const res = await recursivePolling(fakeApi, successVerifierFn, 3, 100);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });
});
