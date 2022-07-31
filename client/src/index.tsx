import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import SignUp from './components/SignUp';
import theme from './theme';
<<<<<<< HEAD
import Login from './components/Login';
=======
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { subscribeUser } from './subscription';
>>>>>>> b257c5a82667836e4d939f01ecf612f05a4bf745

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
    SignUp
    <SignUp />
    Login
    <Login />
  </ThemeProvider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
subscribeUser();