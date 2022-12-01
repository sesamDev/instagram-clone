import "../../styles/SignUp.css";

import React from "react";
import { createUserEmailPassword } from "../../App";

const SignUp = (props) => {
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
