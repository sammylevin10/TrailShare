import React from "react";

function LoginForm({ LoginFunction }) {
  return (
    <div>
      {/* e is the single variable from this form that contains all of its information */}
      <form className="LoginForm" onSubmit={(e) => LoginFunction(e)}>
        <input type="email" name="loginEmail" placeholder="Email address" />
        <input type="password" name="loginPassword" placeholder="Password" />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default LoginForm;
