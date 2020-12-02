const express = require("express");
const router = express.Router();
const firebase = require("firebase");
const db = firebase.firestore();
const posts = db.collection("posts");

// useEffect(() => {
//   posts.get().then((querySnapshot) => {
//     const data = querySnapshot.docs.map((doc) => doc.data());
//     console.log("firestore data", data);
//   });
// }, [db]);

router.get("/", (req, res) => {
  // Inside of this arrow function we can do anything we want so long as we return at the end
  const postsArray = [];
  posts
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        postsArray.push(doc.data());
      });
      // Return array
      return res.send(postsArray);
    })
    .catch(function (e) {
      console.warn("error", e);
      return res.send(error);
    });
});

// const sampleJSON = [
//   {
//     name: "Name",
//     role: "Role",
//     info: "Info",
//   },
//   {
//     name: "Name2",
//     role: "Role2",
//     info: "Info",
//   },
// ];

// router.get("/", (req, res) => {
//   res.send("Hello");
// });

module.exports = router;
