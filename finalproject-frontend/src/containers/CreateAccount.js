import React from "react";
import CreateAccountForm from "../components/CreateAccountForm";

function CreateAccount({ CreateAccountFunction }) {
  return (
    <div className="CreateAccount">
      <h2>Create a new account:</h2>
      <CreateAccountForm CreateAccountFunction={CreateAccountFunction} />
      <br></br>
      <br></br>
      <a className="PseudoButton" href="/login">
        or log in to your existing account
      </a>
    </div>
  );
}

export default CreateAccount;
