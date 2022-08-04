import { sha512 } from 'js-sha512';
import React, {useState} from 'react';
import axios from 'axios';
import { Typography, Input, Box, Button } from "@mui/material";
// import { Button } from '@material-ui/core';

export interface inputData {
  username: string | any;
  email: string | any;
  password: string | any;
}

export interface setInputField {
  password: any;
  username: any;
  type: object;
}

export default function Login(props : any) {

  const [inputField , setInputField] = useState <inputData | any> ({
    username: '',
    password: '',
  })

  const inputsHandler = (e: any) => {
    setInputField( {...inputField, [e.target.name]: e.target.value} )
  }
  const [eyeVisible, updateEye] = useState<string>('bi bi-eye-slash');
  const [showPass, updatePass] = useState<string>('password')

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(inputField.username, 'test')
    axios.post('/auth/login', {
      'username': inputField.username
    })
    .then((result) => {
      if (result.data.length === 0) {
        console.log('Failed during the .length')
      } else {
        const salt = result.data[0]['salt'];
        const hashpass = result.data[0]['hashpass'];
        const username = result.data[0]['username'];
        const _id = result.data[0]['_id'];

        const hashedPass = sha512(inputField.password + salt.toString());
        console.log(hashedPass)
        if (hashpass === hashedPass) {
          props.onSubmit({
            username: username,
            userId: _id,
            login: true
          })
        } else {
          alert('Incorrect Username or Password!')
        }
      }
    })
  }

  const togglePassword = (e: any) => {
    e.preventDefault();
    const input = (eyeVisible === 'bi bi-eye-slash') ? 'bi bi-eye' : 'bi bi-eye-slash';
    updateEye(input);
    (input === 'bi bi-eye-slash') ? updatePass('password') : updatePass('text');
  }

  return (
    <Box>
      <Typography variant="h4">Log In</Typography>
    <form >
      <label>
        <Input type='text' name='username' placeholder='Login' onChange={inputsHandler} value={inputField?.username}></Input>
      </label>
      <br></br>
      <label>
        <Input type={showPass} name='password' placeholder='Password' onChange={inputsHandler} value={inputField?.password}></Input>
        <button className={eyeVisible} onClick={togglePassword} id="togglePassword"></button>
      </label>
      <Button onClick={handleSubmit}>Subimt</Button>
    </form>
    </Box>
  )


}