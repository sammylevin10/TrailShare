import React from "react";
import CreateAccountForm from "../components/CreateAccountForm";

function CreateAccount({ CreateAccountFunction }) {
  return (
    <div className="CreateAccount">
      <div className="CreateAccountWrapper">
        <br></br>
        <h2>Create a new account:</h2>
        <br></br>
        <CreateAccountForm CreateAccountFunction={CreateAccountFunction} />
        <br></br>
        <br></br>
        <div className="CenterWrapper">
          <a className="RegularLink" href="/login">
            or log in to your existing account
          </a>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
