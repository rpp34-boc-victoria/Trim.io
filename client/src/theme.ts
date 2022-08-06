import { createTheme, experimental_sx as sx, } from '@mui/material/styles';
import { teal, red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({


  palette: {
    primary: {
      main: teal[800],
      50: teal[50],
      100: teal[100],
      200: teal[200]
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
    },
  }
});

export default theme;