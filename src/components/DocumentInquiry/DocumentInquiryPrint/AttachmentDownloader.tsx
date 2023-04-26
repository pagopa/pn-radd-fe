import { Box, Typography, Link } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DoneIcon from '@mui/icons-material/Done';

type Props = {
  fileName: string;
  fileUrl: string;
  clicked: boolean;
  onDownload: (url: string) => void;
};

const AttachmentDownloader = ({ fileName, fileUrl, clicked, onDownload }: Props) => {
  const linkAction = (
    <Link underline="none" href={fileUrl} onClick={() => onDownload(fileUrl)} target="_blank">
      <span style={{ display: 'flex', alignItems: 'center' }}>
        Scarica <FileDownloadIcon />
      </span>
    </Link>
  );

  const checkedAction = <DoneIcon color="success" aria-label="Download effettuato" />;

  const action = clicked ? checkedAction : linkAction;

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'primary.main',
        borderRadius: '10px',
        marginBottom: '8px',
      }}
      p={2}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" justifyContent="center" alignItems="center">
          <AttachFileIcon color="primary" style={{ marginRight: '4px' }} />
          <Typography color="primary">{fileName}</Typography>
        </Box>
        {action}
      </Box>
    </Box>
  );
};

export default AttachmentDownloader;
