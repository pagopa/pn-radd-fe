import { AOR_DOCUMENT_INQUIRY_PATH, ACT_DOCUMENT_INQUIRY_PATH } from "../document-inquiry.routes";


describe("Document inquiry routes", () => {
    it("should compile document inquiry aor route", () => {
        const path = AOR_DOCUMENT_INQUIRY_PATH;
        expect(path).toEqual(`/radd-web/aor/inquiry`);
    });

    it("should compile document inquiry act route", () => {
        const path = ACT_DOCUMENT_INQUIRY_PATH;
        expect(path).toEqual(`/radd-web/act/inquiry`);
    });
});