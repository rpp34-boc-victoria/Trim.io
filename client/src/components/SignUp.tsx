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

export default function SignUp() {

  const [inputField , setInputField] = useState<inputData | any> ({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const inputsHandler = (e: any) => {
    setInputField({...inputField, [e.target.name]: e.target.value} )
  }

  const handleSubmit = (e: any) => {
    console.log('test')
    // Check if user exists
    axios.post('/auth/checkUser', {
      'username': inputField.username
    })
    .then ((result) => {
      if (result.data.length >= 1) {
        console.log("Username Already Exists")
      } else {
        let salt : number = Date.now();
        var hashedFunction : string = sha512(inputField.password + salt.toString());
        axios.post('/auth/CreateUser', {
          hashedFunction: hashedFunction,
          salt: salt,
          username: 'test',
          email: 'test@gmail.com'
        })
        .then((data) => {
          //Do something
          console.log(data,' successful input')
        })
      }
    })
    e.preventDefault()
  }

  return (
    <div>
      <form >
        <label>
          <input type='text' name='username' placeholder='Login' onChange={inputsHandler} value={inputField.username}></input>
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
        </label>
        <button onClick={handleSubmit}>Subimt</button>
      </form>
    </div>
  )


}