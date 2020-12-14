import React from "react";

function LoginForm({ LoginFunction }) {
  return (
    <div>
      {/* e is the single variable from this form that contains all of its information */}
      <form className="LoginForm" onSubmit={(e) => LoginFunction(e)}>
        <input
          type="email"
          name="loginEmail"
          placeholder="Email address"
          className="LightInput"
        />
        <input
          type="password"
          name="loginPassword"
          placeholder="Password"
          className="LightInput"
        />
        <br></br>
        <div className="CenterWrapper">
          <button>Log in</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
