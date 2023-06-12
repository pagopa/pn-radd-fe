import { GET_ABORT_TRANSACTION_PATH, GET_COMPLETE_TRANSACTION_PATH, GET_START_TRANSACTION_PATH } from "../transaction.routes";

describe("Transaction routes", () => {
    it("should compile startTransaction path (ACT)", () => {
        const path = GET_START_TRANSACTION_PATH("act");
        expect(path).toEqual(`/radd-web/act/transaction/start`);
    });

    it("should compile startTransaction path (AOR)", () => {
        const path = GET_START_TRANSACTION_PATH("aor");
        expect(path).toEqual(`/radd-web/aor/transaction/start`);
    });

    it("should compile completeTransaction path (ACT)", () => {
        const path = GET_COMPLETE_TRANSACTION_PATH("act");
        expect(path).toEqual(`/radd-web/act/transaction/complete`);
    });

    it("should compile completeTransaction path (AOR)", () => {
        const path = GET_COMPLETE_TRANSACTION_PATH("aor");
        expect(path).toEqual(`/radd-web/aor/transaction/complete`);
    });

    it("should compile abortTransaction path (ACT)", () => {
        const path = GET_ABORT_TRANSACTION_PATH("act");
        expect(path).toEqual(`/radd-web/act/transaction/abort`);
    });

    it("should compile abortTransaction path (AOR)", () => {
        const path = GET_ABORT_TRANSACTION_PATH("aor");
        expect(path).toEqual(`/radd-web/aor/transaction/abort`);
    });
});