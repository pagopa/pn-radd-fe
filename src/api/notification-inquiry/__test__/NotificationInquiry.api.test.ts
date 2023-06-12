import MockAdapter from 'axios-mock-adapter';
import { apiClient } from '../../axios';
import { GET_PRACTICES_BY_INTERNAL_ID_PATH, GET_PRACTICES_BY_IUN_PATH, GET_TRANSACTION_BY_OPERATION_ID_PATH } from '../../routes/notification-inquiry.routes';
import data from '../../../mocks/data';
import { NotificationInquiryApi } from '../NotificationInquiry.api';
import { DocumentInquiryType } from '../../../redux/document-inquiry/types';
import { NotificationInquiryConverter } from '../../converters/NotificationInquiryConverter';

describe("NotificationInquiry Api", () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(apiClient);
    });

    afterEach(() => {
        mock.reset();
        mock.restore();
    });

    it("getPracticesByIun ACT ok", async () => {
        mock.onGet(GET_PRACTICES_BY_IUN_PATH("act", "test")).reply(200, data.NOTIFICATION_INQUIRY.INQUIRY_BY_IUN_OK);
        const res = await NotificationInquiryApi.getPracticesByIun("test", DocumentInquiryType.ACT);
        expect(res).toStrictEqual(data.NOTIFICATION_INQUIRY.INQUIRY_BY_IUN_OK);
    });

    it("getPracticesByIun AOR ok", async () => {
        mock.onGet(GET_PRACTICES_BY_IUN_PATH("aor", "test")).reply(200, data.NOTIFICATION_INQUIRY.INQUIRY_BY_IUN_OK);
        const res = await NotificationInquiryApi.getPracticesByIun("test", DocumentInquiryType.AOR);
        expect(res).toStrictEqual(data.NOTIFICATION_INQUIRY.INQUIRY_BY_IUN_OK);
    });

    it("getActTransactionByOperationId ok", async () => {
        mock.onGet(GET_TRANSACTION_BY_OPERATION_ID_PATH("test", "act")).reply(200, data.NOTIFICATION_INQUIRY.INQUIRY_ACT_BY_OPERATION_ID_OK);
        const res = await NotificationInquiryApi.getActTransactionByOperationId("test");
        expect(res).toStrictEqual(NotificationInquiryConverter.operationActResponseToOperationsResponse(data.NOTIFICATION_INQUIRY.INQUIRY_ACT_BY_OPERATION_ID_OK));
    });

    it("getAorTransactionByOperationId ok", async () => {
        mock.onGet(GET_TRANSACTION_BY_OPERATION_ID_PATH("test", "aor")).reply(200, data.NOTIFICATION_INQUIRY.INQUIRY_AOR_BY_OPERATION_ID_OK);
        const res = await NotificationInquiryApi.getAorTransactionByOperationId("test");
        expect(res).toStrictEqual(NotificationInquiryConverter.operationAorResponseToOperationsResponse(data.NOTIFICATION_INQUIRY.INQUIRY_AOR_BY_OPERATION_ID_OK));
    });

    it("getActPracticesByInternalId ok", async () => {
        mock.onPost(GET_PRACTICES_BY_INTERNAL_ID_PATH("test", "act")).reply(200, data.NOTIFICATION_INQUIRY.INQUIRY_ACT_BY_INTERNAL_ID_OK);
        const res = await NotificationInquiryApi.getActPracticesByInternalId("test");
        expect(res).toStrictEqual(NotificationInquiryConverter.operationsActDetailsToOperationsResponse(data.NOTIFICATION_INQUIRY.INQUIRY_ACT_BY_INTERNAL_ID_OK));
    });

    it("getAorPracticesByInternalId ok", async () => {
        mock.onPost(GET_PRACTICES_BY_INTERNAL_ID_PATH("test", "aor")).reply(200, data.NOTIFICATION_INQUIRY.INQUIRY_AOR_BY_INTERNAL_ID_OK);
        const res = await NotificationInquiryApi.getAorPracticesByInternalId("test");
        expect(res).toStrictEqual(NotificationInquiryConverter.operationsAorDetailsToOperationsResponse(data.NOTIFICATION_INQUIRY.INQUIRY_AOR_BY_INTERNAL_ID_OK));
    });
});