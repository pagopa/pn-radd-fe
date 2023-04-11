export enum Phases {
    UPLOAD_PHASE = ("UPLOAD_PHASE"),
    START_TRANSACTION = ("START_TRANSACTION"),
    WAIT_TRANSACTION = ("WAIT_TRANSACTION")
}

export type InquiryFilesState = {
    phase: Phases,
    retryAfter?: number
}

export type InquiryFilesAction = {
    type: 'START_TRANSACTION' | 'WAIT_TRANSACTION',
    payload?: {
        retryAfter?: number
    }
}

export const inquiryFilesReducer = (state: InquiryFilesState, action: InquiryFilesAction) => {
    switch(action.type) {
        case "START_TRANSACTION": return {...state, phase: Phases.START_TRANSACTION};
        case "WAIT_TRANSACTION": return {...state, phase: Phases.WAIT_TRANSACTION, retryAfter: action.payload?.retryAfter};
        default: {
            console.error("Invalid Phase"); 
            return state;
        }
    }
}

export const startTransactionAction = () : InquiryFilesAction => ({ type: "START_TRANSACTION" });

export const waitTransactionAction = (retryAfter: number) : InquiryFilesAction => ({ type: "WAIT_TRANSACTION", payload: { retryAfter }});