import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DocumentInquiryType } from "../document-inquiry/types";
import { OperationsResponse } from "../../api/types";
import { InquirySearchForm, SearchType } from "./types";
import { searchInquiry } from "./actions";

type InquiryHistoryState = {
    searchData: InquirySearchForm;
    resultSearch: OperationsResponse;
};

const initialState: InquiryHistoryState = {
    searchData: {
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
    }
};

const slice = createSlice({
    name: 'inquiry-history',
    initialState,
    reducers: {
        setInquirySearchData: (state, action: PayloadAction<InquirySearchForm>) => {
            state.searchData = action.payload;
        },
        setInquiryResultSearch: (state, action: PayloadAction<OperationsResponse>) => {
            state.resultSearch = action.payload;
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(searchInquiry.fulfilled, (state, action) => {
            state.searchData = action.meta.arg;
            state.resultSearch = action.payload;
        });
    }
});

const { actions, reducer } = slice;

export const { reset, setInquirySearchData } = actions;

export const inquiryResultSearchSelector = (state: RootState) => state.inquiryHistory.resultSearch;

export const inquirySearchDataSelector = (state: RootState) => state.inquiryHistory.searchData;

export default reducer;