import React from "react";

function CreateAccountForm() {
  return (
    <div>
      <form className="CreateAccountForm">
        <input type="email" name="loginEmail" placeholder="Email address" />
        <input type="password" name="loginPassword" placeholder="Password" />
        <button>Create</button>
      </form>
    </div>
  );
}

export default CreateAccountForm;
