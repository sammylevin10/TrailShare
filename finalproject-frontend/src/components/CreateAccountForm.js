import React from "react";

function CreateAccountForm({ CreateAccountFunction }) {
  return (
    <div>
      <form
        className="CreateAccountForm"
        onSubmit={(e) => CreateAccountFunction(e)}
      >
        <input
          type="name"
          name="createName"
          placeholder="Firstname Lastname"
          className="LightInput"
        />
        <input
          type="email"
          name="createEmail"
          placeholder="Email address"
          className="LightInput"
        />
        <input
          type="password"
          name="createPassword"
          placeholder="Password"
          className="LightInput"
        />
        <br></br>
        <div className="CenterWrapper">
          <button>Create</button>
        </div>
      </form>
    </div>
  );
}

export default CreateAccountForm;
