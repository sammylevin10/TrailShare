const express = require("express");
const router = express.Router();
const firebase = require("firebase");
const db = firebase.firestore();
const users = db.collection("users");

router.get("/", (req, res) => {
  const queryParams = req.query;
  const uid = queryParams.uid;
  console.log(uid);
  users
    .doc(uid)
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
