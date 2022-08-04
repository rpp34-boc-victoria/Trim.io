import * as React from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export interface State extends SnackbarOrigin {
  open: boolean;
}

export default function ToastNotification() {

  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;
  const [message, setMessage] = React.useState('')

  React.useEffect(() => {
    fetch('/getUserStreak')
      .then(res => res.json())
      .then(x => {
        const parsed = +x;
        if (parsed > 0) {
          const message = `You are on a ${x} day streak of hitting your goals! 🔥🔥🔥`
          setMessage(message);
          console.log(message);
        }
      })
      .catch(xd => console.log(xd))
  }, []);

  React.useEffect(() => {
    console.log('use    ', message)
    if (message !== '') {
      openToast({
        vertical: 'top',
        horizontal: 'right',
      });
    }
  }, [message]);

  const openToast = (newState: SnackbarOrigin) => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}