import React from "react";

function LoginForm() {
  return (
    <div>
      <form className="LoginForm">
        <input type="email" name="loginEmail" placeholder="Email address" />
        <input type="password" name="loginPassword" placeholder="Password" />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default LoginForm;
