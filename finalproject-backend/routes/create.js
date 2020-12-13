// Create blogpost
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// Require firebase
const firebase = require("firebase");
// Initialize firestore database
const db = firebase.firestore();
// Reference a specific collection
const posts = db.collection("posts");
const users = db.collection("users");

// Route for submitting the form
router.get("/submit", (req, res) => {
  const queryParams = req.query;
  const idFromTitle = queryParams.title.replace(/\s+/g, "-").toLowerCase();
  queryParams.likes = 0;
  queryParams.distance = parseFloat(queryParams.distance);
  queryParams.lat = parseFloat(queryParams.lat);
  queryParams.lng = parseFloat(queryParams.lng);
  if (queryParams.bike == "true") {
    queryParams.bike = true;
  } else {
    queryParams.bike = false;
  }
  posts
    .doc(idFromTitle) // Allows you to create new posts or update them
    .set(queryParams) //?title=text&text=text&author=text
    .then(function (doc) {
      //   res.end();
      console.log(queryParams);
      res.send(queryParams);
    })
    .catch(function (error) {
      console.log("error", error);
      res.send("Failed submission");
    });
  const userRef = users.doc(queryParams.email);
  const distanceIncrement = firebase.firestore.FieldValue.increment(
    (queryParams.distance / 1000).toFixed(1)
  );
  const postsIncrement = firebase.firestore.FieldValue.increment(1);
  userRef.update({ distance: distanceIncrement });
  userRef.update({ posts: postsIncrement });
});

module.exports = router;
