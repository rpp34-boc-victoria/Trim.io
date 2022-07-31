import { sha512 } from 'js-sha512';
import React, {useState} from 'react';
import axios from 'axios';

export interface inputData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface setInputField {
  password: string;
  username: string;
  type: object;
}

export default function SignUp(props: any) {

  const [inputField , setInputField] = useState<inputData> ({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [usedUsername, setusedUserName] = useState <boolean> (false);
  const [matchingPasswords, setmatchingPasswords] = useState <boolean> (false);

  const inputsHandler = (e: any) => {
    setInputField({...inputField, [e.target.name]: e.target.value})
  }

  React.useEffect(() => {
    axios.post('/auth/checkUser', {
      'username': inputField.username
    })
    .then((result) => {
      if (result.data.length >= 1) {
        setusedUserName(true)
      } else {
        setusedUserName(false)
      }
    })
    if (inputField.confirmPassword !== inputField.password) {
      setmatchingPasswords(false);
    } else {
      setmatchingPasswords(true);
    }
  }, [inputField])

  const handleSubmit = (e: any) => {
    // Check if user exists
    if (inputField.username.length === 0) {
      alert('Bruh, you even got a username?!?')
    } else if (inputField.password !== inputField.confirmPassword) {
      alert("YOUR PASSWORDS DON'T MATCH")
    } else {
      axios.post('/auth/checkUser', {
        'username': inputField.username
      })
      .then ((result) => {
        if (result.data.length >= 1) {
          alert("Username Already Exists");
        } else {
          let salt : number = Date.now();
          var hashedFunction : string = sha512(inputField.password + salt.toString());
          axios.post('/auth/CreateUser', {
            hashedFunction: hashedFunction,
            salt: salt,
            username: inputField.username,
            email: inputField.email
          })
          .then((result) => {
            const sendData = {
              login: true,
              username: result.data.username,
              userId: result.data.userId,
            }
            props.onSubmit(sendData);
          })
        }
      })
    }
    e.preventDefault()
  }

  return (
    <form >
      <label>
        <input type='text' name='username' placeholder='Login' onChange={inputsHandler} value={inputField.username}></input>
      {(!usedUsername) ?
      (null) :
      (<div>InValid UserName!</div>)
      }
      </label>
      <br></br>
      <label>
        <input type='text' name='email' placeholder='E-mail' onChange={inputsHandler} value={inputField.email}></input>
      </label>
      <br></br>
      <label>
        <input type='text' name='password' placeholder='Password' onChange={inputsHandler} value={inputField.password}></input>
      </label>
      <br></br>
      <label>
        <input type='text' name='confirmPassword' placeholder='confirmPassword' onChange={inputsHandler} value={inputField.confirmPassword}></input>
        {(matchingPasswords) ? null : (<div> Your Passwords Don't Match!</div>)}
      </label>
      <button onClick={handleSubmit}>Subimt</button>
    </form>
  )


}