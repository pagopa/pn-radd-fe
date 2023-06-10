import { DocumentInquiryType } from "../redux/document-inquiry/types";
import { SearchType } from "../redux/inquiry-history/types";

export const decodeRecipientType = (code?: string) => {
    switch(code) {
        case 'PF': return "Persona fisica";
        case 'PG': return "Persona giuridica";
        default: return "";
    }
};

export const decodeInquiryType = (code: string) => {
    switch(code) {
        case DocumentInquiryType.ACT: return 'Documenti allegati e attestazioni opponibili a terzi';
        case DocumentInquiryType.AOR: return 'Avvisi di avvenuta ricezione';
        default: return "";
    }
};

export const decodeSearchType = (code: string) => {
    switch(code) {
        case SearchType.IUN: return 'IUN';
        case SearchType.OPERATION_ID: return 'ID Operazione';
        case SearchType.TAX_ID: return 'Codice Fiscale';
        default: return "";
    }
};

export const getColorByOperationStatus = (status?: string) => {
    switch(status) {
        case "STARTED": return "warning";
        case "COMPLETED": return "success";
        case "ABORTED": return "error";
        default: return "primary";
    }
};

export const decodeOperationStatus = (status?: string) => {
    switch(status) {
        case "STARTED": return "Iniziata";
        case "COMPLETED": return "Completata";
        case "ABORTED": return "Errore";
        default: return "primary";
    }
};

