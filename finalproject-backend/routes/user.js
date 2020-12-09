const express = require("express");
const router = express.Router();
const firebase = require("firebase");
const db = firebase.firestore();
const users = db.collection("users");

router.get("/", (req, res) => {
  const queryParams = req.query;
  const email = queryParams.email;
  console.log("Acquiring user data for " + email);
  users
    .doc(email)
    .get()
    .then(function (doc) {
      return res.send(doc.data());
    })
    .catch(function (e) {
      console.warn("error", e);
      return res.send(e);
    });
});

module.exports = router;
