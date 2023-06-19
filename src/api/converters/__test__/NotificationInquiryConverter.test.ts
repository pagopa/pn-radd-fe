import data from '../../../mocks/data';
import { NotificationInquiryConverter } from '../NotificationInquiryConverter';

describe('NotificationInquiryConverter', () => {
  it('operationsActDetailsToOperationsResponse', () => {
    const response = data.NOTIFICATION_INQUIRY.INQUIRY_ACT_BY_INTERNAL_ID_OK;
    const converted =
      NotificationInquiryConverter.operationsActDetailsToOperationsResponse(response);

    expect(converted.result).toStrictEqual(response.result);
    expect(converted.status).toStrictEqual(response.status);
    expect(converted.operations).toStrictEqual([
      {
        operationStatus: 'COMPLETED',
        operationType: 'ACT',
        iun: 'LJLH-GNTJ-DVXR-202209-J-1',
        iuns: ['LJLH-GNTJ-DVXR-202209-J-1'],
        operationId: 'asd1234',
        fileKey: 'FL-23-KKL',
        qrCode: 'FBD',
        recipientTaxId: 'TNTGTR76E21H751S',
        recipientType: 'PF',
        delegateTaxId: 'RFRGRZ66E21H751B',
        uid: 'uddHHHw123mk',
        operationStartDate: '2017-07-21T17:32:28Z',
        operationEndDate: '2017-07-21T18:00:28Z',
        errorReason: 'Error',
      },
    ]);
  });

  it('operationsAorDetailsToOperationsResponse', () => {
    const response = data.NOTIFICATION_INQUIRY.INQUIRY_AOR_BY_INTERNAL_ID_OK;
    const converted =
      NotificationInquiryConverter.operationsAorDetailsToOperationsResponse(response);
    expect(converted.result).toStrictEqual(response.result);
    expect(converted.status).toStrictEqual(response.status);
    expect(converted.operations).toStrictEqual(response.elements);
  });

  it('operationActResponseToOperationsResponse', () => {
    const response = data.NOTIFICATION_INQUIRY.INQUIRY_ACT_BY_OPERATION_ID_OK;
    const converted =
      NotificationInquiryConverter.operationActResponseToOperationsResponse(response);
    expect(converted.result).toStrictEqual(response.result);
    expect(converted.status).toStrictEqual(response.status);
    expect(converted.operations).toStrictEqual([
      {
        operationStatus: 'COMPLETED',
        operationType: 'AOR',
        iun: 'LJLH-GNTJ-DVXR-202209-J-1',
        iuns: ['LJLH-GNTJ-DVXR-202209-J-1'],
        operationId: 'asd1234',
        fileKey: 'FL-23-KKL',
        qrCode: 'FBD',
        recipientTaxId: 'TNTGTR76E21H751S',
        recipientType: 'PF',
        delegateTaxId: 'RFRGRZ66E21H751B',
        uid: 'uddHHHw123mk',
        operationStartDate: '2017-07-21T17:32:28Z',
        operationEndDate: '2017-07-21T18:00:28Z',
        errorReason: 'Error',
      },
    ]);
  });

  it('operationAorResponseToOperationsResponse', () => {
    const response = data.NOTIFICATION_INQUIRY.INQUIRY_AOR_BY_OPERATION_ID_OK;
    const converted =
      NotificationInquiryConverter.operationAorResponseToOperationsResponse(response);
    expect(converted.result).toStrictEqual(response.result);
    expect(converted.status).toStrictEqual(response.status);
    expect(converted.operations).toStrictEqual([response.element]);
  });
});
