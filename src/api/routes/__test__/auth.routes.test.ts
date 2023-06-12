import { TOKEN_EXCHANGE_PATH } from "../auth.routes";

describe("Auth routes", () => {
    it("should compile token exchange route", () => {
        const route = TOKEN_EXCHANGE_PATH;
        expect(route).toEqual(TOKEN_EXCHANGE_PATH);
    });
})