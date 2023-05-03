import { rest } from 'msw';
import { MOCK_API, API_BASE_URL } from '../../utils/const';
import data from '../data';

export const enabledHandler = [
    rest.post(`${API_BASE_URL}/radd-web/act/transaction/start`, (req, res, ctx) => {
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
      rest.post(`${API_BASE_URL}/radd-web/act/transaction/complete`, (req, res, ctx) => {
        const response = data.TRANSACTION.COMPLETE_TRANSACTION_OK;
    
        return res(ctx.delay(1200), ctx.json(response));
      }),rest.post(`${API_BASE_URL}/radd-web/aor/transaction/start`, (req, res, ctx) => {
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
      rest.post(`${API_BASE_URL}/radd-web/aor/transaction/complete`, (req, res, ctx) => {
        const response = data.TRANSACTION.COMPLETE_TRANSACTION_OK;
    
        return res(ctx.delay(1200), ctx.json(response));
      }),
];

export const handler = MOCK_API ? enabledHandler : [];
