import { GET_PRACTICES_BY_INTERNAL_ID_PATH, GET_PRACTICES_BY_IUN_PATH, GET_TRANSACTION_BY_OPERATION_ID_PATH } from "../notification-inquiry.routes";

describe("Notification inquiry routes", () => {
    it("should compile practises by iun path (ACT)", () => {
        const path = GET_PRACTICES_BY_IUN_PATH("act", "iun-test");
        expect(path).toEqual(`/radd-web/act/operations/by-iun/iun-test`);
    });

    it("should compile practises by iun path (AOR)", () => {
        const path = GET_PRACTICES_BY_IUN_PATH("aor", "iun-test");
        expect(path).toEqual(`/radd-web/aor/operations/by-iun/iun-test`);
    });

    it("should compile transaction by operation id path (ACT)", () => {
        const path = GET_TRANSACTION_BY_OPERATION_ID_PATH("test-id", "act");
        expect(path).toEqual(`/radd-web/act/operations/by-id/test-id`);
    });

    it("should compile transaction by operation id path (AOR)", () => {
        const path = GET_TRANSACTION_BY_OPERATION_ID_PATH("test-id", "aor");
        expect(path).toEqual(`/radd-web/aor/operations/by-id/test-id`);
    });

    it("should compile practises by internal id path (ACT)", () => {
        const path = GET_PRACTICES_BY_INTERNAL_ID_PATH("internal-id", "act");
        expect(path).toEqual(`/radd-web/act/operations/by-internalId/internal-id`);
    });

    it("should compile practises by internal id path (AOR)", () => {
        const path = GET_PRACTICES_BY_INTERNAL_ID_PATH("internal-id", "aor");
        expect(path).toEqual(`/radd-web/aor/operations/by-internalId/internal-id`);
    });
});