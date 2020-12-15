import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import axios from "axios";
import "./App.css";
import { geolocated } from "react-geolocated";
// Pages
import ComposePost from "./containers/ComposePost";
import CreateAccount from "./containers/CreateAccount";
import Home from "./containers/Home";
import Login from "./containers/Login";
import SelectActivity from "./containers/SelectActivity";
import StravaAuthenticate from "./containers/StravaAuthenticate";
import UserProfile from "./containers/UserProfile";
import { Ellipsis } from "react-spinners-css";
// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
// Images
// import background from "/public/background.png";

function App(props) {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "trailshare-dynamic-web.firebaseapp.com",
    databaseURL: "https://trailshare-dynamic-web.firebaseio.com",
    projectId: "trailshare-dynamic-web",
    storageBucket: "trailshare-dynamic-web.appspot.com",
    messagingSenderId: "595195663103",
    appId: "1:595195663103:web:f2189a9d41d41d062cb2ca",
  };

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userAuthInfo, setAuthInfo] = useState({});
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState({});
  const [location, setLocation] = useState(null);
  const [activities, setActivities] = useState([]);
  const backendUrl = "https://secure-ocean-28880.herokuapp.com";
  // HEROKU DOMAIN: https://secure-ocean-28880.herokuapp.com
  // LOCALHOST: http://localhost:4000

  //Strava Credentials
  let clientID = process.env.REACT_APP_STRAVA_CLIENT_ID;
  let clientSecret = process.env.REACT_APP_STRAVA_CLIENT_SECRET;
  let redirectURI = "http://localhost:3000/strava-authenticate";

  // Refresh token and urls for acquiring refresh token and calling activities
  const refreshToken = localStorage.getItem("stravaRefreshToken");
  const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
  const callActivities = `https://www.strava.com/api/v3/athlete/activities?per_page=50&access_token=`;

  // Use refresh token to get current access token
  useEffect(() => {
    fetch(callRefresh, {
      method: "POST",
    })
      .then((res) => res.json())
      .then(function (result) {
        getActivities(result.access_token);
      });
  }, [callRefresh]);

  // Use current access token to call all activities
  function getActivities(access) {
    fetch(callActivities + access)
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((e) => console.warn(e));
  }

  // Redirect to Strava OAuth after account creation
  function stravaAuthenticate() {
    let authorizeURL = `http://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${redirectURI}&approval_prompt=force&scope=activity:read_all`;
    window.location = authorizeURL;
  }

  // Initialize Firebase App
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, [firebaseConfig]);

  // Check to see if user is logged in
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
        console.warn("Login error", error);
      });
  }

  // Function for logging out
  function LogoutFunction(e) {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setLoggedIn(false);
        setAuthInfo({});
      })
      .catch(function (error) {
        console.warn("Logout error", error);
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
        setLoggedIn(true);
        const db = firebase.firestore();
        const users = db.collection("users");
        users.doc(email).set(object);
        stravaAuthenticate();
      })
      .catch(function (error) {
        console.warn("Account Creation Failed", error);
        alert("Account Creation Failed");
      });
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
          console.warn("error", error);
        });
    }
  }, [userAuthInfo]);

  // Get posts from firebase
  useEffect(() => {
    axios
      .get(backendUrl)
      .then(function (response) {
        setPostData(response.data);
      })
      .catch(function (error) {
        console.warn("error", error);
      });
  }, []);

  // Set user's geolocation
  useEffect(() => {
    if (props) {
      setLocation(props.coords);
    }
  }, [props]);

  if (loading) {
    return (
      <div className="App">
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
        <Header />
        <div className="Home">
          <div className="LoadingWrapper">
            <Ellipsis color="#2eb157" size={100} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      ></link>
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
            <>
              <Home postsArray={postData} geolocation={location} />
              <Footer />
            </>
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
              <>
                <SelectActivity activitiesArray={activities} />
                <Footer />
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/strava-authenticate">
            <StravaAuthenticate />
          </Route>
          <Route exact path="/user-profile">
            {/* If someone is logged in, take them to user profile */}
            {/* If someone is not logged in, redirect them to login */}
            {loggedIn ? (
              <>
                <UserProfile
                  LogoutFunction={LogoutFunction}
                  userData={userData}
                  postsArray={postData}
                />
                <Footer />
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Router>
      </div>
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(App);
