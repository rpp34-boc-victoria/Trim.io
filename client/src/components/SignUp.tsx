import React, {useState} from 'react';
import { sha512 } from 'js-sha512';
import axios from 'axios';
import { Typography, Box, Button, TextField } from "@mui/material";
import Container from "@mui/material/Container";
// import { ThemeProvider } from '@mui/material/styles';
import "../../src/components/UserProfileComponents/userRegistration.scss";

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
            email: 'randomEmail@gmail.com'
          })
          .then((result) => {
            const sendData = {
              login: true,
              username: inputField.username,
              userId: inputField.username,
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
   <div>
     <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
     <Typography variant="h3" component="h1"
            gutterBottom align="center" fontWeight="bold">
            Trim.io
            <Button className={eyeVisible1} style={{ visibility: 'hidden' }}></Button>
          </Typography>
      <Container maxWidth="sm" sx={{ padding: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h2" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', paddingRight: '15%' }}>Log In</Typography>
          <br></br><br></br><br></br>
        <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography style={{display: 'flex'}}>
          <br></br><br></br><br></br>
          <TextField style={{width: '100%'}} type='text' label='User Name' name='username' onChange={inputsHandler} value={inputField.username}></TextField>
          {(!usedUsername) ?
          (null) :
          (<div>InValid UserName!</div>)
        }
          <Button className={eyeVisible2} style={{ visibility: 'hidden' }}></Button>
        </Typography >
          <Typography style={{display: 'flex'}}>
            <TextField style={{width: '100%'}} type={showPass1} name='password' label='Password' onChange={inputsHandler} value={inputField.password}></TextField>
            <Button  className={eyeVisible1} onClick={togglePassword} value='eye1' sx={{padding: '20px', float: 'right'}}></Button>
          </Typography>
          <br></br>
          <Typography style={{display: 'flex'}}>
            <TextField type={showPass2} style={{width: '100%'}}  name='confirmPassword' label='Confirm Password' onChange={inputsHandler} value={inputField.confirmPassword}></TextField>
            <Button className={eyeVisible2} onClick={togglePassword} value='eye2' sx={{padding: '20px'}}></Button>
            {(matchingPasswords) ? null : (<div> Your Passwords Don't Match!</div>)}
          </Typography>
          <br></br><br></br><br></br>
          <Button variant="contained" onClick={handleSubmit} style={{display:'flex', width:'90%',fontSize: '150%', paddingRight:'8.5%'}}>Subimt</Button>
        </form>
        </Box>
      </Container>
      </div>
  )


}