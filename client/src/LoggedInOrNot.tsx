import { useState } from 'react';
import './index.scss';
import App from './components/App';
import SignUp from './components/SignUp';
import Login from './components/Login';
import LogOut from './LogOut';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

export interface inputData {
  loggedIn: boolean;
  username: string;
  userId: string;
}

const centralButtons = ({ 'width': '100%' });

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Trim.io
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}


export default function LoggedInOrNot() {

  const [login, updateLogin] = useState<inputData>({
    loggedIn: false,
    username: '',
    userId: ''
  })
  const [loginOrCreateNewUser, setloginOrCreateNewUser] = useState<string>('notLoggedIn');

  function handleUpdate(data: any) {
    updateLogin({
      loggedIn: data.login,
      username: data.username,
      userId: data.userId
    })
  }

  function handleClick(e: any) {
    setloginOrCreateNewUser(e.target.value)
  }

  function handleLogOut() {
    setloginOrCreateNewUser('notLoggedIn')
  }

  if (!login.loggedIn) {
    if (loginOrCreateNewUser === 'notLoggedIn') {
      return (
        <Container maxWidth="sm" sx={{
          'padding': '10% 25% 0% 25%',
          'display': 'flex',
          'flexDirection': 'column',
          'justifyContent': 'center',
          'alignContent': 'flex-start'
        }}>
          <Typography variant="h3" component="h1"
            gutterBottom align="center" fontWeight="bold">
            Trim.io
          </Typography>
          <div style={{ 'padding': '10%' }}></div>
          <Button color="primary" variant="outlined"
            style={centralButtons} onClick={handleClick} value='login'>
            Login
          </Button>
          <div style={{ 'padding': '10%' }}></div>
          <Button color="primary" variant="outlined"
            style={centralButtons} onClick={handleClick} value='newAccount'>
            Sign Up
          </Button>
        </Container>
      )
    } else {
      return (loginOrCreateNewUser !== 'login') ?
        (<div>
          <SignUp onSubmit={handleUpdate} />
        </div>
        ) :
        (
          <div>
            <Login onSubmit={handleUpdate} />
          </div>
        )
    }
  } else {
    return (
      <Container>
        <Box>
          <App data={login} signedUp={loginOrCreateNewUser} />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <LogOut onSubmit={handleUpdate} onClick={handleLogOut} />
          </Box>
        </Box>
        <Box>
          <div style={{ 'padding': '20px' }}></div>
          <Copyright />
        </Box>
      </Container >
    )
  }
}