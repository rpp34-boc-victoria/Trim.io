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
  function handleUpdate (data: any) {
    console.log(data)
    updateLogin({
      loggedIn: data.login,
      username: data.username,
      userId: data.userId
    })
  }

  if (!login.loggedIn) {
    return (
      <div>
        SignUp
        <SignUp onSubmit = {handleUpdate} />
        Login
        <Login onSubmit = {handleUpdate}/>
      </div>
    )
  } else {
    return (
      <div>
        <App data={login}/>
        <LogOut onSubmit = {handleUpdate}/>
      </div>
    )
  }
}