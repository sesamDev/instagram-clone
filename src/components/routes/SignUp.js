import "../../styles/SignUp.css";

import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";

const SignUp = (props) => {
  async function createUserEmailPassword(e) {
    e.preventDefault();
    const auth = props.auth;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;

    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    // Navigate to home page after creating account
    window.location.replace("../");
  }
  return (
    <div className="signUpContainer">
      <form onSubmit={createUserEmailPassword}>
        <h2>Fakegram</h2>
        <input type="text" className="signUpInput" placeholder="User name" name="username" />
        <input type="text" className="signUpInput" placeholder="Email adress" name="email" />
        <input type="password" className="signUpInput" placeholder="Password" name="password" />
        <button type="submit" className="signUpSubmitBtn">
          Sign up
        </button>
        <div>
          Already have an account?{" "}
          <button className="loginButton" onClick={() => props.setActiveView("login")}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
