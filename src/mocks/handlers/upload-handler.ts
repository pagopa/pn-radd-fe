import { rest } from 'msw';
import { MOCK_API, API_BASE_URL } from '../../utils/const';
import data from '../data';
import { DOCUMENT_READY_PATH, DOCUMENT_UPLOAD_PATH } from '../../api';

export const enabledHandler = [
  rest.post(`${API_BASE_URL}${DOCUMENT_UPLOAD_PATH}`, (req, res, ctx) => {
    const response = data.UPLOAD.UPLOAD_OK;
    return res(ctx.delay(500), ctx.json(response));
  }),
  rest.get(`${API_BASE_URL}${DOCUMENT_READY_PATH}`, (req, res, ctx) => {
    const rnd = Math.random() * 3;
    const response = rnd > 2 ? data.UPLOAD.DOCUMENT_READY_OK : data.UPLOAD.DOCUMENT_READY_KO;
    return res(ctx.delay(500), ctx.json(response));
  })
];

const s3Handler = [
  rest.put(`${API_BASE_URL}/upload-s3`, (req, res, ctx) => {
    const response = data.UPLOAD.S3_OK;
    return res(ctx.delay(500), ctx.json(response), ctx.set('x-amz-version-id', 'test'));
  })
];

export const handler = MOCK_API ? [...enabledHandler, ...s3Handler] : [...s3Handler];
