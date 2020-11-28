import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import "./App.css";
// Pages
import ComposePost from "./containers/ComposePost";
import CreateAccount from "./containers/CreateAccount";
import Home from "./containers/Home";
import Login from "./containers/Login";
import SelectActivity from "./containers/SelectActivity";
import UserProfile from "./containers/UserProfile";
// Components
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="Content">
        <Router>
          <Route exact path="/compose-post">
            <ComposePost />
          </Route>
          <Route exact path="/create-account">
            <CreateAccount />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/select-activity">
            <SelectActivity />
          </Route>
          <Route exact path="/user-profile">
            <UserProfile />
          </Route>
        </Router>
      </div>
    </div>
  );
}

export default App;
