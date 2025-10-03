import React, { useState } from 'react'
import './CSS/Loginsignup.css'

const LoginSignup = () => {

  const [state,setState] = useState("Login");
  const [formData, setFormData] = useState({
    username:"",
    password:"",
    email:""
  } )

  const changeHandler =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async()=>{
    console.log("Login function execute")
  }

  const signup = async()=>{
    console.log("sign up function execute")
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-field">
          {state==="Sign Up"?<input type="text" name ='username' value={formData.username} onChange={changeHandler} placeholder='Your name' />:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        <button onClick={()=>{state==="Login"?login(): signup()}}>Continue</button>

        {state === "Sign Up"?<p className="loginsignup-login">Already have an account? <span onClick={()=>setState("Login")}>Login</span></p>:
        <p className="loginsignup-login">Create an account? <span onClick={()=> setState("Sign Up")}>Click here</span></p>}

        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By contiuning, i agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup