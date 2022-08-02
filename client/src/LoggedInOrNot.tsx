import { useState } from 'react';
import './index.scss';
import App from './components/App';
import SignUp from './components/SignUp';
import Login from './components/Login';
import LogOut from './LogOut';
// import { Button } from '@material-ui/core';

export interface inputData {
  loggedIn: boolean;
  username: string;
  userId: string;
}

const centralButtons =  ({'width': '50%', 'transform': 'translateX(50%)'});
const centralTitle =  ({'width': '75%', 'transform': 'translateX(55%)'})

export default function LoggedInOrNot () {

const [login, updateLogin] = useState <inputData> ({
  loggedIn: false,
  username: '',
  userId: ''
})
const [loginOrCreateNewUser, setloginOrCreateNewUser] = useState <string> ('notLoggedIn');

  function handleUpdate (data: any) {
    console.log(data)
    updateLogin({
      loggedIn: data.login,
      username: data.username,
      userId: data.userId
    })
  }

  function handleClick (e : any) {
    console.log(e.target.value)
    setloginOrCreateNewUser(e.target.value)
  }

  function handleLogOut () {
    setloginOrCreateNewUser('notLoggedIn')
  }

  if (!login.loggedIn) {
    if (loginOrCreateNewUser === 'notLoggedIn') {
      return (
        <div style={{'padding': '25%'}}>
          <h1 style={centralTitle}>Trim.io</h1>
          <button style={centralButtons} onClick={handleClick} value='login'>Let Me LogIn!</button>
        <div style={{'padding': '10%'}}></div>
          <button style={centralButtons} onClick={handleClick} value='newAccount'>Let Me Create an Account!</button>
        </div>
      )
    } else {
    return (loginOrCreateNewUser !== 'login') ?
      (<div>
        <SignUp onSubmit = {handleUpdate} />
      </div>
      ) :
      (
      <div>
        <Login onSubmit = {handleUpdate}/>
      </div>
      )
    }
  } else {
    return (
      <div>
        <App data={login}/>
        <LogOut onSubmit = {handleUpdate} onClick={handleLogOut}/>
      </div>
    )
  }
}