import { rest } from 'msw';
import { MOCK_API, API_BASE_URL } from '../../utils/const';
import data from '../data';
import { AOR_DOCUMENT_INQUIRY_PATH } from '../../api';

export const enabledHandler = [
  rest.get(`${API_BASE_URL}${AOR_DOCUMENT_INQUIRY_PATH}`, (req, res, ctx) => {
    const response = data.AOR_INQUIRY_RESPONSES.AOR_INQUIRY_OK;

    return res(ctx.delay(500), ctx.status(200), ctx.json(response));
  }),
];

export const handler = MOCK_API ? enabledHandler : [];
