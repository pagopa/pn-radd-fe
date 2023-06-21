import MockAdapter from 'axios-mock-adapter';
import { apiClient } from '../../axios';
import { AOR_DOCUMENT_INQUIRY_PATH } from '../../routes/document-inquiry.routes';
import data from '../../../mocks/data';
import { AorDocumentInquiryApi } from '../AorDocumentInquiry.api';

describe('AorDocumentInquiry Api', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  it('aorocumentInquiry ok', async () => {
    mock.onGet(AOR_DOCUMENT_INQUIRY_PATH).reply(200, data.AOR_INQUIRY_RESPONSES.AOR_INQUIRY_OK);
    const res = await AorDocumentInquiryApi.aorDocumentInquiry('test', 'PF');
    expect(res).toStrictEqual(data.AOR_INQUIRY_RESPONSES.AOR_INQUIRY_OK);
  });
});
