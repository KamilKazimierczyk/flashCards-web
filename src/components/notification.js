import React from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import useNotification from '../hooks/useNotification';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Notification = () => {
  const { message, open, severity, closeNotification } = useNotification();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    closeNotification();
  };

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};
