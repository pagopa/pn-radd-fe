import { TOKEN_EXCHANGE_PATH } from '../auth.routes';

describe('Auth routes', () => {
  it('should compile token exchange route', () => {
    const route = "/token-exchange";
    expect(route).toEqual(TOKEN_EXCHANGE_PATH);
  });
});
