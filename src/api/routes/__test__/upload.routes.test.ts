import { GET_DOCUMENT_READY_PATH } from "../upload.routes";

describe("Upload routes", () => {
    it("should compile document ready path", () => {
        const path = GET_DOCUMENT_READY_PATH("test-fileKey");
        expect(path).toEqual(`/radd-web/document-ready/test-fileKey`);
    });
});