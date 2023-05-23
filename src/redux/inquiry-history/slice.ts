import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentInquiryType } from "../document-inquiry/types";
import { InquirySearchForm, SearchType } from "./types";
import { OperationsResponse } from "../../api/types";

type InquiryHistoryState = {
    searchForm: InquirySearchForm;
    resultSearch: OperationsResponse;
}

const initialState: InquiryHistoryState = {
    searchForm: {
        inquiryType: DocumentInquiryType.ACT,
        iun: '',
        operationId: '',
        taxId: '',
        searchType: SearchType.IUN,
        from: null,
        to: null,
    },
    resultSearch: {
        operations: undefined,
        result: undefined,
        status: undefined,
    },
};

const slice = createSlice({
    name: 'inquiry-history',
    initialState,
    reducers: {
        setInquirySearchData: (state, action: PayloadAction<InquirySearchForm>) => {
            state.searchForm = action.payload;
        },
        reset: () => initialState,
    },
});

const { actions, reducer } = slice;

export const { reset, setInquirySearchData } = actions;

export default reducer;