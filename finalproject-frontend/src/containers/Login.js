import React from "react";
import LoginForm from "../components/LoginForm";

function Login({ LoginFunction }) {
  return (
    <div className="Login">
      <div className="LoginWrapper">
        <br></br>
        <h2>Log in to your account</h2>
        <br></br>
        <LoginForm LoginFunction={LoginFunction} />
        <br></br>
        <br></br>
        <div className="CenterWrapper">
          <a className="RegularLink" href="/create-account">
            or create a new TrailShare account
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
