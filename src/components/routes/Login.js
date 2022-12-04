import "../../styles/Login.css";

import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import React from "react";

// Sign in with email and password.
async function simpleSignIn(e) {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage);
  });
}

// Signs-in to Fakegram with Google.
async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

const Login = (props) => {
  return (
    <div className="loginContainer">
      <form className="loginForm" onSubmit={simpleSignIn}>
        <h2>Fakegram</h2>
        <input type="text" className="loginInput" name="email" placeholder="Email adress" />
        <input type="password" className="loginInput" name="password" placeholder="Password" />
        <button className="signInButton" type="submit">
          Sign in
        </button>
        <p>
          Don't have an account?{" "}
          <button
            className="signUpButton"
            onClick={() => {
              console.log("Sign up button clicked");
              props.setActiveView("signUp");
            }}
          >
            Sign-up
          </button>
        </p>
      </form>
      <div className="alternateLogin">
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
          height={50}
          alt="google-logo"
          onClick={signIn}
        />
      </div>
    </div>
  );
};

export default Login;
