import { rest } from 'msw';
import { MOCK_API, API_BASE_URL } from '../../utils/const';
import data from '../data';

export const enabledHandler = [
  rest.get(`${API_BASE_URL}/radd-web/aor/inquiry`, (req, res, ctx) => {
    const response = data.AOR_INQUIRY_RESPONSES.AOR_INQUIRY_OK;

    return res(ctx.delay(1200), ctx.status(200), ctx.json(response));
  }),
];

export const handler = MOCK_API ? enabledHandler : [];
