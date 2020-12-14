const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const firebase = require("firebase");
const db = firebase.firestore();
const posts = db.collection("posts");
const users = db.collection("users");

// Route for liking a post
// Accepts post id and number, which increments or decrements likes
router.get("/", (req, res) => {
  const queryParams = req.query;
  const idFromTitle = queryParams.title.replace(/\s+/g, "-").toLowerCase();
  const increment = firebase.firestore.FieldValue.increment(queryParams.num);
  const postRef = posts.doc(idFromTitle);
  postRef.update({ likes: increment });
  const userRef = users.doc(queryParams.email);
  userRef.update({ likes: increment });
  res.end();
});

module.exports = router;
