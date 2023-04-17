export enum Phases {
    UPLOAD_PHASE = ("UPLOAD_PHASE"),
    WAITING_PHASE = ("WAITING_PHASE")
}

export type InquiryFilesState = {
    phase: Phases,
    uploadData?: WaitingPhasePayload,
    files: {
        [key in DocumentOwner]?: File
    }
}

export type DocumentOwner = "delegate" | "recipient"

export type UploadFilePayload = {
    owner: DocumentOwner,
    file: File
}
export type UploadFileAction = {
    type: 'FILE_UPLOAD',
    payload: UploadFilePayload
}

export type RemoveFileAction = {
    type: 'FILE_REMOVE',
    payload: DocumentOwner
}

export type UploadPhaseAction = {
    type: 'UPLOAD_PHASE',
    payload?: undefined
}

export type WaitingPhasePayload = {
    checksum: string,
    bundleId: string,
    zip: Blob
}
export type WaitingPhaseAction = {
    type: 'WAITING_PHASE',
    payload: WaitingPhasePayload
}

type ActionsType = UploadFileAction| RemoveFileAction | UploadPhaseAction | WaitingPhaseAction;

export const inquiryFilesReducer = (state: InquiryFilesState, action: ActionsType) => {
    const { type, payload } = action;
    switch(type) {
        case "FILE_UPLOAD": {
            const {file, owner} = payload;
            return {...state, files: {[owner]: file}};
        }
        case "FILE_REMOVE": return {...state, files:{[payload]: undefined}};
        case "UPLOAD_PHASE": return {...state, phase: Phases.UPLOAD_PHASE};
        case "WAITING_PHASE": {
            return {...state, phase: Phases.WAITING_PHASE, uploadData: payload };
        }
        default: {
            console.error("Invalid Phase"); 
            return state;
        }
    }
}

export const uploadPhaseAction = () : UploadPhaseAction => ({ type: "UPLOAD_PHASE" });

export const waitingPhaseAction = ({bundleId, checksum, zip}: WaitingPhasePayload) : WaitingPhaseAction => ({ type: "WAITING_PHASE", payload: { bundleId, checksum, zip }});

export const uploadFileAction = (payload: UploadFilePayload) : UploadFileAction => ({type: "FILE_UPLOAD", payload});

export const removeFileAction = (payload: DocumentOwner) : RemoveFileAction => ({type: "FILE_REMOVE", payload});