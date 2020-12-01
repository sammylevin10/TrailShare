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
  // STRAVA TEST CODE START

  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState({});

  //Strava Credentials
  let clientID = process.env.REACT_APP_STRAVA_CLIENT_ID;
  let clientSecret = process.env.REACT_APP_STRAVA_CLIENT_SECRET;

  // refresh token and call address
  const refreshToken = process.env.REACT_APP_STRAVA_REFRESH_TOKEN;
  const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;

  // endpoint for read-all activities. temporary token is added in getActivities()
  const callActivities = `https://www.strava.com/api/v3/athlete/activities?access_token=`;

  // Use refresh token to get current access token
  useEffect(() => {
    fetch(callRefresh, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => getActivities(result.access_token));
  }, [callRefresh]);

  // use current access token to call all activities
  function getActivities(access) {
    // console.log(callActivities + access)
    fetch(callActivities + access)
      .then((res) => res.json())
      .then(
        (data) => setActivities(data),
        setIsLoading((prev) => !prev)
      )
      .catch((e) => console.log(e));
  }

  function showActivities() {
    if (isLoading) return <>LOADING</>;
    if (!isLoading) {
      console.log(activities);
      // return activities.length;
    }
  }

  showActivities();

  // STRAVA TEST CODE END

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postsArray, setPostsArray] = useState(null);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();
  const posts = db.collection("posts");

  useEffect(() => {
    posts.get().then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setPostsArray(data);
    });
  }, [db]);

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
            <Home postsArray={postsArray} />
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
