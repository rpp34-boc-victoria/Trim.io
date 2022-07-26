// import { sha512 } from 'js-sha512';
import React, {useState} from 'react';

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

  const [inputField , setInputField] = useState<inputData | any> ({
    username: '',
    password: '',
  })

  const inputsHandler = (e: any) => {
    setInputField( {[e.target.name]: e.target.value} )
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(inputField.username)
    const response = fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({username: inputField.username})
    })
    .then(() => {
      console.log('First Round')
    })

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