import { NotificationInquiryApi } from '../../api';
import { OperationResponse } from '../../api/types';
import { setLoadingStatus } from '../app/slice';
import { DocumentInquiryType } from '../document-inquiry/types';
import { createAppAsyncThunk } from '../thunk';
import { InquirySearchForm } from './types';

const searchByOperationId = async (id: string, inquiryType: DocumentInquiryType) => 
    await NotificationInquiryApi.getPracticesByOperationId(id, inquiryType).then((res) => res);

const searchByIun = async (iun: string, inquiryType: DocumentInquiryType) => 
    await NotificationInquiryApi.getPracticesByIun(iun, inquiryType).then((res) => res);

const searchByInternalId = async (internalId: string, inquiryType: DocumentInquiryType, filterRequest: {from:string, to:string}) => 
    await NotificationInquiryApi.getPracticesByInternalId(internalId, inquiryType, filterRequest).then((res) => res);
    
export const startInquiry = createAppAsyncThunk<
    OperationResponse,
    InquirySearchForm
>('startInquiry', async (params: InquirySearchForm, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setLoadingStatus());
    switch (params.searchType) {
        case 'IUN':
            return await searchByIun(params.iun!, params.inquiryType);
        case 'OPERATION_ID':
            return await searchByOperationId(params.operationId, params.inquiryType);
        case 'TAX_ID':
            return await searchByInternalId(params.taxId, params.inquiryType, {from: params.from!.toISOString(), to: params.to!.toISOString()});
        default:
            throw new Error('Invalid search type');
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});