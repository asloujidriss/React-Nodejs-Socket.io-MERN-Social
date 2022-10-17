import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import "./register.css";

export default function Register() {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()
  const history = useHistory()

const handleClick= async (e)=>{
  e.preventDefault()
if(passwordAgain.current.value !== password.current.value){
  passwordAgain.current.setCustomValidity("Password don't match!")
  console.log(password)
}else{
  const user ={
    username:username.current.value,
    email:email.current.value,
    password:password.current.value,
    passwordAgain:passwordAgain.current.value
  }
   await axios.post("Auth/register",user).then(res=>{
     console.log(res)
     history.push("/login")
   }).catch(err=>{
     console.log(err)
   })
 
}


}


  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Idassocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" type="text" required ref={username} className="loginInput" />
            <input placeholder="Email" type="email" required ref={email} className="loginInput" />
            <input placeholder="Password" type="password" required minLength="6" ref={password} className="loginInput" />
            <input placeholder="Password Again" type="password" required  ref={passwordAgain} className="loginInput" />
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}