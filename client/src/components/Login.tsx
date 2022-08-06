import { sha512 } from 'js-sha512';
import React, { useState } from 'react';
import axios from 'axios';
import { Typography, Box, Button, Container, TextField } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
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

export default function Login(props: any) {

  const [inputField, setInputField] = useState<inputData | any>({
    username: '',
    password: '',
  });

  const inputsHandler = (e: any) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value })
  }
  const [eyeVisible, updateEye] = useState<string>('bi bi-eye-slash');
  const [showPass, updatePass] = useState<string>('password')

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios.post('/auth/login', {
      'username': inputField.username
    })
      .then((result) => {
        if (result.data.length === 0) {
          alert('Incorrect Username or Password!')
          console.log('No data recieved onsubmit')
          console.log(result);
        } else {
          const salt = result.data[0]['salt'];
          const hashpass = result.data[0]['hashpass'];
          const username = result.data[0]['user_id']; // here was the bugg... it was `username`, which no longer gets returned
          const _id = result.data[0]['_id'];

          const hashedPass = sha512(inputField.password + salt.toString());
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
      }).catch(err => {
        console.log(err);
      })
  }

  const togglePassword = (e: any) => {
    e.preventDefault();
    const input = (eyeVisible === 'bi bi-eye-slash') ? 'bi bi-eye' : 'bi bi-eye-slash';
    updateEye(input);
    (input === 'bi bi-eye-slash') ? updatePass('password') : updatePass('text');
  }

  return (
    <ThemeProvider theme={theme}>
      <br></br><br></br><br></br><br></br>
      <Typography variant="h3" component="h1"
            gutterBottom align="center" fontWeight="bold">
            Trim.io
            <Button className={eyeVisible} style={{ visibility: 'hidden' }}></Button>
          </Typography>
    <Container maxWidth="sm" sx={{ padding: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h2" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', paddingRight: '15%' }}>Log In</Typography>
        <br></br><br></br><br></br><br></br>
        <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
        <Typography style={{display: 'flex'}}>
            <TextField style={{width: '100%'}} type='text' name='username' label='User Name' onChange={inputsHandler} value={inputField?.username}></TextField>
            <Button className={eyeVisible} style={{ visibility: 'hidden' }}></Button>
          </Typography>
          <br></br><br></br><br></br>
          <Typography style={{display: 'flex'}}>
            <TextField style={{width: '100%'}} type={showPass} name='password' label='Password' onChange={inputsHandler} value={inputField?.password}></TextField>
            <Button className={eyeVisible} onClick={togglePassword} id="togglePassword" sx={{padding: '20px'}}></Button>
          </Typography>
          <br></br><br></br><br></br><br></br>
          <Typography>
          <Button variant="contained" onClick={handleSubmit} style={{display:'flex', width:'90%',fontSize: '150%', paddingRight:'8.5%'}}>Subimt</Button>
          </Typography>
        </form>
      </Box>
    </Container >
    </ThemeProvider>
  )
}