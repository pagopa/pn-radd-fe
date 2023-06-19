import { rest } from 'msw';
import { MOCK_AUTH_API, API_BASE_URL } from '../../utils/const';
import data from '../data';
import { TOKEN_EXCHANGE_PATH } from '../../api';

const enabledHandler = [
  rest.post(`${API_BASE_URL}${TOKEN_EXCHANGE_PATH}`, async (req, res, ctx) => {
    const body = await req.json();
    if (body.authorizationToken === 'token-ko') {
      return res(ctx.delay(1500), ctx.status(403));
    }

    return res(ctx.delay(1500), ctx.status(200), ctx.json(data.USER));
  }),
];

export const handler = MOCK_AUTH_API ? enabledHandler : [];
