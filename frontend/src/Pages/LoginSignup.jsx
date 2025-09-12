import React from 'react'
import './CSS/Loginsignup.css'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-field">
          <input type="text" placeholder='Your name' />
          <input type="email" placeholder='Email Address' />
          <input type="password" placeholder='Password' />
        </div>
        <button>Continue</button>
        <p className="loginsignup-login">Already have an account? <span>Login</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By contiuning, i agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup