import { Dialog, DialogTitle, DialogContentText, DialogActions, Button } from '@mui/material';
import { ReactNode, MouseEventHandler, useEffect } from 'react';

/* eslint-disable functional/no-let */
let timeout: NodeJS.Timeout;

type Props = {
  open: boolean;
  title: string;
  message: ReactNode;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  onConfirmLabel?: string;
  handleClose?: () => void;
  initTimeout?: boolean;
};

const SessionModal = ({
  open,
  title,
  message,
  onConfirm,
  onConfirmLabel = 'Riprova',
  handleClose,
  initTimeout = false,
}: Props) => {
  useEffect(() => {
    if (!initTimeout) {
      return;
    }
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      if (handleClose) {
        handleClose();
      }
    }, 2000);

    // clean function
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="session-dialog-title">
      <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>{title}</DialogTitle>
      <DialogContentText id="session-dialog-description" sx={{ textAlign: 'center', px: 3, pb: 1 }}>
        {message}
      </DialogContentText>
      <DialogActions sx={{ textAlign: 'center', flexDirection: 'row', padding: 3 }}>
        {onConfirm && (
          <Button sx={{ width: '100%' }} color="primary" variant="contained" onClick={onConfirm}>
            {onConfirmLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SessionModal;
