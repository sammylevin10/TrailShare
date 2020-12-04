import React from "react";
import LoginForm from "../components/LoginForm";

function Login({ LoginFunction }) {
  return (
    <div className="Login">
      <h2>Log in to your existing account:</h2>
      <LoginForm LoginFunction={LoginFunction} />
      <br></br>
      <br></br>
      <a className="PseudoButton" href="/create-account">
        or create a new TrailShare account
      </a>
    </div>
  );
}

export default Login;
