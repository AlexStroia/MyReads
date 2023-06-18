import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

const SnackBar = ({ message, isOpen, handleCloseSnackBar }) => {
  const snackbarRef = React.useRef(null);

  return (
    <Snackbar
      ref={snackbarRef}
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleCloseSnackBar}
      message={message}
      action={
        <Button onClick={handleCloseSnackBar} color="inherit" size="small">
          Hide
        </Button>
      }
    />
  );
};

export default SnackBar;
