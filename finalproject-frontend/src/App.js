import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import firebase from "firebase/app";
import firestore from "firebase/firestore";
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

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "trailshare-dynamic-web.firebaseapp.com",
  databaseURL: "https://trailshare-dynamic-web.firebaseio.com",
  projectId: "trailshare-dynamic-web",
  storageBucket: "trailshare-dynamic-web.appspot.com",
  messagingSenderId: "595195663103",
  appId: "1:595195663103:web:f2189a9d41d41d062cb2ca",
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If there are no firebase apps, initialize the app
    if (!firebase.apps.length) {
      // Initializes firebase
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  // firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const posts = db.collection("posts");

  posts.get().then((querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => doc.data());
    console.log(data);
  });

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
