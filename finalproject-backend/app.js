// Backend application for Final Project
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "trailshare-dynamic-web.firebaseapp.com",
  databaseURL: "https://trailshare-dynamic-web.firebaseio.com",
  projectId: "trailshare-dynamic-web",
  storageBucket: "trailshare-dynamic-web.appspot.com",
  messagingSenderId: "595195663103",
  appId: "1:595195663103:web:f2189a9d41d41d062cb2ca",
};
//Firebase connection
const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

//Routes import
const indexRoute = require("./routes/index.js");
const createRoute = require("./routes/create.js");
const userRoute = require("./routes/user.js");
const likeRoute = require("./routes/like.js");

// ADD MORE ROUTES FOR GET/SUBMIT LIKE EX4
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", indexRoute);
app.use("/create", createRoute);
app.use("/user", userRoute);
app.use("/like", likeRoute);

app.listen(port, () => console.log(`Backend is running at port:${port}`));
