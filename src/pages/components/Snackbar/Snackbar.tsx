import React from 'react';
import { Alert, IconButton, Slide, SlideProps, Snackbar as Toast } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AppMessage, MessageType } from '../../../redux/app/types';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}

type Props = {
  id: string;
  message: string;
  type: MessageType;
  duration: number | null;
  onClose: (id: string) => void;
};
const Snackbar = ({ id, message, type, duration, onClose }: Props) => {
  const getColor = new Map<MessageType, 'error' | 'warning' | 'success' | 'info'>([
    [MessageType.ERROR, 'error'],
    [MessageType.WARNING, 'warning'],
    [MessageType.SUCCESS, 'success'],
    [MessageType.INFO, 'info'],
  ]);

  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={() => onClose(id)}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Toast
      open
      autoHideDuration={duration}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      TransitionComponent={TransitionDown}
    >
      <Alert severity={getColor.get(type)} sx={{ width: '100%' }} action={action}>
        {message}
      </Alert>
    </Toast>
  );
};

export default Snackbar;
