import { createTheme, experimental_sx as sx, } from '@mui/material/styles';
import {green, orange, red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: green[800],
      50: green[50],
      100: green[100],
      200: green[200]
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiFab: {
      defaultProps: {
        size: 'small'
      },
      styleOverrides: {
        root: sx({
          color: 'grey.600',
          backgroundColor: '#fff',
          border: 1,
          borderColor: 'grey.300',
          boxShadow: 'none',

            '&:hover': {
              color: 'primary.main',
              backgroundColor: 'primary.50',
              borderColor: 'primary.200',
              boxShadow: 'none'
            },
            '&:active': {
              backgroundColor: 'primary.100',
              boxShadow: 'none'
            }
        })
      }
    },
    MuiButtonBase: {
      defaultProps: {
        // The props to apply
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
      styleOverrides: {
        root: sx({
          textTransform: 'none !important'
        })
      }
    },
  }
});

export default theme;