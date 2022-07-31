import { sha512 } from 'js-sha512';
import React, {useState} from 'react';
import axios from 'axios';

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
          console.log("SUCCESSFUL LOGIN");
          props.onSubmit({
            username: username,
            userId: _id,
            login: true
          })
        } else {
          // Try again
          console.log('Failed during the try again 2')
        }
      }
    })

  }

  return (

    <div>
      <form >
        <label>
          <input type='text' name='username' placeholder='Login' onChange={inputsHandler} value={inputField?.username}></input>
        </label>
        <br></br>
        <label>
          <input type='text' name='password' placeholder='Password' onChange={inputsHandler} value={inputField?.password}></input>
        </label>
        <button onClick={handleSubmit}>Subimt</button>
      </form>
    </div>
  )


}