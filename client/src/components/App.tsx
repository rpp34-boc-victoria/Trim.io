import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import History from './history/History';
import AddEntry from './dailyEntries/AddEntry';
import Incrementer from './dailyEntries/Incrementer';
import {ThemeProvider} from '@mui/material/styles';
import { Divider } from '@mui/material';
import theme from '../theme';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create React App example with TypeScript
          </Typography>
          <ProTip />
          <History />
          <Incrementer labelText='Water (cups)' />
          <Divider sx={{mb: '16px'}} />
          <Incrementer labelText='Body weight' />
          <AddEntry></AddEntry>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
}