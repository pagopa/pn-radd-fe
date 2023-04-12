import { useReducer, useRef } from "react";

import { Alert, Box, Input, LinearProgress, SxProps, Typography } from "@mui/material";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import OrientedBox from "./OrientedBlock";

import { calcUnit8Array, calcSha256String, calcBase64String } from '../../../utils/file.utils';

type Props = {
    uploadText: string;
    vertical?: boolean;
    accept: Array<string>;
    uploadFn?: (file: any, sha256?: { hashBase64: string; hashHex: string }) => Promise<void>;
    onFileUploaded: (file: any, sha256?: { hashBase64: string; hashHex: string }) => void;
    isSending?: boolean;
    sx?: SxProps;
    calcSha256?: boolean;
    fileFormat?: 'base64' | 'uint8Array';
};

enum UploadStatus {
    TO_UPLOAD = 'TO_UPLOAD',
    IN_PROGRESS = 'IN_PROGRESS',
    UPLOADED = 'UPLOADED',
    SENDING = 'SENDING',
}
  
type UploadState = {
    file: any;
    status: UploadStatus;
    error: string;
    sha256: string;
};

enum UploadActions {
    ADD_FILE = "ADD_FILE",
    FILE_TYPE_NOT_SUPPORTED = "FILE_TYPE_NOT_SUPPORTED",
    UPLOAD_IN_ERROR = "UPLOAD_IN_ERROR",
    FILE_UPLOADED = "FILE_UPLOADED",
    COMPLETE_UPLOAD = "COMPLETE_UPLOAD",
    IS_SENDING = "IS_SENDING"
}

const reducer = (state: UploadState, action: { type: UploadActions; payload?: any }) => {
    switch (action.type) {
        case UploadActions.ADD_FILE:
            return { ...state, status: UploadStatus.IN_PROGRESS, file: action.payload, error: '' };
        case UploadActions.FILE_TYPE_NOT_SUPPORTED:
            return {
                ...state,
                error: "L'estensione dei seguenti file non è supportata: " + action.payload.fileNames
            };
        case UploadActions.UPLOAD_IN_ERROR:
        return {
            ...state,
            file: null,
            status: UploadStatus.TO_UPLOAD,
            error: 'Si è verificato un errore durante il caricamento del file. Si prega di riprovare.',
            sha256: '',
        };
        case UploadActions.FILE_UPLOADED:
            return { ...state, status: UploadStatus.UPLOADED, error: '', sha256: action.payload };
        case UploadActions.COMPLETE_UPLOAD:
            return { ...state, status: UploadStatus.TO_UPLOAD, file: null, sha256: '' };
        case UploadActions.IS_SENDING:
            return { ...state, status: UploadStatus.SENDING };
        default:
            return state;
    }
};

const containerStyle = (status: UploadStatus) => {
    switch(status) {
        case UploadStatus.IN_PROGRESS:
        case UploadStatus.SENDING:
            return {
                backgroundColor: 'white',
                '& > div': {
                    height: '24px',
                }
            };
        case UploadStatus.UPLOADED:
            return {
                border: '1px solid',
                borderColor: 'primary.main',
                backgroundColor: 'white',
            };
        default:
            return {
                border: '1px solid',
                borderColor: 'primary.main'
            };
    }
    
}

