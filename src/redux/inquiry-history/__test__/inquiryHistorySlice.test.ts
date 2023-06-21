import { DocumentInquiryType } from '../../document-inquiry/types';
import { SearchType } from '../types';
import { store } from '../../store';
import { searchInquiry } from '../actions';
import data from '../../../mocks/data';
import { NotificationInquiryConverter } from '../../../api/converters/NotificationInquiryConverter';

describe('Inquiry History state test', () => {
  it('Test initial state', () => {
    const state = store.getState();

    expect(state.inquiryHistory).toEqual({
      searchData: {
        inquiryType: DocumentInquiryType.ACT,
        iun: '',
        operationId: '',
        taxId: '',
        searchType: SearchType.IUN,
        from: null,
        to: null,
        recipientType: 'PF',
      },
      resultSearch: {
        operations: undefined,
        result: undefined,
        status: undefined,
      },
    });
  });

  it('Handle searchInquiry by IUN action', async () => {
    const stateBefore = store.getState().inquiryHistory;
    const input = {
      ...stateBefore.searchData,
      searchType: SearchType.IUN,
      iun: 'LXNR-QZZA-BNDS-202209-K-1',
    };

    const action = await store.dispatch(searchInquiry(input));
    expect(action.type).toBe('searchInquiry/fulfilled');
    const stateAfter = store.getState().inquiryHistory;

    expect(stateAfter.resultSearch).toEqual(data.NOTIFICATION_INQUIRY.INQUIRY_BY_IUN_OK);
    expect(stateAfter.searchData).toEqual(input);
  });

  it('Handle searchInquiry by Operation ID action (ACT)', async () => {
    const stateBefore = store.getState().inquiryHistory;
    const input = {
      ...stateBefore.searchData,
      inquiryType: DocumentInquiryType.ACT,
      searchType: SearchType.OPERATION_ID,
      operationId: 'test',
    };

    const action = await store.dispatch(searchInquiry(input));
    expect(action.type).toBe('searchInquiry/fulfilled');
    const stateAfter = store.getState().inquiryHistory;

    const convertedResponse = NotificationInquiryConverter.operationActResponseToOperationsResponse(
      data.NOTIFICATION_INQUIRY.INQUIRY_ACT_BY_OPERATION_ID_OK
    );
    expect(stateAfter.resultSearch).toEqual(convertedResponse);
    expect(stateAfter.searchData).toEqual(input);
  });

  it('Handle searchInquiry by Operation ID action (AOR)', async () => {
    const stateBefore = store.getState().inquiryHistory;
    const input = {
      ...stateBefore.searchData,
      inquiryType: DocumentInquiryType.AOR,
      searchType: SearchType.OPERATION_ID,
      operationId: 'test',
    };

    const action = await store.dispatch(searchInquiry(input));
    expect(action.type).toBe('searchInquiry/fulfilled');
    const stateAfter = store.getState().inquiryHistory;

    const convertedResponse = NotificationInquiryConverter.operationAorResponseToOperationsResponse(
      data.NOTIFICATION_INQUIRY.INQUIRY_AOR_BY_OPERATION_ID_OK
    );
    expect(stateAfter.resultSearch).toEqual(convertedResponse);
    expect(stateAfter.searchData).toEqual(input);
  });

  it('Handle searchInquiry by TaxId action (ACT)', async () => {
    const stateBefore = store.getState().inquiryHistory;
    const input = {
      ...stateBefore.searchData,
      inquiryType: DocumentInquiryType.ACT,
      searchType: SearchType.TAX_ID,
      taxId: 'test',
    };

    const action = await store.dispatch(searchInquiry(input));
    expect(action.type).toBe('searchInquiry/fulfilled');
    const stateAfter = store.getState().inquiryHistory;

    const convertedResponse = NotificationInquiryConverter.operationsActDetailsToOperationsResponse(
      data.NOTIFICATION_INQUIRY.INQUIRY_ACT_BY_INTERNAL_ID_OK
    );
    expect(stateAfter.resultSearch).toEqual(convertedResponse);
    expect(stateAfter.searchData).toEqual(input);
  });

  it('Handle searchInquiry by TaxId action (AOR)', async () => {
    const stateBefore = store.getState().inquiryHistory;
    const input = {
      ...stateBefore.searchData,
      inquiryType: DocumentInquiryType.AOR,
      searchType: SearchType.TAX_ID,
      taxId: 'test',
    };

    const action = await store.dispatch(searchInquiry(input));
    expect(action.type).toBe('searchInquiry/fulfilled');
    const stateAfter = store.getState().inquiryHistory;

    const convertedResponse = NotificationInquiryConverter.operationsAorDetailsToOperationsResponse(
      data.NOTIFICATION_INQUIRY.INQUIRY_AOR_BY_INTERNAL_ID_OK
    );
    expect(stateAfter.resultSearch).toEqual(convertedResponse);
    expect(stateAfter.searchData).toEqual(input);
  });
});
