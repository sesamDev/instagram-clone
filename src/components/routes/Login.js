import "../../styles/Login.css";

import { signIn, simpleSignIn } from "../../App";

import { Link } from "react-router-dom";
import React from "react";
import iphone12 from "../../assets/iphone12.png";

// Dummy function
function notImplemented() {
  return alert("Not implemented yet :(");
}

const Login = () => {
  return (
    <div className="loginContainer">
      <img src={iphone12} alt="phone" />
      <div className="loginRight">
        <form className="loginForm" onSubmit={simpleSignIn}>
          <h2>Fakegram</h2>
          <input type="text" className="loginInput" name="email" placeholder="Email adress" />
          <input type="password" className="loginInput" name="password" placeholder="Password" />
          <button className="signInButton" type="submit">
            Sign in
          </button>
          <p>
            Don't have an account?{" "}
            <Link to="signup" className="signUpLink">
              Sign-up
            </Link>
          </p>
        </form>
        <div className="alternateLogin">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            height={50}
            alt="google-logo"
            onClick={signIn}
          />

          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg"
            height={50}
            alt="apple-logo"
            onClick={notImplemented}
          />

          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            height={50}
            alt="github-logo"
            onClick={notImplemented}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
