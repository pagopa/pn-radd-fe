import MockAdapter from 'axios-mock-adapter';
import { apiClient } from '../../axios';
import { ACT_DOCUMENT_INQUIRY_PATH } from '../../routes/document-inquiry.routes';
import data from '../../../mocks/data';
import { ActDocumentInquiryApi } from '../ActDocumentInquiry.api';

describe("ActDocumentInquiry Api", () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(apiClient);
    });

    afterEach(() => {
        mock.reset();
        mock.restore();
    });

    it("actDocumentInquiry ok", async () => {
        mock.onGet(ACT_DOCUMENT_INQUIRY_PATH).reply(200, data.ACT_INQUIRY_RESPONSES.ACT_INQUIRY_OK);
        const res = await ActDocumentInquiryApi.actDocumentInquiry("test", "PF", "test");
        expect(res).toStrictEqual(data.ACT_INQUIRY_RESPONSES.ACT_INQUIRY_OK);
    });
});