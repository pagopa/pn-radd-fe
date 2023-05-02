import { Button, Dialog, DialogActions, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { unstable_Blocker as Blocker } from 'react-router-dom';

type Props = {
  blocker: Blocker;
  onConfirm?: () => void;
  onDeny?: () => void;
  message?: string;
  title?: string;
  confirmLabel?: string;
  denyLabel?: string;
};
const ConfirmNavigation = ({
  blocker,
  onConfirm,
  onDeny,
  message = 'Confermi di voler uscire?',
  title = 'Attenzione',
  confirmLabel = 'Conferma',
  denyLabel = 'Annulla',
}: Props) => {
  const handleConfirm = () => {
    onConfirm?.();
    blocker.proceed?.();
  };
  const handleDeny = () => {
    onDeny?.();
    blocker.reset?.();
  };
  if (blocker.state === 'blocked') {
    return (
      <Dialog open={true} aria-labelledby="confirm-dialog-title">
        <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>{title}</DialogTitle>
        <DialogContentText
          id="confirm-dialog-description"
          sx={{ textAlign: 'center', px: 3, pb: 1 }}
        >
          {message}
        </DialogContentText>
        <DialogActions sx={{ textAlign: 'center', flexDirection: 'row', padding: 3 }}>
          <Button sx={{ width: '100%' }} color="primary" variant="contained" onClick={handleDeny}>
            {denyLabel}
          </Button>
          <Button
            sx={{ width: '100%' }}
            color="primary"
            variant="contained"
            onClick={handleConfirm}
          >
            {confirmLabel}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return <React.Fragment />;
};

export default ConfirmNavigation;