function UploadBox({
    uploadText,
    vertical = false,
    accept,
    uploadFn,
    onFileUploaded,
    isSending,
    sx,
    calcSha256 = false,
    fileFormat}: Props) {
    const [data, dispatch] = useReducer(reducer, {
        status: UploadStatus.TO_UPLOAD,
        file: null,
        error: '',
        sha256: '',
    });
      
    const uploadInputRef = useRef();

    const boxContainerRef = useRef<HTMLDivElement>();
    
    const uploadFiles = async (files: FileList) => {
        let unacceptedFileNames : Array<string> = [];
        
        for(let i = 0; i < files.length; i++) {
            let file = files.item(i);
            if (file && file.type && accept.indexOf(file.type) > -1) {
                dispatch({ type: UploadActions.ADD_FILE, payload: file });
                try {
                  /* eslint-disable-next-line functional/no-let */
                  let fileFormatted : any = file;
                  if (fileFormat === 'base64') {
                    fileFormatted = await calcBase64String(file);
                  } else if (fileFormat === 'uint8Array') {
                    fileFormatted = await calcUnit8Array(file);
                  }
                  const sha256 = calcSha256 ? await calcSha256String(file) : undefined;
                  if (uploadFn) {
                    await uploadFn(fileFormatted, sha256);
                  }
                  dispatch({ type: UploadActions.FILE_UPLOADED, payload: sha256?.hashHex });
                  onFileUploaded(fileFormatted, sha256);
                } catch {
                  dispatch({ type: UploadActions.UPLOAD_IN_ERROR });
                }
            } else {
                let fileName = file && file.name;
                unacceptedFileNames.push(fileName || "File numero " + (i + 1));
            }
        }

        if(unacceptedFileNames.length > 0) {
            dispatch({ type: UploadActions.FILE_TYPE_NOT_SUPPORTED, payload: { fileNames: unacceptedFileNames} });
        }

        dispatch({ type: UploadActions.COMPLETE_UPLOAD})
        
    };
    
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if(boxContainerRef != undefined && boxContainerRef.current != undefined) {
            boxContainerRef.current.style.borderStyle = "dashed";
            boxContainerRef.current.style.backgroundColor = "lightgray";
        }
        
        console.log("HANDLE DRAG ENTER");
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if(boxContainerRef != undefined && boxContainerRef.current != undefined) {
            boxContainerRef.current.style.borderStyle = "solid";
            boxContainerRef.current.style.backgroundColor = "white";
        }
        console.log("HANDLE DRAG LEAVE");
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
        console.log("HANDLE DRAG OVER", e.dataTransfer);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("HANDLE DROP", e.dataTransfer != null ? e.dataTransfer.files : null);
        if(boxContainerRef != undefined && boxContainerRef.current != undefined) {
            boxContainerRef.current.style.borderStyle = "solid";
            boxContainerRef.current.style.backgroundColor = "white";
        }
        uploadFiles(e.dataTransfer.files);
        e.dataTransfer.clearData();
    };

    const uploadFileHandler = (e: any) => {
        uploadFiles((e.target as any).files);
    }

    const chooseFileHandler = () => {
        (uploadInputRef.current as any).click();
    };

    return (
        <Box
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            component="div"
            sx={{...containerStyle(data.status), borderRadius: "10px", borderColor: "primary.main"}}
            p={8}
            ref={boxContainerRef}
        >
            {data.status === UploadStatus.TO_UPLOAD && (
                <OrientedBox vertical={vertical}>
                    <CloudUploadIcon color="primary" sx={{ margin: '0 10px' }} />
                    <Typography variant="body1" display={"inline"}>
                         {uploadText} &nbsp;
                    </Typography>
                    <Typography
                        display="inline"
                        variant="body2"
                        color="primary"
                        sx={{ cursor: 'pointer' }}
                        onClick={chooseFileHandler}
                        data-testid="loadFromPc"
                    >
                        sfoglia dal tuo computer
                    </Typography>
                    <Input
                        type="file"
                        sx={{ display: 'none' }}
                        inputRef={uploadInputRef}
                        inputProps={{ accept, multiple: true }}
                        onChange={uploadFileHandler}
                        data-testid="fileInput"
                    />
                </OrientedBox>)
            }

            {(data.status === UploadStatus.IN_PROGRESS || data.status === UploadStatus.SENDING) && (
                <OrientedBox vertical={vertical}>
                    <Typography display="inline" variant="body2">
                        {data.status === UploadStatus.IN_PROGRESS ? "Caricamento in corso..." : "Invio in corso..."}
                    </Typography>
                    <Typography sx={{ margin: '0 20px', width: 'calc(100% - 200px)' }}>
                        <LinearProgress />
                    </Typography>
                </OrientedBox>
            )}
            {data.error && (
                <Alert severity="error" sx={{ marginTop: '10px' }}>
                    {data.error}
                </Alert>
            )}

        </Box>
    );
}

export default UploadBox;