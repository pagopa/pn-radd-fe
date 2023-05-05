import { IconButton, Grid, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';

type Props = {
  src: string;
  alt: string;
  onClose: () => void;
};

const ImageVisualizer = ({ src, alt, onClose }: Props): React.ReactElement => (
  <Modal
    open={true}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Grid container justifyContent={'center'}>
      <Grid item xs={8}>
        <Box>
          <Box display="flex" justifyContent="flex-end" margin="auto">
            <IconButton sx={{ backgroundColor: 'white' }} color="primary" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container justifyContent={'center'}>
            <Grid item>
              <img src={src} alt={alt} width="100%" height="100%" />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  </Modal>
);

export default ImageVisualizer;
