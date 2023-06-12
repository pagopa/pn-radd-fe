import MockAdapter from 'axios-mock-adapter';
import { authClient } from '../../axios';
import { TOKEN_EXCHANGE_PATH } from '../../routes/auth.routes';
import data from '../../../mocks/data';
import { AuthApi } from '../Auth.api';

describe("AuthApi Api", () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(authClient);
    });

    afterEach(() => {
        mock.reset();
        mock.restore();
    });

    it("token exchange ok", async () => {
        mock.onPost(TOKEN_EXCHANGE_PATH).reply(200, data.USER);
        const res = await AuthApi.exchangeToken("test");
        expect(res).toStrictEqual(data.USER);
    });
});