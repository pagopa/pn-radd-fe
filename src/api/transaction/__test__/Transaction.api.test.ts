import MockAdapter from 'axios-mock-adapter';
import { apiClient } from '../../axios';
import data from '../../../mocks/data';
import { TransactionApi } from '../Transaction.api';
import { GET_ABORT_TRANSACTION_PATH, GET_COMPLETE_TRANSACTION_PATH, GET_START_TRANSACTION_PATH } from '../../routes/transaction.routes';
import { DocumentInquiryType } from '../../../redux/document-inquiry/types';

describe("TransactionApi", () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(apiClient);
    });

    afterEach(() => {
        mock.reset();
        mock.restore();
    });

    it("startTransaction ok", async () => {
        mock.onPost(GET_START_TRANSACTION_PATH("act")).reply(200, data.TRANSACTION.START_TRANSACTION_OK);
        const res = await TransactionApi.startTransaction({
            versionToken: '',
            fileKey: '',
            operationId: '',
            recipientTaxId: '',
            checksum: ''
        }, DocumentInquiryType.ACT);
        expect(res).toStrictEqual(data.TRANSACTION.START_TRANSACTION_OK);
    });

    it("completeTransaction ok", async () => {
        mock.onPost(GET_COMPLETE_TRANSACTION_PATH("act")).reply(200, data.TRANSACTION.COMPLETE_TRANSACTION_OK);
        const res = await TransactionApi.completeTransaction({
            operationId: '',
            operationDate: ''
        }, DocumentInquiryType.ACT);
        expect(res).toStrictEqual(data.TRANSACTION.COMPLETE_TRANSACTION_OK);
    });

    it("abortTransaction ok", async () => {
        mock.onPost(GET_ABORT_TRANSACTION_PATH("act")).reply(200, data.TRANSACTION.ABORT_TRANSACTION_OK);
        const res = await TransactionApi.abortTransaction({
            operationId: '',
            operationDate: ''
        }, DocumentInquiryType.ACT);
        expect(res).toStrictEqual(data.TRANSACTION.ABORT_TRANSACTION_OK);
    });
});