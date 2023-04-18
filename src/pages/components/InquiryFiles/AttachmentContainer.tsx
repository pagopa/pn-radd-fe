import { Box, Divider, Typography } from '@mui/material';
import AttachmentBox from './AttachmentBox';

type Props = {
  fileList: Array<File>;
  onRemove: (file: File) => void;
};
const AttachmentContainer = ({ fileList, onRemove }: Props) => {
  if (fileList.length === 0) {return null;}

  return (
    <>
      <Typography color="primary">Files da caricare:</Typography> <br />
      <Box sx={{ maxHeight: '300px', overflowY: 'auto', width: '100%' }}>
        {fileList.map((file) => (
          <AttachmentBox key={file.name} file={file} onRemove={onRemove} />
        ))}
      </Box>
      <Divider sx={{ marginTop: 1 }} />
    </>
  );
};

export default AttachmentContainer;
