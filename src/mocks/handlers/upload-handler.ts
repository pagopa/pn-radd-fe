import { rest } from 'msw';
import { MOCK_API, API_BASE_URL } from '../../utils/const';
import data from '../data';

export const enabledHandler = [
  rest.post(`${API_BASE_URL}/radd-web/documents/upload`, (req, res, ctx) => {
    const response = data.UPLOAD.UPLOAD_OK;
    return res(ctx.delay(1200), ctx.json(response));
  })
];

const s3Handler = [
  rest.put(`${API_BASE_URL}/upload-s3`, (req, res, ctx) => {
    const response = data.UPLOAD.S3_OK;
    return res(ctx.delay(1200), ctx.json(response));
  })
];

export const handler = MOCK_API ? [...enabledHandler, ...s3Handler] : [...s3Handler];
