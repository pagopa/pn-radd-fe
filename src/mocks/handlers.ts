import { rest } from 'msw';
import { API_BASE_URL, AUTH_API_BASE_URL } from '../utils/const';
import { ActInquiryResponse } from '../api/types';
import data from './data';


export const handlers = [
  rest.post(`${AUTH_API_BASE_URL}/token-exchange`, async (req, res, ctx) => {
    const body = await req.json();
    if (body.authorizationToken === 'token-ko') {
      return res(ctx.delay(1500), ctx.status(401));
    }

    return res(ctx.delay(1500), ctx.status(200), ctx.json(data.USER));
  }),
  rest.get(`${API_BASE_URL}/radd/act/inquiry`, (req, res, ctx) => {
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
  rest.post(`${API_BASE_URL}/radd/documents/upload`, (req, res, ctx) => {
    const response = data.UPLOAD.UPLOAD_OK;
    return res(ctx.delay(1200), ctx.json(response));
  }),
  rest.put(`${API_BASE_URL}/mock/upload-s3`, (req, res, ctx) => {
    const response = data.UPLOAD.S3_OK;
    return res(ctx.delay(1200), ctx.json(response));
  }),
  rest.post(`${API_BASE_URL}/radd/act/transaction/start`, (req, res, ctx) => {
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
  rest.post(`${API_BASE_URL}/radd/act/transaction/complete`, (req, res, ctx) => {
    const response = data.TRANSACTION.COMPLETE_TRANSACTION_OK;

    return res(ctx.delay(1200), ctx.json(response));
  }),
  rest.get(`${API_BASE_URL}/radd/aor/inquiry`, (req, res, ctx) => {
    const response = data.AOR_INQUIRY_RESPONSES.AOR_INQUIRY_OK;

    return res(ctx.delay(1200), ctx.status(200), ctx.json(response));
  }),
  rest.post(`${API_BASE_URL}/radd/documents/upload`, (req, res, ctx) => {
    const response = data.UPLOAD.UPLOAD_OK;
    return res(ctx.delay(1200), ctx.json(response));
  }),
  rest.put(`${API_BASE_URL}/mock/upload-s3`, (req, res, ctx) => {
    const response = data.UPLOAD.S3_OK;
    return res(ctx.delay(1200), ctx.json(response));
  }),
  rest.post(`${API_BASE_URL}/radd/aor/transaction/start`, (req, res, ctx) => {
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
  rest.post(`${API_BASE_URL}/radd/aor/transaction/complete`, (req, res, ctx) => {
    const response = data.TRANSACTION.COMPLETE_TRANSACTION_OK;

    return res(ctx.delay(1200), ctx.json(response));
  }),
];
