import { sha512 } from 'js-sha512';
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

export default function SignUp() {

  const [inputField , setInputField] = useState<inputData | any> ({
    username: '',
    email: '',
    password: '',
  })

  const inputsHandler = (e: any) => {
    const input : string = e.target.value;
    const pass : string = e.target.name;
    console.log(input, pass)
    setInputField( {[e.target.name]: e.target.value} )
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    let salt : number = Date.now();
    var hashedFunction : string = sha512(inputField.password + salt);
    console.log(hashedFunction)

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