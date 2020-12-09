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

// Route for liking a post
// Accepts post id and number, which increments or decrements likes
router.get("/", (req, res) => {
  const queryParams = req.query;
  console.log(queryParams);
  const idFromTitle = queryParams.title.replace(/\s+/g, "-").toLowerCase();
  const increment = firebase.firestore.FieldValue.increment(queryParams.num);
  const postRef = posts.doc(idFromTitle);
  postRef.update({ likes: increment });
  const userRef = users.doc(queryParams.email);
  userRef.update({ likes: increment });
  res.end();
});

module.exports = router;
