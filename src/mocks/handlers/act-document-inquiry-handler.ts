import { rest } from 'msw';
import { MOCK_API, API_BASE_URL } from '../../utils/const';
import { ActInquiryResponse } from '../../api/types';
import data from '../data';

export const enabledHandler = [
  rest.get(`${API_BASE_URL}/radd-web/act/inquiry`, (req, res, ctx) => {
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
  })
];

export const handler = MOCK_API ? enabledHandler : [];
