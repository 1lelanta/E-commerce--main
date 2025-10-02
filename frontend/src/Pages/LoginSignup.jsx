import React, { useState } from 'react'
import './CSS/Loginsignup.css'

const LoginSignup = () => {

  const [state,setState] = useState("Login");

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-field">
          {state==="Sign Up"?<input type="text" placeholder='Your name' />:<></>}
          <input type="email" placeholder='Email Address' />
          <input type="password" placeholder='Password' />
        </div>
        <button>Continue</button>
        <p className="loginsignup-login">Already have an account? <span>Login</span></p>
        <p className="loginsignup-login">Create an account? <span>Click here</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By contiuning, i agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup