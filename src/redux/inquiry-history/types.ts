import { DocumentInquiryType } from "../document-inquiry/types";

export enum SearchType {
    IUN = 'IUN',
    OPERATION_ID = 'OPERATION_ID',
    TAX_ID = 'TAX_ID',
};
export type InquirySearchForm = {
    inquiryType: DocumentInquiryType;
    iun?: string;
    operationId: string;
    taxId: string;
    searchType: SearchType;
    from: Date | null;
    to: Date | null;
};