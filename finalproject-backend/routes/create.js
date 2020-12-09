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

const form = `
<form action="/create/submit" method="post">
    <input type = "text" name = "title" placeholder = "Title of post" />
    <input type = "text" name = "text" placeholder = "Title of post" />
    <input type = "text" name = "author" placeholder = "Title of post" />
    <button type = "submit">Submit Post</buttom>
</form>
`;

// Default route serves form
router.get("/", (req, res) => res.send(form));

// Route for submitting the form
router.post("/submit", urlencodedParser, (req, res) => {
  const queryParams = req.body;
  console.log(queryParams);
  // Custom IDs for our posts
  // Using Regex to process our title string into an id
  //   const idFromTitle = queryParams.title.replace(/\s+/g, "-").toLowerCase();
  posts
    .doc() // Allows you to create new posts or update them
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
});

module.exports = router;
