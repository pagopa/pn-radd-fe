import { rest } from 'msw';
import { API_BASE_URL } from '../utils/const';
import data from './data';

const BASE_PATH = API_BASE_URL;

export const handlers = [
  rest.get(`${BASE_PATH}/radd-private/api/v1/act/inquiry`, (req, res, ctx) => {
    const qrCode = req.url.searchParams.get('qrCode');
    if (qrCode == '404') {
      return res(ctx.delay(1200), ctx.status(404));
    }

    let response;

    switch (qrCode) {
      case 'IUN_KO_1':
        response = data.ACT_INQUIRY_RESPONSES.ACT_INQUIRY_KO;
        break;
      case 'IUN_KO_2':
        response = data.ACT_INQUIRY_RESPONSES.ACT_INQUIRY_INVALID_DATA;
        break;
      case 'IUN_KO_3':
        response = data.ACT_INQUIRY_RESPONSES.ACT_INQUIRY_ALREADY_PRINTED;
        break;
      case 'IUN_KO_4':
        response = data.ACT_INQUIRY_RESPONSES.ACT_INQUIRY_UNAVAILABLE_DOC;
        break;
      default:
        response = data.ACT_INQUIRY_RESPONSES.ACT_INQUIRY_OK;
    }

    return res(ctx.delay(1200), ctx.status(200), ctx.json(response));
  }),
  rest.post(`${BASE_PATH}/radd-private/api/v1/documents/upload`, (req, res, ctx) => {
    const response = data.UPLOAD.UPLOAD_OK;
    return res(ctx.delay(1200), ctx.json(response));

    /*
            return res(
                ctx.delay(1200),
                ctx.status(500)
            )
        */
  }),
  rest.put(`${BASE_PATH}/mock/upload-s3`, (req, res, ctx) => {
    const response = data.UPLOAD.S3_OK;
    return res(ctx.delay(1200), ctx.json(response));
  }),
  rest.post(`${BASE_PATH}/radd-private/api/v1/act/transaction/start`, (req, res, ctx) => {
    const retryAfter = Math.random() * 7000;
    let response;

    if (retryAfter > 4000) {
      return res(ctx.delay(1200), ctx.status(500), ctx.json(response));
    }
    if (retryAfter > 2000) {
      response = data.ACT_TRANSACTION.START_ACT_TRANSACTION_OK_WITH_RETRY(retryAfter);
    } else {
      response = data.ACT_TRANSACTION.START_ACT_TRANSACTION_OK;
    }

    return res(ctx.delay(1200), ctx.json(response));
  }),
  rest.post(`${BASE_PATH}/radd-private/api/v1/act/transaction/complete`, (req, res, ctx) => {
    const response = data.ACT_TRANSACTION.COMPLETE_ACT_TRANSACTION_OK;

    return res(ctx.delay(1200), ctx.json(response));
  }),
];
