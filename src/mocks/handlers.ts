import { rest } from 'msw';
import { AUTH_API_BASE_URL, MOCK_API, API_BASE_URL } from '../utils/const';
import { ActInquiryResponse } from '../api/types';
import data from './data';

const basePath = MOCK_API ? API_BASE_URL : '';

export const handlers = [
  rest.post(`${AUTH_API_BASE_URL}/token-exchange`, async (req, res, ctx) => {
    const body = await req.json();
    if (body.authorizationToken === 'token-ko') {
      return res(ctx.delay(1500), ctx.status(401));
    }

    return res(ctx.delay(1500), ctx.status(200), ctx.json(data.USER));
  }),
  rest.get(`${basePath}/radd-web/act/inquiry`, (req, res, ctx) => {
    const qrCode = req.url.searchParams.get('qrCode') ?? '404';
    if (qrCode === '404') {
      return res(ctx.delay(1200), ctx.status(404));
    }

    const MAP_QR_CODE_TO_RESPONSE : {[key:string]: ActInquiryResponse} = {
      IUN_KO_1: data.ACT_INQUIRY_RESPONSES.ACT_INQUIRY_KO,
      IUN_KO_2: data.ACT_INQUIRY_RESPONSES.ACT_INQUIRY_INVALID_DATA,
      IUN_KO_3: data.ACT_INQUIRY_RESPONSES.ACT_INQUIRY_ALREADY_PRINTED,
      IUN_KO_4: data.ACT_INQUIRY_RESPONSES.ACT_INQUIRY_UNAVAILABLE_DOC,
    };
    
    const response = MAP_QR_CODE_TO_RESPONSE[qrCode] ?? data.ACT_INQUIRY_RESPONSES.ACT_INQUIRY_OK;

    return res(ctx.delay(1200), ctx.status(200), ctx.json(response));
  }),
  rest.post(`${basePath}/radd-web/documents/upload`, (req, res, ctx) => {
    const response = data.UPLOAD.UPLOAD_OK;
    return res(ctx.delay(1200), ctx.json(response));
  }),
  rest.put(`${basePath}/upload-s3`, (req, res, ctx) => {
    const response = data.UPLOAD.S3_OK;
    return res(ctx.delay(1200), ctx.json(response));
  }),
  rest.post(`${basePath}/radd-web/act/transaction/start`, (req, res, ctx) => {
    const retryAfter = Math.random() * 7000;

    if (retryAfter > 4000) {
      return res(ctx.delay(1200), ctx.status(500), ctx.json({}));
    } else if (retryAfter > 2000) {
      const response = data.TRANSACTION.START_TRANSACTION_OK_WITH_RETRY(retryAfter);
      return res(ctx.delay(1200), ctx.json(response));
    } else {
      const response = data.TRANSACTION.START_TRANSACTION_OK;
      return res(ctx.delay(1200), ctx.json(response));
    }
    
  }),
  rest.post(`${basePath}/radd-web/act/transaction/complete`, (req, res, ctx) => {
    const response = data.TRANSACTION.COMPLETE_TRANSACTION_OK;

    return res(ctx.delay(1200), ctx.json(response));
  }),
  rest.get(`${basePath}/radd-web/aor/inquiry`, (req, res, ctx) => {
    const response = data.AOR_INQUIRY_RESPONSES.AOR_INQUIRY_OK;

    return res(ctx.delay(1200), ctx.status(200), ctx.json(response));
  }),
  rest.post(`${basePath}/radd-web/documents/upload`, (req, res, ctx) => {
    const response = data.UPLOAD.UPLOAD_OK;
    return res(ctx.delay(1200), ctx.json(response));
  }),
  rest.put(`${basePath}/upload-s3`, (req, res, ctx) => {
    const response = data.UPLOAD.S3_OK;
    return res(ctx.delay(1200), ctx.json(response));
  }),
  rest.post(`${basePath}/radd-web/aor/transaction/start`, (req, res, ctx) => {
    const retryAfter = Math.random() * 7000;
    if (retryAfter > 4000) {
      return res(ctx.delay(1200), ctx.status(500), ctx.json({}));
    } else if (retryAfter > 2000) {
      const response = data.TRANSACTION.START_TRANSACTION_OK_WITH_RETRY(retryAfter);
      return res(ctx.delay(1200), ctx.json(response));
    } else {
      const response = data.TRANSACTION.START_TRANSACTION_OK;
      return res(ctx.delay(1200), ctx.json(response));
    }
  }),
  rest.post(`${basePath}/radd-web/aor/transaction/complete`, (req, res, ctx) => {
    const response = data.TRANSACTION.COMPLETE_TRANSACTION_OK;

    return res(ctx.delay(1200), ctx.json(response));
  }),
];
