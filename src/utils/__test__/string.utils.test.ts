import { defaultRequiredMessage } from "../string.utils";

describe("string.utils", () => {
    it("defaultRequiredMessage", () => {
        expect(defaultRequiredMessage("Test")).toEqual('Il campo Test è obbligatorio.')
    });
})