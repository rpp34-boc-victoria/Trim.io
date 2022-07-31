import { useState } from 'react';
import './index.scss';
import App from './components/App';
import SignUp from './components/SignUp';
import Login from './components/Login';
import LogOut from './LogOut';

export interface inputData {
  loggedIn: boolean;
  username: string;
  userId: string;
}

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
    console.log(e)
    setloginOrCreateNewUser(e.target.name)
  }

  function handleLogOut () {
    setloginOrCreateNewUser('notLoggedIn')
  }

  if (!login.loggedIn) {
    if (loginOrCreateNewUser === 'notLoggedIn') {
      return (
        <div>
          <button onClick={handleClick} name='login'>Let Me LogIn!</button>
          <button onClick={handleClick} name='newAccount'>Let Me Create an Account!</button>
        </div>
      )
    } else {
    return (loginOrCreateNewUser !== 'login') ?
      (<div>
        SignUp
        <SignUp onSubmit = {handleUpdate} />
      </div>
      ) :
      (
      <div>
        Login
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