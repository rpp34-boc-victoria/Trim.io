import { useState } from 'react';
import './index.scss';
import App from './components/App';
import SignUp from './components/SignUp';
import Login from './components/Login';
import LogOut from './LogOut';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export interface inputData {
  loggedIn: boolean;
  username: string;
  userId: string;
}

const centralButtons = ({ 'width': '50%', 'transform': 'translateX(50%)' });


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
        <div style={{
          'padding': '25%',
          'display': 'flex',
          'flexDirection': 'column',
          'justifyContent': 'center' }}>
          <Typography variant="h3" component="h1"
            gutterBottom align="center" fontWeight="bold">
            Trim.io
          </Typography>
          <div style={{ 'padding': '10%' }}></div>
          <Button color="primary" variant="outlined" style={centralButtons} onClick={handleClick} value='login'>Let Me LogIn!</Button>
          <div style={{ 'padding': '10%' }}></div>
          <Button color="primary" variant="outlined" style={centralButtons} onClick={handleClick} value='newAccount'>Let Me Create an Account!</Button>
        </div>
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
      <div>
        <App data={login} signedUp={loginOrCreateNewUser} />
        <LogOut onSubmit={handleUpdate} onClick={handleLogOut} />
      </div>
    )
  }
}