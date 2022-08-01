import { sha512 } from 'js-sha512';
import React, {useState} from 'react';
import axios from 'axios';
import { Typography, Input, Box, Button } from "@mui/material";
// import { Button } from '@material-ui/core';


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

  const [eyeVisible1, updateEye1] = useState<string>('bi bi-eye-slash');
  const [eyeVisible2, updateEye2] = useState<string>('bi bi-eye-slash');
  const [showPass1, updatePass1] = useState<string>('password')
  const [showPass2, updatePass2] = useState<string>('password')

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

  const togglePassword = (e: any) => {
    e.preventDefault();
    if (e.target.value === 'eye1') {
      const input = (eyeVisible1 === 'bi bi-eye-slash') ? 'bi bi-eye' : 'bi bi-eye-slash';
      updateEye1(input);
      (input === 'bi bi-eye-slash') ? updatePass1('password') : updatePass1('text');
    } else {
      const input = (eyeVisible2 === 'bi bi-eye-slash') ? 'bi bi-eye' : 'bi bi-eye-slash';
      updateEye2(input);
      (input === 'bi bi-eye-slash') ? updatePass2('password') : updatePass2('text');
    }
  }

  return (
    <Box className="signUpForm">
      <Typography variant="h4">SIGN UP</Typography>
    <form >
      <label>
        <Input type='text' name='username' placeholder='UserName' onChange={inputsHandler} value={inputField.username}></Input>
      {(!usedUsername) ?
      (null) :
      (<div>InValid UserName!</div>)
      }
      </label>
      <br></br>
      <label>
        <Input type='text' name='email' placeholder='E-mail' onChange={inputsHandler} value={inputField.email}></Input>
      </label>
      <br></br>
      <label>
        <Input type={showPass1} name='password' placeholder='Password' onChange={inputsHandler} value={inputField.password}></Input>
        <button  className={eyeVisible1} onClick={togglePassword} value='eye1'></button>
      </label>
      <br></br>
      <label>
        <Input type={showPass2}  name='confirmPassword' placeholder='confirmPassword' onChange={inputsHandler} value={inputField.confirmPassword}></Input>
        <button className={eyeVisible2} onClick={togglePassword} value='eye2'></button>
        {(matchingPasswords) ? null : (<div> Your Passwords Don't Match!</div>)}
      </label>
      <Button onClick={handleSubmit}>Subimt</Button>
    </form>
    </Box>
  )


}