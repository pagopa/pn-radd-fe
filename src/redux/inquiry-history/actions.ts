import { NotificationInquiryApi } from '../../api';
import { FilterRequest, OperationsResponse } from '../../api/types';
import { setLoadingStatus } from '../app/slice';
import { DocumentInquiryType } from '../document-inquiry/types';
import { createAppAsyncThunk } from '../thunk';
import { InquirySearchForm } from './types';


const searchByOperationId = async (id: string, inquiryType: DocumentInquiryType) => {
    if(inquiryType === DocumentInquiryType.ACT) {
        return await NotificationInquiryApi.getActTransactionByOperationId(id).then((res) => res);
    } else if(inquiryType === DocumentInquiryType.AOR) {
        return await NotificationInquiryApi.getAorTransactionByOperationId(id).then((res) => res);
    }

    throw new Error("Invalid Inquiry Type");
};

const searchByInternalId = async (internalId: string, inquiryType: DocumentInquiryType, filterRequest: FilterRequest) => {
    if(inquiryType === DocumentInquiryType.ACT) {
        return await NotificationInquiryApi.getActPracticesByInternalId(internalId, filterRequest).then((res) => res);
    } else if(inquiryType === DocumentInquiryType.AOR) {
        return await NotificationInquiryApi.getAorPracticesByInternalId(internalId, filterRequest).then((res) => res);
    }
    
    throw new Error("Invalid Inquiry Type");
};

const searchByIun = async (iun: string, inquiryType: DocumentInquiryType) => 
    await NotificationInquiryApi.getPracticesByIun(iun, inquiryType).then((res) => res);
    
export const searchInquiry = createAppAsyncThunk<
    OperationsResponse,
    InquirySearchForm
>('searchInquiry', async (params: InquirySearchForm, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setLoadingStatus());
    const { inquiryType, iun, operationId, taxId, from, to } = params;
    switch (params.searchType) {
        case 'IUN':
            return await searchByIun(iun, inquiryType);
        case 'OPERATION_ID':
            return await searchByOperationId(operationId, inquiryType);
        case 'TAX_ID':
            return await searchByInternalId(taxId, inquiryType, {from: from ? from.toISOString() : undefined, to: to ? to.toISOString() : undefined});
        default:
            throw new Error('Invalid search type');
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});