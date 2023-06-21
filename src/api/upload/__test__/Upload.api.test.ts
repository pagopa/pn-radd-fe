import MockAdapter from 'axios-mock-adapter';
import { apiClient, authClient } from '../../axios';
import data from '../../../mocks/data';
import { UploadApi } from '../Upload.api';
import { DOCUMENT_UPLOAD_PATH, GET_DOCUMENT_READY_PATH } from '../../routes/upload.routes';

describe('UploadApi', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  it('documentUpload ok', async () => {
    mock.onPost(DOCUMENT_UPLOAD_PATH).reply(200, data.UPLOAD.UPLOAD_OK);
    const res = await UploadApi.documentUpload({
      contentType: '',
      checksum: '',
    });
    expect(res).toStrictEqual(data.UPLOAD.UPLOAD_OK);
  });

  it('documentReady ok', async () => {
    mock.onGet(GET_DOCUMENT_READY_PATH('fileKey')).reply(200, data.UPLOAD.DOCUMENT_READY_OK);
    const res = await UploadApi.documentReady('fileKey');
    expect(res).toStrictEqual(data.UPLOAD.DOCUMENT_READY_OK);
  });

  it('s3Upload ok', async () => {
    const mockS3 = new MockAdapter(authClient);
    const presignedUrl = 'http://localhost/s3/presignedUrl';
    mockS3.onPut(presignedUrl).reply(200, {}, { ['x-amz-version-id']: 'test' });
    const res = await UploadApi.s3Upload(presignedUrl, {
      file: new Blob(),
    });
    expect(res).toStrictEqual('test');
  });
});
