import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import firebase from "firebase/app";
// import express from "express";
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
  // const router = express.Router();
  // // Initialize firestore database
  // const db = firebase.firestore();
  // // Reference a specific collection
  // const posts = db.collection("posts");

  // const firebaseConfig = {
  //   apiKey: process.env.REACT_APP_FIREBASE_KEY,
  //   authDomain: "trailshare-dynamic-web.firebaseapp.com",
  //   databaseURL: "https://trailshare-dynamic-web.firebaseio.com",
  //   projectId: "trailshare-dynamic-web",
  //   storageBucket: "trailshare-dynamic-web.appspot.com",
  //   messagingSenderId: "595195663103",
  //   appId: "1:595195663103:web:f2189a9d41d41d062cb2ca",
  // };

  // router.get("/:test1", (req, res) => {
  //   // Get the query parameter from the url and set it to a variable
  //   const queryId = "test1";
  //   // Query the collection
  //   posts
  //     .doc(queryId) //Look up doc by id
  //     .get()
  //     .then(function (doc) {
  //       if (doc.exists) {
  //         return res.send(doc.data());
  //       } else {
  //         return res.send("No document exists");
  //       }
  //     })
  //     .catch(function (error) {
  //       return res.send(error);
  //     });
  // });

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // If there are no firebase apps, initialize the app
  //   if (!firebase.apps.length) {
  //     // Initializes firebase
  //     firebase.initializeApp(firebaseConfig);
  //   }
  // }, [firebaseConfig]);

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
