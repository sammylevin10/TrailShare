import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import axios from "axios";
import "./App.css";
import parse from "html-react-parser";
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
  // STRAVA TEST CODE START

  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);

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
      // console.log(activities);
      // return activities.length;
    }
  }

  // Uncomment this line to console log the last 30 activities
  showActivities();

  // STRAVA TEST CODE END

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userAuthInfo, setAuthInfo] = useState({});
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState({});
  const backendUrl = "http://localhost:4000";
  // HEROKU DOMAIN: https://secure-ocean-28880.herokuapp.com
  // LOCALHOST: http://localhost:4000

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "trailshare-dynamic-web.firebaseapp.com",
    databaseURL: "https://trailshare-dynamic-web.firebaseio.com",
    projectId: "trailshare-dynamic-web",
    storageBucket: "trailshare-dynamic-web.appspot.com",
    messagingSenderId: "595195663103",
    appId: "1:595195663103:web:f2189a9d41d41d062cb2ca",
  };

  // Ensure app is initialized when it is ready
  useEffect(() => {
    // If there are no firebase apps, initialize the app
    if (!firebase.apps.length) {
      // Initializes firebase
      firebase.initializeApp(firebaseConfig);
    }
  }, [firebaseConfig]);

  // Check to see if user is logged in...
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        //User is logged in
        setLoggedIn(true);
        setAuthInfo(user);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  // Function for logging in
  function LoginFunction(e) {
    // This is what you will run when you want to log in
    e.preventDefault();
    const email = e.currentTarget.loginEmail.value;
    const password = e.currentTarget.loginPassword.value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (response) {
        setLoggedIn(true);
      })
      .catch(function (error) {
        console.log("Login error", error);
      });
  }

  // Function for logging out
  function LogoutFunction(e) {
    // Function to run when you want to log out
    firebase
      .auth()
      .signOut()
      .then(function () {
        setLoggedIn(false);
        setAuthInfo({});
      })
      .catch(function (error) {
        console.log("Logout error", error);
      });
  }

  // Function for creating an account
  function CreateAccountFunction(e) {
    e.preventDefault();
    const email = e.currentTarget.createEmail.value;
    const password = e.currentTarget.createPassword.value;
    const name = e.currentTarget.createName.value;
    const object = {
      name: name,
      email: email,
      posts: 0,
      likes: 0,
      distance: 0,
    };
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log("Valid account created for", email, response);
        setLoggedIn(true);
      })
      .catch(function (error) {
        console.log("Account Creation Failed", error);
        alert("Account Creation Failed");
      });
    const db = firebase.firestore();
    const users = db.collection("users");
    users.doc(email).set(object);
  }

  // Function for retrieving user data once authorized
  useEffect(() => {
    if (loggedIn) {
      // alert(userAuthInfo.uid);
      axios
        .get(backendUrl + "/user/?email=" + userAuthInfo.email)
        .then(function (response) {
          setUserData(response.data);
        })
        .catch(function (error) {
          console.log("error", error);
        });
    }
  }, [userAuthInfo]);

  useEffect(() => {
    axios
      .get(backendUrl)
      .then(function (response) {
        setPostData(response.data);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="LoadingWrapper">
          <img
            className="Loading"
            src="https://64.media.tumblr.com/5d20cb9d224eb97fab488a8ca5b38d33/tumblr_nsocqzECoE1sjmeczo1_540.gifv"
          ></img>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <div className="Content">
        <Router>
          <Route exact path="/compose-post/:id">
            <ComposePost userData={userData} activitiesArray={activities} />
          </Route>
          <Route exact path="/create-account">
            {/* If someone is logged in, redirect them to home */}
            {/* If someone is not logged in, take them to create account */}
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <CreateAccount CreateAccountFunction={CreateAccountFunction} />
            )}
          </Route>
          <Route exact path="/">
            {/* Regardless of whether a user is logged in, display posts */}
            <Home postsArray={postData} />
          </Route>
          <Route exact path="/login">
            {/* If someone is logged in, redirect them to home */}
            {/* If someone is not logged in, take them to login */}
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login LoginFunction={LoginFunction} />
            )}
          </Route>
          <Route exact path="/select-activity">
            {/* If someone is logged in, take them to select activity */}
            {/* If someone is not logged in, redirect them to login */}
            {loggedIn ? (
              <SelectActivity activitiesArray={activities} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/user-profile">
            {/* If someone is logged in, take them to user profile */}
            {/* If someone is not logged in, redirect them to login */}
            {loggedIn ? (
              <UserProfile
                LogoutFunction={LogoutFunction}
                userData={userData}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Router>
      </div>
    </div>
  );
}

export default App;
