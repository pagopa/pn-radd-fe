import { Fragment, useEffect, useReducer, useRef } from 'react';

import { Alert, Box, IconButton, Input, LinearProgress, Typography } from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import {
  calcUnit8Array,
  calcSha256String,
  calcBase64String,
  isFileImage,
  formatBytes,
} from '../../utils/file.utils';
import ImageOverview from '../Image/ImageOverview';
import OrientedBox from './OrientedBlock';

type Props = {
  uploadText: string;
  vertical?: boolean;
  accept: Array<string>;
  uploadFn?: (file: any, sha256?: { hashBase64: string; hashHex: string }) => Promise<void>;
  onFileUploaded: (
    file: any,
    sha256?: { hashBase64: string; hashHex: string },
    name?: string,
    size?: number
  ) => void;
  onRemoveFile: () => void;
  calcSha256?: boolean;
  fileFormat?: 'base64' | 'uint8Array';
  file?: any;
  maxFileSize?: number;
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

const reducer = (state: UploadState, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case 'ADD_FILE':
      return { ...state, status: UploadStatus.IN_PROGRESS, file: action.payload, error: '' };
    case 'FILE_TYPE_NOT_SUPPORTED':
      return {
        ...state,
        error: 'Estensione file non supportata. Riprovare con un altro file.',
      };
    case 'FILE_SIZE_NOT_SUPPORTED': {
      const maxFileSize = action.payload;
      return {
        ...state,
        error: `Dimensione file non supportata (max ${formatBytes(
          maxFileSize
        )}). Riprovare con un altro file.`,
      };
    }

    case 'UPLOAD_IN_ERROR':
      return {
        ...state,
        file: null,
        status: UploadStatus.TO_UPLOAD,
        error: 'Si è verificato un errore durante il caricamento del file. Si prega di riprovare.',
      };
    case 'FILE_PREVIOUSLY_UPLOADED':
      return {
        ...state,
        ...action.payload,
        status: UploadStatus.UPLOADED,
        error: '',
        sha256: action.payload.file.sha256.hashHex,
        name: action.payload.name ? action.payload.name : '',
      };
    case 'FILE_UPLOADED':
      return { ...state, status: UploadStatus.UPLOADED, error: '', sha256: action.payload };
    case 'REMOVE_FILE':
      return { ...state, status: UploadStatus.TO_UPLOAD, file: null, sha256: '' };
    case 'IS_SENDING':
      return { ...state, status: UploadStatus.SENDING };
    default:
      return state;
  }
};

const containerStyle = (status: UploadStatus) => {
  switch (status) {
    case UploadStatus.IN_PROGRESS:
    case UploadStatus.SENDING:
      return {
        backgroundColor: 'white',
        '& > div': {
          height: '24px',
        },
      };
    case UploadStatus.UPLOADED:
      return {
        border: '1px solid',
        borderColor: 'primary.main',
        backgroundColor: 'white',
      };
    default:
      return {
        border: '1px dashed',
        borderColor: 'primary.main',
      };
  }
};

function FileUpload({
  uploadText,
  vertical = false,
  accept,
  uploadFn,
  onFileUploaded,
  onRemoveFile,
  calcSha256 = false,
  fileFormat,
  file,
  maxFileSize,
}: Props) {
  const [data, dispatch] = useReducer(reducer, {
    status: UploadStatus.TO_UPLOAD,
    file: null,
    error: '',
    sha256: '',
  });

  const uploadInputRef = useRef();

  const boxContainerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (file !== undefined) {
      void uploadFile(file);
    }
  }, []);

  const uploadFile = async (file: any) => {
    if (!file || !file.type || accept.indexOf(file.type) === -1) {
      dispatch({ type: 'FILE_TYPE_NOT_SUPPORTED' });
      return;
    }

    if (maxFileSize && file.size > maxFileSize) {
      dispatch({ type: 'FILE_SIZE_NOT_SUPPORTED', payload: maxFileSize });
      return;
    }

    dispatch({ type: 'ADD_FILE', payload: file });
    try {
      /* eslint-disable-next-line functional/no-let */
      let fileFormatted = file;
      if (fileFormat === 'base64') {
        fileFormatted = await calcBase64String(file);
      } else if (fileFormat === 'uint8Array') {
        fileFormatted = await calcUnit8Array(file);
      }
      const sha256 = calcSha256 ? await calcSha256String(file) : undefined;
      if (uploadFn) {
        await uploadFn(fileFormatted, sha256);
      }
      dispatch({ type: 'FILE_UPLOADED', payload: sha256?.hashHex });
      onFileUploaded(fileFormatted, sha256, file.name, file.size);
    } catch {
      dispatch({ type: 'UPLOAD_IN_ERROR' });
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    void uploadFile(e.dataTransfer.files[0]);
    e.dataTransfer.clearData();
  };

  const uploadFileHandler = (e: any) => {
    void uploadFile((e.target as any).files);
  };

  const chooseFileHandler = () => {
    (uploadInputRef.current as any).click();
  };

  const removeFileHandler = () => {
    dispatch({ type: 'REMOVE_FILE' });
    onRemoveFile();
  };

  return (
    <Box
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      component="div"
      sx={{ ...containerStyle(data.status), borderRadius: '10px', borderColor: 'primary.main' }}
      p={2}
      ref={boxContainerRef}
    >
      {data.status === UploadStatus.TO_UPLOAD && (
        <OrientedBox vertical={vertical}>
          <CloudUploadIcon color="primary" sx={{ margin: '0 10px' }} />
          <Typography variant="body1" display={'inline'}>
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
            selezionalo dal tuo computer
          </Typography>
          <Input
            type="file"
            sx={{ display: 'none' }}
            inputRef={uploadInputRef}
            inputProps={{ accept, multiple: true }}
            onChange={uploadFileHandler}
            data-testid="fileInput"
          />
        </OrientedBox>
      )}

      {(data.status === UploadStatus.IN_PROGRESS || data.status === UploadStatus.SENDING) && (
        <OrientedBox vertical={vertical}>
          <Typography display="inline" variant="body2">
            {data.status === UploadStatus.IN_PROGRESS
              ? 'Caricamento in corso...'
              : 'Invio in corso...'}
          </Typography>
          <Typography sx={{ margin: '0 20px', width: 'calc(100% - 200px)' }}>
            <LinearProgress />
          </Typography>
        </OrientedBox>
      )}

      {data.status === UploadStatus.UPLOADED && (
        <Fragment>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              {isFileImage(data.file) && (
                <ImageOverview
                  src={URL.createObjectURL(data.file)}
                  alt={`Anteprima del file: ${data.file.name}`}
                  width={80}
                  height={60}
                />
              )}
              <AttachFileIcon color="primary" />
              <Typography color="primary">{data.file.name}</Typography>
              <Typography fontWeight={600} sx={{ marginLeft: '30px' }}>
                {(data.file.size / 1024).toFixed(2)}&nbsp;KB
              </Typography>
            </Box>
            <IconButton onClick={removeFileHandler}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Fragment>
      )}
      {data.error && (
        <Alert severity="error" sx={{ marginTop: '10px' }}>
          {data.error}
        </Alert>
      )}
    </Box>
  );
}

export default FileUpload;
