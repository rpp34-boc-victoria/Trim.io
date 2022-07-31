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

export default function Login() {

  const [inputField , setInputField] = useState <inputData | any> ({
    username: '',
    password: '',
  })

  const inputsHandler = (e: any) => {
    setInputField( {[e.target.name]: e.target.value} )
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

        // console.log(salt, hashpass, username, _id);
        // const toHashPass = result.data.salt + inputField.password;
        const toHashPass2 = inputField.password;
        const hashedPass = sha512(toHashPass2);
        console.log(hashedPass)
        if (hashpass === hashedPass) {
          console.log("SUCCESSFUL LOGIN")
        } else {
          // Try again
          console.log('Failed during the try again 2')
        }
      }
    })
    // .catch((error) => {
    //   console.log('Error in the Catch Block of handleSubmit in Login.tsx')
    // })

    // console.log(response, 'response')

    // console.log(inputField.username)
    // call to the database for the salt
      // must also check that the username exists
      //If username doesn't exist tell them to try to login again
    //hash the password + the salt
    //send the hashedfunction to the database
      // if correct log them in
      //if incorrect tell them to try again

    // var hashedFunction : string = sha512(inputField.password + salt);
    // console.log(hashedFunction)

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