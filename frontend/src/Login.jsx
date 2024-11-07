import React, {useState } from "react";
import Image from "./icons/image.png";
import Logo from "./icons/logo.png";
// import GoogleSvg from "./icons/google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

//this is the login page which is used to auth the user and giving access to user to get to the lists every time. 



const Login = () => {
  const [ showPassword, setShowPassword ] = useState(false);

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            <form>
              <input type="email" placeholder="Email" />
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Password" />
                {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />}
                
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>
                <a href="youtube.com" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="button">Log In</button>
                {/* <button type="button">
                  <img src={GoogleSvg} alt="" />
                  Log In with Google
                </button> */}
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account? <a href="youtube.com">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;