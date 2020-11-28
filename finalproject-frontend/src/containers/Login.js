import React from "react";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div className="Login">
      <button>Create a new TrailShare account</button>
      <h2>Or log in to your existing account:</h2>
      <LoginForm />
    </div>
  );
}

export default Login;
