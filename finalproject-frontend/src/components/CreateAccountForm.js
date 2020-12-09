import React from "react";

function CreateAccountForm({ CreateAccountFunction }) {
  return (
    <div>
      <form
        className="CreateAccountForm"
        onSubmit={(e) => CreateAccountFunction(e)}
      >
        <input type="name" name="createName" placeholder="Firstname Lastname" />
        <input type="email" name="createEmail" placeholder="Email address" />
        <input type="password" name="createPassword" placeholder="Password" />
        <button>Create</button>
      </form>
    </div>
  );
}

export default CreateAccountForm;
